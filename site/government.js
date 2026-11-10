/* 4Cast government page: nav, legal dialog and the header entrance come from platform.js;
   this adds the section entrances and keeps one FAQ answer open at a time */
(() => {
  const faqs = [...document.querySelectorAll('.gv-faq__item')];
  const RMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const EASE = 'cubic-bezier(.23, 1, .32, 1)';
  // open and close each answer with a height + fade animation; one answer open at a time
  const setOpen = (d, open) => {
    const body = d.querySelector('.gv-faq__a');
    d.classList.toggle('is-open', open);
    if (d._anim) d._anim.cancel();
    if (RMQ.matches) { d.open = open; return; }
    if (open) {
      d.open = true;
      const h = body.scrollHeight;
      d._anim = body.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 420, easing: EASE });
    } else {
      const h = body.offsetHeight;
      d._anim = body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: EASE });
      d._anim.onfinish = () => { d.open = false; };
    }
  };
  faqs.forEach(d => d.querySelector('summary').addEventListener('click', e => {
    e.preventDefault();
    const open = !d.classList.contains('is-open');
    if (open) faqs.forEach(o => { if (o !== d && o.classList.contains('is-open')) setOpen(o, false); });
    setOpen(d, open);
  }));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = [
    ['.gv-challenge .gv-kicker', '#gv-ch-title', '.gv-challenge .gv-lead', '.gv-imp'], ['.gv-intuition'],
    ['.gv-solution .gv-kicker', '#gv-sol-title', '.gv-solution .gv-lead', '.gv-cap'],
    ['.gv-agencies .gv-kicker', '#gv-ag-title', '.gv-agency'],
    ['#gv-why-title', '.gv-why'],
    ['#gv-faq-title', '.gv-faq__item'], ['.gv-close'],
  ];
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => sels.flatMap(s => [...document.querySelectorAll(s)]).forEach((n, k) => {
    n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 6)); io.observe(n);
  }));
})();
