import type { Surah } from "../../types/Surah";
import { motion } from "framer-motion";

type DetailSurahInfoProps = {
  surah: Surah;
};

function DetailSurahInfo({ surah }: DetailSurahInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative overflow-hidden     
        p-8 rounded-2xl text-center  
        bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent
        backdrop-blur-lg             
        border border-[var(--color-border)] 
        shadow-2xl shadow-black/30   
      "
    >
      <div className="flex flex-col gap-1">
        <p className="font-bold text-3xl md:text-4xl text-text-primary tracking-wide">
          {surah.namaLatin}
        </p>
        <p className="text-xl text-primary font-bold">
          {surah.nama}
        </p>
      </div>

      <hr className="w-24 mx-auto my-6 border-white/10" />

      <p className="text-sm text-text-secondary uppercase tracking-widest">
        {surah.tempatTurun} • {surah.jumlahAyat} AYAT • SURAH KE-{surah.nomor}
      </p>
    </motion.div>
  );
}

export default DetailSurahInfo;
