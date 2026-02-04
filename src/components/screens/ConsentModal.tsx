"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { X, AlertTriangle, Shield, MapPin, Brain, FileWarning } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ConsentModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onClose: () => void;
}

export function ConsentModal({ isOpen, onAgree, onClose }: ConsentModalProps) {
  const { t } = useTranslation();
  const [agreed, setAgreed] = useState(false);

  const consentItems = [
    {
      icon: AlertTriangle,
      titleKey: "consent.item1Title",
      bodyKey: "consent.item1Body",
    },
    {
      icon: FileWarning,
      titleKey: "consent.item2Title",
      bodyKey: "consent.item2Body",
    },
    {
      icon: Shield,
      titleKey: "consent.item3Title",
      bodyKey: "consent.item3Body",
    },
    {
      icon: Brain,
      titleKey: "consent.item4Title",
      bodyKey: "consent.item4Body",
    },
    {
      icon: MapPin,
      titleKey: "consent.item5Title",
      bodyKey: "consent.item5Body",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-light">
              <h2 className="text-lg font-bold text-text-primary">
                {t("consent.title")}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center hover:bg-primary hover:bg-opacity-20 transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="space-y-4">
                {consentItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-text-primary mb-1">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-xs text-text-secondary">{t(item.bodyKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-primary-light bg-background-muted">
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-primary accent-primary cursor-pointer"
                />
                <span className="text-sm text-text-primary font-medium">
                  {t("consent.agreeCheckbox")}
                </span>
              </label>
              <Button onClick={onAgree} disabled={!agreed}>
                {t("consent.agreeButton")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
