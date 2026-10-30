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
    heroCta: string;
    packageInquiry: (packageName: string) => string;
    formDirectSubmit: (data: {
      name: string;
      phone: string;
      business: string;
      packageName: string;
      timeline: string;
      contactMethod: string;
    }) => string;
  };
  pricingRules: {
    isTaxInclusive: boolean;
    taxRatePercentage: number;
    taxDisclaimer: string;
    renewalTerms: string;
    hostingTerms: string;
  };
  packages: PricingPackage[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "رواد الرقمية",
  legalName: "مؤسسة رواد الرقمية للدعاية والإعلان",
  tagline: "تصميم مواقع إلكترونية احترافية للأنشطة والشركات السعودية تبدأ من 399 ريال",
  description:
    "مؤسسة رواد الرقمية للدعاية والإعلان — شريكك الموثوق لتصميم وتطوير مواقع إلكترونية عصرية وصفحات هبوط عالية التحويل تعزز مبيعاتك وتظهر نشاطك بصورة تليق بعلامتك.",
  logo: "/images/logo.png",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rowaddigital.sa",
  country: "المملكة العربية السعودية",
  city: "الرياض",

  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+966541430116",
    phoneFormatted: "054 143 0116",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+966543907572",
    whatsappFormatted: "+966 54 390 7572",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@rowaddigital.sa",
    workingHours: "السبت - الخميس: 9:00 ص - 9:00 م",
  },

  whatsappMessages: {
    default: "السلام عليكم ، شفت عرض المواقع الإلكترونية من رواد الرقمية ، وأرغب أعرف تفاصيل الباقات.",
    heroCta: "السلام عليكم ، شفت عرض تصميم المواقع بـ 399 ريال من رواد الرقمية وأرغب في طلب موقع لنشاطي.",
    packageInquiry: (packageName: string) =>
      `السلام عليكم ، شفت عرض المواقع الإلكترونية من رواد الرقمية ، وأرغب بالاستفسار عن (${packageName}).`,
    formDirectSubmit: (data) =>
      `السلام عليكم مؤسسة رواد الرقمية ، أود طلب موقع إلكتروني:\n` +
      `• الاسم: ${data.name}\n` +
      `• الجوال: ${data.phone}\n` +
      `• نوع النشاط: ${data.business || "غير محدد"}\n` +
      `• الباقة: ${data.packageName}\n` +
      `• موعد التنفيذ: ${data.timeline}\n` +
      `• وسيلة التواصل المفضلة: ${data.contactMethod}`,
  },

  pricingRules: {
    isTaxInclusive: false,
    taxRatePercentage: 15,
    taxDisclaimer: "الأسعار غير شاملة ضريبة القيمة المضافة (15%).",
    renewalTerms: "الدومين الرسمي (.com) والاستضافة السحابية متضمنان ومجانيان للسنة الأولى كاملة.",
    hostingTerms: "استضافة سحابية فائقة السرعة مع شهادة أمان SSL مجانية وتوافق مع كافة المتصفحات.",
  },

  packages: [
    {
      id: "launch",
      name: "باقة الانطلاقة",
      price: 399,
      originalPrice: 650,
      currency: "ريال",
      description: "الحل الاقتصادي المثالي لبدء حضور رقمي موثوق بتكلفة مدروسة ومميزات متكاملة.",
      targetAudience: "المشاريع الناشئة والأنشطة الصغيرة والمستقلين",
      pagesCount: "حتى 5 صفحات تعريفية",
      deliveryDays: "3 - 5 أيام عمل",
      revisionRounds: "جولتان من التعديلات",
      supportDuration: "دعم فني لمدة 14 يوماً",
      features: [
        "موقع تعريفي متكامل يصل إلى 5 صفحات",
        "تصميم احترافي من قالب متميز قابل للتخصيص",
        "دومين .com مجاناً لمدة سنة كاملة",
        "استضافة سحابية سريعة وآمنة لمدة سنة",
        "لوحة تحكم لإدارة وتحديث محتواك بسهولة",
        "تصميم متوافق بنسبة 100% مع الجوال والتابلت",
        "زر محادثة واتساب مباشر",
        "زر اتصال هاتفي سريع بنقرة واحدة",
        "نموذج تواصل واستفسار أساسي",
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
      description: "تصميم مخصص يعكس هويتك البصرية بدقة مع تهيئة لمحركات البحث وأدوات التحليل.",
      targetAudience: "الشركات والمؤسسات التجارية والخدمية",
      pagesCount: "حتى 8 صفحات مخصصة",
      deliveryDays: "7 - 10 أيام عمل",
      revisionRounds: "3 جولات من التعديلات",
      supportDuration: "دعم فني لمدة 30 يوماً",
      features: [
        "جميع مميزات باقة الانطلاقة كاملة",
        "تصميم احترافي حتى 8 صفحات مخصصة",
        "تصميم مخصص بالكامل للهوية البصرية لعلامتك",
        "نموذج مخصص لطلب عروض أسعار واستقبال الطلبات",
        "تهيئة SEO أساسية للظهور في محركات البحث",
        "ربط احترافي مع Google Analytics 4",
        "تحسين واجهات وتجربة المستخدم (UI/UX)",
        "دعم فني وصيانة لمدة 30 يوماً بعد التسليم",
      ],
    },
    {
      id: "pro",
      name: "باقة الاحتراف",
      badge: "الأشمل للحملات الإعلانية",
      price: 1699,
      originalPrice: 2800,
      currency: "ريال",
      description: "منظومة تسويقية متكاملة مصممة لتحقيق أعلى معدل تحويل من الإعلانات المدفوعة.",
      targetAudience: "الشركات التي تعتمد على الحملات الإعلانية والمبيعات",
      pagesCount: "حتى 12 صفحة متكاملة",
      deliveryDays: "14 - 20 يوم عمل",
      revisionRounds: "تعديلات مرنة خلال فترة التنفيذ",
      supportDuration: "دعم فني وأولوية استجابة لمدة 60 يوماً",
      features: [
        "جميع مميزات باقة الأعمال بالكامل",
        "تطوير ما يصل إلى 12 صفحة متكاملة",
        "صفحتا هبوط (Landing Pages) مخصصتان للإعلانات",
        "ربط TikTok Pixel لتتبع الحملات الإعلانية",
        "ربط Meta Pixel (Instagram & Facebook)",
        "ربط Snapchat Pixel المخصص",
        "ربط أدوات تحليل الأداء المتقدمة",
        "نماذج استقبال طلبات متعددة ومحسّنة للتحويل",
        "لوحة متابعة العملاء المحتملين",
        "دعم فني وأولوية استجابة لمدة 60 يوماً",
      ],
    },
  ],

  faqs: [
    {
      question: "كم يستغرق استلام الموقع الإلكتروني؟",
      answer:
        "نلتزم بجدول زمني واضح وسريع: باقة الانطلاقة يتم تسليمها خلال 3 إلى 5 أيام عمل، وباقة الأعمال خلال 7 إلى 10 أيام عمل، وباقة الاحتراف خلال 14 إلى 20 يوم عمل، وذلك بعد استلام محتوى نشاطك وبيانات الهوية.",
    },
    {
      question: "هل الدومين والاستضافة مشمولان بالسعر فعلاً؟",
      answer:
        "نعم، جميع الباقات تشمل حجز اسم النطاق (.com) الخاص بنشاطك مجاناً لمدة سنة كاملة، بالإضافة إلى استضافة سحابية آمنة وعالية السرعة مع شهادة أمان SSL مشمولة للسنة الأولى بدون أي تكاليف خفية.",
    },
    {
      question: "هل يمكنني تعديل صور ونصوص الموقع بنفسي مستقبلاً؟",
      answer:
        "نعم بالتأكيد، نزودك بلوحة تحكم عربية سهلة الاستخدام تتيح لك تحديث أرقام التواصل، الخدمات، الصور، والأسعار في أي وقت بسهولة وبدون الحاجة لخبرة برمجية.",
    },
    {
      question: "هل الموقع مهيأ لإعلانات تيك توك وسناب شات وإنستغرام؟",
      answer:
        "نعم، تم تصميم وبرمجة الموقع ليكون سريع التحميل جداً ومتوافق بنسبة 100% مع شاشات الجوال لضمان عدم فقدان أي زائر قادم من الإعلانات. وتتضمن باقة الاحتراف الربط الفني المباشر لبيكسلات TikTok وSnapchat وMeta.",
    },
    {
      question: "كيف أبدأ وأطلب موقعي الآن؟",
      answer:
        "الخطوة بسيطة جداً: اختر الباقة المناسبة واملأ نموذج الطلب في أسفل هذه الصفحة، أو تواصل معنا فوراً عبر زر الواتساب أو الاتصال، وسيقوم فريقنا بالتنسيق معك فوراً لتحديد تفاصيل نشاطك والبدء بالتنفيذ.",
    },
  ],
};
