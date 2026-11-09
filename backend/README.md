# DREAMS Landing API

Backend API untuk formulir permintaan demo pada DREAMS Landing Page.

Backend menggunakan Express.js dan Google Sheets API untuk menyimpan data demo request ke Google Spreadsheet, serta menyediakan tautan chat WhatsApp.

## Teknologi

- Node.js (ES Modules)
- Express.js
- Google Sheets API dan Google Service Account
- Helmet, CORS, Express Rate Limit
- libphonenumber-js (validasi dan normalisasi nomor)

## Persyaratan

- Node.js versi 20 atau lebih baru
- npm
- Google Cloud Project dengan Google Sheets API aktif
- Google Spreadsheet dan Google Service Account

## Instalasi

Dari direktori backend:

```powershell
npm install
Copy-Item .env.example .env
```

(Linux/macOS: `cp .env.example .env`.)

## Konfigurasi Environment

| Variable | Wajib | Keterangan |
|---|---|---|
| `NODE_ENV` | Ya | `development` atau `production` |
| `PORT` | Tidak | Port backend, default 3000 |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Ya | ID Google Spreadsheet |
| `GOOGLE_SHEETS_SHEET_NAME` | Tidak | Nama worksheet, default `Demo Requests` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY` | Ya* | Kredensial service account (disarankan untuk hosting) |
| `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Ya* | Alternatif: path berkas JSON, relatif terhadap folder `backend` |
| `CORS_ORIGINS` | Ya | Domain frontend persis, dipisah koma |
| `WHATSAPP_NUMBER` | Ya | Nomor WhatsApp bisnis, kode negara tanpa `+`, contoh `6281234567890` |
| `TRUST_PROXY` | Lihat bawah | Jumlah proxy di depan aplikasi, default 0 |
| `RATE_LIMIT_WINDOW_MS` | Tidak | Jendela rate limit (ms), default 900000 |
| `PUBLIC_RATE_LIMIT_MAX` | Tidak | Batas `POST /api/demo-requests` per jendela, default 10 |
| `LINK_RATE_LIMIT_MAX` | Tidak | Batas `GET /api/whatsapp-link` per jendela, default 60 |

\*Pilih salah satu cara kredensial.

Gunakan `.env.example` sebagai template. Berkas `.env` tidak boleh di-commit.

### TRUST_PROXY

Jika backend berjalan di belakang reverse proxy atau load balancer (Nginx, Cloudflare,
Render, Railway, dan sejenisnya), isi `TRUST_PROXY` dengan jumlah proxy di depan
aplikasi, biasanya `1`. Jika dibiarkan `0`, semua pengunjung terlihat berasal dari satu
IP dan berbagi satu kuota rate limit. Jika berjalan tanpa proxy, biarkan `0`. Jangan isi
lebih besar dari jumlah proxy sebenarnya.

## Google Sheets Setup

1. Buat Google Cloud Project dan aktifkan Google Sheets API.
2. Buat Service Account, lalu buat key JSON.
3. Cara kredensial, pilih salah satu:
   - Isi `GOOGLE_SERVICE_ACCOUNT_EMAIL` dan `GOOGLE_PRIVATE_KEY` (nilai `\n` literal diterima), atau
   - Simpan JSON di `backend/credentials/` dan isi `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`.
     Folder ini diabaikan Git.
4. Bagikan spreadsheet ke email Service Account dengan akses **Editor**.
5. Isi `GOOGLE_SHEETS_SPREADSHEET_ID` dan nama worksheet di `.env`.

## Struktur Spreadsheet

Gunakan worksheet kosong. Backend memeriksa baris 1 dan **menimpanya** dengan header
berikut jika tidak cocok.

| Kolom | Keterangan |
|---|---|
| ID | Nomor urut pengajuan |
| Timestamp | Waktu data diterima (WIB) |
| Nama | Nama pemohon |
| Organisasi | Nama organisasi |
| Email | Email pemohon (huruf kecil) |
| WhatsApp | Nomor dalam format internasional, contoh `+6281234567890` |
| Waktu Demo | Preferensi waktu demo |
| Status | Awalnya `new` |

## Menjalankan

```powershell
npm run dev    # pengembangan (nodemon)
npm start      # produksi
npm test       # tes
```

## API Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/health` | Status backend |
| POST | `/api/demo-requests` | Membuat pengajuan demo |
| GET | `/api/whatsapp-link` | Tautan chat WhatsApp umum |

### POST /api/demo-requests

```json
{
  "name": "Deni",
  "organization": "Contoh Organisasi",
  "email": "deni@example.com",
  "whatsapp": "081234567890",
  "preferred_time": "Pagi"
}
```

Semua field wajib. Field lain ditolak. `preferred_time`: `Fleksibel`, `Pagi`, `Siang`, `Sore`.
Nomor tanpa kode negara dianggap nomor Indonesia dan disimpan sebagai E.164.

Respons berhasil (`201`):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Deni",
    "organization": "Contoh Organisasi",
    "email": "deni@example.com",
    "whatsapp": "+6281234567890",
    "preferred_time": "Pagi",
    "status": "new",
    "created_at": "9 November 2026 ( 10:30:00 WIB )",
    "whatsapp_url": "https://wa.me/6281234567890?text=..."
  }
}
```

### GET /api/whatsapp-link

Mengembalikan `{ "success": true, "data": { "whatsapp_url": "..." } }`.
Membalas `503` (`WHATSAPP_NOT_CONFIGURED`) jika `WHATSAPP_NUMBER` kosong.

### Format error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Format email tidak valid.",
    "details": { "field": "email" }
  }
}
```

Kode yang dipakai: `VALIDATION_ERROR`, `INVALID_JSON`, `CORS_ORIGIN_DENIED`,
`PAYLOAD_TOO_LARGE`, `RATE_LIMITED`, `WHATSAPP_NOT_CONFIGURED`, `NOT_FOUND`, `INTERNAL_ERROR`.

Spesifikasi lengkap: `docs/openapi.yaml`.

## Security

- Kredensial Google dan `.env` tidak boleh masuk repository.
- CORS memakai daftar putih origin.
- Rate limiting pada endpoint publik; body dibatasi 16 KB.
- Semua input divalidasi ulang di server sebelum ditulis ke Sheets.
- Data ditulis dengan `valueInputOption: RAW`, sehingga isi sel tidak dieksekusi sebagai formula.
  Jika data diekspor ke CSV lalu dibuka di Excel, tetap berhati-hati terhadap sel yang diawali `=`, `+`, `-`, atau `@`.

## Batasan

- Pembuatan ID memakai antrean dalam satu proses. Jalankan **satu instance** saja; untuk
  lebih dari satu, ganti skema ID menjadi acak.
- Tidak ada Admin Page, autentikasi admin, database, atau CRUD demo request.
  Data hanya dikirim ke Google Sheets.