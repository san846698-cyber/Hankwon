"use client";

import { useEffect, useState } from "react";
import type { Plan } from "./page";
import { META_KEY } from "@/lib/questions";
import { trackEvent } from "@/lib/analytics";

type Props = { plan: Plan };

type StyleOption = "simple" | "rich";
type PersonOption = "first" | "third";

const STYLE_OPTIONS: {
  id: StyleOption;
  label: string;
  desc: string;
}[] = [
  {
    id: "simple",
    label: "담백하게",
    desc: "말씀 그대로 담습니다. 사실만, 꾸밈 없이.",
  },
  {
    id: "rich",
    label: "풍성하게",
    desc: "시대적 맥락과 감정의 흐름을 더해 읽기 좋게 씁니다.",
  },
];

const PERSON_OPTIONS: {
  id: PersonOption;
  label: string;
  sample: string;
  desc: string;
}[] = [
  {
    id: "first",
    label: "1인칭",
    sample: "“나는 1958년 경상도에서 태어났다…”",
    desc: "부모님 목소리로 직접 쓴 느낌",
  },
  {
    id: "third",
    label: "3인칭",
    sample: "“어머니는 1958년 경상도에서 태어나셨다…”",
    desc: "자녀가 부모님 이야기를 전하는 느낌",
  },
];

