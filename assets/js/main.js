// ── CARD SWITCHING ──
const cards   = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex   = 0;
let isTransitioning = false;

// ── CARD IN-ANIMATIONS LOGIC ──
function triggerCardAnimations(card) {
    if (!card) return;
    if(card.id === 'card-2') {
        card.querySelectorAll('.about-photo, .about-grid>div:last-child>*').forEach(el => el.classList.add('anim-in'));
    }
    card.querySelectorAll('.skill-card, .project-card, .cert-card, .contact-link-card, .hack-title, .hack-desc, .stats-row, .hack-badge, .contact-panel h2, .contact-subtitle, .cs-card').forEach(el => {
        el.classList.add('anim-in');
    });
    if(card.id === 'card-3') {
        setTimeout(() => {
            card.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 300);
    }
}

setTimeout(() => { triggerCardAnimations(cards[0]); }, 100);

function updateCards(nextIndex) {
    if (nextIndex === currentIndex || isTransitioning) return;
    if (nextIndex < 0 || nextIndex >= cards.length) return;
    isTransitioning = true;

    const direction = nextIndex > currentIndex ? 1 : -1; // 1 = going right, -1 = going left

    // Flash effect on mobile
    if (window.innerWidth <= 768) {
        const flash = document.getElementById('transition-flash');
        if (flash) {
            flash.style.opacity = '0.7';
            setTimeout(() => flash.style.opacity = '0', 150);
        }
    }

    const nextCard = cards[nextIndex];
    nextCard.querySelectorAll('.anim-in').forEach(el => el.classList.remove('anim-in'));
    if(nextIndex === 2) {
        nextCard.querySelectorAll('.progress-bar').forEach(bar => bar.style.width = '0%');
    }

    // Instantly reset the old active button (no lingering transition glow)
    const oldBtn = navBtns[currentIndex];
    if (oldBtn) {
        oldBtn.style.transition = 'none';
        oldBtn.classList.remove('active');
        // Re-enable transition on next frame
        requestAnimationFrame(() => { oldBtn.style.transition = ''; });
    }

    navBtns.forEach(btn => btn.classList.remove('active'));
    navBtns[nextIndex].classList.add('active');

    // Step 1: Position the incoming card just off-screen (direction-aware), instantly with no transition
    nextCard.style.transition = 'none';
    nextCard.style.opacity    = '0';
    nextCard.style.transform  = `translateX(${direction * 80}px)`;
    nextCard.style.visibility = 'visible';
    nextCard.style.pointerEvents = 'none';

    // Step 2: Force reflow so the browser registers the starting position
    nextCard.offsetHeight; // eslint-disable-line no-unused-expressions

    // Step 3: Clear inline styles so CSS transition takes over
    nextCard.style.transition    = '';
    nextCard.style.opacity       = '';
    nextCard.style.transform     = '';
    nextCard.style.visibility    = '';
    nextCard.style.pointerEvents = '';

    // Step 4: Set classes for all cards
    cards.forEach((card, idx) => {
        if (idx === nextIndex) {
            card.className = 'card state-active';
        } else if (idx === currentIndex) {
            // Outgoing: slide opposite to direction
            card.className = 'card ' + (direction > 0 ? 'state-above' : 'state-below');
        } else {
            card.className = 'card ' + (idx < nextIndex ? 'state-above' : 'state-below');
        }
    });

    setTimeout(() => { triggerCardAnimations(nextCard); }, 80);

    currentIndex = nextIndex;
    setTimeout(() => { isTransitioning = false; }, 1000);
}

navBtns.forEach((btn, idx) => { btn.addEventListener('click', () => updateCards(idx)); });

// Keyboard: Arrow Right / Arrow Left for navigation
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) updateCards(currentIndex + 1);
    if (e.key === 'ArrowLeft'  && currentIndex > 0)               updateCards(currentIndex - 1);
    // Keep up/down as well for backward compat
    if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) updateCards(currentIndex + 1);
    if (e.key === 'ArrowUp'   && currentIndex > 0)               updateCards(currentIndex - 1);
});

// ── TOUCH SWIPE GESTURE ──

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dt = Date.now() - touchStartTime;

    // Minimum swipe: 50px horizontal, must be mostly horizontal, under 500ms
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
        if (dx < 0) {
            updateCards(currentIndex + 1); // swipe left = next
        } else {
            updateCards(currentIndex - 1); // swipe right = prev
        }
    }
}, { passive: true });

// ── SWIPE HINT POPUP ──
const swipeHint = document.getElementById('swipe-hint');
if (swipeHint && window.innerWidth <= 768) {
    const hintKey = 'swipeHintShown_v1';
    if (!localStorage.getItem(hintKey)) {
        setTimeout(() => {
            swipeHint.classList.add('show');
            setTimeout(() => {
                swipeHint.classList.remove('show');
                localStorage.setItem(hintKey, '1');
            }, 4000);
        }, 1500);
        swipeHint.addEventListener('click', () => {
            swipeHint.classList.remove('show');
            localStorage.setItem(hintKey, '1');
        });
    }
}

// ── TYPEWRITER ──
const phrases   = ['AI Developer', 'Data Scientist', 'AWS Hackathon Participant', 'Problem Solver', 'Content Creator', 'Prompt Engineer', 'Vibe Coder'];
let phraseIdx   = 0; let charIdx = 0; let isDeleting = false;
const typeEl    = document.getElementById('typewriter');

