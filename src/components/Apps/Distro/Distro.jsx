import React from "react";
import { Boxes, LaptopMinimal, ShieldHalf, Beaker, Sparkles } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

const distroGroups = [
  {
    title: "Desktop siap pakai",
    icon: LaptopMinimal,
    description: "Fokus pada kemudahan instalasi, driver lengkap, dan pengalaman GUI modern.",
    distros: [
      { name: "Ubuntu", tags: ["Debian base", "APT", "GNOME"], note: "Support kuat & komunitas besar." },
      { name: "Linux Mint", tags: ["Ubuntu base", "APT", "Cinnamon"], note: "Sensasi mirip Windows." },
      { name: "Fedora", tags: ["Independent", "DNF", "GNOME"], note: "Fitur terbaru dengan dukungan Red Hat." },
    ],
  },
  {
    title: "Power user & rolling release",
    icon: Boxes,
    description: "Memberikan kontrol penuh terhadap paket dan rilis bleeding edge.",
    distros: [
      { name: "Arch Linux", tags: ["Independent", "Pacman", "Custom"], note: "Tanpa bloat, sepenuhnya DIY." },
      { name: "Manjaro", tags: ["Arch base", "Pacman", "Multiple"], note: "Rolling release dengan kurasi." },
      { name: "NixOS", tags: ["Independent", "nix", "Declarative"], note: "Konfigurasi sistem sebagai kode." },
    ],
  },
  {
    title: "Server & enterprise",
    icon: ShieldHalf,
    description: "Stabilitas jangka panjang dengan dukungan vendor dan ekosistem cloud.",
    distros: [
      { name: "Debian", tags: ["Independent", "APT", "Stable"], note: "Basis untuk banyak distro lain." },
      { name: "Rocky / Alma", tags: ["RHEL", "DNF", "Server"], note: "Drop-in replacement untuk CentOS." },
      { name: "openSUSE", tags: ["Independent", "Zypper", "KDE/GNOME"], note: "YaST memudahkan admin." },
    ],
  },
  {
    title: "Keamanan & riset",
    icon: Beaker,
    description: "Toolkit pentest dan sains data dengan kurasi paket khusus.",
    distros: [
      { name: "Kali Linux", tags: ["Debian", "APT", "XFCE"], note: "Ratusan tool pentest siap pakai." },
      { name: "Parrot OS", tags: ["Debian", "APT", "Security"], note: "Ringan untuk forensik & privacy." },
      { name: "Tails", tags: ["Debian", "APT", "Live"], note: "Anonimitas tinggi berbasis Tor." },
    ],
  },
];

const Distro = () => {
  return (
    <InfoWindowLayout
      title="Distribusi Linux"
      subtitle="Pilih distro sesuai kebutuhan Anda"
      description="Linux hadir dalam berbagai rasa. Gunakan panduan ini untuk menemukan distro yang sesuai dengan gaya kerja Anda."
      icon={Sparkles}
      accent="purple"
      eyebrow="Distro"
    >
      {distroGroups.map((group) => (
        <section key={group.title} className="info-panel">
          <p className="info-panel-label">{group.title}</p>
          <div className="info-card-grid">
            <article className="info-card">
              <div className="info-card-icon">
                <group.icon size={18} />
              </div>
              <p className="info-card-desc">{group.description}</p>
            </article>
            <div className="info-card-grid two-column">
              {group.distros.map((distro) => (
                <article key={distro.name} className="info-card">
                  <h4 className="info-card-title">{distro.name}</h4>
                  <p className="info-card-desc">{distro.note}</p>
                  <div className="info-pill-group">
                    {distro.tags.map((tag) => (
                      <span key={tag} className="info-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="info-panel">
        <p className="info-panel-label">Tips Memilih</p>
        <ul className="info-list">
          <li>
            <strong>Pemula:</strong> Ubuntu, Mint, Fedora Workstation.
          </li>
          <li>
            <strong>Power user:</strong> Arch, Gentoo, NixOS.
          </li>
          <li>
            <strong>Server:</strong> Debian, Ubuntu LTS, Rocky Linux.
          </li>
          <li>
            <strong>Security:</strong> Kali, Parrot, BlackArch.
          </li>
        </ul>
      </section>
    </InfoWindowLayout>
  );
};

export default Distro;
