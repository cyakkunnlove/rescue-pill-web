"use client";

import { useEffect, useState } from "react";

// AdSense Publisher ID from environment
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";

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
  const [adLoaded, setAdLoaded] = useState(false);

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    inline: "",
  };

  const adSlot = AD_SLOTS[format] || AD_SLOTS.inline;

  useEffect(() => {
    if (ADSENSE_PUBLISHER_ID && adSlot) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [adSlot]);

  // Show actual AdSense ad if configured
  if (ADSENSE_PUBLISHER_ID && adSlot) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
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

  // Show placeholder if AdSense is not configured
  return (
    <div
      className={`
        ${positionClasses[position]}
        ${className}
      `}
    >
      <div className="bg-gradient-to-r from-primary-light via-accent-light to-secondary-light
                      border-2 border-dashed border-primary-light
                      rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-text-muted">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          <span className="text-sm font-medium">
            スポンサー広告
          </span>
        </div>
      </div>
    </div>
  );
}
