"use client";

import { useState } from "react";
import PixelHero from "@/components/PixelHero";
import PixelDivider from "@/components/PixelDivider";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SoundLink from "@/components/SoundLink";
import SplashScreen from "@/components/SplashScreen";
import { LanguageSwitcher } from "@/components/LanguageProvider";
import { useLanguage } from "@/components/LanguageProvider";
import PixelBugs from "@/components/PixelBugs";
import SectionSound from "@/components/SectionSound";
import { MuteButton } from "@/components/SoundProvider";
import { useSoundEngine } from "@/components/SoundProvider";
import NewspaperShelf from "@/components/NewspaperShelf";

const GALLERY_TALKS = [
  { date: "4/25 (土) 14:00", speaker: "小檜山賢二" },
  { date: "4/26 (日) 16:00", speaker: "柳瀬博一 × 平野友康" },
  { date: "5/2 (土) 14:00", speaker: "小檜山賢二" },
  { date: "5/4 (月祝) 14:00", speaker: "茂木健一郎" },
  { date: "5/6 (水祝) 14:00", speaker: "小檜山賢二" },
  { date: "5/9 (土) 14:00", speaker: "小檜山賢二" },
];

const TOUR_SCHEDULE = [
  { period: "2026.3.21 — 5.24", venue: "東京都写真美術館", status: "now" },
  { period: "2026.7.11 — 9.23", venue: "豊田市博物館", status: "" },
  { period: "2026.10.9 — 11.29", venue: "岡山県立美術館", status: "" },
  { period: "2026 冬", venue: "九州地方", status: "coming" },
  { period: "2027 夏", venue: "東海地方", status: "coming" },
];

const MEDIA_LIST = [
  {
    outlet: "NHK Eテレ「日曜美術館 アートシーン」",
    date: "4/5, 4/11, 4/12",
  },
  {
    outlet: "TOKYO FM「リリー・フランキー スナック ラジオ」",
    date: "4/4, 4/11 16:00-16:55",
  },
  { outlet: "週刊新潮（4/9号）", date: "4/2 発売" },
  {
    outlet: "デイリー新潮",
    date: "4/3 配信",
    url: "https://www.dailyshincho.jp/article/2026/04030535/",
  },
  { outlet: "芸術新潮", date: "5月号" },
  { outlet: "毎日小学生新聞", date: "4/24" },
  { outlet: "朝日学生新聞", date: "4/17, 4/26" },
  { outlet: "東京新聞", date: "4/23 都心版" },
];

