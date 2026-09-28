/**
 * One-time split: monolith index.html → modular assets structure.
 * Run: node scripts/modularize-portfolio.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');

const lines = fs.readFileSync(indexPath, 'utf8').split(/\r?\n/);

function sliceLines(start, end) {
  return lines.slice(start - 1, end).join('\n') + '\n';
}

const sectionsDir = path.join(root, 'assets', 'sections');
fs.mkdirSync(sectionsDir, { recursive: true });
fs.mkdirSync(path.join(root, 'assets', 'sounds'), { recursive: true });
fs.mkdirSync(path.join(root, '_archive'), { recursive: true });

if (!fs.existsSync(path.join(root, '_archive', 'index.monolith.html'))) {
  fs.copyFileSync(indexPath, path.join(root, '_archive', 'index.monolith.html'));
}

const sectionRanges = {
  'home.html': [183, 208],
  'about.html': [213, 294],
  'skills.html': [299, 746],
  'projects.html': [751, 1173],
  'achievements.html': [1175, 1700],
  'casestudies.html': [1705, 2685],
  'contact.html': [2690, 3759],
};

for (const [file, [start, end]] of Object.entries(sectionRanges)) {
  fs.writeFileSync(path.join(sectionsDir, file), sliceLines(start, end), 'utf8');
}

const heroResponsiveCss = sliceLines(51, 180).replace(/^<style>\n?/, '').replace(/\n?<\/style>$/, '');
fs.writeFileSync(path.join(root, 'assets', 'css', 'home.css'), heroResponsiveCss, 'utf8');

const cssPath = path.join(root, 'assets', 'css', 'style.css');
const cssLines = fs.readFileSync(cssPath, 'utf8').split(/\r?\n/);

function cssSlice(start, end) {
  return cssLines.slice(start - 1, end).join('\n') + '\n';
}

const cssSplits = {
  'main.css': [1, 170],
  'nav.css': [171, 371],
  'home.css': [681, 824], // appended below hero responsive
  'about.css': [825, 1041],
  'skills.css': [1042, 1157],
  'projects.css': [1158, 1545],
  'achievements.css': [1546, 1763],
  'casestudies.css': [1764, 2893], // certs + contact base + case studies + modals comments + start responsive
  'contact.css': [1954, 2105],
  'animations.css': [109, 170, 1500, 1544, 4216, 4691, 5244, 5477],
  'theme.css': '', // placeholder — day/night hooks live in main vars for now
  'responsive.css': [2894, 3345, 3688, 3771, 4712, 5478, 5583, cssLines.length],
};

// Write section CSS files (non-contiguous ranges merged manually)
fs.writeFileSync(
  path.join(root, 'assets', 'css', 'main.css'),
  cssSlice(1, 170) + cssSlice(372, 680),
  'utf8'
);

const homeExtra = cssSlice(681, 824);
fs.appendFileSync(path.join(root, 'assets', 'css', 'home.css'), '\n' + homeExtra, 'utf8');

fs.writeFileSync(path.join(root, 'assets', 'css', 'nav.css'), cssSlice(171, 371) + cssSlice(4578, 4597), 'utf8');

// Shared cards + utils between nav and sections
fs.writeFileSync(path.join(root, 'assets', 'css', 'about.css'), cssSlice(825, 1041) + cssSlice(5490, 5524), 'utf8');

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'skills.css'),
  cssSlice(1042, 1157) + cssSlice(3772, 3843) + cssSlice(4246, 4293) + cssSlice(4840, 4849) + cssSlice(5525, 5582),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'projects.css'),
  cssSlice(1158, 1545) + cssSlice(4294, 4383),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'achievements.css'),
  cssSlice(1546, 1763) + cssSlice(3844, 4027) + cssSlice(4384, 4441) + cssSlice(4744, 4779),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'contact.css'),
  cssSlice(1954, 2105) + cssSlice(4442, 4577),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'casestudies.css'),
  cssSlice(1764, 1953) + cssSlice(2106, 2893) + cssSlice(4028, 4215) + cssSlice(4780, 4839),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'animations.css'),
  cssSlice(109, 170) +
    cssSlice(1500, 1544) +
    cssSlice(4216, 4245) +
    cssSlice(4598, 4691) +
    cssSlice(5244, 5477),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'responsive.css'),
  cssSlice(2894, 3345) +
    cssSlice(3346, 3687) +
    cssSlice(3688, 3771) +
    cssSlice(4712, 4737) +
    cssSlice(4850, 5243) +
    cssSlice(5478, 5524) +
    cssSlice(5583, cssLines.length),
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'css', 'theme.css'),
  `/* Theme tokens — extend for day/night toggle in assets/js/theme.js */\n:root {\n  color-scheme: dark;\n}\n`,
  'utf8'
);

// Split main.js
const mainJsPath = path.join(root, 'assets', 'js', 'main.js');
const mainJs = fs.readFileSync(mainJsPath, 'utf8');

const navJs = mainJs.slice(0, mainJs.indexOf('// Typewriter'));
const restFromTypewriter = mainJs.slice(mainJs.indexOf('// Typewriter'));

const typewriterEnd = restFromTypewriter.indexOf('// Particles');
const animationsPart1 = restFromTypewriter.slice(0, typewriterEnd);
const restAfterType = restFromTypewriter.slice(typewriterEnd);

const loaderStart = restAfterType.indexOf('// ── ORIGINAL ROCKET SYSTEM ──');
const beforeLoader = restAfterType.slice(0, loaderStart);
const loaderBlock = restAfterType.slice(loaderStart);

const neuralStart = loaderBlock.indexOf('// Neural Matrix Extras');
const loaderOnly = loaderBlock.slice(0, neuralStart);
const neuralExtras = loaderBlock.slice(neuralStart);

fs.writeFileSync(
  path.join(root, 'assets', 'js', 'nav.js'),
  `function initNavigation() {\n${navJs.trim()}\nif (typeof showNavPopup === 'function') window.showNavPopup = showNavPopup;\n}\nwindow.addEventListener('mb-sections-ready', initNavigation, { once: true });\n`,
  'utf8'
);
fs.writeFileSync(
  path.join(root, 'assets', 'js', 'animations.js'),
  (animationsPart1 + beforeLoader).trim() + '\n',
  'utf8'
);
fs.writeFileSync(
  path.join(root, 'assets', 'js', 'transitions.js'),
  `/** Section transition panels — implemented in loader.js (mbRocketTransition) */\n`,
  'utf8'
);

const caseStudyBlock = beforeLoader.includes('// Case Studies')
  ? beforeLoader.slice(beforeLoader.indexOf('// Case Studies'))
  : '';
const animWithoutCase = beforeLoader.replace(caseStudyBlock, '').trim();
fs.writeFileSync(
  path.join(root, 'assets', 'js', 'animations.js'),
  `function initAnimations() {\n${(animationsPart1 + animWithoutCase).trim()}\n}\nwindow.addEventListener('mb-sections-ready', initAnimations, { once: true });\n`,
  'utf8'
);

if (caseStudyBlock) {
  fs.writeFileSync(
    path.join(root, 'assets', 'js', 'casestudies-core.js'),
    `function initCaseStudiesCore() {\n${caseStudyBlock.trim()}\n}\nwindow.addEventListener('mb-sections-ready', initCaseStudiesCore, { once: true });\n`,
    'utf8'
  );
}

const loaderReady = loaderOnly.replace(
  /if \(document\.readyState === 'loading'\) document\.addEventListener\('DOMContentLoaded', \(\) => \{ buildLoader\(\); buildTransitionElements\(\); showNavPopup\(\); \}, \{ once: true \}\);\s*else \{ buildLoader\(\); buildTransitionElements\(\); showNavPopup\(\); \}/,
  `function bootLoader() { buildLoader(); buildTransitionElements(); if (typeof window.showNavPopup === 'function') window.showNavPopup(); }\nwindow.addEventListener('mb-sections-ready', bootLoader, { once: true });`
);

fs.writeFileSync(path.join(root, 'assets', 'js', 'loader.js'), loaderReady.trim() + '\n', 'utf8');

fs.writeFileSync(
  path.join(root, 'assets', 'js', 'about-extras.js'),
  `function initAboutExtras() {\n${neuralExtras.trim()}\n}\nwindow.addEventListener('mb-sections-ready', initAboutExtras, { once: true });\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(root, 'assets', 'js', 'theme.js'),
  `/** Day/night theme — wire UI when ready */\nexport function initTheme() {}\n`,
  'utf8'
);
fs.writeFileSync(
  path.join(root, 'assets', 'js', 'sound.js'),
  `/** Sound effects — wire when audio assets are added */\nexport function initSound() {}\n`,
  'utf8'
);
fs.writeFileSync(
  path.join(root, 'assets', 'js', 'contact.js'),
  `/** Contact / neural link — section inline scripts run after section load */\nexport function initContact() {}\n`,
  'utf8'
);

