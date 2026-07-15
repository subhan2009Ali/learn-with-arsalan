/* =====================================================================
   VOCABULARY DATA — dynamic word content for the Vocabulary Hub.
   ===================================================================== */

const VOCABULARY_HUB = {
  hero: {
    eyebrow: 'Vocabulary Hub',
    title: 'Master English words, idioms, and phrases like a native speaker.',
    text: 'Learn pronunciation, definitions, examples, synonyms and antonyms. Build your vocabulary daily with interactive quizzes.',
    ctaLabel: 'Start Learning',
  },
  wordOfTheDay: 'eloquent',
  dailyWords: ['eloquent','benevolent','ubiquitous','pragmatic','ephemeral'],
};

const VOCABULARY_WORDS = {
  'eloquent': {
    slug: 'eloquent',
    word: 'Eloquent',
    pronunciation: '/ˈɛl.ə.kwənt/',
    definition: 'Fluent or persuasive in speaking or writing.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'The speaker gave an eloquent speech that moved the audience.',
      'Her eloquent arguments convinced the jury.',
      'An eloquent writer can express complex ideas simply.',
    ],
    synonyms: ['Articulate', 'Fluent', 'Expressive', 'Persuasive'],
    antonyms: ['Inarticulate', 'Mute', 'Inarticulate'],
    relatedWords: ['eloquently', 'eloquence'],
    mnemonicTip: 'Remember: "E-LOQUENT" sounds like "e-LOOK-went" – speak so well people look at you.',
  },
  'benevolent': {
    slug: 'benevolent',
    word: 'Benevolent',
    pronunciation: '/bəˈnɛv.ə.lənt/',
    definition: 'Kind, generous, and caring about the wellbeing of others.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'The benevolent king helped the poor.',
      'A benevolent gesture can change someone\'s life.',
      'The organization is benevolent in its mission.',
    ],
    synonyms: ['Kind', 'Generous', 'Compassionate', 'Altruistic'],
    antonyms: ['Malevolent', 'Cruel', 'Selfish'],
    relatedWords: ['benevolence', 'benevolently'],
    mnemonicTip: 'BEN + EVOLENT: "Bless the evolution" – wishes good for humanity\'s growth.',
  },
  'ubiquitous': {
    slug: 'ubiquitous',
    word: 'Ubiquitous',
    pronunciation: '/juːˈbɪk.wɪ.təs/',
    definition: 'Present, appearing, or found everywhere; constantly encountered.',
    difficulty: 'Advanced',
    category: 'Adjectives',
    examples: [
      'Smartphones are ubiquitous in modern society.',
      'The scent of coffee was ubiquitous in the café.',
      'Social media has become ubiquitous in daily life.',
    ],
    synonyms: ['Omnipresent', 'Pervasive', 'Everywhere', 'Universal'],
    antonyms: ['Rare', 'Uncommon', 'Scarce'],
    relatedWords: ['ubiquitously', 'ubiquity'],
    mnemonicTip: 'U-BIQUITOUS: "You\'re big it\'s out there" – something so present it\'s huge.',
  },
  'pragmatic': {
    slug: 'pragmatic',
    word: 'Pragmatic',
    pronunciation: '/præɡˈmæt.ɪk/',
    definition: 'Dealing with things in a realistic, practical way based on actual circumstances.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'We need a pragmatic approach to solve this problem.',
      'She took a pragmatic decision despite emotional pressure.',
      'The pragmatic solution was to reduce costs.',
    ],
    synonyms: ['Practical', 'Realistic', 'Sensible', 'Businesslike'],
    antonyms: ['Idealistic', 'Theoretical', 'Impractical'],
    relatedWords: ['pragmatically', 'pragmatism'],
    mnemonicTip: 'PRAG-MATIC: "Practice makes automatic" – real practice, real results.',
  },
  'ephemeral': {
    slug: 'ephemeral',
    word: 'Ephemeral',
    pronunciation: '/ɪˈfɛm.ər.əl/',
    definition: 'Lasting for a very short time; fleeting and temporary.',
    difficulty: 'Advanced',
    category: 'Adjectives',
    examples: [
      'Cherry blossoms have an ephemeral beauty.',
      'The beauty of childhood is ephemeral.',
      'His fame was ephemeral, lasting only a season.',
    ],
    synonyms: ['Temporary', 'Fleeting', 'Brief', 'Transient'],
    antonyms: ['Permanent', 'Lasting', 'Eternal'],
    relatedWords: ['ephemerally'],
    mnemonicTip: 'E-FEMORAL: Like "female" – flowers bloom, they fade, beautiful but brief.',
  },
  'resilient': {
    slug: 'resilient',
    word: 'Resilient',
    pronunciation: '/rɪˈzɪl.jənt/',
    definition: 'Able to recover quickly from difficulties; tough and adaptable.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'The community proved resilient after the disaster.',
      'Resilient people bounce back from failure.',
      'Plants that are resilient thrive in harsh conditions.',
    ],
    synonyms: ['Strong', 'Tough', 'Flexible', 'Adaptable'],
    antonyms: ['Fragile', 'Weak', 'Rigid'],
    relatedWords: ['resilience', 'resiliently'],
    mnemonicTip: 'RE-SILI-ENT: "Again bounce back" – rebound with energy.',
  },
  'meticulous': {
    slug: 'meticulous',
    word: 'Meticulous',
    pronunciation: '/məˈtɪk.jə.ləs/',
    definition: 'Showing great attention to detail; very careful and precise.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'The surgeon was meticulous in her work.',
      'Meticulous planning ensures success.',
      'His meticulous handwriting was beautiful.',
    ],
    synonyms: ['Careful', 'Precise', 'Thorough', 'Detailed'],
    antonyms: ['Careless', 'Sloppy', 'Negligent'],
    relatedWords: ['meticulously', 'meticulousness'],
    mnemonicTip: 'MET-IC-U-LOUS: "Meet the ticks" – every detail checked off.',
  },
  'ambiguous': {
    slug: 'ambiguous',
    word: 'Ambiguous',
    pronunciation: '/æmˈbɪɡ.juː.əs/',
    definition: 'Open to more than one interpretation; unclear or vague.',
    difficulty: 'Intermediate',
    category: 'Adjectives',
    examples: [
      'The statement was ambiguous and caused confusion.',
      'Her smile was ambiguous – it could mean anything.',
      'The question\'s ambiguous wording led to misunderstanding.',
    ],
    synonyms: ['Unclear', 'Vague', 'Uncertain', 'Equivocal'],
    antonyms: ['Clear', 'Obvious', 'Definite', 'Unambiguous'],
    relatedWords: ['ambiguously', 'ambiguity'],
    mnemonicTip: 'AM-BIGUOUS: "Am big you guess?" – so unclear, you have to guess.',
  },
  'gregarious': {
    slug: 'gregarious',
    word: 'Gregarious',
    pronunciation: '/ɡrɪˈɡɛr.i.əs/',
    definition: 'Fond of being in company with others; living together in groups.',
    difficulty: 'Advanced',
    category: 'Adjectives',
    examples: [
      'Humans are gregarious creatures.',
      'She has a gregarious nature and loves parties.',
      'Sheep are gregarious animals that move in herds.',
    ],
    synonyms: ['Sociable', 'Friendly', 'Outgoing', 'Social'],
    antonyms: ['Solitary', 'Antisocial', 'Withdrawn'],
    relatedWords: ['gregariously', 'gregariousness'],
    mnemonicTip: 'GREGA-RIOUS: "Great group riot-ous" – loves being in groups.',
  },
};

