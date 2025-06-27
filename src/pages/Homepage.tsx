// src/pages/Homepage.tsx

import SurahContainer from "../components/Surah/SurahContainer";
import Hero from "../components/Hero";
import { Link } from "react-router-dom"; // <-- Impor Link

function Homepage() {
  return (
    <div className="text-white">
      <Hero />
      
      {/* Tombol navigasi ke Halaman Doa */}
      <div className="px-5 mb-4 text-center">
        <Link
          to="/doa"
          className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-all"
        >
          Lihat Kumpulan Doa Sehari-hari
        </Link>
      </div>
      
      <SurahContainer />
    </div>
  );
}

export default Homepage;