import { ServiceItem, Project, Product, TestimonialItem, DesignShowcaseItem } from './types';

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
    description: 'Perched above the tree line of Ikoyi, this penthouse presented an exceptional canvas — soaring ceilings, panoramic harbour views, and a footprint generous enough to serve a multi-generational family without ever feeling subdivided. Our mandate was not simply to renovate but to reimagine the spatial hierarchy entirely, drawing natural light deeper into the floorplan through the strategic repositioning of interior partitions and the introduction of bespoke oak joinery that doubles as both storage and structural visual rhythm. Local Yoruba textiles were woven into the soft furnishing palette, grounding the scheme in cultural identity while maintaining a restrained luxury sensibility. Every layout decision — from the circulation path between the primary suite and the family lounge to the precise angle of the dining banquette — was verified through detailed 3D modelling before a single contractor was briefed, eliminating the costly rework that so often characterises projects of this scale.',
    imageBg: "url('https://i.ibb.co/sdJ1vCSB/IMG-20260630-WA0053.jpg') center/cover",
    images: ['https://i.ibb.co/sdJ1vCSB/IMG-20260630-WA0053.jpg', 'https://i.ibb.co/wNWsfDRC/IMG-20260630-WA0070.jpg'],
    isFeatured: true
  },
  {
    id: 'proj-2',
    title: 'Victoria Island Creative Studio',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    servicesUsed: ['Space Styling', 'Design Consultation'],
    description: 'A fast-growing media agency on Victoria Island required a workspace that could match the creative energy of its team while projecting credibility to the international clients it hosts daily. The inherited shell — a double-height commercial unit with exposed concrete columns — offered immense character but little practical infrastructure. Our design consultation began with a rigorous spatial audit, mapping the agency\'s actual workflow patterns to determine where collaboration naturally clustered and where focused individual work demanded acoustic separation. The solution introduced dark charcoal cabinet walls that contain the infrastructure chaos of a production environment without interrupting the openness of the ceiling void, while solid timber communal tables in the briefing zones signal warmth and creative intent. The final material and colour palette — matte black steel, warm ash veneer, and a single accent of burnt terracotta — was selected through a structured consultation process that balanced the client\'s brand identity with long-term spatial durability.',
    imageBg: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop') center/cover"
  },
  {
    id: 'proj-3',
    title: 'Lekki Phase One Minimalist Villa',
    category: 'Homes',
    location: 'Lekki, Lagos',
    servicesUsed: ['3D Interior Design', 'Quality Furniture'],
    description: 'Designing for Lagos\'s coastal climate requires more than aesthetic restraint — it demands a thorough understanding of how heat, humidity, and intense equatorial light interact with material choices and spatial proportions. This Lekki Phase One villa was conceived as a considered response to those conditions: low-profile furniture keeps sightlines unobstructed and reduces the visual weight that amplifies heat perception, while sand-textured wall finishes scatter rather than reflect direct sunlight, producing a diffused ambient glow throughout the day. Window orientations were precisely modelled in 3D to capture the prevailing south-westerly breeze and shade interior surfaces during peak solar hours, reducing dependence on mechanical cooling. Our custom bed frames and open shelving units — fabricated in pale ash with recessed handles — were designed specifically for this scheme, maintaining the home\'s commitment to quiet simplicity without sacrificing the warmth and tactile richness that makes a house genuinely liveable.',
    imageBg: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop') center/cover"
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

export const DESIGN_SHOWCASE_DATA: DesignShowcaseItem[] = [
  {
    id: 'design-1',
    title: 'Lagos Living Room Mood Board',
    description: 'A polished plain-design concept sheet for contemporary living spaces with warm tones and layered texture.',
    assetType: 'Plain Design',
    accessType: 'Free',
    price: 0,
    imageBg: 'linear-gradient(135deg, #F7F4EF 0%, #C4A882 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 'design-2',
    title: 'Premium 3D Villa Concept',
    description: 'A high-end 3D design concept for a luxury villa experience with sculptural forms and premium finishes.',
    assetType: '3D Design',
    accessType: 'Paid',
    price: 250000,
    imageBg: 'linear-gradient(135deg, #2A2520 0%, #8B6F52 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 'design-3',
    title: 'Boutique Office Layout Pack',
    description: 'A clean, modern plain-design layout pack for branded office interiors and collaborative workspaces.',
    assetType: 'Plain Design',
    accessType: 'Paid',
    price: 180000,
    imageBg: 'linear-gradient(135deg, #E8E0D4 0%, #8B6F52 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "I walked into my living room on installation day and genuinely did not recognise it. In the best way possible. Every single thing was exactly where the render showed it would be.",
    client: 'Adaeze Okonkwo',
    project: ''
  },
  {
    quote: "I was sceptical about the 3D render — I thought it was just a sales gimmick. It wasn't. It saved me from two decisions I would have regretted, and I didn't spend a naira on anything I didn't already love.",
    client: 'Emeka Eze',
    project: ''
  },
  {
    quote: "Other designers I spoke to wanted to impose their taste on my space. Kryptonite actually listened. The result feels like me — just a significantly better version of me.",
    client: 'Kemi Lawal',
    project: ''
  },
  {
    quote: "The furniture quality is something else. I've had the sofa for eight months and it still looks like it arrived yesterday. Worth every kobo.",
    client: 'Tolulope Adeyemi',
    project: ''
  },
  {
    quote: "I sent them a photo of my bedroom — dark, cluttered, nothing matching. Three weeks later I have a room I actively look forward to going to sleep in.",
    client: 'Chukwuemeka Obi',
    project: ''
  },
  {
    quote: "What I appreciated most was the honesty. They told me what would work, what wouldn't, and why. No upselling, no filler pieces. Just a tight, beautiful space.",
    client: 'Fatima Al-Hassan',
    project: ''
  },
  {
    quote: "My office used to feel like somewhere I had to be. Now it feels like somewhere I want to be. That shift in feeling is hard to put a price on.",
    client: 'Segun Bankole',
    project: ''
  },
  {
    quote: "The brief they sent after our first call showed me they had actually paid attention. Every detail I mentioned — the light, the kids, the dog — was accounted for. That's rare.",
    client: 'Ngozi Uchenna',
    project: ''
  }
];
