// =========================================
// DATA ARTIKEL BLOG
// Artikel awal berisi pengetahuan umum tentang pengelolaan donasi dan
// penjelasan fitur DREAMS. Mohon ditinjau tim sebelum rilis.
//
// Menambah artikel:
//   1. Tambahkan objek baru di bawah (slug = bagian akhir URL).
//   2. Daftarkan halamannya di src/routes.js (path '/blog/<slug>').
//   3. (Opsional) taruh foto sampul di src/assets/images/blog/<slug>.webp
//
// Bentuk isi (`sections`): heading (opsional), paragraphs, list (opsional).
// =========================================

// Foto sampul otomatis: src/assets/images/blog/<slug>.webp
const covers = import.meta.glob('../assets/images/blog/*.webp', {
  eager: true,
  import: 'default',
})

export function getBlogCover(slug) {
  return covers[`../assets/images/blog/${slug}.webp`] ?? null
}

export const blogPosts = [
  {
    slug: 'apa-itu-analisis-rfm-donatur',
    title: 'Apa Itu Analisis RFM dan Cara Memakainya untuk Memahami Donatur',
    description:
      'Pelajari analisis RFM (recency, frequency, monetary) dan cara lembaga sosial memakainya untuk mengelompokkan donatur dan menentukan pendekatan yang tepat.',
    category: 'Analitik Donatur',
    date: '2026-11-18',
    readTime: '5 menit baca',
    accent: '#0D9488',
    icon: 'chart',
    sections: [
      {
        paragraphs: [
          'Lembaga sosial biasanya memiliki ratusan hingga ribuan donatur, dan setiap donatur punya kebiasaan berdonasi yang berbeda. Ada yang rutin setiap bulan, ada yang hanya berdonasi saat kampanye tertentu, dan ada yang sudah lama tidak terdengar kabarnya. Analisis RFM membantu lembaga melihat perbedaan itu dengan lebih terstruktur.',
        ],
      },
      {
        heading: 'Apa itu RFM?',
        paragraphs: ['RFM adalah singkatan dari tiga ukuran perilaku donasi:'],
        list: [
          'Recency: seberapa baru donatur terakhir kali berdonasi.',
          'Frequency: seberapa sering donatur berdonasi dalam periode tertentu.',
          'Monetary: seberapa besar total nilai donasi yang diberikan donatur.',
        ],
        after: [
          'Ketiga ukuran ini diberi skor, lalu donatur dikelompokkan ke dalam segmen berdasarkan kombinasi skornya.',
        ],
      },
      {
        heading: 'Contoh pengelompokan segmen',
        paragraphs: [
          'Nama dan jumlah segmen dapat berbeda di setiap lembaga. Sebagai gambaran, pengelompokan sederhana bisa seperti ini:',
        ],
        list: [
          'Donatur setia: baru berdonasi, sering, dan bernilai tinggi. Hubungan perlu dijaga.',
          'Donatur potensial: baru berdonasi tetapi belum sering. Perlu diajak berdonasi kembali.',
          'Donatur berisiko: dahulu aktif tetapi sudah lama tidak berdonasi. Perlu pendekatan agar kembali aktif.',
          'Donatur tidak aktif: sudah lama tidak berdonasi dan jarang berdonasi. Cocok untuk pesan pengingat yang ringan.',
        ],
      },
      {
        heading: 'Dari segmen ke tindakan',
        paragraphs: [
          'Segmen baru bermanfaat kalau diikuti tindakan yang berbeda. Donatur setia bisa menerima ucapan terima kasih yang lebih personal dan laporan program secara berkala. Donatur berisiko bisa dihubungi dengan pesan pengingat yang menyebut program yang pernah mereka dukung. Dengan begitu, waktu dan tenaga tim fundraising diarahkan ke donatur yang paling membutuhkan perhatian.',
        ],
      },
      {
        heading: 'Hal yang perlu diperhatikan',
        paragraphs: [
          'Analisis RFM sangat bergantung pada kualitas data. Pastikan setiap donasi tercatat lengkap dengan tanggal, nilai, dan program, serta data donatur tidak ganda. Data yang rapi membuat segmen lebih dapat dipercaya.',
          'DREAMS menyediakan dashboard dan analitik RFM untuk melihat aktivitas transaksi, pencapaian target, dan karakteristik donatur dalam satu sistem.',
        ],
      },
    ],
    cta: { label: 'Lihat fitur Analitik RFM', href: '/fitur/analitik-rfm' },
  },

  {
    slug: 'cara-mengelola-data-donatur-lembaga-sosial',
    title: 'Cara Mengelola Data Donatur Lembaga Sosial agar Tidak Tercecer',
    description:
      'Panduan praktis merapikan data donatur lembaga sosial: satu sumber data, format seragam, riwayat donasi, dan tindak lanjut yang terdokumentasi.',
    category: 'Manajemen Donatur',
    date: '2026-11-18',
    readTime: '4 menit baca',
    accent: '#2563EB',
    icon: 'users',
    sections: [
      {
        paragraphs: [
          'Data donatur sering tersebar di banyak tempat: berkas Excel, catatan di grup chat, dan buku manual. Saat data tercecer, lembaga sulit mengetahui siapa donatur yang aktif, program apa yang mereka dukung, dan kapan terakhir mereka dihubungi. Berikut langkah praktis untuk merapikannya.',
        ],
      },
      {
        heading: '1. Kumpulkan dalam satu sumber data',
        paragraphs: [
          'Tentukan satu tempat sebagai sumber data utama, lalu pindahkan data dari berkas dan catatan lain ke sana. Satu sumber data mencegah perbedaan versi, misalnya dua berkas dengan nomor telepon donatur yang berbeda.',
        ],
      },
      {
        heading: '2. Seragamkan format pencatatan',
        paragraphs: [
          'Tetapkan aturan yang sama untuk semua petugas, misalnya penulisan nama, format nomor WhatsApp, serta pilihan program, channel donasi, dan metode pembayaran. Pilihan yang baku lebih mudah dihitung daripada teks bebas.',
        ],
      },
      {
        heading: '3. Catat riwayat donasi, bukan hanya totalnya',
        paragraphs: [
          'Riwayat donasi memperlihatkan tanggal, program, dan nilai setiap donasi. Dari riwayat itu lembaga bisa melihat apakah donatur makin aktif atau mulai berhenti, sesuatu yang tidak terlihat dari angka total saja.',
        ],
      },
      {
        heading: '4. Dokumentasikan tindak lanjut',
        paragraphs: [
          'Catat siapa yang menghubungi donatur, kapan, dan bagaimana responsnya. Dengan catatan ini, petugas baru tidak perlu mengulang percakapan dari awal, dan donatur tidak dihubungi berulang kali oleh orang yang berbeda.',
        ],
      },
      {
        heading: '5. Jaga keamanan dan privasi data',
        paragraphs: [
          'Data donatur bersifat pribadi. Batasi siapa yang boleh mengakses, hindari membagikan berkas lewat grup chat, dan simpan cadangan secara berkala.',
        ],
      },
      {
        heading: '6. Tinjau data secara berkala',
        paragraphs: [
          'Jadwalkan pemeriksaan rutin untuk menghapus data ganda dan memperbarui nomor yang sudah tidak aktif. Data yang bersih membuat laporan dan analisis lebih akurat.',
          'DREAMS membantu lembaga mengelola data donatur beserta referensi pendukung seperti program, channel donasi, segmen, dan metode pembayaran dalam satu sistem.',
        ],
      },
    ],
    cta: { label: 'Lihat fitur Manajemen Donatur', href: '/fitur/manajemen-donatur' },
  },

  {
    slug: 'bukti-donasi-transparansi-lembaga-sosial',
    title: 'Mengapa Bukti Donasi Penting untuk Transparansi Lembaga Sosial',
    description:
      'Kenali isi bukti donasi yang baik dan alasan bukti donasi membantu lembaga sosial membangun kepercayaan serta mendokumentasikan donasi.',
    category: 'Transparansi Donasi',
    date: '2026-11-18',
    readTime: '3 menit baca',
    accent: '#278C68',
    icon: 'receipt',
    sections: [
      {
        paragraphs: [
          'Setiap donasi yang diterima perlu didokumentasikan. Bukti donasi memberi donatur kepastian bahwa donasinya sudah tercatat, sekaligus menjadi arsip bagi lembaga. Lembaga yang konsisten memberikan bukti donasi biasanya lebih mudah dipercaya.',
        ],
      },
      {
        heading: 'Informasi yang sebaiknya ada',
        paragraphs: ['Bukti donasi yang baik memuat setidaknya:'],
        list: [
          'Nomor bukti dan tanggal donasi.',
          'Nama donatur.',
          'Program yang didukung.',
          'Jumlah donasi.',
          'Identitas dan kontak lembaga.',
          'Keterangan atau ucapan terima kasih.',
        ],
      },
      {
        heading: 'Manfaat bagi donatur dan lembaga',
        paragraphs: [
          'Bagi donatur, bukti donasi menjadi tanda terima dan dokumentasi pribadi. Bagi lembaga, bukti donasi membantu pencocokan data saat pembukuan dan memperlihatkan bahwa pengelolaan donasi dilakukan dengan tertib.',
        ],
      },
      {
        heading: 'Tips membuat bukti donasi yang rapi',
        paragraphs: [],
        list: [
          'Gunakan penomoran yang konsisten agar mudah dicari.',
          'Pakai desain yang jelas, dengan logo dan identitas lembaga.',
          'Sediakan dalam format PDF supaya mudah dibagikan dan dicetak.',
          'Simpan arsip digital sehingga bukti dapat diterbitkan ulang bila diminta.',
        ],
      },
      {
        heading: 'Bukti donasi digital di DREAMS',
        paragraphs: [
          'DREAMS dapat membuat bukti donasi secara otomatis dalam format PDF, dengan desain yang dapat disesuaikan, sebagai bentuk transparansi dan dokumentasi donasi bagi donatur.',
        ],
      },
    ],
    cta: { label: 'Lihat fitur Pengelolaan Transaksi', href: '/fitur/pengelolaan-transaksi' },
  },
]
