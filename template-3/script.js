let introDismissed = false;
let dragStartY = null;
let dragCurrentY = null;
let isDragging = false;

const introScreen   = document.getElementById('intro');
const dragOverlay   = document.getElementById('dragOverlay');
const mainPortfolio = document.getElementById('mainPortfolio');
const mainNav       = document.getElementById('mainNav');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogContent = document.getElementById('dialogContent');
const dialogClose   = document.getElementById('dialogClose');
const navHamburger  = document.getElementById('navHamburger');
const mobileMenu    = document.getElementById('mobileMenu');

function renderMeta() {
  document.title = SITE_DATA.meta.title;
}

function populateIntro() {
  const eyebrowEl = document.getElementById('intro-eyebrow');
  const nameEl    = document.getElementById('intro-name');
  const taglineEl = document.getElementById('intro-tagline');
  if (eyebrowEl) eyebrowEl.textContent = SITE_DATA.intro.eyebrow;
  if (nameEl)    nameEl.textContent    = SITE_DATA.owner.name;
  if (taglineEl) taglineEl.innerHTML   = SITE_DATA.owner.tagline.replace(/\n/g, '<br>');
}

function updateNavLogo() {
  const logo = document.getElementById('nav-logo');
  if (logo) {
    const firstName = SITE_DATA.owner.name.split(' ')[0];
    logo.innerHTML = `${firstName}<span>.</span>`;
  }
}

function renderNav() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const linksHTML = SITE_DATA.nav.links.map(l =>
      `<a href="${l.href}" class="nav-link">${l.label}</a>`
    ).join('');
    navLinks.innerHTML = linksHTML
  }

  const mob = document.getElementById('mobileMenu');
  if (mob) {
    mob.innerHTML = SITE_DATA.nav.links.map(l =>
      `<a href="${l.href}" class="mobile-link">${l.label}</a>`
    ).join('')
  }
}

function renderSectionHeaders() {
  const s = SITE_DATA.sections;
  const aboutLabel = document.querySelector('#about .section-label');
  if (aboutLabel) aboutLabel.textContent = s.about.label;

  const aboutHeading = document.querySelector('#about .about-heading');
  if (aboutHeading) {
    const lines = s.about.heading.split('\n');
    aboutHeading.innerHTML = lines.map((line, i) =>
      i === lines.length - 1 ? `<em>${line}</em>` : line
    ).join('<br>');
  }

  const achievBtn = document.getElementById('openAchievements');
  if (achievBtn) achievBtn.textContent = s.about.achievementsBtn;

  const projectLabel = document.querySelector('#project .section-label');
  if (projectLabel) projectLabel.textContent = s.project.label;
  const projectTitle = document.querySelector('#project .section-title');
  if (projectTitle) projectTitle.innerHTML = `${s.project.title}<br><em>${s.project.titleEm}</em>`;

  const expLabel = document.querySelector('#experience .section-label');
  if (expLabel) expLabel.textContent = s.experience.label;
  const expTitle = document.querySelector('#experience .section-title');
  if (expTitle) {
    const lines = s.experience.title.split('\n');
    expTitle.innerHTML = lines.join('<br>') + ` <em>${s.experience.titleEm}</em>`;
  }

  const toolsLabel = document.querySelector('#tools .section-label');
  if (toolsLabel) toolsLabel.textContent = s.tools.label;
  const toolsTitle = document.querySelector('#tools .section-title');
  if (toolsTitle) {
    const lines = s.tools.title.split('\n');
    toolsTitle.innerHTML = lines.join('<br>') + ` <em>${s.tools.titleEm}</em>`;
  }

  const capLabel = document.querySelector('#capabilities .section-label');
  if (capLabel) capLabel.textContent = s.capabilities.label;
  const capTitle = document.querySelector('#capabilities .section-title');
  if (capTitle) {
    const lines = s.capabilities.title.split('\n');
    capTitle.innerHTML = lines.join('<br>') + ` <em>${s.capabilities.titleEm}</em>`;
  }

  const contactLabel = document.querySelector('#contact .section-label');
  if (contactLabel) contactLabel.textContent = s.contact.label;
  const contactHeading = document.querySelector('.contact-big');
  if (contactHeading) {
    const lines = s.contact.heading.split('\n');
    contactHeading.innerHTML = lines.map((line, i) =>
      i === lines.length - 1 ? `<em>${line}</em>` : line
    ).join('<br>');
  }
  const contactSub = document.querySelector('.contact-sub');
  if (contactSub) contactSub.innerHTML = s.contact.sub.replace(/\n/g, '<br>');
}

