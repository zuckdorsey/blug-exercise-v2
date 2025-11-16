import React from "react";
import { Globe2, Layers3, Cpu, BookText, Binary, UsersRound, Github } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

const Tentang = () => {
  const sections = [
    {
      id: "overview",
      label: "Overview",
      caption: "Gambaran umum",
      icon: Layers3,
      content: (
        <>
          <section className="info-panel">
            <p className="info-panel-label">Apa itu Linux?</p>
            <h3>Sistem operasi bebas, modular, dan kolaboratif</h3>
            <p>
              Linux adalah kernel yang dikembangkan oleh Linus Torvalds pada 1991 dan kini menjadi fondasi ratusan
              distribusi. Keterbukaan kode sumber membuatnya mudah di-porting ke server, desktop, perangkat mobile,
              hingga satelit.
            </p>
          </section>
          <div className="info-grid info-grid--three">
            {[
              { label: "Rilis kernel/tahun", value: "~8" },
              { label: "Kontributor aktif", value: "10.000+" },
              { label: "Baris kode", value: "28M+" },
            ].map((stat) => (
              <div key={stat.label} className="info-stat-card">
                <p className="info-stat-value">{stat.value}</p>
                <p className="info-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "filosofi",
      label: "Filosofi",
      caption: "Open source",
      icon: BookText,
      content: (
        <section className="info-panel">
          <p className="info-panel-label">Nilai-Nilai Linux</p>
          <h3>Kenapa komunitas menjaga Linux tetap bebas</h3>
          <ul className="info-list">
            <li>Kebebasan 0-3 ala FSF: menjalankan, mempelajari, memodifikasi, dan mendistribusikan.</li>
            <li>Model kolaboratif: patch dinilai berdasarkan kualitas, bukan hierarki perusahaan.</li>
            <li>Transparansi penuh: setiap perubahan dapat dilacak lewat Git dan mailing list.</li>
            <li>Vendor neutral: Linux Foundation memastikan standar lintas perusahaan.</li>
          </ul>
        </section>
      ),
    },
    {
      id: "kernel",
      label: "Kernel",
      caption: "Mesin utamanya",
      icon: Cpu,
      content: (
        <>
          <section className="info-panel">
            <p className="info-panel-label">Komponen Inti</p>
            <div className="info-card-grid three-column">
              {["Manajemen proses", "Driver & I/O", "Keamanan & SELinux"].map((item) => (
                <article key={item} className="info-card">
                  <div className="info-card-icon">
                    <Binary size={18} />
                  </div>
                  <h4 className="info-card-title">{item}</h4>
                  <p className="info-card-desc">
                    Modul kernel dapat dimuat dinamis sesuai kebutuhan, menjaga kinerja tetap optimal.
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section className="info-panel">
            <p className="info-panel-label">Rilis</p>
            <p>
              Kernel stabil dirilis kira-kira setiap <strong>9-10 minggu</strong>. Branch LTS (Long Term Support)
              didukung hingga 6 tahun untuk kebutuhan enterprise.
            </p>
          </section>
        </>
      ),
    },
    {
      id: "tools",
      label: "GNU Tools",
      caption: "Utilitas",
      icon: Globe2,
      content: (
        <section className="info-panel">
          <p className="info-panel-label">Toolkit Esensial</p>
          <div className="info-card-grid two-column">
            {["Shell (Bash/Zsh)", "Coreutils", "GCC & Clang", "Package Manager"].map((tool) => (
              <article key={tool} className="info-card">
                <div className="info-card-icon">
                  <BookText size={18} />
                </div>
                <h4 className="info-card-title">{tool}</h4>
                <p className="info-card-desc">Bagian dari stack GNU yang memberikan pengalaman CLI kaya.</p>
              </article>
            ))}
          </div>
        </section>
      ),
    },
    {
      id: "opensource",
      label: "Open Source",
      caption: "Ekosistem",
      icon: UsersRound,
      content: (
        <>
          <section className="info-panel">
            <p className="info-panel-label">Ekosistem</p>
            <p>
              Linux merangkul komunitas global: perusahaan raksasa, universitas, hingga kontributor individu.
              Dukungan finansial Linux Foundation menjaga roadmap tetap stabil.
            </p>
          </section>
          <div className="info-card-grid two-column">
            {[
              {
                title: "Kernel.org",
                desc: "Repo resmi kernel",
                link: "https://kernel.org",
              },
              {
                title: "GNU Project",
                desc: "Free Software Foundation",
                link: "https://www.gnu.org",
              },
              {
                title: "Linux Source",
                desc: "GitHub mirror",
                link: "https://github.com/torvalds/linux",
                icon: Github,
              },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="info-resource-card"
              >
                <div className="info-card-icon">
                  {resource.icon ? <resource.icon size={18} /> : <Globe2 size={18} />}
                </div>
                <div>
                  <strong>{resource.title}</strong>
                  <p className="info-card-desc">{resource.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <InfoWindowLayout
      title="Tentang Linux"
      subtitle="Free & open source operating system"
      description="Pelajari filosofi, komponen, dan ekosistem yang menjadikan Linux pilihan utama untuk server, desktop, dan perangkat pintar."
      icon={Globe2}
      sections={sections}
      sidebarTitle="Topik"
      accent="cyan"
      eyebrow="Eksplorasi"
    />
  );
};

export default Tentang;
