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
  "js/translations.js",
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

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Site validation passed.");
