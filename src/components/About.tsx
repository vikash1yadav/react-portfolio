"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { personalInfo, stats } from "@/data/content";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(val) {
        // If it's a decimal, keep one decimal place, otherwise round to integer
        if (val % 1 === 0 || val >= 10) {
          node.textContent = Math.round(val).toString();
        } else {
          node.textContent = val.toFixed(2);
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}

export function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  } as const;

  return (
    <section id="about" className="py-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12 lg:items-center"
        >
          {/* Header & Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold tracking-wider text-primary-accent uppercase">
                About Me
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who I Am & What I Do
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {personalInfo.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-4 text-center shadow-xs transition-colors hover:border-muted-foreground/30"
                >
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    <Counter value={stat.numberValue} />
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Photo / Avatar Frame */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-sm w-full aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
              {/* Outer double border / glow effect */}
              <div className="absolute inset-0 border border-primary-accent/20 rounded-2xl scale-[1.03] -z-10 transition-all duration-300 group-hover:scale-[1.05]" />
              
              <Image
                src="/avatar.png"
                alt={personalInfo.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay shadow / edge gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default About;
