import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/windowStore";

const SNAP_THRESHOLD = 12;
const NUDGE_SMALL = 1;
const NUDGE_LARGE = 10;
const MENU_BAR_HEIGHT = 40; // Height of the top menu bar
const DOCK_HEIGHT = 48; // Height of the bottom dock

const ResizeHandle = ({ direction, onPointerDown }) => {
  const cursors = {
    n: "ns-resize",
    s: "ns-resize",
    e: "ew-resize",
    w: "ew-resize",
    ne: "nesw-resize",
    nw: "nwse-resize",
    se: "nwse-resize",
    sw: "nesw-resize",
  };

  const positions = {
    n: "top-0 left-0 right-0 h-1 cursor-ns-resize",
    s: "bottom-0 left-0 right-0 h-1 cursor-ns-resize",
    e: "top-0 right-0 bottom-0 w-1 cursor-ew-resize",
    w: "top-0 left-0 bottom-0 w-1 cursor-ew-resize",
    ne: "top-0 right-0 w-3 h-3 cursor-nesw-resize",
    nw: "top-0 left-0 w-3 h-3 cursor-nwse-resize",
    se: "bottom-0 right-0 w-3 h-3 cursor-nwse-resize",
    sw: "bottom-0 left-0 w-3 h-3 cursor-nesw-resize",
  };

  return (
    <div
      className={`absolute ${positions[direction]} z-20`}
      style={{
        cursor: cursors[direction],
        WebkitAppRegion: "no-drag",
      }}
      onPointerDown={(e) => onPointerDown(e, direction)}
      role="presentation"
      aria-hidden="true"
    />
  );
};

