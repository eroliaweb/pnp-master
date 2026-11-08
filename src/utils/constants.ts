import type { Language } from '../i18n/translations';
import type { CardSizePreset, CutMarksConfig, Margins, PaperSizePreset } from '../types/pnp';

export const getPaperPresets = (lang: Language = 'tr'): PaperSizePreset[] => [
  {
    id: 'a4',
    name: 'A4 (210 × 297 mm)',
    widthMm: 210,
    heightMm: 297,
    description: lang === 'tr' ? 'Standart Uluslararası Yazıcı Kağıdı' : 'Standard International Print Paper',
  },
  {
    id: 'a3',
    name: 'A3 (297 × 420 mm)',
    widthMm: 297,
    heightMm: 420,
    description: lang === 'tr' ? 'Geniş Format Yazıcı Kağıdı' : 'Large Format Print Paper',
  },
  {
    id: 'letter',
    name: lang === 'tr' ? 'US Letter (8.5 × 11 inç / 216 × 279 mm)' : 'US Letter (8.5 × 11 in / 216 × 279 mm)',
    widthMm: 215.9,
    heightMm: 279.4,
    description: lang === 'tr' ? 'Kuzey Amerika Standart Kağıdı' : 'North American Standard Paper',
  },
  {
    id: 'tabloid',
    name: lang === 'tr' ? 'US Tabloid / Ledger (11 × 17 inç / 279 × 432 mm)' : 'US Tabloid / Ledger (11 × 17 in / 279 × 432 mm)',
    widthMm: 279.4,
    heightMm: 431.8,
    description: lang === 'tr' ? 'Kuzey Amerika Büyük Boy' : 'North American Large Format',
  },
  {
    id: 'legal',
    name: lang === 'tr' ? 'US Legal (8.5 × 14 inç / 216 × 356 mm)' : 'US Legal (8.5 × 14 in / 216 × 356 mm)',
    widthMm: 215.9,
    heightMm: 355.6,
    description: lang === 'tr' ? 'Uzun Format' : 'Long Format Paper',
  },
  {
    id: 'custom',
    name: lang === 'tr' ? 'Özel Kağıt Boyutu...' : 'Custom Paper Size...',
    widthMm: 210,
    heightMm: 297,
    description: lang === 'tr' ? 'Genişlik ve Yüksekliği elle girin' : 'Enter Width & Height manually',
  },
];

export const getCardPresets = (lang: Language = 'tr'): CardSizePreset[] => [
  {
    id: 'poker',
    name: lang === 'tr' ? 'Poker / Standart (63.5 × 88.9 mm)' : 'Poker / Standard (63.5 × 88.9 mm)',
    widthMm: 63.5,
    heightMm: 88.9,
    description: lang === 'tr' ? 'MTG, Pokemon, standart oyun kartları (2.5 x 3.5 inç)' : 'MTG, Pokémon, standard playing cards (2.5 x 3.5 in)',
  },
  {
    id: 'bridge',
    name: 'Bridge (57.0 × 88.9 mm)',
    widthMm: 57.0,
    heightMm: 88.9,
    description: lang === 'tr' ? 'Klasik iskambil / ince kart boyutu' : 'Classic bridge / slim card size',
  },
  {
    id: 'euro',
    name: lang === 'tr' ? 'Euro Standart (59.0 × 92.0 mm)' : 'Euro Standard (59.0 × 92.0 mm)',
    widthMm: 59.0,
    heightMm: 92.0,
    description: lang === 'tr' ? 'Catan, Dominion, 7 Wonders gibi kutu oyunları' : 'Boardgames like Catan, Dominion, 7 Wonders',
  },
  {
    id: 'mini-euro',
    name: 'Mini Euro (44.0 × 68.0 mm)',
    widthMm: 44.0,
    heightMm: 68.0,
    description: lang === 'tr' ? 'Kompakt oyunlar, Ticket to Ride, Codenames' : 'Compact games, Ticket to Ride, Codenames',
  },
  {
    id: 'mini-american',
    name: 'Mini American (41.0 × 63.0 mm)',
    widthMm: 41.0,
    heightMm: 63.0,
    description: lang === 'tr' ? 'Arkham Horror, Twilight Imperium, X-Wing' : 'Arkham Horror, Twilight Imperium, X-Wing',
  },
  {
    id: 'tarot',
    name: 'Tarot (70.0 × 120.0 mm)',
    widthMm: 70.0,
    heightMm: 120.0,
    description: lang === 'tr' ? 'Büyük format tarot ve referans kartları' : 'Large format tarot & reference cards',
  },
  {
    id: 'square-70',
    name: lang === 'tr' ? 'Kare (70.0 × 70.0 mm)' : 'Square (70.0 × 70.0 mm)',
    widthMm: 70.0,
    heightMm: 70.0,
    description: lang === 'tr' ? 'Kare karo veya keşif kartları' : 'Square tiles or exploration cards',
  },
  {
    id: 'square-50',
    name: lang === 'tr' ? 'Mini Kare (50.0 × 50.0 mm)' : 'Mini Square (50.0 × 50.0 mm)',
    widthMm: 50.0,
    heightMm: 50.0,
    description: lang === 'tr' ? 'Jeton veya mini kare kartlar' : 'Tokens or mini square tiles',
  },
  {
    id: 'custom',
    name: lang === 'tr' ? 'Özel Kart Boyutu...' : 'Custom Card Size...',
    widthMm: 63.5,
    heightMm: 88.9,
    description: lang === 'tr' ? 'Genişlik ve Yüksekliği elle girin' : 'Enter Width & Height manually',
  },
];

export const PAPER_PRESETS = getPaperPresets('tr');
export const CARD_PRESETS = getCardPresets('tr');

export const DEFAULT_MARGINS: Margins = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

export const DEFAULT_CUT_MARKS: CutMarksConfig = {
  showCropMarks: true,
  cropMarkLengthMm: 5,
  cropMarkOffsetMm: 0,
  showGridLines: false,
  gridLineStyle: 'dashed',
  gridLineColor: '#64748b',
  showRegistrationMarks: true,
};
