"use client";

import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/content";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  } as const;

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Subtle Moving Background Elements */}
      <div className="absolute inset-0 z-0 grid-bg opacity-30 dark:opacity-15" />
      <div className="absolute inset-0 z-0 bg-radial-[circle_at_center,transparent_40%,var(--background)_100%]" />
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary-accent/5 blur-[120px] dark:bg-primary-accent/10" />

      <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Subtitle Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground bg-card shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for Select Work & Consulting
          </motion.div>

          {/* Main Headings */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-xl font-bold tracking-tight text-primary-accent sm:text-2xl md:text-3xl"
          >
            {personalInfo.title}
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="mt-1 text-md font-medium tracking-wide text-muted-foreground/90 uppercase"
          >
            {personalInfo.subtitle}
          </motion.p>

          {/* Value Prop */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {personalInfo.valueProp}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={handleScrollToProjects}
              className="group relative inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-semibold shadow-md transition-all hover:bg-foreground/95 hover:scale-[1.02] focus:outline-hidden"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={personalInfo.resumeUrl}
              download="Vikas_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:scale-[1.02] focus:outline-hidden"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-5 w-3 rounded-full border border-muted-foreground/40 p-1 flex justify-center"
        >
          <div className="h-1.5 w-1 rounded-full bg-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
export default Hero;
