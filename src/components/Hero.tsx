import { ArrowRight, Star, ShieldCheck, Zap, Clock, ThermometerSun, Wind, Volume2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Hero() {
  const { t } = useI18n();

  const stats = [
    { value: t('heroStat1'), label: t('heroStat1Label'), icon: Star },
    { value: t('heroStat2'), label: t('heroStat2Label'), icon: ShieldCheck },
    { value: t('heroStat3'), label: t('heroStat3Label'), icon: Clock },
    { value: t('heroStat4'), label: t('heroStat4Label'), icon: Zap },
  ];

  const specItems = [
    { icon: Wind, label: 'A+++', sub: 'Energy Class' },
    { icon: Volume2, label: '19 dB', sub: 'Ultra Quiet' },
    { icon: ThermometerSun, label: 'Cool + Heat', sub: 'All Season' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-brand-950">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-sm font-medium animate-fade-in-down">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-warm-400 text-warm-400" />
                ))}
              </span>
              {t('heroBadge')}
            </div>

            {/* Title */}
            <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.1] animate-fade-in-up">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg text-white/70 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-950 font-semibold text-base shadow-2xl hover:shadow-warm-500/30 hover:bg-warm-50 hover:-translate-y-0.5 transition-all"
              >
                {t('heroCta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                {t('heroCta2')}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <Icon className="w-4 h-4 text-brand-400" />
                    <div className="text-xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-[11px] text-white/50 leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Product showcase */}
          <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* Main visual card */}
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/30 to-accent-500/20 rounded-[2rem] blur-2xl" />

              {/* Card */}
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8">
                {/* AC Unit illustration */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-100/20 to-brand-900/40">
                  <img
                    src="https://images.pexels.com/photos/6782360/pexels-photo-6782360.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Premium air conditioning unit"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />

                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-warm-400 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    Best Seller
                  </div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-950/80 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="font-display font-bold text-lg">ClimatPro Home Comfort</div>
                        <div className="text-xs text-white/70">12,000 BTU · 25-40 m²</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/50">from</div>
                        <div className="font-display font-bold text-xl">€699</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spec pills */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {specItems.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 border border-white/10">
                        <Icon className="w-5 h-5 text-brand-400 mb-1.5" />
                        <div className="text-sm font-bold text-white">{spec.label}</div>
                        <div className="text-[10px] text-white/50">{spec.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating install fee badge */}
              <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl bg-accent-500 text-white shadow-2xl shadow-accent-500/30 animate-bounce-soft">
                <div className="text-[10px] uppercase tracking-wider text-white/80">Install Fee</div>
                <div className="font-display font-bold text-lg">From €99</div>
              </div>

              {/* Floating warranty badge */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-warm-400 text-white shadow-2xl flex flex-col items-center justify-center animate-float">
                <ShieldCheck className="w-5 h-5" />
                <div className="text-[9px] font-bold mt-0.5">5Y WAR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,40 C360,70 720,10 1080,25 C1260,32 1380,45 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
