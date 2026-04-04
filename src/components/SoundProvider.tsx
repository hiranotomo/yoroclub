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
import { createSoundEngine, overworld } from "8bit-sound-engine";

type SoundEngine = ReturnType<typeof createSoundEngine>;

interface SoundContextValue {
  playSE: (name: string) => void;
  engine: SoundEngine | null;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  playSE: () => {},
  engine: null,
  muted: false,
  toggleMute: () => {},
});

export function useSoundEngine() {
  return useContext(SoundContext);
}

export default function SoundProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<SoundEngine | null>(null);
  const bgmStartedRef = useRef(false);
  const [engine, setEngine] = useState<SoundEngine | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

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
        engine.bgm.play(overworld);
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

  const toggleMute = useCallback(() => {
    if (!engine) return;
    const newMuted = !mutedRef.current;
    mutedRef.current = newMuted;
    setMuted(newMuted);
    // Mute/unmute all BGM channels
    if (newMuted) {
      engine.bgm.stop({ fade: 100 });
    } else {
      engine.resume().then(() => {
        engine.bgm.play(overworld);
      });
    }
  }, [engine]);

  const playSE = useCallback(
    (name: string) => {
      if (!engine || mutedRef.current) return;
      engine.resume().then(() => {
        engine.se.play(name);
      });
    },
    [engine]
  );

  return (
    <SoundContext.Provider value={{ playSE, engine, muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function MuteButton() {
  const { muted, toggleMute } = useSoundEngine();

  return (
    <button
      onClick={toggleMute}
      className="w-8 h-8 bg-black/60 text-white flex items-center justify-center text-xs font-[var(--font-jetbrains-mono)] hover:bg-black/80 transition-colors rounded"
      aria-label={muted ? "Unmute" : "Mute"}
      title={muted ? "Sound ON" : "Sound OFF"}
    >
      {muted ? "🔇" : "♪"}
    </button>
  );
}
