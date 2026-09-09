/**
 * BURHAN_OS // NEURAL_LINK
 * Interactive AI Assistant for Muhammad Burhan's Portfolio.
 * Always active with smart dual-mode: Live Groq LLM when configured,
 * and robust Local Neural Cache for instant offline/standby responses.
 */
(function () {
  'use strict';

  const API_URL = '/api/burhan-ai';
  const HEALTH_TIMEOUT_MS = 4000;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatText(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
  }

  // Local Neural Cache based on data/burhan-data.md
  function localNeuralMatch(query) {
    const q = query.toLowerCase().trim();

    if (q.includes('who') || q.includes('about') || q.includes('bio') || q.includes('burhan') || q.includes('intro') || q.includes('name')) {
      return `Muhammad Burhan is an AI & Data Science student at Saylani Mass IT Training (SMIT) based in Chiniot, Pakistan.

Specializing in Generative AI, Machine Learning, and NLP, he builds intelligent pipelines and autonomous AI solutions with a focus on clean architecture and practical problem solving.

Status: Open to Work & Collaborations.`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('tool') || q.includes('language')) {
      return `Core Technical Capabilities:
• Programming: Python (Scripting, ML pipelines), FastAPI, SQL (PostgreSQL/Neon), JavaScript, HTML5/CSS3
• AI & Machine Learning: LLMs, Groq API, Generative AI, AWS Bedrock, Amazon Nova AI, Prompt Engineering, Vibe Coding
• Cloud & Frontend: React, Vite, Tailwind CSS, Vercel, AWS Cloud, Git & GitHub`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build')) {
      return `Featured Portfolio Projects:
1. 🏆 Faceless AI Studio — AWS Nova AI Hackathon Winner! Automated pipeline producing AI scripts, thumbnails, and neural voiceovers using AWS Bedrock & Nova.
2. Spin AI — AI-powered decision spinner built with React & Groq API.
3. Flux AI Chatbot — Conversational AI assistant with a futuristic glassmorphic UI.`;
    }

    if (q.includes('hackathon') || q.includes('award') || q.includes('win') || q.includes('aws nova')) {
      return `🏆 AWS Nova AI Hackathon Winner!
Muhammad Burhan achieved 1st place with "Faceless AI Studio" — an automated video generation pipeline leveraging AWS Bedrock and frontier Amazon Nova AI models.`;
    }

    if (q.includes('cert') || q.includes('course') || q.includes('google') || q.includes('coursera') || q.includes('cisco') || q.includes('degree')) {
      return `Verified Certifications:
• 🎓 Google AI Professional Certificate — Google via Coursera
• ✨ Google AI Essentials — Google via Coursera
• 🤖 Microsoft Azure AI Fundamentals — Microsoft Learn
• 🐍 Python Essentials 1 — Cisco Networking Academy
• 💻 Python Crash Basics — Mind Luster
• 📈 Digital Marketing — DigiSkills
• 🛒 E-Commerce Management — DigiSkills
• 🧠 AI & Data Science Track — SMIT (In Progress)`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
      return `Direct Neural Communication Channels:
• Email: mb6679605@gmail.com
• LinkedIn: linkedin.com/in/muhammad-burhan-73a81b27b/
• GitHub: github.com/coddies

Feel free to send an inquiry or collaboration proposal!`;
    }

    return null;
  }

  async function checkHealth() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        signal: controller.signal,
      });
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
      <button class="bos-fab" id="bosFab" aria-label="Open BURHAN_OS Neural Link" title="BURHAN_OS Neural Link">&gt;_</button>
      <div class="bos-window" id="bosWindow" role="dialog" aria-label="BURHAN_OS Chat">
        <div class="bos-header">
          <div>
            <div class="bos-header-title">BURHAN_OS // NEURAL_LINK</div>
            <div class="bos-header-status standby" id="bosStatus">
              <span class="bos-status-dot standby" id="bosStatusDot"></span>
              <span id="bosStatusText">CONNECTING...</span>
            </div>
          </div>
          <button class="bos-close" id="bosClose" aria-label="Close chat">✕</button>
        </div>
        <div class="bos-messages" id="bosMessages">
          <div class="bos-empty" id="bosEmpty">
            <div style="font-weight: 700; color: var(--bos-cyan); margin-bottom: 6px; letter-spacing: 1px;">&gt; BURHAN_OS v2.4 ONLINE</div>
            <div style="font-size: 11px; opacity: 0.8; margin-bottom: 12px;">Query any portfolio records below:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;">
              <button class="bos-chip" data-q="Tell me about Muhammad Burhan">👤 About</button>
              <button class="bos-chip" data-q="What are your core skills?">🛠️ Skills</button>
              <button class="bos-chip" data-q="Show me your top projects">💼 Projects</button>
              <button class="bos-chip" data-q="What certifications do you have?">🎓 Certificates</button>
              <button class="bos-chip" data-q="How can I contact Muhammad Burhan?">✉️ Contact</button>
            </div>
          </div>
        </div>
        <div class="bos-typing" id="bosTyping">
          &gt; Processing neural nodes<span class="bos-typing-cursor">█</span>
        </div>
        <div class="bos-input-area">
          <input
            class="bos-input"
            id="bosInput"
            type="text"
            placeholder="Type a question (e.g. skills, projects)..."
            autocomplete="off"
            maxlength="1000"
          />
          <button class="bos-send" id="bosSend" aria-label="Send message">➤</button>
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
    let isLiveOnline = false;

    function setOnlineStatus(online) {
      isLiveOnline = online;
      if (online) {
        statusEl.classList.remove('standby');
        statusDot.classList.remove('standby');
        statusText.textContent = 'NEURAL LINK ONLINE';
      } else {
        statusEl.classList.add('standby');
        statusDot.classList.add('standby');
        statusText.textContent = 'LOCAL STANDBY';
      }
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function appendMessage(role, text) {
      const empty = root.querySelector('#bosEmpty');
      if (empty) empty.remove();

      const msg = document.createElement('div');
      msg.className = `bos-msg bos-msg-${role}`;

      const prefix = role === 'ai' ? '&gt; SYSTEM: ' : '&gt; USER: ';
      msg.innerHTML = `<span class="bos-prefix">${prefix}</span>${formatText(text)}`;

      messages.appendChild(msg);
      scrollToBottom();
    }

    function setTyping(show) {
      typing.classList.toggle('visible', show);
      if (show) scrollToBottom();
    }

    function toggleChat(open) {
      isOpen = open;
      windowEl.classList.toggle('active', open);
      fab.classList.toggle('open', open);
      fab.innerHTML = open ? '✕' : '&gt;_';
      if (open) setTimeout(() => input.focus(), 250);
    }

    fab.addEventListener('click', () => toggleChat(!isOpen));
    closeBtn.addEventListener('click', () => toggleChat(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggleChat(false);
    });

    // Quick chip buttons
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

      // Try live serverless API first
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply) {
            appendMessage('ai', data.reply);
            answered = true;
            setOnlineStatus(true);
          }
        }
      } catch {
        // Network / offline
      }

      // If live API unavailable, use intelligent Local Neural Cache
      if (!answered) {
        setOnlineStatus(false);
        const localReply = localNeuralMatch(text);

        if (localReply) {
          appendMessage(
            'ai',
            `${localReply}\n\n[Node: Local Neural Cache. Configure GROQ_API_KEY on Vercel for dynamic frontier LLM reasoning.]`
          );
        } else {
          appendMessage(
            'ai',
            `Error 404: Data not found in local neural cache for this query.\n\nNote: Live AI generation is awaiting GROQ_API_KEY configuration in Vercel Environment Variables.`
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

    // Check health asynchronously
    checkHealth().then((online) => {
      setOnlineStatus(online);
    });
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
