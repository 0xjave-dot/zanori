import React, { useState } from 'react';

interface Step {
  num: string;
  name: string;
  desc: string;
}

export default function HowItWorks() {
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  
  const steps: Step[] = [
    {
      num: '01',
      name: 'Contact & Consultation',
      desc: 'A dedicated session where we listen to your needs, lifestyle flows, budget and expectations.'
    },
    {
      num: '02',
      name: 'Concept Formation',
      desc: 'We compile a complete project folder and build immersive visuals to simulate true materials and real-world lighting.'
    },
    {
      num: '03',
      name: 'Item Sourcing',
      desc: 'Sourcing design pieces alongside top quality upholstery and furniture to provide the best possible quality attainable.'
    },
    {
      num: '04',
      name: 'Installation Day',
      desc: 'We manage site setup, furniture installation, adjustments, and final styling, and finally hand over a beautiful, fully liveable space.'
    }
  ];

  return (
    <section id="process-section" className="pt-12 pb-16 md:py-24 bg-[#f5f4f0] md:bg-brand-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-24 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
            
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-tight">
            How we do what we do
          </h2>
          <p className="text-sm font-light text-brand-muted leading-relaxed max-w-lg pt-2">
            
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative">

          {/* Mobile: Only number cards in horizontal line */}
          <div className="md:hidden flex gap-4 justify-center items-start">
            {steps.map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setExpandedMobile(expandedMobile === step.num ? null : step.num)}
                onMouseEnter={() => setExpandedMobile(step.num)}
                onMouseLeave={() => setExpandedMobile(null)}
                className="relative flex-shrink-0 h-16 w-16 rounded-full bg-brand-warm hover:bg-brand-dark hover:text-brand-base text-brand-dark border border-brand-wood/30 flex items-center justify-center font-serif text-lg tracking-wider transition-all duration-300 z-10 shadow-xs"
              >
                {step.num}
              </button>
            ))}
          </div>

          {/* Mobile: Expanded content below */}
          {expandedMobile && (
            <div className="md:hidden mt-8 p-6 bg-brand-warm/40 rounded-2xl border border-brand-wood/15 space-y-3">
              <h3 className="font-serif text-lg font-light text-brand-dark">
                {steps.find(s => s.num === expandedMobile)?.name}
              </h3>
              <p className="text-sm font-light text-brand-muted leading-relaxed font-sans">
                {steps.find(s => s.num === expandedMobile)?.desc}
              </p>
            </div>
          )}

          {/* Desktop: Staggered Steps */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="space-y-8 group"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Numbered Circle Header */}
                <div className="flex items-center space-x-4 lg:block lg:space-x-0 lg:space-y-4">
                  <div className="h-14 w-14 rounded-full bg-brand-warm group-hover:bg-brand-dark group-hover:text-brand-base text-brand-dark border border-brand-wood/30 flex items-center justify-center font-serif text-lg tracking-wider transition-all duration-300 z-10 shadow-xs">
                    {step.num}
                  </div>
                </div>

                {/* Step contents */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-light text-brand-dark group-hover:text-brand-bark transition-colors duration-300">
                    {step.name}
                  </h3>
                  <p className="text-xs font-light text-brand-muted leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


