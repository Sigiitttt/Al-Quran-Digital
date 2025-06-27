// src/components/Doa/DoaList.tsx

import { useState } from "react";
import type { Doa } from "../../types/Doa";
import DoaCard from "./DoaCard";
import { motion } from "framer-motion";

type DoaListProps = {
  doas: Doa[];
};

function DoaList({ doas }: DoaListProps) {
  // State untuk melacak item mana yang sedang terbuka
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    // Jika item yang sama diklik, tutup. Jika beda, buka yang baru.
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark rounded-xl border border-border"
    >
      {doas.map((doa) => (
        <DoaCard
          key={doa.id}
          doa={doa}
          isActive={activeIndex === doa.id}
          onToggle={() => handleToggle(doa.id)}
        />
      ))}
    </motion.div>
  );
}

export default DoaList;