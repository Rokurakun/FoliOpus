'use strict';

/* ── Utilities ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatCurrency(n) {
  if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(1) + ' Jt';
  if (n >= 1_000) return 'Rp ' + (n / 1_000).toFixed(0) + ' Rb';
  return 'Rp ' + n;
}

function formatNumber(n) {
  return n >= 1_000 ? (n / 1_000).toFixed(1) + 'K' : String(n);
}

function formatDate(d) {
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function toast(msg, type = 'success') {
  const c = $('#toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-dot"></span>${msg}`;
  c.appendChild(t);
  setTimeout(() => {
    t.classList.add('toast-out');
    t.addEventListener('animationend', () => t.remove());
  }, 2800);
}

/* ── Topbar Date ── */
function initTopbarDate() {
  const el = $('#topbar-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

/* AUTH */

const AUTH = { user: 'admin', pass: 'admin123' };

function initLogin() {
  const form     = $('#login-form');
  const errEl    = $('#login-error');
  const btnText  = $('#btn-login-text');
  const spinner  = $('#btn-login-spinner');
  const togglePW = $('#toggle-pw');
  const pwInput  = $('#password');

  togglePW.addEventListener('click', () => {
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    $('#eye-icon').innerHTML = show
      ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>`
      : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errEl.textContent = '';
    const u = $('#username').value.trim();
    const p = pwInput.value;

    if (!u || !p) { errEl.textContent = 'Username dan password wajib diisi.'; return; }

    btnText.hidden = true;
    spinner.hidden = false;

    setTimeout(() => {
      spinner.hidden = true;
      btnText.hidden = false;

      if (u === AUTH.user && p === AUTH.pass) {
        $('#login-page').style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          $('#login-page').hidden = true;
          $('#admin-app').hidden = false;
          initApp();
        }, 280);
      } else {
        errEl.textContent = 'Username atau password salah.';
        const card = $('.login-card');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'shake 0.3s ease';
        });
      }
    }, 900);
  });
}

/* Inject fadeOut & shake */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes fadeOut { to { opacity:0; transform:scale(0.97); } }
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%,60%{transform:translateX(-6px)}
    40%,80%{transform:translateX(6px)}
  }
`;
document.head.appendChild(styleEl);

/* MOCK DATA */

const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];

const transactions = (() => {
  const names  = ['Andi Susanto','Budi Santoso','Citra Dewi','Dian Rahma','Eko Prasetyo',
                  'Fani Putri','Gilang Mukti','Hana Wijaya','Ivan Kurniawan','Joko Priyono',
                  'Karin Lestari','Luthfi Hakim','Maya Sari','Nanda Putra','Oka Setiawan'];
  const items  = ['FoliOpus Starter','FoliOpus Pro','FoliOpus Premium'];
  const prices = [149000, 299000, 499000];
  const stats  = ['sukses','sukses','sukses','sukses','pending','gagal'];
  const result = [];

  for (let i = 0; i < 48; i++) {
    const itemIdx = Math.floor(Math.random() * 3);
    const d = new Date(2026, 0, 1);
    d.setDate(d.getDate() + Math.floor(Math.random() * 152));
    result.push({
      id   : `TRX-${String(1001 + i).padStart(5, '0')}`,
      date : d,
      buyer: names[i % names.length],
      item : items[itemIdx],
      total: prices[itemIdx],
      status: stats[Math.floor(Math.random() * stats.length)],
    });
  }
  return result.sort((a, b) => b.date - a.date);
})();

const projects = [
  { id: 1, name: 'Brand Identity – Nusantara Co.', cat: 'Branding', desc: 'Rebranding lengkap untuk perusahaan FMCG lokal.', color: '#f97316', status: 'published' },
  { id: 2, name: 'E-Commerce Dashboard UI', cat: 'UI/UX', desc: 'Desain antarmuka dashboard admin toko online modern.', color: '#3b82f6', status: 'published' },
  { id: 3, name: 'Kopi Nusantara Landing Page', cat: 'Web Design', desc: 'Halaman utama brand kopi artisan Indonesia.', color: '#a855f7', status: 'draft' },
  { id: 4, name: 'Mobile Banking App', cat: 'Mobile App', desc: 'Prototipe aplikasi mobile banking generasi berikutnya.', color: '#22c55e', status: 'published' },
  { id: 5, name: 'Illustration Series Vol. 1', cat: 'Illustration', desc: 'Koleksi ilustrasi digital bertema budaya Nusantara.', color: '#eab308', status: 'published' },
  { id: 6, name: 'SaaS Analytics Platform', cat: 'UI/UX', desc: 'Dashboard analitik untuk startup SaaS B2B.', color: '#ef4444', status: 'draft' },
];

const products = [
  { id: 1, name: 'FoliOpus Starter', desc: 'Template portofolio dasar dengan fitur esensial.', price: 149000, stock: 999, category: 'starter', active: true },
  { id: 2, name: 'FoliOpus Pro', desc: 'Template profesional dengan animasi dan SEO lanjutan.', price: 299000, stock: 999, category: 'pro', active: true },
  { id: 3, name: 'FoliOpus Premium', desc: 'Template premium all-in-one dengan dukungan prioritas.', price: 499000, stock: 50, category: 'premium', active: true },
];

const mediaAssets = [
  { name: 'hero-banner.png', size: '1.8 MB', color: '#f97316', emoji: '🖼️' },
  { name: 'template-starter.jpg', size: '842 KB', color: '#3b82f6', emoji: '📐' },
  { name: 'template-pro.jpg', size: '1.2 MB', color: '#a855f7', emoji: '📐' },
  { name: 'template-premium.jpg', size: '1.5 MB', color: '#22c55e', emoji: '📐' },
  { name: 'logo-dark.svg', size: '12 KB', color: '#eab308', emoji: '✨' },
  { name: 'logo-light.svg', size: '11 KB', color: '#f1f5f9', emoji: '✨' },
  { name: 'og-image.png', size: '620 KB', color: '#ef4444', emoji: '🌐' },
  { name: 'team-photo.jpg', size: '2.1 MB', color: '#06b6d4', emoji: '👥' },
  { name: 'about-bg.jpg', size: '3.4 MB', color: '#8b5cf6', emoji: '🌄' },
  { name: 'icon-192.png', size: '48 KB', color: '#f97316', emoji: '📱' },
  { name: 'icon-512.png', size: '128 KB', color: '#f97316', emoji: '📱' },
  { name: 'placeholder.svg', size: '4 KB', color: '#475569', emoji: '📄' },
];

/* APP INIT */

let charts = {};

function initApp() {
  initTopbarDate();
  initSidebar();
  initLogout();
  initOverview();
  initLandingEditor();
  initProjectManager();
  initMediaLibrary();
  initSalesTransactions();
  initProductManager();
  navigateTo('overview');
}

/* SIDEBAR & NAVIGATION */

function initSidebar() {
  const sidebar     = $('#sidebar');
  const toggleBtn   = $('#sidebar-toggle');
  const mobileBtn   = $('#mobile-menu-btn');
  const navLinks    = $$('.nav-link');
  const linkAll     = $('.link-all');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        sidebar.classList.contains('mobile-open') &&
        !sidebar.contains(e.target) &&
        e.target !== mobileBtn) {
      sidebar.classList.remove('mobile-open');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) {
        navigateTo(page);
        if (window.innerWidth <= 768) sidebar.classList.remove('mobile-open');
      }
    });
  });

  if (linkAll) {
    linkAll.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('sales');
    });
  }
}

