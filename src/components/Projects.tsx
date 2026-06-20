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
      // Penthouse: dramatic statement lounge / rich warm-toned bedroom / sweeping open-plan
      col1_1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      col2:   'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    num: '02',
    name: 'Eko Heights Apartment',
    category: 'Residential',
    images: {
      // Modern apartment: crisp open-plan living / sleek kitchen island / architectural dining nook
      col1_1: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      col2:   'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    num: '03',
    name: 'The Banwo Family Home',
    category: 'Residential',
    images: {
      // Family home: earthy textured lounge / sun-drenched reading corner / calm master bedroom
      col1_1: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      col1_2: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
      col2:   'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
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
