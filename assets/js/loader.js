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

    // Phase 2: Launch rocket first
    setTimeout(()=>{ 
        const wrap = document.getElementById('mb-rocket-wrap');
        const name = document.getElementById('mb-name');
        const subtitle = document.getElementById('mb-subtitle');
        if (wrap) wrap.classList.add('launching'); 
        if (name) { name.style.transition = 'opacity 0.4s ease'; name.style.opacity = '0'; }
        if (subtitle) { subtitle.style.transition = 'opacity 0.4s ease'; subtitle.style.opacity = '0'; }
    }, 2500);

    // Phase 3: Wait for rocket to go up, then open panels and show Home Page
    setTimeout(() => {
        const pL = document.getElementById('mb-panel-left');
        const pR = document.getElementById('mb-panel-right');
        const content = document.getElementById('mb-loader-content');
        const stars = document.getElementById('mb-loader-stars');
        
        // IMMEDIATE HIDE CONTENT TO PREVENT OVERLAP
        if (content) content.style.display = 'none';
        if (stars) stars.style.display = 'none';

        if (pL) pL.style.transform = 'translateX(-100%)';
        if (pR) pR.style.transform = 'translateX(100%)';

        const home = document.getElementById('card-1');
        if (home) {
            home.classList.add('section-entering');
            setTimeout(() => home.classList.remove('section-entering'), 1000);
        }
    }, 3100);

    // Phase 4: Cleanup
    setTimeout(()=>{ 
        if (loader) loader.remove(); 
        document.body.style.overflow = ''; 
        document.body.style.position = '';
        document.body.style.height = '';
    }, 3800);
  }

  function buildTransitionElements() {
    if (document.getElementById('mb-trans-left')) return;
    var tl = document.createElement('div'); tl.id = 'mb-trans-left';
    var tr = document.createElement('div'); tr.id = 'mb-trans-right';
    var tk = document.createElement('div'); tk.id = 'mb-trans-rocket';
    tk.innerHTML = ROCKET_SVG;
    document.body.appendChild(tl); document.body.appendChild(tr); document.body.appendChild(tk);
  }

  window.mbRocketTransition = function(callback, isBack = false) {
    var tL = document.getElementById('mb-trans-left'), tR = document.getElementById('mb-trans-right'), tK = document.getElementById('mb-trans-rocket');
    if (!tL || !tK) return callback && callback();
    
    tK.style.animation = 'none'; tK.offsetHeight;
    // Set directional animation
    tK.style.animation = isBack ? 'mbTransLaunchDown 1.0s ease-in forwards' : 'mbTransLaunch 1.0s ease-in forwards';
    
    setTimeout(() => { tL.style.transition = 'transform 0.4s ease-in'; tR.style.transition = 'transform 0.4s ease-in'; tL.style.transform = 'translateX(0)'; tR.style.transform = 'translateX(0)'; }, 400);
    setTimeout(() => { if (callback) callback(); }, 850);
    setTimeout(() => { tL.style.transition = 'transform 0.5s ease-out'; tR.style.transition = 'transform 0.5s ease-out'; tL.style.transform = 'translateX(-100%)'; tR.style.transform = 'translateX(100%)'; }, 1000);
  };

  function bootLoader() { buildLoader(); buildTransitionElements(); if (typeof window.showNavPopup === 'function') window.showNavPopup(); }
window.addEventListener('mb-sections-ready', bootLoader, { once: true });
})();
