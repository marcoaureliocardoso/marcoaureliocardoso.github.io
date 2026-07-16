# Portfolio Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a dependency-free, bilingual, accessible portfolio that presents Marco Aurelio Cardoso as a backend developer focused on Laravel, Spring, APIs, DevOps, Claude Code, and Codex.

**Architecture:** GitHub Pages serves a semantic English-first `index.html` directly. A browser ES module imports translation dictionaries, applies Portuguese on request, persists the explicit choice, and controls an accessible mobile menu; modern CSS supplies the visual system without third-party libraries. A Node standard-library validation script enforces the structural, SEO, accessibility, translation, and legacy-removal contract.

**Tech Stack:** HTML5, CSS3, browser ES modules, Node.js standard library, GitHub Pages.

## Global Constraints

- English is the initial and default language; Portuguese is available through an explicit persistent switcher.
- Laravel is presented before Spring everywhere frameworks are ordered.
- The professional story includes APIs, DevOps, Claude Code, and Codex without inventing proficiency, metrics, credentials, or outcomes.
- IFES is the current role and UFES is historical.
- No jQuery, Gulp, Node Sass, Bootstrap, Font Awesome, runtime package manager, or third-party font is delivered.
- The canonical URL is exactly `https://marcocardoso.com.br/`.
- The English page remains useful without JavaScript.
- External new-tab links include `rel="noopener noreferrer"`.
- Publishing and pushing remain outside this plan.

---

### Task 1: Executable site contract

**Files:**
- Create: `tests/validate-site.mjs`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: repository files relative to `tests/`.
- Produces: a zero-exit validation command, `node tests/validate-site.mjs`, with one diagnostic per failed rule.

- [ ] **Step 1: Write the failing validator**

Create `tests/validate-site.mjs` with Node standard-library checks. The core helpers and required assertions are:

```js
import { readFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFile(join(root, path), "utf8");

const html = await read("index.html");
check(/<html[^>]+lang="en"/.test(html), "English must be the default document language");
check(/<title>Marco Aurelio Cardoso \| Backend Developer<\/title>/.test(html), "Missing professional title");
check(/<meta\s+name="description"/.test(html), "Missing meta description");
check(/<link\s+rel="canonical"\s+href="https:\/\/marcocardoso\.com\.br\/"/.test(html), "Missing canonical URL");
check(/application\/ld\+json/.test(html), "Missing Person JSON-LD");
check(/data-language="pt-BR"/.test(html), "Missing Portuguese language control");
check(html.indexOf("Laravel") < html.indexOf("Spring"), "Laravel must appear before Spring");
check(/Claude Code/.test(html) && /Codex/.test(html), "Missing agentic coding tools");
check(/IFES/.test(html) && /UFES/.test(html), "Missing verified institutional experience");

for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
  check(/\salt=("[^"]*"|'[^']*')/.test(tag), `Image lacks alt: ${tag}`);
}
for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) ?? []) {
  check(/rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(tag), `Unsafe new-tab link: ${tag}`);
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  check(ids.has(anchor), `Broken internal anchor: #${anchor}`);
}

const banned = [/jquery/i, /node-sass/i, /gulp/i, /bootstrap/i, /font-awesome/i];
for (const pattern of banned) check(!pattern.test(html), `Legacy reference remains: ${pattern}`);

