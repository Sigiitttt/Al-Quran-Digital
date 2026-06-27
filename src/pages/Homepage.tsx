// src/pages/Homepage.tsx

import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════
// PERFORMANCE TIER SYSTEM
// Detects device capability — not just screen width.
// Works across all brands: Samsung, Xiaomi, Oppo, iPhone, etc.
// ══════════════════════════════════════════════════════════

type PerfTier = "high" | "medium" | "low";

interface TierConfig {
  stars: number;
  particles: number;
  shootingStars: number;
  auroraBlobs: "full" | "minimal" | "none";
  scanLine: boolean;
  gridPattern: boolean;
  blurAmount: number; // px for aurora blur
  ringAnimation: boolean;
}

const TIER_CONFIG: Record<PerfTier, TierConfig> = {
  high: {
    stars: 80,
    particles: 18,
    shootingStars: 12,
    auroraBlobs: "full",
    scanLine: true,
    gridPattern: true,
    blurAmount: 70,
    ringAnimation: true,
  },
  medium: {
    stars: 25,
    particles: 8,
    shootingStars: 5,
    auroraBlobs: "minimal",
    scanLine: false,
    gridPattern: true,
    blurAmount: 35,
    ringAnimation: true,
  },
  low: {
    stars: 10,
    particles: 3,
    shootingStars: 2,
    auroraBlobs: "none",
    scanLine: false,
    gridPattern: false,
    blurAmount: 20,
    ringAnimation: true,
  },
};

function usePerformanceTier(): PerfTier {
  const [tier] = useState<PerfTier>(() => {
    if (typeof window === "undefined") return "high";

    const w = window.innerWidth;
    const isMobileWidth = w <= 768;
    const isSmallPhone = w <= 380;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as Record<string, unknown>).deviceMemory as
      | number
      | undefined;
    const memoryGB = memory || 4;
    const connection = (navigator as unknown as Record<string, unknown>).connection as
      | { effectiveType?: string; saveData?: boolean }
      | undefined;
    const isSlow =
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";
    const isSaveData = connection?.saveData === true;

    // ── LOW tier: small/slow phones, low RAM, or data-saver ──
    if (isSmallPhone || (isMobileWidth && cores <= 4) || memoryGB <= 2 || isSlow || isSaveData) {
      return "low";
    }

    // ── MEDIUM tier: normal phones & tablets ──
    if (isMobileWidth || (cores <= 6 && memoryGB <= 4)) {
      return "medium";
    }

    // ── HIGH tier: desktop / laptop / powerful tablet ──
    return "high";
  });

  return tier;
}

// ── Floating particle component (CSS-driven) ───────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingParticles({ config }: { config: TierConfig }) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: config.particles }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.25 + 0.05,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `rgba(162,69,250,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(162,69,250,${p.opacity * 1.5})`,
              animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
              "--pf-lo": p.opacity,
              "--pf-hi": p.opacity * 2.5,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ── Rotating ring ornament (CSS-driven) ─────────────────────
