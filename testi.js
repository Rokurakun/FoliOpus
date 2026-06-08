'use strict';

/* ── CONFIGURATION ─────────────────────────────────────── */
const CFG = {
  CARD_GAP     : 20,
  COLS_PER_PAGE: 3,
  ROWS_PER_COL : 2,
  AUTOPLAY_MS  : 5500,
  MAX_REVIEW   : 280,
  MAX_REPLY    : 300,
};

/* ── STORAGE KEYS ──────────────────────────────────────── */
const LS = {
  REVIEWS : 'foliOpusReviews_v3',
  REPLIES : 'foliOpusReplies_v1',
  SESSION : 'foliOpusUser',
};

/* ── SEED DATA ─────────────────────────────────────────── */
const SEED = [
  {
    id:'s01', featured:true,
    name:'Rizky Nugroho',    role:'Frontend Developer · Bandung',
    av:'RN', avc:'av-amber', product:'pro',     rating:5,
    ts: Date.now() - 864e5 * 22,
    text:'Beneran game-changer. Dulu kirim lamaran pakai CV Word biasa, sekarang tinggal share link. Dalam 2 minggu langsung dapat interview dari 3 perusahaan tech ternama.',
  },
  {
    id:'s02', featured:false,
    name:'Dinda Pramesti',   role:'UI/UX Designer · Jakarta',
    av:'DP', avc:'av-pink',  product:'premium', rating:5,
    ts: Date.now() - 864e5 * 19,
    text:'Klien pertama yang lihat langsung bilang "ini beda dari yang lain" — deal ditandatangani hari itu juga. FoliOpus Premium worth every penny!',
  },
  {
    id:'s03', featured:false,
    name:'Ahmad Fadhil',     role:'Mahasiswa Informatika · Yogyakarta',
    av:'AF', avc:'av-blue',  product:'starter', rating:5,
    ts: Date.now() - 864e5 * 16,
    text:'Semester 5, belum ada pengalaman kerja, tapi portofolio saya sekarang super polished. Berhasil masuk magang impian di startup unicorn!',
  },
  {
    id:'s04', featured:false,
    name:'Sari Anjani',      role:'Senior Copywriter · Surabaya',
    av:'SA', avc:'av-purple',product:'premium', rating:5,
    ts: Date.now() - 864e5 * 14,
    text:'Skeptis sama template developer, ternyata salah besar. FoliOpus Premium justru sangat editorial dan cocok buat karya tulisan dengan storytelling kuat.',
  },
  {
    id:'s05', featured:false,
    name:'Bima Hariansyah',  role:'Freelance Full-Stack · Malang',
    av:'BH', avc:'av-teal',  product:'pro',     rating:5,
    ts: Date.now() - 864e5 * 12,
    text:'Setup kurang dari 1 jam, langsung live. Klien luar negeri langsung percaya karena tampilannya profesional. Pendapatan freelance naik 3× dalam 2 bulan!',
  },
  {
    id:'s06', featured:false,
    name:'Kirana Wulandari',  role:'Motion Designer · Bali',
    av:'KW', avc:'av-orange', product:'pro',    rating:5,
    ts: Date.now() - 864e5 * 10,
    text:'Desainnya dark dan elegan, sesuai branding personal saya. Source code-nya bersih dan mudah dikustomisasi. Tim FoliOpus sangat responsif!',
  },
  {
    id:'s07', featured:false,
    name:'Naufal Ramadhan',   role:'Backend Developer · Medan',
    av:'NR', avc:'av-green',  product:'starter', rating:5,
    ts: Date.now() - 864e5 * 8,
    text:'Mau buat portofolio dari scratch tapi butuh berbulan-bulan. Dengan Starter selesai dalam sehari dan hasilnya jauh lebih bagus dari bayangan!',
  },
  {
    id:'s08', featured:true,
    name:'Layla Permatasari', role:'Art Director · Jakarta',
    av:'LP', avc:'av-red',    product:'premium', rating:5,
    ts: Date.now() - 864e5 * 6,
    text:'Standar visual saya tinggi. FoliOpus Premium satu-satunya template yang berani saya jadikan cerminan identitas profesional. Typography-nya presisi.',
  },
  {
    id:'s09', featured:false,
    name:'Galih Santosa',     role:'Data Engineer · Bandung',
    av:'GS', avc:'av-blue2',  product:'pro',    rating:5,
    ts: Date.now() - 864e5 * 4,
    text:'One-time payment itu killer feature. Beli sekali, pakai seumur hidup, deploy ke domain sendiri. Dibanding langganan bulanan, FoliOpus jelas menang.',
  },
  {
    id:'s10', featured:false,
    name:'Maya Kusuma',       role:'Graphic Designer · Semarang',
    av:'MK', avc:'av-pink',   product:'starter', rating:4,
    ts: Date.now() - 864e5 * 3,
    text:'Starter cukup bagus untuk portfolio pertama saya. Setup mudah dan hasilnya rapi. Kalau ada budget lebih pasti upgrade ke Pro.',
  },
  {
    id:'s11', featured:false,
    name:'Daffa Rizaldi',     role:'Content Creator · Bandung',
    av:'DR', avc:'av-teal',   product:'pro',    rating:4,
    ts: Date.now() - 864e5 * 2,
    text:'Layout Pro sangat fleksibel. Butuh sedikit waktu memahami struktur kodenya, tapi setelah paham sangat worth it untuk semua kebutuhan konten saya.',
  },
  {
    id:'s12', featured:false,
    name:'Reni Safitri',      role:'HR Specialist · Jakarta',
    av:'RS', avc:'av-amber',  product:'premium', rating:3,
    ts: Date.now() - 86400 * 20,
    text:'Desainnya cantik tapi sebagai non-developer butuh waktu lebih untuk kustomisasi. Semoga ke depannya ada panduan setup yang lebih ramah pemula.',
  },
];

