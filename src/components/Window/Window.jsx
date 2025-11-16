import React, { useState } from "react";
import { Rnd } from "react-rnd";
import useStore from "../../store/windowStore";
import { motion, AnimatePresence } from "framer-motion";

const Window = ({ id, title, children, icon: Icon }) => {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useStore();

  const [hoveredButton, setHoveredButton] = useState(null);
  const windowState = windows.find((w) => w.id === id);

  if (!windowState || windowState.minimized) return null;

  const handleDragStop = (e, d) => {
    updateWindowPosition(id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    updateWindowSize(id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    updateWindowPosition(id, position);
  };

  const handleMinimize = () => {
    minimizeWindow(id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ position: "absolute", zIndex: windowState.zIndex }}
      >
        <Rnd
          default={{
            x: windowState.position.x,
            y: windowState.position.y,
            width: windowState.size.width,
            height: windowState.size.height,
          }}
          position={
            windowState.maximized
              ? { x: 0, y: 0 }
              : { x: windowState.position.x, y: windowState.position.y }
          }
          size={
            windowState.maximized
              ? { width: "100%", height: "calc(100% - 48px)" }
              : { width: windowState.size.width, height: windowState.size.height }
          }
          minWidth={400}
          minHeight={300}
          bounds="parent"
          dragHandleClassName="macos-titlebar"
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          onMouseDown={() => focusWindow(id)}
          disableDragging={windowState.maximized}
          enableResizing={!windowState.maximized}
          className="macos-window-container"
        >
          <div className="macos-window group">
            {/* macOS Title Bar */}
            <div className="macos-titlebar">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2 macos-traffic-lights">
                <button
                  onClick={() => closeWindow(id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => setHoveredButton("close")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="macos-btn macos-btn-close"
                  title="Close"
                  aria-label="Close window"
                >
                  {hoveredButton === "close" && (
                    <svg className="w-2 h-2" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 2L10 10M10 2L2 10"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleMinimize}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => setHoveredButton("minimize")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="macos-btn macos-btn-minimize"
                  title="Minimize"
                  aria-label="Minimize window"
                >
                  {hoveredButton === "minimize" && (
                    <svg className="w-2 h-2" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6H10"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => toggleMaximize(id)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseEnter={() => setHoveredButton("maximize")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="macos-btn macos-btn-maximize"
                  title={windowState.maximized ? "Restore" : "Maximize"}
                  aria-label={windowState.maximized ? "Restore window" : "Maximize window"}
                >
                  {hoveredButton === "maximize" && (
                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M3 3L9 9M9 3L3 9"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Title & Icon */}
              <div className="absolute left-0 right-0 flex items-center justify-center gap-2 pointer-events-none">
                {Icon && <Icon className="w-4 h-4 text-white/70" />}
                <span className="text-sm font-medium text-white/80">{title}</span>
              </div>
            </div>

            {/* Window Content */}
            <div className="macos-window-content">
              {children}
            </div>
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
