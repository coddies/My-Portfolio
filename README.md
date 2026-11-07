# 🚀 Muhammad Burhan | AI & Full-Stack Portfolio

<div align="center">

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Deep-space themed, fully animated personal portfolio** showcasing Muhammad Burhan's skills in
**Generative AI, Agentic AI, Machine Learning, Full-Stack Engineering & Automation.**

**[🔗 GitHub Pages (Static)](https://coddies.github.io/My-Portfolio/)** &nbsp;|&nbsp; **[⚡ Vercel (Full — with AI Chat)](https://your-vercel-url.vercel.app)**

</div>

---

## 👤 About the Developer

| Field | Value |
|-------|-------|
| **Name** | Muhammad Burhan |
| **Role** | Undergraduate Student — BS Computer Science |
| **University** | Virtual University of Pakistan |
| **Location** | Chiniot, Pakistan |
| **Status** | ✅ Open to Work |
| **Email** | mb6679605@gmail.com |
| **GitHub** | [@coddies](https://github.com/coddies) |
| **LinkedIn** | [muhammad-burhan-73a81b27b](https://www.linkedin.com/in/muhammad-burhan-73a81b27b/) |
| **TikTok** | [@devmburhan](https://www.tiktok.com/@devmburhan) |
| **CV** | `Muhammad_Burhan_CV.pdf` (downloadable from portfolio) |

---

## ✨ Portfolio Features

| Feature | Description |
|---------|-------------|
| 🌌 **Particle Engine** | Animated canvas background with floating space particles |
| 🃏 **Card-Based Navigation** | Full-screen slide transitions between 7 sections |
| 🚀 **Rocket Boot Loader** | Animated rocket + panel split loader on first visit |
| ⌨️ **Typewriter Effects** | Dynamic role cycling on Hero + About section |
| 🖥️ **Terminal / Code UI** | Matrix-rain canvas terminal in About section |
| 🌍 **Orbital Solar System** | Animated concentric orbit rings with 30 skill nodes (Skills section) |
| 🎠 **3D Orbital Carousel** | Rotating 3D card carousel for Projects |
| 🏆 **Achievements + Certs** | Hackathon cards + certificate blade row with modal viewer |
| 📖 **Case Studies** | 3D Quantum-cube layout with accordion deep-dives |
| 🤖 **BURHAN_OS Chatbot** | AI-powered terminal chatbot (Groq + OpenRouter + Vercel) |
| 🎨 **Glassmorphism UI** | Frosted glass panels, neon borders, cyan/purple palette |
| 📱 **Fully Responsive** | Mobile swipe, tablet, desktop — all optimized |
| 🔊 **Sound Engine** | Subtle navigation sound effects (`assets/sounds/`) |
| 🎨 **Theme System** | `theme.js` + `theme.css` — ready for future theme switching |
| 🖱️ **Custom Cursor** | Dot + dual-ring animated cursor |
| ⌨️ **Keyboard Navigation** | Arrow key navigation between sections |
| 👆 **Touch/Swipe** | Swipe left/right on mobile to change sections |

---

## 📁 Project Structure

```
My Portfolio/
├── index.html                    # Entry point — loads all CSS, scripts, nav, modals
├── Muhammad_Burhan_CV.pdf        # Downloadable CV
├── package.json                  # npm config (vercel dev, serve preview, tsc)
├── vercel.json                   # Vercel deployment config (API route + rewrite)
├── tsconfig.json                 # TypeScript config for API
├── .env.example                  # Env template (copy to .env.local)
├── .env.local                    # GROQ_API_KEY (not committed)
├── .nojekyll                     # GitHub Pages — disable Jekyll processing
│
├── api/
│   └── burhan-ai.ts              # Vercel serverless function — BURHAN_OS AI backend
│
├── data/
│   └── burhan-data.md            # BURHAN_OS knowledge base (source of truth for chatbot)
│
├── assets/
│   ├── sections/                 # Modular HTML sections (lazy-loaded by sections-loader.js)
│   │   ├── home.html             # Card 1 — Hero: photo, name, typewriter, social links, CV
│   │   ├── about.html            # Card 2 — About: bio, matrix terminal, skills mini-grid
│   │   ├── skills.html           # Card 3 — Intelligence_Matrix: animated solar orbit system
│   │   ├── projects.html         # Card 4 — Projects: 3D orbital carousel (5 projects)
│   │   ├── achievements.html     # Card 5 — Achievements: hackathon + cert blade rows
│   │   ├── casestudies.html      # Card 6 — Case Studies: 3D quantum cube + accordion
│   │   └── contact.html          # Card 7 — Neural Link Contact: form + social links
│   │
│   ├── css/
│   │   ├── main.css              # Global base styles, card layout, variables, cursor
│   │   ├── nav.css               # Vertical nav rail + nav popup tooltip
│   │   ├── home.css              # Hero section styles
│   │   ├── about.css             # About section styles
│   │   ├── skills.css            # Skills / Intelligence_Matrix styles
│   │   ├── projects.css          # Projects carousel styles
│   │   ├── achievements.css      # Achievements + certifications styles
│   │   ├── casestudies.css       # Case studies styles
│   │   ├── contact.css           # Contact / Neural Link styles
│   │   ├── animations.css        # Global keyframe animations
│   │   ├── responsive.css        # All media queries / responsive breakpoints
│   │   ├── burhan-os-chat.css    # BURHAN_OS chatbot widget styles
│   │   ├── style.css             # Legacy/merged full stylesheet (kept for reference)
│   │   └── theme.css             # Theme variables (future theme switching)
│   │
│   ├── js/
│   │   ├── sections-loader.js    # Async loads all 7 section HTML files into #sections-root
│   │   ├── nav.js                # Card switching, keyboard arrows, swipe, nav rail, popup
│   │   ├── animations.js         # Particle canvas, typewriter, matrix rain, scroll effects
│   │   ├── loader.js             # Rocket boot loader animation + panel split reveal
│   │   ├── about-extras.js       # About section — typewriter roles, matrix canvas
│   │   ├── casestudies-core.js   # Case studies section — accordion + cube interactions
│   │   ├── contact.js            # Contact form logic
│   │   ├── sound.js              # Navigation sound effects
│   │   ├── theme.js              # Theme switching logic
│   │   ├── transitions.js        # Page transition flash overlay
│   │   ├── burhan-os-chat.js     # BURHAN_OS chatbot widget — full frontend
│   │   └── main.js               # Legacy entry (minimal, kept for compatibility)
│   │
│   ├── images/
│   │   ├── my-img.png            # Profile photo (hero section)
│   │   ├── favicon.png           # Browser tab favicon
│   │   ├── mb-logo.svg           # Custom MB logo
│   │   ├── p1.png                # Project 1 thumbnail (Faceless AI Studio)
│   │   ├── p2.png                # Project 2 thumbnail (Spin AI)
│   │   ├── p3.png                # Project 3 thumbnail (Flux AI Chatbot)
│   │   ├── p4.png                # Project 4 thumbnail (FastAPI Full App)
│   │   ├── p5.png                # Project 5 thumbnail (BURHAN_OS Portfolio)
│   │   ├── faceless-preview.png  # Faceless AI Studio preview (achievements)
│   │   └── spin-preview.png      # Spin AI preview (achievements)
│   │
│   ├── certificates/
│   │   ├── google-ai-professional-cert.jpg
│   │   ├── google-ai-essentials-cert.jpg
│   │   ├── python-crash-cert.jpg
│   │   ├── python-essentials-cert.jpg
│   │   ├── digital-marketing-cert.jpg
│   │   └── ecommerce-cert.jpg
│   │
│   └── sounds/                   # Navigation audio files (gitkeep placeholder)
│
└── scripts/
    ├── modularize-portfolio.mjs  # One-time script: split monolith → modular sections
    └── build_mountains_svg.py    # SVG mountain asset generator (Python)
```

---

## 🗂️ Sections Map (7 Cards)

| Card | ID | Section | File | Description |
|------|----|---------|------|-------------|
| 1 | `card-1` | 🏠 **Home** | `home.html` | Hero photo, name, typewriter, GitHub/LinkedIn/CV buttons |
| 2 | `card-2` | 👤 **About** | `about.html` | Bio text, matrix-rain terminal panel, skill mini-grid, role typewriter |
| 3 | `card-3` | 🌌 **Skills** | `skills.html` | `Intelligence_Matrix` — animated solar orbit system (30 skills, 11 orbit rings) |
| 4 | `card-4` | 💼 **Projects** | `projects.html` | 3D orbital carousel with 5 project hologram cards |
| 5 | `card-5` | 🏆 **Achievements** | `achievements.html` | Hackathon card + 6 certificate blade rows with modal viewer |
| 6 | `card-6` | 🔬 **Case Studies** | `casestudies.html` | 3D quantum-cube viewer + accordion deep-dives + comments |
| 7 | `card-7` | 📡 **Contact** | `contact.html` | Neural Link contact — form + GitHub/LinkedIn/Email/TikTok links |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **API / Backend** | TypeScript, Vercel Serverless Functions |
| **AI / LLM** | Groq SDK, OpenRouter SDK (auto-fallback chain) |
| **Design** | Glassmorphism, CSS Animations, 3D transforms, Canvas API |
| **Fonts** | Space Grotesk, Syne, Plus Jakarta Sans, JetBrains Mono, Fira Code |
| **Icons** | Google Material Symbols Outlined |
| **Hosting (Static)** | GitHub Pages |
| **Hosting (Full)** | Vercel (with `/api/burhan-ai` serverless route) |
| **Package Manager** | npm |
| **Dev Server** | `npx serve` or `vercel dev` |

---

## 🤖 BURHAN_OS Neural Link — AI Chatbot

A floating terminal-style AI assistant embedded in the portfolio.

### How It Works

```
User Message
     │
     ▼
burhan-os-chat.js (Frontend Widget)
     │  POST /api/burhan-ai
     ▼
api/burhan-ai.ts (Vercel Serverless)
     │  Loads data/burhan-data.md as system prompt
     │  Tries LLM models in order (auto-fallback):
     │    1. gpt-oss-120b  (OpenRouter)
     │    2. qwen3-30b-a3b (OpenRouter)
     │    3. gpt-oss-20b   (OpenRouter)
     │    4. llama-3.1-8b  (Groq fallback)
     ▼
Response streamed back to chat widget
```

### Key Details

| Feature | Detail |
|---------|--------|
| **UI** | Floating `>_` button, glassmorphism terminal, cyan/amber theme |
| **Knowledge Base** | `data/burhan-data.md` — answers ONLY from this file |
| **API Route** | `POST /api/burhan-ai` (Vercel serverless, max 30s timeout) |
| **LLM Chain** | OpenRouter (primary) → Groq (fallback) |
| **Env Var** | `GROQ_API_KEY` (required), `OPENROUTER_API_KEY` (optional) |
| **Visibility** | Widget auto-hides if API is offline (GitHub Pages safe) |
| **Files** | `api/burhan-ai.ts`, `assets/js/burhan-os-chat.js`, `assets/css/burhan-os-chat.css` |

---

## 🏆 Projects Showcased

| # | Project | Stack | Links |
|---|---------|-------|-------|
| 1 | **Faceless AI Studio** 🏆 *AWS Nova Hackathon Winner* | AWS Bedrock, Amazon Nova AI, Python | [GitHub](https://github.com/coddies/faceless-ai-studio) · [Live](https://faceless-ai-studio-tau.vercel.app/) |
| 2 | **Spin AI** | React, Vite, Tailwind, Groq API | [GitHub](https://github.com/coddies/Spin-Ai) · [Live](https://spinwheelai.online/) |
| 3 | **Flux AI Chatbot** | React, LLM Integration | [GitHub](https://github.com/coddies/AI-Chatbot) · [Live](https://fluxai-two.vercel.app) |
| 4 | **FastAPI Full App** | FastAPI, Neon PostgreSQL, Python | [GitHub](https://github.com/coddies/FastAPI-fullapp) |
| 5 | **BURHAN_OS Portfolio** | Vanilla JS, Vercel, Groq | *(this site)* |

---

## 🎓 Certifications

### Completed

| Certificate | Issuer |
|-------------|--------|
| Google AI Professional Certificate | Google via Coursera (8 courses) |
| Google AI Essentials | Google via Coursera (5 courses) |
| Azure AI Fundamentals | Microsoft Learn |
| Python Essentials 1 | Cisco Networking Academy |
| Python Crash Basics | Mind Luster |
| Digital Marketing | DigiSkills Training Program |
| E-Commerce Management | DigiSkills Training Program |

### In Progress

| Program | Institution |
|---------|-------------|
| AI & Data Science Track | Saylani Mass IT (SMIT) — Python, SQL, ML, NLP, Gen AI Agents |
| BS Computer Science | Virtual University of Pakistan |

---

## 🧠 Skills — Intelligence_Matrix v3.0 (30 Skills, 5 Categories)

> Displayed as a Sci-Fi Terminal Planetary Sub-Orbit System on a Single Thin Tilted Trajectory Line.
> Strictly 1 single category node is visible at a time with a 1-by-1 step vertical scroll transition along the tilted line.

### Architecture & Visual Breakdown
- **Left Column: Sci-Fi Terminal Category Boxes**
  - Styled to match the Contact Section (`.nl-terminal` & `.nl-inp-wrap`) and portfolio button halo hover effects.
  - Dark translucent slate glass (`rgba(7, 19, 30, 0.88)` with `backdrop-filter: blur(14px)`).
  - Chamfered diagonal cut corners (`clip-path: polygon(...)`), cyan corner tick accents (`.im-corner`), and striped hash markings (`.im-hash`).
  - Monospace index (`[01]` to `[05]`), bold uppercase Category Title, and category icon. Removed skill count badges for a clean futuristic look.
  - On hover / click active: Slides right (`translateX(16px)`), lights up with bright cyan neon border & outer halo (`#00F0FF`, `box-shadow: 0 0 25px rgba(0, 240, 255, 0.65)`), and illuminates side accent bars.
- **Right Stage: Single Thin Tilted Line (No Thick Dashed Road)**
  - Replaced the thick dashed road with a single, thin (1.2px), crisp trajectory line tilted diagonally across the stage from top-right to bottom-left with subtle laser glow.
  - Cosmic matrix grid and floating space dust particles in the background.
- **Strictly 1 Category Node Visible at a Time + 1-by-1 Step Scroll Transition**
  - Removed all secondary / inactive category nodes.
  - When clicking a category box on the left (or using keyboard arrows/numbers 1-5), the stage performs a vertical 1-step scroll transition along the tilted trajectory line (smooth cubic-bezier physics).
- **Sub-Orbit Spin & Hover Dynamics**
  - **Locked Open State (Click):** Center Category Node expands a circular sub-orbit ring with all child skill badges continuously rotating 360°.
  - **Always Upright Labels:** Moons use pure trigonometric translation (`translate(x, y)`), so skill labels and icons remain perfectly upright and legible at all times.
  - **Hover Acceleration:** Hovering over the category box or center planet accelerates orbital rotation and smoothly expands the orbit radius with a vibrant cyan neon pulse.
  - **Skill Inspection:** Hovering over any individual skill moon temporarily pauses rotation and highlights the badge with an elevated cyan glow.

| # | Category | Skills |
|---|---------|--------|
| 01 | **Generative & Agentic AI** | Agentic AI, Gen AI, RAG Systems, LLMs, Prompt Eng, Amazon Nova, AWS Bedrock |
| 02 | **Machine Learning & Data Science** | Python ⭐ (Core Language Badge), Machine Learning, NLP, Data Analysis, Problem Solving |
| 03 | **Workflow & AI Automation** | n8n, AI Tools, API, System Design, Vibe Coding |
| 04 | **Full-Stack Web Engineering** | React, JavaScript, FastAPI, SQL/DB, Tailwind, HTML5, CSS3, Vite |
| 05 | **Cloud, DevOps & Media** | AWS Cloud, Git/GitHub, Vercel, Video Editing, Content Creator |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Vercel CLI (for AI chatbot dev)

### Quick Start (Static Preview — No AI Chat)

```bash
# Clone
git clone https://github.com/coddies/My-Portfolio.git
cd My-Portfolio

# Install deps
npm install

# Run static preview server
npm run preview
# → Opens at http://localhost:4173
```

### Full Dev (With AI Chatbot)

```bash
# 1. Copy env template
cp .env.example .env.local

# 2. Add your keys to .env.local
#    GROQ_API_KEY=your_key_here

# 3. Start Vercel dev server
npm run dev
# → Opens at http://localhost:3000
```

### Type Check

```bash
npm run typecheck
```

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel deploy config — static output dir, API route, URL rewrite |
| `tsconfig.json` | TypeScript strict config for `api/burhan-ai.ts` |
| `package.json` | Scripts: `dev` (vercel dev), `preview` (npx serve), `typecheck` |
| `.env.example` | Template for required environment variables |
| `.env.local` | Local secrets — **never commit this** |
| `.nojekyll` | Disables GitHub Pages Jekyll so all files are served as-is |
| `.gitignore` | Ignores `node_modules/`, `.env.local`, build artifacts |

---

## 🌐 Deployment

### GitHub Pages (Static Only)
- Push to `main` branch → GitHub Actions auto-deploys via `.github/workflows/static.yml`
- Chatbot widget auto-hides when API is unavailable
- URL: `https://coddies.github.io/My-Portfolio/`

### Vercel (Full — with AI Chatbot)
1. Connect repo to Vercel
2. Set environment variable: `GROQ_API_KEY`
3. Vercel auto-deploys on push to `main`
4. `vercel.json` handles the serverless API route and URL rewrites

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--cyan` | `#00E5FF` | Primary accent — borders, glows, highlights |
| `--purple` | `#8B5CF6` | Secondary accent — alternating orbit rings, gradients |
| Background | `#060B14` | Deep space dark base |
| Text | `rgba(255,255,255,0.8)` | Body text |
| Font (UI) | `Space Grotesk` | Headings, labels, monospace-style UI |
| Font (Display) | `Syne` | Hero name, section titles |
| Font (Body) | `Plus Jakarta Sans` | Paragraphs |
| Font (Code) | `JetBrains Mono / Fira Code` | Terminal panels, code snippets |

---

## 📝 Change Log (Recent Updates)

> Update this section every time a significant change is made to the portfolio.

| Date | Change |
|------|--------|
| 2026-11-07 | **Navigation Popup Positioning Fix**: Relocated `.nav-popup` ("Use Arrow Keys to explore") to `bottom: 92px; right: 96px;` so it floats cleanly above the `BURHAN_OS` AI FAB button (`bottom: 32px; right: 96px;`), preventing overlap and ensuring the instruction text is 100% visible and unobstructed. Files: `assets/css/nav.css`, `assets/css/home.css`, `assets/css/style.css`, `README.md`. |
| 2026-11-07 | **Hero Section Photo Hover Fix**: Removed `border-radius: 50%` and `box-shadow` on `.hero-photo` and `.hero-photo-container:hover` which was causing an artificial glowing circle/oval ring around the cutout image. Replaced with clean silhouette `drop-shadow(0 10px 30px rgba(0, 229, 255, 0.55)) drop-shadow(0 20px 50px rgba(124, 58, 237, 0.45))` that follows the exact natural contours of Muhammad Burhan's body and clothes. Files: `assets/css/home.css`, `assets/css/animations.css`, `assets/css/responsive.css`, `assets/css/style.css`, `README.md`. |
| 2026-11-07 | **Skills Section v3.3 Refinements**: (1) Overrode parent card padding (`padding: 0 !important; width: 100vw; height: 100vh`) so the skills section and trajectory line bleed fully to the browser viewport edges; (2) Extended tilted trajectory line far past screen boundaries (`y=-300` to `y=1300`, stroke 1.8px + cyan laser glow + white laser thread) so it looks 100% complete and infinite, cutting seamlessly through space from top ceiling to bottom floor without any cut-off; (3) Adjusted SVG alignment ticks from top to bottom. Files: `assets/sections/skills.html`, `assets/css/skills.css`, `README.md`. |
| 2026-11-07 | **Skills Section v3.2 Refinements**: (1) Removed the faint vertical dividing line behind left boxes; (2) Stabilized category text on hover/active to eliminate flickering/jumping, styled with portfolio's clean sans-serif font (`Plus Jakarta Sans`); (3) Increased gap between category boxes (22px) and added staggered zero-gravity floating animations (`imFloatBox`); (4) Added floating sci-fi detail popover (`.im-skill-popover`) with floating animation, icon, title, and concise 1-sentence role/usage descriptions on hovering each skill moon badge; (5) Kept spin speed calm and planetary (~36s per orbit). Files: `assets/sections/skills.html`, `assets/css/skills.css`, `README.md`. |
| 2026-11 | Project modularized — monolith `index.html` split into 7 section HTML files via `scripts/modularize-portfolio.mjs` |
| 2026-11 | BURHAN_OS chatbot added — Vercel serverless + Groq + OpenRouter auto-fallback chain |
| 2026-11 | Case Studies section added (`card-6`) — 3D quantum-cube + accordion + comments |
| 2026-11 | Achievements section expanded — hackathon card + cert blade rows with modal viewer |
| 2026-11 | 3D orbital project carousel added (card-4) |
| 2026-11 | Rocket boot loader animation added |

---

## 📬 Connect

[![GitHub](https://img.shields.io/badge/GitHub-coddies-181717?style=flat-square&logo=github)](https://github.com/coddies)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Muhammad%20Burhan-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/muhammad-burhan-73a81b27b/)
[![Email](https://img.shields.io/badge/Email-mb6679605%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:mb6679605@gmail.com)
[![TikTok](https://img.shields.io/badge/TikTok-@devmburhan-000000?style=flat-square&logo=tiktok)](https://www.tiktok.com/@devmburhan)

---

<div align="center">
Made with ❤️ by <strong>Muhammad Burhan</strong> — Chiniot, Pakistan 🇵🇰
</div>
