import crypto from "crypto";

// Fallback secret if not set
const AUTH_SECRET = process.env.AUTH_SECRET || "rowad_digital_admin_secret_key_2026_fallback";

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function safeCompare(a: string, b: string): boolean {
  try {
    const bufferA = Buffer.from(a, "utf8");
    const bufferB = Buffer.from(b, "utf8");

    if (bufferA.length !== bufferB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufferA, bufferB);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically signed HMAC token for admin session
 */
export function generateSignedSessionToken(): string {
  const timestamp = Date.now().toString();
  const payload = `admin_${timestamp}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

/**
 * Verify HMAC signed session token and ensure it has not expired (7 days)
 */
export function verifySignedSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");

  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  // Check timestamp (max 7 days validity)
  const timestampStr = payload.replace("admin_", "");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > sevenDaysMs) {
    return false; // Expired
  }

  return true;
}

/**
 * In-memory sliding-window Rate Limiter
 * Tracks requests per IP/Key and blocks brute-force or spam attacks
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Clean up if expired
  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Sanitize search strings to prevent regex injection (ReDoS) in MongoDB queries
 */
export function sanitizeSearchString(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").slice(0, 100);
}

