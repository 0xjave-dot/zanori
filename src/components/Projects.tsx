import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import FadeIn from './FadeIn';
import ProjectDetailModal from './ProjectDetailModal.tsx';

type ProjectItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  service: string;
  col1_1: string;
  col1_2: string;
  col2: string;
};

const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'The Adunola Residence',
    category: 'Residential',
    description: 'A warm, earthy living space designed around the owner’s love for natural materials and quiet mornings.',
    location: 'Lekki, Lagos',
    year: '2024',
    service: 'Space Styling',
    col1_1: 'https://i.pinimg.com/736x/50/c4/98/50c49834ecfa4556297715b427a0347c.jpg',
    col1_2: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    col2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a'
  },
  {
    id: '02',
    title: 'Eko Heights Apartment',
    category: 'Residential',
    description: 'Compact apartment reworked for flow and daylight.',
    location: 'Victoria Island',
    year: '2024',
    service: 'Consultation',
    col1_1: 'https://cdn.home-designing.com/wp-content/uploads/2013/10/glass-wall.jpeg',
    col1_2: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
    col2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a'
  },
  {
    id: '03',
    title: 'The Banwo Family Home',
    category: 'Residential',
    description: 'Furniture sourcing for a growing family home.',
    location: 'Abuja, FCT',
    year: '2023',
    service: 'Furniture',
    col1_1: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUlXrfEJM9G4h153a01e80LO6iNj2p5hUMVVc1rawiqLJn9D1IWN_5Fnx5Ym6tIIZ_29PjHLeftg96V_bykbw5TuzF1TjSzLXalHKTbaJVo9xrlkKJNFlM&usqp=CAc',
    col1_2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a',
    col2: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5'
  }
];

export default function Projects() {
  const list = PROJECTS.slice(0, 3);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const translateY = useTransform(scrollYProgress as MotionValue<number>, [0, 1], [0, -80]);
  const total = list.length;

  const [modalProject, setModalProject] = useState<any | null>(null);

  return (
    <section ref={ref} className="proj-section relative overflow-hidden py-24" style={{ paddingBottom: 220 }}>
      <FadeIn delay={0} y={30}>
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase tracking-tight leading-none text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-[#D7E2EA] text-sm md:text-base font-light tracking-wide uppercase max-w-2xl mx-auto">
            
          </p>
        </div>
      </FadeIn>

      <motion.div className="px-6 max-w-6xl mx-auto relative" style={{ y: translateY }}>
        {list.map((project, index) => {
          const start = index / total;
          const end = (index + 1) / total;
          const targetScale = 1 - (total - 1 - index) * 0.04;
          const scale = useTransform(scrollYProgress as MotionValue<number>, [start, end], [1, targetScale]);

          return (
            <div key={project.id} style={{ position: 'relative', zIndex: total - index }} className="mb-8">
              <div className="sticky h-[85vh] flex items-start justify-center" style={{ top: `${index * 36 + 60}px` }}>
                <motion.div
                  onClick={() => {
                    // open modal with richer image keys expected by the modal
                    setModalProject({
                      num: project.id,
                      name: project.title,
                      category: project.tag,
                      description: project.description,
                      location: project.location,
                      year: project.year,
                      service: project.service,
                      images: {
                        col1_1: project.images[0],
                        col1_2: project.images[1],
                        col2: project.images[2]
                      }
                    });
                  }}
                  className="w-full rounded-[40px] border-2 border-[#D7E2EA]/15 bg-[#0C0C0C] p-4 origin-top overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer"
                  style={{ scale }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-[#D7E2EA] font-black text-[clamp(2rem,6vw,72px)] leading-none">{project.id}</div>
                    <div className="uppercase tracking-widest text-[#D7E2EA] opacity-60 font-mono text-xs">{project.tag}</div>
                    <h3 className="flex-1 text-[#D7E2EA] font-semibold text-lg md:text-2xl">{project.title}</h3>
                    <LiveProjectButton
                      label=""
                      onClick={() =>
                        setModalProject({
                              num: project.id,
                              name: project.title,
                              category: project.tag,
                              description: project.description,
                              location: project.location,
                              year: project.year,
                              service: project.service,
                              images: {
                                col1_1: project.images[0],
                                col1_2: project.images[1],
                                col2: project.images[2]
                              }
                            })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-[40%_60%] gap-3">
                    <div className="flex flex-col gap-3">
                      <PlaceholderImage src={project.images[0]} height={180} />
                      <PlaceholderImage src={project.images[1]} height={220} />
                    </div>
                    <PlaceholderImage src={project.images[2]} height={420} />
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Project Detail Modal */}
      <ProjectDetailModal project={modalProject} isOpen={!!modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
}
