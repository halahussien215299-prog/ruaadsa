"use client";

import React from "react";
import {
  Globe2,
  Smartphone,
  MessageCircle,
  Sliders,
  Target,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Globe2,
      title: "دومين .com واستضافة لمدة سنة",
      description:
        "نحجز لك نطاق .com الرسمي باسم نشاطك مع استضافة سحابية سريعة وآمنة وشهادة SSL مشمولة بدون رسوم مخفية.",
      badge: "مشمول مجاناً",
      accent: "purple",
    },
    {
      icon: Smartphone,
      title: "متوافق 100% مع الجوال والتابلت",
      description:
        "تصميم متجاوب يعطي زائر الجوال تجربة تصفح سريعة وخفيفة جداً تضمن بقاء الزائر وتحويله إلى عميل.",
      badge: "Mobile-First",
      accent: "gold",
    },
    {
      icon: MessageCircle,
      title: "أزرار واتساب واتصال مباشر",
      description:
        "أزرار اتصال سريعة ثابتة تتيح لعميلك التواصل معك بنقرة واحدة عبر الواتساب أو المكالمة الهاتفية.",
      badge: "تحويل فوري",
      accent: "purple",
    },
    {
      icon: Sliders,
      title: "لوحة تحكم عربية سهلة التعديل",
      description:
        "تحكّم في محتوى موقعك بنفسك، عدّل النصوص، الصور، أرقام التواصل، والخدمات بسهولة تامة وبدون خبرة برمجية.",
      badge: "تحكم كامل",
      accent: "gold",
    },
    {
      icon: Target,
      title: "جاهز للربط مع بيكسلات الإعلانات",
      description:
        "بنية مهيأة للربط الفوري مع TikTok Pixel و Snapchat Pixel و Meta Pixel لقياس نتائج إعلاناتك بدقة.",
      badge: "جاهزية إعلانية",
      accent: "purple",
    },
    {
      icon: Clock,
      title: "تسليم سريع والتزام بالمواعيد",
      description:
        "نبدأ فور استلام بياناتك ونسلّمك موقعك جاهزاً للعمل خلال أيام عمل محددة مع دعم فني وإرشادي متواصل.",
      badge: "التزام كامل",
      accent: "gold",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEFA] border border-[#E4D1F5] text-[#56138A] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>كل ما تحتاجه لإطلاق موقعك بنجاح</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E] tracking-tight">
            مميزات تجعل موقعك يبني ثقة العملاء ويضاعف مبيعاتك
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
            بنينا باقاتنا لتمنح صاحب النشاط السعودي حلاً شاملاً وجاهزاً للعمل بدون تكاليف إضافية أو تعقيد.
          </p>
        </div>

        {/* Features 6 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feat, idx) => {
            const isGold = feat.accent === "gold";
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF9FC] border border-[#ECE8F2] hover:border-[#56138A]/30 hover:shadow-[0_10px_25px_rgba(86,19,138,0.06)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isGold
                          ? "bg-[#FAF2DC] text-[#966F13]"
                          : "bg-[#F5EEFA] text-[#56138A]"
                      }`}
                    >
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isGold
                          ? "bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0]"
                          : "bg-[#F5EEFA] text-[#56138A] border border-[#E4D1F5]"
                      }`}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#15101E] mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#F5EEFA]/60 border border-[#E4D1F5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[#56138A] shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#320853]">
                ضمان تسليم مطابق للمواصفات
              </p>
              <p className="text-xs text-[#6B7280]">
                نلتزم بتسليم موقعك وفق أعلى معايير الجودة التقنية وتجربة المستخدم.
              </p>
            </div>
          </div>

          <a
            href="#lead-form"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-[#56138A] text-white font-bold text-xs hover:bg-[#320853] transition-colors"
          >
            اختر باقتك وابدأ الآن
          </a>
        </div>
      </div>
    </section>
  );
}

