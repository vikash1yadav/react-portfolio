"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "@/data/content";

function ExperienceCard({ item, index }: { item: typeof experience[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.6,
      },
    },
  } as const;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline Node Icon/Dot */}
      <div className="absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-xs transition-colors hover:border-primary-accent">
        <div className="h-2.5 w-2.5 rounded-full bg-primary-accent" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-all duration-300">
        {/* Card Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Briefcase size={16} className="text-primary-accent" />
              {item.role}
            </h3>
            <p className="text-sm font-semibold text-muted-foreground mt-0.5">
              {item.company}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2 sm:mt-0 font-medium">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {item.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {item.location}
            </span>
          </div>
        </div>

        {/* Detailed Projects / Achievements */}
        <div className="mt-6 space-y-6">
          {item.projects ? (
            item.projects.map((proj, pIdx) => (
              <div key={pIdx} className="space-y-2 border-l-2 border-muted pl-4">
                <h4 className="text-sm font-bold text-foreground">
                  Project: {proj.name}
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  {proj.description}
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                  {proj.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="leading-relaxed">
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            item.achievements && (
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                {item.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="leading-relaxed">
                    {ach}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary-accent uppercase">
            Work History
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </p>
        </div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative border-l border-border ml-3 sm:ml-4">
          {/* Subtle line background glow */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-linear-to-b from-primary-accent/40 via-border to-transparent -z-10" />

          {experience.map((item, idx) => (
            <ExperienceCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Experience;
