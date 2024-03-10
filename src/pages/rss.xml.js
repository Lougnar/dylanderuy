import { getRssArticlesForLang } from "./../rss";

export async function GET(context) {
  return getRssArticlesForLang(context, "fr");
}
