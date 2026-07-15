import { articleEnhancementsEn } from "./en";
import { articleEnhancementsJa } from "./ja";
import { articleEnhancementsKo } from "./ko";
import { articleEnhancementsVi } from "./vi";
import { articleEnhancementsZh } from "./zh";
import type {
  ArticleEnhancements,
  EditorialLocale,
} from "./types";

export { getEditorialCopy } from "./copy";
export { getArticleSources } from "./sources";
export type { ArticleSource } from "./sources";
export type { EditorialLocale } from "./types";

const articleEnhancementsByLocale: Record<
  EditorialLocale,
  ArticleEnhancements
> = {
  ja: articleEnhancementsJa,
  en: articleEnhancementsEn,
  zh: articleEnhancementsZh,
  vi: articleEnhancementsVi,
  ko: articleEnhancementsKo,
};

export function getArticleEnhancement(
  slug: string,
  locale: EditorialLocale,
): string {
  return articleEnhancementsByLocale[locale]?.[slug] ?? "";
}
