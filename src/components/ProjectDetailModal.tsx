import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Hourglass, AlertCircle } from 'lucide-react';

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
    case '04':
      return {
        timeframe: '3 Weeks Design to Master Render',
        clientNotes:
          "This project needed a striking, abstract spatial aesthetic to showcase dynamic depth.",
      };
    case '02':
    case '05':
      return {
        timeframe: '2 Weeks Exploratory Phase',
        clientNotes:
          'A brand exploratory project centering on kinetic iridescence and procedural detail.',
      };
    default:
      return {
        timeframe: '4 Weeks Production Cycle',
        clientNotes:
          'An organic, fluid core engine showcasing clean light beams and handcrafted finishes.',
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
                <p className="text-sm text-[#D7E2EA]/85">{specs.clientNotes}</p>

                <div className="bg-white/5 border border-[#D7E2EA]/8 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Hourglass className="w-5 h-5 text-[#BBCCD7]" />
                    <div>
                      <div className="font-mono text-[10px] text-[#D7E2EA]/40 uppercase">Timeline</div>
                      <div className="text-sm font-medium uppercase">{specs.timeframe}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-yellow-500/20 px-3.5 py-3 rounded-2xl flex items-center gap-2 text-yellow-200/90">
                  <AlertCircle className="w-4 h-4 stroke-[2]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest leading-none">Preview environment simulates high-fidelity active web3 nodes.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
