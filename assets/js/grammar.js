/* =====================================================================
   GRAMMAR HUB PAGE LOGIC
   Reads LESSONS / CATEGORIES from lessons-data.js and renders every
   dynamic section of grammar.html. Nothing here is hardcoded markup —
   it all comes from the shared dataset.
   ===================================================================== */
(function(){
  const ICONS = {
    clock:'<path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>',
    layers:'<path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    swap:'<path d="M7 7h11l-3-3M17 17H6l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>',
    quote:'<path d="M7 8c-2 1-3 3-3 5.5S5.5 18 8 18M15 8c-2 1-3 3-3 5.5s1.5 4.5 4 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  };
  const PROGRESS_KEY = 'llwa-completed-lessons';
  function getCompleted(){
    try{ return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; }catch(e){ return []; }
  }

  /* ---------- CATEGORY CARDS ---------- */
  const catGrid = document.getElementById('catGrid');
  if(catGrid){
    const stats = getCategoryStats();
    catGrid.innerHTML = stats.map(c=>`
      <a href="#lesson-list" class="cat-card reveal" data-cat-jump="${c.id}">
        <div class="cat-icon"><svg viewBox="0 0 24 24" fill="none">${ICONS[c.icon]}</svg></div>
        <h3>${c.label}</h3>
        <span>${c.count} lesson${c.count===1?'':'s'}</span>
      </a>`).join('');
  }

  /* ---------- SEARCH + FILTER + RESULTS LIST ---------- */
  const searchInput = document.getElementById('hubSearchInput');
  const filterRow = document.getElementById('difficultyFilters');
  const boardFilterRow = document.getElementById('boardFilters');
  const yearFilterRow = document.getElementById('yearFilters');
  const catFilterRow = document.getElementById('categoryFilters');
  const resultsList = document.getElementById('lessonResults');
  const resultsCount = document.getElementById('resultsCount');

  const BOARDS = ['all','Punjab Board','Federal Board','Cambridge Board'];
  const YEARS = ['all','2024','2025','2026'];
  let activeDifficulty = 'all';
  let activeBoard = 'all';
  let activeYear = 'all';
  let activeCategory = 'all';

  function difficultyBadge(d){
    return `<span class="badge ${d}">${d}</span>`;
  }

  function renderResults(){
    const q = (searchInput?.value || '').trim().toLowerCase();
    const filtered = LESSONS.filter(l=>{
      const matchesQ = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.includes(q);
      const matchesDiff = activeDifficulty==='all' || l.difficulty===activeDifficulty;
      const matchesCat = activeCategory==='all' || l.category===activeCategory;
      return matchesQ && matchesDiff && matchesCat;
    });
    if(resultsCount) resultsCount.textContent = `${filtered.length} lesson${filtered.length===1?'':'s'} found`;
    if(!resultsList) return;
    if(filtered.length===0){
      resultsList.innerHTML = `<div class="no-results">No lessons match that search. Try a different keyword or clear the filters.</div>`;
      return;
    }
    resultsList.innerHTML = filtered.map((l,i)=>`
      <a href="lesson.html?slug=${l.slug}" class="lesson-row reveal in">
        <div class="idx">${String(i+1).padStart(2,'0')}</div>
        <div class="body">
          <h4>${l.title}</h4>
          <div class="lr-meta">${difficultyBadge(l.difficulty)}<span>${l.readTime} min read</span><span>${CATEGORIES.find(c=>c.id===l.category)?.label || ''}</span>${l.board?`<span>${l.board}${l.year?` · ${l.year}`:''}</span>`:''}</div>
        </div>
        <svg class="go-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>`).join('');
  }

  if(searchInput) searchInput.addEventListener('input', renderResults);
  if(filterRow){
    filterRow.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        filterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        activeDifficulty = chip.dataset.difficulty;
        renderResults();
      });
    });
  }
  if(boardFilterRow){
    boardFilterRow.innerHTML = BOARDS.map(b=>`<button class="chip${b==='all' ? ' active' : ''}" data-board="${b}">${b==='all' ? 'All Boards' : b}</button>`).join('');
    boardFilterRow.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        boardFilterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        activeBoard = chip.dataset.board;
        renderResults();
      });
    });
  }
  if(yearFilterRow){
    yearFilterRow.innerHTML = YEARS.map(y=>`<button class="chip${y==='all' ? ' active' : ''}" data-year="${y}">${y==='all' ? 'All Years' : y}</button>`).join('');
    yearFilterRow.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        yearFilterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        activeYear = chip.dataset.year;
        renderResults();
      });
    });
  }
  if(catFilterRow){
    const stats = getCategoryStats();
    catFilterRow.innerHTML = `<button class="chip active" data-cat="all">All Categories</button>` +
      stats.map(c=>`<button class="chip" data-cat="${c.id}">${c.label}</button>`).join('');
    catFilterRow.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        catFilterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.dataset.cat;
        renderResults();
      });
    });
  }
  document.querySelectorAll('[data-cat-jump]').forEach(card=>{
    card.addEventListener('click', e=>{
      e.preventDefault();
      const cat = card.dataset.catJump;
      if(catFilterRow){
        catFilterRow.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active', c.dataset.cat===cat));
      }
      activeCategory = cat;
      renderResults();
      document.getElementById('lesson-list').scrollIntoView({behavior: reduceMotionSafe() ? 'auto':'smooth'});
    });
  });
  function reduceMotionSafe(){ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  renderResults();

  /* ---------- LATEST LESSONS ---------- */
  const latestList = document.getElementById('latestList');
  if(latestList){
    const latest = [...LESSONS].sort((a,b)=> new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0,5);
    latestList.innerHTML = latest.map((l,i)=>`
      <a href="lesson.html?slug=${l.slug}" class="lesson-row reveal in">
        <div class="idx">${String(i+1).padStart(2,'0')}</div>
        <div class="body"><h4>${l.title}</h4>
          <div class="lr-meta">${difficultyBadge(l.difficulty)}<span>${new Date(l.dateAdded).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span></div>
        </div>
        <svg class="go-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>`).join('');
  }

  /* ---------- POPULAR LESSONS ---------- */
  const popularList = document.getElementById('popularList');
  if(popularList){
    const popular = [...LESSONS].sort((a,b)=> b.popularity - a.popularity).slice(0,5);
    popularList.innerHTML = popular.map((l,i)=>`
      <a href="lesson.html?slug=${l.slug}" class="lesson-row reveal in">
        <div class="idx">${String(i+1).padStart(2,'0')}</div>
        <div class="body"><h4>${l.title}</h4>
          <div class="lr-meta">${difficultyBadge(l.difficulty)}<span>${l.popularity}% found this useful</span></div>
        </div>
        <svg class="go-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>`).join('');
  }

  /* ---------- ROADMAP ---------- */
  const roadmapRow = document.getElementById('roadmapRow');
  if(roadmapRow){
    const stats = getCategoryStats();
    roadmapRow.innerHTML = stats.map((c,i)=>`
      <a href="lesson.html?slug=${LESSONS.find(l=>l.category===c.id)?.slug || ''}" class="road-step reveal in">
        <div class="rs-num">${i+1}</div>
        <h4>${c.label}</h4>
        <span>${c.count} lesson${c.count===1?'':'s'}</span>
      </a>`).join('');
  }

  /* ---------- PROGRESS TRACKER ---------- */
  const ringFg = document.getElementById('progressRingFg');
  const ringPct = document.getElementById('progressRingPct');
  const progressStatsEl = document.getElementById('progressStats');
  const progressBarFill = document.getElementById('progressBarFill');
  function renderProgress(){
    const completed = getCompleted();
    const total = LESSONS.length;
    const doneCount = completed.filter(slug=>LESSONS.some(l=>l.slug===slug)).length;
    const pct = total ? Math.round((doneCount/total)*100) : 0;
    if(ringFg){
      const r = 70, circumference = 2*Math.PI*r;
      ringFg.style.strokeDasharray = `${circumference}`;
      ringFg.style.strokeDashoffset = `${circumference * (1 - pct/100)}`;
    }
    if(ringPct) ringPct.textContent = pct+'%';
    if(progressBarFill) progressBarFill.style.width = pct+'%';
    if(progressStatsEl){
      progressStatsEl.innerHTML = `
        <div><b>${doneCount}</b><span>Completed</span></div>
        <div><b>${total - doneCount}</b><span>Remaining</span></div>
        <div><b>${total}</b><span>Total Lessons</span></div>`;
    }
  }
  renderProgress();

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o=>{ if(o!==item){ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; } });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight+'px' : null;
    });
  });
})();
