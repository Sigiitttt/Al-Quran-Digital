// src/pages/DoaPage.tsx

import { Link } from "react-router-dom";
import DoaContainer from "../components/Doa/DoaContainer";
import { motion } from "framer-motion";

function DoaPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-5">
        <Link to="/" className="text-primary hover:underline">
          ← Kembali ke Daftar Surah
        </Link>
      </div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-text-primary">Kumpulan Doa Sehari-hari</h1>
        <p className="text-lg text-text-secondary mt-2">Cari doa yang kamu butuhkan.</p>
      </div>
      <DoaContainer />
    </motion.div>
  );
}

export default DoaPage;