function type() {
    const word = phrases[phraseIdx];
    if (isDeleting) charIdx--; else charIdx++;
    typeEl.textContent = word.substring(0, charIdx);
    let speed = isDeleting ? 40 : 100;
    if (!isDeleting && charIdx === word.length)  { speed = 1500; isDeleting = true; }
    if  (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 500; }
    setTimeout(type, speed);
}
if(typeEl) type();

// ── HACKATHON CLICK ──
const hackCard = document.querySelector('.hackathon-main-card');
if (hackCard) {
    hackCard.addEventListener('click', () => {
        const link = hackCard.getAttribute('data-link');
        if (link) window.open(link, '_blank');
    });
}

// ── CERT MODAL ──
const certModal = document.getElementById('certModal');
const modalImg  = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
            return;
        }
        const imgPath = card.getAttribute('data-img');
        if (imgPath) { modalImg.src = imgPath; certModal.classList.add('active'); }
    });
});
if (modalClose) modalClose.addEventListener('click', () => { certModal.classList.remove('active'); });
if (certModal) certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('active'); });

// ── CASE STUDIES DATA & MODAL ──
const caseStudiesData = [
  {
    title: 'Faceless AI Video Studio',
    category: 'AI Automation',
    tags: [
      { text: 'Python', cls: 'tag-py' },
      { text: 'MoviePy', cls: 'tag-ml' },
      { text: 'AWS Bedrock', cls: 'tag-aws' }
    ],
    stats: [
      { label: 'Time Saved', value: '98%', sub: '4 hrs → under 3 min', color: 'green' },
      { label: 'Achievement', value: '🏆 winner', sub: 'AWS Nova Hackathon', color: 'purple' },
      { label: 'Status', value: 'Live', sub: 'Deployed on Vercel', color: 'amber' }
    ],
    problem: 'Manual video editing takes dozens of hours per week, severely limiting content output and causing creator burnout. Consistency is hard to maintain when each piece of content requires scriptwriting, voiceover, asset gathering, and editing.',
    solution: 'Developed an Agentic AI Pipeline using AWS Bedrock and Python. It autonomously generates viral scripts using Nova Pro, procures natural voiceovers via Nova Sonic, procures images with Nova Canvas, and stitches together the final MP4 using MoviePy.',
    pipeline: [
      { icon: '✍️', label: 'Script Gen', sub: 'Nova Pro' },
      { icon: '🎙️', label: 'Voiceover', sub: 'Nova Sonic' },
      { icon: '🖼️', label: 'Visuals', sub: 'Nova Canvas' },
      { icon: '🎬', label: 'Video Edit', sub: 'MoviePy' }
    ],
    resultDetails: 'Cut video production time by <strong style="color:#f0ede8;">98%</strong> — from 4 hours to under 3 minutes per video. Deployed as a scalable, live web platform.',
    resultBadge: '🏆 AWS Nova Hackathon Winner',
    liveLink: 'https://faceless-ai-studio-tau.vercel.app/',
    liveText: 'faceless-ai-studio-tau',
    devpostLink: 'https://devpost.com/software/faceless-ai-studio'
  },
  {
    title: 'AI Chatbot Assistant',
    category: 'AI / NLP',
    tags: [
      { text: 'Python', cls: 'tag-py' },
      { text: 'LangChain', cls: 'tag-ml' },
      { text: 'OpenAI', cls: 'tag-aws' }
    ],
    stats: [
      { label: 'Automation', value: '90%', sub: 'Queries handled', color: 'green' },
      { label: 'Response', value: '< 1s', sub: 'Avg response time', color: 'purple' },
      { label: 'Uptime', value: '99.9%', sub: 'High availability', color: 'amber' }
    ],
    problem: 'Users needed a smarter way to interact with data and get instant, accurate human-like responses without overwhelming human support agents.',
    solution: 'Built a RAG-based chatbot using Python and OpenAI API. Integrated LangChain to allow the bot to query internal documents and provide context-aware responses instantly.',
    pipeline: [
      { icon: '📥', label: 'Ingest', sub: 'Data Parsing' },
      { icon: '🧠', label: 'Process', sub: 'LangChain' },
      { icon: '🤖', label: 'Generate', sub: 'OpenAI LLM' },
      { icon: '📤', label: 'Output', sub: 'Instant Reply' }
    ],
    resultDetails: 'Successfully automated <strong style="color:#f0ede8;">90%</strong> of basic query handling, freeing up human agents for complex tasks.',
    resultBadge: '⚡ High Performance NLP',
    liveLink: 'https://github.com/coddies/AI-Chatbot',
    liveText: 'View Repository',
    devpostLink: ''
  },
  {
    title: 'Modern Glassmorphism Portfolio',
    category: 'Frontend Development',
    tags: [
      { text: 'HTML5', cls: 'tag-web' },
      { text: 'CSS3', cls: 'tag-web' },
      { text: 'JS', cls: 'tag-web' }
    ],
    stats: [
      { label: 'Design', value: 'Premium', sub: 'Glassmorphism', color: 'purple' },
      { label: 'Performance', value: '100%', sub: 'Lighthouse Score', color: 'green' },
      { label: 'Responsiveness', value: 'Full', sub: 'All devices', color: 'amber' }
    ],
    problem: 'Standard portfolios lack the premium feel and interactivity required for a modern AI developer.',
    solution: 'Developed a high-end, card-based single-page portfolio with custom transitions and a fixed viewport design.',
    pipeline: [
      { icon: '🎨', label: 'Design', sub: 'Figma UI' },
      { icon: '🧱', label: 'Structure', sub: 'Semantic HTML' },
      { icon: '✨', label: 'Style', sub: 'Vanilla CSS' },
      { icon: '⚡', label: 'Interact', sub: 'Custom JS' }
    ],
    resultDetails: 'Delivered a top-tier user experience with <strong style="color:#f0ede8;">100%</strong> fixed-viewport navigation.',
    resultBadge: '💎 Premium Design Architecture',
    liveLink: 'https://github.com/coddies/My-Portfolio',
    liveText: 'View Source Code',
    devpostLink: ''
  }
];

