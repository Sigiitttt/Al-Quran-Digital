// src/pages/Homepage.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ── Hijri date helper ──────────────────────────────────────
function useHijriDate() {
  const [hijri, setHijri] = useState("");
  useEffect(() => {
    try {
      const d = new Date();
      const formatted = d.toLocaleDateString("id-ID-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setHijri(formatted);
    } catch {
      setHijri("");
    }
  }, []);
  return hijri;
}

// ── Menu data ──────────────────────────────────────────────
const menuItems = [
  {
    to: "/quran",
    icon: "📖",
    label: "Baca Al-Quran",
    desc: "114 surah lengkap dengan terjemahan",
    stat: "114 Surah",
    accent: true,
  },
  {
    to: "/doa",
    icon: "🤲",
    label: "Kumpulan Doa",
    desc: "Doa harian beserta latin & artinya",
    stat: "37+ Doa",
    accent: false,
  },
  {
    to: "/kisah",
    icon: "🕌",
    label: "Kisah Nabi & Rasul",
    desc: "Kisah inspiratif 25 nabi dan rasul",
    stat: "25 Nabi",
    accent: false,
  },
  {
    to: "/dzikir",
    icon: "📿",
    label: "Penghitung Dzikir",
    desc: "Counter dzikir digital praktis",
    stat: "Digital",
    accent: false,
  },
];

// ── Stagger variants ───────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

// ══════════════════════════════════════════════════════════
function Homepage() {
  const hijri = useHijriDate();

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ── Layered background glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Top center aurora */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(162,69,250,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom left */}
        <div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,44,245,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom right */}
        <div
          className="absolute bottom-0 -right-32 w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle, rgba(162,69,250,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,69,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(162,69,250,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Top bar ── */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 pt-6 pb-4"
        >
          {/* Logo mark */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: "rgba(162,69,250,0.15)",
                border: "1px solid rgba(162,69,250,0.25)",
              }}
            >
              ☪
            </div>
            <span
              className="font-bold text-sm tracking-wide"
              style={{
                background: "linear-gradient(135deg, #a245fa, #d4a0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Al-Quran Digital
            </span>
          </div>

          {/* Hijri date */}
          {hijri && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:block text-[11px] text-text-secondary/25 font-medium tracking-wide"
            >
              {hijri}
            </motion.p>
          )}
        </motion.header>

        {/* ── Hero section ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-16">

          {/* Bismillah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 text-center"
          >
            <p
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: "'Amiri', serif",
                color: "rgba(162,69,250,0.3)",
                textShadow: "0 0 40px rgba(162,69,250,0.15)",
              }}
            >
              ﷽
            </p>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-4 max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-text-primary">
              Baca, Hafal &{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #8b2cf5 0%, #a245fa 45%, #d4a0ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Amalkan
              </span>
            </h1>
            <p className="mt-4 text-text-secondary/45 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Panduan lengkap membaca Al-Quran, doa harian, dzikir, dan kisah para nabi dalam satu aplikasi.
            </p>
          </motion.div>

          {/* ── Featured + Grid layout ── */}
          <motion.div
            className="w-full max-w-4xl mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top row: Featured (Al-Quran) large + two cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

              {/* ── Featured card: Al-Quran ── */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2"
              >
                <Link to="/quran" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card homepage-card--featured h-full min-h-[180px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />
                    <div className="homepage-card__bg-glow" />

                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <div className="homepage-card__badge mb-3">
                          ✦ Unggulan
                        </div>
                        <h2 className="homepage-card__featured-title">
                          Baca Al-Quran
                        </h2>
                        <p className="homepage-card__desc mt-1.5">
                          114 surah lengkap dengan terjemahan Bahasa Indonesia
                        </p>
                      </div>
                      <span className="homepage-card__icon text-4xl ml-4 flex-shrink-0">
                        📖
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div className="relative z-10 flex items-center justify-between mt-8">
                      <div className="flex items-center gap-4 text-xs text-text-secondary/30">
                        <span>114 Surah</span>
                        <span>·</span>
                        <span>6.236 Ayat</span>
                        <span>·</span>
                        <span>Terjemahan</span>
                      </div>
                      <div className="homepage-card__arrow-wrap">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* ── Doa card ── */}
              <motion.div variants={itemVariants}>
                <Link to="/doa" className="group block h-full">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card h-full min-h-[180px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10">
                      <span className="text-3xl block mb-3">🤲</span>
                      <h2 className="homepage-card__title">Kumpulan Doa</h2>
                      <p className="homepage-card__desc mt-1">
                        Doa harian beserta latin & artinya
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-6">
                      <span className="homepage-card__stat">37+ Doa</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom row: two equal cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* ── Kisah Nabi ── */}
              <motion.div variants={itemVariants}>
                <Link to="/kisah" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card min-h-[140px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10 flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🕌</span>
                      <div>
                        <h2 className="homepage-card__title">Kisah Nabi & Rasul</h2>
                        <p className="homepage-card__desc mt-1">
                          Kisah inspiratif 25 nabi dan rasul pilihan
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-5">
                      <span className="homepage-card__stat">25 Nabi</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* ── Dzikir ── */}
              <motion.div variants={itemVariants}>
                <Link to="/dzikir" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card min-h-[140px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10 flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">📿</span>
                      <div>
                        <h2 className="homepage-card__title">Penghitung Dzikir</h2>
                        <p className="homepage-card__desc mt-1">
                          Counter dzikir digital dengan getaran
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-5">
                      <span className="homepage-card__stat">Digital</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Footer credit ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-14 text-center"
          >
            <div className="flex items-center gap-3 justify-center text-text-secondary/15 text-xs mb-1">
              <div className="w-10 h-px bg-text-secondary/10" />
              <span className="tracking-widest text-[10px] uppercase">Sigit Aringga</span>
              <div className="w-10 h-px bg-text-secondary/10" />
            </div>
            <p className="text-[10px] text-text-secondary/15 tracking-wide">
              Al-Quran Digital © 2024
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;