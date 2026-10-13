# Learning Roots Royal Academy — website

Static site (HTML, CSS, JavaScript). No build step. Hosted on Netlify, source on GitHub.

## Deploy
1. Replace the contents of the GitHub repository with the files in this folder and commit to `main`.
2. Netlify redeploys automatically. Settings are in `netlify.toml` (publish directory `.`).

## Forms (Netlify Forms)
`contact`, `careers` (CV upload), `scholarship` and `fee-request`. Each has a honeypot and Netlify's reCAPTCHA 2 tick box, and redirects to `/thank-you`.
In Netlify: Site configuration → Forms → Form notifications → add an email notification to
`contact@learningrootsroyalacademy.com` for each form.

## Structure
- `*.html` — pages. `assets/` — `style.css`, `enhance.css`, `rebuild.css`, `site.js`, `dashboard.js`, `data.js`, `img/`.
- `sw.js` + `manifest.webmanifest` — installable app and offline page. Pages are fetched network-first, so updates appear on the next visit.
- `news.html`, `thank-you.html`, `404.html`, `offline.html` are set to `noindex`.
- `admin-dashboard.html`, `teacher-dashboard.html`, `parent-dashboard.html` use sample data in `assets/data.js` and are not linked from the site.
