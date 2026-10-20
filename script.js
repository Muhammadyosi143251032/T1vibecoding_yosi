/* =========================================================
   1. DATA SIMULASI (MOCK DATA)
   ========================================================= */
const categories = ["Semua", "Teknologi", "Bisnis Digital", "Pemasaran", "Desain", "Administrasi"];

const jobs = [
    {
        id: 1, title: "Frontend Developer Intern", company: "Tokopedia", location: "Jakarta (Hybrid)", type: "Magang", category: "Teknologi", salary: "Rp 3.000.000 - Rp 4.500.000", applicants: 124,
        description: "Bergabung dengan tim Engineering Tokopedia untuk membangun antarmuka web yang responsif dan cepat. Anda akan dimentori oleh Senior Engineers dan terlibat langsung dalam proyek berskala besar.",
        requirements: ["Mahasiswa tingkat akhir jurusan IT.", "Memahami HTML, CSS, dan JavaScript.", "Familiar dengan React/Vue.", "Problem solving yang baik."]
    },
    {
        id: 2, title: "Digital Marketing Specialist", company: "Shopee", location: "Jakarta (On-site)", type: "Purna Waktu", category: "Pemasaran", salary: "Rp 6.000.000 - Rp 9.000.000", applicants: 312,
        description: "Mengelola, mengeksekusi, dan mengoptimalkan kampanye pemasaran digital untuk meningkatkan akuisisi dan retensi pengguna. Berkolaborasi dengan tim kreatif.",
        requirements: ["S1 Semua Jurusan.", "Pengalaman min 1 tahun di Digital Marketing.", "Memahami SEO & SEM.", "Terbiasa dengan Google Analytics."]
    },
    {
        id: 3, title: "UI/UX Designer", company: "Gojek", location: "Bandung (Remote)", type: "Purna Waktu", category: "Desain", salary: "Rp 7.000.000 - Rp 12.000.000", applicants: 89,
        description: "Merancang pengalaman pengguna (UX) dan antarmuka (UI) yang intuitif untuk aplikasi internal maupun eksternal Gojek.",
        requirements: ["Portofolio UI/UX yang kuat.", "Mahir Figma/Sketch.", "Memahami UCD.", "Komunikasi yang baik."]
    },
    {
        id: 4, title: "Business Analyst Intern", company: "Traveloka", location: "Tangerang (Hybrid)", type: "Magang", category: "Bisnis Digital", salary: "Rp 3.500.000 - Rp 5.000.000", applicants: 205,
        description: "Membantu tim strategi bisnis dalam mengumpulkan data pasar, menganalisis tren, dan menyusun laporan keputusan strategis.",
        requirements: ["S1 Manajemen/Ekonomi/Teknik Industri.", "Analisis data dengan Excel/Google Sheets.", "Pengetahuan dasar SQL.", "Teliti dan proaktif."]
    },
    {
        id: 5, title: "HR Administrator", company: "Astra International", location: "Jakarta (On-site)", type: "Kontrak", category: "Administrasi", salary: "Rp 5.500.000 - Rp 7.000.000", applicants: 156,
        description: "Mengelola dokumen administrasi kepegawaian, membantu rekrutmen, dan mengelola database karyawan.",
        requirements: ["S1 Psikologi/Manajemen SDM.", "Keterampilan organisasi yang baik.", "Mahir MS Office.", "Komunikasi profesional."]
    },
    {
        id: 6, title: "Backend Engineer", company: "Bukalapak", location: "Yogyakarta (Remote)", type: "Purna Waktu", category: "Teknologi", salary: "Rp 8.000.000 - Rp 15.000.000", applicants: 78,
        description: "Mengembangkan API yang scalable dan aman, mengoptimalkan kinerja database untuk traffic tinggi.",
        requirements: ["Pengalaman 1-3 tahun backend (Go/Python/Node.js).", "Struktur data & algoritma.", "SQL dan NoSQL.", "Pemahaman CI/CD."]
    },
    {
        id: 7, title: "Graphic Design Intern", company: "Ruangguru", location: "Jakarta (Hybrid)", type: "Magang", category: "Desain", salary: "Rp 2.500.000 - Rp 4.000.000", applicants: 340,
        description: "Membantu tim konten membuat materi visual grafis untuk media sosial, blog, dan materi edukasi.",
        requirements: ["Mahasiswa aktif DKV.", "Adobe Illustrator/Photoshop/Canva.", "Kreatif mengikuti tren.", "Wajib melampirkan portofolio."]
    },
    {
        id: 8, title: "SEO Specialist", company: "Blibli", location: "Jakarta (Hybrid)", type: "Purna Waktu", category: "Pemasaran", salary: "Rp 6.500.000 - Rp 9.500.000", applicants: 92,
        description: "Bertanggung jawab untuk optimisasi on-page dan off-page guna meningkatkan peringkat organik situs.",
        requirements: ["Memahami algoritma mesin pencari.", "Pengalaman Ahrefs/SEMrush.", "Riset kata kunci.", "Dasar HTML/CSS."]
    }
];

