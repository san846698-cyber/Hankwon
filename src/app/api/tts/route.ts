import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { text } = (await req.json()) as { text?: string };

  if (!text?.trim()) {
    return NextResponse.json({ error: "No text" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // 204 → client falls back to browser speechSynthesis
    return new NextResponse(null, { status: 204 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text.slice(0, 4096),
        voice: "nova",
        response_format: "mp3",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`TTS ${res.status}: ${err}`);
    }

    const buf = await res.arrayBuffer();

    return new NextResponse(buf, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(buf.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[tts]", msg);
    // 204 → client uses speechSynthesis fallback
    return new NextResponse(null, { status: 204 });
  }
}
