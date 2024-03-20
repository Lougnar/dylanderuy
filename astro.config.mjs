import { defineConfig } from "astro/config";
import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from "./src/i18n/conf";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sectionize from "@hbsnow/rehype-sectionize";

// https://astro.build/config
export default defineConfig({
  site: "https://dylanderuy.com",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("legal-terms"),
      i18n: {
        defaultLocale: "fr",
        locales: {
          fr: "fr",
          en: "en",
        },
      },
    }),
  ],
  markdown: {
    rehypePlugins: [sectionize],
  },
  i18n: {
    defaultLocale: DEFAULT_LANG,
    locales: AVAILABLE_LANGUAGES,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
