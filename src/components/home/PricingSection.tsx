"use client";

import React, { useState } from "react";
import { siteConfig, PricingPackage } from "@/config/site";
import {
  Check,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Clock,
  Layers,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Info,
} from "lucide-react";

interface PricingSectionProps {
  onSelectPackage?: (packageId: string) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string>("business");
  const [showConditionsModal, setShowConditionsModal] = useState(false);

  const handleChoosePackage = (pkg: PricingPackage) => {
    setSelectedPkgId(pkg.id);
    if (onSelectPackage) {
      onSelectPackage(pkg.id);
    }
    // Smooth scroll to order form
    const orderFormEl = document.getElementById("order-form");
    if (orderFormEl) {
      orderFormEl.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to notify the form
      window.dispatchEvent(
        new CustomEvent("rowad:selectPackage", { detail: { packageId: pkg.id } })
      );
    }
  };

  const getWhatsAppLink = (pkgName: string) => {
    const text = siteConfig.whatsappMessages.packageInquiry(pkgName);
    return `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#FAF9FC] via-[#F4F1F9] to-[#FAF9FC] relative overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#56138A]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 rounded-full bg-[#C99726]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EEFA] border border-[#E4D1F5] text-[#56138A] text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>باقات شفافة ومدروسة تناسب حجم نشاطك</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#15101E] tracking-tight">
            باقات تصميم وبرمجة المواقع
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            اختر الباقة المناسبة لاحتياجك ومرحلة نمو نشاطك التجاري. جميع الباقات تشمل الاستضافة والدومين والتهيئة للجوال.
          </p>
        </div>

        {/* 3 Pricing Packages Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteConfig.packages.map((pkg) => {
            const isFeatured = pkg.isRecommended;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isFeatured
                    ? "bg-white border-2 border-[#56138A] shadow-[0_20px_50px_rgba(86,19,138,0.14)] lg:-translate-y-3 z-20"
                    : "bg-white/90 border border-[#ECE8F2] hover:border-[#56138A]/40 shadow-sm hover:shadow-lg z-10"
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5D47A]" />
                    <span>{pkg.badge || "الخيار المرشح للمؤسسات"}</span>
                  </div>
                )}

                {/* Package Head */}
                <div className={`p-7 sm:p-8 ${isFeatured ? "pt-9" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#15101E]">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-[#6B7280] font-medium mt-1">
                        {pkg.targetAudience}
                      </p>
                    </div>
                    {!isFeatured && pkg.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Block */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#56138A]">
                      {pkg.price}
                    </span>
                    <span className="text-lg font-bold text-[#15101E]">
                      {pkg.currency}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-400 line-through mr-2">
                        {pkg.originalPrice} {pkg.currency}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B7280] mt-1">
                    {siteConfig.pricingRules.isTaxInclusive
                      ? "شامل ضريبة القيمة المضافة"
                      : "غير شامل ضريبة القيمة المضافة (15%)"}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#ECE8F2] pt-4">
                    {pkg.description}
                  </p>

                  {/* Operational Timeline & Scope Pills */}
                  <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#4B5563]">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <Clock className="w-3.5 h-3.5 text-[#56138A]" />
                      <span>التسليم: {pkg.deliveryDays}</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF9FC] border border-[#ECE8F2]">
                      <Layers className="w-3.5 h-3.5 text-[#C99726]" />
                      <span>{pkg.pagesCount}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 pt-5 border-t border-[#ECE8F2]">
                    <p className="text-xs font-bold text-[#15101E] mb-3">
                      محتويات ومميزات الباقة:
                    </p>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#374151]">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isFeatured
                                ? "bg-[#56138A] text-white"
                                : "bg-[#F5EEFA] text-[#56138A]"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Package Footer Actions */}
                <div className="p-7 sm:p-8 pt-0">
                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleChoosePackage(pkg)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                        isFeatured
                          ? "bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] text-white hover:from-[#430B6E] hover:to-[#200435] shadow-[0_8px_20px_rgba(86,19,138,0.3)]"
                          : "bg-[#56138A] text-white hover:bg-[#320853] shadow-xs"
                      }`}
                    >
                      <span>اختر {pkg.name}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <a
                      href={getWhatsAppLink(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl font-medium text-xs text-[#22723A] bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>استفسر عن هذه الباقة عبر واتساب</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-center text-[#6B7280] mt-3">
                    {pkg.revisionRounds} • {pkg.supportDuration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Rules & Transparency Footer Box */}
        <div className="mt-14 rounded-2xl bg-white border border-[#ECE8F2] p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2DC] border border-[#E9D6A0] flex items-center justify-center flex-shrink-0 text-[#966F13]">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#15101E]">
                شروط وأحكام باقات التصميم والاستضافة
              </h4>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                <div className="p-3 rounded-xl bg-[#FAF9FC] border border-[#ECE8F2]">
                  <span className="font-bold text-[#320853] block mb-1">
                    الضرائب والرسوم:
                  </span>
                  <span>{siteConfig.pricingRules.taxDisclaimer}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9FC] border border-[#ECE8F2]">
                  <span className="font-bold text-[#320853] block mb-1">
                    الدومين والاستضافة:
                  </span>
                  <span>{siteConfig.pricingRules.renewalTerms}</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#6B7280]">
                * نطاق التعديلات ومدة الدعم الفني محددة بحسب كل باقة أعلاه، وتبدأ فترة الدعم من تاريخ التسليم الرسمي للموقع.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
