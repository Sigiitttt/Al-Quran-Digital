// src/pages/DetailSurahPage.tsx

import { Link } from "react-router-dom";
import DetailSurahContainer from "../components/DetailSurah/DetailSurahContainer";
import { motion } from "framer-motion";

function DetailSurahPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(162,69,250,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Nav */}
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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/quran"
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
            <span className="font-medium">Daftar Surah</span>
          </Link>
          <p className="text-text-secondary/30 text-xs font-medium tracking-[0.25em] uppercase">
            Al-Quran Digital
          </p>
        </div>
      </motion.nav>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        <DetailSurahContainer />
      </main>
    </div>
  );
}

export default DetailSurahPage;
