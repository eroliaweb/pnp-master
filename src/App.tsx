import { saveAs } from 'file-saver';
import { CreditCard, Eye, LayoutGrid } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { CardListManager } from './components/CardListManager';
import { ExportModal } from './components/ExportModal';
import { Header } from './components/Header';
import { SheetPreview } from './components/SheetPreview';
import { SidebarSettings } from './components/SidebarSettings';
import { LanguageProvider, useI18n } from './i18n/LanguageContext';
import type {
  BackMode,
  BleedConfig,
  CardItem,
  CutMarksConfig,
  Margins,
  Orientation,
} from './types/pnp';
import {
  DEFAULT_CUT_MARKS,
  DEFAULT_MARGINS,
  getCardPresets,
  getPaperPresets,
} from './utils/constants';
import { calculateLayout, generatePages } from './utils/layoutCalculator';
import type { FlipEdge } from './utils/layoutCalculator';
import { generatePnpPdf } from './utils/pdfGenerator';
import type { ExportScope } from './utils/pdfGenerator';
import {
  createSampleBackSvg,
  SAMPLE_CARDS,
} from './utils/sampleDeck';

type MainViewMode = 'deck' | 'preview' | 'split';

const AppContent: React.FC = () => {
  const { language, t } = useI18n();

  // Paper State
  const [selectedPaperPreset, setSelectedPaperPreset] = useState<string>('a4');
  const [customPaperWidth, setCustomPaperWidth] = useState<number>(210);
  const [customPaperHeight, setCustomPaperHeight] = useState<number>(297);
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [margins, setMargins] = useState<Margins>(DEFAULT_MARGINS);

  // Card Size State
  const [selectedCardPreset, setSelectedCardPreset] = useState<string>('poker');
  const [customCardWidth, setCustomCardWidth] = useState<number>(63.5);
  const [customCardHeight, setCustomCardHeight] = useState<number>(88.9);
  const [spacingXMm, setSpacingXMm] = useState<number>(0);
  const [spacingYMm, setSpacingYMm] = useState<number>(0);
  const [bleedConfig, setBleedConfig] = useState<BleedConfig>({ bleedMm: 0, fitMode: 'cover' });

  // Cut Marks & Duplex
  const [cutMarks, setCutMarks] = useState<CutMarksConfig>(DEFAULT_CUT_MARKS);
  const [flipEdge, setFlipEdge] = useState<FlipEdge>('long-edge');

  // Backs & Cards
  const [backMode, setBackMode] = useState<BackMode>('single');
  const [singleBackImage, setSingleBackImage] = useState<string | null>(createSampleBackSvg());
  const [cards, setCards] = useState<CardItem[]>(SAMPLE_CARDS);

  // UI View Mode: 'deck' | 'preview' | 'split'
  const [viewMode, setViewMode] = useState<MainViewMode>('split');

  // Export State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState({ current: 0, total: 0, message: '' });

  const paperPresets = useMemo(() => getPaperPresets(language), [language]);
  const cardPresets = useMemo(() => getCardPresets(language), [language]);

  // Resolve active paper dimensions
  const activePaperDimensions = useMemo(() => {
    if (selectedPaperPreset === 'custom') {
      return { width: customPaperWidth, height: customPaperHeight };
    }
    const preset = paperPresets.find((p) => p.id === selectedPaperPreset) || paperPresets[0];
    return { width: preset.widthMm, height: preset.heightMm };
  }, [selectedPaperPreset, customPaperWidth, customPaperHeight, paperPresets]);

  // Resolve active card dimensions
  const activeCardDimensions = useMemo(() => {
    if (selectedCardPreset === 'custom') {
      return { width: customCardWidth, height: customCardHeight };
    }
    const preset = cardPresets.find((c) => c.id === selectedCardPreset) || cardPresets[0];
    return { width: preset.widthMm, height: preset.heightMm };
  }, [selectedCardPreset, customCardWidth, customCardHeight, cardPresets]);

  // Total flattened cards count
  const totalCardsCount = useMemo(() => {
    return cards.reduce((sum, c) => sum + (c.copies || 1), 0);
  }, [cards]);

  // Calculate layout
  const layout = useMemo(() => {
    return calculateLayout(
      activePaperDimensions.width,
      activePaperDimensions.height,
      orientation,
      margins,
      activeCardDimensions.width,
      activeCardDimensions.height,
      spacingXMm,
      spacingYMm,
      totalCardsCount
    );
  }, [
    activePaperDimensions,
    orientation,
    margins,
    activeCardDimensions,
    spacingXMm,
    spacingYMm,
    totalCardsCount,
  ]);

  // Generate pages (Fronts + Backs)
  const pages = useMemo(() => {
    return generatePages(cards, layout, flipEdge);
  }, [cards, layout, flipEdge]);

  // Handlers for cards
  const handleAddCards = (files: FileList) => {
    const fileList = Array.from(files);
    if (!fileList.length) return;

    // Instant synchronous card creation using URL.createObjectURL
    const newItems: CardItem[] = fileList.map((file, index) => {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      let initialUrl = '';
      try {
        initialUrl = URL.createObjectURL(file);
      } catch (err) {
        console.warn('URL.createObjectURL failed:', err);
      }

      return {
        id: `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${index}`,
        name: cleanName,
        frontImage: initialUrl,
        copies: 1,
      };
    });

    // Cards appear immediately on screen without delay!
    setCards((prev) => [...prev, ...newItems]);

    // Also read base64 in background for persistent storage & PDF rendering
    fileList.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const cardId = newItems[index].id;
          setCards((prev) =>
            prev.map((c) => (c.id === cardId ? { ...c, frontImage: reader.result as string } : c))
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBatchBackUpload = (files: FileList) => {
    const fileList = Array.from(files);
    if (!fileList.length) return;

    const instantBackUrls = fileList.map((f) => {
      try {
        return URL.createObjectURL(f);
      } catch {
        return '';
      }
    });

    // Assign backs immediately
    setCards((prev) =>
      prev.map((c, idx) => ({
        ...c,
        backImage: instantBackUrls[idx % instantBackUrls.length] || c.backImage,
      }))
    );

    // Read base64 in background
    fileList.forEach((file, fileIdx) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setCards((prev) =>
            prev.map((c, cardIdx) =>
              cardIdx % fileList.length === fileIdx
                ? { ...c, backImage: reader.result as string }
                : c
            )
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateCard = (id: string, updates: Partial<CardItem>) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReorderCards = (startIndex: number, endIndex: number) => {
    setCards((prev) => {
      const next = [...prev];
      const [removed] = next.splice(startIndex, 1);
      next.splice(endIndex, 0, removed);
      return next;
    });
  };

  const handleSetAllCopies = (copies: number) => {
    setCards((prev) => prev.map((c) => ({ ...c, copies })));
  };

  const handleLoadSample = () => {
    setCards(SAMPLE_CARDS);
    setSingleBackImage(createSampleBackSvg());
  };

  const handleClearCards = () => {
    if (window.confirm(t('confirmClear'))) {
      setCards([]);
    }
  };

  // PDF Export
  const handleStartExport = async (scope: ExportScope) => {
    setIsExporting(true);
    setExportProgress({ current: 0, total: pages.length, message: t('preparingPdf') });

    try {
      const pdfBytes = await generatePnpPdf(
        pages,
        layout,
        singleBackImage,
        cutMarks,
        bleedConfig,
        scope,
        (current, total, message) => {
          setExportProgress({ current, total, message });
        }
      );

      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      saveAs(blob, `PNPMaster_${layout.paperWidthMm}x${layout.paperHeightMm}mm_${totalCardsCount}cards.pdf`);
      setIsExportModalOpen(false);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF Error: ' + String(error));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Top Header */}
      <Header
        totalCards={totalCardsCount}
        totalPages={layout.totalPages}
        onExportClick={() => setIsExportModalOpen(true)}
        onLoadSample={handleLoadSample}
        onClearCards={handleClearCards}
        isExporting={isExporting}
      />

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Settings Sidebar */}
        <SidebarSettings
          selectedPaperPreset={selectedPaperPreset}
          onPaperPresetChange={setSelectedPaperPreset}
          customPaperWidth={customPaperWidth}
          customPaperHeight={customPaperHeight}
          onCustomPaperSizeChange={(w, h) => {
            setCustomPaperWidth(w);
            setCustomPaperHeight(h);
          }}
          orientation={orientation}
          onOrientationChange={setOrientation}
          margins={margins}
          onMarginsChange={setMargins}
          selectedCardPreset={selectedCardPreset}
          onCardPresetChange={setSelectedCardPreset}
          customCardWidth={customCardWidth}
          customCardHeight={customCardHeight}
          onCustomCardSizeChange={(w, h) => {
            setCustomCardWidth(w);
            setCustomCardHeight(h);
          }}
          spacingXMm={spacingXMm}
          spacingYMm={spacingYMm}
          onSpacingChange={(x, y) => {
            setSpacingXMm(x);
            setSpacingYMm(y);
          }}
          bleedConfig={bleedConfig}
          onBleedConfigChange={setBleedConfig}
          cutMarks={cutMarks}
          onCutMarksChange={setCutMarks}
          flipEdge={flipEdge}
          onFlipEdgeChange={setFlipEdge}
          backMode={backMode}
          onBackModeChange={setBackMode}
          singleBackImage={singleBackImage}
          onSingleBackImageChange={setSingleBackImage}
          onBatchBackImagesUpload={handleBatchBackUpload}
        />

        {/* Center / Right Workspace Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Subheader: View mode toggle bar */}
          <div className="h-10 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('deck')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  viewMode === 'deck'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{t('deckView')}</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('previewView')}</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{t('splitView')}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              <span className="text-indigo-400 font-semibold">{layout.cols}×{layout.rows}</span> {t('gridInfo')} •{' '}
              <span className="text-white">{layout.cardWidthMm}×{layout.cardHeightMm}mm</span> {t('cardInfo')}
            </div>
          </div>

          {/* Dynamic Content Views */}
          <div className="flex-1 flex overflow-hidden">
            {/* View 1: Deck Manager */}
            {(viewMode === 'deck' || viewMode === 'split') && (
              <div
                className={`flex-1 flex flex-col overflow-hidden ${
                  viewMode === 'split' ? 'border-r border-slate-800/80' : ''
                }`}
              >
                <CardListManager
                  cards={cards}
                  backMode={backMode}
                  singleBackImage={singleBackImage}
                  onAddCards={handleAddCards}
                  onUpdateCard={handleUpdateCard}
                  onDeleteCard={handleDeleteCard}
                  onReorderCards={handleReorderCards}
                  onSetAllCopies={handleSetAllCopies}
                />
              </div>
            )}

            {/* View 2: Sheet Preview */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <SheetPreview
                  layout={layout}
                  pages={pages}
                  singleBackImage={singleBackImage}
                  cutMarks={cutMarks}
                  bleedConfig={bleedConfig}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* High Res PDF Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => !isExporting && setIsExportModalOpen(false)}
        layout={layout}
        totalCards={totalCardsCount}
        isExporting={isExporting}
        exportProgress={exportProgress}
        onStartExport={handleStartExport}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
