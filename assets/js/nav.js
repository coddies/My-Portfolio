function initNavigation() {
// ── CARD SWITCHING ──
const cards   = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex   = 0;
let isTransitioning = false;

// Navigation Popup Logic
function showNavPopup() {
    const popup = document.getElementById('navPopup');
    const icon = document.getElementById('navPopupIcon');
    const text = document.getElementById('navPopupText');
    if (!popup || !text) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        icon.textContent = "👈👉";
        text.textContent = "Swipe left/right to explore";
    } else {
        icon.textContent = "⌨️";
        text.textContent = "Use Arrow Keys ⬅️ ➡️ to explore";
    }

    setTimeout(() => {
        popup.classList.add('active');
    }, 4500); // Show after rocket loader finishes

    // Hide after 6 seconds or on interaction
    const hidePopup = () => {
        popup.classList.remove('active');
        document.removeEventListener('click', hidePopup);
        document.removeEventListener('keydown', hidePopup);
        document.removeEventListener('touchstart', hidePopup);
    };
    setTimeout(hidePopup, 12000);
    document.addEventListener('click', hidePopup);
    document.addEventListener('keydown', hidePopup);
    document.addEventListener('touchstart', hidePopup);
}

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
        const isBack = idx < currentIndex;
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(idx), isBack);
        else window.__baseUpdateCards(idx);
    });
});

// Keyboard
window.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentIndex < cards.length - 1) {
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex + 1), false);
        else window.__baseUpdateCards(currentIndex + 1);
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentIndex > 0) {
        if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex - 1), true);
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
             if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex + 1), false);
             else window.__baseUpdateCards(currentIndex + 1);
        } else if (dx > 0 && currentIndex > 0) {
             if (typeof mbRocketTransition === 'function') mbRocketTransition(() => window.__baseUpdateCards(currentIndex - 1), true);
             else window.__baseUpdateCards(currentIndex - 1);
        }
    }
}, { passive: true });
if (typeof showNavPopup === 'function') window.showNavPopup = showNavPopup;
}
window.addEventListener('mb-sections-ready', initNavigation, { once: true });
