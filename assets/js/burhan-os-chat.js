/**
 * BURHAN_OS — Burhan's portfolio AI buddy
 * Live Groq when available, smart local fallback offline.
 */
(function () {
  'use strict';

  const API_URL = '/api/burhan-ai';
  const HEALTH_TIMEOUT_MS = 4000;

  const LINKS = {
    linkedin: 'https://www.linkedin.com/in/muhammad-burhan-73a81b27b/',
    github: 'https://github.com/coddies',
    email: 'mb6679605@gmail.com',
    portfolio: 'https://coddies.github.io/My-Portfolio/',
    faceless: 'https://faceless-ai-studio-tau.vercel.app/',
    flux: 'https://fluxai-two.vercel.app',
    tiktok: 'https://www.tiktok.com/@devmburhan',
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function linkify(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\n/g, '<br>')
      .replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener" style="color:#00E5FF;text-decoration:underline;">$1</a>'
      );
  }

  function normalizeQuery(q) {
    return q.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  function wantsLink(q) {
    return (
      q.includes('link') ||
      q.includes('url') ||
      q.includes('profile') ||
      q.includes('do ') ||
      q.includes('de do') ||
      q.includes('bhejo') ||
      q.includes('send')
    );
  }

  function localNeuralMatch(rawQuery) {
    const q = normalizeQuery(rawQuery);

    if (
      q === 'hey' ||
      q === 'hi' ||
      q === 'hello' ||
      q === 'helo' ||
      q === 'hii' ||
      q === 'salam' ||
      q === 'assalam' ||
      q === 'assalam o alaikum' ||
      q === 'aoa' ||
      q.startsWith('hey ') ||
      q.startsWith('hi ') ||
      q === 'how are you' ||
      q === 'whats up'
    ) {
      return `Hey! 👋 I'm here to tell you about Muhammad Burhan — his skills, projects, certs, and how to reach him. Just ask naturally, in English or Urdu — whatever's comfortable for you!`;
    }

    const isAboutQuery =
      q.includes('who') ||
      q.includes('about') ||
      q.includes('burhan') ||
      q.includes('intro') ||
      q.includes('batao') ||
      q.includes('bata') ||
      q.includes('kon hai') ||
      q.includes('kaun hai') ||
      q.includes('tell me more');

    const isLinkedInQuery =
      q.includes('linkedin') || q.includes('linkin') || q.includes('linked in');

    if (isAboutQuery) {
      let reply = `Muhammad Burhan is an AI & Data Science student at Saylani Mass IT (SMIT), based in Chiniot, Pakistan. He's really into system design, problem solving, Generative AI, Agentic AI, RAG systems, n8n automations, and vibe coding.\n\nHe builds real AI products — won the AWS Nova AI Hackathon with Faceless AI Studio. Currently open to work!`;

      if (wantsLink(q) || isLinkedInQuery) {
        reply += `\n\nLinkedIn: ${LINKS.linkedin}`;
      }
      return reply;
    }

    if (isLinkedInQuery || (q.includes('link') && !q.includes('github'))) {
      return `Sure! Here's Burhan's LinkedIn:\n${LINKS.linkedin}\n\nHe's open to work — feel free to connect!`;
    }

    if (q.includes('github') || q.includes('git hub')) {
      return `Here's his GitHub — lots of AI projects there:\n${LINKS.github}`;
    }

    if (q.includes('email') || q.includes('mail') || q.includes('contact') || q.includes('reach')) {
      return `You can reach Burhan here:\n\n📧 Email: ${LINKS.email}\n💼 LinkedIn: ${LINKS.linkedin}\n🐙 GitHub: ${LINKS.github}\n\nHe's open to work — drop him a message anytime!`;
    }

    if (
      q.includes('skill') ||
      q.includes('tech') ||
      q.includes('stack') ||
      q.includes('tools') ||
      q.includes('expert')
    ) {
      return `Burhan's main interests: system design, problem solving, Gen AI, Agentic AI, RAG systems, n8n, vibe coding, and AI tools.\n\nTech-wise he's strong in Python, FastAPI, LLMs, Groq API, AWS Bedrock, Amazon Nova AI, Prompt Engineering, React, Vite, Tailwind, Vercel, SQL/PostgreSQL, and Git/GitHub.`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('portfolio')) {
      return `His top projects:\n\n🏆 Faceless AI Studio — AWS Nova Hackathon winner. AI video pipeline with Bedrock & Nova.\n   → ${LINKS.faceless}\n\n🎡 Spin AI — Groq-powered wheel spinner (React + Vite)\n🤖 Flux AI Chatbot — ${LINKS.flux}\n⚡ FastAPI Full App — production backend with PostgreSQL\n\nAll on GitHub: ${LINKS.github}`;
    }

    if (q.includes('hackathon') || q.includes('winner') || q.includes('aws')) {
      return `Yeah! Burhan won the AWS Nova AI Hackathon with Faceless AI Studio 🏆\n\nIt's an automated AI video pipeline using AWS Bedrock and Amazon Nova AI.\nLive demo: ${LINKS.faceless}`;
    }

    if (q.includes('cert') || q.includes('course') || q.includes('google') || q.includes('coursera')) {
      return `His certifications include Google AI Professional Certificate, Google AI Essentials (Coursera), Azure AI Fundamentals, Python Essentials (Cisco), and more. He's also doing the AI & Data Science track at SMIT right now.`;
    }

    if (q.includes('hire') || q.includes('available') || q.includes('open to work') || q.includes('job')) {
      return `Yes — Burhan is open to work! Reach him at ${LINKS.email} or connect on LinkedIn: ${LINKS.linkedin}`;
    }

    return null;
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
            <div class="bos-welcome-sub">Ask me anything about Muhammad Burhan — skills, projects, certs, links. English or Urdu, both work.</div>
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

      if (role === 'user') {
        msg.innerHTML = linkify(text);
      } else {
        msg.innerHTML = linkify(text);
      }

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
        /* fall through to local */
      }

      if (!answered) {
        setOnlineStatus(false);
        const localReply = localNeuralMatch(text);

        if (localReply) {
          appendMessage('assistant', localReply);
        } else {
          appendMessage(
            'assistant',
            `I'm not sure about that one — but I can tell you about Burhan's skills, projects, certifications, or share his LinkedIn and contact info. Just ask!`
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
