# Connecting ClimatPro to Shopify — Setup Guide

## What's already built (in this codebase)

- `src/lib/shopify.ts` — Storefront API client (product lookup + cart mutations)
- `src/context/CartContext.tsx` — cart state, persisted across page loads
- `src/hooks/useShopifyProducts.ts` — merges your existing marketing copy in
  `src/data/products.ts` with live price/stock from Shopify
- `src/components/CartDrawer.tsx` — the cart UI
- `Header.tsx` and `Products.tsx` — updated to use the real cart instead of
  the old `getShopifyLink()` link-out

If Shopify isn't connected yet (no env vars set), the site still works —
it just falls back to the static prices in `products.ts` and the Buy button
will log a warning instead of adding to cart. Nothing breaks.

## Step 1 — Get your Storefront API token

1. Shopify Admin → **Settings → Apps and sales channels**
2. Click **Develop apps** (top right). If this is your first time, click
   **Allow custom app development** first.
3. **Create an app** → name it e.g. "ClimatPro Storefront"
4. Go to the **Configuration** tab → find **Storefront API** → click
   **Configure**
5. Enable at minimum:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
6. Save, then click **Install app**
7. Go to the **API credentials** tab → copy the **Storefront API access
   token** (starts with `shpat_` or similar)

## Step 2 — Match product handles

This is the one manual step that has to line up exactly. Your local
product IDs in `src/data/products.ts` are:

| Local `id`        | Must equal Shopify product **handle** |
|-------------------|----------------------------------------|
| `compact-pro`     | `compact-pro`                          |
| `home-comfort`    | `home-comfort`                         |
| `multi-split`     | `multi-split`                          |
| `commercial-pro`  | `commercial-pro`                       |

In Shopify Admin → **Products**, open each of your 4 products → in the
**Search engine listing** section (bottom right, "Edit website SEO") you'll
see the **URL handle**. Edit it to match the table above exactly. This is
how the code matches your marketing copy to Shopify's live price/stock —
if a handle doesn't match, that product just falls back to the static
local price instead of erroring.

## Step 3 — Set environment variables

**Locally:** copy `.env.example` to `.env` and fill in your real values.

**In Vercel:** Project → **Settings → Environment Variables** → add:
- `VITE_SHOPIFY_STORE_DOMAIN` = `your-store.myshopify.com`
- `VITE_SHOPIFY_STOREFRONT_TOKEN` = the token from Step 1

Redeploy after adding these (Vercel doesn't hot-reload env vars into an
already-deployed build).

## Step 4 — Test

1. Run locally: `npm run dev`
2. Open the Products section — prices should now reflect what's actually
   in Shopify (if they differ from `products.ts`, Shopify wins)
3. Click "Buy" on a product → the cart drawer should open with that item
4. Click "Checkout securely" → should land on your Shopify-hosted checkout
   with the correct item and price already in the cart

## What still needs a decision from you

- **Payments**: make sure a payment provider (Shopify Payments, Stripe,
  etc.) is activated in Shopify Admin → Settings → Payments, or checkout
  will fail at the last step.
- **Shipping/tax settings**: configured entirely in Shopify Admin, not in
  this code — Settings → Shipping and delivery / Taxes.
- **Install fee handling**: right now `installFee` is shown for display
  only and isn't added to the cart. If you want it charged, we should
  either (a) create a second Shopify product/variant "Installation" that
  gets added alongside the unit, or (b) fold it into the unit's price.
  Tell me which and I'll wire it in.
