
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// =========================================
// ROOT ENVIRONMENT
// =========================================

const rootEnvPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../.env',
)

dotenv.config({ path: rootEnvPath })

const isVercel = process.env.VERCEL === '1'

// =========================================
// ENVIRONMENT HELPERS
// =========================================

function requiredSetting(name) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`${name} must be set`)
  }

  return value
}

function integerSetting(name, minimum = 1, maximum = Infinity) {
  const rawValue = process.env[name]

  if (rawValue === undefined || rawValue.trim() === '') {
    throw new Error(`${name} must be set`)
  }

  const value = Number(rawValue)

  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(
      `${name} must be an integer between ${minimum} and ${maximum}`,
    )
  }

  return value
}

function platformIntegerSetting(name, fallback, minimum = 1) {
  const rawValue = process.env[name]

  if (rawValue === undefined || rawValue.trim() === '') {
    if (isVercel) return fallback
    return integerSetting(name, minimum)
  }

  return integerSetting(name, minimum)
}

// =========================================
// NODE ENVIRONMENT
// =========================================

const nodeEnv = requiredSetting('NODE_ENV')

if (!['development', 'test', 'production'].includes(nodeEnv)) {
  throw new Error('NODE_ENV must be development, test, or production')
}

// =========================================
// GOOGLE SHEETS CONFIGURATION
// =========================================

const spreadsheetId = requiredSetting('GOOGLE_SHEETS_SPREADSHEET_ID')
const sheetName = requiredSetting('GOOGLE_SHEETS_SHEET_NAME')

const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim()
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim()

if (!keyFile && (!serviceAccountEmail || !privateKey)) {
  throw new Error(
    'Set GOOGLE_SERVICE_ACCOUNT_KEY_FILE or GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY',
  )
}

// =========================================
// WHATSAPP CONFIGURATION
// =========================================

const rawWhatsappNumber = process.env.WHATSAPP_NUMBER?.trim()

const whatsappNumber = rawWhatsappNumber
  ? rawWhatsappNumber.replace(/^\+/, '')
  : undefined

if (whatsappNumber !== undefined && !/^[1-9]\d{7,14}$/.test(whatsappNumber)) {
  throw new Error(
    'WHATSAPP_NUMBER must contain digits only with country code, e.g. 6281234567890',
  )
}

// =========================================
// CORS CONFIGURATION
// =========================================

function getVercelOrigin() {
  const hostname = process.env.VERCEL_URL?.trim()

  if (!hostname) return undefined

  const normalizedHostname = hostname
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '')

  if (/[/?#]/.test(normalizedHostname)) {
    throw new Error('VERCEL_URL must contain a hostname only')
  }

  return `https://${normalizedHostname}`
}

const vercelOrigin = getVercelOrigin()
const rawCorsOrigins = process.env.CORS_ORIGINS

if (rawCorsOrigins === undefined && !vercelOrigin) {
  throw new Error('CORS_ORIGINS must be set')
}

const corsOrigins = [
  ...(rawCorsOrigins ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean),
  ...(vercelOrigin ? [vercelOrigin] : []),
]

const uniqueCorsOrigins = [...new Set(corsOrigins)]

// =========================================
// PRODUCTION VALIDATION
// =========================================

export function assertProductionSettings({
  nodeEnv,
  whatsappNumber,
  corsOrigins,
}) {
  if (nodeEnv !== 'production') return

  if (!whatsappNumber) {
    throw new Error('WHATSAPP_NUMBER must be set when NODE_ENV=production')
  }

  if (corsOrigins.length === 0) {
    throw new Error('CORS_ORIGINS or VERCEL_URL must be set when NODE_ENV=production')
  }
}

assertProductionSettings({
  nodeEnv,
  whatsappNumber,
  corsOrigins: uniqueCorsOrigins,
})

// =========================================
// CENTRALIZED APPLICATION CONFIGURATION
// =========================================

export const config = Object.freeze({
  nodeEnv,

  port: platformIntegerSetting('PORT', 3000, 1),

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

  trustProxy: platformIntegerSetting('TRUST_PROXY', 1, 0),

  whatsapp: {
    number: whatsappNumber,
  },

  corsOrigins: uniqueCorsOrigins,

  rateLimit: {
    windowMs: integerSetting('RATE_LIMIT_WINDOW_MS'),
    publicMax: integerSetting('PUBLIC_RATE_LIMIT_MAX'),
    linkMax: integerSetting('LINK_RATE_LIMIT_MAX'),
  },
})
