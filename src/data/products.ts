export interface Product {
  id: string;
  name: string;
  tagline: Record<string, string>;
  price: number;
  installFee: number;
  image: string;
  capacity: string;
  roomSize: string;
  energyClass: string;
  features: Record<string, string[]>;
  badge?: string;
  popular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'compact-pro',
    name: 'ClimatPro Compact',
    tagline: {
      en: 'Perfect for bedrooms & small spaces',
      de: 'Perfekt für Schlafzimmer & kleine Räume',
      nl: 'Perfect voor slaapkamers & kleine ruimtes',
      fr: 'Parfait pour chambres & petits espaces',
      es: 'Perfecto para dormitorios y espacios pequeños',
    },
    price: 449,
    installFee: 99,
    image: 'https://images.pexels.com/photos/6782360/pexels-photo-6782360.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '9000 BTU',
    roomSize: '15-25 m²',
    energyClass: 'A++',
    badge: 'Best Seller',
    popular: true,
    features: {
      en: ['Ultra-quiet operation (19 dB)', 'WiFi smart control', 'A++ energy rating', 'Sleep mode & timer'],
      de: ['Ultra-leiser Betrieb (19 dB)', 'WLAN-Smart-Steuerung', 'A++ Energieeffizienz', 'Schlafmodus & Timer'],
      nl: ['Ultra-stille werking (19 dB)', 'WiFi slimme bediening', 'A++ energieklasse', 'Slaapstand & timer'],
      fr: ['Fonctionnement ultra-silencieux (19 dB)', 'Contrôle intelligent WiFi', 'Classe énergétique A++', 'Mode sommeil & minuteur'],
      es: ['Funcionamiento ultra-silencioso (19 dB)', 'Control inteligente WiFi', 'Clase energética A++', 'Modo sueño y temporizador'],
    },
  },
  {
    id: 'home-comfort',
    name: 'ClimatPro Home Comfort',
    tagline: {
      en: 'Ideal for living rooms & open spaces',
      de: 'Ideal für Wohnzimmer & offene Räume',
      nl: 'Ideaal voor woonkamers & open ruimtes',
      fr: 'Idéal pour salons & espaces ouverts',
      es: 'Ideal para salones y espacios abiertos',
    },
    price: 699,
    installFee: 129,
    image: 'https://images.pexels.com/photos/6782439/pexels-photo-6782439.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '12000 BTU',
    roomSize: '25-40 m²',
    energyClass: 'A++',
    features: {
      en: ['Powerful cooling & heating', 'Air purification filter', 'Smart thermostat included', 'Auto-swing louvers'],
      de: ['Leistungsstarke Kühlung & Heizung', 'Luftreinigungsfilter', 'Smart-Thermostat inklusive', 'Automatische Lamellen'],
      nl: ['Krachtige koeling & verwarming', 'Luchtreinigingsfilter', 'Slimme thermostaat inbegrepen', 'Automatische lamellen'],
      fr: ['Refroidissement & chauffage puissants', 'Filtre purificateur d\'air', 'Thermostat intelligent inclus', 'Ailettes auto-oscillantes'],
      es: ['Refrigeración y calefacción potentes', 'Filtro purificador de aire', 'Termostato inteligente incluido', 'Lamas automáticas'],
    },
  },
  {
    id: 'multi-split',
    name: 'ClimatPro Multi-Split',
    tagline: {
      en: 'Cool multiple rooms with one system',
      de: 'Kühlen Sie mehrere Räume mit einem System',
      nl: 'Koel meerdere kamers met één systeem',
      fr: 'Refroidissez plusieurs pièces avec un système',
      es: 'Refrigera varias habitaciones con un sistema',
    },
    price: 1299,
    installFee: 199,
    image: 'https://images.pexels.com/photos/6523291/pexels-photo-6523291.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '24000 BTU',
    roomSize: '40-70 m²',
    energyClass: 'A+++',
    badge: 'Best Value',
    features: {
      en: ['2 indoor units included', 'Independent zone control', 'A+++ energy rating', 'Up to 70% energy savings'],
      de: ['2 Innengeräte inklusive', 'Unabhängige Zonensteuerung', 'A+++ Energieeffizienz', 'Bis zu 70% Energieeinsparung'],
      nl: ['2 binnenunits inbegrepen', 'Onafhankelijke zonecontrole', 'A+++ energieklasse', 'Tot 70% energiebesparing'],
      fr: ['2 unités intérieures incluses', 'Contrôle de zone indépendant', 'Classe énergétique A+++', 'Jusqu\'à 70% d\'économies d\'énergie'],
      es: ['2 unidades interiores incluidas', 'Control de zona independiente', 'Clase energética A+++', 'Hasta 70% de ahorro energético'],
    },
  },
  {
    id: 'commercial-pro',
    name: 'ClimatPro Commercial',
    tagline: {
      en: 'Heavy-duty for offices & large spaces',
      de: 'Leistungsstark für Büros & große Räume',
      nl: 'Krachtig voor kantoren & grote ruimtes',
      fr: 'Haute performance pour bureaux & grands espaces',
      es: 'Alto rendimiento para oficinas y grandes espacios',
    },
    price: 1899,
    installFee: 249,
    image: 'https://images.pexels.com/photos/6903218/pexels-photo-6903218.jpeg?auto=compress&cs=tinysrgb&w=800',
    capacity: '36000 BTU',
    roomSize: '70-120 m²',
    energyClass: 'A+++',
    features: {
      en: ['Commercial-grade compressor', '4-zone capability', 'Remote diagnostics', '5-year commercial warranty'],
      de: ['Kompressionsgerät gewerblich', '4-Zonen-Fähigkeit', 'Ferndiagnose', '5 Jahre Gewerbegarantie'],
      nl: ['Commerciële compressor', '4-zone mogelijkheid', 'Externe diagnose', '5 jaar commerciële garantie'],
      fr: ['Compresseur qualité commerciale', 'Capacité 4 zones', 'Diagnostic à distance', 'Garantie commerciale 5 ans'],
      es: ['Compresor de calidad comercial', 'Capacidad de 4 zonas', 'Diagnóstico remoto', 'Garantía comercial 5 años'],
    },
  },
];

