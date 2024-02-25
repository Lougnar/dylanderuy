import { SHOW_DEFAULT_LANG, DEFAULT_LANG, AVAILABLE_LANGUAGES } from "./conf";

/*export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const pathName = path.replaceAll("/", "");
    const hasTranslation =
      DEFAULT_LANG !== l &&
      routes[l] !== undefined &&
      routes[l][pathName] !== undefined;
    const translatedPath = hasTranslation ? "/" + routes[l][pathName] : path;

    return !SHOW_DEFAULT_LANG && l === DEFAULT_LANG
      ? translatedPath
      : `/${l}${translatedPath}`;
  };
}*/

/**
 * Load translations files to be used in SSG
 */
export async function loadTranslations() {
  const translations = {};
  const langFiles = AVAILABLE_LANGUAGES.map((lang) =>
    import(`./translations/${lang}.json`).then((m) => ({
      lang,
      file: m.default,
    }))
  );

  for await (const { lang, file } of langFiles) {
    translations[lang] = file;
  }

  return translations;
}

export const translations = await loadTranslations();

/**
 * Return function to translate in given lang
 */
export function useTranslations(lang: string) {
  return function t(key: string) {
    return translations[lang][key];
  };
}

export function getPathFromLocalizedUrl(url: URL) {
  const [, ...path] = url.pathname.split("/");
  if (AVAILABLE_LANGUAGES.includes(path[0])) path.shift();
  return path.join("/");
}

/**
 * @returns lang in URL or DEFAULT_LANG
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (AVAILABLE_LANGUAGES.includes(lang)) return lang;
  return DEFAULT_LANG;
}

/*export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split("/");
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  const getKeyByValue = (
    obj: Record<string, string>,
    value: string
  ): string | undefined => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}*/
