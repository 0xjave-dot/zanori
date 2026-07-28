/**
 * Patch marketplace.ts:
 *  1. Download missing images for unmapped products (CB2 CDN + Unsplash fallbacks)
 *  2. Replace ALL imageBg + images lines using line-by-line context tracking
 */
import fs   from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE  = '/home/runner/workspace/zanori';
const SRC   = path.join(BASE, 'src/data/marketplace.ts');
const PUB   = path.join(BASE, 'public/furniture');
const UA    = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36';

const SLUG = {
  'Sofas':'sofas','Sectionals':'sectionals','Accent Chairs':'accent-chairs',
  'Coffee Tables':'coffee-tables','Dining Tables':'dining-tables','Dining Chairs':'dining-chairs',
  'Office Chairs':'office-chairs','Office Desks':'office-desks','Beds':'beds',
  'Wardrobes':'wardrobes','TV Consoles':'tv-consoles','Side Tables':'side-tables',
  'Bookshelves':'bookshelves','Cabinets':'cabinets','Dressers':'dressers',
  'Outdoor Furniture':'outdoor-furniture','Lighting':'lighting',
  'Decor':'decor','Storage Furniture':'storage-furniture',
};

// CDN helpers
const cb2    = s => `https://cb2.scene7.com/is/image/CB2/${s}?$web_product_desktop2x$`;
const westelm= s => `https://westelm.scene7.com/is/image/WestelInteriors/${s}?$web-product-desktop2x$`;
const muuto  = s => `https://assets.muuto.com/sf-images/content/products/${s}`;
const hay    = s => `https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/${s}`;

