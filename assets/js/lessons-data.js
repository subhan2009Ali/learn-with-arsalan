/* =====================================================================
   LESSON DATA — single source of truth for the Grammar Hub and the
   Lesson page. Nothing in grammar.html or lesson.html is hardcoded;
   every card, list, TOC entry, example, exercise and quiz question is
   generated from this file at runtime.

   To add a lesson: push a new object into LESSONS below. Every other
   part of the site (search, filters, roadmap, related lessons,
   prev/next) derives itself from this array automatically.
   ===================================================================== */

const CATEGORIES = [
  { id:'tenses',      label:'Tenses',            icon:'clock'   },
  { id:'sentence',    label:'Sentence Structure', icon:'layers'  },
  { id:'voice',       label:'Voice & Narration',  icon:'swap'    },
  { id:'parts',       label:'Parts of Speech',    icon:'grid'    },
  { id:'punctuation', label:'Punctuation',        icon:'quote'   },
];

const LESSONS = [
  {
    slug:'present-perfect',
    title:'Present Perfect Tense',
    category:'tenses',
    difficulty:'beginner',
    description:'How to connect the past to the present using "have/has" plus the third form of the verb.',
    readTime:7,
    popularity:98,
    dateAdded:'2026-06-02',
    sections:[
      { id:'overview', heading:'Overview',
        body:'The Present Perfect describes an action that happened at an unspecified time before now, or that started in the past and continues into the present. It links the past to the present moment, which is what makes it different from the Simple Past.' },
      { id:'form', heading:'Structure & Form',
        body:'The tense is built with the helping verb "have" or "has", followed by the past participle (3rd form) of the main verb.',
        code:{ subj:'Subject', help:'have / has', verb:'V3 (past participle)' } },
      { id:'usage', heading:'When to Use It',
        body:'Use the Present Perfect for: an action completed at an unspecified time; a life experience; an action that started in the past and is still true; or a very recent action (often with "just").' },
      { id:'mistakes', heading:'Common Mistakes',
        body:'Students often add a specific past time word like "yesterday" or "in 2019" with the Present Perfect — this is incorrect. Specific finished-time markers belong with the Simple Past, not the Present Perfect.' },
    ],
    examples:[
      { label:'Life experience', text:'She has visited three countries this year.' },
      { label:'Unspecified past time', text:'I have already finished my homework.' },
      { label:'Continuing situation', text:'They have lived in Lahore since 2015.' },
      { label:'Recent action', text:'He has just left the room.' },
    ],
    exercises:[
      { q:'Complete: I ____ (finish) my assignment already.', answer:'have finished' },
      { q:'Complete: She ____ (not / see) that movie yet.', answer:'has not seen' },
      { q:'Complete: We ____ (know) each other for ten years.', answer:'have known' },
    ],
    quiz:[
      { q:'Which sentence is correctly formed in the Present Perfect?', options:['I have went to Karachi.','I have gone to Karachi.','I has gone to Karachi.'], answer:1 },
      { q:'Which time marker does NOT belong with the Present Perfect?', options:['already','yesterday','just'], answer:1 },
      { q:'"He ___ finished his project."', options:['have','has','having'], answer:1 },
    ],
    related:['past-perfect','present-simple','future-continuous'],
  },
  {
    slug:'past-perfect',
    title:'Past Perfect Tense',
    category:'tenses',
    difficulty:'intermediate',
    description:'Talking about an action that happened before another action in the past — the "past before the past".',
    readTime:6,
    popularity:91,
    dateAdded:'2026-06-05',
    sections:[
      { id:'overview', heading:'Overview',
        body:'The Past Perfect shows which of two past actions happened first. It is the "earlier" past action, while the Simple Past shows the "later" one.' },
      { id:'form', heading:'Structure & Form',
        body:'Formed with "had" plus the past participle (3rd form) of the verb, regardless of subject.',
        code:{ subj:'Subject', help:'had', verb:'V3 (past participle)' } },
      { id:'usage', heading:'When to Use It',
        body:'Use it when narrating two past events, to make clear which one came first — often paired with a Simple Past clause introduced by "before", "after", "when", or "by the time".' },
      { id:'mistakes', heading:'Common Mistakes',
        body:'A common error is using the Past Perfect for both actions in a sentence. Only the earlier action takes "had + V3"; the later action stays in the Simple Past.' },
    ],
    examples:[
      { label:'Two past events', text:'The train had left before we reached the station.' },
      { label:'Cause established earlier', text:'She had studied all night, so the exam felt easy.' },
      { label:'With "by the time"', text:'By the time he called, I had already left home.' },
    ],
    exercises:[
      { q:'Complete: They ____ (leave) by the time we arrived.', answer:'had left' },
      { q:'Complete: I ____ (never / see) snow before that trip.', answer:'had never seen' },
    ],
    quiz:[
      { q:'Which action takes the Past Perfect?', options:['The one that happened first','The one that happened second','Either one'], answer:0 },
      { q:'"He ___ eaten before the guests arrived."', options:['has','had','have'], answer:1 },
    ],
    related:['present-perfect','future-continuous','conditionals'],
  },
  {
    slug:'future-continuous',
    title:'Future Continuous Tense',
    category:'tenses',
    difficulty:'intermediate',
    description:'Describing an action that will be in progress at a specific point in the future.',
    readTime:5,
    popularity:74,
    dateAdded:'2026-05-28',
    sections:[
      { id:'overview', heading:'Overview',
        body:'The Future Continuous describes an action that will be ongoing at a particular moment in the future, or an action already planned to happen around a certain time.' },
      { id:'form', heading:'Structure & Form',
        body:'Built with "will be" followed by the "-ing" form of the main verb.',
        code:{ subj:'Subject', help:'will be', verb:'V-ing' } },
      { id:'usage', heading:'When to Use It',
        body:'Use it for an action in progress at a stated future time, or to politely ask about someone\'s planned activities.' },
    ],
    examples:[
      { label:'Action in progress later', text:'This time tomorrow, I will be sitting in the exam hall.' },
      { label:'Polite question', text:'Will you be using the printer this evening?' },
    ],
    exercises:[
      { q:'Complete: At 8 pm, we ____ (watch) the match.', answer:'will be watching' },
    ],
    quiz:[
      { q:'"This time next week, she ___ traveling to Multan."', options:['will be','is','was'], answer:0 },
    ],
    related:['present-perfect','past-perfect'],
  },
  {
    slug:'clauses',
    title:'Clauses: Independent & Dependent',
    category:'sentence',
    difficulty:'beginner',
    description:'The building blocks of every sentence — how to tell a complete thought from an incomplete one.',
    readTime:8,
    popularity:82,
    dateAdded:'2026-06-10',
    sections:[
      { id:'overview', heading:'Overview',
        body:'A clause is any group of words with a subject and a verb. An independent clause can stand alone as a full sentence. A dependent clause cannot — it needs an independent clause to complete its meaning.' },
      { id:'types', heading:'Types of Clauses',
        body:'Noun clauses act as a subject or object ("What she said surprised everyone"). Adjective clauses describe a noun ("The book that you gave me is excellent"). Adverb clauses show time, reason, or condition ("Because it was raining, we stayed home").' },
      { id:'joining', heading:'Joining Clauses',
        body:'Clauses are joined using coordinating conjunctions (and, but, or, so) for independent clauses of equal weight, or subordinating conjunctions (because, although, when, if) to attach a dependent clause.' },
    ],
    examples:[
      { label:'Independent clause', text:'The rain stopped.' },
      { label:'Dependent clause (incomplete alone)', text:'Because the rain stopped...' },
      { label:'Combined sentence', text:'Because the rain stopped, we went outside.' },
    ],
    exercises:[
      { q:'Identify the type: "The man who called you is my uncle" — the clause "who called you" is a(n) ____ clause.', answer:'adjective' },
    ],
    quiz:[
      { q:'Which of these is a dependent clause?', options:['She smiled.','Although she smiled.','She smiled and left.'], answer:1 },
    ],
    related:['conditionals','punctuation-rules'],
  },
  {
    slug:'conditionals',
    title:'Conditional Sentences (If-Clauses)',
    category:'sentence',
    difficulty:'advanced',
    description:'The four conditional types, and how each one changes meaning based on tense.',
    readTime:9,
    popularity:88,
    dateAdded:'2026-06-12',
    sections:[
      { id:'overview', heading:'Overview',
        body:'Conditional sentences describe a condition and its result. English has four main types, each carrying a different sense of likelihood.' },
      { id:'zero', heading:'Zero Conditional — General Truths',
        body:'If + present simple, present simple. Used for facts and general truths: "If you heat ice, it melts."' },
      { id:'first', heading:'First Conditional — Real Future Possibility',
        body:'If + present simple, will + base verb. Used for realistic future situations: "If it rains, we will cancel the trip."' },
      { id:'second', heading:'Second Conditional — Unreal Present/Future',
        body:'If + past simple, would + base verb. Used for hypothetical or unlikely situations: "If I won the lottery, I would travel the world."' },
      { id:'third', heading:'Third Conditional — Unreal Past',
        body:'If + past perfect, would have + V3. Used to imagine a different outcome for something that already happened: "If she had studied, she would have passed."' },
    ],
    examples:[
      { label:'Zero conditional', text:'If you mix red and blue, you get purple.' },
      { label:'First conditional', text:'If I finish early, I will call you.' },
      { label:'Second conditional', text:'If I were you, I would apologize.' },
      { label:'Third conditional', text:'If they had left earlier, they would have caught the train.' },
    ],
    exercises:[
      { q:'Complete (1st conditional): If it ____ (rain), we will stay inside.', answer:'rains' },
      { q:'Complete (3rd conditional): If he ____ (study), he would have passed.', answer:'had studied' },
    ],
    quiz:[
      { q:'Which conditional talks about an imaginary past result?', options:['First','Second','Third'], answer:2 },
      { q:'"If I ___ rich, I would buy a house" fits which conditional?', options:['First','Second','Zero'], answer:1 },
    ],
    related:['clauses','past-perfect'],
  },
  {
    slug:'active-passive',
    title:'Active & Passive Voice',
    category:'voice',
    difficulty:'intermediate',
    description:'How to shift focus from the doer of an action to the receiver of it.',
    readTime:7,
    popularity:85,
    dateAdded:'2026-06-08',
    sections:[
      { id:'overview', heading:'Overview',
        body:'In the active voice, the subject performs the action. In the passive voice, the subject receives the action, and the doer becomes optional.' },
      { id:'form', heading:'Structure & Form',
        body:'Passive voice is formed with the correct form of "be" plus the past participle (V3) of the main verb.',
        code:{ subj:'Object (becomes subject)', help:'am/is/are/was/were/been', verb:'V3' } },
      { id:'usage', heading:'When to Use It',
        body:'Use the passive when the doer is unknown, unimportant, or obvious from context, or in formal/scientific writing where the action matters more than who did it.' },
    ],
    examples:[
      { label:'Active', text:'The teacher explained the lesson.' },
      { label:'Passive', text:'The lesson was explained by the teacher.' },
      { label:'Passive, doer omitted', text:'The bridge was built in 1998.' },
    ],
    exercises:[
      { q:'Convert to passive: "They are painting the house."', answer:'The house is being painted' },
    ],
    quiz:[
      { q:'The passive voice always uses which auxiliary?', options:['do','be','have'], answer:1 },
    ],
    related:['direct-indirect','present-perfect'],
  },
  {
    slug:'direct-indirect',
    title:'Direct & Indirect (Reported) Speech',
    category:'voice',
    difficulty:'advanced',
    description:'How to report what someone else said, and how tenses shift one step back.',
    readTime:8,
    popularity:79,
    dateAdded:'2026-06-14',
    sections:[
      { id:'overview', heading:'Overview',
        body:'Direct speech quotes a person\'s exact words. Indirect (reported) speech relays the meaning without quotation marks, usually shifting the tense one step into the past.' },
      { id:'shift', heading:'The Tense Shift Rule',
        body:'Present Simple → Past Simple, Present Perfect → Past Perfect, "will" → "would". Time and place words also shift: "tomorrow" becomes "the next day", "here" becomes "there".' },
    ],
    examples:[
      { label:'Direct', text:'She said, "I am tired."' },
      { label:'Indirect', text:'She said that she was tired.' },
      { label:'Direct question', text:'He asked, "Where do you live?"' },
      { label:'Indirect question', text:'He asked where I lived.' },
    ],
    exercises:[
      { q:'Convert to indirect speech: He said, "I will call you tomorrow."', answer:'He said that he would call me the next day' },
    ],
    quiz:[
      { q:'"Will" changes to ___ in reported speech.', options:['would','will','shall'], answer:0 },
    ],
    related:['active-passive'],
  },
  {
    slug:'articles',
    title:'Articles: A, An, The',
    category:'parts',
    difficulty:'beginner',
    description:'The small words that carry more meaning than students expect.',
    readTime:5,
    popularity:93,
    dateAdded:'2026-05-20',
    sections:[
      { id:'overview', heading:'Overview',
        body:'"A" and "an" are indefinite articles, used for a non-specific, singular, countable noun. "The" is the definite article, used when both speaker and listener know exactly which thing is meant.' },
      { id:'rules', heading:'Choosing A vs An',
        body:'Use "an" before a vowel sound (an hour, an umbrella), and "a" before a consonant sound (a university, a one-time offer) — sound matters more than spelling.' },
    ],
    examples:[
      { label:'Indefinite, first mention', text:'I saw a cat in the garden.' },
      { label:'Definite, already known', text:'The cat was sleeping under the tree.' },
      { label:'Sound-based rule', text:'She waited for an hour, then met a European friend.' },
    ],
    exercises:[
      { q:'Choose the correct article: "He is ____ honest man."', answer:'an' },
    ],
    quiz:[
      { q:'Which is correct?', options:['a hour','an hour','the hour (default)'], answer:1 },
    ],
    related:['prepositions','modals'],
  },
  {
    slug:'prepositions',
    title:'Prepositions of Time & Place',
    category:'parts',
    difficulty:'beginner',
    description:'In, on, at — the tiny words that decide whether a sentence sounds native or not.',
    readTime:6,
    popularity:89,
    dateAdded:'2026-05-25',
    sections:[
      { id:'overview', heading:'Overview',
        body:'Prepositions link a noun to the rest of the sentence, most often showing time or place. Their use is largely idiomatic, so they are best learned through pattern and example.' },
      { id:'time', heading:'Prepositions of Time',
        body:'"At" for precise times (at 5 pm), "on" for days and dates (on Monday), and "in" for longer periods (in March, in 2026).' },
      { id:'place', heading:'Prepositions of Place',
        body:'"At" for a point (at the bus stop), "on" for a surface (on the table), and "in" for an enclosed space (in the box).' },
    ],
    examples:[
      { label:'Time — at', text:'The class starts at 9 am.' },
      { label:'Time — on', text:'We have a test on Friday.' },
      { label:'Place — in', text:'The keys are in the drawer.' },
    ],
    exercises:[
      { q:'Fill the blank: "She was born ____ 2004."', answer:'in' },
    ],
    quiz:[
      { q:'Which preposition fits: "Meet me ___ the entrance."', options:['in','at','on'], answer:1 },
    ],
    related:['articles','modals'],
  },
  {
    slug:'modals',
    title:'Modal Verbs (Can, Could, Should, Must)',
    category:'parts',
    difficulty:'intermediate',
    description:'Expressing ability, permission, advice, and obligation without a full verb conjugation.',
    readTime:7,
    popularity:81,
    dateAdded:'2026-06-01',
    sections:[
      { id:'overview', heading:'Overview',
        body:'Modal verbs are helping verbs that add meaning like ability, possibility, permission, or necessity to the main verb. They never change form and are always followed by the base verb.' },
      { id:'usage', heading:'Common Modals & Their Uses',
        body:'"Can/could" — ability or permission. "Should" — advice or recommendation. "Must" — strong obligation or logical certainty. "May/might" — possibility.' },
    ],
    examples:[
      { label:'Ability', text:'She can speak three languages.' },
      { label:'Advice', text:'You should revise your notes daily.' },
      { label:'Obligation', text:'Students must submit the form by Friday.' },
    ],
    exercises:[
      { q:'Complete with the correct modal: "You ____ see a doctor if the pain continues." (advice)', answer:'should' },
    ],
    quiz:[
      { q:'Which modal expresses strong obligation?', options:['might','must','could'], answer:1 },
    ],
    related:['articles','prepositions'],
  },
  {
    slug:'punctuation-rules',
    title:'Punctuation Essentials',
    category:'punctuation',
    difficulty:'beginner',
    description:'Commas, apostrophes, and full stops — the small marks that change what a sentence means.',
    readTime:6,
    popularity:77,
    dateAdded:'2026-05-18',
    sections:[
      { id:'overview', heading:'Overview',
        body:'Punctuation guides the reader through a sentence\'s structure and meaning. A missing or misplaced mark can completely change what a sentence says.' },
      { id:'comma', heading:'The Comma',
        body:'Use commas to separate items in a list, join two independent clauses with a conjunction, and set off introductory phrases.' },
      { id:'apostrophe', heading:'The Apostrophe',
        body:'Use an apostrophe to show possession ("the student\'s book") or to form a contraction ("it\'s" = "it is"). Never use it simply to make a word plural.' },
    ],
    examples:[
      { label:'List comma', text:'We bought pens, notebooks, and erasers.' },
      { label:'Possession', text:'That is my teacher\'s office.' },
      { label:'Contraction', text:'It\'s already 5 o\'clock.' },
    ],
    exercises:[
      { q:'Insert punctuation: "The dogs bone was missing" (show possession).', answer:"The dog's bone was missing" },
    ],
    quiz:[
      { q:'Which sentence uses the apostrophe correctly?', options:["The book's are on the shelf.","The books are on the shelf.","The book's cover is torn."], answer:2 },
    ],
    related:['clauses'],
  },
];

/* Helper: derive category display data with live lesson counts */
function getCategoryStats(){
  return CATEGORIES.map(cat=>({
    ...cat,
    count: LESSONS.filter(l=>l.category===cat.id).length,
  }));
}

/* Helper: fetch a single lesson by slug */
function getLessonBySlug(slug){
  return LESSONS.find(l=>l.slug===slug) || null;
}

/* Helper: ordered index of all lessons (drives prev/next) */
function getLessonIndex(slug){
  return LESSONS.findIndex(l=>l.slug===slug);
}
