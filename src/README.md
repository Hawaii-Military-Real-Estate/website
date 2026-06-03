# Hawaii Military Real Estate — Static Site

Mostly hand-coded CSS, JS, assets, and content. All public HTML pages are generated into `../build/` before publishing so visible page content stays DRY and easy to maintain.

## Build step

Edit visible page content in **`content.js`**, then render the publish directory:

```bash
../build.sh
```

The build renders:

- `../build/index.html`
- `../build/about.html`
- `../build/team.html`
- `../build/agents/*.html`

Generated markup includes a comment near the top of generated pages. Do not edit generated files in `../build/` directly; update `content.js` and rebuild.

The `../build/` directory is ignored by git. GitHub Pages builds it in the workflow and publishes that directory.

`content.js` supports HTML strings for rich copy, so content can include paragraphs, line breaks, links, spans, or other inline markup where needed.

Agent ordering is controlled by the optional `sort` value in `content.js`. Agents with a numeric `sort` appear first by number; agents without a sort value appear after them alphabetically.

The About page's featured profile comes from the agent with `featured: true`.

## File layout

```
robots.txt
content.js
assets/
  css/styles.css
  js/site.js
  images/...
```

All `.html` pages are generated into `../build/`.

## Editing global things (one place each)

Open **`js/site.js`** — top of the file:

- **`SITE`** — phone, email, address, nav, social links, and default CTA

To override the CTA copy on a specific page, set data-attributes on the placeholder, e.g.:

```html
<div
  id="site-cta"
  data-title="Let's Work Together"
  data-subtitle="Call or text us today."
  data-note="Available 7 days a week."
></div>
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

1. Add the page object to `content.js`
2. Add the link to `SITE.nav` in `js/site.js`
3. Run `../build.sh`
4. Preview with `../preview.sh`

## Adding a new agent

1. Add the agent object to `content.js`
2. Add the profile image to `assets/`
3. Set `sort` only if the agent should appear before alphabetically sorted agents
4. Run `../build.sh`
5. Preview with `../preview.sh`
