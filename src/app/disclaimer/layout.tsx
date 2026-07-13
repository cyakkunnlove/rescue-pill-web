import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  alternates: { canonical: "https://rescue-pill.com/disclaimer" },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
