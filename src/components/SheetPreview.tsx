import {
  ChevronLeft,
  ChevronRight,
  Info,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import React, { useState } from 'react';
import type {
  BleedConfig,
  CutMarksConfig,
  LayoutCalculation,
  PageLayout,
} from '../types/pnp';

interface SheetPreviewProps {
  layout: LayoutCalculation;
  pages: PageLayout[];
  singleBackImage: string | null;
  cutMarks: CutMarksConfig;
  bleedConfig: BleedConfig;
}

export const SheetPreview: React.FC<SheetPreviewProps> = ({
  layout,
  pages,
  singleBackImage,
  cutMarks,
  bleedConfig,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCardSlot, setHoveredCardSlot] = useState<number | null>(null);

  if (pages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950 text-slate-500 text-sm">
        Görüntülenecek sayfa bulunamadı. Lütfen kart ekleyin.
      </div>
    );
  }

  // Ensure current page index is valid
  const safePageIndex = Math.min(currentPageIndex, pages.length - 1);
  const currentPage = pages[safePageIndex];

  // Paper aspect ratio in mm
  const paperW = layout.paperWidthMm;
  const paperH = layout.paperHeightMm;

  // Function to toggle between front and back of the current sheet pair
  const handleToggleFlip = () => {
    if (currentPage.isBackPage) {
      setCurrentPageIndex(safePageIndex - 1);
    } else if (safePageIndex + 1 < pages.length) {
      setCurrentPageIndex(safePageIndex + 1);
    }
  };

  const currentSheetNum = Math.floor(safePageIndex / 2) + 1;
  const totalSheets = Math.ceil(pages.length / 2);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Top Preview Toolbar */}
      <div className="h-12 border-b border-slate-800/80 bg-slate-900/60 px-4 flex items-center justify-between z-10 shrink-0">
        {/* Page Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPageIndex((p) => Math.max(0, p - 1))}
            disabled={safePageIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Önceki Sayfa"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <span className="font-semibold text-white">
              Sayfa {safePageIndex + 1} / {pages.length}
            </span>
            <span className="text-slate-500">|</span>
            <span
              className={`font-medium px-1.5 py-0.5 rounded text-[10px] ${
                currentPage.isBackPage
                  ? 'bg-purple-950 text-purple-300 border border-purple-800/50'
                  : 'bg-indigo-950 text-indigo-300 border border-indigo-800/50'
              }`}
            >
              {currentPage.isBackPage ? 'ARKA YÜZ (AYNALI)' : 'ÖN YÜZ'}
            </span>
            <span className="text-slate-500 text-[10px] hidden sm:inline">
              (Yaprak {currentSheetNum}/{totalSheets})
            </span>
          </div>

          <button
            onClick={() => setCurrentPageIndex((p) => Math.min(pages.length - 1, p + 1))}
            disabled={safePageIndex === pages.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Sonraki Sayfa"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleFlip}
            className="ml-2 flex items-center gap-1.5 px-2.5 py-1 bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/50 rounded-lg text-xs font-medium transition"
            title="Sayfanın arkasını çevir ve hizalamayı kontrol et"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sayfayı Çevir</span>
          </button>
        </div>

        {/* Layout stats info */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            {layout.cols} Sütun × {layout.rows} Satır = <strong>{layout.cardsPerPage} Kart / Sayfa</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span>{paperW} × {paperH} mm</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Uzaklaş"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-slate-400 font-mono w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Yakınlaş"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono px-2"
            title="Varsayılan Boyut"
          >
            100%
          </button>
        </div>
      </div>

      {/* Interactive Sheet Viewport */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-950/80">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out',
          }}
          className="relative shadow-2xl rounded-xs bg-white text-slate-900 border border-slate-700/60"
        >
          {/* SVG Canvas for ultra-accurate mm rendering */}
          <svg
            viewBox={`0 0 ${paperW} ${paperH}`}
            style={{
              width: `${paperW * 2.8}px`,
              height: `${paperH * 2.8}px`,
              display: 'block',
            }}
            className="select-none"
          >
            {/* Paper Background */}
            <rect x="0" y="0" width={paperW} height={paperH} fill="#ffffff" />

            {/* Registration Marks in 4 corners */}
            {cutMarks.showRegistrationMarks && (
              <g stroke="#334155" strokeWidth="0.3" fill="none">
                {[
                  { x: 6, y: 6 },
                  { x: paperW - 6, y: 6 },
                  { x: 6, y: paperH - 6 },
                  { x: paperW - 6, y: paperH - 6 },
                ].map((pos, i) => (
                  <g key={i}>
                    <line x1={pos.x - 3} y1={pos.y} x2={pos.x + 3} y2={pos.y} />
                    <line x1={pos.x} y1={pos.y - 3} x2={pos.x} y2={pos.y + 3} />
                    <circle cx={pos.x} cy={pos.y} r="2" />
                  </g>
                ))}
              </g>
            )}

            {/* Page Header Stamp for easy physical print organization */}
            <text
              x={paperW / 2}
              y={5}
              textAnchor="middle"
              fontSize="2.5"
              fill="#94a3b8"
              fontFamily="monospace"
            >
              PNPMaster — Yaprak {currentSheetNum} / {totalSheets} [
              {currentPage.isBackPage ? 'ARKA YÜZ - DUPLEX MIRRORED' : 'ÖN YÜZ'}] — {paperW}x{paperH}mm
            </text>

            {/* Placed Cards */}
            {currentPage.cards.map((placed, cardIdx) => {
              const cardImgSrc = currentPage.isBackPage
                ? placed.card.backImage || singleBackImage
                : placed.card.frontImage;

              const isHovered = hoveredCardSlot === placed.instanceIndex;
              const bleed = bleedConfig.bleedMm || 0;

              return (
                <g
                  key={cardIdx}
                  onMouseEnter={() => setHoveredCardSlot(placed.instanceIndex)}
                  onMouseLeave={() => setHoveredCardSlot(null)}
                  className="cursor-pointer"
                >
                  {/* Card Bleed rect */}
                  {bleed > 0 && (
                    <rect
                      x={placed.xMm - bleed}
                      y={placed.yMm - bleed}
                      width={placed.widthMm + bleed * 2}
                      height={placed.heightMm + bleed * 2}
                      fill="#f1f5f9"
                    />
                  )}

                  {/* Card Image */}
                  {cardImgSrc ? (
                    <image
                      href={cardImgSrc}
                      x={placed.xMm - bleed}
                      y={placed.yMm - bleed}
                      width={placed.widthMm + bleed * 2}
                      height={placed.heightMm + bleed * 2}
                      preserveAspectRatio={bleed > 0 ? 'none' : 'xMidYMid slice'}
                    />
                  ) : (
                    <rect
                      x={placed.xMm}
                      y={placed.yMm}
                      width={placed.widthMm}
                      height={placed.heightMm}
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                      strokeWidth="0.4"
                    />
                  )}

                  {/* Card outline for visual distinction */}
                  <rect
                    x={placed.xMm}
                    y={placed.yMm}
                    width={placed.widthMm}
                    height={placed.heightMm}
                    fill={isHovered ? 'rgba(99, 102, 241, 0.25)' : 'none'}
                    stroke={isHovered ? '#4f46e5' : '#000000'}
                    strokeWidth={isHovered ? '0.6' : '0.15'}
                    strokeDasharray={cutMarks.showGridLines ? '1 1' : 'none'}
                  />

                  {/* Corner Crop Marks (Cut Marks) */}
                  {cutMarks.showCropMarks && (
                    <g stroke="#0f172a" strokeWidth="0.25">
                      {/* Top-Left */}
                      <line
                        x1={placed.xMm - cutMarks.cropMarkOffsetMm}
                        y1={placed.yMm}
                        x2={placed.xMm - cutMarks.cropMarkOffsetMm - cutMarks.cropMarkLengthMm}
                        y2={placed.yMm}
                      />
                      <line
                        x1={placed.xMm}
                        y1={placed.yMm - cutMarks.cropMarkOffsetMm}
                        x2={placed.xMm}
                        y2={placed.yMm - cutMarks.cropMarkOffsetMm - cutMarks.cropMarkLengthMm}
                      />

                      {/* Top-Right */}
                      <line
                        x1={placed.xMm + placed.widthMm + cutMarks.cropMarkOffsetMm}
                        y1={placed.yMm}
                        x2={placed.xMm + placed.widthMm + cutMarks.cropMarkOffsetMm + cutMarks.cropMarkLengthMm}
                        y2={placed.yMm}
                      />
                      <line
                        x1={placed.xMm + placed.widthMm}
                        y1={placed.yMm - cutMarks.cropMarkOffsetMm}
                        x2={placed.xMm + placed.widthMm}
                        y2={placed.yMm - cutMarks.cropMarkOffsetMm - cutMarks.cropMarkLengthMm}
                      />

                      {/* Bottom-Left */}
                      <line
                        x1={placed.xMm - cutMarks.cropMarkOffsetMm}
                        y1={placed.yMm + placed.heightMm}
                        x2={placed.xMm - cutMarks.cropMarkOffsetMm - cutMarks.cropMarkLengthMm}
                        y2={placed.yMm + placed.heightMm}
                      />
                      <line
                        x1={placed.xMm}
                        y1={placed.yMm + placed.heightMm + cutMarks.cropMarkOffsetMm}
                        x2={placed.xMm}
                        y2={placed.yMm + placed.heightMm + cutMarks.cropMarkOffsetMm + cutMarks.cropMarkLengthMm}
                      />

                      {/* Bottom-Right */}
                      <line
                        x1={placed.xMm + placed.widthMm + cutMarks.cropMarkOffsetMm}
                        y1={placed.yMm + placed.heightMm}
                        x2={placed.xMm + placed.widthMm + cutMarks.cropMarkOffsetMm + cutMarks.cropMarkLengthMm}
                        y2={placed.yMm + placed.heightMm}
                      />
                      <line
                        x1={placed.xMm + placed.widthMm}
                        y1={placed.yMm + placed.heightMm + cutMarks.cropMarkOffsetMm}
                        x2={placed.xMm + placed.widthMm}
                        y2={placed.yMm + placed.heightMm + cutMarks.cropMarkOffsetMm + cutMarks.cropMarkLengthMm}
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
