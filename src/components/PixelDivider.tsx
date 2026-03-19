"use client";

export default function PixelDivider({ inverted = false }: { inverted?: boolean }) {
  const color = inverted ? "bg-white" : "bg-black";
  return (
    <div className={`flex justify-center gap-1 py-6 ${inverted ? "bg-black" : "bg-white"}`}>
      <span className={`w-2 h-2 ${color}`} />
      <span className={`w-2 h-2 ${color}`} />
      <span className={`w-2 h-2 ${color}`} />
      <span className="w-2 h-2" />
      <span className={`w-2 h-2 ${color}`} />
      <span className={`w-2 h-2 ${color}`} />
      <span className="w-2 h-2" />
      <span className={`w-2 h-2 ${color}`} />
    </div>
  );
}
