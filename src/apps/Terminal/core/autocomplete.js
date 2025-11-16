import { AVAILABLE_COMMANDS } from "./commands";
import { normalizePath, vfs } from "./vfs";

const commandDescriptions = {
	help: "Show command list",
	clear: "Clear the terminal",
	ls: "List directory contents",
	cd: "Change directory",
	cat: "Display file contents",
	mkdir: "Create directory",
	rm: "Remove files",
	apt: "APT package manager",
	pacman: "Pacman package manager",
	theme: "List or set theme",
	matrix: "Spawn Matrix overlay",
	open: "Open apps",
	play: "Stream mp3",
	pwd: "Print current directory",
	history: "Show history",
};

const splitPathToken = (token) => {
	const lastSlash = token.lastIndexOf("/");
	if (lastSlash === -1) {
		return { prefix: "", partial: token };
	}
	return {
		prefix: token.slice(0, lastSlash + 1),
		partial: token.slice(lastSlash + 1),
	};
};

const getDirectoryEntries = (basePath) => {
	try {
		return vfs.list(basePath);
	} catch {
		return [];
	}
};

export const getAutocompleteSuggestions = (input, cwd) => {
	const endsWithSpace = /\s$/.test(input);
	const trimmedRight = input.replace(/\s+$/, "");
	const tokens = trimmedRight ? trimmedRight.split(/\s+/) : [];
	const hasCommand = tokens.length > 0;
	const isCommandPosition = !hasCommand || (tokens.length === 1 && !input.includes(" "));
	const activeToken = isCommandPosition
		? tokens[0] || ""
		: endsWithSpace
		? ""
		: tokens[tokens.length - 1] || "";
	const tokenStart = input.length - activeToken.length;

	if (isCommandPosition) {
		const lower = activeToken.toLowerCase();
		const suggestions = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(lower)).map((cmd) => ({
			value: cmd,
			label: cmd,
			type: "command",
			description: commandDescriptions[cmd] || "",
		}));
		return {
			suggestions,
			token: activeToken,
			tokenStart,
			context: "command",
		};
	}

	const subjectToken = activeToken;
	const { prefix, partial } = splitPathToken(subjectToken);
	let basePath = cwd;
	try {
		basePath = normalizePath(cwd, prefix || ".");
	} catch {
		basePath = cwd;
	}
	const entries = getDirectoryEntries(basePath);
	const lowerPartial = partial.toLowerCase();
	const matches = entries
		.filter((entry) => entry.name.toLowerCase().startsWith(lowerPartial))
		.sort((a, b) => {
			if (a.type === b.type) return a.name.localeCompare(b.name);
			return a.type === "dir" ? -1 : 1;
		})
		.map((entry) => ({
			value: `${prefix}${entry.name}${entry.type === "dir" ? "/" : ""}`,
			label: entry.type === "dir" ? `${entry.name}/` : entry.name,
			type: entry.type,
			description: entry.type === "dir" ? "directory" : "file",
		}));

	if (!partial && prefix === "") {
		matches.unshift(
			{ value: "./", label: "./", type: "dir", description: "current directory" },
			{ value: "../", label: "../", type: "dir", description: "parent directory" }
		);
	}

	return {
		suggestions: matches,
		token: subjectToken,
		tokenStart,
		context: "path",
	};
};
