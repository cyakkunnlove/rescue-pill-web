import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "産婦人科・婦人科検索 - 緊急避妊薬の処方",
  description:
    "緊急避妊薬を処方してもらえる産婦人科・婦人科を検索。現在地から近くの医療機関をGoogle Mapsで簡単に見つけられます。休日・夜間対応の医療機関も検索可能。",
  keywords: [
    "緊急避妊薬 処方",
    "産婦人科",
    "婦人科",
    "アフターピル 病院",
    "緊急避妊 医療機関",
    "休日診療",
    "夜間診療"
  ],
  openGraph: {
    title: "産婦人科・婦人科検索 | Rescue Pill",
    description: "緊急避妊薬を処方してもらえる医療機関を検索。現在地から近くの産婦人科・婦人科を見つけられます。",
  },
  alternates: {
    canonical: "https://rescue-pill.com/hospitals",
  },
};

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
