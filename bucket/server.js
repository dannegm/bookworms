import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mime from 'mime';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IS_DEV = process.env.NODE_ENV === 'development';

const BUCKET_DIR = path.resolve(process.env.BUCKET_DIR ?? path.join(__dirname, 'bucket'));

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

const ALLOWED_EXTENSIONS = (process.env.ALLOWED_EXTENSIONS ?? 'webp')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

if (IS_DEV) {
    console.log(`Bucket dir: ${BUCKET_DIR}`);
}

app.get('/bucket/:filename', (req, res) => {
    if (!IS_DEV) {
        const origin = req.headers['origin'] ?? req.headers['referer'] ?? '';
        const allowed = ALLOWED_ORIGINS.some(o => origin.includes(o));
        if (!allowed) return res.status(403).json({ error: 'Forbidden' });
    }

    const { filename } = req.params;

    if (!/^[\w\-. ]+$/.test(filename)) {
        return res.status(400).json({ error: 'Invalid filename' });
    }

    const ext = path.extname(filename).slice(1).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return res.status(415).json({ error: 'File type not allowed' });
    }

    const filePath = path.join(BUCKET_DIR, filename);

    if (!filePath.startsWith(BUCKET_DIR)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

    const stat = fs.statSync(filePath);
    res.setHeader('Content-Type', mime.getType(filename) ?? 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Cache-Control', 'public, max-age=86400');

    fs.createReadStream(filePath).pipe(res);
});

const PORT = process.env.PORT ?? 3100;
app.listen(PORT, () => console.log(`Running on :${PORT}`));
