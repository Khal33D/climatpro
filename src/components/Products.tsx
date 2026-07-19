import { Check, ArrowRight, Snowflake, Zap, Ruler, Wind, Volume2, Wifi, Shield } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { PRODUCTS } from '../data/products';
import { getShopifyLink, trackProductView, trackPurchase } from '../lib/tracking';

export default function Products() {
  const { t, lang, formatPrice } = useI18n();

  const handleBuy = (productId: string, price: number) => {
    trackPurchase(productId, price);
    window.open(getShopifyLink(productId), '_blank', 'noopener,noreferrer');
  };

  const handleView = (productId: string, price: number) => {
    trackProductView(productId, price);
  };

  const featureIcons = [Volume2, Wifi, Zap, Wind];

  return (
    <section id="products" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold mb-4">
            {t('productsBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-950 tracking-tight">{t('productsTitle')}</h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">{t('productsSubtitle')}</p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              onMouseEnter={() => handleView(product.id, product.price)}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    target.parentElement!.innerHTML += '<div class="text-6xl text-brand-200"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M2 12l4-4M2 12l4 4M12 2v20M12 2l-4 4M12 2l4 4M12 22l-4-4M12 22l4-4M22 12l-4-4M22 12l-4 4"/></svg></div>';
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-warm-400 text-white text-[11px] font-bold shadow-lg">
                    {product.badge}
                  </div>
                )}

                {/* Energy class */}
                <div className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-bold text-brand-700">{product.energyClass}</span>
                </div>

                {/* Install included ribbon */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-[11px] font-semibold py-1.5 text-center flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  {t('productInstall')}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                {/* Title */}
                <h3 className="font-display font-bold text-lg text-brand-950 leading-tight">{product.name}</h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">{product.tagline[lang]}</p>

                {/* Specs */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[11px] font-medium">
                    <Snowflake className="w-3 h-3" /> {product.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-50 text-accent-700 text-[11px] font-medium">
                    <Ruler className="w-3 h-3" /> {product.roomSize}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-3 space-y-1.5 flex-1">
                  {product.features[lang].slice(0, 3).map((feature, idx) => {
                    const Icon = featureIcons[idx] || Check;
                    return (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <Icon className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    );
                  })}
                </ul>

                {/* Price */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t('productFrom')}</div>
                      <div className="font-display font-bold text-2xl text-brand-950">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Install</div>
                      <div className="font-display font-bold text-lg text-accent-600">
                        {formatPrice(product.installFee)}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBuy(product.id, product.price)}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-950 text-white font-semibold text-sm hover:bg-brand-800 hover:shadow-lg transition-all group/btn"
                  >
                    {t('productBuy')}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-950 text-white">
                  <th className="text-left p-4 font-display font-semibold text-sm">Model</th>
                  <th className="text-center p-4 font-display font-semibold text-sm">Capacity</th>
                  <th className="text-center p-4 font-display font-semibold text-sm">Room Size</th>
                  <th className="text-center p-4 font-display font-semibold text-sm">Energy</th>
                  <th className="text-center p-4 font-display font-semibold text-sm">Unit Price</th>
                  <th className="text-center p-4 font-display font-semibold text-sm">Install Fee</th>
                  <th className="text-center p-4 font-display font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((product, i) => (
                  <tr key={product.id} className={`border-b border-gray-100 hover:bg-brand-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4">
                      <div className="font-semibold text-brand-950 text-sm">{product.name}</div>
                      {product.badge && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-warm-100 text-warm-700 text-[10px] font-bold">
                          {product.badge}
                        </span>
                      )}
                    </td>
                    <td className="text-center p-4 text-sm text-gray-600">{product.capacity}</td>
                    <td className="text-center p-4 text-sm text-gray-600">{product.roomSize}</td>
                    <td className="text-center p-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-accent-100 text-accent-700 text-xs font-bold">{product.energyClass}</span>
                    </td>
                    <td className="text-center p-4 font-display font-bold text-brand-950">{formatPrice(product.price)}</td>
                    <td className="text-center p-4 font-display font-bold text-accent-600">{formatPrice(product.installFee)}</td>
                    <td className="text-center p-4">
                      <button
                        onClick={() => handleBuy(product.id, product.price)}
                        className="px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors"
                      >
                        {t('productBuy')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">{t('currencyNote')}</p>
      </div>
    </section>
  );
}
