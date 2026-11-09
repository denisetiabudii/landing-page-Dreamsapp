
# Panduan Belajar DREAMS Landing Page

Panduan ini menjelaskan alur kerja project DREAMS Landing Page agar developer dapat memahami struktur dan implementasi aplikasi.

## 1. Memahami Frontend

Frontend menggunakan React dan Vite.

Pelajari:

- Struktur folder `frontend/src`
- React Components
- Props dan State
- React Hooks
- Form Handling
- Fetch API
- CSS dan Responsive Design

Alur formulir demo request:

1. Pengguna mengisi formulir (nama, organisasi, email, WhatsApp, waktu demo).
2. Frontend melakukan validasi awal agar pengguna cepat mendapat umpan balik.
3. Frontend mengirim request ke backend.
4. Backend memvalidasi ulang. Validasi di frontend tidak bisa dipercaya, karena
   request bisa dikirim tanpa melewati frontend.
5. Backend menyimpan data ke Google Sheets dan mengembalikan `whatsapp_url`.
6. Frontend menampilkan status pengiriman dan tautan konfirmasi WhatsApp.

## 2. Memahami Backend

Backend menggunakan Node.js dan Express.

Pelajari:

- ES Modules
- Express Router
- Controller
- Model
- Middleware
- Environment Variables
- Error Handling
- API Validation

Alur request:

```text
Frontend
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
Model
   |
   v
Google Sheets API
   |
   v
Google Spreadsheet
```

Urutan middleware di `src/app.mjs` penting: `helmet`, `cors`, lalu `express.json`
dipasang sebelum route. Rate limiter dipasang per route di `src/routes`.
Format respons sukses dan error dibuat seragam (lihat `docs/openapi.yaml`).

## 3. Memahami Google Sheets API

Google Sheets digunakan sebagai penyimpanan data demo request.

Pelajari:

- Google Cloud Project
- Google Sheets API
- Service Account
- Credential JSON
- Spreadsheet ID
- Append Values
- Header Validation

Credential Google Service Account bersifat rahasia dan tidak boleh dibagikan.

## 4. Memahami Environment Variables

Konfigurasi backend disimpan pada file `.env`.

Template konfigurasi tersedia pada `.env.example`.

Environment Variables digunakan untuk mengatur:

- Port backend
- Google Spreadsheet dan Service Account
- CORS (`CORS_ORIGINS`)
- Rate limiting dan `TRUST_PROXY`
- Nomor WhatsApp bisnis (`WHATSAPP_NUMBER`)

Jangan menyimpan credential atau nilai rahasia di dalam source code.

## 5. Testing dan Debugging

Jalankan backend:

```powershell
npm run dev
```

Jalankan test:

```powershell
npm test
```

Periksa health check:

```text
GET /health
```

Setelah mengubah kode, jalankan `npm test`. Tes memakai model palsu, sehingga tidak
menyentuh Google Sheets sungguhan.

Gunakan browser Developer Tools untuk memeriksa request frontend, response API, dan error pada console.

## 6. Dokumentasi API

Spesifikasi API tersedia pada:

`backend/docs/openapi.yaml`

Gunakan dokumentasi tersebut sebagai acuan endpoint, request body, response, dan HTTP status code.

## 7. Git

Periksa perubahan:

```powershell
git status
```

Periksa file yang akan di-commit:

```powershell
git diff --cached
```

Pastikan `.env` dan credential JSON tidak masuk ke commit.
