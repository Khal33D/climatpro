import { Star, Quote, BadgeCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { REVIEWS } from '../data/products';

export default function Reviews() {
  const { t, lang } = useI18n();

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-b from-white to-brand-50/30 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            {t('reviewsBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-950 tracking-tight">{t('reviewsTitle')}</h2>
          <p className="mt-4 text-gray-500 text-lg">{t('reviewsSubtitle')}</p>

          {/* Rating summary */}
          <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-warm-400 text-warm-400" />
              ))}
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-left">
              <div className="font-display font-bold text-lg text-brand-950">4.9 / 5</div>
              <div className="text-xs text-gray-400">2,847 verified reviews</div>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <BadgeCheck className="w-4 h-4 text-accent-500" />
              Trustpilot
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-brand-50 group-hover:text-brand-100 transition-colors" />

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-brand-950 text-sm flex items-center gap-1.5">
                    {review.name}
                    <BadgeCheck className="w-3.5 h-3.5 text-accent-500" />
                  </div>
                  <div className="text-xs text-gray-400">{review.country} Verified Buyer</div>
                </div>
              </div>

              <div className="flex mt-3 gap-0.5">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-warm-400 text-warm-400" />
                ))}
              </div>

              <p className="mt-3 text-gray-600 text-sm leading-relaxed">"{review.text[lang]}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
