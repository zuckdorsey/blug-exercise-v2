import React from "react";
import { Users2, Terminal, Package, Server, Shield, Cpu, Sparkles } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

const features = [
  {
    icon: Users2,
    title: "Multitasking & Multiuser",
    desc: "Kernel preemptive memastikan banyak proses dan user dapat berjalan bersamaan tanpa konflik.",
    tags: ["Virtual console", "User isolation", "TTY switching"],
  },
  {
    icon: Terminal,
    title: "Command Line Superpower",
    desc: "Shell modern seperti Bash, Zsh, dan Fish memberikan automation tingkat lanjut.",
    tags: ["Scripting", "Pipelines", "Aliases"],
  },
  {
    icon: Package,
    title: "Package Management",
    desc: "APT, DNF, Pacman, hingga Flatpak menjaga siklus hidup aplikasi tetap rapi.",
    tags: ["Repositories", "Rollback", "Dependensi"],
  },
  {
    icon: Server,
    title: "Networking Built-in",
    desc: "Stack TCP/IP matang, SSH, firewall, dan server populer siap digunakan.",
    tags: ["SSH", "Netfilter", "Nginx/Apache"],
  },
  {
    icon: Shield,
    title: "Security Layered",
    desc: "SELinux/AppArmor, permission granular, dan audit log menjaga sistem aman.",
    tags: ["SELinux", "AppArmor", "iptables/nftables"],
  },
  {
    icon: Cpu,
    title: "Dukungan Hardware Luas",
    desc: "Linux berjalan di x86, ARM, RISC-V, bahkan microcontroller baru.",
    tags: ["Driver upstream", "SoC", "Plug & play"],
  },
];

const extraHighlights = [
  "Live USB/Rescue mode",
  "Virtualisasi KVM/QEMU",
  "Container Docker & Podman",
  "RAID & LVM",
  "Beragam Desktop Environment",
  "Pembaruan otomatis",
  "Tool backup bawaan",
  "Remote desktop & Waypipe",
];

const Fitur = () => {
  return (
    <InfoWindowLayout
      title="Fitur Utama Linux"
      subtitle="Toolkit lengkap untuk developer dan sysadmin"
      description="Setiap distribusi berbagi fondasi yang sama: kernel tangguh, CLI modern, dan keamanan berlapis."
      icon={Sparkles}
      accent="blue"
      eyebrow="Fitur"
    >
      <div className="info-card-grid two-column">
        {features.map((feature) => (
          <article key={feature.title} className="info-card">
            <div className="info-card-icon">
              <feature.icon size={18} />
            </div>
            <h4 className="info-card-title">{feature.title}</h4>
            <p className="info-card-desc">{feature.desc}</p>
            <div className="info-pill-group">
              {feature.tags.map((tag) => (
                <span key={tag} className="info-chip">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="info-panel">
        <p className="info-panel-label">Fitur Tambahan</p>
        <div className="info-card-grid three-column">
          {extraHighlights.map((highlight) => (
            <article key={highlight} className="info-card">
              <p className="info-card-desc">{highlight}</p>
            </article>
          ))}
        </div>
      </section>
    </InfoWindowLayout>
  );
};

export default Fitur;
