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
  { threshold: 0.15, rootMargin: '0px 0px -36px 0px' },
);

revealItems.forEach((item, index) => {
  const group = item.closest('.stagger-group');
  if (group) item.style.transitionDelay = `${(index % 8) * 70}ms`;
  revealObserver.observe(item);
});

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 10);
});

const parallaxNodes = document.querySelectorAll('[data-depth]');
window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  parallaxNodes.forEach((node) => {
    const depth = Number(node.dataset.depth || 0);
    node.style.transform = `translate3d(${x * depth * -0.22}px, ${y * depth * -0.18}px, 0)`;
  });
});

const faqButtons = document.querySelectorAll('.faq-trigger');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const content = item.querySelector('.faq-content');
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const panel = btn.closest('.faq-item').querySelector('.faq-content');
      panel.style.maxHeight = null;
    });

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});
