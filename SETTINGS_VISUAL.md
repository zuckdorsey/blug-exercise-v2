# Settings App - Visual Structure

## 🖼️ UI Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ● ● ●  Settings                                            - □ ✕ │ ← macOS Window Header
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┬───────────────────────────────────────────┐  │
│  │              │                                            │  │
│  │   SIDEBAR    │          MAIN CONTENT AREA                │  │
│  │              │                                            │  │
│  │  Settings    │   ┌─────────────────────────────────┐     │  │
│  │  Customize   │   │  CURRENT WALLPAPER PREVIEW      │     │  │
│  │              │   │                                  │     │  │
│  │ ┌──────────┐ │   │  [Large Gradient Preview]       │     │  │
│  │ │Appearance│ │   │                                  │     │  │
│  │ │Coming... │ │   │  Default Gradient                │     │  │
│  │ └──────────┘ │   │  Purple gradient - default theme │     │  │
│  │              │   └─────────────────────────────────┘     │  │
│  │ ┌──────────┐ │                                            │  │
│  │ │Wallpaper │ │   Choose Wallpaper                        │  │
│  │ │✓ ACTIVE  │ │   ┌────┬────┬────┐                       │  │
│  │ │[BLUE BG] │ │   │ ✓  │    │    │  ← Wallpaper Grid     │  │
│  │ └──────────┘ │   │DEF │UBU │ARC │                        │  │
│  │              │   ├────┼────┼────┤                        │  │
│  │ ┌──────────┐ │   │    │    │    │                        │  │
│  │ │  About   │ │   │MINT│DARK│FED │                        │  │
│  │ │   Info   │ │   ├────┼────┼────┤                        │  │
│  │ └──────────┘ │   │    │    │    │                        │  │
│  │              │   │TUX │GEO │    │                        │  │
│  │              │   └────┴────┴────┘                        │  │
│  │              │                                            │  │
│  │              │   💡 Tip: Click any wallpaper to apply    │  │
│  │              │      Changes are visible across all       │  │
│  │              │      windows.                              │  │
│  │  🐧 Linux    │                                            │  │
│  │  WebOS v1.0  │                                            │  │
│  └──────────────┴───────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Wallpaper Thumbnail Card

```
┌──────────────────────┐
│  ✓                   │ ← Checkmark (if active)
│                      │
│  [Gradient Preview]  │ ← Live gradient background
│                      │
│ ─────────────────── │
│ Default Gradient     │ ← Wallpaper name
│ Purple gradient...   │ ← Description
└──────────────────────┘
     ↑
  Click to apply
```

### States:

**Inactive:**

```
┌──────────────────────┐
│                      │
│  [Ubuntu Orange]     │
│                      │
│ ─────────────────── │
│ Ubuntu Orange        │
│ Warm orange to...    │
└──────────────────────┘
```

**Hover:**

```
┌──────────────────────┐ ← Slight scale (1.05x)
│  [Gray ring border]  │ ← Gray ring appears
│  [Ubuntu Orange]     │
│  Ubuntu Orange  ←─┐  │ ← Name overlay on gradient
│                   │  │
│ ─────────────────── │
│ Ubuntu Orange        │
│ Warm orange to...    │
└──────────────────────┘
```

**Active:**

```
┌═════════════════════┐ ← Blue ring (2px, solid)
║  ✓ [Checkmark]      ║ ← Blue checkmark icon
║                     ║
║  [Ubuntu Orange]    ║
║                     ║
║ ─────────────────── ║
║ Ubuntu Orange       ║ ← Bold text
║ Warm orange to...   ║
└═════════════════════┘
```

## 📱 Responsive Layouts

### Desktop (> 768px)

```
┌─────────────────────────────────────────┐
│ Sidebar (224px)  │  Content (flex-1)    │
│                  │                       │
│  3 sections      │  3-column grid       │
│  Large icons     │  Larger thumbnails   │
└─────────────────────────────────────────┘
```

### Tablet (481px - 768px)

```
┌───────────────────────────────────┐
│ Sidebar (192px) │  Content        │
│                 │                  │
│  3 sections     │  2-column grid  │
│  Medium icons   │  Med thumbnails │
└───────────────────────────────────┘
```

### Mobile (< 480px)

```
┌─────────────────────────┐
│ Side │  Content         │
│(192) │                  │
│      │  2-col grid      │
│  3   │  Compact         │
│      │  Large taps      │
└─────────────────────────┘
```

## 🎯 Interaction Flow

