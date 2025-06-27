// src/components/Doa/DoaCard.tsx

import { motion, AnimatePresence, Variants } from "framer-motion"; // <-- Impor Variants
import type { Doa } from "../../types/Doa";

type DoaCardProps = {
  doa: Doa;
  isActive: boolean;
  onToggle: () => void;
};

// PERBAIKAN: Definisikan varian dengan tipe 'Variants'
const contentVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: '1rem',
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

function DoaCard({ doa, isActive, onToggle }: DoaCardProps) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left p-5 hover:bg-white/5 transition-colors"
      >
        <h3 className="font-semibold text-text-primary">{doa.doa}</h3>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="px-5 pb-6">
              <p className="text-2xl text-right text-text-primary font-arabic leading-loose my-4">
                {doa.ayat}
              </p>
              <p className="text-sm text-text-secondary italic mb-4">{doa.latin}</p>
              <p className="text-base text-text-secondary leading-relaxed">
                Artinya: "{doa.artinya}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DoaCard;