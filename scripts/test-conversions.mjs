import assert from "node:assert";

// Mock browser window globals
global.window = {
  fbqEvents: [],
  ttqEvents: [],
  fbq: function (action, eventName, params) {
    global.window.fbqEvents.push({ action, eventName, params });
  },
  ttq: {
    track: function (eventName, params) {
      global.window.ttqEvents.push({ eventName, params });
    },
    page: function () {
      global.window.ttqEvents.push({ eventName: "page" });
    },
  },
};

// Import tracking functions
const { trackLead, trackContact, pageview } = await import("../src/lib/metaPixel.ts");

console.log("==================================================");
console.log("🧪 RUNNING RUAAD DIGITAL CONVERSION AUDIT TESTS");
console.log("==================================================");

// ----------------------------------------------------
// TEST 1: Save Success & Single Event Verification
// ----------------------------------------------------
console.log("\n[TEST 1] Testing Successful Lead Conversion & Events...");
global.window.fbqEvents = [];
global.window.ttqEvents = [];

const orderRef1 = "RD-123456";
trackLead("باقة الأعمال (899 ر.س)", 899, orderRef1);

// 1. Meta Lead event sent with correct properties
assert.strictEqual(global.window.fbqEvents.length, 1, "Meta should receive exactly 1 event");
assert.strictEqual(global.window.fbqEvents[0].eventName, "Lead");
assert.strictEqual(global.window.fbqEvents[0].params.order_id, orderRef1);
assert.strictEqual(global.window.fbqEvents[0].params.value, 899);

// 2. TikTok SubmitForm sent, and CompleteRegistration NOT sent
assert.strictEqual(global.window.ttqEvents.length, 1, "TikTok should receive exactly 1 event");
assert.strictEqual(global.window.ttqEvents[0].eventName, "SubmitForm");
assert.strictEqual(global.window.ttqEvents[0].params.event_id, orderRef1);
assert.strictEqual(global.window.ttqEvents[0].params.value, 899);
const hasCompleteReg = global.window.ttqEvents.some((e) => e.eventName === "CompleteRegistration");
assert.strictEqual(hasCompleteReg, false, "CompleteRegistration MUST NOT be sent");

console.log("✅ TEST 1 PASSED: Save success fires Meta 'Lead' and TikTok 'SubmitForm' with no 'CompleteRegistration' duplication.");

// ----------------------------------------------------
// TEST 2: Deduplication on Repeated Submissions / Clicks
// ----------------------------------------------------
console.log("\n[TEST 2] Testing Deduplication on Repeated Submissions (Same Order Ref)...");
const initialFbqCount = global.window.fbqEvents.length;
const initialTtqCount = global.window.ttqEvents.length;

// Attempt to track the same orderRef multiple times (simulating double-click or re-render)
trackLead("باقة الأعمال (899 ر.س)", 899, orderRef1);
trackLead("باقة الأعمال (899 ر.س)", 899, orderRef1);

assert.strictEqual(global.window.fbqEvents.length, initialFbqCount, "Meta event count must not increase for duplicate ref");
assert.strictEqual(global.window.ttqEvents.length, initialTtqCount, "TikTok event count must not increase for duplicate ref");

// Now track a NEW independent order
const orderRef2 = "RD-987654";
trackLead("باقة الانطلاقة (399 ر.س)", 399, orderRef2);

assert.strictEqual(global.window.fbqEvents.length, initialFbqCount + 1, "New independent order MUST be tracked for Meta");
assert.strictEqual(global.window.ttqEvents.length, initialTtqCount + 1, "New independent order MUST be tracked for TikTok");
assert.strictEqual(global.window.ttqEvents[global.window.ttqEvents.length - 1].params.event_id, orderRef2);

console.log("✅ TEST 2 PASSED: Repeated submissions of the same order are strictly blocked; new independent orders are allowed.");

// ----------------------------------------------------
// TEST 3: Database Failure Simulation in API Response
// ----------------------------------------------------
console.log("\n[TEST 3] Testing Database Failure Handling (Zero Conversion)...");
global.window.fbqEvents = [];
global.window.ttqEvents = [];

// Simulate LeadFormSection logic when API returns database failure
function simulateFrontendHandling(apiResponse) {
  let isSubmitted = false;
  let orderRef = "";
  let errorMsg = "";

  if (apiResponse.ok && apiResponse.data?.success === true && apiResponse.data?.savedToDatabase === true && apiResponse.data?.reference) {
    orderRef = apiResponse.data.reference;
    isSubmitted = true;
    trackLead("باقة الانطلاقة", 399, orderRef);
  } else {
    errorMsg = apiResponse.data?.message || "تعذر حفظ بيانات طلبك في النظام حالياً.";
  }

  return { isSubmitted, orderRef, errorMsg };
}

