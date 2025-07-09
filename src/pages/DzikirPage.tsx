// src/pages/DzikirPage.tsx
import DzikirCounter from "../components/Dzikir/DzikirCounter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DzikirPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-5"
    >
      <div className="mb-8">
        <Link to="/" className="text-primary hover:underline">
          ← Kembali ke Menu Utama
        </Link>
      </div>
      <DzikirCounter />
    </motion.div>
  );
}

export default DzikirPage;