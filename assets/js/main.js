// ── CARD SWITCHING ──
const cards   = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex   = 0;
let isTransitioning = false;

function triggerCardAnimations(card) {
    if (!card) return;
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

function updateCards(nextIndex) {
    if (nextIndex === currentIndex || isTransitioning) return;
    if (nextIndex < 0 || nextIndex >= cards.length) return;
    isTransitioning = true;
    const direction = nextIndex > currentIndex ? 1 : -1;
    const nextCard = cards[nextIndex];
    navBtns.forEach(btn => btn.classList.remove('active'));
    if(navBtns[nextIndex]) navBtns[nextIndex].classList.add('active');
    
    nextCard.style.transition = 'none';
    nextCard.style.opacity    = '0';
    nextCard.style.transform  = `translateX(${direction * 80}px)`;
    nextCard.style.visibility = 'visible';
    nextCard.offsetHeight;
    nextCard.style.transition = '';
    nextCard.style.opacity    = '';
    nextCard.style.transform  = '';
    
    cards.forEach((card, idx) => {
        if (idx === nextIndex) card.className = 'card state-active';
        else card.className = 'card ' + (idx < nextIndex ? 'state-above' : 'state-below');
    });
    setTimeout(() => { triggerCardAnimations(nextCard); }, 80);
    currentIndex = nextIndex;
    setTimeout(() => { isTransitioning = false; }, 1000);
}
window.__baseUpdateCards = updateCards;

navBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(idx));
        else window.__baseUpdateCards(idx);
    });
});

// Keyboard
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

// Touch Swipe
let touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0 && currentIndex < cards.length - 1) {
             if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex + 1));
             else window.__baseUpdateCards(currentIndex + 1);
        } else if (dx > 0 && currentIndex > 0) {
             if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex - 1));
             else window.__baseUpdateCards(currentIndex - 1);
        }
    }
}, { passive: true });

// Typewriter
const phrases = ['AI Developer', 'Data Scientist', 'AWS Hackathon Participant', 'Problem Solver', 'Content Creator', 'Prompt Engineer', 'Vibe Coder'];
let pIdx = 0, cIdx = 0, isDel = false;
const tEl = document.getElementById('typewriter');
function type() {
    if (!tEl) return;
    const w = phrases[pIdx];
    if (isDel) cIdx--; else cIdx++;
    tEl.textContent = w.substring(0, cIdx);
    let s = isDel ? 40 : 100;
    if (!isDel && cIdx === w.length) { s = 1500; isDel = true; }
    if (isDel && cIdx === 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; s = 500; }
    setTimeout(type, s);
}
if(tEl) type();

// Particles
(function() {
    const c = document.getElementById('particles-canvas');
    if(!c) return;
    const ctx = c.getContext('2d');
    let pts = [];
    function init() { c.width = window.innerWidth; c.height = window.innerHeight; pts = []; for(let i=0; i<60; i++) pts.push({x:Math.random()*c.width, y:Math.random()*c.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, size:Math.random()*1.5+0.5}); }
    function draw() { ctx.clearRect(0,0,c.width,c.height); ctx.fillStyle='rgba(0, 229, 255, 0.3)'; pts.forEach(p=>{p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>c.width) p.vx*=-1; if(p.y<0||p.y>c.height) p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();}); requestAnimationFrame(draw); }
    window.addEventListener('resize', init); init(); draw();
})();

// Cursor
(function() {
    const dW = document.querySelector('.cursor-dot-wrap'), rW = document.querySelector('.cursor-ring-wrap');
    if (dW && rW && window.matchMedia('(pointer: fine)').matches) {
        let mX = 0, mY = 0, rX = 0, rY = 0;
        window.addEventListener('mousemove', (e) => { mX = e.clientX; mY = e.clientY; });
        const anim = () => { dW.style.transform = `translate3d(${mX}px,${mY}px,0)`; rX += (mX-rX)*0.2; rY += (mY-rY)*0.2; rW.style.transform = `translate3d(${rX}px,${rY}px,0)`; requestAnimationFrame(anim); };
        anim();
        document.addEventListener('mouseover', (e) => { if (e.target.closest('a, button, .nav-btn, .skill-3d-card, .cs-card')) document.body.classList.add('is-hovering'); });
        document.addEventListener('mouseout', (e) => { if (e.target.closest('a, button, .nav-btn, .skill-3d-card, .cs-card')) document.body.classList.remove('is-hovering'); });
    }
})();

