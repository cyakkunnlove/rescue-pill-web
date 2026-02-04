import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTC対応薬局検索 - 緊急避妊薬を処方箋なしで購入",
  description:
    "緊急避妊薬（アフターピル）を処方箋なしで購入できるOTC対応薬局を検索。現在地や都道府県から最寄りの薬局を簡単に見つけられます。24時間対応・女性薬剤師在籍店も検索可能。",
  keywords: [
    "緊急避妊薬 薬局",
    "アフターピル OTC",
    "処方箋なし",
    "緊急避妊薬 購入",
    "モーニングアフターピル",
    "薬局検索",
    "24時間薬局",
    "女性薬剤師"
  ],
  openGraph: {
    title: "OTC対応薬局検索 | Rescue Pill",
    description: "緊急避妊薬を処方箋なしで購入できる薬局を検索。現在地から最寄りの対応薬局を見つけられます。",
  },
  alternates: {
    canonical: "https://rescue-pill.com/pharmacies",
  },
};

export default function PharmaciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
