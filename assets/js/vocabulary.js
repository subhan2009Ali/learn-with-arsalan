/* =====================================================================
   VOCABULARY UI — renders the Vocabulary Hub with words, idioms, and interactive learning.
   ===================================================================== */
(function(){
  const vocabRoot = document.getElementById('vocabularyRoot');
  if(!vocabRoot) return;

  const words = getAllWords();
  const idioms = getAllIdioms();
  const categories = getWordCategories();
  const idiomCategories = getIdiomCategories();
  const difficulties = getDifficultyLevels();
  const wordOfTheDay = getWordOfTheDay();
  const dailyWords = getDailyWords();

  function buildChip(label, active){
    return `<button type="button" class="chip${active?' active':''}" data-filter="${label}">${label}</button>`;
  }

  function buildWordCard(word){
    return `
      <article class="word-card reveal in" data-word-slug="${word.slug}">
        <div class="word-card-header">
          <div>
            <h3>${word.word}</h3>
            <p class="word-phonetic">${word.pronunciation}</p>
          </div>
          <button type="button" class="favorite-btn magnetic" data-word-slug="${word.slug}" aria-label="Add to favorites">
            <svg viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="word-card-body">
          <p class="word-def">${word.definition}</p>
          <div class="word-meta">
            <span class="diff-badge">${word.difficulty}</span>
            <span>${word.category}</span>
          </div>
        </div>
        <div class="word-card-footer">
          <button type="button" class="btn btn-ghost btn-sm magnetic word-detail-btn" data-word-slug="${word.slug}">Learn More</button>
        </div>
      </article>`;
  }

  function buildIdiomCard(idiom){
    return `
      <article class="idiom-card reveal in">
        <h3>${idiom.idiom}</h3>
        <p class="idiom-meaning">${idiom.meaning}</p>
        <p class="idiom-example">Example: <em>${idiom.example}</em></p>
        <span class="idiom-cat">${idiom.category}</span>
      </article>`;
  }

  function buildEmptyState(){
    return `<div class="empty-state reveal in"><h3>No words match your search.</h3><p>Try a different keyword or filter.</p></div>`;
  }

  function filterWords(query, categoryFilter, difficultyFilter){
    const normalized = query.trim().toLowerCase();
    return words.filter(word => {
      const haystack = [word.word, word.definition, word.category, word.synonyms.join(' '), word.antonyms.join(' ')].join(' ').toLowerCase();
      const matchQuery = !normalized || normalized.split(/\s+/).every(term => haystack.includes(term));
      const matchCat = !categoryFilter || word.category === categoryFilter;
      const matchDiff = !difficultyFilter || word.difficulty === difficultyFilter;
      return matchQuery && matchCat && matchDiff;
    });
  }

  function renderHub(){
    document.title = 'Vocabulary Hub — Let\'s Learn with Arslan';
    vocabRoot.innerHTML = `
      <section class="vocab-hero">
        <div class="wrap vocab-hero-grid">
          <div class="hero-copy reveal in">
            <div class="eyebrow">${VOCABULARY_HUB.hero.eyebrow}</div>
            <h1>${VOCABULARY_HUB.hero.title}</h1>
            <p class="hero-sub">${VOCABULARY_HUB.hero.text}</p>
            <div class="hero-cta">
              <a href="#daily" class="btn btn-primary magnetic">${VOCABULARY_HUB.hero.ctaLabel}</a>
              <button type="button" class="btn btn-ghost magnetic" id="quizStartBtn">Start Quiz</button>
            </div>
          </div>
          <div class="hero-panel reveal in">
            <div class="hero-panel-inner">
              <h3>Search words</h3>
              <div class="hub-search">
                <input type="search" id="vocabSearchInput" placeholder="Find word, idiom or phrase" aria-label="Search vocabulary">
                <button type="button" class="btn btn-primary" id="vocabSearchClear">Clear</button>
              </div>
              <div class="filter-row" id="vocabCategoryFilter">
                ${categories.map(cat => buildChip(cat,false)).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="vocab-section" id="wordOfTheDay">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Daily Challenge</div><h2>Word of the Day</h2></div>
          <div class="wotd-card reveal in">
            <div class="wotd-left">
              <h2>${wordOfTheDay.word}</h2>
              <p class="wotd-phonetic">${wordOfTheDay.pronunciation}</p>
              <p class="wotd-def">${wordOfTheDay.definition}</p>
              <div class="wotd-examples">
                <h4>Examples:</h4>
                <ul>
                  ${wordOfTheDay.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="wotd-right">
              <div class="wotd-section">
                <h4>Synonyms</h4>
                <div class="chip-wrap">
                  ${wordOfTheDay.synonyms.map(s => `<span class="chip">${s}</span>`).join('')}
                </div>
              </div>
              <div class="wotd-section">
                <h4>Antonyms</h4>
                <div class="chip-wrap">
                  ${wordOfTheDay.antonyms.map(a => `<span class="chip">${a}</span>`).join('')}
                </div>
              </div>
              <div class="wotd-section">
                <h4>Mnemonic Tip</h4>
                <p class="mnemonic-tip">${wordOfTheDay.mnemonicTip}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="vocab-section" id="daily">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Quick Review</div><h2>Daily Words</h2></div>
          <div class="daily-grid">
            ${dailyWords.map(buildWordCard).join('')}
          </div>
        </div>
      </section>

      <section class="vocab-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Common Expressions</div><h2>Idioms &amp; Phrases</h2></div>
          <div class="idiom-grid">
            ${idioms.map(buildIdiomCard).join('')}
          </div>
        </div>
      </section>

      <section class="vocab-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">Filters &amp; Browse</div><h2>Learn by Category &amp; Level</h2></div>
          <div class="multi-grid reveal in">
            <div>
              <h3>Category</h3>
              <div class="chip-wrap">
                ${categories.map(cat => buildChip(cat,false)).join('')}
              </div>
            </div>
            <div>
              <h3>Difficulty</h3>
              <div class="chip-wrap">
                ${difficulties.map(diff => buildChip(diff,false)).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="vocab-section">
        <div class="wrap">
          <div class="sec-head reveal in"><div class="eyebrow">All Vocabulary</div><h2>Complete Word List</h2></div>
          <div class="word-grid" id="vocabSearchResults">
            ${words.map(buildWordCard).join('')}
          </div>
        </div>
      </section>`;

    setupInteractions();
    setupFavorites();
    setupWordDetailButtons();
  }

  function setupInteractions(){
    const searchInput = document.getElementById('vocabSearchInput');
    const clearBtn = document.getElementById('vocabSearchClear');
    const categoryFilter = document.getElementById('vocabCategoryFilter');
    const difficultyChips = document.querySelectorAll('.multi-grid .chip-wrap:last-child .chip');
    const searchResults = document.getElementById('vocabSearchResults');
    let activeCategory = '';
    let activeDifficulty = '';

    function refreshResults(){
      const query = searchInput?.value || '';
      const results = filterWords(query, activeCategory, activeDifficulty);
      searchResults.innerHTML = results.length ? results.map(buildWordCard).join('') : buildEmptyState();
      setupFavorites();
      setupWordDetailButtons();
    }

    if(searchInput){
      searchInput.addEventListener('input', refreshResults);
    }

    if(clearBtn){
      clearBtn.addEventListener('click', ()=>{
        if(searchInput){ searchInput.value = ''; }
        activeCategory = '';
        activeDifficulty = '';
        document.querySelectorAll('.chip.active').forEach(btn=>btn.classList.remove('active'));
        refreshResults();
      });
    }

    categoryFilter?.querySelectorAll('.chip').forEach(button => {
      button.addEventListener('click', ()=>{
        activeCategory = activeCategory === button.dataset.filter ? '' : button.dataset.filter;
        categoryFilter.querySelectorAll('.chip').forEach(btn => btn.classList.toggle('active', btn === button));
        if(searchInput && activeCategory){ searchInput.value = activeCategory; }
        refreshResults();
      });
    });

    difficultyChips.forEach(button => {
      button.addEventListener('click', ()=>{
        activeDifficulty = activeDifficulty === button.dataset.filter ? '' : button.dataset.filter;
        difficultyChips.forEach(btn => btn.classList.toggle('active', btn === button));
        refreshResults();
      });
    });
  }

  function setupFavorites(){
    const favBtns = document.querySelectorAll('.favorite-btn');
    const favorites = JSON.parse(localStorage.getItem('vocabFavorites') || '{}');

    favBtns.forEach(btn => {
      const slug = btn.dataset.wordSlug;
      if(favorites[slug]){
        btn.classList.add('active');
      }
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if(favorites[slug]){
          delete favorites[slug];
          btn.classList.remove('active');
        } else {
          favorites[slug] = true;
          btn.classList.add('active');
        }
        try{ localStorage.setItem('vocabFavorites', JSON.stringify(favorites)); }catch(err){}
      });
    });
  }

  function setupWordDetailButtons(){
    const detailBtns = document.querySelectorAll('.word-detail-btn');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.dataset.wordSlug;
        const word = getWordBySlug(slug);
        if(!word) return;
        showWordModal(word);
      });
    });
  }

  function showWordModal(word){
    const modal = document.createElement('div');
    modal.className = 'word-modal-overlay';
    modal.innerHTML = `
      <div class="word-modal" role="dialog" aria-modal="true">
        <button type="button" class="modal-close magnetic" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <div class="modal-content">
          <h2>${word.word}</h2>
          <p class="modal-phonetic">${word.pronunciation}</p>
          <p class="modal-def">${word.definition}</p>
          
          <div class="modal-section">
            <h3>Examples</h3>
            <ul class="example-list">
              ${word.examples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
          </div>

          <div class="modal-section">
            <h3>Synonyms</h3>
            <div class="chip-wrap">
              ${word.synonyms.map(s => `<span class="chip">${s}</span>`).join('')}
            </div>
          </div>

          <div class="modal-section">
            <h3>Antonyms</h3>
            <div class="chip-wrap">
              ${word.antonyms.map(a => `<span class="chip">${a}</span>`).join('')}
            </div>
          </div>

          <div class="modal-section">
            <h3>Related Words</h3>
            <div class="chip-wrap">
              ${word.relatedWords.map(w => `<span class="chip">${w}</span>`).join('')}
            </div>
          </div>

          <div class="modal-section">
            <h3>Memory Tip</h3>
            <p class="mnemonic-tip">${word.mnemonicTip}</p>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('open'), 10);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', e => {
      if(e.target === modal){
        modal.classList.remove('open');
        setTimeout(() => modal.remove(), 300);
      }
    });

    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && modal.classList.contains('open')){
        modal.classList.remove('open');
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  const quizStartBtn = document.getElementById('quizStartBtn');
  if(quizStartBtn){
    quizStartBtn.addEventListener('click', () => {
      startQuiz();
    });
  }

  function startQuiz(){
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 5);
    let score = 0;
    let current = 0;

    function showQuizQuestion(){
      if(current >= shuffled.length){
        showQuizResults(score, shuffled.length);
        return;
      }

      const word = shuffled[current];
      const allWords = [...words].sort(() => Math.random() - 0.5).slice(0, 4);
      if(!allWords.includes(word)){
        allWords.push(word);
      }
      const options = allWords.sort(() => Math.random() - 0.5);

      const modal = document.createElement('div');
      modal.className = 'quiz-modal-overlay';
      modal.innerHTML = `
        <div class="quiz-modal" role="dialog" aria-modal="true">
          <div class="quiz-header">
            <h2>Vocabulary Quiz</h2>
            <span>${current + 1} / ${shuffled.length}</span>
          </div>
          <div class="quiz-question">
            <p>What is the definition of:</p>
            <h3>${word.word}</h3>
          </div>
          <div class="quiz-options">
            ${options.map((opt, idx) => `
              <button type="button" class="quiz-option magnetic" data-answer="${opt.slug === word.slug}">
                ${opt.definition}
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback" aria-live="polite"></div>
        </div>`;

      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('open'), 10);

      const optionBtns = modal.querySelectorAll('.quiz-option');
      optionBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          const isCorrect = btn.dataset.answer === 'true';
          if(isCorrect) score++;
          optionBtns.forEach(b => b.disabled = true);
          btn.classList.add(isCorrect ? 'correct' : 'incorrect');
          modal.querySelector('.quiz-feedback').innerHTML = `<p>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>`;
          current++;
          setTimeout(() => {
            modal.classList.remove('open');
            setTimeout(() => {
              modal.remove();
              showQuizQuestion();
            }, 300);
          }, 1800);
        });
      });
    }

    showQuizQuestion();
  }

  function showQuizResults(score, total){
    const percentage = Math.round((score / total) * 100);
    const modal = document.createElement('div');
    modal.className = 'quiz-modal-overlay';
    modal.innerHTML = `
      <div class="quiz-modal quiz-results" role="dialog" aria-modal="true">
        <h2>Quiz Complete!</h2>
        <div class="score-display">
          <span class="score-big">${score}/${total}</span>
          <span class="score-percent">${percentage}%</span>
        </div>
        <p class="score-message">${percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good effort! Keep practicing.' : 'Keep learning! Try again.'}</p>
        <button type="button" class="btn btn-primary magnetic" id="retakeQuizBtn">Retake Quiz</button>
        <button type="button" class="btn btn-ghost magnetic" id="closeQuizBtn">Close</button>
      </div>`;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('open'), 10);

    document.getElementById('retakeQuizBtn').addEventListener('click', () => {
      modal.remove();
      startQuiz();
    });

    document.getElementById('closeQuizBtn').addEventListener('click', () => {
      modal.classList.remove('open');
      setTimeout(() => modal.remove(), 300);
    });
  }

  renderHub();
})();