import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "緊急避妊薬を販売する薬局・店舗を検索",
  description:
    "厚生労働省の2026年7月1日更新一覧に基づき、緊急避妊薬を処方箋なしで対面購入できる薬局・店舗を検索できます。来店前に在庫、研修修了薬剤師の勤務、営業時間を電話で確認してください。",
  keywords: [
    "緊急避妊薬 薬局",
    "アフターピル OTC",
    "処方箋なし",
    "緊急避妊薬 購入",
    "モーニングアフターピル",
    "薬局検索",
    "厚生労働省 薬局一覧",
    "要指導医薬品"
  ],
  openGraph: {
    title: "緊急避妊薬を販売する薬局・店舗 | Rescue Pill",
    description: "厚生労働省の公開一覧から、緊急避妊薬を対面購入できる薬局・店舗を検索できます。",
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
