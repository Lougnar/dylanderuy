import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "./consts";
import { DEFAULT_LANG } from "./i18n/conf";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getArticles } from "./content/config";
import type { AVAILABLE_LANGUAGES } from "./i18n/conf";

const parser = new MarkdownIt();

export async function getRssArticlesForLang(
  context,
  lang: (typeof AVAILABLE_LANGUAGES)[number]
) {
  const posts = await getArticles(lang);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    customData: `<language>${lang}</language>`,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.slug.replace(`${DEFAULT_LANG}`, "")}/`,
      author: post.data.author ?? "Dylan Deruy",
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      commentsUrl: `${context.site}${post.slug.replace(
        `${DEFAULT_LANG}/`,
        ""
      )}#comments`,
    })),
  });
}
