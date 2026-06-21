"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/data/content";

function GithubIcon({ size = 20, className = "" }) {
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

function LinkedinIcon({ size = 20, className = "" }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("submitting");

    // Mock API call to simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12"
        >
          {/* Contact Details Left Side */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold tracking-wider text-primary-accent uppercase">
                Get In Touch
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Let's Discuss Your Project
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Whether you're looking to migrate a legacy system, optimize your frontend engineering, or scale your backend architecture—let's connect.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary-accent/40 hover:shadow-xs transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Email Me</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary-accent/40 hover:shadow-xs transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Call Me</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{personalInfo.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{personalInfo.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Social channels */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-primary-accent hover:border-primary-accent/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-primary-accent hover:border-primary-accent/40 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
            </motion.div>
          </div>

          {/* Form Right Side */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 rounded-2xl border border-border bg-card p-8 shadow-xs"
          >
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Thank you for reaching out. I've received your submission and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 text-sm font-semibold text-primary-accent hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-primary-accent focus:outline-hidden transition-all ${
                      formErrors.name ? "border-red-500" : "border-border"
                    }`}
                    placeholder="John Doe"
                    disabled={formState === "submitting"}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-2 block w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-primary-accent focus:outline-hidden transition-all ${
                      formErrors.email ? "border-red-500" : "border-border"
                    }`}
                    placeholder="john@example.com"
                    disabled={formState === "submitting"}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`mt-2 block w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground focus:border-primary-accent focus:outline-hidden transition-all ${
                      formErrors.message ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Tell me about your project..."
                    disabled={formState === "submitting"}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{formErrors.message}</p>
                  )}
                </div>

                {formState === "error" && (
                  <p className="text-sm text-red-500 font-semibold">
                    An error occurred. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-semibold shadow-xs transition-all hover:bg-foreground/95 active:scale-[0.98] disabled:opacity-50 focus:outline-hidden cursor-pointer"
                >
                  {formState === "submitting" ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default Contact;
