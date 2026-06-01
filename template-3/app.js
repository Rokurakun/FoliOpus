/* ═══════════════════════════════════════════════════
   FOLILOPUS PREMIUM — Creative Studio JS
   All data, interactions, animations, and dynamic
   content managed here. Edit data objects to update
   the entire site without touching HTML/CSS.
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   SITE DATA — edit this section only!
───────────────────────────────────────── */
const SITE_DATA = {
  owner: {
    name: "Adhiem Nabil Maulana",
    tagline: "Crafting visual worlds where\nideas breathe and brands come alive.",
    location: "Makassar, Indonesia",
    timezone: "Asia/Makassar", // WIB = UTC+8
    avatar: "AN",
    bio: [
      "I'm a Creative Studio designer obsessed with the space between strategy and aesthetics. Every pixel I place carries intention. Every layout I build tells a story before a single word is read.",
      "With years of experience across branding, UI/UX, and digital storytelling, I bring the relentless work ethic of a craftsman and the instinct of a creative director — turning your vision into something people remember.",
    ],
    social: {
      email: "adhiemkeren999@gmail.com",
      linkedin: "https://linkedin.com/in/adhiemkeren",
      discord: "https://discord.gg/creativestudio",
      instagram: "https://instagram.com/aria.novera",
    },
  },

  achievements: {
    title: "Achievements & Recognition",
    subtitle: "Track Record",
    stats: [
      { num: "120+", label: "Projects Done" },
      { num: "98%",  label: "Client Satisfied" },
      { num: "4yr",  label: "Experience" },
    ],
    body: [
      "🏆 Winner — Asia Creative Design Awards 2023 (UI/UX Category)",
      "🌟 Featured in 'Top 50 Rising Designers' by DesignMag Indonesia",
      "🎓 Certified Google UX Designer & Adobe Creative Expert",
      "📦 Delivered 120+ projects across 15 countries without missing a single deadline",
      "💼 Trusted by startups, Fortune 500 agencies, and solo founders alike",
      "🚀 Average client retention rate: 87% — they always come back",
    ],
    badges: ["UI/UX", "Branding", "Motion", "Illustration", "Strategy", "Consulting"],
  },

  projects: [
    {
      id: "p1",
      tag: "Brand Identity",
      name: "Lumina Coffee Co.",
      desc: "Full visual identity system for an artisanal coffee brand entering international markets — from logo to packaging to digital touchpoints.",
      gradient: "linear-gradient(135deg, #7FFFD4 0%, #0ABFBC 100%)",
      emoji: "☕",
      dialog: {
        title: "Lumina Coffee Co.",
        subtitle: "Brand Identity · 2024",
        body: [
          "Lumina needed more than a logo. They needed a language — one that spoke warmth, precision, and craft simultaneously. We built a visual ecosystem that lives across 40+ touchpoints.",
          "Starting from a monochromatic color study, we evolved the palette into a rich amber-and-cream signature that photographs beautifully on any surface.",
          "Deliverables included: full brand guidelines (68 pages), packaging design (6 SKUs), social media template kit (24 templates), and a responsive landing page.",
        ],
        badges: ["Logo Design", "Packaging", "Guidelines", "Web", "Typography"],
        stats: [
          { num: "68", label: "Pages of Guidelines" },
          { num: "6",  label: "Packaging SKUs" },
          { num: "3",  label: "Months of Work" },
        ],
      },
    },
    {
      id: "p2",
      tag: "UI/UX Design",
      name: "Vaultify Finance App",
      desc: "End-to-end UX design for a fintech app targeting Gen-Z investors. Designed from research to high-fidelity prototype with full design system.",
      gradient: "linear-gradient(135deg, #43B29D 0%, #0D2B27 100%)",
      emoji: "💳",
      dialog: {
        title: "Vaultify Finance",
        subtitle: "UI/UX · Mobile App · 2024",
        body: [
          "Fintech design is brutal — you're designing for trust, speed, and clarity all at once, with users who will abandon the app if a single flow feels off.",
          "We ran 28 user interviews, 3 rounds of usability testing, and iterated through 12 major design versions before reaching a product that converted at 34% above industry average.",
          "The final design system contains 210+ components, covers 6 platforms, and is handed off with developer-ready Figma specs.",
        ],
        badges: ["Research", "Wireframes", "Prototyping", "Design System", "Handoff"],
        stats: [
          { num: "28", label: "User Interviews" },
          { num: "210", label: "Components" },
          { num: "+34%", label: "Conversion Lift" },
        ],
      },
    },
    {
      id: "p3",
      tag: "Motion & Web",
      name: "Nexus Studio Reel",
      desc: "Animated brand motion reel and interactive web showcase for a creative production house. Full end-to-end creative direction.",
      gradient: "linear-gradient(135deg, #C8EDE7 0%, #7FFFD4 100%)",
      emoji: "🎬",
      dialog: {
        title: "Nexus Studio Reel",
        subtitle: "Motion Design · Web · 2023",
        body: [
          "When Nexus Studio needed to attract high-budget clients, they needed a digital presence that matched the quality of their production work. Still frames weren't going to cut it.",
          "We directed and animated a 90-second brand reel that's been played over 2.1 million times. The interactive website rebuilt their entire client funnel from scratch.",
          "The project won a Webby Honoree mention and was featured in Awwwards' Site of the Day.",
        ],
        badges: ["Motion Design", "3D", "Web Dev", "Creative Direction", "Storyboard"],
        stats: [
          { num: "2.1M", label: "Reel Views" },
          { num: "90s",  label: "Brand Film" },
          { num: "1",    label: "Webby Honoree" },
        ],
      },
    },
    {
      id: "p4",
      tag: "Design System",
      name: "Orbit Design System",
      desc: "Built a scalable, accessible design system for a SaaS platform serving 200,000+ enterprise users across 8 product teams.",
      gradient: "linear-gradient(135deg, #0ABFBC 0%, #43B29D 100%)",
      emoji: "🔮",
      dialog: {
        title: "Orbit Design System",
        subtitle: "Design System · SaaS · 2023",
        body: [
          "Orbit wasn't just a component library — it was a shared design language for 8 product teams who previously shipped inconsistent UIs that confused users and slowed engineers.",
          "Over 6 months, we audited 4,200 existing UI states, rationalized them into 186 components, and built documentation so thorough that onboarding time for new designers dropped by 60%.",
          "The system now governs every pixel in a product used daily by 200,000+ enterprise professionals.",
        ],
        badges: ["Figma", "Tokens", "Accessibility", "Documentation", "Components"],
        stats: [
          { num: "186",  label: "Components" },
          { num: "200K", label: "Active Users" },
          { num: "-60%", label: "Onboard Time" },
        ],
      },
    },
  ],

  buildItems: [
    {
      title: "Brand Identity Systems",
      desc: "From logo mark to motion guidelines, I build brand systems that are both timeless and trend-aware. Every element is intentional — nothing is decoration. I've built identity systems for startups, scale-ups, and cultural institutions.",
    },
    {
      title: "UI/UX Design & Prototyping",
      desc: "Research-first design: I conduct user interviews, synthesize findings into design decisions, and prototype with precision. My handoffs are so thorough developers finish implementation 40% faster.",
    },
    {
      title: "Motion Design & Animation",
      desc: "Motion is memory. I design animations that reinforce brand character — not just decoration, but communication. From micro-interactions to full brand films, I make things move with purpose.",
    },
    {
      title: "Digital Illustration & Art Direction",
      desc: "Custom illustration is the ultimate brand differentiator. I create bespoke illustration styles, icon sets, and editorial artwork that make your brand unmistakably yours.",
    },
    {
      title: "Creative Strategy & Consulting",
      desc: "Sometimes you don't need more pixels — you need clearer thinking. I offer creative strategy sessions for teams stuck on positioning, visual direction, or product storytelling.",
    },
    {
      title: "Web Design & Interactive Experiences",
      desc: "I design websites that work as hard as they look beautiful. From landing pages to full marketing sites, I balance conversion goals with aesthetic excellence.",
    },
  ],

  tools: {
    left: {
      title: "Design & Visual",
      items: [
        { icon: "🎨", name: "Figma", type: "Primary Tool" },
        { icon: "✨", name: "Adobe Illustrator", type: "Vector" },
        { icon: "📸", name: "Adobe Photoshop", type: "Raster" },
        { icon: "🎬", name: "After Effects", type: "Motion" },
        { icon: "🖼️", name: "Framer", type: "Web Prototyping" },
        { icon: "🎭", name: "Spline", type: "3D Design" },
      ],
    },
    right: {
      title: "Workflow & Strategy",
      items: [
        { icon: "📋", name: "Notion", type: "Documentation" },
        { icon: "🔄", name: "Linear", type: "Project Mgmt" },
        { icon: "💬", name: "Slack", type: "Communication" },
        { icon: "🧠", name: "Miro", type: "Ideation" },
        { icon: "🎯", name: "Maze", type: "User Testing" },
        { icon: "📊", name: "Hotjar", type: "Analytics" },
      ],
    },
  },

  capabilities: [
    {
      icon: "🧠",
      title: "Design Thinking",
      desc: "I approach every brief as a problem to solve — not a canvas to fill. Deep empathy for the end user, obsessive attention to business goals.",
    },
    {
      icon: "⚡",
      title: "Fast & Precise Delivery",
      desc: "Deadlines are non-negotiable. I've never missed one. My process is refined to produce maximum quality in minimum time without cutting corners.",
    },
    {
      icon: "🌐",
      title: "Cross-Platform Expertise",
      desc: "Web, mobile, tablet, print, motion — I design once and think across every context from day one. No reinterpretation tax.",
    },
    {
      icon: "🎯",
      title: "Conversion-Aware Design",
      desc: "Beautiful is non-negotiable, but beautiful and ineffective is a failure. I design with conversion metrics in mind without sacrificing aesthetics.",
    },
    {
      icon: "🤝",
      title: "Collaborative by Nature",
      desc: "I integrate seamlessly into product teams, agencies, or solo founder setups. No ego, just craft. Your success is the scorecard.",
    },
    {
      icon: "🔬",
      title: "Research & Validation",
      desc: "I don't guess — I test. From guerrilla usability sessions to structured A/B frameworks, my decisions are backed by evidence, not assumption.",
    },
  ],
};

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let introDismissed = false;
let dragStartY = null;
let dragCurrentY = null;
let isDragging = false;

