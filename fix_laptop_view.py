import sys

# The COMPLETE replacement block for the Projects section (card-4)
projects_section = """<!-- ════════════════════════════
     CARD 4 — PROJECTS
════════════════════════════ -->
<section id="card-4" class="card state-below">
    <div class="card-inner" style="transform-style: preserve-3d; display: block; padding-top: 0; padding-bottom: 0;">
    <style>
        .perspective-1200 { perspective: 1200px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        @keyframes orbital-rotation {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }
        .animate-orbital { animation: orbital-rotation 25s linear infinite; }
        .animate-orbital:hover { animation-play-state: paused; }

        .isometric-grid { transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; display: grid; grid-template-columns: 1fr 1fr; }
        
        .glass-panel {
            background: rgba(6, 11, 20, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neo-glow-cyan { box-shadow: 0 0 20px rgba(0, 229, 255, 0.2); }
        .neo-glow-purple { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }

        /* Orbital Carousel */
        .carousel-container { perspective: 1500px; width: 100%; height: 500px; display: flex; align-items: center; justify-content: center; position: relative; }
        .carousel-spinner { position: relative; width: 320px; height: 480px; transform-style: preserve-3d; animation: orbital-rotation 25s linear infinite; transition: transform 0.5s ease; }
        .carousel-spinner:hover { animation-play-state: paused; }
        
        .hologram-card {
            position: absolute; inset: 0; background: rgba(6, 11, 20, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(0, 229, 255, 0.4); border-radius: 16px;
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.1), inset 0 0 20px rgba(0, 229, 255, 0.1);
            display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 30px 20px; transform-style: preserve-3d;
        }
        .card-1 { transform: rotateY(0deg) translateZ(400px); }
        .card-2 { transform: rotateY(90deg) translateZ(400px); border-color: rgba(139, 92, 246, 0.4); box-shadow: 0 0 30px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(139, 92, 246, 0.1); }
        .card-3 { transform: rotateY(180deg) translateZ(400px); }
        .card-4 { transform: rotateY(270deg) translateZ(400px); border-color: rgba(139, 92, 246, 0.4); box-shadow: 0 0 30px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(139, 92, 246, 0.1); }

        /* Bento Grid */
        .bento-card { position: relative; height: 450px; transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1); cursor: pointer; border-radius: 12px; overflow: hidden; }
        .bento-card:hover { transform: rotateX(5deg) rotateY(-5deg); }
        .bento-bg { position: absolute; inset: 0; transition: transform 0.5s; border-radius: 12px; overflow: hidden; }
        .bento-card:hover .bento-bg { transform: translateZ(-30px); }
        .bento-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; transform: scale(1.1); transition: transform 0.7s; }
        .bento-card:hover .bento-img { transform: scale(1); }
        .bento-content { position: relative; z-index: 10; padding: 40px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; transition: transform 0.5s; transform-style: preserve-3d; }
        .bento-card:hover .bento-content { transform: translateZ(80px); }

        /* Isometric */
        .iso-server { position: relative; width: 220px; height: 220px; transform-style: preserve-3d; transition: transform 0.5s ease; cursor: pointer; }
        .iso-server:hover { transform: translateZ(60px); }
        .iso-top { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; transition: all 0.5s; }
        .iso-server:hover .iso-top { background: rgba(0, 229, 255, 0.1); box-shadow: 0 0 20px rgba(0, 229, 255, 0.2); }
        .iso-server.purple:hover .iso-top { background: rgba(139, 92, 246, 0.1); box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
        .iso-bottom { position: absolute; inset: 0; transform-origin: bottom; transform: rotateX(-90deg) translateY(50%); height: 50px; }
        .iso-left { position: absolute; inset: 0; transform-origin: left; transform: rotateY(90deg) translateX(-50%); width: 50px; }

        @media (max-width: 1024px) { 
            .carousel-spinner { transform: scale(0.8); }
            .bento-card { height: 350px; }
        }
        @media (max-width: 768px) { .carousel-spinner { transform: scale(0.6); } }
    </style>

    <!-- PROTOTYPE 1: ORBITAL CAROUSEL (Full Screen) -->
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 80px 20px; position: relative;">
        <div class="mb-12 text-center" style="margin-bottom: 64px;">
            <span style="color: #00E5FF; font-family: 'Space Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; display: block; margin-bottom: 12px;">SYSTEM_OPERATIONS</span>
            <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 5vw, 64px); color: white; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em;">PROJECT_LAB.v2</h1>
            <p style="font-family: 'Lexend', sans-serif; font-size: 18px; color: #849495; max-width: 800px; margin: 0 auto;">High-fidelity data decryption and market pulse synchronization using advanced quantum orbital matrices.</p>
        </div>

        <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; perspective: 1200px;">
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 0;">
                <span style="color: rgba(30, 41, 59, 0.15); font-weight: 900; font-size: clamp(100px, 15vw, 200px); font-family: 'Space Grotesk', sans-serif; user-select: none;">ORBITAL</span>
            </div>
            
            <h2 style="color: rgba(0, 229, 255, 0.5); font-family: 'Space Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 40px; position: relative; z-index: 1;">PROTOTYPE_01 // CAROUSEL</h2>
            
            <div class="carousel-container">
                <div class="carousel-spinner">
                    <div class="hologram-card card-1">
                        <span class="material-symbols-outlined" style="color: #00E5FF; font-size: 80px;">psychology</span>
                        <div style="text-align: center;">
                            <h3 style="font-size: 26px; color: white; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Neural Sentiment</h3>
                            <p style="color: #94a3b8; font-size: 14px;">Real-time biometric feedback synchronization.</p>
                        </div>
                        <button style="margin-top: 24px; width: 100%; padding: 14px; border: 1px solid #00E5FF; color: #00E5FF; background: transparent; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold;">Launch Repo</button>
                    </div>

                    <div class="hologram-card card-2">
                        <span class="material-symbols-outlined" style="color: #8B5CF6; font-size: 80px;">query_stats</span>
                        <div style="text-align: center;">
                            <h3 style="font-size: 26px; color: white; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Market Pulse AI</h3>
                            <p style="color: #94a3b8; font-size: 14px;">Predictive trend vectors using quantum orbital matrices.</p>
                        </div>
                        <button style="margin-top: 24px; width: 100%; padding: 14px; border: 1px solid #8B5CF6; color: #8B5CF6; background: transparent; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold;">Launch Repo</button>
                    </div>

                    <div class="hologram-card card-3">
                        <span class="material-symbols-outlined" style="color: #00E5FF; font-size: 80px;">biotech</span>
                        <div style="text-align: center;">
                            <h3 style="font-size: 26px; color: white; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">CV_VISION_OS</h3>
                            <p style="color: #94a3b8; font-size: 14px;">Autonomous object detection and tracking algorithm.</p>
                        </div>
                        <button style="margin-top: 24px; width: 100%; padding: 14px; border: 1px solid #00E5FF; color: #00E5FF; background: transparent; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold;">Launch Repo</button>
                    </div>

                    <div class="hologram-card card-4">
                        <span class="material-symbols-outlined" style="color: #8B5CF6; font-size: 80px;">memory</span>
                        <div style="text-align: center;">
                            <h3 style="font-size: 26px; color: white; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Holographic Viz</h3>
                            <p style="color: #94a3b8; font-size: 14px;">Generative AI visualization layered in isometric 3D.</p>
                        </div>
                        <button style="margin-top: 24px; width: 100%; padding: 14px; border: 1px solid #8B5CF6; color: #8B5CF6; background: transparent; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: bold;">Launch Repo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- PROTOTYPE 2: PARALLAX BENTO (Full Screen) -->
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 100px 40px; box-sizing: border-box; background: radial-gradient(circle at center, rgba(139, 92, 246, 0.05), transparent 70%);">
        <h2 style="color: rgba(0, 229, 255, 0.5); font-family: 'Space Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 80px; text-align: center;">PROTOTYPE_02 // PARALLAX BENTO</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 48px; width: 100%; max-width: 1400px; perspective: 1500px;">
            <!-- Bento Item 1 -->
            <div class="bento-card">
                <div class="bento-bg glass-panel" style="border-color: rgba(0, 229, 255, 0.25);">
                    <img class="bento-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcr7RqyXcAMhif1tceQcaeis1S0dLcaojmuIwhuEF2Kzcq-yOav5Z38AQo6OIK1wmBstI9FsgQNRXU9VXi9STyRY3t3CyMyfDYhBAAiad5gBBSnQHwTscgLmTmX-jVLsvFhIfduwUsIsRAOIIoPVAxmPsfq_8AOolmL7buPWtuV2SAGuUAw9VuEDZew9mULerU8Q_bz317qK6zAfFda7iPfj7fB5tidudK-sA-eBg1gz7IQ0Y6bRr_Pqu8FTyFhwrXT2SapEkp8sY" />
                </div>
                <div class="bento-content">
                    <div style="background: #00E5FF; width: 64px; height: 5px; margin-bottom: 24px; box-shadow: 0 0 20px #00E5FF;"></div>
                    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -0.01em;">Neural Sentiment</h3>
                    <p style="font-size: 18px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">Adaptive intelligence layer analyzing celestial data streams in real-time with zero latency quantum encryption.</p>
                </div>
            </div>
            <!-- Bento Item 2 -->
            <div class="bento-card">
                <div class="bento-bg glass-panel" style="border-color: rgba(139, 92, 246, 0.25);">
                    <img class="bento-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr5lbufPrhe-WCFVr5xsFu0nZv52Df7KELhtoBOiNhJqqekUz-NCjFFPqx3LyATwM4dejrVfGolX2AW-j14jK7Ca-4Wf7gozSYGWwogPMg_-mTRmN3HhvEpWvqeihJOY2aqtObDSMRTjH_dz0GDqm9eEBarpXIDP2fI4vd2tsWFL-_vx6CAHrtV920o2dKgj1-XEeK6mUyIN_4SiXi8JonJF3c1-sfLaJxka0VLr4PvD2snLvYclO8kd1MYKlKKO6qcTACdw1Vp-A" />
                </div>
                <div class="bento-content">
                    <div style="background: #8B5CF6; width: 64px; height: 5px; margin-bottom: 24px; box-shadow: 0 0 20px #8B5CF6;"></div>
                    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -0.01em;">Market Pulse</h3>
                    <p style="font-size: 18px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">Economic fluctuation monitoring across orbital trade routes using predictive neural modeling.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- PROTOTYPE 3: ISOMETRIC SERVERS (Full Screen) -->
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 100px 20px; overflow: hidden; max-width: 100%; box-sizing: border-box; background: linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.02));">
        <h2 style="color: rgba(0, 229, 255, 0.5); font-family: 'Space Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 120px; text-align: center;">PROTOTYPE_03 // ISOMETRIC SERVERS</h2>
        <div style="display: flex; justify-content: center; align-items: center; height: 600px; perspective: 2000px;">
            <div class="isometric-grid" style="gap: 100px;">
                <!-- Server Block 1 -->
                <div class="iso-server glass-panel" style="border-color: rgba(0, 229, 255, 0.5); background: rgba(8, 51, 68, 0.4);">
                    <div class="iso-bottom glass-panel" style="background: rgba(8, 51, 68, 0.3); border-color: rgba(0, 229, 255, 0.5);"></div>
                    <div class="iso-left glass-panel" style="background: rgba(8, 51, 68, 0.3); border-color: rgba(0, 229, 255, 0.5);"></div>
                    <div class="iso-top">
                        <span class="material-symbols-outlined" style="color: #00E5FF; font-size: 64px; margin-bottom: 12px;">terminal</span>
                        <span style="font-family: 'Space Grotesk', monospace; font-size: 12px; color: #a5f3fc; letter-spacing: 0.1em; font-weight: bold;">CORE_V1.PRO</span>
                    </div>
                </div>
                <!-- Server Block 2 -->
                <div class="iso-server purple glass-panel" style="margin-top: 100px; border-color: rgba(139, 92, 246, 0.5); background: rgba(59, 7, 100, 0.4);">
                    <div class="iso-bottom glass-panel" style="background: rgba(59, 7, 100, 0.3); border-color: rgba(139, 92, 246, 0.5);"></div>
                    <div class="iso-left glass-panel" style="background: rgba(59, 7, 100, 0.3); border-color: rgba(139, 92, 246, 0.5);"></div>
                    <div class="iso-top">
                        <span class="material-symbols-outlined" style="color: #8B5CF6; font-size: 64px; margin-bottom: 12px;">memory</span>
                        <span style="font-family: 'Space Grotesk', monospace; font-size: 12px; color: #e9d5ff; letter-spacing: 0.1em; font-weight: bold;">PROC_AI.X</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</section>"""

# Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the card-4 section
import re
pattern = re.compile(r'<!-- ═+.*?CARD 4.*?═+ -->.*?<section id="card-4".*?</section>', re.DOTALL | re.IGNORECASE)

if pattern.search(content):
    new_content = pattern.sub(projects_section, content)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success: Projects section updated.")
else:
    print("Error: Could not find card-4 markers.")
