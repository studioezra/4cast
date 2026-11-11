/* 4Cast homepage: night chart, beam reveal, bearings, sectors */
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  // pause/play buttons (WCAG 2.2.2): the label says what the next click does
  const setMo = (b, paused, what) => { b.classList.toggle('is-paused', paused); b.setAttribute('aria-label', (paused ? 'Play ' : 'Pause ') + what); };
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- nav ---------- */
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
  $$('.nav__menu a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) toggle.click();
  }));
  const subs = $$('.has-sub > button');
  const closeSubs = except => subs.forEach(b => b !== except && b.setAttribute('aria-expanded', 'false'));
  subs.forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      const open = b.getAttribute('aria-expanded') !== 'true';
      closeSubs(b); b.setAttribute('aria-expanded', open);
    });
    const li = b.parentElement;
    li.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover) and (min-width:901px)').matches) { closeSubs(b); b.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('mouseleave', () => { if (matchMedia('(hover:hover) and (min-width:901px)').matches) b.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openB = subs.find(b => b.getAttribute('aria-expanded') === 'true');
    if (openB) { closeSubs(); openB.focus(); }
    else if (nav.classList.contains('is-open')) { toggle.click(); toggle.focus(); }
  });

  /* ---------- helpers ---------- */
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const el = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const smooth = (pts, closed = true) => {
    const n = pts.length; let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d + (closed ? 'Z' : '');
  };
  const jitter = (pts, r, amp, steps = 3) => {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length]; out.push(a);
      const off = a[0] > 9e3 || b[0] > 9e3;
      for (let k = 1; k < steps; k++) {
        const t = k / steps, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
        const j = (r() - .5) * amp * (off ? 0 : 1);
        out.push([a[0] + dx * t - dy / len * j, a[1] + dy * t + dx / len * j]);
      }
    }
    return out;
  };
  const inPoly = (x, y, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;
  const arcPath = (cx, cy, r, a0, a1) => {
    const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))], p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
    return `M${p0[0]} ${p0[1]}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${p1[0]} ${p1[1]}`;
  };
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  /* ---------- hero: video + word-by-word reveal ---------- */
  const hero = $('.hero'), video = $('.hero__video'), copy = $('.hero__copy');
  let heroVisible = true, wi = 0;
  $$('.hero__title .hl--lead').forEach(line => {
    const words = line.textContent.trim().split(/\s+/);
    line.textContent = '';
    words.forEach((w, k) => {
      const sp = document.createElement('span'); sp.className = 'hw'; sp.style.setProperty('--i', wi++); sp.textContent = w;
      line.appendChild(sp); if (k < words.length - 1) line.appendChild(document.createTextNode(' '));
    });
  });
  copy.style.setProperty('--words', wi);
  copy.classList.add('is-split');
  let heroHeld = false;
  const playHero = () => { if (RM.matches || !heroVisible || heroHeld) return; const p = video.play(); if (p) p.catch(() => {}); };
  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
  if (video.readyState >= 3) playHero(); else video.addEventListener('canplay', playHero, { once: true });
  playHero();
  const heroBtn = $('.hero__pause');
  if (heroBtn) heroBtn.addEventListener('click', () => {
    heroHeld = !heroHeld; setMo(heroBtn, heroHeld, 'background video');
    $('.hero').classList.toggle('is-still', heroHeld);
    if (heroHeld) video.pause(); else playHero();
  });

  /* logo strip */
  const railBtn = $('.rail__pause');
  if (railBtn) railBtn.addEventListener('click', () => {
    const on = !railBtn.classList.contains('is-paused'); setMo(railBtn, on, 'logo strip');
    $('#logo-rail').classList.toggle('is-paused', on);
  });

  /* ---------- bearings (five decisions) ---------- */
  const D = [
    { q: 'Are we ready to execute the mission today?', scr: 'Readiness status', img: 'app-readiness.jpg', v: 'Ready to deploy. Not ready to sustain.', s: 'Move beyond static readiness percentages by evaluating personnel, equipment, training, availability and sustainment against actual mission requirements.' },
    { q: 'Where should resources go right now?', scr: 'Plan optimization', img: 'app-plan.jpg', v: 'Where should limited resources be invested?', s: 'Enables transparent, explainable resource allocation decisions across regions and mission sets.' },
    { q: 'What do we gain and risk with A versus B?', scr: 'Course of Action comparison', img: 'app-coa.jpg', v: 'Trade-off: Speed vs. sustainment resilience.', s: 'Present ranked options with transparent trade-offs and impact.' },
    { q: 'How long can we operate like this?', scr: 'Sustainment Under Threat', img: 'app-sustain.jpg', v: 'Know What the Mission Will Need - Before the Mission Creates the Demand.', s: '4Cast connects operational demand with logistics, personnel, equipment, maintenance, mobility and critical infrastructure to help leaders understand whether - and for how long - an operation can be sustained.' },
    { q: 'What breaks first, and how do we prevent it?', scr: 'Supply Chain Bottlenecks', img: 'app-supply.jpg', v: 'Conditions move faster than plans; risk must be reassessed continuously.', s: 'Operational Endurance: identify emerging resource, equipment, personnel or infrastructure constraints.' }
  ];
  D.forEach(d => { const i = new Image(); i.src = 'assets/img/' + d.img; });
  const tabs = $$('#dx-tabs [role="tab"]'), panel = $('#d-panel'), dxBar = $('#dx-bar');
  const consoleEl = $('#console'), dxGlow = $('#dx-glow');
  // each decision takes its own stop on the brand ramp: bright for light, deep for text grounds
  const HUE = ['#a46ad6', '#7c7ff0', '#4f93ec', '#45a6ea', '#5cc0ee'];
  const HUE_DEEP = ['#6b3399', '#3f45ad', '#1f62b5', '#1a6fae', '#18729f'];
  let cur = 0;
  // the sky marker follows the chosen word
  function placeTabs() {
    const t = tabs[cur]; if (!t) return;
    dxBar.style.transform = `translateY(${t.offsetTop}px)`;
    dxBar.style.height = t.offsetHeight + 'px';
    const cb = consoleEl.getBoundingClientRect(), tb = t.getBoundingClientRect();
    dxGlow.style.transform = `translateY(${tb.top - cb.top + tb.height / 2 - dxGlow.offsetHeight / 2}px)`;
    consoleEl.style.setProperty('--hue', HUE[cur]);
    consoleEl.style.setProperty('--hue-prev', HUE[Math.max(0, cur - 1)]);
    consoleEl.style.setProperty('--hue-deep', HUE_DEEP[cur]);
  }
  function select(i, focus) {
    if (i === cur && panel.dataset.ready) return;
    const prev = cur; cur = i; panel.dataset.ready = 1;
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tabs[i].id);
    if (focus) tabs[i].focus();
    placeTabs();
    restartTimer();
    const d = D[i];
    const apply = () => {
      $('#d-q').textContent = d.q; $('#d-s').textContent = d.s; $('#d-v').textContent = d.v;
      $('#d-scr').textContent = '4Cast · ' + d.scr;
      const img = $('#d-img'); img.src = 'assets/img/' + d.img; img.alt = `4Cast ${d.scr} screen, illustrative demo data`;
      panel.classList.remove('is-swap');
    };
    if (RM.matches || prev === i) apply();
    else { panel.classList.add('is-swap'); setTimeout(apply, 180); }
  }
  // autoplay: each decision holds for 5s while its line grows, then the next one comes in
  const dx = $('#dx'), dxFill = $('#dx-fill'), dxGrid = $('.bearings__grid--dx');
  let held = false, inView = false, dxHeld = false;
  function restartTimer() {
    dx.classList.remove('is-playing');
    void dxFill.offsetWidth; // restart the CSS animation from zero
    if (!RM.matches) dx.classList.add('is-playing');
    syncPause();
  }
  function syncPause() { dx.classList.toggle('is-paused', held || dxHeld || !inView || document.hidden); }
  dxFill.addEventListener('animationend', () => { if (!held && !dxHeld && inView) select((cur + 1) % tabs.length); });
  dxGrid.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { held = true; syncPause(); } });
  dxGrid.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { held = false; restartTimer(); } });
  dxGrid.addEventListener('focusin', () => { held = true; syncPause(); });
  dxGrid.addEventListener('focusout', e => { if (!dxGrid.contains(e.relatedTarget)) { held = false; restartTimer(); } });
  document.addEventListener('visibilitychange', syncPause);
  const dxBtn = $('.dx__pause');
  if (dxBtn) dxBtn.addEventListener('click', () => { dxHeld = !dxHeld; setMo(dxBtn, dxHeld, 'decision rotation'); syncPause(); });
  new IntersectionObserver(es => es.forEach(e => {
    const was = inView; inView = e.isIntersecting;
    if (inView && !was) restartTimer(); else syncPause();
  }), { threshold: .35 }).observe(consoleEl);

  // hover picks on desktop, with a short intent delay so sweeping across the list doesn't flicker
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let hoverT;
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => { clearTimeout(hoverT); select(i); });
    t.addEventListener('pointerenter', () => { if (!fine.matches) return; clearTimeout(hoverT); hoverT = setTimeout(() => select(i), 110); });
    t.addEventListener('pointerleave', () => clearTimeout(hoverT));
    t.addEventListener('keydown', e => {
      const k = e.key; let n = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = (cur + 1) % tabs.length;
      if (k === 'ArrowLeft' || k === 'ArrowUp') n = (cur - 1 + tabs.length) % tabs.length;
      if (k === 'Home') n = 0; if (k === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); select(n, true); }
    });
  });

  /* ---------- ROI figures: each number rolls up digit by digit, one card at a time ---------- */
  const figNums = $$('.figure__n');
  const LAPS = 2; // full spins before a digit lands
  figNums.forEach(f => {
    const txt = f.textContent.trim();
    f.setAttribute('aria-label', txt); f.setAttribute('role', 'text');
    f.textContent = '';
    let j = 0;
    for (const ch of txt) {
      if (/\d/.test(ch)) {
        const col = document.createElement('span'); col.className = 'fd'; col.setAttribute('aria-hidden', 'true');
        const strip = document.createElement('span'); strip.className = 'fd__strip';
        for (let k = 0; k < LAPS * 10 + 10; k++) { const d = document.createElement('span'); d.textContent = k % 10; strip.appendChild(d); }
        strip.dataset.to = LAPS * 10 + +ch; strip.style.setProperty('--j', j++);
        col.appendChild(strip); f.appendChild(col);
      } else {
        const x = document.createElement('span'); x.className = 'fx'; x.setAttribute('aria-hidden', 'true'); x.textContent = ch; f.appendChild(x);
      }
    }
  });
  const land = (f, instant) => $$('.fd__strip', f).forEach(st => {
    if (instant) st.style.transition = 'none';
    st.style.transform = `translateY(${-st.dataset.to}em)`;
  });
  document.documentElement.classList.add('figs-seq');
  if (RM.matches) figNums.forEach(f => { land(f, true); f.closest('.figure').classList.add('is-shown'); });
  else {
    const figIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      figIO.disconnect();
      // left to right: each card starts after the previous one has landed
      // one card at a time: it rises in, its digits roll and land, then the next card follows
      figNums.forEach((f, k) => {
        const card = f.closest(".figure"), t = 200 + k * 500;
        setTimeout(() => card.classList.add('is-shown'), t);
        setTimeout(() => land(f), t + 280);
      });
    }), { threshold: .45 });
    figIO.observe($('.figures'));
  }

  /* ---------- Hebrew privacy policy: opens the PDF in a dialog ---------- */
  const pdfDlg = $('#pdf-dialog'), pdfFrame = $('#pdf-dialog-frame');
  $$('[data-pdf-dialog]').forEach(a => a.addEventListener('click', e => {
    if (!pdfDlg.showModal) return; // very old browsers: follow the link
    e.preventDefault();
    if (pdfFrame.getAttribute('src') !== a.getAttribute('href')) pdfFrame.src = a.getAttribute('href');
    pdfDlg.showModal();
    document.body.style.overflow = 'hidden';
  }));
  $('#pdf-dialog-close').addEventListener('click', () => pdfDlg.close());
  pdfDlg.addEventListener('click', e => { if (e.target === pdfDlg) pdfDlg.close(); }); // backdrop click
  pdfDlg.addEventListener('close', () => { document.body.style.overflow = ''; });

  /* ---------- closing headline: a softer echo of the hero entrance ---------- */
  const closeSec = $('#demo'), closeHeavy = $('#close-title .t-heavy');
  if (closeSec && closeHeavy) {
    let ci = 0;
    const words = closeHeavy.textContent.trim().split(/\s+/);
    closeHeavy.textContent = '';
    words.forEach((w, k) => {
      const sp = document.createElement('span'); sp.className = 'cw'; sp.style.setProperty('--i', ci++); sp.textContent = w;
      closeHeavy.appendChild(sp); if (k < words.length - 1) closeHeavy.appendChild(document.createTextNode(' '));
    });
    closeSec.classList.add('is-armed');
    const cIO = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { closeSec.classList.add('is-play'); cIO.disconnect(); }
    }), { threshold: .35 });
    cIO.observe(closeSec);
  }

  /* ---------- sector panels: one opens wide, the rest fold to a label ---------- */
  const panels = $$('.panel');
  const openPanel = p => panels.forEach(x => {
    const on = x === p;
    x.classList.toggle('is-open', on);
    $('.panel__head', x).setAttribute('aria-expanded', on);
  });
  const finePanel = matchMedia('(hover: hover) and (pointer: fine)');
  let panelT;
  panels.forEach(p => {
    $('.panel__head', p).addEventListener('click', () => openPanel(p));
    p.addEventListener('pointerenter', () => { if (!finePanel.matches) return; clearTimeout(panelT); panelT = setTimeout(() => openPanel(p), 90); });
    p.addEventListener('pointerleave', () => clearTimeout(panelT));
  });

  /* sector panels autoplay: advance every 4.5s while in view; pause while the visitor is hovering or focused inside */
  const panelsEl = $('#panels');
  if (panelsEl && !RM.matches) {
    let pHeld = false, pInView = false, pTimer, pUser = false;
    const desktop = matchMedia('(min-width: 901px)');
    const nextPanel = () => {
      if (RM.matches) return; // "Stop animations" switched on in the accessibility toolbar
      const cur = panels.findIndex(x => x.classList.contains('is-open'));
      openPanel(panels[(cur + 1) % panels.length]);
    };
    const schedule = () => {
      clearInterval(pTimer);
      if (pInView && !pHeld && !pUser && desktop.matches && !document.hidden) pTimer = setInterval(nextPanel, 4500);
    };
    panelsEl.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { pHeld = true; schedule(); } });
    panelsEl.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { pHeld = false; schedule(); } });
    panelsEl.addEventListener('focusin', () => { pHeld = true; schedule(); });
    panelsEl.addEventListener('focusout', e => { if (!panelsEl.contains(e.relatedTarget)) { pHeld = false; schedule(); } });
    panelsEl.addEventListener('click', schedule); // a click restarts the 4.5s before moving on
    document.addEventListener('visibilitychange', schedule);
    desktop.addEventListener('change', schedule);
    const pBtn = $('.panels__pause');
    if (pBtn) pBtn.addEventListener('click', () => { pUser = !pUser; setMo(pBtn, pUser, 'sector rotation'); schedule(); });
    new IntersectionObserver(es => es.forEach(e => { pInView = e.isIntersecting; schedule(); }), { threshold: .4 }).observe(panelsEl);
  }

  /* ---------- section entrances (staggered, once) ---------- */
  const groups = [
    ['#problem .h2', '#problem .prose > *'], ['.console__title', '.bearings__grid'], ['.statement'],
    ['#platform .h2', '#platform .lede'], ['.steps > li'], ['.motto'],
    ['#why .h2'], ['.superiority'],
    ['#serve .h2', '#serve .arch'], ['.panels'], ['.also'],
    ['.storm-band .t-thin', '.storm-band .t-heavy']
  ];
  const rvIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); rvIO.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  groups.forEach(sels => {
    const els = sels.flatMap(s => $$(s));
    els.forEach((n, k) => { n.classList.add('rv'); n.style.setProperty('--rv', Math.min(k, 6)); rvIO.observe(n); });
  });

  /* ---------- lifecycle ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.target === hero) { heroVisible = e.isIntersecting; if (heroVisible) playHero(); else video.pause(); }
  }), { threshold: 0 });
  io.observe(hero);

  const layoutAll = () => {
    placeTabs();
  };
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layoutAll, 150); });

  const start = () => { placeTabs(); select(0); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else window.addEventListener('load', start);
})();
