"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { trackContact } from "@/lib/metaPixel";
import { MessageCircle, ArrowLeft, Sparkles, FolderKanban } from "lucide-react";

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down slightly
      setVisible(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    siteConfig.whatsappMessages.heroCta
  )}`;

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECE8F2] p-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-200">
      <div className="grid grid-cols-12 gap-2 items-center">
        {/* Portfolio Button */}
        <a
          href="#portfolio"
          className="col-span-3 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0] text-[10px] font-bold active:scale-95 transition-transform"
        >
          <FolderKanban className="w-4 h-4 text-[#966F13] mb-0.5" />
          <span>أعمالنا</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("WhatsApp", "Sticky Mobile Bar")}
          className="col-span-4 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#DCFCE7] text-[#14532D] border border-emerald-300 text-[10px] font-black active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>واتساب فوري</span>
        </a>

        {/* Book Button */}
        <a
          href="#lead-form"
          className="col-span-5 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#56138A] to-[#320853] text-white text-[11px] font-black shadow-md active:scale-95 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D47A]" />
          <span>احجز بـ 399 ر.س</span>
        </a>
      </div>
    </div>
  );
}

