import React from 'react';

export default function WhyChooseUs() {
  return (
    <section id="about-us" className="bg-[#f5f4f0] pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-10 lg:gap-16 items-center">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="relative overflow-hidden rounded-[28px] h-[220px] sm:h-[260px] bg-[#d4cfc6] shadow-[0_30px_80px_rgba(44,30,24,0.12)]">
              <img
                src="https://www.nawy.com/blog/wp-content/uploads/2022/07/interior-design.jpg"
                alt="Interior design layout preview"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative overflow-hidden rounded-[28px] h-[220px] sm:h-[260px] bg-[#bfbab1] shadow-[0_30px_80px_rgba(44,30,24,0.12)]">
              <img
                src="https://www.thedesigncode.in/wp-content/uploads/2024/11/TDC-Commercial-interior.png"
                alt="Modern commercial interior in warm tones"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="col-span-2 relative overflow-hidden rounded-[32px] h-[300px] bg-[#a8a29a] shadow-[0_30px_80px_rgba(44,30,24,0.12)]">
              <img
                src="https://cdn.prod.website-files.com/64a483b190bfff9cdf96e93b/66979dfec14a83ab8adf8176_BI_ASTRATECH_Reception%20(1).webp"
                alt="Signature reception interior styling with bespoke finishes"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-0">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[2.75rem] md:text-[3.6rem] leading-[0.95]">
                  <span className="block font-sans font-bold text-[#1a1a1a]">Welcome to Zanori Spaces</span>
                  <span className="block font-serif italic font-light text-[#1a1a1a]">We make spaces alive,</span>
                  <span className="block font-serif italic font-light text-[#1a1a1a]">one square-foot at a time.</span>
                </h2>
                <p className="font-sans text-sm uppercase tracking-[0.32em] text-[#8b6f52]">Interior styling · Bespoke furniture · 3D visualization</p>
              </div>

              <div className="border-t border-[#d0cfc9] border-b border-[#d0cfc9] py-8">
                <p className="font-sans text-base leading-relaxed text-[#444] mb-5">
                  For over four years, we have been transforming spaces into sanctuaries. 
My name is Adejumoke, i am a Certified Space Stylist and Interior Designer, and the Founder & Lead Designer of Zanori Spaces.
                </p>
                <p className="font-sans text-base leading-relaxed text-[#444] mb-5">
                  For me, design goes beyond aesthetics. It is about creating intentional spaces that seamlessly blend beauty, functionality, and curated luxury. It is the art of crafting timeless interiors and bespoke furniture that reflect the personality, lifestyle, and vision of each client.

My mission is simple: to create distinctive spaces where every detail is thoughtfully considered, every piece serves a purpose, and every corner tells a story.
                </p>
                <p className="font-serif italic text-base leading-relaxed text-[#5d4c3f]">
                  Because every space holds a story. At Zanori Spaces, we craft yours and make it timeless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


