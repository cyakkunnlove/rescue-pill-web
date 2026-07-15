"use client";

import { useEffect, useMemo, useState } from "react";
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
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import pharmacyMetadata from "../../../public/data/otc_pharmacies.meta.json";

interface PharmacyMin {
  i: string;
  n: string;
  p: string;
  a: string;
  t: string;
  h: string;
  e: number;
  x: string;
  w: string;
  r: number;
}

interface PharmacyMetadata {
  sourcePage: string;
  sourceFile: string;
  sourceUpdatedAt: string;
  importedAt: string;
  total: number;
  coordinateCount: number;
  sourceSha256: string;
  dataSha256: string;
}

interface Pharmacy {
  id: string;
  name: string;
  prefecture: string;
  address: string;
  phone: string;
  hours: string;
  afterHours: boolean;
  afterHoursPhone: string;
  preContactRequired: boolean;
  website: string;
}

const INITIAL_METADATA = pharmacyMetadata as PharmacyMetadata;

const PREFECTURES = [
  ["北海道", "Hokkaido"], ["青森県", "Aomori"], ["岩手県", "Iwate"],
  ["宮城県", "Miyagi"], ["秋田県", "Akita"], ["山形県", "Yamagata"],
  ["福島県", "Fukushima"], ["茨城県", "Ibaraki"], ["栃木県", "Tochigi"],
  ["群馬県", "Gunma"], ["埼玉県", "Saitama"], ["千葉県", "Chiba"],
  ["東京都", "Tokyo"], ["神奈川県", "Kanagawa"], ["新潟県", "Niigata"],
  ["富山県", "Toyama"], ["石川県", "Ishikawa"], ["福井県", "Fukui"],
  ["山梨県", "Yamanashi"], ["長野県", "Nagano"], ["岐阜県", "Gifu"],
  ["静岡県", "Shizuoka"], ["愛知県", "Aichi"], ["三重県", "Mie"],
  ["滋賀県", "Shiga"], ["京都府", "Kyoto"], ["大阪府", "Osaka"],
  ["兵庫県", "Hyogo"], ["奈良県", "Nara"], ["和歌山県", "Wakayama"],
  ["鳥取県", "Tottori"], ["島根県", "Shimane"], ["岡山県", "Okayama"],
  ["広島県", "Hiroshima"], ["山口県", "Yamaguchi"], ["徳島県", "Tokushima"],
  ["香川県", "Kagawa"], ["愛媛県", "Ehime"], ["高知県", "Kochi"],
  ["福岡県", "Fukuoka"], ["佐賀県", "Saga"], ["長崎県", "Nagasaki"],
  ["熊本県", "Kumamoto"], ["大分県", "Oita"], ["宮崎県", "Miyazaki"],
  ["鹿児島県", "Kagoshima"], ["沖縄県", "Okinawa"],
];

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function dialablePhone(rawPhone: string): string | null {
  const normalized = rawPhone.normalize("NFKC");
  const candidates = normalized.match(/\+?\d(?:[\d()\-\s]*\d)?/g) ?? [];
  const candidate = candidates.find(
    (value) => value.replace(/\D/g, "").length >= 9
  );
  if (!candidate) return null;
  const digits = candidate.replace(/\D/g, "");
  return candidate.trim().startsWith("+") ? `+${digits}` : digits;
}

function phoneFieldsDiffer(left: string, right: string): boolean {
  if (dialablePhone(left) !== dialablePhone(right)) return true;
  const annotation = left
    .normalize("NFKC")
    .replace(/[+\d()\-\s]/g, "");
  return annotation.length > 0;
}

