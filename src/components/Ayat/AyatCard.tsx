// src/components/Ayat/AyatCard.tsx
import type { Ayat } from "../../types/Surah";

type AyatCardProps = {
  ayat: Ayat;
};

function AyatCard({ ayat }: AyatCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      {/* Kolom Nomor Ayat */}
      <div className="flex flex-col items-center gap-4">
         <p className="flex items-center justify-center font-bold text-primary border-2 border-primary rounded-full w-10 h-10">
          {ayat.nomorAyat}
        </p>
      </div>

      {/* Kolom Teks Ayat */}
      <div className="w-full">
        <p className="text-3xl md:text-4xl text-right w-full leading-loose font-arabic text-text-primary mb-6">
          {ayat.teksArab}
        </p>
        <p className="text-sm text-primary/80 italic mb-2">{ayat.teksLatin}</p>
        <p className="text-base text-text-secondary leading-relaxed">{ayat.teksIndonesia}</p>
      </div>
    </div>
  );
}

export default AyatCard;