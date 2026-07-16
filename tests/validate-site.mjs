import { access, readFile } from "node:fs/promises";
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
check(
  /<title>Marco Aurelio Cardoso \| Backend Developer<\/title>/.test(html),
  "Missing professional title",
);
check(/<meta\s+name="description"/.test(html), "Missing meta description");
check(
  /<link\s+rel="canonical"\s+href="https:\/\/marcocardoso\.com\.br\/"/.test(html),
  "Missing canonical URL",
);
check(/application\/ld\+json/.test(html), "Missing Person JSON-LD");
check(/data-language="pt-BR"/.test(html), "Missing Portuguese language control");
check(
  html.indexOf("Laravel") !== -1 &&
    html.indexOf("Spring") !== -1 &&
    html.indexOf("Laravel") < html.indexOf("Spring"),
  "Laravel must appear before Spring",
);
check(/Claude Code/.test(html) && /Codex/.test(html), "Missing agentic coding tools");
check(/IFES/.test(html) && /UFES/.test(html), "Missing verified institutional experience");

for (const landmark of ["header", "nav", "main", "footer"]) {
  check(new RegExp(`<${landmark}\\b`).test(html), `Missing ${landmark} landmark`);
}

for (const id of [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
]) {
  check(new RegExp(`id="${id}"`).test(html), `Missing section: ${id}`);
}

check(/class="skip-link"/.test(html), "Missing skip link");
check(
  /property="og:title"/.test(html) && /name="twitter:card"/.test(html),
  "Missing social metadata",
);
check(
  !/Download Resume|Baixar currículo|Resume\/.*\.pdf/i.test(html),
  "Stale resume remains promoted",
);
check(
  !/repositorio\.sead\.ufes\.br/.test(html),
  "Unavailable DSpace live link remains exposed",
);

for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
  check(/\salt=("[^"]*"|'[^']*')/.test(tag), `Image lacks alt: ${tag}`);
}

for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) ?? []) {
  check(
    /rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(tag),
    `Unsafe new-tab link: ${tag}`,
  );
}

const ids = new Set(
  [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]),
);
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  check(ids.has(anchor), `Broken internal anchor: #${anchor}`);
}

const banned = [/jquery/i, /node-sass/i, /gulp/i, /bootstrap/i, /font-awesome/i];
for (const pattern of banned) {
  check(!pattern.test(html), `Legacy reference remains: ${pattern}`);
}

for (const path of [
  "js/translations.mjs",
  "js/scripts.js",
  "css/styles.css",
  "robots.txt",
  "sitemap.xml",
]) {
  try {
    await access(join(root, path));
  } catch {
    failures.push(`Missing required file: ${path}`);
  }
}

let translations;
try {
  ({ translations } = await import("../js/translations.mjs"));
} catch {
  failures.push("Translations module cannot be loaded");
}

if (translations) {
  const englishKeys = Object.keys(translations.en ?? {}).sort();
  const portugueseKeys = Object.keys(translations["pt-BR"] ?? {}).sort();
  check(
    JSON.stringify(englishKeys) === JSON.stringify(portugueseKeys),
    "Translation keys differ between languages",
  );

  for (const [, key] of html.matchAll(
    /data-i18n(?:-aria|-alt)?="([^"]+)"/g,
  )) {
    check(key in (translations.en ?? {}), `Missing English translation: ${key}`);
    check(
      key in (translations["pt-BR"] ?? {}),
      `Missing Portuguese translation: ${key}`,
    );
  }
}

const scripts = await read("js/scripts.js");
check(
  /type="module"\s+src="js\/scripts\.js"/.test(html),
  "Browser module is not loaded by the page",
);
check(
  /localStorage\.setItem\("portfolio-language"/.test(scripts),
  "Language preference is not persisted",
);
check(/event\.key === "Escape"/.test(scripts), "Mobile menu does not handle Escape");
check(/aria-expanded/.test(scripts), "Mobile menu state is not exposed");

const css = await read("css/styles.css");
for (const token of [
  ":focus-visible",
  "prefers-reduced-motion",
  "@media",
  ".skip-link",
  ".menu-toggle",
  ".site-menu.is-open",
]) {
  check(
    css.includes(token),
    `Missing CSS accessibility/responsive token: ${token}`,
  );
}
check(!/@import|fonts\.googleapis/i.test(css), "Third-party font dependency remains");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Site validation passed.");
