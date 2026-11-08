export type Orientation = 'portrait' | 'landscape';

export interface PaperSizePreset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  description?: string;
}

export interface CardSizePreset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  description?: string;
}

export interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface CardItem {
  id: string;
  name: string;
  frontImage: string; // base64 or blob URL
  backImage?: string | null;
  copies: number;
}

export type BackMode = 'single' | 'individual';

export interface CutMarksConfig {
  showCropMarks: boolean;
  cropMarkLengthMm: number;
  cropMarkOffsetMm: number;
  showGridLines: boolean;
  gridLineStyle: 'solid' | 'dashed';
  gridLineColor: string;
  showRegistrationMarks: boolean;
}

export interface BleedConfig {
  bleedMm: number;
  fitMode: 'cover' | 'contain' | 'stretch';
}

export interface PlacedCard {
  card: CardItem;
  instanceIndex: number;
  row: number;
  col: number;
  xMm: number;
  yMm: number;
  widthMm: number;
  heightMm: number;
}

export interface PageLayout {
  pageIndex: number; // 0-based
  isBackPage: boolean;
  cards: PlacedCard[];
}

export interface LayoutCalculation {
  rows: number;
  cols: number;
  cardsPerPage: number;
  usableWidthMm: number;
  usableHeightMm: number;
  cardWidthMm: number;
  cardHeightMm: number;
  spacingXMm: number;
  spacingYMm: number;
  gridStartX: number;
  gridStartY: number;
  paperWidthMm: number;
  paperHeightMm: number;
  totalPages: number;
  frontPagesCount: number;
}
