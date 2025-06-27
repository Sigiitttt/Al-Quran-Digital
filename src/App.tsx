// src/App.tsx

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailSurahPage from "./pages/DetailSurahPage";
import DoaPage from "./pages/DoaPage"; // <-- HAPUS TANDA KOMENTAR (//) DARI BARIS INI

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/surah/:surahId" element={<DetailSurahPage />} />
        <Route path="/doa" element={<DoaPage />} /> {/* <-- Pastikan baris ini juga aktif */}
      </Routes>
    </div>
  );
}

export default App;