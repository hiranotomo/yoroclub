import { NextRequest, NextResponse } from "next/server";

const BUFFER_TOKEN = process.env.BUFFER_API_TOKEN;
const BUFFER_API = "https://api.buffer.com/graphql";

const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on PostActionSuccess { post { id text dueAt } }
      ... on MutationError { message }
    }
  }
`;

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-staff-auth");
  if (auth !== "ok") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BUFFER_TOKEN) {
    return NextResponse.json(
      { error: "BUFFER_API_TOKEN not configured" },
      { status: 500 }
    );
  }

  const { posts, channelId } = await req.json();

  if (!Array.isArray(posts) || !channelId) {
    return NextResponse.json(
      { error: "posts (array) and channelId required" },
      { status: 400 }
    );
  }

  const results = [];

  for (const post of posts) {
    const { text, dueAt } = post;

    const input: Record<string, string> = {
      channelId,
      text,
      schedulingType: "automatic",
      mode: dueAt ? "customScheduled" : "addToQueue",
    };
    if (dueAt) input.dueAt = dueAt;

    try {
      const res = await fetch(BUFFER_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BUFFER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CREATE_POST_MUTATION,
          variables: { input },
        }),
      });

      const data = await res.json();

      if (data.data?.createPost?.post) {
        results.push({
          success: true,
          id: data.data.createPost.post.id,
          text: text.slice(0, 40) + "...",
          dueAt: data.data.createPost.post.dueAt,
        });
      } else {
        results.push({
          success: false,
          error: data.data?.createPost?.message || data.errors?.[0]?.message,
          text: text.slice(0, 40) + "...",
        });
      }

      // Rate limit: max 60/min, add small delay
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      results.push({
        success: false,
        error: String(e),
        text: text.slice(0, 40) + "...",
      });
    }
  }

  const succeeded = results.filter((r) => r.success).length;
  return NextResponse.json({ total: posts.length, succeeded, results });
}
