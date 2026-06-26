// src/components/Surah/SurahCard.tsx

import { Link } from "react-router-dom";
import type { Surah } from "../../types/Surah";
import { motion, type Variants } from "framer-motion";

type SurahCardProps = {
  surah: Surah;
  index: number;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

function SurahCard({ surah }: SurahCardProps) {
  return (
    <motion.div variants={itemVariants} whileTap={{ scale: 0.97 }}>
      <Link to={`/surah/${surah.nomor}`} className="block group">
        <div className="surah-card">
          {/* Top glow line */}
          <div className="surah-card__glow-line" />

          {/* Hover background glow */}
          <div className="surah-card__bg-glow" />

          {/* ── Row 1: Number + Names ── */}
          <div className="flex items-center gap-4 relative z-10">
            {/* Number */}
            <div className="flex-shrink-0 w-12 h-12 relative">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <polygon
                  points="24,3 43,14 43,34 24,45 5,34 5,14"
                  className="surah-card__hex"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                {surah.nomor}
              </span>
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h3 className="text-text-primary font-semibold text-base leading-tight group-hover:text-primary transition-colors duration-300 truncate">
                {surah.namaLatin}
              </h3>
              <p className="text-text-secondary/45 text-[13px] mt-0.5 truncate">
                {surah.arti}
              </p>
            </div>

            {/* Arabic */}
            <p className="flex-shrink-0 text-[28px] leading-none font-bold text-text-secondary/25 group-hover:text-primary/60 transition-colors duration-500">
              {surah.nama}
            </p>
          </div>

          {/* ── Row 2: Meta ── */}
          <div className="relative z-10 flex items-center justify-between mt-4 pt-3 surah-card__meta-border">
            <div className="flex items-center gap-3">
              {/* Location */}
              <span className="surah-card__badge">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background:
                      surah.tempatTurun === "MEKAH" ? "#8b949e" : "#6e7681",
                    boxShadow: "none",
                  }}
                />
                {surah.tempatTurun}
              </span>

              <span className="text-text-secondary/30 text-xs">•</span>

              {/* Ayat count */}
              <span className="text-text-secondary/35 text-xs font-medium">
                {surah.jumlahAyat} Ayat
              </span>
            </div>

            {/* Arrow */}
            <span className="text-text-secondary/15 group-hover:text-primary/50 group-hover:translate-x-1.5 transition-all duration-300">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SurahCard;