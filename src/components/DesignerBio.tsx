import React from 'react';

export default function DesignerBio() {
  return (
    <section id="designer-bio-section" className="bg-[#f5f4f0] pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center">

          <div className="flex flex-row gap-3 sm:gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-[220px_260px] lg:gap-6 relative p-6 sm:p-8 lg:p-0 bg-[#f5f4f0]">
            <div className="relative overflow-hidden bg-[#d4cfc6] flex-1 h-[140px] sm:h-[160px] lg:h-full">
              <img
                src="https://www.nawy.com/blog/wp-content/uploads/2022/07/interior-design.jpg"
                alt="Design collage top left"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden bg-[#bfbab1] flex-1 h-[140px] sm:h-[160px] lg:h-full">
              <img
                src="https://www.thedesigncode.in/wp-content/uploads/2024/11/TDC-Commercial-interior.png"
                alt="Design collage top right"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden flex-1 h-[140px] sm:h-[160px] lg:col-span-2 lg:row-start-2 lg:h-full shadow-[0_0_0_4px_#f5f4f0] bg-[#a8a29a]">
              <img
                src="https://cdn.prod.website-files.com/64a483b190bfff9cdf96e93b/66979dfec14a83ab8adf8176_BI_ASTRATECH_Reception%20(1).webp"
                alt="Design collage bottom"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