const PAGE_LABELS = {
  overview : 'Dashboard / Overview',
  landing  : 'Konten / Landing Page Edit',
  projects : 'Konten / Project Manager',
  media    : 'Konten / Media Library',
  sales    : 'Bisnis / Sales & Transactions',
  products : 'Bisnis / Product Manager',
};

function navigateTo(page) {
  $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));

  $$('.page-view').forEach(v => v.classList.remove('active'));
  const target = $(`#page-${page}`);
  if (target) target.classList.add('active');

  $('#breadcrumb-text').textContent = PAGE_LABELS[page] || page;

  if (page === 'overview' && !charts.revenue) renderOverviewCharts();
  if (page === 'sales'    && !charts.daily)   renderSalesCharts();
}

/* LOGOUT */

function initLogout() {
  $('#btn-logout').addEventListener('click', () => {
    if (!confirm('Yakin ingin keluar?')) return;
    localStorage.removeItem('foliOpusUser');
    window.location.replace('../index.html');
  });
}

/* OVERVIEW */

function initOverview() {
  animateCounters();
  renderOverviewTable();
}

function animateCounters() {
  $$('.stat-value[data-target]').forEach(el => {
    const target   = +el.dataset.target;
    const prefix   = el.dataset.prefix || '';
    const isCurr   = el.dataset.format === 'currency';
    const duration = 1200;
    const start    = performance.now();

    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(ease * target);
      el.textContent = prefix + (isCurr ? formatCurrency(val).replace('Rp ', '') : formatNumber(val));
      if (isCurr) el.textContent = formatCurrency(val);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (isCurr ? formatCurrency(target) : target.toLocaleString('id-ID'));
    }
    requestAnimationFrame(step);
  });
}