const csModal    = document.getElementById('csModal');
const csModalClose = document.getElementById('csModalClose');

function openCsModal(idx) {
    const data = caseStudiesData[idx];
    if (!data || !csModal) return;

    const dynamicContainer = document.getElementById('csModalDynamicContent');
    
    let tagsHTML = data.tags.map(t => `<span class="cs-tag ${t.cls}">${t.text}</span>`).join('');
    
    let statsHTML = data.stats.map(s => `
        <div class="stat-card">
          <div class="stat-label">${s.label}</div>
          <div class="stat-value ${s.color}">${s.value}</div>
          <div class="stat-sub">${s.sub}</div>
        </div>
    `).join('');

    let pipelineHTML = data.pipeline.map(p => `
        <div class="pipe-step">
          <div class="pipe-icon">${p.icon}</div>
          <div class="pipe-label">${p.label}</div>
          <div class="pipe-sub">${p.sub}</div>
        </div>
    `).join('');

    let linksHTML = '';
    if (data.liveLink) {
        linksHTML += `
            <a class="cs-live-link" href="${data.liveLink}" target="_blank" rel="noopener">
              <span class="live-dot"></span>
              ${data.liveText}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        `;
    }
    if (data.devpostLink) {
        linksHTML += `
            <a class="cs-live-link" href="${data.devpostLink}" target="_blank" rel="noopener" style="border-color: rgba(124,58,237,0.4);">
              <span>🏆 Devpost</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        `;
    }

    dynamicContainer.innerHTML = `
    <div class="cs-wrap">
      <!-- Header -->
      <div class="cs-header">
        <div class="cs-category">
          <div class="cs-category-dot"></div>
          ${data.category} · Case Study
        </div>
        <h2 class="cs-title">${data.title}</h2>
        <div class="cs-tags">
          ${tagsHTML}
        </div>
      </div>

      <!-- Stats -->
      <div class="cs-stats">
        ${statsHTML}
      </div>

      <!-- Problem -->
      <div class="cs-section">
        <div class="cs-section-header">
          <div class="cs-section-icon icon-problem">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <span class="cs-section-title">Problem</span>
        </div>
        <p class="cs-text">${data.problem}</p>
      </div>

      <div class="cs-divider"></div>

      <!-- Solution -->
      <div class="cs-section">
        <div class="cs-section-header">
          <div class="cs-section-icon icon-solution">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="cs-section-title">Solution</span>
        </div>
        <p class="cs-text">${data.solution}</p>

        <!-- Pipeline -->
        <div class="cs-pipeline">
          ${pipelineHTML}
        </div>
      </div>

      <div class="cs-divider"></div>

      <!-- Results -->
      <div class="cs-section">
        <div class="cs-section-header">
          <div class="cs-section-icon icon-result">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span class="cs-section-title">Key Results</span>
        </div>
        <div class="cs-result-box">
          <div class="cs-result-badge">${data.resultBadge}</div>
          <p class="cs-text" style="margin:0;">${data.resultDetails}</p>
        </div>
        <div style="margin-top: 15px;">
            ${linksHTML}
        </div>
      </div>
    </div>
    `;

    csModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { csModal.classList.add('visible'); });
}

function closeCsModal() {
    if (!csModal) return;
    csModal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { csModal.classList.remove('active'); }, 400);
}

document.querySelectorAll('.cs-card[data-cs]').forEach(card => {
    card.addEventListener('click', (e) => {
        openCsModal(parseInt(card.getAttribute('data-cs')));
    });
});

if (csModalClose) csModalClose.addEventListener('click', closeCsModal);
if (csModal) csModal.addEventListener('click', (e) => { if (e.target === csModal) closeCsModal(); });

// Comment submission
const csSubmitBtn = document.getElementById('csCommentSubmit');
if (csSubmitBtn) {
    csSubmitBtn.addEventListener('click', () => {
        const nameEl = document.getElementById('csCommentName');
        const textEl = document.getElementById('csCommentText');
        const name   = nameEl.value.trim();
        const text   = textEl.value.trim();
        if (!name || !text) {
            nameEl.style.borderColor = !name ? 'var(--pink)' : '';
            textEl.style.borderColor = !text ? 'var(--pink)' : '';
            return;
        }
        const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
        const colors   = ['linear-gradient(135deg,var(--purple),var(--cyan))',
                          'linear-gradient(135deg,var(--pink),var(--purple))',
                          'linear-gradient(135deg,var(--cyan),var(--purple))'];
        const color    = colors[Math.floor(Math.random() * colors.length)];

        const newComment = document.createElement('div');
        newComment.className = 'cs-comment';
        newComment.style.animation = 'fadeUp 0.4s ease both';
        newComment.innerHTML = `
            <div class="cs-comment-avatar" style="background:${color};">${initials}</div>
            <div class="cs-comment-content">
                <div class="cs-comment-meta"><strong>${name}</strong><span>Just now</span></div>
                <p>${text}</p>
            </div>`;

        document.getElementById('csCommentsList').prepend(newComment);
        nameEl.value = '';
        textEl.value = '';
        nameEl.style.borderColor = '';
        textEl.style.borderColor = '';
        csSubmitBtn.textContent = '✓ Comment Posted!';
        csSubmitBtn.style.background = 'linear-gradient(90deg, #22c55e, #06b6d4)';
        setTimeout(() => {
            csSubmitBtn.textContent = 'Submit Comment';
            csSubmitBtn.style.background = '';
        }, 2500);
    });
}

