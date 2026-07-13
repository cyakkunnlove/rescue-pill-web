import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  alternates: { canonical: "https://rescue-pill.com/legal" },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
