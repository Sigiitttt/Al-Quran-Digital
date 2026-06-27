// src/components/Doa/DoaContainer.tsx

import { useState, useEffect, useCallback, useRef } from "react";
import type { Doa } from "../../types/Doa";
import DoaList from "./DoaList";
import Skeleton from "../Skeleton";
import { motion, AnimatePresence } from "framer-motion";

function DoaContainer() {
  const [doas, setDoas] = useState<Doa[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [totalDoas, setTotalDoas] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchDoas = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    const url =
      query.trim() !== ""
        ? `/api-doa/api/search/${encodeURIComponent(query.trim())}`
        : "/api-doa/api";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          setDoas([]);
          return;
        }
        throw new Error("Gagal mengambil data doa.");
      }
      const data = await response.json();
      const result = Array.isArray(data) ? data : [];
      setDoas(result);
      if (query.trim() === "") setTotalDoas(result.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setDoas([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => fetchDoas(searchQuery), 400);
    return () => clearTimeout(id);
  }, [searchQuery, fetchDoas]);

  const isSearching = searchQuery.trim() !== "";

  /* ─────────────────────────────────────────── */
  return (
    <div>

      {/* ══ Stats bar ══ */}
      <AnimatePresence>
        {totalDoas !== null && !isLoading && (
          <motion.div
            key="statsbar"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="doa-stats-bar"
          >
            {/* Left: label */}
            <div className="doa-stats-bar__left">
              <div
                className="doa-stats-bar__indicator"
                style={{
                  background: "linear-gradient(to bottom, #a245fa, #c97aff)",
                }}
              />
              <span className="doa-stats-bar__text">
                {isSearching ? (
                  <>
                    <span className="text-primary/60">{doas.length}</span>
                    {" "}hasil ditemukan
                  </>
                ) : (
                  <>
                    <span className="text-primary/60">{totalDoas}</span>
                    {" "}doa tersedia
                  </>
                )}
              </span>
            </div>

            {/* Right: shortcut hint (desktop only) */}
            {!isSearching && (
              <button
                onClick={() => inputRef.current?.focus()}
                className="hidden sm:flex items-center gap-1.5 text-[10px] text-text-secondary/20 hover:text-text-secondary/40 transition-colors"
              >
                <kbd
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    background: "rgba(48,54,61,0.25)",
                    border: "1px solid rgba(48,54,61,0.4)",
                  }}
                >
                  /
                </kbd>
                <span>untuk mencari</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ Search Bar ══ */}
      <div className="doa-search-wrapper">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 0 1px rgba(162,69,250,0.3), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(162,69,250,0.04)"
              : "0 2px 12px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.25 }}
          className="doa-search relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(13, 17, 23, 0.9)",
            border: isFocused
              ? "1px solid rgba(162,69,250,0.25)"
              : "1px solid rgba(48,54,61,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: "border-color 0.25s ease",
          }}
        >
          {/* Focused glow line at top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            animate={{
              background: isFocused
                ? "linear-gradient(to right, transparent, rgba(162,69,250,0.5), rgba(201,122,255,0.5), transparent)"
                : "transparent",
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Left accent bar */}
          <motion.div
            className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
            animate={{
              background: isFocused
                ? "linear-gradient(to bottom, #a245fa, #c97aff)"
                : "transparent",
              opacity: isFocused ? 1 : 0,
              scaleY: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="doa-search__inner">
            {/* Animated search icon */}
            <motion.div
              animate={{ scale: isFocused ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex-shrink-0"
            >
              <motion.svg
                animate={{
                  stroke: isFocused ? "#a245fa" : "rgba(139,148,158,0.28)",
                }}
                transition={{ duration: 0.25 }}
                className="doa-search__icon"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </motion.svg>
            </motion.div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Cari doa harian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchQuery("");
                  inputRef.current?.blur();
                }
              }}
              className="doa-search__input"
              style={{ caretColor: "#a245fa" }}
            />

            <AnimatePresence mode="wait">
              {searchQuery ? (
                /* Clear button */
                <motion.button
                  key="clear"
                  initial={{ opacity: 0, scale: 0.7, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.7, x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="doa-search__clear-btn"
                  style={{
                    background: "rgba(48,54,61,0.35)",
                    border: "1px solid rgba(48,54,61,0.4)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="doa-search__clear-label">Hapus</span>
                </motion.button>
              ) : totalDoas !== null ? (
                /* Count pill (desktop only) */
                <motion.div
                  key="count"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{
                    background: "rgba(162,69,250,0.06)",
                    border: "1px solid rgba(162,69,250,0.1)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: "rgba(162,69,250,0.6)" }}
                  />
                  <span className="text-[11px] font-semibold text-primary/40">
                    {totalDoas}
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Subtle bottom inner line */}
          <div
            className="absolute bottom-0 left-5 right-5 h-px"
            style={{
              background: "linear-gradient(to right, transparent, rgba(48,54,61,0.2), transparent)",
            }}
          />
        </motion.div>

        {/* Search tips shown when focused + empty */}
        <AnimatePresence>
          {isFocused && !searchQuery && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="doa-search__tips">
                {["makan", "tidur", "bepergian", "hujan", "belajar", "rezeki"].map(
                  (tip) => (
                    <button
                      key={tip}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery(tip);
                      }}
                      className="doa-search__tip-btn"
                      style={{
                        background: "rgba(48,54,61,0.2)",
                        border: "1px solid rgba(48,54,61,0.3)",
                      }}
                    >
                      {tip}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══ Loading Skeletons ══ */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="skeletons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="doa-grid"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="doa-skeleton-card" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ Error State ══ */}
      <AnimatePresence>
        {!isLoading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="doa-state-center"
          >
            <div className="doa-state-card doa-state-card--error">
              <div className="doa-state-card__icon doa-state-card__icon--error">
                ⚠️
              </div>
              <div>
                <p className="text-red-400/75 text-sm font-semibold mb-1">
                  Gagal memuat doa
                </p>
                <p className="text-text-secondary/30 text-xs max-w-xs">{error}</p>
              </div>
              <motion.button
                onClick={() => fetchDoas(searchQuery)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="doa-state-card__action"
                style={{
                  background: "rgba(162,69,250,0.08)",
                  border: "1px solid rgba(162,69,250,0.15)",
                }}
              >
                Coba Lagi
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ Empty State ══ */}
      <AnimatePresence>
        {!isLoading && !error && doas.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="doa-state-center doa-state-center--empty"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="doa-state-card__icon doa-state-card__icon--empty"
              >
                {isSearching ? "🔍" : "🤲"}
              </motion.div>
              <div className="text-center px-4">
                <p className="text-text-secondary/60 text-sm font-semibold mb-1">
                  {isSearching
                    ? `Tidak ada hasil untuk "${searchQuery}"`
                    : "Belum ada doa tersedia"}
                </p>
                {isSearching && (
                  <p className="text-text-secondary/25 text-xs">
                    Coba kata kunci lain, seperti "makan" atau "tidur"
                  </p>
                )}
              </div>
              {isSearching && (
                <motion.button
                  onClick={() => setSearchQuery("")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 rounded-lg text-xs text-text-secondary/50 hover:text-text-primary transition-colors"
                  style={{
                    background: "rgba(48,54,61,0.2)",
                    border: "1px solid rgba(48,54,61,0.3)",
                  }}
                >
                  Tampilkan semua doa
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ Doa List ══ */}
      <AnimatePresence mode="wait">
        {!isLoading && !error && doas.length > 0 && (
          <motion.div
            key={isSearching ? "search-results" : "all-doas"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Search result label */}
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  key="result-label"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="doa-search-result-label"
                >
                  <div
                    className="h-px flex-1"
                    style={{
                      background: "linear-gradient(to right, rgba(162,69,250,0.15), transparent)",
                    }}
                  />
                  <span className="doa-search-result-label__text">
                    <span className="text-primary/50">{doas.length}</span> doa untuk "
                    <span className="text-text-secondary/45">{searchQuery}</span>"
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: "linear-gradient(to left, rgba(162,69,250,0.15), transparent)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <DoaList doas={doas} searchKey={isSearching ? `search-${searchQuery}` : "all"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DoaContainer;