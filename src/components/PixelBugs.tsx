"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSoundEngine } from "./SoundProvider";
import { useLanguage } from "./LanguageProvider";

interface BugType {
  id: string;
  name: string;
  se: string;
  speed: number;
  rarity: number; // weight — higher = more common
  color: string;
  pixels: number[][]; // 5x5 grid, 1 = filled
}

const BUG_TYPES: BugType[] = [
  {
    id: "zoumushi",
    name: "ゾウムシ",
    se: "coin",
    speed: 0.3,
    rarity: 30,
    color: "#2d2d2d",
    pixels: [
      [0, 0, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
  },
  {
    id: "butterfly",
    name: "蝶",
    se: "jump",
    speed: 0.4,
    rarity: 25,
    color: "#6366f1",
    pixels: [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1],
    ],
  },
  {
    id: "ladybug",
    name: "テントウムシ",
    se: "powerup",
    speed: 0.35,
    rarity: 25,
    color: "#dc2626",
    pixels: [
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  },
  {
    id: "kamikiri",
    name: "カミキリムシ",
    se: "laser",
    speed: 0.5,
    rarity: 10,
    color: "#78350f",
    pixels: [
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
  },
  {
    id: "kuwagata",
    name: "クワガタ",
    se: "select",
    speed: 0.4,
    rarity: 8,
    color: "#1a1a2e",
    pixels: [
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
  },
  {
    id: "yakuneki",
    name: "ヤクネキ",
    se: "1up",
    speed: 0.8,
    rarity: 2,
    color: "#d97706",
    pixels: [
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
  },
];

interface ActiveBug {
  key: number;
  type: BugType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number; // for sine movement
  captured: boolean;
}

function pickRandomBugType(): BugType {
  const totalWeight = BUG_TYPES.reduce((sum, b) => sum + b.rarity, 0);
  let r = Math.random() * totalWeight;
  for (const bug of BUG_TYPES) {
    r -= bug.rarity;
    if (r <= 0) return bug;
  }
  return BUG_TYPES[0];
}

function spawnBug(key: number): ActiveBug {
  const type = pickRandomBugType();
  const side = Math.floor(Math.random() * 4);
  let x: number, y: number;
  const w = typeof window !== "undefined" ? window.innerWidth : 1000;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;

  switch (side) {
    case 0: x = Math.random() * w; y = -30; break;
    case 1: x = w + 30; y = Math.random() * h; break;
    case 2: x = Math.random() * w; y = h + 30; break;
    default: x = -30; y = Math.random() * h; break;
  }

  const angle = Math.random() * Math.PI * 2;
  return {
    key,
    type,
    x,
    y,
    vx: Math.cos(angle) * type.speed,
    vy: Math.sin(angle) * type.speed,
    phase: Math.random() * Math.PI * 2,
    captured: false,
  };
}

const PIXEL_SIZE = 4;
const GRID = 5;
const BUG_SIZE = PIXEL_SIZE * GRID;

function BugSprite({
  bug,
  onCapture,
}: {
  bug: ActiveBug;
  onCapture: (bug: ActiveBug) => void;
}) {
  return (
    <button
      onClick={() => onCapture(bug)}
      className={`absolute cursor-pointer transition-all duration-300 ${
        bug.captured ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:scale-125"
      }`}
      style={{
        left: bug.x,
        top: bug.y,
        width: BUG_SIZE,
        height: BUG_SIZE,
        background: "transparent",
        border: "none",
        padding: 0,
      }}
      aria-label={`Catch ${bug.type.name}`}
    >
      {bug.type.pixels.map((row, ry) =>
        row.map((cell, cx) =>
          cell ? (
            <span
              key={`${ry}-${cx}`}
              className="absolute"
              style={{
                left: cx * PIXEL_SIZE,
                top: ry * PIXEL_SIZE,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
                backgroundColor: bug.type.color,
              }}
            />
          ) : null
        )
      )}
    </button>
  );
}

export default function PixelBugs() {
  const { playSE } = useSoundEngine();
  const { t } = useLanguage();
  const [bugs, setBugs] = useState<ActiveBug[]>([]);
  const [collection, setCollection] = useState<Record<string, number>>({});
  const bugsRef = useRef<ActiveBug[]>([]);
  const keyCounterRef = useRef(0);
  const animRef = useRef<number>(0);

  const totalCaught = Object.values(collection).reduce((a, b) => a + b, 0);

  const handleCapture = useCallback(
    (bug: ActiveBug) => {
      playSE(bug.type.se);
      setBugs((prev) =>
        prev.map((b) => (b.key === bug.key ? { ...b, captured: true } : b))
      );
      setCollection((prev) => ({
        ...prev,
        [bug.type.id]: (prev[bug.type.id] || 0) + 1,
      }));
      // Remove after animation, respawn later
      setTimeout(() => {
        setBugs((prev) => prev.filter((b) => b.key !== bug.key));
      }, 400);
      setTimeout(() => {
        const newBug = spawnBug(keyCounterRef.current++);
        setBugs((prev) => [...prev, newBug]);
      }, 3000 + Math.random() * 4000);
    },
    [playSE]
  );

  // Initial spawn
  useEffect(() => {
    const initial: ActiveBug[] = [];
    for (let i = 0; i < 4; i++) {
      initial.push(spawnBug(keyCounterRef.current++));
    }
    setBugs(initial);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setBugs((prev) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        return prev.map((bug) => {
          if (bug.captured) return bug;

          // Steer toward center area
          const centerX = w / 2;
          const centerY = h / 2;
          const dx = centerX - bug.x;
          const dy = centerY - bug.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let { vx, vy } = bug;
          // Gentle centering force
          if (dist > 200) {
            vx += (dx / dist) * 0.01;
            vy += (dy / dist) * 0.01;
          }

          // Clamp speed
          const speed = Math.sqrt(vx * vx + vy * vy);
          const maxSpeed = bug.type.speed;
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
          }

          // Sine wave for organic feel
          const phase = bug.phase + 0.02;
          const sineOffset = Math.sin(phase) * 0.3;

          return {
            ...bug,
            x: bug.x + vx + sineOffset,
            y: bug.y + vy + Math.cos(phase) * 0.2,
            vx,
            vy,
            phase,
          };
        });
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <>
      {/* Floating bugs */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {bugs.map((bug) => (
          <div key={bug.key} className="pointer-events-auto">
            <BugSprite bug={bug} onCapture={handleCapture} />
          </div>
        ))}
      </div>

      {/* Collection counter */}
      {totalCaught > 0 && (
        <div className="fixed bottom-4 right-4 z-40 bg-black/80 text-white px-3 py-2 text-xs font-[var(--font-jetbrains-mono)] flex items-center gap-2">
          <span className="flex gap-1">
            {Object.entries(collection).map(([id, count]) => {
              const bugType = BUG_TYPES.find((b) => b.id === id);
              if (!bugType || count === 0) return null;
              return (
                <span key={id} className="flex items-center gap-0.5">
                  <span
                    className="inline-block w-2 h-2"
                    style={{ backgroundColor: bugType.color }}
                  />
                  <span>×{count}</span>
                </span>
              );
            })}
          </span>
          <span className="text-gray-400">
            {totalCaught}
            {t("bugs.collected")}
          </span>
        </div>
      )}
    </>
  );
}
