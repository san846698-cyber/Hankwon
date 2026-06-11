"use client";

import { useEffect, useRef, useState } from "react";

type RecordState = "idle" | "recording" | "recorded" | "transcribing";

type Props = {
  onTranscription: (text: string) => void;
};

function getSupportedMimeType(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return (
    candidates.find(
      (t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t),
    ) ?? ""
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function VoiceRecorder({ onTranscription }: Props) {
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function startRecording() {
    setError(null);
    setSeconds(0);

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("마이크 권한을 허용해주세요");
      return;
    }

    const mimeType = getSupportedMimeType();
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunksRef.current, {
        type: mimeType || "audio/webm",
      });
      blobRef.current = blob;
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setState("recorded");
    };

    recorder.start();
    recorderRef.current = recorder;
    setState("recording");

    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    recorderRef.current?.stop();
  }

  function reset() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    blobRef.current = null;
    setSeconds(0);
    setError(null);
    setState("idle");
  }

  async function transcribe() {
    if (!blobRef.current) return;
    setState("transcribing");
    setError(null);

    try {
      const form = new FormData();
      form.append("audio", blobRef.current, "audio.webm");

      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      if (!res.ok) throw new Error(`${res.status}`);

      const data = (await res.json()) as { text?: string; error?: string };
      if (data.error) throw new Error(data.error);

      onTranscription(data.text ?? "");
      reset();
    } catch {
      setError("변환 중 오류가 발생했어요. 다시 시도해주세요.");
      setState("recorded");
    }
  }

  return (
    <div className="mb-5">
      {/* Idle */}
      {state === "idle" && (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2.5 h-11 px-5 rounded-2xl border border-beige-300 bg-white/60 text-sm text-ink-soft hover:border-accent hover:text-accent-dark hover:bg-white transition-all active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-accent shrink-0"
          >
            <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4zm-1.5 4A1.5 1.5 0 0 1 12 3.5a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-3 0V5z" />
            <path d="M6.5 11a.75.75 0 0 0-1.5 0 7 7 0 0 0 6.25 6.96V20H9a.75.75 0 0 0 0 1.5h6A.75.75 0 0 0 15 20h-2.25v-2.04A7 7 0 0 0 19 11a.75.75 0 0 0-1.5 0 5.5 5.5 0 0 1-11 0z" />
          </svg>
          음성으로 답하기
        </button>
      )}

      {/* Recording */}
      {state === "recording" && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 h-11 px-4 rounded-2xl bg-red-50 border border-red-200 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="text-sm font-mono text-red-600 tabular-nums w-10">
              {fmt(seconds)}
            </span>
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-ink text-beige-100 text-sm font-semibold hover:bg-ink-deep transition-colors active:scale-95"
          >
            <span className="w-3 h-3 rounded-sm bg-beige-100 shrink-0" />
            녹음 완료
          </button>
        </div>
      )}

      {/* Recorded — review */}
      {state === "recorded" && audioUrl && (
        <div className="space-y-3">
          <audio
            src={audioUrl}
            controls
            className="w-full h-10 rounded-xl accent-ink"
          />
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={reset}
              className="flex-1 h-11 rounded-2xl border border-beige-300 bg-white/60 text-sm text-ink-soft hover:border-ink hover:text-ink transition-all"
            >
              다시 녹음
            </button>
            <button
              type="button"
              onClick={transcribe}
              className="flex-1 h-11 rounded-2xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors active:scale-95"
            >
              텍스트로 변환
            </button>
          </div>
        </div>
      )}

      {/* Transcribing */}
      {state === "transcribing" && (
        <div className="flex items-center gap-2.5 h-11 px-4 rounded-2xl bg-beige-100 border border-beige-300 text-sm text-ink-soft">
          <span className="w-4 h-4 border-2 border-ink/20 border-t-ink rounded-full animate-spin shrink-0" />
          음성을 텍스트로 변환하는 중…
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600 leading-relaxed">{error}</p>
      )}
    </div>
  );
}
