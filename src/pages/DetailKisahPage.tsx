// src/pages/DetailKisahPage.tsx

import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Tokoh } from "../types/Kisah";

function DetailKisahPage() {
  const location = useLocation();
  // Ambil data 'tokoh' yang dikirim melalui state Link
  const tokoh = location.state?.tokoh as Tokoh;

  // Jika pengguna mengakses halaman ini langsung (tanpa state), tampilkan pesan
  if (!tokoh) {
    return (
      <div className="p-5 md:p-8 text-center">
        <p>Data tidak ditemukan. Silakan kembali ke daftar kisah.</p>
        <Link to="/kisah" className="text-primary hover:underline mt-4 inline-block">
          ← Kembali ke Daftar Kisah
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-8">
        <Link to="/kisah" className="text-primary hover:underline">
          ← Kembali ke Daftar Kisah
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <img src={tokoh.image_url} alt={tokoh.name} className="w-full h-64 object-cover rounded-xl mb-6"/>
        <h1 className="text-4xl font-bold text-text-primary">{tokoh.name}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-text-secondary mt-2 mb-6">
          <span>Lahir: {tokoh.thn_kelahiran}</span>
          <span>Usia: {tokoh.usia}</span>
          <span>Tempat: {tokoh.tmp}</span>
        </div>
        {/* Menggunakan dangerouslySetInnerHTML untuk merender deskripsi HTML */}
        <div 
          className="prose prose-invert max-w-none text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: tokoh.description }} 
        />
      </motion.div>
    </div>
  );
}

export default DetailKisahPage;