/* ── LOOKUP MAPS ───────────────────────────────────────── */
const STAR_LABEL = [
  '', 'Kecewa 😞', 'Kurang memuaskan 😕',
  'Cukup bagus 🙂', 'Bagus! 😊', 'Luar biasa! 🔥',
];

const PROD_META = {
  starter : { badge: '✦ Starter', cls: 'tp-starter' },
  pro     : { badge: '✦ Pro',     cls: 'tp-pro'     },
  premium : { badge: '✦ Premium', cls: 'tp-premium' },
};

const AV_POOL = [
  'av-amber','av-orange','av-blue','av-blue2',
  'av-green','av-purple','av-pink','av-teal','av-red','av-indigo',
];

/* ── REACTIVE STATE ────────────────────────────────────── */
const State = {
  filterStar    : 'all',
  filterProduct : 'all',
  currentPage   : 0,
  totalPages    : 1,
  autoTimer     : null,
  replyTargetId : null,
};

/* ══════════════════════════════════════════════════════════
   STORAGE HELPERS
══════════════════════════════════════════════════════════ */
function lsGet(key, fallback) {
  try   { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadUserReviews() { return lsGet(LS.REVIEWS, []); }
function saveUserReviews(arr) { lsSet(LS.REVIEWS, arr); }

function loadReplies() { return lsGet(LS.REPLIES, {}); }
function saveReplies(obj) { lsSet(LS.REPLIES, obj); }

function allReviews() { return [...SEED, ...loadUserReviews()]; }

/* ══════════════════════════════════════════════════════════
   AUTH & SESSION
══════════════════════════════════════════════════════════ */
function getSession() {
  return lsGet(LS.SESSION, null);
}

function isAdmin() {
  const s = getSession();
  return !!(s && s.loggedIn && s.role === 'admin');
}

function isLoggedIn() {
  const s = getSession();
  return !!(s && s.loggedIn);
}

function currentUsername() {
  return getSession()?.username || null;
}

/* ── Cek apakah user sudah pernah beli minimal 1 template ── */
function hasPurchase() {
  const username = currentUsername();
  if (!username) return false;
  const history = lsGet('foliOpusHistory_' + username, []);
  return Array.isArray(history) && history.length > 0;
}

/* ── Mengambil daftar template yang dibeli user ── */
function getPurchasedTemplates() {
    const username = currentUsername();
    if (!username) return [];
    
    // Ambil data history dari localStorage
    const history = lsGet('foliOpusHistory_' + username, []);
    
    // Looping data history dan ambil nilai dari 'templateKey'
    return history.map(item => {
        return (item && item.templateKey) ? item.templateKey.toLowerCase() : '';
    }).filter(Boolean); // Hapus string kosong jika ada
}

/* ── Mengambil daftar template yang SUDAH diulas user ini ── */
function getReviewedTemplates() {
    const username = currentUsername();
    if (!username) return [];
    
    // Looping data review user dan ambil produk yang sudah diulas
    return loadUserReviews()
        .filter(r => r.submittedBy === username)
        .map(r => (r.product || '').toLowerCase());
}

/* ── Apakah review ini milik user yang sedang login ── */
function isOwnReview(review) {
  /* Hanya user-generated review (id dimulai 'u') yang bisa dihapus.
     Seed data (id 's...') tidak boleh dihapus siapapun. */
  if (!review.id.startsWith('u')) return false;
  const username = currentUsername();
  if (!username) return false;
  /* Kita simpan username di review saat submit, bandingkan di sini */
  return review.submittedBy === username;
}

/* ══════════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════════ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initials(name) {
  return name.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => (w[0] || '').toUpperCase())
    .join('');
}

function hashColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AV_POOL[h % AV_POOL.length];
}

function starsHTML(rating, max = 5) {
  let h = '';
  for (let i = 1; i <= max; i++) {
    const col = i <= rating ? '#f59e0b' : 'rgba(255,255,255,.15)';
    h += `<span class="star" style="color:${col}">★</span>`;
  }
  return h;
}

function relTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 2)  return 'baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} hari lalu`;
  const mo = Math.floor(d / 30);
  return `${mo} bulan lalu`;
}

function getColW() {
  const col = document.querySelector('.testi-col');
  return col ? col.offsetWidth + CFG.CARD_GAP : 308 + CFG.CARD_GAP;
}

/* ══════════════════════════════════════════════════════════
   FILTER + SORT
══════════════════════════════════════════════════════════ */
function getFiltered() {
  return allReviews()
    .filter(r => {
      if (State.filterStar    !== 'all' && r.rating  !== +State.filterStar)   return false;
      if (State.filterProduct !== 'all' && r.product !== State.filterProduct) return false;
      return true;
    })
    .sort((a, b) => b.rating - a.rating || (b.ts || 0) - (a.ts || 0));
}

/* ══════════════════════════════════════════════════════════
   STATISTICS BAR
══════════════════════════════════════════════════════════ */
function updateStats() {
  const all   = allReviews();
  const total = 1200 + loadUserReviews().length;
  const avg   = all.length
    ? (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1)
    : '–';

  const avgEl = document.getElementById('testiAvgScore');
  const cntEl = document.getElementById('testiTotalCount');
  if (avgEl) avgEl.textContent = `${avg} / 5`;
  if (cntEl) cntEl.textContent = `dari ${total.toLocaleString('id-ID')}+ ulasan`;
}

/* ══════════════════════════════════════════════════════════
   HTML BUILDERS
══════════════════════════════════════════════════════════ */

/* ── Reply section ──
   - Tombol "Balas" hanya muncul untuk admin
   - Tombol edit/hapus reply hanya untuk admin
   - Tombol hapus review hanya untuk pemilik review itu sendiri
*/
function buildReplyHTML(review) {
  const rid   = review.id;
  const admin = isAdmin();
  const reply = loadReplies()[rid] || null;
  const own   = isOwnReview(review);   // user ini yang buat review-nya

  const SHIELD = `<svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35
             C17.25 22.15 21 17.25 21 12V7L12 2z"/>
  </svg>`;
  const PENCIL = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>`;
  const TRASH  = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>`;
  const REPLY  = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <polyline points="9 17 4 12 9 7"/>
    <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
  </svg>`;

  /* Kalau tidak ada yang perlu ditampilkan, skip wrapper */
  const hasReplyBubble = !!reply;
  const hasAdminBtn    = admin;           // tombol "Balas" hanya admin
  const hasDeleteOwn   = own;             // tombol hapus review sendiri

  if (!hasReplyBubble && !hasAdminBtn && !hasDeleteOwn) return '';

  let h = `<div class="testi-reply-wrap">`;

  /* existing admin reply bubble */
  if (reply) {
    const editedMark = reply.edited
      ? `<span class="reply-edited">· diedit</span>`
      : '';
    h += `
      <div class="testi-admin-reply">
        <div class="reply-admin-hd">
          <span class="reply-admin-badge">${SHIELD}&nbsp;Tim FoliOpus</span>
          <span class="reply-time">${relTime(reply.ts)} ${editedMark}</span>
          ${admin ? `
          <div class="reply-admin-acts">
            <button class="btn-rp-edit" data-id="${rid}"
                    aria-label="Edit balasan">${PENCIL} Edit</button>
            <button class="btn-rp-del" data-id="${rid}"
                    aria-label="Hapus balasan">${TRASH}</button>
          </div>` : ''}
        </div>
        <p class="reply-body">${esc(reply.text)}</p>
      </div>`;
  }

  /* Tombol "Balas" — HANYA admin */
  if (admin) {
    const btnLabel = reply ? 'Edit Balasan' : 'Balas';
    h += `
      <button class="btn-testi-reply"
              data-id="${rid}"
              aria-label="${btnLabel}">
        ${REPLY} ${btnLabel}
      </button>`;
  }

  /* Tombol hapus review sendiri — HANYA pemilik review */
  if (own) {
    h += `
      <button class="btn-delete-own" data-id="${rid}"
              aria-label="Hapus ulasanmu">
        ${TRASH} Hapus Ulasanmu
      </button>`;
  }

  h += `</div>`;
  return h;
}

/* ── Full card HTML ── */
function buildCardHTML(r) {
  const prod  = PROD_META[r.product] || PROD_META.starter;
  const avc   = r.avc  || hashColor(r.name);
  const ini   = r.av   || initials(r.name);
  const feat  = r.featured ? 'featured' : '';
  const ts    = r.ts ? relTime(r.ts) : '';

  return `
    <div class="testi-card ${feat}" data-review-id="${esc(r.id)}">
      <span class="testi-quote-mark">&ldquo;</span>

      <div class="testi-card-top">
        <div class="testi-stars">${starsHTML(r.rating)}</div>
        ${ts ? `<span class="testi-time">${esc(ts)}</span>` : ''}
      </div>

      <p class="testi-text">${esc(r.text)}</p>

      <span class="testi-product ${prod.cls}">${prod.badge}</span>

      <div class="testi-author">
        <div class="testi-av ${avc}">${esc(ini)}</div>
        <div class="testi-info">
          <div class="testi-name">${esc(r.name)}</div>
          <div class="testi-role">${esc(r.role)}</div>
        </div>
      </div>

      ${buildReplyHTML(r)}
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════ */
function render() {
  const track    = document.getElementById('testiTrack');
  const empty    = document.getElementById('testiEmpty');
  const dotsWrap = document.getElementById('testiDots');
  if (!track) return;

  updateStats();

  const reviews = getFiltered();

  if (!reviews.length) {
    track.innerHTML = '';
    track.classList.add('hidden');
    empty?.classList.remove('hidden');
    if (dotsWrap) dotsWrap.innerHTML = '';
    return;
  }
  track.classList.remove('hidden');
  empty?.classList.add('hidden');

  let html = '';
  for (let i = 0; i < reviews.length; i += CFG.ROWS_PER_COL) {
    const chunk = reviews.slice(i, i + CFG.ROWS_PER_COL);
    html += `<div class="testi-col">${chunk.map(buildCardHTML).join('')}</div>`;
  }
  track.innerHTML = html;

  const totalCols  = Math.ceil(reviews.length / CFG.ROWS_PER_COL);
  State.totalPages = Math.max(1, Math.ceil(totalCols / CFG.COLS_PER_PAGE));
  if (State.currentPage >= State.totalPages) State.currentPage = 0;

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (let p = 0; p < State.totalPages; p++) {
      const dot = document.createElement('button');
      dot.className   = `testi-dot${p === State.currentPage ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Halaman ${p + 1}`);
      dot.addEventListener('click', () => gotoPage(p));
      dotsWrap.appendChild(dot);
    }
  }

  scrollToPage(State.currentPage, false);
  bindCardEvents(track);
}

/* ══════════════════════════════════════════════════════════
   SCROLL / PAGINATION
══════════════════════════════════════════════════════════ */
function pageScrollLeft(page) {
  return page * CFG.COLS_PER_PAGE * getColW();
}

function scrollToPage(page, smooth = true) {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  track.scrollTo({ left: pageScrollLeft(page), behavior: smooth ? 'smooth' : 'auto' });
  setActiveDot(page);
}

function gotoPage(page) {
  page = Math.max(0, Math.min(page, State.totalPages - 1));
  State.currentPage = page;
  scrollToPage(page);
}

function setActiveDot(page) {
  State.currentPage = page;
  document.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === page);
  });
}

