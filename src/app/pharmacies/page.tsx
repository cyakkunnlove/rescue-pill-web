"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Phone,
  Clock,
  Search,
  Navigation,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";

interface PharmacyMin {
  n: string;  // name
  p: string;  // prefecture
  c: string;  // city
  a: string;  // address
  t: string;  // phone (tel)
  h: string;  // hours
  e: number;  // emergency/after hours
}

interface Pharmacy {
  name: string;
  prefecture: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  afterHours: boolean;
}

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAfterHoursOnly, setShowAfterHoursOnly] = useState(false);

  useEffect(() => {
    fetch("/data/pharmacies.min.json")
      .then((res) => res.json())
      .then((data: PharmacyMin[]) => {
        // Transform minimal format to full format
        const transformed = data.map((p) => ({
          name: p.n,
          prefecture: p.p,
          city: p.c,
          address: p.a,
          phone: p.t,
          hours: p.h,
          afterHours: p.e === 1,
        }));
        setPharmacies(transformed);
        setLoading(false);
      })
      .catch((err) => {
        setError("データの読み込みに失敗しました");
        setLoading(false);
      });
  }, []);

  const filteredPharmacies = useMemo(() => {
    let result = pharmacies;

    if (selectedPrefecture) {
      result = result.filter((p) => p.prefecture === selectedPrefecture);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query)
      );
    }

    if (showAfterHoursOnly) {
      result = result.filter((p) => p.afterHours);
    }

    return result.slice(0, 100); // Limit to 100 results for performance
  }, [pharmacies, selectedPrefecture, searchQuery, showAfterHoursOnly]);

  const openInMaps = (pharmacy: Pharmacy) => {
    const query = encodeURIComponent(pharmacy.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const callPharmacy = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-text-primary">対応薬局検索</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-light rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-text-secondary">
            <strong className="text-primary">厚生労働省公式リスト</strong>に基づく、
            緊急避妊薬の調剤が可能な薬局一覧です。
            （{pharmacies.length.toLocaleString()}件）
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-6">
          {/* Prefecture Select */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">
              都道府県
            </label>
            <select
              value={selectedPrefecture}
              onChange={(e) => setSelectedPrefecture(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                       focus:border-primary focus:outline-none bg-white
                       text-text-primary"
            >
              <option value="">すべて</option>
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="薬局名・住所で検索"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-primary-light 
                       focus:border-primary focus:outline-none bg-white
                       text-text-primary placeholder:text-text-muted"
            />
          </div>

          {/* After Hours Filter */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showAfterHoursOnly}
              onChange={(e) => setShowAfterHoursOnly(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-primary-light text-primary 
                       focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-sm text-text-secondary">
              時間外対応ありのみ表示
            </span>
          </label>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-danger">
            <AlertCircle className="w-6 h-6 mr-2" />
            {error}
          </div>
        ) : (
          <>
            <p className="text-sm text-text-muted mb-4">
              {filteredPharmacies.length === 100
                ? "100件以上の結果（上位100件を表示）"
                : `${filteredPharmacies.length}件の結果`}
            </p>

            <div className="space-y-3">
              {filteredPharmacies.map((pharmacy, index) => (
                <motion.div
                  key={`${pharmacy.name}-${pharmacy.address}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-text-primary">{pharmacy.name}</h3>
                      {pharmacy.afterHours && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          時間外対応
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                        <span>{pharmacy.address}</span>
                      </div>

                      {pharmacy.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-text-muted" />
                          <span>{pharmacy.phone}</span>
                        </div>
                      )}

                      {pharmacy.hours && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{pharmacy.hours}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openInMaps(pharmacy)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                 bg-primary-light text-primary rounded-xl text-sm font-medium
                                 hover:bg-primary hover:text-white transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        地図で見る
                      </button>
                      {pharmacy.phone && (
                        <button
                          onClick={() => callPharmacy(pharmacy.phone)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                   bg-secondary-light text-secondary rounded-xl text-sm font-medium
                                   hover:bg-secondary hover:text-white transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          電話する
                        </button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPharmacies.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>条件に一致する薬局が見つかりませんでした</p>
              </div>
            )}
          </>
        )}

        {/* Ad Banner */}
        <div className="mt-8">
          <AdBanner />
        </div>

        {/* Source Info */}
        <div className="mt-8 text-center">
          <a
            href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00004.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
          >
            データ出典: 厚生労働省
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
