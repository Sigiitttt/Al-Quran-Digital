// src/components/Verse.tsx

type VerseProps = {
  verse: string;
  surah: string;
};

function Verse({ verse, surah }: VerseProps) {
  return (
    <div
      className="p-5 min-h-[140px] rounded-2xl text-left flex flex-col justify-between"
      style={{
        background: "rgba(13, 17, 23, 0.7)",
        border: "1px solid rgba(48, 54, 61, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs text-text-secondary/40 font-medium tracking-wide">
          📖 Your daily verse
        </p>
        <p className="font-semibold text-sm md:text-base text-text-primary leading-relaxed">
          {verse}
        </p>
      </div>
      <p className="text-xs text-text-secondary/30 mt-4">{surah}</p>
    </div>
  );
}

export default Verse;
