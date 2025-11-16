import { create } from "zustand";

// Load wallpaper from localStorage
const loadWallpaperFromStorage = () => {
  try {
    const savedWallpaper = localStorage.getItem("webos-wallpaper");
    const savedCustomWallpaper = localStorage.getItem("webos-custom-wallpaper");
    return {
      wallpaper: savedWallpaper || "default",
      customWallpaper: savedCustomWallpaper || null,
    };
  } catch (error) {
    console.error("Failed to load wallpaper from localStorage:", error);
    return {
      wallpaper: "default",
      customWallpaper: null,
    };
  }
};

// Save wallpaper to localStorage
const saveWallpaperToStorage = (wallpaper, customWallpaper) => {
  try {
    localStorage.setItem("webos-wallpaper", wallpaper);
    if (customWallpaper) {
      localStorage.setItem("webos-custom-wallpaper", customWallpaper);
    } else {
      localStorage.removeItem("webos-custom-wallpaper");
    }
  } catch (error) {
    console.error("Failed to save wallpaper to localStorage:", error);
  }
};

const initialWallpaper = loadWallpaperFromStorage();

const loadBootStateFromSession = () => {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem("webos-has-booted") === "true";
  } catch (error) {
    console.error("Failed to load boot state from sessionStorage:", error);
    return false;
  }
};

const saveBootStateToSession = (value) => {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      sessionStorage.setItem("webos-has-booted", "true");
    } else {
      sessionStorage.removeItem("webos-has-booted");
    }
  } catch (error) {
    console.error("Failed to save boot state to sessionStorage:", error);
  }
};

const useStore = create((set, get) => ({
  // Window management
  windows: [],
  maxZIndex: 1000,
  activeWindowId: null,

  openWindow: (appId, options = {}) => {
    const existing = get().windows.find((w) => w.id === appId);
    if (existing) {
      // Bring to front and restore if minimized
      set((state) => ({
        windows: state.windows.map((w) =>
          w.id === appId
            ? { ...w, minimized: false, zIndex: state.maxZIndex + 1 }
            : w
        ),
        maxZIndex: state.maxZIndex + 1,
        activeWindowId: appId,
      }));
    } else {
      // Create new window with optional overrides
      const MENU_BAR_HEIGHT = 40;
      const DOCK_HEIGHT = 48;
      const defaultConfig = {
        id: appId,
        minimized: false,
        maximized: false,
        zIndex: get().maxZIndex + 1,
        position: {
          x: 100 + get().windows.length * 30,
          y: MENU_BAR_HEIGHT + 40 + get().windows.length * 30, // Start below menu bar with 40px offset
        },
        size: { width: 700, height: 500 },
        minSize: { width: 400, height: 300 },
        maxSize: { width: window.innerWidth, height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT },
      };

      set((state) => ({
        windows: [...state.windows, { ...defaultConfig, ...options }],
        maxZIndex: state.maxZIndex + 1,
        activeWindowId: appId,
      }));
    }
  },

  closeWindow: (appId) => {
    set((state) => {
      const remainingWindows = state.windows.filter((w) => w.id !== appId);
      const hasMaximizedWindow = remainingWindows.some(w => w.maximized);
      
      return {
        windows: remainingWindows,
        activeWindowId: state.activeWindowId === appId ? null : state.activeWindowId,
        isFullscreenMode: hasMaximizedWindow,
      };
    });
  },

  minimizeWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, minimized: true } : w
      ),
      activeWindowId: state.activeWindowId === appId ? null : state.activeWindowId,
    }));
  },

  toggleMaximize: (appId) => {
    set((state) => {
      const window = state.windows.find((w) => w.id === appId);
      if (!window) return state;

      const newMaximized = !window.maximized;
      
      // Update fullscreen mode based on any window being maximized
      const hasMaximizedWindow = newMaximized || state.windows.some(w => w.id !== appId && w.maximized);
      
      return {
        windows: state.windows.map((w) =>
          w.id === appId
            ? {
                ...w,
                maximized: newMaximized,
                // Store pre-maximize state
                ...(newMaximized
                  ? { preMaximize: { position: w.position, size: w.size } }
                  : {
                      position: w.preMaximize?.position || w.position,
                      size: w.preMaximize?.size || w.size,
                    }),
              }
            : w
        ),
        isFullscreenMode: hasMaximizedWindow,
      };
    });
  },

  focusWindow: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, zIndex: state.maxZIndex + 1 } : w
      ),
      maxZIndex: state.maxZIndex + 1,
      activeWindowId: appId,
    }));
  },

  updateWindowPosition: (appId, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (appId, size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === appId ? { ...w, size } : w)),
    }));
  },

  updateWindowRect: (appId, rect) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === appId
          ? {
              ...w,
              position: { x: rect.x, y: rect.y },
              size: { width: rect.width, height: rect.height },
            }
          : w
      ),
    }));
  },

  // Desktop theme
  wallpaper: initialWallpaper.wallpaper,
  customWallpaper: initialWallpaper.customWallpaper,
  setWallpaper: (name) => {
    set({ wallpaper: name, customWallpaper: null });
    saveWallpaperToStorage(name, null);
  },
  setCustomWallpaper: (imageUrl) => {
    set({ wallpaper: "custom", customWallpaper: imageUrl });
    saveWallpaperToStorage("custom", imageUrl);
  },

  // Control Center
  isControlCenterOpen: false,
  toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen })),
  closeControlCenter: () => set({ isControlCenterOpen: false }),
  
  // System settings
  darkMode: false,
  brightness: 80,
  volume: 50,
  wifiEnabled: true,
  bluetoothEnabled: true,
  doNotDisturb: false,
  powerMode: "balanced", // "performance" | "balanced" | "low"
  soundEnabled: true,
  
  setDarkMode: (value) => set({ darkMode: value }),
  setBrightness: (value) => set({ brightness: Math.max(0, Math.min(100, value)) }),
  setVolume: (value) => set({ volume: Math.max(0, Math.min(100, value)) }),
  toggleWifi: () => set((state) => ({ wifiEnabled: !state.wifiEnabled })),
  toggleBluetooth: () => set((state) => ({ bluetoothEnabled: !state.bluetoothEnabled })),
  toggleDoNotDisturb: () => set((state) => ({ doNotDisturb: !state.doNotDisturb })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setPowerMode: (mode) => set({ powerMode: mode }),

  // System lifecycle
  hasBooted: loadBootStateFromSession(),
  setHasBooted: (value) => {
    saveBootStateToSession(value);
    set({ hasBooted: value });
  },
  resetBootState: () => {
    saveBootStateToSession(false);
    set({ hasBooted: false, isLocked: true });
  },
  isLocked: true,
  unlock: () => set({ isLocked: false }),
  lock: () => set({ isLocked: true }),

  // App launcher menu
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  
  // Fullscreen auto-hide behavior
  isFullscreenMode: false,
  isTopBarVisible: true,
  isDockVisible: true,
  setTopBarVisible: (visible) => set({ isTopBarVisible: visible }),
  setDockVisible: (visible) => set({ isDockVisible: visible }),
}));

export default useStore;
