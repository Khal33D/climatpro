// Shopify Storefront API client (headless commerce layer)
//
// Required env vars (set in Vercel: Settings → Environment Variables,
// and locally in a .env file — see .env.example):
//   VITE_SHOPIFY_STORE_DOMAIN   e.g. "climatpro-europe.myshopify.com"
//   VITE_SHOPIFY_STOREFRONT_TOKEN   the Storefront API access token
//
// Get the token from: Shopify Admin → Settings → Apps and sales channels
// → Develop apps → [your app] → API credentials → Storefront API access token

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const API_VERSION = '2025-01'; // check https://shopify.dev/docs/api/storefront for the current version

const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error(
      'Shopify env vars missing. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN.'
    );
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// ---------- Product lookup ----------

export interface ShopifyProductData {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  priceAmount: number;
  currencyCode: string;
  variantId: string;
  imageUrl: string | null;
}

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      availableForSale
      featuredImage {
        url
      }
      variants(first: 1) {
        edges {
          node {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<ShopifyProductData | null> {
  const data = await shopifyFetch<{ productByHandle: any }>(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data.productByHandle;
  if (!product) return null;

  const variant = product.variants?.edges?.[0]?.node;
  if (!variant) return null;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    availableForSale: product.availableForSale,
    priceAmount: parseFloat(variant.price.amount),
    currencyCode: variant.price.currencyCode,
    variantId: variant.id,
    imageUrl: product.featuredImage?.url ?? null,
  };
}

// Fetch multiple products by handle in one round trip (batched via aliases)
export async function getProductsByHandles(
  handles: string[]
): Promise<Record<string, ShopifyProductData | null>> {
  if (handles.length === 0) return {};

  const aliasedQueries = handles
    .map(
      (handle, i) => `
    p${i}: productByHandle(handle: "${handle.replace(/"/g, '\\"')}") {
      id
      handle
      title
      availableForSale
      featuredImage { url }
      variants(first: 1) {
        edges { node { id availableForSale price { amount currencyCode } } }
      }
    }
  `
    )
    .join('\n');

  const data = await shopifyFetch<Record<string, any>>(`query BatchProducts { ${aliasedQueries} }`);

  const result: Record<string, ShopifyProductData | null> = {};
  handles.forEach((handle, i) => {
    const product = data[`p${i}`];
    const variant = product?.variants?.edges?.[0]?.node;
    result[handle] =
      product && variant
        ? {
            id: product.id,
            handle: product.handle,
            title: product.title,
            availableForSale: product.availableForSale,
            priceAmount: parseFloat(variant.price.amount),
            currencyCode: variant.price.currencyCode,
            variantId: variant.id,
            imageUrl: product.featuredImage?.url ?? null,
          }
        : null;
  });
  return result;
}

// ---------- Cart ----------

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  price: number;
  currencyCode: string;
  imageUrl: string | null;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalAmount: number;
  currencyCode: string;
  lines: ShopifyCartLine[];
}

const CART_FRAGMENT = `
  id
  checkoutUrl
  cost {
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            product { title featuredImage { url } }
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

function parseCart(raw: any): ShopifyCart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalAmount: parseFloat(raw.cost.totalAmount.amount),
    currencyCode: raw.cost.totalAmount.currencyCode,
    lines: raw.lines.edges.map(({ node }: any) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id,
      title: node.merchandise.product.title,
      price: parseFloat(node.merchandise.price.amount),
      currencyCode: node.merchandise.price.currencyCode,
      imageUrl: node.merchandise.product.featuredImage?.url ?? null,
    })),
  };
}

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const query = `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } }>(query, {
    lines: [{ merchandiseId: variantId, quantity }],
  });
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(', '));
  }
  return parseCart(data.cartCreate.cart);
}

export async function addCartLine(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(', '));
  }
  return parseCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(', '));
  }
  return parseCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<ShopifyCart> {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
        userErrors { message }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>(query, {
    cartId,
    lineIds: [lineId],
  });
  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(', '));
  }
  return parseCart(data.cartLinesRemove.cart);
}

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }
  `;
  const data = await shopifyFetch<{ cart: any }>(query, { cartId });
  return data.cart ? parseCart(data.cart) : null;
}
