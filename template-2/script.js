function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}
 
function renderSectionHeader(sectionId, s) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const header  = section.querySelector('.section-header');
  if (!header) return;
  const numEl   = header.querySelector('.section-num');
  const titleEl = header.querySelector('.section-title');
  const subEl   = header.querySelector('.section-sub');
  if (numEl)   numEl.textContent   = s.num;
  if (titleEl) titleEl.textContent = s.title;
  if (subEl)   subEl.textContent   = s.sub;
}

function renderMeta() {
  document.title = SITE_DATA.meta.title;
}
 
function renderNav() {
  const nav = document.querySelector('.nav-links');
  if (nav) {
    nav.innerHTML = SITE_DATA.nav.links.map((link, i) =>
      `<a href="${link.href}" class="nav-item${i === 0 ? ' active' : ''}" data-section="${link.sectionId}">${link.label}</a>`
    ).join('');
  }
 
  const btnTalk = document.querySelector('.btn-talk');
  if (btnTalk) btnTalk.textContent = SITE_DATA.nav.ctaText;
 
  const btnBuy = document.querySelector('.btn-buy');
  if (btnBuy) {
    btnBuy.textContent = SITE_DATA.buy.nav.text;
    btnBuy.setAttribute('href', '#buy');
  }
}
 
function renderAbout() {
  const d = SITE_DATA.about;
  setText('.tag-line',  d.tagLine);
  setText('.tag-avail', d.availability);
 
  const nameLines = document.querySelectorAll('.name-line');
  if (nameLines[0]) nameLines[0].textContent = d.firstName;
  if (nameLines[1]) nameLines[1].textContent = d.lastName;
 
  setText('.about-role', d.role);
 
  const metaEl = document.querySelector('.about-meta');
  if (metaEl) {
    metaEl.innerHTML = d.meta.map((item, i) =>
      `<span class="meta-item">${item}</span>${i < d.meta.length - 1 ? '<span class="meta-sep">·</span>' : ''}`
    ).join('');
  }
 
  const ctaPrimary = document.querySelector('.cta-primary');
  if (ctaPrimary) {
    ctaPrimary.textContent = d.ctaPrimary.text;
    ctaPrimary.setAttribute('href', d.ctaPrimary.href);
  }
 
  const ctaSecondary = document.querySelector('.cta-secondary');
  if (ctaSecondary) {
    ctaSecondary.textContent = d.ctaSecondary.text;
    ctaSecondary.setAttribute('href', d.ctaSecondary.href);
  }
}
 
function renderLogs() {
  const d = SITE_DATA.logs;
  renderSectionHeader('logs', d.section);
 
  const timeline = document.querySelector('.logs-timeline');
  if (!timeline) return;
 
  timeline.innerHTML = d.entries.map(entry => {
    const tagClass      = entry.tagClass ? `log-tag log-tag--${entry.tagClass}` : 'log-tag';
    const featuredClass = entry.featured ? ' log-entry--featured' : '';
    return `
      <div class="log-entry${featuredClass}">
        <div class="log-year">${entry.year}</div>
        <div class="log-content">
          <span class="${tagClass}">${entry.tagText}</span>
          <h3 class="log-headline">${entry.headline}</h3>
          <p class="log-body">${entry.body}</p>
        </div>
      </div>`;
  }).join('');
}
 
function renderWork() {
  const d = SITE_DATA.work;
  renderSectionHeader('work', d.section);
 
  const grid = document.querySelector('.work-grid');
  if (!grid) return;
 
  grid.innerHTML = d.cards.map(card => {
    const wideClass = card.wide ? ' work-card--wide' : '';
    const tagsHTML  = card.tags.map(t => `<span>${t}</span>`).join('');
    return `
      <div class="work-card${wideClass}">
        <div class="work-card-inner">
          <div class="work-img ${card.imgClass}">
            <div class="work-img-label">${card.label}</div>
          </div>
          <div class="work-info">
            <span class="work-year">${card.year}</span>
            <h3 class="work-title">${card.title}</h3>
            <p class="work-desc">${card.desc}</p>
            <div class="work-tags">${tagsHTML}</div>
          </div>
        </div>
      </div>`;
  }).join('');
}
 
function renderStats() {
  const d = SITE_DATA.stats;
  renderSectionHeader('stats', d.section);
 
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsGrid.innerHTML = d.items.map(item => {
      const largeClass = item.large ? ' stat-block--large' : '';
      return `
        <div class="stat-block${largeClass}">
          <div class="stat-num" data-target="${item.target}" data-suffix="${item.suffix}">0</div>
          <div class="stat-label">${item.label}</div>
        </div>`;
    }).join('');
  }
 
  setText('.brands-label', d.brandsLabel);
 
  const brandsRow = document.querySelector('.brands-row');
  if (brandsRow) {
    brandsRow.innerHTML = d.brands.map((name, i) =>
      `<span class="brand-name">${name}</span>${i < d.brands.length - 1 ? '<span class="brand-dot"></span>' : ''}`
    ).join('');
  }
}
 
