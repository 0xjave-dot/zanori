import { ServiceItem, Project, Product, TestimonialItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'space-styling',
    number: '01',
    name: 'Space Styling',
    description: 'Bespoke finishing and styling that completes your room. From premium material curation to custom art and accessory placement, we style spaces that tell your unique story.',
    imageBg: 'linear-gradient(135deg, #E8E0D4 0%, #C4A882 100%)'
  },
  {
    id: 'design-consultation',
    number: '02',
    name: 'Design Consultation',
    description: 'Expert, unhurried design directions, material mapping, and color choreography. A dedicated session in Lagos to untangle layouts and discover your home\'s authentic voice.',
    imageBg: 'linear-gradient(135deg, #F7F4EF 0%, #E8E0D4 100%)'
  },
  {
    id: 'quality-furniture',
    number: '03',
    name: 'Timeless Furniture Retail',
    description: 'A thoughtful collection of premium quality retail pieces — sofas, queen beds, bespoke shelving, and storage units designed for quiet luxury and enduring daily beauty.',
    imageBg: 'linear-gradient(135deg, #C4A882 0%, #8B6F52 100%)'
  },
  {
    id: '3d-design',
    number: '04',
    name: '3D Interior Design',
    description: 'Our signature technical service. Full visual immersion of your space prior to implementation. Real textures, lighting configurations, and accurate furniture scales mapped flawlessly.',
    imageBg: 'linear-gradient(135deg, #8B6F52 0%, #2A2520 100%)',
    isSignature: true
  }
];

export const PORTFOLIO_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Ikoyi Penthouse Residence',
    category: 'Homes',
    location: 'Ikoyi, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture', '3D Interior Design'],
    description: 'A multi-generational residential suite redesigned to promote ease, natural Nigerian lighting, and minimalist Nordic functionality. Balanced with warm custom oak and local hand-woven textiles.',
    imageBg: 'linear-gradient(135deg, #E8E0D4 0%, #C4A882 40%, #8B6F52 100%)',
    isFeatured: true
  },
  {
    id: 'proj-2',
    title: 'Victoria Island Creative Studio',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    servicesUsed: ['Space Styling', 'Design Consultation'],
    description: 'An editorial workspace built for a leading visual brand. High ceilings are anchored by our dark charcoal custom storage layouts and functional timber meeting tables.',
    imageBg: 'linear-gradient(135deg, #F7F4EF 0%, #E8E0D4 100%)'
  },
  {
    id: 'proj-3',
    title: 'Lekki Phase 1 Minimalist Villa',
    category: 'Homes',
    location: 'Lekki, Lagos',
    servicesUsed: ['3D Interior Design', 'Quality Furniture'],
    description: 'A serene urban retreat with an emphasis on seamless physical transitions, custom low-slung master beds, and deep sand-matted walls that absorb Lagos tropical heat.',
    imageBg: 'linear-gradient(135deg, #C4A882 0%, #2A2520 100%)'
  },
  {
    id: 'proj-4',
    title: 'Eko Atlantic Executive Office',
    category: 'Designs',
    location: 'Eko Atlantic, Lagos',
    servicesUsed: ['3D Interior Design', 'Design Consultation'],
    description: 'A premium corporate concept utilizing advanced digital simulations of solar positions to optimize executive lounge layouts, furniture tones, and accent placements.',
    imageBg: 'linear-gradient(135deg, #8B6F52 0%, #F7F4EF 100%)'
  },
  {
    id: 'proj-5',
    title: 'Banana Island Salon & Spa Lounge',
    category: 'Commercial',
    location: 'Banana Island, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture'],
    description: 'A commercial sanctuary utilizing Scandinavian sensory cues, monolithic travertine basins, and custom-styled modular storage units in light oak finishes.',
    imageBg: 'linear-gradient(135deg, #FDFCFA 0%, #C4A882 100%)'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    category: 'Beds',
    name: 'Lund queen bed',
    price: 480000,
    imageBg: 'linear-gradient(135deg, #F7F4EF 0%, #E8E0D4 100%)',
    iconType: 'bed',
    isNew: true
  },
  {
    id: 'prod-2',
    category: 'Sofas',
    name: 'Oslo 3-seater sofa',
    price: 720000,
    imageBg: 'linear-gradient(135deg, #E8E0D4 0%, #C4A882 100%)',
    iconType: 'sofa',
    isNew: true
  },
  {
    id: 'prod-3',
    category: 'Shelving',
    name: 'Fjord open shelf unit',
    price: 195000,
    imageBg: 'linear-gradient(135deg, #C4A882 0%, #8B6F52 100%)',
    iconType: 'shelving'
  },
  {
    id: 'prod-4',
    category: 'Tables',
    name: 'Bergen dining table',
    price: 540000,
    imageBg: 'linear-gradient(135deg, #8B6F52 0%, #2A2520 100%)',
    iconType: 'table'
  },
  {
    id: 'prod-5',
    category: 'Storage',
    name: 'Stavanger storage cabinet',
    price: 290000,
    imageBg: 'linear-gradient(135deg, #FDFCFA 0%, #E8E0D4 100%)',
    iconType: 'storage',
    isNew: true
  },
  {
    id: 'prod-6',
    category: 'Tables',
    name: 'Kiel side table',
    price: 160000,
    imageBg: 'linear-gradient(135deg, #E8E0D4 0%, #8B6F52 100%)',
    iconType: 'table'
  },
  {
    id: 'prod-7',
    category: 'Sofas',
    name: 'Malmö accent chair',
    price: 380000,
    imageBg: 'linear-gradient(135deg, #F7F4EF 0%, #C4A882 100%)',
    iconType: 'sofa'
  },
  {
    id: 'prod-8',
    category: 'Shelving',
    name: 'Tromsø bookshelf',
    price: 650000,
    imageBg: 'linear-gradient(135deg, #2A2520 0%, #8B6F52 100%)',
    iconType: 'shelving'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "I walked into my living room on installation day and genuinely did not recognise it. In the best way possible. Every single thing was exactly where the render showed it would be.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "I was sceptical about the 3D render — I thought it was just a sales gimmick. It wasn't. It saved me from two decisions I would have regretted, and I didn't spend a naira on anything I didn't already love.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "Other designers I spoke to wanted to impose their taste on my space. Kryptonite actually listened. The result feels like me — just a significantly better version of me.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "The furniture quality is something else. I've had the sofa for eight months and it still looks like it arrived yesterday. Worth every kobo.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "I sent them a photo of my bedroom — dark, cluttered, nothing matching. Three weeks later I have a room I actively look forward to going to sleep in.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "What I appreciated most was the honesty. They told me what would work, what wouldn't, and why. No upselling, no filler pieces. Just a tight, beautiful space.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "My office used to feel like somewhere I had to be. Now it feels like somewhere I want to be. That shift in feeling is hard to put a price on.",
    client: 'Human Being',
    project: ''
  },
  {
    quote: "The brief they sent after our first call showed me they had actually paid attention. Every detail I mentioned — the light, the kids, the dog — was accounted for. That's rare.",
    client: 'Human Being',
    project: ''
  }
];
