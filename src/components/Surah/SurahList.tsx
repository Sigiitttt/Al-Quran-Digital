// src/components/Surah/SurahList.tsx
import SurahCard from "./SurahCard";
import type { Surah } from "../../types/Surah";
import { motion } from "framer-motion";

type SurahListProps = {
  surahs: Surah[];
};

function SurahList({ surahs }: SurahListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda antar animasi kartu
      },
    },
  };

  return (
    <motion.div
      // Tampilan Grid: 1 kolom di HP, 2 di tablet, 3 di desktop
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6 px-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {surahs.map((surah) => (
        <SurahCard key={surah.nomor} surah={surah} />
      ))}
    </motion.div>
  );
}

export default SurahList;