import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { InquiryFormData } from '../types';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceRequestPreset: string;
  briefPreset: string;
}

export default function ContactForm({ isOpen, onClose, serviceRequestPreset, briefPreset }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    service: '',
    purpose: '',
    budget: '',
    brief: '',
    timeline: ''
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

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

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
        location: '',
        service: '',
        purpose: '',
        budget: '',
        brief: '',
        timeline: ''
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="consultation-modal fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 md:p-8">
      <div className="relative mx-auto w-full max-w-6xl max-h-[calc(100vh-4rem)] overflow-hidden rounded-[32px] bg-brand-base shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-brand-base hover:bg-brand-bark transition-colors"
          aria-label="Close consultation form"
        >
          ×
        </button>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-7 bg-brand-warm/40 border border-brand-wood/15 p-10 md:p-14 rounded-3xl space-y-10">
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
                  <label htmlFor="user-name" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    1. Name
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
                  <label htmlFor="user-contact" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    2. WhatsApp or Email
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
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="user-location" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                  3. Project Address/ Location
                </label>
                <input
                  type="text"
                  id="user-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Full address or neighborhood (e.g., Ikoyi, Lagos)"
                  className="w-full px-4 py-3 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="user-service" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    4. Design Packages
                  </label>
                  <select
                    id="user-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  >
                    <option value="">Select a service...</option>
                    <option value="Virtual Consultation 50k per hour">Virtual Consultation (50k per hour)</option>
                    <option value="Physical Consultation 150k within Lagos">Physical Consultation (150k within Lagos)</option>
                    <option value="Physical Consultation outside Lagos 250k">Physical Consultation (outside Lagos - 250k)</option>
                    <option value="3D Visualization & Moodboard from 200k">3D Visualization & Moodboard (from 200k)</option>
                    <option value="2D Visualization & Moodboard from 100k">2D Visualization & Moodboard (from 100k)</option>
                  </select>
                </div>

                {/* Purpose of Design */}
                <div className="space-y-2">
                  <label htmlFor="user-purpose" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    10. Purpose of design
                  </label>
                  <select
                    id="user-purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3.5 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  >
                    <option value="">Select purpose...</option>
                    <option value="Renovation">Renovation</option>
                    <option value="New Building">New Building</option>
                    <option value="Styling/ Furnishings">Styling/ Furnishings</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Budget Range */}
                <div className="space-y-2">
                  <label htmlFor="user-budget" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    14. Project Budget (₦)
                  </label>
                  <select
                    id="user-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3.5 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  >
                    <option value="">Select a range...</option>
                    <option value="< 1,000,000">&lt; 1,000,000</option>
                    <option value="1,000,000 - 3,000,000">1,000,000 - 3,000,000</option>
                    <option value="3,000,000 - 5,000,000">3,000,000 - 5,000,000</option>
                    <option value="5,000,000 - 10,000,000">5,000,000 - 10,000,000</option>
                    <option value="> 10,000,000">&gt; 10,000,000</option>
                  </select>
                </div>

                {/* Project Timeline */}
                <div className="space-y-2">
                  <label htmlFor="user-timeline" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold">
                    21. Project Timeline/ Deadline
                  </label>
                  <input
                    type="text"
                    id="user-timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. 3 months, or Dec 2026"
                    className="w-full px-4 py-3 bg-brand-base border border-brand-wood/20 rounded-xl text-sm font-light text-brand-dark focus:border-brand-dark focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Space Description */}
              <div className="space-y-2">
                <label htmlFor="user-brief" className="text-[11px] uppercase tracking-[0.1em] text-brand-muted block font-bold leading-relaxed">
                  20. Please provide a detailed description of your preferred design style, color palette, inspiration, or Pinterest board. Also, include anything we should know about your vision, lifestyle, and expectations for the project.
                </label>
                <textarea
                  id="user-brief"
                  rows={5}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Describe your vision here..."
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
        <div className="lg:col-span-5 space-y-10 lg:pl-6">
          {/* Google Maps Embed */}
          <div className="rounded-3xl h-[520px] overflow-hidden border border-brand-wood/15 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6559410857254!2d3.455421!3d6.434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7b5b8c8c8c8c8d%3A0x0!2sZanori%20Spaces!5e0!3m2!1sen!2sng!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Directions Link */}
          <a
            href="https://maps.app.goo.gl/WqYWVPsE7Ata1bSx6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-brand-dark hover:bg-brand-wood text-brand-base hover:text-brand-dark rounded-full text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300"
          >
            Get Directions
          </a>

          {/* Directory blocks */}
          <div className="space-y-6 pt-4">
            <div className="space-y-2 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-bark block">
                CREATIVE OFFICE
              </span>
              <div className="flex items-center space-x-2.5 text-xs text-brand-muted font-light">
                <MapPin size={12} className="text-brand-bark" />
                <span>38 Alfred Rewane Road, Ikoyi, Lagos, Nigeria</span>
              </div>
            </div>

            <div className="space-y-2 pb-4">
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
                <a href="https://wa.me/2349130377554" target="_blank" rel="noreferrer noopener" className="flex items-center space-x-2.5 hover:text-brand-dark transition-colors">
                  <Phone size={12} className="text-brand-bark" />
                  <span>+234 913 037 7554 (WhatsApp Direct)</span>
                </a>
                <a href="https://www.instagram.com/zanori_spaces/" target="_blank" rel="noreferrer noopener" className="flex items-center space-x-2.5 hover:text-brand-dark transition-colors">
                  <Instagram size={12} className="text-brand-bark" />
                  <span>@zanorispaces</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
