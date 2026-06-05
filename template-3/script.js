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
 
// ==========================================
// RENDER FUNCTIONS
// ==========================================
 
function populateIntro() {
  const nameEl    = document.getElementById('intro-name');
  const taglineEl = document.getElementById('intro-tagline');
  const eyebrowEl = document.getElementById('intro-eyebrow');
  if (nameEl)    nameEl.textContent   = SITE_DATA.owner.name;
  if (taglineEl) taglineEl.innerHTML  = SITE_DATA.owner.tagline.replace(/\n/g, '<br>');
  if (eyebrowEl) eyebrowEl.textContent = SITE_DATA.intro.eyebrow;
}
 
function updateNavLogo() {
  const logo = document.getElementById('nav-logo');
  if (logo) {
    const firstName = SITE_DATA.owner.name.split(' ')[0];
    logo.innerHTML = `${firstName}<span>.</span>`;
  }
}
 
function updateNav() {
  // Desktop nav links (semua kecuali tombol beli)
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const buyLink = navLinks.querySelector('.nav-buy');
    const buyHTML = buyLink ? buyLink.outerHTML : '';
    navLinks.innerHTML = SITE_DATA.nav.links.map(l =>
      `<a href="${l.href}" class="nav-link">${l.label}</a>`
    ).join('') + buyHTML;
  }
 
  // Mobile menu links (semua kecuali tombol beli)
  if (mobileMenu) {
    const buyLink = mobileMenu.querySelector('.mobile-buy');
    const buyHTML = buyLink ? buyLink.outerHTML : '';
    mobileMenu.innerHTML = SITE_DATA.nav.mobileLinks.map(l =>
      `<a href="${l.href}" class="mobile-link">${l.label}</a>`
    ).join('') + buyHTML;
  }
}
 
function updateOwnerMeta() {
  const avatarEl = document.querySelector('.avatar-placeholder');
  if (avatarEl) avatarEl.textContent = SITE_DATA.owner.avatar;
 
  const locEl = document.getElementById('meta-location');
  if (locEl) locEl.textContent = SITE_DATA.owner.location;
}
 
function renderSectionHeaders() {
  const s = SITE_DATA.sections;
 
  // Helper: render judul dengan satu kata/baris italic
  function buildTitle(lines, italicIndex, italicWord) {
    return lines.map((line, i) => {
      if (i !== italicIndex) return line;
      // Kalau ada italicWord tertentu, italic cuma kata itu
      if (italicWord) {
        return line.replace(italicWord, `<em>${italicWord}</em>`);
      }
      // Kalau tidak, italic seluruh baris
      return `<em>${line}</em>`;
    }).join('<br>');
  }
 
  // About
  const aboutLabel   = document.querySelector('#about .section-label');
  const aboutHeading = document.querySelector('#about .about-heading');
  if (aboutLabel)   aboutLabel.textContent = s.about.label;
  if (aboutHeading) {
    const lines = s.about.heading;
    aboutHeading.innerHTML = lines.map((line, i) =>
      i === s.about.headingItalicIndex ? `<em>${line}</em>` : line
    ).join('<br>');
  }
 
  // Project
  const projectLabel = document.querySelector('#project .section-label');
  const projectTitle = document.querySelector('#project .section-title');
  if (projectLabel) projectLabel.textContent = s.project.label;
  if (projectTitle) projectTitle.innerHTML = buildTitle(s.project.title, s.project.titleItalicIndex, null);
 
  // Experience
  const expLabel = document.querySelector('#experience .section-label');
  const expTitle = document.querySelector('#experience .section-title');
  if (expLabel) expLabel.textContent = s.experience.label;
  if (expTitle) expTitle.innerHTML   = buildTitle(s.experience.title, s.experience.titleItalicIndex, s.experience.titleItalicWord);
 
  // Tools
  const toolsLabel = document.querySelector('#tools .section-label');
  const toolsTitle = document.querySelector('#tools .section-title');
  if (toolsLabel) toolsLabel.textContent = s.tools.label;
  if (toolsTitle) toolsTitle.innerHTML   = buildTitle(s.tools.title, s.tools.titleItalicIndex, s.tools.titleItalicWord);
 
  // Capabilities
  const capLabel = document.querySelector('#capabilities .section-label');
  const capTitle = document.querySelector('#capabilities .section-title');
  if (capLabel) capLabel.textContent = s.capabilities.label;
  if (capTitle) capTitle.innerHTML   = buildTitle(s.capabilities.title, s.capabilities.titleItalicIndex, s.capabilities.titleItalicWord);
 
  // Contact
  const contactLabel = document.querySelector('#contact .section-label');
  const contactBig   = document.querySelector('#contact .contact-big');
  const contactSub   = document.querySelector('#contact .contact-sub');
  if (contactLabel) contactLabel.textContent = s.contact.label;
  if (contactBig) {
    const lines = s.contact.bigText;
    contactBig.innerHTML = lines.map((line, i) =>
      i === s.contact.bigItalicIndex ? `<em>${line}</em>` : line
    ).join('<br>');
  }
  if (contactSub) contactSub.innerHTML = s.contact.sub.replace(/\n/g, '<br>');
}
 
function initAbout() {
  const bioEls = document.querySelectorAll('.about-bio');
  SITE_DATA.owner.bio.forEach((text, i) => {
    if (bioEls[i]) bioEls[i].textContent = text;
  });
 
  const btn = document.getElementById('openAchievements');
  if (btn) btn.textContent = SITE_DATA.achievements.btnText;
}
 
