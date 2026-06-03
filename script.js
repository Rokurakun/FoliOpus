const AUTH = {
    USERS_KEY:   'foliOpusUsers',
    SESSION_KEY: 'foliOpusUser',
 
    ADMIN: {
        username:   'admin',
        password:   'admin123',
        redirectTo: 'admin/index.html'
    },
 
    getUsers() {
        try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || []; }
        catch { return []; }
    },
 
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },
 
    findUser(username) {
        return this.getUsers().find(
            u => u.username.toLowerCase() === username.toLowerCase()
        );
    },
 
    register(username, password) {
        if (username.length < 3)
            return { ok: false, field: 'username', msg: 'Username minimal 3 karakter' };
        if (password.length < 6)
            return { ok: false, field: 'password', msg: 'Password minimal 6 karakter' };
        if (this.findUser(username))
            return { ok: false, field: 'username', msg: 'Username sudah dipakai' };
 
        const users = this.getUsers();
        users.push({ username, password, role: 'user', createdAt: Date.now() });
        this.saveUsers(users);
        return { ok: true };
    },
 
    login(username, password) {
        if (username === this.ADMIN.username && password === this.ADMIN.password)
            return { ok: true, role: 'admin' };
 
        const user = this.findUser(username);
        if (!user)
            return { ok: false, field: 'username', msg: 'Akun tidak ditemukan' };
        if (user.password !== password)
            return { ok: false, field: 'password', msg: 'Password salah' };
 
        return { ok: true, role: 'user' };
    },
 
    setSession(username, role) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify({
            username, role, loggedIn: true
        }));
    },
 
    getSession() {
        try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }
        catch { return null; }
    },
 
    clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    }
};

const navbar     = document.querySelector('.navbar');
const navTrigger = document.getElementById('nav-trigger');
 
if (navbar && navTrigger) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            navbar.classList.toggle('scrolled', !entry.isIntersecting);
        });
    }, { threshold: 0 });
    navObserver.observe(navTrigger);
}

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

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

const btnBuatCV = document.querySelector('.hero-cta .btn-primary.large');
const btnDemo   = document.querySelector('.hero-cta .btn-secondary.large');
 
if (btnBuatCV) {
    btnBuatCV.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#templates').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}
 
if (btnDemo) {
    btnDemo.addEventListener('click', (e) => {
        e.preventDefault();
        if (btnDemo.getAttribute('data-status') === 'coming-soon') {
            showToast('Sabar cuy! Sistem lagi ngeracik live preview paling brutal.');
        } else {
            window.open('#', '_blank');
        }
    });
}

const katalogCards = document.querySelectorAll('.template-card');
katalogCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetUrl = card.getAttribute('data-url');
        const status    = card.getAttribute('data-status');
        if (status === 'coming-soon') {
            showToast('Template Belum Selesai');
        } else if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    });
});

function updateNavbar() {
    const btnMasuk   = document.querySelector('.navbar .btn-primary');
    const navLinks   = document.querySelector('.navbar .nav-links');
    if (!btnMasuk) return;
 
    const session = AUTH.getSession();

    if (session?.loggedIn) {
        btnMasuk.textContent = session.username + ' ▾';
        btnMasuk.removeAttribute('href');
        btnMasuk.onclick = null;

        let dropdown = document.getElementById('userDropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'userDropdown';
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = `<button id="btnLogout">Keluar</button>`;
            const wrapper = document.createElement('div');
            wrapper.className = 'nav-user-wrap';
            btnMasuk.parentNode.replaceChild(wrapper, btnMasuk);
            wrapper.appendChild(btnMasuk);
            wrapper.appendChild(dropdown);
 
            document.getElementById('btnLogout').addEventListener('click', () => {
                AUTH.clearSession();
                location.reload();
            });
        }
 
        btnMasuk.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
 
        document.addEventListener('click', () => dropdown.classList.remove('show'));
 
    } else {
        btnMasuk.textContent = 'Masuk';
        btnMasuk.onclick = () => window.location.href = 'login.html';
    }

    if (navLinks && !document.getElementById('hamburger')) {
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburger';
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Buka menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navbar.insertBefore(hamburger, navLinks);
 
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('nav-open');
            hamburger.classList.toggle('open', isOpen);
        });
 
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('nav-open');
                hamburger.classList.remove('open');
            }
        });
    }
}
 
updateNavbar();

