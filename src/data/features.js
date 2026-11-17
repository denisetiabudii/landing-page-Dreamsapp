// =========================================
// DATA FITUR DREAMS
// Dipakai oleh: ringkasan fitur di beranda, halaman /fitur (kartu bertumpuk),
// dan halaman /tentang. `href` hanya ada untuk fitur yang punya halaman detail.
// =========================================

import {
  ChartNoAxesCombined,
  HandHeart,
  MessageCircle,
  ReceiptText,
  UserSearch,
  Users,
} from 'lucide-react'

export const features = [
  {
    icon: Users,
    title: 'Manajemen Donatur',
    href: '/fitur/manajemen-donatur',
    detail:
      'Kelola data donatur serta referensi pendukung seperti program, channel donasi, segmen, dan metode pembayaran, lalu lihat profil dan riwayat donasi setiap donatur.',
    description:
      'Kelola informasi donatur dan pantau aktivitas donasi dalam satu sistem.',
  },
  {
    icon: ReceiptText,
    title: 'Pengelolaan Transaksi',
    detail:
      'Kelola informasi transaksi donasi untuk membantu pencatatan dan pemantauan aktivitas donasi. Bukti donasi dapat dibuat otomatis dalam format PDF dengan desain yang dapat disesuaikan.',
    description:
      'Catat dan pantau transaksi donasi berdasarkan program dan metode pembayaran.',
  },
  {
    icon: UserSearch,
    title: 'Manajemen Prospek',
    detail:
      'Kelola data prospek dan calon donatur, termasuk informasi tindak lanjut dan respons.',
    description:
      'Kelola calon donatur, aktivitas tindak lanjut, serta respons prospek.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Analitik RFM',
    href: '/fitur/analitik-rfm',
    detail:
      'Gunakan dashboard dan analitik RFM untuk melihat aktivitas transaksi, pencapaian target, serta karakteristik donatur, termasuk segmentasi dan kesehatan database donatur.',
    description:
      'Kenali karakteristik donatur berdasarkan recency, frequency, dan monetary.',
  },
  {
    icon: HandHeart,
    title: 'Pengelolaan Distribusi',
    href: '/fitur/distribusi-bantuan',
    detail:
      'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga, dalam sistem yang sama dengan data donasi.',
    description:
      'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga.',
  },
  {
    icon: MessageCircle,
    title: 'Komunikasi WhatsApp',
    detail:
      'Kelola template pesan dan aktivitas WhatsApp Blast melalui modul yang tersedia.',
    description:
      'Kelola template pesan dan aktivitas WhatsApp Blast melalui modul yang tersedia.',
  },
]
