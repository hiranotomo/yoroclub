"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createSoundEngine } from "8bit-sound-engine";

type SoundEngine = ReturnType<typeof createSoundEngine>;

interface SoundContextValue {
  playSE: (name: string) => void;
  engine: SoundEngine | null;
}

const SoundContext = createContext<SoundContextValue>({
  playSE: () => {},
  engine: null,
});

export function useSoundEngine() {
  return useContext(SoundContext);
}

export default function SoundProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<SoundEngine | null>(null);
  const bgmStartedRef = useRef(false);
  const [engine, setEngine] = useState<SoundEngine | null>(null);

  // Initialize engine on mount
  useEffect(() => {
    const e = createSoundEngine({
      reverb: { duration: 1.5, decay: 2.0, mix: 0.15 },
    });
    engineRef.current = e;
    setEngine(e);
  }, []);

  // Start BGM on first user interaction
  useEffect(() => {
    if (!engine) return;

    const startBGM = async () => {
      if (bgmStartedRef.current) return;
      bgmStartedRef.current = true;

      try {
        await engine.resume();
        const res = await fetch(
          "https://8bit-eight.vercel.app/api/songs/d101122a"
        );
        const song = await res.json();
        engine.bgm.play(song.definition);
      } catch {
        bgmStartedRef.current = false;
      }
    };

    const events = ["click", "touchstart", "keydown"] as const;
    const handler = () => {
      startBGM();
      for (const evt of events) {
        document.removeEventListener(evt, handler);
      }
    };

    for (const evt of events) {
      document.addEventListener(evt, handler, { once: false });
    }

    return () => {
      for (const evt of events) {
        document.removeEventListener(evt, handler);
      }
    };
  }, [engine]);

  const playSE = useCallback(
    (name: string) => {
      if (!engine) return;
      engine.resume().then(() => {
        engine.se.play(name);
      });
    },
    [engine]
  );

  return (
    <SoundContext.Provider value={{ playSE, engine }}>
      {children}
    </SoundContext.Provider>
  );
}
