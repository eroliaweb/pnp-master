import { PDFDocument, rgb } from 'pdf-lib';
import type { BleedConfig, CutMarksConfig, LayoutCalculation, PageLayout } from '../types/pnp';

// 1 mm in PDF points (72 points / 25.4 mm)
const MM_TO_POINTS = 72 / 25.4;

export function mmToPt(mm: number): number {
  return mm * MM_TO_POINTS;
}

export type ExportScope = 'all' | 'fronts-only' | 'backs-only';

// Helper to convert any image source (URL, Base64, Blob) to a PNG or JPG buffer compatible with pdf-lib
async function getImageBytesAndType(src: string): Promise<{ data: Uint8Array; type: 'png' | 'jpg' } | null> {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    const mime = blob.type.toLowerCase();

    if (mime.includes('png')) {
      const buffer = await blob.arrayBuffer();
      return { data: new Uint8Array(buffer), type: 'png' };
    } else if (mime.includes('jpeg') || mime.includes('jpg')) {
      const buffer = await blob.arrayBuffer();
      return { data: new Uint8Array(buffer), type: 'jpg' };
    } else {
      // If WebP, SVG, or unknown, convert to PNG via offscreen canvas
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (pngBlob) => {
            if (!pngBlob) {
              resolve(null);
              return;
            }
            const buffer = await pngBlob.arrayBuffer();
            resolve({ data: new Uint8Array(buffer), type: 'png' });
          }, 'image/png');
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
    }
  } catch (err) {
    console.error('Failed to load image for PDF:', err);
    return null;
  }
}

