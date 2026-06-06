import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { InquiryFormData } from '../types';

interface ContactFormProps {
  serviceRequestPreset: string;
  briefPreset: string;
}

export default function ContactForm({ serviceRequestPreset, briefPreset }: ContactFormProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    contact: '',
    service: '',
    budget: '',
    brief: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync inputs if a preset is triggered externally
  useEffect(() => {
    if (serviceRequestPreset) {
      setFormData((prev) => ({ ...prev, service: serviceRequestPreset }));
    }
  }, [serviceRequestPreset]);

  useEffect(() => {
    if (briefPreset) {
      setFormData((prev) => ({ ...prev, brief: briefPreset }));
    }
  }, [briefPreset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return alert('Kindly provide your Name and Contact handle first.');

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form on success
      setFormData({
        name: '',
        contact: '',
        service: '',
        budget: '',
        brief: ''
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-24 md:py-32 bg-brand-base border-b border-brand-wood/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-7 bg-brand-warm/40 border border-brand-wood/15 p-8 md:p-12 rounded-3xl space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-brand-bark block">
              GET IN TOUCH 
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-dark">
              Consultation Booking
            </h2>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="user-name" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="user-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adewale Alao"
                    className="w-full px-4 py-3 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <label htmlFor="user-contact" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-medium">
                    Email / WhatsApp
                  </label>
                  <input
                    type="text"
                    id="user-contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="example@mail.com or +234..."
                    className="w-full px-4 py-3 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  />
                  <span className="text-[9px] text-brand-bark/80 font-medium block">
                    * We typically respond fastest via WhatsApp.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="user-service" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-medium">
                    Service Required
                  </label>
                  <select
                    id="user-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  >
                    <option value="">Select a service...</option>
                    <option value="Space Styling">Space Styling</option>
                    <option value="Design Consultation">Design Consultation</option>
                    <option value="Curated Furniture Retail">Quality Furniture Only</option>
                    <option value="3D Interior Design">3D Interior Design</option>
                    <option value="Full Project">Full Comprehensive Project</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label htmlFor="user-budget" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-medium">
                    Estimated Budget Range (₦)
                  </label>
                  <select
                    id="user-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3.5 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  >
                    <option value="">Select a range...</option>
                    <option value="Under ₦2M">Under ₦2,000,000</option>
                    <option value="₦2M — ₦5M">₦2,000,000 — ₦5,000,000</option>
                    <option value="₦5M — ₦10M">₦5,000,000 — ₦10,000,000</option>
                    <option value="₦10M+">₦10,000,000 +</option>
                  </select>
                </div>
              </div>

              {/* Space Description */}
              <div className="space-y-2">
                <label htmlFor="user-brief" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-medium">
                  Briefly describe your space...
                </label>
                <textarea
                  id="user-brief"
                  rows={4}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Tell us about the area limits, rooms, location, or desired products you wish to consult on..."
                  className="w-full px-4 py-3 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-dark hover:bg-brand-wood text-brand-base hover:text-brand-dark rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Transmitting details...' : 'Submit'}
              </button>
            </form>
          ) : (
            <div className="py-16 text-center space-y-4 animate-scale-up">
              <div className="h-16 w-16 bg-brand-wood/25 text-brand-bark rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-serif text-2xl font-light text-brand-dark">
                Thank you &mdash; we'll be in touch!
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                Your layout requirements have been successfully logged to Zanori Spaces Lagos Desk archives. Our designers typically follow up via WhatsApp inside 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* Right Studio Information Column */}
        <div className="lg:col-span-5 space-y-8 lg:pl-4">
          {/* Studio Image Representation Container */}
          <div
            className="rounded-3xl h-[260px] relative overflow-hidden flex flex-col justify-end p-6 border border-brand-wood/15"
            style={{ background: 'linear-gradient(135deg, #C4A882 0%, #8B6F52 50%, #2A2520 100%)' }}
          >
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none"></div>

            {/* Graphic technical guidelines */}
            <div className="absolute inset-4 border border-brand-base/20 rounded-xl pointer-events-none opacity-40"></div>

            <div className="relative z-10 text-brand-base space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-[#E8E0D4] font-medium font-mono">
                FIND US
              </span>
              <h4 className="font-serif text-lg font-light leading-snug">
               
              </h4>
            </div>
          </div>

          {/* Directory blocks */}
          <div className="space-y-6 pt-4">
            <div className="space-y-2 border-b border-brand-wood/15 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                CREATIVE OFFICE
              </span>
              <div className="flex items-center space-x-2.5 text-xs text-brand-muted font-light">
                <MapPin size={12} className="text-brand-bark" />
                <span>38 Alfred Rewane Road, Ikoyi, Lagos, Nigeria</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-brand-wood/15 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                RESPONSES
              </span>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                Direct queries are reviewed and returned within 6 hours. Projects executed nationwide.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                DIRECT CHANNELS
              </span>
              <div className="flex flex-col space-y-2 text-xs text-brand-muted font-light">
                <a href="#mail" className="flex items-center space-x-2.5 hover:text-brand-dark transition-colors">
                  <Mail size={12} className="text-brand-bark" />
                  <span>design@zanorispaces.com</span>
                </a>
                <a href="#tel" className="flex items-center space-x-2.5 hover:text-brand-dark transition-colors">
                  <Phone size={12} className="text-brand-bark" />
                  <span>+234 812 345 6789 (WhatsApp Direct)</span>
                </a>
                <a href="#ig" className="flex items-center space-x-2.5 hover:text-brand-dark transition-colors">
                  <Instagram size={12} className="text-brand-bark" />
                  <span>@zanorispaces</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
