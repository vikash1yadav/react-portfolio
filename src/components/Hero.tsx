"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/content";

export function Hero() {
  const [typedCommand, setTypedCommand] = useState("");
  const [typedName, setTypedName] = useState("");
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [typedBio, setTypedBio] = useState("");
  const [activeStep, setActiveStep] = useState<"command" | "name" | "title" | "subtitle" | "bio" | "finished">("command");

  const commandText = "cat vikas-kumar.txt";

  useEffect(() => {
    let isActive = true;
    const timers: NodeJS.Timeout[] = [];

    const safeSetInterval = (fn: () => void, delay: number) => {
      const id = setInterval(() => {
        if (isActive) fn();
      }, delay);
      timers.push(id);
      return id;
    };

    const safeSetTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (isActive) fn();
      }, delay);
      timers.push(id);
      return id;
    };

    // Stage 1: Type Command
    let currentIdx = 0;
    const commandInterval = safeSetInterval(() => {
      if (currentIdx < commandText.length) {
        const char = commandText.charAt(currentIdx);
        setTypedCommand((prev) => prev + char);
        currentIdx++;
      } else {
        clearInterval(commandInterval);
        safeSetTimeout(() => {
          setActiveStep("name");
          typeName();
        }, 300);
      }
    }, 70);

    // Stage 2: Type Name
    const typeName = () => {
      let nameIdx = 0;
      const nameInterval = safeSetInterval(() => {
        if (nameIdx < personalInfo.name.length) {
          const char = personalInfo.name.charAt(nameIdx);
          setTypedName((prev) => prev + char);
          nameIdx++;
        } else {
          clearInterval(nameInterval);
          safeSetTimeout(() => {
            setActiveStep("title");
            typeTitle();
          }, 200);
        }
      }, 50);
    };

    // Stage 3: Type Title
    const typeTitle = () => {
      let titleIdx = 0;
      const titleInterval = safeSetInterval(() => {
        if (titleIdx < personalInfo.title.length) {
          const char = personalInfo.title.charAt(titleIdx);
          setTypedTitle((prev) => prev + char);
          titleIdx++;
        } else {
          clearInterval(titleInterval);
          safeSetTimeout(() => {
            setActiveStep("subtitle");
            typeSubtitle();
          }, 150);
        }
      }, 35);
    };

    // Stage 4: Type Subtitle
    const typeSubtitle = () => {
      let subtitleIdx = 0;
      const subtitleInterval = safeSetInterval(() => {
        if (subtitleIdx < personalInfo.subtitle.length) {
          const char = personalInfo.subtitle.charAt(subtitleIdx);
          setTypedSubtitle((prev) => prev + char);
          subtitleIdx++;
        } else {
          clearInterval(subtitleInterval);
          safeSetTimeout(() => {
            setActiveStep("bio");
            typeBio();
          }, 150);
        }
      }, 25);
    };

    // Stage 5: Type Bio/Value Prop
    const typeBio = () => {
      let bioIdx = 0;
      const bioInterval = safeSetInterval(() => {
        if (bioIdx < personalInfo.valueProp.length) {
          const char = personalInfo.valueProp.charAt(bioIdx);
          setTypedBio((prev) => prev + char);
          bioIdx++;
        } else {
          clearInterval(bioInterval);
          setActiveStep("finished");
        }
      }, 10);
    };

    return () => {
      isActive = false;
      timers.forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
    };
  }, []);

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
        <div className="flex flex-col items-center justify-center">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground bg-card shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for Select Work & Consulting
          </div>

          {/* Command Prompt Simulation */}
          <div className="mt-8 font-mono text-sm sm:text-base text-muted-foreground/80 flex items-center justify-center gap-1.5 select-none bg-zinc-950/40 border border-border/40 px-4 py-2 rounded-lg max-w-md w-full">
            <span className="text-emerald-400 font-semibold">vikas@portfolio:~$</span>
            <span className="text-zinc-100">{typedCommand}</span>
            {activeStep === "command" && (
              <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
            )}
          </div>

          {/* Main Headings (Always mounted to prevent layout shifts & React mount latency) */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl font-mono min-h-[50px] sm:min-h-[70px] md:min-h-[80px]">
            {typedName}
            {activeStep === "name" && (
              <span className="inline-block w-2.5 h-8 sm:w-3.5 sm:h-12 bg-primary-accent ml-1 animate-pulse" />
            )}
          </h1>

          <p className="mt-4 text-xl font-bold tracking-tight text-primary-accent sm:text-2xl md:text-3xl font-mono min-h-[30px] sm:min-h-[36px]">
            {typedTitle}
            {activeStep === "title" && (
              <span className="inline-block w-2.5 h-6 sm:w-3 sm:h-8 bg-primary-accent ml-1 animate-pulse" />
            )}
          </p>
          
          <p className="mt-2 text-md font-medium tracking-wide text-muted-foreground/90 uppercase font-mono min-h-[24px]">
            {typedSubtitle}
            {activeStep === "subtitle" && (
              <span className="inline-block w-2 h-4 bg-muted-foreground ml-1 animate-pulse" />
            )}
          </p>

          {/* Value Prop */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground font-mono min-h-[84px] text-center">
            {typedBio}
            {activeStep === "bio" && (
              <span className="inline-block w-2 h-4 bg-muted-foreground ml-1 animate-pulse" />
            )}
          </p>

          {/* CTA Buttons */}
          <AnimatePresence>
            {activeStep === "finished" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <button
                  onClick={handleScrollToProjects}
                  className="group relative inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-semibold shadow-md transition-all hover:bg-foreground/95 hover:scale-[1.02] focus:outline-hidden"
                >
                  View Projects
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href={personalInfo.resumeUrl}
                  download="Vikas_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:scale-[1.02] focus:outline-hidden"
                >
                  <Download size={16} />
                  Download Resume
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {activeStep === "finished" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
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
        )}
      </AnimatePresence>
    </section>
  );
}
export default Hero;