const MacOSWindow = ({
  id,
  title,
  children,
  icon: Icon,
  minWidth = 400,
  minHeight = 300,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowRect,
    activeWindowId,
  } = useStore();

  const windowState = windows.find((w) => w.id === id);
  const windowRef = useRef(null);
  const rafRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const dragState = useRef({
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
    startWidth: 0,
    startHeight: 0,
    direction: null,
    pending: null,
  });

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const snapToEdge = useCallback((value, max) => {
    if (value < SNAP_THRESHOLD) return 0;
    if (value > max - SNAP_THRESHOLD) return max;
    return value;
  }, []);

  const clampRect = useCallback(
    (rect) => {
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT - rect.height;

      return {
        x: Math.max(0, Math.min(rect.x, maxX)),
        y: Math.max(MENU_BAR_HEIGHT, Math.min(rect.y, maxY)),
        width: Math.max(minWidth, Math.min(rect.width, window.innerWidth)),
        height: Math.max(minHeight, Math.min(rect.height, window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT)),
      };
    },
    [minWidth, minHeight]
  );

  const handleDragStart = useCallback(
    (e) => {
      if (!windowState || windowState.maximized) return;
      if (e.target.closest(".macos-traffic-lights")) return;

      e.preventDefault();
      e.stopPropagation();

      const rect = windowRef.current.getBoundingClientRect();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: windowState.position.x,
        startWindowY: windowState.position.y,
        startWidth: windowState.size.width,
        startHeight: windowState.size.height,
        direction: null,
      };

      setIsDragging(true);
      focusWindow(id);

      if (e.target.setPointerCapture) {
        e.target.setPointerCapture(e.pointerId);
      }

      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
    },
    [windowState, focusWindow, id]
  );

  const handleResizeStart = useCallback(
    (e, direction) => {
      if (!windowState || windowState.maximized) return;

      e.preventDefault();
      e.stopPropagation();

      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: windowState.position.x,
        startWindowY: windowState.position.y,
        startWidth: windowState.size.width,
        startHeight: windowState.size.height,
        direction,
      };

      setIsResizing(true);
      focusWindow(id);

      if (e.target.setPointerCapture) {
        e.target.setPointerCapture(e.pointerId);
      }

      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
    },
    [windowState, focusWindow, id]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging && !isResizing) return;
      e.preventDefault();

      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!windowRef.current) return;

        if (isDragging) {
          // Drag logic
          let newX = dragState.current.startWindowX + deltaX;
          let newY = dragState.current.startWindowY + deltaY;

          // Ensure window stays below menu bar
          newY = Math.max(MENU_BAR_HEIGHT, newY);

          newX = snapToEdge(newX, window.innerWidth - dragState.current.startWidth);
          newY = snapToEdge(newY, window.innerHeight - DOCK_HEIGHT - dragState.current.startHeight);

          windowRef.current.style.transform = `translate(${newX - dragState.current.startWindowX}px, ${
            newY - dragState.current.startWindowY
          }px)`;

          dragState.current.pending = { x: newX, y: newY };
        } else if (isResizing) {
          // Resize logic
          const dir = dragState.current.direction;
          let newRect = {
            x: dragState.current.startWindowX,
            y: dragState.current.startWindowY,
            width: dragState.current.startWidth,
            height: dragState.current.startHeight,
          };

          if (dir.includes("e")) {
            newRect.width = dragState.current.startWidth + deltaX;
          }
          if (dir.includes("w")) {
            newRect.width = dragState.current.startWidth - deltaX;
            newRect.x = dragState.current.startWindowX + deltaX;
          }
          if (dir.includes("s")) {
            newRect.height = dragState.current.startHeight + deltaY;
          }
          if (dir.includes("n")) {
            newRect.height = dragState.current.startHeight - deltaY;
            newRect.y = dragState.current.startWindowY + deltaY;
          }

          newRect = clampRect(newRect);

          windowRef.current.style.left = `${newRect.x}px`;
          windowRef.current.style.top = `${newRect.y}px`;
          windowRef.current.style.width = `${newRect.width}px`;
          windowRef.current.style.height = `${newRect.height}px`;

          dragState.current.pending = newRect;
        }
      });
    },
    [isDragging, isResizing, snapToEdge, clampRect]
  );

  const handlePointerUp = useCallback(
    (e) => {
      if (!isDragging && !isResizing) return;

      if (e.target.releasePointerCapture) {
        e.target.releasePointerCapture(e.pointerId);
      }

      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Commit changes to store
      if (dragState.current.pending) {
        if (isDragging) {
          updateWindowRect(id, {
            x: dragState.current.pending.x,
            y: dragState.current.pending.y,
            width: dragState.current.startWidth,
            height: dragState.current.startHeight,
          });
          windowRef.current.style.transform = "";
        } else if (isResizing) {
          updateWindowRect(id, dragState.current.pending);
        }
      }

      setIsDragging(false);
      setIsResizing(false);
      dragState.current.pending = null;
    },
    [isDragging, isResizing, id, updateWindowRect]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!windowState || windowState.maximized || activeWindowId !== id) return;

      const step = e.shiftKey ? NUDGE_LARGE : NUDGE_SMALL;
      let newRect = null;

      if (e.altKey || e.ctrlKey) {
        // Resize with arrow keys
        switch (e.key) {
          case "ArrowRight":
            newRect = {
              ...windowState.position,
              width: windowState.size.width + step,
              height: windowState.size.height,
            };
            break;
          case "ArrowLeft":
            newRect = {
              ...windowState.position,
              width: windowState.size.width - step,
              height: windowState.size.height,
            };
            break;
          case "ArrowDown":
            newRect = {
              ...windowState.position,
              width: windowState.size.width,
              height: windowState.size.height + step,
            };
            break;
          case "ArrowUp":
            newRect = {
              ...windowState.position,
              width: windowState.size.width,
              height: windowState.size.height - step,
            };
            break;
        }
      } else {
        // Move with arrow keys
        switch (e.key) {
          case "ArrowRight":
            newRect = {
              x: windowState.position.x + step,
              y: windowState.position.y,
              ...windowState.size,
            };
            break;
          case "ArrowLeft":
            newRect = {
              x: windowState.position.x - step,
              y: windowState.position.y,
              ...windowState.size,
            };
            break;
          case "ArrowDown":
            newRect = {
              x: windowState.position.x,
              y: windowState.position.y + step,
              ...windowState.size,
            };
            break;
          case "ArrowUp":
            newRect = {
              x: windowState.position.x,
              y: windowState.position.y - step,
              ...windowState.size,
            };
            break;
          case "Escape":
            if (isDragging || isResizing) {
              handlePointerUp(e);
            }
            return;
        }
      }

      if (newRect) {
        e.preventDefault();
        updateWindowRect(id, clampRect(newRect));
      }
    },
    [windowState, activeWindowId, id, isDragging, isResizing, updateWindowRect, clampRect, handlePointerUp]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePointerMove, handlePointerUp, handleKeyDown]);

  if (!windowState || windowState.minimized) return null;

  const handleClose = () => {
    if (onClose) onClose();
    closeWindow(id);
  };

  const handleMin = () => {
    if (onMinimize) onMinimize();
    minimizeWindow(id);
  };

  const handleMax = () => {
    if (onMaximize) onMaximize();
    toggleMaximize(id);
  };

  const isActive = activeWindowId === id;

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="macos-window-container"
        style={{
          position: "absolute",
          left: windowState.maximized ? 0 : windowState.position.x,
          top: windowState.maximized ? MENU_BAR_HEIGHT : windowState.position.y,
          width: windowState.maximized ? "100%" : windowState.size.width,
          height: windowState.maximized ? `calc(100% - ${MENU_BAR_HEIGHT}px - ${DOCK_HEIGHT}px)` : windowState.size.height,
          zIndex: windowState.zIndex,
          pointerEvents: "auto",
        }}
        onPointerDown={() => focusWindow(id)}
        role="dialog"
        aria-label={title}
        aria-modal="false"
        aria-grabbed={isDragging}
        tabIndex={isActive ? 0 : -1}
      >
        <div className={`macos-window ${isActive ? "active" : ""}`}>
          {/* Resize Handles */}
          {!windowState.maximized && (
            <>
              <ResizeHandle direction="n" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="s" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="e" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="w" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="ne" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="nw" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="se" onPointerDown={handleResizeStart} />
              <ResizeHandle direction="sw" onPointerDown={handleResizeStart} />
            </>
          )}

          {/* Title Bar */}
          <div
            className="macos-titlebar"
            onPointerDown={handleDragStart}
            role="toolbar"
            aria-roledescription="window titlebar"
            style={{
              WebkitAppRegion: "drag",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {/* Traffic Light Buttons */}
            <div
              className="flex items-center gap-2 macos-traffic-lights"
              style={{ WebkitAppRegion: "no-drag" }}
            >
              <button
                onClick={handleClose}
                onPointerDown={(e) => e.stopPropagation()}
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
                onClick={handleMin}
                onPointerDown={(e) => e.stopPropagation()}
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
                onClick={handleMax}
                onPointerDown={(e) => e.stopPropagation()}
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
          <div className="macos-window-content">{children}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MacOSWindow;