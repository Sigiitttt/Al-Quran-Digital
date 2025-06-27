// src/components/Surah/SurahCard.tsx

import { Link } from "react-router-dom";
import type { Surah } from "../../types/Surah";
import { motion, Variants } from "framer-motion"; // <-- Impor Variants

type SurahCardProps = {
  surah: Surah;
};

// PERBAIKAN: Definisikan varian di luar komponen dengan tipe 'Variants'
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  },
};

function SurahCard({ surah }: SurahCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.97 }}
    >
      <Link to={`/surah/${surah.nomor}`} className="block h-full">
        <div className="h-full bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)] p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-primary)]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-left">
              <p className="font-bold text-lg text-text-primary">{surah.namaLatin}</p>
              <p className="text-sm text-text-secondary uppercase">{surah.tempatTurun}</p>
            </div>
            <p className="flex items-center justify-center font-bold text-primary border-2 border-primary rounded-full w-10 h-10">
              {surah.nomor}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between items-end">
             <p className="text-text-secondary text-xs">{surah.jumlahAyat} AYAT</p>
             <p className="text-primary text-3xl font-bold">{surah.nama}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SurahCard;