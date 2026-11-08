import type { CardSizePreset, CutMarksConfig, Margins, PaperSizePreset } from '../types/pnp';

export const PAPER_PRESETS: PaperSizePreset[] = [
  { id: 'a4', name: 'A4 (210 × 297 mm)', widthMm: 210, heightMm: 297, description: 'Standart Uluslararası Yazıcı Kağıdı' },
  { id: 'a3', name: 'A3 (297 × 420 mm)', widthMm: 297, heightMm: 420, description: 'Geniş Format Yazıcı Kağıdı' },
  { id: 'letter', name: 'US Letter (8.5 × 11 inç / 216 × 279 mm)', widthMm: 215.9, heightMm: 279.4, description: 'Kuzey Amerika Standart Kağıdı' },
  { id: 'tabloid', name: 'US Tabloid / Ledger (11 × 17 inç / 279 × 432 mm)', widthMm: 279.4, heightMm: 431.8, description: 'Kuzey Amerika Büyük Boy' },
  { id: 'legal', name: 'US Legal (8.5 × 14 inç / 216 × 356 mm)', widthMm: 215.9, heightMm: 355.6, description: 'Uzun Format' },
  { id: 'custom', name: 'Özel Kağıt Boyutu...', widthMm: 210, heightMm: 297, description: 'Genişlik ve Yüksekliği elle girin' },
];

export const CARD_PRESETS: CardSizePreset[] = [
  { id: 'poker', name: 'Poker / Standart (63.5 × 88.9 mm)', widthMm: 63.5, heightMm: 88.9, description: 'MTG, Pokemon, standart oyun kartları (2.5 x 3.5 inç)' },
  { id: 'bridge', name: 'Bridge (57.0 × 88.9 mm)', widthMm: 57.0, heightMm: 88.9, description: 'Klasik iskambil / ince kart boyutu' },
  { id: 'euro', name: 'Euro Standart (59.0 × 92.0 mm)', widthMm: 59.0, heightMm: 92.0, description: 'Catan, Dominion, 7 Wonders gibi kutu oyunları' },
  { id: 'mini-euro', name: 'Mini Euro (44.0 × 68.0 mm)', widthMm: 44.0, heightMm: 68.0, description: 'Kompakt oyunlar, Ticket to Ride, Codenames' },
  { id: 'mini-american', name: 'Mini American (41.0 × 63.0 mm)', widthMm: 41.0, heightMm: 63.0, description: 'Arkham Horror, Twilight Imperium, X-Wing' },
  { id: 'tarot', name: 'Tarot (70.0 × 120.0 mm)', widthMm: 70.0, heightMm: 120.0, description: 'Büyük format tarot ve referans kartları' },
  { id: 'square-70', name: 'Kare (70.0 × 70.0 mm)', widthMm: 70.0, heightMm: 70.0, description: 'Kare karo veya keşif kartları' },
  { id: 'square-50', name: 'Mini Kare (50.0 × 50.0 mm)', widthMm: 50.0, heightMm: 50.0, description: 'Jeton veya mini kare kartlar' },
  { id: 'custom', name: 'Özel Kart Boyutu...', widthMm: 63.5, heightMm: 88.9, description: 'Genişlik ve Yüksekliği elle girin' },
];

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