for (const path of ["js/translations.js", "js/scripts.js", "css/styles.css", "robots.txt", "sitemap.xml"]) {
  try { await access(join(root, path)); } catch { failures.push(`Missing required file: ${path}`); }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("Site validation passed.");
```

- [ ] **Step 2: Run the validator against the legacy site**

Run: `node tests/validate-site.mjs`

Expected: exit code 1 with failures for the generic title, missing metadata, missing language control, unsafe links, missing image alternatives, legacy references, and missing site files.

- [ ] **Step 3: Commit the red contract**

Run:

```powershell
git add tests/validate-site.mjs
git commit -m "test: define modern portfolio contract"
```

Expected: one commit containing only the failing structural validator.

---

### Task 2: Semantic English-first page, content, and metadata

**Files:**
- Replace: `index.html`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Reuse: `images/zabbix.png`
- Reuse: `images/dspace.jpg`
- Reuse: `images/employees.jpg`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: verified facts from the current portfolio and the approved design specification.
- Produces: stable element IDs, `data-i18n` keys, `data-i18n-aria` keys, language buttons with `data-language`, and semantic English fallback content consumed by Tasks 3 and 4.

- [ ] **Step 1: Extend the validator for semantic and SEO requirements**

Add these assertions after loading `index.html`:

```js
for (const landmark of ["header", "nav", "main", "footer"]) {
  check(new RegExp(`<${landmark}\\b`).test(html), `Missing ${landmark} landmark`);
}
for (const id of ["about", "experience", "projects", "skills", "education", "contact"]) {
  check(new RegExp(`id="${id}"`).test(html), `Missing section: ${id}`);
}
check(/class="skip-link"/.test(html), "Missing skip link");
check(/property="og:title"/.test(html) && /name="twitter:card"/.test(html), "Missing social metadata");
check(!/Download Resume|Baixar currículo|Resume\/.*\.pdf/i.test(html), "Stale resume remains promoted");
check(!/repositorio\.sead\.ufes\.br/.test(html), "Unavailable DSpace live link remains exposed");
```

- [ ] **Step 2: Run the validator and confirm the new assertions fail**

Run: `node tests/validate-site.mjs`

Expected: exit code 1 including missing landmarks or sections, missing skip link, social metadata, and stale resume promotion.

- [ ] **Step 3: Replace `index.html` with semantic English content**

Use this document skeleton and retain complete, meaningful English text in every translatable element:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Marco Aurelio Cardoso | Backend Developer</title>
  <meta name="description" content="Backend developer focused on Laravel, Spring, APIs, DevOps, and agentic coding tools.">
  <link rel="canonical" href="https://marcocardoso.com.br/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Marco Aurelio Cardoso | Backend Developer">
  <meta property="og:description" content="Backend developer focused on Laravel, Spring, APIs, DevOps, and agentic coding tools.">
  <meta property="og:url" content="https://marcocardoso.com.br/">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#071525">
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" href="css/styles.css">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Marco Aurelio Cardoso","url":"https://marcocardoso.com.br/","jobTitle":"Backend Developer","sameAs":["https://www.linkedin.com/in/marcoaureliocardoso/","https://github.com/marcoaureliocardoso"]}</script>
  <script type="module" src="js/scripts.js"></script>
</head>
<body>
  <a class="skip-link" href="#main-content" data-i18n="a11y.skip">Skip to content</a>
  <header class="site-header">
    <nav aria-label="Primary navigation" data-i18n-aria="nav.primary">
      <a class="brand" href="#top" aria-label="Marco Aurelio Cardoso — home">MAC</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" data-i18n-aria="nav.open">Menu</button>
      <div id="site-menu" class="site-menu">
        <a href="#about" data-i18n="nav.about">About</a>
        <a href="#experience" data-i18n="nav.experience">Experience</a>
        <a href="#projects" data-i18n="nav.projects">Projects</a>
        <a href="#skills" data-i18n="nav.skills">Skills</a>
        <a href="#contact" data-i18n="nav.contact">Contact</a>
        <div class="language-switcher" aria-label="Language" data-i18n-aria="language.label">
          <button type="button" data-language="en" aria-pressed="true">EN</button>
          <button type="button" data-language="pt-BR" aria-pressed="false">PT</button>
        </div>
      </div>
    </nav>
  </header>
  <main id="main-content">
    <section id="top" class="hero" aria-labelledby="hero-title">
      <p class="eyebrow" data-i18n="hero.eyebrow">Backend engineering · Espírito Santo, Brazil</p>
      <h1 id="hero-title">Marco Aurelio Cardoso</h1>
      <p class="hero-role" data-i18n="hero.role">Backend Developer</p>
      <p data-i18n="hero.summary">Building reliable backend systems with Laravel, expanding into Spring, and connecting APIs, data, and DevOps practices.</p>
      <a href="#projects" data-i18n="hero.projects">View selected work</a>
      <a href="https://www.linkedin.com/in/marcoaureliocardoso/" target="_blank" rel="noopener noreferrer" data-i18n="hero.profile">View professional profile</a>
    </section>
    <section id="about"><h2 data-i18n="about.title">About</h2><p data-i18n="about.body">I connect more than a decade of institutional IT experience with backend software development. I am currently diving deep into agentic coding tools such as Claude Code and Codex to improve how I design, test, and deliver software.</p></section>
    <section id="experience" aria-labelledby="experience-title"><h2 id="experience-title" data-i18n="experience.title">Experience</h2></section>
    <section id="projects" aria-labelledby="projects-title"><h2 id="projects-title" data-i18n="projects.title">Selected projects</h2></section>
    <section id="skills" aria-labelledby="skills-title"><h2 id="skills-title" data-i18n="skills.title">Technical focus</h2></section>
    <section id="education" aria-labelledby="education-title"><h2 id="education-title" data-i18n="education.title">Education and learning</h2></section>
    <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title" data-i18n="contact.title">Let's build reliable software</h2></section>
  </main>
  <footer><p>© <span id="current-year">2026</span> Marco Aurelio Cardoso.</p></footer>
</body>
</html>
```

Populate the section bodies from this exact content matrix. Each `title`, `period`, `body`, `label`, and image alternative is a separate `data-i18n` or `data-i18n-alt` value so Task 3 can translate it without inserting HTML:

```js
const content = {
  experience: [
    { organization: "IFES — Federal Institute of Espírito Santo", role: "IT Analyst", period: "2024 — Present", body: "Supporting institutional technology services while strengthening a backend engineering practice centered on maintainable APIs, automation, and reliable delivery." },
    { organization: "UFES — Federal University of Espírito Santo", role: "IT Technician", period: "June 2011 — 2024", body: "Worked across institutional systems, infrastructure, software delivery, and technical support in a long-term public education environment." },
    { organization: "CSI — Solução & Tecnologia", role: "Software Tester", period: "March 2011 — June 2011", body: "Performed software testing and quality activities before moving into the federal education sector." },
    { organization: "Metalser Indústria e Comércio de Aço", role: "IT Technician and Production Planner", period: "February 2007 — August 2009", body: "Combined information technology support with production planning responsibilities in an industrial environment." },
    { organization: "ArcelorMittal Brasil", role: "Intern", period: "February 2006 — December 2006", body: "Started a professional technology path in a large industrial organization." }
  ],
  projects: [
    { title: "SGC — Employee Management System", alt: "Employee management system interface", body: "Contributed to an institutional employee management system, applying web development and maintainable information-management practices.", action: "View source on GitHub", href: "https://github.com/SEAD-UFES/sgc" },
    { title: "DSpace Institutional Repository", alt: "DSpace institutional repository interface", body: "Worked with a DSpace-based repository used to organize and provide access to institutional digital content.", action: "", href: "" },
    { title: "Zabbix Monitoring", alt: "Zabbix infrastructure monitoring dashboard", body: "Supported monitoring practices for institutional services and infrastructure using Zabbix.", action: "", href: "" }
  ],
  skills: [
    { group: "Backend", items: "PHP, Laravel, REST APIs, automated testing" },
    { group: "Next specialization", items: "Java, Spring" },
    { group: "Data", items: "SQL, relational database design" },
    { group: "Delivery and operations", items: "Linux, Git, Docker, Kubernetes, CI/CD, Zabbix" },
    { group: "Agentic coding", items: "Claude Code, Codex" }
  ],
  education: [
    { institution: "Faculdade Focus", course: "Postgraduate specialization in Software Engineering", period: "2021 — April 2022" },
    { institution: "FAESA", course: "Bachelor's degree in Information Technology", period: "2012 — 2019" },
    { institution: "IFES", course: "Technical program in Information Technology", period: "2004 — 2005" }
  ],
  learning: "Coursework in Docker, Kubernetes, automated software testing, relational database design, and Moodle.",
  recognition: "FAESA Academic Merit Awards — 2017 and 2018.",
  contact: "Open to conversations about backend development, Laravel, Spring, APIs, DevOps, and agentic software development."
};
```

Use inline SVG icons with `aria-hidden="true"` and visible or visually-hidden accessible text for GitHub, LinkedIn, WordPress, and Weblate. Every project image receives the exact `alt` above and a matching `data-i18n-alt` key. Do not render an empty project action when `href` is empty.

- [ ] **Step 4: Add crawler files**

Create `robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://marcocardoso.com.br/sitemap.xml
```

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://marcocardoso.com.br/</loc></url>
</urlset>
```

- [ ] **Step 5: Run the validator**

Run: `node tests/validate-site.mjs`

Expected: failures are limited to the not-yet-created JavaScript translation and interaction modules or CSS contract.

- [ ] **Step 6: Commit semantic content**

Run:

```powershell
git add index.html robots.txt sitemap.xml tests/validate-site.mjs
git commit -m "feat: rebuild portfolio content and metadata"
```

---

### Task 3: Bilingual content and accessible interactions

**Files:**
- Create: `js/translations.js`
- Replace: `js/scripts.js`
- Modify: `tests/validate-site.mjs`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Produces: `translations: Record<"en" | "pt-BR", Record<string, string>>`.
- Produces: `setLanguage(language: "en" | "pt-BR"): void` within the browser module.
- Consumes: `[data-i18n]`, `[data-i18n-aria]`, `[data-i18n-alt]`, `[data-language]`, `.menu-toggle`, and `#site-menu` from Task 2.

- [ ] **Step 1: Extend the validator for translation parity and interaction semantics**

Add dynamic imports and key checks:

```js
const { translations } = await import("../js/translations.js");
const englishKeys = Object.keys(translations.en).sort();
const portugueseKeys = Object.keys(translations["pt-BR"]).sort();
check(JSON.stringify(englishKeys) === JSON.stringify(portugueseKeys), "Translation keys differ between languages");
for (const [, key] of html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)) {
  check(key in translations.en, `Missing English translation: ${key}`);
  check(key in translations["pt-BR"], `Missing Portuguese translation: ${key}`);
}
const scripts = await read("js/scripts.js");
check(/localStorage\.setItem\("portfolio-language"/.test(scripts), "Language preference is not persisted");
check(/event\.key === "Escape"/.test(scripts), "Mobile menu does not handle Escape");
check(/aria-expanded/.test(scripts), "Mobile menu state is not exposed");
```

- [ ] **Step 2: Run the validator to establish the failing translation contract**

Run: `node tests/validate-site.mjs`

Expected: exit code 1 because `js/translations.js` is missing.

- [ ] **Step 3: Create complete translation dictionaries**

Create `js/translations.js` and include every key used by the HTML. Follow this exact export shape:

```js
export const translations = {
  en: {
    "meta.title": "Marco Aurelio Cardoso | Backend Developer",
    "meta.description": "Backend developer focused on Laravel, Spring, APIs, DevOps, and agentic coding tools.",
    "a11y.skip": "Skip to content",
    "nav.primary": "Primary navigation",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "language.label": "Language",
    "hero.role": "Backend Developer",
    "about.agentic": "I am diving deep into agentic coding tools such as Claude Code and Codex."
  },
  "pt-BR": {
    "meta.title": "Marco Aurelio Cardoso | Desenvolvedor Backend",
    "meta.description": "Desenvolvedor backend com foco em Laravel, Spring, APIs, DevOps e ferramentas de programação agêntica.",
    "a11y.skip": "Ir para o conteúdo",
    "nav.primary": "Navegação principal",
    "nav.open": "Abrir menu",
    "nav.close": "Fechar menu",
    "language.label": "Idioma",
    "hero.role": "Desenvolvedor Backend",
    "about.agentic": "Estou mergulhando nas ferramentas de programação agêntica Claude Code e Codex."
  }
};
```

Add matching entries for every key referenced by the HTML using this exact English-to-Portuguese content mapping. The dotted key names must be identical in both dictionaries:

```js
const contentPairs = {
  "hero.eyebrow": ["Backend engineering · Espírito Santo, Brazil", "Engenharia backend · Espírito Santo, Brasil"],
  "hero.summary": ["Building reliable backend systems with Laravel, expanding into Spring, and connecting APIs, data, and DevOps practices.", "Construindo sistemas backend confiáveis com Laravel, avançando em Spring e conectando APIs, dados e práticas DevOps."],
  "hero.projects": ["View selected work", "Ver projetos selecionados"],
  "hero.profile": ["View professional profile", "Ver perfil profissional"],
  "about.title": ["About", "Sobre"],
  "about.body": ["I connect more than a decade of institutional IT experience with backend software development.", "Conecto mais de uma década de experiência em TI institucional ao desenvolvimento de software backend."],
  "experience.title": ["Experience", "Experiência"],
  "experience.ifes.organization": ["IFES — Federal Institute of Espírito Santo", "IFES — Instituto Federal do Espírito Santo"],
  "experience.ifes.role": ["IT Analyst", "Analista de TI"],
  "experience.ifes.period": ["2024 — Present", "2024 — Atual"],
  "experience.ifes.body": ["Supporting institutional technology services while strengthening a backend engineering practice centered on maintainable APIs, automation, and reliable delivery.", "Apoiando serviços institucionais de tecnologia enquanto fortaleço uma prática de engenharia backend centrada em APIs sustentáveis, automação e entregas confiáveis."],
  "experience.ufes.organization": ["UFES — Federal University of Espírito Santo", "UFES — Universidade Federal do Espírito Santo"],
  "experience.ufes.role": ["IT Technician", "Técnico de TI"],
  "experience.ufes.period": ["June 2011 — 2024", "Junho de 2011 — 2024"],
  "experience.ufes.body": ["Worked across institutional systems, infrastructure, software delivery, and technical support in a long-term public education environment.", "Atuei com sistemas institucionais, infraestrutura, entrega de software e suporte técnico em um ambiente público de educação de longo prazo."],
  "experience.csi.organization": ["CSI — Solução & Tecnologia", "CSI — Solução & Tecnologia"],
  "experience.csi.role": ["Software Tester", "Testador de software"],
  "experience.csi.period": ["March 2011 — June 2011", "Março de 2011 — Junho de 2011"],
  "experience.csi.body": ["Performed software testing and quality activities before moving into the federal education sector.", "Realizei atividades de teste e qualidade de software antes de ingressar no setor federal de educação."],
  "experience.metalser.organization": ["Metalser Indústria e Comércio de Aço", "Metalser Indústria e Comércio de Aço"],
  "experience.metalser.role": ["IT Technician and Production Planner", "Técnico de TI e planejador de produção"],
  "experience.metalser.period": ["February 2007 — August 2009", "Fevereiro de 2007 — Agosto de 2009"],
  "experience.metalser.body": ["Combined information technology support with production planning responsibilities in an industrial environment.", "Combinei suporte de tecnologia da informação com responsabilidades de planejamento de produção em um ambiente industrial."],
  "experience.arcelor.organization": ["ArcelorMittal Brasil", "ArcelorMittal Brasil"],
  "experience.arcelor.role": ["Intern", "Estagiário"],
  "experience.arcelor.period": ["February 2006 — December 2006", "Fevereiro de 2006 — Dezembro de 2006"],
  "experience.arcelor.body": ["Started a professional technology path in a large industrial organization.", "Iniciei minha trajetória profissional em tecnologia em uma organização industrial de grande porte."],
  "projects.title": ["Selected projects", "Projetos selecionados"],
  "projects.sgc.title": ["SGC — Employee Management System", "SGC — Sistema de Gestão de Colaboradores"],
  "projects.sgc.body": ["Contributed to an institutional employee management system, applying web development and maintainable information-management practices.", "Contribuí para um sistema institucional de gestão de colaboradores, aplicando desenvolvimento web e práticas sustentáveis de gestão da informação."],
  "projects.sgc.action": ["View source on GitHub", "Ver código no GitHub"],
  "projects.sgc.alt": ["Employee management system interface", "Interface do sistema de gestão de colaboradores"],
  "projects.dspace.title": ["DSpace Institutional Repository", "Repositório institucional DSpace"],
  "projects.dspace.body": ["Worked with a DSpace-based repository used to organize and provide access to institutional digital content.", "Atuei com um repositório baseado em DSpace usado para organizar e disponibilizar conteúdo digital institucional."],
  "projects.dspace.alt": ["DSpace institutional repository interface", "Interface do repositório institucional DSpace"],
  "projects.zabbix.title": ["Zabbix Monitoring", "Monitoramento com Zabbix"],
  "projects.zabbix.body": ["Supported monitoring practices for institutional services and infrastructure using Zabbix.", "Apoiei práticas de monitoramento de serviços e infraestrutura institucionais com Zabbix."],
  "projects.zabbix.alt": ["Zabbix infrastructure monitoring dashboard", "Painel de monitoramento de infraestrutura no Zabbix"],
  "skills.title": ["Technical focus", "Foco técnico"],
  "skills.backend": ["Backend", "Backend"],
  "skills.backend.items": ["PHP, Laravel, REST APIs, automated testing", "PHP, Laravel, APIs REST, testes automatizados"],
  "skills.spring": ["Next specialization", "Próxima especialização"],
  "skills.spring.items": ["Java, Spring", "Java, Spring"],
  "skills.data": ["Data", "Dados"],
  "skills.data.items": ["SQL, relational database design", "SQL, modelagem de bancos de dados relacionais"],
  "skills.delivery": ["Delivery and operations", "Entrega e operações"],
  "skills.delivery.items": ["Linux, Git, Docker, Kubernetes, CI/CD, Zabbix", "Linux, Git, Docker, Kubernetes, CI/CD, Zabbix"],
  "skills.agentic": ["Agentic coding", "Programação agêntica"],
  "skills.agentic.items": ["Claude Code, Codex", "Claude Code, Codex"],
  "education.title": ["Education and learning", "Formação e aprendizado"],
  "education.focus.course": ["Postgraduate specialization in Software Engineering", "Pós-graduação em Engenharia de Software"],
  "education.focus.period": ["2021 — April 2022", "2021 — Abril de 2022"],
  "education.faesa.course": ["Bachelor's degree in Information Technology", "Bacharelado em Tecnologia da Informação"],
  "education.faesa.period": ["2012 — 2019", "2012 — 2019"],
  "education.ifes.course": ["Technical program in Information Technology", "Curso técnico em Tecnologia da Informação"],
  "education.ifes.period": ["2004 — 2005", "2004 — 2005"],
  "education.learning": ["Coursework in Docker, Kubernetes, automated software testing, relational database design, and Moodle.", "Cursos em Docker, Kubernetes, testes automatizados de software, modelagem de bancos relacionais e Moodle."],
  "education.recognition": ["FAESA Academic Merit Awards — 2017 and 2018.", "Prêmios de Mérito Acadêmico FAESA — 2017 e 2018."],
  "contact.title": ["Let's build reliable software", "Vamos construir software confiável"],
  "contact.body": ["Open to conversations about backend development, Laravel, Spring, APIs, DevOps, and agentic software development.", "Aberto a conversas sobre desenvolvimento backend, Laravel, Spring, APIs, DevOps e desenvolvimento de software agêntico."],
  "contact.email": ["Send an email", "Enviar e-mail"]
};
```

Also add matching navigation keys (`nav.about`, `nav.experience`, `nav.projects`, `nav.skills`, `nav.contact`), control labels, social-link labels, and footer text using the exact visible English and Portuguese wording already established in the HTML. Build `translations.en` from the first value and `translations["pt-BR"]` from the second value without changing key order.

- [ ] **Step 4: Implement language switching and menu behavior**

Replace `js/scripts.js` with:

```js
import { translations } from "./translations.js";

const supportedLanguages = new Set(["en", "pt-BR"]);
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");

function translateAttribute(selector, attribute, dictionary) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset[attribute];
    if (dictionary[key]) element.setAttribute(attribute === "i18nAria" ? "aria-label" : "alt", dictionary[key]);
  });
}

export function setLanguage(language) {
  const selected = supportedLanguages.has(language) ? language : "en";
  const dictionary = translations[selected];
  document.documentElement.lang = selected;
  document.title = dictionary["meta.title"];
  document.querySelector('meta[name="description"]').content = dictionary["meta.description"];
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  translateAttribute("[data-i18n-aria]", "i18nAria", dictionary);
  translateAttribute("[data-i18n-alt]", "i18nAlt", dictionary);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === selected));
  });
  localStorage.setItem("portfolio-language", selected);
}

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-label", translations[document.documentElement.lang][open ? "nav.close" : "nav.open"]);
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});
menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
document.querySelector("#current-year").textContent = new Date().getFullYear();
const savedLanguage = localStorage.getItem("portfolio-language");
if (supportedLanguages.has(savedLanguage) && savedLanguage !== "en") setLanguage(savedLanguage);
```

Use this exact helper instead of the earlier draft so dataset lookup and target attributes are unambiguous:

```js
function translateAttribute(selector, datasetKey, targetAttribute, dictionary) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset[datasetKey];
    if (dictionary[key]) element.setAttribute(targetAttribute, dictionary[key]);
  });
}
```

Call it as `translateAttribute("[data-i18n-aria]", "i18nAria", "aria-label", dictionary)` and `translateAttribute("[data-i18n-alt]", "i18nAlt", "alt", dictionary)`.

- [ ] **Step 5: Run the validator**

Run: `node tests/validate-site.mjs`

Expected: translation parity, referenced keys, persistence, Escape behavior, and menu state assertions pass; only CSS or repository-cleanup assertions may remain.

- [ ] **Step 6: Commit bilingual behavior**

Run:

```powershell
git add js/translations.js js/scripts.js tests/validate-site.mjs
git commit -m "feat: add bilingual accessible interactions"
```

---

### Task 4: Responsive visual system and accessibility states

**Files:**
- Replace: `css/styles.css`
- Modify: `tests/validate-site.mjs`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: semantic classes and IDs from Task 2 plus `.is-open` and `aria-expanded` state from Task 3.
- Produces: desktop and mobile layouts, visible focus, reduced-motion behavior, and high-contrast components.

- [ ] **Step 1: Add CSS contract assertions**

Add:

```js
const css = await read("css/styles.css");
for (const token of [":focus-visible", "prefers-reduced-motion", "@media", ".skip-link", ".menu-toggle", ".site-menu.is-open"]) {
  check(css.includes(token), `Missing CSS accessibility/responsive token: ${token}`);
}
check(!/@import|fonts\.googleapis/i.test(css), "Third-party font dependency remains");
```

- [ ] **Step 2: Run the validator and confirm CSS failures**

Run: `node tests/validate-site.mjs`

Expected: exit code 1 listing the missing focus, reduced-motion, and responsive tokens.

- [ ] **Step 3: Replace the stylesheet with the approved visual system**

Define the palette and core primitives exactly once:

```css
:root {
  --bg: #071525;
  --surface: #0d2035;
  --surface-raised: #132a42;
  --text: #f3f8fc;
  --muted: #b6c7d8;
  --accent: #45d5e8;
  --accent-strong: #79e7f2;
  --border: rgba(182, 199, 216, 0.2);
  --max-width: 72rem;
  --radius: 1.25rem;
  color-scheme: dark;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
a { color: var(--accent-strong); text-underline-offset: 0.2em; }
:focus-visible { outline: 0.2rem solid var(--accent); outline-offset: 0.25rem; }
.skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 100; transform: translateY(-200%); }
.skip-link:focus { transform: translateY(0); }
.site-menu { display: flex; align-items: center; gap: 1rem; }
.menu-toggle { display: none; }
@media (max-width: 48rem) {
  .menu-toggle { display: inline-flex; }
  .site-menu { display: none; position: absolute; inset: 100% 1rem auto; flex-direction: column; align-items: stretch; background: var(--surface); padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius); }
  .site-menu.is-open { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

Add the following explicit layout rules after the core primitives. Values may only be consolidated into existing custom properties; do not change their rendered dimensions:

```css
.site-header { position: sticky; top: 0; z-index: 50; background: rgba(7, 21, 37, 0.88); border-bottom: 1px solid var(--border); backdrop-filter: blur(1rem); }
.site-header nav, main, footer { width: min(100% - 2rem, var(--max-width)); margin-inline: auto; }
.site-header nav { min-height: 4.5rem; display: flex; align-items: center; justify-content: space-between; }
.brand, .button, .menu-toggle, [data-language] { min-height: 2.75rem; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; }
.hero { min-height: calc(100svh - 4.5rem); display: grid; align-content: center; grid-template-columns: minmax(0, 1.4fr) minmax(16rem, 0.6fr); gap: 3rem; padding-block: 6rem; }
.hero h1 { margin: 0; font-size: clamp(2.75rem, 8vw, 6.5rem); line-height: 0.95; letter-spacing: -0.06em; }
.hero-role { color: var(--accent); font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; }
main > section:not(.hero) { padding-block: 5rem; border-top: 1px solid var(--border); }
.section-heading { max-width: 42rem; margin-bottom: 2rem; }
.timeline, .project-grid, .skill-grid, .education-grid { display: grid; gap: 1rem; }
.timeline { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.project-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.skill-grid, .education-grid { grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
.project-card img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: calc(var(--radius) - 0.4rem); }
.social-links { display: flex; flex-wrap: wrap; gap: 0.75rem; list-style: none; padding: 0; }
.social-links svg { width: 1.25rem; height: 1.25rem; }
.contact-panel { background: linear-gradient(135deg, var(--surface-raised), var(--surface)); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(1.5rem, 5vw, 3.5rem); }
.button { padding-inline: 1.25rem; border: 1px solid var(--accent); background: var(--accent); color: var(--bg); font-weight: 750; text-decoration: none; }
.button.secondary { background: transparent; color: var(--accent-strong); }
.button:hover, .button:focus-visible { filter: brightness(1.08); transform: translateY(-0.1rem); }
@media (max-width: 64rem) { .project-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 48rem) { .hero, .timeline, .project-grid { grid-template-columns: 1fr; } .hero { min-height: auto; padding-block: 4rem; } }
@media print { .site-header, .language-switcher, .menu-toggle { display: none !important; } body { background: white; color: black; } a { color: black; } }
```

- [ ] **Step 4: Run the validator**

Run: `node tests/validate-site.mjs`

Expected: all site, translation, SEO, accessibility, and CSS assertions pass unless legacy repository files are still present.

- [ ] **Step 5: Commit the visual system**

Run:

```powershell
git add css/styles.css tests/validate-site.mjs
git commit -m "feat: add responsive accessible visual system"
```

---

### Task 5: Remove legacy tooling, document, and perform end-to-end verification

**Files:**
- Replace: `README.md`
- Modify: `tests/validate-site.mjs`
- Delete: `package.json`
- Delete: `package-lock.json`
- Delete: `gulpfile.js`
- Delete: `scss/`
- Delete: `libs/`
- Delete: stale resume PDF under `Resume/`
- Delete: unreferenced legacy compiled assets after confirming `index.html` does not reference them
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: the completed static site from Tasks 2–4.
- Produces: a dependency-free repository, contributor documentation, and final validation evidence.

- [ ] **Step 1: Extend the validator for repository cleanup**

Add:

```js
for (const path of ["package.json", "package-lock.json", "gulpfile.js", "scss", "libs"]) {
  try {
    await access(join(root, path));
    failures.push(`Legacy path remains: ${path}`);
  } catch {}
}
const readme = await read("README.md");
check(/marcocardoso\.com\.br/.test(readme), "README lacks the production URL");
check(/node tests\/validate-site\.mjs/.test(readme), "README lacks the validation command");
```

- [ ] **Step 2: Run the validator and confirm legacy-path failures**

Run: `node tests/validate-site.mjs`

Expected: exit code 1 listing the legacy package, Gulp, SCSS, or library paths.

- [ ] **Step 3: Remove obsolete files and directories**

Remove only the paths named in this task after verifying their resolved absolute paths remain under the repository root. Retain `CNAME`, `favicon.ico`, referenced project images, documentation, and `.git`.

- [ ] **Step 4: Replace the README**

Write `README.md` with:

```markdown
# marcocardoso.com.br

Bilingual professional portfolio for Marco Aurelio Cardoso, served directly by GitHub Pages.

## Stack

- Semantic HTML
- Modern CSS
- Dependency-free JavaScript modules
- Node.js standard-library validation

## Local preview

Serve the repository root with any static HTTP server. ES modules do not run reliably through `file://`.

## Validation

```powershell
node tests/validate-site.mjs
```

## Content and translations

English fallback content lives in `index.html`. English and Brazilian Portuguese dictionaries live in `js/translations.js`; both dictionaries must contain identical keys.

## Deployment

The `master` branch is published by GitHub Pages at https://marcocardoso.com.br/. The custom domain is defined in `CNAME`.
```

- [ ] **Step 5: Run structural validation**

Run: `node tests/validate-site.mjs`

Expected: exit code 0 and `Site validation passed.`

- [ ] **Step 6: Check repository formatting and references**

Run:

```powershell
git diff --check
rg -n "jquery|node-sass|gulp|bootstrap|font-awesome|repositorio\.sead\.ufes\.br|Download Resume|Baixar currículo" --glob "!docs/superpowers/**"
```

Expected: `git diff --check` exits 0; `rg` returns no delivered-site references.

- [ ] **Step 7: Test in a local browser**

Start a static server from the repository root, open the page, and verify at 1440×900 and 390×844:

- English is visible on a first visit.
- PT translates all navigation and core sections and survives reload.
- EN restores English and survives reload.
- Mobile menu opens with its button, closes on link selection, closes with Escape, and restores focus.
- Tab order reaches skip link, navigation, language buttons, project actions, social links, and contact links with visible focus.
- No horizontal overflow occurs.
- Images load with meaningful alternatives.
- The console has zero errors and zero uncaught promise rejections.

- [ ] **Step 8: Check external links**

Verify successful responses for the canonical site, LinkedIn, GitHub profile, SGC repository, WordPress, and Weblate. Do not restore the DSpace live link if it remains unavailable.

- [ ] **Step 9: Inspect the final Git delta**

Run:

```powershell
git status --short
git diff --stat HEAD
git diff --check
```

Expected: only intentional modernization files are changed, no whitespace errors are present, and no temporary render or server files are tracked.

- [ ] **Step 10: Commit repository cleanup and documentation**

Run:

```powershell
git add -A
git commit -m "chore: remove legacy portfolio tooling"
```

- [ ] **Step 11: Run post-commit verification**

Run:

```powershell
node tests/validate-site.mjs
git status --short
git log -5 --oneline
```

Expected: validation passes, the worktree is clean, and the five implementation commits plus the design/plan documentation commits are visible. Do not push.
