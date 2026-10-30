"use client";

import React, { useState } from "react";
import { portfolioItems, PortfolioItem } from "@/config/portfolio";
import {
  ExternalLink,
  Sparkles,
  Globe,
  ShoppingCart,
  Building2,
  Stethoscope,
  Factory,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export function PortfolioSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const filters = [
    { id: "all", label: "جميع الأعمال", count: portfolioItems.length, icon: Globe },
    {
      id: "company",
      label: "شركات ومقاولات",
      count: portfolioItems.filter((i) => i.category === "company").length,
      icon: Building2,
    },
    {
      id: "ecommerce",
      label: "متاجر إلكترونية",
      count: portfolioItems.filter((i) => i.category === "ecommerce").length,
      icon: ShoppingCart,
    },
    {
      id: "medical_legal",
      label: "عيادات ومحاماة",
      count: portfolioItems.filter((i) => i.category === "medical_legal").length,
      icon: Stethoscope,
    },
    {
      id: "industry",
      label: "مصانع ومياه",
      count: portfolioItems.filter((i) => i.category === "industry").length,
      icon: Factory,
    },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedFilter);

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Extract clean domain for browser bar display
  const getDomain = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-[#56138A]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 rounded-full bg-[#C99726]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF2DC] border border-[#E9D6A0] text-[#966F13] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>أعمال حقيقية منفذة لعملائنا في السعودية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E] tracking-tight">
            نماذج حية من أعمالنا المنفذة
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
            مواقع وشركات ومتاجر حقيقية تعمل الآن على الإنترنت، صممناها وطورناها وفق أعلى معايير الجودة والسرعة.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((tab) => {
            const isActive = selectedFilter === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  setVisibleCount(8);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? "bg-[#56138A] text-white border-[#56138A] shadow-md shadow-[#56138A]/20"
                    : "bg-[#FAF9FC] text-[#4B5563] border-[#ECE8F2] hover:bg-slate-100 hover:border-gray-300"
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-[#F5D47A]" : "text-[#56138A]"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? "bg-white/20 text-white" : "bg-[#ECE8F2] text-[#6B7280]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-4">
          {displayedItems.map((item) => {
            const domain = getDomain(item.url);

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#FAF9FC] border border-[#ECE8F2] hover:border-[#56138A]/40 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(86,19,138,0.08)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-[#211A33] text-gray-300 px-3.5 py-2.5 flex items-center justify-between border-b border-[#362C52]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#150F24] text-[10px] text-gray-300 font-mono" dir="ltr">
                      <span className="text-emerald-400 text-[9px]">https://</span>
                      <span className="truncate max-w-[170px]">{domain}</span>
                    </div>
                    <span className="w-4" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-black text-[#15101E] group-hover:text-[#56138A] transition-colors">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0] whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[#56138A] px-2 py-0.5 rounded bg-[#F5EEFA]">
                        {item.categoryLabel}
                      </span>
                      {item.location && (
                        <span className="text-[11px] text-gray-500">
                          📍 {item.location}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#ECE8F2]/60 mt-4 flex items-center justify-between gap-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#56138A] hover:text-[#320853] hover:underline"
                  >
                    <span>معاينة الموقع المباشر</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C99726]" />
                  </a>

                  <a
                    href="#lead-form"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white text-[#320853] border border-[#ECE8F2] hover:border-[#56138A] hover:bg-[#F5EEFA] transition-colors"
                  >
                    <span>أريد موقعاً مشابهاً</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#320853] bg-[#FAF9FC] border border-[#D5CBE3] hover:bg-white hover:border-[#56138A] shadow-xs transition-all"
            >
              <span>عرض المزيد من الأعمال ({filteredItems.length - visibleCount} موقع إضافي)</span>
              <ChevronDown className="w-4 h-4 text-[#56138A]" />
            </button>
          </div>
        )}

        {/* Conversion Trust Strip */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-[#FAF7FD] to-[#FAF9FC] border border-[#E4D1F5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#56138A] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-[#15101E]">
                هل تريد موقعاً بنفس هذه الجودة لنشاطك التجاري؟
              </p>
              <p className="text-xs text-[#6B7280]">
                اختر باقتك الآن ابتداءً من 399 ريال فقط مع دومين واستضافة لسنة كاملة.
              </p>
            </div>
          </div>

          <a
            href="#lead-form"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#56138A] to-[#320853] text-white font-bold text-xs sm:text-sm shadow-md hover:from-[#430B6E] hover:to-[#200435] transition-all transform active:scale-95"
          >
            احجز موقعك الآن بـ 399 ر.س
          </a>
        </div>
      </div>
    </section>
  );
}
