# PNPMaster 🎴

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6.svg?logo=windows)](https://github.com/)
[![Built with Electron](https://img.shields.io/badge/Electron-45.2-47848F.svg?logo=electron)](https://www.electronjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)](https://react.dev/)
[![Language: English & Turkish](https://img.shields.io/badge/i18n-EN%20%7C%20TR-emerald.svg)](#features)

> **Desktop print-and-play (PnP) card printing studio with automatic duplex alignment, cutting guides, and 300 DPI vector PDF export.**

[🇹🇷 Türkçe dökümantasyon için buraya tıklayın (README.tr.md)](./README.tr.md)

---

## 📖 Overview

**PNPMaster** solves the single biggest headache in board game Print & Play: **front-to-back duplex alignment**. 

When printing double-sided cards at home or at print shops, standard sheets shift, backs become misaligned, and traditional tools don't properly handle sheet flipping axes or symmetrical grid margins.

PNPMaster provides a high-performance desktop studio where you can drop your card images, configure paper and card standards, preview exact cutting lines, simulate duplex flips, and export print-ready **300 DPI high-resolution PDFs**.

---

## ✨ Features

- 📄 **Paper Formats & Custom Dimensions:**
  - Standard Presets: **A4**, **A3**, **US Letter**, **US Tabloid / Ledger**, **US Legal**.
  - **Custom Paper Dimensions:** Define custom width and height in millimeters.
  - **Orientation:** Portrait & Landscape.
  - **Custom Margins:** Individual top, bottom, left, and right margins in mm.

- 🃏 **Card Standards & Presets:**
  - **Poker / Standard:** 63.5 × 88.9 mm (2.5 × 3.5 in — MTG, Pokémon, playing cards)
  - **Bridge:** 57.0 × 88.9 mm
  - **Euro Standard:** 59.0 × 92.0 mm (Catan, 7 Wonders, Dominion)
  - **Mini Euro:** 44.0 × 68.0 mm (Ticket to Ride, Codenames)
  - **Mini American:** 41.0 × 63.0 mm (Arkham Horror, Twilight Imperium)
  - **Tarot:** 70.0 × 120.0 mm
  - **Square:** 70 × 70 mm & 50 × 50 mm
  - **Custom Card Size:** Set any custom card width and height.

- 🔄 **Automatic Duplex Mirroring Engine:**
  - Front grid is **symmetrically centered** on the page so left and right margins match to the exact millimeter.
  - On double-sided printing, back sheets are automatically **horizontally mirrored** (`col -> cols - 1 - col`) for long-edge flip (or vertically mirrored for short-edge flip).
  - Front Card at Row 0, Col 0 aligns 100% with Back Card at Row 0, Col `max`.

- ✂️ **Cutting Marks & Bleed Support:**
  - **Corner Crop Marks:** Precision tick marks for rotary cutters, rulers, and craft knives with customizable length and offset.
  - **Grid Cut Lines:** Continuous faint dashed lines across the page for guillotine paper cutters.
  - **Registration Crosshairs:** Corner target marks to verify printer feed alignment.
  - **Bleed Margins:** 0 mm to 5 mm bleed expansion around each card.
  - **Zero-Gutter:** 0 mm contiguous spacing for single-stroke blade cutting.

- 🗃️ **Deck Management & Batch Operations:**
  - **Instant Batch Import:** Drag and drop dozens of card images (PNG, JPG, WebP) with zero delay.
  - **Card Copies Stepper:** Increase/decrease copies per card (`1x, 2x, 4x` quick buttons) without duplicating image files on disk.
  - **Reordering & Replacement:** Move cards left/right or swap individual card artwork on the fly.
  - **Single Back vs. Individual Backs:** Assign one common back to the entire deck or specify custom backs per card (including 1:1 batch back pairing).

- 👁️ **Interactive WYSIWYG Preview & Flip Simulator:**
  - True-to-scale SVG sheet viewer with zoom in/out and 100% fit.
  - **"Flip Sheet" Button:** Live flip simulation to instantly inspect back alignment against front cards.
  - Multi-page navigation (Sheet 1 Front, Sheet 1 Back, Sheet 2 Front...).

- 🖨️ **300 DPI High-Resolution PDF Export:**
  - Vector cutting lines and embedded high-res raster art using `pdf-lib`.
  - **Export Scopes:**
    1. *All Pages (Front & Back Interleaved):* Ready for double-sided printers.
    2. *Front Sides Only:* For single-sided printing or opaque sleeves.
    3. *Back Sides Only (Mirrored):* For separate glue-sheet workflows.

- 🌐 **Bilingual Interface:**
  - Instant one-click toggle between **English** and **Turkish (Türkçe)** with persistent preference storage.

---

## 🛠️ Architecture & Duplex Logic

```
   FRONT SHEET (Page 1)                   BACK SHEET (Page 2) - Duplex Mirrored
┌───────────────────────────┐          ┌───────────────────────────┐
│  [Card 1] [Card 2] [Card 3]│  FLIP    │  [Card 3] [Card 2] [Card 1]│
│  [Card 4] [Card 5] [Card 6]│ ======>> │  [Card 6] [Card 5] [Card 4]│
│  [Card 7] [Card 8] [Card 9]│ (Long)   │  [Card 9] [Card 8] [Card 7]│
└───────────────────────────┘          └───────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/eroliaweb/pnp-master.git
cd pnpmaster

# Install dependencies
npm install
```

### Running Locally

- **Desktop Window (Electron):**
  ```bash
  npm run start
  # or simply double click start.bat on Windows
  ```

- **Web Browser Mode:**
  ```bash
  npm run dev
  # and open http://localhost:5173
  ```

### Building the Standalone Windows Executable (.exe)
```bash
npm run build:exe
```
This generates a portable standalone **`PNPMaster.exe`** in the `release/` directory.

---

## 📋 Keyboard & Mouse Shortcuts

| Action | Control |
|---|---|
| Zoom In | `+` button or Zoom In icon |
| Zoom Out | `-` button or Zoom Out icon |
| Reset Zoom | `100%` button |
| Flip Sheet | Click **Flip Sheet** button |
| Reorder Cards | Hover over card thumbnail and use `←` / `→` arrows |

---

## 📜 License

MIT License © 2026 PNPMaster Contributors.