let _scrollTimer = null;
function onTrackScroll() {
  clearTimeout(_scrollTimer);
  _scrollTimer = setTimeout(() => {
    const track = document.getElementById('testiTrack');
    if (!track) return;
    const page = Math.round(track.scrollLeft / (CFG.COLS_PER_PAGE * getColW()));
    setActiveDot(Math.min(page, State.totalPages - 1));
  }, 90);
}

/* ══════════════════════════════════════════════════════════
   DRAG-TO-SCROLL
══════════════════════════════════════════════════════════ */
function bindDrag(el) {
  if (!el) return;
  let dragging = false, startX = 0, scrollStart = 0, movedPx = 0;

  el.addEventListener('mousedown', e => {
    dragging   = true;
    movedPx    = 0;
    startX     = e.pageX;
    scrollStart = el.scrollLeft;
    el.style.scrollBehavior = 'auto';
  });

  el.addEventListener('mousemove', e => {
    if (!dragging) return;
    movedPx = Math.abs(e.pageX - startX);
    el.scrollLeft = scrollStart - (e.pageX - startX);
  });

  ['mouseup', 'mouseleave'].forEach(ev =>
    el.addEventListener(ev, () => {
      dragging = false;
      el.style.scrollBehavior = 'smooth';
    })
  );

  el.addEventListener('click', e => {
    if (movedPx > 6) { e.preventDefault(); e.stopPropagation(); movedPx = 0; }
  }, true);
}

