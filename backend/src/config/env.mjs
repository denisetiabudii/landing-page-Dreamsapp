import "dotenv/config";

function integerSetting(name, fallback, minimum = 1) {
  const value = Number.parseInt(process.env[name] ?? String(fallback), 10);

  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(
      `${name} must be an integer greater than or equal to ${minimum}`,
    );
  }

  return value;
}

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

if (!spreadsheetId) {
  throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID must be set");
}

const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim();
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!keyFile && (!serviceAccountEmail || !privateKey)) {
  throw new Error(
    "Set GOOGLE_SERVICE_ACCOUNT_KEY_FILE or GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY",
  );
}

const whatsappNumber = process.env.WHATSAPP_NUMBER?.trim().replace(/^\+/, "");

if (whatsappNumber && !/^[1-9]\d{7,14}$/.test(whatsappNumber)) {
  throw new Error(
    "WHATSAPP_NUMBER must contain digits only with country code, e.g. 6281234567890",
  );
}

export function assertProductionSettings({ nodeEnv, whatsappNumber, corsOrigins }) {
  if (nodeEnv !== "production") return;

  if (!whatsappNumber) {
    throw new Error("WHATSAPP_NUMBER must be set when NODE_ENV=production");
  }

  if (corsOrigins.length === 0) {
    throw new Error("CORS_ORIGINS must be set when NODE_ENV=production");
  }
}

const corsOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

assertProductionSettings({
  nodeEnv: process.env.NODE_ENV ?? "development",
  whatsappNumber,
  corsOrigins,
});

export const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: integerSetting("PORT", 3000),

  googleSheets: {
    spreadsheetId,
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Demo Requests",
    keyFile: keyFile || undefined,
    credentials:
      !keyFile && serviceAccountEmail && privateKey
        ? {
            client_email: serviceAccountEmail,
            private_key: privateKey,
          }
        : undefined,
  },
  trustProxy: integerSetting("TRUST_PROXY", 0, 0),

  whatsapp: {
    number: whatsappNumber || undefined,
  },

  corsOrigins: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  rateLimit: {
    windowMs: integerSetting("RATE_LIMIT_WINDOW_MS", 900000),
    publicMax: integerSetting("PUBLIC_RATE_LIMIT_MAX", 10),
    linkMax: integerSetting("LINK_RATE_LIMIT_MAX", 60),
  },
});
