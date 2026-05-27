// --- PROTOKOL INTERSECTION OBSERVER ---
// Mengganti scroll event listener usang dengan sensor gaib yang ramah CPU
const navbar = document.querySelector('.navbar');
const navTrigger = document.getElementById('nav-trigger');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Kalau trigger-nya udah ga keliatan (user nge-scroll ke bawah), kasih background
        if (!entry.isIntersecting) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}, { threshold: 0 });

if (navTrigger) navObserver.observe(navTrigger);

// --- INTERAKSI KARTU ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// --- SISTEM NOTIFIKASI ELIT (ANTI-ALERT) ---
// Membunuh alert() blocking yang ngerusak UX, diganti dengan Toast dinamis
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animasi masuk pake requestAnimationFrame biar smooth
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Otomatis bunuh diri setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Tunggu animasi selesai baru cabut dari DOM
    }, 3000);
}

// --- LOGIKA TOMBOL CTA HERO ---
const btnBuatCV = document.querySelector('.hero-cta .btn-primary.large');
const btnDemo = document.querySelector('.hero-cta .btn-secondary.large');

if (btnBuatCV) {
    btnBuatCV.addEventListener('click', (e) => {
        e.preventDefault();
        const katalogSection = document.querySelector('#templates');
        katalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

if (btnDemo) {
    btnDemo.addEventListener('click', (e) => {
        e.preventDefault();
        const status = btnDemo.getAttribute('data-status');
        
        if (status === 'coming-soon') {
            showToast('Sabar cuy! Sistem lagi ngeracik live preview paling brutal.');
        } else {
            window.open('#', '_blank');
        }
    });
}

// --- MESIN NAVIGASI KATALOG TEMPLATE ---
const katalogCards = document.querySelectorAll('.template-card');

katalogCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetUrl = card.getAttribute('data-url');
        const status = card.getAttribute('data-status');
        
        if (status === 'coming-soon') {
            showToast('Template Belum Selesai');
        } else if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    });
});