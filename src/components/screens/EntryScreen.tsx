"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heart, Shield, Clock, FileText } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface EntryScreenProps {
  onProceed: () => void;
  hasConsent: boolean;
}

export function EntryScreen({ onProceed, hasConsent }: EntryScreenProps) {
  const { t } = useTranslation();

  const benefits = [
    { icon: Shield, textKey: "entry.point1" },
    { icon: Clock, textKey: "entry.point2" },
    { icon: FileText, textKey: "entry.point3" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-soft">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-primary mb-2">{t("common.appName")}</h1>
          <p className="text-lg text-text-secondary font-medium">
            {t("common.tagline")}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-text-secondary mb-8 max-w-sm"
        >
          {t("entry.description")}
        </motion.p>

        {/* Benefits Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm mb-8"
        >
          <Card>
            <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-lg">✨</span>
              {t("entry.subtitle")}
            </h2>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-text-secondary">
                    {t(benefit.textKey)}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm mb-8"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800 font-medium mb-1">{t("entry.important")}</p>
            <p className="text-xs text-amber-700">{t("entry.importantNote")}</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button onClick={onProceed}>
            {t("entry.startCheck")}
          </Button>
          {hasConsent && (
            <p className="text-xs text-text-muted text-center">
              ✓ {t("entry.consentGiven")}
            </p>
          )}
        </motion.div>
      </div>

    </div>
  );
}
