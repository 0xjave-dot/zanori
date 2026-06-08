import React from 'react';

export default function ConfidenceAssurance() {
  return (
    <section className="confidence-assurance bg-brand-ivory py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-bark font-mono block mb-4">
          TRUSTED EXPERTISE
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-brand-dark mb-8">
          Confident results you can depend on
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <div className="confidence-card p-8 rounded-3xl border border-brand-wood/10 bg-white shadow-sm">
            <p className="text-5xl font-serif text-brand-cranberry">4+</p>
            <p className="mt-4 text-sm text-brand-dark font-medium uppercase tracking-[0.25em]">Years Experience</p>
          </div>
          <div className="confidence-card p-8 rounded-3xl border border-brand-wood/10 bg-white shadow-sm">
            <p className="text-5xl font-serif text-brand-cranberry">20</p>
            <p className="mt-4 text-sm text-brand-dark font-medium uppercase tracking-[0.25em]">Completed Projects</p>
          </div>
          <div className="confidence-card p-8 rounded-3xl border border-brand-wood/10 bg-white shadow-sm">
            <p className="text-5xl font-serif text-brand-cranberry">50+</p>
            <p className="mt-4 text-sm text-brand-dark font-medium uppercase tracking-[0.25em]">Satisfied Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
