// src/components/Doa/DoaList.tsx

import type { Doa } from "../../types/Doa";
import DoaCard from "./DoaCard";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type DoaListProps = {
  doas: Doa[];
  searchKey?: string; // key to re-trigger animation when search changes
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.12 },
  },
};

function DoaList({ doas, searchKey = "all" }: DoaListProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={searchKey}
        className="doa-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <AnimatePresence mode="popLayout">
          {doas.map((doa) => (
            <motion.div
              key={doa.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <DoaCard doa={doa} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default DoaList;