import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";
import ToggleButton from "./ToggleButton";
import Slider from "./Slider";
import {
  Wifi,
  Bluetooth,
  Moon,
  Sun,
  BellOff,
  Zap,
  Volume2,
  VolumeX,
  Battery,
  Settings,
  Signal,
} from "lucide-react";

const ControlCenter = () => {
  const isOpen = useStore((state) => state.isControlCenterOpen);
  const closeControlCenter = useStore((state) => state.closeControlCenter);
  const openWindow = useStore((state) => state.openWindow);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // System states
  const darkMode = useStore((state) => state.darkMode);
  const brightness = useStore((state) => state.brightness);
  const volume = useStore((state) => state.volume);
  const wifiEnabled = useStore((state) => state.wifiEnabled);
  const bluetoothEnabled = useStore((state) => state.bluetoothEnabled);
  const doNotDisturb = useStore((state) => state.doNotDisturb);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const powerMode = useStore((state) => state.powerMode);
  
  // Actions
  const setDarkMode = useStore((state) => state.setDarkMode);
  const setBrightness = useStore((state) => state.setBrightness);
  const setVolume = useStore((state) => state.setVolume);
  const toggleWifi = useStore((state) => state.toggleWifi);
  const toggleBluetooth = useStore((state) => state.toggleBluetooth);
  const toggleDoNotDisturb = useStore((state) => state.toggleDoNotDisturb);
  const toggleSound = useStore((state) => state.toggleSound);
  const setPowerMode = useStore((state) => state.setPowerMode);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeControlCenter();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeControlCenter]);

  // Close on click outside
  const handleBackdropClick = () => {
    closeControlCenter();
  };

  const handleOpenSettings = () => {
    openWindow("settings");
    closeControlCenter();
  };

  const togglePowerMode = () => {
    const modes = ["balanced", "performance", "low"];
    const currentIndex = modes.indexOf(powerMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPowerMode(nextMode);
  };

  const getPowerModeLabel = () => {
    switch (powerMode) {
      case "performance": return "Performance";
      case "low": return "Low Power";
      default: return "Balanced";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[10000] bg-black/30"
          />

          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[50px] right-4 z-[10001] w-[380px] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[26px] border border-white/10 bg-[rgba(25,27,31,0.92)] backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.45)] p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <ToggleButton icon={Wifi} label="Wi-Fi" isActive={wifiEnabled} onClick={toggleWifi} />
                <ToggleButton icon={Bluetooth} label="Bluetooth" isActive={bluetoothEnabled} onClick={toggleBluetooth} />
                <ToggleButton icon={darkMode ? Sun : Moon} label={darkMode ? "Light Mode" : "Dark Mode"} isActive={darkMode} onClick={() => setDarkMode(!darkMode)} color="purple" />
                <ToggleButton icon={BellOff} label="Do Not Disturb" isActive={doNotDisturb} onClick={toggleDoNotDisturb} color="purple" />
                <ToggleButton icon={Zap} label={getPowerModeLabel()} isActive={powerMode === "performance"} onClick={togglePowerMode} color="orange" />
                <ToggleButton icon={soundEnabled ? Volume2 : VolumeX} label="Sound" isActive={soundEnabled} onClick={toggleSound} color="green" />
              </div>

              <div className="space-y-3">
                <Slider icon={Sun} label="Brightness" value={brightness} onChange={setBrightness} />
                <Slider icon={Volume2} label="Volume" value={volume} onChange={setVolume} />
              </div>

              <div className="grid gap-2 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    <Battery className="w-4 h-4" />
                    Battery
                  </div>
                  <span className="text-white">100%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    <Signal className="w-4 h-4" />
                    Network
                  </div>
                  <span className="text-white">{wifiEnabled ? "Connected" : "Offline"}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenSettings}
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Open Settings
              </motion.button>

              <div className="text-center border-t border-white/10 pt-3">
                <div className="text-2xl font-semibold tracking-tight">
                  {currentTime.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/60 mt-1">
                  {currentTime.toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ControlCenter;
