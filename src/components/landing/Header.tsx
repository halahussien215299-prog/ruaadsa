"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    siteConfig.whatsappMessages.heroCta
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(86,19,138,0.06)] border-b border-[#ECE8F2] py-2.5"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Official Logo on Clean White Surface - No Dark Backgrounds */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.legalName}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-[#320853] tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C99726]" />
              </div>
              <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium -mt-0.5">
                للدعاية والإعلان — المملكة العربية السعودية
              </span>
            </div>
          </div>

          {/* Direct Contact CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#320853] bg-[#F5EEFA] hover:bg-[#EBDCF7] transition-colors"
              title="اتصال مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-[#56138A]" />
              <span>اتصل بنا</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] transition-colors border border-[#86EFAC]/60"
              title="واتساب مباشر"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden xs:inline">واتساب مباشر</span>
              <span className="xs:hidden">واتساب</span>
            </a>

            <a
              href="#lead-form"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#56138A] to-[#320853] hover:from-[#440D6E] hover:to-[#220438] shadow-[0_4px_14px_rgba(86,19,138,0.25)] transition-all transform active:scale-[0.98]"
            >
              <span>احجز بـ 399 ر.س</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

