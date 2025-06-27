// src/components/AudioControl.tsx

import { motion } from "framer-motion";
import PlayIcon from "../assets/PlayIcon.svg";
import PauseIcon from "../assets/PauseIcon.svg";

type AudioControlProps = {
  currentReciter: string;
  onPlay: () => void;
  onPause: () => void;
  audioPlaying: boolean;
  openReciterModal: () => void; // <-- PERBAIKAN: Tambahkan prop yang hilang di sini
};

const reciters = [
    { id: "01", name: "Abdullah Al-Juhany" },
    { id: "02", name: "Abdul Muhsin Al-Qasim" },
    { id: "03", name: "Abdurrahman as-Sudais" },
    { id: "04", name: "Ibrahim Al-Dossari" },
    { id: "05", name: "Misyari Rasyid Al-Afasi" },
];

function AudioControl({
  currentReciter,
  onPlay,
  onPause,
  audioPlaying,
  openReciterModal,
}: AudioControlProps) {
  const selectedReciterName = reciters.find((r) => r.id === currentReciter)?.name || "Pilih Qari";

  return (
    <div className="flex justify-between gap-4 items-center">
      <button
        onClick={openReciterModal} // Prop ini sekarang valid
        className="w-full text-left bg-dark p-3 rounded-lg border border-border transition-colors duration-300 hover:border-primary"
      >
        <span className="text-text-secondary text-xs">Qari</span>
        <p className="text-text-primary font-semibold">{selectedReciterName}</p>
      </button>

      <motion.button
        onClick={audioPlaying ? onPause : onPlay}
        className="bg-primary w-14 h-14 rounded-full flex justify-center items-center cursor-pointer flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={audioPlaying ? PauseIcon : PlayIcon}
          alt={audioPlaying ? "Pause Icon" : "Play Icon"}
          className="w-5 h-5"
        />
      </motion.button>
    </div>
  );
}
export default AudioControl;