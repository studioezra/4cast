/* 4Cast defense page: nav, legal dialog and entrances come from platform.js; this adds the solution-family tabs */
(() => {
  const tabs = [...document.querySelectorAll('.df-tab')];
  const select = (t, focus) => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
      else if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
      else if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
  });

  /* four-step timeline: the line fills up to a point 60% down the screen, and each step
     lights up once the line has reached its number */
  const body = document.querySelector('.df-tl__body');
  const steps = [...document.querySelectorAll('.df-tl__step')];
  const track = document.querySelector('.df-tl__track');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (body) {
    let queued = false;
    const update = () => {
      queued = false;
      const r = track.getBoundingClientRect();
      // near the end of the page the last step may never reach 60%, so the bottom of the page completes it
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

  /* entrances for this page's sections (the header is handled by platform.js) */
  if (RM) return;
  const groups = [['#df-layer-title', '.df-loop', '.df-node', '.df-beams', '.df-core'], ['.df-tabs', '.df-panel:not([hidden])'], ['.df-tl__head']];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => sels.flatMap(s => [...document.querySelectorAll(s)]).forEach((n, k) => {
    n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 6)); io.observe(n);
  }));
})();
