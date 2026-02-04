import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パートナー募集 - 協力企業・スポンサー・NPO",
  description:
    "Rescue Pillの活動にご協力いただける企業・スポンサー・NPO団体を募集しています。緊急避妊を必要とする方への支援活動にご参加ください。",
  openGraph: {
    title: "パートナー募集 | Rescue Pill",
    description: "緊急避妊支援活動にご協力いただける企業・団体を募集しています。",
  },
  alternates: {
    canonical: "https://rescue-pill.com/partners",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
