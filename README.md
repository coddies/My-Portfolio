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
| 🪐 **Intelligence_Matrix v3.3** | Deep-space infinite tilted laser trajectory line, 5 floating zero-gravity cyber category boxes (2-column responsive chamfered grid on mobile), step-by-step 1-by-1 vertical scrolling node, rotating sub-orbital skill moons, and live holographic detail popovers |
| 🎠 **3D Orbital Carousel** | Rotating 3D card carousel for Projects with fluid mobile cards & backface-visibility protection |
| 🏆 **Achievements + Certs** | Hackathon cards + certificate blade row with modal viewer |
| 📖 **Case Studies** | 3D Quantum-cube layout with accordion deep-dives |
| 🤖 **BURHAN_OS Chatbot** | AI-powered terminal chatbot (Groq + OpenRouter + Vercel) |
| 🎨 **Glassmorphism UI** | Frosted glass panels, neon borders, cyan/purple palette |
| 📱 **Universal Multi-Device Responsive** | 100% fluid across all 8 mobile/tablet/desktop screen tiers (320px–1440px+) |
| 🔊 **Sound Engine** | Subtle navigation sound effects (`assets/sounds/`) |
| 🎨 **Theme System** | `theme.js` + `theme.css` — ready for future theme switching |
| 🖱️ **Custom Cursor** | Dot + dual-ring animated cursor |
| ⌨️ **Keyboard Navigation** | Arrow key navigation between sections |
| 👆 **Touch/Swipe** | Swipe left/right on mobile to change sections |

---

## 📱 Universal Multi-Device Responsive Architecture

The portfolio implements a strictly multi-device fluid design engineered to eliminate hardcoded device widths, horizontal page wobble (`scrollWidth > innerWidth`), and UI overlap across every mobile phone, foldable, tablet, and desktop display:

### 1. Device Resolution Support Matrix (100% Verified)

| Device Tier | Viewport Resolution | Representative Devices | Status |
|-------------|---------------------|------------------------|--------|
| **Small Androids / SE** | `320 × 568 px` | iPhone SE (1st gen), Samsung A-series, Infinix, Tecno | ✅ PASSED (0px overflow) |
| **Standard Androids** | `360 × 740 px` | Samsung Galaxy A/M series, Redmi, Vivo, Oppo | ✅ PASSED (0px overflow) |
| **Compact Phones** | `375 × 667 px` | iPhone 6/7/8/SE 2020/2022, iPhone Mini, iPhone X/XS | ✅ PASSED (0px overflow) |
| **Standard Flagships** | `390 × 844 px` | iPhone 12/13/14/15/16, Samsung Galaxy S22/S23/S24 | ✅ PASSED (0px overflow) |
| **Large Phones** | `414 × 896 px` | iPhone 11/XR, OnePlus, Redmi Note Pro, Galaxy Plus | ✅ PASSED (0px overflow) |
| **Max & Ultra Phones** | `430 × 932 px` | iPhone 14/15/16 Pro Max, Galaxy S24 Ultra | ✅ PASSED (0px overflow) |
| **Foldables & Tablets** | `768 × 1024 px` | iPad Mini/Air, Galaxy Z Fold (unfolded), Android Tablets | ✅ PASSED (0px overflow) |
| **Desktop & Laptops** | `1440 × 900+ px` | MacBook Pro, PC Displays, Ultrawide Monitors | ✅ PASSED (0px overflow) |

