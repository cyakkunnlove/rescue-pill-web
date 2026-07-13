import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  alternates: { canonical: "https://rescue-pill.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
