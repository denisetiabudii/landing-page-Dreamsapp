# DREAMS Frontend

Frontend landing page dan interface pengajuan demo aplikasi DREAMS.

## Technology Stack

- React 19
- Vite 8
- Lucide React

## Requirements

- Node.js 20+
- npm

## Setup

Install dependencies:

```bash
npm ci
```

Copy `.env.example` menjadi `.env` dan atur API URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Preview Production Build

```bash
npm run preview
```

## API Integration

Frontend menggunakan `VITE_API_BASE_URL` untuk mengakses backend DREAMS.

Pastikan backend aktif dan konfigurasi CORS mengizinkan origin frontend.

## Deployment

Production build tersedia pada folder `dist/`.

Konfigurasi hosting, domain, reverse proxy, dan deployment production ditentukan oleh tim IT.

### Variabel environment

| Variabel | Contoh | Keterangan |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000/api` | Alamat API, **sudah termasuk `/api`** |

Di produksi isi dengan alamat publik backend, contoh `https://api.contoh.com/api`.
Nilai `VITE_*` ditanam ke hasil build dan terlihat oleh siapa pun, jadi jangan isi
rahasia. Ubah nilainya, lalu jalankan `npm run build` ulang.

Domain frontend produksi harus didaftarkan di `CORS_ORIGINS` pada backend.

### SPA routing

`public/_redirects` mengarahkan semua path ke `index.html` (format Netlify). Jika
memakai hosting lain, buat aturan setara (misalnya `try_files` di Nginx).