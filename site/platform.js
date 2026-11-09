/* 4Cast platform page: nav, legal dialog, staggered entrances, per-capability light */
(() => {
  document.documentElement.classList.add('js');
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- nav (same behaviour as the homepage) ---------- */
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const toggle = $('.nav__toggle');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', open);
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.nav__menu a').forEach(a => a.addEventListener('click', () => { if (nav.classList.contains('is-open')) toggle.click(); }));
  const subs = $$('.has-sub > button');
  const closeSubs = except => subs.forEach(b => b !== except && b.setAttribute('aria-expanded', 'false'));
  const wide = () => matchMedia('(hover:hover) and (min-width:901px)').matches;
  subs.forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); const open = b.getAttribute('aria-expanded') !== 'true'; closeSubs(b); b.setAttribute('aria-expanded', open); });
    const li = b.parentElement;
    li.addEventListener('mouseenter', () => { if (wide()) { closeSubs(b); b.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('mouseleave', () => { if (wide()) b.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openB = subs.find(b => b.getAttribute('aria-expanded') === 'true');
    if (openB) { closeSubs(); openB.focus(); }
    else if (nav.classList.contains('is-open')) { toggle.click(); toggle.focus(); }
  });

  /* ---------- Hebrew privacy policy dialog ---------- */
  const pdfDlg = $('#pdf-dialog'), pdfFrame = $('#pdf-dialog-frame');
  if (pdfDlg) {
    $$('[data-pdf-dialog]').forEach(a => a.addEventListener('click', e => {
      if (!pdfDlg.showModal) return;
      e.preventDefault();
      if (pdfFrame.getAttribute('src') !== a.getAttribute('href')) pdfFrame.src = a.getAttribute('href');
      pdfDlg.showModal(); document.body.style.overflow = 'hidden';
    }));
    $('#pdf-dialog-close').addEventListener('click', () => pdfDlg.close());
    pdfDlg.addEventListener('click', e => { if (e.target === pdfDlg) pdfDlg.close(); });
    pdfDlg.addEventListener('close', () => { document.body.style.overflow = ''; });
  }

  /* ---------- capability videos: loop while on screen, pause when off it ---------- */
  const vids = $$('.cap__video');
  if (!RM.matches) {
    const vIO = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.dataset.done) { const p = v.play(); if (p) p.catch(() => {}); } } else v.pause();
    }), { threshold: .25 });
    vids.forEach(v => vIO.observe(v));
  }
  // plays once, then pauses on its last frame with a "Play again" button over it
  vids.forEach(v => {
    const btn = v.parentElement.querySelector('.cap__replay');
    if (!btn) return;
    v.addEventListener('ended', () => { v.dataset.done = '1'; btn.hidden = false; setTimeout(() => btn.classList.add('is-on'), 20); });
    btn.addEventListener('click', () => {
      btn.classList.remove('is-on'); btn.hidden = true; delete v.dataset.done;
      v.currentTime = 0; const p = v.play(); if (p) p.catch(() => {});
    });
  });

  /* ---------- each capability takes its own stop on the brand ramp ---------- */
  const HUE = ['#a46ad6', '#8f72e6', '#7c7ff0', '#6688ef', '#4f93ec', '#469ceb', '#45a6ea', '#50b3ec', '#5cc0ee'];
  $$('.cap').forEach((c, i) => {
    c.style.setProperty('--hue', HUE[i % HUE.length]);
    c.style.setProperty('--hue-prev', HUE[Math.max(0, i - 1)]);
  });

  /* ---------- entrances: heading block, then each capability (text then screen) ---------- */
  const groups = [['.pf-title', '.pf-sub', '.pf-intro > *']];
  $$('.cap').forEach(c => groups.push([`#${c.id} .cap__text`, `#${c.id} .cap__media`]));
  groups.push(['#trust-title'], ['.pillar']);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => {
    sels.flatMap(s => $$(s)).forEach((n, k) => { n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 6)); io.observe(n); });
  });
  if (RM.matches) $$('.rv').forEach(n => n.classList.add('is-in'));
})();
