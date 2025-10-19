# 🕌 Waktu Solat Malaysia - Aplikasi Web Interaktif

Aplikasi web waktu solat yang paling moden dan interaktif untuk Malaysia dengan ciri-ciri unik yang tidak ada dalam aplikasi lain!

## ✨ Ciri-Ciri Utama (Killer Features)

### 1. 🎯 Jam Bulat Waktu Solat Interaktif (UNIK!)
- Paparan 24 jam berbentuk bulat dengan 7 waktu solat
- Jarum masa nyata yang berputar
- Kira detik automatik untuk solat seterusnya
- Segmen berwarna untuk setiap waktu solat
- Animasi lancar dan cantik
- **TIADA aplikasi lain yang ada ciri ini!**

### 2. 🔥 Pencapaian & Streak Tracker
- Sistem check-in untuk setiap solat
- Kiraan streak berturut-turut
- Progress bar harian
- Mesej motivasi dalam Bahasa Melayu
- Data disimpan secara lokal
- Animasi perayaan bila lengkap

### 3. 🔔 Notifikasi Pintar
- Notifikasi pelayar sebelum waktu solat
- Boleh tetapkan masa peringatan (5, 10, 15, 30 minit)
- Notifikasi pada waktu solat tepat
- Bunyi notifikasi (boleh on/off)
- Tetapan disimpan

### 4. 🎨 Tema Dinamik
- Latar belakang berubah mengikut waktu solat:
  - **Subuh**: Ungu/merah jambu (fajar)
  - **Zohor**: Biru cerah (tengahari)
  - **Asar**: Oren (petang)
  - **Maghrib**: Merah/oren (matahari terbenam)
  - **Isyak**: Hitam/biru gelap (malam)
- Peralihan warna yang lancar
- Boleh tukar kepada tema statik

### 5. 🧭 Kompas Kiblat
- Pengiraan arah kiblat tepat
- Anak panah yang berputar mengikut orientasi telefon
- Paparan jarak ke Kaabah
- Widget terapung yang boleh dikembangkan
- Arahan mudah untuk pengguna

### 6. 📍 Pengesanan Lokasi Automatik
- Kesan lokasi pengguna dengan GPS
- Cari zon terdekat secara automatik
- Papar waktu solat untuk lokasi semasa

## 🚀 Kelebihan Berbanding Aplikasi Lain

| Ciri | Waktu Solat Malaysia | Aplikasi Lain |
|------|---------------------|---------------|
| Jam Bulat Interaktif 24 Jam | ✅ | ❌ |
| Kira Detik Live | ✅ | ❌ Kebanyakan tidak |
| Streak Tracker | ✅ | ❌ |
| Tema Dinamik | ✅ | ❌ |
| Kompas Kiblat | ✅ | ✅ (biasa sahaja) |
| Notifikasi Boleh Custom | ✅ | ✅ |
| UI Moden & Cantik | ✅ | ❌ Kebanyakan lama |
| Responsive (PC & Mobile) | ✅ | ✅ |

## 📁 Struktur Fail

```
/Waktu Solat/
├── index.html              # Fail HTML utama
├── README.md              # Dokumentasi
├── css/
│   ├── main.css           # Styles asas
│   ├── clock.css          # Styles jam bulat
│   ├── themes.css         # Tema dinamik
│   └── animations.css     # Animasi
├── js/
│   ├── app.js             # Pengawal utama
│   ├── prayer-data.js     # Data zon & API
│   ├── clock.js           # Jam bulat interaktif
│   ├── notifications.js   # Sistem notifikasi
│   ├── streak-tracker.js  # Pencapaian & streak
│   ├── qibla.js           # Kompas kiblat
│   └── themes.js          # Pengawal tema
└── assets/
    ├── sounds/
    │   └── notification.mp3  # Bunyi notifikasi
    └── icons/
        └── compass.svg       # Icon kompas
```

## 🛠 Teknologi

- **HTML5** - Struktur
- **CSS3** - Styling dengan Grid, Flexbox, Animations
- **JavaScript ES6+** - Logic dengan Modules
- **Canvas API** - Jam bulat interaktif
- **Geolocation API** - Pengesanan lokasi
- **Notification API** - Push notifications
- **LocalStorage** - Simpan data secara lokal
- **DeviceOrientation API** - Kompas kiblat

## 🎯 Cara Guna

1. **Buka `index.html`** dalam pelayar web (Chrome, Firefox, Safari, Edge)

2. **Pilih Lokasi:**
   - Pilih dari dropdown ATAU
   - Klik "📍 Kesan Lokasi Saya"

3. **Lihat Jam Bulat:**
   - Tengok waktu solat seterusnya
   - Perhatikan kira detik live
   - Semua 7 waktu solat terpapar

4. **Check-in Solat:**
   - Klik butang "○" selepas solat
   - Bina streak anda!

5. **Aktifkan Notifikasi:**
   - Klik "Aktifkan Notifikasi"
   - Izinkan pelayar
   - Tetapkan bila nak diingatkan

6. **Guna Kompas Kiblat:**
   - Klik icon 🧭 di bawah kanan
   - Pusingkan telefon ke arah kiblat

## 📱 Responsive Design

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

## 🌟 Ciri-Ciri Unik Yang Tidak Ada Dalam Aplikasi Lain

1. **Jam Bulat 24 Jam** - Visual storytelling untuk seluruh hari
2. **Kira Detik Live** - Countdown real-time yang sentiasa dikemaskini
3. **Streak System** - Gamification untuk motivasi
4. **Tema Berubah** - Pengalaman visual yang dinamik
5. **Pengalaman Holistik** - Semua dalam satu paparan

## 🎨 Design Philosophy

- **Cantik & Fungsional** - Bukan sekadar tools, tetapi experience
- **Mudah Digunakan** - Untuk semua peringkat umur
- **Motivasi** - Bantu pengguna kekal konsisten
- **Modern** - UI/UX terkini

## 📊 Data Source

Data waktu solat dari JAKIM melalui:
- [Waktu Solat API](https://api.waktusolat.app)
- [e-Solat JAKIM](https://www.e-solat.gov.my)

## 🔒 Privacy

- **Tiada data dihantar ke server** - Semua data disimpan secara lokal
- **Lokasi tidak direkod** - Hanya digunakan untuk cari zon
- **Tidak ada tracking** - Privasi pengguna terjaga

## 📝 Notes

### Bunyi Notifikasi

Fail `notification.mp3` perlu ditambah sendiri di folder `assets/sounds/`. Anda boleh gunakan mana-mana bunyi notifikasi atau azan pendek.

### Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (Not supported - too old!)

## 🤝 Contribution

Projek ini dicipta untuk memudahkan umat Islam Malaysia. Feel free to improve!

## 📄 License

Free to use for personal and educational purposes.

---

**Dicipta dengan ❤️ untuk umat Islam Malaysia**

🕌 Semoga bermanfaat dan diberkati Allah SWT

