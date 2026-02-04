"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Answers, Result, CaseMeta, FlowStep } from "@/types";

interface AppState {
  step: FlowStep;
  answers: Answers;
  result: Result | null;
  meta: CaseMeta;
  consentDate: Date | null;

  setStep: (step: FlowStep) => void;
  setAnswers: (answers: Partial<Answers>) => void;
  setResult: (result: Result) => void;
  giveConsent: () => void;
  resetAll: () => void;
}

const initialAnswers: Answers = {
  dangerSymptoms: null,
  lastSexDate: null,
  contraceptionIssues: [],
  nonConsensual: null,
  pregnancyTest: null,
  contraindications: [],
  interactionRisk: null,
  breastfeeding: null,
  lastPeriodDate: null,
  birthDate: null,
  heightCm: null,
  weight: null,
  cycleLengthDays: null,
  locationText: null,
  conditionTags: [],
  medicationTags: [],
  supplementTags: [],
  consultPreference: null,
};

function generateCaseId(): string {
  const now = new Date();
  const stamp = now
    .toISOString()
    .slice(0, 16)
    .replace(/[-:T]/g, "")
    .replace(/(\d{8})(\d{4})/, "$1-$2");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RP-${stamp}-${rand}`;
}

function createMeta(): CaseMeta {
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return {
    caseId: generateCaseId(),
    createdAt: now,
    expiresAt: expires,
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      step: "landing",
      answers: initialAnswers,
      result: null,
      meta: createMeta(),
      consentDate: null,

      setStep: (step) => set({ step }),

      setAnswers: (partial) =>
        set((state) => ({
          answers: { ...state.answers, ...partial },
        })),

      setResult: (result) => set({ result }),

      giveConsent: () => set({ consentDate: new Date() }),

      resetAll: () =>
        set({
          step: "landing",
          answers: initialAnswers,
          result: null,
          meta: createMeta(),
        }),
    }),
    {
      name: "rescue-pill-storage",
      partialize: (state) => ({
        consentDate: state.consentDate,
      }),
    }
  )
);
