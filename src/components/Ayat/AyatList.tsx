// src/components/Ayat/AyatList.tsx

import type { Ayat } from "../../types/Surah";
import AyatCard from "./AyatCard";
import { motion } from "framer-motion";

type AyatListProps = {
  ayat: Ayat[];
};

function AyatList({ ayat }: AyatListProps) {
  return (
    <div className="flex flex-col gap-4">
      {ayat.map((item) => (
        <motion.div
          key={item.nomorAyat}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <AyatCard ayat={item} />
        </motion.div>
      ))}
    </div>
  );
}

export default AyatList;