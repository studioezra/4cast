# 4Cast website — homepage (work in progress)

Static HTML/CSS/JS. No build step.

## View it

Open `site/index.html` in a browser, or serve the folder (recommended, so the video and PDF load properly):

```bash
python3 -m http.server 4848 --directory site
```

Then open http://localhost:4848

## Files

- `site/index.html`, `site/styles.css`, `site/main.js` — the homepage
- `site/assets/` — logo, hero video, product screens, client logos, sector photos, legal PDF
- `PRODUCT.md` — product context and copy rules
- `DESIGN.md` — the design system

## Notes

- Copy is taken word for word from the approved materials. ROI figures, client logos and some security claims are still pending approval.
- Sector photos in `site/assets/sectors/` are public-domain stand-ins (sources in `credits.json`).
- Most navigation links are intentionally not wired yet.
