import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "Rescue Pillへのお問い合わせはこちらから。協力企業・スポンサー・NPO連携・取材依頼など、お気軽にご相談ください。",
  openGraph: {
    title: "お問い合わせ | Rescue Pill",
    description: "Rescue Pillへのお問い合わせフォーム",
  },
  alternates: {
    canonical: "https://rescue-pill.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
