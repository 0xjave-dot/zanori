import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Layers, Hourglass, AlertCircle, Quote } from 'lucide-react';

interface Project {
  num: string;
  name: string;
  category: string;
  description?: string;
  location?: string;
  year?: string;
  service?: string;
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (isOpen && project) {
      setActiveImage(project.images.col2 || project.images.col1_1 || project.images.col1_2 || '');
    } else {
      setActiveImage('');
    }
  }, [project, isOpen]);

  if (!project) return null;

  const getSpecs = (projectId: string) => {
    switch (projectId) {
      case '01':
        return {
          software: 'Figma, SketchUp & V-Ray',
          geometry: 'Warm material layers, handcrafted joinery, refined spatial zoning',
          timeframe: '5 Weeks, concept to installation',
          clientNotes:
            'A luxurious Lagos residence designed around natural textures, sculptural lighting and quiet living moments. The home balances elevated materials with intimate comfort for everyday family life.',
          approach:
            'We translated the client’s mood board into a cohesive residential sanctuary by layering warm woods, soft linens and elegant neutral upholstery. Each area was calibrated to feel calm and connected while supporting both relaxed living and refined entertaining.',
          challenges:
            'The challenge was defining distinct living, dining and workspace zones within an open layout without disrupting the soft, uninterrupted atmosphere. We solved this with bespoke cabinetry, subtle level shifts, and layered lighting to create mood and function.',
          process:
            'Curated furniture selections, custom joinery, and lighting studies were combined with material sampling and on-site coordination to ensure a seamless elevated finish across the residence.',
          testimonial:
            'Zanori Spaces made our home feel beautifully calm and luxuriously designed. Their attention to detail transformed every room.'
        };
      case '02':
        return {
          software: 'Figma, AutoCAD & Twinmotion',
          geometry: 'Space-efficient layout, flow-focused furnishings, layered finish palette',
          timeframe: '4 Weeks, design through delivery',
          clientNotes:
            'A premium apartment concept created to maximize light, texture and storage in a compact urban home. The result is an elegant, understated interior with exceptional livability.',
          approach:
            'We introduced polished brass accents, soft neutral finishes and custom storage solutions to keep the interior airy yet luxurious. The apartment was designed to feel expansive through strategic furniture placement and reflective surfaces.',
          challenges:
            'Creating an upscale experience within a tighter footprint required precision planning for every corner. We used integrated shelving, multi-functional furnishings and open sightlines to preserve spaciousness.',
          process:
            'Executed refined wall treatments, bespoke millwork and layered textile details to deliver a modern apartment that feels both practical and elevated.',
          testimonial:
            'The apartment feels brighter, more spacious and remarkably sophisticated. Every detail exceeded our expectations.'
        };
      case '03':
        return {
          software: 'AutoCAD, SketchUp & Adobe Illustrator',
          geometry: 'Family-friendly furniture curation with durable textures and tactile warmth',
          timeframe: '3 Weeks, concept to procurement',
          clientNotes:
            'A family home furniture project centered on comfort, resilience and modern Nigerian style. The scheme blends elegant details with practical pieces designed for daily life.',
          approach:
            'We curated an approachable yet refined furniture collection with durable upholstery and soft, layered fabrics. The palette leans warm and grounded, with rounded silhouettes and smart storage components for active family living.',
          challenges:
            'Balancing aesthetic refinement with everyday durability was the main priority. We selected bespoke upholstery finishes and resilient surfaces that feel premium while standing up to real family use.',
          process:
            'Selected and sourced furniture, lighting, and accessories across living, dining and bedrooms, then aligned finish details to create a cohesive, inviting home environment.',
          testimonial:
            'Our home now feels polished and practical. The furniture choices are beautiful, comfortable and made for our family.'
        };
      default:
        return {
          software: 'AutoCAD, SketchUp & Adobe Illustrator',
          geometry: 'Thoughtful layout and material studies for residential interiors',
          timeframe: '4 Weeks, end-to-end delivery',
          clientNotes:
            'A tailored interior design workflow focused on polished finishes, refined furniture selection and elegant space planning.',
          approach:
            'We combined functional planning with premium material direction to craft a calm and elevated residential atmosphere.',
          challenges:
            'Ensuring every detail aligned with the client’s lifestyle and maintenance requirements required close collaboration and selective sourcing.',
          process:
            'Developed mood, layout and finish documentation before coordinating procurement and installation for a seamless experience.',
          testimonial:
            'Highly professional design work that feels luxurious without being excessive.'
        };
    }
  };

  const specs = getSpecs(project.num);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-x-4 inset-y-8 sm:inset-x-8 sm:inset-y-12 md:inset-x-16 md:inset-y-16 lg:inset-x-24 lg:inset-y-20 z-50 bg-gradient-to-b from-[#070707] to-[#0c0c0c] border border-[#D7E2EA]/10 rounded-[28px] p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-w-6xl mx-auto"
            style={{ boxShadow: '0 35px 90px -18px rgba(0,0,0,0.85)' }}
          >
            <div className="flex justify-between items-center pb-3 mb-4 md:mb-6 shrink-0">
              <div className="text-xs text-[#D7E2EA]/50 font-mono tracking-widest">
                {`${project.category.toUpperCase()} / CORE RENDER / SPECS / ${project.num}`}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 text-[#D7E2EA] hover:text-white hover:bg-white/6 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 md:gap-10 items-stretch min-h-0">
              <div className="flex flex-col gap-4">
                <div
                  className="relative flex-1 bg-black/30 rounded-[20px] overflow-hidden min-h-[260px] sm:min-h-[360px] flex items-center justify-center group"
                  style={{ boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.55), 0 20px 40px rgba(0,0,0,0.6)' }}
                >
                  <img
                    src={activeImage || project.images.col2}
                    alt={`${project.name} Active Render`}
                    className="w-full h-full object-cover rounded-[20px] transition-all duration-500 transform-gpu group-hover:scale-105 pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 40px rgba(124,255,178,0.02) inset' }}
                  />

                </div>

                <div className="grid grid-cols-3 gap-3 shrink-0">
                  {[project.images.col2, project.images.col1_1, project.images.col1_2].map((imgUrl, idx) => {
                    const isActive = activeImage === imgUrl || (!activeImage && idx === 0);
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`relative aspect-video rounded-lg overflow-hidden transition-all bg-black cursor-pointer focus:outline-none ${
                          isActive
                            ? 'ring-2 ring-[#7CFFB2] ring-opacity-30 shadow-[0_10px_30px_rgba(124,255,178,0.06)]'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        aria-pressed={isActive}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 overflow-y-auto pr-2">
                <div className="flex flex-col gap-5 sm:gap-6">
                  <div>
                    <h2 className="hero-heading font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none mb-2">
                      {project.name}
                    </h2>

                    <div className="flex items-center gap-3 mb-3 text-xs text-[#D7E2EA]/60">
                      {project.service && <span className="font-mono uppercase tracking-widest">{project.service}</span>}
                      {project.location && <span className="font-mono">{project.location}</span>}
                      {project.year && <span className="font-mono">{project.year}</span>}
                    </div>

                    {project.description ? (
                      <p className="font-medium text-white text-sm sm:text-base leading-relaxed mb-2">
                        {project.description}
                      </p>
                    ) : null}

                    <p className="font-light text-[#D7E2EA]/85 text-sm sm:text-base leading-relaxed">
                      {specs.clientNotes}
                    </p>
                  </div>

                  <div className="bg-white/4 backdrop-blur-md border border-[#D7E2EA]/8 p-4 rounded-2xl" style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.6)' }}>
                    <div className="flex items-start gap-3">
                      <Hourglass className="w-5 h-5 text-[#7CFFB2] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">Timeline</span>
                        <span className="text-white text-sm font-semibold tracking-wide">{specs.timeframe}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D7E2EA]/45">Approach & Strategy</span>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                        {specs.approach}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 pt-2 border-t border-[#D7E2EA]/6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D7E2EA]/45">Technical Challenges & Solutions</span>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                        {specs.challenges}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 pt-2 border-t border-[#D7E2EA]/6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#D7E2EA]/45">Technical Pipeline Process</span>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                        {specs.process}
                      </p>
                    </div>
                  </div>

                  <div className="border-l-2 border-[#BBCCD7] pl-4 py-1 flex items-start gap-3 mt-1 bg-white/[0.02] p-3 rounded-r-2xl">
                    <Quote className="w-4 h-4 text-[#BBCCD7] shrink-0 mt-1 opacity-70" />
                    <div>
                      <p className="text-xs italic text-[#D7E2EA]/85 leading-relaxed">
                        &ldquo;{specs.testimonial}&rdquo;
                      </p>
                      <span className="block font-mono text-[9px] text-[#BBCCD7] uppercase tracking-wider mt-1.5">
                        &mdash; Project Reviewer Feedback
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-yellow-500/20 px-3.5 py-3 rounded-2xl flex items-center gap-2 text-yellow-200/90 shrink-0 mt-4">
                  <AlertCircle className="w-4 h-4 stroke-[2]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest leading-none">
                    Preview environment simulates high-fidelity active web3 nodes.
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
