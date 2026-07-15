"use client";

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { CONTENT_REVIEWED_AT, getBlogPost, Locale } from '@/content/blog';
import {
  getArticleEnhancement,
  getArticleSources,
  getEditorialCopy,
} from '@/content/blog/editorial';
import { EDITORIAL_AUTHOR } from '@/lib/siteIdentity';

interface BlogArticleProps {
  slug: string;
}

const dateLocales: Record<Locale, string> = {
  ja: 'ja-JP',
  en: 'en-US',
  zh: 'zh-CN',
  vi: 'vi-VN',
  ko: 'ko-KR',
};

function formatArticleDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(`${value}T00:00:00+09:00`));
}

function toArticleHtml(content: string): string {
  return content
    .replace(/^\|(?:\s*:?-+:?\s*\|)+\s*$/gm, '')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/^---$/gm, '<hr class="my-8 border-pink-100" />')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-5">$1</li>')
    .replace(
      /(<li class="ml-5">.*<\/li>\n?)+/g,
      '<ol class="list-decimal my-4 space-y-1">$&</ol>',
    )
    .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(
      /(<li class="ml-4">.*<\/li>\n?)+/g,
      '<ul class="list-disc my-4">$&</ul>',
    )
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter((cell) => cell.trim());
      return `<tr>${cells.map((cell) => `<td class="border px-4 py-2">${cell.trim()}</td>`).join('')}</tr>`;
    })
    .replace(
      /(<tr>.*<\/tr>\n?)+/g,
      '<div class="my-6 overflow-x-auto"><table class="w-full border-collapse text-sm"><tbody>$&</tbody></table></div>',
    )
    .replace(/\n\n/g, '</p><p class="my-4">');
}

export function BlogArticle({ slug }: BlogArticleProps) {
  const { t, locale } = useTranslation();
  const articleLocale = locale as Locale;
  const post = getBlogPost(slug, articleLocale);
  const editorialCopy = getEditorialCopy(articleLocale);
  const articleSources = getArticleSources(slug, articleLocale);
  const enhancement = getArticleEnhancement(slug, articleLocale);

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">記事が見つかりません</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4"
        >
          {t("blog.backToList")}
        </Link>
        <span className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full mb-3">
          {post.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {post.title}
        </h1>
        <time dateTime={post.date} className="text-sm text-gray-500">
          {formatArticleDate(post.date, articleLocale)}
        </time>
        <span className="text-sm text-gray-400 mx-2">·</span>
        <time dateTime={CONTENT_REVIEWED_AT} className="text-sm text-gray-500">
          {editorialCopy.reviewedLabel}: {formatArticleDate(CONTENT_REVIEWED_AT, articleLocale)}
        </time>

        <div className="mt-5 rounded-xl border border-pink-100 bg-white p-4 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">
              {editorialCopy.bylineLabel}:
            </span>{' '}
            <Link
              href="/sources#editorial-policy"
              rel="author"
              className="font-medium text-pink-700 hover:underline"
            >
              {EDITORIAL_AUTHOR.name}
            </Link>{' '}
            ({editorialCopy.authorRole})
          </p>
          <p className="mt-2 leading-relaxed">
            {editorialCopy.authorshipBasis}{' '}
            <Link
              href="/sources#editorial-policy"
              className="font-medium text-pink-700 hover:underline"
            >
              {editorialCopy.policyLink}
            </Link>
          </p>
        </div>
      </header>

      <Link
        href="/sources"
        className="block mb-8 rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-800 hover:border-pink-400 transition-colors"
      >
        {editorialCopy.sourcePolicySummary}
      </Link>

      <div 
        className="prose prose-pink max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-pink-600"
        dangerouslySetInnerHTML={{ 
          __html: toArticleHtml([post.content, enhancement].filter(Boolean).join('\n\n')),
        }}
      />

      {articleSources.length > 0 && (
        <section className="mt-12 rounded-2xl border border-pink-100 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800">
            {editorialCopy.sourcesHeading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {editorialCopy.sourcesIntro}
          </p>
          <ul className="mt-5 space-y-3">
            {articleSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-pink-100 p-4 transition-colors hover:border-pink-300"
                >
                  <span className="font-medium text-pink-700">
                    {source.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                    {source.supports}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-12 pt-8 border-t border-pink-100">
        <div className="bg-pink-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("blog.searchCta")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("blog.searchCtaDesc")}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            {t("blog.searchButton")}
          </Link>
        </div>
      </footer>
    </article>
  );
}
