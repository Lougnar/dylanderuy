import { defineConfig } from "astro/config";
import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from "./src/i18n/conf";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: DEFAULT_LANG,
    locales: AVAILABLE_LANGUAGES,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