export const COUNTRIES = [
  { code: 'DE', name: { en: 'Germany', de: 'Deutschland', nl: 'Duitsland', fr: 'Allemagne', es: 'Alemania' } },
  { code: 'NL', name: { en: 'Netherlands', de: 'Niederlande', nl: 'Nederland', fr: 'Pays-Bas', es: 'Países Bajos' } },
  { code: 'FR', name: { en: 'France', de: 'Frankreich', nl: 'Frankrijk', fr: 'France', es: 'Francia' } },
  { code: 'BE', name: { en: 'Belgium', de: 'Belgien', nl: 'België', fr: 'Belgique', es: 'Bélgica' } },
  { code: 'ES', name: { en: 'Spain', de: 'Spanien', nl: 'Spanje', fr: 'Espagne', es: 'España' } },
];

export const REVIEWS = [
  {
    name: 'Hans Müller',
    country: '🇩🇪',
    rating: 5,
    text: {
      en: 'Outstanding service! Ordered on Monday, installed by Wednesday. The team was professional and the price was unbeatable.',
      de: 'Hervorragender Service! Montag bestellt, Mittwoch installiert. Das Team war professionell und der Preis unschlagbar.',
      nl: 'Uitstekende service! Maandag besteld, woensdag geïnstalleerd. Professioneel team en onverslaanbare prijs.',
      fr: 'Service exceptionnel ! Commandé lundi, installé mercredi. Équipe professionnelle et prix imbattable.',
      es: '¡Servicio excepcional! Pedí el lunes, instalado el miércoles. Equipo profesional y precio imbatible.',
    },
  },
  {
    name: 'Sofie van der Berg',
    country: '🇳🇱',
    rating: 5,
    text: {
      en: 'Best decision I made this summer. The installation fee was half what other companies quoted. Highly recommend!',
      de: 'Beste Entscheidung diesen Sommer. Die Installationsgebühr war halb so viel wie bei anderen. Sehr empfehlenswert!',
      nl: 'Beste beslissing deze zomer. De installatiekosten waren de helft van wat anderen rekenden. Zeer aanbevolen!',
      fr: 'Meilleure décision de l\'été. Les frais d\'installation étaient la moitié des autres. Je recommande vivement !',
      es: '¡Mejor decisión del verano! La tarifa de instalación fue la mitad que otros. ¡Muy recomendable!',
    },
  },
  {
    name: 'Pierre Dubois',
    country: '🇫🇷',
    rating: 5,
    text: {
      en: 'The multi-split system transformed our home. Quiet, efficient, and the team spoke perfect French. Très bien!',
      de: 'Das Multi-Split-System hat unser Zuhause verändert. Leise, effizient und das Team sprach perfektes Französisch. Très bien!',
      nl: 'Het multi-split systeem heeft ons huis getransformeerd. Stil, efficiënt en het team sprak perfect Frans. Très bien!',
      fr: 'Le système multi-split a transformé notre maison. Silencieux, efficace et l\'équipe parlait parfaitement français. Très bien !',
      es: 'El sistema multi-split transformó nuestra casa. Silencioso, eficiente y el equipo hablaba francés perfecto. ¡Très bien!',
    },
  },
  {
    name: 'María García',
    country: '🇪🇸',
    rating: 5,
    text: {
      en: 'Living in Madrid, good AC is essential. ClimatPro delivered and installed in 2 days. The WhatsApp support was super helpful.',
      de: 'In Madrid zu leben, gute Klimaanlage ist wichtig. ClimatPro lieferte und installierte in 2 Tagen. Der WhatsApp-Support war super.',
      nl: 'In Madrid wonen, goede airco is essentieel. ClimatPro leverde en installeerde in 2 dagen. WhatsApp-support was super.',
      fr: 'Vivre à Madrid, une bonne clim est essentielle. ClimatPro a livré et installé en 2 jours. Le support WhatsApp était super.',
      es: 'Vivir en Madrid, un buen aire acondicionado es esencial. ClimatPro entregó e instaló en 2 días. El soporte por WhatsApp fue genial.',
    },
  },
  {
    name: 'Thomas De Vries',
    country: '🇧🇪',
    rating: 5,
    text: {
      en: 'Ordered from Belgium, smooth delivery across the border. Installation was clean and fast. 5 stars all the way.',
      de: 'Aus Belgien bestellt, reibungslose Lieferung über die Grenze. Installation war sauber und schnell. 5 Sterne.',
      nl: 'Besteld vanuit België, vlotte levering over de grens. Installatie was netjes en snel. 5 sterren.',
      fr: 'Commandé depuis la Belgique, livraison fluide. Installation propre et rapide. 5 étoiles.',
      es: 'Pedí desde Bélgica, entrega sin problemas. Instalación limpia y rápida. 5 estrellas.',
    },
  },
  {
    name: 'Anna Schmidt',
    country: '🇩🇪',
    rating: 5,
    text: {
      en: 'The energy savings are real — my electricity bill dropped 40%. The smart WiFi control is a game changer.',
      de: 'Die Energieeinsparungen sind real — meine Stromrechnung sank um 40%. Die WLAN-Steuerung ist ein Game-Changer.',
      nl: 'De energiebesparing is echt — mijn elektriciteitsrekening daalde 40%. De WiFi-bediening is een game-changer.',
      fr: 'Les économies d\'énergie sont réelles — ma facture a baissé de 40%. Le contrôle WiFi change tout.',
      es: 'El ahorro energético es real — mi factura bajó 40%. El control WiFi lo cambia todo.',
    },
  },
];
