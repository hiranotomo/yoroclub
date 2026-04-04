import { NextResponse } from "next/server";

interface RankingEntry {
  name: string;
  time: number;
  date: string;
}

const MIN_TIME = 80; // entries below this are considered cheated

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
const MAX_ENTRIES = 10000;

export async function GET() {
  try {
    const kv = await getKv();
    let entries: RankingEntry[];

    if (kv) {
      entries = (await kv.lrange<RankingEntry>(RANKINGS_KEY, 0, -1)) ?? [];
    } else {
      entries = memoryStore;
    }

    // Filter out suspicious entries (too fast)
    const valid = entries.filter((e) => e.time >= MIN_TIME);

    const byTime = [...valid].sort((a, b) => a.time - b.time);
    const latest = valid.slice(0, 10);
    const totalClears = valid.length;

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

    // Reject entries below minimum time
    if (time < MIN_TIME) {
      return NextResponse.json({ error: "Time too short" }, { status: 400 });
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

// Clean up existing entries below MIN_TIME from KV
export async function DELETE() {
  try {
    const kv = await getKv();
    if (!kv) {
      memoryStore = memoryStore.filter((e) => e.time >= MIN_TIME);
      return NextResponse.json({ ok: true, removed: 0 });
    }

    const entries = (await kv.lrange<RankingEntry>(RANKINGS_KEY, 0, -1)) ?? [];
    const valid = entries.filter((e) => e.time >= MIN_TIME);
    const removed = entries.length - valid.length;

    if (removed > 0) {
      // Rebuild the list with only valid entries
      await kv.del(RANKINGS_KEY);
      if (valid.length > 0) {
        // rpush in reverse order to maintain original order
        for (const entry of valid) {
          await kv.rpush(RANKINGS_KEY, entry);
        }
      }
    }

    return NextResponse.json({ ok: true, removed });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
