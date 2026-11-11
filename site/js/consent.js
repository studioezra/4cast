/* 4Cast cookie consent (2026-11-10)
   Nothing that sets third-party cookies runs until the visitor agrees:
   - Google Analytics: gtag.js is only loaded after "Accept" (or Analytics switched on in settings)
   - Google Maps (Contact page): the iframes only load after consent, or when the visitor clicks "Load map"
   The choice lives on the visitor's device (localStorage) and can be changed any time from "Cookie settings" in the footer. */
(() => {
  const KEY = '4cast-consent';
  const GA = 'G-XC0TZMRKWG';
  const root = document.documentElement;
  let choice = null;   // { analytics: bool, maps: bool, at: ISO date } once the visitor has chosen
  try { choice = JSON.parse(localStorage.getItem(KEY)); } catch (e) { /* storage blocked: ask again */ }
  const has = k => !!(choice && choice[k]);

  /* Google consent defaults, set before the page's gtag snippet runs; advertising is never used */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: has('analytics') ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });

  /* ---------- Google Analytics ---------- */
  let gaLoaded = false;
  const analytics = on => {
    window['ga-disable-' + GA] = !on;
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: on ? 'granted' : 'denied' });
    if (on && !gaLoaded) {
      gaLoaded = true;
      const s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
      document.head.appendChild(s);
    }
    if (!on) {   // withdrawn: remove the cookies Analytics left behind
      document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => /^_ga/.test(n)).forEach(n => {
        const host = location.hostname, bare = host.replace(/^www\./, '');
        ['', host, '.' + bare].forEach(d => { document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : ''); });
      });
    }
  };
  analytics(has('analytics'));

  /* ---------- Google Maps ---------- */
  const maps = on => {
    document.querySelectorAll('iframe[data-consent-src]').forEach(f => {
      const box = f.parentElement, ph = box.querySelector('.ck-map');
      if (on) { if (!f.src) f.src = f.dataset.consentSrc; f.hidden = false; if (ph) ph.remove(); }
      else if (!f.src && !ph) {
        f.hidden = true;
        const p = document.createElement('div');
        p.className = 'ck-map';
        p.innerHTML = '<p>This map is provided by Google Maps, which may set its own cookies.</p><button type="button" class="ck-btn ck-btn--solid">Load map</button>';
        p.querySelector('button').addEventListener('click', () => { save({ analytics: has('analytics'), maps: true }); maps(true); });
        box.appendChild(p);
      }
    });
  };

  const save = c => {
    choice = { analytics: !!c.analytics, maps: !!c.maps, at: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) { /* ignore */ }
  };
  const apply = () => { analytics(has('analytics')); maps(has('maps')); };

  /* ---------- banner and settings ---------- */
  const build = () => {
    maps(has('maps'));

    const bar = document.createElement('section');
    bar.className = 'ck-bar';
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = `
      <p class="ck-bar__txt">We are using cookies to give you the best experience on our website.<br>
      You can find out more about which cookies we are using or switch them off in <button type="button" class="ck-link" data-ck-settings>settings</button>.</p>
      <div class="ck-bar__btns">
        <button type="button" class="ck-btn" data-ck="reject">Reject</button>
        <button type="button" class="ck-btn ck-btn--solid" data-ck="accept">Accept</button>
      </div>`;

    const dlg = document.createElement('dialog');
    dlg.className = 'ck-dlg';
    dlg.setAttribute('aria-labelledby', 'ck-title');
    const row = (k, name, text, fixed) => `
      <li class="ck-row">
        <div><h3 class="ck-row__h" id="ck-h-${k}">${name}</h3><p class="ck-row__p">${text}</p></div>
        ${fixed ? '<span class="ck-row__on">Always on</span>'
                : `<button type="button" class="ck-sw" role="switch" aria-checked="false" aria-labelledby="ck-h-${k}" data-k="${k}"><span></span></button>`}
      </li>`;
    dlg.innerHTML = `
      <div class="ck-dlg__head">
        <h2 class="ck-dlg__title" id="ck-title">Cookie settings</h2>
        <button type="button" class="ck-x" aria-label="Close cookie settings"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <ul class="ck-rows">
        ${row('necessary', 'Necessary', 'Remember your cookie choice and your accessibility settings. This stays on your device.', true)}
        ${row('analytics', 'Analytics', 'Google Analytics shows us how visitors use the site, so we can improve it.')}
        ${row('maps', 'Maps', 'Google Maps shows our offices on the Contact page. Google may set its own cookies.')}
      </ul>
      <p class="ck-dlg__more"><a href="https://app.websitepolicies.com/policies/view/ri08ru6c" target="_blank" rel="noopener">Cookie policy</a></p>
      <div class="ck-dlg__btns">
        <button type="button" class="ck-btn" data-ck="reject">Reject all</button>
        <button type="button" class="ck-btn" data-ck="save">Save settings</button>
        <button type="button" class="ck-btn ck-btn--solid" data-ck="accept">Accept all</button>
      </div>`;

    document.body.prepend(bar);
    document.body.appendChild(dlg);

    /* keep the accessibility button above the bar */
    const sizeVar = () => root.style.setProperty('--ck-h', bar.offsetHeight + 'px');
    const ro = window.ResizeObserver ? new ResizeObserver(sizeVar) : null;
    const showBar = on => {
      bar.hidden = !on; root.classList.toggle('has-ck', on);
      if (on) { sizeVar(); if (ro) ro.observe(bar); } else if (ro) ro.disconnect();
    };
    showBar(!choice);

    const sws = [...dlg.querySelectorAll('.ck-sw')];
    const syncSw = () => sws.forEach(s => s.setAttribute('aria-checked', has(s.dataset.k)));
    sws.forEach(s => s.addEventListener('click', () => s.setAttribute('aria-checked', s.getAttribute('aria-checked') !== 'true')));

    let opener = null;
    const openSettings = e => { opener = e && e.currentTarget; syncSw(); dlg.showModal(); };
    const closeSettings = () => { dlg.close(); };
    dlg.addEventListener('close', () => { if (opener && document.contains(opener)) opener.focus(); opener = null; });
    dlg.addEventListener('click', e => { if (e.target === dlg) closeSettings(); });
    dlg.querySelector('.ck-x').addEventListener('click', closeSettings);
    document.querySelectorAll('[data-ck-settings]').forEach(b => b.addEventListener('click', openSettings));

    const decide = c => {
      save(c); apply(); showBar(false);
      if (dlg.open) closeSettings();
    };
    document.querySelectorAll('[data-ck]').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.ck;
      if (a === 'accept') decide({ analytics: true, maps: true });
      else if (a === 'reject') decide({ analytics: false, maps: false });
      else decide(Object.fromEntries(sws.map(s => [s.dataset.k, s.getAttribute('aria-checked') === 'true'])));
    }));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
