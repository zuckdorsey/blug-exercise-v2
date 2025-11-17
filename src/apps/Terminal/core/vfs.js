import { folderInfo } from "../../../data/apps/fileManager/folderData";

const STORAGE_KEY = "LinuxOnWeb-terminal-vfs";
const DEFAULT_USER = "bill";

const isBrowser = typeof window !== "undefined";

const clone = (value) => JSON.parse(JSON.stringify(value));

const getParentPath = (path) => {
	if (!path || path === "/") return null;
	const segments = path.split("/").filter(Boolean);
	segments.pop();
	return segments.length ? `/${segments.join("/")}` : "/";
};

const getNameFromPath = (path) => {
	if (!path || path === "/") return "/";
	const segments = path.split("/").filter(Boolean);
	return segments[segments.length - 1];
};

const createDirNode = (path, meta = {}) => ({
	type: "dir",
	path,
	name: getNameFromPath(path),
	parent: getParentPath(path),
	children: new Set(),
	files: new Set(),
	meta: {
		description: meta.description || "",
		icon: meta.icon || null,
	},
	createdAt: meta.createdAt || Date.now(),
	updatedAt: meta.updatedAt || Date.now(),
});

const createFileNode = (path, content = "", meta = {}) => ({
	type: "file",
	path,
	name: getNameFromPath(path),
	parent: getParentPath(path),
	content,
	size: content.length,
	meta: {
		description: meta.description || "",
	},
	createdAt: meta.createdAt || Date.now(),
	updatedAt: meta.updatedAt || Date.now(),
});

const serializeState = (state) => {
	const serialized = {};
	state.forEach((value, key) => {
		const node = { ...value };
		if (node.children instanceof Set) node.children = Array.from(node.children);
		if (node.files instanceof Set) node.files = Array.from(node.files);
		serialized[key] = node;
	});
	return serialized;
};

const deserializeState = (payload) => {
	const map = new Map();
	Object.entries(payload).forEach(([key, value]) => {
		map.set(key, {
			...value,
			children: value.children ? new Set(value.children) : new Set(),
			files: value.files ? new Set(value.files) : new Set(),
		});
	});
	return map;
};

const persistState = (state) => {
	if (!isBrowser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState(state)));
	} catch (error) {
		console.warn("Failed to persist VFS state", error);
	}
};

const ensureParentLink = (state, childPath) => {
	const parentPath = getParentPath(childPath);
	if (!parentPath) return;
	const parent = state.get(parentPath) || state.get("/");
	if (parent && parent.children) {
		parent.children.add(childPath);
		parent.updatedAt = Date.now();
	}
};

const bootstrapFromFolderInfo = () => {
	const state = new Map();

	const ensureDir = (path, meta = {}) => {
		if (state.has(path)) return state.get(path);
		const dirNode = createDirNode(path, meta);
		state.set(path, dirNode);
		ensureParentLink(state, path);
		return dirNode;
	};

	const ensureFile = (path, meta = {}) => {
		if (state.has(path)) return state.get(path);
		const content = meta.content || `# ${getNameFromPath(path)}\n${meta.description || ""}`;
		const fileNode = createFileNode(path, content, meta);
		state.set(path, fileNode);
		const parent = state.get(fileNode.parent);
		if (parent) {
			parent.files.add(path);
			parent.updatedAt = Date.now();
		}
		return fileNode;
	};

	ensureDir("/");

	Object.entries(folderInfo).forEach(([path, meta]) => {
		const dirNode = ensureDir(path, meta);
		(meta.children || []).forEach((childPath) => ensureDir(childPath));
		(meta.files || []).forEach((file) => {
			if (!file?.name) return;
			if (file.name.endsWith("/")) {
				const childDirPath = `${path === "/" ? "" : path}/${file.name.replace(/\/$/, "")}`;
				ensureDir(childDirPath, { description: file.description || "" });
			} else {
				const filePath = `${path === "/" ? "" : path}/${file.name}`;
				ensureFile(filePath, { description: file.description || "" });
			}
		});
		dirNode.updatedAt = Date.now();
	});

	// Guarantee user home directories
	const userHome = `/home/${DEFAULT_USER}`;
	ensureDir("/home");
	ensureDir(userHome, { description: "User home" });
	ensureDir(`${userHome}/Documents`);
	ensureDir(`${userHome}/Downloads`);
	ensureFile(`${userHome}/Documents/notes.txt`, { content: "Welcome to your virtual Linux home.\n" });

	return state;
};

const loadState = () => {
	if (!isBrowser) return bootstrapFromFolderInfo();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return bootstrapFromFolderInfo();
		return deserializeState(JSON.parse(raw));
	} catch (error) {
		console.warn("Failed to load VFS state, using defaults", error);
		return bootstrapFromFolderInfo();
	}
};

const state = loadState();

const normalizePath = (cwd, target) => {
	if (!target || target === ".") return cwd;
	if (target === "..") return getParentPath(cwd) || "/";
	let path = target.startsWith("/") ? target : `${cwd === "/" ? "" : cwd}/${target}`;
	const segments = [];
	path.split("/").forEach((part) => {
		if (!part || part === ".") return;
		if (part === "..") {
			segments.pop();
		} else {
			segments.push(part);
		}
	});
	return `/${segments.join("/")}`.replace(/\/+/g, "/") || "/";
};

const getNode = (path) => state.get(path);

