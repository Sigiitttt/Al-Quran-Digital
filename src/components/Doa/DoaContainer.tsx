// src/components/Doa/DoaContainer.tsx

import { useState, useEffect } from "react";
import type { Doa } from "../../types/Doa";
import DoaList from "./DoaList";

function DoaContainer() {
  const [doas, setDoas] = useState<Doa[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoas = async () => {
      setIsLoading(true);
      setError(null);

      // PERBAIKAN UTAMA DI SINI:
      // Tentukan URL berdasarkan apakah searchQuery punya isi atau tidak.
      let url = "";
      if (searchQuery.trim() !== "") {
        // Jika ada query, gunakan URL search
        url = `/api-doa/api/search/${searchQuery}`;
      } else {
        // Jika kosong, gunakan URL untuk semua doa
        url = "/api-doa/api";
      }
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // Jika status 404 (Not Found), kita anggap saja doanya tidak ada, bukan error
          if (response.status === 404) {
            setDoas([]);
            return; 
          }
          throw new Error("Gagal mengambil data doa.");
        }
        const data = await response.json();
        setDoas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        setDoas([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce: tunggu 500ms setelah user berhenti mengetik baru fetch
    const timeoutId = setTimeout(() => {
      fetchDoas();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="px-5 py-6">
      <input
        type="text"
        placeholder="Cari doa (contoh: makan, tidur...)"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-4 mb-8 bg-dark text-text-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
      {isLoading && <p className="text-center text-subtle">Mencari doa...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && doas.length === 0 && (
        <p className="text-center text-subtle">Doa tidak ditemukan.</p>
      )}
      {!isLoading && !error && <DoaList doas={doas} />}
    </div>
  );
}

export default DoaContainer;