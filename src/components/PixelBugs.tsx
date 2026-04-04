"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSoundEngine } from "./SoundProvider";
import { useLanguage } from "./LanguageProvider";
import { battle, overworld } from "8bit-sound-engine";
import RankingModal from "./RankingModal";

interface BugType {
  id: string;
  name: string;
  se: string;
  speed: number;
  rarity: number;
  color: string;
  rare?: boolean;
  pixels: number[][];
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
    speed: 0.2,
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
    speed: 0.3,
    rarity: 10,
    color: "#78350f",
    rare: true,
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
    rare: true,
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
    rare: true,
    pixels: [
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
  },
];

const MILESTONES = [5, 10, 25, 50];
const BOSS_THRESHOLD = 100;

const BOSS_GRID = 48;
const BOSS_PIXEL_SIZE = 4; // each grid cell = 4px on screen
const BOSS_RENDER_SIZE = BOSS_GRID * BOSS_PIXEL_SIZE; // 192px

interface ActiveBug {
  key: number;
  type: BugType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  captured: boolean;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: { dx: number; dy: number; color: string }[];
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
  const w = typeof window !== "undefined" ? window.innerWidth : 1000;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;

  // Spawn within visible area with some padding
  const margin = 60;
  const x = margin + Math.random() * (w - margin * 2);
  const y = margin + Math.random() * (h - margin * 2);

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

// Sparkle colors for rare bugs
const SPARKLE_COLORS = ["#fbbf24", "#fde68a", "#ffffff", "#f59e0b"];

function BugSprite({
  bug,
  onCapture,
}: {
  bug: ActiveBug;
  onCapture: (bug: ActiveBug) => void;
}) {
  const elRef = useRef<HTMLButtonElement>(null);

  // Update position via DOM directly (no re-render)
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.left = `${bug.x}px`;
    el.style.top = `${bug.y}px`;
  });

  return (
    <button
      ref={elRef}
      onClick={() => onCapture(bug)}
      className={`absolute cursor-pointer transition-transform duration-300 ${
        bug.captured
          ? "scale-0 opacity-0"
          : "scale-100 opacity-100 hover:scale-125"
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
        row.map((cell, cx) => {
          if (!cell) return null;
          return (
            <span
              key={`${ry}-${cx}`}
              className="absolute"
              style={{
                left: cx * PIXEL_SIZE,
                top: ry * PIXEL_SIZE,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
                backgroundColor: bug.type.rare
                  ? bug.type.color
                  : bug.type.color,
              }}
            />
          );
        })
      )}
      {bug.type.rare && (
        <span
          className="absolute animate-pulse"
          style={{
            left: 0,
            top: 0,
            width: BUG_SIZE,
            height: BUG_SIZE,
            boxShadow: `0 0 8px 2px ${SPARKLE_COLORS[0]}`,
            pointerEvents: "none",
          }}
        />
      )}
    </button>
  );
}

function BossPixelArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Sample image into BOSS_GRID x BOSS_GRID pixel art
      const offscreen = document.createElement("canvas");
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const octx = offscreen.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0);

      const data = octx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
      const cellW = img.naturalWidth / BOSS_GRID;
      const cellH = img.naturalHeight / BOSS_GRID;

      const size = BOSS_GRID * BOSS_PIXEL_SIZE;
      canvas.width = size;
      canvas.height = size;

      for (let row = 0; row < BOSS_GRID; row++) {
        for (let col = 0; col < BOSS_GRID; col++) {
          const sx = Math.floor(col * cellW + cellW / 2);
          const sy = Math.floor(row * cellH + cellH / 2);
          const idx = (sy * img.naturalWidth + sx) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a > 30) {
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(
              col * BOSS_PIXEL_SIZE,
              row * BOSS_PIXEL_SIZE,
              BOSS_PIXEL_SIZE,
              BOSS_PIXEL_SIZE
            );
          }
        }
      }
      setLoaded(true);
    };
    img.onerror = () => {
      // Fallback: 32x32 pixel art of 養老先生 (white hair, glasses, purple turtleneck)
      const fallback = [
        "________________________________",
        "________________________________",
        "__________HHHHHHHHHH____________",
        "_________HHHHHHHHHHHhH_________",
        "________HHHHHHHHHHHHHhHH_______",
        "_______HHHHHHHHHHHHHHHhHH______",
        "______HHHHHHHHHHHHHHHHHhH______",
        "______HHHHHHhhhHHHHhhhHHhH_____",
        "_____HHHhhSSSSSSSSSSSShhhH______",
        "_____HHhSSSSSSSSSSSSSSShHH______",
        "_____HhSSSSSSSSSSSSSSSSSHH______",
        "_____HhSSSSSSSSSSSSSSSSShH______",
        "____HhSSEEEESSSSSSEEEESSHH_____",
        "____HhSEEEEEESSSSSEEEEEESH_____",
        "____HhSSSSSSSSSSSSSSSSSSShH_____",
        "____HhSGGGGGGSSSSGGGGGGSHh_____",
        "____HhSGWWWWGSGGSGWWWWGShH_____",
        "____HhSGWWPWGSGGSGWWPWGShH_____",
        "____HhSGWWWWGSGGSGWWWWGShH_____",
        "____HhSGGGGGGSSSSGGGGGGShH_____",
        "_____hSSSSSSSSSSSSSSSSSSsH______",
        "_____hSSSSSSSSSsSSSSSSSSSH______",
        "_____hSSSSSSSSsssSSSSSSSSH______",
        "______SSSSSsSMMMMMMSsSSSH_______",
        "______SSSSSSsSMLLMSsSSSsH_______",
        "_______SSSSSSSsMMsSSSSSH________",
        "________sSSSSSSSSSSSSSH_________",
        "_________ssSSSSSSSSSsH__________",
        "__________TTTTTTTTTTTH__________",
        "_________TTTTTTTTTTTTtH_________",
        "________TTTTTTTTTTTTTTtH________",
        "_______TTTTTTTTTTTTTTTTtH_______",
      ];
      const cmap: Record<string, string> = {
        H: "#e8e8e8", h: "#c8c8c8", S: "#d4a574", s: "#b8895a",
        G: "#808080", W: "#ffffff", P: "#2d2d2d", E: "#4a4a4a",
        M: "#c49070", L: "#b06868", T: "#4c1d95", t: "#3b0764",
      };
      const pxSize = Math.floor(BOSS_RENDER_SIZE / 32);
      canvas.width = BOSS_RENDER_SIZE;
      canvas.height = BOSS_RENDER_SIZE;
      fallback.forEach((line, row) => {
        [...line].forEach((ch, col) => {
          if (ch !== "_" && cmap[ch]) {
            ctx.fillStyle = cmap[ch];
            ctx.fillRect(col * pxSize, row * pxSize, pxSize, pxSize);
          }
        });
      });
      setLoaded(true);
    };
    img.src = "/yoro-boss.png";
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${loaded ? "opacity-100" : "opacity-0"} transition-opacity`}
      style={{
        width: BOSS_RENDER_SIZE,
        height: BOSS_RENDER_SIZE,
        imageRendering: "pixelated",
      }}
    />
  );
}

