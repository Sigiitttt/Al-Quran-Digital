// src/App.tsx

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DaftarSurahPage from "./pages/DaftarSurahPage";
import DetailSurahPage from "./pages/DetailSurahPage";
import DoaPage from "./pages/DoaPage";
import DzikirPage from "./pages/DzikirPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quran" element={<DaftarSurahPage />} />
        <Route path="/surah/:surahId" element={<DetailSurahPage />} />
        <Route path="/doa" element={<DoaPage />} />
        <Route path="/dzikir" element={<DzikirPage />} />
      </Routes>
    </div>
  );
}

export default App;