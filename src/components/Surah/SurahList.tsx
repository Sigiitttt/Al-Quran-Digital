// src/components/Surah/SurahList.tsx

import SurahCard from "./SurahCard";
import type { Surah } from "../../types/Surah";
import { motion } from "framer-motion";

type SurahListProps = {
  surahs: Surah[];
};

function SurahList({ surahs }: SurahListProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {surahs.map((surah, index) => (
        <SurahCard key={surah.nomor} surah={surah} index={index} />
      ))}
    </motion.div>
  );
}

export default SurahList;