export async function generatePnpPdf(
  pages: PageLayout[],
  layout: LayoutCalculation,
  singleBackImage: string | null,
  cutMarks: CutMarksConfig,
  bleedConfig: BleedConfig,
  scope: ExportScope = 'all',
  onProgress?: (current: number, total: number, message: string) => void
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  // Filter pages based on export scope
  const targetPages = pages.filter((p) => {
    if (scope === 'fronts-only') return !p.isBackPage;
    if (scope === 'backs-only') return p.isBackPage;
    return true; // 'all'
  });

  const pageWPt = mmToPt(layout.paperWidthMm);
  const pageHPt = mmToPt(layout.paperHeightMm);

  // Image cache to avoid re-embedding identical images (e.g. single back or duplicated cards)
  const imageCache = new Map<string, any>();

  async function getEmbeddedImage(src: string) {
    if (imageCache.has(src)) {
      return imageCache.get(src);
    }
    const result = await getImageBytesAndType(src);
    if (!result) return null;

    let embedded;
    if (result.type === 'png') {
      embedded = await pdfDoc.embedPng(result.data);
    } else {
      embedded = await pdfDoc.embedJpg(result.data);
    }
    imageCache.set(src, embedded);
    return embedded;
  }

  const totalSteps = targetPages.length;
  let currentStep = 0;

  for (const pageData of targetPages) {
    currentStep++;
    const pageLabel = `${pageData.isBackPage ? 'Arka' : 'Ön'} Yüz - Sayfa ${Math.floor(pageData.pageIndex / 2) + 1}`;
    onProgress?.(currentStep, totalSteps, `${pageLabel} hazırlanıyor...`);

    const pdfPage = pdfDoc.addPage([pageWPt, pageHPt]);

    // Draw cards on this page
    for (const placed of pageData.cards) {
      const cardImgSrc = pageData.isBackPage
        ? placed.card.backImage || singleBackImage
        : placed.card.frontImage;

      const cardXPt = mmToPt(placed.xMm);
      // In PDF, Y origin is bottom-left
      const cardYPt = pageHPt - mmToPt(placed.yMm) - mmToPt(placed.heightMm);
      const cardWPt = mmToPt(placed.widthMm);
      const cardHPt = mmToPt(placed.heightMm);

      if (cardImgSrc) {
        try {
          const embedded = await getEmbeddedImage(cardImgSrc);
          if (embedded) {
            // Draw image with bleed if enabled
            const bleedPt = mmToPt(bleedConfig.bleedMm || 0);
            pdfPage.drawImage(embedded, {
              x: cardXPt - bleedPt,
              y: cardYPt - bleedPt,
              width: cardWPt + bleedPt * 2,
              height: cardHPt + bleedPt * 2,
            });
          }
        } catch (e) {
          console.warn('Error embedding card image:', e);
        }
      }

      // If grid lines are enabled, draw dashed or solid grid boundary
      if (cutMarks.showGridLines) {
        const strokeColor = rgb(0.4, 0.45, 0.5);
        pdfPage.drawRectangle({
          x: cardXPt,
          y: cardYPt,
          width: cardWPt,
          height: cardHPt,
          borderWidth: 0.5,
          borderColor: strokeColor,
          opacity: 0.6,
        });
      }

      // Draw Crop Marks (Corner cut guides)
      if (cutMarks.showCropMarks) {
        const markLenPt = mmToPt(cutMarks.cropMarkLengthMm);
        const offsetPt = mmToPt(cutMarks.cropMarkOffsetMm);
        const markColor = rgb(0.1, 0.1, 0.1);
        const thickness = 0.5;

        // Top-Left corner:
        // Horizontal tick going left
        pdfPage.drawLine({
          start: { x: cardXPt - offsetPt, y: cardYPt + cardHPt },
          end: { x: cardXPt - offsetPt - markLenPt, y: cardYPt + cardHPt },
          thickness,
          color: markColor,
        });
        // Vertical tick going up
        pdfPage.drawLine({
          start: { x: cardXPt, y: cardYPt + cardHPt + offsetPt },
          end: { x: cardXPt, y: cardYPt + cardHPt + offsetPt + markLenPt },
          thickness,
          color: markColor,
        });

        // Top-Right corner:
        // Horizontal tick going right
        pdfPage.drawLine({
          start: { x: cardXPt + cardWPt + offsetPt, y: cardYPt + cardHPt },
          end: { x: cardXPt + cardWPt + offsetPt + markLenPt, y: cardYPt + cardHPt },
          thickness,
          color: markColor,
        });
        // Vertical tick going up
        pdfPage.drawLine({
          start: { x: cardXPt + cardWPt, y: cardYPt + cardHPt + offsetPt },
          end: { x: cardXPt + cardWPt, y: cardYPt + cardHPt + offsetPt + markLenPt },
          thickness,
          color: markColor,
        });

        // Bottom-Left corner:
        // Horizontal tick going left
        pdfPage.drawLine({
          start: { x: cardXPt - offsetPt, y: cardYPt },
          end: { x: cardXPt - offsetPt - markLenPt, y: cardYPt },
          thickness,
          color: markColor,
        });
        // Vertical tick going down
        pdfPage.drawLine({
          start: { x: cardXPt, y: cardYPt - offsetPt },
          end: { x: cardXPt, y: cardYPt - offsetPt - markLenPt },
          thickness,
          color: markColor,
        });

        // Bottom-Right corner:
        // Horizontal tick going right
        pdfPage.drawLine({
          start: { x: cardXPt + cardWPt + offsetPt, y: cardYPt },
          end: { x: cardXPt + cardWPt + offsetPt + markLenPt, y: cardYPt },
          thickness,
          color: markColor,
        });
        // Vertical tick going down
        pdfPage.drawLine({
          start: { x: cardXPt + cardWPt, y: cardYPt - offsetPt },
          end: { x: cardXPt + cardWPt, y: cardYPt - offsetPt - markLenPt },
          thickness,
          color: markColor,
        });
      }
    }

    // Optional: Draw registration crosshairs in page corners
    if (cutMarks.showRegistrationMarks) {
      const regColor = rgb(0.2, 0.2, 0.2);
      const regSize = mmToPt(4);
      const regMargin = mmToPt(6);

      const crossPositions = [
        { x: regMargin, y: pageHPt - regMargin },
        { x: pageWPt - regMargin, y: pageHPt - regMargin },
        { x: regMargin, y: regMargin },
        { x: pageWPt - regMargin, y: regMargin },
      ];

      for (const pos of crossPositions) {
        pdfPage.drawLine({
          start: { x: pos.x - regSize, y: pos.y },
          end: { x: pos.x + regSize, y: pos.y },
          thickness: 0.5,
          color: regColor,
        });
        pdfPage.drawLine({
          start: { x: pos.x, y: pos.y - regSize },
          end: { x: pos.x, y: pos.y + regSize },
          thickness: 0.5,
          color: regColor,
        });
        pdfPage.drawCircle({
          x: pos.x,
          y: pos.y,
          size: regSize * 0.6,
          borderWidth: 0.5,
          borderColor: regColor,
        });
      }
    }
  }

  onProgress?.(totalSteps, totalSteps, 'PDF dosyası oluşturuluyor...');
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
