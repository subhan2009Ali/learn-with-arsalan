// ============================================
// QUIZ SYSTEM - COMPREHENSIVE DATA & CONFIG
// ============================================

const QUIZ_HUB = {
  heroTitle: 'Test Your Knowledge',
  heroSubtitle: 'Challenge yourself with our comprehensive quiz system',
  heroDescription: 'Master grammar, vocabulary, literature, and more through interactive quizzes',
  heroIcon: '📝'
};

const QUIZ_CATEGORIES = {
  grammar: {
    id: 'grammar',
    name: 'Grammar',
    icon: '✍️',
    description: 'Parts of speech, tenses, narration, and voice',
    color: '#FF6B6B',
    quizzesCount: 5
  },
  vocabulary: {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: '📚',
    description: 'Word meanings, synonyms, antonyms, and idioms',
    color: '#4ECDC4',
    quizzesCount: 4
  },
  literature: {
    id: 'literature',
    name: 'Literature',
    icon: '📖',
    description: 'Stories, drama, novels, and critical analysis',
    color: '#95E1D3',
    quizzesCount: 3
  },
  poetry: {
    id: 'poetry',
    name: 'Poetry',
    icon: '✨',
    description: 'Literary devices, themes, and poetic forms',
    color: '#F38181',
    quizzesCount: 2
  },
  pronunciation: {
    id: 'pronunciation',
    name: 'Pronunciation',
    icon: '🎤',
    description: 'Learn correct pronunciation and phonetics',
    color: '#AA96DA',
    quizzesCount: 3
  }
};

