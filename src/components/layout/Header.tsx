"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MessageCircle, Menu, X, ArrowLeft, Sparkles } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "لماذا تحتاج موقعاً؟", href: "#why-website" },
    { label: "باقات الأسعار", href: "#pricing" },
    { label: "معرض الأعمال", href: "#portfolio" },
    { label: "فيديو العرض", href: "#walkthrough" },
    { label: "طلب موقع", href: "#order-form" },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    siteConfig.whatsappMessages.default
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(86,19,138,0.06)] border-b border-[#ECE8F2] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Agency Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 bg-white rounded-xl p-1 shadow-sm border border-[#EFE8F6] group-hover:border-[#C99726]/40 transition-colors">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.legalName}
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-[#320853] tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C99726]" />
              </div>
              <span className="text-[11px] sm:text-xs text-[#6B7280] font-medium -mt-0.5">
                للدعاية والإعلان — السعودية
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full border border-[#ECE8F2] shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#4B5563] hover:text-[#56138A] transition-colors relative py-1 hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="p-2.5 rounded-full text-[#56138A] hover:bg-[#F5EEFA] border border-transparent hover:border-[#E8DCF2] transition-colors"
              title="اتصال هاتفي مباشر"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-[#16a34a] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-colors"
              title="محادثة واتساب سريعة"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#56138A] via-[#6B17A6] to-[#320853] hover:from-[#440D6E] hover:to-[#220438] shadow-[0_4px_16px_rgba(86,19,138,0.25)] hover:shadow-[0_6px_20px_rgba(86,19,138,0.35)] transition-all transform active:scale-[0.98]"
            >
              <span>اطلب موقعك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#320853] hover:bg-[#F5EEFA] focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/98 backdrop-blur-xl border-b border-[#ECE8F2] px-5 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-semibold text-[#15101E] hover:text-[#56138A] hover:bg-[#F5EEFA] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#ECE8F2] flex flex-col gap-2.5">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#56138A] to-[#320853] shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#F5D47A]" />
                <span>اطلب موقعك الآن (يبدأ من 399 ر.س)</span>
              </a>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#ECE8F2] text-[#320853] font-medium text-sm hover:bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-[#56138A]" />
                  <span>اتصال مباشر</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>واتساب فوري</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
