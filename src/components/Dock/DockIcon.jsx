import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const DockIcon = ({ app, isRunning, isMinimized, onClick, mouseX, index }) => {
  const iconRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isBouncing, setIsBouncing] = useState(false);
  const Icon = app.icon;

  useEffect(() => {
    if (!iconRef.current || mouseX === null) {
      setScale(1);
      return;
    }

    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenterX);
    
    // Magnification calculation - Gaussian-like curve
    const maxDistance = 140;
    const maxScale = 1.6;
    
    if (distance < maxDistance) {
      const influence = Math.cos((distance / maxDistance) * (Math.PI / 2));
      const newScale = 1 + (maxScale - 1) * influence;
      setScale(newScale);
    } else {
      setScale(1);
    }
  }, [mouseX]);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 700);
    onClick();
  };

  return (
    <div className="relative flex flex-col items-center justify-end" ref={iconRef}>
      {/* Icon Container */}
      <motion.button
        onClick={handleClick}
        className="relative group cursor-pointer outline-none focus:outline-none"
        style={{
          transformOrigin: "bottom center",
        }}
        animate={{
          scale: scale,
          y: isBouncing ? [0, -25, 0, -12, 0, -6, 0] : 0,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 25,
          },
          y: {
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
      >
        {/* Icon Background with Gradient */}
        <div
          className="relative w-[58px] h-[58px] rounded-[16px] overflow-hidden shadow-xl transition-shadow duration-200 group-hover:shadow-2xl"
          style={{
            background: `linear-gradient(145deg, ${app.color}ee, ${app.color}bb)`,
          }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/15 backdrop-blur-sm" />
          
          {/* Icon */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Icon className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={1.8} />
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Top highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
        </div>

        {/* Reflection effect */}
        <div
          className="absolute -bottom-2 left-0 right-0 h-7 rounded-[16px] opacity-15 blur-md"
          style={{
            background: `linear-gradient(to bottom, ${app.color}99, transparent)`,
            transform: "scaleY(0.4)",
          }}
        />
      </motion.button>

      {/* Running indicator */}
      {isRunning && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-white"
          style={{
            boxShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 15px rgba(59,130,246,0.7)",
          }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-md text-white text-xs font-medium rounded-lg pointer-events-none whitespace-nowrap shadow-xl"
      >
        {app.name}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 rotate-45" />
      </motion.div>
    </div>
  );
};

export default DockIcon;
