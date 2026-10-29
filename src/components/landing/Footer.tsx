import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-white border-t border-[#ECE8F2] pt-12 pb-24 sm:pb-12 text-[#4B5563]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ECE8F2]">
          {/* Logo & Agency Identity on White Background */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.legalName}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#15101E]">
                {siteConfig.legalName}
              </h3>
              <p className="text-xs text-[#6B7280]">
                تسويق رقمي وتصميم مواقع احترافية — {siteConfig.city}
              </p>
            </div>
          </div>

          {/* Quick Contact Line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-1.5 text-[#320853] hover:text-[#56138A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#56138A]" />
              <span dir="ltr">{siteConfig.contact.phoneFormatted}</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>واتساب خدمة العملاء</span>
            </a>

            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <MapPin className="w-3.5 h-3.5 text-[#C99726]" />
              <span>{siteConfig.city} — {siteConfig.country}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF] text-center sm:text-right">
          <p>
            © {currentYear} {siteConfig.legalName}. جميع الحقوق محفوظة.
          </p>
          <p className="text-[11px] text-[#6B7280]">
            العرض يشمل الدومين والاستضافة للسنة الأولى وفق الشروط المعتمدة.
          </p>
        </div>
      </div>
    </footer>
  );
}