// Per-product known-good CDN or direct URLs (second chance)
const DIRECT = {
  // CB2 (scene7 works)
  'prod-sofa-02':  [cb2('GwynethandNaturalHRVOSSHF22')],
  'prod-sec-02':   [cb2('DeckerSectionalSlateSHF23')],
  'prod-acc-07':   [cb2('AvecChairNaturalLinenSHF22')],
  'prod-cft-01':   [cb2('RoukaCoffeeTblMngSHF22')],
  'prod-dnt-05':   [cb2('RonanRndDiningTblWalnutOakSHF22')],
  'prod-dnc-06':   [cb2('AvecDiningChairNaturalLinenSHF22')],
  'prod-ofd-03':   [cb2('ClybournDeskNaturalMangoPrtNoBar')],
  'prod-bed-03':   [cb2('DuskBedSagebrushGreySHF22')],
  'prod-wrd-03':   [cb2('AspectWardrobeWhiteSHF22')],
  'prod-sdt-03':   [cb2('TraceSideTblMangoBSHF22')],
  'prod-bks-03':   [cb2('StairwayBookshelfWhiteSHF22')],
  'prod-cab-02':   [cb2('FiskCabinetMangoBronzeSHF22')],
  'prod-drs-02':   [cb2('CalebDresserNaturalMangoBrassSHF22')],
  'prod-stg-03':   [cb2('FlexStorageTowerWhiteSHF22')],
  // Muuto (assets CDN)
  'prod-acc-04':   [muuto('rest/rest-lounge-chair-clay-hallingdal-110-muuto.jpg'),
                    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&fit=crop'],
  'prod-cft-03':   [muuto('relate/relate-coffee-table-solid-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop'],
  'prod-dnt-03':   [muuto('workshop/workshop-table-200-solid-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&fit=crop'],
  'prod-dnc-02':   [muuto('fiber/fiber-chair-wood-base-sand-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&fit=crop'],
  'prod-ofd-05':   [muuto('workshop/workshop-table-140-solid-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&fit=crop'],
  'prod-bed-06':   [muuto('outline/outline-daybed-stone-remix-213-stone-remix-213-muuto.jpg'),
                    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&fit=crop'],
  'prod-bks-01':   [muuto('stacked/stacked-2-0-system-3x3-solid-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&fit=crop'],
  'prod-sdt-01':   [muuto('leaf/leaf-side-table-solid-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop'],
  'prod-stg-04':   [muuto('stacked/stacked-2-0-storage-desk-oak-muuto.jpg'),
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&fit=crop'],
  // HAY Cloudinary
  'prod-sec-04':   [hay('products/sofas/carmo/carmo-3-seater-sofa-blue.jpg'),
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&fit=crop'],
  // BoConcept
  'prod-tvc-04':   ['https://assets.boconcept.com/images/products/tv-furniture/bordeaux-tv-media-unit/boconcept-bordeaux-tv-unit-oak.jpg',
                    'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&fit=crop'],
  'prod-cab-04':   ['https://assets.boconcept.com/images/products/sideboards/lugano/boconcept-lugano-sideboard-oak.jpg',
                    'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&fit=crop'],
  // Room & Board
  'prod-sec-06':   ['https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/JasperSectional_topaz_hero.jpg',
                    'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&fit=crop'],
  'prod-bks-06':   ['https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/WoodwindBookcase_oak_hero.jpg',
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop'],
  'prod-drs-04':   ['https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/WoodwindDresser_walnut_hero.jpg',
                    'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&fit=crop'],
  // Crate & Barrel Stacked
  'prod-stg-05':   ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop'],
  // West Elm (direct Unsplash for blocked CDN)
  'prod-dcr-06':   ['https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&fit=crop'],
  // IKEA Kallax
  'prod-stg-07':   ['https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0644757_pe702938_s5.jpg',
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&fit=crop'],
};

function tryDownload(url, dest) {
  try {
    execSync(`curl -s -f -L -o "${dest}" "${url}" --max-time 25 -A "${UA}" --retry 1`, { stdio:'pipe' });
    const info = execSync(`file "${dest}"`, { encoding:'utf-8' });
    if (/(JPEG|PNG|WebP|GIF|image)/i.test(info) && fs.statSync(dest).size > 3000) return true;
    fs.unlinkSync(dest);
    return false;
  } catch { try { fs.unlinkSync(dest); } catch {}; return false; }
}

function optimize(src, dest) {
  try { execSync(`convert "${src}" -resize "1400x1400>" -quality 82 -strip "${dest}"`, { stdio:'pipe' }); return true; }
  catch { try { fs.copyFileSync(src, dest); return true; } catch { return false; } }
}

// ── Step 1: Download missing images ─────────────────────────────────────────
const localMap = {}; // id → /furniture/slug/id.jpg

// Load existing images first
for (const [cat, slug] of Object.entries(SLUG)) {
  const dir = path.join(PUB, slug);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^(prod-[^.]+)\.jpg$/);
    if (m) localMap[m[1]] = `/furniture/${slug}/${f}`;
  }
}
console.log(`Already have ${Object.keys(localMap).length} local images\n`);

// Download missing
for (const [id, urls] of Object.entries(DIRECT)) {
  if (localMap[id]) { console.log(`✓ ${id} (existing)`); continue; }

  // We need the slug – parse from file
  const src = fs.readFileSync(SRC, 'utf-8');
  const m = src.match(new RegExp(`id: '${id}'[\\s\\S]{1,200}?category: '([^']+)'`));
  const cat = m ? m[1] : 'Decor';
  const slug = SLUG[cat] || 'decor';
  const dest = path.join(PUB, slug, `${id}.jpg`);

  let ok = false;
  for (const url of urls) {
    const tmp = dest + '.tmp';
    if (tryDownload(url, tmp)) { ok = optimize(tmp, dest); try{fs.unlinkSync(tmp);}catch{} if(ok) break; }
  }
  if (ok) {
    localMap[id] = `/furniture/${slug}/${id}.jpg`;
    console.log(`✓ ${id} → ${localMap[id]}`);
  } else {
    console.log(`✗ ${id} — failed all URLs`);
  }
}

// ── Step 2: Line-by-line replacement of marketplace.ts ──────────────────────
console.log('\nPatching marketplace.ts line-by-line...');

const text = fs.readFileSync(SRC, 'utf-8');
const lines = text.split('\n');
const out   = [];

let currentId = null;
let currentSlug = null;
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // Track current product ID
  const idM = line.match(/^\s+id:\s*'(prod-[^']+)'/);
  if (idM) currentId = idM[1];

  // Track current category → slug
  const catM = line.match(/^\s+category:\s*'([^']+)'/);
  if (catM) currentSlug = SLUG[catM[1]] || 'decor';

  // Replace imageBg line if we have a local image for this product
  if (/^\s+imageBg:/.test(line) && currentId && localMap[currentId]) {
    const localPath = localMap[currentId];
    const indent = line.match(/^(\s+)/)?.[1] ?? '    ';
    out.push(`${indent}imageBg: \`url('${localPath}') center/cover\`,`);
    i++;
    continue;
  }

  // Replace images: [...] line(s) if we have a local image
  if (/^\s+images:\s*\[/.test(line) && currentId && localMap[currentId]) {
    const localPath = localMap[currentId];
    const indent = line.match(/^(\s+)/)?.[1] ?? '    ';
    // Consume lines until we find the closing ']'
    let j = i;
    while (j < lines.length && !lines[j].includes(']')) j++;
    // Emit single-element array on one line
    out.push(`${indent}images: ['${localPath}'],`);
    i = j + 1; // skip to line after ']'
    continue;
  }

  out.push(line);
  i++;
}

fs.writeFileSync(SRC, out.join('\n'), 'utf-8');

// ── Step 3: Verify ───────────────────────────────────────────────────────────
const final = fs.readFileSync(SRC, 'utf-8');
const cdnLeft   = (final.match(/imageBg:.*\$\{(cb2|westelm|crate|pb|rh|hm|hay|muuto|ikea)\(/g)||[]).length;
const localCount= (final.match(/imageBg:.*\/furniture\//g)||[]).length;
const directUrl = (final.match(/imageBg:.*url\('https:/g)||[]).length;

console.log(`\n=== DONE ===`);
console.log(`imageBg with local path  : ${localCount}`);
console.log(`imageBg with CDN template: ${cdnLeft}`);
console.log(`imageBg with direct https: ${directUrl}`);
console.log(`Total products: ${(final.match(/^\s+id: 'prod-/gm)||[]).length}`);
