"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { trackContact } from "@/lib/metaPixel";
import {
  Check,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Clock,
  ShoppingBag,
  Info,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

interface StorePricingSectionProps {
  onSelectPackage?: (pkgId: string) => void;
}

export function StorePricingSection({ onSelectPackage }: StorePricingSectionProps) {
  const handleSelect = (pkgId: string) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
    const formEl = document.getElementById("lead-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("rowad:selectPackage", { detail: { packageId: pkgId } })
      );
    }
  };

  const getWhatsAppLink = (pkgName: string) => {
    const text = siteConfig.whatsappMessages.packageInquiry(pkgName);
    return `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="store-pricing" className="py-14 sm:py-20 bg-white relative overflow-hidden border-t border-[#ECE8F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
            <span>باقات حلول التجارة والمتاجر الإلكترونية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E] tracking-tight">
            باقات تصميم وبرمجة المتاجر الإلكترونية
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
            حلول متكاملة لبدء وتوسيع تجارتك الإلكترونية في السعودية باحترافية وسرعة تنفيذ.
          </p>
        </div>

        {/* Clarification Notice: 399 SAR is for corporate/landing sites only */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#FCF8EE] border border-[#E9D6A0] text-xs sm:text-sm text-[#875D0D] flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-[#C99726] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-black text-[#684605] block sm:inline mb-1 sm:mb-0 ml-1">
              توضيح هام للعملاء الكرام:
            </strong>
            عرض الـ <strong>399 ريال</strong> خاص بـ <strong>المواقع التعريفية وصفحات الهبوط فقط</strong>. باقات المتاجر الإلكترونية أدناه مخصصة لعرض المنتجات، سلات الشراء، والربط مع شركات الشحن وبوابات الدفع الإلكتروني.
          </div>
        </div>

        {/* 3 Store Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {siteConfig.storePackages.map((pkg) => {
            const isFeatured = pkg.isRecommended;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-200 flex flex-col justify-between ${
                  isFeatured
                    ? "bg-[#FAF9FC] border-2 border-emerald-600 shadow-[0_15px_35px_rgba(5,150,105,0.12)] lg:-translate-y-2 z-20"
                    : "bg-white border border-[#ECE8F2] shadow-xs hover:border-emerald-600/40 hover:shadow-md z-10"
                }`}
              >
                {/* Recommended Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-[11px] font-black shadow-sm flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-[#F5D47A]" />
                    <span>{pkg.badge || "الأكثر طلباً للتجارة السعودية"}</span>
                  </div>
                )}

                {/* Card Body */}
                <div className={`p-6 sm:p-7 ${isFeatured ? "pt-8" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black text-[#15101E]">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-1 font-medium">
                        {pkg.targetAudience}
                      </p>
                    </div>
                    {!isFeatured && pkg.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-emerald-700">
                      {pkg.price.toLocaleString("ar-SA")}
                    </span>
                    <span className="text-base font-bold text-[#15101E]">
                      {pkg.currency}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {pkg.id === "store-salla"
                      ? "يشمل تهيئة وبناء المتجر فقط (لا يشمل اشتراك سلة)"
                      : "سعر نهائي للخدمة بدون عمولات مبيعات"}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#ECE8F2] pt-3.5">
                    {pkg.description}
                  </p>

                  {/* Meta Pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold text-[#4B5563]">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{pkg.deliveryDays}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C99726]" />
                      <span>{pkg.pagesCount}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-5 pt-4 border-t border-[#ECE8F2]">
                    <p className="text-xs font-bold text-[#15101E] mb-3">
                      محتويات ومميزات الباقة:
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-[#374151]">
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isFeatured
                                ? "bg-emerald-600 text-white"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelect(pkg.id)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                        isFeatured
                          ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white hover:from-emerald-700 hover:to-emerald-900 shadow-[0_6px_16px_rgba(5,150,105,0.25)]"
                          : "bg-[#15101E] text-white hover:bg-black shadow-xs"
                      }`}
                    >
                      <span>احجز {pkg.name}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getWhatsAppLink(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact("WhatsApp", `Store Package: ${pkg.name}`)}
                      className="w-full py-2.5 px-3 rounded-xl font-medium text-xs text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC]/70 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>استفسر عن المتجر عبر واتساب</span>
                    </a>
                  </div>
                  <p className="text-[10px] text-center text-[#6B7280] mt-2.5">
                    {pkg.revisionRounds} • {pkg.supportDuration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-10 p-4 rounded-2xl bg-[#FAF9FC] border border-[#ECE8F2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4B5563]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>تسليم احترافي مع تدريب كامل على إدارة المنتجات واستقبال طلبات العملاء.</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>خيارات دفع مرنة وميسرة</span>
          </div>
        </div>
      </div>
    </section>
  );
}

