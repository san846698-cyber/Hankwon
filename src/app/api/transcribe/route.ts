import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get("audio") as File | null;

  if (!audio || audio.size === 0) {
    return NextResponse.json({ error: "No audio file" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      text: "(OPENAI_API_KEY가 없어 mock 반환) 부모님께서 어린 시절 시골 마을에서 자라셨다고 말씀하셨어요.",
    });
  }

  try {
    const ext = audio.type.includes("mp4") ? "mp4"
      : audio.type.includes("ogg") ? "ogg"
      : "webm";

    const whisperForm = new FormData();
    whisperForm.append("file", audio, `audio.${ext}`);
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "ko");

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: whisperForm,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Whisper ${res.status}: ${err}`);
    }

    const data = (await res.json()) as { text: string };
    return NextResponse.json({ text: data.text ?? "" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[transcribe]", msg);
    return NextResponse.json({ error: "변환에 실패했어요." }, { status: 500 });
  }
}
