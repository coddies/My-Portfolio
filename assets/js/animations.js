function initAnimations() {
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

// Particles (Interactive Galaxy Background with Mouse Parallax & Shooting Stars)
(function() {
    const c = document.getElementById('particles-canvas');
    if(!c) return;
    const ctx = c.getContext('2d');
    
    let pts = [];
    let shootingStars = [];

    var cursorDot = document.querySelector('.cursor-dot-wrap');
    var cursorRing = document.querySelector('.cursor-ring-wrap');
    var navPopup = document.getElementById('navPopup');
    var navPopupText = document.getElementById('navPopupText');
    var navPopupIcon = document.getElementById('navPopupIcon');

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var dotX = mouseX;
    var dotY = mouseY;
    var ringX = mouseX;
    var ringY = mouseY;
    var aff;

    // Smoothing factor (0 = stuck, 1 = instant)
    var speedDot = 1.0; 
    var speedRing = 0.15; 

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if(!aff) aff = requestAnimationFrame(updateCursor);
    });

    function updateCursor() {
        dotX += (mouseX - dotX) * speedDot;
        dotY += (mouseY - dotY) * speedDot;
        ringX += (mouseX - ringX) * speedRing;
        ringY += (mouseY - ringY) * speedRing;

        if(cursorDot) cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        if(cursorRing) cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

        aff = requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Parallax offset strength (adjustable)
        targetOffsetX = (mouseX - window.innerWidth / 2) * 0.08;
        targetOffsetY = (mouseY - window.innerHeight / 2) * 0.08;
    });

    function init() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        pts = [];
        // Reduced star count to 150
        for(let i=0; i<150; i++) {
            let size = Math.random() * 1.8 + 0.4;
            pts.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                size: size,
                // Stars closer to screen (larger size) have deeper parallax depth
                depth: size * 0.8,
                // Add a pulse speed for subtle twinkling
                pulseSpeed: Math.random() * 0.05 + 0.01,
                pulseVal: Math.random() * Math.PI
            });
        }
    }

    function spawnShootingStar() {
        // Shooting star parameters
        shootingStars.push({
            x: Math.random() * (c.width * 0.8), // Start in left 80%
            y: Math.random() * (c.height * 0.4), // Start in top 40%
            len: Math.random() * 100 + 50, // Length of tail
            speedX: Math.random() * 12 + 8, // Diagonal speed
            speedY: Math.random() * 6 + 4,
            opacity: 1.0,
            fadeSpeed: Math.random() * 0.015 + 0.01,
            width: Math.random() * 1.5 + 0.8
        });
    }

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        
        // Easing parallax offsets for butter-smooth movement
        currentOffsetX += (targetOffsetX - currentOffsetX) * 0.05;
        currentOffsetY += (targetOffsetY - currentOffsetY) * 0.05;

        // Render Stars
        pts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce on boundary
            if (p.x < 0 || p.x > c.width) p.vx *= -1;
            if (p.y < 0 || p.y > c.height) p.vy *= -1;

            // Calculate parallax position
            let renderX = p.x + currentOffsetX * p.depth;
            let renderY = p.y + currentOffsetY * p.depth;

            // Twinkle effect (sine wave opacity pulsing)
            p.pulseVal += p.pulseSpeed;
            let opacity = 0.2 + (Math.sin(p.pulseVal) * 0.5 + 0.5) * 0.6;

            ctx.beginPath();
            ctx.fillStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Spawn shooting stars randomly (approx once every few seconds)
        if (Math.random() < 0.006 && shootingStars.length < 2) {
            spawnShootingStar();
        }

        // Draw and update Shooting Stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            let s = shootingStars[i];
            s.x += s.speedX;
            s.y += s.speedY;
            s.opacity -= s.fadeSpeed;

            if (s.opacity <= 0 || s.x > c.width || s.y > c.height) {
                shootingStars.splice(i, 1);
            } else {
                ctx.beginPath();
                // Draw a beautiful gradient tail
                let grad = ctx.createLinearGradient(
                    s.x, s.y, 
                    s.x - s.len, s.y - s.len * (s.speedY / s.speedX)
                );
                grad.addColorStop(0, `rgba(0, 229, 255, ${s.opacity})`);
                grad.addColorStop(0.3, `rgba(139, 92, 246, ${s.opacity * 0.6})`);
                grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.width;
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.len, s.y - s.len * (s.speedY / s.speedX));
                ctx.stroke();
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();
})();

// Cursor (100% Compositor Thread & GPU Accelerated Smooth Cursor)
(function() {
    const dW = document.querySelector('.cursor-dot-wrap'), rW = document.querySelector('.cursor-ring-wrap');
    if (dW && rW && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            // Update wrapper positions instantly. The smooth animations/trails are handled 
            // entirely in CSS on the GPU/Compositor thread, making it 144Hz+ buttery smooth!
            dW.style.transform = `translate3d(${x}px,${y}px,0)`;
            rW.style.transform = `translate3d(${x}px,${y}px,0)`;
        }, { passive: true });

        document.addEventListener('mouseover', (e) => { if (e.target.closest('a, button, .nav-btn, .skill-3d-card, .cs-card, .hybrid-cube')) document.body.classList.add('is-hovering'); });
        document.addEventListener('mouseout', (e) => { if (e.target.closest('a, button, .nav-btn, .skill-3d-card, .cs-card, .hybrid-cube')) document.body.classList.remove('is-hovering'); });
    }
})();
}
window.addEventListener('mb-sections-ready', initAnimations, { once: true });
