"use client";

import { useState, useEffect } from "react";
import { useSoundEngine } from "./SoundProvider";

interface RankingEntry {
  name: string;
  time: number;
  date: string;
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${m}/${day} ${h}:${min}`;
  } catch {
    return "";
  }
}

const PAGE_SIZE = 10;

export default function RankingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { playSE } = useSoundEngine();
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState<"time" | "latest">("time");
  const [totalClears, setTotalClears] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setPage(0);

    Promise.all([
      fetch("/api/rankings").then((r) => r.json()),
      fetch("/api/players").then((r) => r.json()),
    ])
      .then(([rankData, playerData]) => {
        setEntries(tab === "time" ? rankData.all : rankData.latest);
        setTotalClears(rankData.totalClears ?? 0);
        setTotalPlayers(playerData.count ?? 0);
        setLoading(false);
      })
      .catch(() => {
        setEntries([]);
        setLoading(false);
      });
  }, [open, tab]);

  if (!open) return null;

  const start = page * PAGE_SIZE;
  const pageEntries = entries.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(entries.length / PAGE_SIZE);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => {
          playSE("cancel");
          onClose();
        }}
      />
      <div className="relative bg-black border-2 border-gray-700 p-5 max-w-sm w-full mx-4 font-[var(--font-jetbrains-mono)]">
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm text-white tracking-[4px]">RANKING</h2>
            <button
              onClick={() => {
                playSE("cancel");
                onClose();
              }}
              className="text-gray-500 hover:text-white text-xs"
            >
              [X]
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-3 text-[10px]">
            <span className="text-gray-500">
              PLAYERS: <span className="text-cyan-400">{totalPlayers}</span>
            </span>
            <span className="text-gray-500">
              CLEARS: <span className="text-green-400">{totalClears}</span>
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => { setTab("time"); playSE("select"); }}
              className={`text-[10px] tracking-wider px-2 py-1 ${
                tab === "time" ? "text-yellow-400 border-b border-yellow-400" : "text-gray-500"
              }`}
            >
              BY TIME
            </button>
            <button
              onClick={() => { setTab("latest"); playSE("select"); }}
              className={`text-[10px] tracking-wider px-2 py-1 ${
                tab === "latest" ? "text-yellow-400 border-b border-yellow-400" : "text-gray-500"
              }`}
            >
              LATEST
            </button>
          </div>

          {/* Table header */}
          <div className="flex items-center gap-2 text-[10px] text-gray-600 mb-1 px-1">
            <span className="w-5">#</span>
            <span className="w-20">NAME</span>
            <span className="w-14 text-right">TIME</span>
            <span className="flex-1 text-right">DATE</span>
          </div>

          {/* Entries */}
          {loading ? (
            <p className="text-gray-500 text-xs animate-pulse py-4 text-center">
              LOADING...
            </p>
          ) : pageEntries.length === 0 ? (
            <p className="text-gray-600 text-xs py-4 text-center">NO DATA</p>
          ) : (
            <div className="space-y-0.5">
              {pageEntries.map((entry, i) => (
                <div
                  key={start + i}
                  className="flex items-center gap-2 text-xs px-1 py-0.5 hover:bg-gray-900/50"
                >
                  <span className="w-5 text-yellow-500/70">
                    {start + i + 1}
                  </span>
                  <span className="w-20 text-white truncate">
                    {entry.name}
                  </span>
                  <span className="w-14 text-green-400 text-right">
                    {entry.time}s
                  </span>
                  <span className="flex-1 text-gray-600 text-[10px] text-right">
                    {formatDate(entry.date)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800">
              <button
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                    playSE("select");
                  }
                }}
                className={`text-xs ${page > 0 ? "text-white" : "text-gray-700"}`}
                disabled={page === 0}
              >
                &lt; PREV
              </button>
              <span className="text-[10px] text-gray-500">
                {page + 1}/{totalPages}
              </span>
              <button
                onClick={() => {
                  if (page < totalPages - 1) {
                    setPage(page + 1);
                    playSE("select");
                  }
                }}
                className={`text-xs ${page < totalPages - 1 ? "text-white" : "text-gray-700"}`}
                disabled={page >= totalPages - 1}
              >
                NEXT &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
