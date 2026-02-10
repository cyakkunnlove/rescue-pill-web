import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

// AdSense Publisher ID (from env or fallback)
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-6450475655166600";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rescue Pill",
  "alternateName": "レスキューピル",
  "description": "緊急避妊薬の入手を迅速化するため、利用者の事前問診→判定→薬局/医療機関連携までを支援します。匿名で利用可能。",
  "url": "https://rescue-pill.com",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "inLanguage": "ja",
  "isAccessibleForFree": true,
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "female"
  }
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rescue Pill",
  "url": "https://rescue-pill.com",
  "logo": "https://rescue-pill.com/icon-512.png",
  "description": "緊急避妊支援アプリ - もしもの時も、あわてず、次の一歩へ"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rescue-pill.com"),
  title: {
    default: "Rescue Pill - 緊急避妊支援アプリ | 薬局・医療機関検索",
    template: "%s | Rescue Pill"
  },
  description:
    "緊急避妊薬（アフターピル）の入手を迅速化するため、利用者の事前問診→判定→薬局/医療機関連携までを支援します。匿名で利用可能。OTC対応薬局や産婦人科を簡単検索。",
  keywords: [
    "緊急避妊薬",
    "アフターピル", 
    "薬局検索",
    "OTC",
    "緊急避妊",
    "避妊",
    "産婦人科",
    "婦人科",
    "モーニングアフターピル",
    "レボノルゲストレル",
    "セルフチェック",
    "処方箋なし"
  ],
  authors: [{ name: "Rescue Pill" }],
  creator: "Rescue Pill",
  publisher: "Rescue Pill",
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "Rescue Pill - 緊急避妊支援アプリ",
    description: "もしもの時も、あわてず、次の一歩へ。質問に答えて、次の行動を確認しましょう。OTC対応薬局や産婦人科を簡単検索。",
    type: "website",
    locale: "ja_JP",
    siteName: "Rescue Pill",
    url: "https://rescue-pill.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rescue Pill - 緊急避妊支援アプリ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rescue Pill - 緊急避妊支援アプリ",
    description: "もしもの時も、あわてず、次の一歩へ。OTC対応薬局や産婦人科を簡単検索。",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rescue-pill.com",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        
        {/* Google AdSense - Removed from global layout to comply with policy */}
        {/* AdSense is now loaded only on pages with substantial content */}
        
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
      <body className="min-h-screen bg-background antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
