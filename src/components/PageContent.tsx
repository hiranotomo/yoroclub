"use client";

import PixelHero from "@/components/PixelHero";
import PixelDivider from "@/components/PixelDivider";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SoundLink from "@/components/SoundLink";
import SplashScreen from "@/components/SplashScreen";
import { LanguageSwitcher } from "@/components/LanguageProvider";
import { useLanguage } from "@/components/LanguageProvider";
import PixelBugs from "@/components/PixelBugs";
import SectionSound from "@/components/SectionSound";

export default function PageContent() {
  const { t } = useLanguage();

  return (
    <SplashScreen>
      <LanguageSwitcher />
      <PixelBugs />
      <SectionSound />
      <main>
        {/* HERO */}
        <PixelHero />

        <PixelDivider />

        {/* ABOUT */}
        <section id="about" className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("about.label")}
            </p>
            <p className="text-sm md:text-base leading-[2] text-gray-800">
              {t("about.body1")}
            </p>
            <p className="mt-6 text-sm md:text-base leading-[2] text-gray-800">
              {t("about.body2")}
            </p>
          </div>
        </section>

        <PixelDivider inverted />

        {/* EXHIBITION */}
        <section id="exhibition" className="bg-black text-white px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("exhibition.label")}
            </p>
            <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3">
              {t("exhibition.title")}
            </h2>
            <p className="text-sm text-gray-400 mb-1">
              {t("exhibition.venue")}
            </p>
            <p className="text-sm md:text-base text-white py-3 border-b border-gray-800 font-[var(--font-jetbrains-mono)]">
              {t("exhibition.date")}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {t("exhibition.tour")}
            </p>
            <p className="mt-6 text-sm leading-[2] text-gray-400">
              {t("exhibition.note")}
            </p>
          </div>
        </section>

        <PixelDivider />

        {/* THEME SONG */}
        <section id="theme-song" className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("theme.label")}
            </p>
            <h3 className="text-base md:text-lg font-bold mb-1">
              {t("theme.title")}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {t("theme.artist")}
            </p>
            <p className="text-xs text-gray-400 mb-8">
              {t("theme.presents")}
            </p>
            <YouTubeEmbed videoId="HoRqKxLJFAo" />
          </div>
        </section>

        {/* SNS + FOOTER */}
        <footer id="footer" className="bg-white border-t border-gray-100 px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("footer.followUs")}
            </p>
            <div className="flex justify-center gap-4 mb-10">
              <SoundLink
                href="#"
                className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
                aria-label="X (Twitter)"
              >
                X
              </SoundLink>
              <SoundLink
                href="#"
                className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
                aria-label="Instagram"
              >
                IG
              </SoundLink>
              <SoundLink
                href="https://www.youtube.com/watch?v=HoRqKxLJFAo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
                aria-label="YouTube"
              >
                YT
              </SoundLink>
            </div>
            <p className="text-xs text-gray-400 font-[var(--font-jetbrains-mono)]">
              {t("footer.copyright")}
            </p>
          </div>
        </footer>
      </main>
    </SplashScreen>
  );
}
