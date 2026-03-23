// ── CARD SWITCHING ──
const cards   = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
let currentIndex   = 0;
let isTransitioning = false;

function updateCards(nextIndex) {
    if (nextIndex === currentIndex || isTransitioning) return;
    isTransitioning = true;

    const isMovingDown = nextIndex > currentIndex;
    const currentCard  = cards[currentIndex];
    const nextCard     = cards[nextIndex];

    // Update nav active state
    navBtns.forEach(btn => btn.classList.remove('active'));
    navBtns[nextIndex].classList.add('active');

    // Animate cards
    if (isMovingDown) {
        currentCard.classList.remove('state-active');
        currentCard.classList.add('state-above');
        nextCard.classList.remove('state-below');
        nextCard.classList.add('state-active');
    } else {
        currentCard.classList.remove('state-active');
        currentCard.classList.add('state-below');
        nextCard.classList.remove('state-above');
        nextCard.classList.add('state-active');
    }

    // Sync all other cards
    cards.forEach((card, idx) => {
        if (idx === nextIndex) return;
        card.className = 'card ' + (idx < nextIndex ? 'state-above' : 'state-below');
    });
    nextCard.className = 'card state-active';

    currentIndex = nextIndex;

    // ── About card (index 1) — slide-in photo animation
    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutPhoto) {
        aboutPhoto.classList.remove('slide-in');
        void aboutPhoto.offsetWidth; // force reflow
    }
    if (nextIndex === 1 && aboutPhoto) {
        setTimeout(() => { aboutPhoto.classList.add('slide-in'); }, 350);
    }

    // ── Skills card (index 2) — animate progress bars
    if (nextIndex === 2) {
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 400);
    } else {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = '0%';
        });
    }

    setTimeout(() => { isTransitioning = false; }, 700);
}

// Nav button clicks
navBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateCards(idx));
});

// Keyboard arrow keys
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) updateCards(currentIndex + 1);
    if (e.key === 'ArrowUp'   && currentIndex > 0)               updateCards(currentIndex - 1);
});

// ── TYPEWRITER ──
const phrases   = ['AI Developer', 'Data Scientist', 'AWS Hackathon Participant', 'Problem Solver', 'Content Creator', 'Prompt Engineer', 'Vibe Coder'];
let phraseIdx   = 0;
let charIdx     = 0;
let isDeleting  = false;
const typeEl    = document.getElementById('typewriter');

function type() {
    const word = phrases[phraseIdx];
    if (isDeleting) { charIdx--; } else { charIdx++; }
    typeEl.textContent = word.substring(0, charIdx);

    let speed = isDeleting ? 40 : 100;
    if (!isDeleting && charIdx === word.length)  { speed = 1500; isDeleting = true; }
    if  (isDeleting && charIdx === 0)            { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 500; }
    setTimeout(type, speed);
}
type();


// ── CERT MODAL ──
const certModal = document.getElementById('certModal');
const modalImg  = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgPath = card.getAttribute('data-img');
        if (imgPath) {
            modalImg.src = imgPath;
            certModal.classList.add('active');
        }
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        certModal.classList.remove('active');
    });
}

if (certModal) {
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('active');
        }
    });
}

// ── READ MORE TOGGLE ──
const rmBtn = document.getElementById('readMoreBtn');
const amContent = document.getElementById('aboutMoreContent');

if (rmBtn && amContent) {
    rmBtn.addEventListener('click', () => {
        const isHidden = amContent.style.display === 'none';
        amContent.style.display = isHidden ? 'block' : 'none';
        rmBtn.textContent     = isHidden ? 'Read Less' : 'Read More';
    });
}
