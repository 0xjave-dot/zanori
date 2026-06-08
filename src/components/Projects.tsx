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
      "A warm, earthy living space designed around the owner's love for natural materials and quiet mornings. We layered rattan, linen, and handcrafted ceramics to create a home that breathes.",
    location: 'Lekki, Lagos',
    year: '2024',
    service: 'Space Styling',
    images: ['img1a', 'img1b', 'img1c']
  },
  {
    id: 'p2',
    title: 'Eko Heights Apartment',
    tag: 'Project 02 · Consultation',
    description:
      'A compact city apartment transformed through thoughtful spatial planning. We advised on layout flow, colour temperature, and furniture scale to open up the space without touching a wall.',
    location: 'Victoria Island',
    year: '2024',
    service: 'Consultation',
    images: ['img2a', 'img2b', 'img2c']
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
    images: ['img3a', 'img3b', 'img3c']
  },
  {
    id: 'p4',
    title: 'Zuri Studio Office',
    tag: 'Project 04 · Space Styling',
    description:
      'A creative studio redesigned to inspire. We brought warmth into a previously sterile open-plan office through curated styling, plants, statement lighting, and intentional colour blocking.',
    location: 'Ikoyi, Lagos',
    year: '2023',
    service: 'Space Styling',
    images: ['img4a', 'img4b', 'img4c']
  }
];

function PlaceholderImage({ id }: { id: string }) {
  // Simple SVG placeholder — in real project replace with <img src=...>
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
          <span className="lbl">Our Work</span>
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
