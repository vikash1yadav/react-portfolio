# Vikas Kumar - Professional Developer Portfolio

A modern, minimalist, and responsive developer portfolio website designed for a **Senior Full Stack Developer**. The design features generous whitespace, a professional neutral palette with deep blue accents, dark mode toggle, and smooth, snappy animations.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher recommended)
- npm or pnpm / yarn

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd vikas-portfolio-anty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ✏️ Customizing Portfolio Content

All copy, stats, experience, skills, and projects are centralized in a single configuration file. You do **not** need to touch any React/component files to edit your information.

To customize the website contents:
1. Open the file [**`src/data/content.ts`**](src/data/content.ts) in your editor.
2. Edit the fields inside the following exported configurations:
   - `personalInfo`: Name, title, subtitle, email, phone, location, LinkedIn/GitHub links, bio paragraphs, and resume file link.
   - `stats`: Numerical metrics showing your career highlights (triggers a count-up animation when scrolled into view).
   - `experience`: Timelines for your past roles, companies, projects, and achievements.
   - `skills`: Grouped technologies categorized under Languages, Frontend, Backend, Databases, Tools.
   - `projects`: Showcase cards for your projects, including tech badges, descriptions, and repo/live links.

### 📄 Changing the Resume PDF
- Replace the file [**`public/Vikas_Kumar_Resume_Updated.pdf`**](public/Vikas_Kumar_Resume_Updated.pdf) with your updated resume PDF.
- If the filename changes, update the `resumeUrl` key in `src/data/content.ts` to match.

### 🖼️ Changing the Profile Picture
- Place your new headshot portrait in the `public/` directory (e.g. `public/avatar.png`).
- Set the filename to `avatar.png` to automatically replace the placeholder image.

---

## ⚡ Deployment to Vercel

This repository is pre-configured and ready to deploy directly to **Vercel** with zero setup.

### Option 1: Vercel CLI (Recommended for fast deployments)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

### Option 2: Vercel Dashboard

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project directly into your Vercel Dashboard.
3. Vercel will auto-detect Next.js and build it.

---

## 🛠️ Tech Stack & Structure

```text
vikas-portfolio-anty/
├── public/                 # Static assets (Resume PDF, Avatar image)
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles & Tailwind v4 Custom design system variables
│   │   ├── layout.tsx      # Main wrapper, ThemeProvider integration & SEO Meta Tags
│   │   └── page.tsx        # Section layouts assembler
│   ├── components/         # Modular, standalone visual components
│   │   ├── ThemeProvider.tsx  # Context for Dark/Light mode toggle
│   │   ├── Navbar.tsx      # Sticky header with responsive drawer
│   │   ├── Hero.tsx        # Title presentation & moving background grid
│   │   ├── About.tsx       # Bio paragraphs & animated stats
│   │   ├── Experience.tsx  # Career vertical milestones timeline
│   │   ├── Skills.tsx      # Grouped capability interactive chip arrays
│   │   ├── Projects.tsx    # Responsive projects layout
│   │   ├── Contact.tsx     # Stateful feedback form & direct links
│   │   └── Footer.tsx      # Copyright & social directories
│   └── data/
│       └── content.ts      # CENTRAL DATA STORE (Edit here for all changes)
```
