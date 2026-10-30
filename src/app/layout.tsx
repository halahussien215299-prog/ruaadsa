import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.legalName} | تصميم مواقع إلكترونية احترافية تبدأ من 399 ريال`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "تصميم مواقع الكترونية",
    "رواد الرقمية",
    "مواقع الكترونية السعودية",
    "تصميم متاجر الكترونية",
    "صفحات هبوط",
    "باقات تصميم المواقع",
    "برمجة مواقع المدينة المنورة",
    "تصميم مواقع المدينة المنورة",
    "تسويق رقمي",
    "حملات اعلانية تيك توك وسناب",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.legalName} | تصميم مواقع إلكترونية تبدأ من 399 ريال`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 600,
        height: 600,
        alt: siteConfig.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | تصميم مواقع احترافية تبدأ من 399 ريال`,
    description: siteConfig.tagline,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#56138a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9FC] text-[#15101E] antialiased selection:bg-[#56138a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
