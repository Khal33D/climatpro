import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { getWhatsAppLink, trackLead } from '../lib/tracking';

export default function WhatsAppButton() {
  const { t } = useI18n();
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 4000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    trackLead('whatsapp_floating');
    window.open(getWhatsAppLink(t('whatsappMessage')), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl bg-white shadow-xl border border-gray-100 animate-slide-in-right">
          <span className="text-sm font-medium text-gray-700">{t('whatsappTooltip')}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition-transform group"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white relative z-10" />
        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white animate-bounce-soft">
          1
        </span>
      </button>
    </div>
  );
}
