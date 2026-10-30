import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

const leadSchema = z.object({
  name: z.string().min(2, "الاسم يجب ألا يقل عن حرفين"),
  phone: z.string().min(9, "رقم الجوال يجب أن يتكون من 9 أرقام على الأقل"),
  business: z.string().optional(),
  packageId: z.string(),
  packageName: z.string(),
  timeline: z.string().default("فوراً"),
  contactMethod: z.string().default("واتساب"),
  notes: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    // Generate unique lead reference (e.g. RD-839201)
    const leadRef = `RD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Try saving to MongoDB Atlas
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

    console.log("=== NEW LEAD CAPTURED ===");
    console.log("Ref:", leadRef);
    console.log("Name:", validatedData.name);
    console.log("Phone:", validatedData.phone);
    console.log("Package:", validatedData.packageName);
    console.log("Saved to MongoDB Atlas:", savedToMongo);
    console.log("=========================");

    return NextResponse.json({
      success: true,
      reference: leadRef,
      savedToDatabase: savedToMongo,
      message: "تم استلام وحفظ طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
    });
  } catch (error: any) {
    console.error("Lead submission error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}
