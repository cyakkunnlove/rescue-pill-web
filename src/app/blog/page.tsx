"use client";

import Link from 'next/link';
import { useTranslation } from "@/lib/i18n";
import { getBlogContents, getAllSlugs, Locale } from "@/content/blog";

const FEATURED_SLUGS = [
  'how-to-get-morning-after-pill',
  'otc-pharmacies-guide',
  'timing-and-effectiveness',
] as const;

export default function BlogPage() {
  const { t, locale } = useTranslation();
  const blogContents = getBlogContents(locale as Locale);
  const slugs = getAllSlugs();
  
  // Lead with the three articles that were fully reviewed against 2026 primary sources.
  const sortedSlugs = [...slugs].sort((a, b) => {
    const featuredA = FEATURED_SLUGS.indexOf(a as (typeof FEATURED_SLUGS)[number]);
    const featuredB = FEATURED_SLUGS.indexOf(b as (typeof FEATURED_SLUGS)[number]);

    if (featuredA !== -1 || featuredB !== -1) {
      if (featuredA === -1) return 1;
      if (featuredB === -1) return -1;
      return featuredA - featuredB;
    }

    const dateA = new Date(blogContents[a]?.date || '2000-01-01');
    const dateB = new Date(blogContents[b]?.date || '2000-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  const formatDate = (dateStr: string) => {
    const localeMap: Record<string, string> = {
      ja: 'ja-JP',
      en: 'en-US',
      zh: 'zh-CN',
      vi: 'vi-VN',
      ko: 'ko-KR',
    };
    return new Intl.DateTimeFormat(localeMap[locale] || 'ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Tokyo',
    }).format(new Date(`${dateStr}T00:00:00+09:00`));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t("blog.title")}
          </h1>
          <p className="text-gray-600">
            {t("blog.subtitle")}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {sortedSlugs.map((slug) => {
            const post = blogContents[slug];
            if (!post) return null;
            return (
              <article
                key={slug}
                className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${slug}`}>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <time className="text-xs text-gray-400">
                      {formatDate(post.date)}
                    </time>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            {t("blog.backToTop")}
          </Link>
        </div>
      </div>
    </main>
  );
}
