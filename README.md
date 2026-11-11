# 4Cast website

Static HTML, CSS and JavaScript. No build step.


## Folders

```
site/                  everything that goes live (upload the contents of this folder)
  index.html           homepage
  platform.html        4Cast Platform
  defense.html         Defense & National Security
  government.html      Government & Emergency Management
  utilities.html       Utilities & Critical Infrastructure
  about.html           About Us
  contact.html         Contact Us
  404.html             "page not found" page
  css/                 styles.css (the whole design), fonts.css (self-hosted Poppins),
                       a11y.css (accessibility toolbar), consent.css (cookie bar)
  js/                  main.js (homepage), platform.js (shared by the inner pages: menu, header, legal dialog),
                       defense.js, government.js, utilities.js, about.js (one per inner page),
                       a11y.js (accessibility toolbar), consent.js (cookie consent and Google Analytics)
  assets/
    about/             About page header photo
    brand/             4Cast logo and the link-share image
    defense/           Defense page header photo
    fonts/             Poppins font files
    government/        Government page header photo
    icons/             site icons (browser tab, Google)
    img/               product screens on the homepage
    legal/             Hebrew privacy policy PDF
    logos/             client and partner logos
    platform/          Platform page videos and header photo
    sectors/           homepage sector photos (sources in credits.json)
    team/              team photos
    values/            value icons on the About page
    video/             homepage hero video and its still image
  favicon.ico, apple-touch-icon.png, robots.txt, sitemap.xml
                       stay at the top level: browsers and search engines look for them there
  .htaccess, _redirects
                       old site addresses -> new pages, for Apache and for Netlify / Cloudflare
parked/                sections taken off the site but kept for later (not published)
  government-faq.html  "Getting to Know 4Cast" FAQ from the Government page, with steps to restore it
source/                original material (review file, documents, raw photos and videos), on this computer only, not in git
DEPLOY.md              upload instructions for the IT admin
DESIGN.md              the design system
PRODUCT.md             product context and copy rules
```
