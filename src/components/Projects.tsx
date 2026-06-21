"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Terminal, Database, ShieldAlert, Cpu, ShoppingBag, CreditCard, MessageSquare } from "lucide-react";
import { projects } from "@/data/content";

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function getProjectIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("playground") || lowerTitle.includes("js")) {
    return <Terminal size={22} className="text-primary-accent" />;
  }
  if (lowerTitle.includes("gailgas") || lowerTitle.includes("database") || lowerTitle.includes("billing")) {
    return <Database size={22} className="text-primary-accent" />;
  }
  if (lowerTitle.includes("hvac") || lowerTitle.includes("attendance") || lowerTitle.includes("workforce")) {
    return <Cpu size={22} className="text-primary-accent" />;
  }
  if (lowerTitle.includes("electronics") || lowerTitle.includes("commerce") || lowerTitle.includes("top ten")) {
    return <ShoppingBag size={22} className="text-primary-accent" />;
  }
  if (lowerTitle.includes("microfinance") || lowerTitle.includes("loan") || lowerTitle.includes("ledger")) {
    return <CreditCard size={22} className="text-primary-accent" />;
  }
  return <MessageSquare size={22} className="text-primary-accent" />;
}

function ProjectCard({ item, index }: { item: typeof projects[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
        duration: 0.5,
      },
    },
  } as const;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-muted-foreground/30 group hover:translate-y-[-4px]"
    >
      {/* Accent strip on top for featured items */}
      {item.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary-accent" />
      )}

      <div>
        {/* Header Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border group-hover:bg-primary-accent/10 group-hover:border-primary-accent/30 transition-colors">
            {getProjectIcon(item.title)}
          </div>
          {item.featured && (
            <span className="inline-flex items-center rounded-md bg-primary-accent/10 px-2 py-0.5 text-xs font-semibold text-primary-accent">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary-accent transition-colors">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {item.longDescription && (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 font-medium">
            {item.longDescription}
          </p>
        )}
      </div>

      <div>
        {/* Tech Stack badging */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {item.techTags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 text-xs font-semibold">
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon size={14} />
              Repository
            </a>
          )}
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-primary-accent uppercase">
              Portfolio
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Work
            </p>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed sm:text-right">
            A selection of production-grade systems, migration frameworks, and open-source applications built throughout my engineering career.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} item={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Projects;
