// src/components/Dzikir/DzikirCounter.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DzikirCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center text-center h-[70vh]">
      {/* Tampilan Angka Utama */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={increment}
        className="w-64 h-64 bg-dark rounded-full flex flex-col items-center justify-center border-4 border-border cursor-pointer shadow-2xl shadow-black/20"
      >
        <AnimatePresence>
          <motion.h1
            key={count}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute text-9xl font-bold text-text-primary"
          >
            {count}
          </motion.h1>
        </AnimatePresence>
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