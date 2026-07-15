// ============================================
// BLOG — DATA & HELPERS
// ============================================

const BLOG_HUB = {
  heroTitle: "From the Desk",
  heroSubtitle: "Articles, tips, and study guides for intermediate English learners",
  heroDescription: "Read curated articles on grammar, vocabulary, exam strategy, and writing skills.",
  heroImage: '/assets/img/blog-hero.jpg'
};

const AUTHORS = {
  arslan: { id: 'arslan', name: 'Arslan Ahmed', avatar: 'https://i.pravatar.cc/80?img=12', bio: 'Founder & Lead Teacher. Passionate about language pedagogy.' },
  sara: { id: 'sara', name: 'Sara Khan', avatar: 'https://i.pravatar.cc/80?img=45', bio: 'Exam strategist and curriculum designer.' }
};

const BLOG_CATEGORIES = {
  tips: { id: 'tips', name: 'Study Tips' },
  grammar: { id: 'grammar', name: 'Grammar' },
  vocabulary: { id: 'vocabulary', name: 'Vocabulary' },
  writing: { id: 'writing', name: 'Writing Skills' }
};

const BLOG_POSTS = [
  {
    id: 'how-to-master-tenses',
    title: "How to Master English Tenses (A Practical Guide)",
    slug: 'how-to-master-tenses',
    excerpt: 'A step-by-step approach to understanding and practicing tenses with real exercises and memory tricks.',
    heroImage: '/assets/img/posts/tenses-hero.jpg',
    category: 'grammar',
    tags: ['tenses', 'grammar', 'practice'],
    author: 'arslan',
    publishedAt: '2024-03-20',
    readingMins: 8,
    views: 8421,
    likes: 420,
    content: `
      <h2>Understanding Time in English</h2>
      <p>Tenses express time. Start with the present/past/future groups, then add perfect and continuous forms.</p>
      <h3>Practice Tips</h3>
      <ol>
        <li>Create timelines for verbs.</li>
        <li>Write short diaries using one tense per day.</li>
        <li>Practice with MCQs and fill-in-the-blanks.</li>
      </ol>
      <h3>Examples</h3>
      <p>"I have written" vs "I wrote" — notice the nuance.</p>
    `,
    related: ['how-to-improve-writing']
  },
  {
    id: 'improve-writing',
    title: 'How to Improve Your Essay Writing for Exams',
    slug: 'how-to-improve-writing',
    excerpt: 'Practical strategies to structure essays, plan time, and boost coherence and vocabulary.',
    heroImage: '/assets/img/posts/writing-hero.jpg',
    category: 'writing',
    tags: ['essay', 'writing', 'exams'],
    author: 'sara',
    publishedAt: '2024-05-02',
    readingMins: 10,
    views: 6520,
    likes: 312,
    content: `
      <h2>Plan, Write, Revise</h2>
      <p>Spend 5-7 minutes planning, 30-40 writing, and 10 minutes revising in an exam setting.</p>
      <h3>Structure</h3>
      <ul>
        <li>Introduction with thesis statement</li>
        <li>2-3 body paragraphs with topic sentences</li>
        <li>Conclusion that restates and expands</li>
      </ul>
    `,
    related: ['how-to-master-tenses']
  },
  {
    id: 'vocab-retention',
    title: 'Daily Habits for Better Vocabulary Retention',
    slug: 'vocab-retention',
    excerpt: 'Small daily habits that dramatically improve long-term retention of new words.',
    heroImage: '/assets/img/posts/vocab-hero.jpg',
    category: 'vocabulary',
    tags: ['vocabulary', 'mnemonics', 'daily'],
    author: 'arslan',
    publishedAt: '2024-06-11',
    readingMins: 6,
    views: 4120,
    likes: 198,
    content: `
      <h2>Make Vocabulary a Habit</h2>
      <p>Use spaced repetition, write example sentences, and teach others.</p>
      <h3>Tools</h3>
      <p>Use flashcards, apps, and a personal word list to revise daily.</p>
    `,
    related: []
  },
  {
    id: 'exam-day-strategy',
    title: 'Exam Day Strategy: What to Do and When',
    slug: 'exam-day-strategy',
    excerpt: 'A checklist and plan for the day of the exam — what to bring, how to manage time, and last-minute revision tips.',
    heroImage: '/assets/img/posts/exam-hero.jpg',
    category: 'tips',
    tags: ['exams', 'strategy', 'planning'],
    author: 'sara',
    publishedAt: '2024-02-28',
    readingMins: 5,
    views: 10240,
    likes: 610,
    content: `
      <h2>Before the Exam</h2>
      <p>Check your stationery, admit card, and arrive 30 minutes early.</p>
      <h3>During the Exam</h3>
      <p>Scan the paper, allocate time per question, and keep calm.</p>
    `,
    related: ['how-to-improve-writing']
  }
];

// Helpers
function getAllPosts() { return BLOG_POSTS; }
function getFeaturedPost() { return BLOG_POSTS[0]; }
function getLatestPosts(limit=5) { return BLOG_POSTS.slice().sort((a,b)=> new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,limit); }
function getPopularPosts(limit=5) { return BLOG_POSTS.slice().sort((a,b)=> b.views - a.views).slice(0,limit); }
function getPostBySlug(slug){ return BLOG_POSTS.find(p => p.slug === slug) || null; }
function getPostsByCategory(cat){ return BLOG_POSTS.filter(p => p.category === cat); }
function getPostsByTag(tag){ return BLOG_POSTS.filter(p => p.tags.includes(tag)); }
function getAllCategories(){ return Object.values(BLOG_CATEGORIES); }
function getAllTags(){ return [...new Set(BLOG_POSTS.flatMap(p=>p.tags))]; }
function estimateReadingTime(htmlContent){ return Math.max(1, Math.round((htmlContent.replace(/<[^>]+>/g,'').split(/\s+/).length)/200)); }

// Expose a lightweight comments store using localStorage
function getCommentsForPost(postId){
  try{
    const raw = localStorage.getItem('blog_comments_' + postId) || '[]';
    return JSON.parse(raw);
  }catch(e){ return []; }
}
function saveCommentForPost(postId, comment){
  try{
    const comments = getCommentsForPost(postId);
    comments.unshift(comment);
    localStorage.setItem('blog_comments_' + postId, JSON.stringify(comments));
    return true;
  }catch(e){ return false; }
}
