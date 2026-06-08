import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArtboardToolIcon, MentoringIcon, BedDoubleIcon } from '@hugeicons/core-free-icons';
import { Box } from 'lucide-react';

export default function WhatWeDo() {
  return (
    <section className="pg">
      <div className="wwd">
        <div className="wwd-top">
          <span className="lbl">Our Services</span>
          <h2>What We Do</h2>
        </div>
        <div className="wwd-services">
          <div className="svc">
            <div className="svc-icon">
              <HugeiconsIcon icon={ArtboardToolIcon} size={32} color="currentColor" strokeWidth={1.5} />
            </div>
            <h3>Space Styling</h3>
            <p>Curating your existing space into something that feels completely intentional and alive.</p>
          </div>

          <div className="svc">
            <div className="svc-icon">
              <HugeiconsIcon icon={MentoringIcon} size={32} color="currentColor" strokeWidth={1.5} />
            </div>
            <h3>Consultation</h3>
            <p>One-on-one sessions to give you clarity on direction, and direction on what your space needs.</p>
          </div>

          <div className="svc">
            <div className="svc-icon">
              <HugeiconsIcon icon={BedDoubleIcon} size={32} color="currentColor" strokeWidth={1.5} />
            </div>
            <h3>Furniture</h3>
            <p>Sourcing and supplying pieces that fit into your space in style, comfort, and character.</p>
          </div>

          <div className="svc">
            <div className="svc-icon">
              <Box size={32} />
            </div>
            <h3>3D Visualization</h3>
            <p>Photoreal 3D renders and walkthroughs to visualize design choices before implementation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
