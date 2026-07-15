/* =====================================================================
   PAGE TEMPLATE RENDERER
   Renders every page in page.html from the PAGES dataset.
   ===================================================================== */
(function(){
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || 'poetry';
  const page = typeof getPageBySlug === 'function' ? getPageBySlug(slug) : window.PAGES?.[slug];
  const root = document.getElementById('pageRoot');
  if(!root){ return; }

  if(!page){
    document.title = 'Page not found — Let\'s Learn with Arslan';
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc) metaDesc.setAttribute('content', 'The page you are looking for cannot be found.');
    root.innerHTML = `
      <section class="page-hero">
        <div class="wrap">
          <div class="eyebrow">Page Not Found</div>
          <h1>Oops — this page does not exist yet.</h1>
          <p class="hero-sub">The page you requested is not available. Use the navigation to continue exploring the course content.</p>
          <div class="hero-cta"><a href="index.html" class="btn btn-primary">Return Home</a></div>
        </div>
      </section>`;
    return;
  }

  document.title = `${page.title} — Let's Learn with Arslan`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', page.description || page.tagline || 'Learn English with Arslan.');

  function renderCard(card){
    return `
      <div class="page-card reveal in">
        <div class="page-card-icon">${card.icon || ''}</div>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>`;
  }

  function renderForm(form){
    if(!form) return '';
    return `
      <section class="page-section" id="contactForm">
        <div class="form-panel reveal in">
          <div class="form-panel-head">
            <h2>${form.headline}</h2>
          </div>
          <form class="page-form">
            ${form.fields.map(field => `
              <label class="field">
                <span>${field.label}</span>
                ${field.type === 'textarea' ?
                  `<textarea name="${field.name}" placeholder="${field.placeholder}" rows="5"></textarea>` :
                  `<input type="${field.type || 'text'}" name="${field.name}" placeholder="${field.placeholder}" />`
                }
              </label>
            `).join('')}
            <button type="submit" class="btn btn-primary">${form.button}</button>
          </form>
        </div>
      </section>`;
  }

  const hero = page.hero || {};
  const heroCta = hero.ctaUrl ? `<a href="${hero.ctaUrl}" class="btn btn-primary magnetic">${hero.ctaLabel || 'Explore'}</a>` : '';

  const sectionsHtml = page.sections?.map(section => `
    <section class="page-section reveal in" id="${section.id}">
      <h2>${section.heading}</h2>
      <p>${section.body}</p>
    </section>
  `).join('') || '';

  const cardsHtml = page.cards?.length ? `
    <section class="page-section reveal in">
      <div class="page-card-grid">
        ${page.cards.map(renderCard).join('')}
      </div>
    </section>
  ` : '';

  const formHtml = page.form ? renderForm(page.form) : '';

  const dashboardHtml = page.cards?.length && page.type && ['Dashboard','Admin'].includes(page.type) ? `
    <section class="page-section reveal in">
      <div class="page-card-grid page-card-grid--dashboard">
        ${page.cards.map(renderCard).join('')}
      </div>
    </section>
  ` : '';

  root.innerHTML = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow">${hero.eyebrow || page.type || 'Page'}</div>
        <h1>${hero.title || page.title}</h1>
        <p class="hero-sub">${hero.text || page.tagline || page.description}</p>
        <div class="hero-cta">
          ${heroCta}
          <a href="grammar.html" class="btn btn-ghost magnetic">Browse Lessons</a>
        </div>
      </div>
    </section>
    <section class="page-content">
      <div class="wrap page-intro reveal in">
        <p class="hero-sub">${page.description}</p>
      </div>
      ${sectionsHtml}
      ${page.cards?.length ? (page.type && ['Dashboard','Admin'].includes(page.type) ? dashboardHtml : cardsHtml) : ''}
      ${formHtml}
    </section>`;

  if(page.form){
    const form = document.querySelector('.page-form');
    if(form){
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        if(btn){ btn.textContent = 'Sent ✓'; btn.disabled = true; }
        setTimeout(()=>{
          if(btn){ btn.textContent = page.form.button; btn.disabled = false; }
          form.reset();
        }, 1800);
      });
    }
  }
})();