// ── READ MORE TOGGLE ──
const rmBtn = document.getElementById('readMoreBtn');
const amContent = document.getElementById('aboutMoreContent');
const aboutCard = document.getElementById('card-2');
if (rmBtn && amContent && aboutCard) {
    rmBtn.addEventListener('click', () => {
        const isHidden = amContent.style.display === 'none' || amContent.style.display === '';
        amContent.style.display = isHidden ? 'block' : 'none';
        rmBtn.textContent = isHidden ? 'Read Less' : 'Read More';
        
        // Toggle scrolling based on expansion
        if (isHidden) {
            aboutCard.classList.add('about-expanded');
        } else {
            aboutCard.classList.remove('about-expanded');
            aboutCard.scrollTop = 0; // Reset scroll position when closing
        }
    });
}


// ── PARTICLES ENGINE ──
const canvas = document.getElementById('particles-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        const count = window.innerWidth < 768 ? 30 : 60;
        for(let i=0; i<count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 1.5 + 0.5
            });
        }
    }
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initParticles, 200);
    });
    function drawParticles() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>canvas.width) p.vx *= -1;
            if(p.y<0 || p.y>canvas.height) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    initParticles(); drawParticles();
}

// ── CUSTOM CURSOR LOGIC (ORBITAL RETICLE) ──
const dotWrap  = document.querySelector('.cursor-dot-wrap');
const ringWrap = document.querySelector('.cursor-ring-wrap');

if (dotWrap && ringWrap && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Dot-wrap: snap instantly to cursor using translate3d for hardware acceleration
        dotWrap.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Ring-wrap: follows with snappier easing (0.2 instead of 0.12)
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ringWrap.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover: detectinteractive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .nav-btn, .project-card, .cert-card, .hackathon-main-card, .skill-card, .sc-btn-prev, .sc-btn-next, .sc-preview, .sc-btn-fill, .sc-btn-outline')) {
            document.body.classList.add('is-hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .nav-btn, .project-card, .cert-card, .hackathon-main-card, .skill-card, .sc-btn-prev, .sc-btn-next, .sc-preview, .sc-btn-fill, .sc-btn-outline')) {
            document.body.classList.remove('is-hovering');
        }
    });
}



// =============================================================
// === SPACE ANIMATIONS ===
// =============================================================

