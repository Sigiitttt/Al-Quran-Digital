// src/components/Surah/SurahContainer.tsx

import { useState, useEffect, useMemo } from "react";
import SurahList from "./SurahList";
import type { Surah } from "../../types/Surah";
import Skeleton from "../Skeleton";

function SurahContainer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. State baru untuk menampung query pencarian
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://equran.id/api/v2/surat");
        if (!response.ok) {
          throw new Error("Gagal mengambil daftar surah");
        }
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // 2. Filter surah berdasarkan searchQuery.
  //    useMemo digunakan agar proses filter tidak diulang-ulang jika tidak perlu.
  const filteredSurahs = useMemo(() => {
    return surahs.filter((surah) =>
      surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [surahs, searchQuery]);


  if (isLoading) {
    return (
      <div className="py-6 px-5 flex flex-col gap-4">
        {/* Tampilkan 3 buah skeleton sebagai placeholder */}
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>;
  }

  return (
    <div className="px-5 py-6">
      {/* 3. Tambahkan input field untuk pencarian */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama surah (contoh: Al-Fatihah)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 bg-dark text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* 4. Kirim hasil filter ke SurahList, dan tampilkan pesan jika kosong */}
      {filteredSurahs.length > 0 ? (
        <SurahList surahs={filteredSurahs} />
      ) : (
        <p className="text-center p-10 text-subtle">
          Surah tidak ditemukan.
        </p>
      )}
    </div>
  );
}

export default SurahContainer;