import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

function checkAuth(req: NextRequest) {
  const sessionCookie = req.cookies.get("rowad_admin_session");
  return sessionCookie?.value === "authenticated_admin";
}

// GET all leads with optional status filter & search
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, message: "غير مصرح لك بالوصول" },
      { status: 401 }
    );
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "تعذر الاتصال بقاعدة البيانات MongoDB Atlas" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query: any = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { reference: { $regex: search, $options: "i" } },
        { business: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();

    // Compute metrics
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "new" });
    const contactedLeads = await Lead.countDocuments({ status: "contacted" });
    const wonLeads = await Lead.countDocuments({ status: "won" });

    return NextResponse.json({
      success: true,
      leads,
      metrics: {
        total: totalLeads,
        new: newLeads,
        contacted: contactedLeads,
        won: wonLeads,
      },
    });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء جلب الطلبات" },
      { status: 500 }
    );
  }
}

// PATCH update lead status, notes, or sale amount
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, message: "غير مصرح لك" },
      { status: 401 }
    );
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "تعذر الاتصال بقاعدة البيانات" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { id, status, notes, priority, saleAmount } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "معرف الطلب مطلوب" },
        { status: 400 }
      );
    }

    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;
    if (priority) updateFields.priority = priority;
    if (saleAmount !== undefined) updateFields.saleAmount = saleAmount;

    const updated = await Lead.findByIdAndUpdate(id, updateFields, { new: true });

    return NextResponse.json({
      success: true,
      lead: updated,
      message: "تم تحديث بيانات الطلب بنجاح",
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء التحديث" },
      { status: 500 }
    );
  }
}

// DELETE a lead
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, message: "غير مصرح لك" },
      { status: 401 }
    );
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "تعذر الاتصال بقاعدة البيانات" },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "معرف الطلب مطلوب" },
        { status: 400 }
      );
    }

    await Lead.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "تم حذف الطلب بنجاح",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء الحذف" },
      { status: 500 }
    );
  }
}
