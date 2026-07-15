/* =====================================================================
   POETRY DATA — structured poems, categories, themes and hub metadata.
   Loaded by poetry.html, poem.html and shared search to power the Poetry Hub.
   ===================================================================== */

const POETRY_HUB = {
  hero: {
    eyebrow: 'Poetry Hub',
    title: 'Read poems the way exams expect you to explain them.',
    text: 'A modern collection of poems with biography, theme, stanza notes, MCQs and practice questions for intermediate readers.',
    ctaLabel: 'Browse Featured Poems',
  },
  featured: ['road-not-taken','daffodils','ozymandias'],
  stats: [
    { label: 'Poems analysed', value: '18+' },
    { label: 'MCQs ready', value: '72' },
    { label: 'Themes covered', value: '12' },
  ],
};

const POEMS = {
  'road-not-taken': {
    slug: 'road-not-taken',
    title: 'The Road Not Taken',
    poet: 'Robert Frost',
    biography: 'Robert Frost was an American poet known for his depictions of rural life and use of everyday speech in poems that explore complex philosophical themes.',
    year: '1916',
    categories: ['Choice','Nature','Reflection'],
    theme: 'Choices shape life, and the paths we take define our future.',
    literaryDevices: ['Metaphor','Imagery','Personification','Symbolism'],
    text: [
      'Two roads diverged in a yellow wood,',
      'And sorry I could not travel both',
      'And be one traveler, long I stood',
      'And looked down one as far as I could',
      'To where it bent in the undergrowth;',
      '',
      'Then took the other, as just as fair,',
      'And having perhaps the better claim,',
      'Because it was grassy and wanted wear;',
      'Though as for that the passing there',
      'Had worn them really about the same,',
      '',
      'And both that morning equally lay',
      'In leaves no step had trodden black.',
      'Oh, I kept the first for another day!',
      'Yet knowing how way leads on to way,',
      'I doubted if I should ever come back.',
      '',
      'I shall be telling this with a sigh',
      'Somewhere ages and ages hence:',
      'Two roads diverged in a wood, and I—',
      'I took the one less traveled by,',
      'And that has made all the difference.',
    ],
    annotations: [
      { line: 'Two roads diverged in a yellow wood,', note: 'The speaker uses a forked path as a metaphor for a life decision.' },
      { line: 'Because it was grassy and wanted wear;', note: 'The speaker imagines this path is less chosen, hinting at individuality.' },
      { line: 'Yet knowing how way leads on to way,', note: 'Past choices limit future options, making the decision final.' },
    ],
    analysis: [
      { heading: 'Voice', body: 'First-person narration creates intimacy, making the choice feel personal and reflective.' },
      { heading: 'Structure', body: 'The poem has four stanzas of five lines each, creating a calm, measured pace.' },
      { heading: 'Tone', body: 'A thoughtful, slightly wistful tone shows how the speaker later wonders about the choice.' },
    ],
    summary: 'A traveler must choose between two paths. He chooses the less used road and later reflects that this choice made all the difference in his life.',
    mcqs: [
      { question: 'What do the two roads primarily represent?', options: ['Two different seasons', 'Two life decisions', 'Two people', 'Two dreams'], answer: 1, explanation: 'The roads are a metaphor for choices in life.' },
      { question: 'Why does the speaker doubt he will return?', options: ['The weather is bad', 'The roads are too far apart', 'One choice leads to another', 'He is in a hurry'], answer: 2, explanation: 'The speaker understands that one decision leads to another and he may not be able to go back.' },
    ],
    practiceQuestions: [
      'Explain how the poem uses nature imagery to describe a decision.',
      'Do you think the speaker regrets his choice? Support your answer with lines from the poem.',
    ],
    related: ['daffodils','ozymandias'],
  },
  'daffodils': {
    slug: 'daffodils',
    title: 'Daffodils',
    poet: 'William Wordsworth',
    biography: 'William Wordsworth was an English Romantic poet who celebrated nature, memory and the everyday feelings of common people.',
    year: '1807',
    categories: ['Nature','Memory','Joy'],
    theme: 'Nature comforts and inspires the mind long after the moment has passed.',
    literaryDevices: ['Imagery','Personification','Simile','Alliteration'],
    text: [
      'I wandered lonely as a cloud',
      'That floats on high o’er vales and hills,',
      'When all at once I saw a crowd,',
      'A host, of golden daffodils;',
      'Beside the lake, beneath the trees,',
      'Fluttering and dancing in the breeze.',
      '',
      'Continuous as the stars that shine',
      'And twinkle on the Milky Way,',
      'They stretched in never-ending line',
      'Along the margin of a bay:',
      'Ten thousand saw I at a glance,',
      'Tossing their heads in sprightly dance.',
      '',
      'The waves beside them danced; but they',
      'Out-did the sparkling waves in glee:',
      'A poet could not but be gay,',
      'In such a jocund company:',
      'I gazed—and gazed—but little thought',
      'What wealth the show to me had brought:',
      '',
      'For oft, when on my couch I lie',
      'In vacant or in pensive mood,',
      'They flash upon that inward eye',
      'Which is the bliss of solitude;',
      'And then my heart with pleasure fills,',
      'And dances with the daffodils.',
    ],
    annotations: [
      { line: 'I wandered lonely as a cloud', note: 'The poet begins with a simile to describe his solitary mood.' },
      { line: 'They flash upon that inward eye', note: 'The memory of the flowers brings unexpected joy later.' },
    ],
    analysis: [
      { heading: 'Memory', body: 'The poem shows how a brief scene in nature can become lasting mental comfort.' },
      { heading: 'Mood', body: 'The speaker moves from loneliness to joy, showing nature’s healing effect.' },
    ],
    summary: 'The poet remembers a field of golden daffodils and explains how the memory brings pleasure whenever he feels lonely.',
    mcqs: [
      { question: 'Why does the poet compare himself to a cloud?', options: ['He is happy', 'He is lost', 'He feels alone', 'He is floating'], answer: 2, explanation: 'The simile shows the poet feels isolated before seeing the daffodils.' },
      { question: 'What does the “inward eye” refer to?', options: ['The poet’s imagination', 'The lake nearby', 'The sun', 'A real eye'], answer: 0, explanation: 'The inward eye is the poet’s mind that remembers the joyful scene.' },
    ],
    practiceQuestions: [
      'Describe the effect of the daffodils on the poet’s mood.',
      'How does Wordsworth use personification in the poem?',
    ],
    related: ['road-not-taken','stopping-by-woods'],
  },
  'ozymandias': {
    slug: 'ozymandias',
    title: 'Ozymandias',
    poet: 'Percy Bysshe Shelley',
    biography: 'Percy Shelley was a major English Romantic poet known for political passion and vivid imagery in poems that question power and legacy.',
    year: '1818',
    categories: ['Power','Time','Decay'],
    theme: 'Even the greatest rulers are forgotten by time; pride cannot stop decay.',
    literaryDevices: ['Irony','Imagery','Alliteration','Metaphor'],
    text: [
      'I met a traveller from an antique land',
      'Who said: Two vast and trunkless legs of stone',
      'Stand in the desert. Near them, on the sand,',
      'Half sunk, a shattered visage lies, whose frown,',
      'And wrinkled lip, and sneer of cold command,',
      'Tell that its sculptor well those passions read',
      'Which yet survive, stamped on these lifeless things,',
      'The hand that mocked them, and the heart that fed:',
      '',
      'And on the pedestal, these words appear:',
      'My name is Ozymandias, King of Kings;',
      'Look on my Works, ye Mighty, and despair!',
      'Nothing beside remains. Round the decay',
      'Of that colossal Wreck, boundless and bare',
      'The lone and level sands stretch far away.',
    ],
    annotations: [
      { line: 'My name is Ozymandias, King of Kings;', note: 'The statue’s inscription reveals his arrogance and claim to power.' },
      { line: 'Nothing beside remains.', note: 'Irony appears as the ruler’s boast is contrasted with ruin.' },
    ],
    analysis: [
      { heading: 'Theme of decay', body: 'The poem shows how human pride is temporary and nature eventually reclaims all.' },
      { heading: 'Speaker', body: 'A traveller tells the story, adding distance that increases the poem’s solemn tone.' },
    ],
    summary: 'A traveller describes finding the ruined statue of a once-proud king, showing that power fades and time destroys all legacies.',
    mcqs: [
      { question: 'What is the main message of the poem?', options: ['Art lasts forever', 'Power remains forever', 'Pride is short-lived', 'Travel broadens the mind'], answer: 2, explanation: 'The poem warns that pride and power do not last.' },
      { question: 'How is irony used in the poem?', options: ['The king is alive', 'The statue is perfect', 'The inscription contrasts with the ruin', 'The traveller lies'], answer: 2, explanation: 'The arrogant inscription is ironic because the statue is now destroyed.' },
    ],
    practiceQuestions: [
      'Explain how the statue and the desert create a sense of emptiness.',
      'What does the shattered visage tell us about Ozymandias’s personality?',
    ],
    related: ['road-not-taken','daffodils'],
  },
  'stopping-by-woods': {
    slug: 'stopping-by-woods',
    title: 'Stopping by Woods on a Snowy Evening',
    poet: 'Robert Frost',
    biography: 'Robert Frost often wrote about quiet moments in rural settings, using simple language to explore deep personal feelings.',
    year: '1923',
    categories: ['Nature','Promise','Solitude'],
    theme: 'Life is full of short, peaceful moments, but duties and promises keep us moving forward.',
    literaryDevices: ['Repetition','Imagery','Rhyme','Symbolism'],
    text: [
      'Whose woods these are I think I know.',
      'His house is in the village though;',
      'He will not see me stopping here',
      'To watch his woods fill up with snow.',
      '',
      'My little horse must think it queer',
      'To stop without a farmhouse near',
      'Between the woods and frozen lake',
      'The darkest evening of the year.',
      '',
      'He gives his harness bells a shake',
      'To ask if there is some mistake.',
      'The only other sound’s the sweep',
      'Of easy wind and downy flake.',
      '',
      'The woods are lovely, dark and deep,',
      'But I have promises to keep,',
      'And miles to go before I sleep,',
      'And miles to go before I sleep.',
    ],
    annotations: [
      { line: 'The woods are lovely, dark and deep,', note: 'The speaker is drawn to the quiet beauty of nature.' },
      { line: 'And miles to go before I sleep,', note: 'The repeated line reminds us of duty and the journey ahead.' },
    ],
    analysis: [
      { heading: 'Mood', body: 'The poem balances calm wonder with a quiet sense of obligation.' },
      { heading: 'Symbolism', body: 'The woods symbolize rest or escape, while the road represents responsibility.' },
    ],
    summary: 'A traveler pauses in snowy woods, enjoying the beauty around him, but remembers he must continue his journey and keep his promises.',
    mcqs: [
      { question: 'What do the woods most likely represent?', options: ['Danger', 'Comfort', 'Failure', 'Noise'], answer: 1, explanation: 'The woods represent a peaceful escape from the world.' },
      { question: 'Why is the line repeated at the end?', options: ['To fill space', 'To show forgetting', 'To stress the promise', 'To rhyme'], answer: 2, explanation: 'The repetition emphasizes the speaker’s sense of duty.' },
    ],
    practiceQuestions: [
      'Why does the speaker feel he cannot stay in the woods?',
      'Explain how the poem uses sound to create its quiet atmosphere.',
    ],
    related: ['road-not-taken','daffodils'],
  },
  'if': {
    slug: 'if',
    title: 'If—',
    poet: 'Rudyard Kipling',
    biography: 'Rudyard Kipling was an English poet and author whose works often explored discipline, courage and moral strength.',
    year: '1910',
    categories: ['Character','Wisdom','Growth'],
    theme: 'True maturity means staying calm under pressure and keeping faith in yourself.',
    literaryDevices: ['Personification','Alliteration','Contrast','Antithesis'],
    text: [
      'If you can keep your head when all about you',
      'Are losing theirs and blaming it on you,',
      'If you can trust yourself when all men doubt you,',
      'But make allowance for their doubting too;',
      '',
      'If you can wait and not be tired by waiting,',
      'Or being lied about, don’t deal in lies,',
      'Or being hated, don’t give way to hating,',
      'And yet don’t look too good, nor talk too wise:',
      '',
      'If you can dream—and not make dreams your master;',
      'If you can think—and not make thoughts your aim;',
      'If you can meet with Triumph and Disaster',
      'And treat those two impostors just the same;',
      '',
      'If you can fill the unforgiving minute',
      'With sixty seconds’ worth of distance run,',
      'Yours is the Earth and everything that’s in it,',
      'And—which is more—you’ll be a Man, my son!',
    ],
    annotations: [
      { line: 'If you can keep your head when all about you', note: 'The poem begins with a lesson about remaining calm under pressure.' },
      { line: 'If you can meet with Triumph and Disaster / And treat those two impostors just the same;', note: 'The poet advises not to be overly proud of success or depressed by failure.' },
    ],
    analysis: [
      { heading: 'Advice tone', body: 'The poem reads like a father giving life lessons to his son.' },
      { heading: 'Moral values', body: 'The poem teaches qualities such as patience, honesty and self-belief.' },
    ],
    summary: 'The poet gives a set of moral rules for growing into a mature and trustworthy person.',
    mcqs: [
      { question: 'What does the poet call Triumph and Disaster?', options: ['Friends', 'Enemies', 'Impostors', 'Teachers'], answer: 2, explanation: 'He calls them impostors because they can mislead the heart.' },
      { question: 'What is the reward for following the poem’s advice?', options: ['Wealth', 'Fame', 'A peaceful mind', 'The world and self-respect'], answer: 3, explanation: 'The poem promises ownership of the Earth and maturity.' },
    ],
    practiceQuestions: [
      'Choose one condition from the poem and explain it in your own words.',
      'How does the poem balance caution with confidence?',
    ],
    related: ['ozymandias','road-not-taken'],
  },
};

function getPoemBySlug(slug) {
  return POEMS[slug] || null;
}

function getAllPoems() {
  return Object.values(POEMS);
}

function getUniqueAuthors() {
  const authors = {};
  getAllPoems().forEach(poem => {
    if(!authors[poem.poet]){ authors[poem.poet] = { poet: poem.poet, count: 0 }; }
    authors[poem.poet].count += 1;
  });
  return Object.values(authors);
}

function getUniqueCategories() {
  const cats = new Set();
  getAllPoems().forEach(poem => (poem.categories || []).forEach(cat => cats.add(cat)));
  return Array.from(cats);
}

function getUniqueThemes() {
  return Array.from(new Set(getAllPoems().map(poem => poem.theme)));
}
