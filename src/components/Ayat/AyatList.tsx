// src/components/Ayat/AyatList.tsx
import type { Ayat } from "../../types/Surah";
import AyatCard from "./AyatCard";
import { motion } from "framer-motion";

type AyatListProps = {
  ayat: Ayat[];
};

function AyatList({ ayat }: AyatListProps) {
  return (
    // Gunakan list dengan pemisah "tak terlihat" (gap) dan animasi
    <div className="flex flex-col divide-y divide-white/10">
      {ayat.map((item) => (
        <motion.div
          key={item.nomorAyat}
          className="py-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Muncul saat 30% kartu terlihat
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AyatCard ayat={item} />
        </motion.div>
      ))}
    </div>
  );
}

export default AyatList;