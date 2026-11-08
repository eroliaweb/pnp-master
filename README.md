# PNPMaster 🎴
> **Print and Play (PnP) Kart Baskı ve Sayfa Yerleşim Stüdyosu**

PNPMaster, masaüstü ve kutu oyunları (Board Games) için kartlarınızı en kolay ve profesyonel şekilde baskıya hazırlayan modern bir masaüstü uygulamasıdır.

---

## 🚀 Temel Özellikler

### 1. Kağıt Boyutu & Yönlendirme
- **Standart Formatlar:** A4 (210×297 mm), A3 (297×420 mm), US Letter, US Tabloid / Ledger, US Legal.
- **Özel Kağıt Boyutu:** İstediğiniz genişlik ve yüksekliği milimetre olarak girebilme.
- **Yönlendirme:** Dikey (Portrait) ve Yatay (Landscape) baskı modları.
- **Kenar Boşlukları (Margin):** Üst, alt, sol ve sağ boşlukları bağımsız milimetrik ayarlayabilme.

### 2. Kart Boyutu Standartları
- **Popüler Ölçüler:**
  - **Standart Poker:** 63.5 × 88.9 mm (2.5 × 3.5 inç - MTG, Pokemon, standart oyun kartları)
  - **Bridge:** 57.0 × 88.9 mm (Klasik iskambil)
  - **Euro Standart:** 59.0 × 92.0 mm (Catan, Dominion vb.)
  - **Mini Euro:** 44.0 × 68.0 mm
  - **Mini American:** 41.0 × 63.0 mm (Arkham Horror, Twilight Imperium vb.)
  - **Tarot:** 70.0 × 120.0 mm
  - **Kare:** 70 × 70 mm & 50 × 50 mm
- **Özel Kart Boyutu:** İstediğiniz milimetrik en/boy oranı.
- **Kartlar Arası Aralık (Gutter):** 0 mm (sıfır aralıkla tek bıçak kesimi) veya özel milimetrik aralık.
- **Taşma Payı (Bleed):** Kart kenarlarına isteğe bağlı taşma payı desteği.

### 3. Kart Yönetimi & Sürükle-Bırak
- **Toplu Ön Yüz Ekleme:** Onlarca kart görselini (PNG, JPG, WebP) tek seferde sürükleyip bırakarak yükleme.
- **Görsel Değiştirme:** Kart listesinden istenen kartın ön görselini tek tıkla güncelleme.
- **Sıralama:** Kartları sağa/sola taşıma ve yeniden sıralama.
- **Kopya Sayısı (Copies):** Aynı karttan birden fazla basmak için dosyayı tekrar yüklemek yerine kopya adedini (+/-) belirleme (örn. 4x asker, 1x kral).
- **Hızlı Adet Butonları:** Tüm kartları tek tıkla "Hepsi 1x", "Hepsi 2x" veya "Hepsi 4x" yapabilme.
- **Silme:** Kartları tek tek veya topluca temizleme.

### 4. Arka Yüz (Back) Seçenekleri
- **Tekli Arka Yüz (Single Back):** Tüm kart destesi için tek bir ortak arka yüz görseli belirleme (arka sayfalarda otomatik tekrarlanır).
- **Bireysel / Toplu Arka Yüz (Individual Back):** Her kart için ayrı arka yüz atama veya çoklu arka görseli sırayla kartlara dağıtma.

### 5. Akıllı Çift Taraflı (Duplex) Ayna Hizalama Motoru
- **PnP'nin en büyük problemi çözüldü:** Yazıcıdan arkalı-önlü baskı yapıldığında ön sayfa ile arka sayfa kartlarının tam üst üste oturması için:
  - Sayfa ızgarası kağıda tam simetrik olarak ortalanır (Sol kenar payı = Sağ kenar payı).
  - Arka sayfadaki kartlar otomatik yatay ayna sırasına dizilir (Sütun 0'daki ön kartın arkası, arka sayfada son sütuna yerleşir).
  - Kitap gibi uzun kenardan veya takvim gibi kısa kenardan çevirme seçenekleri mevcuttur.

### 6. PnP Kesim Kılavuzları (Crop / Cut Marks)
- **Köşe Kesim Kılavuzları (Crop Marks):** Maket bıçağı veya cetvel ile hizalama çizgileri (uzunluk ve ofset ayarlı).
- **Izgara Kesim Çizgileri:** Giyotin kesimleri için kart kenarları boyunca kılavuz çizgiler.
- **Hizalama Artı Hedefleri (Registration Crosshairs):** Çift taraflı baskı kaymasını kontrol etmek için sayfa köşelerine referans artı işaretleri.

### 7. Canlı Sayfa Önizleme & "Sayfayı Çevir" Simülatörü
- Kağıdın ve kartların baskıda nasıl görüneceğini gösteren milimetrik SVG/Canvas canlı önizleme.
- Sayfa gezintisi (Sayfa 1: Ön Yüz, Sayfa 2: Arka Yüz [Aynalı]...).
- **"Sayfayı Çevir" Butonu:** Tek tıkla arka yüzün hizasını ve kartların eşleşmesini anında kontrol edebilme.
- Yakınlaştırma (Zoom In, Zoom Out, %100 fit).

### 8. Yüksek Çözünürlüklü (300 DPI) PDF Dışa Aktarma
- `pdf-lib` ile gerçek baskı boyutlarında ve yüksek çözünürlükte vektörel PDF çıktısı.
- Çıktı Modları:
  - **Tüm Sayfalar (Ön & Arka Sıralı):** Çift taraflı yazıcılar için (Yaprak 1 Ön, Yaprak 1 Arka...).
  - **Sadece Ön Yüzler:** Tek taraflı baskı veya kart koruyucu kılıf (sleeve) kullananlar için.
  - **Sadece Arka Yüzler:** Ayrı kağıda basıp yapıştırmak için.

---

## 💻 Çalıştırma Talimatları

Projeyi başlatmak için terminalde aşağıdaki komutları kullanabilirsiniz:

### 1. Masaüstü Penceresi Olarak Başlatma (Electron):
```bash
npm run start
```
*(Bu komut projeyi derler ve native masaüstü penceresi olarak açar.)*

### 2. Geliştirici Modunda Başlatma:
```bash
npm run dev
```
*(Vite web arayüzünü `http://localhost:5173` adresinde açar.)*