const ensureDirectory = (path) => {
	const existing = getNode(path);
	if (existing) {
		if (existing.type !== "dir") throw new Error("Not a directory");
		return existing;
	}
	const dir = createDirNode(path);
	state.set(path, dir);
	ensureParentLink(state, path);
	persistState(state);
	return dir;
};

const writeFile = (path, content = "") => {
	const parentPath = getParentPath(path) || "/";
	const parent = ensureDirectory(parentPath);
	const node = state.get(path);
	if (node && node.type !== "file") {
		throw new Error("Path is a directory");
	}
	const fileNode = node || createFileNode(path);
	fileNode.content = content;
	fileNode.size = content.length;
	fileNode.updatedAt = Date.now();
	state.set(path, fileNode);
	parent.files.add(path);
	parent.updatedAt = Date.now();
	persistState(state);
	return fileNode;
};

const appendFile = (path, content = "") => {
	const node = state.get(path);
	const nextContent = `${node?.content || ""}${content}`;
	return writeFile(path, nextContent);
};

const removePath = (path, recursive = false) => {
	if (path === "/") throw new Error("Cannot remove root");
	const node = state.get(path);
	if (!node) throw new Error("No such file or directory");
	if (node.type === "dir" && node.children.size && !recursive) {
		throw new Error("Directory not empty");
	}
	if (node.type === "dir" && node.children.size && recursive) {
		Array.from(node.children).forEach((child) => removePath(child, true));
		Array.from(node.files).forEach((file) => removePath(file, true));
	}
	const parent = state.get(node.parent);
	if (parent) {
		parent.children.delete(path);
		parent.files.delete(path);
		parent.updatedAt = Date.now();
	}
	state.delete(path);
	persistState(state);
};

const copyPath = (source, destination) => {
	const sourceNode = state.get(source);
	if (!sourceNode) throw new Error("Source not found");
	const destPath = destination.endsWith("/") ? `${destination}${sourceNode.name}` : destination;
	if (state.has(destPath)) throw new Error("Destination exists");
	if (sourceNode.type === "file") {
		const cloned = clone(sourceNode);
		cloned.path = destPath;
		cloned.name = getNameFromPath(destPath);
		cloned.parent = getParentPath(destPath);
		state.set(destPath, cloned);
		ensureDirectory(cloned.parent).files.add(destPath);
	} else {
		const queue = [[sourceNode.path, destPath]];
		while (queue.length) {
			const [src, dst] = queue.shift();
			const node = state.get(src);
			if (node.type === "file") {
				const clonedFile = clone(node);
				clonedFile.path = dst;
				clonedFile.name = getNameFromPath(dst);
				clonedFile.parent = getParentPath(dst);
				state.set(dst, clonedFile);
				ensureDirectory(clonedFile.parent).files.add(dst);
			} else {
						const clonedDir = createDirNode(dst, node.meta);
				state.set(dst, clonedDir);
				ensureDirectory(clonedDir.parent).children.add(dst);
				node.children.forEach((childPath) => {
					queue.push([childPath, `${dst}/${getNameFromPath(childPath)}`]);
				});
				node.files.forEach((filePath) => {
					queue.push([filePath, `${dst}/${getNameFromPath(filePath)}`]);
				});
			}
		}
	}
	persistState(state);
};

const movePath = (source, destination) => {
	copyPath(source, destination);
	removePath(source, true);
};

const listDirectory = (path) => {
	const node = state.get(path);
	if (!node) throw new Error("Directory not found");
	if (node.type !== "dir") throw new Error("Not a directory");
	const dirs = Array.from(node.children).map((childPath) => state.get(childPath));
	const files = Array.from(node.files).map((filePath) => state.get(filePath));
	return [...dirs, ...files].sort((a, b) => a.name.localeCompare(b.name));
};

const readFile = (path) => {
	const node = state.get(path);
	if (!node || node.type !== "file") throw new Error("File not found");
	return node.content;
};

const formatTree = (path = "/", prefix = "") => {
	const node = state.get(path);
	if (!node || node.type !== "dir") return "";
	let output = `${prefix}${node === state.get("/") ? "/" : node.name}\n`;
	const entries = [
		...Array.from(node.children).map((childPath) => state.get(childPath)),
		...Array.from(node.files).map((filePath) => state.get(filePath)),
	].sort((a, b) => a.name.localeCompare(b.name));

	entries.forEach((entry, index) => {
		const isLast = index === entries.length - 1;
		const childPrefix = `${prefix}${isLast ? "└── " : "├── "}`;
		if (entry.type === "file") {
			output += `${childPrefix}${entry.name}\n`;
		} else {
			output += `${childPrefix}${entry.name}\n`;
			output += formatTree(entry.path, `${prefix}${isLast ? "    " : "│   "}`);
		}
	});
	return output;
};

export const vfs = {
	resolve: normalizePath,
	list: listDirectory,
	readFile,
	writeFile,
	appendFile,
	remove: removePath,
	mkdir: ensureDirectory,
	copy: copyPath,
	move: movePath,
	tree: formatTree,
	exists: (path) => state.has(path),
	isDirectory: (path) => state.get(path)?.type === "dir",
	isFile: (path) => state.get(path)?.type === "file",
	getNode: (path) => state.get(path),
	describe: listDirectory,
	snapshot: () => deserializeState(serializeState(state)),
	reset: () => {
		const fresh = bootstrapFromFolderInfo();
		state.clear();
		fresh.forEach((value, key) => state.set(key, value));
		persistState(state);
	},
};

export { normalizePath };
