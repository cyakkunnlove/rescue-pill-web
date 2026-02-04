"use client";

import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick: () => void;
  color?: "primary" | "secondary" | "accent";
  badge?: string;
}

export function ActionCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
  color = "primary",
  badge,
}: ActionCardProps) {
  const colorClasses = {
    primary: "bg-primary-light text-primary-dark",
    secondary: "bg-secondary-light text-secondary-dark",
    accent: "bg-accent-light text-accent-dark",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-white rounded-2xl p-5 shadow-card
                 flex items-center gap-4 text-left
                 hover:shadow-soft transition-shadow duration-200"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-text-primary">{title}</h3>
          {badge && (
            <span className="px-2 py-0.5 bg-secondary text-white text-xs font-medium rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted" />
    </motion.button>
  );
}
