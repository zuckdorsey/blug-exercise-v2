import React from "react";
import { History, Quote, UsersRound } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

const timeline = [
  {
    year: "1991",
    title: "Kernel 0.01",
    description:
      "Linus Torvalds merilis kernel Linux pertama dan mengundang komunitas global untuk ikut mengembangkan.",
  },
  {
    year: "1992",
    title: "Lisensi GPL",
    description: "Kernel resmi menggunakan GNU GPL, memastikan kebebasan untuk memodifikasi dan mendistribusikan.",
  },
  {
    year: "1993",
    title: "Distro Pertama",
    description: "Slackware dan Debian hadir, membuka jalan ekosistem distribusi Linux modern.",
  },
  {
    year: "1996",
    title: "Tux & Identitas",
    description: "Tux dibuat oleh Larry Ewing dan menjadi maskot Linux yang ikonik hingga kini.",
  },
  {
    year: "2004",
    title: "Ubuntu",
    description: "Canonical memperkenalkan Ubuntu dan mempopulerkan Linux untuk desktop rumahan.",
  },
  {
    year: "2008",
    title: "Android",
    description: "Kernel Linux menggerakkan Android dan membawa Linux ke miliaran perangkat mobile.",
  },
  {
    year: "Sekarang",
    title: "Dominasi Infrastruktur",
    description: "Linux menjalankan 100% supercomputer TOP500 dan mayoritas beban kerja cloud dunia.",
  },
];

const figures = [
  {
    name: "Linus Torvalds",
    role: "Arsitek Kernel",
    insight: "Menjaga kualitas kernel dengan model rilis cepat dan review ketat.",
  },
  {
    name: "Richard Stallman",
    role: "GNU & FSF",
    insight: "Menetapkan filosofi kebebasan perangkat lunak dan lisensi GPL.",
  },
  {
    name: "Komunitas Global",
    role: "10K+ Kontributor",
    insight: "Patch harian dari perusahaan dan developer independen di seluruh dunia.",
  },
];

const impactStats = [
  { label: "Supercomputer TOP500", value: "100%" },
  { label: "Server Public Cloud", value: "90%" },
  { label: "Perangkat Android", value: "3B+" },
];

const Sejarah = () => {
  return (
    <InfoWindowLayout
      title="Sejarah Linux"
      subtitle="Dari proyek kamar asrama menjadi tulang punggung internet"
      description="Chronology singkat yang menyoroti momen paling berpengaruh sepanjang perjalanan open-source Linux."
      icon={History}
      accent="amber"
      eyebrow="Timeline"
    >
      <div className="info-grid info-grid--two">
        <section className="info-panel">
          <p className="info-panel-label">Awal Mula</p>
          <h3>Kisah yang Dimulai dari Rasa Ingin Tahu</h3>
          <p>
            Agustus 1991, Linus Torvalds memposting pesan sederhana di comp.os.minix tentang kernel hobi bernama
            {" "}
            <strong>Linux</strong>. Keterbukaan kode sumber dan semangat kolaborasi membuat ribuan developer ikut
            berkontribusi dan menjadikannya proyek perangkat lunak terbesar di dunia.
          </p>
        </section>
        <section className="info-panel">
          <p className="info-panel-label">Filosofi</p>
          <h3>DNA Open Source</h3>
          <ul className="info-list">
            <li>Transparansi dan partisipasi global yang menjaga kualitas.</li>
            <li>Lisensi GPL memastikan kebebasan memakai, memodifikasi, dan mendistribusikan.</li>
            <li>Model meritokrasi: patch terbaiklah yang masuk, tanpa memandang asal kontributor.</li>
          </ul>
        </section>
      </div>

      <section className="info-panel">
        <p className="info-panel-label">Timeline Penting</p>
        <div className="info-timeline">
          {timeline.map((item) => (
            <article key={item.year} className="info-timeline-item">
              <span className="info-timeline-dot" />
              <span className="info-timeline-year">{item.year}</span>
              <div className="info-timeline-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="info-grid info-grid--three">
        {impactStats.map((stat) => (
          <div key={stat.label} className="info-stat-card">
            <p className="info-stat-value">{stat.value}</p>
            <p className="info-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="info-panel">
        <p className="info-panel-label">Tokoh Penting</p>
        <div className="info-card-grid three-column">
          {figures.map((figure) => (
            <article key={figure.name} className="info-card">
              <div className="info-card-icon">
                <UsersRound size={18} />
              </div>
              <h4 className="info-card-title">{figure.name}</h4>
              <p className="info-card-desc">{figure.role}</p>
              <p className="info-card-desc">{figure.insight}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-panel">
        <p className="info-panel-label">Kutipan Favorit</p>
          <div className="info-card">
            <div className="info-card-icon">
              <Quote size={18} />
            </div>
          <p className="info-quote">
            “Software is like sex: it’s better when it’s free.” — Linus Torvalds
          </p>
        </div>
      </section>
    </InfoWindowLayout>
  );
};

export default Sejarah;
