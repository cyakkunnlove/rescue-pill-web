"use client";

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { CONTENT_REVIEWED_AT, getBlogPost, Locale } from '@/content/blog';

interface BlogArticleProps {
  slug: string;
}

export function BlogArticle({ slug }: BlogArticleProps) {
  const { t, locale } = useTranslation();
  const post = getBlogPost(slug, locale as Locale);
  const reviewedLabel = {
    ja: '最終確認',
    en: 'Last reviewed',
    zh: '最后核对',
    vi: 'Kiểm tra lần cuối',
    ko: '최종 확인',
  }[locale];
  const sourceLabel = {
    ja: '厚生労働省・PMDA等の一次情報を2026年7月13日に確認しました。情報源と更新方針を見る',
    en: 'Reviewed against primary sources from MHLW and PMDA on July 13, 2026. View sources and update policy.',
    zh: '已于2026年7月13日根据厚生劳动省及PMDA等一手资料核对。查看资料来源和更新方针。',
    vi: 'Đã đối chiếu với nguồn chính thức của MHLW và PMDA vào ngày 13/7/2026. Xem nguồn và chính sách cập nhật.',
    ko: '2026년 7월 13일 후생노동성·PMDA 등 1차 자료로 확인했습니다. 출처와 업데이트 방침 보기.',
  }[locale];

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
          {new Date(post.date).toLocaleDateString(locale === 'ja' ? 'ja-JP' : locale === 'zh' ? 'zh-CN' : locale === 'ko' ? 'ko-KR' : locale === 'vi' ? 'vi-VN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="text-sm text-gray-400 mx-2">·</span>
        <time dateTime={CONTENT_REVIEWED_AT} className="text-sm text-gray-500">
          {reviewedLabel}: {new Date(`${CONTENT_REVIEWED_AT}T00:00:00+09:00`).toLocaleDateString(locale === 'ja' ? 'ja-JP' : locale === 'zh' ? 'zh-CN' : locale === 'ko' ? 'ko-KR' : locale === 'vi' ? 'vi-VN' : 'en-US')}
        </time>
      </header>

      <Link
        href="/sources"
        className="block mb-8 rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-800 hover:border-pink-400 transition-colors"
      >
        {sourceLabel}
      </Link>

      <div 
        className="prose prose-pink max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-pink-600"
        dangerouslySetInnerHTML={{ 
          __html: post.content
            .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
            .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
            .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc my-4">$&</ul>')
            .replace(/\n\n/g, '</p><p class="my-4">')
            .replace(/^\|(.+)\|$/gm, (match) => {
              const cells = match.split('|').filter(c => c.trim());
              return `<tr>${cells.map(c => `<td class="border px-4 py-2">${c.trim()}</td>`).join('')}</tr>`;
            })
        }}
      />

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
