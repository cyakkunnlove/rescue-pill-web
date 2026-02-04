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
  LocateFixed,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface PharmacyMin {
  n: string;  // name
  p: string;  // prefecture
  a: string;  // address
  t: string;  // phone (tel)
  h: string;  // hours
  e: number;  // emergency/after hours
  f: number;  // female pharmacist available
  m: number;  // male pharmacist available
  w: string;  // website
}

interface Pharmacy {
  name: string;
  prefecture: string;
  address: string;
  phone: string;
  hours: string;
  afterHours: boolean;
  femalePharmacist: boolean;
  malePharmacist: boolean;
  website: string;
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

// ISO 3166-2:JP codes to prefecture names
const ISO_TO_PREFECTURE: Record<string, string> = {
  "JP-01": "北海道", "JP-02": "青森県", "JP-03": "岩手県", "JP-04": "宮城県",
  "JP-05": "秋田県", "JP-06": "山形県", "JP-07": "福島県", "JP-08": "茨城県",
  "JP-09": "栃木県", "JP-10": "群馬県", "JP-11": "埼玉県", "JP-12": "千葉県",
  "JP-13": "東京都", "JP-14": "神奈川県", "JP-15": "新潟県", "JP-16": "富山県",
  "JP-17": "石川県", "JP-18": "福井県", "JP-19": "山梨県", "JP-20": "長野県",
  "JP-21": "岐阜県", "JP-22": "静岡県", "JP-23": "愛知県", "JP-24": "三重県",
  "JP-25": "滋賀県", "JP-26": "京都府", "JP-27": "大阪府", "JP-28": "兵庫県",
  "JP-29": "奈良県", "JP-30": "和歌山県", "JP-31": "鳥取県", "JP-32": "島根県",
  "JP-33": "岡山県", "JP-34": "広島県", "JP-35": "山口県", "JP-36": "徳島県",
  "JP-37": "香川県", "JP-38": "愛媛県", "JP-39": "高知県", "JP-40": "福岡県",
  "JP-41": "佐賀県", "JP-42": "長崎県", "JP-43": "熊本県", "JP-44": "大分県",
  "JP-45": "宮崎県", "JP-46": "鹿児島県", "JP-47": "沖縄県"
};

interface LocationResult {
  prefecture: string | null;
  city: string | null;
}

// Reverse geocode coordinates to prefecture using OpenStreetMap Nominatim
async function getPrefectureFromLocation(lat: number, lon: number): Promise<LocationResult> {
  try {
    console.log(`[Location] Reverse geocoding: ${lat}, ${lon}`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      { 
        headers: { 
          "Accept-Language": "ja",
          "User-Agent": "RescuePillApp/1.0"
        } 
      }
    );
    
    if (!response.ok) {
      console.error(`[Location] Nominatim API error: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    console.log("[Location] Nominatim response:", data?.address);
    
    // Get city name for local search
    const city = data?.address?.city || data?.address?.town || data?.address?.village || null;
    console.log(`[Location] Found city: ${city}`);
    
    // Method 1: Use ISO 3166-2 code (most reliable)
    const isoCode = data?.address?.["ISO3166-2-lvl4"];
    if (isoCode && ISO_TO_PREFECTURE[isoCode]) {
      console.log(`[Location] Found ISO code: ${isoCode} -> ${ISO_TO_PREFECTURE[isoCode]}`);
      return { prefecture: ISO_TO_PREFECTURE[isoCode], city };
    }
    
    // Method 2: Try multiple possible fields for prefecture name
    const state = data?.address?.province || 
                  data?.address?.state || 
                  data?.address?.region;
    
    if (state) {
      console.log(`[Location] Found state field: ${state}`);
      // Match to our prefecture list (handle both with and without suffix)
      const matched = PREFECTURES.find(p => {
        const baseName = p.replace(/[都道府県]$/, "");
        return state.includes(baseName) || state === p;
      });
      if (matched) {
        console.log(`[Location] Matched prefecture: ${matched}`);
        return { prefecture: matched, city };
      }
    }
    
    console.log("[Location] Could not determine prefecture");
    return { prefecture: null, city };
  } catch (err) {
    console.error("[Location] Error:", err);
    return { prefecture: null, city: null };
  }
}

export default function PharmaciesPage() {
  const { t } = useTranslation();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAfterHoursOnly, setShowAfterHoursOnly] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{lat: number, lon: number} | null>(null);

  // Function to get user location
  const detectLocation = async () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      console.log("[Location] Geolocation not supported");
      setLocationError("位置情報がサポートされていません");
      return;
    }
    
    setLocationLoading(true);
    setLocationError(null);
    console.log("[Location] Requesting location...");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`[Location] Got position: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);
        
        // Store coordinates for distance calculation
        setUserCoords({ lat: latitude, lon: longitude });
        
        const result = await getPrefectureFromLocation(latitude, longitude);
        if (result.prefecture) {
          console.log(`[Location] Setting prefecture: ${result.prefecture}, city: ${result.city}`);
          setSelectedPrefecture(result.prefecture);
          setUserCity(result.city);
          setLocationDetected(true);
          setLocationError(null);
          
          // Auto-fill search with city name for more relevant results
          if (result.city) {
            setSearchQuery(result.city);
          }
        } else {
          console.log("[Location] Could not determine prefecture");
          setLocationError("都道府県を特定できませんでした。手動で選択してください。");
        }
        setLocationLoading(false);
      },
      (error) => {
        console.error("[Location] Geolocation error:", error.code, error.message);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("位置情報の許可が必要です。設定から許可してください。");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("位置情報を取得できませんでした。");
            break;
          case error.TIMEOUT:
            setLocationError("位置情報の取得に時間がかかっています。手動で都道府県を選択してください。");
            break;
          default:
            setLocationError("位置情報を取得できませんでした。");
        }
        setLocationLoading(false);
      },
      { 
        timeout: 30000,        // 30秒タイムアウト（モバイルGPSは時間がかかることも）
        maximumAge: 300000,    // 5分間のキャッシュ
        enableHighAccuracy: false  // 高精度モードは遅いのでオフ
      }
    );
  };

  // Get user location on page load
  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    fetch("/data/otc_pharmacies.json")
      .then((res) => res.json())
      .then((data: PharmacyMin[]) => {
        // Transform minimal format to full format
        const transformed = data.map((p) => ({
          name: p.n,
          prefecture: p.p,
          address: p.a,
          phone: p.t,
          hours: p.h,
          afterHours: p.e === 1,
          femalePharmacist: p.f === 1,
          malePharmacist: p.m === 1,
          website: p.w,
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
          p.address.toLowerCase().includes(query)
      );
    }

    if (showAfterHoursOnly) {
      result = result.filter((p) => p.afterHours);
    }

    return result.slice(0, 100); // Limit to 100 results for performance
  }, [pharmacies, selectedPrefecture, searchQuery, showAfterHoursOnly]);

  const openInMaps = (pharmacy: Pharmacy) => {
    // Include both name and address for accurate location
    const query = encodeURIComponent(`${pharmacy.name} ${pharmacy.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const callPharmacy = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-text-primary">{t("pharmacies.title")}</span>
            </div>
          </div>
          <LanguageSwitcher compact />
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
            <strong className="text-primary">{t("pharmacies.officialList")}</strong> - {t("pharmacies.canBuyWithout")}
            （{pharmacies.length.toLocaleString()}{t("common.results")}）
          </p>
          <p className="text-xs text-text-muted mt-2">
            {t("pharmacies.trialNote")}
          </p>
        </motion.div>

        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {locationLoading ? (
                <p className="text-sm text-primary flex items-center gap-2">
                  <LocateFixed className="w-4 h-4 animate-pulse" />
                  {t("pharmacies.detectingLocation")}
                </p>
              ) : locationError ? (
                <p className="text-sm text-text-secondary flex items-center gap-2">
                  <LocateFixed className="w-4 h-4" />
                  {t("pharmacies.locationError")}
                </p>
              ) : locationDetected ? (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <LocateFixed className="w-4 h-4" />
                  {t("pharmacies.locationDetected")} {userCity ? `${userCity}（${selectedPrefecture}）` : selectedPrefecture}
                </p>
              ) : (
                <p className="text-sm text-text-secondary flex items-center gap-2">
                  <LocateFixed className="w-4 h-4" />
                  {t("pharmacies.autoDetect")}
                </p>
              )}
            </div>
            <Button
              onClick={detectLocation}
              disabled={locationLoading}
              className="ml-3 px-4 py-2 text-sm"
            >
              {locationLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-1" />
                  {t("pharmacies.currentLocation")}
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-6">
          {/* Prefecture Select */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">
              {t("pharmacies.prefecture")}
            </label>
            <select
              value={selectedPrefecture}
              onChange={(e) => setSelectedPrefecture(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                       focus:border-primary focus:outline-none bg-white
                       text-text-primary"
            >
              <option value="">{t("pharmacies.all")}</option>
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
              placeholder={t("pharmacies.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-primary-light 
                       focus:border-primary focus:outline-none bg-white
                       text-text-primary placeholder:text-text-muted"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAfterHoursOnly}
                onChange={(e) => setShowAfterHoursOnly(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-primary-light text-primary 
                         focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-text-secondary">
                {t("pharmacies.afterHoursOnly")}
              </span>
            </label>
          </div>
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
                      <h3 className="font-bold text-text-primary flex-1 pr-2">{pharmacy.name}</h3>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {pharmacy.afterHours && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
                            {t("pharmacies.afterHours")}
                          </span>
                        )}
                      </div>
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
                        {t("pharmacies.viewOnMap")}
                      </button>
                      {pharmacy.phone && (
                        <button
                          onClick={() => callPharmacy(pharmacy.phone)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                   bg-secondary-light text-secondary rounded-xl text-sm font-medium
                                   hover:bg-secondary hover:text-white transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {t("pharmacies.call")}
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
                <p>{t("pharmacies.noResults")}</p>
                <p className="text-sm mt-2">{t("pharmacies.tryDifferent")}</p>
              </div>
            )}

            {/* Link to Hospitals */}
            <div className="mt-8 text-center">
              <Link
                href="/hospitals"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Building2 className="w-4 h-4" />
                {t("pharmacies.findHospitalLink")}
              </Link>
            </div>
          </>
        )}

        {/* Ad Banner */}
        <div className="mt-8">
          <AdBanner />
        </div>

        {/* Source Info */}
        <div className="mt-8 text-center">
          <a
            href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00005.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
          >
            データ出典: 厚生労働省（緊急避妊薬の試験的販売）
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
