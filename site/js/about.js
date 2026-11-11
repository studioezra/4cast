/* 4Cast about page: nav, legal dialog and the header entrance come from platform.js;
   this adds the journey timeline, the team bio popup and the section entrances */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* journey timeline: the line fills up to a point 60% down the screen, and each year
     lights up once the line has reached its dot (same as the Defense page) */
  const body = document.querySelector('.df-tl__body');
  const steps = $$('.df-tl__step');
  const track = document.querySelector('.df-tl__track');
  if (body) {
    let queued = false;
    const update = () => {
      queued = false;
      const r = track.getBoundingClientRect();
      const end = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
      const mark = end ? innerHeight * 2 : innerHeight * .6;
      const p = RM ? 1 : Math.min(1, Math.max(0, (mark - r.top) / r.height));
      body.style.setProperty('--p', p.toFixed(4));
      steps.forEach(s => {
        const n = s.querySelector('.df-tl__n').getBoundingClientRect();
        s.classList.toggle('is-lit', RM || n.top + n.height / 2 <= Math.max(mark, r.top));
      });
    };
    const ask = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', ask, { passive: true });
    addEventListener('resize', ask);
    update();
  }

  /* team: each card opens its full bio in a dialog; focus returns to the card on close */
  const dlg = document.getElementById('ab-bio');
  const dlgBody = dlg.querySelector('.ab-bio__body');
  let opener = null;
  $$('.ab-member').forEach(b => b.addEventListener('click', () => {
    opener = b;
    dlgBody.replaceChildren(document.getElementById(b.dataset.bio).content.cloneNode(true));
    dlg.showModal();
    dlg.scrollTop = 0;
  }));
  const close = () => {
    if (RM || !dlg.animate) return dlg.close();
    dlg.classList.add('is-closing');
    dlg.addEventListener('animationend', () => { dlg.classList.remove('is-closing'); dlg.close(); }, { once: true });
  };
  dlg.querySelector('.ab-bio__close').addEventListener('click', close);
  dlg.addEventListener('click', e => { if (e.target === dlg) close(); });   // backdrop click
  dlg.addEventListener('cancel', e => { e.preventDefault(); close(); });     // Esc
  dlg.addEventListener('close', () => { if (opener) opener.focus(); });

  /* section entrances */
  if (RM) return;
  const groups = [
    ['.df-tl__head'],
    ['#ab-v-title', '.ab-vals .gv-cap'],
    ['#ab-t-title', '.ab-grid li'],
    ['.ab-malam__p'],
  ];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => sels.flatMap(s => $$(s)).forEach((n, k) => {
    n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 7)); io.observe(n);
  }));
})();
