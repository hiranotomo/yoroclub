import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SoundProvider from "@/components/SoundProvider";
import LanguageProvider from "@/components/LanguageProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "養老昆虫クラブ",
  description:
    "養老孟司先生の周りにいる虫好きたちの集まりです。養老先生公認。虫周りの楽しい情報を発信していきます。",
  openGraph: {
    title: "養老昆虫クラブ",
    description:
      "養老孟司先生の周りにいる虫好きたちの集まりです。養老先生公認。虫周りの楽しい情報を発信していきます。",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${jetbrainsMono.variable} font-[var(--font-noto-sans-jp)] antialiased`}
      >
        <SoundProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
