import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "産婦人科・婦人科検索 - 緊急避妊薬の処方",
  description:
    "緊急避妊薬について相談できる産婦人科・婦人科の探し方と、厚生労働省の対面・オンライン診療に関する公式情報を案内します。受診前に対応可否と受付時間を確認してください。",
  keywords: [
    "緊急避妊薬 処方",
    "産婦人科",
    "婦人科",
    "アフターピル 病院",
    "緊急避妊 医療機関",
    "厚生労働省 医療機関一覧",
    "緊急避妊 オンライン診療"
  ],
  openGraph: {
    title: "産婦人科・婦人科検索 | Rescue Pill",
    description: "緊急避妊薬について相談できる医療機関の探し方と、厚生労働省の公式情報を確認できます。",
  },
  alternates: {
    canonical: "https://rescue-pill.com/hospitals",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
