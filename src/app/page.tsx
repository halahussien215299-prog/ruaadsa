"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyWebsiteSection } from "@/components/home/WhyWebsiteSection";
import { PricingSection } from "@/components/home/PricingSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("business");

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9FC]">
      {/* Global Navigation Header */}
      <Header />

      {/* Main High-Conversion Sections */}
      <div className="flex-1">
        {/* Section 4: Hero Section */}
        <HeroSection />

        {/* Section 5: Why Website Section */}
        <WhyWebsiteSection />

        {/* Section 6: Pricing Packages */}
        <PricingSection onSelectPackage={setSelectedPackage} />
      </div>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
