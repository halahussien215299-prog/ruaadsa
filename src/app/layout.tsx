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
  verification: {
    google: "NbHVNp0h1bzhxmzLdoMbG_fMlgAluclsrF7iz1Yc2VI",
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
      <head>
        {/* Meta Pixel Base Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1359207189452396');fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1359207189452396&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9FC] text-[#15101E] antialiased selection:bg-[#56138a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
