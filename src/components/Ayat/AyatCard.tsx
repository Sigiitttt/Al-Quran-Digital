// src/components/Ayat/AyatCard.tsx

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Ayat } from "../../types/Surah";

// Convert Western digits to Arabic-Indic numerals (١٢٣)
function toArabicNum(n: number): string {
  return n.toString().replace(/[0-9]/g, (d) =>
    String.fromCharCode(0x0660 + parseInt(d))
  );
}

type AyatCardProps = {
  ayat: Ayat;
  index?: number;
};

function AyatCard({ ayat, index = 0 }: AyatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslit, setShowTranslit] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = ayat.audio?.["05"] || ayat.audio?.[Object.keys(ayat.audio)[0]];

  function handlePlayPause() {
    if (!audioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(10, 12, 18, 0.55)",
        border: "1px solid rgba(162, 69, 250, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      whileHover={{
        borderColor: "rgba(162, 69, 250, 0.22)",
        boxShadow: "0 0 32px rgba(162, 69, 250, 0.06), 0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top accent glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(162,69,250,0.5), transparent)",
        }}
      />

      <div className="p-5 md:p-6">
        {/* ── Header row ── */}
        <div className="flex items-center justify-between mb-6">
          {/* Number badge */}
          <div className="flex items-center gap-3">
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(162,69,250,0.18) 0%, rgba(100,30,180,0.12) 100%)",
                border: "1px solid rgba(162,69,250,0.25)",
                boxShadow: "0 0 12px rgba(162,69,250,0.1)",
              }}
            >
              {/* Rotating corner accent */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "conic-gradient(from 0deg, transparent 70%, rgba(162,69,250,0.3) 85%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <span
                className="relative z-10 text-xs font-bold"
                style={{ color: "rgba(162,69,250,0.9)" }}
              >
                {ayat.nomorAyat}
              </span>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: "rgba(162,69,250,0.45)" }}>
                Ayat
              </p>
              <p className="text-[11px] text-text-secondary/30 font-medium">
                ke-{ayat.nomorAyat}
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Transliteration toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowTranslit((v) => !v)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wide transition-all duration-200"
              style={{
                background: showTranslit ? "rgba(162,69,250,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${showTranslit ? "rgba(162,69,250,0.25)" : "rgba(255,255,255,0.06)"}`,
                color: showTranslit ? "rgba(162,69,250,0.7)" : "rgba(255,255,255,0.2)",
              }}
            >
              Latin
            </motion.button>

            {/* Audio play button */}
            {audioUrl && (
              <motion.button
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.08 }}
                onClick={handlePlayPause}
                className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: isPlaying
                    ? "rgba(162,69,250,0.25)"
                    : "rgba(162,69,250,0.08)",
                  border: `1px solid ${isPlaying ? "rgba(162,69,250,0.5)" : "rgba(162,69,250,0.15)"}`,
                  boxShadow: isPlaying ? "0 0 12px rgba(162,69,250,0.25)" : "none",
                }}
                title={isPlaying ? "Pause" : "Putar audio ayat ini"}
              >
                {/* Pulse ring when playing */}
                {isPlaying && (
                  <motion.span
                    className="absolute inset-0 rounded-lg"
                    style={{ border: "1px solid rgba(162,69,250,0.4)" }}
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                {isPlaying ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(162,69,250,0.9)">
                    <rect x="5" y="4" width="4" height="16" rx="1"/>
                    <rect x="15" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(162,69,250,0.7)">
                    <path d="M5 3l14 9-14 9V3z"/>
                  </svg>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* ── Arabic text + verse number ornament (flex row) ── */}
        <div className="flex items-center gap-4 mb-6">
          {/* Verse number ornament — right side, inline with text */}
          <div
            className="relative flex-shrink-0 flex items-center justify-center self-center"
            style={{ width: 38, height: 38 }}
          >
            <svg
              viewBox="0 0 38 38"
              width="38"
              height="38"
              className="absolute inset-0"
            >
              <circle
                cx="19" cy="19" r="16"
                fill="rgba(162,69,250,0.05)"
                stroke="rgba(162,69,250,0.35)"
                strokeWidth="1"
              />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const r1 = 13.5, r2 = 16;
                return (
                  <line
                    key={i}
                    x1={19 + r1 * Math.cos(angle)}
                    y1={19 + r1 * Math.sin(angle)}
                    x2={19 + r2 * Math.cos(angle)}
                    y2={19 + r2 * Math.sin(angle)}
                    stroke="rgba(162,69,250,0.25)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
            <span
              className="relative z-10 text-[12px] font-bold leading-none select-none"
              style={{
                fontFamily: "'Amiri', serif",
                color: "rgba(162,69,250,0.8)",
              }}
            >
              {toArabicNum(ayat.nomorAyat)}
            </span>
          </div>

          {/* Arabic text — flex-1, right aligned */}
          <p
            className="flex-1 text-right leading-[2.6] text-text-primary"
            style={{
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              letterSpacing: "0.03em",
              textShadow: "0 0 30px rgba(162,69,250,0.08)",
            }}
          >
            {ayat.teksArab}
          </p>
        </div>

        {/* ── Separator ── */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(to right, rgba(162,69,250,0.15), rgba(162,69,250,0.03))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(162,69,250,0.3)" }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(to left, rgba(162,69,250,0.15), rgba(162,69,250,0.03))",
            }}
          />
        </div>

        {/* ── Transliteration ── */}
        <AnimatePresence>
          {showTranslit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p
                className="text-sm leading-relaxed mb-3 italic"
                style={{ color: "rgba(162,69,250,0.45)" }}
              >
                {ayat.teksLatin}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Translation ── */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(200, 200, 220, 0.65)" }}
        >
          <span
            className="mr-1 font-semibold text-[10px] uppercase tracking-wider"
            style={{ color: "rgba(162,69,250,0.35)" }}
          >
            Artinya:
          </span>
          {ayat.teksIndonesia}
        </p>
      </div>
    </motion.div>
  );
}

export default AyatCard;