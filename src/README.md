# Hawaii Military Real Estate — Static Site

Hand-coded HTML, CSS, and vanilla JS. No build step. No framework. Drop the folder on any static host (Netlify, Cloudflare Pages, Nginx, Apache, GitHub Pages…) and you're live.

## File layout

```
index.html
about.html
services.html
team.html
testimonials.html
featured-listing.html
contact.html
404.html
robots.txt
assets/
  css/styles.css
  js/site.js
  images/...
```

## Editing global things (one place each)

Open **`assets/js/site.js`** — top of the file:

- **`CONTACT`** — phone, email, address, social links
- **`NAV`** — header & footer menu (add/remove items here; both update)
- **`CTA_DEFAULTS`** — default headline/subtitle/note for the bottom CTA

To override the CTA copy on a specific page, set data-attributes on the placeholder, e.g.:

```html
<div id="site-cta"
     data-title="Let's Work Together"
     data-subtitle="Call or text us today."
     data-note="Available 7 days a week."></div>
```

## Editing colours / design tokens

Open **`assets/css/styles.css`** — `:root` block at the top. Change the hex
values for `--primary`, `--accent`, `--ocean-deep`, etc., and the whole site
updates.

## Performance

- No frameworks, no bundlers — pages are <30 KB HTML each
- Single shared CSS + JS (cached after first load)
- Images are lazy-loaded except the LCP hero, which is preloaded
- Reveal-on-scroll uses `IntersectionObserver` (free, native)

## Adding a new page

1. Copy any existing page (e.g. `about.html`) and edit content
2. Add the link to `NAV` in `assets/js/site.js`
3. Done — header, footer, and CTA inject themselves
