// src/pages/Homepage.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Homepage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-text-primary">Al-Quran Digital</h1>
        <p className="text-lg text-text-secondary mt-2">Proyek oleh Sigit Aringga</p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 flex flex-col gap-5 w-full max-w-sm"
      >
        <motion.div variants={itemVariants}>
          <Link to="/quran" className="menu-button bg-primary">
            📖 Baca Al-Quran
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link to="/doa" className="menu-button bg-dark">
            🤲 Kumpulan Doa Harian
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link to="/dzikir" className="menu-button bg-dark">
            📿 Penghitung Dzikir
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Homepage;