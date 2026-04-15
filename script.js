const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' },
);

revealItems.forEach((item, index) => {
  const group = item.closest('.stagger-group');
  if (group) {
    item.style.transitionDelay = `${(index % 7) * 70}ms`;
  }
  revealObserver.observe(item);
});

const faqButtons = document.querySelectorAll('.faq-trigger');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const content = item.querySelector('.faq-content');
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const parent = btn.closest('.faq-item');
      const panel = parent.querySelector('.faq-content');
      panel.style.maxHeight = null;
      parent.classList.remove('active');
    });

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      item.classList.add('active');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

const rippleButtons = document.querySelectorAll('[data-ripple]');
rippleButtons.forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

const parallaxNodes = document.querySelectorAll('[data-depth]');
window.addEventListener('pointermove', (event) => {
  const xRatio = (event.clientX / window.innerWidth - 0.5) * 2;
  const yRatio = (event.clientY / window.innerHeight - 0.5) * 2;

  parallaxNodes.forEach((node) => {
    const depth = Number(node.dataset.depth || 0);
    const moveX = xRatio * depth * -0.25;
    const moveY = yRatio * depth * -0.2;
    node.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});
