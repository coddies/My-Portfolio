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
    card.querySelectorAll('.skill-card, .project-card, .cert-card, .contact-link-card, .hack-title, .hack-desc, .stats-row, .hack-badge, .contact-panel h2, .contact-subtitle, .cs-card, .skill-3d-card').forEach(el => {
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

    const direction = nextIndex > currentIndex ? 1 : -1;

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
    
    navBtns.forEach(btn => btn.classList.remove('active'));
    if(navBtns[nextIndex]) navBtns[nextIndex].classList.add('active');

    // Step 1: Position next card
    nextCard.style.transition = 'none';
    nextCard.style.opacity    = '0';
    nextCard.style.transform  = `translateX(${direction * 80}px)`;
    nextCard.style.visibility = 'visible';

    nextCard.offsetHeight; // reflow

    // Step 2: Clear inline for CSS transition
    nextCard.style.transition    = '';
    nextCard.style.opacity       = '';
    nextCard.style.transform     = '';
    nextCard.style.visibility    = '';

    // Step 3: Set classes
    cards.forEach((card, idx) => {
        if (idx === nextIndex) {
            card.className = 'card state-active';
        } else {
            card.className = 'card ' + (idx < nextIndex ? 'state-above' : 'state-below');
        }
    });

    setTimeout(() => { triggerCardAnimations(nextCard); }, 80);

    currentIndex = nextIndex;
    setTimeout(() => { isTransitioning = false; }, 1000);
}

window.__baseUpdateCards = updateCards;

navBtns.forEach((btn, idx) => { 
    btn.addEventListener('click', () => { 
        if (typeof mbRocketTransition === 'function') { 
            mbRocketTransition(() => window.__baseUpdateCards(idx)); 
        } else { 
            window.__baseUpdateCards(idx); 
        } 
    }); 
});

// Keyboard Navigation
window.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentIndex < cards.length - 1) { 
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex + 1)); 
        else window.__baseUpdateCards(currentIndex + 1); 
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentIndex > 0) { 
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex - 1)); 
        else window.__baseUpdateCards(currentIndex - 1); 
    }
});


// ── TOUCH SWIPE GESTURE ──
let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dt = Date.now() - touchStartTime;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
        if (dx < 0 && currentIndex < cards.length - 1) {
            if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex + 1)); 
            else window.__baseUpdateCards(currentIndex + 1);
        } else if (dx > 0 && currentIndex > 0) {
            if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex - 1)); 
            else window.__baseUpdateCards(currentIndex - 1);
        }
    }
}, { passive: true });

// ── TYPEWRITER (Main Hero) ──
const phrases = ['AI Developer', 'Data Scientist', 'AWS Hackathon Participant', 'Problem Solver', 'Content Creator', 'Prompt Engineer', 'Vibe Coder'];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');
function type() {
    if (!typeEl) return;
    const word = phrases[phraseIdx];
    if (isDeleting) charIdx--; else charIdx++;
    typeEl.textContent = word.substring(0, charIdx);
    let speed = isDeleting ? 40 : 100;
    if (!isDeleting && charIdx === word.length) { speed = 1500; isDeleting = true; }
    if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 500; }
    setTimeout(type, speed);
}
if(typeEl) type();


