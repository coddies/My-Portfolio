
NEW_CARD4 = '''<!-- ════════════════════════════
     CARD 4 — PROJECTS
════════════════════════════ -->
<section id="card-4" class="card state-below">
  <div class="card-inner" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
  <style>
    /* === PROJECTS SECTION BASE === */
    .px {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1100px;
      height: calc(100vh - 120px);
      gap: 16px;
      padding: 0 20px 20px 20px;
      box-sizing: border-box;
    }
    .px-top {
      position: relative;
      flex: 1 1 0;
      min-height: 0;
      border-radius: 24px;
      overflow: hidden;
      background: rgba(6,11,20,0.7);
      border: 1px solid rgba(255,255,255,0.08);
    }
    /* Slider track */
    .px-track {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .px-card {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      display: flex;
      transition: none;
    }
    .px-media {
      flex: 0 0 45%;
      position: relative;
      overflow: hidden;
      border-right: 1px solid rgba(255,255,255,0.08);
      background: #060B14;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .px-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
    .px-media img:hover { transform: scale(1.04); opacity: 1; }
    .px-fallback-emoji {
      font-size: 90px;
      display: none;
      user-select: none;
    }
    .px-details {
      flex: 1 1 0;
      padding: 28px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
      min-height: 0;
    }
    .px-details::-webkit-scrollbar { width: 4px; }
    .px-details::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.25); border-radius: 4px; }
    .px-cat {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 4px;
      color: rgba(0,229,255,0.7);
      text-transform: uppercase;
    }
    .px-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(20px, 2.5vw, 30px);
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
      margin: 0;
    }
    .px-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .px-features li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13.5px;
      color: rgba(255,255,255,0.75);
      line-height: 1.5;
    }
    .px-features li::before {
      content: "▹";
      color: #00E5FF;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .px-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .px-tag {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 99px;
      border: 1px solid rgba(0,229,255,0.3);
      color: rgba(0,229,255,0.8);
      background: rgba(0,229,255,0.05);
    }
    /* Controls bar */
    .px-ctrls {
      flex: 0 0 auto;
      min-height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 20px 32px;
      border-radius: 20px;
      background: rgba(6,11,20,0.7);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .px-info { display: flex; flex-direction: column; gap: 4px; }
    .px-cat-label {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 4px;
      color: rgba(0,229,255,0.6);
      text-transform: uppercase;
    }
    .px-title-label {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(18px, 2.5vw, 28px);
      font-weight: 800;
      color: #fff;
    }
    .px-action { display: flex; gap: 16px; align-items: center; }
    .px-gh-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 14px;
      border: 1px solid rgba(0,229,255,0.5);
      background: rgba(0,229,255,0.06);
      color: #00E5FF;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    .px-gh-btn:hover {
      background: rgba(0,229,255,0.15);
      box-shadow: 0 0 20px rgba(0,229,255,0.2);
      transform: translateY(-2px);
    }
    .px-nav-box { display: flex; align-items: center; gap: 16px; }
    .px-nav-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: #fff;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      user-select: none;
    }
    .px-nav-btn:hover {
      border-color: rgba(0,229,255,0.5);
      background: rgba(0,229,255,0.1);
      color: #00E5FF;
    }
    .px-count-box {
      font-family: 'Space Grotesk', monospace;
      font-size: 20px;
      font-weight: 700;
      color: rgba(255,255,255,0.5);
      min-width: 60px;
      text-align: center;
    }
    .px-count-box span { color: #00E5FF; }

    /* === PROJECTS RESPONSIVE FIX === */
    @media (max-width: 1024px) {
      .px {
        height: auto !important;
        min-height: 90vh;
        padding: 20px 16px 100px 16px;
        gap: 12px;
      }
      .px-top {
        height: 380px;
        border-radius: 20px;
      }
      .px-card {
        width: 85vw !important;
        height: 360px !important;
        margin: 0 8px !important;
        flex-direction: column !important;
      }
      .px-media {
        flex: none !important;
        height: 180px !important;
        width: 100% !important;
        border-right: none !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
      }
      .px-details {
        flex: 1 !important;
        padding: 16px !important;
        overflow-y: auto !important;
      }
      .px-features li { font-size: 12px !important; }
      .px-ctrls {
        flex-direction: column !important;
        height: auto !important;
        min-height: unset !important;
        padding: 20px 16px !important;
        gap: 12px !important;
        border-radius: 16px !important;
      }
      .px-info { text-align: center !important; }
      .px-title-label { font-size: clamp(18px, 4vw, 26px) !important; }
      .px-action {
        width: 100% !important;
        justify-content: center !important;
      }
      .px-gh-btn {
        width: 100% !important;
        padding: 14px 20px !important;
        font-size: 12px !important;
        border-radius: 12px !important;
        justify-content: center !important;
      }
      .px-nav-box {
        width: 100% !important;
        justify-content: center !important;
        gap: 20px !important;
        flex-direction: row !important;
      }
      .px-count-box { font-size: 18px !important; }
      .px-nav-btn {
        width: 44px !important;
        height: 44px !important;
        font-size: 22px !important;
      }
    }
    @media (max-width: 768px) {
      .px {
        padding: 12px 12px 100px 12px !important;
        gap: 10px !important;
      }
      .px-top {
        height: 320px !important;
        border-radius: 16px !important;
      }
      .px-card {
        width: 92vw !important;
        height: 300px !important;
        margin: 0 4px !important;
        border-radius: 16px !important;
      }
      .px-media { height: 140px !important; }
      .px-fallback-emoji { font-size: 70px !important; }
      .px-details { padding: 12px !important; }
      .px-features li {
        font-size: 11px !important;
        gap: 6px !important;
      }
      .px-tag {
        font-size: 9px !important;
        padding: 3px 8px !important;
      }
      .px-ctrls {
        padding: 16px 12px !important;
        gap: 10px !important;
        border-radius: 14px !important;
      }
      .px-cat-label {
        font-size: 10px !important;
        letter-spacing: 3px !important;
      }
      .px-title-label { font-size: 18px !important; }
      .px-gh-btn {
        padding: 12px 16px !important;
        font-size: 11px !important;
        gap: 8px !important;
      }
      .px-nav-btn {
        width: 40px !important;
        height: 40px !important;
        font-size: 20px !important;
      }
      .px-count-box { font-size: 16px !important; }
    }
    @media (max-width: 480px) {
      .px-top { height: 280px !important; }
      .px-card {
        width: 95vw !important;
        height: 260px !important;
      }
      .px-media { height: 120px !important; }
      .px-title-label {
        font-size: 16px !important;
        line-height: 1.2 !important;
      }
    }
  </style>

  <div class="px" id="pxRoot">
    <!-- Top: card viewer -->
    <div class="px-top">
      <div class="px-track" id="pxTrack">
        <!-- Cards injected by JS -->
      </div>
    </div>

    <!-- Bottom: controls -->
    <div class="px-ctrls">
      <div class="px-info">
        <div class="px-cat-label" id="pxCtrlCat">AI & UTILITY</div>
        <div class="px-title-label" id="pxCtrlTitle">Spin AI — Decision Maker</div>
      </div>
      <div class="px-action">
        <a class="px-gh-btn" id="pxGhBtn" href="#" target="_blank">
          <span>🔗</span><span>View Project</span>
        </a>
      </div>
      <div class="px-nav-box">
        <div class="px-nav-btn" id="pxPrev">←</div>
        <div class="px-count-box"><span id="pxCur">1</span> / <span id="pxTotal">5</span></div>
        <div class="px-nav-btn" id="pxNext">→</div>
      </div>
    </div>
  </div>

  <script>
  (function(){
    const data = [
      {
        cat: 'AI & UTILITY',
        title: 'Spin AI — Decision Maker',
        features: [
          'AI-powered item generation via Groq Cloud',
          'Customizable wheel categories & topics',
          'Smooth CSS animations & confetti effects',
          'Mobile-optimized responsive design'
        ],
        tags: ['JavaScript', 'Groq Cloud', 'Vite', 'Tailwind'],
        gh: 'https://spin-ai-brown.vercel.app/',
        img: 'assets/images/p1.png',
        emoji: '🎡'
      },
      {
        cat: 'AI AUTOMATION',
        title: 'Faceless AI Video Studio',
        features: [
          'Automated script-to-video pipeline',
          'AWS Bedrock generative image integration',
          'Natural ElevenLabs AI voice synthesis',
          'Batch scene processing system'
        ],
        tags: ['Python', 'FFmpeg', 'AWS Bedrock', 'ElevenLabs'],
        gh: 'https://faceless-ai-studio-tau.vercel.app/',
        img: 'assets/images/p2.png',
        emoji: '🎬'
      },
      {
        cat: 'AI & NLP',
        title: 'AI Chatbot Studio',
        features: [
          'Advanced NLU with real-time streaming',
          'Context-aware persistent chat history',
          'Multi-model support (Groq / OpenAI)',
          'Responsive Dark Glass UI interface'
        ],
        tags: ['Python', 'FastAPI', 'React', 'AWS'],
        gh: 'https://github.com/coddies/AI-Chatbot',
        img: 'assets/images/p3.png',
        emoji: '🤖'
      },
      {
        cat: 'FULL STACK',
        title: 'Student Table CRUD',
        features: [
          'FastAPI Backend integration',
          'SQLAlchemy Database management',
          'RESTful API development',
          'Vanilla JS Frontend CRUD operations'
        ],
        tags: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
        gh: 'https://github.com/coddies/Student-Table',
        img: 'assets/images/p4.png',
        emoji: '📁'
      },
      {
        cat: 'FRONTEND DEVELOPMENT',
        title: 'Space Portfolio',
        features: [
          'Dynamic card-based section transitions',
          'Rocket loading animation with sky tear effect',
          'Interactive 3D isometric skills section',
          'Fully responsive with mobile navigation'
        ],
        tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub'],
        gh: 'https://github.com/coddies/My-Portfolio',
        img: 'assets/images/p5.png',
        emoji: '🚀'
      }
    ];

    let cur = 0;
    const track = document.getElementById('pxTrack');
    const ctrlCat = document.getElementById('pxCtrlCat');
    const ctrlTitle = document.getElementById('pxCtrlTitle');
    const ghBtn = document.getElementById('pxGhBtn');
    const curEl = document.getElementById('pxCur');
    const totalEl = document.getElementById('pxTotal');

    totalEl.textContent = data.length;

    // Build all cards
    data.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'px-card';
      card.style.display = i === 0 ? 'flex' : 'none';

      const featuresHTML = p.features.map(f => `<li>${f}</li>`).join('');
      const tagsHTML = p.tags.map(t => `<span class="px-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="px-media">
          <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
          <div class="px-fallback-emoji" style="display:none;align-items:center;justify-content:center;width:100%;height:100%;">${p.emoji}</div>
        </div>
        <div class="px-details">
          <div class="px-cat">${p.cat}</div>
          <h3 class="px-title">${p.title}</h3>
          <ul class="px-features">${featuresHTML}</ul>
          <div class="px-tags">${tagsHTML}</div>
        </div>
      `;
      track.appendChild(card);
    });

    function goTo(n) {
      const cards = track.querySelectorAll('.px-card');
      cards[cur].style.display = 'none';
      cur = (n + data.length) % data.length;
      cards[cur].style.display = 'flex';
      const p = data[cur];
      ctrlCat.textContent = p.cat;
      ctrlTitle.textContent = p.title;
      ghBtn.href = p.gh;
      curEl.textContent = cur + 1;
    }

    document.getElementById('pxPrev').addEventListener('click', () => goTo(cur - 1));
    document.getElementById('pxNext').addEventListener('click', () => goTo(cur + 1));

    // Init ctrl bar
    ghBtn.href = data[0].gh;
  })();
  </script>
  </div>
</section>
'''

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

START = '<!-- ════════════════════════════\n     CARD 4 — PROJECTS'
END   = '</section>\n\n<section id="card-5"'

s = html.find(START)
e = html.find(END, s)

if s == -1 or e == -1:
    print(f"ERROR: markers not found. s={s}, e={e}")
    exit(1)

# Replace from START up to (but not including) the END boundary
new_html = html[:s] + NEW_CARD4 + '\n\n<section id="card-5"' + html[e + len(END):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("SUCCESS: card-4 replaced with data-driven project carousel.")