/* ══════════════════════════════════════════════════════════
   TOUCH SWIPE
══════════════════════════════════════════════════════════ */
function initTouch() {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 42) {
      gotoPage(diff > 0 ? State.currentPage + 1 : State.currentPage - 1);
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   AUTO-PLAY
══════════════════════════════════════════════════════════ */
function startAuto() {
  stopAuto();
  State.autoTimer = setInterval(() => {
    gotoPage((State.currentPage + 1) % (State.totalPages || 1));
  }, CFG.AUTOPLAY_MS);
}
function stopAuto() { clearInterval(State.autoTimer); }

/* ══════════════════════════════════════════════════════════
   CARD-LEVEL EVENT DELEGATION
══════════════════════════════════════════════════════════ */
function bindCardEvents(track) {
  if (!track) return;

  track.addEventListener('click', e => {

    /* ── "Balas" / "Edit Balasan" — admin only ── */
    const replyBtn = e.target.closest('.btn-testi-reply');
    if (replyBtn) {
      e.stopPropagation();
      openReplyModal(replyBtn.dataset.id);
      return;
    }

    /* ── Edit reply bubble — admin only ── */
    const editBtn = e.target.closest('.btn-rp-edit');
    if (editBtn) {
      e.stopPropagation();
      openReplyModal(editBtn.dataset.id);
      return;
    }

    /* ── Hapus reply bubble — admin only ── */
    const delReplyBtn = e.target.closest('.btn-rp-del');
    if (delReplyBtn) {
      e.stopPropagation();
      if (!confirm('Hapus balasan ini?')) return;
      const replies = loadReplies();
      delete replies[delReplyBtn.dataset.id];
      saveReplies(replies);
      render();
      showToast('⚠️ Balasan dihapus.', '', 'warn');
      return;
    }

    /* ── Hapus review sendiri — pemilik review ── */
    const delOwnBtn = e.target.closest('.btn-delete-own');
    if (delOwnBtn) {
      e.stopPropagation();
      openDeleteModal(delOwnBtn.dataset.id);
      return;
    }

  });
}

/* ══════════════════════════════════════════════════════════
   CONTROLS INIT
══════════════════════════════════════════════════════════ */
function initControls() {
  const track = document.getElementById('testiTrack');

  document.getElementById('testiPrev')
    ?.addEventListener('click', () => gotoPage(State.currentPage - 1));
  document.getElementById('testiNext')
    ?.addEventListener('click', () => gotoPage(State.currentPage + 1));

  track?.addEventListener('scroll', onTrackScroll, { passive: true });

  const pauseEls = [track,
    document.getElementById('testiPrev'),
    document.getElementById('testiNext')];

  pauseEls.forEach(el => {
    el?.addEventListener('mouseenter', stopAuto);
    el?.addEventListener('mouseleave', startAuto);
  });
  track?.addEventListener('touchstart', stopAuto, { passive: true });
  track?.addEventListener('touchend',   startAuto, { passive: true });

  bindDrag(track);
}

/* ══════════════════════════════════════════════════════════
   FILTER INIT
══════════════════════════════════════════════════════════ */
function initFilters() {
  document.querySelectorAll('[data-filter-star]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-star]')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.filterStar  = btn.dataset.filterStar;
      State.currentPage = 0;
      render();
    });
  });

  document.querySelectorAll('[data-filter-product]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-product]')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.filterProduct = btn.dataset.filterProduct;
      State.currentPage   = 0;
      render();
    });
  });
}

