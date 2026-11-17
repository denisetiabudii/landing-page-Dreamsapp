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
// =========================================

export const routes = [
  {
    path: '/',
    page: 'LandingPage',
    title: 'DREAMS – Sistem Pengelolaan Donasi untuk Lembaga Sosial',
    description:
      'Kelola donatur, transaksi, prospek, analitik RFM, dan distribusi dalam satu sistem. Ajukan demo DREAMS untuk lembaga Anda.',
  },
  {
    path: '/tentang',
    page: 'TentangPage',
    title: 'Tentang DREAMS – Sistem Donasi untuk Lembaga Sosial',
    description:
      'Kenali DREAMS, sistem pengelolaan donasi dan operasional lembaga sosial: donatur, transaksi, prospek, analitik, hingga penyaluran bantuan.',
  },
  {
    path: '/fitur',
    page: 'FiturPage',
    title: 'Fitur DREAMS – Manajemen Donatur, Transaksi, RFM',
    description:
      'Lihat fitur DREAMS: manajemen donatur, transaksi, prospek, analitik RFM, distribusi bantuan, dan komunikasi WhatsApp dalam satu sistem.',
  },
  {
    path: '/fitur/manajemen-donatur',
    page: 'FeatureDetailPage',
    props: { slug: 'manajemen-donatur' },
    title: 'Software Manajemen Donatur untuk Yayasan | DREAMS',
    description:
      'Kelola data donatur dan pantau aktivitas donasi dalam satu sistem. Lihat fitur manajemen donatur DREAMS dan ajukan demo.',
  },
  {
    path: '/fitur/analitik-rfm',
    page: 'FeatureDetailPage',
    props: { slug: 'analitik-rfm' },
    title: 'Analitik RFM Donatur – Segmentasi Otomatis | DREAMS',
    description:
      'Kenali karakteristik donatur berdasarkan recency, frequency, dan monetary dengan analitik RFM DREAMS. Ajukan demo.',
  },
  {
    path: '/fitur/distribusi-bantuan',
    page: 'FeatureDetailPage',
    props: { slug: 'distribusi-bantuan' },
    title: 'Aplikasi Distribusi & Penyaluran Bantuan | DREAMS',
    description:
      'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga dengan DREAMS. Ajukan demo.',
  },
  {
    path: '/demo',
    page: 'DemoPage',
    title: 'Ajukan Demo Gratis DREAMS – Aplikasi Pengelolaan Donasi',
    description:
      'Isi formulir untuk menjadwalkan demo DREAMS, sistem pengelolaan donatur, transaksi, dan analitik RFM untuk lembaga sosial.',
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
