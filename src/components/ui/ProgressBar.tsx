"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  title?: string;
}

export function ProgressBar({ current, total, title }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      {title && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary font-medium">
            {title}
          </span>
          <span className="text-sm text-text-muted">
            {current} / {total}
          </span>
        </div>
      )}
      <div className="h-2 bg-primary-light rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </div>
  );
}
