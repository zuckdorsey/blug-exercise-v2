import { vfs, normalizePath } from "./vfs";
import { themes } from "./themes";
import { historyManager } from "./history";

export const AVAILABLE_COMMANDS = [
  "help",
  "clear",
  "pwd",
  "ls",
  "cd",
  "cat",
  "echo",
  "head",
  "tail",
  "mkdir",
  "touch",
  "rm",
  "cp",
  "mv",
  "tree",
  "history",
  "uname",
  "whoami",
  "id",
  "ps",
  "df",
  "free",
  "top",
  "kill",
  "apt",
  "pacman",
  "theme",
  "matrix",
  "open",
  "play",
  "ping",
  "curl",
  "nano",
];

const formatPermissions = (node) => {
  const perm = node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
  const size = String(node.size || 0).padStart(4);
  const date = new Date(node.updatedAt).toLocaleString();
  return `${perm} 1 bill users ${size} ${date} ${node.name}`;
};

const fakeProcesses = () => `PID   USER   CPU  MEM  COMMAND
101   root   1.2  0.8  systemd
234   bill   5.1  1.3  gnome-shell
544   bill   0.3  0.6  LinuxOnWeb-Terminal
880   bill   8.4  2.5  FileManager
993   bill   0.9  0.7  code-server`;

const pingOutput = (host) => `PING ${host} (93.184.216.34) 56(84) bytes of data.
64 bytes from example.org: icmp_seq=1 ttl=52 time=21.3 ms
64 bytes from example.org: icmp_seq=2 ttl=52 time=20.8 ms
64 bytes from example.org: icmp_seq=3 ttl=52 time=21.1 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max = 20.8/21.1/21.3 ms`;

const curlOutput = (url) => `<!doctype html>
<html>
  <head>
    <title>LinuxOnWeb</title>
  </head>
  <body>
    <h1>Simulated response from ${url}</h1>
    <p>This is a mock HTML response rendered by the terminal.</p>
  </body>
</html>`;

const packageInstall = (manager, pkg) => {
  if (!pkg) return `${manager}: missing package name`;
  return `${manager} installing packages...
Selecting previously unselected package ${pkg}.
Preparing to unpack ...
Setting up ${pkg} (1.0.0) ...
${pkg} installed successfully.`;
};

const systemInfo = {
	uname: () => "Linux LinuxOnWeb-kernel 6.6.12-LinuxOnWeb #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
	whoami: () => "bill",
	id: () => "uid=1000(bill) gid=1000(bill) groups=1000(bill),27(sudo)",
	ps: fakeProcesses,
	df: () => `Filesystem      Size  Used Avail Use%
/dev/root        100G   42G   55G  44%
tmpfs             16G     0   16G   0%
/dev/sdb1        500G  120G  355G  26%`,
	free: () => `              total        used        free      shared  buff/cache   available
Mem:           16021        5934        8120         430        1956        9367
Swap:           2048           0        2048`,
};

const formatTreeOutput = (path) => vfs.tree(path).trim();

const helpText = `Available commands (type \`theme list\` to view themes):
${AVAILABLE_COMMANDS.filter((cmd) => cmd !== "theme").join(", ")}
theme list - view themes
theme set <name> - switch theme
Use sudo <command> for privileged actions.`;

