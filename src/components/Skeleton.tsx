// src/components/Skeleton.tsx

import { motion } from "framer-motion";

function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-dark rounded-lg ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
  );
}

export default Skeleton;