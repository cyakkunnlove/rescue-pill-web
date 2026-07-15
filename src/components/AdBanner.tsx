"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// AdSense Publisher ID from environment
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

// Ad slot IDs - Configure these in your AdSense dashboard
const AD_SLOTS = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || "",
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || "",
  inline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE || "",
};

interface AdBannerProps {
  position?: "top" | "bottom" | "inline";
  format?: "banner" | "rectangle" | "inline";
  className?: string;
}

export function AdBanner({ 
  position = "inline", 
  format = "inline",
  className = "" 
}: AdBannerProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    inline: "",
  };

  const adSlot = AD_SLOTS[format] || AD_SLOTS.inline;

  useEffect(() => {
    if (ADSENSE_ENABLED && scriptLoaded && ADSENSE_PUBLISHER_ID && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [adSlot, scriptLoaded]);

  // Show actual AdSense ad if configured
  if (ADSENSE_ENABLED && ADSENSE_PUBLISHER_ID && adSlot) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
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
            minHeight: format === "rectangle" ? "250px" : "50px",
          }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Never expose an unfinished ad placeholder to visitors or reviewers.
  return null;
}
