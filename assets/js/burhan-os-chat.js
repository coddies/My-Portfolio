/**
 * BURHAN_OS — Burhan's portfolio AI buddy
 * The Groq LLM (via /api/burhan-ai) is the brain. When the API can't be
 * reached we show a short, neutral "try again" line — never a fake canned
 * answer, and never a hardcoded keyword match.
 */
(function () {
  'use strict';

  // Served from Vercel the API is same-origin (/api/burhan-ai). If the site is
  // hosted somewhere without the serverless function (e.g. GitHub Pages), set
  // window.BURHAN_OS_API_URL to the full Vercel endpoint before this script
  // loads so the chatbot can still reach its brain.
  const API_URL =
    (typeof window !== 'undefined' && window.BURHAN_OS_API_URL) || '/api/burhan-ai';
  const HEALTH_TIMEOUT_MS = 4000;

  /* ── Local Neural Cache ─────────────────────────────────────────────────────
     Handles queries when the Groq API is not reachable (local file:// dev,
     GitHub Pages, or no GROQ_API_KEY yet).  Live API always takes priority.
  ──────────────────────────────────────────────────────────────────────────── */
  // Every link that appears anywhere on the portfolio, in one place.
  const LINKS = {
    linkedin: 'https://www.linkedin.com/in/muhammad-burhan-73a81b27b/',
    github: 'https://github.com/coddies',
    email: 'mb6679605@gmail.com',
    portfolio: 'https://coddies.github.io/My-Portfolio/',
    tiktok: 'https://www.tiktok.com/@devmburhan',
    instagram: 'https://www.instagram.com/reel/DYj58UtEyIz/',
    faceless: 'https://faceless-ai-studio-tau.vercel.app/',
    spin: 'https://spinwheelai.online/',
    flux: 'https://fluxai-two.vercel.app',
    fastapi: 'https://github.com/coddies/FastAPI-fullapp',
  };

  // Collapse repeated letters and strip spaces/punctuation so misspellings
  // like "githab", "gihub", "git hub", "gtihub", "linkin", "linked in" all
  // fold toward the same token. This is a best-effort OFFLINE net only — the
  // Groq LLM is the real brain and handles typos on its own when reachable.
  function fuzzyNormalize(q) {
    return q
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // True if the query contains any of `variants`, comparing both the raw
  // normalized text AND a space-stripped form (so "git hub" matches "github").
  function matchesAny(norm, variants) {
    const squished = norm.replace(/\s+/g, '');
    return variants.some((v) => {
      const vv = v.replace(/\s+/g, '');
      return norm.includes(v) || squished.includes(vv);
    });
  }

  function localNeuralCache(query) {
    const q = fuzzyNormalize(query);

    // Greetings / general openers
    const greetings = ['hey','hi','hello','helo','hii','salam','assalam','yo','sup',
      'how are you','whats up','good morning','good afternoon','good evening',
      'kia hal','kya haal','kese ho','kaisa ho','namaste'];
    if (greetings.some(g => q === g || q.startsWith(g + ' '))) {
      return `Hey! 👋 I'm BURHAN_OS — Burhan's personal AI.\n\nAsk me about his skills, projects, certifications, or how to reach him. I'm here to help!`;
    }

    // ── Direct link requests — check the SPECIFIC platforms first, GitHub
    //    before LinkedIn, so a misspelling never falls through to the wrong one.
    if (matchesAny(q, ['github','githab','gihub','gitub','gthub','gtihub','git hub','hithub','repo','repository','open source'])) {
      return `Here's Burhan's GitHub — lots of AI projects there:\n${LINKS.github}`;
    }
    if (matchesAny(q, ['linkedin','linkedn','linkdin','linkin','linked in','likedin','lnkedin'])) {
      return `Here's Burhan's LinkedIn:\n${LINKS.linkedin}\n\nHe's open to work — feel free to connect!`;
    }
    if (matchesAny(q, ['tiktok','tik tok','tictok'])) {
      return `Here's Burhan's TikTok:\n${LINKS.tiktok}`;
    }
    if (matchesAny(q, ['instagram','insta','instgram','ig'])) {
      return `Here's Burhan's Instagram:\n${LINKS.instagram}`;
    }
    if (matchesAny(q, ['portfolio','website','web site','site'])) {
      return `Here's Burhan's portfolio:\n${LINKS.portfolio}`;
    }
    if (matchesAny(q, ['faceless'])) {
      return `Faceless AI Studio — 🏆 AWS Nova Hackathon winner. Automated AI video pipeline (AWS Bedrock & Amazon Nova):\n${LINKS.faceless}`;
    }
    if (matchesAny(q, ['spin','wheel','spinwheel','spin ai'])) {
      return `Spin AI — an AI-powered wheel spinner (React + Vite + Groq API):\n${LINKS.spin}`;
    }
    if (matchesAny(q, ['flux','chatbot'])) {
      return `Flux AI Chatbot — a conversational AI with a premium dark UI:\n${LINKS.flux}`;
    }

    // Contact / email / hire
    if (matchesAny(q, ['contact','email','e mail','mail','gmail','reach','kaise milein','kaise contact','rabta'])) {
      return `How to reach Burhan:\n\n📧 Email: ${LINKS.email}\n💼 LinkedIn: ${LINKS.linkedin}\n🐙 GitHub: ${LINKS.github}\n\nHe's open to work — drop him a message anytime!`;
    }

    // About / bio
    if (matchesAny(q, ['who','about','bio','burhan','intro','tell me','batao','batayen','uske bare','himself','kaun','kon'])) {
      return `Muhammad Burhan is an AI & Data Science student at Saylani Mass IT Training (SMIT), Chiniot, Pakistan.\n\nHe builds Gen AI pipelines, Agentic AI systems, and RAG applications. Won the AWS Nova AI Hackathon. Open to work & collaborations.\n\nLinkedIn: ${LINKS.linkedin}`;
    }

    // Skills
    if (matchesAny(q, ['skill','tech','stack','python','tools','expert','kya janta','kia aata','abilities'])) {
      return `Burhan's core interests: system design, Gen AI, Agentic AI, RAG systems, n8n, vibe coding.\n\nTech stack:\n• Languages: Python, JavaScript, HTML5, CSS3, SQL\n• AI/ML: LLMs, Groq API, AWS Bedrock, Amazon Nova AI, Prompt Engineering, Machine Learning, NLP, Data Analysis\n• Frontend: React, Vite, Tailwind CSS\n• Backend: FastAPI, PostgreSQL\n• Tools: Git, GitHub, Vercel, AWS Cloud\n• Other: Video Editing, Content Creation`;
    }

    // Projects
    if (matchesAny(q, ['project','work','build','bana','app','apps','kia banaya'])) {
      return `Top projects:\n\n🏆 Faceless AI Studio — AWS Nova Hackathon Winner! Automated AI video pipeline using AWS Bedrock & Nova.\n${LINKS.faceless}\n\n🎡 Spin AI — AI-powered wheel spinner (React + Groq API)\n${LINKS.spin}\n\n🤖 Flux AI Chatbot — Conversational AI with glassmorphic UI\n${LINKS.flux}\n\nAll projects: ${LINKS.github}`;
    }

    // Hackathon / AWS
    if (matchesAny(q, ['hackathon','winner','aws','nova','award','jeeta','jeet'])) {
      return `🏆 Yes! Burhan won the AWS Nova AI Hackathon with "Faceless AI Studio".\n\nIt's a fully automated AI video pipeline — scripts, thumbnails, voiceovers — all generated using AWS Bedrock & Amazon Nova AI.\n\nLive: ${LINKS.faceless}`;
    }

    // Certifications
    if (matchesAny(q, ['cert','course','google','coursera','cisco','degree','diploma','qualification','taleem'])) {
      return `Verified Certifications:\n🎓 Google AI Professional Certificate — Coursera\n✨ Google AI Essentials — Coursera\n🤖 Microsoft Azure AI Fundamentals — Microsoft Learn\n🐍 Python Essentials 1 — Cisco Networking Academy\n💻 Python Crash Basics — Mind Luster\n📈 Digital Marketing — DigiSkills\n🛒 E-Commerce Management — DigiSkills\n🧠 AI & Data Science Track — SMIT (In Progress)`;
    }

    // Location
    if (matchesAny(q, ['where','location','city','country','reh','kahan','address'])) {
      return `Burhan is based in Chiniot, Pakistan.`;
    }

    // Availability / job
    if (matchesAny(q, ['available','job','hire','open to work','freelance','internship','kaam','naukri'])) {
      return `Yes! Burhan is currently Open to Work.\n\nBest way to reach him:\n📧 ${LINKS.email}\n💼 ${LINKS.linkedin}`;
    }

    // No match
    return null;
  }


  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function linkify(text) {
    return escapeHtml(text)
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s<]+)/g, function (match) {
        // Keep the anchor to a clean full URL — don't swallow trailing
        // punctuation (e.g. a sentence-ending "." or a closing ")") into it.
        const trailing = match.match(/[.,;:!?)\]]+$/);
        const url = trailing ? match.slice(0, -trailing[0].length) : match;
        const tail = trailing ? trailing[0] : '';
        return (
          '<a href="' +
          url +
          '" target="_blank" rel="noopener" ' +
          'style="color:#00E5FF;text-decoration:underline;">' +
          url +
          '</a>' +
          tail
        );
      });
  }

  async function checkHealth() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    try {
      const res = await fetch(API_URL, { method: 'GET', signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) return false;
      const data = await res.json();
      return data.online === true;
    } catch {
      clearTimeout(timer);
      return false;
    }
  }

  function buildWidget(root) {
    root.innerHTML = `
      <button class="bos-fab" id="bosFab" aria-label="Chat about Burhan's portfolio" title="BURHAN_OS — Ask me about Burhan">
        <span class="bos-fab-icon">&gt;_</span>
        <span class="bos-fab-label">
          <span class="bos-fab-name">BURHAN_OS</span>
          <span class="bos-fab-sub">Personal Agent</span>
        </span>
      </button>
      <div class="bos-window" id="bosWindow" role="dialog" aria-label="Portfolio chat">
        <div class="bos-header">
          <div>
            <div class="bos-header-title">Ask about Burhan</div>
            <div class="bos-header-status standby" id="bosStatus">
              <span class="bos-status-dot standby" id="bosStatusDot"></span>
              <span id="bosStatusText">Connecting...</span>
            </div>
          </div>
          <button class="bos-close" id="bosClose" aria-label="Close chat">✕</button>
        </div>
        <div class="bos-messages" id="bosMessages">
          <div class="bos-empty" id="bosEmpty">
            <div class="bos-welcome-title">Hey! 👋</div>
            <div class="bos-welcome-sub">Ask me anything about Muhammad Burhan — his skills, projects, certifications, and how to reach him.</div>
            <div class="bos-chips">
              <button class="bos-chip" data-q="Tell me about Muhammad Burhan">About Burhan</button>
              <button class="bos-chip" data-q="What are his skills?">Skills</button>
              <button class="bos-chip" data-q="Show his projects">Projects</button>
              <button class="bos-chip" data-q="LinkedIn link do">LinkedIn</button>
              <button class="bos-chip" data-q="How to contact him?">Contact</button>
            </div>
          </div>
        </div>
        <div class="bos-typing" id="bosTyping">
          <span class="bos-typing-dots"><span></span><span></span><span></span></span>
        </div>
        <div class="bos-input-area">
          <input class="bos-input" id="bosInput" type="text" placeholder="Ask anything..." autocomplete="off" maxlength="1000" />
          <button class="bos-send" id="bosSend" aria-label="Send">➤</button>
        </div>
      </div>
    `;

    const fab = root.querySelector('#bosFab');
    const windowEl = root.querySelector('#bosWindow');
    const closeBtn = root.querySelector('#bosClose');
    const messages = root.querySelector('#bosMessages');
    const typing = root.querySelector('#bosTyping');
    const input = root.querySelector('#bosInput');
    const sendBtn = root.querySelector('#bosSend');
    const statusEl = root.querySelector('#bosStatus');
    const statusDot = root.querySelector('#bosStatusDot');
    const statusText = root.querySelector('#bosStatusText');

    let isOpen = false;
    let isLoading = false;
    const chatHistory = [];

    function setOnlineStatus(online) {
      if (online) {
        statusEl.classList.remove('standby');
        statusDot.classList.remove('standby');
        statusText.textContent = 'Online';
      } else {
        statusEl.classList.add('standby');
        statusDot.classList.add('standby');
        statusText.textContent = 'Offline mode';
      }
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function appendMessage(role, text) {
      const empty = root.querySelector('#bosEmpty');
      if (empty) empty.remove();

      const msg = document.createElement('div');
      msg.className = `bos-msg bos-msg-${role === 'user' ? 'user' : 'ai'}`;
      msg.innerHTML = linkify(text);

      messages.appendChild(msg);
      scrollToBottom();

      chatHistory.push({ role, content: text });
      if (chatHistory.length > 16) chatHistory.splice(0, chatHistory.length - 16);
    }

    function setTyping(show) {
      typing.classList.toggle('visible', show);
      if (show) scrollToBottom();
    }

    const FAB_OPEN_HTML = `<span class="bos-fab-icon">✕</span>`;
    const FAB_CLOSED_HTML = `
      <span class="bos-fab-icon">&gt;_</span>
      <span class="bos-fab-label">
        <span class="bos-fab-name">BURHAN_OS</span>
        <span class="bos-fab-sub">Personal Agent</span>
      </span>
    `;

    function toggleChat(open) {
      isOpen = open;
      windowEl.classList.toggle('active', open);
      fab.classList.toggle('open', open);
      fab.innerHTML = open ? FAB_OPEN_HTML : FAB_CLOSED_HTML;
      if (open) setTimeout(() => input.focus(), 250);
    }

    fab.addEventListener('click', () => toggleChat(!isOpen));
    closeBtn.addEventListener('click', () => toggleChat(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggleChat(false);
    });

    root.addEventListener('click', (e) => {
      const chip = e.target.closest('.bos-chip');
      if (chip && chip.dataset.q) {
        input.value = chip.dataset.q;
        sendMessage();
      }
    });

    async function sendMessage() {
      const text = input.value.trim();
      if (!text || isLoading) return;

      input.value = '';
      appendMessage('user', text);
      isLoading = true;
      sendBtn.disabled = true;
      setTyping(true);

      let answered = false;

      try {
        const historyForApi = chatHistory
          .slice(0, -1)
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .slice(-6)
          .map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          }));

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: historyForApi }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply) {
            appendMessage('assistant', data.reply);
            answered = true;
            setOnlineStatus(true);
          }
        }
      } catch {
        /* network error — fall through to the neutral offline notice below */
      }

      if (!answered) {
        setOnlineStatus(false);
        // Try local cache first — works on file:// or when API key is missing
        const localReply = localNeuralCache(text);
        if (localReply) {
          appendMessage('assistant', localReply);
        } else {
          appendMessage(
            'assistant',
            `I can answer questions about Muhammad Burhan — his skills, projects, certifications, and how to reach him.\n\nTry asking:\n• "Tell me about Burhan"\n• "What are his skills?"\n• "Show his projects"\n• "How to contact him?"`
          );
        }
      }

      isLoading = false;
      sendBtn.disabled = false;
      setTyping(false);
      input.focus();
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    checkHealth().then(setOnlineStatus);
  }

  function init() {
    let root = document.getElementById('burhan-os-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'burhan-os-root';
      document.body.appendChild(root);
    }
    buildWidget(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
