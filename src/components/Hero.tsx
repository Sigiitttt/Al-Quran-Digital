// src/components/Hero.tsx

import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center pt-24 pb-12 px-5" // Sedikit kurangi padding vertikal
    >
      {/* PERBAIKAN: 
        - Mengganti 'text-slate-800' menjadi 'text-text-primary' (sesuai variabel di index.css)
        - Menambahkan text-shadow tipis agar lebih menonjol
      */}
      <h1 
        className="text-4xl md:text-5xl font-bold text-text-primary mb-2"
        style={{ textShadow: '0px 2px 15px rgba(162, 69, 250, 0.3)' }}
      >
        Al-Quran Digital
      </h1>

      {/* PERBAIKAN: 
        - Mengganti 'text-slate-500' menjadi 'text-text-secondary'
      */}
      <p className="text-lg text-text-secondary pt-3">
        By anonymous
      </p>
    </motion.div>
  );
}

export default Hero;