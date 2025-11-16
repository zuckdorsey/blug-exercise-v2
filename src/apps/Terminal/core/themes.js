const THEME_STORAGE_KEY = "LinuxOnWeb-terminal-theme";

export const themes = {
	monokai: {
		name: "Monokai",
		background: "radial-gradient(circle at top, #2e2b3a, #131218 65%)",
		panel: "rgba(15, 15, 20, 0.85)",
		text: "#f8f8f2",
		muted: "#908f9c",
		accent: "#a6e22e",
		prompt: "#66d9ef",
		cursor: "#fd971f",
		glow: "0 0 40px rgba(166, 226, 46, 0.25)",
	},
	matrix: {
		name: "Matrix",
		background: "linear-gradient(135deg, #021a0d, #011f10 55%, #010b05)",
		panel: "rgba(1, 15, 8, 0.9)",
		text: "#a5ffb3",
		muted: "#4cc171",
		accent: "#00ff7f",
		prompt: "#4cffd7",
		cursor: "#00ff7f",
		glow: "0 0 45px rgba(0, 255, 127, 0.3)",
	},
	nord: {
		name: "Nord",
		background: "linear-gradient(160deg, #1e2330, #151924)",
		panel: "rgba(20, 24, 34, 0.92)",
		text: "#eceff4",
		muted: "#8f97a9",
		accent: "#88c0d0",
		prompt: "#81a1c1",
		cursor: "#bf616a",
		glow: "0 0 30px rgba(136, 192, 208, 0.25)",
	},
	solarized: {
		name: "Solarized",
		background: "linear-gradient(145deg, #073642, #002b36)",
		panel: "rgba(0, 32, 36, 0.92)",
		text: "#fdf6e3",
		muted: "#93a1a1",
		accent: "#b58900",
		prompt: "#cb4b16",
		cursor: "#859900",
		glow: "0 0 35px rgba(181, 137, 0, 0.25)",
	},
};

export const DEFAULT_THEME = "monokai";

export const getTheme = (name) => themes[name] || themes[DEFAULT_THEME];

export const loadThemePreference = () => {
	if (typeof window === "undefined") return DEFAULT_THEME;
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored && themes[stored]) {
			return stored;
		}
	} catch (error) {
		console.warn("Failed to load terminal theme", error);
	}
	return DEFAULT_THEME;
};

export const saveThemePreference = (name) => {
	if (typeof window === "undefined") return;
	if (!themes[name]) return;
	try {
		localStorage.setItem(THEME_STORAGE_KEY, name);
	} catch (error) {
		console.warn("Failed to persist terminal theme", error);
	}
};
