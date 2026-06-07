import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, ArrowRight, AlertCircle, RefreshCw, Bookmark, Lock } from 'lucide-react';

interface FurnitureSuggestion {
  piece: string;
  reason: string;
}

export interface DesignReport {
  style_name: string;
  headline: string;
  palette: string[];
  palette_names: string[];
  furniture_suggestions: FurnitureSuggestion[];
  designer_note: string;
}

interface RoomRendererProps {
  user: any;
  onSaveDesign: (report: DesignReport, imageUrl: string) => Promise<boolean>;
  savedDesigns: any[];
}

export default function RoomRenderer({ user, onSaveDesign, savedDesigns }: RoomRendererProps) {
  const [image, setImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DesignReport | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  // Saved design state trackers
  const [isSaving, setIsSaving] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  // Interaction feedback states
  const [shakeUpload, setShakeUpload] = useState(false);
  const [pulseStyles, setPulseStyles] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const styleOptions = [
    'Warm Scandinavian',
    'Clean minimal',
    'Earthy & natural',
    'Modern Lagos',
    'Dark & dramatic',
    'Soft Japandi',
  ];

  // Drag and drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showTooltip('Please upload an image file (PNG/JPG)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setErrorState(null);
        setTooltip(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleZoneClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setResult(null);
    setErrorState(null);
    setTooltip(null);
    setHasBeenSaved(false);
    setIsSaving(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const showTooltip = (msg: string) => {
    setTooltip(msg);
    setTimeout(() => setTooltip(null), 4000);
  };

  const handleGenerate = async () => {
    // Edge case validation
    if (!image) {
      setShakeUpload(true);
      showTooltip("Please upload a room photo first");
      setTimeout(() => setShakeUpload(false), 600);
      return;
    }

    if (!selectedStyle) {
      setPulseStyles(true);
      showTooltip("Choose a style to continue");
      setTimeout(() => setPulseStyles(false), 1200);
      return;
    }

    setIsGenerating(true);
    setResult(null);
    setErrorState(null);
    setTooltip(null);

    try {
      const response = await fetch('http://localhost:3000/api/reimagine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server returned error status');
      }

      const data = await response.json();
      
      // Enforce subtle animation delay for realistic processing feel
      setTimeout(() => {
        setResult(data);
        setIsGenerating(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setErrorState('Our designer AI is resting. Try again in a moment.');
      setIsGenerating(false);
    }
  };

  const handleResetStyleOnly = () => {
    setSelectedStyle(null);
    setResult(null);
    setErrorState(null);
    setTooltip(null);
    setHasBeenSaved(false);
    setIsSaving(false);
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styleInspirations = [
    {
      title: "Atmospheric Japandi Loft",
      desc: "An ultra-restorative blend of raw Japanese wabi-sabi and minimal Danish cozy design textures. Built around low-slung platform beds and textured paper lamps.",
      materials: "Nordic Ash, Organic Flax, Shoji Paper",
      imageBg: "linear-gradient(135deg, var(--color-brand-base) 0%, var(--color-brand-warm) 100%)"
    },
    {
      title: "Warm Lagos Modernism",
      desc: "Bold bespoke spaces. Combines rich dark Nigerian mahogany framing with spacious ventilation screens and premium high-contrast sand walls.",
      materials: "Durable Iroko, Polished Coquina, Bouclé Fabrics",
      imageBg: "linear-gradient(135deg, var(--color-brand-warm) 0%, var(--color-brand-base) 100%)"
    },
    {
      title: "Deep Dramatic Lounge",
      desc: "For space styling seeking confidence in the evening shadows. Built with deep rich charcoal wall finishes paired with brass accent lights.",
      materials: "Smoked Oak, Brushed Brass, Italian Leather",
      imageBg: "linear-gradient(135deg, var(--color-brand-wood) 0%, var(--color-brand-bark) 100%)"
    }
  ];

  const recentTransformations = [
    {
      before: "Empty 30M² Lekki concrete shell with glare shadows.",
      after: "Transformed into an open-concept warm Scandinavian study featuring wood-slat panels.",
      styleName: "Warm Scandinavian"
    },
    {
      before: "Cluttered living room with outdated heavy cabinetry.",
      after: "Reimagined with low-profile Oslo sofas, floating shelves, and coquina backing.",
      styleName: "Clean Minimal"
    }
  ];

  return (
    <div id="ai-renderer-page" className="w-full py-24 md:py-32 bg-brand-sand min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Page Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              ZANORI EXPERIMENTAL LAB
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-dark leading-tight">
              See your space <br />reimagined by AI
            </h1>
          </div>
          <p className="max-w-md text-sm text-brand-muted leading-relaxed font-light font-sans">
            Upload a snapshot of any home workspace — empty, furnished, or mid-renovation. Select a sensory mood direction, and our custom model calculates detailed layout arrangements, color schemes, and curated furniture guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Copy Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] text-brand-wood uppercase font-mono block">
                AN OFF-LINE EXPERIMENT
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-dark leading-tight italic">
                Reengineer your room instantly. No commitment, pure clarity.
              </h2>
            </div>
            
            <p className="text-sm font-sans font-light text-brand-dark/75 leading-relaxed">
              We understand starting an interior project can feel daunting. This workspace lets you drag in a quick photo of your current space, select an organic focus style, and receive immediate spatial arrangements and real-world palette guides tailored for structural Nigeria woods.
            </p>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4"
              >
                <button
                  onClick={handleScrollToContact}
                  className="group inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-brand-dark hover:opacity-85 transition-opacity duration-300 cursor-pointer"
                >
                  <span>Love what you see? Book a consultation</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300 text-brand-bark" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column - Tool Workspace */}
          <div className="lg:col-span-7 bg-brand-sand rounded-2xl border border-brand-wood/15 p-6 md:p-8 shadow-sm relative overflow-hidden">
            
            {/* Animating wood-tone progress bar */}
            <AnimatePresence>
            </AnimatePresence>

            {/* Step-by-Step workspace or side-by-side results display */}
            <AnimatePresence mode="wait">
              {!result && !errorState ? (
                // Setup and generate flow
                <motion.div
                  key="setup-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Step 1 - Upload */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-brand-muted font-mono font-medium">
                        Step 1 — Your room photo
                      </label>
                      {image && (
                        <button 
                          onClick={handleRemoveImage}
                          className="text-[10px] uppercase tracking-wider text-red-650 hover:text-red-800 transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <X size={10} />
                          <span>Clear image</span>
                        </button>
                      )}
                    </div>

                    <motion.div
                      animate={shakeUpload ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={handleZoneClick}
                      className={`relative min-h-[220px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${
                        image 
                          ? 'border-brand-wood/40 bg-zinc-50/50' 
                          : 'border-brand-bark/30 hover:border-brand-bark bg-brand-sand/55 hover:bg-brand-sand/80 cursor-pointer'
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/png, image/jpeg" 
                        onChange={handleFileChange}
                        className="hidden" 
                      />

                      {image ? (
                        <div className="relative w-full max-h-[240px] flex items-center justify-center overflow-hidden rounded-lg">
                          <img 
                            src={image} 
                            alt="Your Room Source" 
                            className="max-h-[240px] rounded-lg object-contain shadow-sm border border-brand-wood/10"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-brand-bark/80 hover:bg-brand-bark text-brand-sand transition-colors shadow-md"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                          <div className="space-y-3">
                          <div className="w-10 h-10 mx-auto rounded-full bg-brand-sand flex items-center justify-center text-brand-wood">
                            <Upload size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-brand-bark tracking-wide">
                              Drop a room photo here, or click to browse
                            </p>
                            <p className="text-[10px] text-brand-muted mt-1">
                              Supports PNG and JPG images
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Step 2 - Style selection */}
                  <div className="space-y-3 mt-4">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-brand-muted font-mono font-medium block">
                      Step 2 — Choose design direction
                    </label>

                    <motion.div 
                      animate={pulseStyles ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: 1, duration: 0.5 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                    >
                      {styleOptions.map((style) => {
                        const isActive = selectedStyle === style;
                        return (
                          <button
                            key={style}
                            type="button"
                            onClick={() => {
                              setSelectedStyle(style);
                              setTooltip(null);
                            }}
                              className={`px-3 py-2.5 rounded-lg border text-xs tracking-wider font-light text-center transition-all duration-300 cursor-pointer ${
                              isActive
                                ? 'bg-brand-bark text-brand-sand border-brand-bark font-medium shadow-sm'
                                : 'bg-transparent text-brand-dark/80 border-brand-wood/30 hover:border-brand-bark hover:text-brand-dark'
                            }`}
                          >
                            {style}
                          </button>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Step 3 - Action area / Error messages */}
                  <div className="space-y-3 pt-2">
                    {tooltip && (
                      <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-xs flex items-center space-x-2 animate-feed-in">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{tooltip}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className={`w-full py-4 rounded-xl font-serif text-sm uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center space-x-2.5 ${
                        isGenerating
                          ? 'bg-brand-bark/80 text-brand-sand/90 cursor-wait'
                          : 'bg-brand-bark hover:bg-brand-bark/90 text-brand-sand active:scale-[0.99] cursor-pointer shadow-sm'
                      }`}
                    >
                      <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
                      <span className="italic font-light">
                        {isGenerating ? 'Reimagining your space…' : 'Reimagine this room'}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : errorState ? (
                // Error state block
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[380px] flex flex-col items-center justify-center text-center p-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-800 flex items-center justify-center border border-orange-200">
                    <AlertCircle size={20} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg italic tracking-wider text-brand-dark font-light">
                      Design Studio Offline
                    </h3>
                    <p className="text-xs text-brand-muted max-w-sm font-sans font-light leading-relaxed">
                      {errorState}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setErrorState(null);
                      setIsGenerating(false);
                    }}
                    className="mt-2 px-5 py-2.5 rounded-full border border-brand-wood text-xs uppercase tracking-wider text-brand-dark hover:bg-brand-wood/10 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw size={12} />
                    <span>Try again</span>
                  </button>
                </motion.div>
              ) : (
                // Result Design Brief Report Card
                <motion.div
                  key="result-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 animate-feed-in"
                >
                  {/* Pair view header titles */}
                  <div className="flex pb-3 justify-between items-center text-[10px] uppercase tracking-[0.12em] font-mono text-brand-muted">
                    <span>Source Snapshot</span>
                    <span>AI Curated Design Report</span>
                  </div>

                  {/* Desktop side by side, Mobile stacked view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    
                    {/* Left Frame: original uploaded snapshot */}
                    <div className="rounded-lg bg-zinc-50 border border-brand-wood/10 flex flex-col justify-between overflow-hidden">
                      <div className="p-2 flex justify-between items-center bg-brand-sand/30">
                        <span className="text-[9px] uppercase tracking-widest text-brand-wood font-semibold">Your room snapshot</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                      </div>
                      <div className="flex-1 flex items-center justify-center p-4">
                        {image ? (
                          <img 
                            src={image} 
                            alt="Uploaded Room Original" 
                            className="max-h-[220px] rounded-sm object-contain shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                      </div>
                    </div>

                    {/* Right Frame: Reimagined detailed report block */}
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="rounded-lg bg-brand-sand/40 border border-brand-wood/30 p-5 space-y-5 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-brand-wood font-semibold pb-2">
                        <span>Reimagined by Zanori Spaces</span>
                        <span className="flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-wood animate-pulse" />
                          <span className="text-[8px] tracking-normal font-mono font-light uppercase">Synthesized</span>
                        </span>
                      </div>

                      {/* Header headline */}
                      <p className="font-serif text-[15px] italic text-brand-bark font-light leading-relaxed">
                        "{result?.headline}"
                      </p>

                      {/* Color swatches */}
                      <div className="space-y-1.5">
                        <span className="block text-[8px] uppercase tracking-widest text-brand-muted font-mono font-medium">
                          Inspired Palette
                        </span>
                              <div className="grid grid-cols-4 gap-1.5">
                          {result?.palette.map((color, idx) => (
                            <div key={idx} className="group cursor-pointer">
                              <div 
                                className="h-6 rounded-md shadow-xs border border-brand-wood/20 transition-transform group-hover:scale-105 duration-200" 
                                style={{ backgroundColor: color }} 
                              />
                              <span className="block text-[8px] text-brand-bark/80 font-mono mt-1 font-semibold truncate leading-tight">
                                {result.palette_names[idx] || 'Accent'}
                              </span>
                              <span className="block text-[7px] text-brand-muted font-mono uppercase truncate leading-tight">
                                {color}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Designer structured quote */}
                      <blockquote className="pl-3.5 border-l-2 border-brand-wood text-[11px] leading-relaxed font-light text-brand-wood italic font-sans">
                        {result?.designer_note}
                      </blockquote>
                    </motion.div>
                  </div>

                  {/* Furniture catalog listings mapping */}
                  <div className="pt-5 space-y-3">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-mono block animate-pulse">
                      Zanori Catalog curation for {result?.style_name}
                    </span>
                    <div className="space-y-2.5">
                      {result?.furniture_suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs py-1">
                          <span className="font-serif italic font-medium text-brand-bark shrink-0 sm:w-1/3">
                            {suggestion.piece}
                          </span>
                          <span className="text-brand-dark/75 font-sans font-light leading-snug sm:w-2/3 mt-0.5 sm:mt-0 text-left sm:text-right text-[11px]">
                            {suggestion.reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Control switch and Call to actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetStyleOnly}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-brand-wood hover:bg-brand-sand text-brand-wood text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center font-sans"
                    >
                      Try another style
                    </button>

                    {user ? (
                      <button
                        type="button"
                        disabled={isSaving || hasBeenSaved}
                        onClick={async () => {
                          if (!result) return;
                          setIsSaving(true);
                          const success = await onSaveDesign(result, image || '');
                          if (success) {
                            setHasBeenSaved(true);
                          }
                          setIsSaving(false);
                        }}
                        className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer border font-sans ${
                          hasBeenSaved 
                            ? 'bg-brand-base/80 text-brand-bark border-brand-wood/30 cursor-not-allowed' 
                            : 'bg-brand-warm text-brand-dark border-brand-wood/40 hover:bg-brand-sand'
                        }`}
                      >
                        <Bookmark size={12} className={hasBeenSaved ? 'text-brand-bark' : ''} />
                        <span>{isSaving ? 'Saving Design...' : hasBeenSaved ? 'Saved Design ✓' : 'Save as Brief'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          window.location.hash = '#/account';
                        }}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-warm hover:bg-brand-sand border border-brand-wood/40 text-brand-muted text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer font-sans"
                        title="Sign in to save this design"
                      >
                        <Lock size={12} />
                        <span>Save to Account (Sign in)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleScrollToContact}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-bark hover:bg-brand-bark/90 text-brand-sand text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer font-sans"
                    >
                      <span>Book a consultation</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <p className="text-[9px] text-brand-wood/75 italic text-center leading-relaxed">
                    * AI renders are for inspiration only. Your Zanori Spaces designer will produce a precise photorealistic render as part of your project. 
                    Your uploaded room photo + this design direction = your Zanori Spaces brief.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Dynamic Static Inspiration Boarding row */}
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-widest text-brand-wood font-mono uppercase font-bold block">STYLE PRESETS</span>
            <h3 className="font-serif text-3xl font-light text-brand-dark">Atmospheric Design Directions</h3>
            <p className="text-xs text-brand-muted font-sans font-light">Explore the visual blueprints our AI model utilizes to process raw physical spaces.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styleInspirations.map((item, idx) => (
              <div key={idx} className="bg-brand-base rounded-2xl border border-brand-wood/10 p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="h-44 w-full rounded-lg relative overflow-hidden flex items-center justify-center p-4 text-center" style={{ background: item.imageBg }}>
                    <div className="absolute inset-0 bg-black/5" />
                    <span className="font-mono text-[64px] font-bold text-black/5 select-none absolute bottom-0 right-2">STYLE</span>
                    <span className="text-xs font-serif italic text-brand-dark/80 relative z-10 px-4 py-2 bg-white/70 backdrop-blur-md rounded-md border border-white/25">
                      {item.title.split(' ')[0]} Frame
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-light text-brand-bark">{item.title}</h4>
                  <p className="text-xs text-brand-muted font-sans font-light leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-brand-wood">
                  <span>VENEERING MATERIALS:</span>
                  <span className="font-semibold text-brand-dark">{item.materials}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Transformations Roll */}
        <div className="bg-brand-bark/95 text-brand-base rounded-3xl p-8 md:p-12 space-y-8 border border-brand-wood/10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6">
            <h3 className="font-serif text-3xl font-light italic text-white flex items-center gap-2">
              <span>Transformed Concepts Log</span>
            </h3>
            <span className="text-xs font-mono text-brand-sand/60">LIVE EXPERIMENTAL SNAPSHOT FROM GUESTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-wood/15">
            {recentTransformations.map((concept, idx) => (
              <div key={idx} className="space-y-5 pt-6 md:pt-0 md:px-6 first:pl-0">
                <span className="inline-block text-[9px] uppercase font-mono tracking-widest text-brand-wood bg-brand-wood/20 px-2.5 py-1 rounded-sm">
                  {concept.styleName} Preset
                </span>
                
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex items-start space-x-3 text-brand-sand/70">
                    <span className="text-orange-400 font-mono select-none font-bold shrink-0">BEFORE:</span>
                    <p className="font-light leading-snug">{concept.before}</p>
                  </div>
                  <div className="flex items-start space-x-3 text-emerald-400">
                    <span className="font-mono select-none font-bold shrink-0">AFTER:</span>
                    <p className="font-light leading-snug">{concept.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

