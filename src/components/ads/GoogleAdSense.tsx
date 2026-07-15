"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// AdSense Publisher ID - Replace with actual ID after approval
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

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
    if (
      ADSENSE_ENABLED &&
      scriptLoaded &&
      typeof window !== "undefined" &&
      ADSENSE_PUBLISHER_ID
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [scriptLoaded]);

  // Never expose an unfinished ad placeholder or load a slotless request.
  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID || !adSlot) {
    return null;
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