function BismillahRing({ animate }: { animate: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center mx-auto"
      style={{ width: 160, height: 160 }}
    >
      {/* Outer slow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 148,
          height: 148,
          border: "1px solid rgba(162,69,250,0.12)",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(162,69,250,0.08) 25%, transparent 50%, rgba(162,69,250,0.08) 75%, transparent 100%)",
          animation: animate ? "ringRotateCW 28s linear infinite" : "none",
          willChange: animate ? "transform" : "auto",
        }}
      />
      {/* Inner counter-rotate ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 118,
          height: 118,
          border: "1px dashed rgba(162,69,250,0.15)",
          animation: animate ? "ringRotateCCW 18s linear infinite" : "none",
          willChange: animate ? "transform" : "auto",
        }}
      />
      {/* Glowing center pulse */}
      <div
        className="absolute rounded-full"
        style={{
          width: 88,
          height: 88,
          background:
            "radial-gradient(circle, rgba(162,69,250,0.07) 0%, transparent 70%)",
          animation: "centerPulse 3.5s ease-in-out infinite",
        }}
      />
      {/* Bismillah text */}
      <p
        className="relative z-10 text-5xl md:text-6xl select-none"
        style={{
          fontFamily: "'Amiri', serif",
          animation: "bismillahGlow 3.5s ease-in-out infinite",
        }}
      >
        ﷽
      </p>
      {/* 4 small diamond dots at cardinal points */}
      {[0, 90, 180, 270].map((deg) => (
        <div
          key={deg}
          className="absolute"
          style={{
            transform: `rotate(${deg}deg) translateY(-72px) rotate(-${deg}deg)`,
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: 1,
              background: "rgba(162,69,250,0.4)",
              boxShadow: "0 0 6px rgba(162,69,250,0.5)",
              animation: `dotPulse 2s ${deg / 360}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Hijri date helper ──────────────────────────────────────
function useHijriDate() {
  const [hijri, setHijri] = useState("");
  useEffect(() => {
    try {
      const d = new Date();
      const formatted = d.toLocaleDateString("id-ID-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setHijri(formatted);
    } catch {
      setHijri("");
    }
  }, []);
  return hijri;
}

// ── Twinkling star field (CSS-driven) ──────────────────────
function StarField({ config }: { config: TierConfig }) {
  const [stars] = useState(() =>
    Array.from({ length: config.stars }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      brightness: Math.random() * 0.35 + 0.05,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: `rgba(255, 230, 255, ${s.brightness})`,
              boxShadow: `0 0 ${s.size * 2}px rgba(200,160,255,${s.brightness * 1.2})`,
              animation: `starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
              "--tw-min": s.brightness * 0.2,
              "--tw-max": s.brightness,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ── Shooting stars (CSS-driven) ─────────────────────────────
function ShootingStars({ config }: { config: TierConfig }) {
  const [stars] = useState(() =>
    Array.from({ length: config.shootingStars }, (_, i) => ({
      id: i,
      startX: Math.random() * 85 + 2,
      startY: Math.random() * 45,
      length: Math.random() * 140 + 70,
      duration: (Math.random() * 1.2 + 0.7).toFixed(2),
      delay: (Math.random() * 20 + i * 1.8).toFixed(2),
      angle: Math.random() * 25 + 28,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            left: `${s.startX}%`,
            top: `${s.startY}%`,
            width: s.length,
            transform: `rotate(${s.angle}deg)`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Aurora blobs (CSS-driven, tier-aware) ───────────────────
function AuroraBlobs({ config }: { config: TierConfig }) {
  if (config.auroraBlobs === "none") {
    // LOW tier: just a simple static gradient, no animation at all
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 rounded-full"
          style={{
            width: 400,
            height: 300,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(162,69,250,0.1) 0%, transparent 70%)",
            filter: `blur(${config.blurAmount}px)`,
          }}
        />
      </div>
    );
  }

  const isFull = config.auroraBlobs === "full";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top aurora — always shown */}
      <div
        className="absolute -top-40 left-1/2 rounded-full"
        style={{
          width: isFull ? 1000 : 500,
          height: isFull ? 700 : 350,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(162,69,250,0.14) 0%, rgba(100,30,200,0.06) 40%, transparent 70%)",
          filter: `blur(${config.blurAmount}px)`,
          animation: "auroraTop 16s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Mid left blob — desktop only */}
      {isFull && (
        <div
          className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,44,245,0.09) 0%, transparent 65%)",
            filter: "blur(90px)",
            animation: "auroraLeft 20s 3s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        />
      )}
      {/* Mid right blob — desktop only */}
      {isFull && (
        <div
          className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(180,80,255,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "auroraRight 18s 6s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        />
      )}
      {/* Bottom center glow */}
      <div
        className="absolute -bottom-32 left-1/2 rounded-full"
        style={{
          width: isFull ? 800 : 400,
          height: isFull ? 400 : 200,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(100,20,180,0.08) 0%, transparent 65%)",
          filter: `blur(${config.blurAmount}px)`,
          animation: "auroraBottom 12s 2s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}

// ── Stagger variants (one-time entrance — keep framer-motion) ─
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

// ══════════════════════════════════════════════════════════
function Homepage() {
  const hijri = useHijriDate();
  const tier = usePerformanceTier();
  const config = TIER_CONFIG[tier];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── Layered background ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Animated aurora blobs */}
        <AuroraBlobs config={config} />

        {/* Twinkling star field */}
        <StarField config={config} />

        {/* Shooting stars */}
        <ShootingStars config={config} />

        {/* Subtle grid pattern — skip on low tier */}
        {config.gridPattern && (
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(162,69,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(162,69,250,0.8) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        )}

        {/* Scan line shimmer — high tier only */}
        {config.scanLine && (
          <div
            className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(162,69,250,0.06) 40%, rgba(200,150,255,0.12) 50%, rgba(162,69,250,0.06) 60%, transparent 100%)",
              animation: "scanLineMove 15s linear infinite",
            }}
          />
        )}
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ── Top bar ── */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 pt-6 pb-4"
        >
          {/* Logo mark */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: "rgba(162,69,250,0.15)",
                border: "1px solid rgba(162,69,250,0.25)",
              }}
            >
              ☪
            </div>
            <span
              className="font-bold text-sm tracking-wide"
              style={{
                background: "linear-gradient(135deg, #a245fa, #d4a0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Al-Quran Digital
            </span>
          </div>

          {/* Hijri date */}
          {hijri && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:block text-[11px] text-text-secondary/25 font-medium tracking-wide"
            >
              {hijri}
            </motion.p>
          )}
        </motion.header>

        {/* ── Hero section ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-16 relative">
          {/* Floating particles */}
          <FloatingParticles config={config} />

          {/* Bismillah with ring ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="mb-6 text-center"
          >
            <BismillahRing animate={config.ringAnimation} />
            {/* Subtitle under Bismillah */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-2 text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(162,69,250,0.3)" }}
            >
              Bismillahirrahmanirrahim
            </motion.p>
          </motion.div>

          {/* Headline */}
          <motion.div className="text-center mb-4 max-w-2xl">
            {/* Word-by-word stagger */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-text-primary">
              {["Baca,", "Hafal", "&"].map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {word}
                </motion.span>
              ))}{" "}
              <motion.span
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.65,
                  type: "spring",
                  stiffness: 200,
                }}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #8b2cf5 0%, #a245fa 40%, #d4a0ff 70%, #a245fa 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientShift 4s ease infinite",
                }}
              >
                Amalkan
              </motion.span>
            </h1>

            {/* Decorative line under headline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mx-auto mt-5 mb-1"
              style={{
                height: 1,
                width: 80,
                background:
                  "linear-gradient(90deg, transparent, rgba(162,69,250,0.5), transparent)",
                transformOrigin: "center",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-4 text-text-secondary/45 text-base md:text-lg leading-relaxed max-w-lg mx-auto"
            >
              Panduan lengkap membaca Al-Quran, doa harian, dzikir, dan kisah
              para nabi dalam satu aplikasi.
            </motion.p>

            {/* Animated stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 }}
              className="flex items-center justify-center gap-3 mt-5 flex-wrap"
            >
              {[
                { icon: "📖", label: "114 Surah" },
                { icon: "🤲", label: "37+ Doa" },
                { icon: "🕌", label: "25 Nabi" },
                { icon: "📿", label: "Dzikir" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(162,69,250,0.07)",
                    border: "1px solid rgba(162,69,250,0.15)",
                    color: "rgba(162,69,250,0.6)",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Featured + Grid layout ── */}
          <motion.div
            className="w-full max-w-4xl mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top row: Featured (Al-Quran) large + two cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              {/* ── Featured card: Al-Quran ── */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Link to="/quran" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card homepage-card--featured h-full min-h-[180px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />
                    <div className="homepage-card__bg-glow" />

                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <div className="homepage-card__badge mb-3">
                          ✦ Unggulan
                        </div>
                        <h2 className="homepage-card__featured-title">
                          Baca Al-Quran
                        </h2>
                        <p className="homepage-card__desc mt-1.5">
                          114 surah lengkap dengan terjemahan Bahasa Indonesia
                        </p>
                      </div>
                      <span className="homepage-card__icon text-4xl ml-4 flex-shrink-0">
                        📖
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div className="relative z-10 flex items-center justify-between mt-8">
                      <div className="flex items-center gap-4 text-xs text-text-secondary/30">
                        <span>114 Surah</span>
                        <span>·</span>
                        <span>6.236 Ayat</span>
                        <span>·</span>
                        <span>Terjemahan</span>
                      </div>
                      <div className="homepage-card__arrow-wrap">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* ── Doa card ── */}
              <motion.div variants={itemVariants}>
                <Link to="/doa" className="group block h-full">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card h-full min-h-[180px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10">
                      <span className="text-3xl block mb-3">🤲</span>
                      <h2 className="homepage-card__title">Kumpulan Doa</h2>
                      <p className="homepage-card__desc mt-1">
                        Doa harian beserta latin &amp; artinya
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-6">
                      <span className="homepage-card__stat">37+ Doa</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom row: two equal cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ── Kisah Nabi ── */}
              <motion.div variants={itemVariants}>
                <Link to="/kisah" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card min-h-[140px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10 flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🕌</span>
                      <div>
                        <h2 className="homepage-card__title">
                          Kisah Nabi &amp; Rasul
                        </h2>
                        <p className="homepage-card__desc mt-1">
                          Kisah inspiratif 25 nabi dan rasul pilihan
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-5">
                      <span className="homepage-card__stat">25 Nabi</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* ── Dzikir ── */}
              <motion.div variants={itemVariants}>
                <Link to="/dzikir" className="group block">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="homepage-card min-h-[140px] flex flex-col justify-between"
                  >
                    <div className="homepage-card__glow-line" />

                    <div className="relative z-10 flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">📿</span>
                      <div>
                        <h2 className="homepage-card__title">
                          Penghitung Dzikir
                        </h2>
                        <p className="homepage-card__desc mt-1">
                          Counter dzikir digital dengan getaran
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-5">
                      <span className="homepage-card__stat">Digital</span>
                      <div className="homepage-card__arrow-wrap">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Footer credit ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-14 text-center pb-safe"
          >
            <div className="flex items-center gap-3 justify-center text-text-secondary/15 text-xs mb-1">
              <div className="w-10 h-px bg-text-secondary/10" />
              <span className="tracking-widest text-[10px] uppercase">
                Sigit Aringga
              </span>
              <div className="w-10 h-px bg-text-secondary/10" />
            </div>
            <p className="text-[10px] text-text-secondary/15 tracking-wide">
              Al-Quran Digital © 2024
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;