/* =========================================================
   2. STATE & LOCAL STORAGE
   ========================================================= */
let currentView = 'home';
let activeCategory = 'Semua';
let currentJobId = null;

const getStorage = (key, defaultVal) => JSON.parse(localStorage.getItem(key)) || defaultVal;
const setStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));

let userFavorites = getStorage('karierkita_favorites_v5', [1, 3]);
let userApplications = getStorage('karierkita_applications_v5', [
    { id: 1700100000000, jobId: 2, name: 'Muhammad Yosi', email: 'muhammad.yosi@email.com', cvLink: 'https://linkedin.com/in/muhammadyosi', status: 'Ditinjau', date: '10 Oktober 2026' },
    { id: 1700200000000, jobId: 4, name: 'Muhammad Yosi', email: 'muhammad.yosi@email.com', cvLink: 'https://linkedin.com/in/muhammadyosi', status: 'Wawancara', date: '15 Oktober 2026' }
]);

// Profil disesuaikan: Muhammad Yosi | Politeknik Negeri Jember | Bisnis Digital
let userProfile = getStorage('karierkita_profile_v5', {
    name: 'Muhammad Yosi',
    email: 'muhammad.yosi@email.com',
    university: 'Politeknik Negeri Jember',
    major: 'Bisnis Digital',
    bio: 'Mahasiswa Program Studi Bisnis Digital di Politeknik Negeri Jember yang bersemangat dalam pengembangan produk digital, e-commerce, dan strategi pemasaran modern.',
    avatar: 'image_d2d8c7.jpg'
});

function updateUserInfoUI() {
    const names = ['nav-user-name', 'nav-mobile-name', 'profile-display-name'];
    names.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = userProfile.name;
    });
    const emailProf = document.getElementById('profile-display-email');
    if (emailProf) emailProf.textContent = userProfile.email;
    const avatars = ['nav-user-avatar', 'nav-mobile-avatar', 'profile-user-avatar'];
    avatars.forEach(id => {
        const el = document.getElementById(id);
        if (el && userProfile.avatar) el.src = userProfile.avatar;
    });
}

/* =========================================================
   3. UI CORE & NAVIGATION
   ========================================================= */