const QUIZZES = {
  'grammar-tenses-1': {
    id: 'grammar-tenses-1',
    title: 'English Tenses - Basic',
    category: 'grammar',
    difficulty: 'beginner',
    duration: 10,
    totalQuestions: 5,
    description: 'Test your knowledge of present, past, and future tenses',
    image: 'https://images.unsplash.com/photo-1456735190541-6f3ee9c367e5?w=200&h=150&fit=crop',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'Which sentence is in the present perfect tense?',
        options: [
          { id: 'a', text: 'I am writing a letter' },
          { id: 'b', text: 'I have written a letter', correct: true },
          { id: 'c', text: 'I was writing a letter' },
          { id: 'd', text: 'I will write a letter' }
        ],
        explanation: 'Present perfect tense is formed with "have/has + past participle" (e.g., have written). It describes an action that started in the past and continues to affect the present.',
        difficulty: 'beginner'
      },
      {
        id: 2,
        type: 'truefalse',
        question: 'The simple past tense always uses the "-ed" ending in English.',
        answer: false,
        explanation: 'While regular verbs add "-ed" (jumped, walked), irregular verbs have unique forms (went, saw, ate, etc.). Not all past tense verbs end in "-ed".'
      },
      {
        id: 3,
        type: 'fillblank',
        question: 'He ___ to the store yesterday.',
        blanks: ['went'],
        options: ['go', 'went', 'goes', 'going'],
        explanation: 'The past tense "went" is correct because the adverb "yesterday" indicates past time.',
        difficulty: 'beginner'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which sentence uses the future continuous tense?',
        options: [
          { id: 'a', text: 'She will complete the project' },
          { id: 'b', text: 'She will be completing the project', correct: true },
          { id: 'c', text: 'She has completed the project' },
          { id: 'd', text: 'She completes the project' }
        ],
        explanation: 'Future continuous is formed with "will + be + present participle" (will be completing). It shows an ongoing action at a specific time in the future.',
        difficulty: 'beginner'
      },
      {
        id: 5,
        type: 'match',
        question: 'Match the sentence to its tense:',
        pairs: [
          { id: 1, left: 'I am studying', right: 'Present Continuous', correct: true },
          { id: 2, left: 'They had left', right: 'Past Perfect', correct: true },
          { id: 3, left: 'We will go', right: 'Simple Future', correct: true },
          { id: 4, left: 'You have been waiting', right: 'Present Perfect Continuous', correct: true }
        ],
        explanation: 'Each sentence demonstrates a different tense structure. Present continuous = am/is/are + verb-ing; Past perfect = had + past participle; Simple future = will + base verb; Present perfect continuous = have/has + been + verb-ing.',
        difficulty: 'beginner'
      }
    ]
  },

  'vocabulary-synonyms-1': {
    id: 'vocabulary-synonyms-1',
    title: 'Synonyms & Word Meanings',
    category: 'vocabulary',
    difficulty: 'intermediate',
    duration: 15,
    totalQuestions: 5,
    description: 'Find the correct synonym for each word',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=150&fit=crop',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is a synonym for "eloquent"?',
        options: [
          { id: 'a', text: 'Silent' },
          { id: 'b', text: 'Articulate', correct: true },
          { id: 'c', text: 'Quiet' },
          { id: 'd', text: 'Nervous' }
        ],
        explanation: 'Eloquent means fluent and persuasive in speaking or writing. Articulate means expressing ideas clearly and effectively, making it the best synonym.',
        difficulty: 'intermediate'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'Which word means the same as "benevolent"?',
        options: [
          { id: 'a', text: 'Selfish' },
          { id: 'b', text: 'Charitable', correct: true },
          { id: 'c', text: 'Cruel' },
          { id: 'd', text: 'Jealous' }
        ],
        explanation: 'Benevolent means kind, generous, and charitable. It refers to someone who wishes to do good for others.',
        difficulty: 'intermediate'
      },
      {
        id: 3,
        type: 'fillblank',
        question: 'The word "ubiquitous" means ___ everywhere.',
        blanks: ['present', 'found', 'existing'],
        options: ['present', 'rare', 'missing', 'future'],
        explanation: 'Ubiquitous means present everywhere or constantly encountered. Present, found, or existing would all work in this context.',
        difficulty: 'intermediate'
      },
      {
        id: 4,
        type: 'truefalse',
        question: '"Pragmatic" means dealing with things in a realistic, practical way.',
        answer: true,
        explanation: 'Yes, pragmatic means concerned with practical consequences rather than theory. Someone pragmatic focuses on what works in practice.'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'What is an antonym of "ephemeral"?',
        options: [
          { id: 'a', text: 'Fleeting' },
          { id: 'b', text: 'Brief' },
          { id: 'c', text: 'Permanent', correct: true },
          { id: 'd', text: 'Quick' }
        ],
        explanation: 'Ephemeral means lasting for a very short time. Its opposite is permanent or lasting, as it continues for a long time.',
        difficulty: 'intermediate'
      }
    ]
  },

  'literature-analysis-1': {
    id: 'literature-analysis-1',
    title: 'Literary Analysis Basics',
    category: 'literature',
    difficulty: 'intermediate',
    duration: 20,
    totalQuestions: 4,
    description: 'Test your understanding of literary concepts and analysis',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=150&fit=crop',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'In "The Lady or the Tiger," what does the princess choose?',
        options: [
          { id: 'a', text: 'The lady' },
          { id: 'b', text: 'The tiger' },
          { id: 'c', text: 'The story never reveals her choice', correct: true },
          { id: 'd', text: 'She chooses the door to escape' }
        ],
        explanation: 'Frank R. Stockton intentionally leaves the ending ambiguous. This ambiguity is the story\'s main literary device, forcing readers to draw their own conclusions.',
        difficulty: 'intermediate'
      },
      {
        id: 2,
        type: 'truefalse',
        question: 'Hamlet is a tragic play by William Shakespeare written in the 17th century.',
        answer: true,
        explanation: 'Yes, Hamlet was written by Shakespeare between 1600-1601, which is the early 17th century. It is indeed a tragedy about a Danish prince seeking revenge.'
      },
      {
        id: 3,
        type: 'fillblank',
        question: 'A ___ is a figure of speech that compares two unlike things using "like" or "as".',
        blanks: ['simile'],
        options: ['metaphor', 'simile', 'alliteration', 'irony'],
        explanation: 'A simile explicitly compares two things using "like" or "as" (e.g., "brave as a lion"). A metaphor compares without using these words.',
        difficulty: 'intermediate'
      },
      {
        id: 4,
        type: 'match',
        question: 'Match the literary work to its author:',
        pairs: [
          { id: 1, left: 'Hamlet', right: 'William Shakespeare', correct: true },
          { id: 2, left: 'Great Expectations', right: 'Charles Dickens', correct: true },
          { id: 3, left: 'The Lady or the Tiger', right: 'Frank R. Stockton', correct: true },
          { id: 4, left: 'Jane Eyre', right: 'Charlotte Brontë', correct: true }
        ],
        explanation: 'These are classic literary works. Shakespeare wrote Hamlet, Dickens wrote Great Expectations, Stockton wrote The Lady or the Tiger, and Charlotte Brontë wrote Jane Eyre.',
        difficulty: 'intermediate'
      }
    ]
  },

  'poetry-devices-1': {
    id: 'poetry-devices-1',
    title: 'Poetic Devices & Techniques',
    category: 'poetry',
    difficulty: 'advanced',
    duration: 15,
    totalQuestions: 4,
    description: 'Identify and understand poetic literary devices',
    image: 'https://images.unsplash.com/photo-1470011458597-933ceb263c3f?w=200&h=150&fit=crop',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: '"The world is a stage" is an example of which literary device?',
        options: [
          { id: 'a', text: 'Simile' },
          { id: 'b', text: 'Metaphor', correct: true },
          { id: 'c', text: 'Personification' },
          { id: 'd', text: 'Oxymoron' }
        ],
        explanation: 'This is a metaphor because it directly compares the world to a stage without using "like" or "as". It\'s a direct comparison that suggests the world functions like a theatrical stage.',
        difficulty: 'advanced'
      },
      {
        id: 2,
        type: 'truefalse',
        question: 'Alliteration is the repetition of the same beginning sound in words that are close together.',
        answer: true,
        explanation: 'Yes, alliteration is the repetition of initial consonant sounds in neighboring words (e.g., "Peter Piper picked a peck of pickled peppers").'
      },
      {
        id: 3,
        type: 'fillblank',
        question: 'A ___ is a pair of rhyming lines at the end of a stanza or poem.',
        blanks: ['couplet'],
        options: ['stanza', 'couplet', 'verse', 'chorus'],
        explanation: 'A couplet consists of two consecutive lines of poetry that rhyme. It\'s a common device in sonnets and other poetic forms.',
        difficulty: 'advanced'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which line contains personification?',
        options: [
          { id: 'a', text: 'The wind whispered through the trees', correct: true },
          { id: 'b', text: 'The night was dark and cold' },
          { id: 'c', text: 'She ran like a cheetah' },
          { id: 'd', text: 'The ocean was vast' }
        ],
        explanation: 'Personification gives human qualities to non-human things. Here, the wind "whispered" is personified because only humans can whisper intentionally.',
        difficulty: 'advanced'
      }
    ]
  },

  'pronunciation-vowels-1': {
    id: 'pronunciation-vowels-1',
    title: 'English Vowel Sounds',
    category: 'pronunciation',
    difficulty: 'beginner',
    duration: 12,
    totalQuestions: 4,
    description: 'Master the different vowel sounds in English',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=150&fit=crop',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'Which word contains the long "a" sound (/eɪ/)?',
        options: [
          { id: 'a', text: 'Cat' },
          { id: 'b', text: 'Gate', correct: true },
          { id: 'c', text: 'Hat' },
          { id: 'd', text: 'Bat' }
        ],
        explanation: 'The word "gate" contains the long "a" sound (/eɪ/), as in "hay" or "way". Words like "cat" and "hat" contain the short "a" sound (/æ/).',
        difficulty: 'beginner'
      },
      {
        id: 2,
        type: 'truefalse',
        question: 'The word "thought" and "taught" have the same vowel sound.',
        answer: true,
        explanation: 'Both "thought" and "taught" are pronounced with the same vowel sound: /ɔː/ (the "aw" sound as in "law").'
      },
      {
        id: 3,
        type: 'fillblank',
        question: 'The word "friend" is pronounced with the ___ vowel sound.',
        blanks: ['short e', 'ɛ', 'short E'],
        options: ['long e', 'short e', 'schwa', 'short i'],
        explanation: 'The word "friend" contains the short "e" sound (/ɛ/), not the long "e" sound. It rhymes with "end", not "bee".'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which pair of words are homophones (sound the same)?',
        options: [
          { id: 'a', text: 'Flower and flour', correct: true },
          { id: 'b', text: 'Thought and through' },
          { id: 'c', text: 'Read and red' },
          { id: 'd', text: 'Would and wood' }
        ],
        explanation: '"Flower" (the plant) and "flour" (powder for baking) are homophones - they sound identical. "Red" and "read" (present tense) are also homophones.',
        difficulty: 'beginner'
      }
    ]
  }
};

