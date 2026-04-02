"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import { useSoundEngine } from "./SoundProvider";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ja",
  setLocale: () => {},
  t: (key) => key,
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

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? key,
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { playSE } = useSoundEngine();

  const flags: { code: Locale; label: string; flag: string }[] = [
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1">
      {flags.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => {
            playSE("select");
            setLocale(code);
          }}
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
