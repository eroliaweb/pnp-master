import type {
  CardItem,
  LayoutCalculation,
  Margins,
  Orientation,
  PageLayout,
  PlacedCard,
} from '../types/pnp';

export type FlipEdge = 'long-edge' | 'short-edge';

export function calculateLayout(
  paperWidth: number,
  paperHeight: number,
  orientation: Orientation,
  margins: Margins,
  cardWidth: number,
  cardHeight: number,
  spacingXMm: number,
  spacingYMm: number,
  totalFlattenedCards: number
): LayoutCalculation {
  const paperWidthMm = orientation === 'portrait' ? Math.min(paperWidth, paperHeight) : Math.max(paperWidth, paperHeight);
  const paperHeightMm = orientation === 'portrait' ? Math.max(paperWidth, paperHeight) : Math.min(paperWidth, paperHeight);

  const usableWidthMm = Math.max(0, paperWidthMm - margins.left - margins.right);
  const usableHeightMm = Math.max(0, paperHeightMm - margins.top - margins.bottom);

  const cols = Math.max(1, Math.floor((usableWidthMm + spacingXMm) / (cardWidth + spacingXMm)));
  const rows = Math.max(1, Math.floor((usableHeightMm + spacingYMm) / (cardHeight + spacingYMm)));
  const cardsPerPage = Math.max(1, cols * rows);

  const totalGridWidth = cols * cardWidth + (cols - 1) * spacingXMm;
  const totalGridHeight = rows * cardHeight + (rows - 1) * spacingYMm;

  // Symmetrical centering guarantees duplex alignment
  const gridStartX = Math.max(margins.left, (paperWidthMm - totalGridWidth) / 2);
  const gridStartY = Math.max(margins.top, (paperHeightMm - totalGridHeight) / 2);

  const frontPagesCount = Math.max(1, Math.ceil(totalFlattenedCards / cardsPerPage));
  const totalPages = frontPagesCount * 2; // Front + Back pairs

  return {
    rows,
    cols,
    cardsPerPage,
    usableWidthMm,
    usableHeightMm,
    cardWidthMm: cardWidth,
    cardHeightMm: cardHeight,
    spacingXMm,
    spacingYMm,
    gridStartX,
    gridStartY,
    paperWidthMm,
    paperHeightMm,
    totalPages,
    frontPagesCount,
  };
}

export function flattenDeck(cards: CardItem[]): CardItem[] {
  const flat: CardItem[] = [];
  for (const card of cards) {
    const count = Math.max(1, card.copies || 1);
    for (let i = 0; i < count; i++) {
      flat.push(card);
    }
  }
  return flat;
}

export function generatePages(
  cards: CardItem[],
  layout: LayoutCalculation,
  flipEdge: FlipEdge = 'long-edge'
): PageLayout[] {
  const flatCards = flattenDeck(cards);
  const pages: PageLayout[] = [];

  for (let frontPageIndex = 0; frontPageIndex < layout.frontPagesCount; frontPageIndex++) {
    const startIndex = frontPageIndex * layout.cardsPerPage;
    const pageFrontCards: PlacedCard[] = [];
    const pageBackCards: PlacedCard[] = [];

    for (let r = 0; r < layout.rows; r++) {
      for (let c = 0; c < layout.cols; c++) {
        const slotIndex = r * layout.cols + c;
        const cardIndex = startIndex + slotIndex;

        if (cardIndex < flatCards.length) {
          const card = flatCards[cardIndex];

          // Front Card position
          const frontX = layout.gridStartX + c * (layout.cardWidthMm + layout.spacingXMm);
          const frontY = layout.gridStartY + r * (layout.cardHeightMm + layout.spacingYMm);

          pageFrontCards.push({
            card,
            instanceIndex: cardIndex,
            row: r,
            col: c,
            xMm: frontX,
            yMm: frontY,
            widthMm: layout.cardWidthMm,
            heightMm: layout.cardHeightMm,
          });

          // Back Card position - Crucial Duplex Mirroring!
          // Long edge flip: columns are horizontally mirrored (col -> cols - 1 - col)
          // Short edge flip: rows are vertically mirrored (row -> rows - 1 - row)
          const backCol = flipEdge === 'long-edge' ? layout.cols - 1 - c : c;
          const backRow = flipEdge === 'short-edge' ? layout.rows - 1 - r : r;

          const backX = layout.gridStartX + backCol * (layout.cardWidthMm + layout.spacingXMm);
          const backY = layout.gridStartY + backRow * (layout.cardHeightMm + layout.spacingYMm);

          pageBackCards.push({
            card,
            instanceIndex: cardIndex,
            row: backRow,
            col: backCol,
            xMm: backX,
            yMm: backY,
            widthMm: layout.cardWidthMm,
            heightMm: layout.cardHeightMm,
          });
        }
      }
    }

    // Front page (even indexed in interleaved deck)
    pages.push({
      pageIndex: frontPageIndex * 2,
      isBackPage: false,
      cards: pageFrontCards,
    });

    // Back page (odd indexed in interleaved deck)
    pages.push({
      pageIndex: frontPageIndex * 2 + 1,
      isBackPage: true,
      cards: pageBackCards,
    });
  }

  return pages;
}
