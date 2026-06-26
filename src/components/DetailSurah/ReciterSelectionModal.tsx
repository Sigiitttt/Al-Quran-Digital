// src/components/DetailSurah/ReciterSelectionModal.tsx

import { motion, AnimatePresence, type Variants } from "framer-motion";

type Reciter = {
  id: string;
  name: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reciters: Reciter[];
  currentReciter: string;
  changeReciter: (id: string) => void;
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  exit: { y: 40, opacity: 0, scale: 0.95 },
};

function ReciterSelectionModal({
  isOpen,
  onClose,
  reciters,
  currentReciter,
  changeReciter,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13, 17, 23, 0.95)",
              border: "1px solid rgba(48, 54, 61, 0.4)",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(48, 54, 61, 0.3)" }}
            >
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  Pilih Qari
                </h3>
                <p className="text-xs text-text-secondary/40 mt-0.5">
                  Pilih pembaca Al-Quran
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary/40 hover:text-text-primary transition-colors"
                style={{ background: "rgba(48, 54, 61, 0.3)" }}
              >
                ✕
              </button>
            </div>

            {/* Reciter list */}
            <div className="p-3 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
              {reciters.map((reciter) => {
                const isSelected = currentReciter === reciter.id;
                return (
                  <button
                    key={reciter.id}
                    onClick={() => {
                      changeReciter(reciter.id);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-all duration-200"
                    style={{
                      background: isSelected
                        ? "rgba(162, 69, 250, 0.08)"
                        : "transparent",
                      border: isSelected
                        ? "1px solid rgba(162, 69, 250, 0.15)"
                        : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background =
                          "rgba(48, 54, 61, 0.2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {/* Radio indicator */}
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        border: isSelected
                          ? "2px solid #a245fa"
                          : "2px solid rgba(48, 54, 61, 0.5)",
                      }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>

                    {/* Name */}
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isSelected
                          ? "rgba(240, 246, 252, 0.9)"
                          : "rgba(139, 148, 158, 0.7)",
                      }}
                    >
                      {reciter.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReciterSelectionModal;