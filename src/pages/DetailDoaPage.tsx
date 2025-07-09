// src/pages/DetailDoaPage.tsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Doa } from "../types/Doa";
import { motion } from "framer-motion";

function DetailDoaPage() {
  const { idDoa } = useParams<{ idDoa: string }>();
  const [doa, setDoa] = useState<Doa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailDoa = async () => {
      setLoading(true);
      setError(null);
      try {
        // PERBAIKAN: Gunakan path proxy yang sudah disatukan
        const response = await fetch(`/api-doa/api/${idDoa}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil detail doa.");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDoa(data[0]);
        } else {
          throw new Error("Doa tidak ditemukan.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailDoa();
  }, [idDoa]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 md:p-8"
    >
      <div className="mb-8">
        <Link to="/doa" className="text-primary hover:underline">
          ← Kembali ke Daftar Doa
        </Link>
      </div>

      {loading && <p className="text-center text-subtle">Memuat doa...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {doa && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-dark p-8 rounded-2xl border border-border"
        >
          <h1 className="text-3xl font-bold text-primary text-center mb-6">{doa.doa}</h1>
          <p className="text-4xl text-right text-text-primary font-arabic leading-loose my-8">
            {doa.ayat}
          </p>
          <p className="text-md text-text-secondary italic mb-6">{doa.latin}</p>
          <hr className="border-t border-border my-6" />
          <p className="text-lg text-text-secondary leading-relaxed">
            <span className="font-bold text-text-primary">Artinya:</span> "{doa.artinya}"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default DetailDoaPage;