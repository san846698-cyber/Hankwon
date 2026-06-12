import { NextResponse, type NextRequest } from "next/server";
import { createCheckout } from "@/lib/payment/lemonsqueezy";
import { features } from "@/lib/features";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  slug?: string;
  // style/tier/person are persisted to the responses row via /api/response (PATCH).
  // Accepted here for completeness; the webhook reads them from the DB row.
  style?: "simple" | "rich";
  tier?: string;
  person?: "first" | "third";
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 },
    );
  }

  if (!features.hasLemonsqueezy()) {
    return NextResponse.json(
      {
        configured: false,
        mockUrl: "/thanks?mock=true",
        hint: "Add LemonSqueezy env vars to .env.local to enable real checkout",
      },
      { status: 200 },
    );
  }

  try {
    const result = await createCheckout({
      name,
      email,
      customData: body.slug ? { slug: body.slug } : undefined,
    });
    return NextResponse.json({ configured: true, url: result.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
