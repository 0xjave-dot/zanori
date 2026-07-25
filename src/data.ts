import { ServiceItem, Project, Product, TestimonialItem, DesignShowcaseItem } from './types';
import { CURATED_PRODUCTS_DATA, CURATED_DESIGN_SHOWCASE_DATA } from './data/marketplace';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'space-styling',
    number: '03',
    name: 'SPACE STYLING / SOFT FURNISHINGS',
    description: 'We specialize in the meticulous selection and arrangement of soft furnishings, art, and decorative objects. This service enhances the aesthetic appeal and comfort of your space, ensuring every detail complements the overall design.',
    imageBg: "url('https://images.unsplash.com/photo-1616486341351-702534f40f0c?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'design-consultation',
    number: '02',
    name: 'DESIGN CONSULTATION',
    description: 'Receive expert advice on optimizing your space. Our consultations cover floor plan analysis, lighting strategies, color schemes, and material selection, providing you with a clear roadmap for your interior design project.',
    imageBg: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'quality-furniture',
    number: '04',
    name: 'FURNITURE',
    description: 'Explore our curated collection of high-quality furniture pieces. We offer sourcing, supply, and installation of bespoke and ready-made items, focusing on durability, comfort, and timeless design.',
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: '3d-design',
    number: '05',
    name: '3D VISUALIZATION',
    description: 'Experience your future space before it\'s built. Our 3D visualization service provides photorealistic renders and virtual walkthroughs, allowing you to confirm design choices, material textures, and lighting scenarios with precision.',
    imageBg: "url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop') center/cover",
    isSignature: true
  },
  {
    id: 'full-comprehensive-interior-design',
    number: '01',
    name: 'FULL COMPREHENSIVE INTERIOR DESIGN',
    description: 'Our signature service covers every aspect of your interior project, from initial concept development and architectural planning to material selection, custom furniture design, and final installation. We manage the entire process to deliver a cohesive, luxurious, and fully functional space tailored to your vision.',
    imageBg: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop') center/cover",
    isSignature: true
  },
  {
    id: 'exterior-design',
    number: '06',
    name: 'EXTERIOR DESIGN',
    description: 'Extend your design aesthetic beyond the walls. Our exterior design service focuses on creating beautiful and functional outdoor spaces, including landscape planning, facade enhancements, and outdoor living area concepts.',
    imageBg: "url('https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=2000&auto=format&fit=crop') center/cover"
  }
];

