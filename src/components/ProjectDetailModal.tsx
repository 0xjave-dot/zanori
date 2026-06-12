import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Layers, Hourglass, Sparkles, AlertCircle, Quote } from 'lucide-react';

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

  const getSpecs = (name: string) => {
    switch (name) {
      case "Project 01":
      case "Project 04":
        return {
          software: "Blender 3.6 LTS & Octane Render",
          geometry: "1,450,000 Polygons (Subdiv-Ready)",
          timeframe: "3 Weeks Design to Master Render",
          clientNotes:
            "This project needed a striking, abstract spatial aesthetic to showcase dynamic depth. We integrated high-contrast dark metals with ambient cyan emission accents to establish an unforgettable high-tech atmosphere.",
          approach: "We began by studying the client's vision for cutting-edge tech aesthetics. Our approach centered on layering procedural elements with hand-crafted volumetric details. Each metallic component was meticulously modeled to catch light in unexpected ways, creating a sense of movement and energy.",
          challenges: "The primary challenge was balancing geometric complexity with render performance. We solved this by leveraging Blender's subdivision surface technology and optimized our polygon distribution to keep the geometry subdividable while maintaining visual fidelity in close-up shots.",
          process: "Procedural space-voyage elements layered with physical glass shaders and volumetrics for deep space cloud aesthetics.",
          testimonial: "Raven's 3D work took our vision to an entire secondary atmosphere. Absolute visual genius!"
        };
      case "Project 02":
      case "Project 05":
        return {
          software: "Houdini FX, Redshift & Adobe After Effects",
          geometry: "850,000 Polygons (Procedural Meshes)",
          timeframe: "2 Weeks Exploratory Phase",
          clientNotes:
            "A brand exploratory project centering on kinetic iridescence, procedural glass refractions, and bubble geometry. Crafted to show how dynamic refractions can transform digital static mockups.",
          approach: "This exploration focused on pushing the boundaries of procedural design. We built a custom Houdini workflow that generates unique bubble geometries on every frame, ensuring no two moments feel identical. The iridescence shader was hand-tuned to respond realistically to environment lighting.",
          challenges: "Proceduralism at this scale demanded careful optimization of the noise fields and collision detection. We reduced render times by 40% through strategic use of Redshift's GPU acceleration and intelligent caching strategies.",
          process: "Procedural geometry generation based on a noise velocity field, using a highly complex custom absorption glass shader in Redshift.",
          testimonial: "Highly professional study in iridescence and color absorption that challenges standard web typography."
        };
      default:
        return {
          software: "Autodesk Maya, Cinema 4D & Substance 3D Painter",
          geometry: "2,200,000 Polygons (Heavy Particle Cache)",
          timeframe: "4 Weeks Production Cycle",
          clientNotes:
            "An organic, fluid core engine showcasing clean light beams. We built detailed robotic joints overlaid with marvelous designer soft body simulation templates.",
          approach: "The design philosophy centered on organic mechanics — bridging the gap between natural movement and mechanical precision. We rigged a complex hydraulic system with realistic joint constraints, then layered soft fabric elements to add warmth and tactility to an otherwise technical subject.",
          challenges: "Simulating realistic soft-body cloth interaction with rigid hydraulic components required extensive iteration. We developed custom collision meshes and fine-tuned the physics parameters to achieve the exact balance of stiffness and flow the client envisioned.",
          process:
            "Rigged hydraulic pistons coupled with soft fabric collision. Hand-painted metallic scratches in Substance Painter for grit and high tactile fidelity.",
          testimonial: "Raven demonstrated master-class understanding of physics-based mechanical models. Highly recommended!"
        };
    }
  };

  const specs = getSpecs(project.name || project.num || '');

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

                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/6 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#7CFFB2]" />
                    <span className="font-mono text-[10px] text-white tracking-widest uppercase">
                      
                    </span>
                  </div>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/4 backdrop-blur-md border border-[#D7E2EA]/8 p-4 rounded-2xl" style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.6)' }}>
                    <div className="flex items-start gap-2.5">
                      <Cpu className="w-5 h-5 text-[#7CFFB2] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">Software Stack</span>
                        <span className="text-white text-sm font-semibold tracking-wide">{specs.software}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Layers className="w-5 h-5 text-[#7CFFB2] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">Geometry Density</span>
                        <span className="text-white text-sm font-semibold tracking-wide">{specs.geometry}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Hourglass className="w-5 h-5 text-[#7CFFB2] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">Timeline</span>
                        <span className="text-white text-sm font-semibold tracking-wide">{specs.timeframe}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-[#7CFFB2] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">Master Quality</span>
                        <span className="text-white text-sm font-semibold tracking-wide">4K Volumetrics / EXR</span>
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
