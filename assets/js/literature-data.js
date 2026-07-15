/* =====================================================================
   LITERATURE DATA — structured works for the Literature Hub and detail pages.
   ===================================================================== */

const LITERATURE_HUB = {
  hero: {
    eyebrow: 'Literature Hub',
    title: 'Understand stories, plays, novels and criticism with clear academic notes.',
    text: 'A modern literature library for exam-ready summaries, character studies, themes, plots, quotes and critical questions.',
    ctaLabel: 'Explore Stories & Drama',
  },
  featured: ['hamlet','great-expectations','lady-or-the-tiger'],
  categories: ['Story','Drama','Novel','Criticism','Themes','Characters'],
  timeline: [
    { year: '1603', label: 'Drama peaks with Shakespeare' },
    { year: '1800', label: 'Novel realism grows' },
    { year: '1861', label: 'Dickens examines class and ambition' },
    { year: '1882', label: 'Psychological short fiction appears' },
  ],
};

const LITERATURE_WORKS = {
  'lady-or-the-tiger': {
    slug: 'lady-or-the-tiger',
    title: 'The Lady, or the Tiger?',
    author: 'Frank R. Stockton',
    type: 'Story',
    year: '1882',
    categories: ['Story','Choice','Justice'],
    themes: ['Choice','Power','Jealousy'],
    plot: 'A princess forces a jealous lover to choose between a mysterious lady and a savage tiger in a public arena.',
    summary: 'A short story about a young man whose fate is decided by an unpredictable choice, showing how passion and jealousy can shape a life.',
    characters: [
      { name: 'The Princess', role: 'A jealous royal who secretly loves the accused youth.' },
      { name: 'The Youth', role: 'The princess’s lover, condemned to an uncertain fate.' },
      { name: 'The King', role: 'A semi-barbaric ruler who prefers dramatic judgment.' },
    ],
    quotes: [
      'And then there came to her the thought of the lady, the picture of beauty and grace.',
      'Suppose, for instance, that she loved him, and that she also loved the lady.',
    ],
    analysis: [
      { heading: 'Ambiguous ending', body: 'The unresolved conclusion invites the reader to decide the princess’s true motive and moral responsibility.' },
      { heading: 'Suspense and choice', body: 'Stockton builds tension through the public arena and the princess’s internal conflict.' },
    ],
    mcqs: [
      { question: 'What is the main theme of the story?', options: ['Adventure', 'Power', 'Choice', 'Wealth'], answer: 2, explanation: 'The story focuses on the consequences of a single, powerful choice.' },
      { question: 'Why is the ending ambiguous?', options: ['The doors were identical', 'The narrator keeps it secret', 'A third door opens', 'The tiger escapes'], answer: 1, explanation: 'The narrator does not reveal which door the princess chose.' },
    ],
    importantQuestions: [
      'Why does the princess struggle with her decision?',
      'How does the story make readers think about justice and revenge?',
    ],
    notes: [
      'The story blends romantic drama with a moral puzzle.',
      'The arena reflects society’s appetite for spectacle and punishment.',
    ],
    related: ['hamlet','great-expectations'],
  },
  'hamlet': {
    slug: 'hamlet',
    title: 'Hamlet',
    author: 'William Shakespeare',
    type: 'Drama',
    year: '1603',
    categories: ['Drama','Tragedy','Revenge'],
    themes: ['Madness','Action versus inaction','Death'],
    plot: 'Prince Hamlet seeks revenge for his father’s murder while battling doubt, grief, and a corrupt royal court.',
    summary: 'A tragedy in which Hamlet’s hesitation and moral questioning lead to the destruction of himself and those around him.',
    characters: [
      { name: 'Hamlet', role: 'The prince of Denmark, reflective and indecisive.' },
      { name: 'Claudius', role: 'Hamlet’s uncle and king, guilty of murder.', },
      { name: 'Ophelia', role: 'Hamlet’s love interest, driven to madness by family pressure.' },
    ],
    quotes: [
      'To be, or not to be: that is the question.',
      'There is nothing either good or bad, but thinking makes it so.',
    ],
    analysis: [
      { heading: 'Psychological depth', body: 'Hamlet shows inner conflict between reason and emotion, making him one of literature’s most complex protagonists.' },
      { heading: 'Symbolic imagery', body: 'The ghost, skull, and play-within-a-play add layers of meaning about truth, death, and performance.' },
    ],
    mcqs: [
      { question: 'What does Hamlet debate in “To be, or not to be”?', options: ['Love', 'Life and death', 'Revenge', 'Power'], answer: 1, explanation: 'He questions whether it is better to live and suffer or die and end the pain.' },
      { question: 'Why does Hamlet delay the revenge?', options: ['He is weak', 'He doubts the ghost', 'He forgets', 'He is busy'], answer: 1, explanation: 'Hamlet doubts whether the ghost is truthful and whether revenge is morally justified.' },
    ],
    importantQuestions: [
      'Explain how Hamlet’s relationship with Ophelia changes the play.',
      'What does the ghost represent in the drama?',
    ],
    notes: [
      'The mix of verse and prose helps show class differences and emotional states.',
      'Hamlet’s speech patterns change as he pretends to be mad, which reveals his strategy.',
    ],
    related: ['lady-or-the-tiger','great-expectations'],
  },
  'great-expectations': {
    slug: 'great-expectations',
    title: 'Great Expectations',
    author: 'Charles Dickens',
    type: 'Novel',
    year: '1861',
    categories: ['Novel','Class','Ambition'],
    themes: ['Ambition','Identity','Social class'],
    plot: 'Pip receives a mysterious fortune and journeys from a poor orphan boy to a gentleman, learning painful lessons about wealth, love and loyalty.',
    summary: 'A coming-of-age novel that examines how social ambition changes Pip and teaches him the value of true character.',
    characters: [
      { name: 'Pip', role: 'The protagonist whose hopes transform over time.' },
      { name: 'Estella', role: 'Miss Havisham’s adopted daughter, raised to break hearts.' },
      { name: 'Miss Havisham', role: 'A wealthy woman stuck in her own heartbreak and revenge.' },
    ],
    quotes: [
      'I loved her against reason, against promise, against peace, against hope, against happiness, against all discouragement that could be.',
      'We need never be ashamed of our tears.',
    ],
    analysis: [
      { heading: 'Social criticism', body: 'Dickens critiques the class system and the false promises of wealth.' },
      { heading: 'Character growth', body: 'Pip learns humility as he discovers that true gentility comes from the heart, not money.' },
    ],
    mcqs: [
      { question: 'What is Pip’s main struggle?', options: ['Winning a race', 'Becoming a gentleman', 'Fighting a duel', 'Solving a mystery'], answer: 1, explanation: 'Pip struggles with social ambition and his sense of self.' },
      { question: 'What does Miss Havisham represent?', options: ['Forgiveness', 'Revenge', 'Kindness', 'Joy'], answer: 1, explanation: 'She represents someone damaged by love and fixated on revenge.' },
    ],
    importantQuestions: [
      'How does Pip change from childhood to adulthood?',
      'What does the novel say about the nature of true wealth?',
    ],
    notes: [
      'The story is narrated by Pip looking back on his own life.',
      'Miss Havisham’s decayed wedding feast symbolizes her emotional ruin.',
    ],
    related: ['hamlet','lady-or-the-tiger'],
  },
  'critical-perspective': {
    slug: 'critical-perspective',
    title: 'Critical Perspectives on Drama and Novel',
    author: 'Academic Review',
    type: 'Criticism',
    year: '2026',
    categories: ['Criticism','Analysis','Literary Theory'],
    themes: ['Interpretation','Character study','Social meaning'],
    plot: 'A modern critical essay that compares drama and novel forms, focusing on character development, social context, and thematic depth.',
    summary: 'An academic discussion that helps students understand how critics read literature and how themes are shaped by form and context.',
    characters: [
      { name: 'The Critic', role: 'An academic voice that explains literary structure and meaning.' },
    ],
    quotes: [
      'A critic shows readers which questions to ask, not which answers to accept.',
    ],
    analysis: [
      { heading: 'Comparative criticism', body: 'Criticism helps compare story, drama and novel by focusing on how each form builds meaning.' },
      { heading: 'Academic reading', body: 'Students learn to look beyond plot to themes, symbols and author intent.' },
    ],
    mcqs: [
      { question: 'What does literary criticism encourage?', options: ['Blind acceptance', 'Close reading', 'Ignoring themes', 'Fast reading'], answer: 1, explanation: 'Criticism encourages careful reading and thoughtful interpretation.' },
      { question: 'What is the main benefit of comparing different forms?', options: ['More boring', 'Clearer meaning', 'Less effort', 'More characters'], answer: 1, explanation: 'Comparing forms reveals how writers use structure to create meaning.' },
    ],
    importantQuestions: [
      'Why is it useful to compare a novel with a drama?',
      'How does form shape the way characters are presented?',
    ],
    notes: [
      'Criticism trains students to ask “why” not just “what happened”.',
      'Themes can be stronger when seen across multiple works.',
    ],
    related: ['hamlet','great-expectations'],
  },
};

function getWorkBySlug(slug) {
  return LITERATURE_WORKS[slug] || null;
}

function getAllWorks() {
  return Object.values(LITERATURE_WORKS);
}

function getUniqueAuthors() {
  const authors = {};
  getAllWorks().forEach(work => {
    if(!authors[work.author]){ authors[work.author] = { author: work.author, count: 0}; }
    authors[work.author].count += 1;
  });
  return Object.values(authors);
}

function getUniqueCategories() {
  const cats = new Set();
  getAllWorks().forEach(work => (work.categories || []).forEach(cat => cats.add(cat)));
  return Array.from(cats);
}

function getUniqueThemes() {
  const themes = new Set();
  getAllWorks().forEach(work => (work.themes || []).forEach(theme => themes.add(theme)));
  return Array.from(themes);
}