function renderSkill() {
  const d = SITE_DATA.skill;
  renderSectionHeader('skill', d.section);
 
  const layout = document.querySelector('.skill-layout');
  if (!layout) return;
 
  const columnsHTML = d.groups.map(group => {
    const rowsHTML = group.items.map(item =>
      `<div class="skill-row">
        <span class="skill-name">${item.name}</span>
        <div class="skill-bar">
          <div class="skill-fill" data-pct="${item.pct}"></div>
        </div>
      </div>`
    ).join('');
    return `
      <div class="skill-col">
        <h3 class="skill-col-title">${group.title}</h3>
        <div class="skill-list">${rowsHTML}</div>
      </div>`;
  }).join('');
 
  const tagsHTML  = d.tools.tags.map(tag => `<span>${tag}</span>`).join('');
  const toolsHTML = `
    <div class="skill-tags-section">
      <h3 class="skill-col-title">${d.tools.title}</h3>
      <div class="skill-tags">${tagsHTML}</div>
    </div>`;
 
  layout.innerHTML = columnsHTML + toolsHTML;
}
 
function renderContact() {
  const d = SITE_DATA.contact;
  setText('.modal-eyebrow', d.eyebrow);
  setText('.modal-title',   d.title);
  setText('.modal-sub',     d.sub);
  setText('.modal-footer',  d.footer);
 
  const contacts = document.querySelector('.modal-contacts');
  if (contacts) {
    contacts.innerHTML = d.links.map(link =>
      `<a href="${link.href}" class="modal-link" ${link.external ? 'target="_blank" rel="noopener"' : ''}>
        <span class="modal-link-icon">${link.icon}</span>
        <span>${link.label}</span>
      </a>`
    ).join('');
  }
}
 
function renderBuySection() {
  const d = SITE_DATA.buy.section;
  setText('.buy-num',        d.num);
  setText('.buy-price-num',  d.price);
  setText('.buy-price-note', d.priceNote);
  setText('.buy-right-label', d.featuresLabel);
 
  const buyHeadline = document.querySelector('.buy-headline');
  if (buyHeadline) {
    buyHeadline.innerHTML = d.headline
      .map((line, i) => i === d.headline.length - 1 ? `<span>${line}</span>` : line)
      .join('<br>');
  }
 
  const ctaBtn = document.querySelector('.btn-buy-cta');
  if (ctaBtn) ctaBtn.textContent = d.ctaText;
 
  const featuresList = document.querySelector('.buy-features');
  if (featuresList) {
    featuresList.innerHTML = d.features.map(f =>
      `<li class="buy-feature-item">
        <span class="buy-feature-check">&#x2713;</span>
        <span>${f}</span>
      </li>`
    ).join('');
  }
}
 
function renderAll() {
  renderMeta();
  renderNav();
  renderAbout();
  renderLogs();
  renderWork();
  renderStats();
  renderSkill();
  renderContact();
  renderBuySection();
}

document.addEventListener('DOMContentLoaded', () => {
 
  renderAll();

  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
 
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

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#contact') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const modal      = document.getElementById('contact');
  const modalClose = document.getElementById('modalClose');
  const btnTalk    = document.querySelector('.btn-talk');
 
  function openModal()  { modal.classList.add('active');    document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
 
  if (btnTalk)    btnTalk.addEventListener('click', e => { e.preventDefault(); openModal(); });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal)      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
  });

  const btnBuyCta = document.querySelector('.btn-buy-cta');
  if (btnBuyCta) {
    btnBuyCta.addEventListener('click', () => {
      let session = null;
      try { session = JSON.parse(localStorage.getItem('foliOpusUser')); } catch (_) {}
 
      if (session?.loggedIn) {
        window.location.href = '../payment.html?template=pro';
      } else {
        sessionStorage.setItem('foliOpusRedirect', '../payment.html?template=pro');
        window.location.href = '../login.html';
      }
    });
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();
 
    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);
  }
 
  const statsSection  = document.getElementById('stats');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach((el, i) =>
          setTimeout(() => animateCounter(el), i * 120)
        );
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
 
  if (statsSection) statsObserver.observe(statsSection);

  const skillSection  = document.getElementById('skill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-fill').forEach((fill, i) => {
          setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
 
  if (skillSection) skillObserver.observe(skillSection);

  const revealEls = document.querySelectorAll(
    '.log-entry, .work-card, .stat-block, .skill-row, .skill-tags span, .buy-feature-item'
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
 
  [
    ['.log-entry', 60], ['.work-card', 80], ['.stat-block', 60],
    ['.skill-row', 50], ['.skill-tags span', 30], ['.buy-feature-item', 40]
  ].forEach(([sel, delay]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${i * delay}ms`;
    });
  });

  const navFixed = document.querySelector('.nav-fixed');
  window.addEventListener('scroll', () => {
    if (!navFixed) return;
    navFixed.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(30,30,30,0.9)'
      : 'var(--border)';
  }, { passive: true });

  const decoCircle = document.querySelector('.deco-circle');
  if (decoCircle) {
    document.getElementById('about')?.addEventListener('mousemove', e => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } = currentTarget.getBoundingClientRect();
      const dx = (clientX - left - width  / 2) / width;
      const dy = (clientY - top  - height / 2) / height;
      decoCircle.style.transform =
        `translateY(calc(-50% + ${dy * 18}px)) translateX(${dx * 12}px)`;
    });
  }
 
});

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_DATA') {
    window.SITE_DATA = event.data.payload;
    
    renderAll();

    const newElements = document.querySelectorAll(
      '.log-entry:not(.reveal), .work-card:not(.reveal), .stat-block:not(.reveal), .skill-row:not(.reveal), .skill-tags span:not(.reveal), .buy-feature-item:not(.reveal)'
    );
    newElements.forEach(el => {
      el.classList.add('reveal', 'visible');
      el.style.transitionDelay = '0ms'; 
    });

    document.querySelectorAll('.stat-num').forEach(el => {
      const target = el.dataset.target || 0;
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });

    document.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.dataset.pct + '%';
    });
  }
});