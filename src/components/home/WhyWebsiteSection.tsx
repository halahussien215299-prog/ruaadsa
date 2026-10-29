"use client";

import React from "react";
import {
  Clock,
  Compass,
  Award,
  Layers,
  Inbox,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function WhyWebsiteSection() {
  const benefits = [
    {
      icon: Clock,
      title: "عرض خدماتك على مدار الساعة (24/7)",
      description:
        "موقعك متاح دائماً أمام العملاء في أي وقت ومن أي مكان للاطلاع على تفاصيل خدماتك ومنتجاتك وأعمالك حتى خارج أوقات العمل الرسمية.",
      badge: "جاهزية دائمة",
      accent: "purple",
    },
    {
      icon: Compass,
      title: "تسهيل وصول العملاء إلى نشاطك",
      description:
        "توفير تجربة سلسة تشمل موقع النشاط على الخريطة، وأوقات العمل، والخدمات الرئيسية، مما يقلل وقت التردد لدى العميل ويوجهّه مباشرة للتواصل.",
      badge: "تجربة عميل واضحة",
      accent: "gold",
    },
    {
      icon: Award,
      title: "تقديم صورة احترافية تعزز الثقة",
      description:
        "وجود موقع إلكتروني يحمل نطاقك الخاص وهوية نشاطك يمنح منشأتك مصداقية فورية وانطباعاً مهنياً راسخاً لدى العملاء والشركاء المحتملين.",
      badge: "مصداقية عالية",
      accent: "purple",
    },
    {
      icon: Layers,
      title: "تجميع قنوات التواصل في مكان واحد",
      description:
        "دمج رقم الواتساب، ورقم الاتصال المباشر، ونموذج الطلبات، وحسابات التواصل الاجتماعي تحت رابط رسمي واحد يسهل مشاركته والوصول إليه.",
      badge: "مركزية التواصل",
      accent: "gold",
    },
    {
      icon: Inbox,
      title: "إمكانية استقبال وتنظيم طلبات العملاء",
      description:
        "استقبال طلبات عروض الأسعار والاستفسارات مباشرة عبر نماذج رقمية تصلك فوارً على بريدك وهاتفك لتسهيل المتابعة المنظمة.",
      badge: "إدارة منظمة",
      accent: "purple",
    },
    {
      icon: TrendingUp,
      title: "أصل رقمي ملكك وقابل للتطوير مستقبلاً",
      description:
        "الموقع أصل مستقل خاص بنشاطك التجاري يمكنك توسيعه لمتجر إلكتروني، أو إضافة بوابات دفع، أو خدمات متقدمة مع نمو أعمالك.",
      badge: "قابلية للتوسع",
      accent: "gold",
    },
  ];

  return (
    <section id="why-website" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#56138A_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2DC] border border-[#E9D6A0] text-[#966F13] text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>قيمة حقيقية ومستدامة لنشاطك</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#15101E] tracking-tight">
            لماذا يحتاج نشاطك التجاري إلى موقع إلكتروني؟
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            الموقع الإلكتروني لم يعد رفاهية؛ بل هو الواجهة الرسمية لنشاطك، ومرجع العملاء الأول للتأكد من هويتك ومصداقية خدماتك.
          </p>
        </div>

        {/* Benefits Grid (6 Clear Practical Value Pillars) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const isGold = item.accent === "gold";
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-2xl bg-[#FAF9FC] border border-[#ECE8F2] hover:border-[#56138A]/30 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(86,19,138,0.08)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isGold
                          ? "bg-[#FAF2DC] text-[#966F13] group-hover:bg-[#C99726] group-hover:text-white"
                          : "bg-[#F5EEFA] text-[#56138A] group-hover:bg-[#56138A] group-hover:text-white"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        isGold
                          ? "bg-[#FAF2DC] text-[#966F13]"
                          : "bg-[#F5EEFA] text-[#56138A]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#15101E] mb-3 group-hover:text-[#56138A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECE8F2]/60 flex items-center gap-1 text-xs font-semibold text-[#56138A]">
                  <span>حل عملي ومباشر لنشاطك</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Note Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#F5EEFA]/60 border border-[#E4D1F5] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <p className="text-sm font-bold text-[#320853]">
              نهجنا في مؤسسة رواد الرقمية:
            </p>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              نلتزم بتقديم بنية تقنية وتصميمية صحيحة وسريعة تعكس نشاطك باحترافية، ونبتعد تماماً عن الوعود التسويقية غير الواقعية.
            </p>
          </div>
          <a
            href="#pricing"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-[#56138A] text-white font-bold text-xs sm:text-sm hover:bg-[#320853] transition-colors"
          >
            استعرض باقات التصميم
          </a>
        </div>
      </div>
    </section>
  );
}
