import {
  CreditCard,
  Crop,
  FileBox,
  Image as ImageIcon,
  RotateCw,
  Upload,
} from 'lucide-react';
import React, { useState } from 'react';
import type {
  BackMode,
  BleedConfig,
  CutMarksConfig,
  Margins,
  Orientation,
} from '../types/pnp';
import { CARD_PRESETS, PAPER_PRESETS } from '../utils/constants';
import type { FlipEdge } from '../utils/layoutCalculator';

interface SidebarSettingsProps {
  selectedPaperPreset: string;
  onPaperPresetChange: (id: string) => void;
  customPaperWidth: number;
  customPaperHeight: number;
  onCustomPaperSizeChange: (w: number, h: number) => void;
  orientation: Orientation;
  onOrientationChange: (o: Orientation) => void;
  margins: Margins;
  onMarginsChange: (margins: Margins) => void;

  selectedCardPreset: string;
  onCardPresetChange: (id: string) => void;
  customCardWidth: number;
  customCardHeight: number;
  onCustomCardSizeChange: (w: number, h: number) => void;
  spacingXMm: number;
  spacingYMm: number;
  onSpacingChange: (x: number, y: number) => void;
  bleedConfig: BleedConfig;
  onBleedConfigChange: (c: BleedConfig) => void;

  cutMarks: CutMarksConfig;
  onCutMarksChange: (c: CutMarksConfig) => void;
  flipEdge: FlipEdge;
  onFlipEdgeChange: (f: FlipEdge) => void;

  backMode: BackMode;
  onBackModeChange: (m: BackMode) => void;
  singleBackImage: string | null;
  onSingleBackImageChange: (img: string | null) => void;
  onBatchBackImagesUpload: (files: FileList) => void;
}

