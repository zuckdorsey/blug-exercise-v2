import React from "react";

const PerintahDasar = () => {
  const commandCategories = [
    {
      category: "Navigasi & File System",
      commands: [
        { cmd: "ls", desc: "List files dan directories", example: "ls -lah" },
        { cmd: "cd", desc: "Change directory", example: "cd /home/user" },
        { cmd: "pwd", desc: "Print working directory", example: "pwd" },
        { cmd: "mkdir", desc: "Create directory", example: "mkdir folder" },
        { cmd: "rmdir", desc: "Remove empty directory", example: "rmdir folder" },
        { cmd: "tree", desc: "Display directory tree", example: "tree -L 2" },
      ],
    },
    {
      category: "File Management",
      commands: [
        { cmd: "cp", desc: "Copy file/directory", example: "cp file.txt backup/" },
        { cmd: "mv", desc: "Move/rename file", example: "mv old.txt new.txt" },
        { cmd: "rm", desc: "Remove file", example: "rm file.txt" },
        { cmd: "touch", desc: "Create empty file", example: "touch newfile.txt" },
        { cmd: "cat", desc: "Display file content", example: "cat file.txt" },
        { cmd: "less", desc: "View file with paging", example: "less bigfile.log" },
      ],
    },
    {
      category: "Text Processing",
      commands: [
        { cmd: "grep", desc: "Search text pattern", example: "grep 'error' log.txt" },
        { cmd: "sed", desc: "Stream editor", example: "sed 's/old/new/g' file" },
        { cmd: "awk", desc: "Text processing tool", example: "awk '{print $1}' data" },
        { cmd: "sort", desc: "Sort lines", example: "sort file.txt" },
        { cmd: "uniq", desc: "Remove duplicates", example: "uniq file.txt" },
        { cmd: "wc", desc: "Word/line count", example: "wc -l file.txt" },
      ],
    },
    {
      category: "Sistem & Proses",
      commands: [
        { cmd: "top", desc: "Display running processes", example: "top" },
        { cmd: "htop", desc: "Interactive process viewer", example: "htop" },
        { cmd: "ps", desc: "List processes", example: "ps aux" },
        { cmd: "kill", desc: "Terminate process", example: "kill -9 1234" },
        { cmd: "systemctl", desc: "Control systemd services", example: "systemctl status nginx" },
        { cmd: "uname", desc: "System information", example: "uname -a" },
      ],
    },
    {
      category: "Network & Connectivity",
      commands: [
        { cmd: "ping", desc: "Test network connectivity", example: "ping google.com" },
        { cmd: "curl", desc: "Transfer data from URLs", example: "curl https://api.com" },
        { cmd: "wget", desc: "Download files", example: "wget file.zip" },
        { cmd: "ssh", desc: "Secure shell connection", example: "ssh user@server" },
        { cmd: "netstat", desc: "Network statistics", example: "netstat -tuln" },
        { cmd: "ip", desc: "Show/configure network", example: "ip addr show" },
      ],
    },
    {
      category: "Permissions & Ownership",
      commands: [
        { cmd: "chmod", desc: "Change file permissions", example: "chmod 755 script.sh" },
        { cmd: "chown", desc: "Change file owner", example: "chown user:group file" },
        { cmd: "sudo", desc: "Execute as superuser", example: "sudo apt update" },
        { cmd: "su", desc: "Switch user", example: "su - username" },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Perintah Dasar Linux</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Menguasai command line adalah kunci untuk memanfaatkan kekuatan penuh Linux. 
        Berikut adalah perintah-perintah penting yang harus dikuasai:
      </p>

      <div className="space-y-6">
        {commandCategories.map((cat, idx) => (
          <div key={idx} className="glass p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">{cat.category}</h3>
            <div className="space-y-3">
              {cat.commands.map((command, i) => (
                <div key={i} className="border-l-2 border-green-500/30 pl-4 py-2">
                  <div className="flex items-baseline gap-3 mb-1">
                    <code className="font-mono text-green-400 font-semibold">{command.cmd}</code>
                    <span className="text-sm text-slate-400">{command.desc}</span>
                  </div>
                  <code className="text-xs text-slate-500 font-mono bg-black/30 px-2 py-1 rounded">
                    $ {command.example}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <h3 className="font-semibold text-yellow-300 mb-2">⚠️ Tips Penting</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Gunakan <code className="text-green-400">man command</code> untuk membaca manual</li>
            <li>• <code className="text-green-400">Tab</code> untuk auto-complete</li>
            <li>• <code className="text-green-400">Ctrl+C</code> untuk membatalkan command</li>
            <li>• Hati-hati dengan <code className="text-red-400">rm -rf</code> - bisa menghapus semua data!</li>
          </ul>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="font-semibold text-blue-300 mb-2">🔗 Pipe & Redirection</h3>
          <div className="space-y-1 text-sm font-mono text-slate-300">
            <div><code className="text-green-400">|</code> - Pipe output ke command lain</div>
            <div><code className="text-green-400">{'>'}</code> - Redirect output ke file (overwrite)</div>
            <div><code className="text-green-400">{'>>'}</code> - Append output ke file</div>
            <div><code className="text-green-400">{'<'}</code> - Input dari file</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerintahDasar;
