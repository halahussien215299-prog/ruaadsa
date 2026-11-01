"use client";

import React, { useState, useEffect, useRef } from "react";
import { Info, X, Check } from "lucide-react";

export function ClarificationToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerAppearRef = useRef<NodeJS.Timeout | null>(null);
  const timerDismissRef = useRef<NodeJS.Timeout | null>(null);
  const intervalProgressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user already dismissed it this session
    try {
      if (typeof window !== "undefined") {
        const seen = sessionStorage.getItem("rowad_offer_clarification_seen");
        if (seen === "true") return;
      }
    } catch {
      // Ignore sessionStorage errors
    }

    // 1. Show after 7 seconds (7000ms)
    timerAppearRef.current = setTimeout(() => {
      setIsVisible(true);

      const AUTO_CLOSE_MS = 5000;
      const STEP_MS = 50;
      const totalSteps = AUTO_CLOSE_MS / STEP_MS;
      let stepCount = 0;

      // Progress bar animation for the 5 seconds countdown
      intervalProgressRef.current = setInterval(() => {
        stepCount += 1;
        const remainingPercent = Math.max(0, 100 - (stepCount / totalSteps) * 100);
        setProgress(remainingPercent);
      }, STEP_MS);

      // 2. Auto-dismiss 5 seconds after appearance
      timerDismissRef.current = setTimeout(() => {
        handleDismiss();
      }, AUTO_CLOSE_MS);
    }, 7000);

    return () => {
      if (timerAppearRef.current) clearTimeout(timerAppearRef.current);
      if (timerDismissRef.current) clearTimeout(timerDismissRef.current);
      if (intervalProgressRef.current) clearInterval(intervalProgressRef.current);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (timerDismissRef.current) clearTimeout(timerDismissRef.current);
    if (intervalProgressRef.current) clearInterval(intervalProgressRef.current);

    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("rowad_offer_clarification_seen", "true");
      }
    } catch {
      // Ignore
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="توضيح هام بخصوص الباقات"
      className="fixed z-50 bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-white text-[#15101E] rounded-2xl shadow-2xl border-2 border-[#56138A]/20 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-md"
    >
      {/* Top Countdown Progress Bar */}
      <div className="h-1 bg-[#ECE8F2] w-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-[#C99726] to-[#56138A] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4 sm:p-5 text-right" dir="rtl">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#56138A]/10 text-[#56138A] flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-black text-[#56138A]">
              توضيح هام للعملاء الكرام
            </h4>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="إغلاق التنبيه"
            className="p-1 rounded-lg hover:bg-slate-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-[13px] text-[#4A4458] leading-relaxed mb-4">
          عرض الـ <strong className="text-[#56138A] font-black">399 ريال</strong> خاص بـ{" "}
          <strong className="text-[#15101E] font-bold">المواقع التعريفية وصفحات الهبوط فقط</strong>.
          باقات المتاجر الإلكترونية أدناه مخصصة لعرض المنتجات، سلات الشراء، والربط مع شركات الشحن وبوابات الدفع الإلكتروني.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <span className="text-[10px] text-gray-400 font-medium">
            يغلق تلقائياً خلال {Math.ceil((progress / 100) * 5)} ثوانٍ
          </span>

          <button
            onClick={handleDismiss}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#56138A] hover:bg-[#430B6E] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            <span>فهمت ذلك</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
