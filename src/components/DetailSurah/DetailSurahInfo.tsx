// src/components/DetailSurah/DetailSurahInfo.tsx

import type { Surah } from "../../types/Surah";
import { motion } from "framer-motion";

type DetailSurahInfoProps = {
  surah: Surah;
};

function DetailSurahInfo({ surah }: DetailSurahInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl text-center"
      style={{
        background: "rgba(13, 17, 23, 0.8)",
        border: "1px solid rgba(48, 54, 61, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Subtle top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(162,69,250,0.2), transparent)",
        }}
      />

      <div className="px-8 py-10">
        {/* Bismillah */}
        <p className="text-text-secondary/20 text-lg mb-4">﷽</p>

        {/* Arabic name */}
        <p className="text-4xl md:text-5xl font-bold text-text-secondary/30 mb-3">
          {surah.nama}
        </p>

        {/* Latin name */}
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
          {surah.namaLatin}
        </h1>

        {/* Meaning */}
        <p className="text-text-secondary/50 text-sm mb-6">{surah.arti}</p>

        {/* Divider */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div
            className="h-px w-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(48, 54, 61, 0.6))",
            }}
          />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          <div
            className="h-px w-12"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(48, 54, 61, 0.6))",
            }}
          />
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { label: surah.tempatTurun },
            { label: `${surah.jumlahAyat} Ayat` },
            { label: `Surah ke-${surah.nomor}` },
          ].map((item, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: "rgba(48, 54, 61, 0.2)",
                border: "1px solid rgba(48, 54, 61, 0.3)",
                color: "rgba(139, 148, 158, 0.7)",
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DetailSurahInfo;
