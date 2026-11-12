# DREAMS Landing Page

Landing page company profile DREAMS App yang menyediakan informasi produk dan formulir permintaan demo.

Dokumentasi ini menjadi satu-satunya dokumentasi utama proyek, mencakup setup, pengembangan, arsitektur, API, integrasi Google Sheets, keamanan, deployment, dan serah terima.

## 1. Teknologi

### Frontend

- React 19
- Vite 8
- Lucide React
- CSS

### Server dan API

- Node.js (ES Modules)
- Express.js
- Google Sheets API
- Helmet
- CORS
- Express Rate Limit
- libphonenumber-js

### Development dan Testing

- ESLint
- Nodemon
- Node.js Test Runner

## 2. Persyaratan

- Node.js versi 20 atau lebih baru
- npm
- Google Cloud Project
- Google Sheets API aktif
- Google Spreadsheet
- Google Service Account

## 3. Struktur Project

```text
DREAMS APP LANDING PAGE/
├── public/                 # Aset publik dan file statis
├── src/                    # Source code React
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── styles/
│   └── utils/
├── server/                 # Express application dan API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.mjs
│   └── server.mjs
├── tests/                  # Automated tests
├── docs/                   # Dokumentasi tambahan sementara
├── dist/                   # Hasil frontend production build
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
├── .env
└── .env.example
```

Frontend dan server berada dalam satu project root serta menggunakan satu `package.json`, satu `package-lock.json`, dan satu dependency tree.

Pemisahan folder `src/` dan `server/` tetap dipertahankan untuk memisahkan tanggung jawab frontend dan server.

## 4. Instalasi dan Konfigurasi

Jalankan dari root project:

```powershell
npm ci
Copy-Item .env.example .env
```

Isi konfigurasi `.env` sesuai lingkungan pengembangan atau produksi.

### Environment Variables

| Variabel                          | Keterangan                                               |
| --------------------------------- | -------------------------------------------------------- |
| `NODE_ENV`                        | Mode aplikasi: `development` atau `production`           |
| `PORT`                            | Port Express, default `3000`                             |
| `GOOGLE_SHEETS_SPREADSHEET_ID`    | ID spreadsheet tujuan                                    |
| `GOOGLE_SHEETS_SHEET_NAME`        | Nama worksheet, default `Demo Requests`                  |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`    | Email Google Service Account                             |
| `GOOGLE_PRIVATE_KEY`              | Private key Service Account                              |
| `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Alternatif kredensial melalui file JSON                  |
| `CORS_ORIGINS`                    | Daftar origin frontend yang diizinkan, dipisahkan koma   |
| `RATE_LIMIT_WINDOW_MS`            | Periode rate limit dalam milidetik                       |
| `PUBLIC_RATE_LIMIT_MAX`           | Maksimal request pengajuan demo per periode              |
| `LINK_RATE_LIMIT_MAX`             | Maksimal request tautan WhatsApp per periode             |
| `WHATSAPP_NUMBER`                 | Nomor WhatsApp bisnis dengan kode negara tanpa tanda `+` |
| `TRUST_PROXY`                     | Jumlah reverse proxy di depan aplikasi                   |
| `VITE_API_BASE_URL`               | Alamat dasar API frontend, termasuk `/api`               |
| `VITE_CONTACT_EMAIL`              | Email kontak website                                     |
| `VITE_SITE_URL`                   | URL utama website                                        |
| `VITE_GTM_ID`                     | ID Google Tag Manager                                    |
| `VITE_GA_ID`                      | ID Google Analytics 4                                    |
| `VITE_CLARITY_ID`                 | ID Microsoft Clarity                                     |

Gunakan `.env.example` sebagai template konfigurasi.

Kredensial Google dapat menggunakan salah satu metode:

1. `GOOGLE_SERVICE_ACCOUNT_EMAIL` dan `GOOGLE_PRIVATE_KEY`. Format private key dengan `\n` literal didukung.
2. File JSON Service Account melalui `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`.

Jika menggunakan file JSON, simpan di lokasi lokal yang tidak masuk repository dan sesuaikan path dengan root project.

**Penting:** Jangan pernah memasukkan credential, private key, token, atau rahasia lain ke source code maupun repository.

