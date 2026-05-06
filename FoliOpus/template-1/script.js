document.addEventListener('DOMContentLoaded', () => {
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
    
    document.getElementById('render-github').href = userConfig.sosmed?.github || '#';
    document.getElementById('render-linkedin').href = userConfig.sosmed?.linkedin || '#';
    
    const emailBtn = document.getElementById('render-email');
    if (emailBtn) {
        emailBtn.href = `mailto:${userConfig.sosmed?.email || ''}`;
        emailBtn.innerText = userConfig.hero?.teksTombolKontak || 'Email Me';
    }

    const roleElement = document.getElementById('render-role');
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
    setTimeout(typeWriter, 500);

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

    const btnBuySticky = document.querySelector('.btn-buy-sticky');
    if (btnBuySticky) {
        btnBuySticky.addEventListener('click', () => {
            btnBuySticky.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                btnBuySticky.style.transform = '';
                
                const toast = document.createElement('div');
                toast.innerText = '💳 Mengalihkan ke gerbang pembayaran FoliOpus...';
                Object.assign(toast.style, {
                    position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%) translateY(-50px)',
                    backgroundColor: 'var(--text-main)', color: 'var(--bg-color)', padding: '1rem 2rem',
                    borderRadius: '8px', fontFamily: 'var(--font-mono)', fontWeight: '600', zIndex: '10000', opacity: '0',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                });
                
                document.body.appendChild(toast);
                
                requestAnimationFrame(() => {
                    toast.style.transform = 'translateX(-50%) translateY(0)';
                    toast.style.opacity = '1';
                });

                setTimeout(() => {
                    toast.style.transform = 'translateX(-50%) translateY(-50px)';
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 400);
                }, 3000);
                
            }, 150);
        });
    }
});