import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#181126] text-white pt-16 pb-12 border-t border-[#2D2244]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2D2244]">
          {/* Col 1: Agency Brand & Identity */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1 shadow-md">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.legalName}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {siteConfig.legalName}
                </h3>
                <p className="text-xs text-[#F5D47A] font-semibold">
                  تسويق رقمي وتصميم مواقع احترافية
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-md">
              {siteConfig.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-gray-400 bg-[#231A36] px-3.5 py-2 rounded-xl border border-[#362A52]">
              <ShieldCheck className="w-4 h-4 text-[#F5D47A]" />
              <span>منشأة سعودية معتمدة ومتخصصة في بناء وتطوير الحلول الرقمية</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-[#F5D47A] uppercase tracking-wider mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#why-website" className="hover:text-white transition-colors">
                  لماذا تحتاج موقعاً؟
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  باقات تصميم المواقع
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  معرض الأعمال الحقيقي
                </a>
              </li>
              <li>
                <a href="#walkthrough" className="hover:text-white transition-colors">
                  فيديو جودة الأعمال
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-white transition-colors">
                  طلب عرض سعر مباشر
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-[#F5D47A] uppercase tracking-wider mb-4">
              بيانات التواصل المباشر
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2A1E42] border border-[#3E2D60] flex items-center justify-center text-[#F5D47A] group-hover:bg-[#56138A]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">الهاتف المباشر:</span>
                  <span className="font-semibold" dir="ltr">
                    {siteConfig.contact.phoneFormatted}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2A1E42] border border-[#3E2D60] flex items-center justify-center text-emerald-400 group-hover:bg-emerald-700">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">واتساب خدمة العملاء:</span>
                  <span className="font-semibold" dir="ltr">
                    {siteConfig.contact.whatsappFormatted}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2A1E42] border border-[#3E2D60] flex items-center justify-center text-[#F5D47A]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">البريد الإلكتروني:</span>
                  <span className="font-semibold">{siteConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2A1E42] border border-[#3E2D60] flex items-center justify-center text-[#F5D47A]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">المقر:</span>
                  <span>{siteConfig.city} — {siteConfig.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2A1E42] border border-[#3E2D60] flex items-center justify-center text-[#F5D47A]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">ساعات العمل:</span>
                  <span>{siteConfig.contact.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {currentYear} {siteConfig.legalName}. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
