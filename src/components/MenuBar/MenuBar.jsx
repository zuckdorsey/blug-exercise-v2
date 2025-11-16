import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";
import { Wifi, Battery, Volume2, Bluetooth, Activity, ChevronDown } from "lucide-react";

const MenuBar = () => {
  const isControlCenterOpen = useStore((state) => state.isControlCenterOpen);
  const toggleControlCenter = useStore((state) => state.toggleControlCenter);
  const darkMode = useStore((state) => state.darkMode);
  const wifiEnabled = useStore((state) => state.wifiEnabled);
  const isFullscreenMode = useStore((state) => state.isFullscreenMode);
  const isTopBarVisible = useStore((state) => state.isTopBarVisible);
  const setTopBarVisible = useStore((state) => state.setTopBarVisible);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const hideTimerRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle mouse movement for auto-hide/reveal
  useEffect(() => {
    if (!isFullscreenMode) {
      setTopBarVisible(true);
      return;
    }

    const handleMouseMove = (e) => {
      // Reveal when mouse is near top edge (0-8px from top)
      if (e.clientY <= 8) {
        setTopBarVisible(true);
        
        // Clear existing timer
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      } else if (e.clientY > 50) {
        // Hide after 1.5s when mouse moves away
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = setTimeout(() => {
          setTopBarVisible(false);
        }, 1500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initially hide in fullscreen mode
    setTopBarVisible(false);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isFullscreenMode, setTopBarVisible]);

  const shouldShow = !isFullscreenMode || isTopBarVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={isFullscreenMode ? { y: -40, opacity: 0 } : { y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: isFullscreenMode ? 0.2 : 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[9998]"
          style={{ pointerEvents: shouldShow ? "auto" : "none" }}
        >
          <div
            className="relative h-11 px-4 flex items-center text-white"
            style={{
              background: "rgba(30,30,30,0.55)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-px bg-black/40" />

            <div className="relative flex-1 flex items-center justify-between">
              {/* Left section */}
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white/90 hover:bg-white/10 transition"
              >
                <Activity className="w-4 h-4" strokeWidth={2} />
                <span>Activities</span>
              </button>

              {/* Center clock */}
              <div className="text-sm font-medium select-none text-white/90">
                {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                <span className="mx-1">•</span>
                {currentTime.toLocaleDateString("en-US", { weekday: "long" })}
              </div>

              {/* Right quick settings */}
              <button
                onClick={toggleControlCenter}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition ${
                  isControlCenterOpen ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <Wifi className={`w-4 h-4 ${wifiEnabled ? "text-white" : "text-white/40"}`} strokeWidth={2} />
                <Bluetooth className="w-4 h-4" strokeWidth={2} />
                <Volume2 className="w-4 h-4" strokeWidth={2} />
                <Battery className="w-4 h-4" strokeWidth={2} />
                <ChevronDown className={`w-4 h-4 transition-transform ${isControlCenterOpen ? "rotate-180" : ""}`} strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20 blur-md" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuBar;