// LOGIN PAGE
if (document.getElementById('btnLogin')) {
    const btnLogin   = document.getElementById('btnLogin');
    const btnText    = document.getElementById('btnText');
    const spinner    = document.getElementById('spinner');
    const alertBox   = document.getElementById('alertBox');
    const successBox = document.getElementById('successBox');
    const uInput     = document.getElementById('username');
    const pInput     = document.getElementById('password');
    const uError     = document.getElementById('usernameError');
    const pError     = document.getElementById('passwordError');
    const togglePw   = document.getElementById('togglePw');
    const eyeShow    = document.getElementById('eyeShow');
    const eyeHide    = document.getElementById('eyeHide');
 
    const justRegistered = sessionStorage.getItem('registerSuccess');
    if (justRegistered) {
        sessionStorage.removeItem('registerSuccess');
        uInput.value = justRegistered;
        successBox.textContent = `Akun "${justRegistered}" berhasil dibuat! Silakan masuk.`;
        successBox.classList.add('show');
        pInput.focus();
    }
 
    (function checkSession() {
        const s = AUTH.getSession();
        if (!s?.loggedIn) return;
        window.location.replace(
            s.role === 'admin'
                ? AUTH.ADMIN.redirectTo
                : (sessionStorage.getItem('foliOpusRedirect') || 'index.html')
        );
    })();
 
    togglePw.addEventListener('click', () => {
        const hidden = pInput.type === 'password';
        pInput.type = hidden ? 'text' : 'password';
        eyeShow.style.display = hidden ? 'none' : '';
        eyeHide.style.display = hidden ? ''     : 'none';
    });
 
    function clearLoginErrors() {
        [uInput, pInput].forEach(el => el.classList.remove('is-error'));
        uError.textContent = '';
        pError.textContent = '';
        [uError, pError].forEach(el => el.classList.remove('show'));
        alertBox.classList.remove('show');
    }
 
    function setLoginLoading(on) {
        btnLogin.disabled   = on;
        btnText.textContent = on ? 'Memverifikasi...' : 'Masuk';
        spinner.classList.toggle('show', on);
    }
 
    function validateLogin() {
        let ok = true;
        if (!uInput.value.trim()) {
            uInput.classList.add('is-error');
            uError.textContent = 'Username tidak boleh kosong';
            uError.classList.add('show');
            ok = false;
        }
        if (!pInput.value) {
            pInput.classList.add('is-error');
            pError.textContent = 'Password tidak boleh kosong';
            pError.classList.add('show');
            ok = false;
        }
        return ok;
    }
 
    function handleLogin() {
        clearLoginErrors();
        if (!validateLogin()) return;
        setLoginLoading(true);
        setTimeout(() => {
            setLoginLoading(false);
            const result = AUTH.login(uInput.value.trim(), pInput.value);
            if (!result.ok) {
                if (result.field === 'username') {
                    uInput.classList.add('is-error');
                    uError.textContent = result.msg;
                    uError.classList.add('show');
                } else if (result.field === 'password') {
                    pInput.classList.add('is-error');
                    pError.textContent = result.msg;
                    pError.classList.add('show');
                } else {
                    alertBox.textContent = result.msg;
                    alertBox.classList.add('show');
                }
                return;
            }
            AUTH.setSession(uInput.value.trim(), result.role);
            if (result.role === 'admin') {
                window.location.href = AUTH.ADMIN.redirectTo;
            } else {
                const redirectTo = sessionStorage.getItem('foliOpusRedirect') || 'index.html';
                sessionStorage.removeItem('foliOpusRedirect');
                window.location.href = redirectTo;
            }
        }, 700);
    }
 
    btnLogin.addEventListener('click', handleLogin);
    [uInput, pInput].forEach(el => {
        el.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
        el.addEventListener('input',   () => { el.classList.remove('is-error'); alertBox.classList.remove('show'); });
    });
}

