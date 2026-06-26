// src/components/DetailSurah/DetailSurah.tsx

import type { Surah } from "../../types/Surah";
import DetailSurahInfo from "./DetailSurahInfo";
import AudioControl from "../AudioControl";
import AyatList from "../Ayat/AyatList";
import { motion } from "framer-motion";

type DetailSurahProps = {
  surah: Surah | null;
  currentReciter: string;
  onPlay: () => void;
  onPause: () => void;
  audioPlaying: boolean;
  openReciterModal: () => void;
};

function DetailSurah({
  surah,
  currentReciter,
  onPlay,
  onPause,
  audioPlaying,
  openReciterModal,
}: DetailSurahProps) {
  if (!surah) {
    return null;
  }

  return (
    <div className="py-8 flex flex-col gap-6">
      {/* Surah Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DetailSurahInfo surah={surah} />
      </motion.div>

      {/* Audio Control */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      >
        <AudioControl
          currentReciter={currentReciter}
          onPlay={onPlay}
          onPause={onPause}
          audioPlaying={audioPlaying}
          openReciterModal={openReciterModal}
        />
      </motion.div>

      {/* Ayat List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AyatList ayat={surah.ayat} />
      </motion.div>
    </div>
  );
}

export default DetailSurah;