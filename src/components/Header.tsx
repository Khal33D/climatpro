import { useState, useEffect } from 'react';
import { Menu, X, Snowflake, ChevronDown, Globe, ShoppingBag } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { LANGUAGES, type Language } from '../i18n/translations';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'navProducts' as const, href: '#products' },
    { key: 'navWhy' as const, href: '#why' },
    { key: 'navReviews' as const, href: '#reviews' },
    { key: 'navFaq' as const, href: '#faq' },
    { key: 'navContact' as const, href: '#contact' },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-brand-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
              <Snowflake className="w-6 h-6 text-white" />
            </div>
            <span className={`font-display font-extrabold text-xl lg:text-2xl transition-colors ${scrolled ? 'text-brand-950' : 'text-white'}`}>
              Climat<span className="text-brand-500">Pro</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLang.flag}</span>
                <span className="hidden md:inline">{currentLang.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-fade-in-down">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code as Language);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-brand-50 ${
                          lang === l.code ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className={`relative p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] px-1 flex items-center justify-center rounded-full bg-accent-500 text-white text-[10px] font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* CTA */}
            <a
              href="#products"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all"
            >
              {t('navOrder')}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 animate-fade-in-down">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
              <a
                href="#products"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-center"
              >
                {t('navOrder')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
