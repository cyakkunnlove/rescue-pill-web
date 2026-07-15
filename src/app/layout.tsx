import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import {
  ADSENSE_PUBLISHER_ID,
  EDITORIAL_AUTHOR,
  SITE_IDENTITY,
} from "@/lib/siteIdentity";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_IDENTITY.url}/#application`,
  "name": SITE_IDENTITY.name,
  "alternateName": "レスキューピル",
  "description": "緊急避妊に関するセルフチェック、一般的な行動案内、厚生労働省の公開情報に基づく薬局・医療機関検索を提供します。",
  "url": SITE_IDENTITY.url,
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "inLanguage": "ja",
  "isAccessibleForFree": true,
  "author": {
    "@id": EDITORIAL_AUTHOR.id,
  },
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "female"
  }
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE_IDENTITY.id,
  "name": SITE_IDENTITY.name,
  "url": SITE_IDENTITY.url,
  "logo": SITE_IDENTITY.logo,
  "description": "緊急避妊支援アプリ - もしもの時も、あわてず、次の一歩へ"
};

const authorData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": EDITORIAL_AUTHOR.id,
  "name": EDITORIAL_AUTHOR.name,
  "url": EDITORIAL_AUTHOR.url,
  "jobTitle": EDITORIAL_AUTHOR.role,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rescue-pill.com"),
  title: {
    default: "Rescue Pill - 緊急避妊支援アプリ | 薬局・医療機関検索",
    template: "%s | Rescue Pill"
  },
  description:
    "緊急避妊薬（アフターピル）について、一般的な行動案内と、厚生労働省の公開情報に基づく販売薬局・医療機関の検索を提供します。診断・診療の代替ではありません。",
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
  authors: [{ name: EDITORIAL_AUTHOR.name, url: EDITORIAL_AUTHOR.url }],
  creator: EDITORIAL_AUTHOR.name,
  publisher: SITE_IDENTITY.name,
  other: {
    "google-adsense-account": ADSENSE_PUBLISHER_ID,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorData) }}
        />
        
        {/* Do not load the AdSense script globally. Add consent-gated article ads only after approval. */}
        
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
