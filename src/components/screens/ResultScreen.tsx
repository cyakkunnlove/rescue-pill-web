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

interface ResultScreenProps {
  result: Result;
  onNext: () => void;
  onRestart: () => void;
}

export function ResultScreen({ result, onNext, onRestart }: ResultScreenProps) {
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
            判定結果
          </h1>
          <p className="text-xs text-text-muted">ローカル判定</p>
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

        {/* Guidance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-4">
            <h2 className="text-lg font-bold text-text-primary text-center mb-2">
              {routeInfo.guidance}
            </h2>
            <p className="text-sm text-text-secondary text-center">
              {routeInfo.detail}
            </p>
          </Card>
        </motion.div>

        {/* Headline & Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-4">
            <h3 className="text-xl font-bold text-text-primary text-center mb-3">
              {result.headline}
            </h3>
            <p className="text-sm text-text-secondary text-center">
              {result.detail}
            </p>
            {result.elapsedHours !== null && (
              <div className="mt-4 text-center">
                <span className="text-xs text-text-muted bg-primary-light px-3 py-1 rounded-full">
                  経過時間: 約{result.elapsedHours}時間
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
              <span className="font-semibold text-text-primary">主な理由</span>
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
              <span className="font-semibold text-text-primary">補足</span>
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

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-primary-light to-secondary-light">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm text-text-primary font-medium">
                  不安なときは一人で抱えなくて大丈夫です。
                </p>
                <p className="text-xs text-text-secondary">
                  今できる選択を一緒に整理して進めましょう。
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

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
        <Button onClick={onNext}>次の行動へ</Button>
        <Button variant="secondary" onClick={onRestart}>
          最初からやり直す
        </Button>
      </motion.div>
    </div>
  );
}
