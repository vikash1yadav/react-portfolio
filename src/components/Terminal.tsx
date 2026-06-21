"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from "lucide-react";
import { personalInfo, experience, skills, projects } from "@/data/content";

interface HistoryItem {
  command?: string;
  output: React.ReactNode;
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const banner = (
    <pre className="text-[10px] leading-[12px] sm:text-xs text-primary-accent font-mono font-bold select-none overflow-x-auto py-2">
{` __      __ _ _                  _  __                                
 \\ \\    / /(_) |                | |/ /                                
  \\ \\  / /  _| | ____ _ ___     | ' / _   _ _ __ ___   __ _ _ __      
   \\ \\/ /  | | |/ / _\` / __|    |  < | | | | '_ \` _ \\ / _\` | '__|     
    \\  /   | |   < (_| \\__ \\    | . \\| |_| | | | | | | (_| | |        
     \\/    |_|_|\\_\\__,_|___/    |_|\\_\\\\__,_|_| |_| |_|\\__,_|_|        `}
    </pre>
  );

  const welcomeMessage = (
    <div className="text-sm font-mono text-muted-foreground/80 mt-2 select-none">
      <p>Welcome to Vikas Kumar's interactive terminal portfolio (v1.0.0).</p>
      <p className="mt-1">
        Type <span className="text-emerald-400 font-semibold">help</span> to view all available commands.
      </p>
    </div>
  );

  // Initialize terminal with banner
  useEffect(() => {
    setHistory([
      {
        output: (
          <>
            {banner}
            {welcomeMessage}
          </>
        ),
      },
    ]);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMinimized]);

