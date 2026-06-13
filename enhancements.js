// Mozalife motion upgrade: heading, photo and card reveal animations
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headingSelector = [
    'h1','h2','h3','h4','h5','h6',
    '.section-title','.hero-title','.service-title','.card-title','.package-title',
    '.pricing-title','.coverage-title','[class*="title"]','[class*="heading"]'
  ].join(',');

  const photoSelector = [
    'section img','.hero img','.photo-card img','.service-card img','.feature-card img',
    '.card img','[class*="image"] img','[class*="photo"] img'
  ].join(',');

  const cardSelector = [
    '.package-card','.service-card','.feature-card','.benefit-card','.stat-item','.card',
    '[class*="card"]'
  ].join(',');

  const unique = (items) => Array.from(new Set(items)).filter(Boolean);

  const headings = unique(document.querySelectorAll(headingSelector));
  const photos = unique(document.querySelectorAll(photoSelector));
  const cards = unique(document.querySelectorAll(cardSelector));

  headings.forEach((el) => el.classList.add('ml-animate-heading'));
  photos.forEach((el) => el.classList.add('ml-animate-photo'));
  cards.forEach((el, index) => {
    el.classList.add('ml-animate-card');
    el.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  });

  if (prefersReducedMotion) {
    [...headings, ...photos, ...cards].forEach((el) => el.classList.add('ml-visible'));
    return;
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('ml-visible');
      reveal.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  [...headings, ...photos, ...cards].forEach((el) => reveal.observe(el));

  // Small parallax movement for the hero image/visual area on desktop only
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero img');
  if (hero && heroImage && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroImage.style.transform = '';
    });
  }
})();
