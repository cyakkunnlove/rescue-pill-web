"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// AdSense Publisher ID - Replace with actual ID after approval
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className = "",
}: AdSenseProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded && typeof window !== "undefined" && ADSENSE_PUBLISHER_ID) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [scriptLoaded]);

  // Show placeholder if no publisher ID is set
  if (!ADSENSE_PUBLISHER_ID) {
    return (
      <div
        className={`bg-gradient-to-r from-primary-light to-accent-light rounded-2xl p-4 text-center ${className}`}
        style={style}
      >
        <p className="text-xs text-text-muted">広告スペース</p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {/* Load AdSense script only when this component is rendered */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}

// AdSense Script Component - No longer needed globally
// Keep for backward compatibility but recommend using GoogleAdSense component instead
export function AdSenseScript() {
  // Script is now loaded by individual ad components
  return null;
}
