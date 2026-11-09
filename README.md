# DREAMS Landing Page

Landing page company profile DREAMS App yang menyediakan informasi produk dan formulir permintaan demo.

## Teknologi

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Integrasi:** Google Sheets API
- **Security:** Helmet, CORS, Rate Limiting
- **Styling:** CSS

## Struktur Project

```text
DREAMS APP LANDING PAGE/
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   ├── tests/
│   ├── docs/
│   ├── .env.example
│   └── package.json
├── docs/
└── README.md
```

> Folder `backend/credentials/` hanya dipakai secara lokal bila memakai berkas JSON
> service account. Folder ini diabaikan Git dan tidak ikut repositori.

## Fitur

- Company profile DREAMS App
- Informasi fitur dan layanan
- Formulir permintaan demo
- Pengiriman data demo request ke Google Sheets
- Tautan chat WhatsApp (umum dan konfirmasi setelah pengajuan demo)
- API health check
- Validasi input di server (termasuk nomor WhatsApp, disimpan dalam format E.164) dan rate limiting

## Persiapan

Pastikan sudah tersedia:

- Node.js versi 20 atau lebih baru
- npm
- Google Spreadsheet
- Google Cloud Service Account dengan akses Google Sheets API
  (spreadsheet dibagikan ke email service account dengan akses Editor)

## Menjalankan Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Isi `.env` frontend: `<<ISI: nama variabel alamat API, sesuai frontend/.env.example>>`.
Frontend berjalan melalui URL yang ditampilkan oleh Vite.

## Menjalankan Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

(Linux/macOS: `cp .env.example .env`.)

Isi `.env` sesuai tabel di bawah, lalu jalankan:

```powershell
npm run dev      # pengembangan (nodemon)
npm start        # produksi
npm test         # menjalankan tes
```

### Variabel environment backend

| Variabel | Wajib | Keterangan |
|---|---|---|
| `NODE_ENV` | Ya | `development` atau `production` |
| `PORT` | Tidak | Default 3000 |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Ya | ID spreadsheet tujuan |
| `GOOGLE_SHEETS_SHEET_NAME` | Tidak | Default `Demo Requests` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY` | Ya* | Kredensial service account (disarankan untuk hosting) |
| `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Ya* | Alternatif: path berkas JSON, relatif terhadap folder `backend` |
| `CORS_ORIGINS` | Ya | Domain frontend persis, dipisah koma, contoh `https://dreams.example.com` |
| `WHATSAPP_NUMBER` | Ya | Nomor WhatsApp bisnis, kode negara tanpa `+`, contoh `6281234567890` |
| `TRUST_PROXY` | Lihat bawah | Jumlah proxy di depan aplikasi |
| `RATE_LIMIT_WINDOW_MS`, `PUBLIC_RATE_LIMIT_MAX`, `LINK_RATE_LIMIT_MAX` | Tidak | Batas permintaan |

\*Pilih salah satu cara kredensial.

### TRUST_PROXY (penting untuk produksi)

Jika backend berjalan di belakang reverse proxy atau load balancer
(Nginx, Cloudflare, Render, Railway, dan sejenisnya), isi `TRUST_PROXY` dengan jumlah
proxy di depan aplikasi, biasanya `1`. Jika dibiarkan `0`, semua pengunjung terlihat
berasal dari satu IP dan berbagi satu kuota rate limit. Jika berjalan langsung tanpa
proxy, biarkan `0`. Jangan isi lebih besar dari jumlah proxy sebenarnya.

### Batasan

Pembuatan ID pengajuan memakai antrean dalam satu proses, jadi jalankan satu instance
backend saja. Jika perlu lebih dari satu, ganti skema ID menjadi acak.

## API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/health` | Memeriksa status backend |
| POST | `/api/demo-requests` | Mengirim permintaan demo, mengembalikan data dan `whatsapp_url` |
| GET | `/api/whatsapp-link` | Tautan chat WhatsApp umum |

Dokumentasi lengkap: `backend/docs/openapi.yaml`

## Environment dan Credential

- `.env` berisi konfigurasi lokal dan tidak boleh di-commit.
- `.env.example` adalah template konfigurasi yang boleh masuk Git.
- Credential Google Service Account tidak boleh dibagikan atau di-commit.
- Untuk produksi, pemilik sistem membuat project Google Cloud, service account, dan
  spreadsheet sendiri, lalu mengisi variabelnya di environment hosting.

## Dokumentasi

- [Backend Setup](backend/README.md)
- [Panduan Belajar](docs/panduan-belajar.md)
- [OpenAPI Specification](backend/docs/openapi.yaml)