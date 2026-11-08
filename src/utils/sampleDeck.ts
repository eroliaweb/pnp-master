import type { CardItem } from '../types/pnp';

// Helper to generate SVG card images encoded as Data URLs
function createSvgCardDataUrl(
  title: string,
  type: string,
  cost: number,
  accentColor: string,
  iconSymbol: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" width="300" height="420">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}"/>
        <stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
    </defs>
    <!-- Card Border & Background -->
    <rect x="0" y="0" width="300" height="420" fill="url(#cardGrad)" rx="16" stroke="${accentColor}" stroke-width="4"/>
    <rect x="8" y="8" width="284" height="404" fill="none" stroke="#334155" stroke-width="1.5" rx="12"/>

    <!-- Header Banner -->
    <rect x="16" y="16" width="268" height="42" fill="url(#headerGrad)" rx="8"/>
    <text x="28" y="43" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="18">${title}</text>
    
    <!-- Cost Badge -->
    <circle cx="260" cy="37" r="15" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
    <text x="260" y="43" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">${cost}</text>

    <!-- Art Frame -->
    <rect x="20" y="70" width="260" height="180" fill="#020617" stroke="#475569" stroke-width="2" rx="8"/>
    <circle cx="150" cy="160" r="48" fill="${accentColor}" opacity="0.15"/>
    <text x="150" y="172" fill="${accentColor}" font-family="sans-serif" font-size="44" text-anchor="middle">${iconSymbol}</text>

    <!-- Card Type Line -->
    <rect x="24" y="260" width="252" height="26" fill="#1e293b" rx="4" stroke="#334155" stroke-width="1"/>
    <text x="34" y="278" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">${type.toUpperCase()}</text>

    <!-- Card Text Box -->
    <rect x="20" y="295" width="260" height="100" fill="#0f172a" stroke="#334155" stroke-width="1.5" rx="8"/>
    <text x="32" y="325" fill="#e2e8f0" font-family="sans-serif" font-size="13">PNPMaster ile baskıya hazır kart.</text>
    <text x="32" y="348" fill="#94a3b8" font-family="sans-serif" font-size="12">Çift taraflı ayna baskı desteği,</text>
    <text x="32" y="368" fill="#94a3b8" font-family="sans-serif" font-size="12">hassas kesim kılavuzları içerir.</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function createSampleBackSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" width="300" height="420">
    <defs>
      <linearGradient id="backGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#312e81"/>
        <stop offset="50%" stop-color="#1e1b4b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <pattern id="pat" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 0 12 L 12 0 L 24 12 L 12 24 Z" fill="none" stroke="#4338ca" stroke-width="1.2" opacity="0.4"/>
      </pattern>
    </defs>
    <!-- Background -->
    <rect x="0" y="0" width="300" height="420" fill="url(#backGrad)" rx="16" stroke="#6366f1" stroke-width="4"/>
    <rect x="12" y="12" width="276" height="396" fill="url(#pat)" rx="10"/>
    <rect x="16" y="16" width="268" height="388" fill="none" stroke="#818cf8" stroke-width="2" rx="8"/>
    
    <!-- Center Emblem -->
    <circle cx="150" cy="210" r="56" fill="#1e1b4b" stroke="#a5b4fc" stroke-width="3"/>
    <circle cx="150" cy="210" r="46" fill="#312e81" stroke="#818cf8" stroke-width="1.5"/>
    <text x="150" y="202" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">PNP</text>
    <text x="150" y="224" fill="#c7d2fe" font-family="sans-serif" font-size="13" text-anchor="middle">MASTER</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_CARDS: CardItem[] = [
  {
    id: 'sample-1',
    name: 'Ateş Büyücüsü',
    frontImage: createSvgCardDataUrl('Ateş Büyücüsü', 'Büyücü / Saldırı', 4, '#ef4444', '🔥'),
    copies: 2,
  },
  {
    id: 'sample-2',
    name: 'Gölge Avcısı',
    frontImage: createSvgCardDataUrl('Gölge Avcısı', 'Rogue / Çeviklik', 3, '#8b5cf6', '🗡️'),
    copies: 2,
  },
  {
    id: 'sample-3',
    name: 'Orman Koruyucusu',
    frontImage: createSvgCardDataUrl('Orman Koruyucusu', 'Druid / Doğa', 5, '#10b981', '🌿'),
    copies: 2,
  },
  {
    id: 'sample-4',
    name: 'Demir Şövalye',
    frontImage: createSvgCardDataUrl('Demir Şövalye', 'Savaşçı / Savunma', 4, '#f59e0b', '🛡️'),
    copies: 1,
  },
  {
    id: 'sample-5',
    name: 'Yıldırım Ejderhası',
    frontImage: createSvgCardDataUrl('Yıldırım Ejderhası', 'Canavar / Kadim', 7, '#06b6d4', '⚡'),
    copies: 1,
  },
  {
    id: 'sample-6',
    name: 'Zaman Hırsızı',
    frontImage: createSvgCardDataUrl('Zaman Hırsızı', 'Büyücü / Zaman', 6, '#ec4899', '⏳'),
    copies: 1,
  },
];