function renderFooter() {
  const f = SITE_DATA.footer;

  const sitemapTitle = document.querySelector('.footer-col:nth-child(1) .footer-col-title');
  if (sitemapTitle) sitemapTitle.textContent = f.sitemapTitle;

  const sitemapCol = document.querySelector('.footer-col:nth-child(1)');
  if (sitemapCol) {
    const title = sitemapCol.querySelector('.footer-col-title').outerHTML;
    sitemapCol.innerHTML = title + SITE_DATA.nav.links.map(l =>
      `<a href="${l.href}" class="footer-link">${l.label}</a>`
    ).join('');
  }

  const socialTitle = document.querySelector('.footer-col:nth-child(2) .footer-col-title');
  if (socialTitle) socialTitle.textContent = f.socialTitle;

  const studioTitle = document.querySelector('.footer-col:nth-child(3) .footer-col-title');
  if (studioTitle) studioTitle.textContent = f.studioTitle;

  const studioCol = document.querySelector('.footer-col:nth-child(3)');
  if (studioCol) {
    const title = studioCol.querySelector('.footer-col-title').outerHTML;
    const yearId = `<p class="footer-text" id="footer-year">© ${new Date().getFullYear()}</p>`;
    studioCol.innerHTML = title
      + f.studioLines.map(l => `<p class="footer-text">${l}</p>`).join('')
      + yearId;
  }
}

function updateOwnerMeta() {
  const avatarEl = document.querySelector('.avatar-placeholder');
  if (avatarEl) avatarEl.textContent = SITE_DATA.owner.avatar;

  const locEl = document.getElementById('meta-location');
  if (locEl) locEl.textContent = SITE_DATA.owner.location;
}

function initAbout() {
  const bioEls = document.querySelectorAll('.about-bio');
  SITE_DATA.owner.bio.forEach((text, i) => {
    if (bioEls[i]) bioEls[i].textContent = text;
  });
}

function bindAchievementsBtn() {
  const btn = document.getElementById('openAchievements');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const d = SITE_DATA.achievements;
    const listHTML   = d.body.map(line => `<p>${line}</p>`).join('');
    const statsHTML  = `<div class="dialog-stat-row">${d.stats.map(s =>
      `<div class="dialog-stat">
        <span class="dialog-stat-num">${s.num}</span>
        <span class="dialog-stat-label">${s.label}</span>
      </div>`).join('')}</div>`;
    const badgesHTML = `<div class="dialog-badge-row">${d.badges.map(b =>
      `<span class="dialog-badge">${b}</span>`).join('')}</div>`;
    openDialog(`
      <h3>${d.title}</h3>
      <p class="dialog-sub">${d.subtitle}</p>
      ${statsHTML}
      ${listHTML}
      ${badgesHTML}
    `);
  });
}

function initProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SITE_DATA.projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.delay = i * 120;
    card.innerHTML = `
      <div class="project-card-inner">
        <div class="project-thumb">
          <div class="project-thumb-bg" style="background:${p.gradient}; display:flex; align-items:center; justify-content:center;">
            <span style="font-size:3.5rem;">${p.emoji}</span>
          </div>
        </div>
        <div class="project-info">
          <div>
            <p class="project-tag">${p.tag}</p>
            <h3 class="project-name">${p.name}</h3>
            <p class="project-desc">${p.desc}</p>
          </div>
          <span class="project-cta">View Case Study →</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDialog(buildDialogHTML(p.dialog)));
    grid.appendChild(card);
  });
}

function initBuildAccordion() {
  const list = document.getElementById('buildAccordion');
  if (!list) return;
  list.innerHTML = '';
  SITE_DATA.buildItems.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'accordion-item reveal';
    el.dataset.delay = i * 80;
    el.innerHTML = `
      <button class="accordion-header">
        <span>
          <span class="accordion-num">0${i + 1}</span>
          <span class="accordion-title">${item.title}</span>
        </span>
        <span class="accordion-arrow">+</span>
      </button>
      <div class="accordion-body">
        <div class="accordion-body-inner">${item.desc}</div>
      </div>
    `;
    el.querySelector('.accordion-header').addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      list.querySelectorAll('.accordion-item.open').forEach(x => x.classList.remove('open'));
      if (!isOpen) el.classList.add('open');
    });
    list.appendChild(el);
  });
}

function initTools() {
  const container = document.getElementById('toolsSplit');
  if (!container) return;
  container.innerHTML = '';
  ['left', 'right'].forEach(side => {
    const box = SITE_DATA.tools[side];
    const div = document.createElement('div');
    div.className = 'tools-box reveal';
    div.innerHTML = `
      <p class="tools-box-title">${box.title}</p>
      ${box.items.map(t => `
        <div class="tool-item">
          <div class="tool-icon">${t.icon}</div>
          <span class="tool-name">${t.name}</span>
          <span class="tool-type">${t.type}</span>
        </div>
      `).join('')}
    `;
    container.appendChild(div);
  });
}

function initCapabilities() {
  const grid = document.getElementById('capGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SITE_DATA.capabilities.forEach((cap, i) => {
    const card = document.createElement('div');
    card.className = 'cap-card reveal';
    card.dataset.delay = i * 80;
    card.innerHTML = `
      <div class="cap-icon">${cap.icon}</div>
      <h4 class="cap-title">${cap.title}</h4>
      <p class="cap-desc">${cap.desc}</p>
    `;
    grid.appendChild(card);
  });
}

function updateSocialLinks() {
  const links = document.querySelectorAll('.footer-link');
  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    if (text.includes('email'))     link.href = `mailto:${SITE_DATA.owner.social.email}`;
    if (text.includes('linkedin'))  link.href = SITE_DATA.owner.social.linkedin;
    if (text.includes('discord'))   link.href = SITE_DATA.owner.social.discord;
    if (text.includes('instagram')) link.href = SITE_DATA.owner.social.instagram;
  });
}

function renderAllData() {
  renderMeta();
  populateIntro();
  updateNavLogo();
  renderNav();
  renderSectionHeaders();
  updateOwnerMeta();
  initAbout();
  initProjects();
  initBuildAccordion();
  initTools();
  initCapabilities();
  renderFooter();
  updateSocialLinks();
}

function initIntroEvents() {
  document.querySelectorAll('.intro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      dismissIntro(() => {
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      });
    });
  });
}

function dismissIntro(cb) {
  if (introDismissed) return;
  introDismissed = true;
  introScreen.classList.add('dismissed');
  mainPortfolio.classList.remove('hidden');
  mainPortfolio.classList.add('visible');
  setTimeout(() => {
    mainNav.classList.add('visible');
    if (cb) cb();
  }, 600);
}

function handleDragStart(e) {
  dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
  isDragging = true;
  introScreen.classList.add('dragging');
}

function handleDragMove(e) {
  if (!isDragging) return;
  dragCurrentY = e.touches ? e.touches[0].clientY : e.clientY;
  const delta = dragStartY - dragCurrentY;
  if (delta > 0) {
    const clamped = Math.min(delta, window.innerHeight);
    introScreen.style.transform = `translateY(-${clamped}px)`;
    if (delta > 80) introScreen.style.opacity = 1 - (delta - 80) / 200;
  }
  e.preventDefault();
}

function handleDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  introScreen.classList.remove('dragging');
  const delta = dragStartY - (dragCurrentY || dragStartY);
  if (delta > window.innerHeight * 0.22) {
    dismissIntro();
  } else {
    introScreen.style.transform = '';
    introScreen.style.opacity   = '';
  }
  dragStartY   = null;
  dragCurrentY = null;
}

dragOverlay.addEventListener('mousedown',  handleDragStart);
dragOverlay.addEventListener('touchstart', handleDragStart, { passive: false });
window.addEventListener('mousemove',  handleDragMove);
window.addEventListener('touchmove',  handleDragMove, { passive: false });
window.addEventListener('mouseup',    handleDragEnd);
window.addEventListener('touchend',   handleDragEnd);

window.addEventListener('wheel', (e) => {
  if (introDismissed) return;
  if (e.deltaY > 40) dismissIntro();
}, { passive: true });

function initCursor() {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

function updateTime() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const opts = { timeZone: SITE_DATA.owner.timezone || 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  try {
    el.textContent = new Intl.DateTimeFormat('en-GB', opts).format(new Date()) + ' WIB';
  } catch(e) {
    el.textContent = '00:00:00 WIB';
  }
}

function initClock() {
  updateTime();
  setInterval(updateTime, 1000);
}

function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = `© ${new Date().getFullYear()}`;
}

function openDialog(html) {
  dialogContent.innerHTML = html;
  dialogOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDialog() {
  dialogOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

dialogClose.addEventListener('click', closeDialog);
dialogOverlay.addEventListener('click', (e) => { if (e.target === dialogOverlay) closeDialog(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDialog(); });

function buildDialogHTML(d) {
  const statsHTML = d.stats && d.stats.length > 0
    ? `<div class="dialog-stat-row">${d.stats.map(s =>
        `<div class="dialog-stat">
          <span class="dialog-stat-num">${s.num}</span>
          <span class="dialog-stat-label">${s.label}</span>
        </div>`).join('')}</div>` : '';
  const badgesHTML = d.badges && d.badges.length > 0
    ? `<div class="dialog-badge-row">${d.badges.map(b =>
        `<span class="dialog-badge">${b}</span>`).join('')}</div>` : '';
  const bodyHTML = Array.isArray(d.body)
    ? d.body.map(line => `<p>${line}</p>`).join('')
    : `<p>${d.body}</p>`;
  return `<h3>${d.title || ''}</h3><p class="dialog-sub">${d.subtitle || ''}</p>${statsHTML}${bodyHTML}${badgesHTML}`;
}

function initNav() {
  let menuOpen = false;
  navHamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = navHamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      navHamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

function initNavActiveState() {
  const sections = document.querySelectorAll('.section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 120) current = section.id;
    });
    document.querySelectorAll('.nav-link:not(.nav-buy)').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = href === current ? 'var(--tiffany)' : '';
    });
  }, { passive: true });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('in-view');
          if (entry.target.classList.contains('project-card')) {
            entry.target.classList.add('revealed');
            entry.target.style.opacity   = '';
            entry.target.style.transform = '';
          }
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el));
    document.querySelectorAll('.project-card:not(.revealed)').forEach(el => observer.observe(el));
  }, 200);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
}

function initBuyPulse() {
  const buyBtn = document.getElementById('nav-buy');
  if (!buyBtn) return;
  setInterval(() => {
    buyBtn.animate([
      { boxShadow: '0 0 0 0 rgba(10,191,188,0.5)' },
      { boxShadow: '0 0 0 10px rgba(10,191,188,0)' }
    ], { duration: 1200, easing: 'ease-out', fill: 'forwards' });
  }, 3000);
}

const btnBuyCta = document.querySelector('.btn-primary');
if (btnBuyCta) {
  btnBuyCta.addEventListener('click', () => {
    let session = null;
    try { session = JSON.parse(localStorage.getItem('foliOpusUser')); } catch (_) {}
    if (session?.loggedIn) {
      window.location.href = '../payment.html?template=premium';
    } else {
      sessionStorage.setItem('foliOpusRedirect', '../payment.html?template=premium');
      window.location.href = '../login.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAllData();

  initCursor();
  initClock();
  setFooterYear();
  bindAchievementsBtn();
  initIntroEvents();
  initNav();
  initNavActiveState();
  initSmoothScroll();
  initScrollReveal();
  initBuyPulse();

  console.log('%cFoliOpus Premium — Creative Studio', 'color:#0ABFBC;font-size:14px;font-weight:bold;');
});

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_DATA') {
    window.SITE_DATA = event.data.payload;

    renderAllData();

    const newElements = document.querySelectorAll('.reveal:not(.in-view), .project-card:not(.revealed)');
    newElements.forEach(el => {
      el.classList.add('in-view');
      if (el.classList.contains('project-card')) el.classList.add('revealed');
      el.style.opacity       = '1';
      el.style.transform     = 'translateY(0) scale(1)';
      el.style.transitionDelay = '0ms';
    });
  }
});
