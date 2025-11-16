import React from "react";
import useStore from "../../store/windowStore";
import { Clock, Grid3x3 } from "lucide-react";
import { useState, useEffect } from "react";

const Taskbar = () => {
  const { windows, openWindow, minimizeWindow, toggleMenu, menuOpen } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTaskbarClick = (windowId) => {
    const window = windows.find((w) => w.id === windowId);
    if (window.minimized) {
      openWindow(windowId);
    } else {
      minimizeWindow(windowId);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 glass-strong flex items-center px-3 gap-2 z-[9999]">
      {/* App Launcher */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${
          menuOpen ? "bg-white/20" : ""
        }`}
      >
        <Grid3x3 className="w-5 h-5" />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-white/20" />

      {/* Running Windows */}
      <div className="flex-1 flex gap-2 overflow-x-auto scrollbar">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => handleTaskbarClick(win.id)}
            className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
              win.minimized
                ? "bg-white/5 hover:bg-white/10"
                : "bg-white/20 hover:bg-white/25"
            }`}
          >
            {win.id.charAt(0).toUpperCase() + win.id.slice(1)}
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="flex items-center gap-2 px-3 text-sm">
        <Clock className="w-4 h-4" />
        <span>{time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
};

export default Taskbar;
