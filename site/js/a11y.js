/* 4Cast accessibility toolbar (2026-11-10)
   Built in house, no third-party service. Loaded in <head> so saved settings apply before the page paints.
   Settings live on the visitor's own device (localStorage) and follow them from page to page.
   Features: text size (3 steps), readable font, high contrast, stop animations, highlight links, strong focus, reset. */
(() => {
  const KEY = '4cast-a11y';
  const root = document.documentElement;
  const FLAGS = ['font', 'contrast', 'still', 'links', 'focus'];
  let state = { size: 0, font: false, contrast: false, still: false, links: false, focus: false };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { /* storage blocked: start from defaults */ }

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };
  const apply = () => {
    root.classList.remove('a11y-size-1', 'a11y-size-2');
    if (state.size) root.classList.add('a11y-size-' + state.size);
    FLAGS.forEach(f => root.classList.toggle('a11y-' + f, !!state[f]));
  };
  apply();

  /* "Stop animations" also has to reach the page scripts: they ask matchMedia('(prefers-reduced-motion: reduce)'),
     so that query answers true while the setting is on (read live, so it holds after a toggle too),
     and videos refuse to start while it is on */
  const realMM = window.matchMedia.bind(window);
  window.matchMedia = q => {
    const mq = realMM(q);
    if (!/prefers-reduced-motion:\s*reduce/.test(q)) return mq;
    return {
      get matches() { return state.still || mq.matches; },
      media: mq.media, onchange: null,
      addEventListener: (...a) => mq.addEventListener(...a), removeEventListener: (...a) => mq.removeEventListener(...a),
      addListener: f => mq.addListener(f), removeListener: f => mq.removeListener(f),
    };
  };
  const realPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () { return state.still ? Promise.resolve() : realPlay.call(this); };
  const stopped = new Set();
  const setStill = on => {
    document.querySelectorAll('video').forEach(v => {
      if (on && !v.paused) { stopped.add(v); v.pause(); }
      else if (!on && stopped.has(v)) { const p = realPlay.call(v); if (p) p.catch(() => {}); }
    });
    if (!on) stopped.clear();
  };

  const ICON = {
    a11y: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle class="head" cx="12" cy="5" r="2.1"/><path d="M5.2 8.6c2.3.7 4.5 1 6.8 1s4.5-.3 6.8-1M12 9.6v4.6M12 14.2l-2.8 5.6M12 14.2l2.8 5.6"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    font: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19 9.5 5h1L16 19M6.3 14h7.4M17 11v8M17 11c1.6 0 3 .9 3 2.5S18.6 16 17 16"/></svg>',
    contrast: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" class="f"/></svg>',
    still: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.5v7M14 8.5v7"/></svg>',
    links: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    focus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.5"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"/><path d="M4.5 4.5V9H9"/></svg>',
  };
  const TOGGLES = [
    ['font', 'Readable font'], ['contrast', 'High contrast'], ['still', 'Stop animations'],
    ['links', 'Highlight links'], ['focus', 'Strong focus'],
  ];
  const SIZES = ['Default', 'Large', 'Larger'];

  const build = () => {
    const wrap = document.createElement('div');
    wrap.className = 'a11y';
    wrap.innerHTML = `
      <button type="button" class="a11y__fab" aria-expanded="false" aria-controls="a11y-panel">${ICON.a11y}<span class="sr">Accessibility settings</span></button>
      <div class="a11y__panel" id="a11y-panel" role="dialog" aria-labelledby="a11y-title" hidden>
        <div class="a11y__head">
          <h2 class="a11y__title" id="a11y-title">Accessibility</h2>
          <button type="button" class="a11y__x" aria-label="Close accessibility settings">${ICON.close}</button>
        </div>
        <div class="a11y__size" role="group" aria-labelledby="a11y-size-l">
          <span class="a11y__size-l" id="a11y-size-l">Text size</span>
          <div class="a11y__stepper">
            <button type="button" class="a11y__step" data-d="-1" aria-label="Smaller text">A<sup>−</sup></button>
            <span class="a11y__lvl" aria-live="polite"></span>
            <button type="button" class="a11y__step" data-d="1" aria-label="Larger text">A<sup>+</sup></button>
          </div>
        </div>
        <div class="a11y__grid">
          ${TOGGLES.map(([k, l]) => `<button type="button" class="a11y__t" data-k="${k}" aria-pressed="false">${ICON[k]}<span>${l}</span></button>`).join('')}
          <button type="button" class="a11y__t a11y__reset">${ICON.reset}<span>Reset all</span></button>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const fab = wrap.querySelector('.a11y__fab'), panel = wrap.querySelector('.a11y__panel');
    const lvl = wrap.querySelector('.a11y__lvl'), steps = wrap.querySelectorAll('.a11y__step');
    const sync = () => {
      lvl.textContent = SIZES[state.size];
      steps[0].disabled = state.size === 0; steps[1].disabled = state.size === 2;
      wrap.querySelectorAll('.a11y__t[data-k]').forEach(b => b.setAttribute('aria-pressed', !!state[b.dataset.k]));
      fab.classList.toggle('is-on', state.size > 0 || FLAGS.some(f => state[f]));
    };
    const open = on => {
      panel.hidden = !on; fab.setAttribute('aria-expanded', on);
      if (on) panel.querySelector('.a11y__x').focus();
    };
    fab.addEventListener('click', () => open(panel.hidden));
    wrap.querySelector('.a11y__x').addEventListener('click', () => { open(false); fab.focus(); });
    wrap.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); open(false); fab.focus(); } });
    document.addEventListener('click', e => { if (!panel.hidden && !wrap.contains(e.target)) open(false); });

    steps.forEach(b => b.addEventListener('click', () => {
      state.size = Math.max(0, Math.min(2, state.size + +b.dataset.d)); apply(); save(); sync();
    }));
    wrap.querySelectorAll('.a11y__t[data-k]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.k; state[k] = !state[k];
      if (k === 'still') setStill(state.still);
      apply(); save(); sync();
    }));
    wrap.querySelector('.a11y__reset').addEventListener('click', () => {
      const wasStill = state.still;
      state = { size: 0, font: false, contrast: false, still: false, links: false, focus: false };
      if (wasStill) setStill(false);
      apply(); save(); sync();
    });
    sync();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
