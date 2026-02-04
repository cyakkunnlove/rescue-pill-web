"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AlertCircle } from "lucide-react";

interface PrecheckScreenProps {
  onBack: () => void;
  onProceed: (hasDangerSymptoms: boolean) => void;
}

export function PrecheckScreen({ onBack, onProceed }: PrecheckScreenProps) {
  const [selection, setSelection] = useState<boolean | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSelect = (value: boolean) => {
    setSelection(value);
    setShowError(false);
    // 自動で次に進む
    setTimeout(() => onProceed(value), 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <ProgressBar current={1} total={1} title="事前確認" />

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
                緊急症状の確認
              </h2>
              <p className="text-sm text-text-secondary">
                以下のような症状がある場合は、すぐに医療機関を受診してください。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-text-primary text-center mb-2">
            強い腹痛・大量出血などの
            <br />
            症状はありますか？
          </h3>
          <p className="text-sm text-text-secondary text-center">
            激しい痛み、大量の出血、意識がもうろうとするなど
          </p>
        </motion.div>

        {/* Choices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 flex-1"
        >
          <ChoiceButton
            label="はい（症状がある）"
            selected={selection === true}
            onClick={() => handleSelect(true)}
          />
          <ChoiceButton
            label="いいえ（症状はない）"
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
            選択してください
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
            戻る
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
