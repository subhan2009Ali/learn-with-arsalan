// ============================================
// PAST PAPERS ENGINE - RENDERING & FILTERING
// ============================================

class PastPapersEngine {
  constructor() {
    this.currentView = 'hub';
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.filters = {
      board: null,
      subject: null,
      year: null,
      solved: null
    };
    this.sortBy = 'newest';
    this.searchQuery = '';
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => this.renderHub());
  }

  // ============================================
  // HUB RENDERING
  // ============================================

  renderHub() {
    const root = document.getElementById('pastPapersRoot');
    if (!root) return;

    this.currentView = 'hub';
    this.currentPage = 1;

    root.innerHTML = `
      <div class="papers-hub-container">
        <!-- Hero Section -->
        <section class="papers-hero">
          <div class="papers-hero-content">
            <h1 class="papers-hero-title">${PAST_PAPERS_HUB.heroTitle}</h1>
            <p class="papers-hero-subtitle">${PAST_PAPERS_HUB.heroSubtitle}</p>
            <p class="papers-hero-description">${PAST_PAPERS_HUB.heroDescription}</p>
          </div>
          <div class="papers-hero-icon">${PAST_PAPERS_HUB.heroIcon}</div>
        </section>

        <!-- Stats Section -->
        <section class="papers-stats">
          <div class="stat-card">
            <div class="stat-value">${PAST_PAPERS.length}+</div>
            <div class="stat-label">Papers</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${getAllBoards().length}</div>
            <div class="stat-label">Boards</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${getAllSubjects().length}</div>
            <div class="stat-label">Subjects</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${PAST_PAPERS.reduce((sum, p) => sum + p.downloads, 0)}+</div>
            <div class="stat-label">Downloads</div>
          </div>
        </section>

        <!-- Search & Filters -->
        <section class="papers-search-section">
          <div class="search-bar">
            <input type="text" class="search-input" id="papersSearch" 
                   placeholder="Search by title, subject, board, or topic..."
                   onkeyup="papersEngine.handleSearch(this.value)">
            <span class="search-icon">🔍</span>
          </div>
        </section>

        <!-- Featured Papers Carousel -->
        <section class="featured-papers-section">
          <h2>⭐ Featured Papers</h2>
          <div class="papers-carousel">
            ${getFeaturedPapers().map(paper => this.buildPaperCard(paper)).join('')}
          </div>
        </section>

        <!-- Most Downloaded -->
        <section class="most-downloaded-section">
          <h2>📥 Most Downloaded</h2>
          <div class="papers-grid">
            ${getMostDownloaded().map(paper => this.buildPaperCard(paper)).join('')}
          </div>
        </section>

        <!-- Board Selection -->
        <section class="board-selection-section">
          <h2>Browse by Exam Board</h2>
          <div class="boards-grid">
            ${getAllBoards().map(board => `
              <div class="board-card" style="--board-color: ${board.color}">
                <div class="board-icon">${board.icon}</div>
                <h3>${board.name}</h3>
                <p>${board.papers} papers</p>
                <button class="board-btn" onclick="papersEngine.filterByBoard('${board.id}')">
                  Browse
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Subject Selection -->
        <section class="subject-selection-section">
          <h2>Browse by Subject</h2>
          ${['Languages', 'Sciences', 'Humanities'].map(category => `
            <div class="subject-category">
              <h3>${category}</h3>
              <div class="subjects-grid">
                ${getSubjectsByCategory(category).map(subject => `
                  <div class="subject-card">
                    <div class="subject-icon">${subject.icon}</div>
                    <h4>${subject.name}</h4>
                    <p>${subject.papers} papers</p>
                    <button class="subject-btn" onclick="papersEngine.filterBySubject('${subject.id}')">
                      View Papers
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </section>
      </div>
    `;
  }

  buildPaperCard(paper) {
    const boardName = EXAM_BOARDS[paper.board].name;
    const subjectName = EXAM_SUBJECTS[paper.subject].name;
    const solvedBadge = paper.isSolved ? '<span class="badge solved">✓ Solved</span>' : '';
    const featuredBadge = paper.featured ? '<span class="badge featured">⭐ Featured</span>' : '';

    return `
      <div class="paper-card">
        <div class="paper-header">
          <div class="paper-badges">
            ${featuredBadge}
            ${solvedBadge}
            <span class="badge difficulty ${paper.difficulty}">${paper.difficulty}</span>
          </div>
          <div class="paper-rating">
            <span class="stars">${'⭐'.repeat(Math.round(paper.rating))}</span>
            <span class="rating-value">${paper.rating.toFixed(1)}</span>
          </div>
        </div>
        <div class="paper-body">
          <h3>${paper.title}</h3>
          <div class="paper-meta">
            <span class="meta-item">📋 ${boardName}</span>
            <span class="meta-item">📚 ${subjectName}</span>
            <span class="meta-item">📅 ${paper.year}</span>
          </div>
          <div class="paper-details">
            <span>⏱️ ${paper.duration}</span>
            <span>📊 ${paper.totalMarks} marks</span>
            <span>📥 ${(paper.downloads / 1000).toFixed(1)}k downloads</span>
          </div>
        </div>
        <div class="paper-footer">
          <button class="btn-preview" onclick="papersEngine.previewPaper('${paper.id}')">
            👁️ Preview
          </button>
          <button class="btn-download" onclick="papersEngine.downloadPaper('${paper.id}')">
            ⬇️ Download
          </button>
        </div>
      </div>
    `;
  }

  // ============================================
  // FILTERING & SEARCH
  // ============================================

  filterByBoard(boardId) {
    this.filters.board = boardId;
    this.filters.subject = null;
    this.filters.year = null;
    this.renderPapersGrid();
  }

  filterBySubject(subjectId) {
    this.filters.subject = subjectId;
    this.filters.board = null;
    this.filters.year = null;
    this.renderPapersGrid();
  }

  filterByYear(year) {
    this.filters.year = year;
    this.renderPapersGrid();
  }

  handleSearch(query) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.renderPapersGrid();
  }

  renderPapersGrid() {
    const root = document.getElementById('pastPapersRoot');
    if (!root) return;

    let papers = this.searchQuery ? searchPapers(this.searchQuery) : PAST_PAPERS;
    papers = getPapersByFilters(this.filters.board, this.filters.subject, this.filters.year);
    papers = sortPapers(papers, this.sortBy);

    const totalPages = Math.ceil(papers.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const paginatedPapers = papers.slice(start, start + this.itemsPerPage);

    let filtersHTML = `
      <div class="active-filters">
        ${this.filters.board ? `<span class="filter-tag">${EXAM_BOARDS[this.filters.board].name} <button onclick="papersEngine.clearFilter('board')">✕</button></span>` : ''}
        ${this.filters.subject ? `<span class="filter-tag">${EXAM_SUBJECTS[this.filters.subject].name} <button onclick="papersEngine.clearFilter('subject')">✕</button></span>` : ''}
        ${this.filters.year ? `<span class="filter-tag">${this.filters.year} <button onclick="papersEngine.clearFilter('year')">✕</button></span>` : ''}
        ${this.searchQuery ? `<span class="filter-tag">Search: ${this.searchQuery} <button onclick="papersEngine.clearSearch()">✕</button></span>` : ''}
        ${Object.values(this.filters).some(f => f) || this.searchQuery ? `<button class="clear-all-btn" onclick="papersEngine.clearAllFilters()">Clear All</button>` : ''}
      </div>
    `;

    root.innerHTML = `
      <div class="papers-grid-container">
        <!-- Back Button -->
        <button class="back-btn" onclick="papersEngine.renderHub()">← Back to Hub</button>

        <!-- Filters Header -->
        <div class="filters-header">
          <div class="filter-controls">
            <select class="filter-select" onchange="papersEngine.filterByYear(this.value ? parseInt(this.value) : null)">
              <option value="">All Years</option>
              ${getYears().map(year => `<option value="${year}">${year}</option>`).join('')}
            </select>

            <select class="filter-select" onchange="papersEngine.setSortBy(this.value)">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-downloaded">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="difficulty">Most Difficult</option>
            </select>
          </div>
          <div class="results-info">
            Showing ${paginatedPapers.length} of ${papers.length} papers
          </div>
        </div>

        ${filtersHTML}

        <!-- Papers Grid -->
        <div class="papers-grid">
          ${paginatedPapers.length > 0 ? 
            paginatedPapers.map(paper => this.buildPaperCard(paper)).join('') :
            '<div class="no-results"><span>📭 No papers found matching your filters</span></div>'
          }
        </div>

        <!-- Pagination -->
        ${totalPages > 1 ? `
          <div class="pagination">
            <button class="page-btn" onclick="papersEngine.goToPage(1)" ${this.currentPage === 1 ? 'disabled' : ''}>« First</button>
            <button class="page-btn" onclick="papersEngine.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>‹ Prev</button>
            
            <div class="page-numbers">
              ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = this.currentPage <= 3 ? i + 1 : this.currentPage + i - 2;
                if (pageNum > 0 && pageNum <= totalPages) {
                  return `<button class="page-num ${pageNum === this.currentPage ? 'active' : ''}" onclick="papersEngine.goToPage(${pageNum})">${pageNum}</button>`;
                }
                return '';
              }).join('')}
            </div>
            
            <button class="page-btn" onclick="papersEngine.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>Next ›</button>
            <button class="page-btn" onclick="papersEngine.goToPage(${totalPages})" ${this.currentPage === totalPages ? 'disabled' : ''}>Last »</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  setSortBy(sortBy) {
    this.sortBy = sortBy;
    this.currentPage = 1;
    this.renderPapersGrid();
  }

  goToPage(page) {
    let papers = this.searchQuery ? searchPapers(this.searchQuery) : PAST_PAPERS;
    papers = getPapersByFilters(this.filters.board, this.filters.subject, this.filters.year);
    const totalPages = Math.ceil(papers.length / this.itemsPerPage);
    
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderPapersGrid();
      document.querySelector('.papers-grid-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  clearFilter(filterType) {
    this.filters[filterType] = null;
    this.currentPage = 1;
    this.renderPapersGrid();
  }

  clearSearch() {
    this.searchQuery = '';
    document.getElementById('papersSearch').value = '';
    this.currentPage = 1;
    this.renderPapersGrid();
  }

  clearAllFilters() {
    this.filters = { board: null, subject: null, year: null, solved: null };
    this.searchQuery = '';
    this.sortBy = 'newest';
    this.currentPage = 1;
    document.getElementById('papersSearch').value = '';
    this.renderHub();
  }

  // ============================================
  // PREVIEW & DOWNLOAD
  // ============================================

  previewPaper(paperId) {
    const paper = PAST_PAPERS.find(p => p.id === paperId);
    if (!paper) return;

    const modal = document.createElement('div');
    modal.className = 'paper-preview-modal';
    modal.innerHTML = `
      <div class="preview-content">
        <button class="preview-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        <div class="preview-header">
          <h2>${paper.title}</h2>
          <div class="preview-meta">
            <span>📋 ${EXAM_BOARDS[paper.board].name}</span>
            <span>📅 ${paper.year}</span>
            <span>📊 ${paper.totalMarks} marks</span>
          </div>
        </div>
        <div class="preview-body">
          <div class="preview-info">
            <h3>Paper Information</h3>
            <table class="info-table">
              <tr><td>Subject:</td><td>${EXAM_SUBJECTS[paper.subject].name}</td></tr>
              <tr><td>Board:</td><td>${EXAM_BOARDS[paper.board].name}</td></tr>
              <tr><td>Year:</td><td>${paper.year}</td></tr>
              <tr><td>Duration:</td><td>${paper.duration}</td></tr>
              <tr><td>Total Marks:</td><td>${paper.totalMarks}</td></tr>
              <tr><td>Status:</td><td>${paper.isSolved ? '✓ Solved' : 'Unsolved'}</td></tr>
              <tr><td>File Size:</td><td>${paper.fileSize}</td></tr>
              <tr><td>Downloaded:</td><td>${paper.downloads.toLocaleString()} times</td></tr>
              <tr><td>Rating:</td><td>${paper.rating}/5 (${paper.reviews} reviews)</td></tr>
            </table>
          </div>

          ${paper.topics.length > 0 ? `
            <div class="preview-topics">
              <h3>Topics Covered</h3>
              <div class="topics-list">
                ${paper.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          ${paper.importantQuestions.length > 0 ? `
            <div class="preview-questions">
              <h3>Important Questions</h3>
              <table class="questions-table">
                <thead>
                  <tr>
                    <th>Q#</th>
                    <th>Marks</th>
                    <th>Topic</th>
                  </tr>
                </thead>
                <tbody>
                  ${paper.importantQuestions.map(q => `
                    <tr>
                      <td>${q.qNo}</td>
                      <td>${q.marks}</td>
                      <td>${q.topic}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>
        <div class="preview-actions">
          <button class="btn-download-large" onclick="papersEngine.downloadPaper('${paperId}')">
            ⬇️ Download PDF
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  downloadPaper(paperId) {
    const paper = PAST_PAPERS.find(p => p.id === paperId);
    if (!paper) return;

    // Simulate download
    const link = document.createElement('a');
    link.href = paper.downloadUrl;
    link.download = `${paper.id}.pdf`;
    link.click();

    // Show toast notification
    this.showToast(`📥 Downloaded: ${paper.title}`);
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize papers engine
const papersEngine = new PastPapersEngine();
