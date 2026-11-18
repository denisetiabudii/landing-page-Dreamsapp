// =========================================
// SITE CONFIG
// Email kontak dibaca dari berkas .env (lihat .env.example).
// Setelah .env diubah, jalankan ulang `npm run dev` atau `npm run build`.
//
// Nomor WhatsApp sengaja TIDAK ada di frontend. Link WhatsApp diberikan
// server setelah form berhasil dikirim (lihat HANDOVER.md).
// =========================================

const env = import.meta.env

export const siteConfig = {
  appUrl: 'https://demo.dreamsapp.id',
  email: String(env.VITE_CONTACT_EMAIL ?? '').trim(),
  demoUrl: '/demo',
  instagramUrl: 'https://www.instagram.com/dreamsapp.id/',

  // Video yang diputar saat gambar dasbor di hero diklik.
  // demoVideoSrc/demoVideoPoster = file di public/videos; demoVideoUrl = tautan Instagram (cadangan).
  demoVideoSrc: '/videos/dreams-demo.mp4',
  demoVideoPoster: '/videos/dreams-demo-poster.webp',
  demoVideoUrl: 'https://www.instagram.com/dreamsapp.id/reel/DfZgUzmADvW/',
  facebookUrl: 'https://web.facebook.com/61596033659958/',
  tiktokUrl: 'https://vt.tiktok.com/ZSpW3RDDn/',

  // Google Maps lokasi kantor
  officeMapUrl: 'https://maps.app.goo.gl/V4XUy5WWw4ZnceG6A',
}