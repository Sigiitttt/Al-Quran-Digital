// src/components/DetailSurah/DetailSurah.tsx

import type { Surah } from "../../types/Surah";
import DetailSurahInfo from "./DetailSurahInfo";
import AudioControl from "../AudioControl";
import AyatList from "../Ayat/AyatList";
import { motion } from "framer-motion";

type DetailSurahProps = {
  surah: Surah | null;
  currentReciter: string;
  // changeReciter DIHAPUS DARI SINI
  onPlay: () => void;
  onPause: () => void;
  audioPlaying: boolean;
  openReciterModal: () => void;
};

function DetailSurah({
  surah,
  currentReciter,
  // changeReciter DIHAPUS DARI SINI
  onPlay,
  onPause,
  audioPlaying,
  openReciterModal,
}: DetailSurahProps) {

  if (!surah) {
    return null;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-8 px-5 flex flex-col gap-8">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DetailSurahInfo surah={surah} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <AudioControl
          currentReciter={currentReciter}
          onPlay={onPlay}
          onPause={onPause}
          audioPlaying={audioPlaying}
          openReciterModal={openReciterModal}
        />
      </motion.div>
      
      <AyatList ayat={surah.ayat} />
    </div>
  );
}

export default DetailSurah;