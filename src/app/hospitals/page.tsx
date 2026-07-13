"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Hospital,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function HospitalsPage() {
  const { t } = useTranslation();

  const openGoogleMaps = (searchQuery: string) => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`,
      "_blank",
      "noopener,noreferrer"
    );
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
                <Hospital className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-text-primary">{t("hospitals.title")}</span>
            </div>
          </div>
          <LanguageSwitcher compact />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="sr-only">{t("hospitals.title")}</h1>
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">
                {t("hospitals.notice")}
              </p>
              <p className="text-xs text-amber-700 mt-1">
                {t("hospitals.noticeDesc")}
              </p>
              <p className="text-xs text-amber-700 mt-2 font-medium">
                {t("hospitals.onlineNotice")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Options */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-bold text-text-primary">
            {t("hospitals.searchNearby")}
          </h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => openGoogleMaps("緊急避妊 産婦人科")}
              className="w-full text-left"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary">{t("hospitals.searchObgyn")}</h3>
                    <p className="text-sm text-text-secondary">{t("hospitals.searchObgynDesc")}</p>
                  </div>
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
              </Card>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => openGoogleMaps("緊急避妊 婦人科")}
              className="w-full text-left"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary">{t("hospitals.searchGynecology")}</h3>
                    <p className="text-sm text-text-secondary">{t("hospitals.searchGynecologyDesc")}</p>
                  </div>
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
              </Card>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() =>
                openGoogleMaps("休日 夜間 産婦人科 緊急避妊")
              }
              className="w-full text-left"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary">{t("hospitals.searchEmergency")}</h3>
                    <p className="text-sm text-text-secondary">{t("hospitals.searchEmergencyDesc")}</p>
                  </div>
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
              </Card>
            </button>
          </motion.div>
        </div>

        {/* Helpful Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">
            {t("hospitals.helpfulLinks")}
          </h2>
          
          <div className="space-y-3">
            <Card>
              <a
                href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-text-primary text-sm">
                    {t("hospitals.link1Title")}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {t("hospitals.link1Desc")}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
            </Card>

            <Card>
              <a
                href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000186912_00002.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-text-primary text-sm">
                    {t("hospitals.link2Title")}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {t("hospitals.link2Desc")}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
            </Card>

            <Card>
              <a
                href="https://www.mhlw.go.jp/stf/newpage_38226.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-text-primary text-sm">
                    {t("hospitals.link3Title")}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {t("hospitals.link3Desc")}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
            </Card>

            <Card>
              <a
                href="https://www.gender.go.jp/policy/no_violence/seibouryoku/consult.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-text-primary text-sm">
                    {t("hospitals.link4Title")}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {t("hospitals.link4Desc")}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
            </Card>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 shadow-card mb-8"
        >
          <h3 className="font-bold text-text-primary mb-3">{t("hospitals.tips")}</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{t("hospitals.tip1")}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{t("hospitals.tip2")}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{t("hospitals.tip3")}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{t("hospitals.tip4")}</span>
            </li>
          </ul>
        </motion.div>

        {/* Ad Banner */}
        <div className="my-8">
          <AdBanner format="rectangle" />
        </div>

        {/* Back to Pharmacy Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <Link
            href="/pharmacies"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <MapPin className="w-4 h-4" />
            {t("hospitals.findPharmacyLink")}
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
