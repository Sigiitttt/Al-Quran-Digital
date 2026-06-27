// src/pages/DetailDoaPage.tsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Doa } from "../types/Doa";
import { motion, AnimatePresence } from "framer-motion";

function DetailDoaPage() {
  const { idDoa } = useParams<{ idDoa: string }>();
  const [doa, setDoa] = useState<Doa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailDoa = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api-doa/api/${idDoa}`);
        if (!response.ok) throw new Error("Gagal mengambil detail doa.");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDoa(data[0]);
        } else {
          throw new Error("Doa tidak ditemukan.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchDetailDoa();
  }, [idDoa]);

  return (
    <div className="min-h-screen relative">

      {/* ── Background glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "min(700px, 100vw)",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(162,69,250,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0"
          style={{
            width: "min(500px, 70vw)",
            height: "min(500px, 70vw)",
            background:
              "radial-gradient(circle, rgba(139,44,245,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Sticky Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 doa-page-nav"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(1, 4, 9, 0.75)",
          borderBottom: "1px solid rgba(48, 54, 61, 0.28)",
        }}
      >
        <div className="doa-detail-container flex items-center justify-between">
          <Link
            to="/doa"
            className="group flex items-center gap-1.5 text-text-secondary hover:text-primary text-sm transition-colors duration-300"
          >
            <svg
              width="16"
              height="16"
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
            <span className="font-medium doa-page-nav__back-text">Daftar Doa</span>
          </Link>

          {/* Breadcrumb (hidden on small phones) */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-text-secondary/25">
            <span>Doa Harian</span>
            <span>/</span>
            <span className="text-text-secondary/40 max-w-[150px] truncate">
              {doa ? doa.doa : `Doa #${idDoa}`}
            </span>
          </div>
        </div>
      </motion.nav>

      {/* ── Loading state ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
              className="w-8 h-8 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "rgba(162,69,250,0.6)",
                borderRightColor: "rgba(162,69,250,0.2)",
              }}
            />
            <p className="text-text-secondary/30 text-sm">Memuat doa...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Error state ── */}
      <AnimatePresence>
        {!loading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
          >
            <div
              className="inline-flex flex-col items-center gap-4 px-6 py-6 sm:px-10 sm:py-8 rounded-2xl"
              style={{
                background: "rgba(220,38,38,0.04)",
                border: "1px solid rgba(220,38,38,0.1)",
              }}
            >
              <span className="text-3xl">⚠️</span>
              <p className="text-red-400/70 text-sm font-medium text-center">{error}</p>
              <Link
                to="/doa"
                className="text-xs text-primary/60 hover:text-primary transition-colors"
              >
                ← Kembali ke daftar doa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Doa Detail Content ── */}
      <AnimatePresence>
        {!loading && doa && (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="relative z-10 doa-detail-content"
          >
            <div className="doa-detail-container">

              {/* ── Card container ── */}
              <div
                className="doa-detail-card"
                style={{
                  background: "rgba(13,17,23,0.8)",
                  border: "1px solid rgba(48,54,61,0.3)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,122,255,0.06)",
                }}
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(162,69,250,0.5), rgba(201,122,255,0.5), transparent)",
                  }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(162,69,250,0.1), transparent 70%)",
                  }}
                />

                {/* ── Header: icon + title ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="doa-detail-card__header"
                >
                  <div
                    className="doa-detail-card__icon-box"
                    style={{
                      background: "rgba(162,69,250,0.1)",
                      border: "1px solid rgba(162,69,250,0.2)",
                      boxShadow: "0 0 20px rgba(162,69,250,0.08)",
                    }}
                  >
                    🤲
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="doa-detail-card__label">
                      Doa #{doa.id}
                    </p>
                    <h1 className="doa-detail-card__title">
                      {doa.doa}
                    </h1>
                  </div>
                </motion.div>

                {/* ── Divider ── */}
                <div
                  className="h-px w-full doa-detail-card__divider-spacing"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(162,69,250,0.2), rgba(48,54,61,0.2), transparent)",
                  }}
                />

                {/* ── Arabic text ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="doa-detail-card__arabic-section"
                >
                  <div
                    className="doa-detail-card__arabic-box"
                    style={{
                      background: "rgba(162,69,250,0.03)",
                      border: "1px solid rgba(162,69,250,0.08)",
                    }}
                  >
                    <p
                      className="doa-detail-card__arabic-text"
                      style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                      lang="ar"
                      dir="rtl"
                    >
                      {doa.ayat}
                    </p>
                  </div>
                </motion.div>

                {/* ── Latin / Transliteration ── */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="doa-detail-card__latin-section"
                >
                  <p className="doa-detail-card__latin-text">
                    {doa.latin}
                  </p>
                </motion.div>

                {/* ── Divider ── */}
                <div
                  className="h-px w-full doa-detail-card__divider-spacing--small"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(48,54,61,0.3), transparent)",
                  }}
                />

                {/* ── Meaning ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <p className="doa-detail-card__meaning-label">
                    Artinya
                  </p>
                  <p className="doa-detail-card__meaning-text">
                    <span className="text-primary/60">"</span>
                    {doa.artinya}
                    <span className="text-primary/60">"</span>
                  </p>
                </motion.div>
              </div>

              {/* ── Navigation footer ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="doa-detail-nav-footer"
              >
                <Link
                  to="/doa"
                  className="group flex items-center gap-2 text-text-secondary/40 hover:text-primary/80 text-sm transition-colors duration-300"
                >
                  <svg
                    width="14"
                    height="14"
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
                  <span>Kembali ke daftar</span>
                </Link>

                {/* Footer ornament */}
                <div className="flex items-center gap-2 text-text-secondary/15 text-xs">
                  <div className="w-6 h-px bg-text-secondary/10" />
                  <span className="text-[10px] tracking-wider">🤲</span>
                  <div className="w-6 h-px bg-text-secondary/10" />
                </div>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DetailDoaPage;