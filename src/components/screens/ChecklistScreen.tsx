"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Result } from "@/types";
import { useTranslation } from "@/lib/i18n";
import { Check, Circle, Info } from "lucide-react";

interface ChecklistScreenProps {
  result: Result;
  onBack: () => void;
}

export function ChecklistScreen({ result, onBack }: ChecklistScreenProps) {
  const { t } = useTranslation();
  const isPharmacy = result.route === "pharmacy";
  const hasUnknownTiming = isPharmacy && result.elapsedHours === null;
  
  const pharmacyItems = [
    t("checklist.pharmacyItem1"),
    t("checklist.pharmacyItem2"),
    t("checklist.pharmacyItem3"),
    t("checklist.pharmacyItem4"),
    t("checklist.pharmacyItem5"),
  ];

  const medicalItems = [
    t("checklist.medicalItem1"),
    t("checklist.medicalItem2"),
    t("checklist.medicalItem3"),
    t("checklist.medicalItem4"),
    t("checklist.medicalItem5"),
    t("checklist.medicalItem6"),
  ];
  
  const items = hasUnknownTiming
    ? [...new Set([...medicalItems, ...pharmacyItems])]
    : isPharmacy
      ? pharmacyItems
      : medicalItems;
  const [checks, setChecks] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const checkedCount = checks.filter(Boolean).length;
  const progress = (checkedCount / items.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-text-primary">
            {hasUnknownTiming
              ? t("checklist.combinedTitle")
              : isPharmacy
                ? t("checklist.pharmacyTitle")
                : t("checklist.medicalTitle")}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {t("checklist.subtitle")}
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>{t("checklist.progress")}</span>
            <span>
              {checkedCount} / {items.length}
            </span>
          </div>
          <div className="h-3 bg-primary-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  type="button"
                  aria-pressed={checks[index]}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => toggleCheck(index)}
                  className="w-full flex items-center gap-3 text-left"
                >
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                               transition-all duration-200
                               ${
                                 checks[index]
                                   ? "bg-secondary border-secondary"
                                   : "border-primary-light"
                               }`}
                  >
                    {checks[index] ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <Circle className="w-4 h-4 text-primary-light" />
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      checks[index]
                        ? "text-text-muted line-through"
                        : "text-text-primary"
                    }`}
                  >
                    {item}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <Card>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                {hasUnknownTiming ? (
                  <div className="space-y-2">
                    <p>{t("hospitals.tip1")}</p>
                    <p>{t("pharmacies.trialNote")}</p>
                  </div>
                ) : isPharmacy ? (
                  <p>{t("pharmacies.trialNote")}</p>
                ) : (
                  <p>{t("hospitals.tip1")}</p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Button variant="secondary" onClick={onBack}>
          {t("common.back")}
        </Button>
      </motion.div>
    </div>
  );
}
