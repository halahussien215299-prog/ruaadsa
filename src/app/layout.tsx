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
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1123225963439754');fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1123225963439754&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>

        {/* TikTok Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('DBIUQE3C77UEENV8D9TG');
  ttq.page();
}(window, document, 'ttq');`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9FC] text-[#15101E] antialiased selection:bg-[#56138a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
