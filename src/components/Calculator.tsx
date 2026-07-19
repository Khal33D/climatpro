import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Snowflake, Home, Sun } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { PRODUCTS } from '../data/products';
import { getShopifyLink, trackPurchase } from '../lib/tracking';

export default function Calculator_() {
  const { t, lang, formatPrice } = useI18n();
  const [roomSize, setRoomSize] = useState(30);
  const [ceilingHeight, setCeilingHeight] = useState(2.5);
  const [sunExposure, setSunExposure] = useState<'low' | 'medium' | 'high'>('medium');

  const calcLabels: Record<string, Record<string, string>> = {
    en: { title: 'Find Your Perfect Match', subtitle: 'Tell us about your room and we will recommend the ideal climat for your space.', room: 'Room Size (m²)', ceiling: 'Ceiling Height (m)', sun: 'Sun Exposure', low: 'Low', medium: 'Medium', high: 'High', recommended: 'Recommended For You', btu: 'Required BTU', match: 'Best Match', viewAll: 'View All Products' },
    de: { title: 'Finden Sie Ihr Perfektes Match', subtitle: 'Sagen Sie uns von Ihrem Raum und wir empfehlen das ideale Klimagerät.', room: 'Raumgröße (m²)', ceiling: 'Deckenhöhe (m)', sun: 'Sonneneinstrahlung', low: 'Niedrig', medium: 'Mittel', high: 'Hoch', recommended: 'Für Sie Empfohlen', btu: 'Benötigte BTU', match: 'Beste Übereinstimmung', viewAll: 'Alle Produkte Anzeigen' },
    nl: { title: 'Vind Jouw Perfecte Match', subtitle: 'Vertel ons over uw ruimte en wij bevelen het ideale klimaatapparaat aan.', room: 'Kamergrootte (m²)', ceiling: 'Plafondhoogte (m)', sun: 'Zonblootstelling', low: 'Laag', medium: 'Gemiddeld', high: 'Hoog', recommended: 'Aanbevolen Voor U', btu: 'Benodigde BTU', match: 'Beste Match', viewAll: 'Alle Producten Bekijken' },
    fr: { title: 'Trouvez Votre Match Parfait', subtitle: 'Parlez-nous de votre pièce et nous recommanderons le climat idéal.', room: 'Taille de Pièce (m²)', ceiling: 'Hauteur sous Plafond (m)', sun: 'Ensoleillement', low: 'Faible', medium: 'Moyen', high: 'Élevé', recommended: 'Recommandé Pour Vous', btu: 'BTU Requis', match: 'Meilleur Match', viewAll: 'Voir Tous les Produits' },
    es: { title: 'Encuentra Tu Match Perfecto', subtitle: 'Cuéntanos sobre tu espacio y recomendaremos el climatizador ideal.', room: 'Tamaño de Habitación (m²)', ceiling: 'Altura del Techo (m)', sun: 'Exposición al Sol', low: 'Baja', medium: 'Media', high: 'Alta', recommended: 'Recomendado Para Ti', btu: 'BTU Requerido', match: 'Mejor Opción', viewAll: 'Ver Todos los Productos' },
  };

  const L = calcLabels[lang] || calcLabels.en;

  const sunFactor = { low: 0.85, medium: 1.0, high: 1.15 };
  const requiredBtu = useMemo(() => {
    const volume = roomSize * ceilingHeight;
    const baseBtu = volume * 150;
    return Math.round((baseBtu * sunFactor[sunExposure]) / 1000) * 1000;
  }, [roomSize, ceilingHeight, sunExposure]);

  const recommended = useMemo(() => {
    return PRODUCTS.reduce((best, p) => {
      const pBtu = parseInt(p.capacity);
      const bestBtu = parseInt(best.capacity);
      return Math.abs(pBtu - requiredBtu) < Math.abs(bestBtu - requiredBtu) ? p : best;
    });
  }, [requiredBtu]);

  const handleBuy = (productId: string, price: number) => {
    trackPurchase(productId, price);
    window.open(getShopifyLink(productId), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-brand-50/50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            BTU Calculator
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brand-950">{L.title}</h2>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto">{L.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 shadow-lg space-y-6">
            {/* Room size slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Home className="w-4 h-4 text-brand-500" />
                  {L.room}
                </label>
                <span className="font-display font-bold text-lg text-brand-950">{roomSize} m²</span>
              </div>
              <input
                type="range"
                min={10}
                max={120}
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                className="w-full h-2 bg-brand-100 rounded-full appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10</span><span>60</span><span>120</span>
              </div>
            </div>

            {/* Ceiling height slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">{L.ceiling}</label>
                <span className="font-display font-bold text-lg text-brand-950">{ceilingHeight} m</span>
              </div>
              <input
                type="range"
                min={2}
                max={4}
                step={0.1}
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
                className="w-full h-2 bg-brand-100 rounded-full appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            {/* Sun exposure */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Sun className="w-4 h-4 text-warm-500" />
                {L.sun}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSunExposure(level)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      sunExposure === level
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {L[level]}
                  </button>
                ))}
              </div>
            </div>

            {/* BTU result */}
            <div className="p-4 rounded-xl bg-brand-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/30 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-brand-300" />
                </div>
                <div>
                  <div className="text-xs text-white/60">{L.btu}</div>
                  <div className="font-display font-bold text-xl">{requiredBtu.toLocaleString()} BTU</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-brand-950 to-brand-800 text-white shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                <Snowflake className="w-4 h-4 text-accent-400" />
              </div>
              <span className="text-sm font-semibold text-accent-400">{L.recommended}</span>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="font-display font-bold text-2xl">{recommended.name}</h3>
              <p className="mt-1 text-sm text-white/60">{recommended.tagline[lang]}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-white/5 text-center">
                  <div className="text-[10px] text-white/50 uppercase">BTU</div>
                  <div className="font-bold text-sm">{recommended.capacity}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-center">
                  <div className="text-[10px] text-white/50 uppercase">Area</div>
                  <div className="font-bold text-sm">{recommended.roomSize}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-center">
                  <div className="text-[10px] text-white/50 uppercase">Class</div>
                  <div className="font-bold text-sm">{recommended.energyClass}</div>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-white/50">{t('productFrom')}</div>
                  <div className="font-display font-bold text-3xl">{formatPrice(recommended.price)}</div>
                  <div className="text-xs text-accent-400 font-semibold mt-0.5">
                    {t('installFee')}: {formatPrice(recommended.installFee)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuy(recommended.id, recommended.price)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-950 font-semibold hover:bg-warm-50 transition-all group"
              >
                {t('productBuy')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
