interface BrandLogoProps {
  className?: string;
}

export function DaikinLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 25 C0 11 11 0 25 0 L175 0 C189 0 200 11 200 25 C200 39 189 50 175 50 L25 50 C11 50 0 39 0 25 Z" fill="none"/>
      <text x="100" y="32" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor">DAIKIN</text>
    </svg>
  );
}

export function MitsubishiLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(15, 5)">
        <path d="M20 0 L30 17 L10 17 Z" fill="#E60012"/>
        <path d="M30 17 L40 34 L20 34 Z" fill="#E60012"/>
        <path d="M10 17 L20 34 L0 34 Z" fill="#E60012"/>
      </g>
      <text x="110" y="33" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="13" fill="currentColor">MITSUBISHI</text>
      <text x="110" y="45" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="9" fill="currentColor">ELECTRIC</text>
    </svg>
  );
}

export function SamsungLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="35" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24" letterSpacing="2" fill="currentColor">SAMSUNG</text>
    </svg>
  );
}

export function LGLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 10)">
        <circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <text x="15" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="currentColor">LG</text>
      </g>
      <text x="110" y="33" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" letterSpacing="1" fill="currentColor">Life's Good</text>
    </svg>
  );
}

export function PanasonicLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="33" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" letterSpacing="1" fill="currentColor">Panasonic</text>
    </svg>
  );
}

export function BoschLogo({ className = '' }: BrandLogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 8)">
        <circle cx="17" cy="17" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 5 L17 29 M5 17 L29 17" stroke="currentColor" strokeWidth="1.5"/>
      </g>
      <text x="115" y="33" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="currentColor">BOSCH</text>
    </svg>
  );
}

export const BRAND_LOGOS = [
  { name: 'Daikin', Component: DaikinLogo },
  { name: 'Mitsubishi', Component: MitsubishiLogo },
  { name: 'Samsung', Component: SamsungLogo },
  { name: 'LG', Component: LGLogo },
  { name: 'Panasonic', Component: PanasonicLogo },
  { name: 'Bosch', Component: BoschLogo },
];
