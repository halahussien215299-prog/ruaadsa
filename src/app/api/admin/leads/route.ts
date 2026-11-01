import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { verifySignedSessionToken, sanitizeSearchString } from "@/lib/security";

function checkAuth(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get("rowad_admin_session");
  return verifySignedSessionToken(sessionCookie?.value);
}

// GET all leads with sanitized query & auth check
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, message: "غير مصرح لك بالوصول" },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, message: "تعذر الاتصال بقاعدة البيانات MongoDB Atlas" },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const rawSearch = searchParams.get("search");

    const query: any = {};

    const validStatuses = ["new", "contacted", "interested", "not_interested", "won", "closed"];
    if (status && validStatuses.includes(status)) {
      query.status = status;
    }

    if (rawSearch && rawSearch.trim()) {
      const sanitized = sanitizeSearchString(rawSearch.trim());
      query.$or = [
        { name: { $regex: sanitized, $options: "i" } },
        { phone: { $regex: sanitized, $options: "i" } },
        { reference: { $regex: sanitized, $options: "i" } },
        { business: { $regex: sanitized, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(200).lean();

    // Compute metrics
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "new" });
    const contactedLeads = await Lead.countDocuments({ status: "contacted" });
    const wonLeads = await Lead.countDocuments({ status: "won" });

    return NextResponse.json(
      {
        success: true,
        leads,
        metrics: {
          total: totalLeads,
          new: newLeads,
          contacted: contactedLeads,
          won: wonLeads,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء جلب الطلبات" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
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

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "معرف الطلب غير صالح" },
        { status: 400 }
      );
    }

    const validStatuses = ["new", "contacted", "interested", "not_interested", "won", "closed"];
    const updateFields: any = {};

    if (status && validStatuses.includes(status)) {
      updateFields.status = status;
    }
    if (typeof notes === "string") {
      updateFields.notes = notes.slice(0, 1000);
    }
    if (priority && ["high", "medium", "low"].includes(priority)) {
      updateFields.priority = priority;
    }
    if (typeof saleAmount === "number" && saleAmount >= 0) {
      updateFields.saleAmount = saleAmount;
    }

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

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "معرف الطلب غير صالح" },
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
