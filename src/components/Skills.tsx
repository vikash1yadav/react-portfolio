"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/content";

function SkillCard({ category, idx }: { category: typeof skills[0]; idx: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
      },
    },
  } as const;

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <motion.div
      ref={cardRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-muted-foreground/30"
    >
      <h3 className="text-md font-bold text-foreground mb-4 pb-2 border-b border-border">
        {category.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, sIdx) => (
          <motion.span
            key={sIdx}
            variants={chipVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center rounded-lg bg-muted/60 border border-border px-3 py-1.5 text-xs font-semibold text-foreground cursor-default transition-colors hover:bg-primary-accent/10 hover:border-primary-accent/30 hover:text-primary-accent"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary-accent uppercase">
            Capabilities
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technical Stack
          </p>
        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat, idx) => (
            <SkillCard key={idx} category={cat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Skills;
