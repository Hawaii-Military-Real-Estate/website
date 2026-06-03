# Hawaii Military Realty, Inc

Static site for Hawaii Military Realty.

## Generated Content

All public HTML pages are generated from source content and templates into `build/`.

```bash
./build.sh
```

Use `src/content.js` for plain text content only. Use `src/templates/` for page structure, markup, classes, SVGs, and reusable partials. Generated publish files include:

- `build/index.html`
- `build/about.html`
- `build/team.html`
- `build/agents/*.html`

`src/` is the source tree. `build/` is ignored by git and is what GitHub Pages publishes.
