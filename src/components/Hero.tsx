// src/components/Hero.tsx

import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center pt-20 pb-10 px-5"
    >
      <h1
        className="text-4xl md:text-5xl font-bold text-text-primary mb-2"
        style={{ textShadow: "0px 2px 20px rgba(162, 69, 250, 0.15)" }}
      >
        Al-Quran Digital
      </h1>

      <p className="text-sm text-text-secondary/40 pt-2 tracking-wide">
        By anonymous
      </p>
    </motion.div>
  );
}

export default Hero;