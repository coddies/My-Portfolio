(function () {
  const SECTION_FILES = [
    'home.html',
    'about.html',
    'skills.html',
    'projects.html',
    'achievements.html',
    'casestudies.html',
    'contact.html',
  ];

  async function loadSection(url, container) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    const html = await res.text();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const scripts = [...wrap.querySelectorAll('script')];
    scripts.forEach((s) => s.remove());
    while (wrap.firstChild) {
      container.appendChild(wrap.firstChild);
    }
    scripts.forEach(function (oldScript) {
      const script = document.createElement('script');
      if (oldScript.src) {
        script.src = oldScript.src;
        script.async = false;
      } else {
        script.textContent = oldScript.textContent;
      }
      document.body.appendChild(script);
    });
  }

  async function loadAllSections() {
    const root = document.getElementById('sections-root');
    if (!root) return;
    for (const file of SECTION_FILES) {
      await loadSection('assets/sections/' + file, root);
    }
    window.dispatchEvent(new Event('mb-sections-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections, { once: true });
  } else {
    loadAllSections();
  }
})();
