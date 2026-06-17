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
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
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
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "DESIGN CONSULTATION",
      description:
        "Professional guidance on floor plans, material selection, and palettes to give you absolute clarity and direction for your project.",
      position: "left",
    },
    {
      icon: <PaintBucket className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "SPACE STYLING (SOFT FURNISHINGS)",
      description:
        "The art of final curation—selecting textiles, accessories, and decorative elements to breathe life and personality into your existing layout.",
      position: "left",
    },
    {
      icon: <HugeiconsIcon icon={BedDoubleIcon} size={24} />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "FURNITURES ONLY",
      description:
        "Access our exclusive boutique of high-grade Nigerian hardwoods and Scandinavian-inspired pieces tailored for comfort and timeless appeal.",
      position: "right",
    },
    {
      icon: <img src="https://cdn-icons-png.flaticon.com/512/2639/2639476.png" alt="3D" className="w-6 h-6 object-contain" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "3D VISUALIZATION",
      description:
        "High-fidelity photorealistic renders and virtual walkthroughs to see every detail of your space before construction begins.",
      position: "right",
    },
    {
      icon: <Home className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-brand-wood" />,
      title: "EXTERIOR DESIGN",
      description:
        "Crafting stunning outdoor environments that harmonize with your architecture, enhancing curb appeal and functionality.",
      position: "right",
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

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-brand-bark font-normal leading-relaxed" variants={itemVariants}>
          Every space holds a story. At Zanori Spaces, we craft yours and make it timeless.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
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

            {/* Mobile-only Infinite Gallery */}
            <div className="md:hidden w-full mt-6">
              <InfiniteGallery />
            </div>
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
