// src/components/Doa/DoaCard.tsx

import { motion } from "framer-motion";
import type { Doa } from "../../types/Doa";
import { Link } from "react-router-dom";

type DoaCardProps = {
  doa: Doa;
};

function DoaCard({ doa }: DoaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.965 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="h-full"
    >
      <Link to={`/doa/${doa.id}`} className="block group h-full focus:outline-none">
        <article className="doa-card h-full flex flex-col" role="article">

          {/* ── Decorative elements ── */}
          <div className="doa-card__glow-line" aria-hidden="true" />
          <div className="doa-card__corner-glow" aria-hidden="true" />
          <div className="doa-card__bottom-glow" aria-hidden="true" />

          {/* ── Header: number badge + icon + title ── */}
          <div className="relative z-10 doa-card__header">

            {/* Numbered icon box */}
            <div className="doa-card__icon-wrap flex-shrink-0 relative">
              <span
                className="doa-card__emoji"
                role="img"
                aria-label="doa"
              >
                🤲
              </span>
              {/* Number badge */}
              <span className="doa-card__num-badge">
                {doa.id}
              </span>
            </div>

            {/* Title */}
            <h3 className="doa-card__title flex-1">
              {doa.doa}
            </h3>
          </div>

          {/* ── Spacer pushes footer to bottom ── */}
          <div className="flex-1 min-h-0" />

          {/* ── Arabic text block ── */}
          <div className="relative z-10 doa-card__arabic-wrap">
            <div className="doa-card__divider doa-card__divider--above-arabic" />
            <p
              className="doa-card__arabic text-right line-clamp-2"
              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              lang="ar"
              dir="rtl"
            >
              {doa.ayat}
            </p>
          </div>

          {/* ── Footer: latin + arrow ── */}
          <div className="relative z-10 doa-card__footer">
            <p className="doa-card__latin line-clamp-1 flex-1 min-w-0">
              {doa.latin}
            </p>
            <div className="doa-card__arrow-wrap flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="doa-card__arrow-icon"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}

export default DoaCard;