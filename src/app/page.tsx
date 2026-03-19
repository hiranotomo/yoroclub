import PixelHero from "@/components/PixelHero";
import PixelDivider from "@/components/PixelDivider";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <PixelHero />

      <PixelDivider />

      {/* ABOUT */}
      <section id="about" className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
            About
          </p>
          <p className="text-sm md:text-base leading-[2] text-gray-800">
            養老孟司先生の周りにいる虫好きたち。集まる機会が結構あります。こうなったら、と養老先生公認で遊んでまいります。ロゴはメンバーの一人、グラフィックデザイナーの佐藤卓さんのボランティア制作です。虫周りの楽しい情報を発信していきます。
          </p>
          <p className="mt-6 text-sm md:text-base leading-[2] text-gray-800">
            養老先生が虫採りを一緒にする虫屋たち、建長寺の虫塚を一緒に作った仲間たち、さまざまな虫の展示で一緒に動いた人たち。そんな人たちがメンバーです。生きもの、特に昆虫を採ったり見たり、そこから何か表現したり制作したり。そんな集まりです。
          </p>
        </div>
      </section>

      <PixelDivider inverted />

      {/* EXHIBITION */}
      <section className="bg-black text-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[3px] text-gray-500 uppercase font-[var(--font-jetbrains-mono)] mb-6">
            Exhibition
          </p>
          <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3">
            養老孟司と小檜山賢二の虫展
          </h2>
          <p className="text-sm text-gray-400 mb-1">
            東京都写真美術館（恵比寿）
          </p>
          <p className="text-sm md:text-base text-white py-3 border-b border-gray-800 font-[var(--font-jetbrains-mono)]">
            2025.3.21 (金) — 5.24 (土)
          </p>
          <p className="mt-4 text-sm text-gray-500">
            巡回：豊田市立博物館（2025年7月11日〜）
          </p>
          <p className="mt-6 text-sm leading-[2] text-gray-400">
            養老昆虫クラブは本展に協力&応援中！
          </p>
        </div>
      </section>

      <PixelDivider />

      {/* THEME SONG */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
            Theme Song
          </p>
          <h3 className="text-base md:text-lg font-bold mb-1">
            「むしのいどころ」
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            すてぃぎもろく
          </p>
          <p className="text-xs text-gray-400 mb-8">
            養老昆虫クラブ presents
          </p>
          <YouTubeEmbed videoId="HoRqKxLJFAo" />
        </div>
      </section>

      {/* SNS + FOOTER */}
      <footer className="bg-white border-t border-gray-100 px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[3px] text-gray-400 uppercase font-[var(--font-jetbrains-mono)] mb-6">
            Follow Us
          </p>
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="#"
              className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href="#"
              className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://www.youtube.com/watch?v=HoRqKxLJFAo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-black text-white flex items-center justify-center text-xs font-bold font-[var(--font-jetbrains-mono)] hover:bg-gray-800 transition-colors"
              aria-label="YouTube"
            >
              YT
            </a>
          </div>
          <p className="text-xs text-gray-400 font-[var(--font-jetbrains-mono)]">
            &copy; 養老昆虫クラブ
          </p>
        </div>
      </footer>
    </main>
  );
}
