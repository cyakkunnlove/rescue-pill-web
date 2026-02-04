import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rescue Pill - 緊急避妊支援アプリ",
  description:
    "緊急避妊薬の入手を迅速化するため、利用者の事前問診→判定→薬局/医療機関連携までを支援します。",
  keywords: ["緊急避妊薬", "アフターピル", "薬局", "セルフチェック"],
  openGraph: {
    title: "Rescue Pill - 緊急避妊支援アプリ",
    description: "質問に答えて、次の行動を確認しましょう。",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#E8A0BF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
