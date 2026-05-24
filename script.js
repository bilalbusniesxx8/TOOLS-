/* ============================================================
   ToolBox — script.js
   All routes match index.js backend exactly
   ============================================================ */

const API = 'http://localhost:3000';

/* ══════════════════════════════════════════════
   Helpers
══════════════════════════════════════════════ */
const $ = id => document.getElementById(id);

function getCard(btn)    { return btn.closest('.card'); }
function getLoader(card) { return card.querySelector('.loader'); }
function getError(card)  { return card.querySelector('.error-box'); }
function getResult(card) { return card.querySelector('.result-box'); }

function showEl(el)  { if (el) el.style.display = ''; }
function hideEl(el)  { if (el) el.style.display = 'none'; }

function showError(card, msg) {
  const el = getError(card);
  if (!el) return;
  el.textContent = '⚠ ' + msg;
  showEl(el);
}

function resetCard(card) {
  hideEl(getError(card));
  hideEl(getResult(card));
}

function animateNum(el, end, duration = 700) {
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    el.textContent = Math.round(p * end).toLocaleString('ar-EG');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── File Drop Setup ── */
document.querySelectorAll('.file-drop').forEach(drop => {
  const inputId = drop.dataset.input;
  const input   = document.getElementById(inputId);
  const inner   = drop.querySelector('.file-drop-inner');
  const preview = drop.querySelector('.file-preview-wrap');
  const img     = drop.querySelector('.file-preview-img');
  const name    = drop.querySelector('.file-name');

  drop.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    if (input.files[0]) loadPreview(input.files[0]);
  });

  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
  drop.addEventListener('drop', e => {
    e.preventDefault(); drop.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const dt = new DataTransfer(); dt.items.add(file); input.files = dt.files;
      loadPreview(file);
    }
  });

  function loadPreview(file) {
    const url = URL.createObjectURL(file);
    if (img)  { img.src = url; }
    if (name) { name.textContent = file.name; }
    hideEl(inner);
    showEl(preview);
    resetCard(drop.closest('.card'));
  }
});

/* ── Copy Buttons ── */
document.addEventListener('click', e => {
  if (e.target.classList.contains('copy-btn')) {
    const ta = e.target.previousElementSibling;
    if (ta && ta.value) {
      navigator.clipboard.writeText(ta.value).then(() => {
        e.target.textContent = '✅ تم النسخ';
        setTimeout(() => e.target.textContent = '📋 نسخ', 2000);
      });
    }
  }
});

/* ── Word Live Count ── */
const wordCountTextarea = $('wordCountText');
if (wordCountTextarea) {
  wordCountTextarea.addEventListener('input', () => {
    const t = wordCountTextarea.value;
    const w = t.trim() === '' ? 0 : t.trim().split(/\s+/).length;
    $('wordLive').textContent = `${t.length.toLocaleString('ar-EG')} حرف · ${w.toLocaleString('ar-EG')} كلمة`;
  });
}

/* ══════════════════════════════════════════════
   Action Handler
══════════════════════════════════════════════ */
document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', () => handleAction(btn));
});

