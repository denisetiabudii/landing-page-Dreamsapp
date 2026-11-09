
import { google } from 'googleapis'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { config } from '../config/env.mjs'
import { fileURLToPath } from 'node:url'

const backendDir = fileURLToPath(new URL('../../', import.meta.url))
    const keyFilePath = resolve(backendDir, config.googleSheets.keyFile)
// =========================================
// GOOGLE SHEETS CONFIGURATION
// =========================================

const spreadsheetId = config.googleSheets.spreadsheetId
const sheetName = config.googleSheets.sheetName

const escapedSheetName = sheetName.replace(/'/g, "''")

const dataRange = `'${escapedSheetName}'!A:H`
const headerRange = `'${escapedSheetName}'!A1:H1`
const idRange = `'${escapedSheetName}'!A2:A`

const headers = [
  'ID',
  'Timestamp',
  'Nama',
  'Organisasi',
  'Email',
  'WhatsApp',
  'Waktu Demo',
  'Status',
]

// =========================================
// GOOGLE SHEETS CLIENT
// =========================================

async function createGoogleSheetsClient() {
  let credentials = config.googleSheets.credentials

  if (!credentials && config.googleSheets.keyFile) {
    const keyFilePath = resolve(
      process.cwd(),
      config.googleSheets.keyFile,
    )

    const keyFileContent = await readFile(keyFilePath, 'utf8')

    credentials = JSON.parse(keyFileContent)
  }

  if (!credentials?.client_email || !credentials?.private_key) {
    throw new Error('Google Service Account credentials are invalid')
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })

  return google.sheets({
    version: 'v4',
    auth,
  })
}

// =========================================
// DEMO REQUEST MODEL
// =========================================

export function createDemoRequestModel(sheetsClient) {
  const sheetsPromise = sheetsClient
    ? Promise.resolve(sheetsClient)
    : createGoogleSheetsClient()

  // =========================================
  // ENSURE HEADERS
  // =========================================

  async function ensureHeaders(sheets) {
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    })

    const currentHeaders = data.values?.[0] ?? []

    const headersMatch =
      currentHeaders.length === headers.length &&
      headers.every(
        (header, index) => currentHeaders[index] === header,
      )

    if (headersMatch) {
      return
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    })
  }

  // =========================================
  // GENERATE AUTO INCREMENT ID
  // =========================================

  async function generateNextId(sheets) {
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: idRange,
    })

    const ids = (data.values ?? [])
      .map((row) => Number(row[0]))
      .filter((id) => Number.isInteger(id) && id > 0)

    const lastId = ids.length > 0 ? Math.max(...ids) : 0

    return lastId + 1
  }

  // =========================================
  // GENERATE GMT+7 TIMESTAMP
  // =========================================

  function generateTimestamp() {
    const parts = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date())

    const values = Object.fromEntries(
      parts.map((part) => [part.type, part.value]),
    )

    return `${values.day} ${values.month} ${values.year} ( ${values.hour}:${values.minute}:${values.second} WIB )`
  }

  // =========================================
  // CREATE DEMO REQUEST
  // =========================================
  // Cek header cukup sekali per proses
  let headersReady
  function ensureHeadersOnce(sheets) {
    headersReady ??= ensureHeaders(sheets).catch((error) => {
      headersReady = undefined
      throw error
    })
    return headersReady
  }

  // Antrean tulis: mencegah ID kembar dari permintaan bersamaan (satu proses)
  let queue = Promise.resolve()
  function enqueue(task) {
    const run = queue.then(task)
    queue = run.catch(() => {})
    return run
  }

  return {
        async create(input) {
      const sheets = await sheetsPromise

      await ensureHeadersOnce(sheets)

      return enqueue(async () => {
        const id = await generateNextId(sheets)
        const createdAt = generateTimestamp()

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: dataRange,
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: [
              [
                id,
                createdAt,
                input.name,
                input.organization,
                input.email,
                input.whatsapp,
                input.preferred_time,
                'new',
              ],
            ],
          },
        })

        return {
          id,
          ...input,
          status: 'new',
          created_at: createdAt,
        }
      })
    },
  }
}
