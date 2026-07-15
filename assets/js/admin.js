/* Admin authentication and dashboard helper script */
(function(){
  const STORAGE_KEY = 'llwa-admin-auth';
  const adminCredentials = { username: 'admin', password: 'Arslan112233' };

  const adminData = {
    summary: {
      totalStudents: 324,
      totalTeachers: 12,
      totalVisitors: 5_480,
      totalLessons: 182,
      totalGrammar: 48,
      totalLiterature: 37,
      totalPoetry: 29,
      totalVocabulary: 24,
    },
    recentStudents: [
      { name: 'Aisha Khan', stage: 'Intermediate', progress: '72%', lastLogin: '2 hrs ago', status: 'Active' },
      { name: 'Bilal Ahmed', stage: 'Intermediate', progress: '61%', lastLogin: '5 hrs ago', status: 'Active' },
      { name: 'Sana Iqbal', stage: 'Beginner', progress: '44%', lastLogin: '11 hrs ago', status: 'Pending' },
      { name: 'Hassan Raza', stage: 'Advanced', progress: '89%', lastLogin: '1 day ago', status: 'Active' },
    ],
    latestActivity: [
      { title: 'Uploaded new Grammar lesson', time: '12 min ago' },
      { title: 'Student Bilal completed Quiz 3', time: '45 min ago' },
      { title: 'Teacher Saima published new poem review', time: '2 hrs ago' },
      { title: 'New registration from Lahore', time: '5 hrs ago' },
    ],
  };

  function getAuthState(){
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  }

  function requireAuthentication(){
    if(!getAuthState()){
      window.location.href = 'admin-login.html';
    }
  }

  function redirectIfAuthenticated(){
    if(getAuthState() && window.location.pathname.endsWith('admin-login.html')){
      window.location.href = 'admin-dashboard.html';
    }
  }

  function renderAdminSummary(){
    const map = {
      totalStudents: 'totalStudents',
      totalTeachers: 'totalTeachers',
      totalVisitors: 'totalVisitors',
      totalLessons: 'totalLessons',
      totalGrammar: 'totalGrammar',
      totalLiterature: 'totalLiterature',
      totalPoetry: 'totalPoetry',
      totalVocabulary: 'totalVocabulary',
    };
    Object.keys(map).forEach(key => {
      const el = document.getElementById(map[key]);
      if(el) el.textContent = adminData.summary[key].toLocaleString();
    });
  }

  function renderRecentStudents(){
    const tbody = document.querySelector('#recentStudents tbody');
    if(!tbody) return;
    tbody.innerHTML = adminData.recentStudents.map(student =>
      `<tr>
        <td>${student.name}</td>
        <td>${student.stage}</td>
        <td>${student.progress}</td>
        <td>${student.lastLogin}</td>
        <td><span class="status-pill">${student.status}</span></td>
      </tr>`
    ).join('');
  }

  function renderActivityFeed(){
    const list = document.getElementById('activityFeed');
    if(!list) return;
    list.innerHTML = adminData.latestActivity.map(item =>
      `<div class="small-list-item"><span>${item.title}</span><strong>${item.time}</strong></div>`
    ).join('');
  }

  function initLogin(){
    const loginForm = document.getElementById('adminLoginForm');
    if(!loginForm) return;
    redirectIfAuthenticated();
    const errorEl = document.getElementById('adminLoginError');
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = loginForm.username.value.trim().toLowerCase();
      const password = loginForm.password.value;
      errorEl.textContent = '';
      errorEl.classList.remove('active');
      if(!username || !password){
        errorEl.textContent = 'Please enter admin credentials.';
        errorEl.classList.add('active');
        return;
      }
      if(username !== adminCredentials.username || password !== adminCredentials.password){
        errorEl.textContent = 'Invalid username or password.';
        errorEl.classList.add('active');
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, 'true');
      window.location.href = 'admin-dashboard.html';
    });
  }

  function initDashboard(){
    if(!document.body.classList.contains('admin-dashboard')) return;
    requireAuthentication();
    renderAdminSummary();
    renderRecentStudents();
    renderActivityFeed();
    const logoutBtn = document.getElementById('logoutAdmin');
    if(logoutBtn){
      logoutBtn.addEventListener('click', ()=>{
        sessionStorage.removeItem(STORAGE_KEY);
        window.location.href = 'admin-login.html';
      });
    }
    const lockBtn = document.getElementById('lockAdmin');
    if(lockBtn){
      lockBtn.addEventListener('click', ()=>{
        sessionStorage.removeItem(STORAGE_KEY);
        window.location.href = 'admin-login.html';
      });
    }
  }

  initLogin();
  initDashboard();
})();
