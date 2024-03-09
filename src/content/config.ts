import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from "./../i18n/conf";
import { defineCollection, getCollection, z } from "astro:content";
import { ContentType } from "../consts";

const articleSchema = z.object({
  title: z.string(),
  // Transform string to Date object
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().optional(),
  heroImage: z.string().optional(),
  type: z.enum(Object.values(ContentType)),
});

const articles = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: articleSchema,
});

export async function getArticles(
  langFilter?: (typeof AVAILABLE_LANGUAGES)[number]
) {
  return (await getCollection("articles"))
    .filter((article) => {
      const [lang] = article.slug.split("/");
      return langFilter === undefined || langFilter === lang;
    })
    .map((article) => ({
      ...article,
      slug: article.slug.replace(`${DEFAULT_LANG}/`, ""),
    }))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export type Article = z.infer<typeof articleSchema>;
export const collections = { articles };
