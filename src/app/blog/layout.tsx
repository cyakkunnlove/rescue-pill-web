import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お役立ち情報',
  description: '緊急避妊薬（アフターピル）に関する正しい知識、薬局での入手方法、よくある疑問への回答など、役立つ情報をお届けします。',
  alternates: {
    canonical: 'https://rescue-pill.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