export default function BuyForm({ plan }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [style, setStyle] = useState<StyleOption>("simple");
  const [person, setPerson] = useState<PersonOption>("third");
  // self(부모님 본인 자서전)는 항상 1인칭 — 인칭 선택 UI를 숨기고 안내만 표시.
  const [mode, setMode] = useState<"self" | "other" | null>(null);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [paying, setPaying] = useState(false);

  const valid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    trackEvent("buy_viewed");
    // Restore previous style/person choice from sessionStorage.
    try {
      const metaRaw = sessionStorage.getItem(META_KEY);
      if (metaRaw) {
        const meta = JSON.parse(metaRaw) as Record<string, unknown>;
        if (meta.style) setStyle(meta.style as StyleOption);
        const metaMode =
          meta.mode === "self" || meta.mode === "other" ? meta.mode : null;
        setMode(metaMode);
        if (metaMode === "self") {
          // self는 항상 1인칭. 선택 UI 없이 1인칭으로 고정·저장.
          setPerson("first");
          persistMeta({ person: "first" });
        } else if (meta.person) {
          // other 모드에서 이미 선택했으면 존중.
          setPerson(meta.person as PersonOption);
        } else {
          // other 모드 기본값: 3인칭. DB 행(웹훅)에 반영되도록 저장.
          setPerson("third");
          persistMeta({ person: "third" });
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Persist style/person to sessionStorage AND the responses row (PATCH).
   * The webhook reads these from the DB row at generation time, so they must
   * be stored server-side — not just in sessionStorage.
   */
  function persistMeta(patch: { style?: StyleOption; person?: PersonOption }) {
    let responseId: string | null = null;
    try {
      const metaRaw = sessionStorage.getItem(META_KEY);
      if (metaRaw) {
        const meta = JSON.parse(metaRaw) as Record<string, unknown>;
        Object.assign(meta, patch);
        sessionStorage.setItem(META_KEY, JSON.stringify(meta));
        responseId = (meta.responseId as string | null) ?? null;
      }
    } catch {
      // ignore
    }
    if (responseId) {
      fetch("/api/response", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responseId, ...patch }),
      }).catch(() => {});
    }
  }

  function onStyleChange(s: StyleOption) {
    setStyle(s);
    persistMeta({ style: s });
  }

  function onPersonChange(p: PersonOption) {
    setPerson(p);
    persistMeta({ person: p });
  }

  async function onPay() {
    if (paying) return;
    setPaying(true);

    // Read slug from sessionStorage
    let slug: string | undefined;
    let tier: string | undefined;
    try {
      const metaRaw = sessionStorage.getItem(META_KEY);
      if (metaRaw) {
        const meta = JSON.parse(metaRaw) as {
          slug?: string | null;
          tier?: string;
        };
        slug = meta.slug ?? undefined;
        tier = meta.tier;
      }
    } catch {
      // ignore
    }

    trackEvent("pay_attempted", {
      plan: plan.id,
      amount: plan.price,
      style,
      person,
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, slug, style, tier, person }),
      });
      const data = (await res.json()) as
        | { configured: true; url: string }
        | { configured: false; mockUrl: string }
        | { error: string };

      if ("error" in data) {
        alert(`결제를 시작할 수 없어요: ${data.error}`);
        return;
      }
      if (data.configured) {
        window.location.href = data.url;
        return;
      }
      alert(
        `결제 연동 전 mock입니다.\n\n선택: ${plan.title}\n금액: ₩${plan.price.toLocaleString("ko-KR")}\n받으실 분: ${name}\n이메일: ${email}\n문체: ${style}\n인칭: ${person === "first" ? "1인칭" : "3인칭"}\n\n키 설정 후 실제 결제로 전환됩니다.`,
      );
      window.location.href = data.mockUrl;
    } catch (err) {
      alert("결제 중 오류가 발생했어요. 다시 시도해 주세요.");
      console.error("[buy] checkout failed:", err);
    } finally {
      setPaying(false);
    }
  }

  async function onWaitlist() {
    if (!/\S+@\S+\.\S+/.test(waitlistEmail)) return;
    trackEvent("waitlist_signed", { source: "buy_page" });
    const captured = waitlistEmail;
    setWaitlistDone(true);
    setWaitlistEmail("");
    fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: captured, source: "buy_page" }),
    }).catch(() => {});
  }

  return (
    <main className="min-h-dvh surface-ivory px-6 py-10">
      <div className="max-w-md mx-auto">
        <a href="/done" className="text-sm text-ink-soft hover:text-ink mb-8 inline-flex items-center gap-1.5">
          ← 미리보기로
        </a>

        <h1 className="font-display text-3xl text-ink mb-3 leading-tight" style={{ fontWeight: 800 }}>
          책으로 받기
        </h1>
        <p className="text-base text-ink-soft mb-10 leading-relaxed">
          PDF로 받아보시면 24시간 안에
          <br />
          이메일로 도착해요.
        </p>

        {/* Plan card */}
        <div className="bg-white/70 border border-accent/40 rounded-2xl p-5 mb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="font-display text-base text-ink" style={{ fontWeight: 700 }}>
                {plan.title}
              </span>
              <p className="text-sm text-ink-mute mt-1 leading-relaxed">
                {plan.desc}
              </p>
            </div>
            <p className="font-display text-base text-ink tabular-nums shrink-0" style={{ fontWeight: 700 }}>
              ₩{plan.price.toLocaleString("ko-KR")}
            </p>
          </div>
          <ul className="text-xs text-ink-soft space-y-1.5 pt-3 border-t hairline">
            {plan.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span className="text-accent-dark">✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Print waitlist */}
        <div className="bg-beige-200/40 border hairline rounded-2xl p-5 mb-10">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink-soft text-sm">양장 인쇄본</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-beige-300 text-ink-soft tracking-wider">
                곧 출시
              </span>
            </div>
            <p className="text-xs text-ink-mute shrink-0">준비 중</p>
          </div>
          <p className="text-xs text-ink-mute mb-4 leading-relaxed">
            손에 쥘 수 있는 양장 인쇄본은 출시 예정이에요. 알림 신청해두시면 가장 먼저 알려드려요.
          </p>
          {waitlistDone ? (
            <p className="text-sm text-accent-dark text-center py-2">
              ✓ 알림 신청 완료 — 출시되면 메일로 알려드릴게요
            </p>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="이메일"
                className="flex-1 h-11 rounded-xl bg-white/80 border hairline px-3 text-sm focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="button"
                onClick={onWaitlist}
                disabled={!/\S+@\S+\.\S+/.test(waitlistEmail)}
                className="h-11 px-4 rounded-xl bg-white border hairline text-sm font-medium text-ink-soft hover:border-ink disabled:opacity-40 transition-colors"
              >
                알림 신청
              </button>
            </div>
          )}
        </div>

        {/* Style selection */}
        <div className="mb-9">
          <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
            책 문체 선택
          </p>
          <div className="space-y-2.5">
            {STYLE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-4 rounded-2xl border px-5 py-4 cursor-pointer transition-all ${
                  style === opt.id
                    ? "bg-ink text-beige-100 border-ink"
                    : "bg-white/60 border-beige-300 hover:border-ink-mute hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="style"
                  value={opt.id}
                  checked={style === opt.id}
                  onChange={() => onStyleChange(opt.id)}
                  className="mt-0.5 accent-ink"
                />
                <div>
                  <p className={`font-display text-sm mb-0.5 ${style === opt.id ? "text-beige-100" : "text-ink"}`} style={{ fontWeight: 700 }}>
                    {opt.label}
                  </p>
                  <p className={`text-xs leading-relaxed ${style === opt.id ? "text-beige-100/70" : "text-ink-mute"}`}>
                    {opt.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Person (narration perspective) selection.
            self(본인 자서전)는 항상 1인칭이므로 선택 UI 대신 안내만 표시. */}
        {mode === "self" ? (
          <div className="mb-9">
            <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
              인칭
            </p>
            <div className="rounded-2xl border border-beige-300 bg-white/60 px-5 py-4">
              <p className="font-display text-sm text-ink mb-1" style={{ fontWeight: 700 }}>
                1인칭 자서전으로 작성됩니다
              </p>
              <p className="text-sm text-ink-soft mb-1 leading-relaxed">
                “나는 1958년 경상도에서 태어났다…”
              </p>
              <p className="text-xs text-ink-mute leading-relaxed">
                본인이 직접 들려주신 이야기라, 부모님의 목소리 그대로 1인칭으로 씁니다.
              </p>
            </div>
          </div>
        ) : (
        <div className="mb-9">
          <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
            인칭 선택
          </p>
          <div className="space-y-2.5">
            {PERSON_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-4 rounded-2xl border px-5 py-4 cursor-pointer transition-all ${
                  person === opt.id
                    ? "bg-ink text-beige-100 border-ink"
                    : "bg-white/60 border-beige-300 hover:border-ink-mute hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="person"
                  value={opt.id}
                  checked={person === opt.id}
                  onChange={() => onPersonChange(opt.id)}
                  className="mt-0.5 accent-ink"
                />
                <div>
                  <p className={`font-display text-sm mb-0.5 ${person === opt.id ? "text-beige-100" : "text-ink"}`} style={{ fontWeight: 700 }}>
                    {opt.label}
                  </p>
                  <p className={`text-sm mb-1 leading-relaxed ${person === opt.id ? "text-beige-100/90" : "text-ink-soft"}`}>
                    {opt.sample}
                  </p>
                  <p className={`text-xs leading-relaxed ${person === opt.id ? "text-beige-100/70" : "text-ink-mute"}`}>
                    {opt.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
        )}

        {/* Name / Email */}
        <div className="space-y-4 mb-8">
          <div>
            <label htmlFor="name" className="block text-sm text-ink-soft mb-1.5">
              받으실 분 이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full h-12 rounded-xl bg-white/70 border hairline px-4 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-ink-soft mb-1.5">
              이메일 (PDF 받기용)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              autoComplete="email"
              className="w-full h-12 rounded-xl bg-white/70 border hairline px-4 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onPay}
          disabled={!valid || paying}
          className="w-full h-14 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center hover:bg-ink-deep transition-all disabled:bg-beige-300 disabled:text-ink-mute disabled:cursor-not-allowed mb-4"
        >
          {paying
            ? "결제 페이지로 이동 중…"
            : `₩${plan.price.toLocaleString("ko-KR")} 결제하기`}
        </button>

        <p className="text-xs text-ink-mute text-center leading-relaxed">
          7일 이내 환불 가능 ·{" "}
          <a href="/terms" className="underline underline-offset-2">
            이용약관
          </a>
          에 동의하는 것입니다
        </p>
      </div>
    </main>
  );
}
