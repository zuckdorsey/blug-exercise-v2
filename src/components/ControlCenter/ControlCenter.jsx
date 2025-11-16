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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[10000] bg-black/25 backdrop-blur-[2px]"
          />

          {/* Control Center Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ 
              type: "spring", 
              stiffness: 380, 
              damping: 32,
              mass: 0.7
            }}
            className="fixed top-[52px] right-5 z-[10001] w-[360px]"
            onClick={(e) => e.stopPropagation()}
            style={{
              backdropFilter: 'blur(55px) saturate(180%)',
              WebkitBackdropFilter: 'blur(55px) saturate(180%)',
            }}
          >
            {/* Premium Liquid Glass Container */}
            <div className="relative rounded-[22px] overflow-hidden shadow-2xl">
              {/* Main gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-white/12 to-white/8" />
              
              {/* Border */}
              <div className="absolute inset-0 rounded-[22px] border border-white/22" />
              
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/20 to-transparent" />
              
              {/* Bottom shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/9 to-transparent" />
              
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.08)_100%)]" />
              
              {/* Content */}
              <div className="relative p-5 space-y-4">
                {/* Quick Toggles Section */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    <ToggleButton
                      icon={Wifi}
                      label="Wi-Fi"
                      isActive={wifiEnabled}
                      onClick={toggleWifi}
                      color="blue"
                    />
                    <ToggleButton
                      icon={Bluetooth}
                      label="Bluetooth"
                      isActive={bluetoothEnabled}
                      onClick={toggleBluetooth}
                      color="blue"
                    />
                    <ToggleButton
                      icon={darkMode ? Sun : Moon}
                      label={darkMode ? "Light" : "Dark"}
                      isActive={darkMode}
                      onClick={() => setDarkMode(!darkMode)}
                      color="purple"
                    />
                    <ToggleButton
                      icon={BellOff}
                      label="Focus"
                      isActive={doNotDisturb}
                      onClick={toggleDoNotDisturb}
                      color="purple"
                    />
                    <ToggleButton
                      icon={Zap}
                      label={getPowerModeLabel()}
                      isActive={powerMode === "performance"}
                      onClick={togglePowerMode}
                      color="orange"
                    />
                    <ToggleButton
                      icon={soundEnabled ? Volume2 : VolumeX}
                      label="Sound"
                      isActive={soundEnabled}
                      onClick={toggleSound}
                      color="green"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Sliders Section */}
                <div className="space-y-3">
                  <Slider
                    icon={Sun}
                    label="Brightness"
                    value={brightness}
                    onChange={setBrightness}
                    color="orange"
                  />

                  <Slider
                    icon={Volume2}
                    label="Volume"
                    value={volume}
                    onChange={setVolume}
                    color="blue"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* System Info Card */}
                <div 
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Card background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/18 to-white/8" />
                  <div className="absolute inset-0 border border-white/25 rounded-2xl" />
                  
                  <div className="relative p-4 space-y-3">
                    {/* Battery */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400/20 to-green-500/20 flex items-center justify-center border border-green-400/30">
                          <Battery className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-[13px] font-semibold text-white/95">Battery</span>
                      </div>
                      <span className="text-[13px] font-medium text-white/75 tabular-nums">100%</span>
                    </div>
                    
                    {/* Network */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-500/20 flex items-center justify-center border border-blue-400/30">
                          <Signal className="w-4 h-4 text-blue-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-[13px] font-semibold text-white/95">Network</span>
                      </div>
                      <span className="text-[13px] font-medium text-white/75">
                        {wifiEnabled ? "Connected" : "Off"}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-3" />

                    {/* Settings Button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.015,
                        backgroundColor: 'rgba(255,255,255,0.2)'
                      }}
                      whileTap={{ scale: 0.985 }}
                      onClick={handleOpenSettings}
                      className="w-full p-3 rounded-xl bg-white/12 border border-white/25 transition-all"
                      style={{
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Settings className="w-[15px] h-[15px] text-white/95" strokeWidth={2.5} />
                        <span className="text-[13px] font-semibold text-white/95">
                          Open Settings
                        </span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Time & Date Section */}
                <div 
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5" />
                  <div className="absolute inset-0 border border-white/20 rounded-2xl" />
                  
                  <div className="relative text-center py-5 px-4">
                    <div className="text-[32px] font-bold text-white/98 tabular-nums tracking-tight" style={{ fontFamily: 'ui-monospace, monospace' }}>
                      {currentTime.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-[13px] font-medium text-white/70 mt-1.5 tracking-wide">
                      {currentTime.toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </div>
                  </div>
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
