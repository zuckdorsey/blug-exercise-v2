import React, { useState, useRef, useEffect } from "react";

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: "output", text: "WebOS Terminal v1.0 - Selamat datang di Linux Introduction" },
    { type: "output", text: 'Ketik "help" untuk melihat daftar perintah.\n' },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => `Perintah yang tersedia:
  help       - Tampilkan daftar perintah
  ls         - List aplikasi yang tersedia
  about      - Tentang Linux
  history    - Sejarah Linux
  distro     - Distribusi Linux populer
  features   - Fitur utama Linux
  advantages - Kelebihan Linux
  commands   - Perintah dasar Linux
  clear      - Bersihkan terminal`,

    ls: () => `Aplikasi tersedia:
  sejarah/    - Sejarah Linux
  distro/     - Distribusi Linux
  fitur/      - Fitur Utama
  kelebihan/  - Kelebihan Linux
  perintah/   - Perintah Dasar
  tentang/    - Tentang Linux`,

    about: () => `Linux adalah sistem operasi open-source yang dikembangkan oleh Linus Torvalds pada tahun 1991. Linux terkenal karena stabilitas, keamanan, dan fleksibilitasnya.

Karakteristik utama:
• Open Source & Gratis
• Stabil dan Aman
• Multitasking & Multiuser
• Sangat Customizable`,

    history: () => `Sejarah Singkat Linux:

1991 - Linus Torvalds menciptakan kernel Linux pertama
1992 - Linux dilisensikan di bawah GPL
1993 - Distribusi Slackware dan Debian dirilis
1994 - Versi 1.0 dari kernel Linux dirilis
2000-an - Linux menjadi backbone internet modern
Sekarang - Digunakan di server, smartphone (Android), supercomputer, IoT`,

    distro: () => `Distribusi Linux Populer:

🔹 Ubuntu - Ramah pemula, berbasis Debian
🔹 Fedora - Inovasi terbaru, didukung Red Hat
🔹 Arch Linux - Rolling release, sangat customizable
🔹 Linux Mint - Desktop elegan, mudah digunakan
🔹 Debian - Stabil, basis banyak distro
🔹 CentOS/Rocky - Server enterprise
🔹 Kali Linux - Penetration testing & security`,

    features: () => `Fitur Utama Linux:

✓ Multitasking - Jalankan banyak program bersamaan
✓ Multiuser - Banyak user dapat login bersamaan
✓ Security - Sistem permission & SELinux
✓ Networking - TCP/IP, SSH, server tools bawaan
✓ Shell - Command line interface yang powerful
✓ Package Manager - apt, yum, pacman untuk install software
✓ File System - ext4, btrfs, xfs support
✓ Portability - Berjalan di berbagai arsitektur hardware`,

    advantages: () => `Kelebihan Linux:

💚 Open Source - Kode sumber terbuka, bebas dimodifikasi
💚 Gratis - Tidak ada biaya lisensi
💚 Aman - Virus & malware sangat jarang
💚 Stabil - Uptime server hingga bertahun-tahun
💚 Performa - Ringan dan efisien
💚 Privacy - Tidak ada tracking atau telemetry tersembunyi
💚 Customizable - Sesuaikan setiap aspek sistem
💚 Komunitas - Support community yang besar dan aktif`,

    commands: () => `Perintah Dasar Linux:

Navigasi:
  ls        - List files/directories
  cd        - Change directory
  pwd       - Print working directory
  
File Management:
  cp        - Copy file/folder
  mv        - Move/rename
  rm        - Remove file
  mkdir     - Create directory
  
Informasi Sistem:
  uname -a  - Info sistem
  df -h     - Disk usage
  free -h   - Memory usage
  top       - Process monitor
  
Text:
  cat       - Display file content
  nano/vim  - Text editor
  grep      - Search text
  
Permissions:
  chmod     - Change permissions
  chown     - Change ownership
  sudo      - Execute as superuser`,

    clear: () => "CLEAR",
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: "input", text: `user@webos:~$ ${cmd}` }]);

    if (!trimmed) {
      return;
    }

    if (commands[trimmed]) {
      const output = commands[trimmed]();
      if (output === "CLEAR") {
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, { type: "output", text: output }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "error", text: `bash: ${trimmed}: command not found` },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="w-full h-full bg-slate-950 text-green-400 font-mono p-4 overflow-auto scrollbar"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              entry.type === "input"
                ? "text-cyan-400"
                : entry.type === "error"
                ? "text-red-400"
                : "text-green-300"
            }`}
          >
            {entry.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-cyan-400">user@webos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 select-text"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default Terminal;
