// src/components/Kisah/KisahCard.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Tokoh } from "../../types/Kisah";

type KisahCardProps = {
  tokoh: Tokoh;
};

function KisahCard({ tokoh }: KisahCardProps) {
  return (
    // PERBAIKAN: Tambahkan prop 'state' pada Link
    <Link to={`/kisah/${tokoh.name}`} state={{ tokoh: tokoh }}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="h-full bg-dark rounded-xl border border-border p-5 text-center flex flex-col items-center"
      >
        <img 
          src={tokoh.image_url} 
          alt={tokoh.name} 
          className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-primary/50"
        />
        <h3 className="font-bold text-xl text-text-primary">{tokoh.name}</h3>
        <p className="text-sm text-text-secondary">Usia: {tokoh.usia}</p>
      </motion.div>
    </Link>
  );
}

export default KisahCard;