/* ══════════════════════════════════════════════════════════
   REVIEW MODAL — user-facing
══════════════════════════════════════════════════════════ */
let rv = { rating: 0, product: '' };

/* ── Mengatur state tombol pilihan template di Modal ── */
function setupProductPicker(purchased, reviewed) {
    document.querySelectorAll('.rv-prod-btn').forEach(btn => {
        const prod = btn.dataset.prod.toLowerCase(); // 'starter', 'pro', 'premium'
        
        // Reset state awal
        btn.classList.remove('selected', 'locked', 'reviewed');
        btn.disabled = false;
        
        // Label dasar
        const baseText = prod === 'starter' ? 'Starter' : (prod === 'pro' ? 'Pro' : 'Premium');

        if (!purchased.includes(prod)) {
            // Kondisi 1: Belum dibeli (Gembok)
            btn.classList.add('locked');
            btn.disabled = true;
            btn.innerHTML = `🔒 ${baseText}`;
            btn.title = "Kamu belum membeli template ini";
        } else if (reviewed.includes(prod)) {
            // Kondisi 2: Sudah dibeli & sudah diulas (Centang Hijau)
            btn.classList.add('reviewed');
            btn.disabled = true;
            btn.innerHTML = `✅ ${baseText}`;
            btn.title = "Sudah diulas";
        } else {
            // Kondisi 3: Sudah dibeli & belum diulas (Bisa di-klik)
            btn.innerHTML = `&#10022; ${baseText}`;
            btn.title = "";
        }
    });
}

