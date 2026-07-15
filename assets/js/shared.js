/* =====================================================================
   LET'S LEARN WITH ARSLAN — SHARED SCRIPT
   Loaded on every page. Depends on GSAP + ScrollTrigger (loaded via CDN
   in each page) for the reveal / helix / parallax work, everything else
   is vanilla JS.
   ===================================================================== */
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const root = document.documentElement;

  /* ---------- THEME (dark / light) ---------- */
  const THEME_KEY = 'llwa-theme';
  function applyTheme(t){
    root.setAttribute('data-theme', t);
    try{ localStorage.setItem(THEME_KEY, t); }catch(e){}
  }
  (function initTheme(){
    let saved;
    try{ saved = localStorage.getItem(THEME_KEY); }catch(e){}
    if(!saved){ saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
    applyTheme(saved);
  })();
  // Theme toggle: support [data-theme-toggle] and legacy .theme-toggle
  document.querySelectorAll('[data-theme-toggle], .theme-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  });

  /* ---------- NAV SCROLL STATE ---------- */
  const navEl = document.querySelector('nav');
  if(navEl){
    const onScroll = ()=> navEl.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  const burger = document.querySelector('.burger');
  const mobilePanel = document.querySelector('.mobile-panel');
  if(burger && mobilePanel){
    burger.addEventListener('click', ()=>{
      burger.classList.toggle('open');
      mobilePanel.classList.toggle('open');
      document.body.style.overflow = mobilePanel.classList.contains('open') ? 'hidden' : '';
    });
    mobilePanel.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      burger.classList.remove('open'); mobilePanel.classList.remove('open'); document.body.style.overflow='';
    }));
  }

  /* ---------- MEGA MENU (tap support for touch) ---------- */
  document.querySelectorAll('.has-mega > a.top-link').forEach(link=>{
    link.addEventListener('click', e=>{
      if(isCoarse){
        e.preventDefault();
        const li = link.closest('.has-mega');
        const isOpen = li.classList.contains('mega-open');
        document.querySelectorAll('.has-mega').forEach(el=>el.classList.remove('mega-open'));
        if(!isOpen) li.classList.add('mega-open');
      }
    });
  });

  /* ---------- SEARCH OVERLAY ---------- */
  const searchOverlay = document.querySelector('.search-overlay');
  document.querySelectorAll('[data-search-open]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!searchOverlay) return;
      searchOverlay.classList.add('open');
      const input = searchOverlay.querySelector('input');
      if(input){
        setTimeout(()=>{ input.focus(); renderSearchResults(input.value || ''); }, 200);
      }
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelectorAll('[data-search-close]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!searchOverlay) return;
      searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  const searchInput = searchOverlay?.querySelector('input');
  const searchResults = searchOverlay?.querySelector('#searchResults');
  const voiceButton = searchOverlay?.querySelector('#voiceSearchBtn');

  function normalizeQuery(value){ return (value || '').trim().toLowerCase(); }
  function renderSearchResults(query){
    if(!searchResults) return;
    const q = normalizeQuery(query);
    if(!q){
      searchResults.innerHTML = `<div class="search-hint"><span>Present Perfect</span><span>The Old Man and the Sea</span><span>2023 Past Paper</span><span>Idioms A–Z</span></div>`;
      return;
    }
    const lessons = Array.isArray(window.LESSONS) ? window.LESSONS.map(l=>({
      title:l.title,
      subtitle:l.description,
      type:'Lesson',
      url:`lesson.html?slug=${l.slug}`,
      keywords:[l.title,l.description,l.category,l.board||'',l.year||''].join(' ').toLowerCase()
    })) : [];
    const pages = window.PAGES ? Object.values(window.PAGES).map(p=>({
      title:p.title,
      subtitle:p.tagline || p.description || '',
      type:p.type || 'Page',
      // Prefer dedicated .html pages when available (falls back to page.html?slug=...)
      url:(['blog','past-papers','poetry','literature','vocabulary','quiz','login','register','contact','student-dashboard','teacher-dashboard','admin-dashboard'].includes(p.slug) ? `${p.slug}.html` : `page.html?slug=${p.slug}`),
      keywords:[p.title,p.slug,p.tagline||'',(p.keywords||[]).join(' ')].join(' ').toLowerCase()
    })) : [];
    const poems = window.POEMS ? Object.values(window.POEMS).map(p=>({
      title:p.title,
      subtitle:`${p.poet} · ${p.theme}`,
      type:'Poem',
      url:`poem.html?slug=${p.slug}`,
      keywords:[p.title,p.poet,p.theme,(p.categories||[]).join(' '),(p.literaryDevices||[]).join(' '),(p.summary||'')].join(' ').toLowerCase()
    })) : [];
    const literature = window.LITERATURE_WORKS ? Object.values(window.LITERATURE_WORKS).map(p=>({
      title:p.title,
      subtitle:`${p.author} · ${p.type}`,
      type:'Literature',
      url:`literature-detail.html?slug=${p.slug}`,
      keywords:[p.title,p.author,p.type,(p.categories||[]).join(' '),(p.themes||[]).join(' '),(p.summary||'')].join(' ').toLowerCase()
    })) : [];
    const vocab = window.VOCABULARY_WORDS ? Object.values(window.VOCABULARY_WORDS).map(w=>({
      title:w.word,
      subtitle:`${w.pronunciation} · ${w.category}`,
      type:'Word',
      url:`vocabulary.html#${w.slug}`,
      keywords:[w.word,w.definition,w.category,w.difficulty,(w.synonyms||[]).join(' '),(w.antonyms||[]).join(' ')].join(' ').toLowerCase()
    })) : [];
    const idioms = window.VOCABULARY_IDIOMS ? Object.values(window.VOCABULARY_IDIOMS).map(i=>({
      title:i.idiom,
      subtitle:i.meaning,
      type:'Idiom',
      url:`vocabulary.html#${i.slug}`,
      keywords:[i.idiom,i.meaning,i.category].join(' ').toLowerCase()
    })) : [];
    const quizzes = window.QUIZZES ? Object.values(window.QUIZZES).map(qz=>({
      title:qz.title,
      subtitle:`${qz.totalQuestions} questions · ${qz.duration} min`,
      type:'Quiz',
      url:`quiz.html?quiz=${qz.id}`,
      keywords:[qz.title,qz.category,qz.difficulty,qz.description].join(' ').toLowerCase()
    })) : [];
    const papers = window.PAST_PAPERS ? window.PAST_PAPERS.map(p => ({
      title: p.title,
      subtitle: `${p.year} · ${p.totalMarks} marks`,
      type: 'Past Paper',
      url: `past-papers.html#${p.id}`,
      keywords: [p.title, p.subject, p.board, (p.topics||[]).join(' '), String(p.year)].join(' ').toLowerCase()
    })) : [];
    const blogPosts = window.BLOG_POSTS ? window.BLOG_POSTS.map(bp => ({
      title: bp.title,
      subtitle: `${bp.publishedAt} · ${bp.readingMins || estimateReadingTime(bp.content)} min`,
      type: 'Article',
      url: `blog-post.html?post=${bp.slug}`,
      keywords: [bp.title, (bp.tags||[]).join(' '), bp.excerpt || '', bp.content.replace(/<[^>]+>/g,'')].join(' ').toLowerCase()
    })) : [];

    const all = [...lessons, ...pages, ...poems, ...literature, ...vocab, ...idioms, ...quizzes, ...papers, ...blogPosts];
    const results = all.filter(item => q.split(/\s+/).every(term => item.keywords.includes(term))).slice(0,6);
    if(results.length === 0){
      searchResults.innerHTML = `<button type="button" class="search-result"><div><h4>No results found</h4><span>Try a different keyword.</span></div></button>`;
      return;
    }
    searchResults.innerHTML = results.map(item =>
      `<button type="button" class="search-result" data-target="${item.url}"><div><h4>${item.title}</h4><span>${item.subtitle}</span></div><span class="search-result-type">${item.type}</span></button>`
    ).join('');
    searchResults.querySelectorAll('.search-result').forEach(btn=> btn.addEventListener('click', ()=>{
      if(btn.dataset.target) window.location.href = btn.dataset.target;
    }));
  }

  if(searchInput){
    searchInput.addEventListener('input', e=> renderSearchResults(e.target.value));
    searchInput.addEventListener('keydown', e=>{
      if(e.key === 'Enter'){
        const first = searchResults?.querySelector('[data-target]');
        if(first) window.location.href = first.dataset.target;
      }
    });
  }

  if(voiceButton){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition){
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      voiceButton.addEventListener('click', ()=>{
        try{
          recognition.start();
          voiceButton.classList.add('listening');
        }catch(_){ }
      });
      recognition.addEventListener('result', e=>{
        const transcript = e.results[0][0].transcript;
        if(searchInput){ searchInput.value = transcript; renderSearchResults(transcript); }
      });
      recognition.addEventListener('end', ()=> voiceButton.classList.remove('listening'));
    } else {
      voiceButton.style.display = 'none';
    }
  }

  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && searchOverlay) { searchOverlay.classList.remove('open'); document.body.style.overflow=''; }
  });

  /* ---------- CUSTOM CURSOR ---------- */
  if(!isCoarse){
    const dot = document.getElementById('cdot'), ring = document.getElementById('cring');
    if(dot && ring){
      let mx=innerWidth/2,my=innerHeight/2, rx=mx, ry=my;
      window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`; });
      (function loop(){ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
      document.querySelectorAll('a,button,.magnetic').forEach(el=>{
        el.addEventListener('mouseenter', ()=>ring.classList.add('big'));
        el.addEventListener('mouseleave', ()=>ring.classList.remove('big'));
      });
      document.querySelectorAll('.magnetic').forEach(el=>{
        el.addEventListener('mousemove', e=>{
          const r = el.getBoundingClientRect();
          const relX = e.clientX - r.left - r.width/2;
          const relY = e.clientY - r.top - r.height/2;
          el.style.transform = `translate(${relX*0.22}px, ${relY*0.32}px)`;
        });
        el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
      });
    }
  }

  /* ---------- BUTTON RIPPLE ---------- */
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const r=this.getBoundingClientRect();
      const s=document.createElement('span');
      s.className='ripple';
      s.style.left=(e.clientX-r.left)+'px'; s.style.top=(e.clientY-r.top)+'px';
      s.style.width=s.style.height='14px';
      this.appendChild(s); setTimeout(()=>s.remove(),650);
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal:not(.in)');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.15});
    revealEls.forEach((el,idx)=>{ el.style.transitionDelay = (idx%3)*0.08+'s'; io.observe(el); });
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }

  /* ---------- COUNTERS ---------- */
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseInt(el.dataset.count,10);
    const suffix = el.dataset.suffix || '';
    const io2 = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          let cur=0; const dur=1400; const start=performance.now();
          function step(t){
            const p = Math.min((t-start)/dur,1);
            cur = Math.floor(target * (1-Math.pow(1-p,3)));
            el.textContent = cur.toLocaleString() + suffix;
            if(p<1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io2.unobserve(el);
        }
      });
    }, {threshold:.4});
    io2.observe(el);
  });

  /* ---------- TYPEWRITER (used on hero subtitle) ---------- */
  const typeTarget = document.getElementById('typeTarget');
  if(typeTarget){
    const fullText = typeTarget.dataset.text || typeTarget.textContent.trim();
    if(reduceMotion){ typeTarget.textContent = fullText; }
    else{
      let i=0;
      typeTarget.innerHTML = '<span class="type-cursor">&nbsp;</span>';
      function typeStep(){
        if(i<=fullText.length){
          typeTarget.innerHTML = fullText.slice(0,i) + '<span class="type-cursor">&nbsp;</span>';
          i++; setTimeout(typeStep, 24);
        }
      }
      setTimeout(typeStep, 900);
    }
  }

  /* ---------- HERO HEADLINE WORD REVEAL ---------- */
  const heroHead = document.getElementById('heroHead');
  if(heroHead && window.gsap){
    heroHead.innerHTML = heroHead.innerHTML.replace(/(\S+)/g, w=>`<span class="word">${w}</span>`);
    gsap.to('#heroHead .word', { opacity:1, y:0, rotateX:0, duration:1, ease:'power3.out', stagger:0.09, delay:.25 });
  }

  /* ---------- HERO VISUAL PARALLAX ---------- */
  if(!reduceMotion && !isCoarse && window.gsap){
    window.addEventListener('mousemove', e=>{
      const cx = (e.clientX/innerWidth - 0.5), cy = (e.clientY/innerHeight - 0.5);
      gsap.to('.hero-visual', { x: cx*16, y: cy*16, duration:0.7, overwrite:'auto' });
    });
  }

  /* ---------- NEWSLETTER FAKE SUBMIT ---------- */
  document.querySelectorAll('.newsletter-form').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input');
      if(btn){ const original = btn.textContent; btn.textContent = 'Subscribed ✓'; btn.disabled = true;
        setTimeout(()=>{ btn.textContent = original; btn.disabled = false; if(input) input.value=''; }, 2600);
      }
    });
  });

  /* ---------- HELIX: 3D CARDS CIRCLING ON SCROLL ---------- */
  const categories = [
    {n:'01', t:'Grammar', d:'Every rule and exception, explained plainly.', href:'grammar.html'},
    {n:'02', t:'Vocabulary', d:'Idioms and word pairs that sound native.', href:'vocabulary.html'},
    {n:'03', t:'Past Papers', d:'Every board, every year, solved.', href:'past-papers.html'},
    {n:'04', t:'Literature', d:'Stories and their layered meanings.', href:'literature.html'},
    {n:'05', t:'Poetry', d:'Every poem, explained line by line.', href:'poetry.html'},
    {n:'06', t:'Lessons', d:'Structured, chapter-by-chapter video lessons.', href:'lesson.html'},
    {n:'07', t:'Quizzes', d:'Instant-feedback MCQs on every topic.', href:'quiz.html'},
    {n:'08', t:'Blog', d:'Study tips, exam strategy, and updates.', href:'blog.html'},
  ];
  const track = document.getElementById('helixTrack');
  const progressWrap = document.getElementById('helixProgress');
  if(track && progressWrap){
    const sprig = '<svg class="sprig" viewBox="0 0 24 24" fill="none"><path d="M12 22V6M12 6C9 6 6 8 6 11M12 6C15 6 18 8 18 11M12 12C9.5 12 7 13.5 7 16M12 12C14.5 12 17 13.5 17 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    categories.forEach((c)=>{
      const card = document.createElement('a');
      card.className='helix-card';
      card.href = c.href;
      card.innerHTML = `${sprig}<div class="num">${c.n}</div><h3>${c.t}</h3><p>${c.d}</p><div class="go-link">Open →</div>`;
      track.appendChild(card);
      const dotEl = document.createElement('i'); progressWrap.appendChild(dotEl);
    });
    const cards = track.querySelectorAll('.helix-card');
    const dots = progressWrap.querySelectorAll('i');
    const N = categories.length;

    function layoutHelix(progress){
      const ease = window.gsap ? gsap.parseEase('power2.out')(Math.min(progress/0.55,1)) : Math.min(progress/0.55,1);
      const radius = 300 * ease;
      const baseRotation = progress * 340;
      cards.forEach((card,i)=>{
        const angle = (i/N)*360 + baseRotation;
        const rad = angle * Math.PI/180;
        const z = Math.cos(rad) * radius;
        const x = Math.sin(rad) * radius;
        const vY = Math.sin(rad*0.5 + i) * (28*ease) + (i-N/2)*3*ease;
        const scale = 0.72 + 0.28*ease;
        const opac = reduceMotion ? 1 : Math.max(0.25, (z+radius)/(2*radius||1));
        card.style.transform = `translate3d(${x}px, ${vY}px, ${z}px) rotateY(${-angle}deg) scale(${scale})`;
        card.style.opacity = ease < 0.05 ? 1 : opac;
        card.style.zIndex = Math.round(z);
      });
      const activeDot = Math.min(N-1, Math.floor(progress*N));
      dots.forEach((d,i)=> d.classList.toggle('on', i===activeDot));
    }
    layoutHelix(0);

    if(!reduceMotion && window.gsap && window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: '.helix-wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: self => layoutHelix(self.progress)
      });
    } else {
      layoutHelix(1);
    }
  }

  /* ---------- INTERACTIVE "ENGLISH ELEMENTS" BACKGROUND ---------- */
  /* Floating letters, punctuation, and short word-fragments that drift
     slowly and gently drift away from the cursor for a subtle, living
     backdrop that ties back to the "learning English" subject matter. */
  (function litLayer(){
    const layer = document.querySelector('.lit-layer');
    if(!layer) return;
    const glyphs = ['A','B','C','“','”','?','!','ly','ing','the','&','Aa','.','...','Ee'];
    const count = window.innerWidth < 720 ? 9 : 16;
    const items = [];
    for(let i=0;i<count;i++){
      const el = document.createElement('span');
      el.className = 'lit-el';
      el.textContent = glyphs[i % glyphs.length];
      const size = 18 + Math.random()*46;
      const baseX = Math.random()*100;
      const baseY = Math.random()*100;
      el.style.left = baseX+'vw';
      el.style.top = baseY+'vh';
      el.style.fontSize = size+'px';
      layer.appendChild(el);
      items.push({ el, baseX, baseY, size, phase: Math.random()*Math.PI*2, ox:0, oy:0 });
    }
    let mouseX = -9999, mouseY = -9999;
    window.addEventListener('mousemove', e=>{ mouseX = e.clientX; mouseY = e.clientY; }, {passive:true});
    window.addEventListener('mouseleave', ()=>{ mouseX = -9999; mouseY = -9999; });

    if(reduceMotion){
      return; // keep them static, no animation loop
    }

    function tick(t){
      const time = t/1000;
      items.forEach(it=>{
        const bx = (it.baseX/100)*window.innerWidth;
        const by = (it.baseY/100)*window.innerHeight;
        const driftX = Math.sin(time*0.3 + it.phase)*14;
        const driftY = Math.cos(time*0.25 + it.phase)*14;
        let px = bx + driftX, py = by + driftY;
        const dx = px - mouseX, dy = py - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const repelRadius = 160;
        let rx = 0, ry = 0;
        if(dist < repelRadius){
          const force = (repelRadius - dist)/repelRadius;
          rx = (dx/(dist||1)) * force * 60;
          ry = (dy/(dist||1)) * force * 60;
        }
        it.ox += ((driftX + rx) - it.ox) * 0.08;
        it.oy += ((driftY + ry) - it.oy) * 0.08;
        it.el.style.transform = `translate(${it.ox}px, ${it.oy}px)`;
        it.el.style.opacity = dist < repelRadius ? 0.32 : 0.14;
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* =====================================================================
     PREMIUM 3D TILT — .tilt-card
     Real pointer-driven perspective tilt for every element that already
     carries the .tilt-card class (feature cards, course cards,
     testimonials, blog cards, the teacher photo frames, etc). Also writes
     --mx / --my custom properties onto the card as it moves, so any
     mouse-follow glow layer already living inside it (e.g. .card-glow,
     .frame-shine) can track the cursor for free. Skipped on touch
     devices and when the user prefers reduced motion.
     ===================================================================== */
  if(!reduceMotion && !isCoarse){
    document.querySelectorAll('.tilt-card').forEach(card=>{
      let raf = null, hovering = false;
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      function update(e){
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / (r.width || 1);
        const py = (e.clientY - r.top) / (r.height || 1);
        const rx = (0.5 - py) * 8;
        const ry = (px - 0.5) * 10;
        card.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        raf = null;
      }
      card.addEventListener('mouseenter', ()=>{
        hovering = true;
        card.style.transition = 'transform .18s ease-out';
      });
      card.addEventListener('mousemove', e=>{
        if(!hovering || raf) return;
        raf = requestAnimationFrame(()=> update(e));
      });
      card.addEventListener('mouseleave', ()=>{
        hovering = false;
        card.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* =====================================================================
     NAV AUTO-HIDE ON SCROLL DIRECTION
     Layers a lightweight hide-on-scroll-down / reveal-on-scroll-up
     behaviour on top of the existing .scrolled state, driven purely by
     inline transform so it needs no extra CSS and never fights the
     background/blur rules already applied to the nav.
     ===================================================================== */
  if(navEl && !reduceMotion){
    let lastY = window.scrollY, navTicking = false;
    navEl.style.transition = 'transform .35s cubic-bezier(.2,.8,.2,1)';
    window.addEventListener('scroll', ()=>{
      if(navTicking) return;
      navTicking = true;
      requestAnimationFrame(()=>{
        const y = window.scrollY;
        const goingDown = y > lastY;
        navEl.style.transform = (goingDown && y > 140) ? 'translateY(-112%)' : 'translateY(0)';
        lastY = y;
        navTicking = false;
      });
    }, {passive:true});
  }

  /* =====================================================================
     PREMIUM IMAGE FRAMES
     Markup and stylesheets stay untouched — this fits every qualifying
     photo into a consistent vertical showcase frame at runtime: a calm
     portrait ratio, curved corners, a layered "professional" border and
     ambient glow, a gentle load-in reveal, and a smooth hover zoom.
     Logos, avatars, and icons are explicitly excluded. Runs on every
     page that loads this file, not just the homepage.
     ===================================================================== */
  (function premiumImageFrames(){
    const candidates = new Set();

    // Known showcase frames on this template.
    document.querySelectorAll('.teacher-photo-frame, .teacher-frame').forEach(frame=>{
      const img = frame.querySelector('img');
      if(img) candidates.add(img);
    });

    // Generic fallback so this keeps working on any other page that
    // shares this file: any reasonably large content image that isn't
    // an avatar / logo / icon.
    document.querySelectorAll('img').forEach(img=>{
      if(candidates.has(img)) return;
      if(img.closest('.brand-logo, .testi-avatar, .icon-btn, nav, footer, .hero-badge')) return;
      const w = img.getBoundingClientRect().width || img.width || 0;
      if(w >= 160) candidates.add(img);
    });

    candidates.forEach(img=>{
      const frame = img.parentElement;
      if(!frame || frame.dataset.premiumFramed === 'true') return;
      frame.dataset.premiumFramed = 'true';

      // Lock in the frame's current footprint before forcing a portrait
      // ratio, so it can't collapse if the page's own CSS gave it a
      // fixed height instead of "auto".
      const currentWidth = frame.getBoundingClientRect().width || 320;

      Object.assign(frame.style, {
        position: 'relative',
        boxSizing: 'border-box',
        width: currentWidth + 'px',
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,.14)',
        boxShadow: '0 34px 80px -28px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.05) inset, 0 0 46px -14px rgba(120,140,255,.28)',
        background: 'linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,0) 55%)'
      });

      Object.assign(img.style, {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 18%',
        display: 'block',
        opacity: '0',
        transform: 'scale(1.08) translateY(10px)',
        filter: 'blur(8px)',
        transition: 'opacity .9s ease, transform 1.1s cubic-bezier(.2,.8,.2,1), filter .9s ease'
      });

      function reveal(){
        img.style.opacity = '1';
        img.style.filter = 'blur(0)';
        img.style.transform = 'scale(1) translateY(0)';
      }
      if(img.complete && img.naturalWidth){ requestAnimationFrame(reveal); }
      else{ img.addEventListener('load', reveal, {once:true}); }

      if(!isCoarse){
        frame.addEventListener('mouseenter', ()=>{
          img.style.transitionDuration = '.7s';
          img.style.transform = 'scale(1.07) translateY(0)';
          img.style.filter = 'brightness(1.04) blur(0)';
        });
        frame.addEventListener('mouseleave', ()=>{
          img.style.transitionDuration = '.7s';
          img.style.transform = 'scale(1) translateY(0)';
          img.style.filter = 'blur(0)';
        });
      }
    });

    // Re-lock frame widths on resize so the portrait ratio stays
    // proportionate to the frame's own responsive column, not a stale
    // pixel value captured at page load.
    let resizeRaf = null;
    window.addEventListener('resize', ()=>{
      if(resizeRaf) return;
      resizeRaf = requestAnimationFrame(()=>{
        candidates.forEach(img=>{
          const frame = img.parentElement;
          if(!frame) return;
          frame.style.width = 'auto';
          const w = frame.getBoundingClientRect().width;
          frame.style.width = (w || 320) + 'px';
        });
        resizeRaf = null;
      });
    }, {passive:true});
  })();

})();
