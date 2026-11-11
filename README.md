# 4Cast website

Static HTML, CSS and JavaScript. No build step.


## Folders

```
site/                  everything that goes live
  *.html               the 7 pages: index, platform, defense, government, utilities, about, contact
  css/                 styles.css (the whole design), fonts.css (self-hosted Poppins),
                       a11y.css (accessibility toolbar), consent.css (cookie bar)
  js/                  main.js (homepage), one script per inner page,
                       platform.js (shared by the inner pages: menu, header, legal dialog),
                       a11y.js (accessibility toolbar), consent.js (cookie consent and Google Analytics)
  assets/              images, videos, fonts, icons, logos and the legal PDF, one folder per topic
  favicon.ico, apple-touch-icon.png, robots.txt, sitemap.xml
                       stay at the top level: browsers and search engines look for them there
source/                original material (review file, documents, raw photos and videos), not published, not in git
DESIGN.md              the design system
PRODUCT.md             product context and copy rules
```
