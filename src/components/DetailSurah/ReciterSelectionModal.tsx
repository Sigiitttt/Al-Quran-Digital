// src/components/DetailSurah/ReciterSelectionModal.tsx

import { motion, AnimatePresence, Variants } from "framer-motion"; // <-- Impor Variants

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

// PERBAIKAN: Definisikan varian dengan tipe 'Variants'
const modalVariants: Variants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 }
  },
  exit: { y: "100vh", opacity: 0 }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-dark border border-border rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4">Pilih Qari</h3>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {reciters.map((reciter) => (
                <div
                  key={reciter.id}
                  onClick={() => {
                    changeReciter(reciter.id);
                    onClose();
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    currentReciter === reciter.id
                      ? "border-primary bg-primary/20"
                      : "border-transparent hover:bg-white/10"
                  }`}
                >
                  <p className="text-text-primary">{reciter.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReciterSelectionModal;