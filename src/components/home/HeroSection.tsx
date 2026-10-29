"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Server,
  Sliders,
  Smartphone,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

export function HeroSection() {
  const valueProps = [
    { icon: Globe, text: "دومين .com مجاناً لمدة سنة" },
    { icon: Server, text: "استضافة سحابية فائقة السرعة" },
    { icon: Sliders, text: "لوحة تحكم لإدارة المحتوى" },
    { icon: Smartphone, text: "متوافق 100% مع الجوال" },
  ];

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#FAF7FD] via-[#FAF9FC] to-white"
    >
      {/* Decorative Brand Background Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#56138A]/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-80 h-80 bg-[#C99726]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column: High-Conversion Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            {/* Top Offer Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EEFA] border border-[#E4D1F5] text-[#56138A] mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#C99726] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold">
                عرض خاص للمشاريع والأنشطة السعودية
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#56138A] text-white font-semibold">
                يبدأ من 399 ر.س
              </span>
            </div>

            {/* Main Primary Headline (Exact Copy Requirement) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black text-[#15101E] leading-[1.25] tracking-tight">
              موقع إلكتروني احترافي لنشاطك{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 text-[#56138A]">يبدأ من 399 ريال</span>
                <span
                  className="absolute bottom-1 right-0 left-0 h-3 bg-[#F5D47A]/40 rounded-sm -z-0"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Supporting Text (Exact Copy Requirement) */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-[#4B5563] leading-relaxed max-w-2xl font-normal">
              خلّ نشاطك يظهر بصورة احترافية قدّام عملائك. موقع متوافق مع الجوال ،
              مع دومين .com واستضافة لمدة سنة ولوحة تحكم لإدارة محتواك.
            </p>

            {/* 4 Instant Value Highlights */}
            <div className="mt-7 grid grid-cols-2 gap-3 w-full max-w-xl">
              {valueProps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/90 border border-[#ECE8F2] shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5EEFA] flex items-center justify-center flex-shrink-0 text-[#56138A]">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#15101E]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons & Quick CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] hover:from-[#430B6E] hover:to-[#200435] shadow-[0_10px_25px_-5px_rgba(86,19,138,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(86,19,138,0.45)] transition-all transform active:scale-[0.99] group"
              >
                <span>اطلب موقعك الآن</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base text-[#320853] bg-white border border-[#D5CBE3] hover:border-[#56138A] hover:bg-[#FAF7FD] shadow-xs transition-all"
              >
                <span>شاهد أعمالنا المنفذة</span>
                <ChevronLeft className="w-4 h-4 text-[#C99726]" />
              </a>
            </div>

            {/* Credibility & Trust Bar */}
            <div className="mt-8 pt-6 border-t border-[#ECE8F2] flex flex-wrap items-center gap-6 text-xs text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تنفيذ سريع وتسليم منظم</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#56138A]" />
                <span>دعم فني معتمد واستضافة آمنة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C99726]" />
                <span>أسعار واضحة بدون رسوم خفية</span>
              </div>
            </div>
          </div>

          {/* Left Column: Visual Laptop & Mobile Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center items-center">
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-lg">
              {/* Laptop Shell */}
              <div className="relative mx-auto rounded-2xl bg-[#1E1B2E] p-2.5 sm:p-3 shadow-[0_25px_50px_-12px_rgba(50,8,83,0.25)] border border-[#3E3859]">
                {/* Laptop Top Browser Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#2A2440] rounded-t-lg mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-[#1B162B] text-[10px] text-gray-300 font-mono">
                    <span className="text-emerald-400">https://</span>
                    <span>rowaddigital.sa/preview</span>
                  </div>
                  <div className="w-6" />
                </div>

                {/* Laptop Screen Content: Preview of Ruaad Digital Web Experience */}
                <div className="relative rounded-lg overflow-hidden bg-white border border-gray-100 aspect-[16/10] flex flex-col">
                  {/* Mockup Header */}
                  <div className="h-8 bg-[#FAF7FD] border-b border-gray-100 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 relative">
                        <Image
                          src={siteConfig.logo}
                          alt="Rowad Digital Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#320853]">رواد الرقمية</span>
                    </div>
                    <div className="flex gap-2 text-[9px] text-gray-500 font-medium">
                      <span>الرئيسية</span>
                      <span>الخدمات</span>
                      <span className="text-[#56138A] font-bold">باقاتنا</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#56138A] text-white font-bold">
                      طلب فوري
                    </span>
                  </div>

                  {/* Mockup Screen Hero */}
                  <div className="p-4 flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#FAF7FD] to-white relative">
                    <div className="inline-block px-2 py-0.5 rounded-full bg-[#C99726]/15 text-[#966F13] text-[9px] font-bold mb-2">
                      تصميم مواقع متوافقة 100% مع الجوال
                    </div>
                    <p className="text-sm font-extrabold text-[#15101E] leading-snug">
                      حضورك الرقمي يبدأ بتصميم عصري يثبت نجاح نشاطك
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-xs">
                      سرعة فائقة • تحويل استفسارات إلى مبيعات • دعم فني مستمر
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-[#56138A] text-white">
                        باقة الانطلاقة 399 ر.س
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0]">
                        دومين .com مجاناً
                      </span>
                    </div>
                  </div>

                  {/* Mockup Footer Mini Strip */}
                  <div className="h-6 bg-slate-900 text-white px-3 flex items-center justify-between text-[8px]">
                    <span>مؤسسة رواد الرقمية للدعاية والإعلان</span>
                    <span className="text-emerald-400">● خدمة عملاء نشطة</span>
                  </div>
                </div>

                {/* Laptop Base Notch */}
                <div className="h-1.5 w-16 bg-[#3E3859] mx-auto mt-1.5 rounded-full" />
              </div>

              {/* Mobile Device Mockup (Overlapping right corner for realistic multi-device preview) */}
              <div className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 w-32 sm:w-40 rounded-2xl bg-[#110D20] p-1.5 shadow-2xl border-2 border-[#56138A]/40">
                {/* Mobile Speaker / Camera Notch */}
                <div className="w-10 h-2 bg-black mx-auto rounded-full mb-1" />

                {/* Mobile Screen Display */}
                <div className="rounded-xl overflow-hidden bg-white aspect-[9/18] flex flex-col p-2 border border-gray-200">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                    <div className="w-3 h-3 relative">
                      <Image
                        src={siteConfig.logo}
                        alt="Logo icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[7px] font-black text-[#56138A]">رواد الرقمية</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-[7px] text-[#C99726] font-bold">باقة 399 ر.س</span>
                    <p className="text-[8px] font-bold text-gray-900 leading-tight mt-0.5">
                      موقع كامل مع استضافة ودومين
                    </p>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="p-1 rounded bg-[#F5EEFA] text-[6px] text-[#56138A] font-semibold text-right">
                      ✓ متوافق مع كافة الشاشات
                    </div>
                    <div className="p-1 rounded bg-[#FCF8EE] text-[6px] text-[#966F13] font-semibold text-right">
                      ✓ زر واتساب واتصال فوري
                    </div>
                    <div className="p-1 rounded bg-slate-50 text-[6px] text-gray-700 font-semibold text-right">
                      ✓ لوحة تحكم عربية سهلة
                    </div>
                  </div>

                  {/* Mobile Call To Action Button */}
                  <div className="mt-auto py-1 px-1.5 rounded-lg bg-[#56138A] text-white text-[7px] font-bold text-center">
                    احجز موقعك الآن
                  </div>
                </div>
              </div>

              {/* Floating Guarantee Badge */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#ECE8F2] shadow-lg flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FCF8EE] border border-[#F3D17A] flex items-center justify-center text-[#C99726]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-medium">ضمان الجودة</p>
                  <p className="text-xs font-bold text-[#15101E]">تنفيذ وفق المواصفات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
