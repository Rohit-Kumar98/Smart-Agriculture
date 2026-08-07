const SPOTLIGHT_R = 260;
const canvas = document.querySelector('#maskCanvas');
const reveal = document.querySelector('#revealImage');
const ctx = canvas.getContext('2d');
const mouse = { x: -999, y: -999 };
const smooth = { x: -999, y: -999 };
let rafRef;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function renderMask() {
  smooth.x += (mouse.x - smooth.x) * 0.1;
  smooth.y += (mouse.y - smooth.y) * 0.1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(.4, 'rgba(255,255,255,1)');
  gradient.addColorStop(.6, 'rgba(255,255,255,.75)');
  gradient.addColorStop(.75, 'rgba(255,255,255,.4)');
  gradient.addColorStop(.88, 'rgba(255,255,255,.12)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
  ctx.fill();
  const mask = canvas.toDataURL();
  reveal.style.maskImage = `url(${mask})`;
  reveal.style.webkitMaskImage = `url(${mask})`;
  rafRef = requestAnimationFrame(renderMask);
}

function onMove(event) { mouse.x = event.clientX; mouse.y = event.clientY; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', onMove);
rafRef = requestAnimationFrame(renderMask);
window.addEventListener('beforeunload', () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef); });
document.querySelector('form')?.addEventListener('submit', event => { event.preventDefault(); const button = event.currentTarget.querySelector('button'); button.innerHTML = 'Message sent <span>✓</span>'; });

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('plant-monitor-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  document.body.classList.toggle('light-mode', theme === 'light');
  themeToggle?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  localStorage.setItem('plant-monitor-theme', theme);
}
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tiltCards = document.querySelectorAll('.feature-list article, .benefit-grid article, .team-grid article, .reading-row > div');
if (canTilt) {
  tiltCards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 8).toFixed(2)}deg`);
      card.style.setProperty('--glow-x', `${((x + .5) * 100).toFixed(1)}%`);
      card.style.setProperty('--glow-y', `${((y + .5) * 100).toFixed(1)}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
  const hero = document.querySelector('.hero');
  const heroTitle = document.querySelector('.hero-title');
  hero?.addEventListener('pointermove', event => {
    const x = (event.clientX / window.innerWidth - .5) * 10;
    const y = (event.clientY / window.innerHeight - .5) * 8;
    heroTitle.style.transform = `translate3d(${x}px, ${y}px, 35px)`;
  });
  hero?.addEventListener('pointerleave', () => { heroTitle.style.transform = 'translate3d(0, 0, 0)'; });
}
