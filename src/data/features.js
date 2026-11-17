// =========================================
// DATA FITUR DREAMS
// Dipakai oleh: ringkasan fitur di beranda, halaman /fitur (kartu bertumpuk),
// dan halaman /tentang. `href` = halaman detail tiap fitur (/fitur/:slug); `color` = warna kartu
// (kartu bertumpuk di /fitur dan kartu isi di halaman detail).
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
    color: '#2563EB',
    description:
      'Kelola informasi donatur dan pantau aktivitas donasi dalam satu sistem.',
  },
  {
    icon: ReceiptText,
    title: 'Pengelolaan Transaksi',
    href: '/fitur/pengelolaan-transaksi',
    color: '#06B6D4',
    description:
      'Catat dan pantau transaksi donasi berdasarkan program dan metode pembayaran.',
  },
  {
    icon: UserSearch,
    title: 'Manajemen Prospek',
    href: '/fitur/manajemen-prospek',
    color: '#8B5CF6',
    description:
      'Kelola calon donatur, aktivitas tindak lanjut, serta respons prospek.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Analitik RFM',
    href: '/fitur/analitik-rfm',
    color: '#0D9488',
    description:
      'Kenali karakteristik donatur berdasarkan recency, frequency, dan monetary.',
  },
  {
    icon: HandHeart,
    title: 'Pengelolaan Distribusi',
    href: '/fitur/distribusi-bantuan',
    color: '#F97316',
    description:
      'Kelola data penyaluran bantuan sebagai bagian dari aktivitas lembaga.',
  },
  {
    icon: MessageCircle,
    title: 'Komunikasi WhatsApp',
    href: '/fitur/komunikasi-whatsapp',
    color: '#4F46E5',
    description:
      'Kelola template pesan dan aktivitas WhatsApp Blast melalui modul yang tersedia.',
  },
]