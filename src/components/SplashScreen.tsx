"use client";

import { useState } from "react";
import { useSoundEngine } from "./SoundProvider";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const { playSE } = useSoundEngine();

  if (entered) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2" />
          <span className="w-2 h-2 bg-black" />
        </div>
        <h1 className="text-xl md:text-3xl font-bold tracking-[0.2em] text-black">
          養老昆虫クラブ
        </h1>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
          <span className="w-2 h-2 bg-black" />
        </div>
      </div>

      <button
        onClick={() => {
          playSE("powerup");
          setEntered(true);
        }}
        className="mt-4 px-8 py-3 bg-black text-white text-sm font-[var(--font-jetbrains-mono)] tracking-widest hover:bg-gray-800 transition-colors animate-pulse"
      >
        ▶ ENTER
      </button>

      <p className="text-[10px] text-gray-400 font-[var(--font-jetbrains-mono)]">
        ♪ SOUND ON
      </p>
    </div>
  );
}
