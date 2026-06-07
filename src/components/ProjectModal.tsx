import { useEffect } from 'react';
import { X, MapPin, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-brand-base w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative border border-brand-wood/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-brand-dark/20 hover:bg-brand-dark/50 text-brand-dark hover:text-white transition-all cursor-pointer border border-brand-wood/15"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Visual Presentation Area - Left */}
          <div
            className="md:col-span-6 min-h-[300px] md:min-h-[500px] relative p-8 flex flex-col justify-between"
            style={{ background: project.imageBg }}
          >
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>

            {/* Simulated schematic framing */}
            <div className="absolute inset-4 border border-white/20 rounded-xl pointer-events-none"></div>

            {/* Meta */}
            <span className="relative z-10 font-mono text-[9px] text-white/70 uppercase tracking-widest">
              Lagos Project Spec: {project.id.toUpperCase()}
            </span>

            {/* Bottom display label */}
            <div className="relative z-10 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-wood font-medium">
                INTERIOR DETAIL
              </span>
              <h4 className="font-serif text-2xl font-light italic leading-none">
                {project.title}
              </h4>
            </div>
          </div>

          {/* Project Details Panel - Right */}
          <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-brand-warm/35">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-bark">
                  <MapPin size={12} />
                  <span className="text-xs uppercase tracking-wider font-medium">{project.location}</span>
                </div>
                <h3 className="font-serif text-3xl font-light leading-tight text-brand-dark">
                  {project.title}
                </h3>
              </div>

              

              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                  SERVICES EMPLOYED
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.servicesUsed.map((srv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-wood/10 text-brand-dark text-xs rounded-full border border-brand-wood/15"
                    >
                      <CheckCircle size={10} className="text-brand-bark" />
                      <span>{srv}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                  STUDIO ARCHIVE RESPONSE
                </span>
                <p className="text-sm font-light text-brand-muted leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  onClose();
                }}
                className="flex-1 text-center py-3 bg-brand-dark text-brand-base rounded-full hover:bg-brand-wood hover:text-brand-dark text-xs uppercase tracking-widest font-semibold transition-all"
              >
                Inquire about similar layouts
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-brand-dark/20 rounded-full hover:border-brand-dark text-xs uppercase tracking-widest font-semibold transition-all"
              >
                Dismiss Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

