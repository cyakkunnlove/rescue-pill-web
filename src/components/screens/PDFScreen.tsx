"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Result, CaseMeta, Answers, TriChoice } from "@/types";
import { Download, FileText, Loader2 } from "lucide-react";
import { useTranslation, type Locale } from "@/lib/i18n";
import { translateAnswerOption } from "@/lib/answerLabels";
import { translateResultLine } from "@/lib/resultTranslations";

interface PDFScreenProps {
  result: Result;
  meta: CaseMeta;
  answers: Answers;
  onBack: () => void;
}

const DATE_LOCALES: Record<Locale, string> = {
  ja: "ja-JP",
  en: "en-US",
  zh: "zh-CN",
  vi: "vi-VN",
  ko: "ko-KR",
};

export function PDFScreen({ result, meta, answers, onBack }: PDFScreenProps) {
  const { t, locale } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(false);

  const formatBool = (value: boolean | null): string => {
    if (value === null) return t("pdf.notSelected");
    return value ? t("common.yes") : t("common.no");
  };

  const formatTri = (
    value: TriChoice | null,
    unknownLabel = t("questions.noAnswer")
  ): string => {
    if (value === null) return t("pdf.notSelected");
    if (value === "yes") return t("common.yes");
    if (value === "no") return t("common.no");
    return unknownLabel;
  };

  const formatDate = (date: Date | null): string => {
    if (!date || !Number.isFinite(date.getTime())) return t("pdf.notEntered");
    return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const formatDateTime = (date: Date | null): string => {
    if (!date || !Number.isFinite(date.getTime())) return t("pdf.notEntered");
    return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const qaPairs = [
      [`Q1 ${t("pdf.dangerQuestion")}`, formatBool(answers.dangerSymptoms)],
      [
        `Q2 ${t("questions.q1")}`,
        answers.lastSexDate
          ? formatDateTime(answers.lastSexDate)
          : answers.dangerSymptoms
            ? t("pdf.notEntered")
            : t("questions.q1Unknown"),
      ],
      [
        `Q3 ${t("questions.q2")}`,
        answers.contraceptionIssues.length > 0
          ? answers.contraceptionIssues
              .map((answer) => translateAnswerOption(answer, locale))
              .join(" / ")
          : t("pdf.notSelected"),
      ],
      [
        `Q4 ${t("questions.q3")}`,
        formatTri(answers.nonConsensual),
      ],
      [
        `Q5 ${t("questions.q4")}`,
        formatTri(answers.pregnancyTest, t("questions.q4Unknown")),
      ],
      [
        `Q6 ${t("questions.q5")}`,
        answers.contraindications.length > 0
          ? answers.contraindications
              .map((answer) => translateAnswerOption(answer, locale))
              .join(" / ")
          : t("pdf.notSelected"),
      ],
      [
        `Q7 ${t("questions.q6")}`,
        answers.interactionRisk
          ? translateAnswerOption(answers.interactionRisk, locale)
          : t("pdf.notSelected"),
      ],
      [
        `Q8 ${t("questions.q7")}`,
        formatTri(answers.breastfeeding, t("questions.q7Unknown")),
      ],
      [`Q9 ${t("questions.q8")}`, formatDate(answers.lastPeriodDate)],
      [`Q10 ${t("questions.q10")}`, formatDate(answers.birthDate)],
    ];

  const routeLabel =
    result.route === "pharmacy"
      ? t("artifact.routePharmacy")
      : result.route === "emergency"
        ? t("artifact.routeEmergency")
        : t("artifact.routeMedical");

  const generatePDF = async () => {
    setGenerating(true);
    setGenerationError(false);

    try {
      // Dynamic import to avoid SSR issues
      const { pdf, Document, Page, Text, View, StyleSheet, Font } = await import(
        "@react-pdf/renderer"
      );

      // Register font
      Font.register({
        family: "NotoSansCJK",
        src: `${window.location.origin}/fonts/NotoSansCJKjp-Regular.otf`,
      });

      const styles = StyleSheet.create({
        page: {
          padding: 40,
          fontFamily: "NotoSansCJK",
          fontSize: 10,
        },
        header: {
          marginBottom: 20,
          borderBottom: "1pt solid #E8A0BF",
          paddingBottom: 10,
        },
        title: {
          fontSize: 18,
          color: "#9B355D",
          marginBottom: 5,
        },
        subtitle: {
          fontSize: 10,
          color: "#7D6B8A",
        },
        section: {
          marginBottom: 15,
        },
        sectionTitle: {
          fontSize: 12,
          color: "#4A3B52",
          marginBottom: 8,
          backgroundColor: "#FFF0F4",
          padding: 5,
        },
        row: {
          flexDirection: "column",
          borderBottom: "0.5pt solid #F2C6D8",
          paddingVertical: 5,
        },
        question: {
          width: "100%",
          color: "#7D6B8A",
          marginBottom: 2,
        },
        answer: {
          width: "100%",
          color: "#4A3B52",
          paddingLeft: 8,
        },
        resultBox: {
          backgroundColor: "#FFF0F4",
          padding: 15,
          borderRadius: 5,
          marginBottom: 15,
        },
        resultTitle: {
          fontSize: 14,
          color: "#4A3B52",
          marginBottom: 5,
        },
        resultDetail: {
          fontSize: 10,
          color: "#7D6B8A",
        },
        footer: {
          position: "absolute",
          bottom: 30,
          left: 40,
          right: 40,
          fontSize: 8,
          color: "#A99AB5",
          textAlign: "center",
        },
      });

      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>{t("pdf.documentTitle")}</Text>
              <Text style={styles.subtitle}>
                {t("pdf.caseId")}: {meta.caseId} | {t("pdf.createdAt")}: {formatDateTime(meta.createdAt)}
              </Text>
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>{t("pdf.guidanceLabel")}: {routeLabel}</Text>
              <Text style={styles.resultDetail}>{translateResultLine(result.headline, locale)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("pdf.inputContent")}</Text>
              {qaPairs.map(([q, a], i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.question}>{q}</Text>
                  <Text style={styles.answer}>{a}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.footer}>
              {t("pdf.disclaimer")} | Rescue Pill
            </Text>
          </Page>
        </Document>
      );

      const blob = await pdf(MyDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rescue-pill-${meta.caseId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("PDF generation failed:", error);
      setGenerationError(true);
    } finally {
      setGenerating(false);
    }
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
          <h1 className="text-2xl font-bold text-text-primary">{t("pdf.previewTitle")}</h1>
          <p className="text-sm text-text-secondary mt-1">
            {t("pdf.previewSubtitle")}
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  {t("pdf.cardTitle")}
                </h3>
                <p className="text-sm text-text-secondary">
                  {meta.caseId}
                </p>
              </div>
            </div>

            <div className="border-t border-primary-light pt-4 space-y-2 text-sm">
              <p className="text-text-secondary">
                <span className="font-medium">{t("pdf.includes")}</span>
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-1 pl-2">
                <li>{t("pdf.includesCase")}</li>
                <li>{t("pdf.includesGuidance")}</li>
                <li>{t("pdf.includesAnswers")}</li>
              </ul>
            </div>
          </Card>
          <p className="text-xs text-text-muted mt-3 leading-relaxed">
            {t("pdf.sensitiveNotice")}
          </p>
        </motion.div>

        {/* Q&A Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-text-secondary mb-3">
            {t("pdf.answerPreview")}
          </h3>
          <Card className="max-h-60 overflow-y-auto">
            <div className="space-y-3">
              {qaPairs.slice(0, 5).map(([q, a], i) => (
                <div key={i} className="border-b border-primary-light pb-2 last:border-0">
                  <p className="text-xs text-text-muted">{q}</p>
                  <p className="text-sm text-text-primary">{a}</p>
                </div>
              ))}
              <p className="text-xs text-text-muted text-center">
                {t("pdf.moreItems").replace("{count}", String(qaPairs.length - 5))}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button onClick={generatePDF} disabled={generating}>
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t("pdf.generating")}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {t("pdf.download")}
              </span>
            )}
          </Button>
          {generationError && (
            <p role="alert" className="mt-3 text-sm text-danger text-center">
              {t("pdf.generationError")}
            </p>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Button variant="secondary" onClick={onBack}>
          {t("common.back")}
        </Button>
      </motion.div>
    </div>
  );
}
