import { parsePhoneNumberFromString } from 'libphonenumber-js/max'

import { AppError } from './errors.mjs'

// =========================================
// DEMO REQUEST VALIDATION
// =========================================

const allowedFields = [
  'name',
  'organization',
  'email',
  'whatsapp',
  'preferred_time',
]
const preferredTimeOptions = ['Fleksibel', 'Pagi', 'Siang', 'Sore']

const rules = {
  name: { label: 'Nama', max: 150 },
  organization: { label: 'Organisasi', max: 200 },
  email: { label: 'Email', max: 254 },
  whatsapp: { label: 'Nomor WhatsApp', max: 30 },
  preferred_time: { label: 'Waktu demo', max: 30 },
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// eslint-disable-next-line no-control-regex -- Sengaja mendeteksi karakter kontrol pada input.
const controlChars = /[\u0000-\u001F\u007F]/

const phoneChars = /^[+\d\s().-]+$/

function fail(field, message) {
  return new AppError(400, 'VALIDATION_ERROR', message, { field })
}

export function validateDemoInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Data permintaan tidak valid.')
  }

  const unknownFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  )

  if (unknownFields.length > 0) {
    throw new AppError(
      400,
      'VALIDATION_ERROR',
      'Terdapat field yang tidak diizinkan.',
    )
  }

  const fields = {
    name: normalizeString(body.name),
    organization: normalizeString(body.organization),
    email: normalizeString(body.email).toLowerCase(),
    whatsapp: normalizeString(body.whatsapp),
    preferred_time: normalizeString(body.preferred_time),
  }

  for (const [field, value] of Object.entries(fields)) {
    if (!value) {
      throw fail(field, 'Semua field wajib diisi.')
    }

    if (value.length > rules[field].max) {
      throw fail(
        field,
        `${rules[field].label} maksimal ${rules[field].max} karakter.`,
      )
    }
  }

  for (const field of ['name', 'organization', 'email']) {
    if (controlChars.test(fields[field])) {
      throw fail(
        field,
        `${rules[field].label} mengandung karakter yang tidak diizinkan.`,
      )
    }
  }

  if (!emailRegex.test(fields.email)) {
    throw fail('email', 'Format email tidak valid.')
  }

  if (!phoneChars.test(fields.whatsapp)) {
    throw fail(
      'whatsapp',
      'Nomor WhatsApp hanya boleh berisi angka, spasi, +, -, titik, dan kurung.',
    )
  }

  // Nomor tanpa kode negara dianggap nomor Indonesia (0812... -> +62812...)
  const phone = parsePhoneNumberFromString(fields.whatsapp, 'ID')

  if (
    !phone?.isValid() ||
    !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(phone.getType())
  ) {
    throw fail('whatsapp', 'Nomor WhatsApp tidak valid.')
  }

  if (!preferredTimeOptions.includes(fields.preferred_time)) {
    throw fail('preferred_time', 'Pilihan waktu demo tidak valid.')
  }

  return {
    ...fields,
    whatsapp: phone.number, // format E.164, contoh: +6281234567890
  }
}

// =========================================
// HELPERS
// =========================================

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : ''
}
