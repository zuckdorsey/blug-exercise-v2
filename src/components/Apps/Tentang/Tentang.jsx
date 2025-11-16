import React from "react";
import { Github, Globe, Book } from "lucide-react";

const Tentang = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="inline-block p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4">
          <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.832-1.197 1.832-6.627.193-7.694 4.805-7.694 6.297C.023 19.48 5.602 24 12.5 24c6.896 0 12.5-4.52 12.5-9.502 0-1.492-1.067-6.104-7.694-6.297-.9 0-1.123-.74-1.197-1.832-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021-.002 0-.003 0-.005 0zm2.4 8.3c.133-.012.266.003.398.047.652.218.996.55 1.085 1.084.06.36.02.719-.118 1.024-.138.305-.335.545-.59.719-.51.348-1.18.518-2.01.518H12.02c-.83 0-1.5-.17-2.01-.518-.254-.174-.45-.414-.59-.72-.137-.304-.177-.663-.117-1.023.09-.534.433-.866 1.085-1.084.13-.044.264-.06.398-.047.27.025.54.13.81.315.27.184.54.46.81.827.27.367.54.825.81 1.374.27-.55.54-1.007.81-1.374.27-.367.54-.643.81-.827.27-.184.54-.29.81-.315z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Linux</h2>
        <p className="text-lg text-slate-400">The Free & Open Source Operating System</p>
      </div>

      <div className="space-y-6">
        <section className="glass p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Apa itu Linux?</h3>
          <p className="text-slate-300 leading-relaxed mb-3">
            Linux adalah sistem operasi open-source yang berbasis Unix, dikembangkan oleh Linus Torvalds pada tahun 1991. 
            Linux kernel adalah inti dari sistem operasi yang mengatur hardware dan resource sistem.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Berbeda dengan Windows atau macOS, Linux sepenuhnya gratis dan open-source. Siapa pun dapat melihat, 
            memodifikasi, dan mendistribusikan kode sumbernya.
          </p>
        </section>

        <section className="glass p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Komponen Sistem Linux</h3>
          <div className="space-y-3">
            <div className="border-l-2 border-green-500/50 pl-4">
              <h4 className="font-semibold text-white">Kernel</h4>
              <p className="text-sm text-slate-400">
                Inti sistem yang berinteraksi langsung dengan hardware dan mengelola resource sistem.
              </p>
            </div>
            <div className="border-l-2 border-blue-500/50 pl-4">
              <h4 className="font-semibold text-white">Shell</h4>
              <p className="text-sm text-slate-400">
                Command-line interface untuk berinteraksi dengan sistem (Bash, Zsh, Fish).
              </p>
            </div>
            <div className="border-l-2 border-purple-500/50 pl-4">
              <h4 className="font-semibold text-white">GNU Utilities</h4>
              <p className="text-sm text-slate-400">
                Tools dan aplikasi dasar (ls, cp, grep, dll) dari GNU Project.
              </p>
            </div>
            <div className="border-l-2 border-pink-500/50 pl-4">
              <h4 className="font-semibold text-white">Desktop Environment</h4>
              <p className="text-sm text-slate-400">
                GUI untuk desktop (GNOME, KDE Plasma, XFCE, dll).
              </p>
            </div>
          </div>
        </section>

        <section className="glass p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Penggunaan Linux</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="font-semibold text-green-400 mb-1">Server</div>
              <div className="text-slate-400">Web, database, cloud infrastructure</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="font-semibold text-blue-400 mb-1">Desktop</div>
              <div className="text-slate-400">Personal computers, workstations</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="font-semibold text-purple-400 mb-1">Mobile</div>
              <div className="text-slate-400">Android smartphones & tablets</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="font-semibold text-pink-400 mb-1">IoT</div>
              <div className="text-slate-400">Embedded systems, smart devices</div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-5 rounded-lg border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <div className="space-y-3">
            <a
              href="https://kernel.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Globe className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold text-white">Kernel.org</div>
                <div className="text-xs text-slate-400">Official Linux kernel repository</div>
              </div>
            </a>
            <a
              href="https://www.gnu.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Book className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-semibold text-white">GNU Project</div>
                <div className="text-xs text-slate-400">Free software foundation</div>
              </div>
            </a>
            <a
              href="https://github.com/torvalds/linux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded transition-colors"
            >
              <Github className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-semibold text-white">Linux on GitHub</div>
                <div className="text-xs text-slate-400">Source code repository</div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tentang;
