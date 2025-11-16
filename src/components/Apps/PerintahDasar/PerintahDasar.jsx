import React, { useMemo, useState } from "react";
import { TerminalSquare, Keyboard, Command } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

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
const PerintahDasar = () => {
  const [activeCategory, setActiveCategory] = useState(commandCategories[0].category);

  const activeCommands = useMemo(
    () => commandCategories.find((cat) => cat.category === activeCategory)?.commands ?? [],
    [activeCategory]
  );

  return (
    <InfoWindowLayout
      title="Perintah Dasar Linux"
      subtitle="Cheat sheet interaktif untuk terminal"
      description="Pilih kategori untuk melihat contoh perintah penting lengkap dengan deskripsi dan sintaks praktis."
      icon={TerminalSquare}
      accent="pink"
      eyebrow="CLI"
    >
      <section className="info-panel">
        <p className="info-panel-label">Kategori</p>
        <div className="info-pill-group">
          {commandCategories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              className={`info-pill-button ${cat.category === activeCategory ? "active" : ""}`.trim()}
              onClick={() => setActiveCategory(cat.category)}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </section>

      <div className="info-card-grid two-column">
        {activeCommands.map((command) => (
          <article key={command.cmd} className="info-command-card">
            <div className="info-command-head">
              <code>${command.cmd}</code>
              <span className="info-command-desc">{command.desc}</span>
            </div>
            <code className="info-command-example">$ {command.example}</code>
          </article>
        ))}
      </div>

      <div className="info-grid info-grid--two">
        <section className="info-panel">
          <p className="info-panel-label">Tips Cepat</p>
          <ul className="info-list">
            <li>
              Gunakan <code>man command</code> untuk membuka manual lengkap.
            </li>
            <li>
              Tekan <code>Tab</code> dua kali untuk auto-complete dan preview opsi.
            </li>
            <li>
              <code>Ctrl + C</code> menghentikan proses yang sedang berjalan.
            </li>
            <li>
              Selalu hati-hati dengan <code>sudo rm -rf /</code> — perintah berbahaya!
            </li>
          </ul>
        </section>
        <section className="info-panel">
          <p className="info-panel-label">Pipe & Redirection</p>
          <div className="info-card-grid">
            {["|", ">", ">>", "<"].map((symbol) => (
              <article key={symbol} className="info-card">
                <div className="info-card-icon">
                  <Command size={16} />
                </div>
                <h4 className="info-card-title">{symbol}</h4>
                <p className="info-card-desc">
                  {symbol === "|" && "Mengalirkan output ke perintah berikutnya."}
                  {symbol === ">" && "Menulis output ke file (overwrite)."}
                  {symbol === ">>" && "Append output ke akhir file."}
                  {symbol === "<" && "Mengambil input dari file."}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="info-panel">
        <p className="info-panel-label">Shortcuts Favorit</p>
        <div className="info-card-grid three-column">
          {[
            { combo: "Ctrl + L", desc: "Membersihkan layar terminal" },
            { combo: "Ctrl + R", desc: "Reverse search riwayat perintah" },
            { combo: "!!", desc: "Menjalankan perintah terakhir" },
          ].map((shortcut) => (
            <article key={shortcut.combo} className="info-card">
              <div className="info-card-icon">
                <Keyboard size={16} />
              </div>
              <h4 className="info-card-title">{shortcut.combo}</h4>
              <p className="info-card-desc">{shortcut.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </InfoWindowLayout>
  );
};

export default PerintahDasar;