export const SidebarSettings: React.FC<SidebarSettingsProps> = ({
  selectedPaperPreset,
  onPaperPresetChange,
  customPaperWidth,
  customPaperHeight,
  onCustomPaperSizeChange,
  orientation,
  onOrientationChange,
  margins,
  onMarginsChange,
  selectedCardPreset,
  onCardPresetChange,
  customCardWidth,
  customCardHeight,
  onCustomCardSizeChange,
  spacingXMm,
  spacingYMm,
  onSpacingChange,
  bleedConfig,
  onBleedConfigChange,
  cutMarks,
  onCutMarksChange,
  flipEdge,
  onFlipEdgeChange,
  backMode,
  onBackModeChange,
  singleBackImage,
  onSingleBackImageChange,
  onBatchBackImagesUpload,
}) => {
  const [activeTab, setActiveTab] = useState<'paper' | 'card' | 'cut' | 'back'>('paper');

  return (
    <aside className="w-84 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 overflow-hidden">
      {/* Tab Navigation */}
      <div className="grid grid-cols-4 p-2 gap-1 border-b border-slate-800/80 bg-slate-950/40 text-xs">
        <button
          onClick={() => setActiveTab('paper')}
          className={`flex flex-col items-center py-2 px-1 rounded-lg font-medium transition ${
            activeTab === 'paper'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileBox className="w-4 h-4 mb-1" />
          <span>Kağıt</span>
        </button>
        <button
          onClick={() => setActiveTab('card')}
          className={`flex flex-col items-center py-2 px-1 rounded-lg font-medium transition ${
            activeTab === 'card'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <CreditCard className="w-4 h-4 mb-1" />
          <span>Kart</span>
        </button>
        <button
          onClick={() => setActiveTab('cut')}
          className={`flex flex-col items-center py-2 px-1 rounded-lg font-medium transition ${
            activeTab === 'cut'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Crop className="w-4 h-4 mb-1" />
          <span>Kesim</span>
        </button>
        <button
          onClick={() => setActiveTab('back')}
          className={`flex flex-col items-center py-2 px-1 rounded-lg font-medium transition ${
            activeTab === 'back'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <ImageIcon className="w-4 h-4 mb-1" />
          <span>Arka Yüz</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
        {/* TAB 1: KAĞIT BOYUTU */}
        {activeTab === 'paper' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Kağıt Formatı</span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">Baskı Kağıdı</span>
              </label>
              <select
                value={selectedPaperPreset}
                onChange={(e) => onPaperPresetChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
              >
                {PAPER_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom dimensions if custom selected */}
            {selectedPaperPreset === 'custom' && (
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2">
                <span className="text-[11px] font-semibold text-indigo-300 block">Özel Kağıt Ölçüleri (mm)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Genişlik (mm)</label>
                    <input
                      type="number"
                      min={50}
                      max={1000}
                      value={customPaperWidth}
                      onChange={(e) => onCustomPaperSizeChange(Number(e.target.value), customPaperHeight)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Yükseklik (mm)</label>
                    <input
                      type="number"
                      min={50}
                      max={1000}
                      value={customPaperHeight}
                      onChange={(e) => onCustomPaperSizeChange(customPaperWidth, Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Orientation */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Kağıt Yönlendirmesi</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOrientationChange('portrait')}
                  className={`py-2 px-3 rounded-lg border text-center transition flex items-center justify-center gap-2 ${
                    orientation === 'portrait'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-3.5 h-4.5 border border-current rounded-xs" />
                  <span>Dikey</span>
                </button>
                <button
                  onClick={() => onOrientationChange('landscape')}
                  className={`py-2 px-3 rounded-lg border text-center transition flex items-center justify-center gap-2 ${
                    orientation === 'landscape'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-4.5 h-3.5 border border-current rounded-xs" />
                  <span>Yatay</span>
                </button>
              </div>
            </div>

            {/* Margins */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Kenar Boşlukları (Margin - mm)</span>
                <button
                  onClick={() => onMarginsChange({ top: 10, bottom: 10, left: 10, right: 10 })}
                  className="text-[10px] text-indigo-400 hover:underline"
                >
                  Varsayılan (10mm)
                </button>
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <label className="text-[10px] text-slate-400 block">Üst (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={margins.top}
                    onChange={(e) => onMarginsChange({ ...margins, top: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Alt (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={margins.bottom}
                    onChange={(e) => onMarginsChange({ ...margins, bottom: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Sol (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={margins.left}
                    onChange={(e) => onMarginsChange({ ...margins, left: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Sağ (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={margins.right}
                    onChange={(e) => onMarginsChange({ ...margins, right: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KART BOYUTU */}
        {activeTab === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Kart Ölçü Standartı</span>
                <span className="text-[10px] text-slate-500 uppercase font-mono">PnP Kart</span>
              </label>
              <select
                value={selectedCardPreset}
                onChange={(e) => onCardPresetChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
              >
                {CARD_PRESETS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Card dimensions */}
            {selectedCardPreset === 'custom' && (
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2">
                <span className="text-[11px] font-semibold text-indigo-300 block">Özel Kart Ölçüleri (mm)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Genişlik (mm)</label>
                    <input
                      type="number"
                      step={0.5}
                      min={10}
                      max={300}
                      value={customCardWidth}
                      onChange={(e) => onCustomCardSizeChange(Number(e.target.value), customCardHeight)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Yükseklik (mm)</label>
                    <input
                      type="number"
                      step={0.5}
                      min={10}
                      max={300}
                      value={customCardHeight}
                      onChange={(e) => onCustomCardSizeChange(customCardWidth, Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Spacing between cards */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Kartlar Arası Aralık (Gutter)</span>
                <button
                  onClick={() => onSpacingChange(0, 0)}
                  className="text-[10px] text-indigo-400 hover:underline"
                >
                  Sıfır Kesim (0mm)
                </button>
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <label className="text-[10px] text-slate-400 block">Yatay Aralık (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    step={0.5}
                    value={spacingXMm}
                    onChange={(e) => onSpacingChange(Number(e.target.value), spacingYMm)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Dikey Aralık (mm)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    step={0.5}
                    value={spacingYMm}
                    onChange={(e) => onSpacingChange(spacingXMm, Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                İpucu: 0mm bitişik kesimde tek bir bıçak darbesiyle iki kart kesilebilir.
              </p>
            </div>

            {/* Bleed Settings */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Taşma Payı (Bleed - mm)</label>
              <div className="flex items-center gap-3 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.5}
                  value={bleedConfig.bleedMm}
                  onChange={(e) => onBleedConfigChange({ ...bleedConfig, bleedMm: Number(e.target.value) })}
                  className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                />
                <span className="text-[11px] text-slate-400">
                  {bleedConfig.bleedMm > 0 ? `Her kenardan +${bleedConfig.bleedMm}mm taşma` : 'Taşma yok (0mm)'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KESİM KILAVUZLARI & DUPLEX */}
        {activeTab === 'cut' && (
          <div className="space-y-4">
            {/* Duplex Mirroring Options */}
            <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                <RotateCw className="w-4 h-4" />
                <span>Çift Taraflı Baskı (Duplex Aynalama)</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Yazıcı çift taraflı bastığında arka yüzdeki kartların tam ön yüzle çakışması için ayna çevirme ekseni:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onFlipEdgeChange('long-edge')}
                  className={`py-2 px-2.5 rounded border text-left transition ${
                    flipEdge === 'long-edge'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-medium'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold text-[11px]">Uzun Kenar (Kitap)</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Yatay ayna (Standard)</span>
                </button>
                <button
                  onClick={() => onFlipEdgeChange('short-edge')}
                  className={`py-2 px-2.5 rounded border text-left transition ${
                    flipEdge === 'short-edge'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-medium'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold text-[11px]">Kısa Kenar (Takvim)</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Dikey ayna</span>
                </button>
              </div>
            </div>

            {/* Corner Crop Marks */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cutMarks.showCropMarks}
                  onChange={(e) => onCutMarksChange({ ...cutMarks, showCropMarks: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-slate-200">Köşe Kesim Kılavuzları (Crop Marks)</span>
              </label>

              {cutMarks.showCropMarks && (
                <div className="ml-6 space-y-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Çizgi Uzunluğu:</span>
                    <input
                      type="number"
                      min={2}
                      max={15}
                      value={cutMarks.cropMarkLengthMm}
                      onChange={(e) => onCutMarksChange({ ...cutMarks, cropMarkLengthMm: Number(e.target.value) })}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-right text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Karttan Ofset:</span>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={cutMarks.cropMarkOffsetMm}
                      onChange={(e) => onCutMarksChange({ ...cutMarks, cropMarkOffsetMm: Number(e.target.value) })}
                      className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-right text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Grid cut lines */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cutMarks.showGridLines}
                  onChange={(e) => onCutMarksChange({ ...cutMarks, showGridLines: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-slate-200">Izgara Kesim Çizgileri</span>
              </label>
              <p className="text-[10px] text-slate-500 ml-6">
                Kartların kenarlarını boyunca hafif kılavuz çizgisi çizer (giyotin hizalama için idealdir).
              </p>
            </div>

            {/* Registration marks */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={cutMarks.showRegistrationMarks}
                  onChange={(e) => onCutMarksChange({ ...cutMarks, showRegistrationMarks: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-slate-200">Hizalama Hedefleri (Registration Marks)</span>
              </label>
              <p className="text-[10px] text-slate-500 ml-6">
                Sayfa köşelerine çift taraflı baskı kaymasını kontrol etmek için artı hedef işaretleri koyar.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: ARKA YÜZ YÖNETİMİ */}
        {activeTab === 'back' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Arka Yüz Modu</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBackModeChange('single')}
                  className={`py-2 px-2.5 rounded-lg border text-left transition ${
                    backMode === 'single'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold text-[11px]">Tekli Arka Yüz</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Tüm kartlara tek görsel</span>
                </button>
                <button
                  onClick={() => onBackModeChange('individual')}
                  className={`py-2 px-2.5 rounded-lg border text-left transition ${
                    backMode === 'individual'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-semibold text-[11px]">Bireysel Arka Yüz</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Her karta özel arka</span>
                </button>
              </div>
            </div>

            {/* Single Back Image Upload/Preview */}
            {backMode === 'single' && (
              <div className="space-y-3 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-200 block">Deste Arka Görseli</span>
                {singleBackImage ? (
                  <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900 aspect-[5/7] max-w-[140px] mx-auto shadow-md">
                    <img src={singleBackImage} alt="Deck Back" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                      <label className="cursor-pointer px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-medium transition">
                        Değiştir
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const reader = new FileReader();
                              reader.onload = () => onSingleBackImageChange(reader.result as string);
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <button
                        onClick={() => onSingleBackImageChange(null)}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-medium transition"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition bg-slate-900/40 hover:bg-slate-900/80">
                    <Upload className="w-6 h-6 text-indigo-400 mb-2" />
                    <span className="font-medium text-slate-200 text-xs">Arka Görsel Seç</span>
                    <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WebP</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const reader = new FileReader();
                          reader.onload = () => onSingleBackImageChange(reader.result as string);
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}
                <p className="text-[10px] text-slate-400 text-center">
                  Bu görsel baskıda arka sayfaların tüm hücrelerinde tekrarlanır.
                </p>
              </div>
            )}

            {/* Individual Back Batch Upload */}
            {backMode === 'individual' && (
              <div className="space-y-3 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-200 block">Toplu Arka Yüz Yükleme</span>
                <p className="text-[10px] text-slate-400">
                  Birden fazla arka görsel seçtiğinizde, listedeki ön yüz kartlarına sıra ile eşleştirilir.
                </p>
                <label className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition bg-indigo-950/10 hover:bg-indigo-950/20">
                  <Upload className="w-5 h-5 text-indigo-400 mb-1" />
                  <span className="font-medium text-indigo-300 text-xs">Çoklu Arka Görseller Seç</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        onBatchBackImagesUpload(e.target.files);
                      }
                    }}
                  />
                </label>
                <p className="text-[10px] text-slate-500">
                  Ayrıca kart listesinden her kartın kendi arka yüzünü tek tek de değiştirebilirsiniz.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
