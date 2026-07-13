"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ActionCard } from "@/components/ui/ActionCard";

import type { Result } from "@/types";
import { useTranslation } from "@/lib/i18n";
import {
  MapPin,
  ClipboardCheck,
  QrCode,
  FileText,
  ExternalLink,
} from "lucide-react";

interface ActionsScreenProps {
  result: Result;
  onBack: () => void;
  onChecklist: () => void;
  onQR: () => void;
  onPDF: () => void;
}

export function ActionsScreen({
  result,
  onBack,
  onChecklist,
  onQR,
  onPDF,
}: ActionsScreenProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const hasUnknownTiming =
    result.route === "pharmacy" && result.elapsedHours === null;

  const openPharmacies = () => {
    router.push("/pharmacies");
  };
  const openHospitals = () => {
    router.push("/hospitals");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-text-primary">{t("actions.title")}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {t("actions.subtitle")}
          </p>
        </motion.div>

        {/* Actions */}
        <div className="space-y-3">
          {hasUnknownTiming && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              <ActionCard
                title={t("actions.searchHospital")}
                subtitle={t("actions.searchHospitalDesc")}
                icon={MapPin}
                onClick={openHospitals}
                color="primary"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ActionCard
              title={result.route === "pharmacy" ? t("actions.searchPharmacy") : t("actions.searchHospital")}
              subtitle={result.route === "pharmacy" ? t("actions.searchPharmacyDesc") : t("actions.searchHospitalDesc")}
              icon={MapPin}
              onClick={result.route === "pharmacy" ? openPharmacies : openHospitals}
              color="primary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ActionCard
              title={t("actions.checklist")}
              subtitle={t("actions.checklistDesc")}
              icon={ClipboardCheck}
              onClick={onChecklist}
              color="secondary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ActionCard
              title={t("actions.generateQr")}
              subtitle={t("actions.generateQrDesc")}
              icon={QrCode}
              onClick={onQR}
              color="accent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ActionCard
              title={t("actions.generatePdf")}
              subtitle={t("actions.generatePdfDesc")}
              icon={FileText}
              onClick={onPDF}
              color="primary"
            />
          </motion.div>
        </div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="text-sm font-semibold text-text-secondary mb-3">
            {t("actions.helpfulLinks")}
          </h3>
          <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
            <a
              href="https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-text-primary hover:text-primary transition-colors"
            >
              <span>{t("actions.linkMhlw")}</span>
              <ExternalLink className="w-4 h-4 text-text-muted" />
            </a>
            <div className="border-t border-primary-light" />
            <a
              href="https://www.jaog.or.jp/qa/youth/jyosei200122/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-text-primary hover:text-primary transition-colors"
            >
              <span>{t("actions.linkJaog")}</span>
              <ExternalLink className="w-4 h-4 text-text-muted" />
            </a>
          </div>
        </motion.div>


      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Button variant="secondary" onClick={onBack}>
          {t("actions.backToResult")}
        </Button>
      </motion.div>
    </div>
  );
}
