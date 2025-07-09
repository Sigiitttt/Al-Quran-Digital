// src/components/Dzikir/DzikirCounter.tsx

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DzikirCounter() {
  const [count, setCount] = useState(0);
  const [target] = useState(33); // Kita set target default 33 untuk progress bar

  const increment = () => {
    // Izinkan hitungan melebihi target jika pengguna mau
    setCount(count + 1);
  };
  
  const reset = () => {
    setCount(0);
  };

  // --- Logika untuk Circular Progress Bar ---
  const radius = 110; // Radius lingkaran
  const circumference = 2 * Math.PI * radius; // Keliling lingkaran

  // Kalkulasi persentase dan offset untuk progress bar
  const progress = useMemo(() => {
    if (target === 0) return 0;
    // Gunakan modulo agar progress bar kembali ke 0 setelah target tercapai
    return (count % target) / target;
  }, [count, target]);

  const strokeDashoffset = circumference * (1 - progress);
  // --- Akhir Logika Circular Progress Bar ---

  return (
    <div className="flex flex-col items-center justify-center text-center h-[70vh]">
      {/* Kontainer Utama untuk Lingkaran dan Angka */}
      <motion.div
        onClick={increment}
        whileTap={{ scale: 0.95 }}
        className="relative w-64 h-64 cursor-pointer"
      >
        {/* SVG untuk Progress Bar Melingkar */}
        <svg className="w-full h-full" viewBox="0 0 250 250">
          {/* Lingkaran Latar Belakang */}
          <circle
            cx="125"
            cy="125"
            r={radius}
            stroke="var(--color-border)"
            strokeWidth="15"
            fill="transparent"
          />
          {/* Lingkaran Progress yang Bergerak */}
          <motion.circle
            cx="125"
            cy="125"
            r={radius}
            stroke="var(--color-primary)"
            strokeWidth="15"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5 }}
            transform="rotate(-90 125 125)"
          />
        </svg>

        {/* Tampilan Angka di Tengah Lingkaran */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            <motion.h1
              key={count}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-8xl font-bold text-text-primary"
            >
              {count}
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Tombol Reset */}
      <motion.button
        onClick={reset}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-dark border border-border text-text-secondary font-bold py-3 px-8 rounded-lg text-lg"
      >
        Reset Hitungan
      </motion.button>
    </div>
  );
}

export default DzikirCounter;