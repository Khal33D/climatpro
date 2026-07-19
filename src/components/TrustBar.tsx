import { ShieldCheck, BadgeEuro, Clock, Award, CreditCard, Languages, TrendingDown } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { BRAND_LOGOS } from './BrandLogos';

export default function TrustBar() {
  const { t } = useI18n();

  const items = [
    { icon: BadgeEuro, title: t('why1Title'), desc: t('why1Desc'), color: 'from-brand-500 to-brand-700' },
    { icon: ShieldCheck, title: t('why2Title'), desc: t('why2Desc'), color: 'from-accent-500 to-accent-700' },
    { icon: Clock, title: t('why3Title'), desc: t('why3Desc'), color: 'from-warm-400 to-warm-600' },
    { icon: Award, title: t('why4Title'), desc: t('why4Desc'), color: 'from-brand-400 to-brand-600' },
    { icon: CreditCard, title: t('why5Title'), desc: t('why5Desc'), color: 'from-accent-400 to-accent-600' },
    { icon: Languages, title: t('why6Title'), desc: t('why6Desc'), color: 'from-warm-500 to-warm-700' },
  ];

  const brands = BRAND_LOGOS;

  return (
    <section className="py-20 bg-white relative">
      {/* Brand strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-6">
          Trusted Brands We Install
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {brands.map((brand, i) => {
            const Logo = brand.Component;
            return (
              <div
                key={i}
                className="text-gray-300 hover:text-brand-500 transition-colors duration-300"
              >
                <Logo className="w-28 h-8 lg:w-32 lg:h-10" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            <TrendingDown className="w-4 h-4" />
            {t('whyBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-950 tracking-tight">{t('whyTitle')}</h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">{t('whySubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="relative mt-4 font-display font-bold text-lg text-brand-950">{item.title}</h3>
                <p className="relative mt-2 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