function PixelFireworks({ fireworks }: { fireworks: Firework[] }) {
  return (
    <>
      {fireworks.map((fw) => (
        <div key={fw.id} className="fixed z-50 pointer-events-none">
          {fw.particles.map((p, i) => (
            <span
              key={i}
              className="absolute animate-pixel-firework"
              style={{
                left: fw.x,
                top: fw.y,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
                backgroundColor: p.color,
                "--fw-dx": `${p.dx}px`,
                "--fw-dy": `${p.dy}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default function PixelBugs() {
  const { playSE, engine } = useSoundEngine();
  const { t } = useLanguage();
  const [heroReady, setHeroReady] = useState(false);
  const [bugs, setBugs] = useState<ActiveBug[]>([]);
  const [collection, setCollection] = useState<Record<string, number>>({});
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [milestoneText, setMilestoneText] = useState<string | null>(null);
  const [mood, setMood] = useState<"normal" | "swarm" | "drought">("normal");
  const [bossActive, setBossActive] = useState(false);
  const [bossHp, setBossHp] = useState(0);
  const [bossShake, setBossShake] = useState(false);
  const [bossPos, setBossPos] = useState({ x: 0, y: 0 });
  const [gameCleared, setGameCleared] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [clearTime, setClearTime] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [rankingOpen, setRankingOpen] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showGoalAnnounce, setShowGoalAnnounce] = useState(false);
  const goalShownRef = useRef(false);
  const [clearPhase, setClearPhase] = useState<"name" | "ranking" | "done">("name");
  const [clearRankings, setClearRankings] = useState<{ name: string; time: number; date: string }[]>([]);
  const [clearStats, setClearStats] = useState({ totalClears: 0, totalPlayers: 0 });
  const bossTriggeredRef = useRef(false);
  const bossFleeTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const keyCounterRef = useRef(0);
  const animRef = useRef<number>(0);
  const comboTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fireworkIdRef = useRef(0);
  const totalCaughtRef = useRef(0);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const totalCaught = Object.values(collection).reduce((a, b) => a + b, 0);
  totalCaughtRef.current = totalCaught;

  // Target bug count grows with collection, mood affects it
  const getTargetBugCount = useCallback(() => {
    const base = Math.min(3 + Math.floor(totalCaughtRef.current / 3), 12);
    if (mood === "swarm") return Math.min(base + 6, 18);
    if (mood === "drought") return Math.max(1, Math.floor(base * 0.2));
    return base;
  }, [mood]);

  // Spawn a firework burst at position
  const spawnFirework = useCallback((x: number, y: number) => {
    const colors = ["#fbbf24", "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ffffff"];
    const particles = Array.from({ length: 12 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 50;
      return {
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    const id = fireworkIdRef.current++;
    setFireworks((prev) => [...prev, { id, x, y, particles }]);
    setTimeout(() => {
      setFireworks((prev) => prev.filter((f) => f.id !== id));
    }, 600);
  }, []);

  const handleCapture = useCallback(
    (bug: ActiveBug) => {
      setShowCollection(true);
      // Show goal announcement on first catch
      if (!goalShownRef.current) {
        goalShownRef.current = true;
        setShowGoalAnnounce(true);
        setTimeout(() => setShowGoalAnnounce(false), 4000);
      }
      // Combo: pitch increases with consecutive catches
      const newCombo = combo + 1;
      setCombo(newCombo);
      setShowCombo(newCombo >= 2);

      // Reset combo timer
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        setCombo(0);
        setShowCombo(false);
      }, 2500);

      // Play SE with pitch shift based on combo
      if (engine) {
        const pitch = 1 + Math.min(newCombo - 1, 8) * 0.1;
        engine.resume().then(() => {
          engine.se.play(bug.type.se, { pitch });
        });
      }

      setBugs((prev) =>
        prev.map((b) => (b.key === bug.key ? { ...b, captured: true } : b))
      );
      setCollection((prev) => {
        const updated = {
          ...prev,
          [bug.type.id]: (prev[bug.type.id] || 0) + 1,
        };
        // Check milestone
        const newTotal =
          Object.values(updated).reduce((a, b) => a + b, 0);
        if (newTotal === BOSS_THRESHOLD && !bossTriggeredRef.current) {
          // Boss time!
          bossTriggeredRef.current = true;
          setTimeout(() => {
            const cx = window.innerWidth / 2 - 128;
            const cy = window.innerHeight / 2 - 128;
            setBossPos({ x: cx, y: cy });
            setBossActive(true);
            setBossHp(10);
            if (engine) {
              engine.resume().then(() => {
                engine.bgm.changeTo(battle, { fade: 300 });
              });
            }
            // Boss flees to random position every 2-4 seconds
            bossFleeTimerRef.current = setInterval(() => {
              const margin = 100;
              const nx = margin + Math.random() * (window.innerWidth - margin * 2 - 256);
              const ny = margin + Math.random() * (window.innerHeight - margin * 2 - 256);
              setBossPos({ x: nx, y: ny });
            }, 2000 + Math.random() * 2000);
          }, 500);
        } else if (MILESTONES.includes(newTotal)) {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          spawnFirework(cx - 60, cy - 40);
          spawnFirework(cx + 60, cy - 20);
          spawnFirework(cx, cy + 30);
          setTimeout(() => {
            if (engine) {
              engine.resume().then(() => engine.se.play("1up"));
            }
          }, 150);
          setMilestoneText(`${newTotal}`);
          setTimeout(() => setMilestoneText(null), 2000);
        }
        return updated;
      });

      // Remove after animation (spawner handles repopulation)
      setTimeout(() => {
        setBugs((prev) => prev.filter((b) => b.key !== bug.key));
      }, 400);
    },
    [combo, engine, spawnFirework]
  );

  // Wait for hero animation to finish before spawning bugs
  useEffect(() => {
    const handler = () => setHeroReady(true);
    window.addEventListener("hero-animation-done", handler);
    return () => window.removeEventListener("hero-animation-done", handler);
  }, []);

  // Initial spawn + start timer (after hero animation)
  useEffect(() => {
    if (!heroReady) return;
    setGameStartTime(Date.now());
    const initial: ActiveBug[] = [];
    for (let i = 0; i < 3; i++) {
      initial.push(spawnBug(keyCounterRef.current++));
    }
    setBugs(initial);
  }, [heroReady]);

  // Cheat mode listener
  useEffect(() => {
    const handleCheat = () => {
      if (bossTriggeredRef.current) return;
      bossTriggeredRef.current = true;
      const cx = window.innerWidth / 2 - 128;
      const cy = window.innerHeight / 2 - 128;
      setBossPos({ x: cx, y: cy });
      setBossActive(true);
      setBossHp(10);
      if (engine) {
        engine.resume().then(() => {
          engine.bgm.changeTo(battle, { fade: 300 });
        });
      }
      bossFleeTimerRef.current = setInterval(() => {
        const margin = 80;
        const nx = margin + Math.random() * (window.innerWidth - margin * 2 - 256);
        const ny = margin + Math.random() * (window.innerHeight - margin * 2 - 256);
        setBossPos({ x: nx, y: ny });
      }, 2000 + Math.random() * 2000);
    };
    window.addEventListener("cheat-boss", handleCheat);
    return () => window.removeEventListener("cheat-boss", handleCheat);
  }, [engine]);

  // Dynamic spawner — maintains target bug count
  useEffect(() => {
    const tick = () => {
      const target = getTargetBugCount();
      setBugs((prev) => {
        const alive = prev.filter((b) => !b.captured);
        if (alive.length < target) {
          const toSpawn = Math.min(target - alive.length, 3);
          const newBugs: ActiveBug[] = [];
          for (let i = 0; i < toSpawn; i++) {
            newBugs.push(spawnBug(keyCounterRef.current++));
          }
          return [...prev, ...newBugs];
        }
        return prev;
      });
      spawnTimerRef.current = setTimeout(tick, 1500 + Math.random() * 2000);
    };
    spawnTimerRef.current = setTimeout(tick, 2000);
    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, [getTargetBugCount]);

  // Mood cycle — random swarms and droughts
  useEffect(() => {
    const cycleMood = () => {
      const roll = Math.random();
      if (roll < 0.15) {
        // Swarm! Lots of bugs
        setMood("swarm");
        setTimeout(() => setMood("normal"), 8000 + Math.random() * 7000);
      } else if (roll < 0.3) {
        // Drought — almost nothing
        setMood("drought");
        setTimeout(() => setMood("normal"), 5000 + Math.random() * 5000);
      } else {
        setMood("normal");
      }
    };
    const interval = setInterval(cycleMood, 15000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, []);

  // Species-specific movement functions
  const moveBug = useCallback((bug: ActiveBug, w: number, h: number): ActiveBug => {
    let { vx, vy, phase } = bug;

    // Gentle centering force (shared)
    const centerX = w / 2;
    const centerY = h / 2;
    const dx = centerX - bug.x;
    const dy = centerY - bug.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 200) {
      vx += (dx / dist) * 0.008;
      vy += (dy / dist) * 0.008;
    }

    let offsetX = 0;
    let offsetY = 0;
    const id = bug.type.id;

    if (id === "zoumushi") {
      // Weevil: tiny waddle, left-right-left like walking on a leaf
      phase += 0.02;
      // Quick tiny side-to-side waddle — the signature weevil walk
      offsetX = Math.sin(phase * 6) * 0.3;
      // Tiny vertical bob in sync — each step lifts slightly
      offsetY = Math.abs(Math.sin(phase * 6)) * 0.15;
      const maxS = 0.12;
      const s = Math.sqrt(vx * vx + vy * vy);
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }

    } else if (id === "butterfly") {
      // Butterfly: big lazy zigzag float, like a real butterfly in a garden
      phase += 0.035;
      // Large sweeping sine waves — the signature butterfly wobble
      offsetX = Math.sin(phase * 0.8) * 2.5;
      offsetY = Math.sin(phase * 1.6) * 1.8 + Math.cos(phase * 2.3) * 0.8;
      // Occasional random drift change — butterflies never go straight
      if (Math.random() < 0.02) {
        const turn = (Math.random() - 0.5) * 0.4;
        vx += turn;
        vy += (Math.random() - 0.5) * 0.3;
      }
      const maxS = 0.25;
      const s = Math.sqrt(vx * vx + vy * vy);
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }

    } else if (id === "ladybug") {
      // Ladybug: walk walk walk... stop... walk... then suddenly FLY a short distance
      phase += 0.02;
      const pauseCycle = Math.sin(phase * 0.4);
      if (pauseCycle > 0.8) {
        // Paused — completely still, considering life
        vx *= 0.9;
        vy *= 0.9;
        offsetX = 0;
        offsetY = 0;
      } else if (pauseCycle < -0.85 && Math.random() < 0.008) {
        // Sudden short flight! — lifts off, lands somewhere nearby
        const flightAngle = Math.random() * Math.PI * 2;
        vx = Math.cos(flightAngle) * 1.2;
        vy = Math.sin(flightAngle) * 1.2;
      } else {
        // Steady walk with tiny steps
        offsetX = Math.sin(phase * 5) * 0.12;
      }
      const maxS = 1.2; // allow fast flight bursts
      const s = Math.sqrt(vx * vx + vy * vy);
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }
      // Quickly slow down after flight
      if (s > 0.3) { vx *= 0.97; vy *= 0.97; }

    } else if (id === "kamikiri") {
      // Longhorn beetle: fast scurry → freeze → sharp turn → scurry again
      phase += 0.03;
      const scurryCycle = Math.sin(phase * 0.7);
      if (scurryCycle > 0.6) {
        // Scurry! Fast and noisy
        const s = Math.sqrt(vx * vx + vy * vy);
        if (s < 0.3) {
          const angle = Math.atan2(vy, vx);
          vx = Math.cos(angle) * 0.5;
          vy = Math.sin(angle) * 0.5;
        }
        offsetX = (Math.random() - 0.5) * 0.6;
        offsetY = (Math.random() - 0.5) * 0.6;
      } else if (scurryCycle < -0.7) {
        // Freeze — antenna twitching
        vx *= 0.85;
        vy *= 0.85;
        offsetX = (Math.random() - 0.5) * 0.1;
      }
      // Sharp direction change
      if (Math.random() < 0.02) {
        const newAngle = Math.random() * Math.PI * 2;
        vx = Math.cos(newAngle) * 0.5;
        vy = Math.sin(newAngle) * 0.5;
      }
      const maxS = 0.5;
      const s = Math.sqrt(vx * vx + vy * vy);
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }

    } else if (id === "kuwagata") {
      // Stag beetle: heavy, deliberate march. Slow steady steps, never stops
      phase += 0.012;
      // Slow rhythmic body sway — heavy insect rocking as it walks
      offsetX = Math.sin(phase * 3) * 0.12;
      offsetY = Math.abs(Math.sin(phase * 3)) * 0.08;
      // Rarely changes direction — stubborn straight line
      if (Math.random() < 0.002) {
        const tweak = (Math.random() - 0.5) * 0.15;
        vx += tweak;
        vy += tweak;
      }
      const maxS = 0.18;
      const s = Math.sqrt(vx * vx + vy * vy);
      // Always maintain minimum speed — stag beetles don't stop
      if (s < 0.12) {
        const angle = Math.atan2(vy || 0.1, vx || 0.1);
        vx = Math.cos(angle) * 0.15;
        vy = Math.sin(angle) * 0.15;
      }
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }

    } else if (id === "yakuneki") {
      // Yakuneki (Necydalis): fast erratic flight, bursts of speed + sudden stops
      phase += 0.06;
      const burst = Math.sin(phase * 1.5);
      if (burst > 0.7) {
        // Speed burst — hard to catch
        vx *= 1.03;
        vy *= 1.03;
        offsetX = (Math.random() - 0.5) * 2;
        offsetY = (Math.random() - 0.5) * 2;
      } else if (burst < -0.8) {
        // Brief hover/stop
        vx *= 0.9;
        vy *= 0.9;
      }
      if (Math.random() < 0.03) {
        // Frequent direction changes
        vx += (Math.random() - 0.5) * 0.8;
        vy += (Math.random() - 0.5) * 0.8;
      }
      const maxS = 0.9;
      const s = Math.sqrt(vx * vx + vy * vy);
      if (s > maxS) { vx = (vx / s) * maxS; vy = (vy / s) * maxS; }
    }

    return {
      ...bug,
      x: bug.x + vx + offsetX,
      y: bug.y + vy + offsetY,
      vx,
      vy,
      phase,
    };
  }, []);

  // Animation loop — mutate bugs in-place, update DOM via refs
  const [, forceRender] = useState(0);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      setBugs((prev) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].captured) continue;
          const updated = moveBug(prev[i], w, h);
          prev[i] = updated;
        }
        return prev;
      });

      // Force React re-render every 3 frames for sparkle/UI updates
      frameCountRef.current++;
      if (frameCountRef.current % 3 === 0) {
        forceRender((n) => n + 1);
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [moveBug]);

  return (
    <>
      {/* Floating bugs */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {bugs.map((bug) => (
          <div key={bug.key} className="pointer-events-auto">
            <BugSprite
              bug={bug}
              onCapture={handleCapture}
            />
          </div>
        ))}
      </div>

      {/* Boss: 養老先生 — flees around the screen */}
      {bossActive && !gameCleared && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          {/* HP bar fixed at top */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
            <p className="text-xs font-[var(--font-jetbrains-mono)] text-white">
              養老先生 HP: {bossHp}/10
            </p>
            <div className="w-48 h-3 bg-gray-700 border border-gray-500">
              <div
                className="h-full bg-red-500 transition-all duration-200"
                style={{ width: `${(bossHp / 10) * 100}%` }}
              />
            </div>
          </div>
          {/* Boss sprite — moves around */}
          <button
            onClick={() => {
              const newHp = bossHp - 1;
              setBossHp(newHp);
              setBossShake(true);
              if (engine) {
                engine.resume().then(() => engine.se.play("damage"));
              }
              // Shake, then flee after shake finishes
              setTimeout(() => {
                setBossShake(false);
                const margin = 80;
                const nx = margin + Math.random() * (window.innerWidth - margin * 2 - 256);
                const ny = margin + Math.random() * (window.innerHeight - margin * 2 - 256);
                setBossPos({ x: nx, y: ny });
              }, 500);

              if (newHp <= 0) {
                if (bossFleeTimerRef.current) clearInterval(bossFleeTimerRef.current);
                const elapsed = Math.round((Date.now() - gameStartTime) / 1000);
                setClearTime(elapsed);
                setBossActive(false);
                setGameCleared(true);
                setClearPhase("name");
                if (engine) {
                  engine.resume().then(() => {
                    engine.bgm.stop({ fade: 300 });
                    engine.se.play("1up");
                  });
                }
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                for (let i = 0; i < 8; i++) {
                  setTimeout(() => {
                    spawnFirework(
                      cx + (Math.random() - 0.5) * 300,
                      cy + (Math.random() - 0.5) * 200
                    );
                  }, i * 200);
                }
                setTimeout(() => {
                  if (engine) {
                    engine.resume().then(() => engine.bgm.play(overworld));
                  }
                }, 3000);
              }
            }}
            className={`absolute cursor-pointer transition-all duration-500 ease-out ${
              bossShake ? "animate-boss-shake" : ""
            } hover:brightness-125`}
            style={{ left: bossPos.x, top: bossPos.y }}
            aria-label="Attack boss"
          >
            <BossPixelArt />
          </button>
        </div>
      )}

      {/* GAME CLEAR screen */}
      {gameCleared && clearPhase !== "done" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 overflow-y-auto py-8">
          <div className="text-center w-full max-w-sm mx-4 font-[var(--font-jetbrains-mono)]">
            {/* Title */}
            <div className="animate-game-clear mb-6">
              <p className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                GAME CLEAR!!
              </p>
              <p className="mt-3 text-lg text-green-400 font-bold">
                TIME: {clearTime}s
              </p>
            </div>

            {/* Phase: Name input */}
            {clearPhase === "name" && (
              <div className="animate-fade-in">
                <p className="text-xs text-gray-500 mb-3">ENTER YOUR NAME</p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const name = playerName.trim() || "ANON";
                    try {
                      await fetch("/api/rankings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name,
                          time: clearTime,
                          date: new Date().toISOString(),
                        }),
                      });
                    } catch { /* ignore */ }
                    if (engine) {
                      engine.resume().then(() => engine.se.play("coin"));
                    }
                    // Fetch rankings to show
                    try {
                      const [rankRes, playerRes] = await Promise.all([
                        fetch("/api/rankings").then((r) => r.json()),
                        fetch("/api/players").then((r) => r.json()),
                      ]);
                      setClearRankings(rankRes.all ?? []);
                      setClearStats({
                        totalClears: rankRes.totalClears ?? 0,
                        totalPlayers: playerRes.count ?? 0,
                      });
                    } catch { /* ignore */ }
                    setClearPhase("ranking");
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <input
                    type="text"
                    maxLength={7}
                    value={playerName}
                    onChange={(e) =>
                      setPlayerName(
                        e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase()
                      )
                    }
                    placeholder="YOURNAME"
                    className="w-48 px-4 py-2 bg-black text-white text-center text-lg tracking-widest border-2 border-gray-600 focus:border-green-400 outline-none uppercase"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white text-black text-sm tracking-widest hover:bg-gray-200 transition-colors"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            )}

            {/* Phase: Ranking */}
            {clearPhase === "ranking" && (
              <div className="animate-fade-in">
                {/* Stats */}
                <div className="flex justify-center gap-6 mb-4 text-[10px]">
                  <span className="text-gray-500">
                    PLAYERS <span className="text-cyan-400">{clearStats.totalPlayers}</span>
                  </span>
                  <span className="text-gray-500">
                    CLEARS <span className="text-green-400">{clearStats.totalClears}</span>
                  </span>
                </div>

                {/* Top 10 ranking */}
                <div className="border border-gray-800 p-3 mb-4">
                  <p className="text-[10px] text-yellow-400 tracking-[3px] mb-2">
                    TOP 10 — FASTEST
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600 mb-1">
                    <span className="w-5">#</span>
                    <span className="w-16 text-left">NAME</span>
                    <span className="w-12 text-right">TIME</span>
                    <span className="flex-1 text-right">DATE</span>
                  </div>
                  {clearRankings.slice(0, 10).map((entry, i) => {
                    const isMe =
                      entry.name === (playerName.trim().toUpperCase() || "ANON") &&
                      entry.time === clearTime;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 text-xs py-0.5 ${
                          isMe ? "text-yellow-300" : ""
                        }`}
                      >
                        <span className="w-5 text-yellow-500/70">{i + 1}.</span>
                        <span className="w-16 text-left truncate">
                          {entry.name}
                        </span>
                        <span className="w-12 text-green-400 text-right">
                          {entry.time}s
                        </span>
                        <span className="flex-1 text-gray-600 text-[10px] text-right">
                          {(() => {
                            try {
                              const d = new Date(entry.date);
                              return `${d.getMonth() + 1}/${d.getDate()}`;
                            } catch {
                              return "";
                            }
                          })()}
                        </span>
                      </div>
                    );
                  })}
                  {clearRankings.length === 0 && (
                    <p className="text-gray-600 text-xs py-2">NO DATA</p>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={() => {
                    playSE("select");
                    setClearPhase("done");
                  }}
                  className="px-8 py-3 bg-white text-black text-sm tracking-widest hover:bg-gray-200 transition-colors"
                >
                  CONTINUE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pixel fireworks */}
      <PixelFireworks fireworks={fireworks} />

      {/* Milestone popup */}
      {milestoneText && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-milestone-pop text-center">
            <p className="text-4xl md:text-6xl font-bold font-[var(--font-jetbrains-mono)] text-black">
              {milestoneText}
            </p>
            <p className="text-sm md:text-base font-bold text-gray-600 mt-1">
              {t("bugs.collected")}
            </p>
          </div>
        </div>
      )}

      {/* Goal announcement on first catch */}
      {showGoalAnnounce && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-goal-announce bg-black/90 border-2 border-yellow-400 px-8 py-5 text-center">
            <p className="text-2xl md:text-4xl font-bold font-[var(--font-jetbrains-mono)] text-yellow-400 tracking-wider">
              {t("bugs.goal")}
            </p>
          </div>
        </div>
      )}

      {/* Combo indicator */}
      {showCombo && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <p
            className="text-lg font-bold font-[var(--font-jetbrains-mono)] animate-combo-bounce"
            style={{
              color: combo >= 5 ? "#ef4444" : combo >= 3 ? "#f59e0b" : "#000",
            }}
          >
            {combo} COMBO!
          </p>
        </div>
      )}

      {/* Collection counter + ranking button */}
      {showCollection && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            onClick={() => {
              playSE("select");
              setRankingOpen(true);
            }}
            className="bg-black/80 text-yellow-400 px-2 py-2 text-[10px] font-[var(--font-jetbrains-mono)] hover:bg-black transition-colors"
            title="Ranking"
          >
            RANK
          </button>
          <div className="bg-black/80 text-white px-3 py-2 text-xs font-[var(--font-jetbrains-mono)] flex items-center gap-2">
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
        </div>
      )}

      <RankingModal open={rankingOpen} onClose={() => setRankingOpen(false)} />
    </>
  );
}