// ── CASE STUDIES DATA ──
const caseStudiesData = [
  {
    title: 'Faceless AI Video Studio',
    category: 'AI Automation',
    tags: [{ text: 'Python', cls: 'tag-py' }, { text: 'MoviePy', cls: 'tag-ml' }, { text: 'AWS Bedrock', cls: 'tag-aws' }],
    stats: [
      { label: 'Time Saved', value: '98%', sub: '4 hrs → under 3 min', color: 'green' },
      { label: 'Achievement', value: '🏆 winner', sub: 'AWS Nova Hackathon', color: 'purple' },
      { label: 'Status', value: 'Live', sub: 'Deployed on Vercel', color: 'amber' }
    ],
    problem: 'Manual video editing takes dozens of hours per week, severely limiting content output.',
    solution: 'Developed an Agentic AI Pipeline using AWS Bedrock and Python to autonomously generate scripts, voiceovers, and videos.',
    pipeline: [{ icon: '✍️', label: 'Script Gen', sub: 'Nova Pro' }, { icon: '🎙️', label: 'Voiceover', sub: 'Nova Sonic' }, { icon: '🖼️', label: 'Visuals', sub: 'Nova Canvas' }, { icon: '🎬', label: 'Video Edit', sub: 'MoviePy' }],
    resultDetails: 'Cut production time by 98%.',
    resultBadge: '🏆 AWS Nova Hackathon Winner',
    liveLink: 'https://faceless-ai-studio-tau.vercel.app/',
    liveText: 'faceless-ai-studio-tau',
    devpostLink: 'https://devpost.com/software/faceless-ai-studio'
  },
  {
    title: 'AI Chatbot Assistant',
    category: 'AI / NLP',
    tags: [{ text: 'Python', cls: 'tag-py' }, { text: 'LangChain', cls: 'tag-ml' }, { text: 'OpenAI', cls: 'tag-aws' }],
    stats: [
      { label: 'Automation', value: '90%', sub: 'Queries handled', color: 'green' },
      { label: 'Response', value: '< 1s', sub: 'Avg response time', color: 'purple' },
      { label: 'Uptime', value: '99.9%', sub: 'High availability', color: 'amber' }
    ],
    problem: 'Users needed accurate human-like responses instantly.',
    solution: 'Built a RAG-based chatbot using Python, OpenAI, and LangChain.',
    pipeline: [{ icon: '📥', label: 'Ingest', sub: 'Data Parsing' }, { icon: '🧠', label: 'Process', sub: 'LangChain' }, { icon: '🤖', label: 'Generate', sub: 'OpenAI LLM' }, { icon: '📤', label: 'Output', sub: 'Instant Reply' }],
    resultDetails: 'Automated 90% of query handling.',
    resultBadge: '⚡ High Performance NLP',
    liveLink: 'https://github.com/coddies/AI-Chatbot',
    liveText: 'View Repository'
  },
  {
    title: 'Modern Glassmorphism Portfolio',
    category: 'Frontend Development',
    tags: [{ text: 'HTML5', cls: 'tag-web' }, { text: 'CSS3', cls: 'tag-web' }, { text: 'JS', cls: 'tag-web' }],
    stats: [
      { label: 'Design', value: 'Premium', sub: 'Glassmorphism', color: 'purple' },
      { label: 'Performance', value: '100%', sub: 'Lighthouse Score', color: 'green' },
      { label: 'Responsiveness', value: 'Full', sub: 'All devices', color: 'amber' }
    ],
    problem: 'Standard portfolios lack premium feel.',
    solution: 'Developed a high-end, card-based single-page portfolio.',
    pipeline: [{ icon: '🎨', label: 'Design', sub: 'Figma UI' }, { icon: '🧱', label: 'Structure', sub: 'Semantic HTML' }, { icon: '✨', label: 'Style', sub: 'Vanilla CSS' }, { icon: '⚡', label: 'Interact', sub: 'Custom JS' }],
    resultDetails: 'Delivered top-tier UX with fixed-viewport navigation.',
    resultBadge: '💎 Premium Design Architecture',
    liveLink: 'https://github.com/coddies/My-Portfolio',
    liveText: 'View Source Code'
  }
];

const csModal = document.getElementById('csModal');
function openCsModal(idx) {
    const data = caseStudiesData[idx];
    if (!data || !csModal) return;
    const dynamicContainer = document.getElementById('csModalDynamicContent');
    dynamicContainer.innerHTML = `
    <div class="cs-wrap">
      <div class="cs-header">
        <div class="cs-category"><div class="cs-category-dot"></div>${data.category} · Case Study</div>
        <h2 class="cs-title">${data.title}</h2>
      </div>
      <div class="cs-section">
        <p class="cs-text">${data.problem}</p>
        <p class="cs-text">${data.solution}</p>
      </div>
      <div class="cs-section">
        <div class="cs-result-box"><div class="cs-result-badge">${data.resultBadge}</div><p class="cs-text">${data.resultDetails}</p></div>
        ${data.liveLink ? `<a class="cs-live-link" href="${data.liveLink}" target="_blank">${data.liveText}</a>` : ''}
      </div>
    </div>`;
    csModal.classList.add('active');
    setTimeout(() => csModal.classList.add('visible'), 50);
}
function closeCsModal() {
    csModal.classList.remove('visible');
    setTimeout(() => csModal.classList.remove('active'), 400);
}
document.querySelectorAll('.cs-card[data-cs]').forEach(card => card.addEventListener('click', () => openCsModal(parseInt(card.getAttribute('data-cs')))));
if (document.getElementById('csModalClose')) document.getElementById('csModalClose').addEventListener('click', closeCsModal);


