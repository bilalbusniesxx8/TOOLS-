/* ============================================================
   ToolBox — script.js
   Multi-language support + All API routes
   ============================================================ */

const API = 'https://tools-s1o8.onrender.com';

/* ══════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════ */
const LANGS = {
  ar: {
    name: 'العربية', dir: 'rtl',
    nav_image:'🖼️ صور', nav_pdf:'📄 PDF', nav_text:'✍️ نصوص',
    hero_badge:'✦ أدوات مجانية & احترافية', hero_title:'أدواتك', hero_title2:'في مكان واحد', hero_sub:'سريع · دقيق · بدون تسجيل',
    img_section_title:'أدوات الصور', img_section_sub:'تعديل وتحويل الصور بسهولة',
    resize_title:'تغيير الحجم', resize_desc:'حدد عرض وارتفاع الصورة', resize_btn:'⚡ تغيير الحجم',
    compress_title:'ضغط الصورة', compress_desc:'تقليل حجم الصورة', compress_btn:'🗜️ ضغط', compress_result:'✅ الصورة المضغوطة',
    convert_title:'تحويل الصيغة', convert_desc:'PNG ↔ JPG وغيرها', convert_btn:'🔄 تحويل', convert_result:'✅ الصورة المحولة', format_label:'الصيغة المطلوبة',
    rotate_title:'تدوير الصورة', rotate_desc:'تدوير الصورة بزاوية معينة', rotate_btn:'🔃 تدوير', rotate_result:'✅ الصورة المدوّرة', angle_label:'الزاوية',
    watermark_title:'علامة مائية', watermark_desc:'أضف نصاً شفافاً على الصورة', watermark_btn:'💧 إضافة', watermark_result:'✅ الصورة مع العلامة', watermark_label:'نص العلامة المائية',
    base64_title:'صورة إلى Base64', base64_desc:'حوّل الصورة إلى نص Base64', base64_btn:'🔤 تحويل', base64_result:'✅ كود Base64',
    pdf_section_title:'أدوات PDF', pdf_section_sub:'دمج وضغط وتحويل ملفات PDF',
    merge_title:'دمج PDF', merge_desc:'ادمج عدة ملفات PDF في ملف واحد', merge_btn:'🔗 دمج', merge_result:'✅ تم الدمج', merge_label:'اختر ملفات PDF (متعددة)',
    split_title:'تقسيم PDF', split_desc:'استخرج الصفحة الأولى', split_btn:'✂️ تقسيم', split_result:'✅ تم التقسيم', split_label:'اختر ملف PDF',
    compress_pdf_title:'ضغط PDF', compress_pdf_desc:'قلّل حجم ملف PDF', compress_pdf_btn:'📦 ضغط', compress_pdf_result:'✅ تم الضغط', compress_pdf_label:'اختر ملف PDF',
    img2pdf_title:'صورة إلى PDF', img2pdf_desc:'حوّل صورة PNG إلى PDF', img2pdf_btn:'📄 تحويل', img2pdf_result:'✅ تم التحويل',
    text_section_title:'أدوات النصوص', text_section_sub:'تحليل وتعديل النصوص بسرعة',
    wordcount_title:'عداد الكلمات', wordcount_desc:'احسب عدد الكلمات', wordcount_btn:'🔢 احسب', words_label:'كلمة',
    charcount_title:'عداد الحروف', charcount_desc:'احسب عدد الحروف', charcount_btn:'🔡 احسب', chars_label:'حرف',
    case_title:'تحويل الحالة', case_desc:'كبير / صغير للنص الإنجليزي', case_btn:'🔠 تحويل', case_type_label:'نوع التحويل',
    spaces_title:'إزالة المسافات الزائدة', spaces_desc:'نظّف النص من المسافات', spaces_btn:'🧹 تنظيف',
    sort_title:'ترتيب السطور', sort_desc:'رتّب سطور النص أبجدياً', sort_btn:'🔀 ترتيب', sort_order_label:'الترتيب', sort_asc:'تصاعدي (A→Z)', sort_desc_opt:'تنازلي (Z→A)',
    drop_text:'اسحب أو اختر صورة', drop_choose:'اختر صورة', drop_png:'اسحب أو اختر صورة PNG', drop_choose_png:'اختر صورة PNG',
    width_label:'العرض (px)', height_label:'الارتفاع (px)',
    result_ok:'✅ النتيجة', download_btn:'⬇ تحميل', download_pdf_btn:'⬇ تحميل PDF', copy_btn:'📋 نسخ',
    text_placeholder:'الصق نصك هنا...',
    footer:'صُنع بـ ❤️ · ToolBox © 2025',
    err_no_file:'الرجاء اختيار ملف', err_no_text:'الرجاء إدخال نص', err_no_dims:'الرجاء إدخال العرض والارتفاع', err_min_files:'اختر ملفين على الأقل', err_failed:'فشل الطلب: ',
    copied:'✅ تم النسخ',
  },
  en: {
    name: 'English', dir: 'ltr',
    nav_image:'🖼️ Images', nav_pdf:'📄 PDF', nav_text:'✍️ Text',
    hero_badge:'✦ Free & Professional Tools', hero_title:'Your Tools', hero_title2:'All in One Place', hero_sub:'Fast · Accurate · No Sign-up',
    img_section_title:'Image Tools', img_section_sub:'Edit and convert images easily',
    resize_title:'Resize Image', resize_desc:'Set a new width and height', resize_btn:'⚡ Resize',
    compress_title:'Compress Image', compress_desc:'Reduce image file size', compress_btn:'🗜️ Compress', compress_result:'✅ Compressed Image',
    convert_title:'Convert Format', convert_desc:'PNG ↔ JPG and more', convert_btn:'🔄 Convert', convert_result:'✅ Converted Image', format_label:'Target Format',
    rotate_title:'Rotate Image', rotate_desc:'Rotate image by angle', rotate_btn:'🔃 Rotate', rotate_result:'✅ Rotated Image', angle_label:'Angle',
    watermark_title:'Watermark', watermark_desc:'Add transparent text to image', watermark_btn:'💧 Add', watermark_result:'✅ Watermarked Image', watermark_label:'Watermark Text',
    base64_title:'Image to Base64', base64_desc:'Convert image to Base64 string', base64_btn:'🔤 Convert', base64_result:'✅ Base64 Code',
    pdf_section_title:'PDF Tools', pdf_section_sub:'Merge, compress and convert PDFs',
    merge_title:'Merge PDF', merge_desc:'Combine multiple PDFs into one', merge_btn:'🔗 Merge', merge_result:'✅ Merged Successfully', merge_label:'Choose PDF files (multiple)',
    split_title:'Split PDF', split_desc:'Extract the first page', split_btn:'✂️ Split', split_result:'✅ Split Successfully', split_label:'Choose PDF file',
    compress_pdf_title:'Compress PDF', compress_pdf_desc:'Reduce PDF file size', compress_pdf_btn:'📦 Compress', compress_pdf_result:'✅ Compressed', compress_pdf_label:'Choose PDF file',
    img2pdf_title:'Image to PDF', img2pdf_desc:'Convert PNG image to PDF', img2pdf_btn:'📄 Convert', img2pdf_result:'✅ Converted',
    text_section_title:'Text Tools', text_section_sub:'Analyze and edit text quickly',
    wordcount_title:'Word Counter', wordcount_desc:'Count words in your text', wordcount_btn:'🔢 Count', words_label:'Words',
    charcount_title:'Character Counter', charcount_desc:'Count characters in your text', charcount_btn:'🔡 Count', chars_label:'Characters',
    case_title:'Case Converter', case_desc:'UPPER / lower case conversion', case_btn:'🔠 Convert', case_type_label:'Conversion Type',
    spaces_title:'Remove Extra Spaces', spaces_desc:'Clean up multiple spaces', spaces_btn:'🧹 Clean',
    sort_title:'Sort Lines', sort_desc:'Sort text lines alphabetically', sort_btn:'🔀 Sort', sort_order_label:'Order', sort_asc:'Ascending (A→Z)', sort_desc_opt:'Descending (Z→A)',
    drop_text:'Drag or choose an image', drop_choose:'Choose image', drop_png:'Drag or choose PNG', drop_choose_png:'Choose PNG',
    width_label:'Width (px)', height_label:'Height (px)',
    result_ok:'✅ Result', download_btn:'⬇ Download', download_pdf_btn:'⬇ Download PDF', copy_btn:'📋 Copy',
    text_placeholder:'Paste your text here...',
    footer:'Made with ❤️ · ToolBox © 2025',
    err_no_file:'Please select a file', err_no_text:'Please enter text', err_no_dims:'Please enter width and height', err_min_files:'Select at least 2 files', err_failed:'Request failed: ',
    copied:'✅ Copied',
  },
  zh: {
    name: '中文', dir: 'ltr',
    nav_image:'🖼️ 图片', nav_pdf:'📄 PDF', nav_text:'✍️ 文字',
    hero_badge:'✦ 免费专业工具', hero_title:'您的工具', hero_title2:'集中一处', hero_sub:'快速 · 准确 · 无需注册',
    img_section_title:'图片工具', img_section_sub:'轻松编辑和转换图片',
    resize_title:'调整大小', resize_desc:'设置新的宽度和高度', resize_btn:'⚡ 调整',
    compress_title:'压缩图片', compress_desc:'减小图片文件大小', compress_btn:'🗜️ 压缩', compress_result:'✅ 压缩后的图片',
    convert_title:'格式转换', convert_desc:'PNG ↔ JPG 等', convert_btn:'🔄 转换', convert_result:'✅ 转换后的图片', format_label:'目标格式',
    rotate_title:'旋转图片', rotate_desc:'按角度旋转图片', rotate_btn:'🔃 旋转', rotate_result:'✅ 旋转后的图片', angle_label:'角度',
    watermark_title:'水印', watermark_desc:'在图片上添加透明文字', watermark_btn:'💧 添加', watermark_result:'✅ 带水印的图片', watermark_label:'水印文字',
    base64_title:'图片转Base64', base64_desc:'将图片转换为Base64字符串', base64_btn:'🔤 转换', base64_result:'✅ Base64代码',
    pdf_section_title:'PDF工具', pdf_section_sub:'合并、压缩和转换PDF',
    merge_title:'合并PDF', merge_desc:'将多个PDF合并为一个', merge_btn:'🔗 合并', merge_result:'✅ 合并成功', merge_label:'选择PDF文件（多个）',
    split_title:'拆分PDF', split_desc:'提取第一页', split_btn:'✂️ 拆分', split_result:'✅ 拆分成功', split_label:'选择PDF文件',
    compress_pdf_title:'压缩PDF', compress_pdf_desc:'减小PDF文件大小', compress_pdf_btn:'📦 压缩', compress_pdf_result:'✅ 压缩成功', compress_pdf_label:'选择PDF文件',
    img2pdf_title:'图片转PDF', img2pdf_desc:'将PNG图片转换为PDF', img2pdf_btn:'📄 转换', img2pdf_result:'✅ 转换成功',
    text_section_title:'文字工具', text_section_sub:'快速分析和编辑文字',
    wordcount_title:'字数统计', wordcount_desc:'统计文本中的单词数', wordcount_btn:'🔢 统计', words_label:'个词',
    charcount_title:'字符统计', charcount_desc:'统计文本中的字符数', charcount_btn:'🔡 统计', chars_label:'个字符',
    case_title:'大小写转换', case_desc:'英文大小写转换', case_btn:'🔠 转换', case_type_label:'转换类型',
    spaces_title:'删除多余空格', spaces_desc:'清理多余的空格', spaces_btn:'🧹 清理',
    sort_title:'排序行', sort_desc:'按字母顺序排列文本行', sort_btn:'🔀 排序', sort_order_label:'顺序', sort_asc:'升序 (A→Z)', sort_desc_opt:'降序 (Z→A)',
    drop_text:'拖拽或选择图片', drop_choose:'选择图片', drop_png:'拖拽或选择PNG', drop_choose_png:'选择PNG',
    width_label:'宽度 (px)', height_label:'高度 (px)',
    result_ok:'✅ 结果', download_btn:'⬇ 下载', download_pdf_btn:'⬇ 下载PDF', copy_btn:'📋 复制',
    text_placeholder:'在此粘贴您的文字...',
    footer:'用 ❤️ 制作 · ToolBox © 2025',
    err_no_file:'请选择文件', err_no_text:'请输入文字', err_no_dims:'请输入宽度和高度', err_min_files:'至少选择两个文件', err_failed:'请求失败: ',
    copied:'✅ 已复制',
  },
  es: {
    name: 'Español', dir: 'ltr',
    nav_image:'🖼️ Imágenes', nav_pdf:'📄 PDF', nav_text:'✍️ Texto',
    hero_badge:'✦ Herramientas Gratuitas & Profesionales', hero_title:'Tus Herramientas', hero_title2:'En Un Solo Lugar', hero_sub:'Rápido · Preciso · Sin Registro',
    img_section_title:'Herramientas de Imagen', img_section_sub:'Edita y convierte imágenes fácilmente',
    resize_title:'Redimensionar', resize_desc:'Establece nuevo ancho y alto', resize_btn:'⚡ Redimensionar',
    compress_title:'Comprimir Imagen', compress_desc:'Reduce el tamaño del archivo', compress_btn:'🗜️ Comprimir', compress_result:'✅ Imagen Comprimida',
    convert_title:'Convertir Formato', convert_desc:'PNG ↔ JPG y más', convert_btn:'🔄 Convertir', convert_result:'✅ Imagen Convertida', format_label:'Formato destino',
    rotate_title:'Rotar Imagen', rotate_desc:'Rotar imagen por ángulo', rotate_btn:'🔃 Rotar', rotate_result:'✅ Imagen Rotada', angle_label:'Ángulo',
    watermark_title:'Marca de Agua', watermark_desc:'Añade texto transparente', watermark_btn:'💧 Añadir', watermark_result:'✅ Imagen con Marca', watermark_label:'Texto de Marca de Agua',
    base64_title:'Imagen a Base64', base64_desc:'Convierte imagen a cadena Base64', base64_btn:'🔤 Convertir', base64_result:'✅ Código Base64',
    pdf_section_title:'Herramientas PDF', pdf_section_sub:'Combina, comprime y convierte PDFs',
    merge_title:'Combinar PDF', merge_desc:'Combina varios PDFs en uno', merge_btn:'🔗 Combinar', merge_result:'✅ Combinado', merge_label:'Elegir archivos PDF (múltiples)',
    split_title:'Dividir PDF', split_desc:'Extrae la primera página', split_btn:'✂️ Dividir', split_result:'✅ Dividido', split_label:'Elegir archivo PDF',
    compress_pdf_title:'Comprimir PDF', compress_pdf_desc:'Reduce el tamaño del PDF', compress_pdf_btn:'📦 Comprimir', compress_pdf_result:'✅ Comprimido', compress_pdf_label:'Elegir archivo PDF',
    img2pdf_title:'Imagen a PDF', img2pdf_desc:'Convierte imagen PNG a PDF', img2pdf_btn:'📄 Convertir', img2pdf_result:'✅ Convertido',
    text_section_title:'Herramientas de Texto', text_section_sub:'Analiza y edita texto rápidamente',
    wordcount_title:'Contador de Palabras', wordcount_desc:'Cuenta palabras en tu texto', wordcount_btn:'🔢 Contar', words_label:'Palabras',
    charcount_title:'Contador de Caracteres', charcount_desc:'Cuenta caracteres en tu texto', charcount_btn:'🔡 Contar', chars_label:'Caracteres',
    case_title:'Convertir Mayúsculas', case_desc:'Conversión MAYÚSCULAS/minúsculas', case_btn:'🔠 Convertir', case_type_label:'Tipo de conversión',
    spaces_title:'Eliminar Espacios Extra', spaces_desc:'Limpia espacios múltiples', spaces_btn:'🧹 Limpiar',
    sort_title:'Ordenar Líneas', sort_desc:'Ordena líneas alfabéticamente', sort_btn:'🔀 Ordenar', sort_order_label:'Orden', sort_asc:'Ascendente (A→Z)', sort_desc_opt:'Descendente (Z→A)',
    drop_text:'Arrastra o elige imagen', drop_choose:'Elegir imagen', drop_png:'Arrastra o elige PNG', drop_choose_png:'Elegir PNG',
    width_label:'Ancho (px)', height_label:'Alto (px)',
    result_ok:'✅ Resultado', download_btn:'⬇ Descargar', download_pdf_btn:'⬇ Descargar PDF', copy_btn:'📋 Copiar',
    text_placeholder:'Pega tu texto aquí...',
    footer:'Hecho con ❤️ · ToolBox © 2025',
    err_no_file:'Por favor selecciona un archivo', err_no_text:'Por favor ingresa texto', err_no_dims:'Por favor ingresa ancho y alto', err_min_files:'Selecciona al menos 2 archivos', err_failed:'Error: ',
    copied:'✅ Copiado',
  },
  fr: {
    name: 'Français', dir: 'ltr',
    nav_image:'🖼️ Images', nav_pdf:'📄 PDF', nav_text:'✍️ Texte',
    hero_badge:'✦ Outils Gratuits & Professionnels', hero_title:'Vos Outils', hero_title2:'En Un Seul Endroit', hero_sub:'Rapide · Précis · Sans Inscription',
    img_section_title:'Outils Image', img_section_sub:'Modifiez et convertissez facilement',
    resize_title:'Redimensionner', resize_desc:'Définir largeur et hauteur', resize_btn:'⚡ Redimensionner',
    compress_title:'Compresser Image', compress_desc:'Réduire la taille du fichier', compress_btn:'🗜️ Compresser', compress_result:'✅ Image Compressée',
    convert_title:'Convertir Format', convert_desc:'PNG ↔ JPG et plus', convert_btn:'🔄 Convertir', convert_result:'✅ Image Convertie', format_label:'Format cible',
    rotate_title:'Pivoter Image', rotate_desc:'Pivoter selon un angle', rotate_btn:'🔃 Pivoter', rotate_result:'✅ Image Pivotée', angle_label:'Angle',
    watermark_title:'Filigrane', watermark_desc:'Ajouter texte transparent', watermark_btn:'💧 Ajouter', watermark_result:'✅ Image avec Filigrane', watermark_label:'Texte du Filigrane',
    base64_title:'Image en Base64', base64_desc:'Convertir image en Base64', base64_btn:'🔤 Convertir', base64_result:'✅ Code Base64',
    pdf_section_title:'Outils PDF', pdf_section_sub:'Fusionner, compresser et convertir',
    merge_title:'Fusionner PDF', merge_desc:'Combiner plusieurs PDFs', merge_btn:'🔗 Fusionner', merge_result:'✅ Fusionné', merge_label:'Choisir des PDFs (multiple)',
    split_title:'Diviser PDF', split_desc:'Extraire la première page', split_btn:'✂️ Diviser', split_result:'✅ Divisé', split_label:'Choisir un PDF',
    compress_pdf_title:'Compresser PDF', compress_pdf_desc:'Réduire la taille du PDF', compress_pdf_btn:'📦 Compresser', compress_pdf_result:'✅ Compressé', compress_pdf_label:'Choisir un PDF',
    img2pdf_title:'Image en PDF', img2pdf_desc:'Convertir PNG en PDF', img2pdf_btn:'📄 Convertir', img2pdf_result:'✅ Converti',
    text_section_title:'Outils Texte', text_section_sub:'Analysez et modifiez rapidement',
    wordcount_title:'Compteur de Mots', wordcount_desc:'Compter les mots', wordcount_btn:'🔢 Compter', words_label:'Mots',
    charcount_title:'Compteur de Caractères', charcount_desc:'Compter les caractères', charcount_btn:'🔡 Compter', chars_label:'Caractères',
    case_title:'Convertir Casse', case_desc:'MAJUSCULES/minuscules', case_btn:'🔠 Convertir', case_type_label:'Type de conversion',
    spaces_title:'Supprimer Espaces', spaces_desc:'Nettoyer les espaces multiples', spaces_btn:'🧹 Nettoyer',
    sort_title:'Trier Lignes', sort_desc:'Trier lignes alphabétiquement', sort_btn:'🔀 Trier', sort_order_label:'Ordre', sort_asc:'Croissant (A→Z)', sort_desc_opt:'Décroissant (Z→A)',
    drop_text:'Glisser ou choisir image', drop_choose:'Choisir image', drop_png:'Glisser ou choisir PNG', drop_choose_png:'Choisir PNG',
    width_label:'Largeur (px)', height_label:'Hauteur (px)',
    result_ok:'✅ Résultat', download_btn:'⬇ Télécharger', download_pdf_btn:'⬇ Télécharger PDF', copy_btn:'📋 Copier',
    text_placeholder:'Collez votre texte ici...',
    footer:'Fait avec ❤️ · ToolBox © 2025',
    err_no_file:'Veuillez sélectionner un fichier', err_no_text:'Veuillez entrer du texte', err_no_dims:'Veuillez entrer largeur et hauteur', err_min_files:'Sélectionnez au moins 2 fichiers', err_failed:'Erreur: ',
    copied:'✅ Copié',
  },
  de: {
    name: 'Deutsch', dir: 'ltr',
    nav_image:'🖼️ Bilder', nav_pdf:'📄 PDF', nav_text:'✍️ Text',
    hero_badge:'✦ Kostenlose & Professionelle Tools', hero_title:'Ihre Werkzeuge', hero_title2:'An Einem Ort', hero_sub:'Schnell · Genau · Ohne Anmeldung',
    img_section_title:'Bild-Werkzeuge', img_section_sub:'Bilder einfach bearbeiten und konvertieren',
    resize_title:'Größe Ändern', resize_desc:'Neue Breite und Höhe festlegen', resize_btn:'⚡ Ändern',
    compress_title:'Bild Komprimieren', compress_desc:'Dateigröße reduzieren', compress_btn:'🗜️ Komprimieren', compress_result:'✅ Komprimiertes Bild',
    convert_title:'Format Konvertieren', convert_desc:'PNG ↔ JPG und mehr', convert_btn:'🔄 Konvertieren', convert_result:'✅ Konvertiertes Bild', format_label:'Zielformat',
    rotate_title:'Bild Drehen', rotate_desc:'Bild um Winkel drehen', rotate_btn:'🔃 Drehen', rotate_result:'✅ Gedrehtes Bild', angle_label:'Winkel',
    watermark_title:'Wasserzeichen', watermark_desc:'Transparenten Text hinzufügen', watermark_btn:'💧 Hinzufügen', watermark_result:'✅ Bild mit Wasserzeichen', watermark_label:'Wasserzeichen-Text',
    base64_title:'Bild zu Base64', base64_desc:'Bild in Base64 konvertieren', base64_btn:'🔤 Konvertieren', base64_result:'✅ Base64-Code',
    pdf_section_title:'PDF-Werkzeuge', pdf_section_sub:'PDFs zusammenführen, komprimieren und konvertieren',
    merge_title:'PDFs Zusammenführen', merge_desc:'Mehrere PDFs kombinieren', merge_btn:'🔗 Zusammenführen', merge_result:'✅ Zusammengeführt', merge_label:'PDF-Dateien wählen (mehrere)',
    split_title:'PDF Aufteilen', split_desc:'Erste Seite extrahieren', split_btn:'✂️ Aufteilen', split_result:'✅ Aufgeteilt', split_label:'PDF-Datei wählen',
    compress_pdf_title:'PDF Komprimieren', compress_pdf_desc:'PDF-Dateigröße reduzieren', compress_pdf_btn:'📦 Komprimieren', compress_pdf_result:'✅ Komprimiert', compress_pdf_label:'PDF-Datei wählen',
    img2pdf_title:'Bild zu PDF', img2pdf_desc:'PNG-Bild in PDF konvertieren', img2pdf_btn:'📄 Konvertieren', img2pdf_result:'✅ Konvertiert',
    text_section_title:'Text-Werkzeuge', text_section_sub:'Text schnell analysieren und bearbeiten',
    wordcount_title:'Wörterzähler', wordcount_desc:'Wörter im Text zählen', wordcount_btn:'🔢 Zählen', words_label:'Wörter',
    charcount_title:'Zeichenzähler', charcount_desc:'Zeichen im Text zählen', charcount_btn:'🔡 Zählen', chars_label:'Zeichen',
    case_title:'Groß-/Kleinschreibung', case_desc:'GROSS/klein Konvertierung', case_btn:'🔠 Konvertieren', case_type_label:'Konvertierungstyp',
    spaces_title:'Leerzeichen Entfernen', spaces_desc:'Mehrfache Leerzeichen bereinigen', spaces_btn:'🧹 Bereinigen',
    sort_title:'Zeilen Sortieren', sort_desc:'Zeilen alphabetisch sortieren', sort_btn:'🔀 Sortieren', sort_order_label:'Reihenfolge', sort_asc:'Aufsteigend (A→Z)', sort_desc_opt:'Absteigend (Z→A)',
    drop_text:'Bild ziehen oder wählen', drop_choose:'Bild wählen', drop_png:'PNG ziehen oder wählen', drop_choose_png:'PNG wählen',
    width_label:'Breite (px)', height_label:'Höhe (px)',
    result_ok:'✅ Ergebnis', download_btn:'⬇ Herunterladen', download_pdf_btn:'⬇ PDF Herunterladen', copy_btn:'📋 Kopieren',
    text_placeholder:'Text hier einfügen...',
    footer:'Gemacht mit ❤️ · ToolBox © 2025',
    err_no_file:'Bitte Datei auswählen', err_no_text:'Bitte Text eingeben', err_no_dims:'Bitte Breite und Höhe eingeben', err_min_files:'Mindestens 2 Dateien auswählen', err_failed:'Fehler: ',
    copied:'✅ Kopiert',
  },
  ru: {
    name: 'Русский', dir: 'ltr',
    nav_image:'🖼️ Изображения', nav_pdf:'📄 PDF', nav_text:'✍️ Текст',
    hero_badge:'✦ Бесплатные & Профессиональные Инструменты', hero_title:'Ваши Инструменты', hero_title2:'В Одном Месте', hero_sub:'Быстро · Точно · Без Регистрации',
    img_section_title:'Инструменты для Изображений', img_section_sub:'Редактируйте и конвертируйте изображения',
    resize_title:'Изменить Размер', resize_desc:'Установите новую ширину и высоту', resize_btn:'⚡ Изменить',
    compress_title:'Сжать Изображение', compress_desc:'Уменьшить размер файла', compress_btn:'🗜️ Сжать', compress_result:'✅ Сжатое Изображение',
    convert_title:'Конвертировать Формат', convert_desc:'PNG ↔ JPG и другие', convert_btn:'🔄 Конвертировать', convert_result:'✅ Конвертированное', format_label:'Целевой формат',
    rotate_title:'Повернуть Изображение', rotate_desc:'Повернуть на угол', rotate_btn:'🔃 Повернуть', rotate_result:'✅ Повёрнутое', angle_label:'Угол',
    watermark_title:'Водяной Знак', watermark_desc:'Добавить прозрачный текст', watermark_btn:'💧 Добавить', watermark_result:'✅ С Водяным Знаком', watermark_label:'Текст водяного знака',
    base64_title:'Изображение в Base64', base64_desc:'Конвертировать в Base64', base64_btn:'🔤 Конвертировать', base64_result:'✅ Код Base64',
    pdf_section_title:'Инструменты PDF', pdf_section_sub:'Объединяйте, сжимайте и конвертируйте',
    merge_title:'Объединить PDF', merge_desc:'Объединить несколько PDF', merge_btn:'🔗 Объединить', merge_result:'✅ Объединено', merge_label:'Выберите PDF файлы (несколько)',
    split_title:'Разделить PDF', split_desc:'Извлечь первую страницу', split_btn:'✂️ Разделить', split_result:'✅ Разделено', split_label:'Выберите PDF файл',
    compress_pdf_title:'Сжать PDF', compress_pdf_desc:'Уменьшить размер PDF', compress_pdf_btn:'📦 Сжать', compress_pdf_result:'✅ Сжато', compress_pdf_label:'Выберите PDF файл',
    img2pdf_title:'Изображение в PDF', img2pdf_desc:'Конвертировать PNG в PDF', img2pdf_btn:'📄 Конвертировать', img2pdf_result:'✅ Конвертировано',
    text_section_title:'Текстовые Инструменты', text_section_sub:'Анализируйте и редактируйте текст',
    wordcount_title:'Счётчик Слов', wordcount_desc:'Подсчёт слов в тексте', wordcount_btn:'🔢 Подсчитать', words_label:'Слов',
    charcount_title:'Счётчик Символов', charcount_desc:'Подсчёт символов в тексте', charcount_btn:'🔡 Подсчитать', chars_label:'Символов',
    case_title:'Смена Регистра', case_desc:'ВЕРХНИЙ/нижний регистр', case_btn:'🔠 Конвертировать', case_type_label:'Тип конвертации',
    spaces_title:'Удалить Лишние Пробелы', spaces_desc:'Очистить множественные пробелы', spaces_btn:'🧹 Очистить',
    sort_title:'Сортировка Строк', sort_desc:'Сортировать строки по алфавиту', sort_btn:'🔀 Сортировать', sort_order_label:'Порядок', sort_asc:'По возрастанию (A→Z)', sort_desc_opt:'По убыванию (Z→A)',
    drop_text:'Перетащите или выберите', drop_choose:'Выбрать', drop_png:'Перетащите PNG', drop_choose_png:'Выбрать PNG',
    width_label:'Ширина (px)', height_label:'Высота (px)',
    result_ok:'✅ Результат', download_btn:'⬇ Скачать', download_pdf_btn:'⬇ Скачать PDF', copy_btn:'📋 Копировать',
    text_placeholder:'Вставьте текст сюда...',
    footer:'Сделано с ❤️ · ToolBox © 2025',
    err_no_file:'Пожалуйста выберите файл', err_no_text:'Пожалуйста введите текст', err_no_dims:'Введите ширину и высоту', err_min_files:'Выберите не менее 2 файлов', err_failed:'Ошибка: ',
    copied:'✅ Скопировано',
  },
  pt: {
    name: 'Português', dir: 'ltr',
    nav_image:'🖼️ Imagens', nav_pdf:'📄 PDF', nav_text:'✍️ Texto',
    hero_badge:'✦ Ferramentas Gratuitas & Profissionais', hero_title:'Suas Ferramentas', hero_title2:'Em Um Só Lugar', hero_sub:'Rápido · Preciso · Sem Cadastro',
    img_section_title:'Ferramentas de Imagem', img_section_sub:'Edite e converta imagens facilmente',
    resize_title:'Redimensionar', resize_desc:'Definir nova largura e altura', resize_btn:'⚡ Redimensionar',
    compress_title:'Comprimir Imagem', compress_desc:'Reduzir tamanho do arquivo', compress_btn:'🗜️ Comprimir', compress_result:'✅ Imagem Comprimida',
    convert_title:'Converter Formato', convert_desc:'PNG ↔ JPG e mais', convert_btn:'🔄 Converter', convert_result:'✅ Imagem Convertida', format_label:'Formato destino',
    rotate_title:'Girar Imagem', rotate_desc:'Girar imagem por ângulo', rotate_btn:'🔃 Girar', rotate_result:'✅ Imagem Girada', angle_label:'Ângulo',
    watermark_title:'Marca d\'água', watermark_desc:'Adicionar texto transparente', watermark_btn:'💧 Adicionar', watermark_result:'✅ Imagem com Marca', watermark_label:'Texto da Marca d\'água',
    base64_title:'Imagem para Base64', base64_desc:'Converter imagem em Base64', base64_btn:'🔤 Converter', base64_result:'✅ Código Base64',
    pdf_section_title:'Ferramentas PDF', pdf_section_sub:'Mesclar, comprimir e converter PDFs',
    merge_title:'Mesclar PDF', merge_desc:'Combinar vários PDFs em um', merge_btn:'🔗 Mesclar', merge_result:'✅ Mesclado', merge_label:'Escolher PDFs (múltiplos)',
    split_title:'Dividir PDF', split_desc:'Extrair primeira página', split_btn:'✂️ Dividir', split_result:'✅ Dividido', split_label:'Escolher PDF',
    compress_pdf_title:'Comprimir PDF', compress_pdf_desc:'Reduzir tamanho do PDF', compress_pdf_btn:'📦 Comprimir', compress_pdf_result:'✅ Comprimido', compress_pdf_label:'Escolher PDF',
    img2pdf_title:'Imagem para PDF', img2pdf_desc:'Converter PNG em PDF', img2pdf_btn:'📄 Converter', img2pdf_result:'✅ Convertido',
    text_section_title:'Ferramentas de Texto', text_section_sub:'Analise e edite texto rapidamente',
    wordcount_title:'Contador de Palavras', wordcount_desc:'Contar palavras no texto', wordcount_btn:'🔢 Contar', words_label:'Palavras',
    charcount_title:'Contador de Caracteres', charcount_desc:'Contar caracteres no texto', charcount_btn:'🔡 Contar', chars_label:'Caracteres',
    case_title:'Converter Maiúsculas', case_desc:'MAIÚSCULAS/minúsculas', case_btn:'🔠 Converter', case_type_label:'Tipo de conversão',
    spaces_title:'Remover Espaços Extra', spaces_desc:'Limpar espaços múltiplos', spaces_btn:'🧹 Limpar',
    sort_title:'Ordenar Linhas', sort_desc:'Ordenar linhas alfabeticamente', sort_btn:'🔀 Ordenar', sort_order_label:'Ordem', sort_asc:'Crescente (A→Z)', sort_desc_opt:'Decrescente (Z→A)',
    drop_text:'Arraste ou escolha imagem', drop_choose:'Escolher imagem', drop_png:'Arraste ou escolha PNG', drop_choose_png:'Escolher PNG',
    width_label:'Largura (px)', height_label:'Altura (px)',
    result_ok:'✅ Resultado', download_btn:'⬇ Baixar', download_pdf_btn:'⬇ Baixar PDF', copy_btn:'📋 Copiar',
    text_placeholder:'Cole seu texto aqui...',
    footer:'Feito com ❤️ · ToolBox © 2025',
    err_no_file:'Por favor selecione um arquivo', err_no_text:'Por favor insira texto', err_no_dims:'Insira largura e altura', err_min_files:'Selecione pelo menos 2 arquivos', err_failed:'Erro: ',
    copied:'✅ Copiado',
  },
  ja: {
    name: '日本語', dir: 'ltr',
    nav_image:'🖼️ 画像', nav_pdf:'📄 PDF', nav_text:'✍️ テキスト',
    hero_badge:'✦ 無料＆プロフェッショナルツール', hero_title:'あなたのツール', hero_title2:'一か所に', hero_sub:'高速 · 正確 · 登録不要',
    img_section_title:'画像ツール', img_section_sub:'簡単に画像を編集・変換',
    resize_title:'サイズ変更', resize_desc:'新しい幅と高さを設定', resize_btn:'⚡ サイズ変更',
    compress_title:'画像圧縮', compress_desc:'ファイルサイズを縮小', compress_btn:'🗜️ 圧縮', compress_result:'✅ 圧縮後の画像',
    convert_title:'フォーマット変換', convert_desc:'PNG ↔ JPG など', convert_btn:'🔄 変換', convert_result:'✅ 変換後の画像', format_label:'変換先フォーマット',
    rotate_title:'画像回転', rotate_desc:'角度で画像を回転', rotate_btn:'🔃 回転', rotate_result:'✅ 回転後の画像', angle_label:'角度',
    watermark_title:'透かし', watermark_desc:'透明なテキストを追加', watermark_btn:'💧 追加', watermark_result:'✅ 透かし入り画像', watermark_label:'透かしテキスト',
    base64_title:'画像をBase64に', base64_desc:'画像をBase64文字列に変換', base64_btn:'🔤 変換', base64_result:'✅ Base64コード',
    pdf_section_title:'PDFツール', pdf_section_sub:'PDFを結合・圧縮・変換',
    merge_title:'PDF結合', merge_desc:'複数のPDFを一つに結合', merge_btn:'🔗 結合', merge_result:'✅ 結合完了', merge_label:'PDFファイルを選択（複数可）',
    split_title:'PDF分割', split_desc:'最初のページを抽出', split_btn:'✂️ 分割', split_result:'✅ 分割完了', split_label:'PDFファイルを選択',
    compress_pdf_title:'PDF圧縮', compress_pdf_desc:'PDFファイルサイズを縮小', compress_pdf_btn:'📦 圧縮', compress_pdf_result:'✅ 圧縮完了', compress_pdf_label:'PDFファイルを選択',
    img2pdf_title:'画像をPDFに', img2pdf_desc:'PNG画像をPDFに変換', img2pdf_btn:'📄 変換', img2pdf_result:'✅ 変換完了',
    text_section_title:'テキストツール', text_section_sub:'テキストを素早く分析・編集',
    wordcount_title:'単語数カウンター', wordcount_desc:'テキストの単語数をカウント', wordcount_btn:'🔢 カウント', words_label:'単語',
    charcount_title:'文字数カウンター', charcount_desc:'テキストの文字数をカウント', charcount_btn:'🔡 カウント', chars_label:'文字',
    case_title:'大文字/小文字変換', case_desc:'UPPER/lower変換', case_btn:'🔠 変換', case_type_label:'変換タイプ',
    spaces_title:'余分なスペースを削除', spaces_desc:'複数スペースをクリーンアップ', spaces_btn:'🧹 クリーン',
    sort_title:'行を並び替え', sort_desc:'行をアルファベット順に並び替え', sort_btn:'🔀 並び替え', sort_order_label:'順序', sort_asc:'昇順 (A→Z)', sort_desc_opt:'降順 (Z→A)',
    drop_text:'ドラッグまたは画像を選択', drop_choose:'画像を選択', drop_png:'PNGをドラッグまたは選択', drop_choose_png:'PNGを選択',
    width_label:'幅 (px)', height_label:'高さ (px)',
    result_ok:'✅ 結果', download_btn:'⬇ ダウンロード', download_pdf_btn:'⬇ PDFをダウンロード', copy_btn:'📋 コピー',
    text_placeholder:'テキストをここに貼り付け...',
    footer:'❤️ で作成 · ToolBox © 2025',
    err_no_file:'ファイルを選択してください', err_no_text:'テキストを入力してください', err_no_dims:'幅と高さを入力してください', err_min_files:'2つ以上選択してください', err_failed:'エラー: ',
    copied:'✅ コピーしました',
  },
  ko: {
    name: '한국어', dir: 'ltr',
    nav_image:'🖼️ 이미지', nav_pdf:'📄 PDF', nav_text:'✍️ 텍스트',
    hero_badge:'✦ 무료 & 전문 도구', hero_title:'나의 도구들', hero_title2:'한 곳에서', hero_sub:'빠름 · 정확 · 가입 불필요',
    img_section_title:'이미지 도구', img_section_sub:'이미지를 쉽게 편집하고 변환',
    resize_title:'크기 조정', resize_desc:'새 너비와 높이 설정', resize_btn:'⚡ 크기 조정',
    compress_title:'이미지 압축', compress_desc:'파일 크기 줄이기', compress_btn:'🗜️ 압축', compress_result:'✅ 압축된 이미지',
    convert_title:'형식 변환', convert_desc:'PNG ↔ JPG 등', convert_btn:'🔄 변환', convert_result:'✅ 변환된 이미지', format_label:'대상 형식',
    rotate_title:'이미지 회전', rotate_desc:'각도로 이미지 회전', rotate_btn:'🔃 회전', rotate_result:'✅ 회전된 이미지', angle_label:'각도',
    watermark_title:'워터마크', watermark_desc:'투명 텍스트 추가', watermark_btn:'💧 추가', watermark_result:'✅ 워터마크 이미지', watermark_label:'워터마크 텍스트',
    base64_title:'이미지를 Base64로', base64_desc:'이미지를 Base64로 변환', base64_btn:'🔤 변환', base64_result:'✅ Base64 코드',
    pdf_section_title:'PDF 도구', pdf_section_sub:'PDF 병합, 압축 및 변환',
    merge_title:'PDF 병합', merge_desc:'여러 PDF를 하나로 합치기', merge_btn:'🔗 병합', merge_result:'✅ 병합 완료', merge_label:'PDF 파일 선택 (여러 개)',
    split_title:'PDF 분할', split_desc:'첫 번째 페이지 추출', split_btn:'✂️ 분할', split_result:'✅ 분할 완료', split_label:'PDF 파일 선택',
    compress_pdf_title:'PDF 압축', compress_pdf_desc:'PDF 파일 크기 줄이기', compress_pdf_btn:'📦 압축', compress_pdf_result:'✅ 압축 완료', compress_pdf_label:'PDF 파일 선택',
    img2pdf_title:'이미지를 PDF로', img2pdf_desc:'PNG 이미지를 PDF로 변환', img2pdf_btn:'📄 변환', img2pdf_result:'✅ 변환 완료',
    text_section_title:'텍스트 도구', text_section_sub:'텍스트를 빠르게 분석하고 편집',
    wordcount_title:'단어 수 세기', wordcount_desc:'텍스트의 단어 수 세기', wordcount_btn:'🔢 세기', words_label:'단어',
    charcount_title:'문자 수 세기', charcount_desc:'텍스트의 문자 수 세기', charcount_btn:'🔡 세기', chars_label:'문자',
    case_title:'대소문자 변환', case_desc:'대문자/소문자 변환', case_btn:'🔠 변환', case_type_label:'변환 유형',
    spaces_title:'여분의 공백 제거', spaces_desc:'여러 공백 정리', spaces_btn:'🧹 정리',
    sort_title:'줄 정렬', sort_desc:'텍스트 줄을 알파벳순 정렬', sort_btn:'🔀 정렬', sort_order_label:'순서', sort_asc:'오름차순 (A→Z)', sort_desc_opt:'내림차순 (Z→A)',
    drop_text:'드래그하거나 이미지 선택', drop_choose:'이미지 선택', drop_png:'PNG 드래그 또는 선택', drop_choose_png:'PNG 선택',
    width_label:'너비 (px)', height_label:'높이 (px)',
    result_ok:'✅ 결과', download_btn:'⬇ 다운로드', download_pdf_btn:'⬇ PDF 다운로드', copy_btn:'📋 복사',
    text_placeholder:'텍스트를 여기에 붙여넣기...',
    footer:'❤️ 으로 만든 · ToolBox © 2025',
    err_no_file:'파일을 선택하세요', err_no_text:'텍스트를 입력하세요', err_no_dims:'너비와 높이를 입력하세요', err_min_files:'파일 2개 이상 선택', err_failed:'오류: ',
    copied:'✅ 복사됨',
  },
};