const shellHead = sliceLines(1, 14).trimEnd();
const shellBodyStart = sliceLines(15, 49).trimEnd();
const modalsAndPopup = sliceLines(3761, 3817).trimEnd();

const newIndex = `${shellHead}
    <link rel="stylesheet" href="assets/css/main.css"/>
    <link rel="stylesheet" href="assets/css/nav.css"/>
    <link rel="stylesheet" href="assets/css/home.css"/>
    <link rel="stylesheet" href="assets/css/about.css"/>
    <link rel="stylesheet" href="assets/css/skills.css"/>
    <link rel="stylesheet" href="assets/css/projects.css"/>
    <link rel="stylesheet" href="assets/css/achievements.css"/>
    <link rel="stylesheet" href="assets/css/casestudies.css"/>
    <link rel="stylesheet" href="assets/css/contact.css"/>
    <link rel="stylesheet" href="assets/css/animations.css"/>
    <link rel="stylesheet" href="assets/css/theme.css"/>
    <link rel="stylesheet" href="assets/css/responsive.css"/>
    <link rel="stylesheet" href="assets/css/burhan-os-chat.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body style="overflow:hidden; height:100vh; position:fixed; width:100%; background:#060B14;">
${shellBodyStart}

    <div id="sections-root" aria-live="polite"></div>

${modalsAndPopup}

    <script src="assets/js/sections-loader.js"></script>
    <script src="assets/js/nav.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/casestudies-core.js"></script>
    <script src="assets/js/about-extras.js"></script>
    <script src="assets/js/loader.js"></script>
    <script src="assets/js/theme.js"></script>
    <script src="assets/js/sound.js"></script>
    <script src="assets/js/contact.js"></script>
    <script src="assets/js/burhan-os-chat.js"></script>
</body>
</html>
`;

fs.writeFileSync(indexPath, newIndex, 'utf8');

console.log('Modular structure created.');
console.log('Backup: _archive/index.monolith.html');
console.log('Sections:', Object.keys(sectionRanges).join(', '));
