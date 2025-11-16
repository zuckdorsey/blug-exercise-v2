import React from "react";
import { Shield, Zap, Lock, Globe, Code, Settings } from "lucide-react";

const Kelebihan = () => {
  const advantages = [
    {
      icon: Code,
      title: "Open Source & Gratis",
      desc: "Kode sumber terbuka untuk semua. Tidak ada biaya lisensi, bebas digunakan dan dimodifikasi.",
      color: "text-green-400",
    },
    {
      icon: Shield,
      title: "Keamanan Tinggi",
      desc: "Sistem permission yang ketat, virus dan malware sangat jarang. Update security yang cepat.",
      color: "text-blue-400",
    },
    {
      icon: Zap,
      title: "Performa Optimal",
      desc: "Ringan dan efisien. Dapat berjalan lancar bahkan di hardware lama. Cocok untuk server dan desktop.",
      color: "text-yellow-400",
    },
    {
      icon: Lock,
      title: "Privacy Terjamin",
      desc: "Tidak ada telemetry tersembunyi atau tracking. Anda memiliki kontrol penuh atas data pribadi.",
      color: "text-purple-400",
    },
    {
      icon: Settings,
      title: "Sangat Customizable",
      desc: "Ubah setiap aspek sistem dari kernel hingga desktop environment. Sesuaikan dengan kebutuhan Anda.",
      color: "text-pink-400",
    },
    {
      icon: Globe,
      title: "Komunitas Global",
      desc: "Didukung oleh jutaan developer dan user di seluruh dunia. Forum, wiki, dan dokumentasi lengkap.",
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Kelebihan Linux</h2>
      <p className="text-slate-300 mb-6 leading-relaxed">
        Linux menawarkan berbagai keunggulan yang membuatnya menjadi pilihan utama untuk server, 
        developer, dan pengguna yang menghargai kebebasan dan kontrol.
      </p>

      <div className="grid gap-4">
        {advantages.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass p-5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-white/5 rounded-lg ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-2">📊 Fakta Menarik</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• 100% dari 500 supercomputer teratas menjalankan Linux</li>
            <li>• 90% dari infrastruktur cloud menggunakan Linux</li>
            <li>• 3+ miliar perangkat Android (berbasis Linux kernel) aktif</li>
            <li>• 96.3% dari 1 juta server teratas menggunakan Linux</li>
          </ul>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="font-semibold text-blue-300 mb-2">🌟 Siapa yang Menggunakan Linux?</h3>
          <p className="text-sm text-slate-300">
            Google, Facebook, Amazon, NASA, CERN, NYSE, Bursa Efek Tokyo, dan ribuan perusahaan lainnya 
            mengandalkan Linux untuk infrastruktur critical mereka.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Kelebihan;
