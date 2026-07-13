import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  alternates: { canonical: "https://rescue-pill.com/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
