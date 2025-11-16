import React from "react";

const Sejarah = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Sejarah Linux</h2>
      
      <div className="space-y-4 text-slate-200">
        <section>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Awal Mula (1991)</h3>
          <p className="leading-relaxed">
            Linux dimulai sebagai proyek hobi oleh Linus Torvalds, seorang mahasiswa Universitas Helsinki, Finlandia. 
            Pada tanggal 25 Agustus 1991, Linus mengumumkan proyek kernelnya di newsgroup Usenet comp.os.minix 
            dengan pesan terkenal: "I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu)."
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Timeline Penting</h3>
          <div className="space-y-2">
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">1991</span>
              <span>Linus Torvalds merilis kernel Linux versi 0.01</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">1992</span>
              <span>Linux dilisensikan di bawah GNU GPL</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">1993</span>
              <span>Distribusi Slackware dan Debian dirilis</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">1994</span>
              <span>Linux kernel 1.0 dirilis dengan 176.250 baris kode</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">1996</span>
              <span>Tux the Penguin menjadi maskot resmi Linux</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">2004</span>
              <span>Ubuntu dirilis, membawa Linux ke desktop mainstream</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">2008</span>
              <span>Android (berbasis Linux) diluncurkan</span>
            </div>
            <div className="flex gap-3">
              <span className="font-mono text-green-400 min-w-[80px]">Sekarang</span>
              <span>Linux menguasai 100% supercomputer teratas, 90% cloud, dan miliaran perangkat IoT</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Filosofi Open Source</h3>
          <p className="leading-relaxed">
            Linux adalah contoh sempurna dari gerakan open source. Kode sumbernya terbuka untuk siapa saja untuk 
            dibaca, dimodifikasi, dan didistribusikan. Ribuan developer dari seluruh dunia berkontribusi pada kernel Linux, 
            menjadikannya salah satu proyek kolaboratif terbesar dalam sejarah teknologi.
          </p>
        </section>

        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-sm italic text-slate-300">
            "Software is like sex: it's better when it's free." - Linus Torvalds
          </p>
        </section>
      </div>
    </div>
  );
};

export default Sejarah;
