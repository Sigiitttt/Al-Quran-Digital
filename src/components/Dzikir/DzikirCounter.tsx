// src/components/Dzikir/DzikirCounter.tsx

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DzikirCounter() {
  const [count, setCount] = useState(0);
  // 1. Kembalikan state untuk target yang bisa diubah pengguna
  const [target, setTarget] = useState(33);

  const increment = () => {
    setCount(count + 1);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  // Fungsi untuk menangani perubahan pada input target
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTarget = parseInt(e.target.value, 10);
    // Jika input tidak valid (bukan angka/negatif), set target ke 0
    setTarget(isNaN(newTarget) || newTarget < 0 ? 0 : newTarget);
  };

  // --- Logika untuk Circular Progress Bar ---
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = useMemo(() => {
    if (target === 0) return 0;
    return (count % target) / target;
  }, [count, target]);
  const strokeDashoffset = circumference * (1 - progress);
  // --- Akhir Logika ---

  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh]">
      <motion.div
        onClick={increment}
        whileTap={{ scale: 0.95 }}
        className="relative w-64 h-64 cursor-pointer"
      >
        {/* SVG Progress Bar */}
        <svg className="w-full h-full" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r={radius} stroke="var(--color-border)" strokeWidth="15" fill="transparent" />
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

        {/* PERBAIKAN UTAMA: Kontainer Angka dengan Posisi Stabil */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* Wrapper untuk AnimatePresence agar tidak menggeser layout */}
          <div className="relative w-full h-28 flex items-center justify-center">
            <AnimatePresence>
              <motion.h1
                key={count}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0, position: 'absolute' }} // <-- Kunci agar tidak bergeser
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="text-8xl font-bold text-text-primary"
              >
                {count}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          <p className="text-lg text-text-secondary -mt-2">
            Target: {target}
          </p>
        </div>
      </motion.div>
      
      {/* 2. Kembalikan input untuk target & tombol Reset */}
      <div className="flex gap-4 mt-10 items-center w-full max-w-xs">
        <input 
          type="number"
          value={target}
          onChange={handleTargetChange}
          className="w-full p-3 bg-dark text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center"
          placeholder="Set Target"
        />
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            reset();
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-dark border border-border text-text-secondary font-bold py-3 px-6 rounded-lg text-base"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}

export default DzikirCounter;