(function() {
    'use strict';

    // === ROCKET LOADER ===
    document.addEventListener('DOMContentLoaded', function() {

      // Hide main content
      const main = document.querySelector('main, .main, #main, .container, .sections-wrapper, .portfolio') || document.body.children[0];
      if (main && main.id !== 'mb-loader') {
        main.style.opacity = '0';
        main.style.transform = 'scale(0.92)';
        main.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }

      // Create loader
      const loader = document.createElement('div');
      loader.id = 'mb-loader';
      loader.innerHTML = `
        <div id="mb-stars"></div>
        <div id="mb-content">
          <div id="mb-name">Muhammad Burhan</div>
          <div id="mb-subtitle">AI &amp; Data Science</div>
          <div id="mb-rocket">
            <svg width="54" height="96" viewBox="0 0 54 96" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="27" cy="38" rx="13" ry="23" fill="white"/>
              <polygon points="27,4 14,22 40,22" fill="white"/>
              <circle cx="27" cy="33" r="7" fill="#00D4FF" opacity="0.85"/>
              <circle cx="27" cy="33" r="4.5" fill="#050610"/>
              <polygon points="14,54 3,76 14,64" fill="#00D4FF"/>
              <polygon points="40,54 51,76 40,64" fill="#00D4FF"/>
              <ellipse cx="27" cy="68" rx="9" ry="15" fill="#FF6B00" class="fl-o"/>
              <ellipse cx="27" cy="66" rx="6" ry="10" fill="#FFD700" class="fl-i"/>
              <ellipse cx="27" cy="64" rx="3.5" ry="6" fill="white"/>
            </svg>
          </div>
        </div>
        <div id="mb-tear-top"></div>
        <div id="mb-tear-bottom"></div>
        <div id="mb-tear-line"></div>
      `;
      document.body.prepend(loader);
      document.body.style.overflow = 'hidden';

      // Stars
      const sc = document.getElementById('mb-stars');
      for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        const sz = Math.random() * 2 + 0.5;
        s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;background:white;border-radius:50%;top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:${Math.random()*0.6+0.2};`;
        sc.appendChild(s);
      }

      // Phase 2 — Launch
      setTimeout(function() {
        const rocket = document.getElementById('mb-rocket');
        const content = document.getElementById('mb-content');
        if (rocket) rocket.classList.add('mb-launching');
        if (content) { content.style.transition = 'opacity 0.5s ease'; content.style.opacity = '0'; }
      }, 2500);

      // Phase 3 — Tear
      setTimeout(function() {
        const line = document.getElementById('mb-tear-line');
        if (line) { line.style.opacity = '1'; line.style.transition = 'height 0.35s ease-out'; line.style.height = '100vh'; }
        setTimeout(function() {
          const top = document.getElementById('mb-tear-top');
          const bot = document.getElementById('mb-tear-bottom');
          if (top) { top.style.transition = 'transform 0.45s ease-in'; top.style.transform = 'translateY(-100%)'; }
          if (bot) { bot.style.transition = 'transform 0.45s ease-in'; bot.style.transform = 'translateY(100%)'; }
          if (line) { line.style.transition = 'opacity 0.25s'; line.style.opacity = '0'; }
        }, 350);
      }, 3200);

      // Phase 4 — Reveal
      setTimeout(function() {
        if (main && main.id !== 'mb-loader') { main.style.opacity = '1'; main.style.transform = 'scale(1)'; }
        document.body.style.overflow = '';
      }, 3750);

      // Phase 5 — Remove
      setTimeout(function() {
        const l = document.getElementById('mb-loader');
        if (l) l.remove();
      }, 4300);

    });

    // ─────────────────────────────────────────────────────────
    // 2. SPACE BACKGROUND — Enhanced Canvas
    // ─────────────────────────────────────────────────────────
    (function() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const isMobile = () => window.innerWidth < 768;

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let targetMouseX = mouseX, targetMouseY = mouseY;
        let lastMoveTime = 0;

        window.addEventListener('mousemove', (e) => {
            const now = performance.now();
            if (now - lastMoveTime < 16) return;
            lastMoveTime = now;
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;
        }, { passive: true });

        let stars = [], nebulae = [], shootingStars = [];
        let warpActive = false, warpProgress = 0;

        function initSpace() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            const mobile = isMobile();
            stars = [];
            const baseCounts = mobile ? [80, 60, 30]  : [250, 150, 60];
            const speeds      = [0.04, 0.12, 0.28];
            const sizesRange  = [[0.3, 0.9], [0.6, 1.4], [1.0, 2.2]];
            baseCounts.forEach((count, layer) => {
                for (let i = 0; i < count; i++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: sizesRange[layer][0] + Math.random() * (sizesRange[layer][1] - sizesRange[layer][0]),
                        opacity: 0.4 + Math.random() * 0.6,
                        twinkleSpeed: 0.005 + Math.random() * 0.015,
                        twinkleOffset: Math.random() * Math.PI * 2,
                        parallaxFactor: speeds[layer],
                        color: Math.random() < 0.15 ? '#a0c8ff' : '#ffffff',
                        layer,
                    });
                }
            });
            nebulae = [];
            const nebColors = [
                'rgba(139,92,246,0.028)', 'rgba(0,212,255,0.022)',
                'rgba(139,92,246,0.020)', 'rgba(0,212,255,0.018)',
            ];
            for (let i = 0; i < (mobile ? 2 : 4); i++) {
                nebulae.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                    rx: 200 + Math.random() * 300,   ry: 140 + Math.random() * 200,
                    vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.06,
                    color: nebColors[i % nebColors.length],
                    angle: Math.random() * Math.PI,
                });
            }
        }

        function scheduleShootingStar() {
            setTimeout(() => {
                const side = Math.random() < 0.5;
                shootingStars.push({
                    x: side ? 0 : Math.random() * canvas.width,
                    y: side ? Math.random() * canvas.height * 0.6 : 0,
                    vx: side ? 6 + Math.random() * 5 : 4 + Math.random() * 3,
                    vy: side ? 2 + Math.random() * 3 : 5 + Math.random() * 4,
                    life: 1, decay: 0.025 + Math.random() * 0.015,
                    len: 80 + Math.random() * 80,
                });
                scheduleShootingStar();
            }, (8 + Math.random() * 8) * 1000);
        }
        scheduleShootingStar();

        window._spaceWarpStart = function() { warpActive = true;  warpProgress = 0; };
        window._spaceWarpEnd   = function() { warpActive = false; };

        let frameCount = 0;
        function drawSpace(timestamp) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            mouseX += (targetMouseX - mouseX) * 0.04;
            mouseY += (targetMouseY - mouseY) * 0.04;
            const shiftX = ((mouseX / canvas.width)  - 0.5) * -30;
            const shiftY = ((mouseY / canvas.height) - 0.5) * -30;
            frameCount++;
            const skipHeavy = frameCount % 3 !== 0;

            // Nebulae
            if (!skipHeavy) {
                nebulae.forEach(n => {
                    n.x += n.vx; n.y += n.vy;
                    if (n.x < -n.rx) n.x = canvas.width + n.rx;
                    if (n.x > canvas.width + n.rx) n.x = -n.rx;
                    if (n.y < -n.ry) n.y = canvas.height + n.ry;
                    if (n.y > canvas.height + n.ry) n.y = -n.ry;
                    ctx.save();
                    ctx.translate(n.x, n.y);
                    ctx.rotate(n.angle);
                    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx);
                    grad.addColorStop(0, n.color);
                    grad.addColorStop(1, 'transparent');
                    ctx.scale(1, n.ry / n.rx);
                    ctx.beginPath(); ctx.arc(0, 0, n.rx, 0, Math.PI * 2);
                    ctx.fillStyle = grad; ctx.fill();
                    ctx.restore();
                });
            }

            // Stars
            stars.forEach(s => {
                const px = s.x + shiftX * s.parallaxFactor * 10;
                const py = s.y + shiftY * s.parallaxFactor * 10;
                const twinkle = 0.5 + 0.5 * Math.sin(timestamp * s.twinkleSpeed + s.twinkleOffset);
                const alpha = warpActive ? 0.1 : (s.opacity * (0.6 + 0.4 * twinkle));
                if (warpActive) {
                    const cx = canvas.width / 2, cy = canvas.height / 2;
                    const dx = px - cx, dy = py - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const streakLen = (20 + warpProgress * 200) * s.parallaxFactor * 3;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + (dx/dist) * streakLen, py + (dy/dist) * streakLen);
                    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
                    ctx.lineWidth = s.size * 0.6; ctx.stroke();
                } else {
                    ctx.beginPath(); ctx.arc(px, py, s.size, 0, Math.PI * 2);
                    ctx.fillStyle = s.color === '#a0c8ff'
                        ? `rgba(160,200,255,${alpha})` : `rgba(255,255,255,${alpha})`;
                    ctx.fill();
                }
            });

            if (warpActive) warpProgress = Math.min(warpProgress + 0.016, 1);

            // Shooting stars
            shootingStars = shootingStars.filter(ss => ss.life > 0);
            if (!warpActive) {
                shootingStars.forEach(ss => {
                    ss.x += ss.vx; ss.y += ss.vy; ss.life -= ss.decay;
                    const hyp = Math.hypot(ss.vx, ss.vy);
                    const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - (ss.vx/hyp)*ss.len, ss.y - (ss.vy/hyp)*ss.len);
                    grad.addColorStop(0, `rgba(255,255,255,${ss.life})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.beginPath();
                    ctx.moveTo(ss.x, ss.y);
                    ctx.lineTo(ss.x - (ss.vx/hyp)*ss.len, ss.y - (ss.vy/hyp)*ss.len);
                    ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
                });
            }
            requestAnimationFrame(drawSpace);
        }

        let resizeTimer;
        window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(initSpace, 200); });
        initSpace();
        requestAnimationFrame(drawSpace);
    })();

    // ─────────────────────────────────────────────────────────
    // 3. SECTION TRANSITION — Warp + section-entering class
    // ─────────────────────────────────────────────────────────
    (function() {
        if (!document.getElementById('warp-overlay')) {
            const wo = document.createElement('div');
            wo.id = 'warp-overlay';
            document.body.appendChild(wo);
        }
        const warpOverlay = document.getElementById('warp-overlay');
        const _orig = window.updateCards;
        if (typeof _orig === 'function') {
            window.updateCards = function(nextIndex) {
                if (typeof window._spaceWarpStart === 'function') window._spaceWarpStart();
                if (warpOverlay) warpOverlay.classList.add('warp-flash');
                // Flash fades at 200ms, warp ends at 350ms
                setTimeout(() => { if (warpOverlay) warpOverlay.classList.remove('warp-flash'); }, 200);
                setTimeout(() => { if (typeof window._spaceWarpEnd === 'function') window._spaceWarpEnd(); }, 350);
                // Section switches at 150ms (quick, inside the flash)
                setTimeout(() => {
                    _orig(nextIndex);
                    const allCards = document.querySelectorAll('.card');
                    if (allCards[nextIndex]) {
                        const inc = allCards[nextIndex];
                        inc.classList.remove('section-entering');
                        void inc.offsetWidth;
                        setTimeout(() => {
                            inc.classList.add('section-entering');
                            setTimeout(() => inc.classList.remove('section-entering'), 500);
                        }, 30);
                    }
                }, 150);
            };
        }
        const initCard = document.querySelector('.card.state-active');
        if (initCard) {
            setTimeout(() => {
                initCard.classList.add('section-entering');
                setTimeout(() => initCard.classList.remove('section-entering'), 800);
            }, 2700); // After loader finishes
        }
    })();

    // ─────────────────────────────────────────────────────────
    // 4. HERO PHOTO — 3D mouse tilt
    // ─────────────────────────────────────────────────────────
    (function() {
        const container = document.querySelector('.hero-photo-container');
        const photo     = container ? container.querySelector('.hero-photo') : null;
        if (!container || !photo) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const MAX_TILT = 15;
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
            const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
            photo.style.transition = 'transform 0.08s linear';
            photo.style.transform  = `perspective(800px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg)`;
        });
        container.addEventListener('mouseleave', () => {
            photo.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1)';
            photo.style.transform  = '';
        });
    })();

    // ─────────────────────────────────────────────────────────
    // 6. PROJECT CARDS — hologram scan line + 3D tilt
    // ─────────────────────────────────────────────────────────
    (function() {
        document.querySelectorAll('.px-card').forEach(card => {
            if (!card.querySelector('.hologram-scan')) {
                const scan = document.createElement('div');
                scan.className = 'hologram-scan';
                card.appendChild(scan);
            }
            if (!window.matchMedia('(pointer: fine)').matches) return;
            const MAX = 10;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
                const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
                card.style.transition = 'transform 0.08s linear';
                card.style.transform  = `perspective(900px) rotateX(${-dy*MAX}deg) rotateY(${dx*MAX}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1), opacity 0.6s ease, filter 0.6s ease';
                card.style.transform  = '';
            });
        });
    })();

    // ─────────────────────────────────────────────────────────
    // 7. ACHIEVEMENT CARD — fly-in + gold burst + gold glow
    // ─────────────────────────────────────────────────────────
    (function() {
        const achievementSection = document.getElementById('card-5');
        if (!achievementSection) return;
        const winnerCard = achievementSection.querySelector('.cs-card');
        if (!winnerCard) return;
        winnerCard.classList.add('winner-card-glow');

        function goldBurst(card) {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            for (let i = 0; i < 12; i++) {
                const p = document.createElement('div');
                p.className = 'gold-particle';
                const colors = ['#ffd700','#ffa500','#ffec00','#ffc200'];
                p.style.cssText = `background:${colors[i%colors.length]};left:${cx}px;top:${cy}px;position:fixed;`;
                document.body.appendChild(p);
                const angle = (i / 12) * Math.PI * 2;
                const dist  = 60 + Math.random() * 80;
                const tx = Math.cos(angle) * dist, ty = Math.sin(angle) * dist;
                p.animate([
                    { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0.2)`, opacity: 0 },
                ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(0,0.9,0.57,1)', fill: 'forwards' })
                .onfinish = () => { if (p.parentNode) p.parentNode.removeChild(p); };
            }
        }

        const obs = new MutationObserver(() => {
            if (achievementSection.classList.contains('state-active')) {
                winnerCard.classList.remove('achievement-card-anim');
                void winnerCard.offsetWidth;
                winnerCard.classList.add('achievement-card-anim');
                setTimeout(() => goldBurst(winnerCard), 400);
            }
        });
        obs.observe(achievementSection, { attributes: true, attributeFilter: ['class'] });
    })();

    // ─────────────────────────────────────────────────────────
    // 8. CONTACT — inject radar icon
    // ─────────────────────────────────────────────────────────
    (function() {
        const h = document.querySelector('#card-7 h2');
        if (h && !h.querySelector('.radar-icon')) {
            const r = document.createElement('span');
            r.className = 'radar-icon'; r.setAttribute('aria-hidden', 'true');
            h.appendChild(r);
        }
    })();

    // ─────────────────────────────────────────────────────────
    // 5. SKILL BARS — MutationObserver re-trigger
    // ─────────────────────────────────────────────────────────
    (function() {
        const skillSection = document.getElementById('card-3');
        if (!skillSection) return;
        const obs = new MutationObserver(() => {
            if (skillSection.classList.contains('state-active')) {
                setTimeout(() => {
                    skillSection.querySelectorAll('.progress-bar').forEach(bar => {
                        const target = bar.getAttribute('data-width');
                        if (target) { bar.style.width = '0%'; setTimeout(() => { bar.style.width = target; }, 60); }
                    });
                }, 300);
            }
        });
        obs.observe(skillSection, { attributes: true, attributeFilter: ['class'] });
    })();

})(); // end SPACE ANIMATIONS IIFE

