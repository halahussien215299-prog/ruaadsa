"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  Laptop,
  Smartphone,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

export function VisualMockupSection() {
  const [activeDevice, setActiveDevice] = useState<"both" | "laptop" | "mobile">("both");

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9FC] border-y border-[#ECE8F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2DC] border border-[#E9D6A0] text-[#966F13] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>عرض حي للمواقع المنفذة بواسطة المؤسسة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E]">
            شاهد كيف سيظهر نشاطك على الجوال والكمبيوتر
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
            تصاميم متناسقة وفائقة السرعة مصممة لراحة العميل ورفع نسبة التواصل المباشر.
          </p>

          {/* Interactive Device View Switcher */}
          <div className="mt-5 inline-flex items-center p-1 bg-white rounded-xl border border-[#ECE8F2] shadow-xs">
            <button
              onClick={() => setActiveDevice("both")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDevice === "both"
                  ? "bg-[#56138A] text-white shadow-xs"
                  : "text-[#4B5563] hover:text-[#56138A]"
              }`}
            >
              العرض المزدوج
            </button>
            <button
              onClick={() => setActiveDevice("laptop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDevice === "laptop"
                  ? "bg-[#56138A] text-white shadow-xs"
                  : "text-[#4B5563] hover:text-[#56138A]"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>كمبيوتر</span>
            </button>
            <button
              onClick={() => setActiveDevice("mobile")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDevice === "mobile"
                  ? "bg-[#56138A] text-white shadow-xs"
                  : "text-[#4B5563] hover:text-[#56138A]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>جوال</span>
            </button>
          </div>
        </div>

        {/* Visual Mockup Stage */}
        <div className="relative mx-auto flex items-center justify-center max-w-4xl pt-4 pb-8">
          {/* Laptop Mockup */}
          <div
            className={`w-full max-w-2xl transition-all duration-300 ${
              activeDevice === "mobile" ? "hidden" : "block"
            }`}
          >
            {/* Screen Bezel */}
            <div className="rounded-2xl bg-[#1E1B2E] p-2.5 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(50,8,83,0.18)] border border-[#3E3859]">
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#2A2440] rounded-t-lg mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#181328] text-[10px] text-gray-300 font-mono">
                  <span className="text-emerald-400">https://</span>
                  <span>rowaddigital.sa/preview</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Laptop Screen Content - Realistic Saudi Digital Agency Work */}
              <div className="rounded-lg overflow-hidden bg-white border border-gray-100 aspect-[16/10] flex flex-col relative select-none">
                {/* Showcase Header */}
                <div className="h-10 bg-white border-b border-gray-100 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 relative">
                      <Image
                        src={siteConfig.logo}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-extrabold text-[#320853]">رواد الرقمية</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[11px] text-gray-600 font-medium">
                    <span className="text-[#56138A] font-bold">الرئيسية</span>
                    <span>الخدمات</span>
                    <span>الأعمال</span>
                    <span>الباقات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#56138A] text-white">
                      اطلب موقعك
                    </span>
                  </div>
                </div>

                {/* Showcase Hero Banner */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#FAF7FD] via-white to-[#FAF9FC]">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF2DC] text-[#966F13] text-[10px] font-bold mb-2">
                    <Sparkles className="w-3 h-3 text-[#C99726]" />
                    <span>موقع تعريفي احترافي لنشاطك التجاري</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-[#15101E] max-w-md leading-snug">
                    تصميم مواقع عصرية تعزز ثقة عملائك وتزيد مبيعاتك
                  </h3>
                  <p className="text-[11px] text-[#4B5563] mt-1.5 max-w-sm">
                    سرعة فائقة • استضافة ودومين مجاناً • متوافق 100% مع الجوال
                  </p>

                  <div className="mt-3.5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-[#56138A] text-white shadow-xs">
                      يبدأ من 399 ر.س
                    </span>
                    <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-[#DCFCE7] text-[#14532D] border border-emerald-200">
                      دومين .com مجاناً
                    </span>
                  </div>
                </div>

                {/* Showcase 3 Mini Feature Blocks */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-white border-t border-gray-100 text-center">
                  <div className="p-1.5 rounded bg-[#FAF9FC] border border-gray-100">
                    <p className="text-[9px] font-bold text-[#56138A]">حضور 24/7</p>
                    <p className="text-[8px] text-gray-500">جاهزية دائمة</p>
                  </div>
                  <div className="p-1.5 rounded bg-[#FAF9FC] border border-gray-100">
                    <p className="text-[9px] font-bold text-[#C99726]">تواصل فوري</p>
                    <p className="text-[8px] text-gray-500">واتساب وهاتف</p>
                  </div>
                  <div className="p-1.5 rounded bg-[#FAF9FC] border border-gray-100">
                    <p className="text-[9px] font-bold text-emerald-700">سرعة فائقة</p>
                    <p className="text-[8px] text-gray-500">تحميل بأقل من ثانية</p>
                  </div>
                </div>
              </div>

              {/* Laptop Notch */}
              <div className="h-1.5 w-20 bg-[#3E3859] mx-auto mt-2 rounded-full" />
            </div>
          </div>

          {/* Mobile Mockup (iPhone Style) */}
          <div
            className={`transition-all duration-300 ${
              activeDevice === "both"
                ? "absolute -bottom-4 -left-2 sm:-left-6 w-36 sm:w-44 z-20"
                : activeDevice === "mobile"
                ? "w-full max-w-[280px]"
                : "hidden"
            }`}
          >
            <div className="rounded-[2.2rem] bg-[#110D20] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-2 border-[#56138A]/50">
              {/* Dynamic Island / Notch */}
              <div className="w-14 h-3 bg-black mx-auto rounded-full mb-1.5" />

              {/* Mobile Screen Display */}
              <div className="rounded-[1.7rem] overflow-hidden bg-white aspect-[9/18] flex flex-col p-2.5 border border-gray-200 text-right select-none">
                {/* Mobile Screen Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 relative">
                      <Image
                        src={siteConfig.logo}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[8px] font-black text-[#320853]">رواد الرقمية</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Mobile Hero Content */}
                <div className="mt-2 text-center">
                  <span className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-[#FAF2DC] text-[#966F13]">
                    باقة 399 ر.س
                  </span>
                  <p className="text-[9px] font-extrabold text-gray-900 mt-1 leading-tight">
                    موقعك متوافق مع كافة الجوالات
                  </p>
                </div>

                {/* Mobile Quick Service Checklist */}
                <div className="mt-2.5 space-y-1">
                  <div className="p-1 rounded bg-[#FAF9FC] text-[7px] text-[#56138A] font-semibold">
                    ✓ دومين .com مجاني سنة
                  </div>
                  <div className="p-1 rounded bg-[#FCF8EE] text-[7px] text-[#966F13] font-semibold">
                    ✓ زر واتساب واتصال مباشر
                  </div>
                  <div className="p-1 rounded bg-slate-50 text-[7px] text-gray-700 font-semibold">
                    ✓ لوحة تحكم عربية سهلة
                  </div>
                </div>

                {/* Mobile Bottom Fixed Action Bar Mock */}
                <div className="mt-auto pt-2">
                  <div className="py-1 px-2 rounded-lg bg-[#56138A] text-white text-[8px] font-bold text-center">
                    اطلب موقعك الآن
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Performance Indicator Pill */}
          <div className="hidden sm:flex absolute -top-2 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#ECE8F2] shadow-md items-center gap-2.5 z-30">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
              <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-medium">سرعة التحميل</p>
              <p className="text-xs font-black text-[#15101E]">99% على مقياس Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
