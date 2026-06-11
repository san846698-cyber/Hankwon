export default function BookIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 580"
      className={className}
      role="img"
      aria-label="펼친 책 일러스트"
    >
      <defs>
        <filter id="bookShadow" x="-15%" y="-10%" width="130%" height="125%">
          <feDropShadow
            dx="0"
            dy="22"
            stdDeviation="28"
            floodColor="#000000"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      <ellipse
        cx="260"
        cy="540"
        rx="200"
        ry="14"
        fill="#000000"
        opacity="0.06"
      />

      <g filter="url(#bookShadow)">
        <path
          d="M 50,90 Q 50,80 60,80 L 250,80 Q 260,80 260,90 L 260,500 Q 260,510 250,510 L 60,510 Q 50,510 50,500 Z"
          fill="#FFFFFF"
          stroke="#E8E4DA"
          strokeWidth="1"
        />
        <path
          d="M 260,90 Q 260,80 270,80 L 460,80 Q 470,80 470,90 L 470,500 Q 470,510 460,510 L 270,510 Q 260,510 260,500 Z"
          fill="#FFFFFF"
          stroke="#E8E4DA"
          strokeWidth="1"
        />
        <line
          x1="260"
          y1="80"
          x2="260"
          y2="510"
          stroke="#000000"
          strokeWidth="1"
          opacity="0.08"
        />
      </g>

      <g>
        <text
          x="155"
          y="118"
          fill="#737373"
          fontSize="9"
          fontWeight="600"
          letterSpacing="3"
          textAnchor="middle"
        >
          1장 — 어린 시절
        </text>
        <line x1="100" y1="138" x2="210" y2="138" stroke="#0F0F0F" strokeWidth="1" opacity="0.2" />
      </g>

      <g>
        <text
          x="155"
          y="170"
          fill="#404040"
          fontSize="10"
          fontStyle="italic"
          textAnchor="middle"
          opacity="0.7"
        >
          “여섯 살 무렵, 외갓집 마당에서…”
        </text>
        <line x1="80" y1="200" x2="220" y2="200" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="218" x2="215" y2="218" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="236" x2="195" y2="236" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="254" x2="220" y2="254" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="272" x2="180" y2="272" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <line x1="80" y1="306" x2="220" y2="306" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="324" x2="200" y2="324" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="342" x2="220" y2="342" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="360" x2="170" y2="360" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <line x1="80" y1="394" x2="220" y2="394" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="412" x2="195" y2="412" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="430" x2="220" y2="430" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="448" x2="155" y2="448" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <text x="155" y="488" fill="#A1A1A1" fontSize="9" textAnchor="middle">
          — 4 —
        </text>
      </g>

      <g>
        <line x1="290" y1="118" x2="430" y2="118" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="136" x2="425" y2="136" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="154" x2="410" y2="154" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="172" x2="430" y2="172" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="190" x2="395" y2="190" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <line x1="290" y1="224" x2="430" y2="224" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="242" x2="420" y2="242" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="260" x2="430" y2="260" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="278" x2="385" y2="278" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <line x1="290" y1="312" x2="430" y2="312" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="330" x2="415" y2="330" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="348" x2="430" y2="348" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="366" x2="380" y2="366" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <line x1="290" y1="400" x2="430" y2="400" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="418" x2="395" y2="418" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="436" x2="370" y2="436" stroke="#0F0F0F" strokeWidth="1" opacity="0.5" />

        <text x="365" y="488" fill="#A1A1A1" fontSize="9" textAnchor="middle">
          — 5 —
        </text>
      </g>
    </svg>
  );
}