// ============================================
// LEADERBOARD DATA
// ============================================

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Sarah Ahmed', score: 950, category: 'grammar', completions: 12, streak: 5 },
  { rank: 2, name: 'Ahmed Hassan', score: 920, category: 'vocabulary', completions: 10, streak: 4 },
  { rank: 3, name: 'Fatima Khan', score: 900, category: 'literature', completions: 9, streak: 3 },
  { rank: 4, name: 'Ali Raza', score: 880, category: 'poetry', completions: 8, streak: 2 },
  { rank: 5, name: 'Zara Mohammad', score: 850, category: 'grammar', completions: 7, streak: 1 },
  { rank: 6, name: 'Hassan Ali', score: 820, category: 'pronunciation', completions: 6, streak: 2 },
  { rank: 7, name: 'Aisha Malik', score: 800, category: 'vocabulary', completions: 5, streak: 1 },
  { rank: 8, name: 'Omar Khan', score: 780, category: 'literature', completions: 4, streak: 0 }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getQuizzesByCategory(categoryId) {
  return Object.values(QUIZZES).filter(quiz => quiz.category === categoryId);
}

function getQuizById(quizId) {
  return QUIZZES[quizId] || null;
}

function getAllCategories() {
  return Object.values(QUIZ_CATEGORIES);
}