export const createCommandHandlers = ({
  getCwd,
  setCwd,
  print,
  setTheme,
  promptPassword,
  openMatrix,
  playAudio,
  openFileManager,
}) => {
  const safeCall = (fn, ...args) => (typeof fn === "function" ? fn(...args) : undefined);
  const resolve = (target) => normalizePath(getCwd(), target);

  const runWithSudo = async (cmd, args) => {
    const password = await safeCall(promptPassword);
    if (!password) {
      print("sudo: authentication failed");
      return null;
    }
    print("[sudo] password accepted.");
    return executeCommand(cmd, args);
  };

  const executeCommand = async (cmd, args) => {
    switch (cmd) {
      case "clear":
        return "__clear__";
      case "help":
        print(helpText);
        break;
      case "pwd":
        print(getCwd());
        break;
      case "ls": {
        const long = args.includes("-la") || args.includes("-l");
        const target = args.find((arg) => !arg.startsWith("-"));
        const path = resolve(target || ".");
        try {
          const entries = vfs.list(path);
          if (!entries.length) {
            print("");
            break;
          }
          if (long) {
            entries.forEach((entry) => print(formatPermissions(entry)));
          } else {
            print(entries.map((entry) => (entry.type === "dir" ? `${entry.name}/` : entry.name)).join("  "));
          }
        } catch (error) {
          print(`ls: ${target || '.'}: ${error.message}`);
        }
        break;
      }
      case "cd": {
        const target = args[0] || "/home/bill";
        const destination = resolve(target);
        const node = vfs.getNode(destination);
        if (!node || node.type !== "dir") {
          print(`bash: cd: ${target}: No such directory`);
        } else {
          setCwd(destination);
        }
        break;
      }
      case "cat": {
        const target = args[0];
        if (!target) {
          print("cat: missing file operand");
          break;
        }
        try {
          const content = vfs.readFile(resolve(target));
          print(content || "");
        } catch (error) {
          print(`cat: ${target}: ${error.message}`);
        }
        break;
      }
      case "echo": {
        const join = args.join(" ");
        const redirectMatch = join.match(/(.+?)\s*>\s*(.+)/);
        if (redirectMatch) {
          const [, text, dest] = redirectMatch;
          vfs.writeFile(resolve(dest.trim()), `${text.trim()}\n`);
        } else {
          print(join);
        }
        break;
      }
      case "head":
      case "tail": {
        const target = args[args.length - 1];
        const lines = 10;
        try {
          const content = vfs.readFile(resolve(target)).split("\n");
          const output = cmd === "head" ? content.slice(0, lines) : content.slice(-lines);
          print(output.join("\n"));
        } catch (error) {
          print(`${cmd}: ${target}: ${error.message}`);
        }
        break;
      }
      case "mkdir": {
        const target = args[0];
        if (!target) {
          print("mkdir: missing operand");
          break;
        }
        try {
          vfs.mkdir(resolve(target));
        } catch (error) {
          print(`mkdir: ${error.message}`);
        }
        break;
      }
      case "touch": {
        const target = args[0];
        if (!target) {
          print("touch: missing file operand");
          break;
        }
        const absolute = resolve(target);
        const existing = vfs.getNode(absolute);
        if (existing && existing.type === "dir") {
          print("touch: cannot create file inside directory path");
          break;
        }
        const content = existing && existing.type === "file" ? existing.content || "" : "";
        vfs.writeFile(absolute, content);
        break;
      }
      case "rm": {
        const recursive = args.includes("-r") || args.includes("-rf");
        const target = args.find((arg) => !arg.startsWith("-"));
        if (!target) {
          print("rm: missing operand");
          break;
        }
        try {
          vfs.remove(resolve(target), recursive);
        } catch (error) {
          print(`rm: ${error.message}`);
        }
        break;
      }
      case "cp": {
        if (args.length < 2) {
          print("cp: missing file operand");
          break;
        }
        const [source, destination] = [resolve(args[0]), resolve(args[1])];
        try {
          vfs.copy(source, destination);
        } catch (error) {
          print(`cp: ${error.message}`);
        }
        break;
      }
      case "mv": {
        if (args.length < 2) {
          print("mv: missing file operand");
          break;
        }
        const [source, destination] = [resolve(args[0]), resolve(args[1])];
        try {
          vfs.move(source, destination);
        } catch (error) {
          print(`mv: ${error.message}`);
        }
        break;
      }
      case "tree": {
        const target = args[0] ? resolve(args[0]) : getCwd();
        print(formatTreeOutput(target));
        break;
      }
      case "history": {
        const history = historyManager.getAll();
        if (!history.length) {
          print("No history yet");
        } else {
          history.forEach((entry, index) => print(`${index + 1}  ${entry}`));
        }
        break;
      }
      case "uname":
      case "whoami":
      case "id":
      case "ps":
      case "df":
      case "free": {
        const key = cmd === "uname" ? "uname" : cmd;
        const fn = systemInfo[key];
        print(fn ? fn() : "Command not implemented");
        break;
      }
      case "top":
        print(`top - 11:42:17 up 2 days,  3:32,  2 users,  load average: 0.42, 0.40, 0.38
Tasks: 286 total,   1 running, 285 sleeping,   0 stopped,   0 zombie
%Cpu(s):  7.4 us,  3.3 sy,  0.0 ni, 88.6 id,  0.4 wa,  0.0 hi,  0.3 si,  0.0 st
MiB Mem :  16021 total,   5934 free,   8120 used,   1956 buff/cache

${fakeProcesses()}`);
        break;
      case "apt": {
        if (args[0] === "update") {
          print("Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done");
        } else if (args[0] === "install") {
          print(packageInstall("APT", args[1]));
        } else {
          print("Usage: apt update | apt install <package>");
        }
        break;
      }
      case "pacman": {
        if (args[0] === "-S") {
          print(packageInstall("Pacman", args[1]));
        } else {
          print("Usage: pacman -S <package>");
        }
        break;
      }
      case "theme": {
        if (args[0] === "list") {
          print(Object.keys(themes).join("\n"));
        } else if (args[0] === "set" && args[1]) {
          if (themes[args[1]]) {
            safeCall(setTheme, args[1]);
            print(`Theme switched to ${args[1]}`);
          } else {
            print(`Theme not found: ${args[1]}`);
          }
        } else {
          print("Usage: theme list | theme set <name>");
        }
        break;
      }
      case "matrix":
        safeCall(openMatrix);
        print("Launching Matrix rain...");
        break;
      case "play": {
        const target = args[0];
        if (!target) {
          print("play: missing file");
          break;
        }
        if (target.endsWith(".mp3") && vfs.exists(resolve(target))) {
          safeCall(playAudio, resolve(target));
          print(`Streaming ${target}... (simulated)`);
        } else {
          print("play: file not found or unsupported");
        }
        break;
      }
      case "open": {
        if (args[0] === ".") {
          safeCall(openFileManager, resolve("."));
          print("Opening File Manager at current directory...");
        } else {
          print("open: unsupported target");
        }
        break;
      }
      case "ping": {
        const host = args[0];
        if (!host) {
          print("ping: missing host");
          break;
        }
        print(pingOutput(host));
        break;
      }
      case "curl": {
        const url = args[0];
        if (!url) {
          print("curl: missing URL");
          break;
        }
        print(curlOutput(url));
        break;
      }
      case "nano":
        print("nano: launching pseudo-editor (not yet available in GUI)");
        break;
      default:
        print(`bash: ${cmd}: command not found`);
    }
  };

  return {
    run: async (input) => {
      if (!input.trim()) return;
      const parts = input.trim().split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);
      if (cmd === "sudo") {
        if (!args.length) {
          print("sudo: no command provided");
          return;
        }
        return runWithSudo(args[0], args.slice(1));
      } else {
        return executeCommand(cmd, args);
      }
    },
  };
};