export const PORTFOLIO_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Ikori Penthouse Residence',
    category: 'Homes',
    location: 'Ikoyi, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture'],
    description: 'A full residential fit-out for a penthouse spanning the top two floors of a high-rise in Ikoyi. The brief demanded a home that was simultaneously a sanctuary from city life and an environment capable of hosting Lagos\u0027s most demanding social calendars. Our response centred on a palette of pale limestone, bleached European oak, and aged brass — materials that absorb natural light from the panoramic floor-to-ceiling glazing without competing with it. Every furniture piece was specified at a scale that acknowledged the double-volume living area rather than shrinking from it. Custom millwork hid the home\u0027s technical infrastructure — AV systems, HVAC controls, motorised blinds — behind surfaces that read purely as architecture. The result is a residence that functions with the quiet efficiency of a five-star hotel suite and the warmth of a carefully considered private home.',
    imageBg: "url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop') center/cover",
    isFeatured: true
  },
  {
    id: 'proj-2',
    title: 'Victoria Island Corporate HQ',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    servicesUsed: ['Design Consultation', '3D Interior Design'],
    description: 'The headquarters of a pan-African financial services group occupying four floors of a VI tower. The design brief was precise: an environment that would communicate global competence to visiting institutional clients while remaining a genuinely productive workspace for 200-plus staff across open-plan floors, enclosed offices, and the executive suite. We developed a spatial language built on deep charcoal, warm white, and controlled wood accents — a palette serious enough for the boardroom but relaxed enough to prevent the open floors from feeling institutional. Acoustic performance was a primary concern; every material and furniture specification was evaluated against noise attenuation data before procurement. The result is a headquarters that operates at exceptional ambient noise levels despite its density, and presents a visual identity confident enough to represent the brand without explanation.',
    imageBg: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-3',
    title: 'Lekki Phase 1 Family Home',
    category: 'Homes',
    location: 'Lekki Phase 1, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture', 'Design Consultation'],
    description: 'A four-bedroom family home in Lekki that required a complete interior redesign around a family of five with three young children. The challenge was to deliver a home that would photograph beautifully — the client is a prominent lifestyle personality — while surviving the genuine physical demands of active family living. We specified performance fabrics across all soft furnishings, selected porcelain floor tiles with a coefficient of friction appropriate for young children, and designed a modular toy and book storage system within the open-plan family room that the clients could reconfigure as the children grew. Despite these functional priorities, the finished home reads as effortlessly composed; the durability decisions are invisible in the final result.',
    imageBg: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop') center/cover",
    isFeatured: true
  },
  {
    id: 'proj-4',
    title: 'Eko Atlantic Executive Office',
    category: 'Designs',
    location: 'Eko Atlantic, Lagos',
    servicesUsed: ['3D Interior Design', 'Design Consultation'],
    description: 'Located within one of Eko Atlantic\'s landmark glass towers, this executive office suite demanded a level of precision that matched the building\'s own architectural ambition. The brief called for an environment that would project authority without austerity — a space where senior leadership could conduct high-stakes negotiations and where visiting clients would immediately understand the calibre of the organisation they were dealing with. Our process began with a solar path analysis of the floor\'s specific orientation, mapping the movement of direct light across the slab throughout the working day to determine optimal placement for workstations, lounge alcoves, and the primary boardroom. Furniture finishes were drawn from the exterior curtain wall\'s cool silver-grey and bronze tones, creating a visual continuity between inside and outside that amplifies the tower\'s commanding views. All material and lighting configurations were finalised through digital simulation before any procurement was authorised, a discipline that eliminated guesswork and delivered a space that performed exactly as modelled from day one.',
    imageBg: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-5',
    title: 'Banana Island Salon and Spa Lounge',
    category: 'Commercial',
    location: 'Banana Island, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture'],
    description: 'Wellness environments carry a particular design responsibility: they must deliver genuine calm to clients who arrive already seeking relief, while simultaneously withstanding the relentless physical demands of a high-footfall commercial operation. This Banana Island salon and spa lounge was designed to resolve that tension without compromise. Travertine basins and stone-effect wall panels were specified not only for their visual serenity but for their imperviousness to the moisture, chemical exposure, and surface friction that rapidly age lesser materials in treatment environments. Modular storage units were configured to absorb the operational complexity of a full-service salon — tools, product inventory, client records — behind a composed facade of light oak cabinetry that reads as effortlessly residential rather than clinically utilitarian. Every upholstered piece was selected from commercial-grade ranges capable of sustaining thousands of seating cycles without visible degradation, ensuring that the considered atmosphere we created on opening day remains intact years into the life of the business.',
    imageBg: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop') center/cover"
  }
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: 'The online visualization was the moment everything clicked. I could see exactly what my living room would become, and they brought it to life down to the exact wood grains and furniture.',
    client: 'Toheerah D.',
    project: 'Lekki Phase 1 Family Home',
  },
  {
    quote: 'Their design consultation saved us months of expensive construction mistakes. They styled our photography lounge with an incredible balance of light and warmth.',
    client: 'Daniel A.',
    project: 'Banana Island Salon and Spa Lounge',
  },
  {
    quote: 'Zanori Spaces\' pieces are heirloom quality. Hard to believe anyone can consistently deliver furniture of such quality everytime. The 3-seater and King Bed changed the entire energy of our home into a serene and restorative place.',
    client: 'Kurosaki O.',
    project: 'Ikori Penthouse Residence',
  }
];

// ─── FURNITURE PRODUCT CATALOG ────────────────────────────────────────────────
// Comprehensive curated product range across all categories.
// All prices in Nigerian Naira (NGN). Images sourced from Unsplash.

