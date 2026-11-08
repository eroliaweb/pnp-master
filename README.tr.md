# PNPMaster 🎴
> **Print and Play (PnP) Kart Baskı ve Sayfa Yerleşim Stüdyosu**

[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-indigo.svg)](LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6.svg?logo=windows)](https://github.com/)
[![Electron](https://img.shields.io/badge/Electron-45.2-47848F.svg?logo=electron)](https://www.electronjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)](https://react.dev/)
[![Dil Desteği](https://img.shields.io/badge/Dil-T%C3%BCrk%C3%A7e%20%7C%20English-emerald.svg)](#özellikler)

[🇬🇧 Click here for English documentation (README.md)](./README.md)

---

## 📖 Genel Bakış

**PNPMaster**, kutu oyunu ve kart oyunu (PnP - Print & Play) tutkunlarının en büyük sorunu olan **arkalı-önlü (çift taraflı / duplex) baskı hizalama kayması** problemini kökünden çözen masaüstü uygulamasıdır.

Ev yazıcılarında veya ozalitçilerde arkalı önlü kart basarken, standart araçlar kağıdı çevirme eksenini ve simetrik kenar paylarını hesaba katmadığı için arka yüzler kayar. PNPMaster; kart görsellerinizi sürükleyip bıraktığınız anda milimetrik kağıt ızgarasını hesaplar, arka yüzleri otomatik yatay aynalar, kesim kılavuzlarını ekler ve baskıya hazır **300 DPI vektörel PDF** üretir.

---

## ✨ Özellikler

- 📄 **Kağıt Boyutu ve Yönlendirme:**
  - Standart Formatlar: **A4**, **A3**, **US Letter**, **US Tabloid / Ledger**, **US Legal**.
  - **Özel Kağıt:** Milimetre cinsinden dilediğiniz genişlik ve yüksekliği belirleme.
  - **Dikey / Yatay:** Tek tıkla yönlendirme değişimi.
  - **Kenar Boşlukları (Margin):** Üst, alt, sol ve sağ boşlukları bağımsız milimetrik ayarlayabilme.

- 🃏 **Kart Ölçü Standartları:**
  - **Poker / Standart:** 63.5 × 88.9 mm (2.5 × 3.5 inç — MTG, Pokémon vb.)
  - **Bridge:** 57.0 × 88.9 mm (Klasik iskambil / ince kart boyutu)
  - **Euro Standart:** 59.0 × 92.0 mm (Catan, 7 Wonders, Dominion vb.)
  - **Mini Euro:** 44.0 × 68.0 mm (Ticket to Ride, Codenames)
  - **Mini American:** 41.0 × 63.0 mm (Arkham Horror, Twilight Imperium)
  - **Tarot:** 70.0 × 120.0 mm
  - **Kare:** 70 × 70 mm & 50 × 50 mm
  - **Özel Kart Boyutu:** Dilediğiniz milimetrik en/boy oranı.

- 🔄 **Akıllı Çift Taraflı (Duplex) Ayna Motoru:**
  - Ön sayfa ızgarası kağıda tam simetrik ortalanır (Sol kenar payı = Sağ kenar payı).
  - Çift taraflı baskıda (uzun kenar çevirme), arka sayfa kartları **otomatik yatay aynalanır** (Sütun 1'deki kartın arkası, arka sayfada son sütuna yerleşir).
  - Böylece arkalı-önlü baskı alındığında kartların önü ve arkası milimetrik olarak birebir çakışır.

- ✂️ **Kesim Kılavuzları & Taşma Payı (Bleed):**
  - **Köşe Kesim İşaretleri (Crop Marks):** Maket bıçağı veya cetvel ile kesim için köşe işaretleri (uzunluk ve ofset ayarlı).
  - **Izgara Kesim Çizgileri:** Giyotin kesimleri için kart kenarları boyunca hafif kılavuz çizgiler.
  - **Hizalama Artı Hedefleri (Registration Marks):** Yazıcı kağıt kaymasını denetlemek için sayfa köşelerine referans artı işaretleri.
  - **Taşma Payı (Bleed):** 0 mm ile 5 mm arası kart dış taşma payı.
  - **Sıfır Kesim (0 mm Gutter):** Tek bıçak darbesiyle bitişik iki kartı kesebilme.

- 🗃️ **Kart Yönetimi & Sürükle-Bırak:**
  - **Anlık Toplu Kart Ekleme:** Onlarca görseli (PNG, JPG, WebP) sürükleyip bırakarak gecikmesiz ekleme.
  - **Kopya Sayısı (Copies):** Aynı karttan birden fazla basmak için dosyayı tekrar yüklemek yerine adet seçimi (`1x, 2x, 4x` hızlı butonları dahil).
  - **Sıralama ve Değiştirme:** Kartları sağa/sola taşıma veya tek kartın görselini hızlıca yenileme.
  - **Tekli ve Bireysel Arka Yüz:** Tüm desteye tek bir ortak arka yüz görseli atama veya her karta özel arka yüz eşleme.

- 👁️ **Canlı WYSIWYG Önizleme & "Sayfayı Çevir" Butonu:**
  - Kağıdın ve kartların baskıda nasıl görüneceğini gösteren milimetrik SVG canlı önizleme.
  - **"Sayfayı Çevir" Butonu:** Tek tıkla sayfayı arkaya çevirip kartların arka yüz hizasını test edebilme.
  - Sayfa gezintisi (Yaprak 1 Ön, Yaprak 1 Arka, Yaprak 2 Ön...).

- 🖨️ **300 DPI Vektörel PDF Dışa Aktarma:**
  - `pdf-lib` entegrasyonuyla tam ölçülerde vektörel PDF çıktısı.
  - Çıktı Seçenekleri:
    1. *Tüm Sayfalar (Ön & Arka Sıralı):* Çift taraflı yazıcılar için (Yaprak 1 Ön, Yaprak 1 Arka...).
    2. *Sadece Ön Yüzler:* Tek taraflı baskı veya kart koruyucu kılıf (sleeve) kullananlar için.
    3. *Sadece Arka Yüzler:* Ayrı kağıda basıp yapıştırmak için.

- 🌐 **İki Dilli Arayüz (i18n):**
  - Sağ üst köşeden tek tıkla **Türkçe** ve **İngilizce** dilleri arasında anında geçiş.

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Kurulum
```bash
git clone https://github.com/kullanici-adiniz/pnpmaster.git
cd pnpmaster
npm install
```

### Uygulamayı Çalıştırma

- **Masaüstü Penceresi Olarak:**
  ```bash
  npm run start
  # veya Windows'ta start.bat dosyasına çift tıklayın
  ```

- **Web Tarayıcısı Modunda:**
  ```bash
  npm run dev
  # ardından http://localhost:5173 adresini açın
  ```

### Tek Başına Çalışan EXE Oluşturma (.exe)
```bash
npm run build:exe
```
Bu komut `release/` klasörü içerisine herhangi bir kuruluma ihtiyaç duymayan taşınabilir **`PNPMaster.exe`** dosyasını üretir.

---

## 📜 Lisans

MIT Lisansı © 2026 PNPMaster.
