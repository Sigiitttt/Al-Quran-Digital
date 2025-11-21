
# Al-Quran Digital Web Application

Aplikasi web Al-Quran modern yang dirancang untuk memberikan pengalaman membaca dan mendengarkan Al-Quran yang nyaman, responsif, dan interaktif. Dibangun menggunakan ekosistem React dengan TypeScript untuk performa tinggi dan keamanan kode yang lebih baik.

<img width="1919" height="1047" alt="image" src="https://github.com/user-attachments/assets/a24c35e3-dae3-4b9e-ba72-b39d904459f4" />

## 📖 Tentang Proyek

Proyek ini adalah aplikasi *client-side* yang mengambil data Al-Quran secara real-time. Tujuan utamanya adalah menyediakan antarmuka yang bersih (clean UI) bagi pengguna untuk membaca Al-Quran di berbagai perangkat, mulai dari desktop hingga ponsel.

Aplikasi ini menerapkan pola desain **Container/Presentational** untuk memisahkan logika pengambilan data (business logic) dari komponen tampilan (UI), membuat kode lebih terstruktur dan mudah dipelihara.

## ✨ Fitur Utama

* **Daftar Surah Lengkap:** Menampilkan 114 Surah dengan informasi ringkas (nama, arti, jumlah ayat, tempat turun).
* **Detail Surah & Ayat:** Tampilan bacaan per ayat yang jelas, dilengkapi dengan transliterasi dan terjemahan bahasa Indonesia.
* **Audio Player Terintegrasi:**
    * Pemutaran audio full surah.
    * Kontrol Play/Pause yang responsif.
    * Manajemen state audio yang cerdas (otomatis berhenti saat berpindah halaman atau qari).
* **Pilihan Qari (Reciter):** Pengguna dapat mengganti suara pembaca (Qari) sesuai preferensi (mendukung berbagai ID reciter dari API).
* **Desain Responsif:** Tampilan antarmuka yang menyesuaikan ukuran layar pengguna secara otomatis.
* **Loading & Error Handling:** Indikator visual saat memuat data dan penanganan pesan error yang informatif jika terjadi gangguan jaringan.

## 🛠️ Teknologi & Tools

Proyek ini dibangun menggunakan teknologi web modern:

* **Core:** [React](https://reactjs.org/) (Library UI)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Static typing untuk keandalan kode)
* **Styling:** Tailwind CSS (Utility-first CSS framework) *[Asumsi berdasarkan class seperti 'text-red-500']*
* **Routing:** React Router DOM (Navigasi antar halaman)
* **Icons:** React Icons / SVG Assets
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)


## 🔗 Sumber Data (API)

Aplikasi ini menggunakan data dari API publik **EQuran.id**.

  * Endpoint Surah: `https://equran.id/api/v2/surat`
  * Endpoint Detail & Audio: `https://equran.id/api/v2/surat/{surahId}`

Terima kasih kepada penyedia API yang telah memungkinkan pembuatan aplikasi ini.

-----

*Dibuat dengan ❤️ untuk pembelajaran dan kebermanfaatan.*

```
