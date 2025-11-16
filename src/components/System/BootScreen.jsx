import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";
import bootLogs from "./bootLogs";

const BootScreen = () => {
  const hasBooted = useStore((state) => state.hasBooted);
  const setHasBooted = useStore((state) => state.setHasBooted);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (hasBooted) return;

    let elapsed = 0;
    const timers = [];

    bootLogs.forEach((log, index) => {
      const jitter = 100 + Math.random() * 80;
      elapsed += jitter;

      timers.push(
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, { ...log, id: index }]);
          setProgress((index + 1) / bootLogs.length);
        }, elapsed)
      );
    });

    const exitStart = elapsed + 600;
    timers.push(setTimeout(() => setIsExiting(true), exitStart));
    timers.push(
      setTimeout(() => {
        setHasBooted(true);
        setVisibleLogs([]);
      }, exitStart + 400)
    );

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [hasBooted, setHasBooted]);

  const statusColor = useMemo(
    () => ({
      OK: "text-emerald-400",
      WARN: "text-amber-300",
      FAIL: "text-rose-400",
    }),
    []
  );

  if (hasBooted) return null;

  return (
    <AnimatePresence>
      {!hasBooted && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.02 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[20000] bg-black flex flex-col justify-center px-6 sm:px-16"
          style={{ fontFamily: '"JetBrains Mono", "Ubuntu Mono", "Fira Code", monospace' }}
        >
          <div className="max-w-3xl w-full mx-auto">
            <div className="text-emerald-300/70 text-xs uppercase tracking-[0.5em] mb-6">
              BlueG LinuxOnWeb kernel 6.5.0
            </div>

            <div className="space-y-2 text-sm sm:text-base text-emerald-50">
              {visibleLogs.map((log, idx) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex gap-3"
                >
                  <span className={`${statusColor[log.status] || "text-slate-300"} font-semibold min-w-[70px]`}>
                    [ {log.status || ".."} ]
                  </span>
                  <motion.span
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 0.35, ease: "linear" }}
                    className="flex-1 whitespace-pre-wrap"
                  >
                    {log.message}
                    {idx === visibleLogs.length - 1 && !isExiting && (
                      <span className="ml-2 text-emerald-200/60 animate-pulse">█</span>
                    )}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-200"
                style={{ width: `${Math.min(progress * 100, 100)}%` }}
              />
            </div>

            <div className="mt-3 text-[11px] text-slate-400 tracking-[0.3em] uppercase">
              Booting BlueG LinuxOnWeb environment
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
