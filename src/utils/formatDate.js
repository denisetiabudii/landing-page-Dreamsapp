const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

// '2026-11-18' → '18 November 2026'. Tidak memakai Intl agar hasil di server
// dan di browser selalu sama (menghindari hydration mismatch).
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return `${day} ${months[month - 1]} ${year}`
}
