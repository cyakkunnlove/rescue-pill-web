"use client";

import Link from 'next/link';
import { AdBanner } from "@/components/AdBanner";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-emergency-contraception',
    title: '緊急避妊薬（アフターピル）とは？基本的な知識と仕組み',
    excerpt: '緊急避妊薬の効果、服用タイミング、副作用について医学的な観点からわかりやすく解説します。',
    date: '2025-02-01',
    category: '基礎知識',
  },
  {
    slug: 'how-to-get-morning-after-pill',
    title: '緊急避妊薬の入手方法：薬局・病院での流れを解説',
    excerpt: 'OTC薬局での購入方法、産婦人科での処方の流れ、必要な費用について詳しく説明します。',
    date: '2025-01-28',
    category: '入手方法',
  },
  {
    slug: 'otc-pharmacies-guide',
    title: 'OTC対応薬局の探し方と事前に知っておきたいこと',
    excerpt: '処方箋なしで緊急避妊薬を購入できる薬局の見つけ方、購入時の流れを解説します。',
    date: '2025-01-25',
    category: '入手方法',
  },
  {
    slug: 'side-effects-and-safety',
    title: '緊急避妊薬の副作用と安全性について',
    excerpt: '服用後に起こりうる症状、注意すべき点、安全に使用するためのポイントをまとめました。',
    date: '2025-01-20',
    category: '安全性',
  },
  {
    slug: 'timing-and-effectiveness',
    title: '服用タイミングと効果：72時間以内が重要な理由',
    excerpt: '緊急避妊薬の効果は時間とともに低下します。なぜ早めの服用が大切なのか解説します。',
    date: '2025-01-15',
    category: '基礎知識',
  },
  {
    slug: 'faq-emergency-contraception',
    title: 'よくある質問：緊急避妊薬に関する疑問にお答えします',
    excerpt: '「生理への影響は？」「何度も使って大丈夫？」など、よく寄せられる質問に回答します。',
    date: '2025-01-10',
    category: 'FAQ',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            お役立ち情報
          </h1>
          <p className="text-gray-600">
            緊急避妊薬に関する正しい知識と情報をお届けします
          </p>
        </header>

        {/* Ad Banner - Top */}
        <div className="mb-8">
          <AdBanner format="banner" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Ad Banner - Middle */}
        <div className="my-8">
          <AdBanner format="rectangle" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.slice(3).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
