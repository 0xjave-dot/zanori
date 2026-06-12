import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArtboardToolIcon, MentoringIcon, BedDoubleIcon } from '@hugeicons/core-free-icons';
import { Box } from 'lucide-react';

export default function WhatWeDo() {
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  const services = [
    {
      icon: ArtboardToolIcon,
      lucideIcon: null,
      title: 'Space Styling',
      desc: 'Curating your existing space into something that feels completely intentional and alive.'
    },
    {
      icon: MentoringIcon,
      lucideIcon: null,
      title: 'Consultation',
      desc: 'One-on-one sessions to give you clarity on direction, and direction on what your space needs.'
    },
    {
      icon: BedDoubleIcon,
      lucideIcon: null,
      title: 'Furniture',
      desc: 'Sourcing and supplying pieces that fit into your space in style, comfort, and character.'
    },
    {
      icon: null,
      lucideIcon: true,
      title: '3D Visualization',
      desc: 'Photoreal 3D renders and walkthroughs to visualize design choices before implementation.'
    }
  ];

  return (
    <section className="pg">
      <div className="wwd">
        <div className="wwd-top">
          <span className="lbl"></span>
          <h2 className="text-[2.8rem] md:text-[3.8rem] leading-[0.95] font-sans font-bold text-[#1a1a1a]">
            What We Do
          </h2>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-start mb-8">
          {services.map((svc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setExpandedMobile(expandedMobile === idx ? null : idx)}
              onMouseEnter={() => setExpandedMobile(idx)}
              onMouseLeave={() => setExpandedMobile(null)}
              className="flex-shrink-0 h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-brand-warm hover:bg-brand-dark hover:text-brand-base text-brand-dark border border-brand-wood/30 flex items-center justify-center transition-all duration-300 shadow-xs"
            >
              {svc.lucideIcon ? (
                <Box size={36} />
              ) : (
                <HugeiconsIcon icon={svc.icon} size={36} color="currentColor" strokeWidth={1.5} />
              )}
            </button>
          ))}
        </div>

        {expandedMobile !== null && (
          <div className="mb-8 p-6 bg-brand-warm/40 rounded-2xl border border-brand-wood/15 space-y-3">
            <h3 className="font-serif text-lg font-light text-brand-dark">
              {services[expandedMobile].title}
            </h3>
            <p className="text-sm font-light text-brand-muted leading-relaxed font-sans">
              {services[expandedMobile].desc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
