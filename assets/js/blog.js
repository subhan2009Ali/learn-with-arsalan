// ============================================
// BLOG ENGINE - HUB & POST RENDERING
// ============================================

class BlogEngine {
  constructor() {
    this.rootId = 'blogRoot';
    document.addEventListener('DOMContentLoaded', () => {
      if(document.getElementById(this.rootId)) this.renderHub();
      if(document.getElementById('blogPostRoot')) this.renderPostFromQuery();
    });
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // smooth share handlers (delegated)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-share]');
      if(target){
        const url = target.dataset.shareUrl || window.location.href;
        const service = target.dataset.share;
        this.share(url, service);
      }
    });
  }

  // ============================================
  // HUB
  // ============================================

  renderHub(){
    const root = document.getElementById(this.rootId);
    if(!root) return;

    const featured = getFeaturedPost();
    const latest = getLatestPosts(6);
    const popular = getPopularPosts(5);

    root.innerHTML = `
      <section class="blog-hero">
        <div class="wrap">
          <div class="blog-hero-inner">
            <div class="hero-left">
              <h1>${BLOG_HUB.heroTitle}</h1>
              <p class="hero-sub">${BLOG_HUB.heroSubtitle}</p>
              <p class="hero-desc">${BLOG_HUB.heroDescription}</p>
              <div class="hero-cta">
                <input type="text" id="blogSearchInput" placeholder="Search articles, tags or topics..." onkeyup="blogEngine.handleSearch(this.value)">
                <button onclick="blogEngine.subscribeNewsletter()">Subscribe</button>
              </div>
            </div>
            <div class="hero-right">
              <img src="${featured.heroImage}" alt="${featured.title}" class="hero-heroimg">
            </div>
          </div>
        </div>
      </section>

      <section class="blog-main wrap">
        <div class="blog-grid">
          <div class="col-left">
            <div class="featured-article">
              <img src="${featured.heroImage}" alt="${featured.title}">
              <div class="feat-meta">
                <a href="blog-post.html?post=${featured.slug}"><h2>${featured.title}</h2></a>
                <p class="excerpt">${featured.excerpt}</p>
                <div class="post-meta">By ${AUTHORS[featured.author].name} • ${featured.readingMins || estimateReadingTime(featured.content)} min read • ${new Date(featured.publishedAt).toLocaleDateString()}</div>
              </div>
            </div>

            <h3>Latest Posts</h3>
            <div class="posts-list">
              ${latest.map(p => this.buildListItem(p)).join('')}
            </div>
          </div>

          <aside class="col-right">
            <div class="card">
              <h4>Categories</h4>
              <ul class="cat-list">
                ${getAllCategories().map(c => `<li><button onclick="blogEngine.filterCategory('${c.id}')">${c.name}</button></li>`).join('')}
              </ul>
            </div>

            <div class="card">
              <h4>Popular Posts</h4>
              ${popular.map(p=>`<a class="small-post" href="blog-post.html?post=${p.slug}"><img src="${p.heroImage}" alt=""><div><strong>${p.title}</strong><small>${p.views.toLocaleString()} views</small></div></a>`).join('')}
            </div>

            <div class="card">
              <h4>Tags</h4>
              <div class="tag-cloud">
                ${getAllTags().map(t => `<button class="tag" onclick="blogEngine.filterTag('${t}')">#${t}</button>`).join('')}
              </div>
            </div>

            <div class="card newsletter-card">
              <h4>Newsletter</h4>
              <p>Get weekly study tips and new articles in your inbox.</p>
              <input type="email" id="newsletterEmail" placeholder="Your email">
              <button onclick="blogEngine.subscribeNewsletter()">Subscribe</button>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  buildListItem(p){
    return `
      <article class="post-item">
        <a href="blog-post.html?post=${p.slug}">
          <img src="${p.heroImage}" alt="${p.title}">
        </a>
        <div class="post-body">
          <a href="blog-post.html?post=${p.slug}"><h4>${p.title}</h4></a>
          <p class="excerpt">${p.excerpt}</p>
          <div class="meta">${AUTHORS[p.author].name} • ${p.readingMins || estimateReadingTime(p.content)} min • ${new Date(p.publishedAt).toLocaleDateString()}</div>
        </div>
      </article>
    `;
  }

  handleSearch(q){
    const results = getAllPosts().filter(p => {
      const text = [p.title, p.excerpt, p.tags.join(' '), p.content].join(' ').toLowerCase();
      return q.trim() === '' ? true : text.includes(q.toLowerCase());
    });
    // Simple inline update: show results in main left column
    const left = document.querySelector('.col-left');
    if(!left) return;
    if(!q.trim()) return this.renderHub();
    left.innerHTML = `
      <h3>Search results for "${q}"</h3>
      <div class="posts-list">
        ${results.map(p => this.buildListItem(p)).join('')}
      </div>
    `;
  }

  filterCategory(cat){
    const posts = getPostsByCategory(cat);
    const left = document.querySelector('.col-left');
    left.innerHTML = `
      <h3>Category: ${BLOG_CATEGORIES[cat].name}</h3>
      <div class="posts-list">
        ${posts.map(p => this.buildListItem(p)).join('')}
      </div>
    `;
  }

  filterTag(tag){
    const posts = getPostsByTag(tag);
    const left = document.querySelector('.col-left');
    left.innerHTML = `
      <h3>Tag: #${tag}</h3>
      <div class="posts-list">
        ${posts.map(p => this.buildListItem(p)).join('')}
      </div>
    `;
  }

  subscribeNewsletter(){
    const email = document.getElementById('newsletterEmail')?.value || document.getElementById('blogSearchInput')?.value;
    if(!email || !email.includes('@')){ alert('Please enter a valid email'); return; }
    alert('Subscribed! Check your inbox — ' + email);
  }

  // ============================================
  // POST DETAIL
  // ============================================

  renderPostFromQuery(){
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    if(!slug) return;
    this.renderPost(slug);
  }

  renderPost(slug){
    const root = document.getElementById('blogPostRoot');
    if(!root) return;
    const post = getPostBySlug(slug);
    if(!post) { root.innerHTML = '<div class="wrap"><p>Post not found</p></div>'; return; }

    // increase view count (in-memory only)
    post.views = (post.views || 0) + 1;

    const author = AUTHORS[post.author];
    const related = (post.related || []).map(r => getPostBySlug(r)).filter(Boolean);

    root.innerHTML = `
      <div class="post-hero" style="background-image: url('${post.heroImage}')">
        <div class="wrap">
          <div class="post-hero-inner">
            <div class="post-meta-top">
              <div class="author">
                <img src="${author.avatar}" alt="${author.name}">
                <div>
                  <div class="author-name">${author.name}</div>
                  <div class="published">${new Date(post.publishedAt).toLocaleDateString()} • ${post.readingMins || estimateReadingTime(post.content)} min read</div>
                </div>
              </div>
              <h1>${post.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="post-wrap wrap">
        <div class="post-grid">
          <article class="post-content">
            <div class="post-body-content">${post.content}</div>

            <div class="post-tags">${post.tags.map(t=>`<button class="tag" onclick="blogEngine.filterTag('${t}')">#${t}</button>`).join('')}</div>

            <div class="post-share">
              <button data-share="twitter" data-share-url="${location.href}">Share X</button>
              <button data-share="facebook" data-share-url="${location.href}">Share FB</button>
              <button data-share="whatsapp" data-share-url="${location.href}">Share WA</button>
            </div>

            <div class="comments-section">
              <h3>Comments</h3>
              <div class="comment-form">
                <input id="commentName" placeholder="Your name">
                <textarea id="commentText" placeholder="Write a comment..."></textarea>
                <button onclick="blogEngine.postComment('${post.id}')">Post Comment</button>
              </div>
              <div class="comments-list" id="commentsList"></div>
            </div>

          </article>

          <aside class="post-sidebar">
            <div class="sticky-toc">
              <h4>On this page</h4>
              <div id="toc"></div>
            </div>

            <div class="card">
              <h4>Related Posts</h4>
              ${related.length ? related.map(r=>`<a href="blog-post.html?post=${r.slug}" class="small-post"><img src="${r.heroImage}" alt=""><div><strong>${r.title}</strong><small>${r.readingMins} min</small></div></a>`).join('') : '<p>No related posts</p>'}
            </div>
          </aside>
        </div>
      </div>
    `;

    this.renderTOC();
    this.renderComments(post.id);
    this.initScrollProgress();
  }

  renderTOC(){
    const content = document.querySelector('.post-body-content');
    if(!content) return;
    const headers = [...content.querySelectorAll('h2, h3, h4')];
    const toc = document.getElementById('toc');
    if(!toc) return;
    toc.innerHTML = headers.map((h, idx) => {
      const id = `heading-${idx}`;
      h.id = id;
      return `<a href="#${id}" class="toc-item toc-${h.tagName.toLowerCase()}">${h.textContent}</a>`;
    }).join('');
  }

  postComment(postId){
    const name = document.getElementById('commentName')?.value || 'Anonymous';
    const text = document.getElementById('commentText')?.value || '';
    if(!text.trim()){ alert('Please write a comment'); return; }
    const comment = { name, text, date: new Date().toISOString() };
    saveCommentForPost(postId, comment);
    this.renderComments(postId);
    document.getElementById('commentName').value = '';
    document.getElementById('commentText').value = '';
  }

  renderComments(postId){
    const list = getCommentsForPost(postId);
    const container = document.getElementById('commentsList');
    if(!container) return;
    container.innerHTML = list.map(c => `
      <div class="comment-item">
        <div class="comment-head"><strong>${c.name}</strong> <span>${new Date(c.date).toLocaleString()}</span></div>
        <div class="comment-body">${c.text}</div>
      </div>
    `).join('') || '<p>No comments yet — be the first!</p>';
  }

  initScrollProgress(){
    const progressBar = document.querySelector('.post-hero');
    const content = document.querySelector('.post-body-content');
    if(!content || !progressBar) return;

    const tocLinks = document.querySelectorAll('#toc a');
    document.addEventListener('scroll', () => {
      const rect = content.getBoundingClientRect();
      const total = content.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top,0), total);
      const pct = total > 0 ? Math.round((scrolled/total) * 100) : 0;
      // update a small top progress bar via CSS variable
      document.documentElement.style.setProperty('--reading-progress', pct + '%');

      // highlight TOC
      headersLoop: for(const a of tocLinks){
        const target = document.querySelector(a.getAttribute('href'));
        if(!target) continue;
        const tRect = target.getBoundingClientRect();
        if(tRect.top <= 120 && tRect.bottom > 120){
          tocLinks.forEach(x=>x.classList.remove('active'));
          a.classList.add('active');
          break headersLoop;
        }
      }
    });
  }

  share(url, service){
    if(service === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,'_blank');
    else if(service === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank');
    else if(service === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(url)}`,'_blank');
  }
}

const blogEngine = new BlogEngine();
