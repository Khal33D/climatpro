import { Snowflake, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  const sections = [
    {
      title: t('footerProducts'),
      links: [
        { label: 'ClimatPro Compact', href: '#products' },
        { label: 'ClimatPro Home Comfort', href: '#products' },
        { label: 'ClimatPro Multi-Split', href: '#products' },
        { label: 'ClimatPro Commercial', href: '#products' },
      ],
    },
    {
      title: t('footerCompany'),
      links: [
        { label: t('footerAbout'), href: '#' },
        { label: t('footerCareers'), href: '#' },
        { label: t('footerBlog'), href: '#' },
        { label: t('footerContact'), href: '#contact' },
      ],
    },
    {
      title: t('footerSupport'),
      links: [
        { label: t('footerShipping'), href: '#' },
        { label: t('footerReturns'), href: '#' },
        { label: t('footerWarranty'), href: '#faq' },
        { label: t('navFaq'), href: '#faq' },
      ],
    },
    {
      title: t('footerLegal'),
      links: [
        { label: t('footerPrivacy'), href: '#' },
        { label: t('footerTerms'), href: '#' },
        { label: t('footerCookies'), href: '#' },
        { label: t('footerGdpr'), href: '#' },
      ],
    },
  ];

  const socials = [Facebook, Instagram, Twitter, Youtube, Linkedin];

  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl">
                Climat<span className="text-brand-400">Pro</span>
              </span>
            </div>
            <p className="mt-4 text-white/60 text-sm max-w-xs leading-relaxed">{t('footerTagline')}</p>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section, i) => (
            <div key={i}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/80 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-white/60 hover:text-brand-400 text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ClimatPro Europe. {t('footerRights')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">{t('footerMadeIn')}</span>
            <div className="flex gap-1.5">
              {['🇩🇪', '🇳🇱', '🇫🇷', '🇧🇪', '🇪🇸'].map((flag, i) => (
                <span key={i} className="text-lg">{flag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
