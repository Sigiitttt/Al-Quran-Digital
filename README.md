
<div align="center">

# ☪ Al-Quran Digital

**Aplikasi Al-Quran digital modern yang ringan, indah, dan dioptimasi untuk semua perangkat.**

<img width="1608" height="857" alt="image" src="https://github.com/user-attachments/assets/c672600d-1dfb-4d8e-877a-60d607cf0d7f" />


[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](#-progressive-web-app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

<img src="https://img.shields.io/badge/📖_114_Surah-8b2cf5?style=for-the-badge" alt="114 Surah"/>
<img src="https://img.shields.io/badge/🤲_37%2B_Doa-a245fa?style=for-the-badge" alt="37+ Doa"/>
<img src="https://img.shields.io/badge/🕌_25_Kisah_Nabi-c97aff?style=for-the-badge" alt="25 Kisah Nabi"/>
<img src="https://img.shields.io/badge/📿_Dzikir_Counter-d4a0ff?style=for-the-badge" alt="Dzikir Counter"/>

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [API yang Digunakan](#-api-yang-digunakan)
- [Optimasi Performa](#-optimasi-performa)
- [Progressive Web App](#-progressive-web-app)
- [Kredit](#-kredit)

---

## 📖 Tentang Proyek

**Al-Quran Digital** adalah aplikasi web single-page yang menyediakan akses lengkap ke Al-Quran, kumpulan doa harian, kisah para nabi & rasul, dan penghitung dzikir digital — semuanya dalam satu aplikasi modern dengan antarmuka yang indah.

Dibangun dengan fokus pada:
- 🎨 **Desain premium** — dark mode dengan efek aurora, glassmorphism, dan animasi halus
- ⚡ **Performa optimal** — sistem deteksi performa 3 tier yang menyesuaikan animasi berdasarkan kemampuan perangkat
- 📱 **Mobile-first** — dioptimasi untuk semua merek HP (Samsung, Xiaomi, Oppo, iPhone, dll)
- ♿ **Aksesibilitas** — mendukung `prefers-reduced-motion` dan safe-area untuk layar berlubang/notch

---

## ✨ Fitur Utama

### 📖 Baca Al-Quran
- 114 surah lengkap dengan terjemahan Bahasa Indonesia
- 6.236 ayat dengan teks Arab, latin, dan terjemahan
- Audio murottal per ayat dari reciter pilihan
- Navigasi antar surah yang mudah
- Informasi detail surah (tempat turun, jumlah ayat, dll)

### 🤲 Kumpulan Doa
- 37+ doa harian lengkap
- Teks Arab, latin, dan artinya
- Pencarian doa dengan debounce
- Detail doa dengan tampilan yang indah

### 🕌 Kisah Nabi & Rasul
- 25 kisah nabi dan rasul
- Narasi lengkap dan inspiratif
- Card-based navigation yang responsif

### 📿 Penghitung Dzikir
- Counter digital dengan target (33, 100, 1000)
- Feedback getaran (vibration API) saat target tercapai
- Animasi visual saat menghitung
- Reset dan ganti target dengan mudah

### 🎨 Pengalaman Visual
- Background langit malam dengan bintang berkedip
- Aurora blobs dengan efek glassmorphism
- Shooting stars & floating particles
- Bismillah ring ornament dengan animasi halus
- Smooth page transitions dengan Framer Motion

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **React** | 19 | UI Library |
| **TypeScript** | 5.7 | Type Safety |
| **Vite** | 6 | Build Tool & Dev Server |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Framer Motion** | 12 | Animasi & Transisi |
| **React Router** | 7 | Client-side Routing |
| **Vite PWA Plugin** | 1.0 | Progressive Web App |
| **Workbox** | - | Service Worker & Caching |

---

## 🌐 API yang Digunakan

Aplikasi ini menggunakan **3 API publik** yang di-proxy melalui Vite dev server untuk menghindari masalah CORS:

| API | Proxy Path | Sumber |
|---|---|---|
| **Al-Quran** | `/api-quran` | [equran.id](https://equran.id) |
| **Doa Harian** | `/api-doa` | [doa-doa-api](https://doa-doa-api-ahmadramadhan.fly.dev) |
| **Kisah Nabi** | `/api-kisah` | [kisah-nabi-api](https://kisah-nabi-api.vercel.app) |

---

## ⚡ Optimasi Performa

### 🎯 Sistem 3-Tier Performance

Homepage menggunakan **sistem deteksi performa otomatis** yang menyesuaikan jumlah animasi berdasarkan kemampuan perangkat:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE DETECTION                        │
│                                                                 │
│  📊 CPU Cores (navigator.hardwareConcurrency)                   │
│  💾 RAM (navigator.deviceMemory)                                │
│  📶 Connection Speed (navigator.connection.effectiveType)       │
│  📱 Screen Width (window.innerWidth)                            │
│  🔋 Data Saver Mode (navigator.connection.saveData)             │
└─────────────────────────────────────────────────────────────────┘
```

| Elemen | 🖥️ HIGH (Laptop) | 📱 MEDIUM (HP Normal) | 📱 LOW (HP Low-end) |
|---|:---:|:---:|:---:|
| Bintang | 80 | 25 | 10 |
| Partikel | 18 | 8 | 3 |
| Shooting Star | 12 | 5 | 2 |
| Aurora Blob | 4 (blur 70px) | 2 (blur 35px) | Statis (blur 20px) |
| Scan Line | ✅ | ❌ | ❌ |
| Grid Pattern | ✅ | ✅ | ❌ |

### 🎞️ CSS vs JavaScript Animations

Semua animasi **dekoratif berulang** (bintang, partikel, aurora) menggunakan CSS `@keyframes` dengan `translate3d()` untuk GPU acceleration — bukan JavaScript/Framer Motion yang menghitung posisi setiap frame.

Framer Motion hanya digunakan untuk **animasi entrance sekali jalan** (page load).

### 📱 Cross-Device Support

| Fitur | Fungsi |
|---|---|
| `viewport-fit=cover` | Notched phones (iPhone X+, Samsung punch-hole) |
| `env(safe-area-inset-*)` | Padding aman untuk layar berlubang |
| `touch-action: manipulation` | Hilangkan 300ms tap delay |
| `-webkit-tap-highlight-color` | Hapus highlight biru (Android) |
| `@media (hover: none)` | Ganti hover → `:active` untuk touch |
| `@media (max-width: 380px)` | Extra ringan untuk HP kecil |
| `prefers-reduced-motion` | Respect aksesibilitas OS |
| `overscroll-behavior-y` | Kontrol scroll bounce |

---

## 📲 Progressive Web App

Aplikasi ini mendukung **PWA** (Progressive Web App) — bisa di-install di HP seperti aplikasi native:

- ✅ Installable (Add to Home Screen)
- ✅ Standalone display (tanpa address bar)
- ✅ Auto-update via Workbox service worker
- ✅ Offline caching untuk aset statis
- ✅ Custom icons (192x192, 512x512)

---

## 🙏 Kredit

**Dibuat oleh [Sigit Aringga](https://github.com/Sigiitttt)**

### Sumber Data
- Al-Quran API — [equran.id](https://equran.id)
- Doa Harian API — [Ahmad Ramadhan](https://github.com/AhmadRamadworking)
- Kisah Nabi API — [kisah-nabi-api](https://kisah-nabi-api.vercel.app)

### Teknologi
- [React](https://react.dev/) — Meta
- [Vite](https://vite.dev/) — Evan You & contributors
- [Tailwind CSS](https://tailwindcss.com/) — Adam Wathan & team
- [Framer Motion](https://www.framer.com/motion/) — Framer
- Font: [Sora](https://fonts.google.com/specimen/Sora) & [Amiri](https://fonts.google.com/specimen/Amiri)

---

<div align="center">

**Al-Quran Digital** © 2025 — Sigit 

*بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ*
**dilarang menduplikasi**

</div>

```
