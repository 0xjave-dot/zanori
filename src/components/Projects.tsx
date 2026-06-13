import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import ProjectDetailModal from './ProjectDetailModal';

export interface Project {
  num: string;
  name: string;
  category: string;
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

const projects: Project[] = [
  {
    num: '01',
    name: 'The Adunola Residence',
    category: 'Residential',
    images: {
      col1_1: 'https://i.pinimg.com/736x/50/c4/98/50c49834ecfa4556297715b427a0347c.jpg',
      col1_2: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
      col2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a',
    },
  },
  {
    num: '02',
    name: 'Eko Heights Apartment',
    category: 'Residential',
    images: {
      col1_1: 'https://cdn.home-designing.com/wp-content/uploads/2013/10/glass-wall.jpeg',
      col1_2: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
      col2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a',
    },
  },
  {
    num: '03',
    name: 'The Banwo Family Home',
    category: 'Residential',
    images: {
      col1_1: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUlXrfEJM9G4h153a01e80LO6iNj2p5hUMVVc1rawiqLJn9D1IWN_5Fnx5Ym6tIIZ_29PjHLeftg96V_bykbw5TuzF1TjSzLXalHKTbaJVo9xrlkKJNFlM&usqp=CAc',
      col1_2: 'https://images.unsplash.com/photo-1505691723518-36a87b0b3a4a',
      col2: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
    },
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
  onClick,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      id={`project-sticky-wrapper-${project.num}`}
      className="sticky h-[85vh] flex items-start justify-center"
      style={{ top: `${index * 36 + 60}px` }}
    >
      <motion.div
        id={`project-card-${project.num}`}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/15 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:border-[#D7E2EA]/30 transition-colors duration-300 cursor-pointer"
        style={{ scale }}
        onClick={onClick}
      >
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span id={`project-num-${project.num}`} className="text-[#D7E2EA] font-black text-[clamp(2.5rem,8vw,120px)] leading-none select-none">
              {project.num}
            </span>
            <span id={`project-category-${project.num}`} className="uppercase tracking-widest text-[#D7E2EA] opacity-50 font-mono text-xs sm:text-sm select-none">
              {project.category}
            </span>
            <h3 id={`project-name-${project.num}`} className="uppercase text-[#D7E2EA] font-semibold text-xl md:text-2xl flex-1 tracking-tight select-none">
              {project.name}
            </h3>
            <LiveProjectButton
              id={`project-button-${project.num}`}
              label="Specs & Render"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            />
          </div>

          <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 items-stretch select-none pointer-events-none">
            <div className="flex flex-col gap-3 sm:gap-4">
              <img
                id={`project-img-1-1-${project.num}`}
                src={project.images.col1_1}
                alt={`${project.name} Thumbnail 1`}
                loading="lazy"
                className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[40px] object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                style={{ height: 'clamp(110px, 15vw, 210px)' }}
                referrerPolicy="no-referrer"
              />
              <img
                id={`project-img-1-2-${project.num}`}
                src={project.images.col1_2}
                alt={`${project.name} Thumbnail 2`}
                loading="lazy"
                className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[40px] object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                style={{ height: 'clamp(140px, 20vw, 310px)' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <img
              id={`project-img-2-${project.num}`}
              src={project.images.col2}
              alt={`${project.name} Main Render`}
              loading="lazy"
              className="w-full h-full rounded-[24px] sm:rounded-[36px] md:rounded-[40px] object-cover filter brightness-95 hover:brightness-100 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onProjectClick?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onProjectClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const total = projects.length;

  return (
    <section
      ref={ref}
      id="projects-section-container"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 select-none pb-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          id="projects-section-title"
          className="hero-heading font-black uppercase tracking-tight leading-none text-center pt-24 mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Featured projects
        </h2>
      </FadeIn>

      <div className="px-5 sm:px-8 md:px-10 max-w-6xl mx-auto flex flex-col gap-10">
        {projects.map((project, index) => {
          const start = index / total;
          const end = (index + 1) / total;
          const targetScale = 1 - (total - 1 - index) * 0.04;
          return (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              totalCards={total}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
              onClick={() => {
                onProjectClick?.(project);
                setSelectedProject(project);
              }}
            />
          );
        })}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
