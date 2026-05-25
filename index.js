const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });


// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Multi Tools Backend is running!');
});
// Multer Setup for file uploads


// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// --- 🖼️ IMAGE TOOLS ---

// 1. Image Resize
app.post('/api/image/resize', upload.single('image'), async (req, res) => {
    try {
        const { width, height } = req.body;
        const buffer = await sharp(req.file.path)
            .resize(parseInt(width), parseInt(height))
            .toBuffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 2. Image Compress
app.post('/api/image/compress', upload.single('image'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.path)
            .jpeg({ quality: 60 })
            .toBuffer();
        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 3. JPG/PNG Convert
app.post('/api/image/convert', upload.single('image'), async (req, res) => {
    try {
        const { format } = req.body; // 'png' or 'jpeg'
        const buffer = await sharp(req.file.path)
            .toFormat(format || 'png')
            .toBuffer();
        res.set('Content-Type', `image/${format || 'png'}`);
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 4. Crop Image
app.post('/api/image/crop', upload.single('image'), async (req, res) => {
    try {
        const { left, top, width, height } = req.body;
        const buffer = await sharp(req.file.path)
            .extract({ 
                left: parseInt(left), 
                top: parseInt(top), 
                width: parseInt(width), 
                height: parseInt(height) 
            })
            .toBuffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 5. Rotate Image
app.post('/api/image/rotate', upload.single('image'), async (req, res) => {
    try {
        const { angle } = req.body;
        const buffer = await sharp(req.file.path)
            .rotate(parseInt(angle) || 90)
            .toBuffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 6. Watermark Tool (Simple Text Watermark)
app.post('/api/image/watermark', upload.single('image'), async (req, res) => {
    try {
        const { text } = req.body;
        const svgImage = `
        <svg width="500" height="100">
          <style>
            .title { fill: rgba(255, 255, 255, 0.5); font-size: 40px; font-weight: bold; }
          </style>
          <text x="50%" y="50%" text-anchor="middle" class="title">${text || 'Watermark'}</text>
        </svg>
        `;
        const buffer = await sharp(req.file.path)
            .composite([{ input: Buffer.from(svgImage), gravity: 'center' }])
            .toBuffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 7. Image to Base64
app.post('/api/image/base64', upload.single('image'), async (req, res) => {
    try {
        const buffer = fs.readFileSync(req.file.path);
        const base64 = buffer.toString('base64');
        const mimeType = req.file.mimetype;
        res.json({ base64: `data:${mimeType};base64,${base64}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 8. Background Remove (Basic Simulation: Grayscale/Threshold)
app.post('/api/image/remove-bg', upload.single('image'), async (req, res) => {
    try {
        // Real BG removal requires AI models, this is a simulation using thresholding
        const buffer = await sharp(req.file.path)
            .threshold(200)
            .toBuffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// --- 📄 PDF TOOLS ---

// 1. Merge PDF
app.post('/api/pdf/merge', upload.array('pdfs', 10), async (req, res) => {
    try {
        const mergedPdf = await PDFDocument.create();
        for (const file of req.files) {
            const pdfBytes = fs.readFileSync(file.path);
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
            fs.unlinkSync(file.path);
        }
        const mergedPdfBytes = await mergedPdf.save();
        res.set('Content-Type', 'application/pdf');
        res.send(Buffer.from(mergedPdfBytes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Split PDF (First page only for demo)
app.post('/api/pdf/split', upload.single('pdf'), async (req, res) => {
    try {
        const pdfBytes = fs.readFileSync(req.file.path);
        const pdf = await PDFDocument.load(pdfBytes);
        const newPdf = await PDFDocument.create();
        const [firstPage] = await newPdf.copyPages(pdf, [0]);
        newPdf.addPage(firstPage);
        const newPdfBytes = await newPdf.save();
        res.set('Content-Type', 'application/pdf');
        res.send(Buffer.from(newPdfBytes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 3. Compress PDF (Simulation: Re-saving with minimal metadata)
app.post('/api/pdf/compress', upload.single('pdf'), async (req, res) => {
    try {
        const pdfBytes = fs.readFileSync(req.file.path);
        const pdf = await PDFDocument.load(pdfBytes);
        const compressedBytes = await pdf.save({ useObjectStreams: true });
        res.set('Content-Type', 'application/pdf');
        res.send(Buffer.from(compressedBytes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// 4. PDF to Image (Placeholder - requires additional native libs like poppler)
app.post('/api/pdf/to-image', upload.single('pdf'), async (req, res) => {
    res.status(501).json({ message: "PDF to Image requires poppler-utils on server. Endpoint ready for integration." });
    if (req.file) fs.unlinkSync(req.file.path);
});

// 5. Image to PDF
app.post('/api/pdf/from-image', upload.single('image'), async (req, res) => {
    try {
        const imgBuffer = fs.readFileSync(req.file.path);
        const pdfDoc = await PDFDocument.create();
        const image = await pdfDoc.embedPng(imgBuffer);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        const pdfBytes = await pdfDoc.save();
        res.set('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

// --- ✍️ TEXT TOOLS ---

// 1. Word Counter
app.post('/api/text/word-count', (req, res) => {
    const { text } = req.body;
    const count = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    res.json({ count });
});

// 2. Character Counter
app.post('/api/text/char-count', (req, res) => {
    const { text } = req.body;
    res.json({ count: text.length });
});

// 3. Case Converter
app.post('/api/text/convert-case', (req, res) => {
    const { text, type } = req.body; // type: 'upper' or 'lower'
    const result = type === 'upper' ? text.toUpperCase() : text.toLowerCase();
    res.json({ result });
});

// 4. Remove Extra Spaces
app.post('/api/text/remove-spaces', (req, res) => {
    const { text } = req.body;
    const result = text.replace(/\s+/g, ' ').trim();
    res.json({ result });
});

// 5. Text Sorter
app.post('/api/text/sort', (req, res) => {
    const { text, order } = req.body; // order: 'asc' or 'desc'
    const lines = text.split('\n');
    const result = lines.sort().join('\n');
    res.json({ result: order === 'desc' ? lines.reverse().join('\n') : result });
});

// Start Server
app.listen(port, () => {
    console.log(`Multi Tools Website Backend running at http://localhost:${port}`);
});
