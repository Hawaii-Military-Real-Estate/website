# Hawaii Military Realty, Inc

Static site for Hawaii Military Realty.

## Generated Content

All public HTML pages are generated from `src/content.js` into `build/`.

```bash
./build.sh
```

Edit page, about, agent, and team content in `src/content.js`, then run the build
before previewing or publishing. The generated publish files include:

- `build/index.html`
- `build/about.html`
- `build/team.html`
- `build/agents/*.html`

`src/` is the source tree. `build/` is ignored by git and is what GitHub Pages
publishes.
