const STORAGE_KEY = "LinuxOnWeb-terminal-history";
const MAX_HISTORY = 300;

const isBrowser = typeof window !== "undefined";

const loadHistory = () => {
	if (!isBrowser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY) : [];
	} catch (error) {
		console.warn("Failed to load terminal history", error);
		return [];
	}
};

const saveHistory = (entries) => {
	if (!isBrowser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_HISTORY)));
	} catch (error) {
		console.warn("Failed to persist terminal history", error);
	}
};

export class HistoryManager {
	constructor(initial = loadHistory()) {
		this.entries = [...initial];
		this.cursor = this.entries.length;
	}

	add(command) {
		if (!command?.trim()) return;
		const last = this.entries[this.entries.length - 1];
		if (last !== command) {
			this.entries.push(command);
			if (this.entries.length > MAX_HISTORY) {
				this.entries.shift();
			}
			saveHistory(this.entries);
		}
		this.cursor = this.entries.length;
	}

	navigate(direction) {
		if (direction === "up") {
			this.cursor = Math.max(0, this.cursor - 1);
		} else if (direction === "down") {
			this.cursor = Math.min(this.entries.length, this.cursor + 1);
		}
		if (this.cursor === this.entries.length) return "";
		return this.entries[this.cursor] || "";
	}

	resetCursor() {
		this.cursor = this.entries.length;
	}

	clear() {
		this.entries = [];
		this.cursor = 0;
		saveHistory(this.entries);
	}

	getAll() {
		return [...this.entries];
	}
}

export const historyManager = new HistoryManager();
