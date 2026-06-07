import React, { useState } from 'react';

export default function DesignerBio() {
  const [openSection, setOpenSection] = useState<'mission' | 'vision'>('vision');

  return (
    <section id="designer-bio-section" className="bg-[#f5f4f0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center">

          <div className="relative p-8 grid grid-cols-2 grid-rows-[220px_260px] gap-4 lg:gap-6 bg-[#f5f4f0]">
            <div className="relative overflow-hidden bg-[#d4cfc6]">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
                alt="Design collage top left"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden bg-[#bfbab1]">
              <img
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
                alt="Design collage top right"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden col-span-2 row-start-2 mt-[-40px] shadow-[0_0_0_4px_#f5f4f0] bg-[#a8a29a]">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80"
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

              <div className="border-t border-[#d0cfc9] border-b border-[#d0cfc9]">
                <div className="flex flex-col divide-y divide-[#d0cfc9]">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-0 py-6 text-left font-sans font-semibold text-[#1a1a1a] text-[16px]"
                    onClick={() => setOpenSection('mission')}
                  >
                    <span>Our Mission Statement</span>
                    <span className={`inline-flex h-5 w-5 border border-[#999] ${openSection === 'mission' ? 'rotate-45' : ''} transition-transform duration-200`} />
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-0 py-6 text-left font-sans font-semibold text-[#1a1a1a] text-[16px]"
                    onClick={() => setOpenSection('vision')}
                  >
                    <span>Our Vision Statement</span>
                    <span className={`inline-flex h-5 w-5 border border-[#999] ${openSection === 'vision' ? 'rotate-45' : ''} transition-transform duration-200`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {openSection === 'mission' ? (
                  <div className="pt-4">
                    <p className="font-sans text-[14px] leading-relaxed text-[#444]">
                      At Zanori Spaces, our mission is to craft intentional environments that reflect who you are — spaces designed with purpose, built with care, and finished with detail that endures.
                    </p>
                  </div>
                ) : (
                  <div className="pt-4">
                    <p className="font-sans text-[14px] leading-relaxed text-[#444]">
                      Our vision is to be a leading interior design studio, recognised for creativity, craftsmanship, and a deeply human approach to design. We strive to exceed expectations by delivering timeless spaces that enhance the quality of life for every client we work with.
                    </p>
                  </div>
                )}
                <p className="font-sans text-[14px] leading-relaxed text-[#444]">
                  We combine thoughtful strategy with bold aesthetics to make every space feel purposeful, memorable, and uniquely yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

