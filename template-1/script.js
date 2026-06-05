// Kita bungkus semua logika penulisan DOM ke dalam satu fungsi terpusat
function renderTemplate() {
    if (typeof userConfig === 'undefined') {
        document.body.innerHTML = `
            <div style="display:flex; height:100vh; align-items:center; justify-content:center; flex-direction:column; text-align:center; background:#0f172a; color:#f8fafc; font-family:sans-serif;">
                <h1 style="color:#ef4444; margin-bottom:1rem;">⚠️ DATA FAILURE</h1>
                <p style="max-width:400px; color:#94a3b8;">File data.js korup. Cek lagi sintaks koma (,) atau kutip ("") yang kehapus.</p>
            </div>
        `;
        return;
    }

    if (userConfig.meta && userConfig.meta.titleTag) {
        document.title = userConfig.meta.titleTag;
    }

    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text || '';
    };

    safeSetText('render-nama', userConfig.hero?.namaLengkap);
    safeSetText('render-bio', userConfig.hero?.deskripsiBio);
    
    const gitBtn = document.getElementById('render-github');
    if(gitBtn) gitBtn.href = userConfig.sosmed?.github || '#';
    
    const inBtn = document.getElementById('render-linkedin');
    if(inBtn) inBtn.href = userConfig.sosmed?.linkedin || '#';
    
    const emailBtn = document.getElementById('render-email');
    if (emailBtn) {
        emailBtn.href = `mailto:${userConfig.sosmed?.email || ''}`;
        emailBtn.innerText = userConfig.hero?.teksTombolKontak || 'Email Me';
    }

    // Eksekusi ulang typewriter effect
    const roleElement = document.getElementById('render-role');
    if(roleElement) {
        const roleText = userConfig.hero?.pekerjaan || 'Tech Enthusiast';
        roleElement.innerText = '';
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < roleText.length) {
                roleElement.innerText += roleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50); 
            }
        };
        setTimeout(typeWriter, 100); // Percepat delay pas render ulang
    }

    const skillsContainer = document.getElementById('render-skills');
    if (skillsContainer && userConfig.skillset && Array.isArray(userConfig.skillset)) {
        skillsContainer.innerHTML = ''; 
        userConfig.skillset.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.innerText = skill.trim();
            skillsContainer.appendChild(span);
        });
    }

    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid && userConfig.projects && Array.isArray(userConfig.projects)) {
        projectGrid.innerHTML = ''; 
        
        userConfig.projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            // Pastikan card yang dirender ulang langsung keliatan tanpa animasi (bypass observer)
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            const title = document.createElement('h4');
            title.innerText = proj.judul || 'Untitled Project';
            
            const desc = document.createElement('p');
            desc.innerText = proj.deskripsi || 'No description provided.';
            
            const link = document.createElement('a');
            link.href = proj.linkRepo || '#';
            link.className = 'project-link';
            link.target = '_blank';
            link.innerHTML = 'View Source &rarr;';
            
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(link);
            projectGrid.appendChild(card);
        });
    }

    const metaDescription = document.getElementById('dynamic-meta-desc');
    if (metaDescription && userConfig.hero) {
        const namaKlien = userConfig.hero.namaLengkap || 'Profesional';
        const roleKlien = userConfig.hero.pekerjaan || 'Kreator Digital';
        const kalimatSEO = `Portofolio digital interaktif milik ${namaKlien}, seorang ${roleKlien}. Jelajahi karya dan keahlian terbaik saya di sini.`;
        metaDescription.setAttribute('content', kalimatSEO);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Panggil render pertama kali saat web load
    renderTemplate();

    // 2. Setup intersection observer cuma sekali di awal
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        sectionObserver.observe(section);
    });

    // 3. Setup event button
    const btnBuySticky = document.querySelector('.btn-buy-sticky');
    if (btnBuySticky) {
        btnBuySticky.addEventListener('click', () => {
            btnBuySticky.style.transform = 'scale(0.95)';
            
            let session = null;
            try { session = JSON.parse(localStorage.getItem('foliOpusUser')); } catch (_) {}
            
            if (session?.loggedIn) {
                window.location.href = '../payment.html?template=starter';
            } else {
                sessionStorage.setItem('foliOpusRedirect', '../payment.html?template=starter');
                window.location.href = '../login.html';
            }
        });
    }
});

// ==========================================
// ANTENA PENERIMA SINYAL DARI EDITOR
// ==========================================
window.addEventListener('message', (event) => {
    // Cek apakah sinyal ini beneran datang dari arsitektur editor dewa kita
    if (event.data && event.data.type === 'UPDATE_DATA') {
        // Timpa variabel otak utama
        window.userConfig = event.data.payload;
        // Gas render ulang HTML pake data baru!
        renderTemplate();
    }
});