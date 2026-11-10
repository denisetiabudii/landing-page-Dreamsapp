import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";

// =========================================
// TEST ENVIRONMENT
// =========================================

process.env.NODE_ENV = "test";
process.env.PORT = "3000";

process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "test-spreadsheet-id";
process.env.GOOGLE_SHEETS_SHEET_NAME = "Test Sheet";

process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE = "";
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@example.com";
process.env.GOOGLE_PRIVATE_KEY = "test-private-key";

process.env.CORS_ORIGINS = "http://localhost:5173";

process.env.RATE_LIMIT_WINDOW_MS = "900000";
process.env.PUBLIC_RATE_LIMIT_MAX = "100";
process.env.LINK_RATE_LIMIT_MAX = "100";

process.env.WHATSAPP_NUMBER = "6281234567890";
process.env.TRUST_PROXY = "0";

// =========================================
// IMPORT APP
// =========================================

const { createApp } = await import("../src/app.mjs");
const { buildWhatsappUrl } = await import("../src/utils/whatsapp.mjs");
const { assertProductionSettings } = await import("../src/config/env.mjs");

// =========================================
// MOCK MODEL
// =========================================

const createdRequests = [];

const fakeModel = {
  async create(input) {
    const data = {
      id: "test-request-id",
      ...input,
      status: "new",
      created_at: new Date().toISOString(),
    };

    createdRequests.push(data);

    return data;
  },
};

// =========================================
// TEST SERVER
// =========================================

let server;
let baseUrl;