function navigate(viewName, params = {}) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');
    currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('text-brand-600', 'bg-brand-50');
        el.classList.add('text-slate-600');
    });
    const activeBtn = document.getElementById(`nav-btn-${viewName}`);
    if(activeBtn) {
        activeBtn.classList.add('text-brand-600', 'bg-brand-50');
        activeBtn.classList.remove('text-slate-600');
    }

    if (viewName === 'explore') { renderCategoryFilters(); filterJobs(); }
    else if (viewName === 'job-detail') { loadJobDetail(params.id); }
    else if (viewName === 'applications') { renderApplications(); renderFavorites(); }
    else if (viewName === 'profile') { loadProfile(); }

    document.getElementById('mobile-menu').classList.add('hidden');
}

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '<i class="ph-fill ph-check-circle text-green-400 text-3xl"></i>' 
                                    : '<i class="ph-fill ph-info text-blue-400 text-3xl"></i>';
    toast.innerHTML = `${icon} <span class="font-bold tracking-wide">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
}

/* =========================================================
   4. RENDER UTILITIES
   ========================================================= */
function createJobCard(job) {
    const isFav = userFavorites.includes(job.id);
    const favIconClass = isFav ? 'ph-fill ph-heart text-red-500' : 'ph-bold ph-heart text-slate-300 group-hover:text-red-400';
    
    return `
        <div class="job-card bg-white rounded-2xl border-2 border-slate-100 p-6 flex flex-col h-full cursor-pointer group relative overflow-hidden" onclick="navigate('job-detail', {id: ${job.id}})">
            <div class="flex justify-between items-start mb-5">
                <div class="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition duration-300">
                    <i class="ph-fill ph-buildings text-3xl"></i>
                </div>
                <button onclick="toggleFavorite(event, ${job.id})" class="p-2 -mr-2 -mt-2 rounded-full hover:bg-slate-50 transition z-10">
                    <i class="${favIconClass} text-2xl transition" id="fav-icon-${job.id}"></i>
                </button>
            </div>
            
            <div class="mb-4 flex-grow">
                <span class="inline-block px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 mb-3 uppercase tracking-wider">${job.category}</span>
                <h3 class="text-xl font-extrabold text-slate-800 mb-1 group-hover:text-brand-600 transition leading-tight">${job.title}</h3>
                <p class="text-sm font-bold text-brand-500">${job.company}</p>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-6">
                <div class="flex items-center text-xs font-medium text-slate-600 bg-slate-50 py-1.5 px-2.5 rounded-lg border border-slate-100">
                    <i class="ph-fill ph-map-pin text-brand-400 mr-1.5 text-sm"></i> ${job.location.split(' ')[0]}
                </div>
                <div class="flex items-center text-xs font-medium text-slate-600 bg-slate-50 py-1.5 px-2.5 rounded-lg border border-slate-100">
                    <i class="ph-fill ph-briefcase text-brand-400 mr-1.5 text-sm"></i> ${job.type}
                </div>
            </div>
            
            <div class="pt-4 border-t border-slate-100 mt-auto flex justify-between items-center">
                <div class="flex items-center text-xs text-slate-500 font-bold">
                    <div class="flex -space-x-2 mr-2">
                        <img class="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=${job.id}" alt="avatar">
                        <img class="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=${job.id+10}" alt="avatar">
                    </div>
                    ${job.applicants} Pelamar
                </div>
                <span class="text-brand-600 font-bold text-sm bg-brand-50 px-3 py-1.5 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition">Lihat</span>
            </div>
        </div>
    `;
}

function toggleFavorite(event, jobId) {
    event.stopPropagation();
    const index = userFavorites.indexOf(jobId);
    if (index > -1) {
        userFavorites.splice(index, 1);
        showToast('Dihapus dari favorit', 'info');
    } else {
        userFavorites.push(jobId);
        showToast('Disimpan ke favorit', 'success');
    }
    setStorage('karierkita_favorites_v5', userFavorites);
    
    const icon = document.getElementById(`fav-icon-${jobId}`);
    if (icon) {
        icon.className = index > -1 ? 'ph-bold ph-heart text-slate-300 group-hover:text-red-400 text-2xl transition' : 'ph-fill ph-heart text-red-500 text-2xl transition';
    }
    if (currentView === 'job-detail' && currentJobId === jobId) updateDetailSaveIcon();
    if (currentView === 'applications') renderFavorites();
}

/* =========================================================
   5. HOME & EXPLORE
   ========================================================= */
function initHome() {
    const container = document.getElementById('featured-jobs-container');
    container.innerHTML = jobs.slice(0, 4).map(job => createJobCard(job)).join('');
}

function handleHeroSearch(e) {
    e.preventDefault();
    const query = document.getElementById('hero-search-input').value;
    document.getElementById('explore-search-input').value = query;
    navigate('explore');
}

function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    container.innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" 
                class="px-5 py-2 rounded-xl text-sm font-bold transition border-2 ${activeCategory === cat ? 'bg-brand-600 border-brand-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'}">
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    activeCategory = cat;
    renderCategoryFilters();
    filterJobs();
}

function filterJobs() {
    const searchInput = document.getElementById('explore-search-input').value.toLowerCase();
    const container = document.getElementById('explore-jobs-container');
    const noJobsMsg = document.getElementById('no-jobs-message');
    
    const filtered = jobs.filter(job => {
        const matchSearch = job.title.toLowerCase().includes(searchInput) || job.company.toLowerCase().includes(searchInput);
        const matchCategory = activeCategory === 'Semua' || job.category === activeCategory;
        return matchSearch && matchCategory;
    });

    document.getElementById('job-count').textContent = filtered.length;

    if (filtered.length > 0) {
        container.innerHTML = filtered.map(job => createJobCard(job)).join('');
        container.classList.remove('hidden');
        noJobsMsg.classList.add('hidden');
    } else {
        container.innerHTML = '';
        container.classList.add('hidden');
        noJobsMsg.classList.remove('hidden');
    }
}

document.getElementById('explore-search-input').addEventListener('input', () => filterJobs());

/* =========================================================
   6. JOB DETAIL
   ========================================================= */
function loadJobDetail(id) {
    currentJobId = id;
    const job = jobs.find(j => j.id === id);
    if (!job) return navigate('explore');

    document.getElementById('detail-title').textContent = job.title;
    document.getElementById('detail-company').textContent = job.company;
    document.getElementById('detail-location').textContent = job.location;
    document.getElementById('detail-category').textContent = job.category;
    document.getElementById('detail-type').textContent = job.type;
    document.getElementById('detail-salary').textContent = job.salary;
    document.getElementById('detail-description').textContent = job.description;
    document.getElementById('detail-applicants').textContent = job.applicants;
    
    const reqContainer = document.getElementById('detail-requirements');
    reqContainer.innerHTML = job.requirements.map(req => `
        <li class="flex items-start gap-3">
            <i class="ph-bold ph-check text-brand-500 mt-1"></i>
            <span class="text-slate-700 font-medium">${req}</span>
        </li>
    `).join('');

    const hasApplied = userApplications.some(app => app.jobId === currentJobId);
    const btnApply = document.getElementById('btn-apply-job');
    const badgeApplied = document.getElementById('detail-badge-applied');
    
    if (hasApplied) {
        btnApply.textContent = "Sudah Dilamar";
        btnApply.classList.replace('bg-brand-600', 'bg-slate-300');
        btnApply.classList.replace('hover:bg-brand-700', 'hover:bg-slate-300');
        btnApply.classList.remove('text-white');
        btnApply.classList.add('text-slate-600', 'cursor-not-allowed');
        badgeApplied.classList.remove('hidden');
    } else {
        btnApply.textContent = "Lamar Pekerjaan Ini";
        btnApply.classList.replace('bg-slate-300', 'bg-brand-600');
        btnApply.classList.replace('hover:bg-slate-300', 'hover:bg-brand-700');
        btnApply.classList.remove('text-slate-600', 'cursor-not-allowed');
        btnApply.classList.add('text-white');
        badgeApplied.classList.add('hidden');
    }

    updateDetailSaveIcon();
}

function updateDetailSaveIcon() {
    const isFav = userFavorites.includes(currentJobId);
    const icon = document.getElementById('detail-save-icon');
    icon.className = isFav ? 'ph-fill ph-heart text-2xl text-red-500' : 'ph-bold ph-heart text-2xl group-hover:text-red-500 transition';
}

function toggleSaveDetailJob() {
    toggleFavorite({ stopPropagation: () => {} }, currentJobId);
}

/* =========================================================
   7. APPLY FORM LOGIC
   ========================================================= */
function openApplyModal() {
    const job = jobs.find(j => j.id === currentJobId);
    if (userApplications.some(app => app.jobId === currentJobId)) {
        showToast('Anda sudah melamar posisi ini.', 'info'); return;
    }

    document.getElementById('modal-job-title').textContent = job.title;
    document.getElementById('modal-job-company').textContent = job.company;
    document.getElementById('apply-name').value = userProfile.name;
    document.getElementById('apply-email').value = userProfile.email;
    document.getElementById('apply-cv').value = '';

    const modal = document.getElementById('apply-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeApplyModal() {
    const modal = document.getElementById('apply-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

document.getElementById('apply-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cvLink = document.getElementById('apply-cv').value;
    if (!cvLink) return showToast('Mohon masukkan tautan CV', 'info');

    userApplications.push({
        id: Date.now(),
        jobId: currentJobId,
        name: userProfile.name,
        email: userProfile.email,
        cvLink: cvLink,
        status: 'Terkirim',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });

    setStorage('karierkita_applications_v5', userApplications);
    closeApplyModal();
    showToast('Lamaran berhasil dikirim!', 'success');
    loadJobDetail(currentJobId);
});

/* =========================================================
   8. DASHBOARD (APPLICATIONS & SAVED)
   ========================================================= */
function switchDashboardTab(tab) {
    const btnApplied = document.getElementById('tab-applied');
    const btnSaved = document.getElementById('tab-saved');
    
    if (tab === 'applied') {
        btnApplied.className = 'flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition bg-white text-brand-700 shadow-sm border border-slate-200';
        btnSaved.className = 'flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition text-slate-500 hover:text-slate-700';
    } else {
        btnSaved.className = 'flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition bg-white text-brand-700 shadow-sm border border-slate-200';
        btnApplied.className = 'flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition text-slate-500 hover:text-slate-700';
    }

    document.getElementById('tab-content-applied').style.display = tab === 'applied' ? 'block' : 'none';
    document.getElementById('tab-content-saved').style.display = tab === 'saved' ? 'block' : 'none';
}

function renderApplications() {
    const container = document.getElementById('applications-container');
    const noDataMsg = document.getElementById('no-applications-message');
    
    if (userApplications.length === 0) {
        container.innerHTML = ''; noDataMsg.classList.remove('hidden'); return;
    }

    noDataMsg.classList.add('hidden');
    const sortedApps = [...userApplications].reverse();

    container.innerHTML = sortedApps.map(app => {
        const job = jobs.find(j => j.id === app.jobId);
        if (!job) return '';

        let statusColor = 'bg-blue-100 text-blue-700 border-blue-200';
        let iconStatus = 'ph-paper-plane-tilt';
        if (app.status === 'Ditinjau') { statusColor = 'bg-yellow-100 text-yellow-700 border-yellow-200'; iconStatus = 'ph-magnifying-glass'; }
        if (app.status === 'Wawancara') { statusColor = 'bg-green-100 text-green-700 border-green-200'; iconStatus = 'ph-users-three'; }

        return `
            <div class="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-brand-300 transition cursor-pointer group" onclick="navigate('job-detail', {id: ${job.id}})">
                <div class="flex items-start gap-5">
                    <div class="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition hidden sm:flex flex-shrink-0">
                        <i class="ph-fill ph-buildings text-3xl"></i>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-xl text-slate-800 group-hover:text-brand-600 transition">${job.title}</h4>
                        <p class="text-brand-600 font-bold mb-2">${job.company}</p>
                        <p class="text-xs text-slate-500 font-medium flex items-center gap-1"><i class="ph-bold ph-calendar-blank"></i> Dilamar: ${app.date}</p>
                    </div>
                </div>
                <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-4 md:mt-0 gap-4">
                    <span class="px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusColor}">
                        <i class="ph-bold ${iconStatus}"></i> ${app.status}
                    </span>
                    <span class="text-slate-400 text-sm font-bold group-hover:text-brand-600 transition flex items-center gap-1">Detail <i class="ph-bold ph-caret-right"></i></span>
                </div>
            </div>
        `;
    }).join('');
}

function renderFavorites() {
    const container = document.getElementById('saved-jobs-container');
    const noDataMsg = document.getElementById('no-saved-message');
    const savedJobs = jobs.filter(job => userFavorites.includes(job.id));

    if (savedJobs.length === 0) {
        container.innerHTML = ''; noDataMsg.classList.remove('hidden'); return;
    }

    noDataMsg.classList.add('hidden');
    container.innerHTML = savedJobs.map(job => createJobCard(job)).join('');
}

/* =========================================================
   9. PROFILE
   ========================================================= */
let isEditingProfile = false;

function loadProfile() {
    updateUserInfoUI();
    document.getElementById('prof-name').value = userProfile.name;
    document.getElementById('prof-email').value = userProfile.email;
    document.getElementById('prof-uni').value = userProfile.university;
    document.getElementById('prof-major').value = userProfile.major;
    document.getElementById('prof-bio').value = userProfile.bio;
    
    const summaryUni = document.getElementById('summary-uni');
    const summaryMajor = document.getElementById('summary-major');
    if (summaryUni) summaryUni.textContent = userProfile.university;
    if (summaryMajor) summaryMajor.textContent = userProfile.major;

    isEditingProfile = false;
    updateProfileFormState();
}

function toggleEditProfile() {
    isEditingProfile = !isEditingProfile;
    updateProfileFormState();
    if(!isEditingProfile) loadProfile(); 
}

function updateProfileFormState() {
    const inputs = ['prof-name', 'prof-email', 'prof-uni', 'prof-major', 'prof-bio'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        el.disabled = !isEditingProfile;
        if(isEditingProfile) {
            el.classList.add('bg-white'); el.classList.remove('bg-slate-50');
        } else {
            el.classList.add('bg-slate-50'); el.classList.remove('bg-white');
        }
    });

    const actions = document.getElementById('profile-actions');
    const editBtnText = document.getElementById('edit-btn-text');
    
    if (isEditingProfile) {
        actions.classList.remove('hidden');
        if (editBtnText) editBtnText.textContent = "Batal Edit";
    } else {
        actions.classList.add('hidden');
        if (editBtnText) editBtnText.textContent = "Edit Profil";
    }
}

document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    userProfile = {
        ...userProfile,
        name: document.getElementById('prof-name').value,
        email: document.getElementById('prof-email').value,
        university: document.getElementById('prof-uni').value,
        major: document.getElementById('prof-major').value,
        bio: document.getElementById('prof-bio').value
    };
    setStorage('karierkita_profile_v5', userProfile);
    showToast('Profil berhasil diperbarui!', 'success');
    isEditingProfile = false;
    updateProfileFormState();
    updateUserInfoUI();
});

/* =========================================================
   10. INIT
   ========================================================= */
window.onload = () => {
    initHome();
    updateUserInfoUI();
    navigate('home');
};