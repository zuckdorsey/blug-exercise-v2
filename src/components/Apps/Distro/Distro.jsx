import React from "react";

const Distro = () => {
  const distributions = [
    {
      name: "Ubuntu",
      logo: "🟠",
      desc: "Distribusi paling populer untuk desktop dan server. Mudah digunakan dan cocok untuk pemula.",
      based: "Debian",
      package: "apt/dpkg",
      desktop: "GNOME",
    },
    {
      name: "Fedora",
      logo: "🔵",
      desc: "Distribusi yang didukung oleh Red Hat, menghadirkan teknologi terbaru dan cutting-edge.",
      based: "Independent",
      package: "dnf/rpm",
      desktop: "GNOME",
    },
    {
      name: "Arch Linux",
      logo: "🔷",
      desc: "Rolling release yang sangat customizable. Untuk pengguna advanced yang suka kontrol penuh.",
      based: "Independent",
      package: "pacman",
      desktop: "Custom",
    },
    {
      name: "Linux Mint",
      logo: "🟢",
      desc: "Desktop yang elegan dan mudah digunakan. Alternatif sempurna untuk Windows.",
      based: "Ubuntu/Debian",
      package: "apt/dpkg",
      desktop: "Cinnamon",
    },
    {
      name: "Debian",
      logo: "🔴",
      desc: "Distribusi stabil yang menjadi basis banyak distro lain. Sangat reliable untuk server.",
      based: "Independent",
      package: "apt/dpkg",
      desktop: "Multiple",
    },
    {
      name: "openSUSE",
      logo: "🟢",
      desc: "Distribusi yang user-friendly dengan tool administrasi YaST yang powerful.",
      based: "Independent",
      package: "zypper/rpm",
      desktop: "KDE/GNOME",
    },
    {
      name: "Manjaro",
      logo: "🟩",
      desc: "Arch-based yang lebih user-friendly. Mendapat update terbaru dengan testing yang baik.",
      based: "Arch",
      package: "pacman",
      desktop: "Multiple",
    },
    {
      name: "Kali Linux",
      logo: "🔷",
      desc: "Distribusi khusus untuk penetration testing dan security auditing.",
      based: "Debian",
      package: "apt/dpkg",
      desktop: "XFCE",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Distribusi Linux Populer</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Linux memiliki ratusan distribusi (distro) yang berbeda, masing-masing disesuaikan untuk kebutuhan spesifik. 
        Berikut adalah beberapa distribusi paling populer:
      </p>

      <div className="grid gap-4">
        {distributions.map((distro) => (
          <div
            key={distro.name}
            className="glass p-4 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{distro.logo}</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{distro.name}</h3>
                <p className="text-sm text-slate-300 mb-3">{distro.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                    Based: {distro.based}
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">
                    Package: {distro.package}
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                    DE: {distro.desktop}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h3 className="font-semibold text-blue-300 mb-2">💡 Tip Memilih Distro</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• <strong>Pemula:</strong> Ubuntu, Linux Mint, Fedora</li>
          <li>• <strong>Advanced:</strong> Arch Linux, Gentoo, NixOS</li>
          <li>• <strong>Server:</strong> Debian, CentOS/Rocky, Ubuntu Server</li>
          <li>• <strong>Security:</strong> Kali Linux, Parrot OS</li>
        </ul>
      </div>
    </div>
  );
};

export default Distro;
