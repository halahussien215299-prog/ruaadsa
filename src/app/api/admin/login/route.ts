import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const expectedPassword = process.env.ADMIN_PASSWORD || "rowad2026";

    if (!password || password.trim() !== expectedPassword.trim()) {
      return NextResponse.json(
        { success: false, message: "كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: "rowad_admin_session",
      value: "authenticated_admin",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}
