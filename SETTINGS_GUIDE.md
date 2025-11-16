# 🎨 Settings App - User Guide

## How to Access Settings

### Method 1: Desktop Icon

1. Locate the **Settings** icon on the desktop (gear icon, bottom of icon column)
2. **Double-click** the icon
3. Settings window opens

### Method 2: App Launcher

1. Click the **app launcher icon** on the taskbar (bottom-left)
2. Find **Settings** in the application grid
3. **Click** to open

---

## 🖼️ Changing Desktop Wallpaper

### Step-by-Step:

1. **Open Settings** (see above)
2. **Navigate to Wallpaper**

   - The sidebar shows 3 sections
   - **Wallpaper** should be active by default (blue background)
   - If not, click "Wallpaper" in the sidebar

3. **Preview Current Wallpaper**

   - Top of the window shows a large preview
   - Displays: Current wallpaper name and description
   - Example: "Default Gradient - Purple gradient - default theme"

4. **Browse Wallpaper Gallery**

   - Scroll down to see 8 wallpaper options
   - Grid layout (2 columns on mobile, 3 on desktop)
   - Each thumbnail shows:
     - Live preview of the gradient
     - Wallpaper name
     - Short description

5. **Select Wallpaper**

   - **Click** any wallpaper thumbnail
   - Desktop background changes **instantly**
   - Smooth fade transition (500ms)
   - Selected wallpaper gets:
     - ✅ Blue checkmark icon (top-right)
     - 🔵 Blue ring border
     - Highlighted in preview area

6. **See Changes Immediately**
   - Look at desktop background behind windows
   - All windows remain functional
   - No page reload required

---

## 🎨 Available Wallpapers

| ID          | Name             | Description                     | Preview                  |
| ----------- | ---------------- | ------------------------------- | ------------------------ |
| `default`   | Default Gradient | Purple gradient - default theme | Purple → Violet          |
| `ubuntu`    | Ubuntu Orange    | Warm orange to purple gradient  | Orange → Purple          |
| `arch`      | Arch Blue        | Cool blue ocean gradient        | Light Blue → Dark Blue   |
| `mint`      | Linux Mint       | Fresh green gradient            | Light Green → Dark Green |
| `dark`      | Dark AMOLED      | Pure dark theme                 | Very Dark Gray → Black   |
| `fedora`    | Fedora Blue      | Fedora signature blue           | Cyan Blue → Navy         |
| `tux`       | Tux Yellow       | Linux Tux golden theme          | Bright Yellow → Orange   |
| `geometric` | Minimalist Geo   | Sleek dark geometric            | Medium Gray → Black      |

---

## 🧭 Settings Sections

### 1. Appearance (Coming Soon)

- Theme switching (light/dark mode)
- Accent color picker
- Font size adjustments
- Window transparency controls

**Current Status**: Placeholder with "Coming soon..." message

### 2. Wallpaper ✅ (Active)

- Gallery of 8 wallpapers
- Live preview
- Instant application
- Visual feedback

**Current Status**: Fully functional

### 3. About

- WebOS version info
- Technology stack
- System information

**Current Status**: Informational display

---

## 💡 Tips & Tricks

### Quick Selection

- **Hover** over any wallpaper to see name in overlay
- **Scale animation** on hover for better visibility
- Active wallpaper always marked with checkmark

### Keyboard Navigation

- Use **Tab** key to navigate between wallpapers
- Use **Enter** key to select focused wallpaper
- Settings window supports all standard window shortcuts:
  - **Arrow keys** to move window
  - **Alt + Arrow keys** to resize
  - **ESC** to stop drag/resize

### Mobile Usage

- Gallery automatically adjusts to 2 columns on small screens
- Tap any wallpaper thumbnail to select
- Sidebar remains accessible
- All features work on touch devices

### Performance

- Wallpapers use **CSS gradients** (no images to load)
- Changes apply **instantly** (no network requests)
- **Smooth transitions** via GPU acceleration
- Zero impact on other windows

---

## 🔧 Troubleshooting

### Wallpaper Not Changing?

1. Make sure you **clicked** the thumbnail (not just hovered)
2. Check if the wallpaper has a **blue ring** and **checkmark**
3. Look at the **preview area** - it should update
4. Try clicking a different wallpaper to confirm it's working

### Settings Window Won't Open?

1. Make sure dev server is running
2. Check browser console for errors (F12)
3. Try opening from **App Launcher** instead of desktop icon
4. Refresh the page (Ctrl/Cmd + R)

### Window Stuck or Frozen?

1. Press **ESC** to cancel any drag/resize operation
2. Click the **minimize** button (yellow)
3. Re-open Settings from app launcher
4. If still stuck, refresh the page

---

## 🎯 Feature Highlights

### ✨ What Makes It Special

1. **Real-time Updates**

   - No page reload
   - No loading spinners
   - Instant visual feedback

2. **Professional UI**

   - macOS-inspired design
   - Smooth animations
   - Intuitive navigation

3. **Full Integration**

   - Works with all window features
   - Compatible with drag & resize
   - Mobile responsive

4. **Performance**

   - Lightweight (CSS only)
   - 60fps transitions
   - Zero network overhead

5. **Extensible**
   - Easy to add more wallpapers
   - Placeholder sections for future features
   - Clean, maintainable code

---

## 📱 Responsive Design

### Desktop (> 768px)

- Sidebar: 224px width
- Wallpaper grid: 3 columns
- Large preview: Full width
- Hover effects: Scale + ring

### Tablet (481px - 768px)

- Sidebar: 192px width
- Wallpaper grid: 2 columns
- Medium preview
- Touch-friendly tap targets

### Mobile (< 480px)

- Sidebar: 192px width
- Wallpaper grid: 2 columns
- Compact preview
- Large tap targets

---

## 🚀 Advanced Usage

### For Developers

**Change Wallpaper Programmatically:**

```javascript
import useStore from "./store/windowStore";

// In your component
const setWallpaper = useStore((state) => state.setWallpaper);

// Call it
setWallpaper("ubuntu"); // Change to Ubuntu wallpaper
```

**Get Current Wallpaper:**

```javascript
const currentWallpaper = useStore((state) => state.wallpaper);
console.log(currentWallpaper); // e.g., "default"
```

**Add New Wallpaper:**

1. Add to `Desktop.jsx` wallpapers object
2. Add to `settingsData.js` wallpapers array
3. Restart dev server

---

## ❓ FAQ

**Q: Can I upload custom wallpapers?**  
A: Not yet - coming in future update!

**Q: Does wallpaper persist after refresh?**  
A: No - state resets on page reload. LocalStorage persistence coming soon.

**Q: Can I have different wallpapers for different workspaces?**  
A: Single desktop only at the moment.

**Q: Will more themes be added?**  
A: Yes! We plan to add 10+ more gradients and image-based wallpapers.

**Q: Does changing wallpaper affect performance?**  
A: No - minimal impact. Transitions are GPU-accelerated.

---

**Happy Customizing! 🎨**

For detailed technical documentation, see: `SETTINGS_APP.md`
