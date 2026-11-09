# Catatan Serah Terima

## Menjalankan

1. `npm install`
2. Salin `.env.example` menjadi `.env`, lalu isi nilainya (lihat bawah).
3. `npm run dev` untuk pengembangan, `npm run build` untuk produksi
   (hasilnya di folder `dist`).

Setelah `.env` diubah, jalankan ulang `npm run dev` atau `npm run build`.

## Mengganti kontak

Di `.env` frontend:

| Variabel             | Isi                                                            |
| -------------------- | -------------------------------------------------------------- |
| `VITE_API_BASE_URL`  | Alamat dasar API, termasuk `/api`, tanpa garis miring di akhir |
| `VITE_CONTACT_EMAIL` | Email kontak                                                   |

Tautan media sosial, peta kantor, dan `appUrl` ada di `src/data/siteConfig.js`.
Semua variabel berawalan `VITE_` ikut masuk ke bundle dan dapat dilihat
pengunjung. Jangan isi dengan kunci rahasia atau token.

## Nomor WhatsApp (ada di backend, bukan frontend)

Nomor WhatsApp tidak ada di kode frontend. Nomornya disimpan di `.env`
backend:

    WHATSAPP_NUMBER=6281234567890

Setelah `POST /demo-requests` berhasil, server membalas dengan link WhatsApp,
dan frontend memakainya untuk tombol "Lanjut ke WhatsApp":

    { "success": true, "data": { "whatsapp_url": "https://wa.me/6281234567890" } }

Aturan di frontend: hanya link yang diawali `https://wa.me/` yang diterima.
Jika `data.whatsapp_url` tidak ada, tombol WhatsApp tidak ditampilkan.

Tombol WhatsApp melayang (`FloatingActions.jsx`) memakai endpoint terpisah,
karena tampil di semua halaman sebelum form diisi. Saat diklik, frontend
memanggil:

    GET {VITE_API_BASE_URL}/whatsapp-link

dan server membalas dengan bentuk yang sama:

    { "success": true, "data": { "whatsapp_url": "https://wa.me/6281234567890" } }

Endpoint ini memakai `WHATSAPP_NUMBER` yang sama, wajib punya rate limit, dan
CORS hanya untuk domain situs. Jika gagal, tombol menampilkan "Gagal membuka,
coba lagi".

Perlu diketahui: siapa pun yang memanggil `GET /api/whatsapp-link` atau mengirim
form akan menerima link WhatsApp, jadi nomor tidak bisa disembunyikan sepenuhnya.
Yang sudah diterapkan hanya rate limit per IP (default 60 per 15 menit untuk
`/whatsapp-link` dan 10 per 15 menit untuk `POST /demo-requests`), yang
mempersulit pengumpulan massal. Honeypot atau captcha belum ada. Jika klien
khawatir nomor dikumpulkan bot, tambahkan captcha (misalnya Cloudflare Turnstile)
di form dan endpoint tersebut. Jangan menaruh link atau tombol WhatsApp statis di
bagian situs lain (navbar, footer, dan lainnya).

## Backend

Backend sudah tersedia di folder `backend/`. Variabel `.env`, endpoint, dan
petunjuk menjalankan ada di `backend/README.md`.

- Form mengirim ke `{VITE_API_BASE_URL}/demo-requests`.
- `CORS_ORIGINS` di backend harus diisi domain situs ini, bukan `*`.
- Server memvalidasi ulang semua field, memakai `libphonenumber-js` dengan aturan
  yang sama seperti frontend (hanya nomor seluler), dan membatasi laju request.
- Backend hanya boleh berjalan satu instance, karena antrean tulis Google Sheets
  ada di dalam proses.

## Notifikasi pengajuan demo

Pengajuan demo disimpan ke Google Sheet. Aplikasi tidak mengirim email sendiri.
Untuk diberi tahu saat ada pengajuan baru, pemilik spreadsheet dapat
mengaktifkan notifikasi bawaan Google Sheets: Tools > Notification settings >
"Any changes are made" > "Email - right away". Email tersebut hanya
memberi tahu bahwa ada perubahan dan menautkan ke spreadsheet, tidak memuat
isi pengajuan. Jika diperlukan email berisi data pemohon, tambahkan Google Apps
Script di spreadsheet atau pengiriman email dari backend.

## Serah terima untuk klien

### Akun Google (dibuat klien sendiri)