export default function PageContent() {
  const { t } = useLanguage();
  const { playSE } = useSoundEngine();
  const [bugsEnabled, setBugsEnabled] = useState(true);

  return (
    <SplashScreen>
      <LanguageSwitcher />
      {bugsEnabled && <PixelBugs />}
      <SectionSound />
      {/* Controls: bottom-left */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-1">
        <MuteButton />
        <button
          onClick={() => {
            playSE("select");
            setBugsEnabled((v) => !v);
          }}
          className="w-8 h-8 bg-black/60 text-white flex items-center justify-center text-xs font-[var(--font-jetbrains-mono)] hover:bg-black/80 transition-colors rounded"
          aria-label={bugsEnabled ? "Bug game OFF" : "Bug game ON"}
          title={bugsEnabled ? "Bug game OFF" : "Bug game ON"}
        >
          {bugsEnabled ? "🪲" : "⬜"}
        </button>
      </div>
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

        {/* NEWSPAPER (main content) */}
        <NewspaperShelf />

        <PixelDivider inverted />

        {/* EXHIBITION */}
        <section id="exhibition" className="bg-black text-white px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("exhibition.label")}
            </p>

            {/* メインビジュアル（ポスター） */}
            <a
              href="https://topmuseum.jp/exhibition/5454/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-8 group"
              aria-label={t("exhibition.title")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/exhibition-poster.png"
                alt={t("exhibition.title")}
                className="w-full max-w-md mx-auto block transition-opacity group-hover:opacity-90"
              />
            </a>

            <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3">
              <a
                href="https://topmuseum.jp/exhibition/5454/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline decoration-gray-700 underline-offset-4 hover:decoration-gray-400"
              >
                {t("exhibition.title")}
              </a>
            </h2>
            <p className="text-sm text-gray-400 mb-1">
              {t("exhibition.venue")}
            </p>
            <p className="text-sm md:text-base text-white py-3 border-b border-gray-800 font-[var(--font-jetbrains-mono)]">
              {t("exhibition.date")}
            </p>
            <p className="mt-6 text-sm leading-[2] text-gray-400">
              {t("exhibition.note")}
            </p>

            {/* 公式リンク */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://topmuseum.jp/exhibition/5454/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-[var(--font-jetbrains-mono)] hover:bg-gray-200 transition-colors"
              >
                ▶ {t("exhibition.officialSite")}
              </a>
              <a
                href="https://crevis.co.jp/exhibitions/mushi_ten/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-xs font-[var(--font-jetbrains-mono)] hover:bg-gray-700 transition-colors"
              >
                ▶ {t("exhibition.organizer")}
              </a>
            </div>
          </div>
        </section>

        {/* EVENT PHOTO */}
        <section className="bg-black px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <img
              src="/event-20260404.jpg"
              alt="2026年4月4日 講演会の様子"
              className="w-full rounded-lg"
            />
            <p className="text-[10px] text-gray-600 font-[var(--font-jetbrains-mono)] mt-2 text-center">
              {t("eventPhoto.caption")}
            </p>
          </div>
        </section>

        {/* EVENTS */}
        <section className="bg-black text-white px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("events.label")}
            </p>

            {/* Lecture */}
            <div className="mb-8 p-4 border border-gray-800">
              <p className="text-xs text-yellow-400 font-[var(--font-jetbrains-mono)] mb-1">
                LECTURE
              </p>
              <h3 className="text-sm md:text-base font-bold mb-1">
                {t("events.lecture")}
              </h3>
              <p className="text-sm text-gray-300">
                {t("events.lectureSpeakers")}
              </p>
              <p className="text-xs text-gray-400 mt-2 font-[var(--font-jetbrains-mono)]">
                {t("events.lectureDate")}
              </p>
              <p className="text-xs text-gray-500">
                {t("events.lectureVenue")}
              </p>
            </div>

            {/* Gallery Talks */}
            <div className="mb-6">
              <p className="text-xs text-yellow-400 font-[var(--font-jetbrains-mono)] mb-3">
                {t("events.galleryTalk")}
              </p>
              <p className="text-[10px] text-gray-600 mb-2">
                {t("events.galleryTalkVenue")}
              </p>
              <div className="space-y-1">
                {GALLERY_TALKS.map((talk, i) => (
                  <div key={i} className="flex gap-4 text-xs">
                    <span className="text-gray-500 font-[var(--font-jetbrains-mono)] w-32 shrink-0">
                      {talk.date}
                    </span>
                    <span className="text-gray-300">{talk.speaker}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-gray-600 mt-4">
              {t("events.latestInfo")}:{" "}
              <a
                href="https://crevis.co.jp/exhibitions/mushi_ten/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 underline hover:text-white transition-colors"
              >
                crevis.co.jp
              </a>
            </p>
          </div>
        </section>

        {/* TOUR */}
        <section className="bg-black text-white px-6 py-16 border-t border-gray-900">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("tour.label")}
            </p>
            <h3 className="text-sm md:text-base font-bold mb-6">
              {t("tour.title")}
            </h3>
            <div className="space-y-3">
              {TOUR_SCHEDULE.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-gray-900 ${
                    item.status === "now" ? "text-white" : "text-gray-500"
                  }`}
                >
                  <span className="font-[var(--font-jetbrains-mono)] text-xs w-40 shrink-0">
                    {item.period}
                  </span>
                  <span className="text-sm">{item.venue}</span>
                  {item.status === "now" && (
                    <span className="text-[10px] bg-white text-black px-2 py-0.5 font-bold font-[var(--font-jetbrains-mono)] w-fit">
                      NOW
                    </span>
                  )}
                  {item.status === "coming" && (
                    <span className="text-[10px] text-gray-600 font-[var(--font-jetbrains-mono)]">
                      COMING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MEDIA */}
        <section className="bg-black text-white px-6 py-16 border-t border-gray-900">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("media.label")}
            </p>
            <h3 className="text-sm md:text-base font-bold mb-6">
              {t("media.title")}
            </h3>
            <div className="space-y-2">
              {MEDIA_LIST.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs py-1.5 border-b border-gray-900">
                  <span className="text-gray-300 sm:flex-1">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                      >
                        {item.outlet}
                      </a>
                    ) : (
                      item.outlet
                    )}
                  </span>
                  <span className="text-gray-600 font-[var(--font-jetbrains-mono)] shrink-0">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
            {/* YouTube archive note */}
            <p className="text-[10px] text-gray-600 mt-6 leading-relaxed">
              4/4 講演会は新潮社 公式YouTube「
              <a
                href="https://www.youtube.com/@ino_doku"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 underline hover:text-white"
              >
                イノベーション読書
              </a>
              」にて4月中旬公開予定
            </p>
          </div>
        </section>

        {/* AMBASSADOR */}
        <section className="bg-black text-white px-6 py-16 border-t border-gray-900">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
              {t("ambassador.label")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/pptx-images/slide2_img0.png"
                alt={t("ambassador.name")}
                className="w-full sm:w-48 rounded-lg object-cover"
              />
              <div>
                <p className="text-xs text-yellow-400 font-[var(--font-jetbrains-mono)] mb-1">
                  {t("ambassador.title")}
                </p>
                <h3 className="text-lg font-bold mb-2">
                  {t("ambassador.name")}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                  {t("ambassador.description")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.youtube.com/channel/UCBYFb5Tynk3s7sy4KI8iJ8w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-[var(--font-jetbrains-mono)] hover:bg-gray-200 transition-colors"
                  >
                    ▶ ひよりの虫日記
                  </a>
                  <a
                    href="https://x.com/piyo_bug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white text-xs font-[var(--font-jetbrains-mono)] hover:bg-gray-700 transition-colors"
                  >
                    𝕏 @piyo_bug
                  </a>
                  <a
                    href="https://www.instagram.com/hiyori_katada/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white text-xs font-[var(--font-jetbrains-mono)] hover:bg-gray-700 transition-colors"
                  >
                    IG @hiyori_katada
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PixelDivider />

        {/* THEME SONG */}
        <section id="theme-song" className="bg-white px-6 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6 text-center">
              {t("theme.label")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
              <img
                src="/pptx-images/slide2_img4.png"
                alt="むしのいどころ ジャケット"
                className="w-40 h-40 rounded-full object-cover shadow-lg"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-base md:text-lg font-bold mb-1">
                  {t("theme.title")}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {t("theme.artist")}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  {t("theme.presents")}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t("theme.bio")}
                </p>
              </div>
            </div>
            {/* Artist photo */}
            <div className="mb-8">
              <img
                src="/pptx-images/slide2_img3.jpg"
                alt="すてぃぎもろく"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
            <YouTubeEmbed videoId="HoRqKxLJFAo" />
          </div>
        </section>

        {/* SNS + FOOTER */}
        <footer id="footer" className="bg-white border-t border-gray-100 px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-4">
              {t("footer.followUs")}
            </p>
            <p className="text-xs text-gray-500 mb-6">
              {t("footer.followNote")}
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <SoundLink
                href="https://x.com/yoroclub"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white flex items-center justify-center text-sm font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors gap-2"
                aria-label="X (Twitter)"
              >
                𝕏 @yoroclub
              </SoundLink>
            </div>
            <div className="flex justify-center gap-3 mb-10">
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