// ── PARTICLES ENGINE ──
(function() {
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        const count = window.innerWidth < 768 ? 40 : 100;
        for(let i=0; i<count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    function drawParticles() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>canvas.width) p.vx *= -1;
            if(p.y<0 || p.y>canvas.height) p.vy *= -1;
            ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    window.addEventListener('resize', initParticles);
    initParticles(); drawParticles();
})();


// ── CUSTOM CURSOR ──
(function() {
    const dotWrap = document.querySelector('.cursor-dot-wrap');
    const ringWrap = document.querySelector('.cursor-ring-wrap');
    if (dotWrap && ringWrap && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
        const animateCursor = () => {
            dotWrap.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            ringX += (mouseX - ringX) * 0.2; ringY += (mouseY - ringY) * 0.2;
            ringWrap.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .nav-btn, .project-card, .cert-card, .skill-3d-card, .cs-card')) {
                document.body.classList.add('is-hovering');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .nav-btn, .project-card, .cert-card, .skill-3d-card, .cs-card')) {
                document.body.classList.remove('is-hovering');
            }
        });
    }
})();


// ── ROCKET SYSTEM & NEURAL MATRIX ──
(function() {
  const ROCKET_SVG = '<svg width="50" height="90" viewBox="0 0 50 90" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="35" rx="12" ry="22" fill="white"/><polygon points="25,2 13,20 37,20" fill="white"/><circle cx="25" cy="30" r="6" fill="#00D4FF" opacity="0.8"/><circle cx="25" cy="30" r="4" fill="#050610"/><polygon points="13,50 4,70 13,60" fill="#00D4FF"/><polygon points="37,50 46,70 37,60" fill="#00D4FF"/><ellipse cx="25" cy="65" rx="8" ry="14" fill="#FF6B00"/><ellipse cx="25" cy="63" rx="5" ry="9" fill="#B829FF"/></svg>';
  
  function buildTransitionElements() {
    if (document.getElementById('mb-trans-left')) return;
    const tl = document.createElement('div'); tl.id = 'mb-trans-left';
    const tr = document.createElement('div'); tr.id = 'mb-trans-right';
    const tk = document.createElement('div'); tk.id = 'mb-trans-rocket';
    tk.innerHTML = ROCKET_SVG;
    document.body.appendChild(tl); document.body.appendChild(tr); document.body.appendChild(tk);
  }

  window.mbRocketTransition = function(callback) {
    const tL = document.getElementById('mb-trans-left'), tR = document.getElementById('mb-trans-right'), tK = document.getElementById('mb-trans-rocket');
    if (!tL || !tK) return callback && callback();
    tK.style.animation = 'none'; tK.offsetHeight;
    tK.style.animation = 'mbTransLaunch 1.0s ease-in forwards';
    setTimeout(() => { tL.style.transform = 'translateX(0)'; tR.style.transform = 'translateX(0)'; }, 400);
    setTimeout(() => { if (callback) callback(); }, 850);
    setTimeout(() => { tL.style.transform = 'translateX(-100%)'; tR.style.transform = 'translateX(100%)'; }, 1000);
  };

  buildTransitionElements();

  // Matrix Rain
  const mCanvas = document.getElementById('matrix-canvas');
  if (mCanvas) {
      const ctx = mCanvas.getContext('2d');
      let w = mCanvas.width = mCanvas.offsetWidth, h = mCanvas.height = mCanvas.offsetHeight;
      let cols = Math.floor(w / 20), drops = Array(cols).fill(1);
      function draw() {
          ctx.fillStyle = 'rgba(10, 15, 22, 0.15)'; ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#8B5CF6'; ctx.font = '15px monospace';
          drops.forEach((y, i) => {
              ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 20, y * 20);
              if (y * 20 > h && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
          });
      }
      setInterval(draw, 50);
  }

  // 3D Skills
  document.querySelectorAll('.skill-3d-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 40;
          const y = ((e.clientY - r.top) / r.height - 0.5) * -40;
          card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.transition = 'transform 0.5s ease-out';
      });
      card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease-out'; });
  });
})();