Variabel `VITE_*` ditanam ke bundle frontend saat build dan dapat dilihat oleh pengunjung. Jangan gunakan variabel tersebut untuk menyimpan rahasia.

## 5. Google Sheets Setup

1. Buat Google Cloud Project.
2. Aktifkan Google Sheets API.
3. Buat Service Account.
4. Buat kredensial JSON atau gunakan email dan private key Service Account.
5. Buat Google Spreadsheet.
6. Bagikan spreadsheet kepada email Service Account dengan akses Editor.
7. Isi `GOOGLE_SHEETS_SPREADSHEET_ID`.
8. Isi `GOOGLE_SHEETS_SHEET_NAME` sesuai nama worksheet.

### Struktur Spreadsheet

Gunakan worksheet yang sesuai. Server memeriksa baris pertama dan dapat menimpanya jika header tidak sesuai.

| Kolom      | Keterangan                      |
| ---------- | ------------------------------- |
| ID         | Nomor urut pengajuan            |
| Timestamp  | Waktu data diterima (WIB)       |
| Nama       | Nama pemohon                    |
| Organisasi | Nama organisasi                 |
| Email      | Email pemohon dalam huruf kecil |
| WhatsApp   | Nomor internasional E.164       |
| Waktu Demo | Preferensi waktu demo           |
| Status     | Status awal `new`               |

Google Sheets menjadi penyimpanan data pengajuan demo. Aplikasi tidak memerlukan database tambahan untuk fungsi tersebut.

## 6. Menjalankan Aplikasi

### Development

Buka dua terminal dari root project.

Terminal pertama untuk frontend:

```powershell
npm run dev
```

Terminal kedua untuk server:

```powershell
npm run dev:server
```

Frontend berjalan melalui URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

Server berjalan pada port yang ditentukan oleh `PORT`, secara default `http://localhost:3000`.

Vite menggunakan proxy `/api` menuju server lokal pada port `3000`.

### Production

Build frontend:

```powershell
npm run build
```

Jalankan aplikasi:

```powershell
npm start
```

Jika folder `dist/` tersedia, Express menyajikan frontend production sekaligus API dari satu server.

Jika build frontend belum tersedia, Express tetap dapat berjalan dalam mode API saja.

### Perintah Project

| Perintah             | Fungsi                                    |
| -------------------- | ----------------------------------------- |
| `npm ci`             | Instalasi dependency berdasarkan lockfile |
| `npm run dev`        | Menjalankan Vite development server       |
| `npm run dev:server` | Menjalankan Express dengan Nodemon        |
| `npm run build`      | Membuat production build frontend         |
| `npm run preview`    | Preview hasil build melalui Vite          |
| `npm start`          | Menjalankan Express server                |
| `npm run lint`       | Menjalankan ESLint                        |
| `npm test`           | Menjalankan automated tests               |

## 7. Arsitektur Request

Alur pengajuan demo:

```text
Pengunjung
    |
    v
React Frontend
    |
    v
POST /api/demo-requests
    |
    v
Express Middleware
    |
    v
Controller
    |
    v
Input Validation
    |
    v
Google Sheets Model
    |
    v
Google Spreadsheet
    |
    v
API Response + WhatsApp URL
    |
    v
Frontend
```

Frontend melakukan validasi awal untuk memberikan umpan balik kepada pengguna.

Server tetap melakukan validasi ulang karena request dapat dikirim tanpa melewati frontend.

Urutan middleware keamanan, CORS, dan parsing JSON di aplikasi harus dipertahankan sebelum route yang menggunakannya. Rate limiter diterapkan pada route publik.

## 8. API Reference

Base URL lokal:

```text
http://localhost:3000
```

Semua endpoint API menggunakan prefix `/api`, kecuali health check.

### Daftar Endpoint

| Method | Endpoint             | Fungsi                         |
| ------ | -------------------- | ------------------------------ |
| GET    | `/health`            | Memeriksa status server        |
| POST   | `/api/demo-requests` | Membuat pengajuan demo         |
| GET    | `/api/whatsapp-link` | Mengambil tautan WhatsApp umum |

### 8.1 Health Check

```http
GET /health
```

Respons berhasil:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

### 8.2 Membuat Pengajuan Demo

```http
POST /api/demo-requests
Content-Type: application/json
```

