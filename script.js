const AUTH = {
    USERS_KEY:   'foliOpusUsers',
    SESSION_KEY: 'foliOpusUser',
 
    ADMIN: {
        username:   'admin',
        password:   'admin123',
        redirectTo: 'admin/admin.html'
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
    if (card.closest('.payment-layout')) return;
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
            dropdown.innerHTML = `
                <a href="history.html" style="display:block; padding: 0.8rem 1rem; color: var(--text-light); text-decoration: none; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Riwayat</a>
                <button id="btnLogout" style="width: 100%; text-align: left; background: none; border: none; color: #ef4444; font-size: 0.9rem; font-weight: 600; padding: 0.8rem 1rem; cursor: pointer;">Keluar</button>
            `;

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

if (document.getElementById('btnSudahBayar')) {

    const session = AUTH.getSession();
    if (!session?.loggedIn) {
        sessionStorage.setItem('foliOpusRedirect', window.location.href);
        window.location.replace('login.html');
    } else {

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

        let currentPrice = tmpl.price;
        let isVoucherApplied = false;

        const voucherInput = document.getElementById('voucherInput');
        const btnApplyVoucher = document.getElementById('btnApplyVoucher');
        const voucherMsg = document.getElementById('voucherMsg');
        const discountRow = document.getElementById('discountRow');
        const summaryDiscount = document.getElementById('summaryDiscount');

        const voucherKey = 'foliOpusVoucher_' + session.username;
        const hasUsedVoucher = localStorage.getItem(voucherKey) === 'used';

        if (btnApplyVoucher) {
            btnApplyVoucher.addEventListener('click', () => {
                const code = voucherInput.value.trim().toLowerCase();
                
                voucherInput.style.borderColor = 'rgba(255,255,255,0.09)';
                voucherMsg.style.display = 'none';

                if (!code) return;

                if (code !== 'opus222') {
                    showMsg('Kode voucher tidak valid atau kedaluwarsa.', '#ef4444');
                    voucherInput.style.borderColor = '#ef4444';
                    return;
                }
                
                if (hasUsedVoucher) {
                    showMsg('Gagal! Kuota voucher OPUS222 untuk akunmu sudah habis (maks 1x pemakaian).', '#ef4444');
                    voucherInput.style.borderColor = '#ef4444';
                    return;
                }

                if (isVoucherApplied) return;

                isVoucherApplied = true;
                const discountAmount = currentPrice * 0.25;
                currentPrice = currentPrice - discountAmount;

                discountRow.style.display = 'flex';
                summaryDiscount.textContent = '-' + formatRupiah(discountAmount);
                document.getElementById('summaryTotal').textContent = formatRupiah(currentPrice);
                
                voucherInput.disabled = true;
                btnApplyVoucher.disabled = true;
                voucherInput.style.borderColor = '#22c55e';
                btnApplyVoucher.style.opacity = '0.5';
                btnApplyVoucher.textContent = 'Terpasang';
                
                showMsg('Voucher berhasil dipasang! Kamu hemat 25% 🎉', '#22c55e');
            });
        }

        function showMsg(msg, color) {
            voucherMsg.style.display = 'block';
            voucherMsg.textContent = msg;
            voucherMsg.style.color = color;
        }

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

        const TIMER_DURATION = 15 * 60;
        let timerSeconds     = TIMER_DURATION;
        let timerInterval    = null;
        let timerExpired     = false;

        const timerEl        = document.getElementById('paymentTimer');
        const timerCountEl   = document.getElementById('timerCount');
        const timerExpiredEl = document.getElementById('timerExpiredMsg');
        const btnSudahBayar  = document.getElementById('btnSudahBayar');

        function formatTime(sec) {
            const m = String(Math.floor(sec / 60)).padStart(2, '0');
            const s = String(sec % 60).padStart(2, '0');
            return m + ':' + s;
        }

        function tickTimer() {
            timerSeconds--;
            timerCountEl.textContent = formatTime(timerSeconds);
            if (timerSeconds <= 120) timerEl.classList.add('warning');
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerExpired = true;
                timerEl.style.display        = 'none';
                timerExpiredEl.style.display = 'block';
                btnSudahBayar.disabled       = true;
                btnSudahBayar.style.opacity  = '0.4';
                btnSudahBayar.style.cursor   = 'not-allowed';
            }
        }

        timerInterval = setInterval(tickTimer, 1000);

        const proofInput        = document.getElementById('proofInput');
        const uploadDropzone    = document.getElementById('uploadDropzone');
        const uploadPreviewWrap = document.getElementById('uploadPreviewWrap');
        const uploadThumb       = document.getElementById('uploadThumb');
        const uploadFileName    = document.getElementById('uploadFileName');
        const uploadFileSize    = document.getElementById('uploadFileSize');
        const uploadRemove      = document.getElementById('uploadRemove');

        let proofDataUrl = null;

        function formatBytes(bytes) {
            if (bytes < 1024)      return bytes + ' B';
            if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
            return (bytes/1024/1024).toFixed(1) + ' MB';
        }

        function handleFile(file) {
            if (!file) return;
            if (file.size > 5 * 1024 * 1024) { alert('Ukuran file maksimal 5 MB.'); return; }
            if (!file.type.startsWith('image/')) { alert('Hanya file gambar (PNG/JPG) yang diterima.'); return; }

            const reader = new FileReader();
            reader.onload = function(e) {
                proofDataUrl = e.target.result;
                uploadThumb.src            = proofDataUrl;
                uploadFileName.textContent = file.name;
                uploadFileSize.textContent = formatBytes(file.size);
                uploadPreviewWrap.classList.add('show');
                uploadDropzone.style.display = 'none';
                if (!timerExpired) btnSudahBayar.disabled = false;
            };
            reader.readAsDataURL(file);
        }

        proofInput.addEventListener('change', () => handleFile(proofInput.files[0]));

        uploadDropzone.addEventListener('dragover',  (e) => { e.preventDefault(); uploadDropzone.classList.add('dragover'); });
        uploadDropzone.addEventListener('dragleave', ()  => uploadDropzone.classList.remove('dragover'));
        uploadDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadDropzone.classList.remove('dragover');
            handleFile(e.dataTransfer.files[0]);
        });

        uploadRemove.addEventListener('click', () => {
            proofDataUrl = null;
            proofInput.value = '';
            uploadPreviewWrap.classList.remove('show');
            uploadDropzone.style.display = '';
            if (!timerExpired) btnSudahBayar.disabled = true;
        });

        function generateTrxId() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let code = 'FO-';
            for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
            code += '-';
            for (let i = 0; i < 2; i++) code += Math.floor(Math.random() * 10);
            return code;
        }

        function generateBarcode(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            const heights = [18,28,36,22,40,30,18,38,26,20,35,28,40,18,32,24,38,20,30,36,22,18,40,28,34,20,38,26,18,32,40,22,30,18,36,28,20,40,24,34,18,30];
            for (let i = 0; i < 42; i++) {
                const bar = document.createElement('span');
                bar.style.height = heights[i % heights.length] + 'px';
                bar.style.width  = (i % 3 === 0) ? '3px' : '2px';
                container.appendChild(bar);
            }
        }

        function populateReceipt(trxId) {
            const now   = new Date();
            const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
            const tgl   = now.getDate() + ' ' + bulan[now.getMonth()] + ' ' + now.getFullYear();
            const jam   = String(now.getHours()).padStart(2,'0') + '.' +
                          String(now.getMinutes()).padStart(2,'0') + '.' +
                          String(now.getSeconds()).padStart(2,'0') + ' WITA';

            document.getElementById('rcTrxId').textContent    = trxId;
            document.getElementById('rcDate').textContent     = tgl;
            document.getElementById('rcTime').textContent     = jam;
            document.getElementById('rcUser').textContent     = session?.username || '—';
            document.getElementById('rcTemplate').textContent = tmpl.name;
            document.getElementById('rcPaket').textContent    = tmpl.badge;
            document.getElementById('rcTotal').textContent    = formatRupiah(currentPrice);
            document.getElementById('rcBarcodeText').textContent = trxId;

            generateBarcode('rcBarcode');

            if (proofDataUrl) {
                document.getElementById('rcProofImg').src          = proofDataUrl;
                document.getElementById('rcProofSection').style.display = 'block';
            }
        }

        btnSudahBayar.addEventListener('click', () => {
            if (timerExpired || !proofDataUrl) return;
            clearInterval(timerInterval);
            goToStep(2);

            setTimeout(() => {
                goToStep(3);
                const trxId = generateTrxId();
                populateReceipt(trxId);
                
                if (isVoucherApplied) {
                    localStorage.setItem(voucherKey, 'used');
                }

                let history = JSON.parse(localStorage.getItem('foliOpusHistory_' + session.username)) || [];
                if (!history.find(h => h.templateKey === templateKey)) {
                    history.push({
                        templateKey, name: tmpl.name,
                        date: new Date().toISOString(),
                        zipUrl: tmpl.zipUrl, thumb: tmpl.thumb, trxId
                    });
                    localStorage.setItem('foliOpusHistory_' + session.username, JSON.stringify(history));
                }

                document.getElementById('actionBtnsPlaceholder').innerHTML = `
                    <a href="editor.html?template=${templateKey}" class="btn-primary" style="display:flex;justify-content:center;padding:1rem;margin-bottom:0.75rem;text-decoration:none;font-size:1.05rem;box-shadow:0 10px 25px rgba(245,158,11,0.3);">
                        🎨 Buka Live Editor
                    </a>
                    <a href="${tmpl.zipUrl}" class="btn-secondary" style="display:flex;justify-content:center;padding:0.9rem;margin-bottom:1rem;text-decoration:none;">
                        ⬇️ Download Original Zip
                    </a>
                `;

                const backBtn = document.getElementById('backHomeBtn');
                if (backBtn) backBtn.style.display = 'none';

            }, 2500);
        });

        document.getElementById('btnSaveReceipt').addEventListener('click', async () => {
            const btn = document.getElementById('btnSaveReceipt');
            btn.textContent = 'Menyimpan...';
            btn.disabled    = true;

            try {
                if (!window.html2canvas) {
                    await new Promise((resolve, reject) => {
                        const s = document.createElement('script');
                        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                        s.onload = resolve;
                        s.onerror = reject;
                        document.head.appendChild(s);
                    });
                }

                const canvas = await html2canvas(document.getElementById('receiptEl'), {
                    backgroundColor: '#1e293b', scale: 2, useCORS: true, logging: false
                });

                const link    = document.createElement('a');
                link.download = 'struk-foliopus-' + (document.getElementById('rcTrxId').textContent || 'trx') + '.png';
                link.href     = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                alert('Gagal menyimpan gambar. Coba gunakan Cetak Struk (Ctrl+P) sebagai alternatif.');
                console.error(err);
            } finally {
                btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Simpan PNG`;
                btn.disabled = false;
            }
        });

    }
}
