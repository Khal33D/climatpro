import { useState, type FormEvent } from 'react';
import { Send, MessageCircle, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { COUNTRIES } from '../data/products';
import { getWhatsAppLink, trackLead } from '../lib/tracking';
import type { Language } from '../i18n/translations';

export default function Contact() {
  const { t, lang } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackLead('contact_form');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', country: '', message: '' });
  };

  const handleWhatsApp = () => {
    trackLead('whatsapp');
    window.open(getWhatsAppLink(t('whatsappMessage')), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-brand-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            {t('contactBadge')}
          </span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-950">{t('contactTitle')}</h2>
          <p className="mt-4 text-gray-600 text-lg">{t('contactSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-accent-500 mb-4" />
                  <p className="text-lg font-semibold text-brand-950">{t('contactSuccess')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contactName')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contactEmail')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contactPhone')}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contactCountry')}</label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-white"
                      >
                        <option value="">—</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name[lang as Language]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contactMessage')}</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg shadow-brand-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <Send className="w-5 h-5" />
                    {t('contactSubmit')}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Info + WhatsApp */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button
              onClick={handleWhatsApp}
              className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <MessageCircle className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-lg">{t('contactWhatsapp')}</span>
              <span className="mt-1 text-white/80 text-sm">24/7 — Instant Response</span>
            </button>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="text-sm font-medium text-gray-700">support@climatpro.eu</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone</div>
                  <div className="text-sm font-medium text-gray-700">+31 6 00 00 00 00</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">HQ</div>
                  <div className="text-sm font-medium text-gray-700">Amsterdam, Netherlands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
