import { MousePointerClick, CalendarCheck, HomeIcon, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Steps() {
  const { t } = useI18n();

  const steps = [
    { icon: MousePointerClick, title: t('step1Title'), desc: t('step1Desc'), num: '01', image: 'https://images.pexels.com/photos/6782360/pexels-photo-6782360.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { icon: CalendarCheck, title: t('step2Title'), desc: t('step2Desc'), num: '02', image: 'https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { icon: HomeIcon, title: t('step3Title'), desc: t('step3Desc'), num: '03', image: 'https://images.pexels.com/photos/6527063/pexels-photo-6527063.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-semibold mb-4">
            {t('stepsBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-white tracking-tight">{t('stepsTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="group relative">
                {/* Image card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

                  {/* Number badge */}
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-2xl shadow-brand-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-warm-400 text-white text-xs font-bold flex items-center justify-center shadow-lg ring-4 ring-brand-950">
                        {step.num}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-display font-bold text-xl text-white">{step.title}</h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#products"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-950 font-semibold shadow-2xl hover:bg-warm-50 hover:-translate-y-0.5 transition-all"
          >
            {t('heroCta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
