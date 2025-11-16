import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";

const wallpaperGradients = {
  default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  ubuntu: "linear-gradient(135deg, #E95420 0%, #772953 100%)",
  arch: "linear-gradient(135deg, #1793D1 0%, #0B4F6C 100%)",
  mint: "linear-gradient(135deg, #87CF3E 0%, #5A9E3A 100%)",
  dark: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
  fedora: "linear-gradient(135deg, #51A2DA 0%, #294172 100%)",
  tux: "linear-gradient(135deg, #F9D71C 0%, #F5A623 100%)",
  geometric: "linear-gradient(135deg, #434343 0%, #000000 100%)",
};

const LockScreen = () => {
  const hasBooted = useStore((state) => state.hasBooted);
  const isLocked = useStore((state) => state.isLocked);
  const unlock = useStore((state) => state.unlock);
  const wallpaper = useStore((state) => state.wallpaper);
  const customWallpaper = useStore((state) => state.customWallpaper);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [password, setPassword] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [exitMode, setExitMode] = useState("fade");
  const startYRef = useRef(null);

  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isLocked]);

  const handleUnlock = (mode = "fade") => {
    if (isExiting) return;
    setExitMode(mode);
    setIsExiting(true);
    const timeout = mode === "slide" ? 500 : 320;
    setTimeout(() => {
      unlock();
      setIsExiting(false);
      setExitMode("fade");
      setPassword("");
    }, timeout);
  };

  const getWallpaperStyle = () => {
    if (wallpaper === "custom" && customWallpaper) {
      return {
        backgroundImage: `url(${customWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    return { background: wallpaperGradients[wallpaper] || wallpaperGradients.default };
  };

  const handlePointerDown = (event) => {
    if (event.target.closest("form")) return;
    startYRef.current = event.touches?.[0]?.clientY ?? event.clientY;
  };

  const handlePointerUp = (event) => {
    if (startYRef.current === null) return;
    const endY = event.changedTouches?.[0]?.clientY ?? event.clientY;
    if (startYRef.current - endY > 90) {
      handleUnlock("slide");
    }
    startYRef.current = null;
  };

  useEffect(() => {
    if (!isLocked || !hasBooted) return;

    const handleKey = (event) => {
      if (!isLocked || isExiting) return;
      if (event.key === "Enter") {
        event.preventDefault();
        handleUnlock("slide");
        return;
      }

      if (document.activeElement?.tagName === "INPUT") {
        return;
      }

      handleUnlock("fade");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLocked, hasBooted, isExiting]);

  if (!hasBooted || !isLocked) return null;

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          key="lock-screen"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: isExiting ? 0 : 1, scale: isExiting && exitMode === "fade" ? 1.02 : 1, y: isExiting && exitMode === "slide" ? "-100%" : 0 }}
          transition={{ duration: isExiting ? 0.4 : 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[15000]"
          onClick={() => handleUnlock("fade")}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          <div
            className="absolute inset-0"
            style={{
              ...getWallpaperStyle(),
              filter: "blur(30px) scale(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white px-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-12 select-none">
              <div className="text-[96px] font-light leading-none drop-shadow-lg">
                {formattedTime}
              </div>
              <div className="mt-3 text-xl tracking-wide text-white/80">
                {formattedDate}
              </div>
            </div>

            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                handleUnlock("slide");
              }}
              className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[28px] px-10 py-8 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-200 to-slate-500 border-4 border-white/20 shadow-xl flex items-center justify-center text-slate-900 text-4xl font-bold">
                B
              </div>
              <div className="text-2xl font-semibold tracking-wide text-white/90">bill</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-72 max-w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/15 focus:border-white/40 outline-none text-lg tracking-[0.4em]"
                placeholder="••••••••"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-2xl bg-white/90 text-slate-900 font-semibold uppercase tracking-wide text-sm"
              >
                Unlock
              </button>
            </motion.form>

            <div className="absolute bottom-16 text-sm text-white/70 tracking-wide select-none">
              Press any key or swipe up
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockScreen;
