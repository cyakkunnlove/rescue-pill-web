"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import { Result } from "@/types";
import { getRouteInfo } from "@/lib/ruleEngine";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ResultScreenProps {
  result: Result;
  onNext: () => void;
  onRestart: () => void;
}

export function ResultScreen({ result, onNext, onRestart }: ResultScreenProps) {
  const { t } = useTranslation();
  const [reasonsExpanded, setReasonsExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);

  const routeInfo = getRouteInfo(result.route);

  const getIcon = () => {
    switch (result.route) {
      case "pharmacy":
        return CheckCircle2;
      case "medical":
        return AlertTriangle;
      case "emergency":
        return AlertCircle;
    }
  };

  const getColorClasses = () => {
    switch (result.route) {
      case "pharmacy":
        return {
          bg: "bg-primary bg-opacity-10",
          text: "text-primary",
          badge: "bg-primary",
          icon: "text-primary",
        };
      case "medical":
        return {
          bg: "bg-warning bg-opacity-10",
          text: "text-warning",
          badge: "bg-warning",
          icon: "text-warning",
        };
      case "emergency":
        return {
          bg: "bg-danger bg-opacity-10",
          text: "text-danger",
          badge: "bg-danger",
          icon: "text-danger",
        };
    }
  };

  const getHeadline = () => {
    switch (result.route) {
      case "pharmacy":
        return t("result.pharmacy.headline");
      case "medical":
        return t("result.medical.headline");
      case "emergency":
        return t("result.emergency.headline");
    }
  };

  const getDetail = () => {
    switch (result.route) {
      case "pharmacy":
        return t("result.pharmacy.detail");
      case "medical":
        return t("result.medical.detail");
      case "emergency":
        return t("result.emergency.detail");
    }
  };

  const Icon = getIcon();
  const colors = getColorClasses();

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-lg font-bold text-text-secondary mb-1">
            {result.route === "pharmacy" ? t("result.pharmacy.headline") : 
             result.route === "medical" ? t("result.medical.headline") : 
             t("result.emergency.headline")}
          </h1>
        </motion.div>

        {/* Main Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.badge} text-white`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-semibold">{routeInfo.badge}</span>
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div
            className={`w-24 h-24 rounded-full ${colors.bg} flex items-center justify-center`}
          >
            <Icon className={`w-12 h-12 ${colors.icon}`} />
          </div>
        </motion.div>

        {/* Headline & Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-4">
            <h3 className="text-xl font-bold text-text-primary text-center mb-3">
              {getHeadline()}
            </h3>
            <p className="text-sm text-text-secondary text-center">
              {getDetail()}
            </p>
            {result.elapsedHours !== null && (
              <div className="mt-4 text-center">
                <span className="text-xs text-text-muted bg-primary-light px-3 py-1 rounded-full">
                  {t("result.elapsedTime")} {result.elapsedHours} {t("result.hoursElapsed")}
                </span>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Reasons */}
        {result.reasons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <button
              onClick={() => setReasonsExpanded(!reasonsExpanded)}
              className="w-full bg-white rounded-2xl p-4 shadow-card flex items-center justify-between"
            >
              <span className="font-semibold text-text-primary">{t("result.reasons")}</span>
              {reasonsExpanded ? (
                <ChevronUp className="w-5 h-5 text-text-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-muted" />
              )}
            </button>
            {reasonsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white rounded-b-2xl px-4 pb-4 shadow-card -mt-2"
              >
                <ul className="space-y-2 pt-2">
                  {result.reasons.map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="text-primary">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Notes */}
        {result.notes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4"
          >
            <button
              onClick={() => setNotesExpanded(!notesExpanded)}
              className="w-full bg-white rounded-2xl p-4 shadow-card flex items-center justify-between"
            >
              <span className="font-semibold text-text-primary">{t("result.notes")}</span>
              {notesExpanded ? (
                <ChevronUp className="w-5 h-5 text-text-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-muted" />
              )}
            </button>
            {notesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white rounded-b-2xl px-4 pb-4 shadow-card -mt-2"
              >
                <ul className="space-y-2 pt-2">
                  {result.notes.map((note, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="text-secondary">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Ad */}
        <div className="mt-6">
          <AdBanner />
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 space-y-3"
      >
        <Button onClick={onNext}>{t("result.nextSteps")}</Button>
        <Button variant="secondary" onClick={onRestart}>
          {t("common.startOver")}
        </Button>
      </motion.div>
    </div>
  );
}
