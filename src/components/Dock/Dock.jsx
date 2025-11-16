import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";
import DockIcon from "./DockIcon";
import { dockApps } from "./dockConfig";

const Dock = () => {
  const windows = useStore((state) => state.windows);
  const openWindow = useStore((state) => state.openWindow);
  const minimizeWindow = useStore((state) => state.minimizeWindow);
  const isFullscreenMode = useStore((state) => state.isFullscreenMode);
  const isDockVisible = useStore((state) => state.isDockVisible);
  const setDockVisible = useStore((state) => state.setDockVisible);
  
  const [mouseX, setMouseX] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const dockRef = useRef(null);
  const rafRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Handle magnification effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dockRef.current) return;
      
      const rect = dockRef.current.getBoundingClientRect();
      const dockTop = rect.top;
      const dockBottom = rect.bottom;
      const mouseY = e.clientY;
      
      // Check if mouse is near dock (with extended area for magnification)
      const proximityThreshold = 150;
      const isNearDock = mouseY >= dockTop - proximityThreshold && mouseY <= dockBottom + 50;
      
      if (isNearDock) {
        setIsHovered(true);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setMouseX(e.clientX);
        });
      } else {
        setIsHovered(false);
        setMouseX(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle auto-hide/reveal for fullscreen mode
  useEffect(() => {
    if (!isFullscreenMode) {
      setDockVisible(true);
      return;
    }

    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      
      // Reveal when mouse is near bottom edge (within 8px from bottom)
      if (e.clientY >= windowHeight - 8) {
        setDockVisible(true);
        
        // Clear existing timer
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      } else if (e.clientY < windowHeight - 100) {
        // Hide after 1.5s when mouse moves away
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = setTimeout(() => {
          setDockVisible(false);
        }, 1500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initially hide in fullscreen mode
    setDockVisible(false);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isFullscreenMode, setDockVisible]);

  const handleIconClick = (appId) => {
    const existingWindow = windows.find((w) => w.id === appId);
    
    if (existingWindow) {
      if (existingWindow.minimized) {
        // Restore from minimized
        openWindow(appId);
      } else {
        // Minimize if already open and focused
        minimizeWindow(appId);
      }
    } else {
      // Open new window
      openWindow(appId);
    }
  };

  const isAppRunning = (appId) => {
    return windows.some((w) => w.id === appId);
  };

  const isAppMinimized = (appId) => {
    const window = windows.find((w) => w.id === appId);
    return window?.minimized || false;
  };

  const shouldShow = !isFullscreenMode || isDockVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
          <motion.div
            initial={isFullscreenMode ? { y: 100, opacity: 0 } : { y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              duration: isFullscreenMode ? 0.25 : 0.6, 
              ease: isFullscreenMode ? "easeOut" : [0.16, 1, 0.3, 1]
            }}
            ref={dockRef}
            className="pointer-events-auto"
            style={{
              pointerEvents: shouldShow ? 'auto' : 'none',
            }}
          >
        {/* Dock Container */}
        <div className="relative">
          {/* Glass Background */}
          <div className="px-4 py-3 rounded-[24px] backdrop-blur-[45px] bg-gradient-to-b from-white/20 to-white/10 border border-white/30 shadow-2xl">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/25 via-white/10 to-transparent pointer-events-none" />
            
            {/* Saturation boost */}
            <div className="absolute inset-0 rounded-[24px] backdrop-saturate-[200%] pointer-events-none" />

            {/* Icons Container */}
            <div className="relative flex items-end gap-2.5 px-2">
              {dockApps.map((app, index) => (
                <DockIcon
                  key={app.id}
                  app={app}
                  index={index}
                  isRunning={isAppRunning(app.id)}
                  isMinimized={isAppMinimized(app.id)}
                  onClick={() => handleIconClick(app.id)}
                  mouseX={mouseX}
                />
              ))}
            </div>
          </div>

          {/* Bottom shadow/reflection */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-4 bg-black/20 blur-2xl rounded-full" />
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Dock;
