import React from "react";
import useStore from "../../store/windowStore";
import { Monitor, FolderOpen, Terminal as TerminalIcon, FileText, Info, Settings as SettingsIcon, HardDrive } from "lucide-react";

const appConfigs = [
  { id: "file-manager", label: "File Manager", icon: HardDrive, position: { x: 50, y: 50 } },
  { id: "sejarah", label: "Sejarah Linux", icon: FileText, position: { x: 50, y: 150 } },
  { id: "distro", label: "Distribusi Linux", icon: FolderOpen, position: { x: 50, y: 250 } },
  { id: "kelebihan", label: "Kelebihan", icon: Monitor, position: { x: 50, y: 350 } },
  { id: "fitur", label: "Fitur", icon: Info, position: { x: 50, y: 450 } },
  { id: "perintah", label: "Perintah Dasar", icon: TerminalIcon, position: { x: 50, y: 550 } },
  { id: "tentang", label: "Tentang Linux", icon: Info, position: { x: 50, y: 650 } },
  { id: "settings", label: "Settings", icon: SettingsIcon, position: { x: 50, y: 750 } },
];

const DesktopIcon = ({ app }) => {
  const openWindow = useStore((state) => state.openWindow);
  const Icon = app.icon;

  return (
    <div
      className="absolute flex flex-col items-center gap-1 w-20 cursor-pointer group"
      style={{ left: app.position.x, top: app.position.y }}
      onDoubleClick={() => openWindow(app.id)}
    >
      <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-xs text-center text-white/90 group-hover:text-white px-1 py-0.5 rounded bg-black/20 group-hover:bg-black/40 transition-colors">
        {app.label}
      </span>
    </div>
  );
};

const Desktop = ({ children }) => {
  const wallpaper = useStore((state) => state.wallpaper);
  const customWallpaper = useStore((state) => state.customWallpaper);
  const closeMenu = useStore((state) => state.closeMenu);
  const closeControlCenter = useStore((state) => state.closeControlCenter);
  const darkMode = useStore((state) => state.darkMode);

  const wallpapers = {
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    ubuntu: "linear-gradient(135deg, #E95420 0%, #772953 100%)",
    arch: "linear-gradient(135deg, #1793D1 0%, #0B4F6C 100%)",
    mint: "linear-gradient(135deg, #87CF3E 0%, #5A9E3A 100%)",
    dark: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
    fedora: "linear-gradient(135deg, #51A2DA 0%, #294172 100%)",
    tux: "linear-gradient(135deg, #F9D71C 0%, #F5A623 100%)",
    geometric: "linear-gradient(135deg, #434343 0%, #000000 100%)",
  };

  // Determine background style
  const getBackgroundStyle = () => {
    if (wallpaper === "custom" && customWallpaper) {
      return {
        backgroundImage: `url(${customWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    return { background: wallpapers[wallpaper] || wallpapers.default };
  };

  const handleClick = () => {
    closeMenu();
    closeControlCenter();
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden transition-all duration-500 pt-10"
      style={getBackgroundStyle()}
      onClick={handleClick}
    >
      {/* Dark mode overlay */}
      {darkMode && (
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      )}

      {/* Desktop Icons */}
      {appConfigs.map((app) => (
        <DesktopIcon key={app.id} app={app} />
      ))}

      {/* Windows */}
      {children}
    </div>
  );
};

export default Desktop;
