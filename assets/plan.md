# Project Audit and Refactor Plan

## Current Architecture

- Pages are built as static HTML with a shared style/script layer and page-specific JS/data for dynamic content.
- `assets/css/shared.css` is the primary stylesheet used by all pages.
- `assets/js/shared.js` contains global site behavior: theme toggle, nav scroll state, mobile menu, search overlay, custom cursor, button ripple, reveal animations, counters, hero typing, helix interactions, and ambient background.
- `assets/js/pages-data.js` and `assets/js/pages.js` power the generic dynamic renderer at `page.html` and support search.
- Page-specific JS files exist for each section/hub: `grammar.js`, `literature.js`, `poetry.js`, `vocabulary.js`, `quiz.js`, `past-papers.js`, `blog.js`, `lesson.js`.
- Data files are split by content type: `lessons-data.js`, `poetry-data.js`, `literature-data.js`, `vocabulary-data.js`, `quiz-data.js`, `past-papers-data.js`, `blog-data.js`.
- There are duplicate unused root-level assets in the project root: `shared.css`, `shared.js`. All HTML pages reference `assets/css/shared.css` and `assets/js/shared.js` instead.

## Pages Inventory

- Main pages with unified hero/navigation pattern: `index.html`, `grammar.html`, `poetry.html`, `literature.html`, `vocabulary.html`, `quiz.html`, `blog.html`, `poetry.html`, `literature.html`.
- Generic dynamic pages using `page.html`: `page.html` plus slug-based links for fallback content like `contact`, `blog-post`, `student-dashboard`, `teacher-dashboard`, `admin-dashboard`.
- Dedicated detail pages: `poem.html`, `literature-detail.html`, `lesson.html`, `blog-post.html`, `past-papers.html`, `contact.html`, `login.html`, `register.html`, `student-dashboard.html`, `teacher-dashboard.html`, `admin-dashboard.html`.
- Error page: `404.html`.

## Major Inconsistencies and Issues

- Navigation differs across sections:
  - Main hub pages share one nav style.
  - `past-papers.html` uses an entirely different `glass-nav` implementation.
  - dashboards and admin pages use separate navbar layouts and do not reuse the main nav.
- Routing is inconsistent:
  - Some pages still use `page.html?slug=...` while dedicated `.html` routes exist for many pages.
  - The generic `page.html` renderer remains in use and overlaps with dedicated pages.
- Page-specific visual styles are not centralized:
  - Several pages contain inline `<style>` blocks (`login.html`, `register.html`, `student-dashboard.html`, `teacher-dashboard.html`, `quiz.html`, `blog.html`, `blog-post.html`, `contact.html`, `404.html`).
  - This violates the goal of page-specific CSS files and creates duplication.
- Admin and teacher panels are mock/demonstration-only:
  - `admin-dashboard.html` is a placeholder and lacks authentication or content management.
  - `teacher-dashboard.html` and `student-dashboard.html` are styled differently from the core design system.
- UI/UX issues:
  - Some inline styles and nav/menu structures differ from the main design language.
  - The login page references a missing image `assets/images/auth-illus.png`.
  - `past-papers.html` uses inconsistent footer and header placement.
  - Multiple pages still point to `page.html?slug=` for contact, login, register, and admin despite dedicated pages.
- Accessibility and SEO gaps:
  - Not all pages include meta description or consistent Open Graph data.
  - Focus and keyboard support is implemented globally, but some page-specific controls may not match.
  - There are broken or inconsistent alt text cases and missing metadata.
- Cursor issue detection:
  - Unused root-level `shared.css` contains `cursor:none` on body and button, but active stylesheet in `assets/css/shared.css` does not.
  - This suggests legacy asset duplication rather than active bugs in production page load.

## Technical Dependencies

- `assets/js/shared.js` depends on the DOM structure of the main navigation and search overlay.
- Pages that include GSAP also need `ScrollTrigger` loaded from CDN for hero, scroll animations, and helix layout interactions.
- Search overlay relies on global data arrays exposed by page-specific data files: `LESSONS`, `PAGES`, `POEMS`, `LITERATURE_WORKS`, `VOCABULARY_WORDS`, `VOCABULARY_IDIOMS`, `QUIZZES`, `PAST_PAPERS`, `BLOG_POSTS`.
- The generic `page.html` route depends on `pages-data.js` and is the last fallback for slugs.

## Recommended Refactor Plan

1. Audit and stabilize the current codebase.
   - Confirm active stylesheet/script files.
   - Identify pages still using duplicate or legacy assets.
   - Map every page route and link target.
2. Create a centralized design system in `assets/css/shared.css`.
   - Move global tokens and reusable components into the shared stylesheet.
   - Keep only core page primitives and common layout there.
3. Extract page-specific styles into dedicated CSS files.
   - Create `login.css`, `register.css`, `student-dashboard.css`, `teacher-dashboard.css`, `past-papers.css`, `blog.css`, `blog-post.css`, etc.
   - Remove inline styles from HTML.
4. Unify navigation and footer.
   - Standardize the header across all pages with one nav structure and mobile behavior.
   - Use a shared footer component on all pages.
5. Replace deprecated `page.html?slug=` usage with direct `.html` pages where possible.
   - Keep `page.html` only for truly generic fallback content.
6. Build a real admin flow.
   - Protect `admin-dashboard.html` behind a secure login mechanism.
   - Keep the admin password hidden and stored only in JS as part of an application flow, not visible in UI content.
7. Audit and unify dashboards.
   - Align student, teacher, and admin dashboards with the premium UI language.
   - Preserve data-driven charts and widgets but bring them into the shared theme.
8. Perform QA pass.
   - Verify nav links, buttons, forms, search, mobile layouts, cursor behavior, and watch for console errors.
   - Ensure pages are responsive, accessible, and consistent.

## Next Immediate Step

- Begin with the design system refactor and page-specific CSS extraction.
- After that, unify the navbar and footer across all pages.
- Then secure the admin panel and align dashboards.

## Notes

- The current project already has a strong premium visual direction with glassmorphism, animated backgrounds, and a central shared behavior layer.
- The main remediation required is structural: remove duplicate legacy assets, unify page structure, and centralize styling while preserving the existing interactive experience.
