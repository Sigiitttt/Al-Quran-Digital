// src/components/Skeleton.tsx

import { motion } from "framer-motion";

function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-lg ${className}`}
      style={{
        background: "rgba(48, 54, 61, 0.2)",
      }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
    />
  );
}

export default Skeleton;