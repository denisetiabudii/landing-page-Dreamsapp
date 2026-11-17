// =========================================
// DAFTAR HALAMAN — SATU-SATUNYA TEMPAT MENDAFTAR HALAMAN BARU
//
// Menambah halaman:
//   1. Buat komponen di src/components/pages/NamaHalaman.jsx
//      (export default). Halaman yang mirip bisa memakai komponen yang
//      sama dengan `props` berbeda (lihat halaman fitur).
//   2. Tambahkan satu entri di bawah.
//
// Daftar ini dipakai oleh: browser (hydrate), prerender saat build,
// sitemap.xml, dan server Express. File ini harus tetap berisi data murni
// (tanpa import komponen) karena juga dibaca oleh Node.
//
// Field: path, page, props (opsional), title, description,
// ogDescription (teks untuk Facebook/WhatsApp/LinkedIn; opsional).
// =========================================

export const routes = [
  {
    path: '/',
    page: 'LandingPage',
    title: 'DREAMS – Sistem Pengelolaan Donasi untuk Lembaga Sosial',
    description:
      'Kelola donatur, transaksi, prospek, analitik RFM, dan distribusi dalam satu sistem. Ajukan demo DREAMS untuk lembaga Anda.',
    ogDescription:
      'Rapikan data donatur, transaksi, dan penyaluran bantuan lembaga Anda dalam satu sistem. Jadwalkan demo DREAMS sekarang.',
  },
  {
    path: '/tentang',
    page: 'TentangPage',
    title: 'Tentang DREAMS – Sistem Donasi untuk Lembaga Sosial',
    description:
      'Kenali DREAMS, sistem pengelolaan donasi dan operasional lembaga sosial: donatur, transaksi, prospek, analitik, hingga penyaluran bantuan.',
    ogDescription:
      'Kenali DREAMS: sistem yang membantu lembaga sosial mengelola donatur, transaksi, prospek, hingga penyaluran bantuan secara lebih terstruktur.',
  },
  {
    path: '/fitur',
    page: 'FiturPage',
    title: 'Fitur DREAMS – Manajemen Donatur, Transaksi, RFM',
    description:
      'Lihat fitur DREAMS: manajemen donatur, transaksi, prospek, analitik RFM, distribusi bantuan, dan komunikasi WhatsApp dalam satu sistem.',
    ogDescription:
      'Dari data donatur sampai analitik RFM dan distribusi bantuan, lihat semua fitur DREAMS untuk lembaga sosial.',
  },
  {
    path: '/fitur/manajemen-donatur',
    page: 'FeatureDetailPage',
    props: { slug: 'manajemen-donatur' },
    title: 'Software Manajemen Donatur untuk Yayasan | DREAMS',
    description:
      'Kelola data donatur dan pantau aktivitas donasi dalam satu sistem. Lihat fitur manajemen donatur DREAMS dan ajukan demo.',
    ogDescription:
      'Semua data donatur dan riwayat donasinya di satu tempat. Lihat cara DREAMS membantu lembaga mengelola donatur.',
  },
  {
    path: '/fitur/analitik-rfm',
    page: 'FeatureDetailPage',
    props: { slug: 'analitik-rfm' },
    title: 'Analitik RFM Donatur – Segmentasi Otomatis | DREAMS',
    description:
      'Kenali karakteristik donatur berdasarkan recency, frequency, dan monetary dengan analitik RFM DREAMS. Ajukan demo.',
    ogDescription:
      'Kenali donatur lewat recency, frequency, dan monetary agar pendekatan ke donatur lebih tepat. Lihat analitik RFM DREAMS.',
  },
  {
    path: '/fitur/distribusi-bantuan',
    page: 'FeatureDetailPage',
    props: { slug: 'distribusi-bantuan' },
    title: 'Aplikasi Distribusi & Penyaluran Bantuan | DREAMS',
    description:
      'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga dengan DREAMS. Ajukan demo.',
    ogDescription:
      'Catat penyaluran bantuan secara rapi, satu sistem dengan data donasi. Lihat fitur distribusi bantuan DREAMS.',
  },
  {
    path: '/fitur/pengelolaan-transaksi',
    page: 'FeatureDetailPage',
    props: { slug: 'pengelolaan-transaksi' },
    title: 'Software Pengelolaan Transaksi Donasi | DREAMS',
    description:
      'Catat dan pantau transaksi donasi berdasarkan program dan metode pembayaran. Bukti donasi PDF dibuat otomatis. Ajukan demo DREAMS.',
    ogDescription:
      'Catat transaksi donasi per program dan metode pembayaran, lengkap dengan bukti donasi PDF otomatis. Lihat fitur transaksi DREAMS.',
  },
  {
    path: '/fitur/manajemen-prospek',
    page: 'FeatureDetailPage',
    props: { slug: 'manajemen-prospek' },
    title: 'Manajemen Prospek Donatur untuk Fundraising | DREAMS',
    description:
      'Kelola calon donatur, aktivitas tindak lanjut, dan respons prospek dalam satu sistem. Ajukan demo DREAMS.',
    ogDescription:
      'Pantau calon donatur dan tindak lanjutnya dalam satu sistem. Lihat fitur manajemen prospek DREAMS.',
  },
  {
    path: '/fitur/komunikasi-whatsapp',
    page: 'FeatureDetailPage',
    props: { slug: 'komunikasi-whatsapp' },
    title: 'Komunikasi WhatsApp untuk Donatur | DREAMS',
    description:
      'Kelola template pesan dan aktivitas WhatsApp Blast melalui modul DREAMS. Ajukan demo DREAMS.',
    ogDescription:
      'Kelola template pesan dan WhatsApp Blast untuk donatur lewat modul DREAMS.',
  },
  {
    path: '/demo',
    page: 'DemoPage',
    title: 'Ajukan Demo Gratis DREAMS – Aplikasi Pengelolaan Donasi',
    description:
      'Isi formulir untuk menjadwalkan demo DREAMS, sistem pengelolaan donatur, transaksi, dan analitik RFM untuk lembaga sosial.',
    ogDescription:
      'Ingin melihat DREAMS langsung? Isi formulir singkat untuk menjadwalkan demo bersama tim kami.',
  },
]

export function normalizePath(pathname = '/') {
  return pathname.replace(/\/+$/, '') || '/'
}

// Halaman tidak dikenal memakai halaman beranda (server memberi status 404).
export function findRoute(pathname) {
  const path = normalizePath(pathname)
  return routes.find((route) => route.path === path) ?? routes[0]
}