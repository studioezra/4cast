/* 4Cast utilities page: nav, legal dialog and the header entrance come from platform.js;
   this adds the decision tabs, the animated FAQ and the section entrances */
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const EASE = 'cubic-bezier(.23, 1, .32, 1)';

  /* decisions leaders must make: tabs with arrow-key support */
  const tabs = $$('.df-tab');
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

  /* FAQ: answers slide open and closed, one open at a time */
  const faqs = $$('.gv-faq__item');
  const setOpen = (d, open) => {
    const body = d.querySelector('.gv-faq__a');
    d.classList.toggle('is-open', open);
    if (d._anim) d._anim.cancel();
    if (RMQ.matches) { d.open = open; return; }
    if (open) {
      d.open = true;
      d._anim = body.animate([{ height: '0px', opacity: 0 }, { height: body.scrollHeight + 'px', opacity: 1 }], { duration: 420, easing: EASE });
    } else {
      d._anim = body.animate([{ height: body.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: EASE });
      d._anim.onfinish = () => { d.open = false; };
    }
  };
  faqs.forEach(d => d.querySelector('summary').addEventListener('click', e => {
    e.preventDefault();
    const open = !d.classList.contains('is-open');
    if (open) faqs.forEach(o => { if (o !== d && o.classList.contains('is-open')) setOpen(o, false); });
    setOpen(d, open);
  }));

  /* outcome figures: the homepage ROI roll, each number spins up digit by digit, one card at a time */
  const figNums = $$('.ut-figures .figure__n');
  const LAPS = 2;
  figNums.forEach(f => {
    const txt = f.textContent.trim();
    f.setAttribute('aria-label', txt); f.setAttribute('role', 'text');
    f.textContent = '';
    let j = 0;
    // digits become rolling columns; symbols stay with the number, and a following word ("faster") stays whole
    for (const part of txt.match(/\d|\s+[^\d]+|[^\d\s]+/g)) {
      if (/\d/.test(part)) {
        const col = document.createElement('span'); col.className = 'fd'; col.setAttribute('aria-hidden', 'true');
        const strip = document.createElement('span'); strip.className = 'fd__strip';
        for (let k = 0; k < LAPS * 10 + 10; k++) { const d = document.createElement('span'); d.textContent = k % 10; strip.appendChild(d); }
        strip.dataset.to = LAPS * 10 + +part; strip.style.setProperty('--j', j++);
        col.appendChild(strip); f.appendChild(col);
      } else {
        const word = /^\s/.test(part); // a word after the number ("faster") goes on its own line
        const x = document.createElement('span'); x.className = word ? 'fx fx--word' : 'fx'; x.setAttribute('aria-hidden', 'true'); x.textContent = part.trim(); f.appendChild(x);
      }
    }
  });
  const land = (f, instant) => $$('.fd__strip', f).forEach(st => {
    if (instant) st.style.transition = 'none';
    st.style.transform = `translateY(${-st.dataset.to}em)`;
  });
  if (figNums.length) {
    document.documentElement.classList.add('figs-seq');
    if (RMQ.matches) figNums.forEach(f => { land(f, true); f.closest('.figure').classList.add('is-shown'); });
    else {
      const figIO = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        figIO.disconnect();
        figNums.forEach((f, k) => {
          const card = f.closest('.figure'), t = 200 + k * 500;
          setTimeout(() => card.classList.add('is-shown'), t);
          setTimeout(() => land(f), t + 280);
        });
      }), { threshold: .45 });
      figIO.observe(document.querySelector('.ut-figures'));
    }
  }

  /* section entrances */
  if (RMQ.matches) return;
  const groups = [
    ['.ut-stack'],
    ['.ut-challenges .gv-kicker', '#ut-ch-title', '.ut-ch'],
    ['.ut-decisions .gv-kicker', '#ut-dec-title', '.ut-tabs', '.ut-panel:not([hidden])'],
    ['#ut-cap-title', '.ut-capabilities .gv-cap'],
    ['#ut-out-title'],
    ['.ut-why .gv-kicker', '#ut-why-title', '.ut-why__p'],
    ['#ut-storm-title', '.ut-storm__p', '.ut-storm__grid > div'],
    ['.ut-infra .gv-kicker', '#ut-inf-title', '.ut-inf'],
    ['#gv-faq-title', '.gv-faq__item'], ['.gv-close'],
  ];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => sels.flatMap(s => $$(s)).forEach((n, k) => {
    n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 6)); io.observe(n);
  }));
})();
