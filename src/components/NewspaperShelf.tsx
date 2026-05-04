"use client";

import SoundLink from "@/components/SoundLink";
import { useLanguage } from "@/components/LanguageProvider";

type Issue = {
  id: string;
  number: string; // 第０号 / 第一号
  status?: string; // 創刊準備号 / 創刊号
  date: string; // 2026.04.26
  title: string; // 特集タイトル等
  thumb: string;
  htmlPath: string;
  pdfPath: string;
};

const ISSUES: Issue[] = [
  {
    id: "issue-1",
    number: "第１号",
    status: "創刊号",
    date: "2026.05.05",
    title: "「ホタルと里山の再生」特集",
    thumb: "/news/issue-1-thumb.png",
    htmlPath: "/news/issue-1/index.html",
    pdfPath: "/news/issue-1.pdf",
  },
];

export default function NewspaperShelf() {
  const { t } = useLanguage();
  const latest = ISSUES[0];
  const back = ISSUES.slice(1);

  return (
    <section
      id="newspaper"
      className="bg-white px-6 py-20 md:py-28 border-t border-b border-gray-100"
    >
      <div className="max-w-3xl mx-auto">
        {/* キッカー */}
        <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
          {t("newspaper.label")}
        </p>

        {/* タイトル */}
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide mb-8 leading-tight">
          {t("newspaper.title")}
        </h2>

        {/* リード文 */}
        <div className="space-y-6 mb-12 text-sm md:text-base leading-[2] text-gray-800">
          <p>{t("newspaper.lead1")}</p>
          <p>{t("newspaper.lead2")}</p>
        </div>

        {/* 編集員クレジット */}
        <p className="text-xs md:text-sm text-gray-500 leading-[2] mb-2">
          <span className="text-gray-700">主筆</span>：養老孟司　／
          <span className="text-gray-700">発行人</span>：平野友康　／
          <span className="text-gray-700">編集人</span>：足立真穂　／
          <span className="text-gray-700">編集同人</span>：柳瀬博一　／
          <span className="text-gray-700">ロゴ</span>：佐藤卓
        </p>

        {/* 入手案内 */}
        <p className="text-xs md:text-sm text-gray-600 leading-[2] mb-12 pb-12 border-b border-dotted border-gray-300">
          {t("newspaper.distribution")}
        </p>

        {/* 最新号ヒーロー */}
        <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-4">
          {t("newspaper.latest")}
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* サムネイル */}
          <SoundLink
            href={latest.htmlPath}
            target="_blank"
            rel="noopener noreferrer"
            className="block flex-shrink-0 group"
            aria-label={`${latest.number} を読む`}
          >
            <div className="relative shadow-lg group-hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={latest.thumb}
                alt={`${latest.number} 第一面`}
                className="w-full md:w-72 h-auto block"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          </SoundLink>

          {/* メタ情報 + アクション */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs text-gray-500 font-[var(--font-jetbrains-mono)] mb-2">
              {latest.date}
            </p>
            <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
              {latest.number}
              {latest.status && (
                <span className="ml-3 text-sm md:text-base text-gray-500 font-normal">
                  {latest.status}
                </span>
              )}
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
              {latest.title}
            </p>
            <div className="flex flex-wrap gap-3">
              <SoundLink
                href={latest.htmlPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                {t("newspaper.read")}
              </SoundLink>
              <SoundLink
                href={latest.pdfPath}
                download
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-black text-black text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PDF
              </SoundLink>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
              {t("newspaper.printNote")}
            </p>
          </div>
        </div>

        {/* バックナンバー */}
        {back.length > 0 ? (
          <>
            <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-4">
              {t("newspaper.backissues")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {back.map((issue) => (
                <SoundLink
                  key={issue.id}
                  href={issue.htmlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={issue.thumb}
                      alt={`${issue.number} 第一面`}
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="text-xs font-[var(--font-jetbrains-mono)] text-gray-500">
                    {issue.date}
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {issue.number}
                    {issue.status && (
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        {issue.status}
                      </span>
                    )}
                  </p>
                </SoundLink>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs md:text-sm text-gray-400 italic">
            {t("newspaper.comingSoon")}
          </p>
        )}
      </div>
    </section>
  );
}
