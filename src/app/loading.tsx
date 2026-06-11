export default function Loading() {
  return (
    <main className="min-h-dvh bg-beige flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-beige-300" />
          <div
            className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"
            style={{ animationDuration: "1.2s" }}
          />
        </div>
        <p className="text-sm text-ink-mute tracking-wider">불러오는 중…</p>
      </div>
    </main>
  );
}
