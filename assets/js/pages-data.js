/* =====================================================================
   PAGES DATA — dynamic content for page.html and global search.
   Every page is rendered from this dataset so the site can reuse a
   single template for poetry, literature, contact, dashboards, and more.
   ===================================================================== */

const PAGES = {
  poetry: {
    slug: 'poetry',
    title: 'Poetry Hub',
    tagline: 'Every poem broken into theme, summary, and exam-ready practice.',
    description: 'Explore poetry with clear summaries, difficult words, literary devices, and instant practice questions.',
    type: 'Subject',
    hero: {
      eyebrow: 'Poetry',
      title: 'Understand every poem, line by line.',
      text: 'Master speaker notes, themes, difficult vocabulary and the exact answers examiners want.',
      ctaLabel: 'Start Poetry Lessons',
      ctaUrl: 'poetry.html',
    },
    sections: [
      { id: 'overview', heading: 'What you will learn', body: 'From imagery and themes to difficult words and important questions, this poetry hub turns each poem into a clean, exam-ready story.' },
      { id: 'why', heading: 'Why this helps', body: 'Poetry questions are easier when you understand the poem’s voice, structure, and hidden meaning. That is what every page here is built to teach.' },
    ],
    cards: [
      { title: 'Line-by-line analysis', text: 'Break poems down in the same order the exam does.', icon: '📖' },
      { title: 'Theme and message', text: 'Identify the author’s purpose and the central idea fast.', icon: '🌟' },
      { title: 'Important questions', text: 'Practice the exact question types boards ask the most.', icon: '✍️' },
    ],
  },
  literature: {
    slug: 'literature',
    title: 'Literature Hub',
    tagline: 'Stories, authors, summaries and criticism — all in one place.',
    description: 'Study prose, drama and novel extracts with clean notes, character sketches and MCQs.',
    type: 'Subject',
    hero: {
      eyebrow: 'Literature',
      title: 'Read the story behind every story.',
      text: 'Make sense of characters, themes, critics, and questions with a study method that keeps the exam in mind.',
      ctaLabel: 'Explore Literature',
      ctaUrl: 'literature.html',
    },
    sections: [
      { id: 'stories', heading: 'Stories simplified', body: 'Each tale is explained in plain language, with summaries, author notes and exam-ready questions.' },
      { id: 'criticism', heading: 'Literary criticism', body: 'Learn key critics, themes and the critical language examiners expect in long-question answers.' },
    ],
    cards: [
      { title: 'Character sketches', text: 'Understand every major character at a glance.', icon: '👤' },
      { title: 'Theme tracking', text: 'Spot themes across chapters and use them in answers.', icon: '🧭' },
      { title: 'Exam questions', text: 'Practice the questions that appear in boards every year.', icon: '📝' },
    ],
  },
  vocabulary: {
    slug: 'vocabulary',
    title: 'Vocabulary Hub',
    tagline: 'Idioms, pair of words, confusables and word-building practice.',
    description: 'Build vocabulary confidence with real examples, MCQs and quick revision tools.',
    type: 'Subject',
    hero: {
      eyebrow: 'Vocabulary',
      title: 'Learn the words that matter most.',
      text: 'From idioms to confusing word pairs, sharpen your vocabulary with examples, quizzes and printable notes.',
      ctaLabel: 'Browse Vocabulary',
      ctaUrl: 'grammar.html',
    },
    sections: [
      { id: 'idioms', heading: 'Idioms made easy', body: 'Memorize idioms with short meanings and examples that show how they appear in exams.' },
      { id: 'word-pairs', heading: 'Confusing word pairs', body: 'Stop mixing up commonly confused words with clear comparisons and practise questions.' },
    ],
    cards: [
      { title: 'Word families', text: 'Learn root words and related meanings together.', icon: '🧠' },
      { title: 'Usage examples', text: 'See each vocabulary item in real sentences.', icon: '💬' },
      { title: 'Revision lists', text: 'Use quick lists for fast board exam revision.', icon: '📚' },
    ],
  },
  'past-papers': {
    slug: 'past-papers',
    title: 'Past Papers',
    tagline: 'Filter by board and year. View online or download with solutions.',
    description: 'Practice with real past papers and answer keys from multiple boards and years.',
    type: 'Practice',
    hero: {
      eyebrow: 'Past Papers',
      title: 'Solve the papers that matter.',
      text: 'Search past exams by board and year, then review the solution PDF to understand the best answers.',
      ctaLabel: 'Start Solving',
      ctaUrl: 'past-papers.html',
    },
    sections: [
      { id: 'why', heading: 'Why past papers help', body: 'Past papers show the exact language boards use and help you identify repeating question styles quickly.' },
      { id: 'strategy', heading: 'Study strategy', body: 'Focus on frequently repeated topics and use the solved papers to compare your answers with model responses.' },
    ],
    cards: [
      { title: 'Year-by-year filters', text: 'Find the right paper in seconds.', icon: '📅' },
      { title: 'Downloadable solutions', text: 'Keep a personal archive of solved papers.', icon: '📄' },
      { title: 'Board-specific sets', text: 'Practice with the board format you follow.', icon: '🏫' },
    ],
  },
  quiz: {
    slug: 'quiz',
    title: 'Quiz Zone',
    tagline: 'Instant MCQ practice with smart feedback and score tracking.',
    description: 'Test your knowledge topic by topic and see instant results for every quiz.',
    type: 'Practice',
    hero: {
      eyebrow: 'Quizzes',
      title: 'Quiz yourself with confidence.',
      text: 'Take short, exam-style MCQs and learn where your next revision should focus.',
      ctaLabel: 'Take a Quiz',
      ctaUrl: 'grammar.html',
    },
    sections: [
      { id: 'how', heading: 'How it works', body: 'Each quiz is built around a single topic so you can focus on one weak area at a time and measure your progress instantly.' },
    ],
    cards: [
      { title: 'Instant feedback', text: 'Get answers and explanations immediately.', icon: '⚡' },
      { title: 'Score tracking', text: 'Know your strengths and weaknesses.', icon: '📈' },
      { title: 'Board-ready style', text: 'Practice the exact question types that appear in exams.', icon: '🎯' },
    ],
  },
  blog: {
    slug: 'blog',
    title: 'Blog',
    tagline: 'Tips, strategies and exam advice for intermediate English students.',
    description: 'Read short articles that make revision faster, writing stronger, and exam planning simpler.',
    type: 'Blog',
    hero: {
      eyebrow: 'Blog',
      title: 'Study smarter, not longer.',
      text: 'Learn quick strategies for grammar, poetry, past papers and essays from one place.',
      ctaLabel: 'Read the Latest',
      ctaUrl: 'blog.html',
    },
    sections: [
      { id: 'topics', heading: 'Featured topics', body: 'Exam strategy, essay writing, poetry analysis and daily revision routines — all written for board students.' },
    ],
    cards: [
      { title: 'Exam strategy', text: 'Prepare with a checklist for the board exam day.', icon: '🧾' },
      { title: 'Grammar tips', text: 'Avoid common mistakes with short, actionable advice.', icon: '✅' },
      { title: 'Writing skills', text: 'Write answers that look complete and polished.', icon: '✒️' },
    ],
  },
  'blog-post': {
    slug: 'blog-post',
    title: 'How to Answer “Reference to the Context” Questions',
    tagline: 'A step-by-step guide for poetry exam questions.',
    description: 'Learn a straightforward strategy for answering reference questions with confidence and accuracy.',
    type: 'Article',
    hero: {
      eyebrow: 'Blog',
      title: 'Answer reference questions the right way.',
      text: 'Use a simple four-step method to identify evidence, explain meaning, and write a strong response.',
      ctaLabel: 'Back to Blog',
      ctaUrl: 'blog.html',
    },
    sections: [
      { id: 'step1', heading: 'Step 1: Read the full extract', body: 'Always start by reading the whole passage once before answering. This gives you context and helps you avoid misleading word choices.' },
      { id: 'step2', heading: 'Step 2: Underline the key line', body: 'Find the exact line or phrase the question refers to and note the surrounding meaning.' },
      { id: 'step3', heading: 'Step 3: Explain the meaning', body: 'Write the meaning in your own words, focusing on the idea rather than the individual words.' },
      { id: 'step4', heading: 'Step 4: Connect it to the question', body: 'Show how the line answers the specific question — mention the speaker, situation and effect if the question asks for it.' },
    ],
  },
  contact: {
    slug: 'contact',
    title: 'Contact Us',
    tagline: 'Questions? Feedback? Need help with a lesson?',
    description: 'Reach out for support, course guidance, or suggestions to make the platform better.',
    type: 'Contact',
    hero: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your learning goals.',
      text: 'Send us a message and we’ll help you find the right lesson, quiz or study plan for your board exam.',
      ctaLabel: 'Send a Message',
      ctaUrl: '#contactForm',
    },
    sections: [
      { id: 'details', heading: 'Need help fast?', body: 'Email us, share your board info, and we’ll recommend the best lessons and practice materials for your level.' },
    ],
    form: {
      headline: 'Send a message',
      fields: [
        { name: 'name', label: 'Full name', placeholder: 'Your name' },
        { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email' },
        { name: 'message', label: 'Message', placeholder: 'How can we help?', type: 'textarea' },
      ],
      button: 'Submit Inquiry',
    },
  },
  login: {
    slug: 'login',
    title: 'Login',
    tagline: 'Access your account and continue learning.',
    description: 'Sign in to track your lesson progress, bookmarks and quiz results.',
    type: 'Account',
    hero: {
      eyebrow: 'Login',
      title: 'Welcome back.',
      text: 'Enter your credentials to continue where you left off and keep your progress synced across devices.',
      ctaLabel: 'Need an account?',
      ctaUrl: 'register.html',
    },
    form: {
      headline: 'Sign in to your account',
      fields: [
        { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
        { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
      ],
      button: 'Login',
    },
  },
  register: {
    slug: 'register',
    title: 'Register',
    tagline: 'Create your free account and start learning.',
    description: 'Sign up to save progress, bookmark lessons and access personalized practice.',
    type: 'Account',
    hero: {
      eyebrow: 'Register',
      title: 'Start your learning journey.',
      text: 'Create an account in seconds and unlock progress tracking, saved notes, and quiz history.',
      ctaLabel: 'Already have an account?',
      ctaUrl: 'login.html',
    },
    form: {
      headline: 'Create a free account',
      fields: [
        { name: 'name', label: 'Full name', placeholder: 'Your name' },
        { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
        { name: 'password', label: 'Password', placeholder: 'Choose a password', type: 'password' },
      ],
      button: 'Register',
    },
  },
  'student-dashboard': {
    slug: 'student-dashboard',
    title: 'Student Dashboard',
    tagline: 'See your progress, recent lessons and upcoming goals at a glance.',
    description: 'Track completed lessons, quiz scores, next goals and recent activity in one place.',
    type: 'Dashboard',
    hero: {
      eyebrow: 'Dashboard',
      title: 'Your learning progress in one place.',
      text: 'Check completed lessons, current streaks, and the next quizzes you should take.',
      ctaLabel: 'Browse Lessons',
      ctaUrl: 'grammar.html',
    },
    cards: [
      { title: 'Completed lessons', text: '7 lessons finished this month.', icon: '✅' },
      { title: 'Quiz score', text: 'Average score: 89%.', icon: '📊' },
      { title: 'Streak', text: '5 days learning streak.', icon: '🔥' },
    ],
  },
  'teacher-dashboard': {
    slug: 'teacher-dashboard',
    title: 'Teacher Dashboard',
    tagline: 'Upload resources, track student progress and manage classes.',
    description: 'A simplified teacher panel for notes, lessons, and student activity.',
    type: 'Dashboard',
    hero: {
      eyebrow: 'Teacher',
      title: 'Manage your teaching resources.',
      text: 'Upload notes, add lessons, and stay on top of the students you are helping.',
      ctaLabel: 'View Student Reports',
      ctaUrl: 'student-dashboard.html',
    },
    cards: [
      { title: 'Active students', text: '42 students currently learning.', icon: '👩‍🏫' },
      { title: 'Uploaded notes', text: '18 premium notes available.', icon: '📁' },
      { title: 'Pending quizzes', text: '3 quizzes waiting for review.', icon: '⏱️' },
    ],
  },
  'admin-dashboard': {
    slug: 'admin-dashboard',
    title: 'Admin Dashboard',
    tagline: 'Monitor users, lessons, and platform activity.',
    description: 'A lightweight admin summary for users, teachers, and content management.',
    type: 'Admin',
    hero: {
      eyebrow: 'Admin',
      title: 'Platform analytics in one view.',
      text: 'Review registrations, activity, and top-performing subjects quickly.',
      ctaLabel: 'Manage Content',
      ctaUrl: 'teacher-dashboard.html',
    },
    cards: [
      { title: 'Users', text: '1,240 registered learners.', icon: '👥' },
      { title: 'Courses', text: '32 published topics.', icon: '🎓' },
      { title: 'Active sessions', text: '94 students online now.', icon: '💻' },
    ],
  },
};

function getPageBySlug(slug){
  return PAGES[slug] || null;
}