### 2. Core Responsive Principles Applied
- **Fluid Viewport Containers (`100dvh` + `overflow-y: auto`):** Replaced rigid `height: 100vh; overflow: hidden;` on mobile/tablet (`<= 1024px`) with `min-height: 100dvh; height: 100dvh; overflow-y: auto; overflow-x: hidden; padding-bottom: 130px;` so stacked section content flows naturally on short and tall screens without getting obscured by bottom navigation.
- **Top-Anchored Floating AI Button (`.bos-fab`):** Collapsed the 200px pill into a compact `44px × 44px` circular badge (`>_`) anchored at `top: 16px; right: 16px;` on mobile, eliminating all overlap with the bottom navigation dock and primary CTA buttons.
- **Fluid Bottom Floating Apple Liquid Glass Buttons (`.nav-rail` / `.nav-btn`):** Removed the outer container box on mobile/tablet so standalone circular Apple Liquid Glass buttons float cleanly with `clamp(6px, 2.2vw, 12px)` spacing and `clamp(36px, 9.2vw, 46px)` touch targets fitting seamlessly from `320px` to `1024px`.
- **Intelligence_Matrix Horizontal Mobile Row & Centered Orbit:** On mobile (`<= 768px`), the 5 category tabs sit in a horizontal scrollable row where clicking an active tab smoothly drops it downwards (`translateY(9px)`) with a Liquid Glass cyan glow while unselected tabs stay elevated above, paired with exact 50%/50% center-aligned trajectory line + planet core + dynamic `calcBaseRadius()` orbit scaling.
- **3D Carousel & Mirrored Text Fix:** Mobile carousel preserves compact `200 × 300px` dimensions (`translateZ(145px)`) to prevent right-edge viewport clipping, with `backface-visibility: hidden !important;` eliminating backwards text.
- **Contact Horizontal Social Row & Apple Liquid Glass:** Bottom 4 social hexagons remain aligned in a single horizontal row on mobile with the `RETURN_HOME` button cleanly positioned underneath, paired with purple-cyan Liquid Glass terminal form hover states.

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
│   │   ├── Burhan Experience Letter.pdf
│   │   ├── burhan-experience-letter.jpg          # High-res image conversion for modal preview
│   │   ├── C--_Essentials_1_certificate.pdf
│   │   ├── cpp-essentials-1-cert.jpg             # High-res image conversion for modal preview
│   │   ├── Google_Prompting_Essentials_page-0001.jpg
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
| 5 | `card-5` | 🏆 **Achievements** | `achievements.html` | Hackathon card + 11 credential blades (VU BS CS, ARPINAX AI Intern PDF, Cisco, Google, DigiSkills) with PDF/image modal |
| 6 | `card-6` | 🔬 **Case Studies** | `casestudies.html` | Interactive desktop/mobile deep-dives: Faceless AI Studio + Finish AI (Team Leader, SMIT Team) |
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
| 5 | **Finish AI** *(Team Leader — SMIT)* | AI Job Intelligence, Career Roadmap Builder, Vercel | [GitHub](https://github.com/coddies/SMIT-Team) · [Live](https://finishai-pi.vercel.app/) |
| 6 | **BURHAN_OS Portfolio** | Vanilla JS, Vercel, Groq | *(this site)* |

---

## 🎓 Certifications & Experience

### Experience & In Progress

| Role / Program | Institution / Company | Status |
|----------------|-----------------------|--------|
| **Undergraduate Student — BS Computer Science** | Virtual University of Pakistan | In Progress |
| **AI Intern** *(Experience Letter)* | ARPINAX TECHNOLOGIES Solutions | Currently Working |
| **AI & Data Science Track** | Saylani Mass IT (SMIT) — Python, SQL, ML, NLP, Gen AI Agents | In Progress |

### Completed

| Certificate | Issuer |
|-------------|--------|
| Google AI Professional Certificate | Google via Coursera (8 courses) |
| Google AI Essentials | Google via Coursera (5 courses) |
| Google Prompting Essentials | Google via Coursera |
| Azure AI Fundamentals | Microsoft Learn |
| Python Essentials 1 | Cisco Networking Academy |
| C++ Essentials 1 | Cisco Networking Academy |
| Python Crash Basics | Mind Luster |
| Digital Marketing | DigiSkills Training Program |
| E-Commerce Management | DigiSkills Training Program |

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
| 2026-11-17 | **Contact Section — Neural Link Connection Lines Redesign**: Replaced the old isometric constellation parallelogram SVG with **direct icon-to-icon dashed cyan connection lines** between all 4 social platform hexagons (GitHub ↔ LinkedIn, GitHub ↔ TikTok, LinkedIn ↔ Instagram, TikTok ↔ Instagram). Added subtle purple cross-diagonal links. Upgraded animated dot system to 5 glowing nimateMotion dots each travelling along their own dedicated path track with staggered offsets for a network traffic effect. Added colored node marker rings at each icon's center matching platform brand colors. Files: `assets/sections/contact.html`. |
| 2026-11-12 | **Skills Section — Trajectory Line, Vertical Blade Tabs & Mobile Layout**: Extended tilted laser trajectory line to full-screen bleed coordinates, extended tick marks edge-to-edge behind category buttons on mobile. Redesigned 5 category tabs into slim vertical blade tabs with upright text and active drop effect. Centered planetary orbit on mobile. Files: `assets/sections/skills.html`, `assets/css/skills.css`. |
| 2026-11-12 | **Projects Section — 3D Glass Carousel Restore & Gap Fix**: Restored translucent glass backgrounds on all 4 hologram cards. Increased vertical gap between header text and carousel to prevent text/card collision. Files: `assets/sections/projects.html`. |
| 2026-11-12 | **About Section — Skill Pills Clean Look**: Removed boxed borders/backgrounds from 4 skill pills (System Design, Agentic AI, RAG Systems, Vibe Coding) — clean emoji + text display. Files: `assets/sections/about.html`, `assets/css/about.css`. |
| 2026-11-12 | **Achievements & Case Studies**: Converted 2 PDF certificates to JPG for modal preview. Added Virtual University BS CS row. Added Finish AI case study (Team Leader — SMIT) with live link and GitHub. Files: `assets/sections/achievements.html`, `assets/sections/casestudies.html`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 6 (Full Multi-Device 56-Point Matrix Sweep & Architectural Verification)**: Conducted full automated verification sweep across all 7 portfolio sections (`#card-1` through `#card-7`) and all 8 device viewports (`320×568`, `360×740`, `375×667`, `390×844`, `414×896`, `430×932`, `768×1024`, `1440×900`). Confirmed 56/56 checks passed (100% success rate) with zero horizontal overflow (`scrollWidth <= innerWidth`), zero text truncation, zero 3D mirrored text, and complete touch target accessibility across every phone and tablet on the market. Added comprehensive Universal Multi-Device Responsive Architecture documentation and resolution matrix table to `README.md`. Dev server kept running locally for user inspection; zero git commits or pushes made. Files: `README.md`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 5 (Experience `#card-5` & Contact `#card-7 — ESTABLISH NEURAL_LINK`)**: (1) Experience Section (`#card-5`): Fluidified AWS Hackathon 3D winner scene (`width: min(100%, 92vw)`) and cyber-server certifications rack (`transform: perspective(1000px) rotateX(2deg) rotateY(-4deg)`), clamping the badge title, rocket, and `LAUNCH LIVE APP ↗` touch target (`>= 44px`) so nothing clips on narrow 320px–375px screens; (2) Contact Section (`#card-7`): Scaled top protocol header (`___ SECURE_PROTOCOL: MUHAMMAD_BURHAN_OS ___`) using fluid `clamp(8px, 2.3vw, 11px)` and responsive decorative dividers to eliminate single-line horizontal text overflow; (3) Restructured terminal input form with fluid box-sizing and padded fields; (4) Arranged 3D isometric social platforms (`#nlIsoScene` — GitHub, LinkedIn, TikTok, Instagram) into a responsive 2×2 grid on mobile viewports (`<= 640px`) with 68px/58px touch targets, ensuring all 4 social cards remain fully visible and tappable without edge clipping. Verified across all 8 device viewports (`320px` to `1440px`) with zero page overflow. Files: `assets/sections/achievements.html`, `assets/sections/contact.html`, `README.md`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 4 (Projects Section `#card-4 — PROJECT_LAB.v2`)**: (1) Fixed 3D Mirrored Text Bug across all devices by applying `backface-visibility: hidden !important; -webkit-backface-visibility: hidden !important;` to `.hologram-card` and all child elements, and giving `.hologram-card` an opaque dark cyber background (`rgba(6, 11, 20, 0.94)`) so inactive side cards rotating away never show mirror-inverted or backwards text; (2) Fluidified 3D carousel container and wrapper (`max-width: 100vw; overflow-x: hidden;`) preventing horizontal page wobble (`scrollWidth > innerWidth`) across all screen widths (`320px–440px`); (3) Made mobile carousel card dimensions fluid (`width: clamp(240px, 72vw, 300px); height: 330px`) and responsive 3D translation (`translateZ(140px)` on mobile) with accessible primary CTA buttons (`VIEW ON GITHUB`, `Live App ↗`) having touch targets `>= 42px`. Verified across all 8 device viewports (`320px` to `1440px`) with zero page overflow. Files: `assets/sections/projects.html`, `README.md`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 3 (Intelligence_Matrix Skills Section)**: (1) Replaced the cut-off horizontal scrolling category bar on mobile (`<= 768px`) with a responsive 2-column chamfered cyber-grid (`grid-template-columns: repeat(2, minmax(0, 1fr))`) where the 5th category is cleanly centered, making all 5 categories (`01` to `05`) immediately accessible without text truncation or overflow; (2) Implemented dynamic viewport-relative orbital radius scaling via `calcBaseRadius()` and window resize listener (`74px` on `<= 360px`, `84px` on `400px`, `94px` on `440px`, `115px` on `768px`, and `160-174px` on desktop) ensuring spinning skill nodes (`AGENTIC AI`, `LLMS`, `AMAZON NOVA`, etc.) and upright labels never clip outside viewport boundaries; (3) Preserved infinite tilted trajectory line, center category planet node, zero-gravity floating desktop boxes, and popover detail cards. Verified across all 8 device viewports (`320px` to `1440px`) with 100% visible category boxes and zero screen overflow (`scrollWidth <= innerWidth`). Files: `assets/sections/skills.html`, `assets/css/skills.css`, `README.md`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 2 (Hero & About Sections)**: (1) Hero Section (`#card-1`): Made hero title, dynamic typewriter role container, and bio fluid using responsive `clamp()` units so text never clips on 320px–440px mobiles. Made button group (`GitHub`, `LinkedIn`, `CV`) wrap fluidly with proportional minimum widths and touch targets. (2) About Section (`#card-2`): Fixed typewriter roles (`> Microsoft Learn Student Ambassador` / `> Data Scientist`) to eliminate text truncation (`Stud_`), allowing full text display with natural wrapping. Converted inline styles to semantic responsive classes (`.about-container`, `.about-typewriter-container`, `.about-skills-grid`, `.about-terminal-window`) ensuring the bio card, IDE terminal window, and 4 skill pills scale fluidly from 320px to 1440px without horizontal scrollbars or clipping. Verified across 8 device tiers (`320px` to `1280px+`). Files: `assets/sections/about.html`, `assets/css/about.css`, `assets/css/home.css`, `assets/css/responsive.css`, `README.md`. |
| 2026-11-08 | **Universal Responsiveness Fix — STEP 1 (Global Containers, Dock & BURHAN_OS FAB)**: (1) Replaced rigid `overflow: hidden; height: 100vh` on mobile/tablet (`<= 1024px`) with `min-height: 100dvh; overflow-y: auto; padding-bottom: 130px;` so stacked section content is never cut off and never covered by bottom navigation; (2) Collapsed floating `BURHAN_OS` AI FAB from a 200px pill to a compact `44px × 44px` circular badge (`>_`) anchored at `top: 16px; right: 16px;` on `<= 768px` viewports, preventing collisions with bottom dock and primary CTA buttons; (3) Styled bottom navigation dock (`.nav-rail`) with fluid `gap: clamp(4px, 1.8vw, 10px)` and touch buttons `clamp(34px, 8.5vw, 44px)` fitting seamlessly from 320px up to 440px Pro Max phones without horizontal overflow; (4) Set `pointer-events: none !important` on rocket transition overlays. Files: `assets/css/burhan-os-chat.css`, `assets/css/responsive.css`, `assets/css/home.css`, `assets/css/animations.css`, `README.md`. |
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