function openReviewModal() {
    /* ── Gate 1: harus login ── */
    if (!isLoggedIn()) {
        showToast('🔒 Login dulu yuk!', 'Kamu perlu login untuk memberikan ulasan.', 'lock');
        setTimeout(() => {
            sessionStorage.setItem('foliOpusRedirect', window.location.href);
            window.location.href = 'login.html';
        }, 1800);
        return;
    }

    const purchased = getPurchasedTemplates();
    const reviewed = getReviewedTemplates();
    
    /* ── Gate 2: harus punya minimal 1 pembelian ── */
    if (purchased.length === 0) {
        showToast('🛒 Beli dulu, baru ulasan!', 'Kamu perlu memiliki minimal 1 template untuk bisa memberikan ulasan.', 'warn');
        return;
    }

    /* ── Gate 3: Cek apakah SEMUA yang dibeli sudah diulas ── */
    const availableToReview = purchased.filter(p => !reviewed.includes(p));
    if (availableToReview.length === 0) {
        showToast('🎉 Selesai!', 'Kamu sudah memberikan ulasan untuk semua template yang kamu miliki.', 'ok');
        return;
    }

    resetReviewForm();
    
    // Panggil fungsi setup tombol
    setupProductPicker(purchased, reviewed);

    document.getElementById('reviewModalOv')?.classList.add('open');
    document.body.style.overflow = 'hidden';
    stopAuto();
    setTimeout(() => document.getElementById('rv-name')?.focus(), 220);
}

function closeReviewModal() {
  document.getElementById('reviewModalOv')?.classList.remove('open');
  document.body.style.overflow = '';
  startAuto();
}

function resetReviewForm() {
  rv = { rating: 0, product: '' };

  ['rv-name', 'rv-role', 'rv-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('is-err'); }
  });

  ['rv-name-err','rv-role-err','rv-prod-err','rv-star-err','rv-text-err'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '';
  });

  const rvChar = document.getElementById('rv-char');
  if (rvChar) rvChar.textContent = '0';

  document.querySelectorAll('.rv-prod-btn').forEach(b => b.classList.remove('selected'));

  document.querySelectorAll('.rv-star').forEach(s =>
    s.classList.remove('selected', 'hovered'));
  const lbl = document.getElementById('rv-star-label');
  if (lbl) lbl.textContent = 'Pilih rating';

  const btn = document.getElementById('submitReview');
  const btx = document.getElementById('rv-btn-text');
  const spn = document.getElementById('rv-spinner');
  if (btn) btn.disabled         = false;
  if (btx) btx.textContent      = 'Kirim Ulasan';
  if (spn) spn.classList.add('hidden');
}

function initReviewModal() {
  ['openReviewModal', 'openReviewModal2'].forEach(id =>
    document.getElementById(id)?.addEventListener('click', openReviewModal));

  document.getElementById('closeReviewModal')?.addEventListener('click', closeReviewModal);
  document.getElementById('cancelReview')?.addEventListener('click', closeReviewModal);
  document.getElementById('reviewModalOv')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeReviewModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' &&
        document.getElementById('reviewModalOv')?.classList.contains('open'))
      closeReviewModal();
  });

  document.querySelectorAll('.rv-prod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rv-prod-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      rv.product = btn.dataset.prod;
      const e = document.getElementById('rv-prod-err');
      if (e) e.textContent = '';
    });
  });

  const stars = document.querySelectorAll('.rv-star');
  const lbl   = document.getElementById('rv-star-label');

  stars.forEach(star => {
    const val = +star.dataset.val;

    star.addEventListener('mouseenter', () => {
      stars.forEach(s => s.classList.toggle('hovered', +s.dataset.val <= val));
      if (lbl) lbl.textContent = STAR_LABEL[val];
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
      if (lbl) lbl.textContent = rv.rating ? STAR_LABEL[rv.rating] : 'Pilih rating';
    });

    star.addEventListener('click', () => {
      rv.rating = val;
      stars.forEach(s => s.classList.toggle('selected', +s.dataset.val <= val));
      if (lbl) lbl.textContent = STAR_LABEL[val];
      const e = document.getElementById('rv-star-err');
      if (e) e.textContent = '';
    });
  });

  const rvText = document.getElementById('rv-text');
  rvText?.addEventListener('input', () => {
    const len = rvText.value.length;
    const ctr = document.getElementById('rv-char');
    if (ctr) ctr.textContent = len;
    const wrap = document.querySelector('.rv-char-count');
    if (wrap) wrap.style.color =
      len > CFG.MAX_REVIEW * .88 ? '#f87171' :
      len > CFG.MAX_REVIEW * .70 ? '#f59e0b' : '';
  });

  ['rv-name', 'rv-role', 'rv-text'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      document.getElementById(id)?.classList.remove('is-err');
      const e = document.getElementById(id + '-err'); if (e) e.textContent = '';
    });
  });

  document.getElementById('submitReview')?.addEventListener('click', submitReview);
}