// === SPACE FIXES v2 ===
(function () {
    'use strict';
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // ─────────────────────────────────────────────────────────────────────────
    // FIX 2 — SHOOTING STARS: proper diagonal falling stars on the canvas
    // Replaces the existing scheduleShootingStar logic by overriding the global
    // shootingStars array that the main canvas loop already reads.
    // ─────────────────────────────────────────────────────────────────────────
    (function () {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // We piggy-back on the existing requestAnimationFrame loop by injecting
        // our own draw pass via a second rAF callback registered once.
        const isMobile = () => window.innerWidth < 768;

        // Independent shooting-star pool (separate from the warp-mode ones)
        const fallingStars = [];
        const MAX_STARS_DESKTOP = 3;
        const MAX_STARS_MOBILE  = 1;

        function spawnFallingStar() {
            const mobile = isMobile();
            const maxStars = mobile ? MAX_STARS_MOBILE : MAX_STARS_DESKTOP;
            if (fallingStars.length >= maxStars) return;

            // Spawn in top-right quadrant (30%–90% width, 0–20% height)
            const x   = canvas.width  * (0.30 + Math.random() * 0.60);
            const y   = canvas.height * (Math.random() * 0.20);

            // Diagonal direction: roughly 210° (bottom-left)
            // dx ∈ [−3, −6], dy ∈ [3, 6] — randomised for variety
            const speed = 3 + Math.random() * 4; // 3–7 px/frame
            const angle = (210 + (Math.random() * 20 - 10)) * (Math.PI / 180); // ~210° ± 10°
            const vx    = Math.cos(angle) * speed;
            const vy    = Math.sin(angle) * speed;
            const len   = 80 + Math.random() * 40; // tail length 80–120px

            fallingStars.push({ x, y, vx, vy, len, opacity: 1 });
        }

        // Schedule spawning
        function scheduleFallingStar() {
            const mobile = isMobile();
            const minDelay = mobile ? 8000  : 4000;
            const maxDelay = mobile ? 12000 : 8000;
            const delay = minDelay + Math.random() * (maxDelay - minDelay);
            setTimeout(() => {
                spawnFallingStar();
                scheduleFallingStar();
            }, delay);
        }
        // Spawn first star after a short warmup
        setTimeout(() => { spawnFallingStar(); scheduleFallingStar(); }, 2000);

        // Draw overlay — runs its own rAF loop on top of the existing one.
        // Uses ctx.save/restore so it never interferes with the main star draw.
        function drawFallingStars() {
            // Only draw when not in warp mode (check the global flag)
            const warpActive = window._spaceWarpActive || false;

            for (let i = fallingStars.length - 1; i >= 0; i--) {
                const s = fallingStars[i];

                // Move
                s.x += s.vx;
                s.y += s.vy;

                // Remove if off-canvas
                if (s.x < -s.len || s.y > canvas.height + s.len ||
                    s.x > canvas.width + s.len || s.y < -s.len) {
                    fallingStars.splice(i, 1);
                    continue;
                }

                if (!warpActive) {
                    ctx.save();

                    // ── Tail (fading line behind the head) ──
                    const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len;
                    const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len;
                    const grad  = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                    grad.addColorStop(0,   `rgba(224, 247, 255, ${s.opacity})`);   // head: light cyan
                    grad.addColorStop(0.3, `rgba(255, 255, 255, ${s.opacity * 0.6})`);
                    grad.addColorStop(1,   'rgba(255, 255, 255, 0)');              // tail tip: transparent

                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(tailX, tailY);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth   = 2;
                    ctx.lineCap     = 'round';
                    ctx.stroke();

                    // ── Glowing Head ──
                    const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
                    headGrad.addColorStop(0,   `rgba(255, 255, 255, ${s.opacity})`);
                    headGrad.addColorStop(0.5, `rgba(200, 240, 255, ${s.opacity * 0.7})`);
                    headGrad.addColorStop(1,   'rgba(200, 240, 255, 0)');

                    ctx.beginPath();
                    ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = headGrad;
                    ctx.fill();

                    // Small bright core
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                    ctx.fill();

                    ctx.restore();
                }
            }
            requestAnimationFrame(drawFallingStars);
        }
        requestAnimationFrame(drawFallingStars);

        // Expose warpActive flag so drawFallingStars can read it
        const _origWarpStart = window._spaceWarpStart;
        const _origWarpEnd   = window._spaceWarpEnd;
        window._spaceWarpStart = function () {
            window._spaceWarpActive = true;
            if (_origWarpStart) _origWarpStart();
        };
        window._spaceWarpEnd = function () {
            window._spaceWarpActive = false;
            if (_origWarpEnd) _origWarpEnd();
        };
    })();

    // ─────────────────────────────────────────────────────────────────────────
    // FIX 3 — ACHIEVEMENT CARDS: 3D hover tilt
    // Targets the winner card (.cs-card inside #card-5) and cert cards
    // ─────────────────────────────────────────────────────────────────────────
    (function () {
        if (isTouchDevice) return;

        const achieveSection = document.getElementById('card-5');
        if (!achieveSection) return;

        // Winner card = first .cs-card in the section
        const winnerCard = achieveSection.querySelector('.cs-card');
        // Cert cards
        const certCards  = Array.from(achieveSection.querySelectorAll('.cert-card'));
        const allAchieve = [winnerCard, ...certCards].filter(Boolean);

        const MAX_TILT = 15;

        allAchieve.forEach(card => {
            const isWinner = card === winnerCard;

            card.addEventListener('mouseenter', () => {
                if (isWinner) card.classList.add('gold-pulse-hover');
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cx   = rect.left + rect.width  / 2;
                const cy   = rect.top  + rect.height / 2;
                const rx   = ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT;
                const ry   = ((e.clientX - cx) / (rect.width  / 2)) *  MAX_TILT;
                card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';
                card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
                card.style.boxShadow  = isWinner
                    ? `0 20px 60px rgba(255,215,0,0.35), 0 0 30px rgba(255,165,0,0.2)`
                    : `0 20px 60px rgba(255,215,0,0.2), 0 0 20px rgba(255,165,0,0.1)`;
            });

            card.addEventListener('mouseleave', () => {
                if (isWinner) card.classList.remove('gold-pulse-hover');
                card.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease';
                card.style.transform  = '';
                card.style.boxShadow  = '';
            });
        });
    })();

    // ─────────────────────────────────────────────────────────────────────────
    // FIX 4 — CASE STUDY CARDS: 3D hover tilt + scan line
    // Targets .cs-card inside #card-6
    // ─────────────────────────────────────────────────────────────────────────
    (function () {
        if (isTouchDevice) return;

        const csSection = document.getElementById('card-6');
        if (!csSection) return;

        const csCards = csSection.querySelectorAll('.cs-card');
        const MAX_TILT = 12;

        csCards.forEach(card => {
            let scanTimer = null;

            card.addEventListener('mouseenter', () => {
                // Trigger scan-line animation (play once per hover)
                card.classList.remove('cs-scanning');
                void card.offsetWidth; // reflow to restart animation
                card.classList.add('cs-scanning');
                // Remove after animation completes (1.2s) so it doesn't loop
                clearTimeout(scanTimer);
                scanTimer = setTimeout(() => card.classList.remove('cs-scanning'), 1300);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cx   = rect.left + rect.width  / 2;
                const cy   = rect.top  + rect.height / 2;
                const rx   = ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT;
                const ry   = ((e.clientX - cx) / (rect.width  / 2)) *  MAX_TILT;
                card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';
                card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.03)`;
                card.style.boxShadow  = `0 20px 60px rgba(0,212,255,0.30), 0 0 30px rgba(0,212,255,0.12)`;
            });

            card.addEventListener('mouseleave', () => {
                clearTimeout(scanTimer);
                card.classList.remove('cs-scanning');
                card.style.transition = 'transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease';
                card.style.transform  = '';
                card.style.boxShadow  = '';
            });
        });
    })();

})(); // end SPACE FIXES v2 IIFE
