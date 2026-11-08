import { Download, FileText, Layers, RefreshCw, Trash2 } from 'lucide-react';
import React from 'react';

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
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-white tracking-wide">PNPMaster</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
              PRO PNP STUDIO
            </span>
          </div>
          <p className="text-xs text-slate-400">Print & Play Kart ve Sayfa Baskı Hazırlayıcı</p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="hidden md:flex items-center gap-4 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Toplam Kart:</span>
          <strong className="text-white font-semibold">{totalCards}</strong>
        </div>
        <div className="w-px h-3.5 bg-slate-800" />
        <div className="flex items-center gap-1.5 text-slate-300">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Baskı Sayfaları:</span>
          <strong className="text-white font-semibold">{totalPages} Sayfa ({totalPages / 2} Yaprak)</strong>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onLoadSample}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/60 transition shadow-sm"
          title="Örnek kart destesini yükle"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
          <span>Örnek Deste</span>
        </button>

        {totalCards > 0 && (
          <button
            onClick={onClearCards}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-400 bg-red-950/20 hover:bg-red-900/40 rounded-lg border border-red-900/30 transition shadow-sm"
            title="Tüm kartları temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Temizle</span>
          </button>
        )}

        <button
          onClick={onExportClick}
          disabled={totalCards === 0 || isExporting}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-lg transition ${
            totalCards === 0 || isExporting
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Oluşturuluyor...' : 'PDF Dışa Aktar'}</span>
        </button>
      </div>
    </header>
  );
};