Request body:

```json
{
  "name": "Nama Pemohon",
  "organization": "Contoh Organisasi",
  "email": "pemohon@example.com",
  "whatsapp": "081234567890",
  "preferred_time": "Pagi"
}
```

Semua field wajib diisi.

Ketentuan validasi:

| Field            | Aturan                                    |
| ---------------- | ----------------------------------------- |
| `name`           | Maksimal 150 karakter                     |
| `organization`   | Maksimal 200 karakter                     |
| `email`          | Maksimal 254 karakter, format email valid |
| `whatsapp`       | Maksimal 30 karakter, nomor telepon valid |
| `preferred_time` | `Fleksibel`, `Pagi`, `Siang`, atau `Sore` |

Field tambahan ditolak.

Nomor tanpa kode negara dianggap sebagai nomor Indonesia. Nomor dinormalisasi ke format internasional E.164.

Respons berhasil menggunakan HTTP `201`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nama Pemohon",
    "organization": "Contoh Organisasi",
    "email": "pemohon@example.com",
    "whatsapp": "+6281234567890",
    "preferred_time": "Pagi",
    "status": "new",
    "created_at": "9 November 2026 ( 10:30:00 WIB )",
    "whatsapp_url": "https://wa.me/6281234567890?text=..."
  }
}
```

`whatsapp_url` merupakan tautan WhatsApp untuk konfirmasi pengajuan. Nilainya dapat berupa `null` jika nomor WhatsApp bisnis belum dikonfigurasi.

Respons pengajuan tidak boleh disimpan di cache.

### 8.3 Tautan WhatsApp Umum

```http
GET /api/whatsapp-link
```

Respons berhasil:

```json
{
  "success": true,
  "data": {
    "whatsapp_url": "https://wa.me/6281234567890?text=..."
  }
}
```

Nomor bisnis menggunakan konfigurasi `WHATSAPP_NUMBER`.

Jika nomor belum dikonfigurasi, server mengembalikan HTTP `503` dengan kode `WHATSAPP_NOT_CONFIGURED`.

### 8.4 Format Error

Semua respons error menggunakan format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Format email tidak valid.",
    "details": {
      "field": "email"
    }
  }
}
```

Kode error yang digunakan:

| Kode                      | Keterangan                         |
| ------------------------- | ---------------------------------- |
| `VALIDATION_ERROR`        | Input tidak valid                  |
| `INVALID_JSON`            | Format JSON tidak valid            |
| `CORS_ORIGIN_DENIED`      | Origin tidak diizinkan             |
| `PAYLOAD_TOO_LARGE`       | Payload melebihi batas             |
| `RATE_LIMITED`            | Batas request terlampaui           |
| `WHATSAPP_NOT_CONFIGURED` | Nomor WhatsApp belum dikonfigurasi |
| `NOT_FOUND`               | Endpoint tidak ditemukan           |
| `INTERNAL_ERROR`          | Kesalahan internal server          |

HTTP status yang digunakan antara lain `200`, `201`, `400`, `403`, `404`, `413`, `429`, `500`, dan `503`.

## 9. Integrasi WhatsApp

Nomor WhatsApp bisnis dikonfigurasi melalui `WHATSAPP_NUMBER` di environment server, bukan ditulis langsung di frontend.

Ada dua penggunaan utama:

1. Setelah pengajuan demo berhasil, frontend menerima `whatsapp_url` dari respons `POST /api/demo-requests`.
2. Floating WhatsApp action mengambil tautan umum melalui `GET /api/whatsapp-link`.

Frontend hanya menerima tautan WhatsApp dengan prefix `https://wa.me/`.

Jika permintaan tautan gagal, frontend menampilkan informasi kegagalan kepada pengguna.

Rate limit default:

- Pengajuan demo: 10 request per 15 menit.
- Tautan WhatsApp: 60 request per 15 menit.

Nomor WhatsApp tidak dapat sepenuhnya disembunyikan karena endpoint publik mengembalikan tautan tersebut. Rate limit membantu mempersulit pengumpulan massal, tetapi bukan pengganti CAPTCHA.

Jika dibutuhkan perlindungan tambahan, pertimbangkan Cloudflare Turnstile pada frontend dan server.

## 10. CORS dan TRUST_PROXY

