// src/components/Dzikir/DzikirCounter.tsx

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Daftar target dzikir yang umum digunakan
const DZIKIR_GOALS = [33, 100, 1000];

function DzikirCounter() {
  const [count, setCount] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0); // Indeks untuk DZIKIR_GOALS
  const target = DZIKIR_GOALS[targetIndex];
  
  const isTargetReached = count > 0 && count % target === 0;

  const increment = () => {
    setCount(count + 1);
    // Beri getaran pendek setiap kali menekan
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };
  
  const reset = () => {
    setCount(0);
  };

  const changeTarget = () => {
    // Ganti target ke nilai berikutnya dalam daftar
    const nextIndex = (targetIndex + 1) % DZIKIR_GOALS.length;
    setTargetIndex(nextIndex);
    // Reset hitungan saat ganti target agar tidak bingung
    reset();
  };

  // --- Logika untuk Circular Progress Bar ---
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = useMemo(() => {
    if (target === 0) return 0;
    const currentProgress = (count % target) / target;
    // Jika hitungan pas di target, buat progress menjadi 1 (penuh)
    return isTargetReached ? 1 : currentProgress;
  }, [count, target, isTargetReached]);
  const strokeDashoffset = circumference * (1 - progress);
  // --- Akhir Logika ---

  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh] px-4">
      {/* Tombol ganti target */}
      <motion.button
        onClick={changeTarget}
        className="mb-8 text-text-secondary hover:text-text-primary transition-colors"
      >
        Target Dzikir: <span className="font-bold text-lg text-primary">{target}</span>
      </motion.button>

      <motion.div
        onClick={increment}
        whileTap={{ scale: 0.95 }}
        className="relative w-64 h-64 cursor-pointer"
        // Efek denyut saat target tercapai
        animate={{ scale: isTargetReached ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <svg className="w-full h-full" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r={radius} stroke="var(--color-border)" strokeWidth="15" fill="var(--color-dark)" />
          <motion.circle
            cx="125"
            cy="125"
            r={radius}
            // Ganti warna saat target tercapai
            stroke={isTargetReached ? "var(--color-accent)" : "var(--color-primary)"}
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

        <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          <AnimatePresence>
            <motion.h1
              key={count}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, position: 'absolute' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="text-8xl font-bold text-text-primary"
            >
              {count}
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.button
        onClick={(e) => { e.stopPropagation(); reset(); }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-dark border border-border text-text-secondary font-bold py-3 px-8 rounded-lg text-lg"
      >
        Reset
      </motion.button>
    </div>
  );
}

export default DzikirCounter;