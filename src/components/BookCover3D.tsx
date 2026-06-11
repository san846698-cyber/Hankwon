type Props = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function BookCover3D({
  className,
  title = "엄마의 한 권",
  subtitle = "한권이 정성껏 엮은 이야기",
}: Props) {
  return (
    <div className={`book-perspective ${className ?? ""}`}>
      <div className="book-tilt relative aspect-[2/2.7] w-full max-w-[320px] mx-auto">
        {/* Spine */}
        <div
          className="absolute inset-y-0 left-0 w-2 rounded-l-md"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 100%)",
            transform: "translateX(-1.5px)",
          }}
          aria-hidden
        />
        {/* Cover face — deep ink, embossed gold */}
        <div
          className="absolute inset-0 rounded-r-lg rounded-l-md overflow-hidden shadow-book"
          style={{
            background:
              "linear-gradient(135deg, #1A1614 0%, #2C2826 50%, #1A1614 100%)",
          }}
        >
          {/* Embossed border frame */}
          <div
            className="absolute inset-5 rounded-sm"
            style={{
              border: "1px solid rgba(212, 184, 150, 0.25)",
            }}
            aria-hidden
          />

          <div className="absolute inset-0 flex flex-col items-center justify-between py-14 px-8 text-center">
            <div>
              <p
                className="text-[10px] tracking-[0.5em] font-bold mb-3 uppercase"
                style={{ color: "#D4B896" }}
              >
                hankwon
              </p>
              <span
                className="inline-block w-7 h-px"
                style={{ background: "#D4B896", opacity: 0.5 }}
              />
            </div>

            <div>
              <h3
                className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight mb-4 display-tight"
                style={{ color: "#F5F0E6" }}
              >
                {title}
              </h3>
              <span
                className="inline-block w-7 h-px mb-3"
                style={{ background: "#D4B896", opacity: 0.5 }}
              />
              <p
                className="text-xs leading-relaxed mt-3"
                style={{ color: "rgba(245,240,230,0.6)" }}
              >
                {subtitle}
              </p>
            </div>

            <p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(212,184,150,0.5)" }}
            >
              한 권
            </p>
          </div>

          {/* Subtle gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </div>
        {/* Page edge */}
        <div
          className="absolute right-0 inset-y-1 w-1 rounded-r-md"
          style={{ background: "#E8E4DA" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
