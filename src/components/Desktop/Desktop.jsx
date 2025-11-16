import React from "react";
import useStore from "../../store/windowStore";
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

      {/* Windows */}
      {children}
    </div>
  );
};

export default Desktop;