function renderFooter() {
  const f = SITE_DATA.footer.cols;
 
  // Sitemap
  const sitemapTitle = document.querySelector('.footer-col:nth-child(1) .footer-col-title');
  const sitemapLinks = document.querySelector('.footer-col:nth-child(1)');
  if (sitemapTitle) sitemapTitle.textContent = f.sitemap.title;
  if (sitemapLinks) {
    sitemapLinks.innerHTML = `<p class="footer-col-title">${f.sitemap.title}</p>` +
      f.sitemap.links.map(l => `<a href="${l.href}" class="footer-link">${l.label}</a>`).join('');
  }
 
  // Social
  const socialLinks = document.querySelector('.footer-col:nth-child(2)');
  if (socialLinks) {
    socialLinks.innerHTML = `<p class="footer-col-title">${f.social.title}</p>` +
      f.social.links.map(l =>
        `<a href="${l.href}" class="footer-link"${l.external ? ' target="_blank" rel="noopener"' : ''}>${l.label}</a>`
      ).join('');
  }
 
  // Studio
  const studioCol = document.querySelector('.footer-col:nth-child(3)');
  if (studioCol) {
    const yearEl = studioCol.querySelector('#footer-year');
    const yearText = yearEl ? yearEl.outerHTML : `<p class="footer-text" id="footer-year">© ${new Date().getFullYear()}</p>`;
    studioCol.innerHTML = `
      <p class="footer-col-title">${f.studio.title}</p>
      <p class="footer-text">${f.studio.line1}</p>
      <p class="footer-text">${f.studio.line2}</p>
      ${yearText}
    `;
  }
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
          <span class="project-cta">${p.ctaText}</span>
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
  // Sync footer social links dari SITE_DATA.footer (sudah di-handle renderFooter)
  // Fungsi ini tetap ada untuk backward-compat jika ada elemen lain
}
 
function renderAllData() {
  populateIntro();
  updateNavLogo();
  updateNav();
  updateOwnerMeta();
  renderSectionHeaders();
  initAbout();
  initProjects();
  initBuildAccordion();
  initTools();
  initCapabilities();
  renderFooter();
}
 
// ==========================================
// INTRO & DRAG
// ==========================================
 
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
 
dragOverlay.addEventListener('mousedown', handleDragStart);
dragOverlay.addEventListener('touchstart', handleDragStart, { passive: false });
window.addEventListener('mousemove', handleDragMove);
window.addEventListener('touchmove', handleDragMove, { passive: false });
window.addEventListener('mouseup', handleDragEnd);
window.addEventListener('touchend', handleDragEnd);
window.addEventListener('wheel', (e) => {
  if (introDismissed) return;
  if (e.deltaY > 40) dismissIntro();
}, { passive: true });
 
// ==========================================
// CURSOR
// ==========================================
 
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
 
// ==========================================
// CLOCK
// ==========================================
 
function updateTime() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const opts = {
    timeZone: SITE_DATA.owner.timezone || 'Asia/Makassar',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  };
  try {
    el.textContent = new Intl.DateTimeFormat('en-GB', opts).format(new Date()) + ' WIB';
  } catch (e) {
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
 
// ==========================================
// DIALOG
// ==========================================
 
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
  const statsHTML = d.stats && d.stats.length
    ? `<div class="dialog-stat-row">${d.stats.map(s =>
        `<div class="dialog-stat">
          <span class="dialog-stat-num">${s.num}</span>
          <span class="dialog-stat-label">${s.label}</span>
        </div>`).join('')}</div>` : '';
 
  const badgesHTML = d.badges && d.badges.length
    ? `<div class="dialog-badge-row">${d.badges.map(b =>
        `<span class="dialog-badge">${b}</span>`).join('')}</div>` : '';
 
  const bodyHTML = Array.isArray(d.body)
    ? d.body.map(line => `<p>${line}</p>`).join('')
    : `<p>${d.body}</p>`;
 
  return `<h3>${d.title || ''}</h3><p class="dialog-sub">${d.subtitle || ''}</p>${statsHTML}${bodyHTML}${badgesHTML}`;
}
 
// ==========================================
// SCROLL REVEAL
// ==========================================
 
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
 
// ==========================================
// NAV
// ==========================================
 
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
  const links    = document.querySelectorAll('.nav-link:not(.nav-buy)');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 120) current = section.id;
    });
    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = href === current ? 'var(--tiffany)' : '';
    });
  }, { passive: true });
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
 
// ==========================================
// BUY BUTTON
// ==========================================
 
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
 
// ==========================================
// INIT
// ==========================================
 
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
 
// ==========================================
// ANTENA PENERIMA SINYAL DARI EDITOR
// ==========================================
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_DATA') {
    window.SITE_DATA = event.data.payload;
 
    renderAllData();
 
    // Bypass animasi biar langsung keliatan tanpa harus scroll
    const newElements = document.querySelectorAll('.reveal:not(.in-view), .project-card:not(.revealed)');
    newElements.forEach(el => {
      el.classList.add('in-view');
      if (el.classList.contains('project-card')) el.classList.add('revealed');
      el.style.opacity        = '1';
      el.style.transform      = 'translateY(0) scale(1)';
      el.style.transitionDelay = '0ms';
    });
  }
});