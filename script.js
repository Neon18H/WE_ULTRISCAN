const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
);

revealItems.forEach((item, index) => {
  const group = item.closest('.stagger-group');
  if (group) {
    item.style.transitionDelay = `${Math.min(index % 6, 6) * 70}ms`;
  }
  observer.observe(item);
});

const faqButtons = document.querySelectorAll('.faq-trigger');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const content = item.querySelector('.faq-content');
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute('aria-expanded', 'false');
      const otherItem = otherButton.closest('.faq-item');
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-content').style.maxHeight = null;
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
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
