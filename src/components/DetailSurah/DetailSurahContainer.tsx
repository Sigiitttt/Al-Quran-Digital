// src/components/DetailSurah/DetailSurahContainer.tsx

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Surah } from "../../types/Surah";
import DetailSurah from "./DetailSurah";
import ReciterSelectionModal from "./ReciterSelectionModal";
import Skeleton from "../Skeleton";
import { motion } from "framer-motion";

function DetailSurahContainer() {
  const { surahId } = useParams<{ surahId: string }>();

  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentReciter, setCurrentReciter] = useState("01");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        const response = await fetch(
          `/api-quran/api/v2/surat/${surahId}`
        );
        if (!response.ok) {
          throw new Error("Gagal memuat data surah");
        }
        const data = await response.json();
        setSurah(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
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
    audioRef.current = new Audio(surah.audioFull[currentReciter]);
    audioRef.current.onended = () => setAudioPlaying(false);
    audioRef.current.play();
    setAudioPlaying(true);
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioPlaying(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-10 flex flex-col gap-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="flex flex-col gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error || !surah) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24"
      >
        <div
          className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl"
          style={{
            background: "rgba(220, 38, 38, 0.05)",
            border: "1px solid rgba(220, 38, 38, 0.12)",
          }}
        >
          <span className="text-3xl">⚠️</span>
          <p className="text-red-400/80 font-medium">
            {error || "Surah tidak ditemukan"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline underline-offset-4 mt-1"
          >
            Coba lagi
          </button>
        </div>
      </motion.div>
    );
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