function submitReview() {
  const name = document.getElementById('rv-name')?.value.trim() || '';
  const role = document.getElementById('rv-role')?.value.trim() || '';
  const text = document.getElementById('rv-text')?.value.trim() || '';
  let   valid = true;

  function fieldErr(inputId, errId, msg) {
    document.getElementById(inputId)?.classList.add('is-err');
    const e = document.getElementById(errId); if (e) e.textContent = msg;
    valid = false;
  }

  if (!name || name.length < 2) fieldErr('rv-name', 'rv-name-err', 'Nama minimal 2 karakter.');
  if (!role)                     fieldErr('rv-role', 'rv-role-err', 'Profesi & kota tidak boleh kosong.');
  if (!rv.product) {
    const e = document.getElementById('rv-prod-err');
    if (e) e.textContent = 'Pilih template yang kamu gunakan.';
    valid = false;
  }
  if (!rv.rating) {
    const e = document.getElementById('rv-star-err');
    if (e) e.textContent = 'Pilih rating bintang.';
    valid = false;
  }
  if (text.length < 15) fieldErr('rv-text', 'rv-text-err', 'Ulasan minimal 15 karakter.');

  if (!valid) return;

  const btn = document.getElementById('submitReview');
  const btx = document.getElementById('rv-btn-text');
  const spn = document.getElementById('rv-spinner');
  if (btn) btn.disabled    = true;
  if (btx) btx.textContent = 'Mengirim...';
  if (spn) spn.classList.remove('hidden');

  setTimeout(() => {
    const userReviews = loadUserReviews();
    userReviews.push({
      id          : 'u' + Date.now(),
      submittedBy : currentUsername(),   /* simpan username untuk verifikasi kepemilikan */
      name, role, text,
      av          : initials(name),
      avc         : hashColor(name),
      product     : rv.product,
      rating      : rv.rating,
      featured    : false,
      ts          : Date.now(),
    });
    saveUserReviews(userReviews);

    closeReviewModal();

    State.filterStar    = 'all';
    State.filterProduct = 'all';
    State.currentPage   = 0;
    document.querySelectorAll('[data-filter-star]')
            .forEach(b => b.classList.toggle('active', b.dataset.filterStar === 'all'));
    document.querySelectorAll('[data-filter-product]')
            .forEach(b => b.classList.toggle('active', b.dataset.filterProduct === 'all'));

    render();
    showToast(
      '🎉 Terima kasih!',
      `Ulasan dari ${esc(name)} sudah tampil di halaman ini.`,
      'ok'
    );
  }, 900);
}

/* ══════════════════════════════════════════════════════════
   REPLY MODAL — admin-only
══════════════════════════════════════════════════════════ */
function openReplyModal(reviewId) {
  if (!isAdmin()) return;   /* tidak ada fallback toast — tombol tidak muncul untuk non-admin */

  State.replyTargetId = reviewId;

  const review  = allReviews().find(r => r.id === reviewId);
  const preview = document.getElementById('replyReviewPreview');
  if (preview && review) {
    const prod = PROD_META[review.product] || PROD_META.starter;
    const avc  = review.avc  || hashColor(review.name);
    const ini  = review.av   || initials(review.name);
    preview.innerHTML = `
      <div class="reply-preview-card">
        <div style="display:flex;align-items:center;gap:.55rem;margin-bottom:.55rem">
          <div class="testi-av ${avc}"
               style="width:30px;height:30px;font-size:.7rem;flex-shrink:0">
            ${esc(ini)}
          </div>
          <div style="min-width:0;flex:1">
            <div style="font-size:.82rem;font-weight:800;color:#f1f5f9">
              ${esc(review.name)}
            </div>
            <div style="font-size:.7rem;color:#94a3b8">${esc(review.role)}</div>
          </div>
          <span class="testi-product ${prod.cls}"
                style="font-size:.65rem;flex-shrink:0">
            ${prod.badge}
          </span>
        </div>
        <div style="display:flex;gap:2px;margin-bottom:.42rem">
          ${starsHTML(review.rating)}
        </div>
        <p style="font-size:.81rem;color:#cbd5e1;line-height:1.55;
           display:-webkit-box;-webkit-line-clamp:3;
           -webkit-box-orient:vertical;overflow:hidden">
          ${esc(review.text)}
        </p>
      </div>`;
  }

  const existing = loadReplies()[reviewId];
  const textarea = document.getElementById('rp-text');
  const charEl   = document.getElementById('rp-char');
  if (textarea) { textarea.value = existing ? existing.text : ''; textarea.classList.remove('is-err'); }
  if (charEl)   charEl.textContent = existing ? existing.text.length : '0';

  const errEl = document.getElementById('rp-text-err');
  if (errEl) errEl.textContent = '';

  const btx = document.getElementById('rp-btn-text');
  const spn = document.getElementById('rp-spinner');
  const btn = document.getElementById('submitReply');
  if (btx) btx.textContent = existing ? 'Simpan Perubahan' : 'Kirim Balasan';
  if (spn) spn.classList.add('hidden');
  if (btn) btn.disabled    = false;

  document.getElementById('replyModalOv')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  stopAuto();
  setTimeout(() => textarea?.focus(), 220);
}

