import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { CONTENT_REVIEWED_AT, getAllSlugs, getBlogPost } from '@/content/blog';
import { EDITORIAL_AUTHOR, SITE_IDENTITY } from '@/lib/siteIdentity';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug, 'ja'); // Use Japanese for metadata
  
  if (!post) {
    return {
      title: '記事が見つかりません | Rescue Pill',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: EDITORIAL_AUTHOR.name, url: EDITORIAL_AUTHOR.url }],
    alternates: {
      canonical: `https://rescue-pill.com/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://rescue-pill.com/blog/${slug}`,
      publishedTime: post.date,
      modifiedTime: CONTENT_REVIEWED_AT,
      authors: [EDITORIAL_AUTHOR.url],
    },
  };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if slug exists
  const post = getBlogPost(slug, 'ja');
  if (!post) {
    notFound();
  }

  const articleUrl = `${SITE_IDENTITY.url}/blog/${slug}`;
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: post.date,
    dateModified: CONTENT_REVIEWED_AT,
    inLanguage: 'ja',
    author: {
      '@type': 'Person',
      '@id': EDITORIAL_AUTHOR.id,
      name: EDITORIAL_AUTHOR.name,
      url: EDITORIAL_AUTHOR.url,
    },
    publisher: {
      '@type': 'Organization',
      '@id': SITE_IDENTITY.id,
      name: SITE_IDENTITY.name,
      url: SITE_IDENTITY.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_IDENTITY.logo,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData).replace(/</g, '\\u003c'),
        }}
      />
      <BlogArticle slug={slug} />
    </main>
  );
}
