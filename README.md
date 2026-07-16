# marcocardoso.com.br

Bilingual professional portfolio for Marco Aurelio Cardoso, served directly by
GitHub Pages at [marcocardoso.com.br](https://marcocardoso.com.br/).

The site presents a backend-focused professional profile with Laravel as the
primary framework, Spring as the next specialization, and supporting experience
across APIs, data, DevOps, Claude Code, and Codex.

## Stack

- Semantic HTML
- Modern CSS with responsive and reduced-motion support
- Dependency-free JavaScript modules
- Node.js standard-library validation
- GitHub Pages with a custom domain

There is no package installation or build step. The files committed to the
repository are the files served in production.

## Local preview

Run a static HTTP server from the repository root:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/>. A server is required because browser ES
modules do not run reliably through `file://`.

## Validation

```powershell
node tests/validate-site.mjs
```

The validator checks required metadata, semantic landmarks, internal anchors,
image alternatives, safe external links, translation parity, accessibility
states, responsive CSS, and the absence of legacy dependencies.

## Content and translations

English fallback content lives in `index.html`, so the page remains useful when
JavaScript is unavailable. English and Brazilian Portuguese dictionaries live in
`js/translations.mjs`; both dictionaries must contain identical keys.

When adding visible translatable content:

1. Add a stable `data-i18n` key to the HTML element.
2. Add the same key to both dictionaries.
3. Use `data-i18n-aria` for accessible labels and `data-i18n-alt` for images.
4. Run the validator before committing.

English is always the first-visit default. A visitor's explicit language choice
is stored locally and restored on later visits.

## Accessibility

The interface uses native controls, visible focus states, semantic landmarks, a
skip link, meaningful image alternatives, keyboard-operable navigation, and a
reduced-motion mode. External links opened in a new tab include isolation
attributes.

## SEO

The canonical domain is `https://marcocardoso.com.br/`. Default English metadata,
Open Graph fields, a Twitter card, Person JSON-LD, `robots.txt`, and `sitemap.xml`
are maintained in the repository root.

## Deployment

GitHub Pages publishes the `master` branch. The custom domain is defined in
`CNAME`. Review and merge changes into `master` to deploy; no generated files or
dependency artifacts are required.
