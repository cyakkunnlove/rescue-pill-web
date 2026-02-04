"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ChoiceButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export function ChoiceButton({
  label,
  selected,
  onClick,
  multi = false,
}: ChoiceButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full p-4 rounded-xl border-2 text-left
        flex items-center justify-between
        transition-all duration-200
        ${
          selected
            ? "border-primary bg-primary bg-opacity-10 text-text-primary"
            : "border-primary-light bg-white text-text-secondary hover:border-primary hover:bg-primary-light hover:bg-opacity-30"
        }
      `}
    >
      <span className="font-medium">{label}</span>
      {multi && (
        <div
          className={`
          w-6 h-6 rounded-md border-2 flex items-center justify-center
          transition-all duration-200
          ${
            selected
              ? "bg-primary border-primary"
              : "bg-white border-primary-light"
          }
        `}
        >
          {selected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
      )}
      {!multi && (
        <div
          className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${
            selected
              ? "bg-primary border-primary"
              : "bg-white border-primary-light"
          }
        `}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-white" />}
        </div>
      )}
    </motion.button>
  );
}
