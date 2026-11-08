import { Download, FileText, Layers, RefreshCw, Trash2 } from 'lucide-react';
import React from 'react';
import { useI18n } from '../i18n/LanguageContext';

interface HeaderProps {
  totalCards: number;
  totalPages: number;
  onExportClick: () => void;
  onLoadSample: () => void;
  onClearCards: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalCards,
  totalPages,
  onExportClick,
  onLoadSample,
  onClearCards,
  isExporting,
}) => {
  const { language, setLanguage, t } = useI18n();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-white tracking-wide">{t('appTitle')}</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
              {t('appBadge')}
            </span>
          </div>
          <p className="text-xs text-slate-400">{t('appSubtitle')}</p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="hidden md:flex items-center gap-4 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t('totalCards')}:</span>
          <strong className="text-white font-semibold">{totalCards}</strong>
        </div>
        <div className="w-px h-3.5 bg-slate-800" />
        <div className="flex items-center gap-1.5 text-slate-300">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>{t('printSheets')}:</span>
          <strong className="text-white font-semibold">
            {totalPages} {t('pagesCount')} ({totalPages / 2} {t('sheetsCount')})
          </strong>
        </div>
      </div>

      {/* Action buttons & Language Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher */}
        <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setLanguage('tr')}
            className={`px-2 py-1 rounded font-medium transition ${
              language === 'tr'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Türkçe"
          >
            TR
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded font-medium transition ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="English"
          >
            EN
          </button>
        </div>

        <button
          onClick={onLoadSample}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/60 transition shadow-sm cursor-pointer"
          title={t('sampleDeckTooltip')}
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t('sampleDeck')}</span>
        </button>

        {totalCards > 0 && (
          <button
            onClick={onClearCards}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-400 bg-red-950/20 hover:bg-red-900/40 rounded-lg border border-red-900/30 transition shadow-sm cursor-pointer"
            title={t('clearAllTooltip')}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('clearAll')}</span>
          </button>
        )}

        <button
          onClick={onExportClick}
          disabled={totalCards === 0 || isExporting}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-lg transition ${
            totalCards === 0 || isExporting
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25 cursor-pointer'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? t('exporting') : t('exportPdf')}</span>
        </button>
      </div>
    </header>
  );
};
