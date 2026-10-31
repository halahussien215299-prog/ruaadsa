"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { trackLead, trackContact } from "@/lib/metaPixel";
import {
  Send,
  Sparkles,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export function LeadFormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("business");
  const [timeline, setTimeline] = useState("فوراً");
  const [contactMethod, setContactMethod] = useState("واتساب");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const isSubmittingRef = useRef(false);
  const idempotencyKeyRef = useRef("");

  useEffect(() => {
    idempotencyKeyRef.current = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  // Listen to package selection from the pricing cards
  useEffect(() => {
    const handlePackageEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ packageId: string }>;
      if (customEvent.detail?.packageId) {
        setSelectedPackage(customEvent.detail.packageId);
      }
    };
    window.addEventListener("rowad:selectPackage", handlePackageEvent);
    return () => window.removeEventListener("rowad:selectPackage", handlePackageEvent);
  }, []);

  const getPackageName = (id: string) => {
    const found = siteConfig.packages.find((p) => p.id === id);
    return found ? `${found.name} (${found.price} ر.س)` : id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isSubmittingRef.current) return;
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("يرجى إدخال اسمك الكريم.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 9) {
      setErrorMsg("يرجى إدخال رقم جوال صحيح (مثال: 0500000000).");
      return;
    }

    setLoading(true);
    isSubmittingRef.current = true;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          business: business.trim(),
          packageId: selectedPackage,
          packageName: getPackageName(selectedPackage),
          timeline,
          contactMethod,
          idempotencyKey: idempotencyKeyRef.current,
        }),
      });

      const result = await response.json();

      // Only treat order as successful if response.ok AND result.success === true AND result.savedToDatabase === true
      if (response.ok && result.success === true && result.savedToDatabase === true && result.reference) {
        const refId = result.reference;
        setOrderRef(refId);
        setSubmitted(true);

        const currentPkg = siteConfig.packages.find((p) => p.id === selectedPackage);
        trackLead(getPackageName(selectedPackage), currentPkg?.price, refId);

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#56138A", "#C99726", "#F5D47A", "#320853"],
          });
        } catch {
          // ignore if canvas unavailable
        }
      } else {
        // Show clear error message, allow retry, DO NOT trigger conversion
        setErrorMsg(result.message || "تعذر حفظ بيانات طلبك في النظام حالياً. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.");
      }
    } catch (networkError) {
      console.error("Lead submission network error:", networkError);
      setErrorMsg("تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.");
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const getDirectWhatsAppUrl = () => {
    const text = siteConfig.whatsappMessages.formDirectSubmit({
      name: name || "عميل مهتم",
      phone: phone || "غير محدد",
      business: business || "غير محدد",
      packageName: getPackageName(selectedPackage),
      timeline,
      contactMethod,
    });
    return `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="lead-form" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EEFA] border border-[#E4D1F5] text-[#56138A] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C99726]" />
            <span>تنفيذ سريع واستلام خلال أيام عمل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#15101E] tracking-tight">
            احجز موقعك الآن وابدأ بنجاح
          </h2>
          <p className="mt-2 text-sm text-[#4B5563]">
            أرسل بياناتك وسيتواصل معك مستشارنا لتأكيد التفاصيل والبدء مباشرة.
          </p>
        </div>

        {/* Lead Form Card */}
        <div className="bg-[#FAF9FC] border border-[#ECE8F2] rounded-3xl p-6 sm:p-10 shadow-sm relative">
          {submitted ? (
            /* Success Confirmation State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-[#C99726] px-3.5 py-1 rounded-full bg-[#FCF8EE] border border-[#E9D6A0]">
                الرقم المرجعي لطلبك: {orderRef}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#15101E] mt-3">
                تم استلام طلبك بنجاح!
              </h3>
              <p className="text-sm text-[#4B5563] mt-2 max-w-md mx-auto leading-relaxed">
                شكراً لثقتك بمؤسسة رواد الرقمية. سيتواصل معك فريقنا عبر {contactMethod} خلال ساعات العمل لمراجعة التفاصيل وتجهيز موقعك.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("WhatsApp", "Lead Confirmation WhatsApp")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد ومتابعة الطلب عبر واتساب</span>
                </a>

                <button
                  onClick={() => {
                    idempotencyKeyRef.current = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
                    setSubmitted(false);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-xs text-[#56138A] bg-white border border-[#ECE8F2] hover:bg-slate-50 transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    الاسم الكريم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: تركي القحطاني"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5CBE3] focus:border-[#56138A] focus:outline-none focus:ring-2 focus:ring-[#56138A]/10 text-sm text-[#15101E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    رقم الجوال <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" dir="ltr">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="050 000 0000"
                      className="w-full pl-4 pr-16 py-3 rounded-xl bg-white border border-[#D5CBE3] focus:border-[#56138A] focus:outline-none focus:ring-2 focus:ring-[#56138A]/10 text-sm text-left text-[#15101E]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 flex items-center gap-1 border-l pl-2">
                      <span>🇸🇦</span>
                      <span>+966</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Business & Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    نوع النشاط التجاري
                  </label>
                  <input
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder="مثال: مقاولات، متجر، خدمات، كافيه..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5CBE3] focus:border-[#56138A] focus:outline-none focus:ring-2 focus:ring-[#56138A]/10 text-sm text-[#15101E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    الباقة المختارة
                  </label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5CBE3] focus:border-[#56138A] focus:outline-none focus:ring-2 focus:ring-[#56138A]/10 text-sm text-[#15101E] font-medium"
                  >
                    {siteConfig.packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.price} {pkg.currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Timeline & Contact Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    موعد التنفيذ المفضل
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["فوراً", "خلال أسبوع", "مجرد استفسار"].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                          timeline === t
                            ? "bg-[#56138A] text-white border-[#56138A] shadow-xs"
                            : "bg-white text-[#4B5563] border-[#ECE8F2] hover:border-gray-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15101E] mb-1.5">
                    وسيلة التواصل المفضلة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "واتساب", icon: MessageCircle },
                      { id: "اتصال هاتفي", icon: Phone },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setContactMethod(item.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                          contactMethod === item.id
                            ? "bg-[#56138A] text-white border-[#56138A] shadow-xs"
                            : "bg-white text-[#4B5563] border-[#ECE8F2] hover:border-gray-300"
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy and consent */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                بإرسال هذا النموذج، فإنك توافق على قيام فريق مؤسسة رواد الرقمية بالتواصل معك لمراجعة متطلباتك وتقديم الاستشارة اللازمة.
              </p>

              {/* Submission CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] hover:from-[#430B6E] hover:to-[#220438] shadow-[0_8px_20px_rgba(86,19,138,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 transform active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جارٍ تأكيد الطلب...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال طلب الموقع</span>
                    </>
                  )}
                </button>

                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-5 rounded-xl font-bold text-xs sm:text-sm text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>أو اطلب مباشرة عبر واتساب</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
