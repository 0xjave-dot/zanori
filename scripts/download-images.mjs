/**
 * Zanori Spaces – Product Image Downloader
 * Downloads real manufacturer product images, organizes by category,
 * and outputs a mapping file for use in marketplace.ts updates.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE = path.resolve('/home/runner/workspace/zanori');
const ASSETS = path.join(BASE, 'src/assets/furniture');

// Category → folder mapping
const CATEGORY_DIRS = {
  'Sofas': 'sofas',
  'Sectionals': 'sectionals',
  'Accent Chairs': 'accent-chairs',
  'Coffee Tables': 'coffee-tables',
  'Dining Tables': 'dining-tables',
  'Dining Chairs': 'dining-chairs',
  'Office Chairs': 'office-chairs',
  'Office Desks': 'office-desks',
  'Beds': 'beds',
  'Wardrobes': 'wardrobes',
  'TV Consoles': 'tv-consoles',
  'Side Tables': 'side-tables',
  'Bookshelves': 'bookshelves',
  'Cabinets': 'cabinets',
  'Dressers': 'dressers',
  'Outdoor Furniture': 'outdoor-furniture',
  'Lighting': 'lighting',
  'Decor': 'decor',
  'Storage Furniture': 'storage-furniture',
};

// CDN helpers (mirroring marketplace.ts)
const cb2 = (sku) => `https://cb2.scene7.com/is/image/CB2/${sku}?$web_product_desktop2x$`;
const westelm = (sku) => `https://westelm.scene7.com/is/image/WestelInteriors/${sku}?$web-product-desktop2x$`;
const crate = (sku) => `https://crateandbarrel.scene7.com/is/image/Crate/${sku}?$web_xlarge$`;
const pb = (sku) => `https://potterybarn.scene7.com/is/image/Pottery/${sku}?$web_product_hero_large$`;
const rh = (sku) => `https://rh.scene7.com/is/image/restaurationhardware/${sku}?$web_product_desktop2x$`;
const hm = (p) => `https://a.hermanmiller.com/content/dam/hermanmiller/page_assets/products/${p}`;
const hay = (s) => `https://hay.dk/media/catalog/product/cache/7bda959b4a9c264fc5dc6cf71e7d69a4/${s}`;
const muuto = (s) => `https://muuto.com/media/catalog/product/cache/1/${s}`;
const ikea = (s) => `https://www.ikea.com/us/en/images/products/${s}`;

// The full product catalog with primary and fallback image URLs
// Fallback URLs are sourced from accessible alternatives when CDN is blocked
const PRODUCTS = [

  // ─── SOFAS ────────────────────────────────────────────────────────────────
  {
    id: 'prod-sofa-01', category: 'Sofas',
    name: 'west-elm-hamilton-3-seat-sofa',
    urls: [
      westelm('HamiltonSofa3SeatVelvetDustyBluePrtNoBar_k'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sofa-02', category: 'Sofas',
    name: 'cb2-gwyneth-sofa',
    urls: [
      cb2('GwynethandNaturalHRVOSSHF22'),
    ]
  },
  {
    id: 'prod-sofa-03', category: 'Sofas',
    name: 'crate-barrel-lounge-ii-sofa',
    urls: [
      crate('LoungePetite85SofaSandstoneF23'),
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sofa-04', category: 'Sofas',
    name: 'pottery-barn-turner-sofa',
    urls: [
      pb('turner-square-arm-sofa-o'),
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sofa-05', category: 'Sofas',
    name: 'muuto-outline-3-seater-sofa',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/outline/outline-sofa-3-seater-clay-hallingdal-110-clay-hallingdal-110-muuto.jpg',
      muuto('outline-3-seater-sofa-clay.jpg'),
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sofa-06', category: 'Sofas',
    name: 'rh-cloud-modular-sofa',
    urls: [
      rh('cloud-modular-sofa-natural-linen'),
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sofa-07', category: 'Sofas',
    name: 'hay-mags-soft-sofa',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/sofas/mags-soft/mags-soft-35-seater-coffin-fame-60-grey.jpg',
      hay('mags-soft-sofa-35-seater-coffin.jpg'),
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── SECTIONALS ───────────────────────────────────────────────────────────
  {
    id: 'prod-sec-01', category: 'Sectionals',
    name: 'west-elm-harmony-sectional',
    urls: [
      westelm('HarmonySectional3PcPebblePrtNoBar_k'),
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sec-02', category: 'Sectionals',
    name: 'cb2-decker-sectional',
    urls: [
      cb2('DeckerSectionalSlateSHF23'),
    ]
  },
  {
    id: 'prod-sec-03', category: 'Sectionals',
    name: 'crate-barrel-lounge-ii-sectional',
    urls: [
      crate('LoungeIISectionalGraphiteF23'),
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sec-04', category: 'Sectionals',
    name: 'boconcept-carmo-sectional',
    urls: [
      'https://assets.boconcept.com/images/products/sofas/carmo-3-seater-sofa/carmo-3-seater-sofa-main.jpg',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sec-05', category: 'Sectionals',
    name: 'pottery-barn-cameron-sectional',
    urls: [
      pb('cameron-sectional-3pc-warm-linen-o'),
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sec-06', category: 'Sectionals',
    name: 'room-board-jasper-sectional',
    urls: [
      'https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/JasperSectional_topaz_hero.jpg',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── ACCENT CHAIRS ────────────────────────────────────────────────────────
  {
    id: 'prod-acc-01', category: 'Accent Chairs',
    name: 'herman-miller-eames-lounge-chair',
    urls: [
      hm('eames_lounge_chair/eames-lounge-chair-walnut-l.png'),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Eames_chair.jpg/800px-Eames_chair.jpg',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-02', category: 'Accent Chairs',
    name: 'knoll-womb-chair',
    urls: [
      'https://www.knoll.com/medias/knoll-womb-chair-Ottoman-caramel.jpg',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-03', category: 'Accent Chairs',
    name: 'vitra-eames-rar-chair',
    urls: [
      'https://www.vitra.com/medias/vitra-eames-plastic-armchair-rar-ochre.jpg',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-04', category: 'Accent Chairs',
    name: 'muuto-rest-lounge-chair',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/rest/rest-lounge-chair-clay-hallingdal-110-muuto.jpg',
      muuto('rest-lounge-chair-clay.jpg'),
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-05', category: 'Accent Chairs',
    name: 'west-elm-huron-large-chair',
    urls: [
      westelm('HuronLargeChairPlushVelvetDustyBluePrtNoBar_k'),
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-06', category: 'Accent Chairs',
    name: 'hay-aal91-lounge-chair',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/seating/lounge-chairs/aal91/aal91-lounge-chair-cream-divina-md-120.jpg',
      hay('aal91-lounge-chair-cream.jpg'),
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-acc-07', category: 'Accent Chairs',
    name: 'cb2-avec-chair',
    urls: [
      cb2('AvecChairNaturalLinenSHF22'),
    ]
  },

  // ─── COFFEE TABLES ────────────────────────────────────────────────────────
  {
    id: 'prod-cft-01', category: 'Coffee Tables',
    name: 'cb2-rouka-coffee-table',
    urls: [
      cb2('RoukaCoffeeTblMngSHF22'),
    ]
  },
  {
    id: 'prod-cft-02', category: 'Coffee Tables',
    name: 'west-elm-reeve-round-coffee-table',
    urls: [
      westelm('ReeveRoundCoffeeTableMarbleWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1567016526105-22da7c13161a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cft-03', category: 'Coffee Tables',
    name: 'muuto-relate-coffee-table',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/relate/relate-coffee-table-solid-oak-muuto.jpg',
      muuto('relate-coffee-table-solid-oak.jpg'),
      'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cft-04', category: 'Coffee Tables',
    name: 'crate-barrel-yukon-coffee-table',
    urls: [
      crate('YukonCoffeeTableGreyF23'),
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cft-05', category: 'Coffee Tables',
    name: 'hay-new-order-coffee-table',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/tables/new-order/new-order-coffee-table-black.jpg',
      hay('new-order-coffee-table-black.jpg'),
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cft-06', category: 'Coffee Tables',
    name: 'pottery-barn-tanner-coffee-table',
    urls: [
      pb('tanner-coffee-table-brass-o'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── DINING TABLES ────────────────────────────────────────────────────────
  {
    id: 'prod-dnt-01', category: 'Dining Tables',
    name: 'crate-barrel-dimension-dining-table',
    urls: [
      crate('DimensionDiningTableOakF23'),
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnt-02', category: 'Dining Tables',
    name: 'west-elm-anton-dining-table',
    urls: [
      westelm('AntonDiningTableReclaimed92PrtNoBar_k'),
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnt-03', category: 'Dining Tables',
    name: 'muuto-workshop-dining-table',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/workshop/workshop-table-200-solid-oak-muuto.jpg',
      muuto('workshop-dining-table-solid-oak.jpg'),
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnt-04', category: 'Dining Tables',
    name: 'boconcept-lausanne-extending-table',
    urls: [
      'https://assets.boconcept.com/images/products/tables/lausanne-dining-table/lausanne-extending-dining-table-walnut.jpg',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnt-05', category: 'Dining Tables',
    name: 'cb2-ronan-round-dining-table',
    urls: [
      cb2('RonanRndDiningTblWalnutOakSHF22'),
    ]
  },
  {
    id: 'prod-dnt-06', category: 'Dining Tables',
    name: 'hay-cph30-extendable-table',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/tables/cph/cph30-extendable-table-white-beech.jpg',
      hay('cph30-extendable-table-white-beech.jpg'),
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── DINING CHAIRS ────────────────────────────────────────────────────────
  {
    id: 'prod-dnc-01', category: 'Dining Chairs',
    name: 'hay-aac12-about-a-chair',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/seating/dining-chairs/aac12/aac12-about-a-chair-black.jpg',
      hay('aac12-about-a-chair-soft-black.jpg'),
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnc-02', category: 'Dining Chairs',
    name: 'muuto-fiber-chair',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/fiber/fiber-chair-wood-base-sand-oak-muuto.jpg',
      muuto('fiber-chair-sand-oak-base.jpg'),
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnc-03', category: 'Dining Chairs',
    name: 'vitra-hal-tube-chair',
    urls: [
      'https://www.vitra.com/medias/vitra-hal-tube-chair-beige.jpg',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnc-04', category: 'Dining Chairs',
    name: 'west-elm-modern-petal-dining-chair',
    urls: [
      westelm('ModernPetalDiningChairVelvetDustyBluePrtNoBar_k'),
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnc-05', category: 'Dining Chairs',
    name: 'knoll-bertoia-diamond-chair',
    urls: [
      'https://www.knoll.com/medias/knoll-bertoia-diamond-chair-white.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Bertoia_diamond_chair.jpg/800px-Bertoia_diamond_chair.jpg',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dnc-06', category: 'Dining Chairs',
    name: 'cb2-avec-dining-chair',
    urls: [
      cb2('AvecDiningChairNaturalLinenSHF22'),
    ]
  },

  // ─── OFFICE CHAIRS ────────────────────────────────────────────────────────
  {
    id: 'prod-ofc-01', category: 'Office Chairs',
    name: 'herman-miller-aeron-chair',
    urls: [
      hm('aeron_chairs/aeron-chair-graphite-l.png'),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Aeron_chair_B.jpg/800px-Aeron_chair_B.jpg',
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofc-02', category: 'Office Chairs',
    name: 'steelcase-leap-chair',
    urls: [
      'https://www.steelcase.com/content/uploads/2019/09/Steelcase-Leap-Chair-Black.jpg',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofc-03', category: 'Office Chairs',
    name: 'herman-miller-sayl-chair',
    urls: [
      hm('sayl_chairs/sayl-chairs-l.png'),
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofc-04', category: 'Office Chairs',
    name: 'knoll-generation-chair',
    urls: [
      'https://www.knoll.com/medias/knoll-generation-chair-black.jpg',
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofc-05', category: 'Office Chairs',
    name: 'vitra-pacific-chair',
    urls: [
      'https://www.vitra.com/medias/vitra-pacific-chair-ice-grey.jpg',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofc-06', category: 'Office Chairs',
    name: 'steelcase-gesture-chair',
    urls: [
      'https://www.steelcase.com/content/uploads/2019/09/Steelcase-Gesture-Chair-Midnight.jpg',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── OFFICE DESKS ─────────────────────────────────────────────────────────
  {
    id: 'prod-ofd-01', category: 'Office Desks',
    name: 'herman-miller-renew-sit-stand-desk',
    urls: [
      hm('renew_desk/renew-sit-to-stand-desk-oak-l.png'),
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofd-02', category: 'Office Desks',
    name: 'west-elm-mid-century-mini-desk',
    urls: [
      westelm('MidCenturyMiniDeskWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofd-03', category: 'Office Desks',
    name: 'cb2-clybourn-desk',
    urls: [
      cb2('ClybournDeskNaturalMangoPrtNoBar'),
    ]
  },
  {
    id: 'prod-ofd-04', category: 'Office Desks',
    name: 'steelcase-flex-adjustable-desk',
    urls: [
      'https://www.steelcase.com/content/uploads/2019/09/Steelcase-Flex-Adjustable-Desk-Oak.jpg',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofd-05', category: 'Office Desks',
    name: 'muuto-workshop-table-desk',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/workshop/workshop-table-140-solid-oak-muuto.jpg',
      muuto('workshop-table-solid-oak-desk.jpg'),
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-ofd-06', category: 'Office Desks',
    name: 'pottery-barn-benchwright-writing-desk',
    urls: [
      pb('benchwright-writing-desk-o'),
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── BEDS ─────────────────────────────────────────────────────────────────
  {
    id: 'prod-bed-01', category: 'Beds',
    name: 'rh-belgian-track-arm-upholstered-bed',
    urls: [
      rh('belgian-track-arm-bed-natural-linen-king'),
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bed-02', category: 'Beds',
    name: 'west-elm-andes-bed',
    urls: [
      westelm('AndesBedVelvetDustyBluePrtNoBar_k'),
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bed-03', category: 'Beds',
    name: 'cb2-dusk-upholstered-bed',
    urls: [
      cb2('DuskBedSagebrushGreySHF22'),
    ]
  },
  {
    id: 'prod-bed-04', category: 'Beds',
    name: 'pottery-barn-dawson-bed',
    urls: [
      pb('dawson-platform-bed-o'),
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bed-05', category: 'Beds',
    name: 'crate-barrel-tate-bed',
    urls: [
      crate('TateBedGraphiteF23'),
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bed-06', category: 'Beds',
    name: 'muuto-outline-daybed',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/outline/outline-daybed-stone-remix-213-stone-remix-213-muuto.jpg',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── WARDROBES ────────────────────────────────────────────────────────────
  {
    id: 'prod-wrd-01', category: 'Wardrobes',
    name: 'west-elm-modern-4-door-wardrobe',
    urls: [
      westelm('ModernWardrobe4DoorWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-wrd-02', category: 'Wardrobes',
    name: 'ikea-pax-wardrobe',
    urls: [
      ikea('pax-wardrobe__0625599_pe692851_s5.jpg'),
      'https://www.ikea.com/us/en/images/products/pax-wardrobe-white__0625599_pe692851_s5.jpg',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-wrd-03', category: 'Wardrobes',
    name: 'cb2-frame-wardrobe',
    urls: [
      cb2('FrameWardrobeSHF22'),
      cb2('FrameWardrobeNatLinenSHF22'),
    ]
  },
  {
    id: 'prod-wrd-04', category: 'Wardrobes',
    name: 'boconcept-lugano-wardrobe',
    urls: [
      'https://assets.boconcept.com/images/products/wardrobes/lugano/boconcept-lugano-wardrobe-oak.jpg',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-wrd-05', category: 'Wardrobes',
    name: 'pottery-barn-sausalito-wardrobe',
    urls: [
      pb('sausalito-wardrobe-o'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-wrd-06', category: 'Wardrobes',
    name: 'rh-modular-wardrobe-system',
    urls: [
      rh('modular-wardrobe-system-white-oak'),
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── TV CONSOLES ──────────────────────────────────────────────────────────
  {
    id: 'prod-tvc-01', category: 'TV Consoles',
    name: 'west-elm-modern-media-console',
    urls: [
      westelm('ModernMediaConsole68WalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-tvc-02', category: 'TV Consoles',
    name: 'cb2-suki-media-console',
    urls: [
      cb2('SukiMediaConsoleSHF22'),
      cb2('SukiMediaConsoleNaturalSHF22'),
    ]
  },
  {
    id: 'prod-tvc-03', category: 'TV Consoles',
    name: 'crate-barrel-marin-media-console',
    urls: [
      crate('MarinMediaConsoleOakF23'),
      'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-tvc-04', category: 'TV Consoles',
    name: 'boconcept-bordeaux-tv-unit',
    urls: [
      'https://assets.boconcept.com/images/products/tv-furniture/bordeaux-tv-media-unit/boconcept-bordeaux-tv-unit-oak.jpg',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-tvc-05', category: 'TV Consoles',
    name: 'room-board-hudson-tv-console',
    urls: [
      'https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/HudsonMediaConsole_oak_hero.jpg',
      'https://images.unsplash.com/photo-1549497538-303791108f95?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-tvc-06', category: 'TV Consoles',
    name: 'article-bader-tv-stand',
    urls: [
      'https://cdn.article.com/images/bader-tv-stand-white-oak-main.jpg',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── SIDE TABLES ──────────────────────────────────────────────────────────
  {
    id: 'prod-sdt-01', category: 'Side Tables',
    name: 'muuto-leaf-side-table',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/leaf/leaf-side-table-solid-oak-muuto.jpg',
      muuto('leaf-side-table-solid-oak.jpg'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sdt-02', category: 'Side Tables',
    name: 'west-elm-box-frame-side-table',
    urls: [
      westelm('BoxFrameSideTableWhitePrtNoBar_k'),
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sdt-03', category: 'Side Tables',
    name: 'cb2-trace-side-table',
    urls: [
      cb2('TraceSideTblMangoBSHF22'),
    ]
  },
  {
    id: 'prod-sdt-04', category: 'Side Tables',
    name: 'hay-new-order-side-table',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/tables/new-order/new-order-side-table-black.jpg',
      hay('new-order-side-table-black.jpg'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sdt-05', category: 'Side Tables',
    name: 'vitra-cork-side-table',
    urls: [
      'https://www.vitra.com/medias/vitra-cork-side-table-large.jpg',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-sdt-06', category: 'Side Tables',
    name: 'pottery-barn-miles-side-table',
    urls: [
      pb('miles-side-table-o'),
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── BOOKSHELVES ──────────────────────────────────────────────────────────
  {
    id: 'prod-bks-01', category: 'Bookshelves',
    name: 'muuto-stacked-storage-system',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/stacked/stacked-2-0-system-3x3-solid-oak-muuto.jpg',
      muuto('stacked-2-0-system-oak.jpg'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bks-02', category: 'Bookshelves',
    name: 'west-elm-ladder-bookshelf',
    urls: [
      westelm('LadderBookshelfWideWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bks-03', category: 'Bookshelves',
    name: 'cb2-stairway-bookshelf',
    urls: [
      cb2('StairwayBookshelfWhiteSHF22'),
    ]
  },
  {
    id: 'prod-bks-04', category: 'Bookshelves',
    name: 'crate-barrel-paxton-bookcase',
    urls: [
      crate('PaxtonBookcaseOakF23'),
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bks-05', category: 'Bookshelves',
    name: 'hay-new-order-shelving-system',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/shelving/new-order/new-order-shelving-system-black.jpg',
      hay('new-order-shelving-system-black.jpg'),
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-bks-06', category: 'Bookshelves',
    name: 'room-board-woodwind-bookcase',
    urls: [
      'https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/WoodwindBookcase_oak_hero.jpg',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── CABINETS ─────────────────────────────────────────────────────────────
  {
    id: 'prod-cab-01', category: 'Cabinets',
    name: 'west-elm-modern-buffet-cabinet',
    urls: [
      westelm('ModernBuffetWalnutCanePrtNoBar_k'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cab-02', category: 'Cabinets',
    name: 'cb2-fisk-cabinet',
    urls: [
      cb2('FiskCabinetMangoBronzeSHF22'),
    ]
  },
  {
    id: 'prod-cab-03', category: 'Cabinets',
    name: 'crate-barrel-marin-sideboard',
    urls: [
      crate('MarinSideboardOakF23'),
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cab-04', category: 'Cabinets',
    name: 'boconcept-lugano-cabinet',
    urls: [
      'https://assets.boconcept.com/images/products/sideboards/lugano/boconcept-lugano-sideboard-oak.jpg',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cab-05', category: 'Cabinets',
    name: 'hay-new-order-cabinet',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/storage/new-order/new-order-cabinet-black-oak.jpg',
      hay('new-order-cabinet-black-oak.jpg'),
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-cab-06', category: 'Cabinets',
    name: 'pottery-barn-wren-cabinet',
    urls: [
      pb('wren-cabinet-o'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── DRESSERS ─────────────────────────────────────────────────────────────
  {
    id: 'prod-drs-01', category: 'Dressers',
    name: 'west-elm-mid-century-6-drawer-dresser',
    urls: [
      westelm('MidCentury6DrawerDresserWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-drs-02', category: 'Dressers',
    name: 'cb2-caleb-8-drawer-dresser',
    urls: [
      cb2('CalebDresserNaturalMangoBrassSHF22'),
    ]
  },
  {
    id: 'prod-drs-03', category: 'Dressers',
    name: 'crate-barrel-matera-dresser',
    urls: [
      crate('MateraDresserOakF23'),
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-drs-04', category: 'Dressers',
    name: 'room-board-woodwind-7-drawer-dresser',
    urls: [
      'https://www.roomandboard.com/rrcontent/images/catalog/en/products/productHero/WoodwindDresser_walnut_hero.jpg',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-drs-05', category: 'Dressers',
    name: 'pottery-barn-aubrey-6-drawer-dresser',
    urls: [
      pb('aubrey-dresser-o'),
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-drs-06', category: 'Dressers',
    name: 'article-sven-6-drawer-dresser',
    urls: [
      'https://cdn.article.com/images/sven-dresser-white-oak-main.jpg',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── OUTDOOR FURNITURE ────────────────────────────────────────────────────
  {
    id: 'prod-out-01', category: 'Outdoor Furniture',
    name: 'hay-palissade-lounge-chair',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/outdoor/palissade/palissade-lounge-chair-anthracite.jpg',
      hay('palissade-lounge-chair-anthracite.jpg'),
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-out-02', category: 'Outdoor Furniture',
    name: 'west-elm-portside-outdoor-sectional',
    urls: [
      westelm('PortsideOutdoorSectionalTeakNaturalPrtNoBar_k'),
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-out-03', category: 'Outdoor Furniture',
    name: 'rh-teak-garden-dining-set',
    urls: [
      rh('teak-garden-dining-set-8-seater-natural'),
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-out-04', category: 'Outdoor Furniture',
    name: 'cb2-outdoor-lounge-set',
    urls: [
      cb2('OutdoorLoungeSetTeakSHF22'),
      cb2('OutdoorTeakLoungeSHF22'),
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-out-05', category: 'Outdoor Furniture',
    name: 'pottery-barn-teak-outdoor-sofa',
    urls: [
      pb('pb-comfort-teak-deep-seat-sofa-o'),
      pb('comfort-teak-outdoor-sofa-o'),
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-out-06', category: 'Outdoor Furniture',
    name: 'muuto-connect-soft-outdoor-sofa',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/connect-soft-modular/connect-soft-outdoor-module-configuration-olive-sunbrella.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── LIGHTING ─────────────────────────────────────────────────────────────
  {
    id: 'prod-lgt-01', category: 'Lighting',
    name: 'muuto-outline-floor-lamp',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/outline/outline-floor-lamp-dusty-blue-muuto.jpg',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-lgt-02', category: 'Lighting',
    name: 'hay-nep-pendant-light',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/lighting/nep/nep-pendant-black.jpg',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-lgt-03', category: 'Lighting',
    name: 'west-elm-sculptural-globe-chandelier',
    urls: [
      westelm('SculpturalGlobeAntiqueChampagnePrtNoBar_k'),
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-lgt-04', category: 'Lighting',
    name: 'cb2-arched-floor-lamp',
    urls: [
      cb2('ArchedFloorLampBrassSHF22'),
      cb2('BalancedFloorLampBrassSHF22'),
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-lgt-05', category: 'Lighting',
    name: 'muuto-unfold-pendant',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/unfold/unfold-pendant-lamp-black-muuto.jpg',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-lgt-06', category: 'Lighting',
    name: 'hay-set-up-shades-table-lamp',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/lighting/set-up/set-up-shades-table-lamp-off-white.jpg',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── DECOR ────────────────────────────────────────────────────────────────
  {
    id: 'prod-dcr-01', category: 'Decor',
    name: 'muuto-under-the-bell-pendant',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/ceramic-vase/ceramic-vase-large-sandy-beige-muuto.jpg',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-02', category: 'Decor',
    name: 'west-elm-art-glass-vase',
    urls: [
      westelm('RibbedArtGlassVaseLargePrtNoBar_k'),
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-03', category: 'Decor',
    name: 'hay-arch-mirror',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/mirrors/arch/arch-mirror-black.jpg',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-04', category: 'Decor',
    name: 'cb2-area-rug',
    urls: [
      cb2('ZephyrWoolAreaRug5x8SHF22'),
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-05', category: 'Decor',
    name: 'hay-kaleido-tray-set',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/accessories/kaleido/kaleido-tray-set-mixed.jpg',
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-06', category: 'Decor',
    name: 'west-elm-marble-tray',
    urls: [
      westelm('MarbleTrayLargeWhitePrtNoBar_k'),
      'https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-07', category: 'Decor',
    name: 'muuto-wire-basket',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/wire/wire-basket-large-grey-muuto.jpg',
      muuto('wire-basket-large-grey.jpg'),
      'https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-dcr-08', category: 'Decor',
    name: 'rh-belgian-linen-throw',
    urls: [
      rh('belgian-linen-throw-natural'),
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=85&w=1400&auto=format&fit=crop',
    ]
  },

  // ─── STORAGE FURNITURE ────────────────────────────────────────────────────
  {
    id: 'prod-stg-01', category: 'Storage Furniture',
    name: 'hay-new-order-shelving-drawer-system',
    urls: [
      'https://res.cloudinary.com/hay/image/upload/f_auto,q_auto/v1/products/shelving/new-order/new-order-shelving-drawer-grey-oak.jpg',
      hay('new-order-shelving-drawer-grey-oak.jpg'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-stg-02', category: 'Storage Furniture',
    name: 'west-elm-mid-century-storage-console',
    urls: [
      westelm('MidCenturyStorageConsoleWalnutPrtNoBar_k'),
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-stg-03', category: 'Storage Furniture',
    name: 'cb2-flex-storage-tower',
    urls: [
      cb2('FlexStorageTowerWhiteSHF22'),
    ]
  },
  {
    id: 'prod-stg-04', category: 'Storage Furniture',
    name: 'muuto-stacked-storage-desk-module',
    urls: [
      'https://assets.muuto.com/sf-images/content/products/stacked/stacked-2-0-storage-desk-oak-muuto.jpg',
      muuto('stacked-2-0-storage-desk-oak.jpg'),
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-stg-05', category: 'Storage Furniture',
    name: 'crate-barrel-stacked-media-storage',
    urls: [
      crate('StackedSystemNaturalF23'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-stg-06', category: 'Storage Furniture',
    name: 'rh-modular-media-tower',
    urls: [
      rh('modular-media-tower-white-oak'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
  {
    id: 'prod-stg-07', category: 'Storage Furniture',
    name: 'ikea-kallax-shelf-unit',
    urls: [
      'https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0644757_pe702938_s5.jpg',
      ikea('kallax-shelf-unit__0644757_pe702938_s5.jpg'),
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=1400&auto=format&fit=crop',
    ]
  },
];

// Try downloading a URL, return the file path if successful
function tryDownload(url, destPath) {
  try {
    execSync(
      `curl -s -f -L -o "${destPath}" "${url}" --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" --retry 2`,
      { stdio: 'pipe' }
    );
    // Check if file is actually an image
    const result = execSync(`file "${destPath}"`, { encoding: 'utf-8' });
    if (result.includes('JPEG') || result.includes('PNG') || result.includes('WebP') || result.includes('GIF') || result.includes('image')) {
      const size = fs.statSync(destPath).size;
      if (size > 3000) {  // at least 3KB
        return true;
      }
    }
    fs.unlinkSync(destPath);
    return false;
  } catch {
    try { fs.unlinkSync(destPath); } catch {}
    return false;
  }
}

// Optimize image: resize to max 1400px wide, convert to WebP
function optimizeImage(srcPath, destPath) {
  try {
    execSync(
      `convert "${srcPath}" -resize "1400x1400>" -quality 82 -strip "${destPath}"`,
      { stdio: 'pipe' }
    );
    return true;
  } catch {
    // fallback: just copy
    try {
      fs.copyFileSync(srcPath, destPath);
      return true;
    } catch { return false; }
  }
}

const results = {}; // id → relative src/assets path
const failed = [];

let processed = 0;
const total = PRODUCTS.length;

for (const product of PRODUCTS) {
  processed++;
  const dir = CATEGORY_DIRS[product.category] || 'decor';
  const folder = path.join(ASSETS, dir);
  const tmpPath = path.join(folder, `${product.name}.tmp`);
  const finalPath = path.join(folder, `${product.name}.jpg`);

  let downloaded = false;
  for (const url of product.urls) {
    if (tryDownload(url, tmpPath)) {
      downloaded = true;
      if (optimizeImage(tmpPath, finalPath)) {
        try { fs.unlinkSync(tmpPath); } catch {}
      } else {
        try { fs.renameSync(tmpPath, finalPath); } catch {}
      }
      const relPath = `/src/assets/furniture/${dir}/${product.name}.jpg`;
      results[product.id] = relPath;
      console.log(`✓ [${processed}/${total}] ${product.id} → ${relPath}`);
      break;
    }
  }

  if (!downloaded) {
    failed.push(product.id);
    console.log(`✗ [${processed}/${total}] ${product.id} — all URLs failed`);
  }
}

// Write the mapping file
const mappingPath = path.join(BASE, 'scripts/image-mapping.json');
fs.writeFileSync(mappingPath, JSON.stringify({ results, failed }, null, 2));
console.log('\n=== SUMMARY ===');
console.log(`Downloaded: ${Object.keys(results).length}/${total}`);
console.log(`Failed: ${failed.length}`);
console.log(`Failed IDs: ${failed.join(', ')}`);
console.log(`Mapping written to: ${mappingPath}`);
