"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  HandHeart,
  Users,
  HelpCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ContactPage() {
  const { t } = useTranslation();
  
  const inquiryTypes = [
    { value: "partner", labelKey: "contact.type1", icon: Building2 },
    { value: "sponsor", labelKey: "contact.type2", icon: HandHeart },
    { value: "npo", labelKey: "contact.type3", icon: Users },
    { value: "media", labelKey: "contact.type4", icon: Mail },
    { value: "other", labelKey: "contact.type5", icon: HelpCircle },
  ];

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xvzqevwe";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          inquiryType: t(inquiryTypes.find(t => t.value === formData.inquiryType)?.labelKey || ""),
          message: formData.message,
          _subject: `[Rescue Pill] ${t(inquiryTypes.find(t => t.value === formData.inquiryType)?.labelKey || "contact.title")}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", organization: "", email: "", inquiryType: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(t("contact.errorMessage"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-primary-light z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -ml-2 hover:bg-primary-light rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-text-primary">{t("contact.title")}</span>
            </div>
          </div>
          <LanguageSwitcher compact />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {t("contact.title")}
          </h1>
          <p className="text-sm text-text-secondary">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">
              {t("contact.successTitle")}
            </h2>
            <p className="text-text-secondary mb-6">
              {t("contact.successMessage")}
            </p>
            <Link href="/">
              <Button variant="outline">
                {t("contact.backToTop")}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    {t("contact.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                             focus:border-primary focus:outline-none bg-white
                             text-text-primary placeholder:text-text-muted"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-text-secondary mb-2">
                    {t("contact.organization")}
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                             focus:border-primary focus:outline-none bg-white
                             text-text-primary placeholder:text-text-muted"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    {t("contact.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                             focus:border-primary focus:outline-none bg-white
                             text-text-primary placeholder:text-text-muted"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-text-secondary mb-2">
                    {t("contact.inquiryType")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                             focus:border-primary focus:outline-none bg-white
                             text-text-primary"
                  >
                    <option value="">{t("contact.inquiryTypePlaceholder")}</option>
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {t(type.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    {t("contact.message")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary-light 
                             focus:border-primary focus:outline-none bg-white
                             text-text-primary placeholder:text-text-muted resize-none"
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t("contact.submit")}
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Privacy Note */}
            <p className="text-xs text-text-muted text-center mt-4">
              <Link href="/privacy" className="text-primary hover:underline">{t("footer.privacy")}</Link>
            </p>
          </motion.div>
        )}

        {/* Partner Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <HandHeart className="w-4 h-4" />
            {t("footer.partners")}
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
