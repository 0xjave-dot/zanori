import React, { useState } from 'react';

type ProjectItem = {
  id: string;
  title: string;
  tag: string;
  description: string;
  location: string;
  year: string;
  service: string;
  images: string[]; // image placeholders or urls
};

const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'The Adunola Residence',
    tag: 'Project 01 · Space Styling',
    description:
      "A warm, earthy living space designed around the owner's love for natural materials and quiet mornings. We layered warm colors, fabric, and handcrafted ceramics to create a home that truly breathes.",
    location: 'Lekki, Lagos',
    year: '2024',
    service: 'Space Styling',
    images: [
      'https://i.pinimg.com/736x/50/c4/98/50c49834ecfa4556297715b427a0347c.jpg'
    ]
  },
  {
    id: 'p2',
    title: 'Eko Heights Apartment',
    tag: 'Project 02 · Consultation',
    description:
      'We had a compact city apartment transformed through thoughtful planning and efficient use of space. We advised on layout flow, colour temperature, and furniture scale to open up the space without touching a wall.',
    location: 'Victoria Island',
    year: '2024',
    service: 'Consultation',
    images: [
      'https://cdn.home-designing.com/wp-content/uploads/2013/10/glass-wall.jpeg'
    ]
  },
  {
    id: 'p3',
    title: 'The Banwo Family Home',
    tag: 'Project 03 · Furniture',
    description:
      'A full furniture sourcing project for a newly built family home. Every piece was selected for longevity, comfort, and harmony — from the dining set to the bedroom wardrobes.',
    location: 'Abuja, FCT',
    year: '2023',
    service: 'Furniture',
    images: [
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUlXrfEJM9G4h153a01e80LO6iNj2p5hUMVVc1rawiqLJn9D1IWN_5Fnx5Ym6tIIZ_29PjHLeftg96V_bykbw5TuzF1TjSzLXalHKTbaJVo9xrlkKJNFlM&usqp=CAc'
    ]
  },
  {
    id: 'p4',
    title: 'Zuri Studio Office',
    tag: 'Project 04 · Space Styling',
    description:
      ' We brought warmth into a creative studio, redesign it to give the inspirational effect it was always meant to have, with top-notch styling, real plants and proper lighting.',
    location: 'Ikoyi, Lagos',
    year: '2023',
    service: 'Space Styling',
    images: [
      'https://greeneryunlimited.co/cdn/shop/articles/Electric-Garden-1.jpg?v=1539108682'
    ]
  }
];

function PlaceholderImage({ id }: { id: string }) {
  const isUrl = /^https?:\/\//i.test(id);

  if (isUrl) {
    return (
      <div className="ip placeholder">
        <img
          src={id}
          alt="Project preview"
          className="w-full h-full object-cover"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  return (
    <div className="ip placeholder">
      <svg width="100%" height="100%" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
        <rect width="100%" height="100%" fill="#f6f4f2" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#bdb5ad" fontSize="20">{id}</text>
      </svg>
    </div>
  );
}

function MobileCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="project-carousel">
      <div className="carousel-window">
        <PlaceholderImage id={images[index]} />
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={prev} aria-label="Previous" className="carousel-btn">‹</button>
        <button type="button" onClick={next} aria-label="Next" className="carousel-btn">›</button>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="pg">
      <div className="proj-section">
        <div className="proj-header">
          <span className="lbl"></span>
          <h2>Featured Projects</h2>
        </div>

        {PROJECTS.map((p, idx) => (
          <div className="proj" key={p.id}>
            {/* Text */}
            <div className="proj-text">
              <span className="lbl">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="proj-meta">
                <div className="meta-item"><span className="lbl">Location</span><p>{p.location}</p></div>
                <div className="meta-item"><span className="lbl">Year</span><p>{p.year}</p></div>
                <div className="meta-item"><span className="lbl">Service</span><p>{p.service}</p></div>
              </div>
              <a href="#" className="proj-link">View Project</a>
            </div>

            {/* Desktop bento */}
            <div className="bento bento-3 desktop-bento">
              <div className="ip b1"><PlaceholderImage id={p.images[0]} /></div>
              <div className="ip b2"><PlaceholderImage id={p.images[1]} /></div>
              <div className="ip b3"><PlaceholderImage id={p.images[2]} /></div>
            </div>

            {/* Mobile carousel — visible only on small screens via CSS */}
            <div className="mobile-carousel">
              <MobileCarousel images={p.images} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
