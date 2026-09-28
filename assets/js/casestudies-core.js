function initCaseStudiesCore() {
// Case Studies
const caseStudiesData = [{ title: 'Neural Sentiment Engine', category: 'Deep NLP Analytics', resultBadge: '🚀 +98.2% Accurate Sentiment Mapping', resultDetails: 'Deployed custom LLM topologies and high-throughput vector index networks executing within sub-millisecond constraints under high multi-tenant loads.', liveLink: '#', liveText: 'Case Study Architecture Verified' }, { title: 'AI Chatbot Assistant', category: 'AI / NLP', resultBadge: '⚡ High Performance NLP', resultDetails: 'Automated 90% of query handling.', liveLink: 'https://github.com/coddies/AI-Chatbot', liveText: 'View Repository' }, { title: 'Modern Glassmorphism Portfolio', category: 'Frontend Development', resultBadge: '💎 Premium Design Architecture', resultDetails: 'Delivered top-tier UX.', liveLink: 'https://github.com/coddies/My-Portfolio', liveText: 'View Source Code' }];
const csM = document.getElementById('csModal');
function openCs(idx) {
    const d = caseStudiesData[idx]; if(!d||!csM) return;
    document.getElementById('csModalDynamicContent').innerHTML = `<div class="cs-wrap"><h2 class="cs-title">${d.title}</h2><p class="cs-text">${d.category}</p><div class="cs-result-box"><div class="cs-result-badge">${d.resultBadge}</div><p class="cs-text">${d.resultDetails}</p></div><a class="cs-live-link" href="${d.liveLink}" target="_blank">${d.liveText}</a></div>`;
    csM.classList.add('active'); setTimeout(()=>csM.classList.add('visible'), 50);
}
document.querySelectorAll('.cs-card[data-cs]').forEach(c => c.addEventListener('click', () => openCs(parseInt(c.getAttribute('data-cs')))));
if(document.getElementById('csModalClose')) document.getElementById('csModalClose').addEventListener('click', ()=>{csM.classList.remove('visible'); setTimeout(()=>csM.classList.remove('active'), 400);});
}
window.addEventListener('mb-sections-ready', initCaseStudiesCore, { once: true });