const LEGACY_PRODUCTS_DATA: Product[] = [

  // ── SOFAS ──────────────────────────────────────────────────────────────────

  {
    id: 'prod-s01',
    category: 'Sofas',
    name: 'Oslo cloud 3-seater sofa',
    price: 720000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa',
    isNew: true
  },
  {
    id: 'prod-s02',
    category: 'Sofas',
    name: 'Stavanger L-shaped sectional',
    price: 1850000,
    imageBg: "url('https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa',
    isNew: true
  },
  {
    id: 'prod-s03',
    category: 'Sofas',
    name: 'Bergen modular corner sofa',
    price: 2400000,
    imageBg: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa'
  },
  {
    id: 'prod-s04',
    category: 'Sofas',
    name: 'Malmö velvet loveseat',
    price: 850000,
    imageBg: "url('https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa',
    isNew: true
  },
  {
    id: 'prod-s05',
    category: 'Sofas',
    name: 'Fjord accent reading chair',
    price: 380000,
    imageBg: "url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa'
  },
  {
    id: 'prod-s06',
    category: 'Sofas',
    name: 'Ålesund deep-seat sectional',
    price: 3200000,
    imageBg: "url('https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'sofa'
  },

  // ── TABLES ─────────────────────────────────────────────────────────────────

  {
    id: 'prod-t01',
    category: 'Tables',
    name: 'Bergen solid oak dining table',
    price: 780000,
    imageBg: "url('https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table',
    isNew: true
  },
  {
    id: 'prod-t02',
    category: 'Tables',
    name: 'Trondheim marble coffee table',
    price: 420000,
    imageBg: "url('https://images.unsplash.com/photo-1567016526105-22da7c13161a?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table',
    isNew: true
  },
  {
    id: 'prod-t03',
    category: 'Tables',
    name: 'Kiel brass-inlay side table',
    price: 185000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table'
  },
  {
    id: 'prod-t04',
    category: 'Tables',
    name: 'Lund extendable dining table',
    price: 1050000,
    imageBg: "url('https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table'
  },
  {
    id: 'prod-t05',
    category: 'Tables',
    name: 'Oslo walnut console table',
    price: 340000,
    imageBg: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table'
  },
  {
    id: 'prod-t06',
    category: 'Tables',
    name: 'Ålesund nesting side tables (set of 3)',
    price: 265000,
    imageBg: "url('https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table'
  },
  {
    id: 'prod-t07',
    category: 'Tables',
    name: 'Fjord round pedestal dining table',
    price: 620000,
    imageBg: "url('https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'table'
  },

  // ── BEDS ───────────────────────────────────────────────────────────────────

  {
    id: 'prod-b01',
    category: 'Beds',
    name: 'Lund upholstered queen bed',
    price: 680000,
    imageBg: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'bed',
    isNew: true
  },
  {
    id: 'prod-b02',
    category: 'Beds',
    name: 'Bergen platform king bed',
    price: 960000,
    imageBg: "url('https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'bed',
    isNew: true
  },
  {
    id: 'prod-b03',
    category: 'Beds',
    name: 'Oslo storage bed with drawers',
    price: 1180000,
    imageBg: "url('https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'bed'
  },
  {
    id: 'prod-b04',
    category: 'Beds',
    name: 'Stavanger solid wood bed frame',
    price: 750000,
    imageBg: "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'bed'
  },
  {
    id: 'prod-b05',
    category: 'Beds',
    name: 'Fjord daybed with trundle',
    price: 580000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'bed'
  },

  // ── SHELVING ───────────────────────────────────────────────────────────────

  {
    id: 'prod-sh01',
    category: 'Shelving',
    name: 'Tromsø solid oak bookcase',
    price: 650000,
    imageBg: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'shelving',
    isNew: true
  },
  {
    id: 'prod-sh02',
    category: 'Shelving',
    name: 'Bergen floating wall shelves (set of 4)',
    price: 165000,
    imageBg: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'shelving'
  },
  {
    id: 'prod-sh03',
    category: 'Shelving',
    name: 'Oslo modular shelf system',
    price: 480000,
    imageBg: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'shelving'
  },
  {
    id: 'prod-sh04',
    category: 'Shelving',
    name: 'Fjord open display unit',
    price: 295000,
    imageBg: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'shelving'
  },
  {
    id: 'prod-sh05',
    category: 'Shelving',
    name: 'Ålesund wall-mounted media shelf',
    price: 210000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'shelving'
  },

  // ── STORAGE ────────────────────────────────────────────────────────────────

  {
    id: 'prod-st01',
    category: 'Storage',
    name: 'Bergen 4-door wardrobe',
    price: 1380000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage',
    isNew: true
  },
  {
    id: 'prod-st02',
    category: 'Storage',
    name: 'Oslo timber TV console',
    price: 480000,
    imageBg: "url('https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage',
    isNew: true
  },
  {
    id: 'prod-st03',
    category: 'Storage',
    name: 'Stavanger oak sideboard',
    price: 680000,
    imageBg: "url('https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage'
  },
  {
    id: 'prod-st04',
    category: 'Storage',
    name: 'Lund bedside cabinet (pair)',
    price: 265000,
    imageBg: "url('https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage'
  },
  {
    id: 'prod-st05',
    category: 'Storage',
    name: 'Fjord dresser with mirror',
    price: 540000,
    imageBg: "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage'
  },
  {
    id: 'prod-st06',
    category: 'Storage',
    name: 'Tromsø entryway cabinet',
    price: 290000,
    imageBg: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage'
  },
  {
    id: 'prod-st07',
    category: 'Storage',
    name: 'Ålesund display cabinet with glass doors',
    price: 760000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'storage'
  },

  // ── CHAIRS ─────────────────────────────────────────────────────────────────

  {
    id: 'prod-c01',
    category: 'Chairs',
    name: 'Bergen solid oak dining chair',
    price: 185000,
    imageBg: "url('https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair',
    isNew: true
  },
  {
    id: 'prod-c02',
    category: 'Chairs',
    name: 'Oslo executive office chair',
    price: 580000,
    imageBg: "url('https://images.unsplash.com/photo-1541558869434-2840d308329a?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair',
    isNew: true
  },
  {
    id: 'prod-c03',
    category: 'Chairs',
    name: 'Stavanger ergonomic task chair',
    price: 345000,
    imageBg: "url('https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair'
  },
  {
    id: 'prod-c04',
    category: 'Chairs',
    name: 'Lund upholstered dining chair (set of 2)',
    price: 320000,
    imageBg: "url('https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair'
  },
  {
    id: 'prod-c05',
    category: 'Chairs',
    name: 'Fjord counter bar stool',
    price: 195000,
    imageBg: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair'
  },
  {
    id: 'prod-c06',
    category: 'Chairs',
    name: 'Ålesund lounge accent chair',
    price: 290000,
    imageBg: "url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair'
  },
  {
    id: 'prod-c07',
    category: 'Chairs',
    name: 'Tromsø rocking chair',
    price: 245000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'chair'
  },

  // ── LIGHTING ───────────────────────────────────────────────────────────────

  {
    id: 'prod-l01',
    category: 'Lighting',
    name: 'Bergen arc floor lamp',
    price: 285000,
    imageBg: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp',
    isNew: true
  },
  {
    id: 'prod-l02',
    category: 'Lighting',
    name: 'Oslo rattan pendant light',
    price: 175000,
    imageBg: "url('https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp',
    isNew: true
  },
  {
    id: 'prod-l03',
    category: 'Lighting',
    name: 'Stavanger cluster chandelier',
    price: 780000,
    imageBg: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp'
  },
  {
    id: 'prod-l04',
    category: 'Lighting',
    name: 'Lund minimalist desk lamp',
    price: 145000,
    imageBg: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp'
  },
  {
    id: 'prod-l05',
    category: 'Lighting',
    name: 'Fjord wall sconces (set of 2)',
    price: 220000,
    imageBg: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp'
  },
  {
    id: 'prod-l06',
    category: 'Lighting',
    name: 'Ålesund table lamp with linen shade',
    price: 125000,
    imageBg: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'lamp'
  },

  // ── OUTDOOR ────────────────────────────────────────────────────────────────

  {
    id: 'prod-o01',
    category: 'Outdoor',
    name: 'Bergen teak outdoor sofa set',
    price: 1650000,
    imageBg: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'outdoor',
    isNew: true
  },
  {
    id: 'prod-o02',
    category: 'Outdoor',
    name: 'Oslo garden dining set (6-seater)',
    price: 1280000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'outdoor',
    isNew: true
  },
  {
    id: 'prod-o03',
    category: 'Outdoor',
    name: 'Stavanger poolside daybed',
    price: 920000,
    imageBg: "url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'outdoor'
  },
  {
    id: 'prod-o04',
    category: 'Outdoor',
    name: 'Lund rattan bistro set (2 chairs + table)',
    price: 480000,
    imageBg: "url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'outdoor'
  },
  {
    id: 'prod-o05',
    category: 'Outdoor',
    name: 'Fjord hanging egg chair',
    price: 650000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'outdoor'
  },

  // ── DECOR ──────────────────────────────────────────────────────────────────

  {
    id: 'prod-d01',
    category: 'Decor',
    name: 'Bergen ceramic vase (large)',
    price: 85000,
    imageBg: "url('https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor',
    isNew: true
  },
  {
    id: 'prod-d02',
    category: 'Decor',
    name: 'Oslo cashmere throw blanket',
    price: 145000,
    imageBg: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  },
  {
    id: 'prod-d03',
    category: 'Decor',
    name: 'Stavanger round arch mirror',
    price: 285000,
    imageBg: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor',
    isNew: true
  },
  {
    id: 'prod-d04',
    category: 'Decor',
    name: 'Lund wool area rug (3×5 m)',
    price: 580000,
    imageBg: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  },
  {
    id: 'prod-d05',
    category: 'Decor',
    name: 'Fjord linen cushion set (4 pieces)',
    price: 95000,
    imageBg: "url('https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  },
  {
    id: 'prod-d06',
    category: 'Decor',
    name: 'Ålesund abstract canvas artwork',
    price: 350000,
    imageBg: "url('https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  },
  {
    id: 'prod-d07',
    category: 'Decor',
    name: 'Tromsø scented diffuser set',
    price: 55000,
    imageBg: "url('https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  },
  {
    id: 'prod-d08',
    category: 'Decor',
    name: 'Lund framed botanical print (set of 3)',
    price: 165000,
    imageBg: "url('https://images.unsplash.com/photo-1518012312832-96aea3c91144?q=80&w=1400&auto=format&fit=crop') center/cover",
    iconType: 'decor'
  }
];

// ─── INTERIOR DESIGN MARKETPLACE ─────────────────────────────────────────────
// Downloadable interior design assets — floor plans, 3D models, renders.
// Mix of free and premium content across all major design styles.

const LEGACY_DESIGN_SHOWCASE_DATA: DesignShowcaseItem[] = [

  // ── FREE 2D PLANS ─────────────────────────────────────────────────────────

  {
    id: 'design-f2d-01',
    title: 'Contemporary Living Room Floor Plan',
    description: 'A clean, open-plan living room layout for a 45 m² space. Includes furniture placement, traffic flow zones, and electrical outlet positions. Suitable for apartments and terrace houses. PDF format, print-ready at A2.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-living-room-plan'
  },
  {
    id: 'design-f2d-02',
    title: 'Minimalist Bedroom Layout (Queen & King)',
    description: 'Two bedroom layout variants — one optimised for a queen bed, one for a king — in a standard 18 m² room. Wardrobe placement, nightstand zones, and lighting positions included. Ideal for developers and homeowners planning a master suite.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-bedroom-plan'
  },
  {
    id: 'design-f2d-03',
    title: 'Open-Plan Kitchen & Dining Layout',
    description: 'A practical floor plan for a combined kitchen and dining area in a 35 m² open-plan configuration. Shows island placement, dining table options, and work triangle optimisation. CAD-compatible PDF with dimension annotations.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-kitchen-plan'
  },
  {
    id: 'design-f2d-04',
    title: 'Home Office Setup — 4 Layout Variants',
    description: 'Four distinct home office configurations for rooms ranging from 9 m² to 18 m². Includes single-desk, L-desk, dual-workstation, and standing desk variants, each with storage and cable management zones marked.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-office-plan'
  },
  {
    id: 'design-f2d-05',
    title: 'Studio Apartment Furniture Plan',
    description: 'Space-planning guide for studio apartments between 28 m² and 45 m². Shows how to zone sleeping, living, dining, and working areas without walls. Three arrangement options with Zanori furniture references annotated.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-studio-plan'
  },
  {
    id: 'design-f2d-06',
    title: 'Kids\' Room Design Concepts (Ages 3–12)',
    description: 'A versatile room layout pack for children\'s bedrooms across different age groups. Includes a toddler configuration, school-age study setup, and a preteen layout with desk, wardrobe, and play zones. Gender-neutral palette references included.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-kids-room-plan'
  },
  {
    id: 'design-f2d-07',
    title: 'Lagos Balcony & Terrace Layout Guide',
    description: 'Optimised outdoor living layout for Lagos balconies and terraces from 6 m² to 20 m². Covers furniture sizing, drainage-friendly rug zones, shading strategies, and plant placement. Ideal for VI, Lekki, and Ikoyi apartment dwellers.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-terrace-plan'
  },

  // ── FREE 3D MODELS ────────────────────────────────────────────────────────

  {
    id: 'design-f3d-01',
    title: 'Scandinavian Living Room 3D Scene',
    description: 'A complete Scandinavian-style living room 3D scene in SketchUp format (.skp). Includes sofa, coffee table, bookshelves, area rug, and accent lighting. Ready to drop into your project and adjust materials. SketchUp 2022+.',
    assetType: '3D Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-scandi-living-room-skp'
  },
  {
    id: 'design-f3d-02',
    title: 'Minimalist Bedroom 3D Model Pack',
    description: 'A stripped-back minimalist bedroom in Blender (.blend) format. Includes platform bed, two bedside tables, pendant lighting, and curtain geometry. Procedural materials included. Compatible with Blender 3.6+.',
    assetType: '3D Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-minimalist-bedroom-blend'
  },
  {
    id: 'design-f3d-03',
    title: 'Industrial Home Office 3D Scene (GLTF)',
    description: 'An industrial-style home office 3D scene exported as GLTF/GLB — compatible with virtually any 3D application, game engine, or web viewer. Includes desk, task chair, shelving, exposed brick wall material, and Edison bulb pendants.',
    assetType: '3D Design',
    accessType: 'Free',
    price: 0,
    imageBg: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=free-industrial-office-gltf'
  },

  // ── PAID 2D PLANS ─────────────────────────────────────────────────────────

  {
    id: 'design-p2d-01',
    title: 'Luxury Master Suite Layout Package',
    description: 'A premium 5-page layout package for a luxury master suite. Includes bedroom floor plan, en-suite bathroom, walk-in wardrobe, and two lighting schemes (ambient and task). Dimensioned in metric with material specification notes. PDF + DWG files included.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 220000,
    imageBg: "url('https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-master-suite-pkg'
  },
  {
    id: 'design-p2d-02',
    title: 'Boutique Office Interior Layout Pack',
    description: 'A complete office interior layout for a boutique 12–20 person workspace. Includes open-plan floor, private offices, boardroom, reception zone, and breakout area — all with furniture placement and acoustic zone annotations. PDF + DWG.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 180000,
    imageBg: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-boutique-office-pkg'
  },
  {
    id: 'design-p2d-03',
    title: 'Multi-Room Renovation Package (4-Bed Home)',
    description: 'A comprehensive renovation layout package for a 4-bedroom detached home. Covers ground-floor open plan, 4 bedrooms with en-suite options, staircase landing, and utility room. Includes before/after comparison plans and material mood boards.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 380000,
    imageBg: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-renovation-pkg'
  },
  {
    id: 'design-p2d-04',
    title: 'Restaurant & Hospitality Interior Layout',
    description: 'A full restaurant floor plan package including dining floor, bar counter, kitchen interface, toilets, and external terrace. Seating capacity analysis, fire egress paths, and ADA-equivalent accessibility annotations. Scaled at 1:50 and 1:20. PDF + DWG.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 450000,
    imageBg: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-restaurant-plan'
  },
  {
    id: 'design-p2d-05',
    title: 'Retail Boutique Floor Plan & Fixture Schedule',
    description: 'A retail interior plan for a 60–120 m² boutique. Includes fixture layout, merchandising zones, cashier counter, fitting rooms, and stockroom. Accompanied by a fixture schedule with quantity, dimensions, and suggested suppliers. PDF.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 320000,
    imageBg: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-retail-plan'
  },

  // ── PAID 3D DESIGNS ───────────────────────────────────────────────────────

  {
    id: 'design-p3d-01',
    title: 'Luxury Villa 3D Interior — Full Package',
    description: 'A photorealistic 3D interior package for a 5-bedroom luxury villa. Includes fully textured SketchUp scenes for living room, dining room, kitchen, master suite, and outdoor terrace. V-Ray materials and HDRI lighting pre-configured. SketchUp 2023 + V-Ray 6.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 650000,
    imageBg: "url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-luxury-villa-3d'
  },
  {
    id: 'design-p3d-02',
    title: 'Executive Office Suite 3D Pack',
    description: 'A corporate executive office 3D pack in 3ds Max and FBX formats. Includes CEO office, boardroom, and reception area — each with high-resolution PBR textures, adjustable parametric furniture, and two lighting presets (daytime and evening).',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 320000,
    imageBg: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-exec-office-3d'
  },
  {
    id: 'design-p3d-03',
    title: 'Contemporary Kitchen 3D Model (Blender)',
    description: 'A modern handleless kitchen in Blender format with full procedural materials — quartz worktop, gloss cabinetry, brushed steel fixtures. Two colour variants included: white/light oak and charcoal/warm brass. Blender 4.0+. Full PBR material library included.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 280000,
    imageBg: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-kitchen-3d'
  },
  {
    id: 'design-p3d-04',
    title: 'Luxury Master Bathroom 3D Concept',
    description: 'A spa-inspired master bathroom 3D model in SketchUp and OBJ formats. Features a freestanding bathtub, double vanity, walk-in shower, and heated towel rail. Travertine and Calacatta marble PBR textures. Interior render camera positions pre-set for Enscape.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 220000,
    imageBg: "url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-bathroom-3d'
  },
  {
    id: 'design-p3d-05',
    title: 'Outdoor Living Space 3D Landscape',
    description: 'A premium outdoor living and landscaping 3D scene in SketchUp. Pool deck, lounge pavilion, outdoor kitchen, and tropical planting scheme. Includes day and night V-Ray renders. Adapted for Lagos and tropical West African climates.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 350000,
    imageBg: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-outdoor-3d'
  },
  {
    id: 'design-p3d-06',
    title: 'Hospitality Suite 3D Interior Design',
    description: 'A boutique hotel junior suite in full 3D — bedroom, en-suite bathroom, and small sitting area. Designed in a contemporary African luxury aesthetic with warm terracotta, aged brass, and handwoven textiles. SketchUp + Enscape-ready. Includes branded mood board PDF.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 580000,
    imageBg: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-hospitality-3d'
  },
  {
    id: 'design-p3d-07',
    title: 'Penthouse Interior Walkthrough — 3D Master Pack',
    description: 'A complete 3D interior package for a duplex penthouse — living areas, kitchen, dining, 3 bedrooms, and roof terrace. Designed for Lagos\'s luxury residential market. Includes animated walkthrough camera paths for Enscape, V-Ray scene files, and a full A1 presentation PDF with design rationale.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 980000,
    imageBg: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop') center/cover",
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop',
    fileUrl: 'https://drive.google.com/uc?id=paid-penthouse-3d-master'
  }
];

// The legacy seed remains in this file for backwards compatibility with older
// Firestore documents. New installs use the curated marketplace catalog.
export const PRODUCTS_DATA: Product[] = CURATED_PRODUCTS_DATA;
export const DESIGN_SHOWCASE_DATA: DesignShowcaseItem[] = CURATED_DESIGN_SHOWCASE_DATA;
