import { parsePhoneNumberFromString } from 'libphonenumber-js/max'

// =========================================
// CONSTANTS
// =========================================

export const MAX_TEXT_LENGTH = 100
export const MAX_PHONE_LENGTH = 15

// Karakter yang TIDAK diizinkan per field.
// Satu sumber untuk sanitasi (saat mengetik) dan validasi (saat submit).
const DISALLOWED_CHARACTERS = {
  fullName: /[^a-zA-Z\s]/g,
  organization: /[^a-zA-Z0-9\s&()\-',.]/g,
  email: /[^a-zA-Z0-9@._+-]/g,
}

// Bagian lokal: huruf/angka, pemisah (. _ + -) hanya satu dan tidak di tepi
// Domain: label huruf/angka/tanda hubung (tidak di tepi), TLD minimal 2 huruf
const EMAIL_FORMAT =
  /^[a-zA-Z0-9]+(?:[._+-][a-zA-Z0-9]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,24}$/

const MAX_EMAIL_LOCAL_LENGTH = 64

// Pemeriksaan dasar nomor internasional (E.164 tanpa "+"): kode negara
// tidak diawali 0, total 8-15 digit. Aturan per negara (awalan, panjang,
// jenis nomor) diperiksa oleh libphonenumber-js lewat isValidMobileNumber(),
// dan di server dengan library yang sama.
const PHONE_FORMAT = /^[1-9]\d{7,14}$/

// Jenis nomor yang diterima (WhatsApp = nomor seluler).
// FIXED_LINE_OR_MOBILE dibutuhkan untuk negara yang tidak membedakan
// keduanya, mis. Amerika Serikat dan Kanada.
const ALLOWED_PHONE_TYPES = ['MOBILE', 'FIXED_LINE_OR_MOBILE']

// =========================================
// HELPERS
// =========================================

// Validasi ketat per negara (awalan, panjang, jenis nomor) dengan
// libphonenumber. Server sebaiknya memakai library dan aturan yang sama.
function isValidMobileNumber(digits) {
  const parsed = parsePhoneNumberFromString(`+${digits}`)

  if (!parsed || !parsed.isValid()) return false

  const type = parsed.getType()

  return !type || ALLOWED_PHONE_TYPES.includes(type)
}

function removeDisallowed(value, field) {
  return String(value).replace(DISALLOWED_CHARACTERS[field], '')
}

function hasDisallowed(value, field) {
  return removeDisallowed(value, field) !== value
}

function collapseSpaces(value) {
  return value.replace(/\s+/g, ' ')
}

export function keepDigits(value) {
  return String(value).replace(/\D/g, '')
}

// =========================================
// SANITIZATION (dipakai saat mengetik)
// =========================================

export function sanitizeFullName(value) {
  return collapseSpaces(removeDisallowed(value, 'fullName')).slice(
    0,
    MAX_TEXT_LENGTH,
  )
}

export function sanitizeOrganization(value) {
  return collapseSpaces(removeDisallowed(value, 'organization')).slice(
    0,
    MAX_TEXT_LENGTH,
  )
}

export function sanitizeEmail(value) {
  const cleaned = removeDisallowed(value, 'email')
  const atIndex = cleaned.indexOf('@')

  // Hanya izinkan satu tanda "@"
  const singleAt =
    atIndex === -1
      ? cleaned
      : cleaned.slice(0, atIndex + 1) +
        cleaned.slice(atIndex + 1).replace(/@/g, '')

  return singleAt.slice(0, MAX_TEXT_LENGTH)
}

export function sanitizePhone(value) {
  return keepDigits(value).slice(0, MAX_PHONE_LENGTH)
}

// =========================================
// VALIDATE FULL NAME
// =========================================

export function validateFullName(value) {
  const fullName = value.trim()

  if (!fullName) {
    return 'Nama lengkap wajib diisi.'
  }

  if (fullName.length < 2) {
    return 'Nama lengkap minimal 2 karakter.'
  }

  if (hasDisallowed(fullName, 'fullName')) {
    return 'Nama lengkap hanya boleh berisi huruf Latin dan spasi.'
  }

  return ''
}

// =========================================
// VALIDATE ORGANIZATION
// =========================================

export function validateOrganization(value) {
  const organization = value.trim()

  if (!organization) {
    return 'Nama lembaga atau organisasi wajib diisi.'
  }

  if (organization.length < 2) {
    return 'Nama organisasi minimal 2 karakter.'
  }

  if (hasDisallowed(organization, 'organization')) {
    return 'Nama organisasi mengandung karakter yang tidak diperbolehkan.'
  }

  return ''
}

// =========================================
// VALIDATE EMAIL
// =========================================

export function validateEmail(value) {
  const email = value.trim()

  if (!email) {
    return 'Email wajib diisi.'
  }

  if (email.length > MAX_TEXT_LENGTH) {
    return 'Email maksimal 100 karakter.'
  }

  if (hasDisallowed(email, 'email')) {
    return 'Email mengandung karakter yang tidak diperbolehkan.'
  }

  if (
    !EMAIL_FORMAT.test(email) ||
    email.split('@')[0].length > MAX_EMAIL_LOCAL_LENGTH
  ) {
    return 'Format email tidak valid.'
  }

  return ''
}

// =========================================
// VALIDATE PHONE
// =========================================

export function validatePhone(value) {
  const phone = value.trim()

  if (!phone) {
    return 'Nomor WhatsApp wajib diisi.'
  }

  if (!/^\d+$/.test(phone)) {
    return 'Nomor WhatsApp hanya boleh berisi angka.'
  }

  if (phone.length > MAX_PHONE_LENGTH) {
    return `Nomor WhatsApp maksimal ${MAX_PHONE_LENGTH} digit.`
  }

  if (!PHONE_FORMAT.test(phone) || !isValidMobileNumber(phone)) {
    return 'Nomor WhatsApp tidak valid untuk negara yang dipilih.'
  }

  return ''
}

// =========================================
// VALIDATE PREFERRED TIME
// =========================================

const PREFERRED_TIMES = ['Fleksibel', 'Pagi', 'Siang', 'Sore']

export function validatePreferredTime(value) {
  if (!value) {
    return 'Pilih waktu demo yang diinginkan.'
  }

  if (!PREFERRED_TIMES.includes(value)) {
    return 'Pilihan waktu demo tidak valid.'
  }

  return ''
}
