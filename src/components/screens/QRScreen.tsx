"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Result, CaseMeta, Answers } from "@/types";
import { Download, Share2, Info } from "lucide-react";
import { useTranslation, type Locale } from "@/lib/i18n";

interface QRScreenProps {
  result: Result;
  meta: CaseMeta;
  answers: Answers;
  onBack: () => void;
}

interface QRPayload {
  v: number;
  caseId: string;
  createdAt: string;
  route: string;
  flags: {
    danger: boolean;
    nonConsensual: boolean;
    conditionToDiscuss: boolean;
    pregnancyPositive: boolean;
    interactionRisk: boolean;
  };
  hoursSince: number | null;
}

export function QRScreen({ result, meta, answers, onBack }: QRScreenProps) {
  const { t, locale } = useTranslation();
  const [shareCopied, setShareCopied] = useState(false);
  const payload: QRPayload = useMemo(
    () => ({
      v: 2,
      caseId: meta.caseId,
      createdAt: meta.createdAt.toISOString(),
      route: result.route,
      flags: {
        danger: answers.dangerSymptoms === true,
        nonConsensual: answers.nonConsensual === "yes",
        conditionToDiscuss: answers.contraindications.some(
          (c) => c !== "わからない" && c !== "特にない"
        ),
        pregnancyPositive: answers.pregnancyTest === "yes",
        interactionRisk: answers.interactionRisk !== null && answers.interactionRisk !== "特に飲んでいない",
      },
      hoursSince: result.elapsedHours,
    }),
    [result, meta, answers]
  );

  const qrData = JSON.stringify(payload);

  const routeLabel =
    result.route === "pharmacy"
      ? t("artifact.routePharmacy")
      : result.route === "emergency"
        ? t("artifact.routeEmergency")
        : t("artifact.routeMedical");

  const handleShare = async () => {
    setShareCopied(false);
    const shareText = `${t("qr.caseId")}: ${meta.caseId}\n${t("qr.guidanceLabel")}: ${routeLabel}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("qr.shareTitle"),
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShareCopied(true);
    }
  };

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `rescue-pill-${meta.caseId}.png`;
      link.href = pngUrl;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const dateLocale: Record<Locale, string> = {
    ja: "ja-JP",
    en: "en-US",
    zh: "zh-CN",
    vi: "vi-VN",
    ko: "ko-KR",
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(dateLocale[locale], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-text-primary">{t("qr.title")}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {t("qr.subtitle")}
          </p>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <Card className="inline-block p-8">
            <div id="qr-code" className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value={qrData}
                size={200}
                level="M"
                fgColor="#4A3B52"
                bgColor="#FFFFFF"
              />
            </div>
          </Card>
        </motion.div>

        {/* Case Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t("qr.caseId")}</span>
                <span className="text-text-primary font-medium">
                  {meta.caseId}
                </span>
              </div>
              <div className="border-t border-primary-light" />
              <div className="flex justify-between">
                <span className="text-text-secondary">{t("qr.createdAt")}</span>
                <span className="text-text-primary">
                  {formatDate(meta.createdAt)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
        {shareCopied && (
          <p role="status" className="-mt-3 mb-6 text-center text-sm text-secondary">
            {t("qr.linkCopied")}
          </p>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4
                       bg-white rounded-xl shadow-card text-text-primary
                       hover:bg-primary-light transition-colors"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">{t("qr.save")}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4
                       bg-white rounded-xl shadow-card text-text-primary
                       hover:bg-primary-light transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">{t("qr.share")}</span>
          </button>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-accent-light">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent-dark flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="mb-2">
                  {t("qr.sensitiveNotice")}
                </p>
                <p>
                  {t("qr.integrationNotice")}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Button variant="secondary" onClick={onBack}>
          {t("common.back")}
        </Button>
      </motion.div>
    </div>
  );
}
