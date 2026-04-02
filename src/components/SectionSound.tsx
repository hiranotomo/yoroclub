"use client";

import { useEffect, useRef } from "react";
import { useSoundEngine } from "./SoundProvider";
import { overworld } from "8bit-sound-engine";

interface SectionConfig {
  id: string;
  se?: string;
  bgmAction?: "full" | "reduce" | "stop" | "resume";
}

const SECTIONS: SectionConfig[] = [
  { id: "about", se: "select", bgmAction: "full" },
  { id: "exhibition", se: "coin", bgmAction: "reduce" },
  { id: "theme-song", se: "cancel", bgmAction: "stop" },
  { id: "footer", se: "select", bgmAction: "resume" },
];

export default function SectionSound() {
  const { engine } = useSoundEngine();
  const lastTriggeredRef = useRef<Record<string, number>>({});
  const DEBOUNCE_MS = 2000;

  useEffect(() => {
    if (!engine) return;

    const observers: IntersectionObserver[] = [];

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const now = Date.now();
            const last = lastTriggeredRef.current[section.id] || 0;
            if (now - last < DEBOUNCE_MS) continue;
            lastTriggeredRef.current[section.id] = now;

            // Play SE
            if (section.se) {
              engine.resume().then(() => {
                engine.se.play(section.se!);
              });
            }

            // BGM variation
            if (section.bgmAction) {
              engine.resume().then(() => {
                switch (section.bgmAction) {
                  case "full":
                    engine.bgm.setVariation("FULL");
                    break;
                  case "reduce":
                    engine.bgm.setChannelMute(1, true);
                    engine.bgm.setChannelMute(3, true);
                    break;
                  case "stop":
                    engine.bgm.stop({ fade: 500 });
                    break;
                  case "resume":
                    engine.bgm.play(overworld);
                    break;
                }
              });
            }
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) {
        obs.disconnect();
      }
    };
  }, [engine]);

  return null;
}
