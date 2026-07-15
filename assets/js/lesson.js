/* =====================================================================
   LESSON PAGE LOGIC
   Reads a `slug` query param, looks it up in LESSONS (lessons-data.js),
   and renders the entire page — heading, TOC, sections, code, examples,
   exercises, quiz, related lessons, and prev/next — from that object.
   Nothing about an individual lesson is hardcoded in lesson.html.
   ===================================================================== */
(function(){
  const PROGRESS_KEY = 'llwa-completed-lessons';
  function getCompleted(){
    try{ return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; }catch(e){ return []; }
  }
  function setCompleted(list){
    try{ localStorage.setItem(PROGRESS_KEY, JSON.stringify(list)); }catch(e){}
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || (typeof LESSONS !== 'undefined' && LESSONS[0] ? LESSONS[0].slug : '');
  const lesson = typeof getLessonBySlug === 'function' ? getLessonBySlug(slug) : null;

  const root = document.getElementById('lessonRoot');
  if(!root) return;

  if(!lesson){
    root.innerHTML = `<div class="wrap" style="padding:180px 0 100px; text-align:center;">
      <div class="eyebrow" style="justify-content:center;">Not Found</div>
      <h1 style="margin-top:16px;">That lesson doesn't exist yet.</h1>
      <p style="color:var(--ink-dim); margin-top:14px;">It may have been renamed or removed.</p>
      <a href="grammar.html" class="btn btn-primary magnetic" style="margin-top:26px;">Back to Grammar Hub</a>
    </div>`;
    return;
  }

  document.title = `${lesson.title} — Let's Learn with Arslan`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', lesson.description);

  const CATEGORY_LABEL = (typeof CATEGORIES !== 'undefined' ? CATEGORIES.find(c=>c.id===lesson.category)?.label : lesson.category) || lesson.category;

  /* ---------- Code formula highlighter ---------- */
  function renderCode(code){
    if(!code) return '';
    return `<div class="code-block"><span class="tok-subj">${code.subj}</span> + <span class="tok-help">${code.help}</span> + <span class="tok-verb">${code.verb}</span></div>`;
  }

  /* ---------- Build TOC + sections HTML ---------- */
  const tocHtml = lesson.sections.map(s=>`<a href="#${s.id}" data-toc="${s.id}">${s.heading}</a>`).join('')
    + (lesson.examples?.length ? `<a href="#examples" data-toc="examples">Examples</a>`:'')
    + (lesson.exercises?.length ? `<a href="#exercises" data-toc="exercises">Exercises</a>`:'')
    + (lesson.quiz?.length ? `<a href="#quiz" data-toc="quiz">Quiz</a>`:'');

  const sectionsHtml = lesson.sections.map(s=>`
    <div class="lesson-section" id="${s.id}">
      <h2>${s.heading}</h2>
      <p>${s.body}</p>
      ${renderCode(s.code)}
    </div>`).join('');

  const examplesHtml = lesson.examples?.length ? `
    <div class="lesson-section" id="examples">
      <h2>Examples</h2>
      <div class="example-list">
        ${lesson.examples.map(ex=>`<div class="example-item"><b>${ex.label}</b>${ex.text}</div>`).join('')}
      </div>
    </div>` : '';

  const exercisesHtml = lesson.exercises?.length ? `
    <div class="lesson-section" id="exercises">
      <h2>Exercises</h2>
      ${lesson.exercises.map((ex,i)=>`
        <div class="exercise-card" data-exercise-index="${i}">
          <div class="ex-q">${i+1}. ${ex.q}</div>
          <input type="text" placeholder="Type your answer…" autocomplete="off">
          <div class="exercise-foot">
            <button class="btn btn-ghost btn-sm magnetic" data-check-exercise>Check Answer</button>
            <span class="ex-result"></span>
          </div>
        </div>`).join('')}
    </div>` : '';

  const quizHtml = lesson.quiz?.length ? `
    <div class="lesson-section" id="quiz">
      <h2>Quiz</h2>
      <form id="quizForm">
        ${lesson.quiz.map((q,qi)=>`
          <div class="quiz-card" data-quiz-index="${qi}">
            <div class="q-text">${qi+1}. ${q.q}</div>
            <div class="quiz-opts">
              ${q.options.map((opt,oi)=>`
                <label class="quiz-opt">
                  <input type="radio" name="q${qi}" value="${oi}">
                  <span>${opt}</span>
                </label>`).join('')}
            </div>
          </div>`).join('')}
        <button type="submit" class="btn btn-primary magnetic">Submit Quiz</button>
      </form>
      <div id="quizResult" style="margin-top:20px;"></div>
    </div>` : '';

  const relatedLessons = (lesson.related || []).map(s=>getLessonBySlug(s)).filter(Boolean);
  const relatedHtml = relatedLessons.length ? `
    <div class="lesson-section" id="related">
      <h2>Related Lessons</h2>
      <div class="related-grid">
        ${relatedLessons.map(r=>`
          <a href="lesson.html?slug=${r.slug}" class="related-card">
            <span class="course-tag">${CATEGORIES.find(c=>c.id===r.category)?.label || r.category}</span>
            <h4>${r.title}</h4>
          </a>`).join('')}
      </div>
    </div>` : '';

  const idx = getLessonIndex(lesson.slug);
  const prevLesson = idx > 0 ? LESSONS[idx-1] : null;
  const nextLesson = idx < LESSONS.length-1 ? LESSONS[idx+1] : null;
  const pagenavHtml = `
    <div class="lesson-pagenav">
      ${prevLesson ? `<a href="lesson.html?slug=${prevLesson.slug}" class="pagenav-link prev"><span class="dir">← Previous</span><b>${prevLesson.title}</b></a>` : '<div></div>'}
      ${nextLesson ? `<a href="lesson.html?slug=${nextLesson.slug}" class="pagenav-link next"><span class="dir">Next →</span><b>${nextLesson.title}</b></a>` : '<div></div>'}
    </div>`;

  const difficultyBadge = `<span class="badge ${lesson.difficulty}">${lesson.difficulty}</span>`;
  const boardLabel = lesson.board ? `<span>${lesson.board}${lesson.year ? ` · ${lesson.year}` : ''}</span>` : '';
  const alreadyDone = getCompleted().includes(lesson.slug);

  root.innerHTML = `
    <section class="page-hero" style="padding-bottom:0;">
      <div class="wrap">
        <div class="eyebrow reveal in"><a href="grammar.html" style="color:var(--accent);">Grammar Hub</a>&nbsp;/&nbsp;${CATEGORY_LABEL}</div>
      </div>
    </section>
    <section style="padding-top:26px;">
      <div class="wrap lesson-layout">
        <aside class="lesson-sidebar reveal in">
          <div class="toc-label">On This Page</div>
          <nav class="toc-list" id="tocList">${tocHtml}</nav>
          <div class="sidebar-progress">
            <span>Reading progress</span>
            <div class="progress-bar-track"><div class="progress-bar-fill" id="sidebarProgressFill" style="width:0%;"></div></div>
          </div>
          <button class="btn btn-primary magnetic mark-complete-btn ${alreadyDone?'done':''}" id="markCompleteBtn">
            ${alreadyDone ? 'Completed ✓' : 'Mark as Complete'}
          </button>
        </aside>
        <article class="lesson-main reveal in">
          <h1>${lesson.title}</h1>
          <div class="lesson-meta-row">${difficultyBadge}<span>${lesson.readTime} min read</span><span>${CATEGORY_LABEL}</span></div>
          <p style="color:var(--ink-dim); font-size:16px; margin-bottom:30px;">${lesson.description}</p>
          ${sectionsHtml}
          ${examplesHtml}
          ${exercisesHtml}
          ${quizHtml}
          ${relatedHtml}
          ${pagenavHtml}
        </article>
      </div>
    </section>`;

  /* ---------- Re-run shared reveal / cursor bindings for the new DOM ---------- */
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>el.classList.add('in'));

  /* ---------- READING PROGRESS BAR (top of page) ---------- */
  const readingBar = document.querySelector('.reading-progress');
  function updateReadingProgress(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const height = doc.scrollHeight - window.innerHeight;
    const pct = height > 0 ? Math.min(100, (scrollTop/height)*100) : 0;
    if(readingBar) readingBar.style.width = pct+'%';
    const sidebarFill = document.getElementById('sidebarProgressFill');
    if(sidebarFill) sidebarFill.style.width = pct+'%';
  }
  window.addEventListener('scroll', updateReadingProgress, {passive:true});
  updateReadingProgress();

  /* ---------- STICKY TOC: highlight active section ---------- */
  const tocLinks = document.querySelectorAll('#tocList a');
  const sectionEls = document.querySelectorAll('.lesson-section');
  if('IntersectionObserver' in window && sectionEls.length){
    const tocObserver = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          tocLinks.forEach(l=>l.classList.remove('active'));
          const active = document.querySelector(`#tocList a[data-toc="${en.target.id}"]`);
          if(active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sectionEls.forEach(sec=>tocObserver.observe(sec));
  }

  /* ---------- MARK AS COMPLETE ---------- */
  const markBtn = document.getElementById('markCompleteBtn');
  if(markBtn){
    markBtn.addEventListener('click', ()=>{
      let completed = getCompleted();
      if(completed.includes(lesson.slug)){
        completed = completed.filter(s=>s!==lesson.slug);
        markBtn.classList.remove('done');
        markBtn.textContent = 'Mark as Complete';
      } else {
        completed.push(lesson.slug);
        markBtn.classList.add('done');
        markBtn.textContent = 'Completed ✓';
      }
      setCompleted(completed);
    });
  }

  /* ---------- EXERCISE CHECKING ---------- */
  document.querySelectorAll('[data-check-exercise]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.closest('.exercise-card');
      const i = parseInt(card.dataset.exerciseIndex,10);
      const input = card.querySelector('input');
      const resultEl = card.querySelector('.ex-result');
      const userAnswer = (input.value || '').trim().toLowerCase();
      const correctAnswer = lesson.exercises[i].answer.trim().toLowerCase();
      if(userAnswer === correctAnswer){
        resultEl.textContent = 'Correct!';
        resultEl.className = 'ex-result correct';
      } else {
        resultEl.textContent = `Not quite — correct answer: "${lesson.exercises[i].answer}"`;
        resultEl.className = 'ex-result incorrect';
      }
    });
  });

  /* ---------- QUIZ SCORING ---------- */
  const quizForm = document.getElementById('quizForm');
  if(quizForm){
    quizForm.addEventListener('submit', e=>{
      e.preventDefault();
      let score = 0;
      lesson.quiz.forEach((q,qi)=>{
        const card = quizForm.querySelector(`[data-quiz-index="${qi}"]`);
        const selected = card.querySelector(`input[name="q${qi}"]:checked`);
        const opts = card.querySelectorAll('.quiz-opt');
        opts.forEach((opt,oi)=>{
          opt.classList.remove('correct','incorrect');
          if(oi===q.answer) opt.classList.add('correct');
          else if(selected && parseInt(selected.value,10)===oi) opt.classList.add('incorrect');
        });
        if(selected && parseInt(selected.value,10)===q.answer) score++;
      });
      const resultBox = document.getElementById('quizResult');
      if(resultBox){
        resultBox.innerHTML = `<div class="quiz-score-panel"><b>${score} / ${lesson.quiz.length}</b><span>You scored ${Math.round((score/lesson.quiz.length)*100)}% on this quiz</span></div>`;
      }
    });
  }
})();
