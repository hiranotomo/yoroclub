import { NextResponse } from "next/server";

interface RankingEntry {
  name: string;
  time: number;
  date: string;
}

// In-memory fallback when KV is not configured
let memoryStore: RankingEntry[] = [];

async function getKv() {
  try {
    if (!process.env.KV_REST_API_URL) return null;
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null;
  }
}

const RANKINGS_KEY = "rankings:v1";
const MAX_ENTRIES = 10000; // practically unlimited

export async function GET() {
  try {
    const kv = await getKv();
    let entries: RankingEntry[];

    if (kv) {
      entries = (await kv.lrange<RankingEntry>(RANKINGS_KEY, 0, -1)) ?? [];
    } else {
      entries = memoryStore;
    }

    // All entries sorted by time (fastest first)
    const byTime = [...entries].sort((a, b) => a.time - b.time);

    const latest = entries.slice(0, 10);
    const totalClears = entries.length;

    return NextResponse.json({ all: byTime, latest, totalClears });
  } catch {
    return NextResponse.json({ all: [], latest: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, time, date } = body as RankingEntry;

    if (!name || typeof time !== "number" || !date) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const sanitizedName = name.replace(/[^A-Za-z]/g, "").slice(0, 7).toUpperCase() || "ANON";
    const entry: RankingEntry = { name: sanitizedName, time, date };

    const kv = await getKv();
    if (kv) {
      await kv.lpush(RANKINGS_KEY, entry);
      await kv.ltrim(RANKINGS_KEY, 0, MAX_ENTRIES - 1);
    } else {
      memoryStore.unshift(entry);
      if (memoryStore.length > MAX_ENTRIES) {
        memoryStore = memoryStore.slice(0, MAX_ENTRIES);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
