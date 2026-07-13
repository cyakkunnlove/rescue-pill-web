import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { CONTENT_REVIEWED_AT, getAllSlugs, getBlogPost } from '@/content/blog';

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <BlogArticle slug={slug} />
    </main>
  );
}
