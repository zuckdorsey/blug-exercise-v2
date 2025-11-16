import React from "react";
import { Users, Server, Terminal, Package, Shield, Cpu } from "lucide-react";

const Fitur = () => {
  const features = [
    {
      icon: Users,
      title: "Multitasking & Multiuser",
      desc: "Jalankan banyak program secara bersamaan. Banyak user dapat login dan bekerja pada sistem yang sama tanpa gangguan.",
      details: ["Preemptive multitasking", "Multiple virtual consoles", "User isolation"],
    },
    {
      icon: Terminal,
      title: "Command Line Interface (CLI)",
      desc: "Shell yang powerful seperti Bash, Zsh, Fish memberikan kontrol penuh atas sistem dengan scripting automation.",
      details: ["Bash scripting", "Pipe & redirection", "Text processing tools"],
    },
    {
      icon: Package,
      title: "Package Management",
      desc: "Sistem manajemen paket seperti APT, YUM, Pacman memudahkan instalasi, update, dan penghapusan software.",
      details: ["apt-get / apt", "dnf / yum", "pacman / AUR"],
    },
    {
      icon: Server,
      title: "Networking Built-in",
      desc: "Dukungan penuh untuk protokol networking, SSH, FTP, web server, database server, dan tools networking.",
      details: ["TCP/IP stack", "SSH/SSL/TLS", "Apache/Nginx"],
    },
    {
      icon: Shield,
      title: "Security & Permissions",
      desc: "Sistem permission user/group yang ketat, SELinux, AppArmor, dan firewall untuk melindungi sistem.",
      details: ["File permissions", "SELinux/AppArmor", "iptables/nftables"],
    },
    {
      icon: Cpu,
      title: "Hardware Support",
      desc: "Mendukung berbagai arsitektur: x86, ARM, RISC-V, dan ribuan device driver untuk hardware modern.",
      details: ["Multiple architectures", "Extensive drivers", "Plug and play"],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Fitur Utama Linux</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Linux dilengkapi dengan fitur-fitur powerful yang membuatnya cocok untuk berbagai penggunaan, 
        dari desktop personal hingga server enterprise dan embedded systems.
      </p>

      <div className="space-y-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="glass p-5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-300 mb-3 leading-relaxed">{feature.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.details.map((detail, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-400"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <h3 className="font-semibold text-purple-300 mb-2">🚀 Fitur Tambahan</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
          <div>• Live USB/CD support</div>
          <div>• Virtual machines (KVM)</div>
          <div>• Docker containers</div>
          <div>• RAID & LVM</div>
          <div>• Desktop environments</div>
          <div>• Automatic updates</div>
          <div>• Backup tools</div>
          <div>• Remote desktop</div>
        </div>
      </div>
    </div>
  );
};

export default Fitur;
