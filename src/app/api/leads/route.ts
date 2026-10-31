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
  idempotencyKey: z.string().max(100).optional(),
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

    // 2. Server-side Idempotency & Duplicate Prevention
    // Check if an existing order was already saved with this idempotencyKey
    // OR if the same phone submitted the same package within the last 3 minutes (grace period retry)
    try {
      const db = await connectToDatabase();
      if (db) {
        let existingLead = null;
        if (validatedData.idempotencyKey) {
          existingLead = await Lead.findOne({ idempotencyKey: validatedData.idempotencyKey }).lean();
        }
        if (!existingLead) {
          const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
          existingLead = await Lead.findOne({
            phone: validatedData.phone,
            packageId: validatedData.packageId,
            createdAt: { $gte: threeMinutesAgo },
          }).lean();
        }

        if (existingLead) {
          return NextResponse.json({
            success: true,
            reference: existingLead.reference,
            savedToDatabase: true,
            isDuplicateRetry: true,
            message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
          });
        }
      }
    } catch (checkErr) {
      console.warn("Idempotency check warning:", checkErr);
    }

    // Generate unique reference
    const leadRef = `RD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save to MongoDB Atlas
    let savedToMongo = false;
    try {
      const db = await connectToDatabase();
      if (db) {
        const createdLead = await Lead.create({
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
          idempotencyKey: validatedData.idempotencyKey,
          utmSource: validatedData.utmSource,
          utmMedium: validatedData.utmMedium,
          utmCampaign: validatedData.utmCampaign,
        });

        if (createdLead && createdLead._id) {
          savedToMongo = true;
        }
      }
    } catch (dbError) {
      console.error("MongoDB Atlas Save Warning:", dbError);
    }

    if (!savedToMongo) {
      return NextResponse.json(
        {
          success: false,
          savedToDatabase: false,
          message: "تعذر حفظ بيانات طلبك في النظام حالياً. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      reference: leadRef,
      savedToDatabase: true,
      message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError || error?.name === "ZodError") {
      return NextResponse.json(
        { success: false, savedToDatabase: false, errors: error.issues, message: "يرجى التأكد من صحة البيانات المدخلة" },
        { status: 400 }
      );
    }
    console.error("Lead submission API error:", error);
    return NextResponse.json(
      { success: false, savedToDatabase: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
