/* =====================================================================
   POETRY UI — renders the Poetry Hub and individual poem detail pages.
   ===================================================================== */
(function(){
  const poetryRoot = document.getElementById('poetryRoot');
  const poemRoot = document.getElementById('poemRoot');
  const isPoemPage = Boolean(poemRoot);
  const isHubPage = Boolean(poetryRoot);
  const poems = getAllPoems();
  const favoritesKey = 'llwa-poetry-favorites';
  const recentKey = 'llwa-poetry-recent';

  function safeStorage(key, fallback){
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }catch(e){ return fallback; }
  }
  function saveStorage(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
  }

  function getFavorites(){ return safeStorage(favoritesKey, []); }
  function getRecent(){ return safeStorage(recentKey, []); }
  function toggleFavorite(slug){
    const current = new Set(getFavorites());
    if(current.has(slug)){ current.delete(slug); } else { current.add(slug); }
    saveStorage(favoritesKey, Array.from(current));
    return current.has(slug);
  }

  function markRecentlyViewed(slug){
    const current = getRecent().filter(item => item !== slug);
    current.unshift(slug);
    saveStorage(recentKey, current.slice(0,5));
  }

  function buildChip(label, active){
    return `<button type="button" class="chip${active?' active':''}" data-filter="${label}">${label}</button>`;
  }

  function buildPoemCard(poem){
    const cardFav = getFavorites().includes(poem.slug) ? ' active' : '';
    return `
      <article class="poem-card reveal in">
        <div class="poem-card-top">
          <div>
            <span class="eyebrow">${poem.categories?.[0] || 'Poem'}</span>
            <h3>${poem.title}</h3>
            <p>${poem.poet}</p>
          </div>
          <button type="button" class="icon-btn favorite-toggle${cardFav}" data-favorite="${poem.slug}" aria-label="Toggle favorite">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 20.4l-1.45-1.32C5.4 14.36 2 11.28 2 7.98 2 5.74 3.74 4 6 4c1.54 0 3.04.99 3.66 2.36h1.69C14 4.99 15.5 4 17.06 4 19.32 4 21.06 5.74 21.06 7.98c0 3.3-3.4 6.38-8.55 11.1L12 20.4z" stroke="currentColor" stroke-width="1.6" fill="currentColor"/></svg>
          </button>
        </div>
        <p class="poem-card-copy">${poem.summary}</p>
        <div class="poem-card-meta">
          <span>${poem.year}</span>
          <span>${poem.theme}</span>
        </div>
        <div class="poem-card-cta">
          <a href="poem.html?slug=${poem.slug}" class="btn btn-ghost magnetic">Open Poem</a>
        </div>
      </article>`;
  }

  function renderEmptyState(){
    return `<div class="empty-state reveal in"><h3>No poems match that search.</h3><p>Try another title, poet, theme or category.</p></div>`;
  }

  function renderHub(){
    document.title = 'Poetry Hub — Let\'s Learn with Arslan';
    const root = poetryRoot;
    const featured = POETRY_HUB.featured.map(slug=> getPoemBySlug(slug)).filter(Boolean);
    const authors = getUniqueAuthors();
    const categories = getUniqueCategories();
    const themes = getUniqueThemes();
    const favSlugs = getFavorites();
    const recentSlugs = getRecent();
    const recentPoems = recentSlugs.map(getPoemBySlug).filter(Boolean);
    const favoritePoems = favSlugs.map(getPoemBySlug).filter(Boolean);

    root.innerHTML = `
      <section class="poetry-hero">
        <div class="wrap poetry-hero-grid">
          <div class="hero-copy reveal in">
            <div class="eyebrow">${POETRY_HUB.hero.eyebrow}</div>
            <h1>${POETRY_HUB.hero.title}</h1>
            <p class="hero-sub">${POETRY_HUB.hero.text}</p>
            <div class="hero-cta">
              <a href="#featured" class="btn btn-primary magnetic">${POETRY_HUB.hero.ctaLabel}</a>
              <a href="poem.html?slug=${featured[0]?.slug || ''}" class="btn btn-ghost magnetic">Read a Poem</a>
            </div>
            <div class="stats-grid">
              ${POETRY_HUB.stats.map(item=>`<div class="stat-card reveal in"><strong>${item.value}</strong><span>${item.label}</span></div>`).join('')}
            </div>
          </div>
          <div class="hero-panel reveal in">
            <div class="hero-panel-inner">
              <h3>Search poems</h3>
              <div class="hub-search">
                <input type="search" id="poetrySearchInput" placeholder="Search titles, poets or themes" aria-label="Search poems">
                <button type="button" class="btn btn-primary" id="poetrySearchClear">Clear</button>
              </div>
              <div class="filter-row" id="poetryFilters">
                ${categories.map(cat => buildChip(cat,false)).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="poetry-section" id="featured">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Featured Poems</div><h2>Exam-ready poem notes</h2></div>
          <div class="poem-grid">
            ${featured.map(buildPoemCard).join('')}
          </div>
        </div>
      </section>
      <section class="poetry-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Authors</div><h2>Poets you will meet</h2></div>
          <div class="author-grid">
            ${authors.map(author => `
              <article class="author-card reveal in">
                <h3>${author.poet}</h3>
                <p>${author.count} poem${author.count>1 ? 's' : ''} included</p>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
      <section class="poetry-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Themes & Categories</div><h2>What each poem explores</h2></div>
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
      <section class="poetry-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Saved & Recent</div><h2>Favorites and your last reads</h2></div>
          <div class="recent-grid">
            <div class="recent-column reveal in">
              <h3>Favorites</h3>
              ${favoritePoems.length ? favoritePoems.map(poem => `<a href="poem.html?slug=${poem.slug}" class="page-link">${poem.title} • ${poem.poet}</a>`).join('') : '<p>No favorites yet. Tap a heart in any poem to save it.</p>'}
            </div>
            <div class="recent-column reveal in">
              <h3>Recently viewed</h3>
              ${recentPoems.length ? recentPoems.map(poem => `<a href="poem.html?slug=${poem.slug}" class="page-link">${poem.title} • ${poem.poet}</a>`).join('') : '<p>Open a poem to see it here.</p>'}
            </div>
          </div>
        </div>
      </section>
      <section class="poetry-section" id="searchResults">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Search results</div><h2>Find the right poem</h2></div>
          <div class="poem-grid" id="poetrySearchResults">
            ${poems.map(buildPoemCard).join('')}
          </div>
        </div>
      </section>
    `;

    setupHubInteractions();
  }

  function renderPoemCardGrid(items){
    return items.length ? items.map(buildPoemCard).join('') : renderEmptyState();
  }

  function formatChipsForSearch(text){ return text.trim().toLowerCase(); }

  function filterPoems(query, category){
    const normalized = query.trim().toLowerCase();
    return poems.filter(poem => {
      const haystack = [poem.title, poem.poet, poem.theme, poem.categories.join(' '), poem.summary, poem.literaryDevices.join(' ')].join(' ').toLowerCase();
      const matchQuery = !normalized || normalized.split(/\s+/).every(term => haystack.includes(term));
      const matchCategory = !category || poem.categories.includes(category) || poem.theme.toLowerCase() === category.toLowerCase();
      return matchQuery && matchCategory;
    });
  }

  function setupHubInteractions(){
    const searchInput = document.getElementById('poetrySearchInput');
    const searchResults = document.getElementById('poetrySearchResults');
    const clearBtn = document.getElementById('poetrySearchClear');
    const filterRow = document.getElementById('poetryFilters');
    let activeFilter = '';

    function refreshResults(){
      const query = searchInput?.value || '';
      const selected = activeFilter;
      const results = filterPoems(query, selected);
      searchResults.innerHTML = renderPoemCardGrid(results);
      attachFavoriteButtons();
    }

    if(searchInput){
      searchInput.addEventListener('input', refreshResults);
    }
    if(clearBtn){
      clearBtn.addEventListener('click', ()=>{
        if(searchInput){ searchInput.value=''; }
        activeFilter = '';
        document.querySelectorAll('.chip.active').forEach(btn=>btn.classList.remove('active'));
        refreshResults();
      });
    }
    document.querySelectorAll('.poetry-section .chip').forEach(button=>{
      button.addEventListener('click', ()=>{
        activeFilter = button.dataset.filter;
        document.querySelectorAll('.chip').forEach(btn=>btn.classList.toggle('active', btn===button));
        if(searchInput){ searchInput.value = activeFilter; }
        refreshResults();
      });
    });
    attachFavoriteButtons();
  }

  function attachFavoriteButtons(){
    document.querySelectorAll('[data-favorite]').forEach(button=>{
      if(button.dataset.favoriteListener) return;
      button.dataset.favoriteListener = 'true';
      button.addEventListener('click', e=>{
        e.preventDefault();
        const slug = button.dataset.favorite;
        const active = toggleFavorite(slug);
        button.classList.toggle('active', active);
        if(button.closest('.poem-card')){
          const label = button.closest('.poem-card').querySelector('h3');
          if(label){ button.setAttribute('aria-label', active ? `Remove ${label.textContent} from favorites` : `Add ${label.textContent} to favorites`); }
        }
      });
    });
  }

  function renderPoemPage(){
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const poem = getPoemBySlug(slug);
    if(!poem){
      poemRoot.innerHTML = `
        <section class="page-hero">
          <div class="wrap">
            <div class="eyebrow">Poem Not Found</div>
            <h1>We could not find that poem.</h1>
            <p class="hero-sub">Choose another poem from the Poetry Hub.</p>
            <div class="hero-cta"><a href="poetry.html" class="btn btn-primary magnetic">Back to Poetry Hub</a></div>
          </div>
        </section>`;
      document.title = 'Poem not found — Let\'s Learn with Arslan';
      return;
    }

    document.title = `${poem.title} — ${poem.poet} | Let's Learn with Arslan`;
    markRecentlyViewed(poem.slug);

    poemRoot.innerHTML = `
      <section class="poetry-hero poem-header">
        <div class="wrap poetry-hero-grid">
          <div class="hero-copy reveal in">
            <div class="eyebrow">Poem Analysis</div>
            <h1>${poem.title}</h1>
            <p class="hero-sub">${poem.poet} · ${poem.year} · ${poem.theme}</p>
            <div class="hero-meta">
              <span>Theme: ${poem.theme}</span>
              <span>Categories: ${poem.categories.join(', ')}</span>
            </div>
            <div class="hero-cta poem-actions">
              <button type="button" class="btn btn-primary magnetic favorite-toggle${getFavorites().includes(poem.slug) ? ' active' : ''}" data-favorite="${poem.slug}">Save to Favorites</button>
              <a href="poetry.html" class="btn btn-ghost magnetic">Back to Hub</a>
            </div>
          </div>
        </div>
      </section>
      <section class="poetry-section poem-detail">
        <div class="wrap">
          <div class="poem-meta-panel reveal in">
            <h2>About the poet</h2>
            <p>${poem.biography}</p>
          </div>
          <div class="poem-text-panel reveal in">
            <h2>Poem text</h2>
            <div class="poem-text">${poem.text.map(line => `<p class="poem-line">${line || '&nbsp;'}</p>`).join('')}</div>
          </div>
          <div class="poem-annotations reveal in">
            <h2>Annotations</h2>
            <div class="annotation-grid">
              ${poem.annotations.map(ann => `
                <article class="annotation-card">
                  <strong>${ann.line}</strong>
                  <p>${ann.note}</p>
                </article>
              `).join('')}
            </div>
          </div>
          <div class="analysis-grid reveal in">
            <article>
              <h2>Summary</h2>
              <p>${poem.summary}</p>
            </article>
            <article>
              <h2>Analysis</h2>
              ${poem.analysis.map(item => `<div class="analysis-card"><h3>${item.heading}</h3><p>${item.body}</p></div>`).join('')}
            </article>
          </div>
          <div class="poem-devices reveal in">
            <h2>Literary Devices</h2>
            <div class="device-list">
              ${poem.literaryDevices.map(device => `<span class="device-pill">${device}</span>`).join('')}
            </div>
          </div>
          <div class="poem-quiz-section reveal in">
            <h2>MCQs</h2>
            <div class="quiz-grid">
              ${poem.mcqs.map((item, index) => `
                <article class="quiz-card" data-quiz-index="${index}">
                  <h3>${item.question}</h3>
                  <div class="quiz-options">
                    ${item.options.map((option, optionIndex) => `
                      <button type="button" class="quiz-option" data-question="${index}" data-answer="${optionIndex}">${option}</button>
                    `).join('')}
                  </div>
                  <div class="quiz-feedback" aria-live="polite"></div>
                </article>
              `).join('')}
            </div>
          </div>
          <div class="poem-practice reveal in">
            <h2>Practice questions</h2>
            <ol class="practice-list">
              ${poem.practiceQuestions.map(question => `<li>${question}</li>`).join('')}
            </ol>
          </div>
          <div class="related-poems reveal in">
            <h2>Related poems</h2>
            <div class="poem-grid">
              ${poem.related.map(slug => getPoemBySlug(slug)).filter(Boolean).map(buildPoemCard).join('')}
            </div>
          </div>
        </div>
      </section>`;

    document.querySelectorAll('[data-favorite]').forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const slugValue = button.dataset.favorite;
        const active = toggleFavorite(slugValue);
        button.classList.toggle('active', active);
        button.textContent = active ? 'Saved to Favorites' : 'Save to Favorites';
      });
    });

    document.querySelectorAll('.quiz-option').forEach(button => {
      button.addEventListener('click', () => {
        const questionIndex = Number(button.dataset.question);
        const answerIndex = Number(button.dataset.answer);
        const quizCard = button.closest('.quiz-card');
        const quizData = poem.mcqs[questionIndex];
        if(!quizCard || !quizData) return;
        const feedback = quizCard.querySelector('.quiz-feedback');
        quizCard.querySelectorAll('.quiz-option').forEach(opt => opt.disabled = true);
        button.classList.add('selected');
        if(answerIndex === quizData.answer){
          feedback.innerHTML = `<strong>Correct.</strong> ${quizData.explanation}`;
          quizCard.classList.add('correct');
        } else {
          feedback.innerHTML = `<strong>Not quite.</strong> ${quizData.explanation}`;
          quizCard.classList.add('incorrect');
        }
      });
    });
  }

  if(isHubPage){ renderHub(); }
  if(isPoemPage){ renderPoemPage(); }
})();