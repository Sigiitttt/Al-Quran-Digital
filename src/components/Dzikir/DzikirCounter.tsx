// src/components/Dzikir/DzikirCounter.tsx

import { useState } from "react";
import { motion } from "framer-motion";

function DzikirCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center text-center h-[80vh]">
      <motion.h1 
        key={count}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-9xl font-bold text-text-primary mb-8"
      >
        {count}
      </motion.h1>
      
      <div className="flex gap-4">
        <motion.button
          onClick={increment}
          whileTap={{ scale: 0.9 }}
          className="bg-primary text-white font-bold py-4 px-10 rounded-lg text-xl"
        >
          Hitung
        </motion.button>
        <motion.button
          onClick={reset}
          whileTap={{ scale: 0.9 }}
          className="bg-dark border border-border text-text-secondary font-bold py-4 px-10 rounded-lg text-xl"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}

export default DzikirCounter;