/* ─────────────────────────────────────────
   DOM REFS
───────────────────────────────────────── */
const introScreen   = document.getElementById('intro');
const dragOverlay   = document.getElementById('dragOverlay');
const mainPortfolio = document.getElementById('mainPortfolio');
const mainNav       = document.getElementById('mainNav');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogContent = document.getElementById('dialogContent');
const dialogClose   = document.getElementById('dialogClose');
const navHamburger  = document.getElementById('navHamburger');
const mobileMenu    = document.getElementById('mobileMenu');

/* ─────────────────────────────────────────
   POPULATE INTRO FROM DATA
───────────────────────────────────────── */
function populateIntro() {
  const nameEl    = document.getElementById('intro-name');
  const taglineEl = document.getElementById('intro-tagline');
  if (nameEl) nameEl.textContent = SITE_DATA.owner.name;
  if (taglineEl) taglineEl.innerHTML = SITE_DATA.owner.tagline.replace('\n', '<br>');

  // Intro buttons scroll
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

/* ─────────────────────────────────────────
   DISMISS INTRO (drag up to enter)
───────────────────────────────────────── */
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

/* Drag logic */
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
    if (delta > 80) {
      introScreen.style.opacity = 1 - (delta - 80) / 200;
    }
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
    introScreen.style.opacity = '';
  }
  dragStartY = null;
  dragCurrentY = null;
}

