// src/pages/DoaPage.tsx

import { Link } from "react-router-dom";
import DoaContainer from "../components/Doa/DoaContainer";
import { motion } from "framer-motion";

function DoaPage() {
  return (
    <div className="min-h-screen relative">

      {/* ── Background ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(162,69,250,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,44,245,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Sticky Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 px-6 md:px-10 py-3.5"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(1, 4, 9, 0.75)",
          borderBottom: "1px solid rgba(48, 54, 61, 0.28)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-text-secondary hover:text-primary text-sm transition-colors duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Menu Utama</span>
          </Link>

          <p className="text-text-secondary/25 text-[10px] font-semibold tracking-[0.3em] uppercase">
            Doa Harian
          </p>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative z-10 px-6 md:px-10 pt-10 md:pt-14 pb-4"
      >
        <div className="max-w-6xl mx-auto">

          {/* Arabic opener */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.25 }}
            className="text-primary text-2xl mb-3"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            ٱدْعُوا۟ رَبَّكُمْ
          </motion.p>

          {/* Title row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                Kumpulan{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #8b2cf5 0%, #a245fa 50%, #d4a0ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Doa
                </span>
                {" "}Sehari-hari
              </h1>
              <p className="mt-2.5 text-text-secondary/50 text-sm md:text-base max-w-lg leading-relaxed">
                Doa-doa pilihan untuk menemani aktivitas harianmu
              </p>
            </div>

            {/* Stat badges */}
            <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
              {[
                { label: "Doa", value: "37+" },
                { label: "Kategori", value: "10+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    background: "rgba(162,69,250,0.06)",
                    border: "1px solid rgba(162,69,250,0.12)",
                    color: "rgba(139, 148, 158, 0.65)",
                  }}
                >
                  <span className="text-primary/80 font-bold">{stat.value}</span>{" "}
                  {stat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Thin divider */}
          <div
            className="mt-8 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(162,69,250,0.18), rgba(48,54,61,0.2), transparent)",
            }}
          />
        </div>
      </motion.header>

      {/* ── Content ── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="relative z-10 px-6 md:px-10 pt-8 pb-20"
      >
        <div className="max-w-6xl mx-auto">
          <DoaContainer />
        </div>
      </motion.main>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center pb-8">
        <div className="flex items-center gap-3 justify-center text-text-secondary/15 text-xs">
          <div className="w-8 h-px bg-text-secondary/10" />
          <span className="tracking-wider">QS. Al-Ghafir: 60</span>
          <div className="w-8 h-px bg-text-secondary/10" />
        </div>
      </footer>
    </div>
  );
}

export default DoaPage;