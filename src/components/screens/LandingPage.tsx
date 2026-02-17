"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdBanner } from "@/components/AdBanner";
import {
  Heart,
  Shield,
  Clock,
  FileText,
  MapPin,
  QrCode,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Lock,
  Smartphone,
  HelpCircle,
  HandHeart,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useTranslation();

  const features = [
    { icon: Shield, titleKey: "landing.anonymous", descKey: "landing.anonymousDesc" },
    { icon: Clock, titleKey: "landing.quick", descKey: "landing.quickDesc" },
    { icon: MapPin, titleKey: "landing.pharmacy", descKey: "landing.pharmacyDesc" },
    { icon: FileText, titleKey: "landing.pdf", descKey: "landing.pdfDesc" },
  ];

  const steps = [
    { number: "01", titleKey: "landing.step1Title", descKey: "landing.step1Desc" },
    { number: "02", titleKey: "landing.step2Title", descKey: "landing.step2Desc" },
    { number: "03", titleKey: "landing.step3Title", descKey: "landing.step3Desc" },
  ];

  const faqs = [
    { qKey: "landing.faq1Q", aKey: "landing.faq1A" },
    { qKey: "landing.faq2Q", aKey: "landing.faq2A" },
    { qKey: "landing.faq3Q", aKey: "landing.faq3A" },
    { qKey: "landing.faq4Q", aKey: "landing.faq4A" },
    { qKey: "landing.faq5Q", aKey: "landing.faq5A" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-light rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative px-4 pt-4 pb-16">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher compact />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-soft">
                <Heart className="w-10 h-10 text-white" fill="white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-primary mb-2">{t("common.appName")}</h1>
            <p className="text-text-secondary font-medium">{t("common.tagline")}</p>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md mx-auto mb-8"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-4 leading-relaxed">
              {t("landing.heroTitle")}
              <br />
              <span className="text-primary">{t("landing.heroTitleHighlight")}</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("landing.heroDescription")}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-sm mx-auto space-y-4"
          >
            <Button onClick={onStart} className="w-full group">
              <span>{t("landing.startButton")}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-text-muted text-center">
              {t("landing.startNote")}
            </p>
          </motion.div>

          {/* Supervised Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-primary-light">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-text-primary">
                {t("common.supervised")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              FEATURES
            </span>
            <h2 className="text-2xl font-bold text-text-primary">
              {t("landing.features")}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4" />
              HOW IT WORKS
            </span>
            <h2 className="text-2xl font-bold text-text-primary">{t("landing.howItWorks")}</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-text-primary mb-1">{t(step.titleKey)}</h3>
                  <p className="text-sm text-text-secondary">{t(step.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Privacy Section */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary-light to-accent-light">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-soft flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">
            {t("landing.privacyTitle")}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            {t("landing.privacyDesc")}
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Smartphone className="w-4 h-4 text-primary" />
              {t("landing.deviceOnly")}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Shield className="w-4 h-4 text-primary" />
              {t("landing.noDataSend")}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ad Banner */}
      <div className="px-4 py-4">
        <AdBanner />
      </div>

      {/* FAQ Section */}
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-text-primary">
              {t("landing.faq")}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-start justify-between gap-3"
                  >
                    <span className="font-medium text-text-primary text-sm">
                      {t(faq.qKey)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-primary-light"
                    >
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partner Section */}
      <section className="px-4 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4">
            <HandHeart className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-3">
            {t("landing.partnerTitle")}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            {t("landing.partnerDesc")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/partners">
              <Button variant="outline" className="w-full sm:w-auto">
                <HandHeart className="w-4 h-4 mr-2" />
                {t("landing.partnerButton")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                {t("landing.contactButton")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary to-secondary">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {t("landing.finalCta")}
          </h2>
          <p className="text-white/80 mb-6">
            {t("landing.finalCtaDesc")}
          </p>
          <Button
            variant="secondary"
            onClick={onStart}
            className="bg-white text-primary hover:bg-white/90"
          >
            {t("landing.startFree")}
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-text-primary">
        <div className="max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-white font-bold">{t("common.appName")}</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
              お役立ち情報
            </Link>
            <Link href="/partners" className="text-white/70 hover:text-white transition-colors">
              {t("footer.partners")}
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
              {t("footer.contact")}
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/legal" className="text-white/70 hover:text-white transition-colors">
              {t("footer.legal")}
            </Link>
            <Link href="/disclaimer" className="text-white/70 hover:text-white transition-colors">
              {t("footer.disclaimer")}
            </Link>
          </div>

          {/* Supervised */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <BadgeCheck className="w-4 h-4 text-primary-light" />
              <span className="text-xs text-white/70">{t("common.supervised")}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white/50 text-center mb-4 leading-relaxed">
            {t("landing.disclaimer")}
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/40 text-center">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
