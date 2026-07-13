"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Answers, TriChoice } from "@/types";
import {
  CONTRACEPTION_OPTIONS,
  CONTRAINDICATION_OPTIONS,
  CONDITION_CATEGORIES,
  MEDICATION_CATEGORIES,
  SUPPLEMENT_TAGS,
  SUPPLEMENT_OPTIONS,
} from "@/types";
import { Info, ChevronDown, ChevronUp, Search, Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { translateAnswerOption } from "@/lib/answerLabels";

interface QuestionScreenProps {
  onBack: () => void;
  onComplete: (answers: Answers) => void;
  initialAnswers: Answers;
}

interface Question {
  id: keyof Answers;
  title: string;
  type:
    | "datetime"
    | "multi"
    | "tri"
    | "bool"
    | "date"
    | "number"
    | "text"
    | "single"
    | "tags";
  options?: string[];
  unknownLabel?: string;
  optional?: boolean;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  hint?: string;
}

// Questions will be defined inside component to use translations

export function QuestionScreen({
  onBack,
  onComplete,
  initialAnswers,
}: QuestionScreenProps) {
  const { t, locale } = useTranslation();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showError, setShowError] = useState(false);
  const [direction, setDirection] = useState(1);

  const questions: Question[] = [
    {
      id: "lastSexDate",
      title: t("questions.q1"),
      type: "datetime",
      hint: t("questions.q1Hint"),
      unknownLabel: t("questions.q1Unknown"),
    },
    {
      id: "contraceptionIssues",
      title: t("questions.q2"),
      type: "multi",
      options: CONTRACEPTION_OPTIONS,
    },
    {
      id: "nonConsensual",
      title: t("questions.q3"),
      type: "tri",
      unknownLabel: t("questions.noAnswer"),
      hint: t("questions.q3Hint"),
    },
    {
      id: "pregnancyTest",
      title: t("questions.q4"),
      type: "tri",
      unknownLabel: t("questions.q4Unknown"),
    },
    {
      id: "contraindications",
      title: t("questions.q5"),
      type: "multi",
      options: CONTRAINDICATION_OPTIONS,
      hint: t("questions.q5Hint"),
    },
    {
      id: "interactionRisk",
      title: t("questions.q6"),
      type: "single",
      options: SUPPLEMENT_OPTIONS,
      hint: t("questions.q6Hint"),
    },
    {
      id: "breastfeeding",
      title: t("questions.q7"),
      type: "tri",
      unknownLabel: t("questions.q7Unknown"),
    },
    {
      id: "lastPeriodDate",
      title: t("questions.q8"),
      type: "date",
      optional: true,
    },
    {
      id: "birthDate",
      title: t("questions.q10"),
      type: "date",
      optional: true,
    },
  ];

  const optionLabel = (option: string) => translateAnswerOption(option, locale);

  const currentQuestion = questions[index];
  const isValid = (candidateAnswers: Answers): boolean => {
    const q = currentQuestion;
    if (q.optional) return true;

    switch (q.id) {
      case "lastSexDate":
        return candidateAnswers.lastSexDate !== null;
      case "contraceptionIssues":
        return candidateAnswers.contraceptionIssues.length > 0;
      case "nonConsensual":
        return candidateAnswers.nonConsensual !== null;
      case "pregnancyTest":
        return candidateAnswers.pregnancyTest !== null;
      case "contraindications":
        return candidateAnswers.contraindications.length > 0;
      case "interactionRisk":
        return candidateAnswers.interactionRisk !== null;
      case "breastfeeding":
        return candidateAnswers.breastfeeding !== null;
      default:
        return true;
    }
  };

  const goNext = (
    skipValidation = false,
    answerOverrides?: Partial<Answers>
  ) => {
    const nextAnswers = answerOverrides
      ? { ...answers, ...answerOverrides }
      : answers;
    if (!skipValidation && !isValid(nextAnswers)) {
      setShowError(true);
      return;
    }
    if (answerOverrides) setAnswers(nextAnswers);
    setShowError(false);
    if (index === questions.length - 1) {
      onComplete(nextAnswers);
    } else {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const goBack = () => {
    if (index === 0) {
      onBack();
    } else {
      setDirection(-1);
      setIndex(index - 1);
      setShowError(false);
    }
  };

  const updateAnswer = (key: keyof Answers, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setShowError(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="h-[100dvh] bg-background flex flex-col px-4 py-4">
      <ProgressBar
        current={index + 1}
        total={questions.length}
        title={`${t("questions.question")} ${index + 1}/${questions.length}`}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Question Title */}
            <motion.h2
              className="text-lg font-bold text-text-primary text-center mb-2"
            >
              {currentQuestion.title}
            </motion.h2>

            {currentQuestion.hint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2 bg-accent-light rounded-xl p-2 mb-3"
              >
                <Info className="w-4 h-4 text-accent-dark flex-shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary">
                  {currentQuestion.hint}
                </p>
              </motion.div>
            )}

            {/* Question Content - scrollable */}
            <div className="flex-1 mt-2 overflow-y-auto min-h-0">
              <QuestionContent
                question={currentQuestion}
                answers={answers}
                updateAnswer={updateAnswer}
                goNext={goNext}
                optionLabel={optionLabel}
                yesLabel={t("common.yes")}
                noLabel={t("common.no")}
                skipLabel={t("common.skip")}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {showError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-danger text-sm text-center mt-2"
          >
            {t("questions.selectRequired")}
          </motion.p>
        )}

        {/* Navigation - fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 grid grid-cols-2 gap-3 flex-shrink-0"
        >
          <Button variant="secondary" onClick={goBack}>
            {t("common.back")}
          </Button>
          <Button onClick={() => goNext()}>
            {index === questions.length - 1 ? t("common.viewResults") : t("common.next")}
          </Button>
        </motion.div>
      </div>

    </div>
  );
}

interface QuestionContentProps {
  question: Question;
  answers: Answers;
  updateAnswer: (key: keyof Answers, value: unknown) => void;
  goNext: (
    skipValidation?: boolean,
    answerOverrides?: Partial<Answers>
  ) => void;
  optionLabel: (option: string) => string;
  yesLabel: string;
  noLabel: string;
  skipLabel: string;
}

function QuestionContent({
  question,
  answers,
  updateAnswer,
  goNext,
  optionLabel,
  yesLabel,
  noLabel,
  skipLabel,
}: QuestionContentProps) {
  switch (question.type) {
    case "datetime":
      return (
        <DateTimeInput
          label={question.title}
          value={answers.lastSexDate}
          onChange={(date) => updateAnswer("lastSexDate", date)}
          onUnknown={() => goNext(true, { lastSexDate: null })}
          unknownLabel={question.unknownLabel || skipLabel}
        />
      );

    case "multi":
      return (
        <MultiSelect
          options={question.options || []}
          selected={answers[question.id] as string[]}
          onChange={(values) => updateAnswer(question.id, values)}
          noneOption={question.id === "contraindications" ? "特にない" : undefined}
          optionLabel={optionLabel}
        />
      );

    case "tri":
      return (
        <TriChoiceInput
          value={answers[question.id] as TriChoice | null}
          unknownLabel={question.unknownLabel || "回答しない"}
          yesLabel={yesLabel}
          noLabel={noLabel}
          onChange={(value) => updateAnswer(question.id, value)}
        />
      );

    case "bool":
      return (
        <BoolInput
          value={answers[question.id] as boolean | null}
          onChange={(value) => updateAnswer(question.id, value)}
        />
      );

    case "date":
      return (
        <DateInput
          label={question.title}
          value={
            question.id === "lastPeriodDate"
              ? answers.lastPeriodDate
              : answers.birthDate
          }
          onChange={(date) => updateAnswer(question.id, date)}
          onSkip={() =>
            goNext(true, { [question.id]: null } as Partial<Answers>)
          }
          skipLabel={skipLabel}
        />
      );

    case "number":
      return (
        <NumberInput
          value={answers[question.id] as number | null}
          onChange={(value) => updateAnswer(question.id, value)}
          unit={question.unit}
          min={question.min}
          max={question.max}
          defaultValue={question.defaultValue}
          onSkip={() =>
            goNext(true, { [question.id]: null } as Partial<Answers>)
          }
          wheelPicker={question.id === "cycleLengthDays"}
        />
      );

    case "text":
      return (
        <TextInput
          value={answers.locationText || ""}
          onChange={(value) => updateAnswer("locationText", value || null)}
          placeholder="例: 東京都渋谷区"
        />
      );

    case "tags":
      return (
        <TagsInput
          questionId={question.id}
          answers={answers}
          onChange={(values) => updateAnswer(question.id, values)}
        />
      );

    case "single":
      return (
        <SingleSelect
          options={question.options || []}
          selected={answers[question.id] as string | null}
          optionLabel={optionLabel}
          onChange={(value) => updateAnswer(question.id, value)}
        />
      );

    default:
      return null;
  }
}

// Sub-components for different input types
function DateTimeInput({
  label,
  value,
  onChange,
  onUnknown,
  unknownLabel,
}: {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onUnknown: () => void;
  unknownLabel: string;
}) {
  const now = new Date();
  const formatForInput = (date: Date) => {
    if (!Number.isFinite(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="datetime-local"
        aria-label={label}
        value={value ? formatForInput(value) : ""}
        max={formatForInput(now)}
        onChange={(event) => {
          const rawValue = event.currentTarget.value;
          if (!rawValue) {
            onChange(null);
            return;
          }
          const parsed = new Date(rawValue);
          onChange(Number.isFinite(parsed.getTime()) ? parsed : null);
        }}
        className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                   focus:border-primary focus:outline-none bg-white text-center
                   text-text-primary"
      />
      <Button variant="secondary" onClick={onUnknown}>
        {unknownLabel}
      </Button>
    </div>
  );
}

function MultiSelect({
  options,
  selected,
  onChange,
  noneOption,
  optionLabel,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  noneOption?: string;
  optionLabel: (option: string) => string;
}) {
  const toggleOption = (option: string) => {
    if (option === noneOption) {
      onChange([option]);
      return;
    }
    
    const filtered = selected.filter((s) => s !== noneOption);
    if (filtered.includes(option)) {
      onChange(filtered.filter((s) => s !== option));
    } else {
      onChange([...filtered, option]);
    }
  };

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
      {options.map((option) => (
        <ChoiceButton
          key={option}
          label={optionLabel(option)}
          selected={selected.includes(option)}
          onClick={() => toggleOption(option)}
          multi
        />
      ))}
    </div>
  );
}

function TriChoiceInput({
  value,
  unknownLabel,
  yesLabel,
  noLabel,
  onChange,
}: {
  value: TriChoice | null;
  unknownLabel: string;
  yesLabel: string;
  noLabel: string;
  onChange: (value: TriChoice) => void;
}) {
  return (
    <div className="space-y-3">
      <ChoiceButton
        label={yesLabel}
        selected={value === "yes"}
        onClick={() => onChange("yes")}
      />
      <ChoiceButton
        label={noLabel}
        selected={value === "no"}
        onClick={() => onChange("no")}
      />
      <ChoiceButton
        label={unknownLabel}
        selected={value === "unknown"}
        onClick={() => onChange("unknown")}
      />
    </div>
  );
}

function BoolInput({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <ChoiceButton
        label="はい"
        selected={value === true}
        onClick={() => onChange(true)}
      />
      <ChoiceButton
        label="いいえ"
        selected={value === false}
        onClick={() => onChange(false)}
      />
    </div>
  );
}

function DateInput({
  label,
  value,
  onChange,
  onSkip,
  skipLabel,
}: {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onSkip?: () => void;
  skipLabel: string;
}) {
  const formatForInput = (date: Date) => {
    if (!Number.isFinite(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
      return;
    }
    onChange(null);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="date"
        aria-label={label}
        value={value ? formatForInput(value) : ""}
        onChange={(event) => {
          const rawValue = event.currentTarget.value;
          if (!rawValue) {
            onChange(null);
            return;
          }
          const parsed = new Date(rawValue);
          onChange(Number.isFinite(parsed.getTime()) ? parsed : null);
        }}
        className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                   focus:border-primary focus:outline-none bg-white text-center
                   text-text-primary"
      />
      <Button variant="secondary" onClick={handleSkip}>
        {skipLabel}
      </Button>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  unit,
  min,
  max,
  defaultValue,
  onSkip,
  wheelPicker,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  onSkip?: () => void;
  wheelPicker?: boolean;
}) {
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
      return;
    }
    onChange(null);
  };

  // Wheel picker for cycle length
  if (wheelPicker && min !== undefined && max !== undefined) {
    return (
      <WheelPicker
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        defaultValue={defaultValue}
        unit={unit}
        onSkip={handleSkip}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value ?? ""}
          min={min}
          max={max}
          placeholder={defaultValue?.toString()}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : null)
          }
          className="w-32 px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                     focus:border-primary focus:outline-none bg-white text-center
                     text-text-primary"
        />
        {unit && (
          <span className="text-lg text-text-secondary font-medium">
            {unit}
          </span>
        )}
      </div>
      <Button variant="secondary" onClick={handleSkip}>
        スキップ
      </Button>
    </div>
  );
}

// Wheel/Drum roll picker component
function WheelPicker({
  value,
  onChange,
  min,
  max,
  defaultValue,
  unit,
  onSkip,
}: {
  value: number | null;
  onChange: (value: number) => void;
  min: number;
  max: number;
  defaultValue?: number;
  unit?: string;
  onSkip?: () => void;
}) {
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? Math.floor((min + max) / 2));
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 48;

  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  useEffect(() => {
    if (containerRef.current) {
      const index = selectedValue - min;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  }, [min, selectedValue]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const newValue = min + index;
      if (newValue !== selectedValue && newValue >= min && newValue <= max) {
        setSelectedValue(newValue);
        onChange(newValue);
      }
    }
  };

  const selectValue = (val: number) => {
    setSelectedValue(val);
    onChange(val);
    if (containerRef.current) {
      const index = val - min;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none rounded-t-2xl" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-2xl" />
        
        {/* Selection indicator */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-12 bg-primary-light bg-opacity-50 border-y-2 border-primary z-0 pointer-events-none" />
        
        {/* Scrollable wheel */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-60 overflow-y-scroll scroll-smooth snap-y snap-mandatory 
                     scrollbar-hide relative border-2 border-primary-light rounded-2xl bg-white"
          style={{
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Padding items */}
          <div style={{ height: itemHeight * 2 }} />
          
          {values.map((val) => (
            <div
              key={val}
              onClick={() => selectValue(val)}
              className={`h-12 flex items-center justify-center cursor-pointer snap-center
                transition-all duration-150
                ${selectedValue === val 
                  ? 'text-2xl font-bold text-primary' 
                  : 'text-lg text-text-muted'}`}
              style={{ scrollSnapAlign: 'center' }}
            >
              {val}
              {unit && selectedValue === val && (
                <span className="ml-1 text-lg">{unit}</span>
              )}
            </div>
          ))}
          
          {/* Padding items */}
          <div style={{ height: itemHeight * 2 }} />
        </div>
      </div>
      
      <p className="text-sm text-text-muted">
        スクロールまたはタップで選択
      </p>
      
      <Button variant="secondary" onClick={onSkip}>
        スキップ
      </Button>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                   focus:border-primary focus:outline-none bg-white
                   text-text-primary placeholder:text-text-muted"
      />
    </div>
  );
}

function TagsInput({
  questionId,
  answers,
  onChange,
}: {
  questionId: keyof Answers;
  answers: Answers;
  onChange: (values: string[]) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");

  const categories =
    questionId === "conditionTags"
      ? CONDITION_CATEGORIES
      : questionId === "medicationTags"
      ? MEDICATION_CATEGORIES
      : [];

  const supplementsVisible = questionId === "medicationTags";

  const selected = (answers[questionId] as string[]) || [];

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  const addCustom = () => {
    if (customInput.trim() && !selected.includes(customInput.trim())) {
      onChange([...selected, customInput.trim()]);
      setCustomInput("");
    }
  };

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    tags: cat.tags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.tags.length > 0);

  return (
    <div className="space-y-4 max-h-[55vh] overflow-y-auto">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="検索..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-primary-light 
                     focus:border-primary focus:outline-none bg-white
                     text-text-primary placeholder:text-text-muted"
        />
      </div>

      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((tag) => (
            <motion.button
              key={tag}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => toggleTag(tag)}
              className="px-3 py-1.5 bg-primary text-white text-sm rounded-full
                         flex items-center gap-1"
            >
              {tag}
              <span className="text-white/80">×</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Categories */}
      {filteredCategories.map((category) => (
        <div key={category.title} className="border-2 border-primary-light rounded-xl overflow-hidden">
          <button
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category.title ? null : category.title
              )
            }
            className="w-full px-4 py-3 flex items-center justify-between bg-primary-light bg-opacity-30"
          >
            <span className="font-medium text-text-primary">
              {category.title}
            </span>
            {expandedCategory === category.title ? (
              <ChevronUp className="w-5 h-5 text-text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            )}
          </button>
          <AnimatePresence>
            {expandedCategory === category.title && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors
                        ${
                          selected.includes(tag)
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-text-secondary border-primary-light hover:border-primary"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Supplements (for medications) */}
      {supplementsVisible && (
        <div className="border-2 border-primary-light rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-primary-light bg-opacity-30">
            <span className="font-medium text-text-primary">
              サプリメント・漢方
            </span>
          </div>
          <div className="p-3 flex flex-wrap gap-2">
            {SUPPLEMENT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors
                  ${
                    selected.includes(tag)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-text-secondary border-primary-light hover:border-primary"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="自由入力で追加"
          onKeyPress={(e) => e.key === "Enter" && addCustom()}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-primary-light 
                     focus:border-primary focus:outline-none bg-white
                     text-text-primary placeholder:text-text-muted"
        />
        <button
          onClick={addCustom}
          className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function SingleSelect({
  options,
  selected,
  onChange,
  optionLabel,
}: {
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
  optionLabel: (option: string) => string;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <ChoiceButton
          key={option}
          label={optionLabel(option)}
          selected={selected === option}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}