// Case Studies
const caseStudiesData = [{ title: 'Faceless AI Video Studio', category: 'AI Automation', resultBadge: '🏆 AWS Nova Hackathon Winner', resultDetails: 'Cut production time by 98%.', liveLink: 'https://faceless-ai-studio-tau.vercel.app/', liveText: 'faceless-ai-studio-tau' }, { title: 'AI Chatbot Assistant', category: 'AI / NLP', resultBadge: '⚡ High Performance NLP', resultDetails: 'Automated 90% of query handling.', liveLink: 'https://github.com/coddies/AI-Chatbot', liveText: 'View Repository' }, { title: 'Modern Glassmorphism Portfolio', category: 'Frontend Development', resultBadge: '💎 Premium Design Architecture', resultDetails: 'Delivered top-tier UX.', liveLink: 'https://github.com/coddies/My-Portfolio', liveText: 'View Source Code' }];
const csM = document.getElementById('csModal');
function openCs(idx) {
    const d = caseStudiesData[idx]; if(!d||!csM) return;
    document.getElementById('csModalDynamicContent').innerHTML = `<div class="cs-wrap"><h2 class="cs-title">${d.title}</h2><p class="cs-text">${d.category}</p><div class="cs-result-box"><div class="cs-result-badge">${d.resultBadge}</div><p class="cs-text">${d.resultDetails}</p></div><a class="cs-live-link" href="${d.liveLink}" target="_blank">${d.liveText}</a></div>`;
    csM.classList.add('active'); setTimeout(()=>csM.classList.add('visible'), 50);
}
document.querySelectorAll('.cs-card[data-cs]').forEach(c => c.addEventListener('click', () => openCs(parseInt(c.getAttribute('data-cs')))));
if(document.getElementById('csModalClose')) document.getElementById('csModalClose').addEventListener('click', ()=>{csM.classList.remove('visible'); setTimeout(()=>csM.classList.remove('active'), 400);});

