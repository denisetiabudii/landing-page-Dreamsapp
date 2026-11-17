// =========================================
// KONTEN HALAMAN DETAIL FITUR (/fitur/:slug)
// Teks diambil dari deskripsi yang sudah ada di landing page.
// Perlu ditinjau/diperkaya oleh tim produk sebelum dianggap final,
// karena isi halaman inilah yang dibaca mesin pencari.
// =========================================

import {
  donorProfileDetail,
  featureDistribusi,
  rfmHeatmapMatrix,
  rfmHealthComparison,
  rfmSegmentComparison,
} from '../assets/assets'

export const featurePages = {
  'manajemen-donatur': {
    title: 'Manajemen Donatur',
    heading: 'Manajemen Donatur untuk Lembaga Sosial',
    lead: 'Kelola informasi donatur dan pantau aktivitas donasi dalam satu sistem.',
    points: [
      {
        title: 'Data donatur terpusat',
        text: 'Simpan dan kelola data donatur beserta referensi pendukung seperti program, channel donasi, segmen, dan metode pembayaran.',
      },
      {
        title: 'Pantau aktivitas donasi',
        text: 'Lihat aktivitas donasi setiap donatur dari profil donatur, sehingga riwayat tidak tersebar di banyak berkas.',
      },
      {
        title: 'Terhubung dengan fitur lain',
        text: 'Data donatur menjadi dasar untuk pencatatan transaksi, manajemen prospek, dan analitik RFM.',
      },
    ],
    images: [
      {
        src: donorProfileDetail,
        alt: 'Tampilan detail profil donatur di DREAMS',
      },
    ],
    related: ['analitik-rfm', 'distribusi-bantuan'],
  },

  'analitik-rfm': {
    title: 'Analitik RFM',
    heading: 'Analitik RFM untuk Segmentasi Donatur',
    lead: 'Kenali karakteristik donatur berdasarkan recency, frequency, dan monetary.',
    points: [
      {
        title: 'Recency',
        text: 'Seberapa baru donatur terakhir kali berdonasi.',
      },
      {
        title: 'Frequency',
        text: 'Seberapa sering donatur berdonasi dalam periode tertentu.',
      },
      {
        title: 'Monetary',
        text: 'Seberapa besar total nilai donasi yang diberikan donatur.',
      },
      {
        title: 'Dari angka ke tindakan',
        text: 'Gunakan dashboard dan analitik RFM untuk melihat aktivitas transaksi, pencapaian target, serta karakteristik donatur.',
      },
    ],
    images: [
      {
        src: rfmSegmentComparison,
        alt: 'Perbandingan segmen donatur pada analitik RFM DREAMS',
      },
      {
        src: rfmHealthComparison,
        alt: 'Perbandingan indeks kesehatan donatur pada analitik RFM DREAMS',
      },
      { src: rfmHeatmapMatrix, alt: 'Matriks heatmap RFM donatur di DREAMS' },
    ],
    related: ['manajemen-donatur', 'distribusi-bantuan'],
  },

  'distribusi-bantuan': {
    title: 'Distribusi Bantuan',
    heading: 'Pengelolaan Distribusi dan Penyaluran Bantuan',
    lead: 'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga.',
    points: [
      {
        title: 'Pencatatan penyaluran',
        text: 'Catat penyaluran bantuan dalam sistem yang sama dengan data donatur dan transaksi donasi.',
      },
      {
        title: 'Mendukung transparansi',
        text: 'Pencatatan yang terstruktur membantu lembaga mengelola kegiatan secara lebih transparan dan akuntabel.',
      },
    ],
    images: [
      {
        src: featureDistribusi,
        alt: 'Ilustrasi pengelolaan distribusi bantuan di DREAMS',
      },
    ],
    related: ['manajemen-donatur', 'analitik-rfm'],
  },
}
