# 4Cast website: deployment instructions

**Domain:** https://4cast-ai.com
**What it is:** a static website made of HTML, CSS, JavaScript, images and videos. There is no build step, no server-side code and no database.

## 1. Upload

- Upload the **contents** of the `site/` folder to the web root. That is 101 files, about 18 MB.
- Include the two hidden files: `.htaccess` and `_redirects`.
- Do not upload anything outside `site/`. In particular, the `source/` folder and the `.md` files are working files only.
- Replace the old site completely. The new site uses the same domain.

## 2. Domain and HTTPS

- Install an SSL certificate for `4cast-ai.com` and `www.4cast-ai.com`.
- Set up 301 redirects to the one official address, `https://4cast-ai.com`:
  - `http://` → `https://`
  - `www.4cast-ai.com` → `4cast-ai.com`

## 3. Old page addresses (301 redirects)

These keep Google rankings and existing links working:

| Old URL | New URL |
|---|---|
| `/about-us/` | `/about.html` |
| `/4cast-decision-intelligence-platform/` | `/platform.html` |
| `/defense-national-security/` | `/defense.html` |
| `/critical-infrastructure-enterprise/` | `/utilities.html` |
| `/government-agencies/` | `/government.html` |
| `/contact-us/` | `/contact.html` |

The redirects are already written for these hosts:
- **Apache / cPanel:** `.htaccess`. It needs `mod_rewrite`, and `AllowOverride` must permit it.
- **Netlify / Cloudflare Pages:** `_redirects`.
- **Other servers (Nginx, IIS, Vercel):** set up the six redirects above by hand. They should work with or without the trailing slash.

## 4. Not-found page

Serve `/404.html` with an HTTP **404** status for any missing address. `.htaccess` already does this on Apache.

## 5. Server settings

- **Compression:** turn on gzip or Brotli for `.html`, `.css`, `.js`, `.svg`, `.xml` and `.txt`.
- **Caching:**
  - HTML: no long cache.
  - `.css` and `.js`: at most 1 day, because some of these files have no version number in their name.
  - Images, fonts and videos: 30 days is fine.
- **Videos:** `.mp4` files must be served as `video/mp4` with byte-range requests enabled (the default on most servers).
- **Content Security Policy:** if you set one, allow these services:
  - `www.googletagmanager.com` and `*.google-analytics.com` (Google Analytics, which only loads after cookie consent)
  - `maps.google.com` and `www.google.com` (map frames on the Contact page)

## 6. Check after going live

- [ ] All 7 pages load over HTTPS without warnings: `/`, `/platform.html`, `/defense.html`, `/government.html`, `/utilities.html`, `/about.html`, `/contact.html`.
- [ ] `http://` and `www.` addresses redirect to `https://4cast-ai.com`.
- [ ] Each old URL in the table redirects (301) to its new page.
- [ ] A made-up address, for example `/test-123`, shows the 4Cast "page not found" page.
- [ ] Videos play: the homepage header and the 8 videos on the Platform page.
- [ ] The cookie bar appears on the first visit. After **Accept**, Google Analytics records the visit.
- [ ] `https://4cast-ai.com/robots.txt` and `https://4cast-ai.com/sitemap.xml` open.
- [ ] Submit `https://4cast-ai.com/sitemap.xml` in Google Search Console.
