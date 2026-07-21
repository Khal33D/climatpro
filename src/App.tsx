import { useEffect } from 'react';
import { I18nProvider } from './i18n/I18nContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Products from './components/Products';
import Calculator from './components/Calculator';
import Steps from './components/Steps';
import Reviews from './components/Reviews';
import PaymentMethods from './components/PaymentMethods';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';
import CartDrawer from './components/CartDrawer';
import { trackPageView } from './lib/tracking';

function App() {
  useEffect(() => {
    trackPageView('ClimatPro Home');
  }, []);

  return (
    <I18nProvider>
      <CartProvider>
        <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
          <Header />
          <main>
            <Hero />
            <TrustBar />
            <Products />
            <Calculator />
            <Steps />
            <Reviews />
            <PaymentMethods />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <CartDrawer />
        </div>
      </CartProvider>
    </I18nProvider>
  );
}

export default App;
