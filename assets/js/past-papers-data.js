// ============================================
// PAST PAPERS SYSTEM - DATA & CONFIGURATION
// ============================================

const PAST_PAPERS_HUB = {
  heroTitle: 'Past Exam Papers',
  heroSubtitle: 'Master your exams with comprehensive practice papers',
  heroDescription: 'Access solved past papers from all major boards and years. Download, preview, and learn from important questions.',
  heroIcon: '📄'
};

const EXAM_BOARDS = {
  federal: {
    id: 'federal',
    name: 'Federal Board (FBISE)',
    icon: '🏛️',
    color: '#FF6B6B',
    papers: 28
  },
  punjab: {
    id: 'punjab',
    name: 'Punjab Board (BISE)',
    icon: '🌾',
    color: '#4ECDC4',
    papers: 32
  },
  sindh: {
    id: 'sindh',
    name: 'Sindh Board (BISE)',
    icon: '🌊',
    color: '#95E1D3',
    papers: 24
  },
  kpk: {
    id: 'kpk',
    name: 'KP Board (BISE)',
    icon: '⛰️',
    color: '#F38181',
    papers: 20
  },
  balochistan: {
    id: 'balochistan',
    name: 'Balochistan Board (BISE)',
    icon: '🏜️',
    color: '#AA96DA',
    papers: 16
  },
  cie: {
    id: 'cie',
    name: 'Cambridge CIE',
    icon: '🇬🇧',
    color: '#FFD93D',
    papers: 18
  }
};

const EXAM_SUBJECTS = {
  english: {
    id: 'english',
    name: 'English',
    icon: '🔤',
    category: 'Languages',
    papers: 28
  },
  urdu: {
    id: 'urdu',
    name: 'Urdu',
    icon: '🔡',
    category: 'Languages',
    papers: 24
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '🔢',
    category: 'Sciences',
    papers: 32
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    category: 'Sciences',
    papers: 26
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    category: 'Sciences',
    papers: 26
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    category: 'Sciences',
    papers: 20
  },
  history: {
    id: 'history',
    name: 'History',
    icon: '📚',
    category: 'Humanities',
    papers: 18
  },
  geography: {
    id: 'geography',
    name: 'Geography',
    icon: '🗺️',
    category: 'Humanities',
    papers: 16
  }
};

