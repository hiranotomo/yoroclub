import { NextResponse } from "next/server";

let memoryPlayerCount = 0;

async function getKv() {
  try {
    if (!process.env.KV_REST_API_URL) return null;
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null;
  }
}

const PLAYER_COUNT_KEY = "players:count";

export async function GET() {
  try {
    const kv = await getKv();
    const count = kv
      ? ((await kv.get<number>(PLAYER_COUNT_KEY)) ?? 0)
      : memoryPlayerCount;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const kv = await getKv();
    if (kv) {
      await kv.incr(PLAYER_COUNT_KEY);
    } else {
      memoryPlayerCount++;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
