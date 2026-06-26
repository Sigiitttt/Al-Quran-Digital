// src/components/ScrollToTopButton.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-xl flex items-center justify-center z-50 cursor-pointer transition-colors duration-300"
          style={{
            background: "rgba(13, 17, 23, 0.85)",
            border: "1px solid rgba(48, 54, 61, 0.4)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            color: "rgba(139, 148, 158, 0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(162, 69, 250, 0.3)";
            e.currentTarget.style.color = "#a245fa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(48, 54, 61, 0.4)";
            e.currentTarget.style.color = "rgba(139, 148, 158, 0.6)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M12 5L5 12M12 5L19 12" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;