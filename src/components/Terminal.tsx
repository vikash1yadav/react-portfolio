"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from "lucide-react";
import { personalInfo, experience, skills, projects } from "@/data/content";

interface Line {
  text: string;
  type?: "default" | "accent" | "success" | "error" | "link";
  href?: string;
}

interface HistoryItem {
  command?: string;
  lines: Line[];
}

// Renders individual line based on type
function renderLineContent(line: Line) {
  const colorMap = {
    default: "text-zinc-300",
    accent: "text-primary-accent font-bold",
    success: "text-emerald-400 font-semibold",
    error: "text-red-400",
    link: "text-primary-accent hover:underline cursor-pointer",
  };

  const className = colorMap[line.type || "default"];

  if (line.type === "link" && line.href) {
    return (
      <a href={line.href} target="_blank" rel="noreferrer" className={className}>
        {line.text}
      </a>
    );
  }

  return <span className={className}>{line.text}</span>;
}

// Component to stream lines one by one, character by character
function StreamingLines({
  lines,
  speed = 3,
  onComplete,
  containerRef,
}: {
  lines: Line[];
  speed?: number;
  onComplete?: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [currentLineText, setCurrentLineText] = useState("");

  // Scroll to bottom dynamically as the characters stream in
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLineText, visibleLineCount, containerRef]);

  useEffect(() => {
    if (lines.length === 0) {
      onComplete?.();
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    setVisibleLineCount(0);
    setCurrentLineText("");

    const interval = setInterval(() => {
      if (lineIdx >= lines.length) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const currentLine = lines[lineIdx];
      if (!currentLine.text) {
        // Handle empty lines instantly
        lineIdx++;
        charIdx = 0;
        setVisibleLineCount((prev) => prev + 1);
        setCurrentLineText("");
        return;
      }

      setCurrentLineText((prev) => prev + currentLine.text.charAt(charIdx));
      charIdx++;

      if (charIdx >= currentLine.text.length) {
        lineIdx++;
        charIdx = 0;
        setVisibleLineCount((prev) => prev + 1);
        setCurrentLineText("");
      }
    }, speed);

    return () => clearInterval(interval);
  }, [lines, speed]);

  return (
    <div className="space-y-1">
      {lines.slice(0, visibleLineCount).map((line, idx) => (
        <div key={idx} className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {renderLineContent(line)}
        </div>
      ))}
      {visibleLineCount < lines.length && (
        <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {renderLineContent({ ...lines[visibleLineCount], text: currentLineText })}
        </div>
      )}
    </div>
  );
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const bannerLines: Line[] = [
    { text: " __      __ _ _                  _  __                                ", type: "accent" },
    { text: " \\ \\    / /(_) |                | |/ /                                ", type: "accent" },
    { text: "  \\ \\  / /  _| | ____ _ ___     | ' / _   _ _ __ ___   __ _ _ __      ", type: "accent" },
    { text: "   \\ \\/ /  | | |/ / _` / __|    |  < | | | | '_ ` _ \\ / _` | '__|     ", type: "accent" },
    { text: "    \\  /   | |   < (_| \\__ \\    | . \\| |_| | | | | | | (_| | |        ", type: "accent" },
    { text: "     \\/    |_|_|\\_\\__,_|___/    |_|\\_\\\\__,_|_| |_| |_|\\__,_|_|        ", type: "accent" },
    { text: "" },
    { text: "Welcome to Vikas Kumar's interactive terminal portfolio (v1.0.0).", type: "default" },
    { text: "Type help to view all available commands.", type: "success" },
    { text: "" }
  ];

  // Initialize terminal with banner
  useEffect(() => {
    setHistory([
      {
        lines: bannerLines,
      },
    ]);
  }, []);

  // Auto-scroll to bottom of terminal container only
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, isMinimized, isTyping]);

  // Focus input on terminal body click
  const handleTerminalClick = () => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const parts = trimmedInput.split(" ");
    const command = parts[0].toLowerCase();

    // Save to cmd history
    setCmdHistory((prev) => [...prev, trimmedInput]);
    setHistoryIndex(-1);
    setIsTyping(true);

    let responseLines: Line[] = [];

    switch (command) {
      case "help":
        responseLines = [
          { text: "Available commands:", type: "accent" },
          { text: "  help        - List all available commands", type: "success" },
          { text: "  about       - Display brief bio information", type: "success" },
          { text: "  experience  - Show professional work history timeline", type: "success" },
          { text: "  skills      - List technical skill categories & tools", type: "success" },
          { text: "  projects    - List portfolio projects with links", type: "success" },
          { text: "  contact     - Show direct contact channels", type: "success" },
          { text: "  socials     - Display clickable social media profile links", type: "success" },
          { text: "  whoami      - Display current role & location", type: "success" },
          { text: "  banner      - Redisplay the ASCII art banner", type: "success" },
          { text: "  clear       - Clear the terminal screen history", type: "success" }
        ];
        break;

      case "about":
        responseLines = [
          { text: personalInfo.name, type: "accent" },
          { text: `${personalInfo.title} — ${personalInfo.subtitle}`, type: "success" },
          { text: "" },
          ...personalInfo.bioParagraphs.map(p => ({ text: p, type: "default" as const }))
        ];
        break;

      case "whoami":
        responseLines = [
          { text: `Role:       ${personalInfo.title}`, type: "default" },
          { text: `Location:   ${personalInfo.location}`, type: "default" },
          { text: `Focus:      Backend microservices architectures, DB migrations, and Next.js optimization.`, type: "default" },
          { text: `Statement:  "${personalInfo.valueProp}"`, type: "success" }
        ];
        break;

      case "experience":
        experience.forEach((exp) => {
          responseLines.push({ text: `=== ${exp.role} ===`, type: "accent" });
          responseLines.push({ text: `${exp.company} | ${exp.location} | ${exp.period}`, type: "success" });
          if (exp.projects) {
            exp.projects.forEach((proj) => {
              responseLines.push({ text: `  Project: ${proj.name}`, type: "accent" });
              proj.achievements.forEach((ach) => {
                responseLines.push({ text: `    • ${ach}`, type: "default" });
              });
            });
          } else if (exp.achievements) {
            exp.achievements.forEach((ach) => {
              responseLines.push({ text: `  • ${ach}`, type: "default" });
            });
          }
          responseLines.push({ text: "" });
        });
        break;

      case "skills":
        responseLines.push({ text: "=== Technical Skill Matrix ===", type: "accent" });
        skills.forEach((cat) => {
          responseLines.push({ text: `${cat.category.padEnd(14)}: ${cat.skills.join(", ")}`, type: "default" });
        });
        break;

      case "projects":
        projects.forEach((proj) => {
          responseLines.push({ text: `▶ ${proj.title}`, type: "accent" });
          responseLines.push({ text: proj.description, type: "default" });
          responseLines.push({ text: `Stack: ${proj.techTags.join(", ")}`, type: "default" });
          if (proj.githubUrl) {
            responseLines.push({ text: `  GitHub: ${proj.githubUrl}`, type: "link", href: proj.githubUrl });
          }
          if (proj.liveUrl) {
            responseLines.push({ text: `  Live:   ${proj.liveUrl}`, type: "link", href: proj.liveUrl });
          }
          responseLines.push({ text: "" });
        });
        break;

      case "contact":
        responseLines = [
          { text: "=== Contact Channels ===", type: "accent" },
          { text: `Email:  ${personalInfo.email}`, type: "link", href: `mailto:${personalInfo.email}` },
          { text: `Phone:  ${personalInfo.phone}` },
          { text: `Loc:    ${personalInfo.location}` },
          { text: "Resume: Download PDF", type: "link", href: personalInfo.resumeUrl }
        ];
        break;

      case "socials":
        responseLines = [
          { text: "=== Social Profiles ===", type: "accent" },
          { text: `GitHub:   ${personalInfo.github}`, type: "link", href: personalInfo.github },
          { text: `LinkedIn: ${personalInfo.linkedin}`, type: "link", href: personalInfo.linkedin }
        ];
        break;

      case "banner":
        responseLines = bannerLines;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        setIsTyping(false);
        return;

      default:
        responseLines = [
          { text: `command not found: ${command}`, type: "error" },
          { text: "Type 'help' to see all available commands.", type: "default" }
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: trimmedInput, lines: responseLines }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0 || isTyping) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1 || isTyping) return;
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
                      lines: bannerLines,
                    },
                  ]);
                  setIsTyping(false);
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
            ref={bodyRef}
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
                  {/* Stream the latest item, render others statically */}
                  {idx === history.length - 1 ? (
                    <StreamingLines lines={item.lines} speed={2} onComplete={() => setIsTyping(false)} containerRef={bodyRef} />
                  ) : (
                    <div className="space-y-1">
                      {item.lines.map((line, lIdx) => (
                        <div key={lIdx} className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                          {renderLineContent(line)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
                disabled={isTyping}
                className="flex-1 bg-transparent text-zinc-100 border-none outline-hidden focus:ring-0 font-mono caret-emerald-400 disabled:opacity-50"
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