before(async () => {
  const app = createApp(fakeModel);

  server = app.listen(0);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

// =========================================
// HELPERS
// =========================================

const validPayload = {
  name: "Deni",
  organization: "DREAMS",
  email: "deni@example.com",
  whatsapp: "+6281234567890",
  preferred_time: "Pagi",
};

function postDemoRequest(body, rawBody) {
  return fetch(`${baseUrl}/api/demo-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: rawBody ?? JSON.stringify(body),
  });
}

async function expectValidationError(payload, field) {
  const response = await postDemoRequest(payload);
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.success, false);
  assert.equal(result.error.code, "VALIDATION_ERROR");
  assert.ok(result.error.message, "message tidak boleh kosong");
  assert.equal(result.error.details.field, field);
}

// =========================================
// API TESTS
// =========================================

describe("DREAMS Demo Request API", () => {
  it("GET /health should return status ok", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.equal(result.success, true);
    assert.equal(result.data.status, "ok");
  });

  it("POST /api/demo-requests should create a demo request", async () => {
    const response = await postDemoRequest(validPayload);
    const result = await response.json();

    assert.equal(response.status, 201);
    assert.equal(result.success, true);

    assert.equal(result.data.name, validPayload.name);
    assert.equal(result.data.organization, validPayload.organization);
    assert.equal(result.data.email, validPayload.email);
    assert.equal(result.data.whatsapp, validPayload.whatsapp);
    assert.equal(result.data.preferred_time, validPayload.preferred_time);
    assert.equal(result.data.status, "new");

    assert.equal(createdRequests.at(-1).email, validPayload.email);
  });

  it("POST /api/demo-requests should return a whatsapp_url", async () => {
    const response = await postDemoRequest(validPayload);
    const result = await response.json();

    const url = new URL(result.data.whatsapp_url);
    const text = url.searchParams.get("text");

    assert.equal(response.status, 201);
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/6281234567890");
    assert.ok(text.includes(validPayload.name));
    assert.ok(text.includes(validPayload.organization));
    assert.ok(text.includes(validPayload.preferred_time));
  });

  it("POST /api/demo-requests should normalize the phone number to E.164", async () => {
    const response = await postDemoRequest({
      ...validPayload,
      whatsapp: "0812-3456-7890",
    });
    const result = await response.json();

    assert.equal(response.status, 201);
    assert.equal(result.data.whatsapp, "+6281234567890");
    assert.equal(createdRequests.at(-1).whatsapp, "+6281234567890");
  });

  it("POST /api/demo-requests should reject invalid input", async () => {
    const response = await postDemoRequest({
      name: "",
      organization: "DREAMS",
      whatsapp: "+6281234567890",
      preferred_time: "Pagi",
    });

    const result = await response.json();

    assert.equal(response.status, 400);
    assert.equal(result.success, false);
    assert.equal(result.error.code, "VALIDATION_ERROR");
  });

  it("POST /api/demo-requests should report which field is invalid", async () => {
    const before = createdRequests.length;

    await expectValidationError(
      { ...validPayload, email: "bukan-email" },
      "email",
    );
    await expectValidationError(
      { ...validPayload, whatsapp: "abc123" },
      "whatsapp",
    );
    await expectValidationError(
      { ...validPayload, preferred_time: "Malam" },
      "preferred_time",
    );

    assert.equal(
      createdRequests.length,
      before,
      "data tidak valid tidak boleh disimpan",
    );
  });

  it("POST /api/demo-requests should reject landline numbers", async () => {
    const before = createdRequests.length;

    await expectValidationError(
      { ...validPayload, whatsapp: "+62 21 5551234" },
      "whatsapp",
    );

    assert.equal(
      createdRequests.length,
      before,
      "telepon rumah tidak boleh disimpan",
    );
  });

  it("POST /api/demo-requests should accept mobile numbers from other countries", async () => {
    const response = await postDemoRequest({
      ...validPayload,
      whatsapp: "+60 12 345 6789",
    });
    const result = await response.json();

    assert.equal(response.status, 201);
    assert.equal(result.data.whatsapp, "+60123456789");
  });
  it("POST /api/demo-requests should reject unknown fields", async () => {
    const response = await postDemoRequest({ ...validPayload, role: "admin" });
    const result = await response.json();

    assert.equal(response.status, 400);
    assert.equal(result.error.code, "VALIDATION_ERROR");
  });

  it("POST /api/demo-requests should reject malformed JSON", async () => {
    const response = await postDemoRequest(undefined, "{ bukan json");
    const result = await response.json();

    assert.equal(response.status, 400);
    assert.equal(result.error.code, "INVALID_JSON");
  });

  it("GET /api/demo-requests should return 404", async () => {
    const response = await fetch(`${baseUrl}/api/demo-requests`);

    assert.equal(response.status, 404);
  });

  it("GET /api/whatsapp-link should return a general chat link", async () => {
    const response = await fetch(`${baseUrl}/api/whatsapp-link`);
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.equal(result.success, true);

    const url = new URL(result.data.whatsapp_url);

    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/6281234567890");
    assert.ok(url.searchParams.get("text"));
  });

  it("POST /api/whatsapp-link should return 404", async () => {
    const response = await fetch(`${baseUrl}/api/whatsapp-link`, {
      method: "POST",
    });

    assert.equal(response.status, 404);
  });
});


describe("CORS and Rate Limiting", () => {
  const allowedOrigin = "http://localhost:5173";
  const deniedOrigin = "https://untrusted.example";

  it("should allow requests from configured origins", async () => {
    const response = await fetch(`${baseUrl}/health`, {
      headers: {
        Origin: allowedOrigin,
      },
    });

    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get("access-control-allow-origin"),
      allowedOrigin,
    );
  });

  it("should reject requests from unconfigured origins", async () => {
    const response = await fetch(`${baseUrl}/health`, {
      headers: {
        Origin: deniedOrigin,
      },
    });

    const result = await response.json();

    assert.equal(response.status, 403);
    assert.equal(result.success, false);
    assert.equal(result.error.code, "CORS_ORIGIN_DENIED");
  });

  it("should handle OPTIONS preflight requests", async () => {
    const response = await fetch(`${baseUrl}/api/demo-requests`, {
      method: "OPTIONS",
      headers: {
        Origin: allowedOrigin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });

    assert.equal(response.status, 204);
    assert.equal(
      response.headers.get("access-control-allow-origin"),
      allowedOrigin,
    );
    assert.ok(
      response.headers
        .get("access-control-allow-methods")
        ?.includes("POST"),
    );
  });

  it("should rate limit POST /api/demo-requests", async () => {
    let rateLimited = false;

    for (let index = 0; index < 110; index += 1) {
      const response = await postDemoRequest({});

      if (response.status === 429) {
        rateLimited = true;
        break;
      }
    }

    assert.equal(
      rateLimited,
      true,
      "request yang melewati batas harus mendapat HTTP 429",
    );
  });

  it("should rate limit GET /api/whatsapp-link", async () => {
    let rateLimited = false;

    for (let index = 0; index < 110; index += 1) {
      const response = await fetch(`${baseUrl}/api/whatsapp-link`);

      if (response.status === 429) {
        rateLimited = true;
        break;
      }
    }

    assert.equal(
      rateLimited,
      true,
      "request yang melewati batas harus mendapat HTTP 429",
    );
  });
});


describe("buildWhatsappUrl", () => {
  it("encodes the message text", () => {
    const url = buildWhatsappUrl("6281234567890", "Halo & selamat pagi?");

    assert.equal(
      url,
      "https://wa.me/6281234567890?text=Halo%20%26%20selamat%20pagi%3F",
    );
  });

  it("returns null when the number is not configured", () => {
    assert.equal(buildWhatsappUrl(undefined, "Halo"), null);
  });
});

describe("assertProductionSettings", () => {
  it("throws in production when WHATSAPP_NUMBER or CORS_ORIGINS is empty", () => {
    assert.throws(
      () => assertProductionSettings({ nodeEnv: "production", whatsappNumber: undefined, corsOrigins: ["https://a.com"] }),
      /WHATSAPP_NUMBER/,
    );
    assert.throws(
      () => assertProductionSettings({ nodeEnv: "production", whatsappNumber: "6281234567890", corsOrigins: [] }),
      /CORS_ORIGINS/,
    );
  });

  it("does not throw in development or when production is configured", () => {
    assert.doesNotThrow(() =>
      assertProductionSettings({ nodeEnv: "development", whatsappNumber: undefined, corsOrigins: [] }),
    );
    assert.doesNotThrow(() =>
      assertProductionSettings({ nodeEnv: "production", whatsappNumber: "6281234567890", corsOrigins: ["https://a.com"] }),
    );
  });
});