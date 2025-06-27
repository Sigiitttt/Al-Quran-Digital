// src/components/DetailSurah/DetailSurahContainer.tsx

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Surah } from "../../types/Surah";
import DetailSurah from "./DetailSurah";
import ReciterSelectionModal from "./ReciterSelectionModal"; // PERBAIKAN 1: Path impor diperbaiki

function DetailSurahContainer() {
  const { surahId } = useParams<{ surahId: string }>();
  
  // Semua state ini akan digunakan kembali
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentReciter, setCurrentReciter] = useState("01");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // PERBAIKAN 2: Mengembalikan semua logika yang hilang
  useEffect(() => {
    setLoading(true);
    setSurah(null);
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
    
    const fetchSurah = async () => {
      try {
        const response = await fetch(`https://equran.id/api/v2/surat/${surahId}`);
        if (!response.ok) {
          throw new Error("Gagal memuat data surah");
        }
        const data = await response.json();
        setSurah(data.data); // 'setSurah' sekarang digunakan
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan"); // 'setError' sekarang digunakan
      } finally {
        setLoading(false); // 'setLoading' sekarang digunakan
      }
    };
    fetchSurah();
  }, [surahId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const changeReciter = (reciterId: string) => {
    setCurrentReciter(reciterId);
    if (audioPlaying) {
      handlePauseAudio();
      setTimeout(() => handlePlayFullSurah(), 100);
    }
  };

  const handlePlayFullSurah = () => {
    if (!surah || !audioRef) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(surah.audioFull[currentReciter]); // 'audioRef' sekarang digunakan
    audioRef.current.onended = () => setAudioPlaying(false);
    audioRef.current.play();
    setAudioPlaying(true); // 'setAudioPlaying' sekarang digunakan
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioPlaying(false);
  };

  if (loading) {
    return <div className="p-5 text-center">Memuat...</div>;
  }

  if (error || !surah) {
    return <div className="p-5 text-center text-red-500">{error || "Surah tidak ditemukan"}</div>;
  }

  const reciters = [
    { id: "01", name: "Abdullah Al-Juhany" },
    { id: "02", name: "Abdul Muhsin Al-Qasim" },
    { id: "03", name: "Abdurrahman as-Sudais" },
    { id: "04", name: "Ibrahim Al-Dossari" },
    { id: "05", name: "Misyari Rasyid Al-Afasi" },
  ];

  return (
    <>
      <DetailSurah
        surah={surah}
        currentReciter={currentReciter}
        onPlay={handlePlayFullSurah}
        onPause={handlePauseAudio}
        audioPlaying={audioPlaying}
        openReciterModal={() => setIsModalOpen(true)}
      />
      <ReciterSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reciters={reciters}
        currentReciter={currentReciter}
        changeReciter={changeReciter}
      />
    </>
  );
}

export default DetailSurahContainer;