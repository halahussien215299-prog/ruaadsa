export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  isRecommended?: boolean;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  targetAudience: string;
  features: string[];
  pagesCount: string;
  deliveryDays: string;
  revisionRounds: string;
  supportDuration: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  logo: string;
  url: string;
  country: string;
  city: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    workingHours: string;
  };
  whatsappMessages: {
    default: string;
    packageInquiry: (packageName: string) => string;
  };
  social: {
    tiktok?: string;
    instagram?: string;
    x?: string;
    snapchat?: string;
  };
  pricingRules: {
    isTaxInclusive: boolean;
    taxRatePercentage: number;
    taxDisclaimer: string;
    renewalTerms: string;
    hostingTerms: string;
  };
  packages: PricingPackage[];
}

export const siteConfig: SiteConfig = {
  name: "رواد الرقمية",
  legalName: "مؤسسة رواد الرقمية للدعاية والإعلان",
  tagline: "تصميم مواقع إلكترونية احترافية وتجارب رقمية عالية التحويل في المملكة العربية السعودية",
  description:
    "مؤسسة رواد الرقمية متخصصة في تصميم وبرمجة المواقع الإلكترونية والصفحات التسويقية المهيأة للحملات الإعلانية ومضاعفة التحويلات ونمو الأنشطة التجارية.",
  logo: "/images/logo.png",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rowaddigital.sa",
  country: "المملكة العربية السعودية",
  city: "الرياض",

  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+966500000000",
    phoneFormatted: "050 000 0000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+966500000000",
    whatsappFormatted: "+966 50 000 0000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@rowaddigital.sa",
    workingHours: "السبت - الخميس: 9:00 ص - 9:00 م",
  },

  whatsappMessages: {
    default: "السلام عليكم ، شفت عرض المواقع الإلكترونية من رواد الرقمية ، وأرغب أعرف تفاصيل الباقات.",
    packageInquiry: (packageName: string) =>
      `السلام عليكم ، شفت عرض المواقع الإلكترونية من رواد الرقمية ، وأرغب بالاستفسار عن (${packageName}).`,
  },

  social: {
    tiktok: "https://tiktok.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
    snapchat: "https://snapchat.com",
  },

  pricingRules: {
    isTaxInclusive: false,
    taxRatePercentage: 15,
    taxDisclaimer: "الأسعار المعروضة غير شاملة ضريبة القيمة المضافة (15%).",
    renewalTerms: "حجز النطاق (.com) والاستضافة السحابية متضمنان ومجانيان للسنة الأولى، والتجديد السنوي يتم بالأسعار الرسمية المعتمدة عند انتهاء السنة الأولى.",
    hostingTerms: "استضافة سحابية عالية الأداء مع شهادة أمان SSL مجانية وسيرفرات فائقة السرعة والاستقرار.",
  },

  packages: [
    {
      id: "launch",
      name: "باقة الانطلاقة",
      price: 399,
      originalPrice: 650,
      currency: "ريال",
      description: "الحل الأمثل والأنسب لبدء حضور رقمي موثوق بتكلفة اقتصادية مدروسة وجودة عالية.",
      targetAudience: "المشاريع الناشئة والأنشطة الصغيرة والمستقلين",
      pagesCount: "حتى 5 صفحات تعريفية",
      deliveryDays: "3 - 5 أيام عمل",
      revisionRounds: "جولتان من التعديلات",
      supportDuration: "دعم فني وتوجيهي لمدة 14 يوماً",
      features: [
        "موقع تعريفي متكامل يصل إلى 5 صفحات",
        "تصميم احترافي من قالب متميز قابل للتخصيص",
        "دومين .com مجاناً لمدة سنة كاملة",
        "استضافة سحابية سريعة وآمنة لمدة سنة",
        "لوحة تحكم سهلة لإدارة وتحديث محتواك",
        "تصميم متوافق بنسبة 100% مع الجوال والتابلت",
        "زر محادثة واتساب عائم ومباشر",
        "زر اتصال هاتفي سريع بنقرة واحدة",
        "نموذج تواصل واستفسار أساسي مع إشعارات",
        "شهادة أمان رقمية مجانية SSL (HTTPS)",
      ],
    },
    {
      id: "business",
      name: "باقة الأعمال",
      badge: "الخيار المرشح للمؤسسات",
      isRecommended: true,
      price: 899,
      originalPrice: 1400,
      currency: "ريال",
      description: "تصميم مخصص يعكس هويتك التجارية بدقة ويمنحك أدوات استقبال عروض الأسعار والتحليل.",
      targetAudience: "الشركات والمؤسسات التجارية والخدمية",
      pagesCount: "حتى 8 صفحات مخصصة",
      deliveryDays: "7 - 10 أيام عمل",
      revisionRounds: "3 جولات من التعديلات",
      supportDuration: "دعم فني وصيانة لمدة 30 يوماً",
      features: [
        "جميع مميزات باقة الانطلاقة كاملة",
        "تصميم احترافي حتى 8 صفحات مخصصة",
        "تصميم مخصص بالكامل للهوية البصرية لعلامتك",
        "نموذج مخصص لطلب عروض الأسعار واستقبال الطلبات",
        "تهيئة SEO أساسية للظهور في محركات البحث",
        "ربط احترافي مع Google Analytics 4 لمتابعة الزوار",
        "تحسين واجهات وتجربة المستخدم (UI/UX) لرفع التحويل",
        "ربط نموذج الطلبات بالبريد الإلكتروني المباشر",
        "سرعة تحميل فائقة وتوافق تام مع محركات البحث",
        "دعم فني وصيانة مجانية لمدة 30 يوماً بعد التسليم",
      ],
    },
    {
      id: "pro",
      name: "باقة الاحتراف والتسويق",
      badge: "الأشمل للحملات الإعلانية",
      price: 1699,
      originalPrice: 2800,
      currency: "ريال",
      description: "منظومة تسويقية متكاملة مصممة خصيصاً لتحقيق أعلى عائد من الحملات الإعلانية المدفوعة.",
      targetAudience: "الشركات التي تعتمد على الحملات الإعلانية والمبيعات الرقمية",
      pagesCount: "حتى 12 صفحة متكاملة",
      deliveryDays: "14 - 20 يوم عمل",
      revisionRounds: "تعديلات مرنة خلال فترة التنفيذ",
      supportDuration: "دعم فني وأولويّة استجابة لمدة 60 يوماً",
      features: [
        "جميع مميزات باقة الأعمال بالكامل",
        "تطوير ما يصل إلى 12 صفحة متكاملة",
        "صفحتا هبوط (Landing Pages) مخصصتان ومحسّنتان للإعلانات",
        "ربط وإعداد TikTok Pixel لتتبع الحملات",
        "ربط وإعداد Meta Pixel (Instagram & Facebook)",
        "ربط وإعداد Snapchat Pixel المخصص",
        "ربط أدوات تحليل الأداء المتقدمة وسلوك المستخدم",
        "نماذج استقبال طلبات متعددة ومحسّنة لمعدل التحويل (CRO)",
        "لوحة متابعة وتصنيف العملاء المحتملين (Lead Pipeline)",
        "دعم فني وأولوية استجابة وتحديث لمدة 60 يوماً",
      ],
    },
  ],
};