function renderOverviewTable() {
  const tbody = $('#overview-tx-body');
  if (!tbody) return;
  tbody.innerHTML = transactions.slice(0, 6).map(tx => `
    <tr>
      <td style="color:var(--text-primary);font-weight:600;">${tx.id}</td>
      <td>${tx.buyer}</td>
      <td>${tx.item}</td>
      <td style="color:var(--accent);font-weight:600;">${formatCurrency(tx.total)}</td>
      <td>${statusBadge(tx.status)}</td>
    </tr>
  `).join('');
}

function statusBadge(s) {
  const map = { sukses:'success', pending:'warning', gagal:'danger' };
  const lbl = { sukses:'Sukses', pending:'Pending', gagal:'Gagal' };
  return `<span class="badge badge-${map[s]}">${lbl[s]}</span>`;
}

function renderOverviewCharts() {
  const commonOpts = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', font: { size: 11 } } },
    },
  };

  const monthlyData = MONTHS.map(() => Math.floor(Math.random() * 15_000_000) + 5_000_000);
  charts.revenue = new Chart($('#revenueChart'), {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [{
        data: monthlyData,
        backgroundColor: 'rgba(249,115,22,0.25)',
        borderColor: '#f97316',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(249,115,22,0.45)',
      }],
    },
    options: {
      ...commonOpts,
      plugins: { legend: { display: false } },
      scales: {
        ...commonOpts.scales,
        y: {
          ...commonOpts.scales.y,
          ticks: {
            color: '#64748b', font: { size: 11 },
            callback: v => 'Rp ' + (v / 1_000_000).toFixed(0) + ' Jt',
          },
        },
      },
    },
  });

  charts.template = new Chart($('#templateChart'), {
    type: 'doughnut',
    data: {
      labels: ['Starter', 'Pro', 'Premium'],
      datasets: [{
        data: [52, 31, 17],
        backgroundColor: ['#f97316','#3b82f6','#a855f7'],
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: '#94a3b8', font: { size: 11 }, padding: 12, boxWidth: 10 },
        },
      },
      cutout: '68%',
    },
  });
}

/* LANDING PAGE EDITOR */

const LP_DEFAULTS = {
  title: 'Bangun kariermu dengan FoliOpus',
  tagline: 'Bangun personal branding lewat portofolio digital interaktif yang menampilkan identitas dan karya terbaikmu secara elegan dan mudah diakses',
  cta: 'Coba FoliOpus Sekarang',
  accent: '#f97316',
  bg: '#0d1526',
  bgStyle: 'gradient',
  features: ['Optimasi dan SEO Dasar', 'Live Preview Real-time', 'Desain Adaptif (Responsive)'],
};

let lpState = { ...LP_DEFAULTS, features: [...LP_DEFAULTS.features] };

