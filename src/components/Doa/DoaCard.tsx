// src/components/Doa/DoaCard.tsx

import { motion } from "framer-motion";
import type { Doa } from "../../types/Doa";
import { Link } from "react-router-dom"; // <-- Impor Link

// Daftar pemetaan dan fungsi getIconPath tidak berubah
// ...

type DoaCardProps = {
  doa: Doa;
};

function DoaCard({ doa }: DoaCardProps) {
  return (
    // Bungkus semua dengan komponen Link
    <Link to={`/doa/${doa.id}`}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
        className="bg-dark border border-border rounded-xl p-6 h-full flex flex-col justify-between items-center text-center transition-colors hover:border-primary"
      >
        <div className="flex flex-col items-center">
          {/* <img src={getIconPath(doa.doa)} alt={doa.doa} className="w-16 h-16 mb-4" /> */}
          <h3 className="font-bold text-lg text-text-primary">{doa.doa}</h3>
        </div>
        
        <p className="text-2xl text-primary font-arabic mt-6">
          {doa.ayat.split(' ').slice(0, 3).join(' ')}...
        </p>
      </motion.div>
    </Link>
  );
}

export default DoaCard;