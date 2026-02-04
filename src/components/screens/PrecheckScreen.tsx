"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface PrecheckScreenProps {
  onBack: () => void;
  onProceed: (hasDangerSymptoms: boolean) => void;
}

export function PrecheckScreen({ onBack, onProceed }: PrecheckScreenProps) {
  const { t } = useTranslation();
  const [selection, setSelection] = useState<boolean | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSelect = (value: boolean) => {
    setSelection(value);
    setShowError(false);
    setTimeout(() => onProceed(value), 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <ProgressBar current={1} total={1} title={t("precheck.title")} />

      <div className="flex-1 flex flex-col">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-3 bg-danger bg-opacity-10 rounded-2xl p-4 mb-6">
            <AlertCircle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-1">
                {t("precheck.title")}
              </h2>
              <p className="text-sm text-text-secondary">
                {t("precheck.warning")}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-text-primary text-center mb-2">
            {t("precheck.subtitle")}
          </h3>
          <div className="text-sm text-text-secondary text-center space-y-1">
            <p>• {t("precheck.symptom1")}</p>
            <p>• {t("precheck.symptom2")}</p>
            <p>• {t("precheck.symptom3")}</p>
            <p>• {t("precheck.symptom4")}</p>
          </div>
        </motion.div>

        {/* Choices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 flex-1"
        >
          <ChoiceButton
            label={t("precheck.hasSymptoms")}
            selected={selection === true}
            onClick={() => handleSelect(true)}
          />
          <ChoiceButton
            label={t("precheck.noSymptoms")}
            selected={selection === false}
            onClick={() => handleSelect(false)}
          />
        </motion.div>

        {showError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-danger text-sm text-center mt-4"
          >
            {t("questions.selectRequired")}
          </motion.p>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-3"
        >
          <Button variant="secondary" onClick={onBack}>
            {t("common.back")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