### CORS

`CORS_ORIGINS` berisi daftar origin yang diperbolehkan, dipisahkan koma.

Contoh:

```dotenv
CORS_ORIGINS=http://localhost:5173,https://dreams.example.com
```

Gunakan domain frontend secara spesifik. Jangan menggunakan `*` untuk deployment produksi.

### TRUST_PROXY

Jika aplikasi berjalan di belakang reverse proxy atau load balancer seperti Nginx atau Cloudflare, konfigurasi `TRUST_PROXY` sesuai jumlah proxy yang benar-benar berada di depan aplikasi.

Contoh:

```dotenv
TRUST_PROXY=1
```

Jika aplikasi berjalan langsung tanpa proxy:

```dotenv
TRUST_PROXY=0
```

Jangan mengatur jumlah proxy lebih besar dari kondisi sebenarnya karena dapat memengaruhi identifikasi IP dan rate limiting.

## 11. Testing dan Debugging

Jalankan seluruh automated tests:

```powershell
npm test
```

Jalankan pemeriksaan kode:

```powershell
npm run lint
```

Build frontend:

```powershell
npm run build
```

Health check:

```text
GET http://localhost:3000/health
```

Tes API menggunakan automated tests memakai model pengganti sehingga tidak menulis data ke Google Sheets sungguhan.

Untuk debugging frontend, gunakan Browser Developer Tools:

- Console untuk JavaScript errors.
- Network untuk request dan response API.
- Elements untuk memeriksa struktur DOM.
- Application untuk memeriksa resource browser.

Setelah perubahan kode, jalankan test, lint, dan build yang relevan.

## 12. Batasan dan Catatan Teknis

- Penomoran ID pengajuan menggunakan antrean dalam satu proses. Jalankan hanya satu instance server. Jika membutuhkan beberapa instance, ubah strategi ID menjadi mekanisme yang aman untuk lingkungan terdistribusi.
- Data pengajuan disimpan ke Google Sheets.
- Aplikasi tidak menyediakan Admin Page, autentikasi admin, database, atau CRUD pengajuan demo.
- Notifikasi email pengajuan tidak dikirim langsung oleh aplikasi.
- Frontend dan server berada dalam satu project root, tetapi tetap memiliki tanggung jawab dan direktori source code masing-masing.

## 13. Notifikasi Pengajuan Demo

Pengajuan demo disimpan ke Google Spreadsheet. Aplikasi tidak mengirim email notifikasi secara langsung.

Pemilik spreadsheet dapat mengaktifkan notifikasi bawaan Google Sheets:

1. Buka spreadsheet.
2. Pilih Tools.
3. Pilih Notification settings.
4. Pilih `Any changes are made`.
5. Pilih `Email - right away`.

Notifikasi ini memberi tahu bahwa terdapat perubahan dan menautkan ke spreadsheet, tetapi tidak menyertakan isi pengajuan.

Jika membutuhkan email yang berisi data pemohon, integrasi dapat ditambahkan melalui Google Apps Script atau layanan email dari server.

## 14. Analytics dan SEO

Konfigurasi analytics dan SEO berada di environment frontend.

| Variabel          | Fungsi                                         |
| ----------------- | ---------------------------------------------- |
| `VITE_SITE_URL`   | URL utama website untuk canonical dan metadata |
| `VITE_GTM_ID`     | Google Tag Manager                             |
| `VITE_GA_ID`      | Google Analytics 4 jika tidak memakai GTM      |
| `VITE_CLARITY_ID` | Microsoft Clarity jika tidak memakai GTM       |

Jika `VITE_GTM_ID` diisi, GA dan Clarity langsung diabaikan oleh konfigurasi frontend. Pasang keduanya melalui GTM jika diperlukan.

Jika tidak menggunakan GTM, GA dan Clarity dapat dikonfigurasi secara terpisah.

Setelah mengubah variabel `VITE_*`, jalankan build ulang karena nilainya tertanam pada hasil build.

Jika menggunakan Content Security Policy, sesuaikan allowlist untuk layanan analytics yang dipakai, termasuk domain Google Tag Manager, Google Analytics, dan Microsoft Clarity.