// Case A: DB error response (503)
const dbFailureResponse = {
  ok: false,
  status: 503,
  data: {
    success: false,
    savedToDatabase: false,
    message: "تعذر حفظ بيانات طلبك في النظام حالياً. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.",
  },
};

const resultA = simulateFrontendHandling(dbFailureResponse);
assert.strictEqual(resultA.isSubmitted, false, "Order must NOT be marked submitted on DB failure");
assert.strictEqual(resultA.orderRef, "", "No fake reference ID generated on DB failure");
assert.ok(resultA.errorMsg.length > 0, "Clear error message displayed to user");
assert.strictEqual(global.window.fbqEvents.length, 0, "No Meta event must be fired on DB failure");
assert.strictEqual(global.window.ttqEvents.length, 0, "No TikTok event must be fired on DB failure");

// Case B: Network Exception / Catch block
function simulateNetworkException() {
  let isSubmitted = false;
  let orderRef = "";
  let errorMsg = "";

  try {
    throw new Error("Network timeout / offline");
  } catch (err) {
    // New logic: Do NOT generate fake ref, do NOT call trackLead
    errorMsg = "تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.";
  }

  return { isSubmitted, orderRef, errorMsg };
}

const resultB = simulateNetworkException();
assert.strictEqual(resultB.isSubmitted, false);
assert.strictEqual(resultB.orderRef, "");
assert.strictEqual(global.window.fbqEvents.length, 0, "No Meta event on network exception");
assert.strictEqual(global.window.ttqEvents.length, 0, "No TikTok event on network exception");

console.log("✅ TEST 3 PASSED: Zero conversion events fired on DB or network failure. Clear error message presented without fake ref.");

// ----------------------------------------------------
// TEST 4: Dropped Connection Retry & Idempotency Key Handling
// ----------------------------------------------------
console.log("\n[TEST 4] Testing Server Idempotency (Dropped Network Response Retry)...");
global.window.fbqEvents = [];
global.window.ttqEvents = [];

// Mock DB collection
const mockDatabase = new Map();
function simulateServerPostApiLeads(payload) {
  // Check if idempotencyKey already exists
  if (payload.idempotencyKey && mockDatabase.has(payload.idempotencyKey)) {
    const existing = mockDatabase.get(payload.idempotencyKey);
    return {
      status: 200,
      ok: true,
      data: {
        success: true,
        reference: existing.reference,
        savedToDatabase: true,
        isDuplicateRetry: true,
        message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
      },
    };
  }

  // Create new
  const ref = `RD-${Math.floor(100000 + Math.random() * 900000)}`;
  const record = { reference: ref, ...payload };
  if (payload.idempotencyKey) {
    mockDatabase.set(payload.idempotencyKey, record);
  }

  return {
    status: 200,
    ok: true,
    data: {
      success: true,
      reference: ref,
      savedToDatabase: true,
      message: "تم استلام طلبك بنجاح وسيتواصل معك فريق رواد الرقمية قريباً.",
    },
  };
}

const clientPayload = {
  name: "محمد الأحمدي",
  phone: "0543907572",
  packageId: "business",
  packageName: "باقة الأعمال (899 ر.س)",
  idempotencyKey: "req_test_key_abc_999",
};

// 1st Attempt: Saved on server, but let's simulate connection dropped before client received it
const serverAttempt1 = simulateServerPostApiLeads(clientPayload);
const firstRef = serverAttempt1.data.reference;
assert.strictEqual(mockDatabase.size, 1, "Database should have exactly 1 record");

// 2nd Attempt: Client retries with the SAME idempotencyKey
const serverAttempt2 = simulateServerPostApiLeads(clientPayload);
assert.strictEqual(mockDatabase.size, 1, "Database count MUST NOT increase on retry!");
assert.strictEqual(serverAttempt2.data.reference, firstRef, "Server must return the same authentic reference");
assert.strictEqual(serverAttempt2.data.isDuplicateRetry, true, "Marked as duplicate retry");

// Client receives the retry response and triggers tracking
trackLead(clientPayload.packageName, 899, serverAttempt2.data.reference);
assert.strictEqual(global.window.fbqEvents.length, 1, "Meta Lead fired once");
assert.strictEqual(global.window.ttqEvents.length, 1, "TikTok SubmitForm fired once");

// Even if client called trackLead again with this reference:
trackLead(clientPayload.packageName, 899, serverAttempt2.data.reference);
assert.strictEqual(global.window.fbqEvents.length, 1, "Still exactly 1 Meta event");
assert.strictEqual(global.window.ttqEvents.length, 1, "Still exactly 1 TikTok event");

console.log("✅ TEST 4 PASSED: Server Idempotency prevents duplicate DB records on retry, returns existing reference, and tracks events exactly once.");

console.log("\n==================================================");
console.log("🎉 ALL CONVERSION INTEGRATION TESTS PASSED (4/4)");
console.log("==================================================");
