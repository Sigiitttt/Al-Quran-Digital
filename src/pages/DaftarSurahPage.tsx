// src/pages/DaftarSurahPage.tsx

import SurahContainer from "../components/Surah/SurahContainer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DaftarSurahPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(162,69,250,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,44,245,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Sticky Nav ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 px-6 md:px-10 py-3.5"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(1, 4, 9, 0.7)",
          borderBottom: "1px solid rgba(48, 54, 61, 0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-text-secondary hover:text-primary text-sm transition-colors duration-300"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Menu Utama</span>
          </Link>
          <p className="text-text-secondary/30 text-xs font-medium tracking-[0.25em] uppercase">
            Al-Quran Digital
          </p>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative z-10 px-6 md:px-10 pt-10 md:pt-14 pb-2"
      >
        <div className="max-w-7xl mx-auto">
          {/* Bismillah */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.2 }}
            className="text-primary text-xl mb-3"
          >
            ﷽
          </motion.p>

          {/* Title + Search row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                Daftar{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #8b2cf5 0%, #a245fa 50%, #d4a0ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Surah
                </span>
              </h1>
              <p className="mt-2 text-text-secondary/60 text-sm md:text-base max-w-lg leading-relaxed">
                Pilih surah untuk mulai membaca dan memahami Al-Quran Al-Karim
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Surah", value: "114" },
                { label: "Makkiyah", value: "86" },
                { label: "Madaniyah", value: "28" },
                { label: "Ayat", value: "6.236" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    background: "rgba(48, 54, 61, 0.2)",
                    border: "1px solid rgba(48, 54, 61, 0.35)",
                    color: "rgba(139, 148, 158, 0.7)",
                  }}
                >
                  <span className="text-primary font-bold">{stat.value}</span>{" "}
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Surah Content ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 px-6 md:px-10 pt-8 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <SurahContainer />
        </div>
      </motion.main>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center pb-8">
        <div className="flex items-center gap-3 justify-center text-text-secondary/15 text-xs">
          <div className="w-8 h-px bg-text-secondary/10" />
          <span className="tracking-wider">HR. Bukhari</span>
          <div className="w-8 h-px bg-text-secondary/10" />
        </div>
      </footer>
    </div>
  );
}

export default DaftarSurahPage;