/* ══════════════════════════════════════════════
   I18N Engine
══════════════════════════════════════════════ */
let currentLang = 'ar';

function applyLang(lang) {
  const t = LANGS[lang];
  if (!t) return;
  currentLang = lang;

  // Direction
  document.documentElement.lang = lang;
  document.documentElement.dir  = t.dir;

  // Translate all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update lang button label
  document.getElementById('langCurrent').textContent = t.name;

  // Mark active option
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Save preference
  localStorage.setItem('tb_lang', lang);
}

/* ══════════════════════════════════════════════
   Language Dropdown
══════════════════════════════════════════════ */
const langBtn      = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langBtn.classList.toggle('open');
  langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  langBtn.classList.remove('open');
  langDropdown.classList.remove('open');
});

document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', () => {
    applyLang(opt.dataset.lang);
    langBtn.classList.remove('open');
    langDropdown.classList.remove('open');
  });
});

// Load saved language
const savedLang = localStorage.getItem('tb_lang') || 'ar';
applyLang(savedLang);

/* ══════════════════════════════════════════════
   Helpers
══════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
function t(key) { return LANGS[currentLang]?.[key] || key; }
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
function resetCard(card) { hideEl(getError(card)); hideEl(getResult(card)); }
function animateNum(el, end, dur = 700) {
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / dur, 1);
    el.textContent = Math.round(p * end).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════════════════
   File Drop Setup
══════════════════════════════════════════════ */
document.querySelectorAll('.file-drop').forEach(drop => {
  const input   = document.getElementById(drop.dataset.input);
  const inner   = drop.querySelector('.file-drop-inner');
  const preview = drop.querySelector('.file-preview-wrap');
  const img     = drop.querySelector('.file-preview-img');
  const name    = drop.querySelector('.file-name');

  drop.addEventListener('click', () => input.click());
  input.addEventListener('change', () => { if (input.files[0]) loadPreview(input.files[0]); });
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
    if (img)  img.src = url;
    if (name) name.textContent = file.name;
    hideEl(inner); showEl(preview);
    resetCard(drop.closest('.card'));
  }
});

