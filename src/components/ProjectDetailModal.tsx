import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Hourglass, MapPin, Calendar, Layers } from 'lucide-react';

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

const getSpecs = (projectId: string) => {
  switch (projectId) {
    case '01':
      return {
        timeframe: '8 Weeks — Concept to Handover',
        clientNotes:
          'A penthouse residence in Lekki Phase 1 designed for a prominent lifestyle personality with a growing family. The brief demanded a home that would photograph beautifully while comfortably absorbing the demands of active family life. Performance fabrics, porcelain tile flooring rated for high foot traffic, and a modular storage system for the open-plan family room resolved both goals without compromise. The result reads as effortlessly composed — the durability decisions are invisible in the finished space.',
      };
    case '02':
      return {
        timeframe: '6 Weeks — Concept to Completion',
        clientNotes:
          'A high-rise apartment on Victoria Island conceived as a calm, contemporary retreat for a finance professional. The design exploits the city views through a restrained palette of warm limestone, aged oak, and blackened steel that draws the eye outward rather than competing with the skyline. Every material was specified for durability and ease of maintenance without sacrificing the considered, unhurried quality the client requested.',
      };
    case '03':
      return {
        timeframe: '10 Weeks — Full Home Redesign',
        clientNotes:
          'A four-bedroom family home in Ikoyi redesigned around a family of five with young children. The challenge was balancing livability with a premium aesthetic — soft furnishings were selected in stain-resistant performance fabrics, floor tiles were chosen for child-safe friction ratings, and bespoke cabinetry was engineered to grow with the family. Despite these functional priorities, the completed home reads as warm, layered, and effortlessly put together.',
      };
    default:
      return {
        timeframe: '6 Weeks — Design to Delivery',
        clientNotes:
          'A considered residential interior developed in close collaboration with the client, balancing refined aesthetics with long-term practicality. Every material selection, spatial arrangement, and detail was resolved through an iterative design and digital simulation process before any procurement was authorised.',
      };
  }
};

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (isOpen && project) setActiveImage(project.images.col2 || project.images.col1_1 || project.images.col1_2 || '');
    else setActiveImage('');
  }, [project, isOpen]);

  if (!project) return null;

  const specs = getSpecs(project.num);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            className="fixed inset-6 z-50 max-w-4xl mx-auto left-0 right-0 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/10 p-5 overflow-auto"
            style={{ maxHeight: '85vh' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-xs uppercase text-[#D7E2EA]/50">{project.category} • {project.num}</span>
                <h3 className="text-2xl font-black text-white mt-1">{project.name}</h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-full text-[#D7E2EA] hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-black/40">
                  <img src={activeImage || project.images.col2} alt={project.name} className="w-full h-64 object-cover" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[project.images.col2, project.images.col1_1, project.images.col1_2].map((src, i) => (
                    <button key={i} onClick={() => setActiveImage(src)} className={`rounded-lg overflow-hidden ${activeImage === src || (!activeImage && i === 0) ? 'ring-2 ring-[#D7E2EA]' : 'opacity-70'}`}>
                      <img src={src} alt={`thumb-${i}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[#D7E2EA]/85 leading-relaxed">
                  {project.description ?? specs.clientNotes}
                </p>

                <div className="bg-white/5 border border-[#D7E2EA]/8 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Hourglass className="w-5 h-5 text-[#BBCCD7]" />
                    <div>
                      <div className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase">Timeline</div>
                      <div className="text-sm font-medium uppercase">
                        {project.year ? `${project.year} · ` : ''}{specs.timeframe}
                      </div>
                    </div>
                  </div>
                </div>

                {project.location && (
                  <div className="bg-white/5 border border-[#D7E2EA]/8 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#BBCCD7]" />
                      <div>
                        <div className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase">Location</div>
                        <div className="text-sm font-medium">{project.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {project.service && (
                  <div className="bg-white/5 border border-[#D7E2EA]/8 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-[#BBCCD7]" />
                      <div>
                        <div className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase">Services</div>
                        <div className="text-sm font-medium">{project.service}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
