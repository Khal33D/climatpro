// Ad platform tracking utilities
// Replace placeholder IDs with real pixel/account IDs in production

export const AD_CONFIG = {
  // Google Ads — replace AW-XXXXXXXXX with your conversion ID
  googleAdsId: 'AW-XXXXXXXXX',
  // Meta/Facebook Pixel — replace with your Pixel ID
  metaPixelId: 'XXXXXXXXXXXXXXXX',
  // TikTok Pixel — replace with your Pixel ID
  tiktokPixelId: 'XXXXXXXXXXXXXXXX',
  // Snapchat Pixel — replace with your Pixel ID
  snapchatPixelId: 'XXXX-XXXX',
  // Shopify store URL
  shopifyUrl: 'https://climatpro-europe.myshopify.com',
  // WhatsApp business number (international format, no +)
  whatsappNumber: '31600000000',
};

// Track page views across all platforms
export function trackPageView(pageName: string): void {
  // Google Ads
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'page_view', { page_title: pageName });
  }
  // Meta Pixel
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', 'PageView');
  }
  // TikTok
  if (typeof (window as any).ttq === 'object') {
    (window as any).ttq.page();
  }
  // Snapchat
  if (typeof (window as any).snaptr === 'function') {
    (window as any).snaptr('track', 'PAGE_VIEW');
  }
}

// Track conversion events (purchase, lead, etc.)
export function trackEvent(event: string, data?: Record<string, unknown>): void {
  // Google Ads
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, data);
  }
  // Meta Pixel — map common events
  if (typeof (window as any).fbq === 'function') {
    const metaEvent = event === 'purchase' ? 'Purchase' : event === 'lead' ? 'Lead' : 'ViewContent';
    (window as any).fbq('track', metaEvent, data);
  }
  // TikTok
  if (typeof (window as any).ttq === 'object') {
    (window as any).ttq.track(event, data);
  }
  // Snapchat
  if (typeof (window as any).snaptr === 'function') {
    (window as any).snaptr('track', event.toUpperCase(), data);
  }
}

// Track product view
export function trackProductView(productId: string, price: number): void {
  trackEvent('ViewContent', { content_id: productId, value: price, currency: 'EUR' });
}

// Track add to cart / buy click
export function trackPurchase(productId: string, price: number): void {
  trackEvent('purchase', { content_id: productId, value: price, currency: 'EUR' });
}

// Track lead (contact form / WhatsApp)
export function trackLead(source: string): void {
  trackEvent('lead', { source });
}

// Generate WhatsApp deep link
export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${AD_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Generate Shopify product link
export function getShopifyLink(productId: string): string {
  return `${AD_CONFIG.shopifyUrl}/products/${productId}`;
}
