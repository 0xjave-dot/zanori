import React, { useState, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { BedDoubleIcon } from '@hugeicons/core-free-icons';
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Layout,
  Layers,
  Box
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "motion/react";
import InfiniteGallery from "./InfiniteGallery";

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollXProgress } = useScroll({
    container: mobileScrollRef,
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: <Layout className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "FULL COMPREHENSIVE INTERIOR DESIGN",
      description:
        "End-to-end design and execution for residential and commercial spaces, ensuring a cohesive and luxury finish from concept to completion.",
      position: "left",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      tag: "Residential & Commercial",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "DESIGN CONSULTATION",
      description:
        "Professional guidance on floor plans, material selection, and palettes to give you absolute clarity and direction for your project.",
      position: "left",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      tag: "Consultancy",
    },
    {
      icon: <PaintBucket className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "SPACE STYLING (SOFT FURNISHINGS)",
      description:
        "The art of final curation—selecting textiles, accessories, and decorative elements to breathe life and personality into your existing layout.",
      position: "left",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      tag: "Styling & Curation",
    },
    {
      icon: <HugeiconsIcon icon={BedDoubleIcon} size={24} />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "FURNITURES ONLY",
      description:
        "Access our exclusive boutique of high-grade Nigerian hardwoods and Scandinavian-inspired pieces tailored for comfort and timeless appeal.",
      position: "right",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      tag: "Bespoke Furniture",
    },
    {
      icon: <img src="https://cdn-icons-png.flaticon.com/512/2639/2639476.png" alt="3D" className="w-6 h-6 object-contain" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "3D VISUALIZATION",
      description:
        "High-fidelity photorealistic renders and virtual walkthroughs to see every detail of your space before construction begins.",
      position: "right",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      tag: "3D Technology",
    },
    {
      icon: <Home className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "EXTERIOR DESIGN",
      description:
        "Crafting stunning outdoor environments that harmonize with your architecture, enhancing curb appeal and functionality.",
      position: "right",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      tag: "Exterior Spaces",
    },
  ];

  const stats = [
    { icon: <Award />, value: 20, label: "Completed Projects", suffix: "+" },
    { icon: <Users />, value: 50, label: "Happy Clients", suffix: "+" },
    { icon: <Calendar />, value: 4, label: "Years Experience", suffix: "+" },
    { icon: <TrendingUp />, value: 100, label: "Unbridled Excellence", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-gradient-to-b from-brand-base to-brand-warm/20 text-brand-dark overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-wood/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-brand-bark/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-brand-wood font-bold tracking-widest text-[10px] mb-2 flex items-center gap-2 uppercase font-mono"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap size={14} />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-center">What We Do</h2>
          <motion.div
            className="w-24 h-1 bg-brand-wood"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-12 md:mb-16 text-brand-bark font-normal leading-relaxed" variants={itemVariants}>
          Every space holds a story. At Zanori Spaces, we craft yours and make it timeless.
        </motion.p>

        {/* Desktop Grid Layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-xl border border-brand-wood/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Interior Design"
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-brand-warm rounded-2xl -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Panels Layout */}
        <div className="block md:hidden space-y-6">
          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory no-scrollbar pb-4 -mx-4"
          >
            {services.map((service, index) => (
              <MobileServiceCard key={index} index={index} service={service} />
            ))}
            
            {/* Magnetic/Interactive CTA at End */}
            <motion.div
              className="snap-center shrink-0 w-[82vw] max-w-[300px] rounded-2xl bg-brand-dark text-brand-sand border border-brand-wood/20 shadow-premium-md relative min-h-[350px] overflow-hidden flex flex-col justify-between p-6"
              whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              initial={{ scale: 0.93, filter: "blur(2px)", opacity: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Subtle background overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-10 pointer-events-none"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-bark/50 via-brand-bark/85 to-brand-bark pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start w-full">
                <span className="font-serif text-brand-wood/40 text-4xl font-light italic">
                  →
                </span>
                <span className="bg-brand-cranberry/20 border border-brand-cranberry/30 text-brand-cranberry text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full font-semibold">
                  COLLABORATE
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <h3 className="text-xl font-serif font-light text-brand-sand tracking-wide uppercase leading-tight mb-2">
                  Let's Design Your Space
                </h3>
                <p className="text-xs text-brand-sand/75 font-normal leading-relaxed mb-6">
                  Bring your vision to life. Schedule an exclusive consultation with the Zanori design team.
                </p>
                <motion.button
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-between bg-brand-cranberry hover:bg-brand-cranberry/90 text-brand-base text-xs font-mono uppercase tracking-widest px-4 py-3.5 rounded-xl transition-all cursor-pointer font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Inquire Now</span>
                  <ArrowRight size={14} className="text-brand-base" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Progress Bar */}
          <div className="h-[2px] w-[calc(100%-1rem)] mx-2 bg-brand-wood/15 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-brand-wood origin-left absolute inset-0 w-full"
              style={{
                scaleX: scrollXProgress,
              }}
            />
          </div>

          {/* Mobile-only Infinite Gallery */}
          <div className="w-full pt-4">
            <h4 className="text-center font-mono text-[9px] tracking-widest text-brand-wood uppercase mb-2">Experience our 3D interactive spaces</h4>
            <InfiniteGallery />
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

interface MobileServiceCardProps {
  index: number;
  service: {
    icon: React.ReactNode;
    secondaryIcon?: React.ReactNode;
    title: string;
    description: string;
    image: string;
    tag: string;
  };
}

function MobileServiceCard({ index, service }: MobileServiceCardProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');
  
  return (
    <motion.div
      className="snap-center shrink-0 w-[82vw] max-w-[300px] rounded-2xl bg-brand-bark text-brand-sand border border-brand-wood/20 shadow-premium-md relative min-h-[350px] overflow-hidden flex flex-col justify-between p-6"
      whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      initial={{ scale: 0.93, filter: "blur(2px)", opacity: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background imagery per card */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${service.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bark/50 via-brand-bark/85 to-brand-bark pointer-events-none" />

      {/* Floating labels / tag and index */}
      <div className="relative z-10 flex justify-between items-start w-full">
        <span className="font-serif text-brand-wood/40 text-4xl font-light italic">
          {formattedIndex}
        </span>
        <span className="bg-brand-wood/25 border border-brand-wood/30 text-brand-wood text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full font-semibold">
          {service.tag}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-brand-base bg-brand-wood/25 p-2 rounded-lg relative border border-brand-wood/20 shrink-0">
            {service.icon}
            {service.secondaryIcon}
          </div>
          <h3 className="text-lg font-serif font-light text-brand-sand tracking-wide uppercase leading-tight">
            {service.title}
          </h3>
        </div>
        <p className="text-xs text-brand-sand/75 font-normal leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: any;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-brand-wood bg-brand-warm/50 p-3 rounded-lg transition-colors duration-300 group-hover:bg-brand-wood group-hover:text-brand-base relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-serif font-light text-brand-dark group-hover:text-brand-wood transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-brand-dark font-normal leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-brand-base/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border border-brand-wood/10 flex flex-col items-center text-center group hover:bg-brand-base transition-colors duration-300 shadow-xs"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-brand-warm flex items-center justify-center mb-2 sm:mb-3 md:mb-4 text-brand-wood group-hover:bg-brand-wood group-hover:text-brand-base transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span className="text-sm md:text-base">{suffix}</span>
      </motion.div>
      <p className="text-brand-dark font-medium text-[11px] sm:text-xs md:text-sm mt-1">{label}</p>
      <motion.div className="w-8 sm:w-10 h-0.5 bg-brand-wood mt-2 sm:mt-3 group-hover:w-12 sm:group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