async function handleAction(btn) {
  const action = btn.dataset.action;
  const card   = getCard(btn);
  const loader = getLoader(card);
  const result = getResult(card);

  resetCard(card);
  btn.disabled = true;
  showEl(loader);

  try {
    switch (action) {

      /* ─── IMAGE TOOLS ─── */

      case 'resize': {
        const file = card.querySelector('input[type=file]').files[0];
        const w    = card.querySelector('#resizeW').value;
        const h    = card.querySelector('#resizeH').value;
        if (!file)        throw new Error('الرجاء اختيار صورة');
        if (!w || !h)     throw new Error('الرجاء إدخال العرض والارتفاع');
        const fd = new FormData();
        fd.append('image', file); fd.append('width', w); fd.append('height', h);
        const blob = await postFile(`${API}/api/image/resize`, fd);
        showImgResult(card, blob, 'resized.png');
        break;
      }

      case 'compress': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error('الرجاء اختيار صورة');
        const fd = new FormData(); fd.append('image', file);
        const blob = await postFile(`${API}/api/image/compress`, fd);
        showImgResult(card, blob, 'compressed.jpg');
        break;
      }

      case 'convert': {
        const file   = card.querySelector('input[type=file]').files[0];
        const format = $('convertFormat').value;
        if (!file) throw new Error('الرجاء اختيار صورة');
        const fd = new FormData(); fd.append('image', file); fd.append('format', format);
        const blob = await postFile(`${API}/api/image/convert`, fd);
        showImgResult(card, blob, `converted.${format}`);
        break;
      }

      case 'rotate': {
        const file  = card.querySelector('input[type=file]').files[0];
        const angle = $('rotateAngle').value;
        if (!file) throw new Error('الرجاء اختيار صورة');
        const fd = new FormData(); fd.append('image', file); fd.append('angle', angle);
        const blob = await postFile(`${API}/api/image/rotate`, fd);
        showImgResult(card, blob, 'rotated.png');
        break;
      }

      case 'watermark': {
        const file = card.querySelector('input[type=file]').files[0];
        const text = $('watermarkText').value || 'Watermark';
        if (!file) throw new Error('الرجاء اختيار صورة');
        const fd = new FormData(); fd.append('image', file); fd.append('text', text);
        const blob = await postFile(`${API}/api/image/watermark`, fd);
        showImgResult(card, blob, 'watermarked.png');
        break;
      }

      case 'base64': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error('الرجاء اختيار صورة');
        const fd = new FormData(); fd.append('image', file);
        const res  = await fetch(`${API}/api/image/base64`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const ta   = result.querySelector('textarea');
        if (ta) ta.value = data.base64;
        showEl(result);
        break;
      }

      /* ─── PDF TOOLS ─── */

      case 'merge-pdf': {
        const files = $('mergePdfs').files;
        if (files.length < 2) throw new Error('اختر ملفين PDF على الأقل');
        const fd = new FormData();
        Array.from(files).forEach(f => fd.append('pdfs', f));
        const blob = await postFile(`${API}/api/pdf/merge`, fd);
        showPdfResult(card, blob, 'merged.pdf');
        break;
      }

      case 'split-pdf': {
        const file = $('splitPdf').files[0];
        if (!file) throw new Error('الرجاء اختيار ملف PDF');
        const fd = new FormData(); fd.append('pdf', file);
        const blob = await postFile(`${API}/api/pdf/split`, fd);
        showPdfResult(card, blob, 'split.pdf');
        break;
      }

      case 'compress-pdf': {
        const file = $('compressPdf').files[0];
        if (!file) throw new Error('الرجاء اختيار ملف PDF');
        const fd = new FormData(); fd.append('pdf', file);
        const blob = await postFile(`${API}/api/pdf/compress`, fd);
        showPdfResult(card, blob, 'compressed.pdf');
        break;
      }

      case 'img-to-pdf': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error('الرجاء اختيار صورة PNG');
        const fd = new FormData(); fd.append('image', file);
        const blob = await postFile(`${API}/api/pdf/from-image`, fd);
        showPdfResult(card, blob, 'output.pdf');
        break;
      }

      /* ─── TEXT TOOLS ─── */

      case 'word-count': {
        const text = $('wordCountText').value.trim();
        if (!text) throw new Error('الرجاء إدخال نص');
        const res  = await fetch(`${API}/api/text/word-count`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const statVal = result.querySelector('.stat-value');
        if (statVal) animateNum(statVal, data.count);
        showEl(result);
        break;
      }

      case 'char-count': {
        const text = $('charCountText').value;
        if (!text) throw new Error('الرجاء إدخال نص');
        const res  = await fetch(`${API}/api/text/char-count`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const statVal = result.querySelector('.stat-value');
        if (statVal) animateNum(statVal, data.count);
        showEl(result);
        break;
      }

      case 'convert-case': {
        const text = $('caseText').value;
        const type = $('caseType').value;
        if (!text) throw new Error('الرجاء إدخال نص');
        const res  = await fetch(`${API}/api/text/convert-case`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, type }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const ta   = result.querySelector('textarea');
        if (ta) ta.value = data.result;
        showEl(result);
        break;
      }

      case 'remove-spaces': {
        const text = $('spacesText').value;
        if (!text) throw new Error('الرجاء إدخال نص');
        const res  = await fetch(`${API}/api/text/remove-spaces`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const ta   = result.querySelector('textarea');
        if (ta) ta.value = data.result;
        showEl(result);
        break;
      }

      case 'sort-text': {
        const text  = $('sortText').value;
        const order = $('sortOrder').value;
        if (!text) throw new Error('الرجاء إدخال نص');
        const res  = await fetch(`${API}/api/text/sort`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, order }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const ta   = result.querySelector('textarea');
        if (ta) ta.value = data.result;
        showEl(result);
        break;
      }

      default:
        throw new Error('إجراء غير معروف');
    }

  } catch (err) {
    showError(card, err.message);
  } finally {
    btn.disabled = false;
    hideEl(loader);
  }
}

/* ══════════════════════════════════════════════
   Fetch Helpers
══════════════════════════════════════════════ */
async function postFile(url, formData) {
  const res = await fetch(url, { method: 'POST', body: formData });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }
  return await res.blob();
}

function showImgResult(card, blob, filename) {
  const result = getResult(card);
  if (!result) return;
  const url = URL.createObjectURL(blob);
  const img  = result.querySelector('.result-image');
  const dl   = result.querySelector('.dl-link');
  if (img) img.src = url;
  if (dl)  { dl.href = url; dl.download = filename; }
  showEl(result);
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showPdfResult(card, blob, filename) {
  const result = getResult(card);
  if (!result) return;
  const url = URL.createObjectURL(blob);
  const dl  = result.querySelector('.dl-link');
  if (dl) { dl.href = url; dl.download = filename; }
  showEl(result);
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}