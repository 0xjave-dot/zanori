import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

// ESM-compatible __dirname (esbuild compiles to CJS; it handles import.meta.url correctly)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// ── Admin login ──────────────────────────────────────────────────────────────
// Verifies the submitted passcode against the bcrypt-style scrypt hash stored
// in the ADMIN_PASSWORD_HASH environment variable (never committed to the repo).
//
// Hash format:  <16-byte-salt-hex>:<64-byte-hash-hex>
// Generate with: node -e "
//   const c = require('crypto');
//   const salt = c.randomBytes(16).toString('hex');
//   const h = c.scryptSync('<PASSWORD>', salt, 64).toString('hex');
//   console.log(salt+':'+h);
// "
app.post('/api/admin/login', async (req, res) => {
  const { passcode } = req.body as { passcode?: string };
  if (!passcode || typeof passcode !== 'string') {
    return res.status(400).json({ ok: false, error: 'Passcode required.' });
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash) {
    console.error('ADMIN_PASSWORD_HASH env var is not set — admin login is disabled.');
    return res.status(503).json({ ok: false, error: 'Admin authentication is not configured on this server.' });
  }

  const parts = storedHash.split(':');
  if (parts.length !== 2) {
    console.error('ADMIN_PASSWORD_HASH has an unexpected format (expected salt:hash).');
    return res.status(503).json({ ok: false, error: 'Admin authentication misconfigured.' });
  }

  const [salt, expectedHex] = parts;
  try {
    const inputHash = await new Promise<Buffer>((resolve, reject) =>
      crypto.scrypt(passcode.trim(), salt, 64, (err, key) => (err ? reject(err) : resolve(key)))
    );
    const expectedBuf = Buffer.from(expectedHex, 'hex');
    // Use timingSafeEqual to prevent timing attacks
    const match = inputHash.length === expectedBuf.length &&
      crypto.timingSafeEqual(inputHash, expectedBuf);

    if (match) {
      res.json({ ok: true });
    } else {
      res.status(401).json({ ok: false, error: 'Incorrect passcode. Access denied.' });
    }
  } catch {
    res.status(500).json({ ok: false, error: 'Login error. Please try again.' });
  }
});

// ── AI room reimagine ────────────────────────────────────────────────────────
app.post('/api/reimagine', async (req, res) => {
  console.log('Received request to /api/reimagine');
  const { image, style } = req.body;

  if (!image || !style) {
    return res.status(400).json({ error: 'Image and style are required.' });
  }

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
// The Vite build outputs to ./dist; the server bundle is also in ./dist.
// When started as `node dist/server.cjs` from the project root:
//   process.cwd()  = project root
//   __dirname      = project root/dist
// Both distDir variants resolve to the same folder.
const distDir = path.join(__dirname, '..', 'dist');
const distDirAlt = path.join(process.cwd(), 'dist');

app.use(express.static(distDir));
app.use(express.static(distDirAlt));

// SPA catch-all: hash routing (/#/admin etc.) is client-side — the server just
// needs to return index.html for any non-API path.
app.get('*', (_req, res) => {
  const indexHtml = path.join(distDir, 'index.html');
  res.sendFile(indexHtml, (err) => {
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
