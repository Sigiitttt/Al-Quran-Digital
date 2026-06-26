// src/components/Button.tsx

import { motion } from "framer-motion";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

function Button({ text, onClick, variant = "primary", disabled = false }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className="py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        background: isPrimary
          ? "rgba(162, 69, 250, 0.9)"
          : "rgba(48, 54, 61, 0.3)",
        border: isPrimary
          ? "1px solid rgba(162, 69, 250, 0.5)"
          : "1px solid rgba(48, 54, 61, 0.4)",
        color: isPrimary ? "#f0f6fc" : "rgba(139, 148, 158, 0.8)",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
}

export default Button;
