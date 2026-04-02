"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { ReactNode } from "react";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import { useSoundEngine } from "./SoundProvider";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  cheatActivated: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ja",
  setLocale: () => {},
  t: (key) => key,
  cheatActivated: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "ja";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("en")) return "en";
  return "ja";
}

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>("ja");
  const [cheatActivated, setCheatActivated] = useState(false);

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? key,
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, cheatActivated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, cheatActivated } = useLanguage();
  const { playSE } = useSoundEngine();
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const flags: { code: Locale; label: string; flag: string }[] = [
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  const handleClick = (code: Locale) => {
    playSE("select");
    setLocale(code);

    // Cheat code: 10 rapid clicks on any flag
    clickCountRef.current++;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3000);

    if (clickCountRef.current >= 10 && !cheatActivated) {
      clickCountRef.current = 0;
      // Dispatch custom event that PixelBugs listens to
      window.dispatchEvent(new CustomEvent("cheat-boss"));
      playSE("1up");
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1">
      {flags.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => handleClick(code)}
          className={`w-9 h-9 flex items-center justify-center text-lg rounded transition-all ${
            locale === code
              ? "bg-black text-white scale-110"
              : "bg-white/80 hover:bg-white hover:scale-105"
          }`}
          aria-label={label}
          title={label}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
