// src/App.tsx

import { Route, Routes } from "react-router-dom";
import "./App.css";

// Impor semua halaman Anda
import Homepage from "./pages/Homepage";
import DaftarSurahPage from "./pages/DaftarSurahPage";
import DetailSurahPage from "./pages/DetailSurahPage";
import DoaPage from "./pages/DoaPage";
import DzikirPage from "./pages/DzikirPage";
import DetailDoaPage from "./pages/DetailDoaPage";

// Impor komponen tombol
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quran" element={<DaftarSurahPage />} />
        <Route path="/surah/:surahId" element={<DetailSurahPage />} />
        <Route path="/doa" element={<DoaPage />} />
        <Route path="/doa/:idDoa" element={<DetailDoaPage />} />
        <Route path="/dzikir" element={<DzikirPage />} />
      </Routes>
      
      {/* PERBAIKAN DI SINI:
          Pindahkan ScrollToTopButton ke luar dari blok <Routes> */}
      <ScrollToTopButton />
    </div>
  );
}

export default App;