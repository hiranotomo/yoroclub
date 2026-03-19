"use client";

import { useState } from "react";

export default function YouTubeEmbed({ videoId }: { videoId: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full aspect-video bg-gray-100 flex items-center justify-center group cursor-pointer rounded-lg overflow-hidden"
        aria-label="動画を再生"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="動画サムネイル"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 w-16 h-16 bg-black/80 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title="養老昆虫クラブ テーマソング「むしのいどころ」"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
