import { blogContentsJA } from './ja';
import { blogContentsEN } from './en';
import { blogContentsZh } from './zh';
import { blogContents as blogContentsVI } from './vi';
import { blogContentsKo } from './ko';

export interface BlogContent {
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
}

export type Locale = 'ja' | 'en' | 'zh' | 'vi' | 'ko';

export const blogContentsByLocale: Record<Locale, Record<string, BlogContent>> = {
  ja: blogContentsJA,
  en: blogContentsEN,
  zh: blogContentsZh,
  vi: blogContentsVI,
  ko: blogContentsKo,
};

export function getBlogContents(locale: Locale): Record<string, BlogContent> {
  return blogContentsByLocale[locale] || blogContentsJA;
}

export function getBlogPost(slug: string, locale: Locale): BlogContent | undefined {
  const contents = getBlogContents(locale);
  return contents[slug];
}

// Get all slugs (same across all locales)
export function getAllSlugs(): string[] {
  return Object.keys(blogContentsJA);
}
