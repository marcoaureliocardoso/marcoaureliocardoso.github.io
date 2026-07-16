import { translations } from "./translations.mjs";

const supportedLanguages = new Set(["en", "pt-BR"]);
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");
const description = document.querySelector('meta[name="description"]');
const openGraphTitle = document.querySelector('meta[property="og:title"]');
const openGraphDescription = document.querySelector(
  'meta[property="og:description"]',
);

function translateAttribute(selector, datasetKey, targetAttribute, dictionary) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset[datasetKey];
    if (dictionary[key]) element.setAttribute(targetAttribute, dictionary[key]);
  });
}

function storedLanguage() {
  try {
    return localStorage.getItem("portfolio-language");
  } catch {
    return null;
  }
}

function persistLanguage(language) {
  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    // The selected language still applies for this page view.
  }
}

function currentDictionary() {
  return translations[document.documentElement.lang] ?? translations.en;
}

function updateMenuLabel() {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const key = isOpen ? "nav.close" : "nav.open";
  menuButton.setAttribute("aria-label", currentDictionary()[key]);
}

export function setLanguage(language) {
  const selected = supportedLanguages.has(language) ? language : "en";
  const dictionary = translations[selected];

  document.documentElement.lang = selected;
  document.title = dictionary["meta.title"];
  description.content = dictionary["meta.description"];
  openGraphTitle.content = dictionary["meta.title"];
  openGraphDescription.content = dictionary["meta.description"];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  translateAttribute(
    "[data-i18n-aria]",
    "i18nAria",
    "aria-label",
    dictionary,
  );
  translateAttribute("[data-i18n-alt]", "i18nAlt", "alt", dictionary);

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === selected),
    );
  });

  persistLanguage(selected);
  updateMenuLabel();
}

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  updateMenuLabel();
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 48.01rem)").matches) setMenu(false);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const savedLanguage = storedLanguage();
if (supportedLanguages.has(savedLanguage) && savedLanguage !== "en") {
  setLanguage(savedLanguage);
}
