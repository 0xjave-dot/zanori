import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { PortfolioCategory, Project } from '../types';
import { Search, MapPin } from 'lucide-react';

interface PortfolioProps {
  onProjectSelect: (project: Project) => void;
  projects?: Project[];
}

export default function Portfolio({ onProjectSelect, projects }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<PortfolioCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projectsToUse = projects || PORTFOLIO_DATA;

  // Search and Category Filter logic
  const filteredProjects = projectsToUse.filter((project) => {
    const matchesCategory = activeTab === 'All' || project.category === activeTab;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.servicesUsed.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: PortfolioCategory[] = ['All', 'Homes', 'Commercial', 'Designs'];

  return (
    <div id="work-page" className="py-24 md:py-32 bg-brand-warm/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Page Header */}
        <div className="border-b border-brand-wood/25 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              ZANORI DESIGN GALLERY
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-dark leading-tight">
              Selected <br />case studies
            </h1>
          </div>
          <p className="max-w-md text-sm text-brand-muted leading-relaxed font-light font-sans">
            A comprehensive look at our completed spaces and high-fidelity designs. 
          </p>
        </div>

        {/* Filters and search panel */}
        <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-5 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-xs">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveTab(category)}
                className={`py-1.5 px-4 rounded-full text-xs font-light uppercase tracking-[0.12em] transition-all duration-300 relative ${
                  activeTab === category
                    ? 'text-brand-dark font-medium bg-[#E8E0D4] border border-brand-wood/25 shadow-xs'
                    : 'text-brand-muted hover:text-brand-dark bg-transparent border border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={13} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-brand-warm/60 rounded-full border border-brand-wood/20 focus:outline-hidden focus:border-brand-bark text-xs font-sans text-brand-dark placeholder:text-brand-muted"
            />
          </div>
        </div>

        {/* Masonry-Style / Adaptive Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-[250px] transition-all duration-500">
            {filteredProjects.map((project: Project) => {
              const isFirst = project.isFeatured;
              let colSpanClass = 'lg:col-span-1';
              let rowSpanClass = 'row-span-1';

              if (isFirst) {
                colSpanClass = 'lg:col-span-2';
                rowSpanClass = 'row-span-2';
              }

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onProjectSelect(project)}
                  className={`relative group rounded-3xl overflow-hidden shadow-xs cursor-pointer border border-brand-wood/15 focus:outline-hidden transition-all duration-500 hover:shadow-lg ${colSpanClass} ${rowSpanClass} text-left flex flex-col justify-between`}
                  style={{ background: project.imageBg }}
                >
                  {/* Visual Glassmorphic Accent Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/35 transition-colors duration-500 z-10"></div>

                  {/* Card Top Information */}
                  <div className="relative p-6 md:p-8 flex justify-between items-start z-20 w-full">
                    <div className="flex items-center space-x-2">
                      {project.isFeatured && (
                        <span className="px-3 py-1 bg-brand-dark text-brand-base text-[9px] uppercase tracking-[0.2em] rounded-full shadow-xs">
                          Featured Case
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-brand-dark text-[9px] uppercase tracking-[0.15em] rounded-full border border-white/20">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/50">{project.location}</span>
                  </div>

                  {/* Card Bottom / Hover Reveal Overlay */}
                  <div className="relative p-6 md:p-8 z-20 w-full mt-auto">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-light block mb-1">
                      {project.servicesUsed.join(' · ')}
                    </span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-white font-light group-hover:translate-y-[-4px] transition-transform duration-300">
                      {project.title}
                    </h3>
                    <div className="h-[1px] w-0 bg-brand-wood group-hover:w-full transition-all duration-500 mt-3"></div>
                    <p className="max-h-0 overflow-hidden text-white/80 text-xs font-light mt-2 group-hover:max-h-16 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                      {project.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-brand-base rounded-2xl border border-brand-wood/15 p-16 text-center space-y-3">
            <h3 className="font-serif text-2xl font-light text-brand-dark">No design case studies found</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Try typing another location or choosing different category filter tabs to explore our interior portfolio.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