Data pengajuan demo disimpan ke Google Sheets. Klien membuat sendiri:

1. Project di Google Cloud, lalu aktifkan Google Sheets API.
2. Service account di project itu, lalu buat kunci (JSON). Simpan kunci di
   environment hosting, jangan di repo.
3. Spreadsheet baru, lalu bagikan ke email service account (berakhiran
   `iam.gserviceaccount.com`) dengan akses Editor.
4. Isi `GOOGLE_SHEETS_SPREADSHEET_ID` dan kredensial service account di
   environment backend (lihat `backend/README.md`).

### Variabel yang diisi klien

| Variabel | Keterangan |
| --- | --- |
| `NODE_ENV` | `production`. Dalam mode ini aplikasi berhenti saat start jika `WHATSAPP_NUMBER` atau `CORS_ORIGINS` kosong |
| `CORS_ORIGINS` | Domain situs persis (contoh `https://dreams.example.com`), bukan `*` |
| `WHATSAPP_NUMBER` | Nomor WhatsApp bisnis, kode negara tanpa `+` |
| `TRUST_PROXY` | Jumlah proxy di depan backend, biasanya `1` |
| `VITE_API_BASE_URL` | Frontend. Tertanam saat build, jadi mengubahnya berarti build ulang |

### Catatan operasional

- Backend hanya boleh berjalan satu instance, karena antrean tulis ke Google
  Sheets ada di dalam proses.
- Setelah menyelesaikan pengajuan, modal sukses menampilkan tombol "Lanjut ke
  WhatsApp", lalu "Sudah mengirim pesan" dan "Buka WhatsApp lagi".
- Hanya nomor seluler yang diterima (frontend dan backend). Untuk menerima
  telepon rumah, ubah `getType()` di `backend/src/utils/validation.mjs` dan
  `ALLOWED_PHONE_TYPES` di frontend.

### Notifikasi pengajuan baru

Aplikasi tidak mengirim email sendiri. Pemilik spreadsheet dapat mengaktifkan
notifikasi bawaan Google Sheets: Tools > Notification settings > "Any changes
are made" > "Email - right away". Notifikasi ini sudah diuji bekerja untuk baris
yang ditulis lewat API. Emailnya hanya memberi tahu ada perubahan dan menautkan
ke spreadsheet, tidak memuat isi pengajuan. Jika perlu email berisi data
pemohon, tambahkan Google Apps Script di spreadsheet atau kirim email dari
backend.
## Analytics dan SEO

Di `.env` frontend (lihat `.env.example`):

| Variabel | Keterangan |
| --- | --- |
| `VITE_SITE_URL` | Alamat situs final tanpa garis miring di akhir. Dipakai untuk canonical, `sitemap.xml`, dan gambar preview |
| `VITE_GTM_ID` | ID Google Tag Manager (`GTM-XXXX`). Jika diisi, GA dan Clarity langsung diabaikan; pasang keduanya dari dalam GTM |
| `VITE_GA_ID` | ID Google Analytics 4 (`G-XXXX`), hanya jika tidak memakai GTM |
| `VITE_CLARITY_ID` | ID Microsoft Clarity, hanya jika tidak memakai GTM |

Kosong berarti skrip tidak dimuat. Setelah `.env` diubah, jalankan `npm run build`
ulang (nilai `VITE_*` tertanam saat build).

- Jika memakai CSP, izinkan `googletagmanager.com`, `google-analytics.com`,
  `analytics.google.com`, dan `clarity.ms` (termasuk subdomainnya).
- GTM, GA, dan Clarity memakai cookie dan melacak pengunjung. Pertimbangkan banner
  persetujuan dan kebijakan privasi sesuai UU PDP.
- Meta SEO dan Open Graph ada di `frontend/index.html`. Semua halaman berbagi satu
  set meta yang sama. Gambar preview ada di `frontend/public/og-image.jpg`
  (1200x630, ganti dengan desain sendiri bila ada).
- Preview WhatsApp dan Telegram disimpan cache. Setelah mengubah meta atau gambar,
  uji dengan menambahkan `?v=2` pada link.
## Sebelum go-live

- Pasang HTTPS dan header keamanan (Content-Security-Policy,
  X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security).
- Jalankan `npm audit --omit=dev` dan tinjau hasilnya.
- Pastikan tidak ada berkas `.map` di `dist` jika tidak diperlukan.
