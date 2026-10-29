"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9FC] border-t border-[#ECE8F2] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2DC] border border-[#E9D6A0] text-[#966F13] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>إجابات على أكثر الاستفسارات شيوعاً</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#15101E]">
            الأسئلة الشائعة حول الخدمة
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ECE8F2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#15101E] hover:text-[#56138A] transition-colors"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#56138A] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-gray-100 mt-2 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
