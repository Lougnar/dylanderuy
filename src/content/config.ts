import { defineCollection, getCollection, z } from "astro:content";
import { ContentType } from "../consts";

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  // Transform string to Date object
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  type: z.enum(Object.values(ContentType)),
});

const articles = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: articleSchema,
});

export async function getArticles() {
  return (await getCollection("articles")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export type Article = z.infer<typeof articleSchema>;
export const collections = { articles };
