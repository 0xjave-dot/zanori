import React from 'react';

export default function DesignerBio() {
  return (
    <section id="designer-bio-section" className="bg-[#f5f4f0] pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center">

          <div className="flex items-end justify-center gap-3 lg:grid lg:grid-cols-2 lg:grid-rows-[220px_260px] lg:gap-6 relative p-8 bg-[#f5f4f0]">
            <div className="relative overflow-hidden bg-[#d4cfc6] flex-shrink-0 w-[92px] h-[92px] sm:w-[108px] sm:h-[108px] lg:w-full lg:h-full">
              <img
                src="https://www.nawy.com/blog/wp-content/uploads/2022/07/interior-design.jpg"
                alt="Design collage top left"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden bg-[#bfbab1] flex-shrink-0 w-[112px] h-[112px] sm:w-[128px] sm:h-[128px] lg:w-full lg:h-full">
              <img
                src="https://www.thedesigncode.in/wp-content/uploads/2024/11/TDC-Commercial-interior.png"
                alt="Design collage top right"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden flex-shrink-0 w-[92px] h-[92px] sm:w-[108px] sm:h-[108px] lg:col-span-2 lg:row-start-2 lg:w-full lg:h-full shadow-[0_0_0_4px_#f5f4f0] bg-[#a8a29a]">
              <img
                src="https://cdn.prod.website-files.com/64a483b190bfff9cdf96e93b/66979dfec14a83ab8adf8176_BI_ASTRATECH_Reception%20(1).webp"
                alt="Design collage bottom"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[2.8rem] md:text-[3.8rem] leading-[0.95]">
                  <span className="block font-sans font-bold text text-[#1a1a1a]">We make spaces alive,</span>
                  <span className="block font-serif italic font-light text-[#1a1a1a]">one square-foot at a</span>
                  <span className="block font-serif italic font-light text-[#1a1a1a]">time.</span>
                </h2>
              </div>

              <div className="border-t border-[#d0cfc9] border-b border-[#d0cfc9] py-8">
                <p className="font-sans text-[14px] leading-relaxed text-[#444]">
                 When you imagine a interior design done right, we want to be the first to come to mind. 

Every project we take on, is a chance to make someone's everyday life a little more beautiful. 

Here, we strive to be creative, quality-driven, and always personal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