  // Focus input on terminal body click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const parts = trimmedInput.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to cmd history
    setCmdHistory((prev) => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (command) {
      case "help":
        output = (
          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 font-mono text-sm">
            <span className="text-emerald-400">help</span>
            <span className="text-muted-foreground">List all available commands</span>
            
            <span className="text-emerald-400">about</span>
            <span className="text-muted-foreground">Display brief bio information</span>
            
            <span className="text-emerald-400">experience</span>
            <span className="text-muted-foreground">Show professional work history timeline</span>
            
            <span className="text-emerald-400">skills</span>
            <span className="text-muted-foreground">List technical skill categories & tools</span>
            
            <span className="text-emerald-400">projects</span>
            <span className="text-muted-foreground">List portfolio projects with links</span>
            
            <span className="text-emerald-400">contact</span>
            <span className="text-muted-foreground">Show direct contact channels & social profiles</span>
            
            <span className="text-emerald-400">socials</span>
            <span className="text-muted-foreground">Display clickable social media profile links</span>
            
            <span className="text-emerald-400">whoami</span>
            <span className="text-muted-foreground">Display current role and professional summary</span>
            
            <span className="text-emerald-400">banner</span>
            <span className="text-muted-foreground">Redisplay the ASCII art banner</span>
            
            <span className="text-emerald-400">clear</span>
            <span className="text-muted-foreground">Clear the terminal screen history</span>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="font-mono text-sm leading-relaxed max-w-3xl space-y-2">
            <p className="text-primary-accent font-semibold">{personalInfo.name}</p>
            <p className="text-emerald-400 font-medium">{personalInfo.title} — {personalInfo.subtitle}</p>
            {personalInfo.bioParagraphs.map((para, idx) => (
              <p key={idx} className="text-muted-foreground">{para}</p>
            ))}
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="font-mono text-sm text-muted-foreground max-w-2xl space-y-1">
            <p><span className="text-emerald-400">Role:</span> {personalInfo.title}</p>
            <p><span className="text-emerald-400">Location:</span> {personalInfo.location}</p>
            <p><span className="text-emerald-400">Focus:</span> Decomposing monoliths into high-throughput microservices, optimization, and frontend engineering.</p>
            <p><span className="text-emerald-400">Statement:</span> "Building high-performance, developer-focused clean code and resilient architectures."</p>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="font-mono text-sm space-y-4 max-w-3xl">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-border pl-3 ml-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-emerald-400 font-bold">{exp.role}</span>
                  <span className="text-primary-accent font-semibold">{exp.period}</span>
                </div>
                <div className="text-muted-foreground text-xs font-semibold mb-1">
                  {exp.company} • {exp.location}
                </div>
                {exp.projects && exp.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="mt-2 pl-2">
                    <p className="text-emerald-400/90 font-medium text-xs">Project: {proj.name}</p>
                    <ul className="list-disc list-inside text-muted-foreground text-xs space-y-0.5 mt-0.5">
                      {proj.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="leading-relaxed">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {!exp.projects && exp.achievements && (
                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-0.5 mt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="font-mono text-sm space-y-3 max-w-3xl">
            {skills.map((cat, idx) => (
              <div key={idx} className="grid grid-cols-[140px_1fr] gap-x-2">
                <span className="text-emerald-400 font-bold">{cat.category}:</span>
                <span className="text-muted-foreground">{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="font-mono text-sm space-y-3 max-w-3xl">
            {projects.map((proj, idx) => (
              <div key={idx} className="border-b border-border/40 pb-2 last:border-b-0">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">{proj.title}</span>
                  <div className="flex gap-3 text-xs">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-primary-accent hover:underline">
                        GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-primary-accent hover:underline">
                        Live
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-1">{proj.description}</p>
                <div className="text-[11px] text-muted-foreground/60 mt-1">
                  Stack: {proj.techTags.join(", ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <p><span className="text-emerald-400">Email:</span> <a href={`mailto:${personalInfo.email}`} className="hover:underline text-primary-accent">{personalInfo.email}</a></p>
            <p><span className="text-emerald-400">Phone:</span> <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a></p>
            <p><span className="text-emerald-400">Location:</span> {personalInfo.location}</p>
            <p><span className="text-emerald-400">Resume:</span> <a href={personalInfo.resumeUrl} download className="hover:underline text-primary-accent">Download PDF</a></p>
          </div>
        );
        break;

      case "socials":
        output = (
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <p><span className="text-emerald-400">GitHub:</span> <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline text-primary-accent">{personalInfo.github}</a></p>
            <p><span className="text-emerald-400">LinkedIn:</span> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-primary-accent">{personalInfo.linkedin}</a></p>
          </div>
        );
        break;

      case "banner":
        output = banner;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <div className="font-mono text-sm text-red-400">
            command not found: {command}. Type <span className="font-semibold underline">help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmedInput, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    }
  };

  return (
    <section id="terminal" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-base font-semibold tracking-wider text-primary-accent uppercase">
            Interactive Console
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vikas Shell (vsh)
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Prefer a CLI? Type commands in the terminal emulator below to interactively explore my profile.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div
          onClick={handleTerminalClick}
          className={`w-full rounded-xl border border-border shadow-2xl bg-zinc-950 overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? "h-12" : isMaximized ? "h-[80vh]" : "h-[500px]"
          }`}
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                title="Minimize"
              >
                <Minimize2 size={6} className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                  setIsMinimized(false);
                }}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                title="Maximize"
              >
                <Maximize2 size={6} className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([
                    {
                      output: (
                        <>
                          {banner}
                          {welcomeMessage}
                        </>
                      ),
                    },
                  ]);
                }}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                title="Reset Session"
              >
                <X size={6} className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Terminal Title */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-400">
              <TerminalIcon size={12} className="text-primary-accent" />
              <span>vikas@terminal:~ (bash)</span>
            </div>

            {/* Empty space to balance controls */}
            <div className="w-14"></div>
          </div>

          {/* Terminal Body */}
          <div
            className={`flex-1 p-4 overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-zinc-800 ${
              isMinimized ? "hidden" : "block"
            }`}
          >
            {/* Scrollable history items */}
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  {item.command && (
                    <div className="flex items-center text-sm">
                      <span className="text-emerald-400 mr-2">vikas@terminal:~$</span>
                      <span className="text-zinc-100">{item.command}</span>
                    </div>
                  )}
                  <div className="text-zinc-300 leading-relaxed">{item.output}</div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Current Input Prompt */}
            <form onSubmit={handleCommandSubmit} className="flex items-center text-sm mt-4">
              <span className="text-emerald-400 mr-2 select-none">vikas@terminal:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-zinc-100 border-none outline-hidden focus:ring-0 font-mono caret-emerald-400"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Terminal;
