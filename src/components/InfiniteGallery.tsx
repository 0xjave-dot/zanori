import React from 'react';

// Curated Kuula tours for the refined furniture showroom experience.
const KUULA_EMBEDS: string[] = [
  'https://kuula.co/share/5DQfs?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=1',
  'https://kuula.co/share/h5Hpv?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=1',
  'https://kuula.co/share/hb9t7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=1',
  'https://kuula.co/share/5H7Z7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=1'
];

export default function InfiniteGallery() {
  return (
    <section className="infinite-gallery-section" aria-label="Featured Projects">
      <div className="max-w-7xl mx-auto px-0">
        <div className="px-6 md:px-12">
          <h3 className="text-brand-ivory font-serif uppercase tracking-widest text-sm mb-6"></h3>
        </div>
      </div>

      <div className="infinite-gallery-wrapper">
        <div className="infinite-track" role="presentation">
          {KUULA_EMBEDS.map((src, idx) => (
            <div className="infinite-item" key={`kuula-a-${idx}`}>
              <iframe
                src={src}
                title={`Zanori Spaces interior tour ${idx + 1}`}
                style={{ border: 0 }}
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
                loading="lazy"
              />
              <div className="kuula-cover" />
            </div>
          ))}

          {/* Duplicate set for seamless looping */}
          {KUULA_EMBEDS.map((src, idx) => (
            <div className="infinite-item" key={`kuula-b-${idx}`}>
              <iframe
                src={src}
                title={`Zanori Spaces interior tour ${idx + 1} (b)`}
                style={{ border: 0 }}
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
                loading="lazy"
              />
              <div className="kuula-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