function closeReplyModal() {
  document.getElementById('replyModalOv')?.classList.remove('open');
  document.body.style.overflow = '';
  State.replyTargetId = null;
  startAuto();
}

function initReplyModal() {
  document.getElementById('closeReplyModal')?.addEventListener('click', closeReplyModal);
  document.getElementById('cancelReply')?.addEventListener('click', closeReplyModal);
  document.getElementById('replyModalOv')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeReplyModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' &&
        document.getElementById('replyModalOv')?.classList.contains('open'))
      closeReplyModal();
  });

  const rpText = document.getElementById('rp-text');
  rpText?.addEventListener('input', () => {
    const len = rpText.value.length;
    const ctr = document.getElementById('rp-char');
    if (ctr) ctr.textContent = len;
    const wrap = document.querySelector('.rp-char-count');
    if (wrap) wrap.style.color =
      len > CFG.MAX_REPLY * .9 ? '#f87171' :
      len > CFG.MAX_REPLY * .7 ? '#f59e0b' : '';

    rpText.classList.remove('is-err');
    const e = document.getElementById('rp-text-err'); if (e) e.textContent = '';
  });

  document.getElementById('submitReply')?.addEventListener('click', submitReply);
}

/* ══════════════════════════════════════════════════════════
   DELETE MODAL
══════════════════════════════════════════════════════════ */
let reviewToDelete = null;

function openDeleteModal(reviewId) {
  reviewToDelete = reviewId;
  document.getElementById('deleteModalOv')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  stopAuto();
}

function closeDeleteModal() {
  reviewToDelete = null;
  document.getElementById('deleteModalOv')?.classList.remove('open');
  document.body.style.overflow = '';
  startAuto();
}

function initDeleteModal() {
  document.getElementById('closeDeleteModal')?.addEventListener('click', closeDeleteModal);
  document.getElementById('cancelDeleteBtn')?.addEventListener('click', closeDeleteModal);
  document.getElementById('deleteModalOv')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('deleteModalOv')?.classList.contains('open')) {
      closeDeleteModal();
    }
  });

  document.getElementById('confirmDeleteBtn')?.addEventListener('click', () => {
    if (!reviewToDelete) return;
    
    const rid = reviewToDelete;
    
    // Hapus ulasan dari storage
    const userReviews = loadUserReviews().filter(r => r.id !== rid);
    saveUserReviews(userReviews);
    
    // Hapus juga reply-nya jika ada
    const replies = loadReplies();
    delete replies[rid];
    saveReplies(replies);
    
    render();
    closeDeleteModal();
    showToast('🗑️ Ulasanmu dihapus.', 'Ulasan berhasil dihapus dari halaman ini.', 'warn');
  });
}

function submitReply() {
  if (!isAdmin()) { closeReplyModal(); return; }

  const text = document.getElementById('rp-text')?.value.trim() || '';

  if (text.length < 10) {
    document.getElementById('rp-text')?.classList.add('is-err');
    const e = document.getElementById('rp-text-err');
    if (e) e.textContent = 'Balasan minimal 10 karakter.';
    return;
  }

  const btn = document.getElementById('submitReply');
  const btx = document.getElementById('rp-btn-text');
  const spn = document.getElementById('rp-spinner');
  if (btn) btn.disabled    = true;
  if (btx) btx.textContent = 'Mengirim...';
  if (spn) spn.classList.remove('hidden');

  setTimeout(() => {
    const rid     = State.replyTargetId;
    const replies = loadReplies();
    const isEdit  = !!replies[rid];

    replies[rid] = { text, ts: Date.now(), edited: isEdit };
    saveReplies(replies);

    closeReplyModal();
    render();

    showToast(
      isEdit ? '✏️ Balasan diperbarui!' : '✅ Balasan terkirim!',
      isEdit ? 'Perubahan balasan berhasil disimpan.'
             : 'Balasan kamu tampil di bawah ulasan pengguna.',
      'ok'
    );
  }, 750);
}

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════════════════ */
function showToast(title, message, type = 'ok') {
  const icons = { ok: '✅', warn: '⚠️', lock: '🔒', err: '❌' };
  const borderColors = {
    ok  : 'rgba(16,185,129,.35)',
    warn: 'rgba(245,158,11,.35)',
    lock: 'rgba(59,130,246,.35)',
    err : 'rgba(239,68,68,.35)',
  };

  const toast = document.createElement('div');
  toast.className = 'testi-toast';
  toast.style.borderColor = borderColors[type] || borderColors.ok;
  toast.innerHTML = `
    <span class="testi-toast-ic">${icons[type] || '💬'}</span>
    <div class="testi-toast-body">
      <div class="testi-toast-title">${title}</div>
      ${message ? `<div class="testi-toast-msg">${message}</div>` : ''}
    </div>`;

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 420);
  }, 4200);
}

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initControls();
  initTouch();
  initReviewModal();
  initReplyModal();
  initDeleteModal();
  render();
  startAuto();
});