// src/pages/KisahNabiPage.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Tokoh } from "../types/Kisah";
import KisahCard from "../components/Kisah/KisahCard";

function KisahNabiPage() {
  const [daftarTokoh, setDaftarTokoh] = useState<Tokoh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKisah = async () => {
      try {
        // Memanggil path proxy yang benar
        const response = await fetch('/api-kisah/api/kisahnabi');
        if (!response.ok) {
          throw new Error("Gagal memuat data kisah. Server mungkin sedang bermasalah.");
        }
        const data = await response.json();
        setDaftarTokoh(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchKisah();
  }, []);

return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 md:p-8">
      <div className="mb-8">
        <Link to="/" className="text-primary hover:underline">
          ← Kembali ke Menu Utama
        </Link>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-text-primary">Kisah 25 Nabi & Rasul</h1>
        <p className="text-lg text-text-secondary mt-2">Teladan terbaik sepanjang masa.</p>
      </div>

      {/* PERBAIKAN: Tampilan saat loading atau error */}
      {loading && (
        <p className="text-center text-text-secondary py-10">Memuat kisah para nabi...</p>
      )}

      {error && (
        <div className="text-center bg-dark border border-border rounded-xl p-8 max-w-lg mx-auto">
          <p className="text-xl font-bold text-red-500 mb-2">Terjadi Gangguan</p>
          <p className="text-text-secondary">{error}</p>
          <p className="text-text-secondary mt-4">Silakan coba lagi nanti.</p>
        </div>
      )}

      {/* Tampilan daftar kisah (tidak berubah) */}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {daftarTokoh.map((tokoh) => (
            <motion.div
              key={tokoh.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <KisahCard tokoh={tokoh} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default KisahNabiPage;