// src/components/Surah/SurahContainer.tsx

import { useState, useEffect, useMemo } from "react";
import SurahList from "./SurahList";
import type { Surah } from "../../types/Surah";
import Skeleton from "../Skeleton";
import { motion, AnimatePresence } from "framer-motion";

function SurahContainer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://equran.id/api/v2/surat");
        if (!response.ok) throw new Error("Gagal mengambil daftar surah");
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = useMemo(() => {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/[-'\s]/g, "");
    const query = normalize(searchQuery);
    
    return surahs.filter((surah) => {
      if (!query) return true;
      return (
        normalize(surah.namaLatin).includes(query) ||
        normalize(surah.arti).includes(query) ||
        surah.nomor.toString() === searchQuery.trim()
      );
    });
  }, [surahs, searchQuery]);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-12 w-full rounded-xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div
          className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl"
          style={{
            background: "rgba(220, 38, 38, 0.06)",
            border: "1px solid rgba(220, 38, 38, 0.15)",
          }}
        >
          <span className="text-3xl">⚠️</span>
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Search Section ── */}
      <div className="mb-8">
        <div
          className="relative rounded-2xl transition-all duration-400"
          style={{
            background: "rgba(13, 17, 23, 0.8)",
            border: isFocused
              ? "1px solid rgba(162, 69, 250, 0.2)"
              : "1px solid rgba(48, 54, 61, 0.3)",
            boxShadow: isFocused
              ? "0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(162, 69, 250, 0.05)"
              : "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center px-5 py-4 gap-4">
            {/* Search icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isFocused ? "#a245fa" : "rgba(139, 148, 158, 0.35)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 transition-all duration-300"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Ketik nama surah untuk mencari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-secondary/25 focus:outline-none"
            />

            {/* Clear or shortcut hint */}
            <AnimatePresence mode="wait">
              {searchQuery ? (
                <motion.button
                  key="clear"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-text-secondary/50 hover:text-text-primary transition-colors"
                  style={{ background: "rgba(48, 54, 61, 0.4)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Hapus
                </motion.button>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-shrink-0 hidden md:flex items-center gap-1 text-text-secondary/20 text-xs"
                >
                  <span className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: "rgba(48,54,61,0.4)" }}>
                    114 surah
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search result count */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 mt-3 ml-1"
            >
              <div className="w-1 h-1 rounded-full bg-primary/50" />
              <p className="text-xs text-text-secondary/35">
                <span className="text-text-primary/70 font-medium">
                  {filteredSurahs.length}
                </span>{" "}
                hasil ditemukan
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── List / Empty ── */}
      {filteredSurahs.length > 0 ? (
        <SurahList surahs={filteredSurahs} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-text-secondary/50 text-lg font-medium mb-1">
            Surah tidak ditemukan
          </p>
          <p className="text-text-secondary/25 text-sm mb-4">
            Tidak ada hasil untuk "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-primary hover:underline underline-offset-4"
          >
            Reset pencarian
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default SurahContainer;