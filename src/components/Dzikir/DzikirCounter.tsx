// src/components/Dzikir/DzikirCounter.tsx

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DZIKIR_GOALS = [33, 100, 1000];

function DzikirCounter() {
  const [count, setCount] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const target = DZIKIR_GOALS[targetIndex];
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (count > 0 && count % target === 0) {
      setShowFeedback(true);
      if (window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [count, target]);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
    setShowFeedback(false);
  };

  const changeTarget = () => {
    const nextIndex = (targetIndex + 1) % DZIKIR_GOALS.length;
    setTargetIndex(nextIndex);
    reset();
  };

  // --- PERBAIKAN UTAMA DI SINI ---
  // Urutan deklarasi variabel sudah diperbaiki.
  const radius = 110;
  const circumference = 2 * Math.PI * radius; // 'circumference' dibuat terlebih dahulu...

  const progress = useMemo(() => {
    if (target === 0) return 0;
    const currentProgress = (count % target) / target;
    return (count > 0 && count % target === 0) ? 1 : currentProgress;
  }, [count, target]);
  
  const strokeDashoffset = circumference * (1 - progress); // ...baru digunakan di sini.
  // --- Akhir Perbaikan ---

  return (
    <div className="flex flex-col items-center justify-center text-center h-[85vh] px-4">
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
        animate={{ scale: showFeedback ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <svg className="w-full h-full" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r={radius} stroke="var(--color-border)" strokeWidth="15" fill="var(--color-dark)" />
          <motion.circle
            cx="125"
            cy="125"
            r={radius}
            stroke={showFeedback ? "var(--color-accent)" : "var(--color-primary)"}
            strokeWidth="15"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
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
      
      <div className="h-10 mt-6">
        <AnimatePresence>
          {showFeedback && (
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-lg text-primary font-semibold"
            >
              Masyaallah, target tercapai!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={(e) => { e.stopPropagation(); reset(); }}
        whileTap={{ scale: 0.95 }}
        className="bg-dark border border-border text-text-secondary font-bold py-3 px-8 rounded-lg text-lg"
      >
        Reset
      </motion.button>
    </div>
  );
}

export default DzikirCounter;