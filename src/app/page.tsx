"use client";

import React, { useState } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { VisualMockupSection } from "@/components/landing/VisualMockupSection";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { StorePricingSection } from "@/components/landing/StorePricingSection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { StickyMobileBar } from "@/components/landing/StickyMobileBar";
import { Footer } from "@/components/landing/Footer";

export default function SingleLandingPage() {
  const [selectedPkg, setSelectedPkg] = useState<string>("business");

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#15101E] relative selection:bg-[#56138A] selection:text-white">
      {/* 0. Minimalist Sticky Header with Official Logo on Clean White Background */}
      <Header />

      {/* 1. Hero Section: 399 SAR Offer */}
      <HeroSection />

      {/* 2. Professional Visual Showcase: Real Website inside Laptop & Mobile */}
      <VisualMockupSection />

      {/* 3. Real Live Portfolio: Corporate Websites & E-Commerce Stores */}
      <PortfolioSection />

      {/* 4. Core Features & Value Pillars */}
      <FeaturesSection />

      {/* 5. The 3 Corporate Website Packages */}
      <PricingSection onSelectPackage={setSelectedPkg} />

      {/* 5.1 The 3 E-Commerce Store Packages */}
      <StorePricingSection onSelectPackage={setSelectedPkg} />

      {/* 6. Fast, Low-Friction Lead Generation Form */}
      <LeadFormSection />

      {/* 7. Frequently Asked Questions (Overcoming Buyer Friction) */}
      <FaqSection />

      {/* 7. Minimalist Light-Themed Footer */}
      <Footer />

      {/* 8. Sticky Mobile Bottom Conversion Bar for TikTok & Snapchat Traffic */}
      <StickyMobileBar />
    </main>
  );
}
