"use client";

import { useState } from "react";
import { useSoundEngine } from "./SoundProvider";
import { useLanguage, LanguageSwitcher } from "./LanguageProvider";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const { playSE } = useSoundEngine();
  const { t } = useLanguage();

  if (entered) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8">
      <LanguageSwitcher />

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
          {t("hero.title")}
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
          fetch("/api/players", { method: "POST" }).catch(() => {});
        }}
        className="mt-4 px-8 py-3 bg-black text-white text-sm font-[var(--font-jetbrains-mono)] tracking-widest hover:bg-gray-800 transition-colors animate-pulse"
      >
        {t("splash.enter")}
      </button>

      <p className="text-[10px] text-gray-400 font-[var(--font-jetbrains-mono)]">
        {t("splash.soundOn")}
      </p>
    </div>
  );
}
