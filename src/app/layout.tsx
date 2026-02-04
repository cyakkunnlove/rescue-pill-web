import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

// AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";

export const metadata: Metadata = {
  title: "Rescue Pill - 緊急避妊支援アプリ",
  description:
    "緊急避妊薬の入手を迅速化するため、利用者の事前問診→判定→薬局/医療機関連携までを支援します。匿名で利用可能。",
  keywords: ["緊急避妊薬", "アフターピル", "薬局", "セルフチェック", "緊急避妊", "避妊"],
  authors: [{ name: "Rescue Pill" }],
  creator: "Rescue Pill",
  publisher: "Rescue Pill",
  openGraph: {
    title: "Rescue Pill - 緊急避妊支援アプリ",
    description: "もしもの時も、あわてず、次の一歩へ。質問に答えて、次の行動を確認しましょう。",
    type: "website",
    locale: "ja_JP",
    siteName: "Rescue Pill",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rescue Pill - 緊急避妊支援アプリ",
    description: "もしもの時も、あわてず、次の一歩へ。",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
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
      <head>
        {/* Google AdSense */}
        {ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        
        {/* Google Analytics (optional) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