export default function PharmaciesPage() {
  const { t, locale } = useTranslation();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [metadata, setMetadata] = useState<PharmacyMetadata>(INITIAL_METADATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAfterHoursOnly, setShowAfterHoursOnly] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("/data/otc_pharmacies.json", { signal: controller.signal }),
      fetch("/data/otc_pharmacies.meta.json", { signal: controller.signal }),
    ])
      .then(async ([dataResponse, metadataResponse]) => {
        if (!dataResponse.ok || !metadataResponse.ok) {
          throw new Error("Pharmacy data request failed");
        }
        return Promise.all([
          dataResponse.text(),
          metadataResponse.json() as Promise<PharmacyMetadata>,
        ]);
      })
      .then(async ([dataText, nextMetadata]) => {
        const dataHash = await sha256(dataText);
        if (dataHash !== nextMetadata.dataSha256) {
          throw new Error("Pharmacy data hash does not match metadata");
        }
        const data = JSON.parse(dataText) as PharmacyMin[];
        if (data.length !== nextMetadata.total) {
          throw new Error("Pharmacy data and metadata counts do not match");
        }
        const transformed = data.map((p) => ({
          id: p.i,
          name: p.n,
          prefecture: p.p,
          address: p.a,
          phone: p.t,
          hours: p.h,
          afterHours: p.e === 1,
          afterHoursPhone: p.x,
          preContactRequired: p.r === 1,
          website: p.w,
        }));
        setPharmacies(transformed);
        setMetadata(nextMetadata);
      })
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
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
    const phoneNumber = dialablePhone(phone);
    if (phoneNumber) window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label={t("common.back")} className="min-w-11 min-h-11 flex items-center justify-center p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
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
        <h1 className="sr-only">{t("pharmacies.title")}</h1>
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-light rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-text-secondary">
            <strong className="text-primary">{t("pharmacies.officialList")}</strong> - {t("pharmacies.canBuyWithout")}
            （{metadata.total.toLocaleString()}{t("common.results")}）
          </p>
          <p className="text-xs text-text-muted mt-2">
            {t("pharmacies.trialNote")}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {new Intl.DateTimeFormat(
              locale === "ja"
                ? "ja-JP"
                : locale === "zh"
                  ? "zh-CN"
                  : locale === "ko"
                    ? "ko-KR"
                    : locale === "vi"
                      ? "vi-VN"
                      : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            ).format(new Date(`${metadata.sourceUpdatedAt}T00:00:00+09:00`))}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-6">
          {/* Prefecture Select */}
          <div>
            <label htmlFor="prefecture" className="text-sm font-medium text-text-secondary mb-2 block">
              {t("pharmacies.prefecture")}
            </label>
            <select
              id="prefecture"
              value={selectedPrefecture}
              onChange={(e) => setSelectedPrefecture(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                       focus:border-primary focus:outline-none bg-white
                       text-text-primary"
            >
              <option value="">{t("pharmacies.all")}</option>
              {PREFECTURES.map(([prefecture, romaji]) => (
                <option key={prefecture} value={prefecture}>
                  {locale === "ja" ? prefecture : `${romaji} (${prefecture})`}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              aria-label={t("pharmacies.searchPlaceholder")}
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
          <div
            role="status"
            className="flex items-center justify-center gap-3 py-12 text-sm text-text-muted"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span>{t("common.loading")}</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-danger">
            <AlertCircle className="w-6 h-6 mr-2" />
            {t("pharmacies.loadError")}
          </div>
        ) : (
          <>
            <p className="text-sm text-text-muted mb-4">
              {filteredPharmacies.length === 100
                ? `${t("pharmacies.moreThan100")}（${t("pharmacies.showing100")}）`
                : `${filteredPharmacies.length}${t("pharmacies.resultsCount")}`}
            </p>

            <div className="space-y-3">
              {filteredPharmacies.map((pharmacy, index) => (
                  <motion.div
                    key={pharmacy.id}
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
                      {pharmacy.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                          <span>{pharmacy.address}</span>
                        </div>
                      )}

                      {pharmacy.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-text-muted" />
                          <span>
                            {t("pharmacies.primaryPhone")}: {pharmacy.phone}
                          </span>
                        </div>
                      )}

                      {pharmacy.afterHoursPhone &&
                        phoneFieldsDiffer(
                          pharmacy.afterHoursPhone,
                          pharmacy.phone
                        ) && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-text-muted" />
                          <span>
                            {t("pharmacies.afterHoursPhone")}: {pharmacy.afterHoursPhone}
                          </span>
                        </div>
                      )}

                      {pharmacy.hours && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{pharmacy.hours}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        onClick={() => openInMaps(pharmacy)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 
                                 bg-primary-light text-primary rounded-xl text-sm font-medium
                                 hover:bg-primary hover:text-white transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        {t("pharmacies.viewOnMap")}
                      </button>
                      {pharmacy.phone && dialablePhone(pharmacy.phone) && (
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
                      {pharmacy.afterHoursPhone &&
                        phoneFieldsDiffer(
                          pharmacy.afterHoursPhone,
                          pharmacy.phone
                        ) &&
                        dialablePhone(pharmacy.afterHoursPhone) && (
                        <button
                          onClick={() => callPharmacy(pharmacy.afterHoursPhone)}
                          className="col-span-2 flex items-center justify-center gap-2 px-3 py-2
                                   bg-secondary text-white rounded-xl text-sm font-medium
                                   hover:bg-secondary-dark transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {t("pharmacies.callAfterHours")}
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



        {/* Source Info */}
        <div className="mt-8 text-center">
          <a
            href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00005.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
          >
            {t("pharmacies.dataSource")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}
