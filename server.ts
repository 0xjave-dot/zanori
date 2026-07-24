import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

// ESM-compatible __dirname (compiled to CJS by esbuild, but source is ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// ── API routes ─────────────────────────────────────────────────────────────
// This endpoint is called by the RoomRenderer.tsx component
app.post('/api/reimagine', async (req, res) => {
  console.log('Received request to /api/reimagine');
  const { image, style } = req.body;

  if (!image || !style) {
    return res.status(400).json({ error: 'Image and style are required.' });
  }

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockDesignReport = {
    style_name: style,
    headline: `A stunning ${style} transformation!`,
    palette: ['#F5F4F0', '#8B6F52', '#2A2520', '#A9BBC8'],
    palette_names: ['Sand', 'Wood', 'Bark', 'Muted Blue'],
    furniture_suggestions: [
      { piece: 'Lund queen bed', reason: 'Complements the minimalist aesthetic.' },
      { piece: 'Oslo 3-seater sofa', reason: 'Adds comfort and Scandinavian charm.' },
    ],
    designer_note: `This design embodies the essence of ${style}, blending natural elements with modern sophistication.`,
  };

  res.json(mockDesignReport);
});

// ── Static file serving (production SPA) ──────────────────────────────────
// Serve the Vite build output.  When running `node dist/server.cjs` from the
// project root the built assets live in ./dist; from inside dist/ they live in ./.
// We try __dirname first (works when CWD is anything) then fall back to CWD/dist.
const distDir = path.join(__dirname, '..', 'dist');          // project-root/dist  (when run as dist/server.cjs)
const distDirAlt = path.join(process.cwd(), 'dist');         // fallback

// Serve static assets (JS, CSS, images …)
app.use(express.static(distDir));
app.use(express.static(distDirAlt));

// SPA catch-all: for any non-API request return index.html so client-side
// hash routing (/#/admin, /#/work, …) works after a hard-refresh.
app.get('*', (_req, res) => {
  // Try both locations for index.html
  const indexHtml = path.join(distDir, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.sendFile(path.join(distDirAlt, 'index.html'), (err2) => {
        if (err2) res.status(404).send('Not found');
      });
    }
  });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
