import "dotenv/config";

// =========================================
// ENVIRONMENT HELPERS
// =========================================

function requiredSetting(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be set`);
  }

  return value;
}

function integerSetting(name, minimum = 1, maximum = Infinity) {
  const rawValue = process.env[name];

  if (rawValue === undefined || rawValue.trim() === "") {
    throw new Error(`${name} must be set`);
  }

  const value = Number(rawValue);

  if (
    !Number.isInteger(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new Error(
      `${name} must be an integer between ${minimum} and ${maximum}`,
    );
  }

  return value;
}

// =========================================
// NODE ENVIRONMENT
// =========================================

const nodeEnv = requiredSetting("NODE_ENV");

if (!["development", "test", "production"].includes(nodeEnv)) {
  throw new Error(
    "NODE_ENV must be development, test, or production",
  );
}

// =========================================
// GOOGLE SHEETS CONFIGURATION
// =========================================

const spreadsheetId = requiredSetting(
  "GOOGLE_SHEETS_SPREADSHEET_ID",
);

const sheetName = requiredSetting(
  "GOOGLE_SHEETS_SHEET_NAME",
);

const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim();

const serviceAccountEmail =
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();

const privateKey = process.env.GOOGLE_PRIVATE_KEY
  ?.replace(/\\n/g, "\n")
  .trim();

if (!keyFile && (!serviceAccountEmail || !privateKey)) {
  throw new Error(
    "Set GOOGLE_SERVICE_ACCOUNT_KEY_FILE or GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY",
  );
}

// =========================================
// WHATSAPP CONFIGURATION
// =========================================

const rawWhatsappNumber = process.env.WHATSAPP_NUMBER?.trim();

const whatsappNumber = rawWhatsappNumber
  ? rawWhatsappNumber.replace(/^\+/, "")
  : undefined;

if (
  whatsappNumber !== undefined &&
  !/^[1-9]\d{7,14}$/.test(whatsappNumber)
) {
  throw new Error(
    "WHATSAPP_NUMBER must contain digits only with country code, e.g. 6281234567890",
  );
}

// =========================================
// CORS CONFIGURATION
// =========================================

if (process.env.CORS_ORIGINS === undefined) {
  throw new Error("CORS_ORIGINS must be set");
}

const corsOrigins = process.env.CORS_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// =========================================
// PRODUCTION VALIDATION
// =========================================

export function assertProductionSettings({
  nodeEnv,
  whatsappNumber,
  corsOrigins,
}) {
  if (nodeEnv !== "production") return;

  if (!whatsappNumber) {
    throw new Error(
      "WHATSAPP_NUMBER must be set when NODE_ENV=production",
    );
  }

  if (corsOrigins.length === 0) {
    throw new Error(
      "CORS_ORIGINS must be set when NODE_ENV=production",
    );
  }
}

assertProductionSettings({
  nodeEnv,
  whatsappNumber,
  corsOrigins,
});

// =========================================
// CENTRALIZED APPLICATION CONFIGURATION
// =========================================

export const config = Object.freeze({
  nodeEnv,

  port: integerSetting("PORT", 1, 65535),

  googleSheets: {
    spreadsheetId,
    sheetName,
    keyFile: keyFile || undefined,

    credentials:
      !keyFile && serviceAccountEmail && privateKey
        ? {
            client_email: serviceAccountEmail,
            private_key: privateKey,
          }
        : undefined,
  },

  trustProxy: integerSetting("TRUST_PROXY", 0),

  whatsapp: {
    number: whatsappNumber,
  },

  corsOrigins,

  rateLimit: {
    windowMs: integerSetting("RATE_LIMIT_WINDOW_MS"),
    publicMax: integerSetting("PUBLIC_RATE_LIMIT_MAX"),
    linkMax: integerSetting("LINK_RATE_LIMIT_MAX"),
  },
});