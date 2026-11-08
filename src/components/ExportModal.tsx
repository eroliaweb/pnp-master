import { CheckCircle2, Download, FileText, Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { LayoutCalculation } from '../types/pnp';
import type { ExportScope } from '../utils/pdfGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  layout: LayoutCalculation;
  totalCards: number;
  isExporting: boolean;
  exportProgress: { current: number; total: number; message: string };
  onStartExport: (scope: ExportScope) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  layout,
  totalCards,
  isExporting,
  exportProgress,
  onStartExport,
}) => {
  const { t } = useI18n();
  const [scope, setScope] = useState<ExportScope>('all');

  if (!isOpen) return null;

  const estimatedPages =
    scope === 'all'
      ? layout.totalPages
      : layout.frontPagesCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-200">
        {!isExporting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t('exportModalTitle')}</h2>
            <p className="text-xs text-slate-400">{t('exportModalSubtitle')}</p>
          </div>
        </div>

        {isExporting ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
            <div className="space-y-1">
              <span className="font-semibold text-white text-sm">{t('preparingPdf')}</span>
              <p className="text-xs text-slate-400">{exportProgress.message}</p>
            </div>
            {exportProgress.total > 0 && (
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-2 transition-all duration-300"
                  style={{
                    width: `${Math.round((exportProgress.current / exportProgress.total) * 100)}%`,
                  }}
                />
              </div>
            )}
            <span className="text-xs text-slate-500 font-mono">
              {exportProgress.current} / {exportProgress.total} {t('pagesCount')}
            </span>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Scope Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">{t('exportScopeLabel')}</label>
              <div className="space-y-2">
                <label
                  onClick={() => setScope('all')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    scope === 'all'
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <span className="block font-semibold text-xs">{t('scopeAllTitle')}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {t('scopeAllDesc')}
                    </span>
                  </div>
                  {scope === 'all' && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                </label>

                <label
                  onClick={() => setScope('fronts-only')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    scope === 'fronts-only'
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <span className="block font-semibold text-xs">{t('scopeFrontsTitle')}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {t('scopeFrontsDesc')}
                    </span>
                  </div>
                  {scope === 'fronts-only' && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                </label>

                <label
                  onClick={() => setScope('backs-only')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    scope === 'backs-only'
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <span className="block font-semibold text-xs">{t('scopeBacksTitle')}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {t('scopeBacksDesc')}
                    </span>
                  </div>
                  {scope === 'backs-only' && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                </label>
              </div>
            </div>

            {/* Print specs summary */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{t('paperFormat')}:</span>
                <span className="text-white font-medium">
                  {layout.paperWidthMm} × {layout.paperHeightMm} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('cardStandard')}:</span>
                <span className="text-white font-medium">
                  {layout.cardWidthMm} × {layout.cardHeightMm} mm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('totalOutput')}</span>
                <span className="text-indigo-400 font-bold">
                  {estimatedPages} {t('pagesCount')} ({totalCards} {t('cardInfo')})
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => onStartExport(scope)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadPdf')} ({estimatedPages} {t('pagesCount')})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