function initLandingEditor() {
  renderFeaturesList();
  renderLPPreview();

  const inputs = [
    ['#lp-title',    'title'],
    ['#lp-tagline',  'tagline'],
    ['#lp-cta',      'cta'],
    ['#lp-bg-style', 'bgStyle'],
  ];

  inputs.forEach(([sel, key]) => {
    $(sel).addEventListener('input', () => {
      lpState[key] = $(sel).value;
      renderLPPreview();
    });
  });

  [['#lp-accent', '#lp-accent-hex', 'accent'], ['#lp-bg', '#lp-bg-hex', 'bg']].forEach(
    ([picker, hex, key]) => {
      $(picker).addEventListener('input', () => {
        lpState[key] = $(picker).value;
        $(hex).value = $(picker).value;
        renderLPPreview();
      });
      $(hex).addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test($(hex).value)) {
          lpState[key] = $(hex).value;
          $(picker).value = $(hex).value;
          renderLPPreview();
        }
      });
    }
  );

  $('#add-feature-btn').addEventListener('click', () => {
    lpState.features.push('Fitur baru');
    renderFeaturesList();
    renderLPPreview();
  });

  $('#lp-save').addEventListener('click', () => {
    toast('Perubahan landing page berhasil disimpan!', 'success');
  });

  $('#lp-reset').addEventListener('click', () => {
    lpState = { ...LP_DEFAULTS, features: [...LP_DEFAULTS.features] };
    $('#lp-title').value   = lpState.title;
    $('#lp-tagline').value = lpState.tagline;
    $('#lp-cta').value     = lpState.cta;
    $('#lp-accent').value  = lpState.accent;
    $('#lp-accent-hex').value = lpState.accent;
    $('#lp-bg').value      = lpState.bg;
    $('#lp-bg-hex').value  = lpState.bg;
    $('#lp-bg-style').value = lpState.bgStyle;
    renderFeaturesList();
    renderLPPreview();
    toast('Form direset ke nilai awal.', 'warning');
  });
}

function renderFeaturesList() {
  const list = $('#features-list');
  list.innerHTML = lpState.features.map((f, i) => `
    <div class="feature-item">
      <input type="text" value="${f}" placeholder="Nama fitur" data-idx="${i}" />
      <button class="feature-del btn-icon" data-idx="${i}" title="Hapus">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  `).join('');

  $$('.feature-item input', list).forEach(inp => {
    inp.addEventListener('input', () => {
      lpState.features[+inp.dataset.idx] = inp.value;
      renderLPPreview();
    });
  });

  $$('.feature-del', list).forEach(btn => {
    btn.addEventListener('click', () => {
      lpState.features.splice(+btn.dataset.idx, 1);
      renderFeaturesList();
      renderLPPreview();
    });
  });
}

function renderLPPreview() {
  const preview = $('#lp-preview');
  if (!preview) return;

  const { title, tagline, cta, accent, bg, bgStyle, features } = lpState;

  let bgCSS = bg;
  if (bgStyle === 'gradient') {
    bgCSS = `radial-gradient(ellipse at 70% 20%, ${accent}33 0%, ${bg} 60%)`;
  } else if (bgStyle === 'mesh') {
    bgCSS = `linear-gradient(135deg, ${bg} 0%, ${accent}22 50%, ${bg} 100%)`;
  }

  preview.style.background = bgCSS;
  preview.style.color = '#f1f5f9';

  preview.innerHTML = `
    <nav class="lp-preview-nav">
      <span class="lp-preview-logo" style="color:${accent}">FoliOpus</span>
      <span class="lp-preview-links">
        <span>Beranda</span><span>Fitur</span><span>Eksplor</span>
      </span>
      <span class="lp-preview-btn" style="background:${accent}">&nbsp;Masuk&nbsp;</span>
    </nav>

    <div class="lp-preview-hero">
      <div class="lp-preview-title">${title}</div>
      <div class="lp-preview-tagline">${tagline}</div>
      <span class="lp-preview-cta" style="background:${accent}">${cta}</span>
    </div>

    <div class="lp-preview-features">
      ${features.map(f => `
        <div class="lp-preview-feature-item">
          <div class="lp-preview-feature-dot" style="background:${accent}"></div>
          ${f}
        </div>
      `).join('')}
    </div>
  `;
}

/* PROJECT MANAGER */

let projectList = [...projects];

function initProjectManager() {
  renderProjectGrid(projectList);

  $('#project-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = projectList.filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    );
    renderProjectGrid(filtered);
  });

  $('#add-project-btn').addEventListener('click', () => openProjectModal());

  // Modal events
  $('#modal-close').addEventListener('click',  closeProjectModal);
  $('#modal-cancel').addEventListener('click', closeProjectModal);
  $('#modal-save').addEventListener('click',   saveProject);

  $('#project-modal').addEventListener('click', (e) => {
    if (e.target === $('#project-modal')) closeProjectModal();
  });
}

