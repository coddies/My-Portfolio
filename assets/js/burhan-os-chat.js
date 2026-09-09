/**
 * BURHAN_OS // NEURAL_LINK
 * Floating AI chat widget — only visible when API health check passes.
 */
(function () {
  'use strict';

  const API_URL = '/api/burhan-ai';
  const HEALTH_TIMEOUT_MS = 8000;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatText(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
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
      <button class="bos-fab" id="bosFab" aria-label="Open BURHAN_OS Neural Link">&gt;_</button>
      <div class="bos-window" id="bosWindow" role="dialog" aria-label="BURHAN_OS Chat">
        <div class="bos-header">
          <div>
            <div class="bos-header-title">BURHAN_OS // NEURAL_LINK</div>
            <div class="bos-header-status">
              <span class="bos-status-dot"></span>
              SYSTEM ONLINE
            </div>
          </div>
          <button class="bos-close" id="bosClose" aria-label="Close chat">✕</button>
        </div>
        <div class="bos-messages" id="bosMessages">
          <div class="bos-empty" id="bosEmpty">
            Awaiting input<span class="bos-cursor">█</span><br><br>
            <span style="font-size:11px;opacity:0.7;">Type a query about the portfolio.</span>
          </div>
        </div>
        <div class="bos-typing" id="bosTyping">
          &gt; Processing<span class="bos-typing-cursor">█</span>
        </div>
        <div class="bos-input-area">
          <input
            class="bos-input"
            id="bosInput"
            type="text"
            placeholder="Enter command..."
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
    const empty = root.querySelector('#bosEmpty');
    const typing = root.querySelector('#bosTyping');
    const input = root.querySelector('#bosInput');
    const sendBtn = root.querySelector('#bosSend');

    let isOpen = false;
    let isLoading = false;

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function appendMessage(role, text) {
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
      if (open) setTimeout(() => input.focus(), 300);
    }

    fab.addEventListener('click', () => toggleChat(!isOpen));
    closeBtn.addEventListener('click', () => toggleChat(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggleChat(false);
    });

    async function sendMessage() {
      const text = input.value.trim();
      if (!text || isLoading) return;

      input.value = '';
      appendMessage('user', text);
      isLoading = true;
      sendBtn.disabled = true;
      setTyping(true);

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });

        const data = await res.json();

        if (!res.ok) {
          appendMessage('ai', data.error || 'Neural link error. Retry later.');
        } else {
          appendMessage('ai', data.reply);
        }
      } catch {
        appendMessage('ai', 'Connection lost. Neural link unreachable.');
      } finally {
        isLoading = false;
        sendBtn.disabled = false;
        setTyping(false);
        input.focus();
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  async function init() {
    const root = document.createElement('div');
    root.id = 'burhan-os-root';
    root.className = 'hidden';
    document.body.appendChild(root);

    const online = await checkHealth();
    if (!online) {
      root.remove();
      return;
    }

    root.classList.remove('hidden');
    buildWidget(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
