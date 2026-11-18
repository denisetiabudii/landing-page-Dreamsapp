// =========================================
// KONTEN HALAMAN DETAIL FITUR (/fitur/:slug)
// Teks diambil dari deskripsi yang sudah ada di landing page.
// Gambar sementara memakai ilustrasi yang sama dengan kartu bertumpuk di /fitur;
// ganti dengan tangkapan layar aplikasi bila sudah tersedia.
// Perlu ditinjau/diperkaya oleh tim produk sebelum dianggap final,
// karena isi halaman inilah yang dibaca mesin pencari.
// =========================================

import {
  featureAnalitikRfm,
  featureDistribusi,
  featureDonatur,
  featureKomunikasi,
  featureProspek,
  featureTransaksi,
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
    images: [{ src: featureDonatur, alt: 'Ilustrasi manajemen donatur di DREAMS' }],
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
    images: [{ src: featureAnalitikRfm, alt: 'Ilustrasi analitik RFM donatur di DREAMS' }],
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
    images: [{ src: featureDistribusi, alt: 'Ilustrasi pengelolaan distribusi bantuan di DREAMS' }],
  },

  'pengelolaan-transaksi': {
    title: 'Pengelolaan Transaksi',
    heading: 'Pengelolaan Transaksi Donasi untuk Lembaga Sosial',
    lead: 'Catat dan pantau transaksi donasi berdasarkan program dan metode pembayaran.',
    points: [
      {
        title: 'Pencatatan transaksi donasi',
        text: 'Kelola informasi transaksi donasi untuk membantu pencatatan dan pemantauan aktivitas donasi.',
      },
      {
        title: 'Berdasarkan program dan metode pembayaran',
        text: 'Pantau transaksi sesuai program donasi dan metode pembayaran yang digunakan.',
      },
      {
        title: 'Bukti donasi digital',
        text: 'Buat bukti donasi dengan desain yang dapat disesuaikan dan dihasilkan secara otomatis dalam format PDF sebagai dokumentasi donasi bagi donatur.',
      },
    ],
    images: [{ src: featureTransaksi, alt: 'Ilustrasi pengelolaan transaksi donasi di DREAMS' }],
  },

  'manajemen-prospek': {
    title: 'Manajemen Prospek',
    heading: 'Manajemen Prospek dan Calon Donatur',
    lead: 'Kelola calon donatur, aktivitas tindak lanjut, serta respons prospek.',
    points: [
      {
        title: 'Data calon donatur',
        text: 'Simpan dan kelola data prospek serta calon donatur dalam satu sistem.',
      },
      {
        title: 'Tindak lanjut dan respons',
        text: 'Catat aktivitas tindak lanjut dan respons prospek agar tim dapat memantau perkembangannya.',
      },
    ],
    images: [{ src: featureProspek, alt: 'Ilustrasi manajemen prospek donatur di DREAMS' }],
  },

  'komunikasi-whatsapp': {
    title: 'Komunikasi WhatsApp',
    heading: 'Komunikasi WhatsApp untuk Donatur',
    lead: 'Kelola template pesan dan aktivitas WhatsApp Blast melalui modul yang tersedia.',
    points: [
      {
        title: 'Template pesan',
        text: 'Kelola template pesan WhatsApp agar komunikasi lembaga lebih konsisten.',
      },
      {
        title: 'WhatsApp Blast',
        text: 'Kelola aktivitas WhatsApp Blast melalui modul yang tersedia di DREAMS.',
      },
    ],
    images: [{ src: featureKomunikasi, alt: 'Ilustrasi modul komunikasi WhatsApp di DREAMS' }],
  },
}