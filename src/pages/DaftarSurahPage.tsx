// src/pages/DaftarSurahPage.tsx

import SurahContainer from "../components/Surah/SurahContainer";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

function DaftarSurahPage() {
  return (
    <div>
      <div className="p-5">
        <Link to="/" className="text-primary hover:underline">
          ← Kembali ke Menu Utama
        </Link>
      </div>
      <Hero />
      <SurahContainer />
    </div>
  );
}

export default DaftarSurahPage;