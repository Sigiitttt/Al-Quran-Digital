// src/components/Ayat/AyatList.tsx

import type { Ayat } from "../../types/Surah";
import AyatCard from "./AyatCard";
import { motion } from "framer-motion";

type AyatListProps = {
  ayat: Ayat[];
};

function AyatList({ ayat }: AyatListProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header count */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-2 px-1"
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(162,69,250,0.07)",
            border: "1px solid rgba(162,69,250,0.15)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(162,69,250,0.6)", boxShadow: "0 0 6px rgba(162,69,250,0.5)" }}
          />
          <span
            className="text-[11px] font-semibold tracking-wider uppercase"
            style={{ color: "rgba(162,69,250,0.6)" }}
          >
            {ayat.length} Ayat
          </span>
        </div>

        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to right, rgba(162,69,250,0.15), transparent)",
          }}
        />
      </motion.div>

      {/* Ayat cards */}
      {ayat.map((item, idx) => (
        <AyatCard key={item.nomorAyat} ayat={item} index={idx} />
      ))}

      {/* End marker */}
      {ayat.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2 py-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: "rgba(162,69,250,0.15)" }} />
            <span
              className="text-lg"
              style={{
                fontFamily: "'Amiri', serif",
                color: "rgba(162,69,250,0.35)",
                textShadow: "0 0 12px rgba(162,69,250,0.2)",
              }}
            >
              ۞
            </span>
            <div className="h-px w-12" style={{ background: "rgba(162,69,250,0.15)" }} />
          </div>
          <p
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(162,69,250,0.25)" }}
          >
            Selesai
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default AyatList;