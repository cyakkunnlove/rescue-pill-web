"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClass =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark shadow-soft"
      : "bg-white text-primary border-2 border-primary hover:bg-primary-light hover:bg-opacity-20";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        w-full font-medium py-3.5 px-6 rounded-2xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${baseClass}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
