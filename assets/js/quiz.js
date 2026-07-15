// ============================================
// QUIZ ENGINE - REUSABLE ARCHITECTURE
// ============================================

class QuizEngine {
  constructor() {
    this.currentState = 'hub';
    this.selectedCategory = null;
    this.selectedQuiz = null;
    this.selectedDifficulty = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.startTime = null;
    this.timeRemaining = null;
    this.timerInterval = null;
    this.quizStarted = false;
    this.leaderboard = [...LEADERBOARD_DATA];
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => this.renderHub());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentState !== 'hub') {
        this.exitQuiz();
      }
    });
  }

  // ============================================
  // HUB RENDERING - CATEGORY & QUIZ SELECTION
  // ============================================

  renderHub() {
    const root = document.getElementById('quizRoot');
    if (!root) return;

    this.currentState = 'hub';
    this.selectedQuiz = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};

    root.innerHTML = `
      <div class="quiz-hub-container">
        <!-- Hero Section -->
        <section class="quiz-hero">
          <div class="quiz-hero-content">
            <h1 class="quiz-hero-title">${QUIZ_HUB.heroTitle}</h1>
            <p class="quiz-hero-subtitle">${QUIZ_HUB.heroSubtitle}</p>
            <p class="quiz-hero-description">${QUIZ_HUB.heroDescription}</p>
          </div>
          <div class="quiz-hero-icon">${QUIZ_HUB.heroIcon}</div>
        </section>

        <!-- Stats Section -->
        <section class="quiz-stats">
          <div class="stat-card">
            <div class="stat-value">5</div>
            <div class="stat-label">Categories</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">17</div>
            <div class="stat-label">Total Quizzes</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">67</div>
            <div class="stat-label">Questions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">8.5M+</div>
            <div class="stat-label">Attempts</div>
          </div>
        </section>

        <!-- Categories Grid -->
        <section class="quiz-categories">
          <h2>Select a Category</h2>
          <div class="categories-grid">
            ${getAllCategories().map(cat => `
              <div class="category-card" style="--cat-color: ${cat.color}">
                <div class="category-icon">${cat.icon}</div>
                <h3>${cat.name}</h3>
                <p>${cat.description}</p>
                <div class="category-meta">
                  <span class="quiz-count">${cat.quizzesCount} quizzes</span>
                </div>
                <button class="category-btn" onclick="quizEngine.selectCategory('${cat.id}')">
                  Start Quiz
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Leaderboard Section -->
        <section class="quiz-leaderboard-section">
          <h2>🏆 Top Performers</h2>
          <div class="leaderboard-container">
            ${this.leaderboard.slice(0, 5).map(entry => `
              <div class="leaderboard-entry">
                <div class="entry-rank">
                  <span class="rank-badge">${entry.rank}</span>
                </div>
                <div class="entry-info">
                  <div class="entry-name">${entry.name}</div>
                  <div class="entry-meta">${QUIZ_CATEGORIES[entry.category].name} • ${entry.completions} completed</div>
                </div>
                <div class="entry-score">${entry.score}</div>
                <div class="entry-streak">🔥 ${entry.streak}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  selectCategory(categoryId) {
    this.selectedCategory = categoryId;
    const quizzes = getQuizzesByCategory(categoryId);
    this.renderCategoryQuizzes(categoryId, quizzes);
  }

  renderCategoryQuizzes(categoryId, quizzes) {
    const root = document.getElementById('quizRoot');
    const category = QUIZ_CATEGORIES[categoryId];

    root.innerHTML = `
      <div class="quiz-category-container">
        <!-- Back Button & Category Header -->
        <div class="quiz-header">
          <button class="back-btn" onclick="quizEngine.renderHub()">← Back</button>
          <div class="category-header">
            <span class="category-icon">${category.icon}</span>
            <h1>${category.name}</h1>
          </div>
        </div>

        <!-- Quizzes List -->
        <div class="quizzes-grid">
          ${quizzes.map(quiz => `
            <div class="quiz-card">
              <div class="quiz-card-image" style="background-image: url('${quiz.image}')"></div>
              <div class="quiz-card-content">
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <div class="quiz-meta">
                  <span class="difficulty" style="color: ${getDifficultyColor(quiz.difficulty)}">
                    ● ${getDifficultyLabel(quiz.difficulty)}
                  </span>
                  <span class="duration">⏱️ ${quiz.duration} min</span>
                  <span class="question-count">❓ ${quiz.totalQuestions} questions</span>
                </div>
                <button class="quiz-start-btn" onclick="quizEngine.startQuiz('${quiz.id}')">
                  Start Quiz
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ============================================
  // QUIZ EXECUTION
  // ============================================

  startQuiz(quizId) {
    this.selectedQuiz = getQuizById(quizId);
    if (!this.selectedQuiz) return;

    this.currentState = 'quiz';
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.startTime = Date.now();
    this.timeRemaining = this.selectedQuiz.duration * 60;
    this.quizStarted = true;

    this.renderQuizScreen();
    this.startTimer();
  }

  renderQuizScreen() {
    const root = document.getElementById('quizRoot');
    const quiz = this.selectedQuiz;
    const progress = ((this.currentQuestionIndex + 1) / quiz.questions.length) * 100;

    root.innerHTML = `
      <div class="quiz-screen">
        <!-- Progress Bar -->
        <div class="quiz-progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>

        <!-- Quiz Header -->
        <div class="quiz-header-top">
          <div class="quiz-info">
            <h2>${quiz.title}</h2>
            <span class="question-counter">Question ${this.currentQuestionIndex + 1} of ${quiz.questions.length}</span>
          </div>
          <div class="quiz-timer" id="quizTimer">
            <span class="timer-icon">⏱️</span>
            <span class="timer-text" id="timerText">${this.formatTime(this.timeRemaining)}</span>
          </div>
        </div>

        <!-- Question Container -->
        <div class="question-container">
          ${this.renderQuestion()}
        </div>

        <!-- Navigation -->
        <div class="quiz-navigation">
          <button class="nav-btn prev-btn" onclick="quizEngine.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="nav-btn next-btn" onclick="quizEngine.nextQuestion()" ${this.currentQuestionIndex === quiz.questions.length - 1 ? 'disabled' : ''}>
            Next →
          </button>
          <button class="nav-btn submit-btn" onclick="quizEngine.submitQuiz()" ${this.currentQuestionIndex === quiz.questions.length - 1 ? '' : 'style="display:none"'}>
            Submit Quiz
          </button>
        </div>
      </div>
    `;
  }

  renderQuestion() {
    const quiz = this.selectedQuiz;
    const question = quiz.questions[this.currentQuestionIndex];
    const userAnswer = this.userAnswers[question.id];

    let questionHTML = `<div class="question">
      <h3 class="question-text">${question.question}</h3>`;

    if (question.type === 'mcq') {
      questionHTML += `
        <div class="options-grid">
          ${question.options.map(option => `
            <label class="option ${userAnswer === option.id ? 'selected' : ''}">
              <input type="radio" name="q${question.id}" value="${option.id}" 
                     onchange="quizEngine.selectAnswer('${question.id}', '${option.id}')"
                     ${userAnswer === option.id ? 'checked' : ''}>
              <span class="option-text">${option.text}</span>
            </label>
          `).join('')}
        </div>
      `;
    } else if (question.type === 'truefalse') {
      questionHTML += `
        <div class="truefalse-options">
          <label class="tf-option ${userAnswer === 'true' ? 'selected' : ''}">
            <input type="radio" name="q${question.id}" value="true"
                   onchange="quizEngine.selectAnswer('${question.id}', true)"
                   ${userAnswer === 'true' ? 'checked' : ''}>
            <span>True</span>
          </label>
          <label class="tf-option ${userAnswer === 'false' ? 'selected' : ''}">
            <input type="radio" name="q${question.id}" value="false"
                   onchange="quizEngine.selectAnswer('${question.id}', false)"
                   ${userAnswer === 'false' ? 'checked' : ''}>
            <span>False</span>
          </label>
        </div>
      `;
    } else if (question.type === 'fillblank') {
      const currentAnswer = userAnswer || '';
      questionHTML += `
        <div class="fillblank-container">
          <div class="sentence-with-blank">
            ${question.question}
            <input type="text" class="blank-input" value="${currentAnswer}"
                   onchange="quizEngine.selectAnswer('${question.id}', this.value)"
                   placeholder="Enter the answer">
          </div>
          <div class="options-hint">
            <small>Available options:</small>
            <div class="hint-options">
              ${question.options.map(opt => `<span class="hint-option">${opt}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (question.type === 'match') {
      questionHTML += `
        <div class="match-container">
          <div class="match-left">
            ${question.pairs.map(pair => `
              <div class="match-item">${pair.left}</div>
            `).join('')}
          </div>
          <div class="match-right">
            ${question.pairs.map((pair, idx) => `
              <select class="match-select" data-pair="${idx}" onchange="quizEngine.updateMatch('${question.id}', ${idx}, this.value)">
                <option value="">Select...</option>
                ${question.pairs.map((p, pIdx) => `
                  <option value="${pIdx}" ${userAnswer && userAnswer.includes(idx + '-' + pIdx) ? 'selected' : ''}>
                    ${p.right}
                  </option>
                `).join('')}
              </select>
            `).join('')}
          </div>
        </div>
      `;
    }

    questionHTML += `</div>`;
    return questionHTML;
  }

  selectAnswer(questionId, answer) {
    this.userAnswers[questionId] = answer;
  }

  updateMatch(questionId, pairIndex, value) {
    if (!this.userAnswers[questionId]) {
      this.userAnswers[questionId] = '';
    }
    const answers = this.userAnswers[questionId].split('|').filter(a => !a.startsWith(pairIndex + '-'));
    if (value !== '') {
      answers.push(pairIndex + '-' + value);
    }
    this.userAnswers[questionId] = answers.join('|');
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuizScreen();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.selectedQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuizScreen();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      const timerText = document.getElementById('timerText');
      if (timerText) {
        timerText.textContent = this.formatTime(this.timeRemaining);
        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          this.submitQuiz();
        }
      }
    }, 1000);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  submitQuiz() {
    clearInterval(this.timerInterval);
    const score = calculateQuizScore(this.selectedQuiz, this.userAnswers);
    this.renderResults(score);
  }

  // ============================================
  // RESULTS & ANIMATIONS
  // ============================================

  renderResults(score) {
    const root = document.getElementById('quizRoot');
    const quiz = this.selectedQuiz;
    const passed = score >= 60;
    const resultMessage = score >= 90 ? 'Outstanding!' : score >= 80 ? 'Great Job!' : score >= 60 ? 'Good Effort!' : 'Keep Practicing!';
    const resultIcon = score >= 90 ? '🌟' : score >= 80 ? '👏' : score >= 60 ? '💪' : '📚';

    root.innerHTML = `
      <div class="quiz-results">
        <div class="results-container">
          <!-- Score Display -->
          <div class="results-header">
            <div class="result-icon">${resultIcon}</div>
            <h1 class="result-message">${resultMessage}</h1>
            <p class="result-subtitle">Quiz Completed!</p>
          </div>

          <!-- Circular Progress -->
          <div class="circular-progress">
            <svg class="progress-ring" width="200" height="200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" stroke-width="8"></circle>
              <circle cx="100" cy="100" r="90" fill="none" stroke="${passed ? '#4ECDC4' : '#FF6B6B'}" 
                      stroke-width="8" stroke-dasharray="565" stroke-dashoffset="0"
                      style="animation: fillCircle 1.5s ease-out forwards; 
                             stroke-dasharray: ${565 - (score / 100) * 565}, 565;"></circle>
            </svg>
            <div class="progress-text">
              <div class="score-value">${score}%</div>
              <div class="score-label">Score</div>
            </div>
          </div>

          <!-- Detailed Results -->
          <div class="results-details">
            <div class="detail-item">
              <span class="detail-label">Questions Answered</span>
              <span class="detail-value">${Object.keys(this.userAnswers).length} / ${quiz.questions.length}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Quiz Duration</span>
              <span class="detail-value">${quiz.duration} minutes</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Time Taken</span>
              <span class="detail-value">${this.formatTime(this.selectedQuiz.duration * 60 - this.timeRemaining)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Difficulty</span>
              <span class="detail-value" style="color: ${getDifficultyColor(quiz.difficulty)}">
                ${getDifficultyLabel(quiz.difficulty)}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="results-actions">
            <button class="action-btn review-btn" onclick="quizEngine.reviewAnswers()">
              📋 Review Answers
            </button>
            <button class="action-btn retake-btn" onclick="quizEngine.startQuiz('${quiz.id}')">
              🔄 Retake Quiz
            </button>
            <button class="action-btn home-btn" onclick="quizEngine.renderHub()">
              🏠 Back to Hub
            </button>
          </div>

          <!-- Share Score -->
          <div class="share-score">
            <p>Share your score!</p>
            <div class="share-buttons">
              <button class="share-btn facebook">f</button>
              <button class="share-btn twitter">𝕏</button>
              <button class="share-btn whatsapp">💬</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Trigger confetti effect
    this.triggerConfetti(passed);
  }

  triggerConfetti(success) {
    const colors = success ? ['#4ECDC4', '#FFD93D', '#FF6B6B', '#F38181'] : ['#95E1D3', '#AA96DA'];
    const confettiCount = success ? 100 : 30;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  }

  reviewAnswers() {
    const root = document.getElementById('quizRoot');
    const quiz = this.selectedQuiz;

    root.innerHTML = `
      <div class="quiz-review">
        <div class="review-header">
          <button class="back-btn" onclick="quizEngine.renderResults(this.lastScore)" style="display:none"></button>
          <h1>Review Your Answers</h1>
          <p>${quiz.title}</p>
        </div>

        <div class="review-container">
          ${quiz.questions.map((q, idx) => {
            const userAnswer = this.userAnswers[q.id];
            const isCorrect = this.isAnswerCorrect(q, userAnswer);

            return `
              <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-header-item">
                  <span class="review-number">Q${idx + 1}</span>
                  <span class="review-status">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <div class="review-question">${q.question}</div>
                <div class="review-answer">
                  <strong>Your Answer:</strong> ${this.formatUserAnswer(q, userAnswer)}
                </div>
                ${!isCorrect && `
                  <div class="review-correct">
                    <strong>Correct Answer:</strong> ${this.formatCorrectAnswer(q)}
                  </div>
                `}
                <div class="review-explanation">
                  <strong>Explanation:</strong>
                  <p>${q.explanation}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="review-actions">
          <button class="action-btn" onclick="quizEngine.renderResults(this.lastScore)">← Back to Results</button>
          <button class="action-btn" onclick="quizEngine.renderHub()">← Back to Hub</button>
        </div>
      </div>
    `;
  }

  isAnswerCorrect(question, userAnswer) {
    if (!userAnswer) return false;

    if (question.type === 'mcq') {
      const option = question.options.find(opt => opt.id === userAnswer);
      return option && option.correct;
    } else if (question.type === 'truefalse') {
      return userAnswer === question.answer || (userAnswer === 'true' && question.answer === true) || (userAnswer === 'false' && question.answer === false);
    } else if (question.type === 'fillblank') {
      return question.blanks.includes(userAnswer.toLowerCase().trim());
    } else if (question.type === 'match') {
      const pairs = userAnswer.split('|');
      return pairs.length === question.pairs.length;
    }
    return false;
  }

  formatUserAnswer(question, userAnswer) {
    if (!userAnswer) return '<em>No answer provided</em>';

    if (question.type === 'mcq') {
      const option = question.options.find(opt => opt.id === userAnswer);
      return option ? option.text : 'Unknown';
    } else if (question.type === 'truefalse') {
      return String(userAnswer).charAt(0).toUpperCase() + String(userAnswer).slice(1);
    } else if (question.type === 'fillblank') {
      return `<strong>${userAnswer}</strong>`;
    } else if (question.type === 'match') {
      return 'See pairs matched';
    }
    return userAnswer;
  }

  formatCorrectAnswer(question) {
    if (question.type === 'mcq') {
      const option = question.options.find(opt => opt.correct);
      return option ? option.text : 'Unknown';
    } else if (question.type === 'truefalse') {
      return question.answer ? 'True' : 'False';
    } else if (question.type === 'fillblank') {
      return `<strong>${question.blanks[0]}</strong>`;
    } else if (question.type === 'match') {
      return 'See pairs in explanation';
    }
    return '';
  }

  exitQuiz() {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      this.renderHub();
    }
  }
}

// Initialize quiz engine
const quizEngine = new QuizEngine();