function getDifficultyColor(difficulty) {
  const colors = {
    beginner: '#4ECDC4',
    intermediate: '#FFD93D',
    advanced: '#FF6B6B'
  };
  return colors[difficulty] || '#95E1D3';
}

function getDifficultyLabel(difficulty) {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function calculateQuizScore(quiz, answers) {
  let correctCount = 0;
  
  quiz.questions.forEach(question => {
    const userAnswer = answers[question.id];
    if (!userAnswer) return;
    
    if (question.type === 'mcq') {
      const selectedOption = question.options.find(opt => opt.id === userAnswer);
      if (selectedOption && selectedOption.correct) correctCount++;
    } else if (question.type === 'truefalse') {
      if (userAnswer === question.answer) correctCount++;
    } else if (question.type === 'fillblank') {
      if (question.blanks.includes(userAnswer.toLowerCase().trim())) {
        correctCount++;
      }
    } else if (question.type === 'match') {
      const pairs = userAnswer.split('|');
      let pairsCorrect = 0;
      pairs.forEach(pair => {
        const [leftIdx, rightIdx] = pair.split('-').map(Number);
        const correctPair = question.pairs.find(p => 
          p.left === question.pairs[leftIdx]?.left && 
          p.right === question.pairs[rightIdx]?.right
        );
        if (correctPair && correctPair.correct) pairsCorrect++;
      });
      if (pairsCorrect === question.pairs.length) correctCount++;
    }
  });
  
  return Math.round((correctCount / quiz.questions.length) * 100);
}
