import { CreditCard, Wallet, Landmark, Banknote, ShieldCheck, Percent } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function PaymentMethods() {
  const { t } = useI18n();

  const methods = [
    { name: 'Visa', icon: CreditCard, bg: 'bg-blue-600', text: 'text-white' },
    { name: 'Mastercard', icon: CreditCard, bg: 'bg-orange-500', text: 'text-white' },
    { name: 'Amex', icon: CreditCard, bg: 'bg-teal-600', text: 'text-white' },
    { name: 'PayPal', icon: Wallet, bg: 'bg-blue-500', text: 'text-white' },
    { name: 'Klarna', icon: Wallet, bg: 'bg-pink-500', text: 'text-white' },
    { name: 'iDEAL', icon: Landmark, bg: 'bg-rose-600', text: 'text-white' },
    { name: 'Bancontact', icon: CreditCard, bg: 'bg-yellow-500', text: 'text-white' },
    { name: 'SEPA', icon: Banknote, bg: 'bg-brand-600', text: 'text-white' },
  ];

  const financingPlans = [
    { months: '3', apr: '0%', perMonth: 'EUR 233' },
    { months: '6', apr: '0%', perMonth: 'EUR 117' },
    { months: '12', apr: '0%', perMonth: 'EUR 58' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            {t('paymentBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-brand-950 tracking-tight">{t('paymentTitle')}</h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">{t('paymentSubtitle')}</p>
        </div>

        {/* Payment methods grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {methods.map((method, i) => {
            const Icon = method.icon;
            return (
              <div
                key={i}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`w-11 h-11 rounded-xl ${method.bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${method.text}`} />
                </div>
                <span className="font-semibold text-gray-700 text-sm">{method.name}</span>
              </div>
            );
          })}
        </div>

        {/* Financing plans */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-950 to-brand-800 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/20 text-accent-400 text-sm font-semibold mb-4">
                <Percent className="w-4 h-4" />
                0% APR Financing
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-white">
                Split Your Payment, Interest-Free
              </h3>
              <p className="mt-3 text-white/60 text-base leading-relaxed">
                Choose Klarna at checkout to split your purchase into 3, 6, or 12 monthly payments. No interest, no hidden fees, no surprises.
              </p>
              <div className="mt-4 flex items-center gap-2 text-white/50 text-sm">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                Protected by buyer protection guarantee
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {financingPlans.map((plan, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="text-xs text-white/50 uppercase tracking-wider">{plan.months} months</div>
                  <div className="mt-2 font-display font-bold text-2xl text-white">{plan.perMonth}</div>
                  <div className="text-xs text-accent-400 font-semibold mt-1">{plan.apr} APR</div>
                  <div className="text-[10px] text-white/40 mt-0.5">per month</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