// REGISTER PAGE
if (document.getElementById('btnRegister')) {
    const btnRegister = document.getElementById('btnRegister');
    const btnText     = document.getElementById('btnText');
    const spinner     = document.getElementById('spinner');
    const alertBox    = document.getElementById('alertBox');
    const uInput      = document.getElementById('username');
    const pInput      = document.getElementById('password');
    const cInput      = document.getElementById('confirmPassword');
    const uError      = document.getElementById('usernameError');
    const pError      = document.getElementById('passwordError');
    const cError      = document.getElementById('confirmError');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLbl = document.getElementById('strengthLabel');
 
    (function checkSession() {
        const s = AUTH.getSession();
        if (s?.loggedIn) window.location.replace('index.html');
    })();
 
    function makeToggle(btnId, inputEl, showId, hideId) {
        document.getElementById(btnId).addEventListener('click', () => {
            const hidden = inputEl.type === 'password';
            inputEl.type = hidden ? 'text' : 'password';
            document.getElementById(showId).style.display = hidden ? 'none' : '';
            document.getElementById(hideId).style.display = hidden ? ''     : 'none';
        });
    }
    makeToggle('togglePw1', pInput, 'eye1Show', 'eye1Hide');
    makeToggle('togglePw2', cInput, 'eye2Show', 'eye2Hide');
 
    const STRENGTH_LEVELS = [
        { label: '' }, { label: 'Lemah' }, { label: 'Lumayan' },
        { label: 'Cukup kuat' }, { label: 'Kuat 💪' }
    ];
 
    function calcStrength(pw) {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 6)  score++;
        if (pw.length >= 10) score++;
        if (/[A-Z]/.test(pw) || /[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return Math.min(score, 4);
    }
 
    pInput.addEventListener('input', () => {
        const lvl = calcStrength(pInput.value);
        strengthBar.className = 'strength-bar' + (lvl ? ` s${lvl}` : '');
        strengthLbl.textContent = STRENGTH_LEVELS[lvl].label;
        pInput.classList.remove('is-error');
        alertBox.classList.remove('show');
    });
 
    function clearRegisterErrors() {
        [uInput, pInput, cInput].forEach(el => el.classList.remove('is-error'));
        [uError, pError, cError].forEach(el => { el.textContent = ''; el.classList.remove('show'); });
        alertBox.classList.remove('show');
    }
 
    function showFieldError(inputEl, errorEl, msg) {
        inputEl.classList.add('is-error');
        errorEl.textContent = msg;
        errorEl.classList.add('show');
    }
 
    function setRegisterLoading(on) {
        btnRegister.disabled = on;
        btnText.textContent  = on ? 'Membuat akun...' : 'Buat Akun';
        spinner.classList.toggle('show', on);
    }
 
    function validateRegister() {
        let ok = true;
        if (!uInput.value.trim()) { showFieldError(uInput, uError, 'Username tidak boleh kosong'); ok = false; }
        if (!pInput.value)        { showFieldError(pInput, pError, 'Password tidak boleh kosong'); ok = false; }
        if (ok && cInput.value !== pInput.value) { showFieldError(cInput, cError, 'Password tidak cocok'); ok = false; }
        return ok;
    }
 
    function handleRegister() {
        clearRegisterErrors();
        if (!validateRegister()) return;
        setRegisterLoading(true);
        setTimeout(() => {
            setRegisterLoading(false);
            const result = AUTH.register(uInput.value.trim(), pInput.value);
            if (!result.ok) {
                if (result.field === 'username') showFieldError(uInput, uError, result.msg);
                else if (result.field === 'password') showFieldError(pInput, pError, result.msg);
                else { alertBox.textContent = result.msg; alertBox.classList.add('show'); }
                return;
            }
            sessionStorage.setItem('registerSuccess', uInput.value.trim());
            window.location.href = 'login.html';
        }, 700);
    }
 
    btnRegister.addEventListener('click', handleRegister);
    [uInput, pInput, cInput].forEach(el => {
        el.addEventListener('keydown', e => { if (e.key === 'Enter') handleRegister(); });
        el.addEventListener('input',   () => { el.classList.remove('is-error'); alertBox.classList.remove('show'); });
    });
}

// PAYMENT PAGE
if (document.getElementById('btnSudahBayar')) {
 
    const TEMPLATES = {
        starter: {
            name: 'FoliOpus Starter', price: 149000, badge: 'Starter', badgeCls: '',
            thumb: 'linear-gradient(135deg, #0f172a 40%, #2dd4bf)', zipUrl: './downloads/foliopus-starter.zip'
        },
        pro: {
            name: 'FoliOpus Pro', price: 299000, badge: 'Pro', badgeCls: 'badge-pro',
            thumb: 'linear-gradient(135deg, #0a0a0a 40%, #eab308)', zipUrl: './downloads/foliopus-pro.zip'
        },
        premium: {
            name: 'FoliOpus Premium', price: 499000, badge: 'Premium', badgeCls: 'badge-premium',
            thumb: 'linear-gradient(135deg, #f8fafc 40%, #14b8a6)', zipUrl: './downloads/foliopus-premium.zip'
        }
    };
 
    function formatRupiah(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    }
 
    const session = AUTH.getSession();
    if (!session?.loggedIn) {
        sessionStorage.setItem('foliOpusRedirect', window.location.href);
        window.location.replace('login.html');
    }
 
    const navUser = document.getElementById('navUser');
    if (navUser && session?.username) navUser.textContent = '👤 ' + session.username;
 
    const params      = new URLSearchParams(window.location.search);
    const templateKey = params.get('template') || 'starter';
    const tmpl        = TEMPLATES[templateKey] || TEMPLATES.starter;
 
    document.getElementById('summaryName').textContent       = tmpl.name;
    document.getElementById('summaryBadge').textContent      = tmpl.badge;
    document.getElementById('summaryBadge').className        = 'summary-badge ' + tmpl.badgeCls;
    document.getElementById('summaryThumb').style.background = tmpl.thumb;
    document.getElementById('summaryPrice').textContent      = formatRupiah(tmpl.price);
    document.getElementById('summaryTotal').textContent      = formatRupiah(tmpl.price);
    document.getElementById('displayAmount').textContent     = formatRupiah(tmpl.price);
    document.getElementById('downloadName').textContent      = 'Source Code — ' + tmpl.name;
    document.getElementById('downloadLink').href             = tmpl.zipUrl;
 
    function goToStep(step) {
        document.querySelectorAll('.step-panel').forEach((p, i) => {
            p.classList.toggle('active', i + 1 === step);
        });
        [1, 2, 3].forEach(n => {
            const el   = document.getElementById('stepEl' + n);
            const line = document.getElementById('stepLine' + n);
            el.classList.remove('active', 'done');
            if (n < step)        el.classList.add('done');
            else if (n === step) el.classList.add('active');
            if (line) line.classList.toggle('done', n < step);
        });
    }
 
    document.getElementById('btnSudahBayar').addEventListener('click', () => {
        goToStep(2);
        setTimeout(() => goToStep(3), 2500);
    });
}