```
Desktop Icon/App Launcher
         ↓
   Click to Open
         ↓
┌─────────────────────┐
│  Settings Window    │
│  Opens with         │
│  Wallpaper section  │
│  active by default  │
└─────────────────────┘
         ↓
   User browses grid
         ↓
  Hovers over thumbnail
         ↓
┌─────────────────────┐
│  Scale animation    │
│  Name overlay       │
│  Gray ring          │
└─────────────────────┘
         ↓
   User clicks
         ↓
┌─────────────────────┐
│  setWallpaper(id)   │ ← Zustand action
└─────────────────────┘
         ↓
┌─────────────────────┐
│  Store updates      │
│  wallpaper = id     │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  Desktop re-renders │
│  Reads new wallpaper│
└─────────────────────┘
         ↓
┌─────────────────────┐
│  CSS Transition     │
│  500ms fade         │
└─────────────────────┘
         ↓
    DESKTOP UPDATED! ✨
```

## 🎨 Color Scheme

### Sidebar

- Background: `bg-gray-50`
- Border: `border-gray-200`
- Header text: `text-gray-800`
- Inactive section: `text-gray-700`, `hover:bg-gray-100`
- Active section: `bg-blue-500`, `text-white`

### Main Content

- Background: `bg-white`
- Preview border: `border-gray-200`
- Preview shadow: `shadow-lg`
- Info box: `bg-blue-50`, `border-blue-200`, `text-blue-800`

### Wallpaper Cards

- Border (inactive): `border-gray-100`
- Border (hover): `ring-2 ring-gray-300`
- Border (active): `ring-2 ring-blue-500 ring-offset-2`
- Checkmark bg: `bg-blue-500`
- Checkmark text: `text-white`

## 📊 Component Hierarchy

```
SettingsApp.jsx
│
├─ Sidebar (div)
│  ├─ Header
│  │  ├─ Title: "Settings"
│  │  └─ Subtitle: "Customize your WebOS"
│  │
│  ├─ Navigation (nav)
│  │  ├─ Section Button: Appearance
│  │  │  ├─ Icon (Palette)
│  │  │  ├─ Name
│  │  │  └─ Description
│  │  │
│  │  ├─ Section Button: Wallpaper [ACTIVE]
│  │  │  ├─ Icon (Image)
│  │  │  ├─ Name
│  │  │  ├─ Description
│  │  │  └─ ChevronRight
│  │  │
│  │  └─ Section Button: About
│  │     ├─ Icon (Info)
│  │     ├─ Name
│  │     └─ Description
│  │
│  └─ Footer
│     └─ Version text
│
└─ Main Content (div)
   └─ renderContent() → WallpaperPicker.jsx
      │
      ├─ Preview Section
      │  └─ Current Wallpaper Card
      │     ├─ Gradient background
      │     ├─ Name overlay
      │     └─ Description
      │
      ├─ Gallery Section
      │  ├─ Title: "Choose Wallpaper"
      │  └─ Grid (2-3 cols responsive)
      │     ├─ Wallpaper Card 1 (Default) ✓
      │     ├─ Wallpaper Card 2 (Ubuntu)
      │     ├─ Wallpaper Card 3 (Arch)
      │     ├─ Wallpaper Card 4 (Mint)
      │     ├─ Wallpaper Card 5 (Dark)
      │     ├─ Wallpaper Card 6 (Fedora)
      │     ├─ Wallpaper Card 7 (Tux)
      │     └─ Wallpaper Card 8 (Geometric)
      │
      └─ Info Footer
         └─ Tip message
```

## 🔄 State Management

```
Zustand Store (windowStore.js)
│
├─ State
│  └─ wallpaper: "default"
│
└─ Actions
   └─ setWallpaper: (id) => set({ wallpaper: id })

Used by:
├─ Desktop.jsx (reads wallpaper)
└─ WallpaperPicker.jsx (reads + writes wallpaper)
```

## 🎭 Animation Timeline

```
User clicks wallpaper
    ↓
    0ms - State updates instantly
    ↓
    0ms - Desktop component re-renders
    ↓
    0ms - New gradient applied to style
    ↓
    0-500ms - CSS transition: background
               duration: 500ms
               easing: ease (default)
    ↓
    500ms - Animation complete
    ↓
    Final state: New wallpaper visible
```

## 📏 Dimensions

### Sidebar

- Width (desktop): `224px` (w-56)
- Width (mobile): `192px` (w-48)
- Padding: `0.5rem` (p-2)
- Section button height: Auto (py-2.5)

### Wallpaper Cards

- Grid gap: `12px` (gap-3)
- Aspect ratio: `16:9` (aspect-video)
- Border radius: `8px` (rounded-lg)
- Hover scale: `1.05` (scale-105)
- Ring width (active): `2px`
- Ring offset: `2px`

### Preview Area

- Height: `128px` (h-32)
- Border radius: `8px` (rounded-lg)
- Shadow: `shadow-lg`
- Border width: `2px`

### Checkmark Icon

- Size: `12px` (w-3 h-3)
- Background: Blue 500
- Padding: `4px` (p-1)
- Border radius: `9999px` (rounded-full)
- Position: `top-2 right-2`

---

**Visual Documentation Complete! 🎨**

For code implementation, see: `SETTINGS_APP.md`  
For user instructions, see: `SETTINGS_GUIDE.md`
