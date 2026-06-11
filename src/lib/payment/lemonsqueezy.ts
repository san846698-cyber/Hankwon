import "server-only";
import crypto from "node:crypto";

const API_URL = "https://api.lemonsqueezy.com/v1";

export type CreateCheckoutArgs = {
  email: string;
  name: string;
  customData?: Record<string, string>;
};

export type CheckoutResult = {
  url: string;
};

/**
 * Create a one-time checkout URL for the digital book.
 *
 * Reads store/variant IDs from env so we can switch between test and live modes
 * without code changes.
 */
export async function createCheckout(
  args: CreateCheckoutArgs,
): Promise<CheckoutResult> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;

  if (!apiKey || !storeId || !variantId) {
    throw new Error(
      "LEMONSQUEEZY_API_KEY / STORE_ID / VARIANT_ID must all be set",
    );
  }

  const res = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: args.email,
            name: args.name,
            custom: args.customData ?? {},
          },
          product_options: {
            redirect_url:
              process.env.NEXT_PUBLIC_SITE_URL
                ? `${process.env.NEXT_PUBLIC_SITE_URL}/thanks`
                : undefined,
          },
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LemonSqueezy ${res.status}: ${text}`);
  }

  const json = (await res.json()) as {
    data: { attributes: { url: string } };
  };
  return { url: json.data.attributes.url };
}

/**
 * Verify webhook signature. Constant-time HMAC-SHA256 comparison.
 *
 * Header from LS: `X-Signature: <hex>`
 * Returns false if secret missing — webhooks must reject in that case.
 */
export function verifyWebhookSignature(
  rawPayload: string,
  signatureHex: string,
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;

  const hmac = crypto.createHmac("sha256", secret);
  const digestHex = hmac.update(rawPayload, "utf8").digest("hex");

  const a = Buffer.from(signatureHex, "hex");
  const b = Buffer.from(digestHex, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export type LemonsqueezyWebhookEvent = {
  meta: {
    event_name: string;
    custom_data?: Record<string, string>;
  };
  data: {
    id: string;
    type: string;
    attributes: Record<string, unknown> & {
      user_email?: string;
      user_name?: string;
      total?: number;
      status?: string;
    };
  };
};
