import { NextRequest, NextResponse } from "next/server";
import {
  safeCompare,
  generateSignedSessionToken,
  checkRateLimit,
} from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (Brute Force Protection)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "admin_ip_default";

    const rateLimit = checkRateLimit(
      `login_attempt_${clientIp}`,
      5, // max 5 attempts
      15 * 60 * 1000 // 15 minutes window
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `تم تجاوز عدد المحاولات المسموح بها. يرجى المحاولة بعد ${rateLimit.retryAfterSeconds} ثانية.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfterSeconds.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "rowad2026";

    // 2. Constant-time secure comparison
    if (!password || typeof password !== "string" || !safeCompare(password.trim(), expectedPassword.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "كلمة المرور غير صحيحة",
          remainingAttempts: rateLimit.remaining,
        },
        { status: 401 }
      );
    }

    // 3. Cryptographically signed token
    const token = generateSignedSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
    });

    response.cookies.set({
      name: "rowad_admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
