"use client";

import React from "react";
import { siteConfig, PricingPackage } from "@/config/site";
import { trackContact } from "@/lib/metaPixel";
import {
  Check,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Clock,
  Layers,
  Info,
} from "lucide-react";

interface PricingSectionProps {
  onSelectPackage?: (pkgId: string) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
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
    <section id="pricing" className="py-14 sm:py-20 bg-[#FAF9FC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2DC] border border-[#E9D6A0] text-[#966F13] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>أسعار واضحة بدون مصاريف مخفية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E] tracking-tight">
            باقات تصميم المواقع الإلكترونية
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
            اختر الباقة المناسبة لمرحلة نشاطك، مع إمكانية الترقية مستقبلاً بكل سهولة.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {siteConfig.packages.map((pkg) => {
            const isFeatured = pkg.isRecommended;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-200 flex flex-col justify-between ${
                  isFeatured
                    ? "bg-white border-2 border-[#56138A] shadow-[0_15px_35px_rgba(86,19,138,0.12)] lg:-translate-y-2 z-20"
                    : "bg-white border border-[#ECE8F2] shadow-xs hover:border-[#56138A]/40 hover:shadow-md z-10"
                }`}
              >
                {/* Recommended Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#56138A] to-[#320853] text-white text-[11px] font-black shadow-sm flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-[#F5D47A]" />
                    <span>{pkg.badge || "الخيار المرشح للمؤسسات"}</span>
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#56138A]">
                      {pkg.price}
                    </span>
                    <span className="text-base font-bold text-[#15101E]">
                      {pkg.currency}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-xs text-gray-400 line-through mr-1">
                        {pkg.originalPrice} {pkg.currency}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {siteConfig.pricingRules.isTaxInclusive
                      ? "شامل الضريبة"
                      : "غير شامل ضريبة القيمة المضافة (15%)"}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#ECE8F2] pt-3.5">
                    {pkg.description}
                  </p>

                  {/* Meta Pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold text-[#4B5563]">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <Clock className="w-3.5 h-3.5 text-[#56138A]" />
                      <span>{pkg.deliveryDays}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <Layers className="w-3.5 h-3.5 text-[#C99726]" />
                      <span>{pkg.pagesCount}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-5 pt-4 border-t border-[#ECE8F2]">
                    <p className="text-xs font-bold text-[#15101E] mb-3">
                      محتويات الباقة:
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-[#374151]">
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isFeatured
                                ? "bg-[#56138A] text-white"
                                : "bg-[#F5EEFA] text-[#56138A]"
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
                          ? "bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] text-white hover:from-[#440D6E] hover:to-[#220438] shadow-[0_6px_16px_rgba(86,19,138,0.25)]"
                          : "bg-[#56138A] text-white hover:bg-[#320853] shadow-xs"
                      }`}
                    >
                      <span>احجز {pkg.name}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getWhatsAppLink(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact("WhatsApp", `Pricing Package: ${pkg.name}`)}
                      className="w-full py-2.5 px-3 rounded-xl font-medium text-xs text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC]/70 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>استفسر عبر واتساب</span>
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

        {/* Clear Terms Note */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-[#ECE8F2] flex items-center gap-3 text-xs text-[#4B5563]">
          <Info className="w-4 h-4 text-[#C99726] flex-shrink-0" />
          <span>
            <strong>ملاحظة هامة:</strong> الدومين (.com) والاستضافة السحابية متضمنان ومجانيان للسنة الأولى كاملة لكافة الباقات.
          </span>
        </div>
      </div>
    </section>
  );
}

