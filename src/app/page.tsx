"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { evaluate } from "@/lib/ruleEngine";
import { Answers, FlowStep, Result, CaseMeta } from "@/types";

import { EntryScreen } from "@/components/screens/EntryScreen";
import { ConsentModal } from "@/components/screens/ConsentModal";
import { PrecheckScreen } from "@/components/screens/PrecheckScreen";
import { QuestionScreen } from "@/components/screens/QuestionScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";
import { ActionsScreen } from "@/components/screens/ActionsScreen";
import { ChecklistScreen } from "@/components/screens/ChecklistScreen";
import { QRScreen } from "@/components/screens/QRScreen";
import { PDFScreen } from "@/components/screens/PDFScreen";

export default function Home() {
  const {
    step,
    setStep,
    answers,
    setAnswers,
    result,
    setResult,
    meta,
    consentDate,
    giveConsent,
    resetAll,
  } = useAppStore();

  const [showConsent, setShowConsent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEntryProceed = useCallback(() => {
    if (consentDate) {
      setStep("precheck");
    } else {
      setShowConsent(true);
    }
  }, [consentDate, setStep]);

  const handleConsentAgree = useCallback(() => {
    giveConsent();
    setShowConsent(false);
    setStep("precheck");
  }, [giveConsent, setStep]);

  const handlePrecheckProceed = useCallback(
    (hasDangerSymptoms: boolean) => {
      setAnswers({ dangerSymptoms: hasDangerSymptoms });
      if (hasDangerSymptoms) {
        // Immediately evaluate and go to result
        const newAnswers = { ...answers, dangerSymptoms: true };
        const evalResult = evaluate(newAnswers);
        setResult(evalResult);
        setStep("result");
      } else {
        setStep("questions");
      }
    },
    [answers, setAnswers, setResult, setStep]
  );

  const handleQuestionsComplete = useCallback(
    (completedAnswers: Answers) => {
      setAnswers(completedAnswers);
      const evalResult = evaluate(completedAnswers);
      setResult(evalResult);
      setStep("result");
    },
    [setAnswers, setResult, setStep]
  );

  const handleRestart = useCallback(() => {
    resetAll();
  }, [resetAll]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl"
        />
      </div>
    );
  }

  return (
    <main className="max-w-md mx-auto min-h-screen">
      <AnimatePresence mode="wait">
        {step === "entry" && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EntryScreen
              onProceed={handleEntryProceed}
              hasConsent={!!consentDate}
            />
          </motion.div>
        )}

        {step === "precheck" && (
          <motion.div
            key="precheck"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <PrecheckScreen
              onBack={() => setStep("entry")}
              onProceed={handlePrecheckProceed}
            />
          </motion.div>
        )}

        {step === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <QuestionScreen
              onBack={() => setStep("precheck")}
              onComplete={handleQuestionsComplete}
              initialAnswers={answers}
            />
          </motion.div>
        )}

        {step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ResultScreen
              result={result}
              onNext={() => setStep("actions")}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {step === "actions" && result && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <ActionsScreen
              result={result}
              onBack={() => setStep("result")}
              onChecklist={() => setStep("checklist")}
              onQR={() => setStep("qr")}
              onPDF={() => setStep("pdf")}
            />
          </motion.div>
        )}

        {step === "checklist" && result && (
          <motion.div
            key="checklist"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <ChecklistScreen
              result={result}
              onBack={() => setStep("actions")}
            />
          </motion.div>
        )}

        {step === "qr" && result && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <QRScreen
              result={result}
              meta={meta}
              answers={answers}
              onBack={() => setStep("actions")}
            />
          </motion.div>
        )}

        {step === "pdf" && result && (
          <motion.div
            key="pdf"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <PDFScreen
              result={result}
              meta={meta}
              answers={answers}
              onBack={() => setStep("actions")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ConsentModal
        isOpen={showConsent}
        onAgree={handleConsentAgree}
        onClose={() => setShowConsent(false)}
      />
    </main>
  );
}
