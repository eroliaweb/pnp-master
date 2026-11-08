import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { BackMode, CardItem } from '../types/pnp';

interface CardListManagerProps {
  cards: CardItem[];
  backMode: BackMode;
  singleBackImage: string | null;
  onAddCards: (files: FileList) => void;
  onUpdateCard: (id: string, updates: Partial<CardItem>) => void;
  onDeleteCard: (id: string) => void;
  onReorderCards: (startIndex: number, endIndex: number) => void;
  onSetAllCopies: (copies: number) => void;
}

export const CardListManager: React.FC<CardListManagerProps> = ({
  cards,
  backMode,
  singleBackImage,
  onAddCards,
  onUpdateCard,
  onDeleteCard,
  onReorderCards,
  onSetAllCopies,
}) => {
  const { t } = useI18n();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddCards(e.dataTransfer.files);
    }
  };

  const totalCopies = cards.reduce((sum, c) => sum + (c.copies || 1), 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950/70 overflow-hidden">
      {/* Top action toolbar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{t('addBatchCards')}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onAddCards(e.target.files);
                e.target.value = '';
              }
            }}
          />

          <span className="text-xs text-slate-400">
            <strong className="text-white font-medium">{cards.length}</strong> {t('cardTypesCount')} /{' '}
            <strong className="text-indigo-400 font-medium">{totalCopies}</strong> {t('totalPrintCards')}
          </span>
        </div>

        {cards.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">{t('quickCopies')}</span>
            <button
              onClick={() => onSetAllCopies(1)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-[11px] cursor-pointer"
              title="1x"
            >
              {t('all1x')}
            </button>
            <button
              onClick={() => onSetAllCopies(2)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-[11px] cursor-pointer"
              title="2x"
            >
              {t('all2x')}
            </button>
            <button
              onClick={() => onSetAllCopies(4)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 text-[11px] cursor-pointer"
              title="4x"
            >
              {t('all4x')}
            </button>
          </div>
        )}
      </div>

      {/* Main card grid / dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={`flex-1 overflow-y-auto p-5 transition ${
          isDraggingOver ? 'bg-indigo-950/30 border-2 border-dashed border-indigo-500 m-2 rounded-2xl' : ''
        }`}
      >
        {cards.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-full min-h-[300px] border-2 border-dashed border-slate-800 hover:border-indigo-500/60 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <UploadCloud className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{t('dropzoneTitle')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
              {t('dropzoneDesc')}
            </p>
            <span className="px-4 py-2 bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-medium rounded-lg">
              {t('selectFiles')}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {cards.map((card, index) => {
              const activeBack = backMode === 'individual' ? card.backImage : singleBackImage;

              return (
                <div
                  key={card.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl overflow-hidden flex flex-col group shadow-lg transition"
                >
                  {/* Card Thumbnail Area */}
                  <div className="relative aspect-[5/7] bg-slate-950 overflow-hidden flex items-center justify-center">
                    <img
                      src={card.frontImage}
                      alt={card.name}
                      className="w-full h-full object-cover transition duration-200 group-hover:scale-105"
                    />

                    {/* Badge: Index number */}
                    <span className="absolute top-1.5 left-1.5 bg-slate-950/80 backdrop-blur text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-slate-800">
                      #{index + 1}
                    </span>

                    {/* Back preview mini badge */}
                    {activeBack && (
                      <div
                        className="absolute top-1.5 right-1.5 w-6 h-8 rounded border border-indigo-400/60 overflow-hidden shadow-md bg-slate-900"
                        title={t('backTitle')}
                      >
                        <img src={activeBack} alt="Back" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Hover actions overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-2">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => index > 0 && onReorderCards(index, index - 1)}
                          disabled={index === 0}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title={t('moveLeft')}
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCard(card.id)}
                          className="p-1 rounded bg-red-950/80 hover:bg-red-800 text-red-300 cursor-pointer"
                          title={t('deleteCard')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => index < cards.length - 1 && onReorderCards(index, index + 1)}
                          disabled={index === cards.length - 1}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title={t('moveRight')}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-medium text-center cursor-pointer transition">
                          {t('frontPreviewChange')}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const f = e.target.files[0];
                                try {
                                  onUpdateCard(card.id, { frontImage: URL.createObjectURL(f) });
                                } catch {}
                                const reader = new FileReader();
                                reader.onload = () => {
                                  onUpdateCard(card.id, { frontImage: reader.result as string });
                                };
                                reader.readAsDataURL(f);
                              }
                            }}
                          />
                        </label>

                        {backMode === 'individual' && (
                          <label className="w-full py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-medium text-center cursor-pointer transition">
                            {t('backPreviewChange')}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  const f = e.target.files[0];
                                  try {
                                    onUpdateCard(card.id, { backImage: URL.createObjectURL(f) });
                                  } catch {}
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    onUpdateCard(card.id, { backImage: reader.result as string });
                                  };
                                  reader.readAsDataURL(f);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Info & Copy Stepper */}
                  <div className="p-2.5 flex flex-col gap-2 bg-slate-900/60">
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => onUpdateCard(card.id, { name: e.target.value })}
                      className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none text-xs font-medium text-white truncate px-0.5"
                    />

                    <div className="flex items-center justify-between bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800 text-xs">
                      <span className="text-[10px] text-slate-400">{t('cardCopies')}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateCard(card.id, { copies: Math.max(1, (card.copies || 1) - 1) })}
                          className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-white text-xs">
                          {card.copies || 1}
                        </span>
                        <button
                          onClick={() => onUpdateCard(card.id, { copies: (card.copies || 1) + 1 })}
                          className="w-5 h-5 rounded flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
