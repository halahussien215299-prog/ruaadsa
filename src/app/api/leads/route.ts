import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "الاسم يجب ألا يقل عن حرفين"),
  phone: z.string().min(9, "رقم الجوال يجب أن يتكون من 9 أرقام على الأقل"),
  business: z.string().optional(),
  packageId: z.string(),
  packageName: z.string(),
  timeline: z.string(),
  contactMethod: z.string(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    // Generate unique lead reference
    const leadRef = `RD-${Date.now().toString().slice(-6)}`;

    // In-memory / console log of lead for developer auditing
    console.log("=== NEW LEAD RECEIVED ===");
    console.log("Ref:", leadRef);
    console.log("Name:", validatedData.name);
    console.log("Phone:", validatedData.phone);
    console.log("Package:", validatedData.packageName);
    console.log("Business:", validatedData.business || "None specified");
    console.log("Timeline:", validatedData.timeline);
    console.log("Contact Method:", validatedData.contactMethod);
    console.log("Timestamp:", new Date().toISOString());
    console.log("=========================");

    return NextResponse.json({
      success: true,
      reference: leadRef,
      message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
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
