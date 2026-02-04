"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChoiceButton } from "@/components/ui/ChoiceButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import {
  Answers,
  TriChoice,
  CONTRACEPTION_OPTIONS,
  CONTRAINDICATION_OPTIONS,
  CONSULT_OPTIONS,
  CONDITION_CATEGORIES,
  MEDICATION_CATEGORIES,
  SUPPLEMENT_TAGS,
  SUPPLEMENT_OPTIONS,
} from "@/types";
import { Info, ChevronDown, ChevronUp, Search, Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

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
  const { t } = useTranslation();
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
      id: "cycleLengthDays",
      title: t("questions.q9"),
      type: "number",
      optional: true,
      unit: t("questions.q9Unit"),
      min: 20,
      max: 40,
      defaultValue: 28,
    },
    {
      id: "birthDate",
      title: t("questions.q10"),
      type: "date",
      optional: true,
    },
    {
      id: "heightCm",
      title: t("questions.q11"),
      type: "number",
      optional: true,
      unit: t("questions.q11Unit"),
      min: 120,
      max: 200,
      defaultValue: 155,
    },
    {
      id: "weight",
      title: t("questions.q12"),
      type: "number",
      optional: true,
      unit: t("questions.q12Unit"),
      min: 30,
      max: 150,
      defaultValue: 50,
    },
    {
      id: "locationText",
      title: t("questions.q13"),
      type: "text",
      optional: true,
      hint: t("questions.q13Hint"),
    },
    {
      id: "conditionTags",
      title: t("questions.q14"),
      type: "tags",
      optional: true,
    },
    {
      id: "medicationTags",
      title: t("questions.q15"),
      type: "tags",
      optional: true,
    },
    {
      id: "consultPreference",
      title: t("questions.q16"),
      type: "single",
      options: CONSULT_OPTIONS,
      optional: true,
    },
  ];

  const currentQuestion = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const isValid = (): boolean => {
    const q = currentQuestion;
    if (q.optional) return true;

    switch (q.id) {
      case "lastSexDate":
        return answers.lastSexDate !== null;
      case "contraceptionIssues":
        return answers.contraceptionIssues.length > 0;
      case "nonConsensual":
        return answers.nonConsensual !== null;
      case "pregnancyTest":
        return answers.pregnancyTest !== null;
      case "contraindications":
        return answers.contraindications.length > 0;
      case "interactionRisk":
        return answers.interactionRisk !== null;
      case "breastfeeding":
        return answers.breastfeeding !== null;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!isValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (index === questions.length - 1) {
      onComplete(answers);
    } else {
      setDirection(1);
      setIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (index === 0) {
      onBack();
    } else {
      setDirection(-1);
      setIndex((i) => i - 1);
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
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      <ProgressBar
        current={index + 1}
        total={questions.length}
        title={`${t("questions.question")} ${index + 1}/${questions.length}`}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Question Title */}
            <motion.h2
              className="text-xl font-bold text-text-primary text-center mb-2"
            >
              {currentQuestion.title}
            </motion.h2>

            {currentQuestion.hint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2 bg-accent-light rounded-xl p-3 mb-4"
              >
                <Info className="w-4 h-4 text-accent-dark flex-shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary">
                  {currentQuestion.hint}
                </p>
              </motion.div>
            )}

            {/* Question Content */}
            <div className="flex-1 mt-4">
              <QuestionContent
                question={currentQuestion}
                answers={answers}
                updateAnswer={updateAnswer}
                goNext={goNext}
              />
            </div>
          </motion.div>
        </AnimatePresence>

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
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <Button variant="secondary" onClick={goBack}>
            {t("common.back")}
          </Button>
          <Button onClick={goNext}>
            {index === questions.length - 1 ? t("common.viewResults") : t("common.next")}
          </Button>
        </motion.div>
      </div>

      {/* Show ad every 5 questions */}
      {(index + 1) % 5 === 0 && (
        <div className="mt-4">
          <AdBanner />
        </div>
      )}
    </div>
  );
}

interface QuestionContentProps {
  question: Question;
  answers: Answers;
  updateAnswer: (key: keyof Answers, value: unknown) => void;
  goNext: () => void;
}

function QuestionContent({
  question,
  answers,
  updateAnswer,
  goNext,
}: QuestionContentProps) {
  switch (question.type) {
    case "datetime":
      return (
        <DateTimeInput
          value={answers.lastSexDate}
          onChange={(date) => updateAnswer("lastSexDate", date)}
        />
      );

    case "multi":
      return (
        <MultiSelect
          options={question.options || []}
          selected={answers[question.id] as string[]}
          onChange={(values) => updateAnswer(question.id, values)}
          noneOption={question.id === "contraindications" ? "特にない" : undefined}
          onSelectNone={goNext}
        />
      );

    case "tri":
      return (
        <TriChoiceInput
          value={answers[question.id] as TriChoice | null}
          unknownLabel={question.unknownLabel || "回答しない"}
          onChange={(value) => {
            updateAnswer(question.id, value);
            setTimeout(goNext, 200);
          }}
        />
      );

    case "bool":
      return (
        <BoolInput
          value={answers[question.id] as boolean | null}
          onChange={(value) => {
            updateAnswer(question.id, value);
            setTimeout(goNext, 200);
          }}
        />
      );

    case "date":
      return (
        <DateInput
          value={
            question.id === "lastPeriodDate"
              ? answers.lastPeriodDate
              : answers.birthDate
          }
          onChange={(date) => updateAnswer(question.id, date)}
          onSkip={goNext}
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
          onSkip={goNext}
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
          onChange={(value) => {
            updateAnswer(question.id, value);
            setTimeout(goNext, 200);
          }}
        />
      );

    default:
      return null;
  }
}

// Sub-components for different input types
function DateTimeInput({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
}) {
  const now = new Date();
  const formatForInput = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="datetime-local"
        value={value ? formatForInput(value) : ""}
        max={formatForInput(now)}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                   focus:border-primary focus:outline-none bg-white text-center
                   text-text-primary"
      />
      <p className="text-xs text-text-muted mt-2">
        できるだけ正確な日時を入力してください
      </p>
    </div>
  );
}

function MultiSelect({
  options,
  selected,
  onChange,
  noneOption,
  onSelectNone,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  noneOption?: string;
  onSelectNone?: () => void;
}) {
  const toggleOption = (option: string) => {
    if (option === noneOption) {
      onChange([option]);
      onSelectNone?.();
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
          label={option}
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
  onChange,
}: {
  value: TriChoice | null;
  unknownLabel: string;
  onChange: (value: TriChoice) => void;
}) {
  return (
    <div className="space-y-3">
      <ChoiceButton
        label="はい"
        selected={value === "yes"}
        onClick={() => onChange("yes")}
      />
      <ChoiceButton
        label="いいえ"
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
  value,
  onChange,
  onSkip,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
  onSkip?: () => void;
}) {
  const formatForInput = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const handleSkip = () => {
    onChange(null);
    if (onSkip) {
      setTimeout(onSkip, 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="date"
        value={value ? formatForInput(value) : ""}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-primary-light 
                   focus:border-primary focus:outline-none bg-white text-center
                   text-text-primary"
      />
      <Button variant="secondary" onClick={handleSkip}>
        スキップ
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
    onChange(null);
    if (onSkip) {
      setTimeout(onSkip, 100);
    }
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
  const visibleItems = 5;

  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  useEffect(() => {
    if (containerRef.current) {
      const index = selectedValue - min;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  }, []);

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
}: {
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <ChoiceButton
          key={option}
          label={option}
          selected={selected === option}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}