// ── ORIGINAL ROCKET SYSTEM ──
(function() {
  const ROCKET_SVG = '<svg width="50" height="90" viewBox="0 0 50 90" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="35" rx="12" ry="22" fill="white"/><polygon points="25,2 13,20 37,20" fill="white"/><circle cx="25" cy="30" r="6" fill="#00D4FF" opacity="0.8"/><circle cx="25" cy="30" r="4" fill="#050610"/><polygon points="13,50 4,70 13,60" fill="#00D4FF"/><polygon points="37,50 46,70 37,60" fill="#00D4FF"/><ellipse cx="25" cy="65" rx="8" ry="14" fill="#FF6B00" id="mb-fl-o"/><ellipse cx="25" cy="63" rx="5" ry="9" fill="#B829FF" id="mb-fl-i"/><ellipse cx="25" cy="61" rx="3" ry="6" fill="white"/></svg>';

  
  function buildLoader() {
    const loader = document.getElementById('mb-loader');
    if (!loader) return;
    
    document.body.style.overflow = 'hidden';
    const stars = document.getElementById('mb-loader-stars');
    if (stars && stars.children.length === 0) {
        for(let i=0; i<60; i++) { 
            let s = document.createElement('div'); 
            let sz = Math.random()*2+0.5; 
            s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;background:white;border-radius:50%;top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:${Math.random()*0.6+0.2};`; 
            stars.appendChild(s); 
        }
    }

    // Phase 2: Launch
    setTimeout(()=>{ 
        const wrap = document.getElementById('mb-rocket-wrap');
        const content = document.getElementById('mb-loader-content');
        if (wrap) wrap.classList.add('launching'); 
        if (content) content.style.opacity = '0'; 
    }, 2500);

    // Phase 3: Trigger Home Page entry + Panels
    setTimeout(() => {
        const home = document.getElementById('card-1');
        if (home) {
            home.classList.add('section-entering');
            setTimeout(() => home.classList.remove('section-entering'), 1000);
        }
        const pL = document.getElementById('mb-panel-left');
        const pR = document.getElementById('mb-panel-right');
        if (pL) pL.style.transform = 'translateX(-100%)';
        if (pR) pR.style.transform = 'translateX(100%)';
    }, 2800);

    // Phase 4: Cleanup
    setTimeout(()=>{ loader.remove(); document.body.style.overflow = ''; }, 3500);
  }

    loader.appendChild(stars);
    setTimeout(()=>{ document.getElementById('mb-rocket-wrap').classList.add('launching'); document.getElementById('mb-loader-content').style.opacity = '0'; }, 2500);
    setTimeout(()=>{ document.getElementById('mb-panel-left').style.transform = 'translateX(-100%)'; document.getElementById('mb-panel-right').style.transform = 'translateX(100%)'; }, 2800);
    
    // Trigger entry animation for the initial card (Home)
    setTimeout(() => {
        const activeCard = document.querySelector('.card.state-active');
        if (activeCard) {
            activeCard.classList.add('section-entering');
            setTimeout(() => activeCard.classList.remove('section-entering'), 1000);
        }
    }, 2800); // Trigger right as rocket clears and panels open

    setTimeout(()=>{ loader.remove(); document.body.style.overflow = ''; }, 3500);
  }

  function buildTransitionElements() {
    if (document.getElementById('mb-trans-left')) return;
    var tl = document.createElement('div'); tl.id = 'mb-trans-left';
    var tr = document.createElement('div'); tr.id = 'mb-trans-right';
    var tk = document.createElement('div'); tk.id = 'mb-trans-rocket';
    tk.innerHTML = ROCKET_SVG;
    document.body.appendChild(tl); document.body.appendChild(tr); document.body.appendChild(tk);
  }

  window.mbRocketTransition = function(callback) {
    var tL = document.getElementById('mb-trans-left'), tR = document.getElementById('mb-trans-right'), tK = document.getElementById('mb-trans-rocket');
    if (!tL || !tK) return callback && callback();
    tK.style.animation = 'none'; tK.offsetHeight;
    tK.style.animation = 'mbTransLaunch 1.0s ease-in forwards';
    setTimeout(() => { tL.style.transition = 'transform 0.4s ease-in'; tR.style.transition = 'transform 0.4s ease-in'; tL.style.transform = 'translateX(0)'; tR.style.transform = 'translateX(0)'; }, 400);
    setTimeout(() => { if (callback) callback(); }, 850);
    setTimeout(() => { tL.style.transition = 'transform 0.5s ease-out'; tR.style.transition = 'transform 0.5s ease-out'; tL.style.transform = 'translateX(-100%)'; tR.style.transform = 'translateX(100%)'; }, 1000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { buildLoader(); buildTransitionElements(); }, { once: true });
  else { buildLoader(); buildTransitionElements(); }
})();

// Neural Matrix Extras
(function() {
  const hEl = document.getElementById('dynamic-header');
  if (hEl) {
      const hs = ['SYSTEM_KERNEL_INFO', 'AI_ARCHITECT_LAB', 'NEURAL_SYNC_ACTIVE', 'BURHAN_OS_v2.0'];
      let hi = 0;
      setInterval(() => { hi = (hi + 1) % hs.length; hEl.style.opacity = 0; setTimeout(() => { hEl.textContent = hs[hi]; hEl.style.opacity = 1; }, 300); }, 3000);
  }
  const rEl = document.getElementById('typewriter-roles');
  if (rEl) {
      const rs = ['Data Scientist', 'ML Engineer', 'Neural Architect', 'Microsoft Learn Student Ambassador'];
      let ri = 0, ci = 0, d = false;
      function typeR() { const w = rs[ri]; if (d) ci--; else ci++; rEl.textContent = w.substring(0, ci); let s = d ? 30 : 80; if (!d && ci === w.length) { s = 2000; d = true; } if (d && ci === 0) { d = false; ri = (ri + 1) % rs.length; s = 400; } setTimeout(typeR, s); }
      setTimeout(typeR, 1000);
  }
  const mC = document.getElementById('matrix-canvas');
  if (mC) {
      const ctx = mC.getContext('2d');
      let w = mC.width = mC.offsetWidth, h = mC.height = mC.offsetHeight, ds = Array(Math.floor(w/20)).fill(1);
      function drawM() { ctx.fillStyle = 'rgba(10, 15, 22, 0.15)'; ctx.fillRect(0,0,w,h); ctx.fillStyle = '#8B5CF6'; ctx.font = '15px monospace'; ds.forEach((y, i) => { ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 20, y * 20); if (y * 20 > h && Math.random() > 0.975) ds[i] = 0; ds[i]++; }); }
      setInterval(drawM, 50);
  }
  document.querySelectorAll('.skill-3d-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 40;
          const y = ((e.clientY - r.top) / r.height - 0.5) * -40;
          card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform 0.5s ease-out'; });
      card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease-out'; });
  });
})();
