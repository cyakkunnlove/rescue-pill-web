"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Result, CaseMeta, Answers, TriChoice } from "@/types";
import { Download, FileText, Loader2 } from "lucide-react";

interface PDFScreenProps {
  result: Result;
  meta: CaseMeta;
  answers: Answers;
  onBack: () => void;
}

function formatBool(value: boolean | null): string {
  if (value === null) return "未選択";
  return value ? "はい" : "いいえ";
}

function formatTri(value: TriChoice | null, unknownLabel = "回答しない"): string {
  if (value === null) return "未選択";
  if (value === "yes") return "はい";
  if (value === "no") return "いいえ";
  return unknownLabel;
}

function formatDate(date: Date | null): string {
  if (!date) return "未入力";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatDateTime(date: Date | null): string {
  if (!date) return "未入力";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function PDFScreen({ result, meta, answers, onBack }: PDFScreenProps) {
  const [generating, setGenerating] = useState(false);

  const qaPairs = useMemo(
    () => [
      ["Q1 強い腹痛・大量出血などの症状はありますか？", formatBool(answers.dangerSymptoms)],
      ["Q2 最後の性行為はいつですか？", formatDateTime(answers.lastSexDate)],
      [
        "Q3 避妊の状況は？",
        answers.contraceptionIssues.length > 0
          ? answers.contraceptionIssues.join(" / ")
          : "未選択",
      ],
      ["Q4 同意が確認できない状況が含まれますか？", formatTri(answers.nonConsensual)],
      ["Q5 妊娠検査で陽性でしたか？", formatTri(answers.pregnancyTest, "未検査")],
      [
        "Q6 持病・禁忌に該当する項目はありますか？",
        answers.contraindications.length > 0
          ? answers.contraindications.join(" / ")
          : "未選択",
      ],
      ["Q7 相互作用の可能性がある薬・サプリを服用中ですか？", formatBool(answers.interactionRisk)],
      ["Q8 現在、授乳中ですか？", formatTri(answers.breastfeeding, "わからない")],
      ["Q9 最終月経開始日（任意）", formatDate(answers.lastPeriodDate)],
      [
        "Q10 月経周期の長さ（日数・任意）",
        answers.cycleLengthDays ? `${answers.cycleLengthDays}日` : "未入力",
      ],
      ["Q11 生年月日（任意）", formatDate(answers.birthDate)],
      ["Q12 身長（任意）", answers.heightCm ? `${answers.heightCm}cm` : "未入力"],
      ["Q13 体重（任意）", answers.weight ? `${answers.weight}kg` : "未入力"],
      ["Q14 現在地（任意）", answers.locationText || "未入力"],
      [
        "Q15 持病・既往症（任意）",
        answers.conditionTags.length > 0 ? answers.conditionTags.join(" / ") : "未入力",
      ],
      [
        "Q16 服用中の薬（任意）",
        [...answers.medicationTags, ...answers.supplementTags].length > 0
          ? [...answers.medicationTags, ...answers.supplementTags].join(" / ")
          : "未入力",
      ],
      ["Q17 相談先の希望（任意）", answers.consultPreference || "未入力"],
    ],
    [answers]
  );

  const generatePDF = async () => {
    setGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const { pdf, Document, Page, Text, View, StyleSheet, Font } = await import(
        "@react-pdf/renderer"
      );

      // Register font
      Font.register({
        family: "NotoSansJP",
        src: "https://fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.otf",
      });

      const styles = StyleSheet.create({
        page: {
          padding: 40,
          fontFamily: "NotoSansJP",
          fontSize: 10,
        },
        header: {
          marginBottom: 20,
          borderBottom: "1pt solid #E8A0BF",
          paddingBottom: 10,
        },
        title: {
          fontSize: 18,
          color: "#E8A0BF",
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
          flexDirection: "row",
          borderBottom: "0.5pt solid #F2C6D8",
          paddingVertical: 5,
        },
        question: {
          width: "50%",
          color: "#7D6B8A",
        },
        answer: {
          width: "50%",
          color: "#4A3B52",
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

      const routeLabel =
        result.route === "pharmacy"
          ? "薬局対応の可能性"
          : result.route === "emergency"
          ? "緊急受診"
          : "医療機関推奨";

      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Rescue Pill 問診結果</Text>
              <Text style={styles.subtitle}>
                ケースID: {meta.caseId} | 作成: {formatDateTime(meta.createdAt)}
              </Text>
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>判定: {routeLabel}</Text>
              <Text style={styles.resultDetail}>{result.headline}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>問診内容</Text>
              {qaPairs.map(([q, a], i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.question}>{q}</Text>
                  <Text style={styles.answer}>{a}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.footer}>
              このPDFは参考情報であり、医療行為の代替ではありません。 | Rescue
              Pill
            </Text>
          </Page>
        </Document>
      );

      const blob = await pdf(MyDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rescue-pill-${meta.caseId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
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
          <h1 className="text-2xl font-bold text-text-primary">PDFプレビュー</h1>
          <p className="text-sm text-text-secondary mt-1">
            問診内容をPDFで保存・印刷できます
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
                  問診結果PDF
                </h3>
                <p className="text-sm text-text-secondary">
                  {meta.caseId}
                </p>
              </div>
            </div>

            <div className="border-t border-primary-light pt-4 space-y-2 text-sm">
              <p className="text-text-secondary">
                <span className="font-medium">含まれる内容:</span>
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-1 pl-2">
                <li>ケースID・作成日時</li>
                <li>判定結果</li>
                <li>全問診項目と回答</li>
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Q&A Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-text-secondary mb-3">
            回答プレビュー
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
                ... 他 {qaPairs.length - 5} 項目
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
                生成中...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                PDFをダウンロード
              </span>
            )}
          </Button>
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
          戻る
        </Button>
      </motion.div>
    </div>
  );
}
