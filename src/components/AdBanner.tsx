"use client";

interface AdBannerProps {
  position?: "top" | "bottom" | "inline";
  className?: string;
}

export function AdBanner({ position = "inline", className = "" }: AdBannerProps) {
  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    inline: "",
  };

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
            広告スペース (Google AdSense)
          </span>
        </div>
        <p className="text-xs text-text-muted mt-1">
          320×50 または 300×250
        </p>
      </div>
    </div>
  );
}
