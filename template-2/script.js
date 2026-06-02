const SITE_DATA = {

  meta: {
    title: 'FoliOpus Pro — Alexandra Reinholt',
  },

  nav: {
    ctaText: "Let's Talk",
    links: [
      { label: 'About',  href: '#about',  sectionId: 'about'  },
      { label: 'Logs',   href: '#logs',   sectionId: 'logs'   },
      { label: 'Work',   href: '#work',   sectionId: 'work'   },
      { label: 'Stats',  href: '#stats',  sectionId: 'stats'  },
      { label: 'Skill',  href: '#skill',  sectionId: 'skill'  },
    ],
  },

  about: {
    tagLine:      'Product Manager · Digital Marketer',
    availability: 'Available for projects',
    firstName:    'Muhammad Devin',
    lastName:     'Yuwono',
    role:         'Growth Strategist & Product Leader',
    meta: [
      '📍 Jakarta, Indonesia',
      '5+ yrs experience',
      '12 products shipped',
    ],
    ctaPrimary: {
      text: 'View Work',
      href: '#work',
    },
    ctaSecondary: {
      text: 'Read Logs →',
      href: '#logs',
    },
  },

  logs: {
    section: {
      num:   '02',
      title: 'Logs',
      sub:   'Career milestones & field notes',
    },

    entries: [
      {
        featured: true,
        year:      '2025',
        tagText:   'Product',
        tagClass:  '',
        headline:  'Led B2B SaaS redesign, reducing churn by 34%',
        body:      'Spearheaded a full product experience overhaul across 3 core modules. Coordinated cross-functional squads of 11 engineers, 2 designers, and stakeholders across regions.',
      },
      {
        year:      '2024',
        tagText:   'Growth',
        tagClass:  'dm',
        headline:  'Scaled paid acquisition from Rp 80M to Rp 420M/month',
        body:      'Built and optimized multi-channel performance funnels across Meta, Google, and TikTok Ads. Achieved 340% ROAS improvement within 6 months.',
      },
      {
        year:      '2024',
        tagText:   'Award',
        tagClass:  'award',
        headline:  'Best Digital Campaign — Marketing Summit Indonesia',
        body:      'Recognized for the "Zero to Launch" growth campaign that acquired 28,000 users in 90 days pre-launch with zero paid budget.',
      },
      {
        year:      '2023',
        tagText:   'Product',
        tagClass:  '',
        headline:  'Shipped AI-powered analytics dashboard to 15,000 users',
        body:      'Owned roadmap, discovery, and GTM for a new analytics feature. Feature became the top requested capability in user NPS surveys.',
      },
      {
        year:      '2022',
        tagText:   'Growth',
        tagClass:  'dm',
        headline:  'SEO overhaul: 0 to 180K monthly organic sessions',
        body:      'Designed and executed a 12-month content and technical SEO strategy. Grew domain authority from DA 14 to DA 51 without any link-buying.',
      },
    ],
  },


  work: {
    section: {
      num:   '03',
      title: 'Work',
      sub:   'Selected projects & campaigns',
    },

    cards: [
      {
        wide:     true,
        imgClass: 'work-img--1',
        label:    'Product',
        year:     '2025',
        title:    'NestOps — B2B Project Management SaaS',
        desc:     'Full product lifecycle ownership from discovery to launch. Defined OKRs, led design sprints, and shipped 3 major feature sets serving 8,000+ teams.',
        tags:     ['Roadmapping', 'Agile', 'User Research', 'GTM'],
      },
      {
        imgClass: 'work-img--2',
        label:    'Growth',
        year:     '2024',
        title:    'Viralo Brand Launch Campaign',
        desc:     '0→1 brand awareness campaign for a consumer fintech app. 2.4M impressions, 28K signups in 90 days.',
        tags:     ['Meta Ads', 'Content Strategy', 'Analytics'],
      },
      {
        imgClass: 'work-img--3',
        label:    'SEO',
        year:     '2023',
        title:    'Organic Growth Engine — TechCorp',
        desc:     'Built a full SEO content machine. 180K monthly sessions, 51 DA, zero link buying—pure topical authority.',
        tags:     ['SEO', 'Content', 'Technical Audit'],
      },
      {
        imgClass: 'work-img--4',
        label:    'Analytics',
        year:     '2023',
        title:    'AI Dashboard — Analytics Feature',
        desc:     'Owned discovery-to-launch for a predictive analytics module. Top-rated feature in quarterly NPS survey.',
        tags:     ['Discovery', 'Wireframing', 'Data'],
      },
    ],
  },

  stats: {
    section: {
      num:   '04',
      title: 'Stats',
      sub:   'Numbers that tell the story',
    },

    items: [
      { large: true, target: 340, suffix: '%', label: 'Average ROAS improvement across paid campaigns' },
      {              target: 12,  suffix: '',  label: 'Products shipped end-to-end'                   },
      {              target: 180, suffix: 'K', label: 'Monthly organic sessions at peak'              },
      {              target: 28,  suffix: 'K', label: 'Users acquired in 90-day launch sprint'        },
      {              target: 5,   suffix: '+', label: 'Years in product & growth'                     },
      {              target: 34,  suffix: '%', label: 'Churn reduction on flagship product'           },
    ],
    brandsLabel: 'Worked with',
    brands: ['NestOps', 'TechCorp', 'Viralo', 'Growthly', 'Launchpad.id'],
  },

  skill: {
    section: {
      num:   '05',
      title: 'Skill',
      sub:   'The full toolkit',
    },
    groups: [
      {
        title: 'Product Management',
        items: [
          { name: 'Product Roadmapping',          pct: 95 },
          { name: 'User Research & Discovery',    pct: 90 },
          { name: 'Agile / Scrum',                pct: 92 },
          { name: 'Wireframing & Prototyping',    pct: 82 },
          { name: 'OKR / KPI Framework',          pct: 88 },
          { name: 'GTM Strategy',                 pct: 86 },
        ],
      },
      {
        title: 'Digital Marketing',
        items: [
          { name: 'Performance Marketing',               pct: 93 },
          { name: 'SEO & Content Strategy',              pct: 89 },
          { name: 'Analytics & Data (GA4, Mixpanel)',    pct: 88 },
          { name: 'Paid Social (Meta, TikTok)',          pct: 91 },
          { name: 'Email & CRM',                         pct: 80 },
          { name: 'Brand Strategy',                      pct: 84 },
        ],
      },
    ],
    tools: {
      title: 'Tools & Stack',
      tags: [
        'Figma', 'Notion', 'Jira', 'Amplitude',
        'Google Analytics 4', 'Mixpanel', 'Meta Ads Manager',
        'Ahrefs', 'HubSpot', 'Hotjar',
        'Miro', 'Linear', 'Slack', 'Looker Studio',
      ],
    },
  },

  contact: {
    eyebrow: "Let's Talk",
    title:   'Ready to build something great?',
    sub:     'Reach out for collaborations, consulting, or just a good conversation about product and growth.',
    links: [
      {
        icon:     '✉',
        href:     'mailto:hello@alexandra.com',
        label:    'hello@alexandra.com',
        external: false,
      },
      {
        icon:     'in',
        href:     'https://linkedin.com',
        label:    'linkedin.com/in/alexandra-reinholt',
        external: true,
      },
      {
        icon:     '✆',
        href:     'https://wa.me/6281234567890',
        label:    '+62 812-3456-7890',
        external: true,
      },
    ],
    footer: 'Jakarta, Indonesia · Open to remote & hybrid',
  },

  buy: {

    nav: {
      text: 'Buy — Rp 299.000',
    },

    section: {
      num:          '06 — Own It',
      headline:     ['Your story,', 'professionally', 'told.'],
      price:        'Rp 299.000',
      priceNote:    'One-time payment · Lifetime ownership',
      ctaText:      'Get This Portfolio',
      featuresLabel: "What's included",
      features: [
        'Full source code (HTML + CSS + JS)',
        'Edit konten via JS — tanpa sentuh HTML/CSS',
        '5 section dengan animasi halus',
        'Scroll-snap full-page navigation',
        'Contact modal dengan link kustom',
        'Stats counter & skill bar animated',
        'Fully responsive — mobile & desktop',
        'Panduan setup & kustomisasi',
      ],
    },

    modal: {
      eyebrow:   'FoliOpus Pro',
      title:     "What's included",
      price:     'Rp 299.000',
      priceNote: 'One-time · No subscription · No hidden fees',
      features: [
        'Full source code (HTML + CSS + JS)',
        'Data-driven JS — edit konten tanpa sentuh HTML/CSS',
        '5 section fully animated',
        'Contact modal dengan link yang dapat dikustomisasi',
        'Scroll-snap full-page navigation',
        'Animasi stats counter saat scroll',
        'Animasi skill bar dengan scroll trigger',
        'Scroll reveal fade-up pada semua elemen',
        'Fully responsive untuk mobile & desktop',
        'Panduan setup + instruksi kustomisasi',
        'Lifetime ownership — bukan langganan',
        'Free minor updates',
      ],
      cta: {
        text:     'Order via WhatsApp ↗',
        href:     'https://wa.me/6281234567890?text=Halo%2C+saya+ingin+membeli+FoliOpus+Pro+%E2%80%94+Rp+299.000',
        external: true,
      },
      note: 'Pembayaran via transfer · File dikirim dalam 24 jam',
    },

  },

};

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

