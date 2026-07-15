/* =====================================================================
   LITERATURE UI — renders the Literature Hub and dynamic literature detail pages.
   ===================================================================== */
(function(){
  const literatureRoot = document.getElementById('literatureRoot');
  const detailRoot = document.getElementById('literatureDetailRoot');
  const isHubPage = Boolean(literatureRoot);
  const isDetailPage = Boolean(detailRoot);
  const works = getAllWorks();

  function buildChip(label, active){
    return `<button type="button" class="chip${active?' active':''}" data-filter="${label}">${label}</button>`;
  }

  function buildWorkCard(work){
    return `
      <article class="work-card reveal in">
        <div class="work-card-top">
          <div>
            <span class="eyebrow">${work.type}</span>
            <h3>${work.title}</h3>
            <p>${work.author}</p>
          </div>
          <span class="work-year">${work.year}</span>
        </div>
        <p class="work-copy">${work.summary}</p>
        <div class="work-meta">
          <span>${work.categories.join(', ')}</span>
          <span>${work.themes[0] || ''}</span>
        </div>
        <div class="work-cta"><a href="literature-detail.html?slug=${work.slug}" class="btn btn-ghost magnetic">View Details</a></div>
      </article>`;
  }

  function renderEmptyState(){
    return `<div class="empty-state reveal in"><h3>No works match your search.</h3><p>Try a different title, category, author or theme.</p></div>`;
  }

  function renderHub(){
    document.title = 'Literature Hub — Let\'s Learn with Arslan';
    const root = literatureRoot;
    const featured = LITERATURE_HUB.featured.map(slug => getWorkBySlug(slug)).filter(Boolean);
    const authors = getUniqueAuthors();
    const categories = getUniqueCategories();
    const themes = getUniqueThemes();
    const timeline = LITERATURE_HUB.timeline || [];
    root.innerHTML = `
      <section class="literature-hero">
        <div class="wrap literature-hero-grid">
          <div class="hero-copy reveal in">
            <div class="eyebrow">${LITERATURE_HUB.hero.eyebrow}</div>
            <h1>${LITERATURE_HUB.hero.title}</h1>
            <p class="hero-sub">${LITERATURE_HUB.hero.text}</p>
            <div class="hero-cta">
              <a href="#featured" class="btn btn-primary magnetic">${LITERATURE_HUB.hero.ctaLabel}</a>
              <a href="literature-detail.html?slug=${featured[0]?.slug || ''}" class="btn btn-ghost magnetic">Read a Detail Page</a>
            </div>
          </div>
          <div class="hero-panel reveal in">
            <div class="hero-panel-inner">
              <h3>Search literature</h3>
              <div class="hub-search">
                <input type="search" id="litSearchInput" placeholder="Search titles, authors or themes" aria-label="Search literature">
                <button type="button" class="btn btn-primary" id="litSearchClear">Clear</button>
              </div>
              <div class="filter-row" id="litFilters">
                ${categories.map(cat => buildChip(cat,false)).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="literature-section" id="featured">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Featured Works</div><h2>Stories, drama and novels ready for study</h2></div>
          <div class="work-grid">
            ${featured.map(buildWorkCard).join('')}
          </div>
        </div>
      </section>
      <section class="literature-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Authors</div><h2>Writers behind the works</h2></div>
          <div class="author-grid">
            ${authors.map(author => `
              <article class="author-card reveal in">
                <h3>${author.author}</h3>
                <p>${author.count} work${author.count>1 ? 's' : ''}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
      <section class="literature-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Timeline</div><h2>How literature evolved</h2></div>
          <div class="timeline-grid reveal in">
            ${timeline.map(item => `<article class="timeline-card"><span>${item.year}</span><p>${item.label}</p></article>`).join('')}
          </div>
        </div>
      </section>
      <section class="literature-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Themes & Filters</div><h2>Browse by category and theme</h2></div>
          <div class="multi-grid reveal in">
            <div>
              <h3>Categories</h3>
              <div class="chip-wrap">${categories.map(cat => buildChip(cat,false)).join('')}</div>
            </div>
            <div>
              <h3>Themes</h3>
              <div class="chip-wrap">${themes.map(theme => buildChip(theme,false)).join('')}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="literature-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Search results</div><h2>Find the content you need</h2></div>
          <div class="work-grid" id="litSearchResults">
            ${works.map(buildWorkCard).join('')}
          </div>
        </div>
      </section>`;

    setupHubInteractions();
  }

  function filterWorks(query, filter){
    const normalized = query.trim().toLowerCase();
    return works.filter(work => {
      const haystack = [work.title, work.author, work.type, work.plot, work.summary, work.categories.join(' '), work.themes.join(' ')].join(' ').toLowerCase();
      const matchQuery = !normalized || normalized.split(/\s+/).every(term => haystack.includes(term));
      const matchFilter = !filter || work.categories.includes(filter) || work.themes.includes(filter);
      return matchQuery && matchFilter;
    });
  }

  function setupHubInteractions(){
    const searchInput = document.getElementById('litSearchInput');
    const clearBtn = document.getElementById('litSearchClear');
    const filterRow = document.getElementById('litFilters');
    const searchResults = document.getElementById('litSearchResults');
    let activeFilter = '';

    function refreshResults(){
      const query = searchInput?.value || '';
      const results = filterWorks(query, activeFilter);
      searchResults.innerHTML = results.length ? results.map(buildWorkCard).join('') : renderEmptyState();
    }

    if(searchInput){
      searchInput.addEventListener('input', refreshResults);
    }
    if(clearBtn){
      clearBtn.addEventListener('click', ()=>{
        if(searchInput){ searchInput.value = ''; }
        activeFilter = '';
        document.querySelectorAll('.chip.active').forEach(btn=>btn.classList.remove('active'));
        refreshResults();
      });
    }
    filterRow?.querySelectorAll('.chip').forEach(button => {
      button.addEventListener('click', ()=>{
        activeFilter = button.dataset.filter;
        document.querySelectorAll('.chip').forEach(btn => btn.classList.toggle('active', btn === button));
        if(searchInput){ searchInput.value = activeFilter; }
        refreshResults();
      });
    });
  }

  function updateProgress(){
    const progressBar = document.querySelector('.scroll-progress-bar');
    const content = document.querySelector('.detail-content');
    if(!progressBar || !content) return;
    const total = content.scrollHeight - window.innerHeight;
    const progress = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
    progressBar.style.width = `${progress}%`;
  }

  function renderDetailPage(){
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const work = getWorkBySlug(slug);
    if(!work){
      detailRoot.innerHTML = `
        <section class="page-hero">
          <div class="wrap">
            <div class="eyebrow">Work Not Found</div>
            <h1>The literature work could not be found.</h1>
            <p class="hero-sub">Choose another item from the Literature Hub.</p>
            <div class="hero-cta"><a href="literature.html" class="btn btn-primary magnetic">Back to Hub</a></div>
          </div>
        </section>`;
      document.title = 'Literature not found — Let\'s Learn with Arslan';
      return;
    }

    document.title = `${work.title} — ${work.author} | Let\'s Learn with Arslan`;
    detailRoot.innerHTML = `
      <div class="scroll-progress-wrap"><div class="scroll-progress-bar"></div></div>
      <section class="literature-hero literature-detail-hero">
        <div class="wrap literature-hero-grid">
          <div class="hero-copy reveal in">
            <div class="eyebrow">${work.type}</div>
            <h1>${work.title}</h1>
            <p class="hero-sub">${work.author} · ${work.year} · ${work.categories.join(' • ')}</p>
            <div class="hero-meta">
              <span>Themes: ${work.themes.join(', ')}</span>
              <span>Type: ${work.type}</span>
            </div>
            <div class="hero-cta poem-actions">
              <a href="literature.html" class="btn btn-ghost magnetic">Back to Hub</a>
            </div>
          </div>
        </div>
      </section>
      <section class="literature-section detail-section">
        <div class="wrap detail-layout">
          <aside class="detail-sidebar reveal in">
            <div class="sidebar-panel">
              <h3>On this page</h3>
              <nav class="detail-nav">
                <a href="#summary">Summary</a>
                <a href="#characters">Characters</a>
                <a href="#themes">Themes</a>
                <a href="#plot">Plot</a>
                <a href="#quotes">Quotes</a>
                <a href="#analysis">Analysis</a>
                <a href="#mcqs">MCQs</a>
                <a href="#important">Important Questions</a>
                <a href="#notes">Notes</a>
              </nav>
            </div>
          </aside>
          <div class="detail-content reveal in">
            <section id="summary" class="work-panel">
              <h2>Summary</h2>
              <p>${work.summary}</p>
            </section>
            <section id="characters" class="work-panel">
              <h2>Characters</h2>
              <div class="character-grid">
                ${work.characters.map(character => `
                  <article class="character-card"><h3>${character.name}</h3><p>${character.role}</p></article>
                `).join('')}
              </div>
            </section>
            <section id="themes" class="work-panel">
              <h2>Themes</h2>
              <div class="chip-wrap">${work.themes.map(theme => `<span class="device-pill">${theme}</span>`).join('')}</div>
            </section>
            <section id="plot" class="work-panel">
              <h2>Plot</h2>
              <p>${work.plot}</p>
            </section>
            <section id="quotes" class="work-panel">
              <h2>Key Quotes</h2>
              <div class="quote-grid">
                ${work.quotes.map(quote => `<blockquote>${quote}</blockquote>`).join('')}
              </div>
            </section>
            <section id="analysis" class="work-panel">
              <h2>Analysis</h2>
              ${work.analysis.map(block => `<div class="analysis-card"><h3>${block.heading}</h3><p>${block.body}</p></div>`).join('')}
            </section>
            <section id="mcqs" class="work-panel">
              <h2>MCQs</h2>
              <div class="quiz-grid">
                ${work.mcqs.map((item,index) => `
                  <article class="quiz-card" data-quiz-index="${index}">
                    <h3>${item.question}</h3>
                    <div class="quiz-options">
                      ${item.options.map((option,optIndex) => `<button type="button" class="quiz-option" data-question="${index}" data-answer="${optIndex}">${option}</button>`).join('')}
                    </div>
                    <div class="quiz-feedback" aria-live="polite"></div>
                  </article>
                `).join('')}
              </div>
            </section>
            <section id="important" class="work-panel">
              <h2>Important Questions</h2>
              <ol class="practice-list">
                ${work.importantQuestions.map(item => `<li>${item}</li>`).join('')}
              </ol>
            </section>
            <section id="notes" class="work-panel">
              <h2>Notes</h2>
              <ul class="note-list">
                ${work.notes.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </section>
            <section class="work-panel related-poems">
              <h2>Related Content</h2>
              <div class="work-grid">
                ${work.related.map(slug => getWorkBySlug(slug)).filter(Boolean).map(buildWorkCard).join('')}
              </div>
            </section>
          </div>
        </div>
      </section>`;

    const quizButtons = detailRoot.querySelectorAll('.quiz-option');
    quizButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.question);
        const answer = Number(button.dataset.answer);
        const quizCard = button.closest('.quiz-card');
        const quizData = work.mcqs[index];
        if(!quizCard || !quizData) return;
        quizCard.querySelectorAll('.quiz-option').forEach(opt => opt.disabled = true);
        quizCard.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        button.classList.add('selected');
        const feedback = quizCard.querySelector('.quiz-feedback');
        if(answer === quizData.answer){
          feedback.innerHTML = `<strong>Correct.</strong> ${quizData.explanation}`;
          quizCard.classList.add('correct');
        } else {
          feedback.innerHTML = `<strong>Not quite.</strong> ${quizData.explanation}`;
          quizCard.classList.add('incorrect');
        }
      });
    });

    document.querySelectorAll('.detail-nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.detail-nav a').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      });
    });

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  if(isHubPage){ renderHub(); }
  if(isDetailPage){ renderDetailPage(); }
})();