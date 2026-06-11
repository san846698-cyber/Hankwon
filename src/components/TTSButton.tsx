"use client";

import { useCallback, useRef, useState } from "react";

type TtsState = "idle" | "loading" | "playing";

type Props = {
  text: string;
  className?: string;
};

export default function TTSButton({ text, className = "" }: Props) {
  const [state, setState] = useState<TtsState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setState("idle");
  }, []);

  async function handleClick() {
    if (state !== "idle") {
      stopAll();
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 204) {
        // Fallback: Web Speech API
        if (typeof window === "undefined" || !window.speechSynthesis) {
          setState("idle");
          return;
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "ko-KR";
        utter.rate = 0.88;
        utter.onstart = () => setState("playing");
        utter.onend = () => setState("idle");
        utter.onerror = () => setState("idle");
        window.speechSynthesis.speak(utter);
        return;
      }

      if (!res.ok) throw new Error(`${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onplay = () => setState("playing");
      audio.onended = () => {
        URL.revokeObjectURL(url);
        audioRef.current = null;
        setState("idle");
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        audioRef.current = null;
        setState("idle");
      };

      await audio.play();
    } catch {
      setState("idle");
    }
  }

  const isLoading = state === "loading";
  const isPlaying = state === "playing";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      title={isLoading ? "불러오는 중…" : isPlaying ? "멈추기" : "질문 듣기"}
      aria-label={isLoading ? "불러오는 중…" : isPlaying ? "멈추기" : "질문 듣기"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
        isPlaying
          ? "border-accent bg-accent/10 text-accent-dark hover:bg-accent/20"
          : "border-beige-300 bg-white/60 text-ink-mute hover:border-accent hover:text-accent-dark hover:bg-white"
      } ${className}`}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : isPlaying ? (
        /* Stop icon */
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <rect x="3" y="3" width="4" height="10" rx="1" />
          <rect x="9" y="3" width="4" height="10" rx="1" />
        </svg>
      ) : (
        /* Speaker icon */
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M9 2.5a.5.5 0 0 0-.854-.354L4.793 5.5H2.5A1.5 1.5 0 0 0 1 7v2a1.5 1.5 0 0 0 1.5 1.5h2.293l3.353 3.354A.5.5 0 0 0 9 13.5v-11z" />
          <path d="M11.03 5.97a.75.75 0 0 1 1.06 0 5 5 0 0 1 0 7.06.75.75 0 1 1-1.06-1.06 3.5 3.5 0 0 0 0-4.94.75.75 0 0 1 0-1.06zM12.56 4.44a.75.75 0 0 1 1.06 0 7 7 0 0 1 0 9.9.75.75 0 1 1-1.06-1.06 5.5 5.5 0 0 0 0-7.78.75.75 0 0 1 0-1.06z" />
        </svg>
      )}
    </button>
  );
}
