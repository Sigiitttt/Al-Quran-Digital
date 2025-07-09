// src/components/Doa/DoaList.tsx

import type { Doa } from "../../types/Doa";
import DoaCard from "./DoaCard";
import { motion } from "framer-motion";

type DoaListProps = {
  doas: Doa[];
};

function DoaList({ doas }: DoaListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {doas.map((doa) => (
        <motion.div key={doa.id} variants={itemVariants}>
          <DoaCard doa={doa} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default DoaList;