dragOverlay.addEventListener('mousedown', handleDragStart);
dragOverlay.addEventListener('touchstart', handleDragStart, { passive: false });
window.addEventListener('mousemove', handleDragMove);
window.addEventListener('touchmove', handleDragMove, { passive: false });
window.addEventListener('mouseup', handleDragEnd);
window.addEventListener('touchend', handleDragEnd);

/* Scroll from bottom = also trigger dismiss */
window.addEventListener('wheel', (e) => {
  if (introDismissed) return;
  if (e.deltaY > 40) dismissIntro();
}, { passive: true });

/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
function initCursor() {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
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

/* ─────────────────────────────────────────
   LOCAL TIME (WIB)
───────────────────────────────────────── */
function updateTime() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const now = new Date();
  const opts = { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  el.textContent = new Intl.DateTimeFormat('en-GB', opts).format(now) + ' WIB';
}

function initClock() {
  const locEl = document.getElementById('meta-location');
  if (locEl) locEl.textContent = SITE_DATA.owner.location;
  updateTime();
  setInterval(updateTime, 1000);
}

/* ─────────────────────────────────────────
   FOOTER YEAR
───────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = `© ${new Date().getFullYear()}`;
}

/* ─────────────────────────────────────────
   DIALOG HELPERS
───────────────────────────────────────── */
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
dialogOverlay.addEventListener('click', (e) => {
  if (e.target === dialogOverlay) closeDialog();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDialog();
});

function buildDialogHTML(d) {
  const statsHTML = d.stats
    ? `<div class="dialog-stat-row">${d.stats.map(s =>
        `<div class="dialog-stat">
          <span class="dialog-stat-num">${s.num}</span>
          <span class="dialog-stat-label">${s.label}</span>
        </div>`).join('')}
       </div>` : '';

  const badgesHTML = d.badges
    ? `<div class="dialog-badge-row">${d.badges.map(b =>
        `<span class="dialog-badge">${b}</span>`).join('')}
       </div>` : '';

  const bodyHTML = Array.isArray(d.body)
    ? d.body.map(line => {
        if (d === SITE_DATA.achievements) {
          return `<p>${line}</p>`;
        }
        return `<p>${line}</p>`;
      }).join('')
    : `<p>${d.body}</p>`;

  return `
    <h3>${d.title}</h3>
    <p class="dialog-sub">${d.subtitle || ''}</p>
    ${statsHTML}
    ${bodyHTML}
    ${badgesHTML}
  `;
}

/* ─────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────── */
function initAbout() {
  const heading = document.querySelector('.about-heading');
  const bioEls  = document.querySelectorAll('.about-bio');
  // update bio from data
  if (bioEls.length >= 2) {
    bioEls[0].textContent = SITE_DATA.owner.bio[0];
    bioEls[1].textContent = SITE_DATA.owner.bio[1];
  }

  document.getElementById('openAchievements').addEventListener('click', () => {
    const d = SITE_DATA.achievements;
    const listHTML = d.body.map(line => `<p>${line}</p>`).join('');
    const statsHTML = `<div class="dialog-stat-row">${d.stats.map(s =>
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

/* ─────────────────────────────────────────
   PROJECTS
───────────────────────────────────────── */
function initProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

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

    card.addEventListener('click', () => {
      openDialog(buildDialogHTML(p.dialog));
    });

    grid.appendChild(card);
  });
}

/* ─────────────────────────────────────────
   BUILD / ACCORDION
───────────────────────────────────────── */
function initBuildAccordion() {
  const list = document.getElementById('buildAccordion');
  if (!list) return;

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
      // close all
      list.querySelectorAll('.accordion-item.open').forEach(x => x.classList.remove('open'));
      if (!isOpen) el.classList.add('open');
    });

    list.appendChild(el);
  });
}

/* ─────────────────────────────────────────
   TOOLS
───────────────────────────────────────── */
function initTools() {
  const container = document.getElementById('toolsSplit');
  if (!container) return;

  ['left', 'right'].forEach(side => {
    const box = SITE_DATA.tools[side];
    const div = document.createElement('div');
    div.className = 'tools-box reveal';

    const itemsHTML = box.items.map(t => `
      <div class="tool-item">
        <div class="tool-icon">${t.icon}</div>
        <span class="tool-name">${t.name}</span>
        <span class="tool-type">${t.type}</span>
      </div>
    `).join('');

    div.innerHTML = `
      <p class="tools-box-title">${box.title}</p>
      ${itemsHTML}
    `;

    container.appendChild(div);
  });
}

/* ─────────────────────────────────────────
   CAPABILITIES
───────────────────────────────────────── */
function initCapabilities() {
  const grid = document.getElementById('capGrid');
  if (!grid) return;

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

/* ─────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
───────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('in-view');
          // Project cards use their own animation class
          if (entry.target.classList.contains('project-card')) {
            entry.target.classList.add('revealed');
            entry.target.style.opacity = '';
            entry.target.style.transform = '';
          }
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  // Observe all reveal elements (re-query after DOM population)
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
  }, 200);
}

/* ─────────────────────────────────────────
   NAV HAMBURGER
───────────────────────────────────────── */
function initNav() {
  let menuOpen = false;
  navHamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = navHamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      navHamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ─────────────────────────────────────────
   NAV ACTIVE STATE ON SCROLL
───────────────────────────────────────── */
function initNavActiveState() {
  const sections = document.querySelectorAll('.section');
  const links = document.querySelectorAll('.nav-link:not(.nav-buy)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 120) current = section.id;
    });

    links.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--tiffany)';
      } else {
        link.style.color = '';
      }
    });
  }, { passive: true });
}

/* ─────────────────────────────────────────
   FOOTER SOCIAL LINKS UPDATE FROM DATA
───────────────────────────────────────── */
function updateSocialLinks() {
  const links = document.querySelectorAll('.footer-link');
  // We match by text content
  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    if (text.includes('email')) link.href = `mailto:${SITE_DATA.owner.social.email}`;
    if (text.includes('linkedin')) link.href = SITE_DATA.owner.social.linkedin;
    if (text.includes('discord')) link.href = SITE_DATA.owner.social.discord;
    if (text.includes('instagram')) link.href = SITE_DATA.owner.social.instagram;
  });
}

/* ─────────────────────────────────────────
   INTRO BUTTON DATA BRIDGE
───────────────────────────────────────── */
function updateNavLogo() {
  const logo = document.getElementById('nav-logo');
  if (logo) {
    const firstName = SITE_DATA.owner.name.split(' ')[0];
    logo.innerHTML = `${firstName}<span>.</span>`;
  }
}

/* ─────────────────────────────────────────
   SMOOTH ANCHOR SCROLL + OFFSET FOR NAV
───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────
   NAV LINK: "Beli Sekarang" PULSING EFFECT
───────────────────────────────────────── */
function initBuyPulse() {
  const buyBtn = document.getElementById('nav-buy');
  if (!buyBtn) return;
  setInterval(() => {
    buyBtn.style.boxShadow = '0 0 0 0 rgba(10,191,188,0.5)';
    buyBtn.animate([
      { boxShadow: '0 0 0 0 rgba(10,191,188,0.5)' },
      { boxShadow: '0 0 0 10px rgba(10,191,188,0)' }
    ], { duration: 1200, easing: 'ease-out', fill: 'forwards' });
  }, 3000);
}

/* ─────────────────────────────────────────
   BOOT — run everything
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  populateIntro();
  initClock();
  setFooterYear();
  updateNavLogo();

  // Build all dynamic sections
  initAbout();
  initProjects();
  initBuildAccordion();
  initTools();
  initCapabilities();
  updateSocialLinks();

  // Interactions
  initNav();
  initNavActiveState();
  initSmoothScroll();
  initScrollReveal();
  initBuyPulse();

  console.log('%cFoliOpus Premium — Creative Studio', 'color:#0ABFBC;font-size:14px;font-weight:bold;');
  console.log('%cTo edit content, open app.js and modify SITE_DATA at the top.', 'color:#43B29D;font-size:11px;');
});
