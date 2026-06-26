// src/components/Number.tsx

type NumberProps = {
  nomor: number;
};

function Number({ nomor }: NumberProps) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
      style={{
        background: "rgba(48, 54, 61, 0.3)",
        border: "1px solid rgba(48, 54, 61, 0.4)",
        color: "rgba(139, 148, 158, 0.7)",
      }}
    >
      {nomor}
    </div>
  );
}

export default Number;
