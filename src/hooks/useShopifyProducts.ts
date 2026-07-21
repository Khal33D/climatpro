import { useEffect, useState } from 'react';
import { PRODUCTS, type Product } from '../data/products';
import { getProductsByHandles, type ShopifyProductData } from '../lib/shopify';

export interface MergedProduct extends Product {
  variantId: string | null;
  availableForSale: boolean;
  liveePrice: number | null; // live Shopify price, if available (falls back to local `price`)
}

// Merges local marketing/content data with live Shopify commerce data.
// If Shopify env vars aren't set yet, or a handle isn't found in the store,
// this falls back gracefully to the local product so the site never breaks.
export function useShopifyProducts() {
  const [products, setProducts] = useState<MergedProduct[]>(
    PRODUCTS.map((p) => ({ ...p, variantId: null, availableForSale: true, liveePrice: null }))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [shopifyConnected, setShopifyConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const handles = PRODUCTS.map((p) => p.id);
        const shopifyData = await getProductsByHandles(handles);

        if (cancelled) return;

        const anyMatched = Object.values(shopifyData).some((d) => d !== null);
        setShopifyConnected(anyMatched);

        setProducts(
          PRODUCTS.map((p) => {
            const live: ShopifyProductData | null = shopifyData[p.id] ?? null;
            return {
              ...p,
              variantId: live?.variantId ?? null,
              availableForSale: live?.availableForSale ?? true,
              liveePrice: live?.priceAmount ?? null,
            };
          })
        );
      } catch {
        // Shopify unreachable (env vars not set, network issue, etc.) — keep local fallback data
        if (!cancelled) setShopifyConnected(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading, shopifyConnected };
}
