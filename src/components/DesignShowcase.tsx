import React from 'react';
import { ArrowUpRight, Download, Layers } from 'lucide-react';
import { DesignShowcaseItem } from '../types';

interface DesignShowcaseProps {
  items: DesignShowcaseItem[];
}

export default function DesignShowcase({ items }: DesignShowcaseProps) {
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="design-showcase" className="py-24 md:py-32 bg-brand-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              FEATURED DESIGN SHOWCASE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-tight">
              Curated design assets for clients to browse, download, or purchase.
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed font-light font-sans">
              Offer a polished collection of plain design files and 3D design assets that can be made available for free or sold as premium resources.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-wood/15 bg-brand-warm/60 px-5 py-4 text-sm text-brand-dark shadow-xs">
            <div className="flex items-center gap-2 text-brand-bark">
              <Layers size={15} />
              <span className="font-medium">Managed from the admin panel</span>
            </div>
            <p className="mt-2 text-xs text-brand-muted font-sans">
              Upload new showcase items, assign pricing, and control access directly from the website backend.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-brand-wood/15 bg-brand-warm/50 shadow-sm min-h-[320px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: item.imageUrl ? `url('${item.imageUrl}') center/cover` : item.imageBg,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <div className="relative h-full flex flex-col justify-between p-6 text-brand-base">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm">
                    {item.assetType}
                  </span>
                  <span className="rounded-full bg-brand-bark/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
                    {item.accessType}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-light leading-tight">{item.title}</h3>
                  <p className="text-sm text-brand-sand/90 leading-relaxed font-sans">
                    {item.description}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-brand-sand/70">
                    {[item.category, item.designStyle, item.format].filter(Boolean).join(' · ')}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/15">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-sand/70">Access</p>
                    <p className="text-sm font-semibold">
                      {item.accessType === 'Free' ? 'Free access' : formatNaira(item.price)}
                    </p>
                  </div>

                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-medium hover:bg-white/20 transition-colors"
                    >
                      <Download size={12} />
                      View asset
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-medium">
                      <ArrowUpRight size={12} />
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
