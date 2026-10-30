import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { checkRateLimit } from "@/lib/security";

const leadSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب ألا يقل عن حرفين").max(100, "الاسم طويل جداً"),
  phone: z
    .string()
    .trim()
    .min(9, "رقم الجوال يجب أن يتكون من 9 أرقام على الأقل")
    .max(20, "رقم الجوال غير صالح")
    .regex(/^[0-9+ ]+$/, "رقم الجوال يجب أن يحتوي على أرقام فقط"),
  business: z.string().trim().max(100).optional(),
  packageId: z.string().max(50),
  packageName: z.string().max(100),
  timeline: z.string().max(50).default("فوراً"),
  contactMethod: z.string().max(50).default("واتساب"),
  notes: z.string().max(500).optional(),
  source: z.string().max(50).optional(),
  utmSource: z.string().max(50).optional(),
  utmMedium: z.string().max(50).optional(),
  utmCampaign: z.string().max(50).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Anti-Spam Rate Limiting per IP (Max 6 requests per 10 minutes)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "lead_ip_default";

    const rateLimit = checkRateLimit(`lead_submission_${clientIp}`, 6, 10 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "تم إرسال عدة طلبات مؤخراً. يرجى الانتظار بضع دقائق قبل إرسال طلب جديد.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    // Generate unique reference
    const leadRef = `RD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save to MongoDB Atlas
    let savedToMongo = false;
    try {
      const db = await connectToDatabase();
      if (db) {
        await Lead.create({
          reference: leadRef,
          name: validatedData.name,
          phone: validatedData.phone,
          business: validatedData.business || "",
          packageId: validatedData.packageId,
          packageName: validatedData.packageName,
          timeline: validatedData.timeline,
          contactMethod: validatedData.contactMethod,
          status: "new",
          priority: validatedData.timeline === "فوراً" ? "high" : "medium",
          notes: validatedData.notes || "",
          source: validatedData.source || "Website Form",
          utmSource: validatedData.utmSource,
          utmMedium: validatedData.utmMedium,
          utmCampaign: validatedData.utmCampaign,
        });
        savedToMongo = true;
      }
    } catch (dbError) {
      console.error("MongoDB Atlas Save Warning:", dbError);
    }

    return NextResponse.json({
      success: true,
      reference: leadRef,
      savedToDatabase: savedToMongo,
      message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues, message: "يرجى التأكد من صحة البيانات المدخلة" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
