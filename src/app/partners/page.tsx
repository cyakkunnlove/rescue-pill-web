"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Building2,
  HandHeart,
  Users,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function PartnersPage() {
  const { t } = useTranslation();

  const partnerTypes = [
    {
      icon: Building2,
      titleKey: "partners.corporateTitle",
      descKey: "partners.corporateDesc",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: HandHeart,
      titleKey: "partners.sponsorTitle",
      descKey: "partners.sponsorDesc",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      icon: Users,
      titleKey: "partners.npoTitle",
      descKey: "partners.npoDesc",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

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
              <span className="font-bold text-text-primary">{t("partners.title")}</span>
            </div>
          </div>
          <LanguageSwitcher compact />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            {t("partners.heroTitle")}<br />
            <span className="text-primary">{t("partners.heroTitleHighlight")}</span>
          </h1>
          <p className="text-text-secondary">
            {t("partners.heroDesc")}
          </p>
        </motion.div>

        {/* Partner Types */}
        <div className="space-y-6 mb-8">
          <h2 className="text-lg font-bold text-text-primary">
            {t("partners.partnerTypes")}
          </h2>

          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.titleKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className={`${type.bgColor} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary">{t(type.titleKey)}</h3>
                      <p className="text-sm text-text-secondary">{t(type.descKey)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-text-primary mb-3">
            {t("partners.missionTitle")}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t("partners.heroDesc")}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-lg font-bold text-text-primary">
            {t("partners.ctaTitle")}
          </h2>
          <p className="text-sm text-text-secondary">
            {t("partners.ctaDesc")}
          </p>
          
          <Link href="/contact">
            <Button className="w-full py-4 text-lg">
              <Mail className="w-5 h-5 mr-2" />
              {t("partners.contactButton")}
            </Button>
          </Link>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-6 border-t border-primary-light"
        >
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/terms" className="text-text-muted hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className="text-text-muted hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/" className="text-text-muted hover:text-primary transition-colors">
              {t("footer.backToTop")}
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
