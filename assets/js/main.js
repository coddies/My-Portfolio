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
    setTimeout(() => { isTransitioning = false; }, 600);
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




