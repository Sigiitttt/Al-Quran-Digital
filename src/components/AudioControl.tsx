// src/components/AudioControl.tsx

import { motion } from "framer-motion";
import PlayIcon from "../assets/PlayIcon.svg";
import PauseIcon from "../assets/PauseIcon.svg";

type AudioControlProps = {
  currentReciter: string;
  onPlay: () => void;
  onPause: () => void;
  audioPlaying: boolean;
  openReciterModal: () => void;
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
  const selectedReciterName =
    reciters.find((r) => r.id === currentReciter)?.name || "Pilih Qari";

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(13, 17, 23, 0.7)",
        border: "1px solid rgba(48, 54, 61, 0.3)",
      }}
    >
      {/* Play/Pause button */}
      <motion.button
        onClick={audioPlaying ? onPause : onPlay}
        className="flex-shrink-0 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300"
        style={{
          background: audioPlaying
            ? "rgba(162, 69, 250, 0.15)"
            : "rgba(162, 69, 250, 0.9)",
          border: audioPlaying
            ? "1px solid rgba(162, 69, 250, 0.3)"
            : "1px solid transparent",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <img
          src={audioPlaying ? PauseIcon : PlayIcon}
          alt={audioPlaying ? "Pause" : "Play"}
          className="w-4.5 h-4.5"
          style={{
            filter: audioPlaying
              ? "brightness(0) invert(0.6) sepia(1) saturate(5) hue-rotate(250deg)"
              : "none",
          }}
        />
      </motion.button>

      {/* Reciter selector */}
      <button
        onClick={openReciterModal}
        className="flex-1 text-left group"
      >
        <p className="text-[10px] uppercase tracking-widest text-text-secondary/35 font-medium mb-0.5">
          Qari
        </p>
        <p className="text-text-primary text-sm font-semibold group-hover:text-primary/80 transition-colors duration-300">
          {selectedReciterName}
        </p>
      </button>

      {/* Change reciter button */}
      <button
        onClick={openReciterModal}
        className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary/50 hover:text-text-primary transition-all duration-300"
        style={{
          background: "rgba(48, 54, 61, 0.25)",
          border: "1px solid rgba(48, 54, 61, 0.3)",
        }}
      >
        Ganti
      </button>
    </div>
  );
}

export default AudioControl;