const VOCABULARY_IDIOMS = {
  'break-the-ice': {
    slug: 'break-the-ice',
    idiom: 'Break the Ice',
    meaning: 'To initiate conversation or create a friendly atmosphere in a tense situation.',
    example: 'I told a joke to break the ice at the party.',
    category: 'Social Interactions',
  },
  'piece-of-cake': {
    slug: 'piece-of-cake',
    idiom: 'Piece of Cake',
    meaning: 'Something that is very easy to do.',
    example: 'The exam was a piece of cake for her.',
    category: 'Difficulty',
  },
  'raining-cats-and-dogs': {
    slug: 'raining-cats-and-dogs',
    idiom: 'Raining Cats and Dogs',
    meaning: 'Raining very heavily.',
    example: 'It\'s raining cats and dogs outside!',
    category: 'Weather',
  },
  'hit-the-hay': {
    slug: 'hit-the-hay',
    idiom: 'Hit the Hay',
    meaning: 'To go to bed.',
    example: 'I\'m tired, I think I\'ll hit the hay.',
    category: 'Daily Activities',
  },
};

function getWordBySlug(slug) {
  return VOCABULARY_WORDS[slug] || null;
}

function getAllWords() {
  return Object.values(VOCABULARY_WORDS);
}

function getAllIdioms() {
  return Object.values(VOCABULARY_IDIOMS);
}

function getWordCategories() {
  const cats = new Set();
  getAllWords().forEach(w => cats.add(w.category));
  return Array.from(cats).sort();
}

function getIdiomCategories() {
  const cats = new Set();
  getAllIdioms().forEach(i => cats.add(i.category));
  return Array.from(cats).sort();
}

function getDifficultyLevels() {
  return ['Beginner', 'Intermediate', 'Advanced'];
}

function getWordOfTheDay() {
  return getWordBySlug(VOCABULARY_HUB.wordOfTheDay);
}

function getDailyWords() {
  return VOCABULARY_HUB.dailyWords.map(slug => getWordBySlug(slug)).filter(Boolean);
}