function renderProjectGrid(list) {
  const grid = $('#project-grid');
  if (!list.length) {
    grid.innerHTML = `<div style="color:var(--text-muted);font-size:.875rem;padding:2rem 0;">Tidak ada proyek ditemukan.</div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="project-card">
      <div class="project-thumb" style="background:linear-gradient(135deg,${p.color},${p.color}aa)">
        ${p.name.charAt(0)}
      </div>
      <div class="project-body">
        <div class="project-name">${p.name}</div>
        <div class="project-cat">${p.cat}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-footer">
          <span class="badge ${p.status === 'published' ? 'badge-success' : 'badge-warning'}">
            ${p.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <div class="project-actions">
            <button class="btn-icon btn-icon-edit" data-id="${p.id}" title="Edit">✏️</button>
            <button class="btn-icon btn-icon-delete" data-id="${p.id}" title="Hapus">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  $$('.btn-icon-edit', grid).forEach(btn => {
    btn.addEventListener('click', () => {
      const p = projectList.find(x => x.id === +btn.dataset.id);
      if (p) openProjectModal(p);
    });
  });

  $$('.btn-icon-delete', grid).forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Hapus proyek ini?')) return;
      projectList = projectList.filter(x => x.id !== +btn.dataset.id);
      renderProjectGrid(projectList);
      toast('Proyek berhasil dihapus.', 'error');
    });
  });
}

function openProjectModal(project = null) {
  const modal = $('#project-modal');
  $('#modal-title').textContent          = project ? 'Edit Proyek' : 'Tambah Proyek';
  $('#modal-project-id').value           = project ? project.id : '';
  $('#modal-project-name').value         = project ? project.name : '';
  $('#modal-project-category').value     = project ? project.cat : 'Web Design';
  $('#modal-project-desc').value         = project ? project.desc : '';
  $('#modal-project-color').value        = project ? project.color : '#f97316';
  $('#modal-project-status').value       = project ? project.status : 'published';
  modal.hidden = false;
  modal.style.display = 'flex';
}

function closeProjectModal() {
  const modal = $('#project-modal');
  modal.hidden = true;
  modal.style.display = 'none';
}

function saveProject() {
  const id     = $('#modal-project-id').value;
  const name   = $('#modal-project-name').value.trim();
  const cat    = $('#modal-project-category').value;
  const desc   = $('#modal-project-desc').value.trim();
  const color  = $('#modal-project-color').value;
  const status = $('#modal-project-status').value;

  if (!name) { toast('Nama proyek wajib diisi.', 'error'); return; }

  if (id) {
    const idx = projectList.findIndex(p => p.id === +id);
    if (idx > -1) projectList[idx] = { id: +id, name, cat, desc, color, status };
    toast('Proyek berhasil diperbarui.', 'success');
  } else {
    const newId = Math.max(...projectList.map(p => p.id), 0) + 1;
    projectList.push({ id: newId, name, cat, desc, color, status });
    toast('Proyek baru berhasil ditambahkan!', 'success');
  }

  closeProjectModal();
  renderProjectGrid(projectList);
}

/* MEDIA LIBRARY */

let mediaList = [
  {
    name:  'logo-foliopus.png',
    src:   './assets/logo.png'
  },
  {
    name:  'qris-payment.jpeg',
    src:   './assets/qris.jpeg'
  }
];

function initMediaLibrary() {
  renderMediaGrid();

  $('#media-upload').addEventListener('change', (e) => {
    const files = [...e.target.files];
    files.forEach(f => {
      const sizeKB = (f.size / 1024).toFixed(0);
      const size   = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + ' MB' : sizeKB + ' KB';
      mediaList.unshift({ name: f.name, size, color: '#f97316', emoji: '🖼️', src: URL.createObjectURL(f) });
    });
    renderMediaGrid();
    $('#media-count').textContent = `${mediaList.length} file`;
    toast(`${files.length} file berhasil diunggah.`, 'success');
    e.target.value = '';
  });
}

function renderMediaGrid() {
  const grid = $('#media-grid');
  grid.innerHTML = mediaList.map((m, i) => `
    <div class="media-item">
      <button class="media-delete" onclick="deleteMedia(${i})">
    ✕
  </button>
      <div class="media-thumb" style="background:${m.color}22;">
        ${m.src
          ? `<img src="${m.src}" alt="${m.name}" />`
          : `<span style="font-size:1.8rem">${m.emoji}</span>`
        }
      </div>
      <div class="media-info">
        <div class="media-filename">${m.name}</div>
        <div class="media-size">${m.size}</div>
      </div>
    </div>
  `).join('');

  
}

function deleteMedia(index) {
  if (!confirm('Hapus file ini?')) return;
    mediaList.splice(index, 1);
    renderMediaGrid();

  $('#media-count').textContent =
    `${mediaList.length} file`;

  toast('File berhasil dihapus.', 'success');
}

/* SALES & TRANSACTIONS */

let txPage = 1;
const TX_PER_PAGE = 10;
let txFilter = 'all';
let txSearch = '';

function initSalesTransactions() {
  renderTxTable();

  $('#tx-search').addEventListener('input', (e) => {
    txSearch = e.target.value.toLowerCase();
    txPage = 1;
    renderTxTable();
  });

  $('#tx-filter').addEventListener('change', (e) => {
    txFilter = e.target.value;
    txPage = 1;
    renderTxTable();
  });
}

function getFilteredTx() {
  return transactions.filter(tx => {
    const matchStatus = txFilter === 'all' || tx.status === txFilter;
    const matchSearch = !txSearch ||
      tx.id.toLowerCase().includes(txSearch) ||
      tx.buyer.toLowerCase().includes(txSearch) ||
      tx.item.toLowerCase().includes(txSearch);
    return matchStatus && matchSearch;
  });
}

function renderTxTable() {
  const filtered = getFilteredTx();
  const total    = filtered.length;
  const pages    = Math.ceil(total / TX_PER_PAGE);
  const slice    = filtered.slice((txPage - 1) * TX_PER_PAGE, txPage * TX_PER_PAGE);

  const tbody = $('#tx-table-body');
  tbody.innerHTML = slice.map(tx => `
    <tr>
      <td style="color:var(--text-primary);font-weight:600;font-size:.8rem;">${tx.id}</td>
      <td style="font-size:.8rem;">${formatDate(tx.date)}</td>
      <td>${tx.buyer}</td>
      <td style="font-size:.85rem;">${tx.item}</td>
      <td style="color:var(--accent);font-weight:600;">${formatCurrency(tx.total)}</td>
      <td>${statusBadge(tx.status)}</td>
      <td>
        <button class="btn-icon btn-icon-edit" title="Detail" style="font-size:.75rem;">👁️</button>
      </td>
    </tr>
  `).join('');

  const pag = $('#tx-pagination');
  pag.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === txPage) btn.classList.add('active');
    btn.addEventListener('click', () => { txPage = i; renderTxTable(); });
    pag.appendChild(btn);
  }
}

function renderSalesCharts() {
  const labels = [];
  const data   = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(2026, 4, 4);
    d.setDate(d.getDate() - i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    data.push(Math.floor(Math.random() * 2_500_000) + 200_000);
  }

  charts.daily = new Chart($('#dailyRevenueChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.06)' },
          ticks: { color: '#64748b', font: { size: 10 }, maxTicksLimit: 10 },
        },
        y: {
          grid: { color: 'rgba(148,163,184,0.06)' },
          ticks: {
            color: '#64748b', font: { size: 10 },
            callback: v => 'Rp ' + (v / 1_000_000).toFixed(1) + ' Jt',
          },
        },
      },
    },
  });

  const sukses  = transactions.filter(t => t.status === 'sukses').length;
  const pending = transactions.filter(t => t.status === 'pending').length;
  const gagal   = transactions.filter(t => t.status === 'gagal').length;

  charts.status = new Chart($('#statusChart'), {
    type: 'doughnut',
    data: {
      labels: ['Sukses', 'Pending', 'Gagal'],
      datasets: [{
        data: [sukses, pending, gagal],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: '#94a3b8', font: { size: 11 }, padding: 12, boxWidth: 10 },
        },
      },
      cutout: '65%',
    },
  });
}

/* PRODUCT MANAGER */
let productList    = [...products];
let selectedProdId = null;

function initProductManager() {
  renderProductCards();

  $('#add-product-btn').addEventListener('click', () => {
    selectedProdId = null;
    clearProductForm('Tambah Produk Baru');
  });

  $('#product-cancel').addEventListener('click', () => {
    selectedProdId = null;
    clearProductForm('Detail Produk');
    $$('.product-card').forEach(c => c.classList.remove('selected'));
  });

  $('#product-save').addEventListener('click', saveProduct);

  $('#product-active').addEventListener('change', (e) => {
    $('#product-active-label').textContent = e.target.checked ? 'Aktif / Dijual' : 'Nonaktif / Disembunyikan';
  });
}

function renderProductCards() {
  const container = $('#product-cards');
  const icons     = { starter: '🟠', pro: '🔵', premium: '🟣' };

  container.innerHTML = productList.map(p => `
    <div class="product-card ${p.id === selectedProdId ? 'selected' : ''}" data-id="${p.id}">
      <div class="product-card-icon" style="background:var(--accent-muted)">
        ${icons[p.category] || '📦'}
      </div>
      <div class="product-card-info">
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">${formatCurrency(p.price)}</div>
        <div style="font-size:.72rem;color:var(--text-muted);margin-top:.1rem;">
          Status: ${p.active ? '<span style="color:var(--success)">Aktif</span>' : '<span style="color:var(--danger)">Nonaktif</span>'}
        </div>
      </div>
      <div class="product-card-actions">
        <button class="btn-icon btn-icon-edit prod-edit" data-id="${p.id}" title="Edit">✏️</button>
        <button class="btn-icon btn-icon-delete prod-del" data-id="${p.id}" title="Hapus">🗑️</button>
      </div>
    </div>
  `).join('');

  $$('.prod-edit', container).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const p = productList.find(x => x.id === +btn.dataset.id);
      if (p) loadProductForm(p);
    });
  });

  $$('.prod-del', container).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!confirm('Hapus produk ini?')) return;
      productList = productList.filter(x => x.id !== +btn.dataset.id);
      if (selectedProdId === +btn.dataset.id) clearProductForm('Detail Produk');
      renderProductCards();
      toast('Produk berhasil dihapus.', 'error');
    });
  });

  $$('.product-card', container).forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const p = productList.find(x => x.id === +card.dataset.id);
      if (p) loadProductForm(p);
    });
  });
}

function loadProductForm(p) {
  selectedProdId            = p.id;
  $('#product-id').value    = p.id;
  $('#product-name').value  = p.name;
  $('#product-desc').value  = p.desc;
  $('#product-price').value = p.price;
  $('#product-category').value = p.category;
  $('#product-active').checked = p.active;
  $('#product-active-label').textContent = p.active ? 'Aktif / Dijual' : 'Nonaktif / Disembunyikan';
  $('#product-form-title').textContent   = 'Edit Produk';
  renderProductCards();
}

function clearProductForm(title = 'Detail Produk') {
  $('#product-id').value    = '';
  $('#product-name').value  = '';
  $('#product-desc').value  = '';
  $('#product-price').value = '';
  $('#product-category').value = 'starter';
  $('#product-active').checked = true;
  $('#product-active-label').textContent = 'Aktif / Dijual';
  $('#product-form-title').textContent   = title;
}

function saveProduct() {
  const id     = $('#product-id').value;
  const name   = $('#product-name').value.trim();
  const desc   = $('#product-desc').value.trim();
  const price  = +$('#product-price').value;
  const cat    = $('#product-category').value;
  const active = $('#product-active').checked;

  if (!name)        { toast('Nama produk wajib diisi.', 'error'); return; }
  if (isNaN(price) || price < 0) { toast('Harga tidak valid.', 'error'); return; }

  if (id) {
    const idx = productList.findIndex(p => p.id === +id);
    if (idx > -1) productList[idx] = { id: +id, name, desc, price, category: cat, active };
    toast('Produk berhasil diperbarui.', 'success');
  } else {
    const newId = Math.max(...productList.map(p => p.id), 0) + 1;
    productList.push({ id: newId, name, desc, price, category: cat, active });
    selectedProdId = newId;
    toast('Produk baru berhasil ditambahkan!', 'success');
  }

  renderProductCards();
}

document.addEventListener('DOMContentLoaded', () => {
  const sessionData = localStorage.getItem('foliOpusUser');
  let session = null;
  
  try {
    session = JSON.parse(sessionData);
  } catch (e) {
    session = null;
  }

  if (session && session.loggedIn && session.role === 'admin') {
    $('#login-page').style.display = 'none';
    $('#admin-app').hidden = false;
    initApp();
  } else {
    window.location.replace('../login.html'); 
  }
});
