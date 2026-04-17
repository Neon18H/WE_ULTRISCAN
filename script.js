const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0;
let my = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  if (cursor) {
    cursor.style.left = `${mx}px`;
    cursor.style.top = `${my}px`;
  }

  if (ring) {
    ring.style.left = `${mx}px`;
    ring.style.top = `${my}px`;
  }
});

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (!ring) return;
    ring.style.width = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'var(--green)';
  });

  el.addEventListener('mouseleave', () => {
    if (!ring) return;
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(26,255,122,0.4)';
  });
});

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

const revs = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        ro.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
);
revs.forEach((el) => ro.observe(el));

document.querySelectorAll('.faq-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    if (!item) return;

    const body = item.querySelector('.faq-body');
    if (!body) return;

    const open = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-btn').forEach((otherBtn) => {
      otherBtn.setAttribute('aria-expanded', 'false');
      const otherItem = otherBtn.closest('.faq-item');
      const otherBody = otherItem?.querySelector('.faq-body');
      if (otherBody) otherBody.style.maxHeight = null;
    });

    if (!open) {
      btn.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = `${body.scrollHeight}px`;
    }
  });
});

const dash = document.getElementById('dash');
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.s-fill').forEach((f) => {
          f.style.width = f.dataset.w;
        });
        so.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

if (dash) {
  dash.querySelectorAll('.s-fill').forEach((f) => {
    f.style.width = '0';
  });
  so.observe(dash);
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas?.getContext('2d');
let W;
let H;

function resize() {
  if (!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

if (canvas && ctx) {
  resize();
  window.addEventListener('resize', resize);

  const pts = Array.from({ length: 110 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    r: Math.random() * 1.1 + 0.2,
    a: Math.random() * 0.35 + 0.04,
    g: Math.random() > 0.78,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach((p) => {
      p.x += p.vx + (mx / W - 0.5) * 0.05;
      p.y += p.vy + (my / H - 0.5) * 0.05;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.g ? `rgba(26,255,122,${p.a})` : `rgba(190,220,200,${p.a * 0.35})`;
      ctx.fill();

      const dx = p.x - mx;
      const dy = p.y - my;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 150) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(26,255,122,${0.055 * (1 - d / 150)})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}
