function initAboutExtras() {
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
}
window.addEventListener('mb-sections-ready', initAboutExtras, { once: true });
