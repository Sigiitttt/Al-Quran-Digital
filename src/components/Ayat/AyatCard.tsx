// src/components/Ayat/AyatCard.tsx

import type { Ayat } from "../../types/Surah";

type AyatCardProps = {
  ayat: Ayat;
};

function AyatCard({ ayat }: AyatCardProps) {
  return (
    <div
      className="rounded-xl p-5 md:p-6 transition-all duration-300 group"
      style={{
        background: "rgba(13, 17, 23, 0.5)",
        border: "1px solid rgba(48, 54, 61, 0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(48, 54, 61, 0.45)";
        e.currentTarget.style.background = "rgba(13, 17, 23, 0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(48, 54, 61, 0.25)";
        e.currentTarget.style.background = "rgba(13, 17, 23, 0.5)";
      }}
    >
      {/* Header: Ayat number */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Number badge */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: "rgba(48, 54, 61, 0.3)",
              border: "1px solid rgba(48, 54, 61, 0.4)",
              color: "rgba(139, 148, 158, 0.7)",
            }}
          >
            {ayat.nomorAyat}
          </div>
          <span className="text-[11px] text-text-secondary/25 font-medium uppercase tracking-widest">
            Ayat {ayat.nomorAyat}
          </span>
        </div>
      </div>

      {/* Arabic text */}
      <p
        className="text-3xl md:text-[2.2rem] text-right w-full leading-[2.4] text-text-primary mb-6 font-arabic"
        style={{
          fontFamily: "'Amiri', 'Scheherazade New', serif",
          letterSpacing: "0.02em",
        }}
      >
        {ayat.teksArab}
      </p>

      {/* Divider */}
      <div
        className="h-px w-full mb-4"
        style={{
          background:
            "linear-gradient(to right, rgba(48,54,61,0.4), rgba(48,54,61,0.1))",
        }}
      />

      {/* Latin transliteration */}
      <p className="text-sm text-text-secondary/40 italic leading-relaxed mb-3">
        {ayat.teksLatin}
      </p>

      {/* Indonesian translation */}
      <p className="text-sm text-text-secondary/70 leading-relaxed">
        {ayat.teksIndonesia}
      </p>
    </div>
  );
}

export default AyatCard;