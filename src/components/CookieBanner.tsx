import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('climatpro-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('climatpro-cookie-consent', accepted ? 'accepted' : 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center gap-4">
        <p className="flex-1 text-sm text-gray-600 leading-relaxed">{t('cookieText')}</p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => handleChoice(false)}
            className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
          >
            {t('cookieDecline')}
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg shadow-brand-500/20 hover:shadow-xl transition-all text-sm"
          >
            {t('cookieAccept')}
          </button>
        </div>
      </div>
    </div>
  );
}
