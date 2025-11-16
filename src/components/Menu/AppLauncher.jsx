import React from "react";
import useStore from "../../store/windowStore";
import {
  Terminal,
  FileText,
  FolderOpen,
  Monitor,
  Info,
  Command,
  Settings,
} from "lucide-react";

const appMenuItems = [
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "sejarah", label: "Sejarah Linux", icon: FileText },
  { id: "distro", label: "Distribusi Linux", icon: FolderOpen },
  { id: "fitur", label: "Fitur Utama", icon: Monitor },
  { id: "kelebihan", label: "Kelebihan", icon: Info },
  { id: "perintah", label: "Perintah Dasar", icon: Command },
  { id: "tentang", label: "Tentang Linux", icon: Info },
  { id: "settings", label: "Settings", icon: Settings },
];

const AppLauncher = () => {
  const { menuOpen, openWindow, closeMenu } = useStore();

  if (!menuOpen) return null;

  const handleAppClick = (e, appId) => {
    e.stopPropagation();
    openWindow(appId);
    closeMenu();
  };

  return (
    <div
      className="absolute bottom-14 left-3 w-80 glass-strong rounded-lg p-4 z-[10000] animate-slide-up"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-sm font-semibold mb-3 text-white/70">Aplikasi</h3>
      <div className="grid grid-cols-3 gap-3">
        {appMenuItems.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={(e) => handleAppClick(e, app.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <Icon className="w-8 h-8 text-white/80 group-hover:text-white" />
              <span className="text-xs text-center text-white/70 group-hover:text-white">
                {app.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppLauncher;
