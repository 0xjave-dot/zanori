/**
 * Zanori Spaces – Marketplace Updater
 * 1. Parses every product from marketplace.ts
 * 2. Downloads the primary image for each product (CDN → og:image fallback)
 * 3. Saves to public/furniture/<category-slug>/<product-id>.jpg
 * 4. Rewrites marketplace.ts to reference local paths
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE  = '/home/runner/workspace/zanori';
const SRC   = path.join(BASE, 'src/data/marketplace.ts');
const PUB   = path.join(BASE, 'public/furniture');
const UA    = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

// ── CDN helpers (mirror of marketplace.ts) ──────────────────────────────────
const CDN = {
  cb2:    s => `https://cb2.scene7.com/is/image/CB2/${s}?$web_product_desktop2x$`,
  westelm:s => `https://westelm.scene7.com/is/image/WestelInteriors/${s}?$web-product-desktop2x$`,
  crate:  s => `https://crateandbarrel.scene7.com/is/image/Crate/${s}?$web_xlarge$`,
  pb:     s => `https://potterybarn.scene7.com/is/image/Pottery/${s}?$web_product_hero_large$`,
  rh:     s => `https://rh.scene7.com/is/image/restaurationhardware/${s}?$web_product_desktop2x$`,
  hm:     s => `https://a.hermanmiller.com/content/dam/hermanmiller/page_assets/products/${s}`,
  hay:    s => `https://hay.dk/media/catalog/product/cache/7bda959b4a9c264fc5dc6cf71e7d69a4/${s}`,
  muuto:  s => `https://muuto.com/media/catalog/product/cache/1/${s}`,
  ikea:   s => `https://www.ikea.com/us/en/images/products/${s}`,
};

// ── Category → public folder ─────────────────────────────────────────────────
const SLUG = {
  'Sofas':              'sofas',
  'Sectionals':         'sectionals',
  'Accent Chairs':      'accent-chairs',
  'Coffee Tables':      'coffee-tables',
  'Dining Tables':      'dining-tables',
  'Dining Chairs':      'dining-chairs',
  'Office Chairs':      'office-chairs',
  'Office Desks':       'office-desks',
  'Beds':               'beds',
  'Wardrobes':          'wardrobes',
  'TV Consoles':        'tv-consoles',
  'Side Tables':        'side-tables',
  'Bookshelves':        'bookshelves',
  'Cabinets':           'cabinets',
  'Dressers':           'dressers',
  'Outdoor Furniture':  'outdoor-furniture',
  'Lighting':           'lighting',
  'Decor':              'decor',
  'Storage Furniture':  'storage-furniture',
};

// ── Curated fallback images per product ID ───────────────────────────────────
// Using Unsplash for products whose CDN is inaccessible and no og:image works.
// These are REAL furniture photos (not AI-generated), chosen to match the product type.
const FALLBACKS = {
  // Sofas
  'prod-sofa-01': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  'prod-sofa-03': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1400&fit=crop',
  'prod-sofa-04': 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&fit=crop',
  'prod-sofa-05': 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=85&w=1400&fit=crop',
  'prod-sofa-06': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=85&w=1400&fit=crop',
  'prod-sofa-07': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&fit=crop',
  // Sectionals
  'prod-sec-01': 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&fit=crop',
  'prod-sec-03': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1400&fit=crop',
  'prod-sec-05': 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&fit=crop',
  // Accent chairs
  'prod-acc-01': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&fit=crop',
  'prod-acc-02': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&fit=crop',
  'prod-acc-03': 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&fit=crop',
  'prod-acc-05': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&fit=crop',
  // Coffee tables
  'prod-cft-02': 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?q=85&w=1400&fit=crop',
  'prod-cft-04': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&fit=crop',
  'prod-cft-06': 'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop',
  // Dining tables
  'prod-dnt-01': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=85&w=1400&fit=crop',
  'prod-dnt-02': 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=85&w=1400&fit=crop',
  'prod-dnt-04': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=85&w=1400&fit=crop',
  'prod-dnt-06': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&fit=crop',
  // Dining chairs
  'prod-dnc-01': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&fit=crop',
  'prod-dnc-03': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&fit=crop',
  'prod-dnc-04': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&fit=crop',
  'prod-dnc-05': 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&fit=crop',
  // Office chairs
  'prod-ofc-01': 'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&fit=crop',
  'prod-ofc-02': 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=85&w=1400&fit=crop',
  'prod-ofc-03': 'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&fit=crop',
  'prod-ofc-04': 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=85&w=1400&fit=crop',
  'prod-ofc-05': 'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&fit=crop',
  'prod-ofc-06': 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=85&w=1400&fit=crop',
  // Office desks
  'prod-ofd-01': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&fit=crop',
  'prod-ofd-02': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&fit=crop',
  'prod-ofd-04': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&fit=crop',
  'prod-ofd-06': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&fit=crop',
  // Beds
  'prod-bed-01': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=1400&fit=crop',
  'prod-bed-02': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=85&w=1400&fit=crop',
  'prod-bed-04': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&fit=crop',
  'prod-bed-05': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&fit=crop',
  // Wardrobes
  'prod-wrd-01': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&fit=crop',
  'prod-wrd-02': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  'prod-wrd-04': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&fit=crop',
  'prod-wrd-05': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=85&w=1400&fit=crop',
  'prod-wrd-06': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&fit=crop',
  // TV consoles
  'prod-tvc-01': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  'prod-tvc-02': 'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop',
  'prod-tvc-03': 'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop',
  'prod-tvc-05': 'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop',
  'prod-tvc-06': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  // Side tables
  'prod-sdt-02': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1400&fit=crop',
  'prod-sdt-05': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop',
  'prod-sdt-06': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1400&fit=crop',
  // Bookshelves
  'prod-bks-02': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&fit=crop',
  'prod-bks-04': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&fit=crop',
  // Cabinets
  'prod-cab-01': 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&fit=crop',
  'prod-cab-03': 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&fit=crop',
  'prod-cab-06': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  // Dressers
  'prod-drs-01': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&fit=crop',
  'prod-drs-03': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&fit=crop',
  'prod-drs-05': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&fit=crop',
  'prod-drs-06': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&fit=crop',
  // Outdoor
  'prod-out-02': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=85&w=1400&fit=crop',
  'prod-out-03': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=1400&fit=crop',
  'prod-out-04': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&fit=crop',
  'prod-out-05': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=85&w=1400&fit=crop',
  'prod-out-06': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1400&fit=crop',
  // Lighting
  'prod-lgt-01': 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=85&w=1400&fit=crop',
  'prod-lgt-02': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&fit=crop',
  'prod-lgt-03': 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=85&w=1400&fit=crop',
  'prod-lgt-04': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&fit=crop',
  'prod-lgt-05': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop',
  'prod-lgt-06': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&fit=crop',
  'prod-lgt-07': 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=85&w=1400&fit=crop',
  // Decor
  'prod-dcr-01': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=85&w=1400&fit=crop',
  'prod-dcr-02': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=85&w=1400&fit=crop',
  'prod-dcr-03': 'https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&fit=crop',
  'prod-dcr-04': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop',
  'prod-dcr-07': 'https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&fit=crop',
  'prod-dcr-08': 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=85&w=1400&fit=crop',
  'prod-dcr-09': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=85&w=1400&fit=crop',
  'prod-dcr-10': 'https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&fit=crop',
  // Storage
  'prod-stg-02': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&fit=crop',
  'prod-stg-06': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop',
};

// ── Try downloading a URL ────────────────────────────────────────────────────
function tryDownload(url, dest) {
  try {
    execSync(
      `curl -s -f -L -o "${dest}" "${url}" --max-time 25 -A "${UA}" --retry 1`,
      { stdio: 'pipe' }
    );
    const info = execSync(`file "${dest}"`, { encoding: 'utf-8' });
    if (/(JPEG|PNG|WebP|GIF|image)/i.test(info)) {
      const size = fs.statSync(dest).size;
      if (size > 3000) return true;
    }
    try { fs.unlinkSync(dest); } catch {}
    return false;
  } catch {
    try { fs.unlinkSync(dest); } catch {}
    return false;
  }
}

// Try fetching og:image from a product page
function fetchOgImage(pageUrl) {
  try {
    const html = execSync(
      `curl -s -L -A "${UA}" --max-time 20 "${pageUrl}" 2>/dev/null | grep -i 'og:image' | head -5`,
      { encoding: 'utf-8' }
    );
    const m = html.match(/content=["']([^"']+\.(jpg|png|webp)[^"']*)/i);
    return m ? m[1] : null;
  } catch { return null; }
}

// Optimize: resize + strip metadata
function optimize(src, dest) {
  try {
    execSync(`convert "${src}" -resize "1400x1400>" -quality 82 -strip "${dest}"`, { stdio: 'pipe' });
    return true;
  } catch {
    try { fs.copyFileSync(src, dest); return true; } catch { return false; }
  }
}

// ── Parse marketplace.ts to extract product blocks ──────────────────────────
function parseProducts(src) {
  const products = [];
  // Match full product blocks { id: 'prod-...', ... }
  const blockRe = /\{\s*id:\s*'(prod-[^']+)'[\s\S]*?(?=\n  \{|\n\s*\/\/|$)/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const block = m[0];
    const id = m[1];

    // Extract category
    const catM = block.match(/category:\s*'([^']+)'/);
    const category = catM ? catM[1] : 'Decor';
    const slug = SLUG[category] || 'decor';

    // Extract imageBg value (the URL inside url('...'))
    const bgM = block.match(/imageBg:\s*`url\('([\s\S]*?)'\)/);
    const bgRaw = bgM ? bgM[1] : '';

    // Extract images array
    const imgsM = block.match(/images:\s*\[([\s\S]*?)\]/);
    const imgsRaw = imgsM ? imgsM[1] : '';

    // Extract sourceUrl
    const srcM = block.match(/sourceUrl:\s*'([^']+)'/);
    const sourceUrl = srcM ? srcM[1] : '';

    products.push({ id, category, slug, bgRaw, imgsRaw, sourceUrl });
  }
  return products;
}

// Resolve a raw image string (may contain CDN template literals or direct URLs)
function resolveUrl(raw) {
  // Handle CDN template literals like ${westelm('...')}
  const cdnM = raw.match(/\$\{(\w+)\(['"]([^'"]+)['"]\)\}/);
  if (cdnM) {
    const fn = CDN[cdnM[1]];
    if (fn) return fn(cdnM[2]);
    return null;
  }
  // Handle direct URLs
  if (raw.startsWith('http')) return raw;
  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────
const source = fs.readFileSync(SRC, 'utf-8');
const products = parseProducts(source);
console.log(`Parsed ${products.length} products from marketplace.ts\n`);

const mapping = {}; // id → public path  e.g.  /furniture/sofas/prod-sofa-01.jpg

for (const p of products) {
  const destDir = path.join(PUB, p.slug);
  const dest    = path.join(destDir, `${p.id}.jpg`);
  const pubPath = `/furniture/${p.slug}/${p.id}.jpg`;

  if (fs.existsSync(dest) && fs.statSync(dest).size > 3000) {
    mapping[p.id] = pubPath;
    console.log(`✓ ${p.id} (cached)`);
    continue;
  }

  let ok = false;

  // 1. Try primary CDN URL
  const primaryUrl = resolveUrl(p.bgRaw);
  if (primaryUrl) {
    const tmp = dest + '.tmp';
    if (tryDownload(primaryUrl, tmp)) {
      ok = optimize(tmp, dest);
      try { fs.unlinkSync(tmp); } catch {}
    }
  }

  // 2. Try alternative: extract first URL from images array
  if (!ok) {
    const urlsInArray = [];
    const urlRe = /`url\('([^']+)'\)`|'(https?:\/\/[^']+)'/g;
    let um;
    while ((um = urlRe.exec(p.imgsRaw)) !== null) {
      urlsInArray.push(um[1] || um[2]);
    }
    // Also try resolving CDN helpers in images array
    const cdnRe = /\$\{(\w+)\(['"]([^'"]+)['"]\)\}/g;
    let cm;
    while ((cm = cdnRe.exec(p.imgsRaw)) !== null) {
      const fn = CDN[cm[1]];
      if (fn) urlsInArray.push(fn(cm[2]));
    }
    for (const url of urlsInArray) {
      const tmp = dest + '.tmp';
      if (tryDownload(url, tmp)) {
        ok = optimize(tmp, dest);
        try { fs.unlinkSync(tmp); } catch {}
        if (ok) break;
      }
    }
  }

  // 3. Try fetching og:image from sourceUrl
  if (!ok && p.sourceUrl) {
    const ogUrl = fetchOgImage(p.sourceUrl);
    if (ogUrl) {
      const tmp = dest + '.tmp';
      if (tryDownload(ogUrl, tmp)) {
        ok = optimize(tmp, dest);
        try { fs.unlinkSync(tmp); } catch {}
      }
    }
  }

  // 4. Use curated Unsplash fallback
  if (!ok && FALLBACKS[p.id]) {
    const tmp = dest + '.tmp';
    if (tryDownload(FALLBACKS[p.id], tmp)) {
      ok = optimize(tmp, dest);
      try { fs.unlinkSync(tmp); } catch {}
    }
  }

  if (ok) {
    mapping[p.id] = pubPath;
    console.log(`✓ ${p.id} → ${pubPath}`);
  } else {
    console.log(`✗ ${p.id} — no image found`);
  }
}

// ── Rewrite marketplace.ts ───────────────────────────────────────────────────
console.log('\nUpdating marketplace.ts...');
let updated = source;

for (const [id, localPath] of Object.entries(mapping)) {
  // Replace imageBg template literal — the URL inside url('...')
  // Pattern: imageBg: `url('${...}') center/cover`  or  imageBg: `url('https://...') center/cover`
  // We want to replace with a simple string literal
  const bgPattern = new RegExp(
    `(imageBg:\\s*\`)url\\('[^']*'\\)\\s*center\\/cover(\`)`,
    'g'
  );

  // We need to replace the specific product's imageBg, not all at once.
  // Build per-product regex by matching the block with the product id first.
  const productBlockRe = new RegExp(
    `(id:\\s*'${id}'[\\s\\S]*?imageBg:\\s*\`)url\\('[^']*'\\)(\\s*center\\/cover\`)`,
    'g'
  );
  updated = updated.replace(productBlockRe, (match, pre, post) => {
    return `${pre}url('${localPath}')${post}`;
  });

  // Replace images array – both template-literal CDN calls and direct URLs
  // Pattern: images: [${fn('sku')}]  or  images: ['https://...']
  // We want: images: ['<localPath>']
  const imagesBlockRe = new RegExp(
    `(id:\\s*'${id}'[\\s\\S]*?images:\\s*\\[)([^\\]]*)(\\])`,
    'g'
  );
  updated = updated.replace(imagesBlockRe, (match, pre, _content, post) => {
    return `${pre}'${localPath}'${post}`;
  });
}

// Write the updated file
fs.writeFileSync(SRC, updated, 'utf-8');
console.log(`\nmarketplace.ts updated. ${Object.keys(mapping).length} products mapped.`);

// Write summary
const summary = {
  total: products.length,
  mapped: Object.keys(mapping).length,
  unmapped: products.filter(p => !mapping[p.id]).map(p => p.id),
  mapping,
};
fs.writeFileSync(path.join(BASE, 'scripts/final-mapping.json'), JSON.stringify(summary, null, 2));
console.log('Summary written to scripts/final-mapping.json');
