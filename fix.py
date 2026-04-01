import re

with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

# We need to extract:
# Card 1-4 (From start of file to CARD 5)
card1_4 = text.split("<!-- ════════════════════════════\n     CARD 5 — HACKATHON")[0]

rest = text.split("<!-- ════════════════════════════\n     CARD 5 — HACKATHON")[1]
# extract swipe hint block (end of the file)
swipe_hint = "<!-- Swipe Hint -->\n" + rest.split("<!-- Swipe Hint -->\n")[1]

# Reconstruct cards
content = card1_4 + """<!-- ════════════════════════════
     CARD 5 — ACHIEVEMENTS (Hackathon merged with Certs)
════════════════════════════ -->
<section id="card-5" class="card state-below">
    <div class="card-inner">
        <div style="width:100%;max-width:780px;">

            <div class="section-header" style="text-align:left;">
                <span class="tagline" style="color:var(--pink);">MY CREDENTIALS</span>
                <h2 class="section-title">Achievements</h2>
                <div class="accent-line" style="background:linear-gradient(90deg,var(--purple),var(--pink));margin-left:0;"></div>
            </div>

            <!-- ── HACKATHON: Featured Achievement Banner ── -->
            <div class="hack-achievement-banner anim-in" data-link="https://devpost.com/software/faceless-ai-studio">
                <div class="hack-banner-glow"></div>
                <div class="hack-banner-left">
                    <div class="hack-banner-icon">
                        <span>AWS</span>
                    </div>
                </div>
                <div class="hack-banner-body">
                    <div class="hack-banner-label">🏆 FEATURED ACHIEVEMENT · 2025</div>
                    <h3 class="hack-banner-title">AWS Nova AI Hackathon</h3>
                    <p class="hack-banner-desc">Participated in the AWS Nova AI Hackathon — built real AI solutions alongside industry experts, pushing the frontier of intelligent systems.</p>
                    <div class="hack-banner-pills">
                        <span class="hack-pill">AI / ML</span>
                        <span class="hack-pill">Applied</span>
                        <span class="hack-pill hack-pill-glow">View Project →</span>
                    </div>
                </div>
                <div class="hack-banner-stat">
                    <span class="hack-stat-value">2025</span>
                    <span class="hack-stat-label">Edition</span>
                </div>
            </div>

            <!-- ── CERTIFICATIONS TIMELINE ── -->
            <div class="certs-subheading" style="font-family:'Syne',sans-serif;font-size:24px;margin-bottom:24px;margin-top:40px;">📜 Certifications</div>
            <div class="certs-container">
                <div class="timeline-line"></div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card">
                        <div class="cert-icon">🧠</div>
                        <div class="cert-info">
                            <span class="cert-title">AI & Data Science Track</span>
                            <span class="cert-issuer">Saylani Mass IT Institute</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05);">
                            <span style="font-size:30px;">⏳</span>
                        </div>
                        <span class="status-badge status-inprogress">In Progress</span>
                    </div>
                </div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card" data-link="https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/?wt.mc_id=studentamb_509266">
                        <div class="cert-icon">🤖</div>
                        <div class="cert-info">
                            <span class="cert-title">Azure AI Fundamentals</span>
                            <span class="cert-issuer">Microsoft Learn</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05);">
                            <span style="font-size:30px;">🧠</span>
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                </div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card" data-img="assets/certificates/python-crash-cert.jpg">
                        <div class="cert-icon">🐍</div>
                        <div class="cert-info">
                            <span class="cert-title">Python Crash Basics</span>
                            <span class="cert-issuer">Mind Luster</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px;">
                            <img src="assets/certificates/python-crash-cert.jpg" alt="Python Crash Basics" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                </div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card" data-img="assets/certificates/python-essentials-cert.jpg">
                        <div class="cert-icon">🐍</div>
                        <div class="cert-info">
                            <span class="cert-title">Python Essentials 1</span>
                            <span class="cert-issuer">Cisco Networking Academy</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px;">
                            <img src="assets/certificates/python-essentials-cert.jpg" alt="Python Cert" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                </div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card" data-img="assets/certificates/digital-marketing-cert.jpg">
                        <div class="cert-icon">📈</div>
                        <div class="cert-info">
                            <span class="cert-title">Digital Marketing</span>
                            <span class="cert-issuer">DigiSkills Training Program</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px;">
                            <img src="assets/certificates/digital-marketing-cert.jpg" alt="Digital Marketing Cert" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                </div>

                <div class="cert-item">
                    <div class="timeline-dot"></div>
                    <div class="cert-card" data-img="assets/certificates/ecommerce-cert.jpg">
                        <div class="cert-icon">🛒</div>
                        <div class="cert-info">
                            <span class="cert-title">E-Commerce Management</span>
                            <span class="cert-issuer">DigiSkills Training Program</span>
                        </div>
                        <div class="cert-preview-img" style="width: 80px; height: 60px; overflow: hidden; border-radius: 8px;">
                            <img src="assets/certificates/ecommerce-cert.jpg" alt="E-Commerce Cert" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <span class="status-badge status-completed">Completed</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- ════════════════════════════
     CARD 6 — CASE STUDIES
════════════════════════════ -->
<section id="card-6" class="card state-below">
    <div class="card-inner">
        <div style="width:100%;max-width:1100px;">
            <div class="section-header">
                <span class="tagline" style="color:var(--cyan);">DEEP DIVES</span>
                <h2 class="section-title">Case Studies</h2>
                <div class="accent-line"></div>
            </div>
            <div class="cs-grid">

                <div class="cs-card anim-in" data-cs="0">
                    <div class="cs-card-img cs-img-1">
                        <span class="cs-card-tag">AI / NLP</span>
                    </div>
                    <div class="cs-card-body">
                        <h3 class="cs-card-title">AI-Powered Customer Support Bot</h3>
                        <p class="cs-card-summary">A business drowning in 10,000+ daily tickets needed relief. Built an NLP chatbot that autonomously resolved 70% of queries instantly.</p>
                        <div class="cs-card-footer">
                            <div class="cs-tags"><span class="cs-tag">Python</span><span class="cs-tag">LangChain</span><span class="cs-tag">GPT-4</span></div>
                            <button class="cs-read-btn" data-cs="0">Read More →</button>
                        </div>
                    </div>
                </div>

                <div class="cs-card anim-in" data-cs="1">
                    <div class="cs-card-img cs-img-2">
                        <span class="cs-card-tag">Data Analytics</span>
                    </div>
                    <div class="cs-card-body">
                        <h3 class="cs-card-title">Real-Time Business Intelligence Dashboard</h3>
                        <p class="cs-card-summary">A retail chain had data locked in siloed spreadsheets. Designed a live Pandas + Plotly dashboard to unify all KPIs in real time.</p>
                        <div class="cs-card-footer">
                            <div class="cs-tags"><span class="cs-tag">Pandas</span><span class="cs-tag">Plotly</span><span class="cs-tag">SQL</span></div>
                            <button class="cs-read-btn" data-cs="1">Read More →</button>
                        </div>
                    </div>
                </div>

                <div class="cs-card anim-in" data-cs="2">
                    <div class="cs-card-img cs-img-3">
                        <span class="cs-card-tag">AI Automation</span>
                    </div>
                    <div class="cs-card-body">
                        <h3 class="cs-card-title">Faceless AI Video Studio Pipeline</h3>
                        <p class="cs-card-summary">Content creators spent 20+ hours per video. Built a fully automated pipeline — from script to final export with zero manual effort.</p>
                        <div class="cs-card-footer">
                            <div class="cs-tags"><span class="cs-tag">Python</span><span class="cs-tag">FFmpeg</span><span class="cs-tag">ElevenLabs</span></div>
                            <button class="cs-read-btn" data-cs="2">Read More →</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- ════════════════════════════
     CARD 7 — CONTACT
════════════════════════════ -->
<section id="card-7" class="card state-below">
    <div class="card-inner">
        <div class="contact-panel">
            <h2 class="syne-font" style="font-size:42px;">Let's Connect</h2>
            <div class="accent-line" style="margin:12px auto 0 auto;"></div>
            <p class="contact-subtitle">Open to collaboration, projects & opportunities</p>
            <div class="contact-list">

                <a href="https://github.com/coddies" target="_blank" class="contact-link-card link-github">
                    <span class="contact-emoji">🐙</span>
                    <div class="contact-label-group">
                        <span class="contact-main-label">GitHub</span>
                        <span class="contact-sub-label">github.com/coddies</span>
                    </div>
                    <span class="contact-arrow">→</span>
                </a>

                <a href="https://www.linkedin.com/in/muhammad-burhan-73a81b27b/" target="_blank" class="contact-link-card link-linkedin">
                    <span class="contact-emoji">💼</span>
                    <div class="contact-label-group">
                        <span class="contact-main-label">LinkedIn</span>
                        <span class="contact-sub-label">muhammad-burhan-73a81b27b</span>
                    </div>
                    <span class="contact-arrow">→</span>
                </a>

                <a href="mailto:mb6679605@gmail.com" class="contact-link-card link-email">
                    <span class="contact-emoji">📧</span>
                    <div class="contact-label-group">
                        <span class="contact-main-label">Email</span>
                        <span class="contact-sub-label">mb6679605@gmail.com</span>
                    </div>
                    <span class="contact-arrow">→</span>
                </a>

            </div>
        </div>
    </div>
</section>

<!-- Cert Modal -->
<div class="cert-modal" id="certModal">
    <div class="modal-content">
        <div class="modal-close" id="modalClose">&times;</div>
        <img src="" alt="Certificate" id="modalImg">
    </div>
</div>

<!-- Case Study Detail Modal -->
<div id="csModal" class="cs-modal">
    <div class="cs-modal-panel">
        <button class="cs-modal-close" id="csModalClose">✕</button>
        <div class="cs-modal-hero" id="csModalHero">
            <span class="cs-modal-category" id="csModalCategory"></span>
            <h2 class="cs-modal-title" id="csModalTitle"></h2>
        </div>
        <div class="cs-modal-body">
            <div class="cs-detail-grid">
                <div class="cs-detail-section cs-problem">
                    <div class="cs-detail-icon">🚨</div>
                    <div>
                        <h3 class="cs-detail-heading">The Problem</h3>
                        <p class="cs-detail-text" id="csModalProblem"></p>
                    </div>
                </div>
                <div class="cs-detail-section cs-solution">
                    <div class="cs-detail-icon">💡</div>
                    <div>
                        <h3 class="cs-detail-heading">The Solution</h3>
                        <p class="cs-detail-text" id="csModalSolution"></p>
                    </div>
                </div>
                <div class="cs-detail-section cs-result">
                    <div class="cs-detail-icon">📈</div>
                    <div>
                        <h3 class="cs-detail-heading">The Result</h3>
                        <p class="cs-detail-text" id="csModalResult"></p>
                    </div>
                </div>
            </div>
            <div class="cs-tech-section">
                <h3 class="cs-detail-heading" style="margin-bottom:14px;">Tech Stack</h3>
                <div class="cs-tags-large" id="csModalTags"></div>
            </div>
            <div class="cs-comments-section">
                <h3 class="cs-comments-heading">💬 Comments</h3>
                <div class="cs-comments-list" id="csCommentsList">
                    <div class="cs-comment">
                        <div class="cs-comment-avatar">AK</div>
                        <div class="cs-comment-content">
                            <div class="cs-comment-meta"><strong>Ahmed Khan</strong><span>2 days ago</span></div>
                            <p>This is exactly the kind of real-world AI application I was looking for. Great breakdown of the architecture!</p>
                        </div>
                    </div>
                    <div class="cs-comment">
                        <div class="cs-comment-avatar" style="background:linear-gradient(135deg,var(--pink),var(--purple));">SR</div>
                        <div class="cs-comment-content">
                            <div class="cs-comment-meta"><strong>Sara Rizvi</strong><span>5 days ago</span></div>
                            <p>Loved the Result section — 70% autonomous resolution is phenomenal. Would love to know more about the training data pipeline.</p>
                        </div>
                    </div>
                    <div class="cs-comment">
                        <div class="cs-comment-avatar" style="background:linear-gradient(135deg,var(--cyan),var(--purple));">MB</div>
                        <div class="cs-comment-content">
                            <div class="cs-comment-meta"><strong>M. Bilal</strong><span>1 week ago</span></div>
                            <p>Impressive work. Did you use RAG for the knowledge base or fine-tuning on domain-specific data?</p>
                        </div>
                    </div>
                </div>
                <div class="cs-comment-form">
                    <h4 class="cs-form-title">Leave a Comment</h4>
                    <input class="cs-comment-name" id="csCommentName" type="text" placeholder="Your name" />
                    <textarea class="cs-comment-textarea" id="csCommentText" placeholder="Share your thoughts or ask a question..."></textarea>
                    <button class="cs-comment-submit" id="csCommentSubmit">Submit Comment</button>
                </div>
            </div>
        </div>
    </div>
</div>

""" + swipe_hint

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