function renderMeta() {
  document.title = SITE_DATA.meta.title;
}

function renderNav() {
  const nav = document.querySelector('.nav-links');
  if (nav) {
    nav.innerHTML = SITE_DATA.nav.links.map((link, i) =>
      `<a href="${link.href}"
          class="nav-item${i === 0 ? ' active' : ''}"
          data-section="${link.sectionId}"
        >${link.label}</a>`
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

  setText('.tag-line',    d.tagLine);
  setText('.tag-avail',   d.availability);

  const nameLines = document.querySelectorAll('.name-line');
  if (nameLines[0]) nameLines[0].textContent = d.firstName;
  if (nameLines[1]) nameLines[1].textContent = d.lastName;

  setText('.about-role', d.role);

  const metaEl = document.querySelector('.about-meta');
  if (metaEl) {
    metaEl.innerHTML = d.meta.map((item, i) =>
      `<span class="meta-item">${item}</span>${
        i < d.meta.length - 1 ? '<span class="meta-sep">·</span>' : ''
      }`
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
    const tagClass = entry.tagClass
      ? `log-tag log-tag--${entry.tagClass}`
      : 'log-tag';
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
      `<span class="brand-name">${name}</span>${
        i < d.brands.length - 1 ? '<span class="brand-dot"></span>' : ''
      }`
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

  const tagsHTML = d.tools.tags.map(tag =>
    `<span>${tag}</span>`
  ).join('');

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
      `<a href="${link.href}"
          class="modal-link"
          ${link.external ? 'target="_blank" rel="noopener"' : ''}
        >
        <span class="modal-link-icon">${link.icon}</span>
        <span>${link.label}</span>
      </a>`
    ).join('');
  }
}

function renderBuySection() {
  const d = SITE_DATA.buy.section;

  setText('.buy-num', d.num);

  const buyHeadline = document.querySelector('.buy-headline');
  if (buyHeadline) {
    buyHeadline.innerHTML = d.headline
      .map((line, i) =>
        i === d.headline.length - 1 ? `<span>${line}</span>` : line
      )
      .join('<br>');
  }

  setText('.buy-price-num',  d.price);
  setText('.buy-price-note', d.priceNote);

  const ctaBtn = document.querySelector('.btn-buy-cta');
  if (ctaBtn) ctaBtn.textContent = d.ctaText;

  setText('.buy-right-label', d.featuresLabel);

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

function renderBuyModal() {
  const d   = SITE_DATA.buy.modal;
  const box = document.getElementById('buyModal');
  if (!box) return;

  const q = sel => box.querySelector(sel);

  const eyebrow   = q('.modal-eyebrow');
  const price     = q('.buy-modal-price');
  const priceNote = q('.buy-modal-price-note');
  const title     = q('.modal-title');
  const features  = q('.buy-modal-features');
  const cta       = q('.buy-modal-cta');
  const note      = q('.buy-modal-note');

  if (eyebrow)   eyebrow.textContent   = d.eyebrow;
  if (price)     price.textContent     = d.price;
  if (priceNote) priceNote.textContent = d.priceNote;
  if (title)     title.textContent     = d.title;

  if (features) {
    features.innerHTML = d.features.map(f =>
      `<li class="buy-modal-feature">
        <span class="buy-modal-feature-check">&#x2713;</span>
        <span>${f}</span>
      </li>`
    ).join('');
  }

  if (cta) {
    cta.textContent = d.cta.text;
    cta.setAttribute('href', d.cta.href);
    if (d.cta.external) {
      cta.setAttribute('target', '_blank');
      cta.setAttribute('rel', 'noopener noreferrer');
    }
  }

  if (note) note.textContent = d.note;
}

function renderSectionHeader(sectionId, s) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const header = section.querySelector('.section-header');
  if (!header) return;

  const numEl  = header.querySelector('.section-num');
  const titleEl = header.querySelector('.section-title');
  const subEl  = header.querySelector('.section-sub');

  if (numEl)   numEl.textContent   = s.num;
  if (titleEl) titleEl.textContent = s.title;
  if (subEl)   subEl.textContent   = s.sub;
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
  renderBuyModal();
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

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnTalk) {
    btnTalk.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  const buyModal      = document.getElementById('buyModal');
  const buyModalClose = document.getElementById('buyModalClose');
  const btnBuyCta     = document.querySelector('.btn-buy-cta');

  function openBuyModal() {
    if (!buyModal) return;
    buyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBuyModal() {
    if (!buyModal) return;
    buyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnBuyCta)     btnBuyCta.addEventListener('click', openBuyModal);
  if (buyModalClose) buyModalClose.addEventListener('click', closeBuyModal);

  if (buyModal) {
    buyModal.addEventListener('click', e => {
      if (e.target === buyModal) closeBuyModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal    && modal.classList.contains('active'))    closeModal();
    if (buyModal && buyModal.classList.contains('active')) closeBuyModal();
  });

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

  const statsSection = document.getElementById('stats');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = document.querySelectorAll('.stat-num');
        statNums.forEach((el, i) => setTimeout(() => animateCounter(el), i * 120));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  if (statsSection) statsObserver.observe(statsSection);

  const skillSection = document.getElementById('skill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillFills = document.querySelectorAll('.skill-fill');
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
  document.querySelectorAll('.buy-feature-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 40}ms`;
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

  console.log(
    '%cFoliOpus Pro — powered by SITE_DATA',
    'color:#c9a84c;font-weight:bold;font-size:13px;'
  );
  console.log(
    '%cEdit SITE_DATA di bagian atas script.js untuk mengubah seluruh konten.',
    'color:#7a7570;font-size:11px;'
  );

});
