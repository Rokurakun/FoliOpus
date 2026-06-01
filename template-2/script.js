document.addEventListener('DOMContentLoaded', () => {

  const sections   = document.querySelectorAll('.section');
  const navItems   = document.querySelectorAll('.nav-item');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sectionObserver.observe(s));

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const btnTalk   = document.querySelector('.btn-talk');
  const modal     = document.getElementById('contact');
  const modalClose = document.getElementById('modalClose');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnTalk.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  const statNums = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsSection = document.getElementById('stats');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach((el, i) => {
          setTimeout(() => animateCounter(el), i * 120);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  if (statsSection) statsObserver.observe(statsSection);

  const skillFills = document.querySelectorAll('.skill-fill');
  const skillSection = document.getElementById('skill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.pct + '%';
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (skillSection) skillObserver.observe(skillSection);

  const revealEls = document.querySelectorAll(
    '.log-entry, .work-card, .stat-block, .skill-row, .skill-tags span'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.log-entry').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });

  document.querySelectorAll('.work-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });

  document.querySelectorAll('.stat-block').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });

  document.querySelectorAll('.skill-row').forEach((el, i) => {
    el.style.transitionDelay = `${i * 50}ms`;
  });

  document.querySelectorAll('.skill-tags span').forEach((el, i) => {
    el.style.transitionDelay = `${i * 30}ms`;
  });

  const navFixed = document.querySelector('.nav-fixed');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navFixed.style.borderBottomColor = 'rgba(30,30,30,0.9)';
    } else {
      navFixed.style.borderBottomColor = 'var(--border)';
    }
  }, { passive: true });

  const ctaPrimary = document.querySelector('.cta-primary');
  if (ctaPrimary) {
    ctaPrimary.addEventListener('click', e => {
      e.preventDefault();
      const workSection = document.getElementById('work');
      if (workSection) workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const ctaSecondary = document.querySelector('.cta-secondary');
  if (ctaSecondary) {
    ctaSecondary.addEventListener('click', e => {
      e.preventDefault();
      const logsSection = document.getElementById('logs');
      if (logsSection) logsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const decoCircle = document.querySelector('.deco-circle');

  if (decoCircle) {
    document.getElementById('about')?.addEventListener('mousemove', e => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } = currentTarget.getBoundingClientRect();
      const dx = (clientX - left - width / 2) / width;
      const dy = (clientY - top - height / 2) / height;
      decoCircle.style.transform = `translateY(calc(-50% + ${dy * 18}px)) translateX(${dx * 12}px)`;
    });
  }

});