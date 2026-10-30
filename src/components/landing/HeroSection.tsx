"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Phone,
  Globe,
  Server,
  Sliders,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  FolderKanban,
} from "lucide-react";

export function HeroSection() {
  const valueProps = [
    { icon: Globe, text: "دومين .com مجاناً لسنة" },
    { icon: Server, text: "استضافة سريعة مشمولة" },
    { icon: Smartphone, text: "متوافق 100% مع الجوال" },
    { icon: Sliders, text: "لوحة تحكم لإدارة المحتوى" },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    siteConfig.whatsappMessages.heroCta
  )}`;

  return (
    <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white relative overflow-hidden">
      {/* Subtle Purple & Gold Ambient Background */}
      <div className="absolute top-10 right-1/2 translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#56138A]/5 via-[#C99726]/4 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        {/* Ad Campaign Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EEFA] border border-[#E4D1F5] text-[#56138A] mb-5 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-[#C99726] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold">
            عرض خاص للأنشطة والشركات السعودية
          </span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-[#56138A] text-white font-black">
            يبدأ من 399 ر.س
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#15101E] leading-[1.25] tracking-tight">
          موقع إلكتروني احترافي لنشاطك{" "}
          <span className="relative inline-block mt-1 sm:mt-0">
            <span className="relative z-10 text-[#56138A]">يبدأ من 399 ريال</span>
            <span
              className="absolute bottom-1 right-0 left-0 h-3 bg-[#F5D47A]/40 rounded-sm -z-0"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Supporting Hook */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[#4B5563] leading-relaxed max-w-2xl font-normal">
          خلّ نشاطك يظهر بصورة احترافية قدّام عملائك. موقع متوافق مع الجوال ،
          مع دومين .com واستضافة لمدة سنة ولوحة تحكم لإدارة محتواك.
        </p>

        {/* 4 Core Value Highlight Chips */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-2xl">
          {valueProps.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FAF9FC] border border-[#ECE8F2] shadow-xs"
            >
              <item.icon className="w-4 h-4 text-[#56138A] flex-shrink-0" />
              <span className="text-xs font-bold text-[#15101E]">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Primary Call to Actions (Optimized for TikTok / Snap / IG Traffic) */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
          {/* Main Booking Button */}
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] hover:from-[#430B6E] hover:to-[#200435] shadow-[0_10px_25px_-5px_rgba(86,19,138,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(86,19,138,0.45)] transition-all transform active:scale-[0.98] group"
          >
            <span>احجز موقعك الآن بـ 399 ر.س</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </a>

          {/* Instant WhatsApp Conversion Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] shadow-xs transition-all transform active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>تواصل فوري عبر واتساب</span>
          </a>

          {/* Portfolio Showcase Button */}
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base text-[#320853] bg-white border border-[#D5CBE3] hover:border-[#56138A] hover:bg-[#FAF7FD] shadow-xs transition-all"
          >
            <FolderKanban className="w-5 h-5 text-[#C99726]" />
            <span>نماذج من أعمالنا (24+ موقع)</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-5 border-t border-[#ECE8F2] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تسليم سريع ومنظم</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#56138A]" />
            <span>مؤسسة سعودية معتمدة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C99726]" />
            <span>بدون رسوم خفية أو مفاجآت</span>
          </div>
        </div>
      </div>
    </section>
  );
}

