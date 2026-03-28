// ── CARD SWITCHING ──
const cards   = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex   = 0;
let isTransitioning = false;

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    setTheme(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('light-theme'));
    });
}

// ── CARD IN-ANIMATIONS LOGIC ──
function triggerCardAnimations(card) {
    if (!card) return;
    // Handle About Section
    if(card.id === 'card-2') {
        card.querySelectorAll('.about-photo, .about-grid>div:last-child>*').forEach(el => el.classList.add('anim-in'));
    }
    // Handle all generic anim-in items
    card.querySelectorAll('.skill-card, .project-card, .cert-card, .contact-link-card, .hack-title, .hack-desc, .stats-row, .hack-badge, .contact-panel h2, .contact-subtitle').forEach(el => {
        el.classList.add('anim-in');
    });
    // Handle Progress bars specific to Skills
    if(card.id === 'card-3') {
        setTimeout(() => {
            card.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 300);
    }
}

// Initial trigger for card 1 (and 2 if needed immediately)
setTimeout(() => { triggerCardAnimations(cards[0]); }, 100);

function updateCards(nextIndex) {
    if (nextIndex === currentIndex || isTransitioning) return;
    isTransitioning = true;

    // Reset animations for the next card to re-trigger
    const nextCard = cards[nextIndex];
    nextCard.querySelectorAll('.anim-in').forEach(el => el.classList.remove('anim-in'));
    if(nextIndex === 2) {
        nextCard.querySelectorAll('.progress-bar').forEach(bar => bar.style.width = '0%');
    }

    // Update nav active state
    navBtns.forEach(btn => btn.classList.remove('active'));
    navBtns[nextIndex].classList.add('active');

    // Sync all cards positions
    cards.forEach((card, idx) => {
        card.className = 'card ' + (idx === nextIndex ? 'state-active' : (idx < nextIndex ? 'state-above' : 'state-below'));
    });

    // Trigger animations after CSS card slide begins
    setTimeout(() => { triggerCardAnimations(nextCard); }, 100);

    currentIndex = nextIndex;
    setTimeout(() => { isTransitioning = false; }, 750);
}

navBtns.forEach((btn, idx) => { btn.addEventListener('click', () => updateCards(idx)); });

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) updateCards(currentIndex + 1);
    if (e.key === 'ArrowUp'   && currentIndex > 0)               updateCards(currentIndex - 1);
});

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

// ── READ MORE TOGGLE ──
const rmBtn = document.getElementById('readMoreBtn');
const amContent = document.getElementById('aboutMoreContent');
if (rmBtn && amContent) {
    rmBtn.addEventListener('click', () => {
        const isHidden = amContent.style.display === 'none' || amContent.style.display === '';
        amContent.style.display = isHidden ? 'block' : 'none';
        rmBtn.textContent = isHidden ? 'Read Less' : 'Read More';
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
        const count = window.innerWidth < 768 ? 40 : 80;
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
