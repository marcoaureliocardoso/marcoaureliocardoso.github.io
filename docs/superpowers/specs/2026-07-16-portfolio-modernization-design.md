# Portfolio Modernization Design

## Goal

Rebuild Marco Aurelio Cardoso's portfolio as a modern, accessible, bilingual static website that positions him primarily as a backend developer focused on Laravel, with Spring as the next specialization, while preserving the simplicity and reliability of GitHub Pages.

## Audience and Positioning

The primary audience is international and Brazilian recruiters, engineering managers, and technical peers. English is the default language and Portuguese is available through a persistent language switcher.

The primary headline is **Backend Developer**, supported by **Laravel, Spring, APIs, and DevOps**. Infrastructure and operations experience remain part of the professional story, but they support rather than overshadow backend development.

The professional summary must state that Marco is diving deep into agentic coding tools, specifically Claude Code and Codex. The Portuguese version should communicate the same meaning naturally rather than translate it mechanically.

## Architecture

The site will use semantic HTML, modern CSS, and dependency-free JavaScript. It will not use jQuery, Gulp, Node Sass, Bootstrap, or Font Awesome. This removes the obsolete build chain and allows the source committed to the repository to be served directly by GitHub Pages.

Content translations will live in structured JavaScript dictionaries keyed by stable identifiers. English content is rendered initially in the HTML for search engines and no-script users. The language switcher updates translatable text, document metadata, accessibility labels, and the document language. The selected language is stored in `localStorage`; on a first visit, English remains the default regardless of browser locale.

## Information Architecture

The single-page site contains:

1. A skip link and accessible fixed navigation.
2. A hero section with name, backend headline, concise value proposition, social links, contact action, and professional-profile action.
3. An about section connecting long-term institutional experience to backend engineering and current study of Claude Code and Codex.
4. An experience timeline led by the current IFES role, followed by UFES and earlier roles, using achievement-oriented descriptions without inventing metrics.
5. A featured projects section for SGC, DSpace, and Zabbix/infrastructure work, clearly distinguishing public source code from institutional work without a public repository.
6. A focused skills section ordered as Backend, Frameworks, Data, Delivery/DevOps, and Agentic Coding.
7. Education, courses, and recognition, avoiding claims of professional certification when the evidence is course completion.
8. A contact section and concise footer.

## Visual Design

The existing blue identity is retained but refined into a more distinctive dark navy and cyan palette with high contrast. The layout uses generous spacing, restrained gradients, cards with subtle borders, and typography available from the system font stack so the page does not depend on third-party font delivery.

The interface is responsive from small mobile screens through large desktops. Motion is subtle and disabled when `prefers-reduced-motion` is active. Decorative effects never interfere with content legibility.

## Accessibility

All interactive elements use native buttons or links. The mobile menu exposes state with `aria-expanded`, supports keyboard navigation, closes on Escape, and restores focus. Images have meaningful alternative text or empty alternative text when decorative. Icon links have accessible names. Focus indicators remain visible. Color contrast targets WCAG 2.2 AA.

Every link opened in a new tab uses `rel="noopener noreferrer"`. The page includes a skip link, logical heading hierarchy, landmarks, labeled controls, and a non-color-only indication of interactive state.

## SEO and Metadata

The default English document includes a descriptive title, meta description, canonical URL, Open Graph metadata, Twitter card metadata, theme color, and Person JSON-LD. Language switching updates the title and description client-side. The canonical URL remains `https://marcocardoso.com.br/`.

The favicon and CNAME are retained. A robots file and sitemap are added for the canonical domain.

## Resume

The stale PDF will no longer be the primary source of truth. The visible website content must accurately show IFES as the current role and UFES as a previous role. The old resume download will be removed from the primary interface until an updated PDF is supplied or generated from verified data; the call to action will point to LinkedIn as the current complete professional record.

No employment dates, responsibilities, metrics, credentials, or proficiency claims may be invented. Existing facts from the current site, repository, approved context, personal site, and public LinkedIn profile may be used when verifiable.

## Reliability and Link Handling

Public links are validated during implementation. The unavailable DSpace URL will not be presented as a functioning live demo; its card will describe the work without a broken action. External links use secure protocols and accessible labels.

The site must remain useful if JavaScript is unavailable: English content, navigation, projects, and contact links stay readable. JavaScript enhances language switching and the mobile navigation only.

## Repository Maintenance

Obsolete package metadata, lockfile, Gulp configuration, SCSS sources, and bundled third-party libraries are removed when they are no longer referenced. The README is replaced with project-specific setup, structure, content-editing, accessibility, and deployment instructions.

A lightweight validation script may use only the Python or Node standard library already available in the environment. It checks required metadata, translation key parity, internal anchors, image alternatives, unsafe blank-target links, and disallowed legacy dependencies. No production dependency installation is required.

## Testing and Acceptance Criteria

The implementation is complete when:

- English renders by default and Portuguese can be selected and persists across reloads.
- All visible navigation and core content are translated.
- The headline and skills reflect Backend, Laravel first, Spring second, APIs, DevOps, Claude Code, and Codex.
- IFES is current and UFES is historical everywhere in the site.
- The stale resume is not promoted as current.
- There are no references to jQuery, Node Sass, Gulp, Bootstrap, or Font Awesome in the delivered page.
- Automated validation passes with no missing translation keys, broken internal anchors, missing image alternatives, or unsafe new-tab links.
- The page has no browser console errors at desktop and mobile viewport sizes.
- Keyboard navigation, mobile menu behavior, language switching, reduced motion, and visible focus are manually verified.
- The live/in-scope external links are checked and unavailable links are not exposed as working demos.
- The repository README accurately documents the delivered project.

## Out of Scope

- A backend, CMS, analytics platform, contact-form service, blog engine, or framework migration.
- Invented performance metrics, endorsements, certifications, or project outcomes.
- Publishing or pushing changes without explicit user authorization.
- Generating a new resume PDF from incomplete or unverified employment details.