GTM, GA, dan Clarity dapat menggunakan cookie serta melacak aktivitas pengunjung. Pertimbangkan mekanisme persetujuan pengguna dan kebijakan privasi sesuai ketentuan perlindungan data pribadi.

Meta SEO dan Open Graph berada di `index.html`. Jika metadata atau gambar preview berubah, uji kembali preview pada platform terkait karena hasilnya dapat tersimpan dalam cache.

## 15. Deployment dan Go-Live

Sebelum aplikasi dipublikasikan:

- Pastikan HTTPS aktif.
- Pastikan domain frontend masuk ke `CORS_ORIGINS`.
- Pastikan seluruh environment variable produksi sudah diisi.
- Pastikan kredensial Google Service Account valid.
- Pastikan spreadsheet sudah dibagikan ke Service Account.
- Pastikan `TRUST_PROXY` sesuai konfigurasi infrastruktur.
- Jalankan `npm ci`.
- Jalankan `npm run lint`.
- Jalankan `npm test`.
- Jalankan `npm run build`.
- Jalankan `npm start`.
- Pastikan `/health`, homepage, halaman `/demo`, dan endpoint API berfungsi.
- Tinjau hasil `npm audit --omit=dev`.
- Pastikan tidak ada file credential atau `.env` di repository.
- Pastikan file source map tidak dipublikasikan jika tidak diperlukan.

Untuk deployment dengan Nginx atau reverse proxy, arahkan trafik ke port Express sesuai konfigurasi server dan pastikan header keamanan serta HTTPS ditangani dengan benar.

## 16. Serah Terima dan Pengelolaan oleh Klien

Klien membuat dan mengelola sendiri:

1. Google Cloud Project.
2. Google Sheets API.
3. Google Service Account.
4. Google Spreadsheet.
5. Kredensial Service Account.
6. Environment variable pada hosting.

Variabel penting yang perlu disesuaikan saat serah terima:

- `NODE_ENV=production`
- `CORS_ORIGINS`
- `WHATSAPP_NUMBER`
- `TRUST_PROXY`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- Kredensial Google Service Account
- `VITE_API_BASE_URL`
- `VITE_SITE_URL`
- Konfigurasi analytics bila digunakan.

Setelah mengganti environment variable `VITE_*`, frontend harus di-build ulang.

Nomor WhatsApp bisnis dan kredensial Google harus dikelola oleh pemilik sistem. Jangan menyimpan rahasia klien dalam repository.

## 17. Panduan Belajar dan Pengembangan

### Frontend

Pelajari:

- Struktur folder `src/`.
- React Components.
- Props dan State.
- React Hooks.
- Form Handling.
- Fetch API.
- CSS dan Responsive Design.

Alur formulir demo:

1. Pengguna mengisi formulir.
2. Frontend menjalankan validasi awal.
3. Frontend mengirim request ke API.
4. Server memvalidasi ulang data.
5. Server menyimpan data ke Google Sheets.
6. Server mengembalikan respons dan tautan WhatsApp.
7. Frontend menampilkan status pengajuan.

### Server

Pelajari:

- ES Modules.
- Express Router.
- Controller.
- Model.
- Middleware.
- Environment Variables.
- Error Handling.
- API Validation.
- Rate Limiting.

Perhatikan pembagian tanggung jawab:

- `config/`: konfigurasi aplikasi.
- `controllers/`: pengelolaan request dan response.
- `middleware/`: middleware keamanan dan pemrosesan request.
- `models/`: integrasi penyimpanan Google Sheets.
- `routes/`: definisi endpoint.
- `utils/`: helper dan validasi.

### Google Sheets API

Pelajari:

- Google Cloud Project.
- Google Sheets API.
- Service Account.
- Credential JSON.
- Spreadsheet ID.
- Append Values.
- Header Validation.

Credential Google Service Account bersifat rahasia dan tidak boleh dibagikan.

### Git

Periksa perubahan:

```powershell
git status
```

Periksa perubahan yang sudah masuk staging:

```powershell
git diff --cached
```

Sebelum commit, pastikan file `.env`, credential JSON, dan file rahasia lain tidak ikut masuk repository.

---

Dokumentasi ini mengikuti struktur project root saat ini. Jika arsitektur, endpoint, environment variable, atau proses deployment berubah, perbarui README ini agar tetap menjadi sumber dokumentasi utama proyek.
