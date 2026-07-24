import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

// ESM-compatible __dirname (esbuild compiles this to CJS and handles import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// ── AI room reimagine ────────────────────────────────────────────────────────
// Called by RoomRenderer.tsx to generate a design report for a room image.
app.post('/api/reimagine', async (req, res) => {
  const { image, style } = req.body;
  if (!image || !style) {
    return res.status(400).json({ error: 'Image and style are required.' });
  }

  // Simulated AI processing — replace with a real Gemini call when ready.
  await new Promise(resolve => setTimeout(resolve, 2000));

  res.json({
    style_name: style,
    headline: `A stunning ${style} transformation!`,
    palette: ['#F5F4F0', '#8B6F52', '#2A2520', '#A9BBC8'],
    palette_names: ['Sand', 'Wood', 'Bark', 'Muted Blue'],
    furniture_suggestions: [
      { piece: 'Lund queen bed', reason: 'Complements the minimalist aesthetic.' },
      { piece: 'Oslo 3-seater sofa', reason: 'Adds comfort and Scandinavian charm.' },
    ],
    designer_note: `This design embodies the essence of ${style}, blending natural elements with modern sophistication.`,
  });
});

// ── Static file serving (production SPA) ────────────────────────────────────
// Admin authentication is handled by Firebase Authentication — no server-side
// secret storage is needed. The Vite build goes to ./dist; the server bundle
// is also emitted there by esbuild.
const distDir = path.join(__dirname, '..', 'dist');
const distDirAlt = path.join(process.cwd(), 'dist');

app.use(express.static(distDir));
app.use(express.static(distDirAlt));

// SPA catch-all: hash routing (/#/admin etc.) is fully client-side — just
// return index.html for any non-API path.
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(distDirAlt, 'index.html'), (err2) => {
        if (err2) res.status(404).send('Not found');
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
