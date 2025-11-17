# 🐧 Linux Introduction LinuxOnWeb

Website pendidikan interaktif tentang Linux yang didesain seperti sistem operasi desktop. Pengguna dapat berinteraksi dengan berbagai "aplikasi" dalam window yang dapat di-drag, resize, minimize, dan maximize—persis seperti menggunakan desktop Linux asli.

![LinuxOnWeb Preview](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State-orange)

## ✨ Fitur

### 🖥️ Desktop Experience

- **Desktop Interface** dengan wallpaper gradient yang menarik
- **Desktop Icons** untuk quick access ke aplikasi
- **Draggable & Resizable Windows** menggunakan react-rnd
- **Window Controls** (minimize, maximize, close)
- **Taskbar** dengan clock dan running apps indicator
- **App Launcher Menu** untuk akses semua aplikasi

### 📚 Konten Edukatif (Bahasa Indonesia)

1. **Sejarah Linux** - Timeline perkembangan Linux dari 1991 hingga sekarang
2. **Distribusi Linux** - Overview distro populer (Ubuntu, Fedora, Arch, dll)
3. **Kelebihan Linux** - Keunggulan sistem operasi open source
4. **Fitur Utama** - Fitur-fitur powerful Linux
5. **Perintah Dasar** - Command line reference lengkap dengan contoh
6. **Tentang Linux** - Pengenalan komprehensif tentang Linux
7. **Settings** ⭐ - Customize desktop wallpaper in real-time

### ⚙️ Settings App (NEW!)

Aplikasi Settings memungkinkan kustomisasi desktop secara real-time:

- **8 Wallpaper Options** - Default, Ubuntu, Arch, Mint, Dark AMOLED, Fedora, Tux, Geometric
- **Live Preview** - Lihat preview besar wallpaper yang dipilih
- **Instant Apply** - Klik wallpaper langsung terapkan ke desktop
- **Smooth Transitions** - Animasi fade 500ms saat ganti wallpaper
- **Visual Feedback** - Indikator checkmark dan blue ring pada wallpaper aktif
- **Sidebar Navigation** - Appearance, Wallpaper, About sections
- **Mobile Responsive** - Grid layout menyesuaikan layar

Buka Settings dari desktop icon atau app launcher untuk mulai kustomisasi!

### 💻 Terminal Interaktif

Terminal dengan command yang benar-benar berfungsi:

- `help` - Tampilkan daftar command
- `ls` - List aplikasi tersedia
- `about` - Info tentang Linux
- `history` - Sejarah Linux
- `distro` - Distribusi populer
- `features` - Fitur utama
- `advantages` - Kelebihan Linux
- `commands` - Perintah dasar
- `clear` - Bersihkan terminal

Semua command menampilkan konten edukatif yang real (bukan placeholder).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser dan akses: `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan berada di folder `dist/`.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite 7** - Build tool & dev server
- **TailwindCSS 3** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **react-rnd** - Draggable & resizable component
- **Lucide React** - Icon library
- **Framer Motion** - Animation library (smooth transitions)

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Desktop/
│   │   └── Desktop.jsx           # Desktop container & icons
│   ├── Taskbar/
│   │   └── Taskbar.jsx            # Bottom taskbar dengan clock
│   ├── Menu/
│   │   └── AppLauncher.jsx        # App launcher menu
│   ├── Window/
│   │   ├── Window.jsx             # Legacy window component
│   │   └── MacOSWindow.jsx        # macOS-style window (current)
│   └── Apps/
│       ├── Terminal/
│       │   └── Terminal.jsx       # Interactive terminal
│       ├── Sejarah/
│       │   └── Sejarah.jsx        # Linux history
│       ├── Distro/
│       │   └── Distro.jsx         # Linux distributions
│       ├── Kelebihan/
│       │   └── Kelebihan.jsx      # Linux advantages
│       ├── Fitur/
│       │   └── Fitur.jsx          # Linux features
│       ├── PerintahDasar/
│       │   └── PerintahDasar.jsx  # Basic commands
│       ├── Tentang/
│       │   └── Tentang.jsx        # About Linux
│       └── Settings/              # ⭐ NEW
│           ├── SettingsApp.jsx    # Main settings window
│           └── WallpaperPicker.jsx # Wallpaper selection
├── data/
│   └── apps/
│       ├── fileManager/
│       │   ├── folderData.js      # Folder structure + helpers
│       │   └── onboarding.js      # Guided tour content
│       └── settings/
│           └── settingsData.js    # Wallpaper & section configs
├── store/
│   └── windowStore.js             # Zustand state management
├── App.jsx                        # Main app component
├── main.jsx                       # Entry point
└── index.css                      # Tailwind & global styles
```

## 🎨 Customization

### Mengganti Wallpaper via Settings App ⭐

Cara termudah:

1. Double-click icon **Settings** di desktop
2. Klik section **Wallpaper** di sidebar
3. Pilih wallpaper dari gallery (8 pilihan)
4. Desktop langsung berubah dengan smooth transition!

### Mengganti Wallpaper Programmatically

Gunakan Zustand store di `Desktop.jsx`:

```javascript
const wallpapers = {
  default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  ubuntu: "linear-gradient(135deg, #E95420 0%, #772953 100%)",
  arch: "linear-gradient(135deg, #1793D1 0%, #0B4F6C 100%)",
  mint: "linear-gradient(135deg, #87CF3E 0%, #5A9E3A 100%)",
  dark: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
  fedora: "linear-gradient(135deg, #51A2DA 0%, #294172 100%)",
  tux: "linear-gradient(135deg, #F9D71C 0%, #F5A623 100%)",
  geometric: "linear-gradient(135deg, #434343 0%, #000000 100%)",
};

// Tambah wallpaper baru:
// 1. Tambah entry di object wallpapers di atas
// 2. Tambah entry di src/data/apps/settings/settingsData.js
```

### Menambah Aplikasi Baru

1. Buat component di `src/components/Apps/NamaApp/`
2. Register di `App.jsx`:
   ```javascript
   const appRegistry = {
     // ... existing apps
     namaapp: { component: NamaApp, title: "Judul", icon: IconComponent },
   };
   ```
3. Tambahkan icon di `Desktop.jsx` dan `AppLauncher.jsx`

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or your own portfolio.

## 🙏 Credits

- **Linus Torvalds** - Untuk menciptakan Linux
- **React Team** - Framework yang luar biasa
- **Tailwind Labs** - Utility CSS yang powerful
- **Lucide** - Beautiful icon set
- **Open Source Community** - Untuk semua tools dan libraries

---

**Dibuat dengan ❤️ untuk edukasi Linux**

Jelajahi, pelajari, dan nikmati pengalaman Linux dalam browser Anda!
