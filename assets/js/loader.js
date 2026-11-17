// ── ORIGINAL LOADER SYSTEM (NO ROCKET) ──
(function() {
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

    // Phase 1: Name and subtitle show with stars
    // Phase 2: Fade out text quickly
    setTimeout(()=>{ 
        const name = document.getElementById('mb-name');
        const subtitle = document.getElementById('mb-subtitle');
        if (name) { name.style.transition = 'opacity 0.28s ease'; name.style.opacity = '0'; }
        if (subtitle) { subtitle.style.transition = 'opacity 0.28s ease'; subtitle.style.opacity = '0'; }
    }, 850);

    // Phase 3: Smoothly open panels and show Home Page
    setTimeout(() => {
        const pL = document.getElementById('mb-panel-left');
        const pR = document.getElementById('mb-panel-right');
        const content = document.getElementById('mb-loader-content');
        const stars = document.getElementById('mb-loader-stars');
        
        // IMMEDIATE HIDE CONTENT TO PREVENT OVERLAP
        if (content) content.style.display = 'none';
        if (stars) stars.style.display = 'none';

        if (pL) { pL.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'; pL.style.transform = 'translateX(-100%)'; }
        if (pR) { pR.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'; pR.style.transform = 'translateX(100%)'; }

        const home = document.getElementById('card-1');
        if (home) {
            home.classList.add('section-entering');
            setTimeout(() => home.classList.remove('section-entering'), 1000);
        }
    }, 1100);

    // Phase 4: Cleanup
    setTimeout(()=>{ 
        if (loader) loader.remove(); 
        document.body.style.overflow = ''; 
        document.body.style.position = '';
        document.body.style.height = '';
    }, 1600);
  }

  function buildTransitionElements() {
    if (document.getElementById('mb-trans-left')) return;
    var tl = document.createElement('div'); tl.id = 'mb-trans-left';
    var tr = document.createElement('div'); tr.id = 'mb-trans-right';
    document.body.appendChild(tl); document.body.appendChild(tr);
  }

  window.mbRocketTransition = function(callback, isBack = false) {
    var tL = document.getElementById('mb-trans-left'), tR = document.getElementById('mb-trans-right');
    if (!tL || !tR) return callback && callback();
    
    // Smooth sleek split panel slide transition (no rocket)
    tL.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
    tR.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
    tL.style.transform = 'translateX(0)';
    tR.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        if (callback) callback();
    }, 300);

    setTimeout(() => {
        tL.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        tR.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        tL.style.transform = 'translateX(-100%)';
        tR.style.transform = 'translateX(100%)';
    }, 380);
  };

  function bootLoader() { 
    buildLoader(); 
    buildTransitionElements(); 
    if (typeof window.showNavPopup === 'function') window.showNavPopup(); 
  }
  window.addEventListener('mb-sections-ready', bootLoader, { once: true });
})();
