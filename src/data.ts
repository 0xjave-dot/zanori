import { ServiceItem, Project, Product, TestimonialItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'space-styling',
    number: '03',
    name: 'SPACE STYLING (SOFT FURNISHINGS)',
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
    title: 'Ikoyi Penthouse Residence',
    category: 'Homes',
    location: 'Ikoyi, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture', '3D Interior Design'],
    description: 'This renovation updated a residential penthouse for a large family. The goal was to increase natural light and improve the flow between rooms. We installed custom oak joinery and used local textiles for the styling. 3D modeling verified all layout changes before construction began. The project included space styling and the supply of custom furniture.',
    imageBg: "url('https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2000&auto=format&fit=crop') center/cover",
    isFeatured: true
  },
  {
    id: 'proj-2',
    title: 'Victoria Island Creative Studio',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    servicesUsed: ['Space Styling', 'Design Consultation'],
    description: 'This project involved the interior design of a workspace for a media agency. The high ceilings required specific storage solutions which we addressed with dark charcoal cabinets. We placed timber tables in the meeting areas. The layout supports both collaborative tasks and individual work. Our team provided design consultation to choose the final material and color palette.',
    imageBg: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-3',
    title: 'Lekki Phase One Minimalist Villa',
    category: 'Homes',
    location: 'Lekki, Lagos',
    servicesUsed: ['3D Interior Design', 'Quality Furniture'],
    description: 'We created a private home designed for a tropical climate. The interior uses low profile furniture and sand textured walls to reduce heat and light. Detailed 3D designs planned the furniture placement and window orientations for better comfort. The project featured our custom beds and shelving units to maintain a simple look.',
    imageBg: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-4',
    title: 'Eko Atlantic Executive Office',
    category: 'Designs',
    location: 'Eko Atlantic, Lagos',
    servicesUsed: ['3D Interior Design', 'Design Consultation'],
    description: 'This corporate office suite development focused on executive comfort. We analyzed sun positions to determine the best placement for workstations and lounge areas. We selected furniture tones to match the exterior glass facade of the building. Digital simulations helped select all materials and lighting configurations for the space.',
    imageBg: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-5',
    title: 'Banana Island Salon and Spa Lounge',
    category: 'Commercial',
    location: 'Banana Island, Lagos',
    servicesUsed: ['Space Styling', 'Quality Furniture'],
    description: 'We outfitted a commercial wellness space for better functionality. The project used modular storage units and travertine basins. We used light oak finishes to create a calm environment for clients. Every furniture piece was selected for high durability to withstand constant use in a high traffic commercial setting.',
    imageBg: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop') center/cover"
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
