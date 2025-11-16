import React from "react";
import { ShieldCheck, Zap, Lock, Globe2, Code2, Settings, Sparkles } from "lucide-react";
import InfoWindowLayout from "../../InfoWindowLayout";

const advantageCards = [
  {
    icon: Code2,
    title: "Open Source & Gratis",
    desc: "Tidak ada biaya lisensi. Anda bebas memeriksa, memodifikasi, dan mendistribusikan kode sumber.",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Tinggi",
    desc: "Model permission ketat dan proses review kernel terdistribusi membuat ancaman cepat ditangani.",
  },
  {
    icon: Zap,
    title: "Performa Optimal",
    desc: "Kernel modular memastikan Linux berjalan mulus di server hyperscale maupun laptop lama.",
  },
  {
    icon: Lock,
    title: "Privasi Terjaga",
    desc: "Tidak ada telemetry paksa. Anda menentukan sendiri data apa yang keluar dari mesin.",
  },
  {
    icon: Settings,
    title: "Fleksibel & Customizable",
    desc: "Dari window manager hingga scheduler kernel, semuanya bisa disesuaikan kebutuhan Anda.",
  },
  {
    icon: Globe2,
    title: "Komunitas Global",
    desc: "Komunitas lintas negara menyediakan dokumentasi, forum, dan dukungan 24/7.",
  },
];

const factStats = [
  { label: "Supercomputer TOP500", value: "100%" },
  { label: "Kapasitas Cloud", value: "90%" },
  { label: "Perangkat Android", value: "3B+" },
  { label: "Server Teratas", value: "96.3%" },
];

const adopterExamples = [
  { name: "NASA", note: "Misi luar angkasa & simulasi" },
  { name: "CERN", note: "Eksperimen partikel" },
  { name: "Google", note: "Search & Android" },
  { name: "NYSE", note: "Bursa efek skala global" },
];

const Kelebihan = () => {
  return (
    <InfoWindowLayout
      title="Kelebihan Linux"
      subtitle="Alasan developer dan enterprise mengandalkannya"
      description="Dari kebebasan lisensi hingga performa, Linux memberikan fondasi kuat untuk semua jenis workload."
      icon={Sparkles}
      accent="emerald"
      eyebrow="Highlight"
    >
      <div className="info-card-grid two-column">
        {advantageCards.map((card) => (
          <article key={card.title} className="info-card">
            <div className="info-card-icon">
              <card.icon size={20} />
            </div>
            <h4 className="info-card-title">{card.title}</h4>
            <p className="info-card-desc">{card.desc}</p>
          </article>
        ))}
      </div>

      <div className="info-grid info-grid--two">
        <section className="info-panel">
          <p className="info-panel-label">Fakta Cepat</p>
          <div className="info-stat-grid">
            {factStats.map((stat) => (
              <div key={stat.label} className="info-stat-card">
                <p className="info-stat-value">{stat.value}</p>
                <p className="info-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="info-panel">
          <p className="info-panel-label">Siapa yang Memakai?</p>
          <div className="info-card-grid">
            {adopterExamples.map((company) => (
              <article key={company.name} className="info-card">
                <h4 className="info-card-title">{company.name}</h4>
                <p className="info-card-desc">{company.note}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="info-panel">
        <p className="info-panel-label">Kenapa Penting?</p>
        <p>
          Linux menawarkan <strong>kontrol penuh</strong> terhadap infrastruktur digital. Ia dapat diperkeras untuk
          kebutuhan security, dituning untuk latency rendah, atau dimodifikasi menjadi platform IoT ultra ringan.
        </p>
      </section>
    </InfoWindowLayout>
  );
};

export default Kelebihan;