const PAST_PAPERS = [
  {
    id: 'fp-eng-2024-1',
    title: 'Federal Board English Paper I - 2024',
    subject: 'english',
    board: 'federal',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 80,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/fp-eng-2024-1.pdf',
    previewUrl: '/papers/preview/fp-eng-2024-1',
    downloads: 2845,
    uploadDate: '2024-06-15',
    fileSize: '2.4 MB',
    topics: ['Tenses', 'Comprehension', 'Grammar', 'Essay Writing', 'Letter Writing'],
    importantQuestions: [
      { qNo: 2, marks: 5, topic: 'Comprehension' },
      { qNo: 4, marks: 8, topic: 'Grammar' },
      { qNo: 7, marks: 10, topic: 'Essay' }
    ],
    rating: 4.8,
    reviews: 342,
    difficulty: 'intermediate',
    featured: true
  },
  {
    id: 'fp-eng-2023-1',
    title: 'Federal Board English Paper I - 2023',
    subject: 'english',
    board: 'federal',
    year: 2023,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 80,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/fp-eng-2023-1.pdf',
    previewUrl: '/papers/preview/fp-eng-2023-1',
    downloads: 3120,
    uploadDate: '2023-06-10',
    fileSize: '2.1 MB',
    topics: ['Present Perfect', 'Narrative', 'Grammar', 'Writing'],
    importantQuestions: [
      { qNo: 1, marks: 5, topic: 'Vocabulary' },
      { qNo: 3, marks: 8, topic: 'Tenses' },
      { qNo: 6, marks: 12, topic: 'Writing' }
    ],
    rating: 4.7,
    reviews: 289,
    difficulty: 'intermediate',
    featured: false
  },
  {
    id: 'fp-math-2024-1',
    title: 'Federal Board Mathematics Paper I - 2024',
    subject: 'mathematics',
    board: 'federal',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 100,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/fp-math-2024-1.pdf',
    previewUrl: '/papers/preview/fp-math-2024-1',
    downloads: 4210,
    uploadDate: '2024-06-15',
    fileSize: '3.2 MB',
    topics: ['Calculus', 'Algebra', 'Trigonometry', 'Functions', 'Sequences'],
    importantQuestions: [
      { qNo: 1, marks: 5, topic: 'Algebra' },
      { qNo: 4, marks: 8, topic: 'Calculus' },
      { qNo: 8, marks: 15, topic: 'Trigonometry' }
    ],
    rating: 4.9,
    reviews: 512,
    difficulty: 'intermediate',
    featured: true
  },
  {
    id: 'pb-eng-2024-1',
    title: 'Punjab Board English Paper I - 2024',
    subject: 'english',
    board: 'punjab',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 80,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/pb-eng-2024-1.pdf',
    previewUrl: '/papers/preview/pb-eng-2024-1',
    downloads: 3560,
    uploadDate: '2024-06-12',
    fileSize: '2.3 MB',
    topics: ['Grammar', 'Comprehension', 'Vocabulary', 'Writing'],
    importantQuestions: [
      { qNo: 2, marks: 5, topic: 'Comprehension' },
      { qNo: 5, marks: 10, topic: 'Writing' }
    ],
    rating: 4.6,
    reviews: 278,
    difficulty: 'intermediate',
    featured: false
  },
  {
    id: 'fp-phys-2024-1',
    title: 'Federal Board Physics Paper I - 2024',
    subject: 'physics',
    board: 'federal',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 100,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/fp-phys-2024-1.pdf',
    previewUrl: '/papers/preview/fp-phys-2024-1',
    downloads: 2890,
    uploadDate: '2024-06-15',
    fileSize: '3.8 MB',
    topics: ['Mechanics', 'Waves', 'Electricity', 'Magnetism', 'Modern Physics'],
    importantQuestions: [
      { qNo: 1, marks: 3, topic: 'Mechanics' },
      { qNo: 3, marks: 5, topic: 'Waves' },
      { qNo: 6, marks: 10, topic: 'Electricity' }
    ],
    rating: 4.8,
    reviews: 198,
    difficulty: 'hard',
    featured: true
  },
  {
    id: 'fp-chem-2024-1',
    title: 'Federal Board Chemistry Paper I - 2024',
    subject: 'chemistry',
    board: 'federal',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 100,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/fp-chem-2024-1.pdf',
    previewUrl: '/papers/preview/fp-chem-2024-1',
    downloads: 2650,
    uploadDate: '2024-06-15',
    fileSize: '2.9 MB',
    topics: ['Atomic Structure', 'Chemical Bonding', 'Thermochemistry', 'Equilibrium'],
    importantQuestions: [
      { qNo: 2, marks: 4, topic: 'Atomic Structure' },
      { qNo: 4, marks: 6, topic: 'Bonding' }
    ],
    rating: 4.7,
    reviews: 165,
    difficulty: 'hard',
    featured: false
  },
  {
    id: 'pb-math-2023-1',
    title: 'Punjab Board Mathematics Paper I - 2023',
    subject: 'mathematics',
    board: 'punjab',
    year: 2023,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 100,
    isSolved: true,
    hasSolution: true,
    downloadUrl: '/papers/pb-math-2023-1.pdf',
    previewUrl: '/papers/preview/pb-math-2023-1',
    downloads: 3890,
    uploadDate: '2023-06-10',
    fileSize: '3.1 MB',
    topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
    importantQuestions: [
      { qNo: 1, marks: 5, topic: 'Algebra' },
      { qNo: 7, marks: 12, topic: 'Calculus' }
    ],
    rating: 4.5,
    reviews: 342,
    difficulty: 'intermediate',
    featured: false
  },
  {
    id: 'cie-eng-2024',
    title: 'Cambridge CIE English Language - 2024',
    subject: 'english',
    board: 'cie',
    year: 2024,
    exam: 'Final Exam',
    level: 'O Levels / A Levels',
    duration: '1 hour 30 minutes',
    totalMarks: 90,
    isSolved: false,
    hasSolution: true,
    downloadUrl: '/papers/cie-eng-2024.pdf',
    previewUrl: '/papers/preview/cie-eng-2024',
    downloads: 1240,
    uploadDate: '2024-06-20',
    fileSize: '2.7 MB',
    topics: ['Reading', 'Writing', 'Listening', 'Speaking'],
    importantQuestions: [],
    rating: 4.4,
    reviews: 89,
    difficulty: 'hard',
    featured: false
  },
  {
    id: 'pb-bio-2024-1',
    title: 'Punjab Board Biology Paper I - 2024',
    subject: 'biology',
    board: 'punjab',
    year: 2024,
    exam: 'Final Exam',
    level: 'Intermediate',
    duration: '2 hours 15 minutes',
    totalMarks: 100,
    isSolved: false,
    hasSolution: true,
    downloadUrl: '/papers/pb-bio-2024-1.pdf',
    previewUrl: '/papers/preview/pb-bio-2024-1',
    downloads: 1890,
    uploadDate: '2024-06-14',
    fileSize: '2.5 MB',
    topics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution'],
    importantQuestions: [
      { qNo: 1, marks: 4, topic: 'Cell Structure' },
      { qNo: 5, marks: 8, topic: 'Genetics' }
    ],
    rating: 4.3,
    reviews: 124,
    difficulty: 'intermediate',
    featured: false
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getPapersByBoard(boardId) {
  return PAST_PAPERS.filter(p => p.board === boardId);
}

function getPapersBySubject(subjectId) {
  return PAST_PAPERS.filter(p => p.subject === subjectId);
}

function getPapersByYear(year) {
  return PAST_PAPERS.filter(p => p.year === year);
}

function getPapersByFilters(board, subject, year) {
  return PAST_PAPERS.filter(p =>
    (!board || p.board === board) &&
    (!subject || p.subject === subject) &&
    (!year || p.year === year)
  );
}

function getFeaturedPapers() {
  return PAST_PAPERS.filter(p => p.featured).slice(0, 6);
}

function getMostDownloaded() {
  return [...PAST_PAPERS].sort((a, b) => b.downloads - a.downloads).slice(0, 6);
}

function getYears() {
  const years = [...new Set(PAST_PAPERS.map(p => p.year))];
  return years.sort((a, b) => b - a);
}

function getAllBoards() {
  return Object.values(EXAM_BOARDS);
}

function getAllSubjects() {
  return Object.values(EXAM_SUBJECTS);
}

function getSubjectsByCategory(category) {
  return Object.values(EXAM_SUBJECTS).filter(s => s.category === category);
}

function searchPapers(query) {
  const q = query.toLowerCase();
  return PAST_PAPERS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.subject.toLowerCase().includes(q) ||
    p.board.toLowerCase().includes(q) ||
    p.topics.some(t => t.toLowerCase().includes(q))
  );
}

function getSolvedPapers() {
  return PAST_PAPERS.filter(p => p.isSolved);
}

function getUnsolvedPapers() {
  return PAST_PAPERS.filter(p => !p.isSolved);
}

function sortPapers(papers, sortBy) {
  const copy = [...papers];
  switch(sortBy) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    case 'oldest':
      return copy.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    case 'most-downloaded':
      return copy.sort((a, b) => b.downloads - a.downloads);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'difficulty':
      const difficultyRank = { easy: 1, intermediate: 2, hard: 3 };
      return copy.sort((a, b) => difficultyRank[b.difficulty] - difficultyRank[a.difficulty]);
    default:
      return copy;
  }
}