/* Copy Buttons */
document.addEventListener('click', e => {
  if (e.target.classList.contains('copy-btn')) {
    const ta = e.target.previousElementSibling;
    if (ta && ta.value) {
      navigator.clipboard.writeText(ta.value).then(() => {
        const orig = e.target.textContent;
        e.target.textContent = t('copied');
        setTimeout(() => e.target.textContent = orig, 2000);
      });
    }
  }
});

/* Word live count */
const wordTA = $('wordCountText');
if (wordTA) {
  wordTA.addEventListener('input', () => {
    const tx = wordTA.value;
    const w  = tx.trim() === '' ? 0 : tx.trim().split(/\s+/).length;
    $('wordLive').textContent = `${tx.length} · ${w}`;
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

  resetCard(card);
  btn.disabled = true;
  showEl(loader);

  try {
    switch (action) {
      case 'resize': {
        const file = card.querySelector('input[type=file]').files[0];
        const w = $('resizeW').value, h = $('resizeH').value;
        if (!file)    throw new Error(t('err_no_file'));
        if (!w || !h) throw new Error(t('err_no_dims'));
        const fd = new FormData(); fd.append('image',file); fd.append('width',w); fd.append('height',h);
        showImgResult(card, await postFile(`${API}/api/image/resize`, fd), 'resized.png'); break;
      }
      case 'compress': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('image', file);
        showImgResult(card, await postFile(`${API}/api/image/compress`, fd), 'compressed.jpg'); break;
      }
      case 'convert': {
        const file = card.querySelector('input[type=file]').files[0];
        const fmt  = $('convertFormat').value;
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('image',file); fd.append('format',fmt);
        showImgResult(card, await postFile(`${API}/api/image/convert`, fd), `converted.${fmt}`); break;
      }
      case 'rotate': {
        const file  = card.querySelector('input[type=file]').files[0];
        const angle = $('rotateAngle').value;
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('image',file); fd.append('angle',angle);
        showImgResult(card, await postFile(`${API}/api/image/rotate`, fd), 'rotated.png'); break;
      }
      case 'watermark': {
        const file = card.querySelector('input[type=file]').files[0];
        const text = $('watermarkText').value || 'ToolBox';
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('image',file); fd.append('text',text);
        showImgResult(card, await postFile(`${API}/api/image/watermark`, fd), 'watermarked.png'); break;
      }
      case 'base64': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error(t('err_no_file'));
        const fd  = new FormData(); fd.append('image', file);
        const res = await fetch(`${API}/api/image/base64`, { method:'POST', body:fd });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        result.querySelector('textarea').value = data.base64;
        showEl(result); break;
      }
      case 'merge-pdf': {
        const files = $('mergePdfs').files;
        if (files.length < 2) throw new Error(t('err_min_files'));
        const fd = new FormData();
        Array.from(files).forEach(f => fd.append('pdfs', f));
        showPdfResult(card, await postFile(`${API}/api/pdf/merge`, fd), 'merged.pdf'); break;
      }
      case 'split-pdf': {
        const file = $('splitPdf').files[0];
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('pdf', file);
        showPdfResult(card, await postFile(`${API}/api/pdf/split`, fd), 'split.pdf'); break;
      }
      case 'compress-pdf': {
        const file = $('compressPdf').files[0];
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('pdf', file);
        showPdfResult(card, await postFile(`${API}/api/pdf/compress`, fd), 'compressed.pdf'); break;
      }
      case 'img-to-pdf': {
        const file = card.querySelector('input[type=file]').files[0];
        if (!file) throw new Error(t('err_no_file'));
        const fd = new FormData(); fd.append('image', file);
        showPdfResult(card, await postFile(`${API}/api/pdf/from-image`, fd), 'output.pdf'); break;
      }
      case 'word-count': {
        const text = $('wordCountText').value.trim();
        if (!text) throw new Error(t('err_no_text'));
        const res  = await fetch(`${API}/api/text/word-count`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text}) });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        animateNum(result.querySelector('.stat-value'), data.count);
        showEl(result); break;
      }
      case 'char-count': {
        const text = $('charCountText').value;
        if (!text) throw new Error(t('err_no_text'));
        const res  = await fetch(`${API}/api/text/char-count`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text}) });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        animateNum(result.querySelector('.stat-value'), data.count);
        showEl(result); break;
      }
      case 'convert-case': {
        const text = $('caseText').value;
        const type = $('caseType').value;
        if (!text) throw new Error(t('err_no_text'));
        const res  = await fetch(`${API}/api/text/convert-case`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text,type}) });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        result.querySelector('textarea').value = data.result;
        showEl(result); break;
      }
      case 'remove-spaces': {
        const text = $('spacesText').value;
        if (!text) throw new Error(t('err_no_text'));
        const res  = await fetch(`${API}/api/text/remove-spaces`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text}) });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        result.querySelector('textarea').value = data.result;
        showEl(result); break;
      }
      case 'sort-text': {
        const text  = $('sortText').value;
        const order = $('sortOrder').value;
        if (!text) throw new Error(t('err_no_text'));
        const res  = await fetch(`${API}/api/text/sort`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text,order}) });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const result = getResult(card);
        result.querySelector('textarea').value = data.result;
        showEl(result); break;
      }
    }
  } catch(err) {
    showError(card, err.message);
  } finally {
    btn.disabled = false;
    hideEl(loader);
  }
}

async function postFile(url, fd) {
  const res = await fetch(url, { method:'POST', body:fd });
  if (!res.ok) throw new Error(t('err_failed') + (await res.text() || res.status));
  return await res.blob();
}
function showImgResult(card, blob, name) {
  const result = getResult(card); if (!result) return;
  const url = URL.createObjectURL(blob);
  const img = result.querySelector('.result-image');
  const dl  = result.querySelector('.dl-link');
  if (img) img.src = url;
  if (dl)  { dl.href = url; dl.download = name; }
  showEl(result);
  result.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
function showPdfResult(card, blob, name) {
  const result = getResult(card); if (!result) return;
  const url = URL.createObjectURL(blob);
  const dl  = result.querySelector('.dl-link');
  if (dl) { dl.href = url; dl.download = name; }
  showEl(result);
  result.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
