import React, { useState } from 'react';
import { ArrowRight, Calculator, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onApplyEstimateBrief?: (presetName: string, textBrief: string) => void;
}

type SpaceType = 'living_room' | 'master_bedroom' | 'studio' | 'commercial' | 'villa';

export default function Services({ onSelectService, onApplyEstimateBrief }: ServicesProps) {
  // Calculator States
  const [spaceType, setSpaceType] = useState<SpaceType>('living_room');
  const [spaceSize, setSpaceSize] = useState<number>(45); // in sqm
  const [need3D, setNeed3D] = useState<boolean>(true);
  const [needSourcing, setNeedSourcing] = useState<boolean>(true);
  const [needSupervision, setNeedSupervision] = useState<boolean>(false);
  const [calculatorDone, setCalculatorDone] = useState<boolean>(false);
  const [calcResults, setCalcResults] = useState<{
    designFee: number;
    procurementFee: number;
    logisticsFee: number;
    total: number;
    breakdownString: string;
  } | null>(null);

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();

    // Rates based on real Lagos workspace interior consultancy practices
    let baseRatePerSqm = 12000; // NGN per sqm
    let spaceName = "Living Room";

    switch (spaceType) {
      case 'living_room':
        baseRatePerSqm = 12500;
        spaceName = "Premium Living Room";
        break;
      case 'master_bedroom':
        baseRatePerSqm = 11000;
        spaceName = "Restorative Master Bedroom";
        break;
      case 'studio':
        baseRatePerSqm = 14000;
        spaceName = "Studio Apartment";
        break;
      case 'commercial':
        baseRatePerSqm = 16500;
        spaceName = "Commercial Office / Gallery Lounge";
        break;
      case 'villa':
        baseRatePerSqm = 15000;
        spaceName = "Whole Multi-Level Villa";
        break;
    }

    // Design Fee
    let designFee = baseRatePerSqm * spaceSize;
    if (need3D) designFee += 250000; // Add standard VR and high-fidelity render generation fee

    // Sourcing / Procurement Fee coordination
    let procurementFee = 0;
    if (needSourcing) {
      procurementFee = Math.max(180000, designFee * 0.15); // 15% procurement management fee
    }

    // Logistics / Site supervision coordination (Lagos islands/mainland)
    let logisticsFee = 75000; // baseline transport for consultation surveys
    if (needSupervision) {
      logisticsFee = Math.max(220000, designFee * 0.10); // 10% on-site logistics management
    }

    const total = designFee + procurementFee + logisticsFee;

    const breakdownString = `Hi, I utilized the Zanori design fee calculator for a ${spaceName} of approximately ${spaceSize}M².\nRequired specs: ${need3D ? 'Include High-Fi Designs' : 'No 3D Required'}, ${needSourcing ? 'Include Sourcing & Timeless Furniture Retail' : 'Self-procurement'}, ${needSupervision ? 'Active On-site Construction Supervision' : 'Consultancy only'}.\nDirect calculated estimate draft: ${formatNaira(total)} NGN. Let's arrange a consultation to seal specifications.`;

    setCalcResults({
      designFee,
      procurementFee,
      logisticsFee,
      total,
      breakdownString
    });
    setCalculatorDone(true);
  };

  const handleApplyBriefToForm = () => {
    if (calcResults && onApplyEstimateBrief) {
      onApplyEstimateBrief(
        spaceType === 'commercial' ? 'Commercial Lounge' : 'Spatial Design & Consultation',
        calcResults.breakdownString
      );
    } else {
      // Fallback scroll to contact
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const serviceSpecs = [
    { title: "Physical Layout Scheme", desc: "Detailed 2D spatial distribution grid optimizing passage flows, natural ventilation, and daylight orientation customized for Lagos climates." },
    { title: "Mood & Sourcing Boards", desc: "Curation of authentic local materials, sustainable premium timbers (Iroko, Mahogany, Teak), international high-grade textiles, and paint palettes." },
    { title: "3D Photorealistic Synthesis", desc: "High-resolution virtual walkthrough renders matching real light interactions, structural proportions, and specific Zanori catalog sizing." },
    { title: "Turnkey Installation Management", desc: "Active on-site assembly, precise alignment of heirloom furniture pieces, carpentry installations, and custom space staging." }
  ];

  return (
    <div id="services-page" className="py-24 md:py-32 bg-brand-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Page Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              ZANORI CONSULTANCY DESK
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-dark leading-tight">
              Our professional <br />interior services
            </h1>
          </div>
          <p className="max-w-md text-sm text-brand-muted leading-relaxed font-light font-sans">
            
          </p>
        </div>

        {/* Dynamic Service Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-brand-warm/65 group rounded-3xl overflow-hidden border border-brand-wood/15 p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-md hover:border-brand-wood/45"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs tracking-wider text-brand-wood font-semibold">
                    {service.number}
                  </span>
                  {service.isSignature && (
                    <span className="flex items-center space-x-1.5 px-3 py-1 bg-brand-bark/10 text-brand-bark rounded-full text-[10px] uppercase tracking-wider font-semibold">
                      <span>Signature Desk</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-light leading-snug mb-4 group-hover:text-brand-bark transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-sm font-light text-brand-muted leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Scope list bullets */}
                <div className="space-y-2 pt-2 pb-6">
                  <span className="text-[10px] uppercase tracking-widest text-brand-wood font-semibold font-mono block mb-2">
                    Key Deliverables:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-brand-dark/80 font-mono">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-wood"></span>
                      <span>Bespoke mood boarding & fabric samples</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-wood"></span>
                      <span>2D CAD spatial distribution outlines</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-wood"></span>
                      <span>Sustainably-sourced wood structural selections</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-6 select-none mt-auto">
                <div
                  className="h-10 w-28 rounded-lg shadow-sm border border-brand-wood/10 flex items-center justify-center text-[8px] tracking-wider text-brand-wood bg-brand-base font-mono"
                  style={{ background: service.imageBg }}
                >
                  {service.name.split(' ')[0].toUpperCase()} WORKSPACE
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(service.name)}
                  className="flex items-center justify-between sm:justify-start space-x-2 text-xs uppercase tracking-[0.15em] font-semibold text-brand-dark hover:text-brand-bark transition-colors duration-300 cursor-pointer text-left"
                >
                  <span>Inquire service</span>
                  <ArrowRight
                    size={14}
                    className="transform transition-transform duration-300 group-hover:translate-x-2 text-brand-wood"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service Specifications Sections (Flesh out deliverables) */}
        <div className="bg-brand-base/50 rounded-3xl border border-brand-wood/15 p-8 md:p-12 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.25em] text-brand-wood uppercase font-mono block">OUR DESIGN STANDARD</span>
            <h2 className="font-serif text-3xl font-light text-brand-dark">How we manage your physical space transformation</h2>
            <p className="text-xs text-brand-muted font-light leading-relaxed font-sans">
              Unlike quick decorators, we execute physical shell evaluations to assess sunlight angles, acoustics, and air conditioning vents to make sure Lagos tropical heat matches calm Nordic layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceSpecs.map((spec, i) => (
              <div key={i} className="space-y-3 bg-brand-base p-6 rounded-2xl border border-brand-wood/10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-lg bg-brand-base text-brand-wood font-mono font-bold text-xs flex items-center justify-center mb-4">
                    0{i+1}
                  </div>
                  <h4 className="font-serif text-[17px] font-medium text-brand-dark mb-2">{spec.title}</h4>
                  <p className="text-xs text-brand-muted font-sans font-light leading-relaxed">{spec.desc}</p>
                </div>
                <div className="pt-2 flex items-center space-x-1.5 text-[9px] font-mono text-brand-bark/80 uppercase font-semibold">
                  <CheckCircle size={10} className="text-brand-wood" />
                  <span>Standard desk brief</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INCREDIBLE INTERACTIVE FEATURE - Lagos Design Fee Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-bark rounded-3xl overflow-hidden shadow-lg text-brand-base border border-brand-wood/20">
          
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-brand-bark/95">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand-wood/20 border border-brand-wood/20 text-brand-wood px-3.5 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-mono">
                <Calculator size={12} />
                <span>Cost Estimator</span>
              </div>
              <h3 className="font-serif text-4xl font-light leading-tight italic text-white">
                Calculate an instant project estimate.
              </h3>
              <p className="text-xs text-brand-sand/70 font-sans font-light leading-relaxed">
                Guage your expenses immediately. Select your scale specifications and our calculator delivers detailed estimations of your potential spending.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3 text-xs">
                <ShieldCheck size={16} className="text-brand-wood mt-0.5 shrink-0" />
                <span className="text-brand-sand/80 font-light leading-snug">
                  Draft calculated outputs are based strictly on premium recent vendor prices, artisan service fees, and consultation schedules.
                </span>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <HelpCircle size={16} className="text-brand-wood mt-0.5 shrink-0" />
                <span className="text-brand-sand/80 font-light leading-snug">
                  Need multiple villas or multi-property portfolios handled? Contact us directly.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-12">
            <form onSubmit={calculateEstimate} className="space-y-6">
              
              {/* Space Selection */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-mono tracking-widest text-brand-wood block font-bold">
                  01. Select Space Option
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'living_room', label: 'Living Room' },
                    { id: 'master_bedroom', label: 'Bedroom Suite' },
                    { id: 'studio', label: 'Studio Flat' },
                    { id: 'commercial', label: 'Office/Gallery' },
                    { id: 'villa', label: 'Whole Villa' },
                  ].map((space) => (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => {
                        setSpaceType(space.id as SpaceType);
                        setCalculatorDone(false);
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-light tracking-wide text-center border transition-all ${
                        spaceType === space.id
                          ? 'bg-brand-wood border-brand-wood text-brand-bark font-semibold'
                          : 'bg-transparent border-brand-wood/25 text-brand-sand hover:border-brand-sand'
                      }`}
                    >
                      {space.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Space Size Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-brand-wood block font-bold">
                    02. Rough Area
                  </label>
                  <span className="text-xs bg-brand-wood/10 border border-brand-wood/25 px-2.5 py-1 rounded text-brand-wood font-mono">
                    {spaceSize} M² (approx. {Math.round(spaceSize * 10.76)} sqft)
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="350"
                  step="5"
                  value={spaceSize}
                  onChange={(e) => {
                    setSpaceSize(parseInt(e.target.value));
                    setCalculatorDone(false);
                  }}
                  className="w-full accent-brand-wood bg-brand-wood/20 h-1 rounded-lg outline-hidden"
                />
                <div className="flex justify-between text-[9px] text-brand-wood font-mono uppercase">
                  <span>15 M² </span>
                  <span>350 M² </span>
                </div>
              </div>

              {/* Addons checkbox toggles */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-brand-wood block font-bold">
                  03. Custom Integration Requirements
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center space-x-3 text-xs text-brand-sand/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={need3D}
                      onChange={(e) => {
                        setNeed3D(e.target.checked);
                        setCalculatorDone(false);
                      }}
                      className="w-full accent-brand-wood rounded-sm h-4 w-4 bg-brand-bark border-brand-wood"
                    />
                    <span>Include 3D walkthrough rendering plans (+250k NGN)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-xs text-brand-sand/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needSourcing}
                      onChange={(e) => {
                        setNeedSourcing(e.target.checked);
                        setCalculatorDone(false);
                      }}
                      className="accent-brand-wood rounded-sm h-4 w-4 bg-brand-bark border-brand-wood"
                    />
                    <span>Heirloom catalog procurement and installation scheduling (15%)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-xs text-brand-sand/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needSupervision}
                      onChange={(e) => {
                        setNeedSupervision(e.target.checked);
                        setCalculatorDone(false);
                      }}
                      className="accent-brand-wood rounded-sm h-4 w-4 bg-brand-bark border-brand-wood"
                    />
                    <span>On-Site physical carpentry & styling oversight in Lagos (+10%)</span>
                  </label>
                </div>
              </div>

              {/* Calculate trigger */}
              {!calculatorDone ? (
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-cranberry text-brand-base text-xs uppercase tracking-widest font-semibold font-mono hover:bg-brand-bark/90 transition-all cursor-pointer"
                >
                  Generate direct design fee estimate
                </button>
              ) : (
                <div className="bg-brand-bark/95 rounded-xl border border-brand-wood/30 p-5 space-y-4 animate-feed-in">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-brand-wood font-mono font-medium pb-2">
                    <span>Draft Estimate Summary</span>
                    <span>VAT inclusive</span>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-brand-sand/80">
                      <span> Design Consultancy :</span>
                      <span className="font-mono text-white">{formatNaira(calcResults?.designFee || 0)}</span>
                    </div>
                    {needSourcing && (
                      <div className="flex justify-between text-brand-sand/80">
                        <span>Procurement & Assembly Handling:</span>
                        <span className="font-mono text-white">{formatNaira(calcResults?.procurementFee || 0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-sand/80">
                      <span>Logistics & Onsite Oversight:</span>
                      <span className="font-mono text-white">{formatNaira(calcResults?.logisticsFee || 0)}</span>
                    </div>

                    <div className="pt-2 flex justify-between text-sm font-semibold text-brand-base">
                      <span>Total Estimated Draft Allocation:</span>
                      <span className="font-mono text-brand-base">{formatNaira(calcResults?.total || 0)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyBriefToForm}
                    className="w-full py-3.5 rounded-xl bg-brand-cranberry hover:bg-brand-cranberry/90 text-brand-base text-xs uppercase tracking-widest font-semibold font-mono transition-all cursor-pointer text-center"
                  >
                    Apply this estimate as my consultation brief ✓
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

