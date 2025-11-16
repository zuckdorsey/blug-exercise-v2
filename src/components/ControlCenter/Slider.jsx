import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const Slider = ({ icon: Icon, label, value, onChange, max = 100, color = "blue" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const colors = {
    blue: {
      track: "from-blue-400 to-blue-500",
      glow: "shadow-[0_0_12px_rgba(59,130,246,0.6)]",
    },
    orange: {
      track: "from-orange-400 to-orange-500",
      glow: "shadow-[0_0_12px_rgba(249,115,22,0.6)]",
    },
    green: {
      track: "from-green-400 to-green-500",
      glow: "shadow-[0_0_12px_rgba(34,197,94,0.6)]",
    },
  };

  const colorScheme = colors[color] || colors.blue;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * max;
    onChange(Math.round(percentage));
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const percentage = (value / max) * 100;

  return (
    <div 
      className="relative rounded-[18px] overflow-hidden"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/18 to-white/8" />
      <div className="absolute inset-0 border border-white/25 rounded-[18px]" />
      
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[18px]" />
      
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/25 to-white/10 flex items-center justify-center border border-white/30">
            <Icon className="w-[15px] h-[15px] text-white/95" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-semibold text-white/95 flex-1">{label}</span>
          <span className="text-[13px] font-bold text-white/80 tabular-nums min-w-[42px] text-right">
            {value}%
          </span>
        </div>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-white/20 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Inner shadow */}
          <div className="absolute inset-0 rounded-full shadow-inner" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }} />
          
          {/* Progress */}
          <motion.div
            className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${colorScheme.track}`}
            style={{ width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glow effect when dragging */}
            {isDragging && (
              <motion.div 
                className={`absolute inset-0 ${colorScheme.glow} rounded-full`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            
            {/* Glossy highlight on track */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full" style={{ height: '50%' }} />
          </motion.div>

          {/* Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full cursor-grab active:cursor-grabbing"
            style={{ 
              left: `${percentage}%`, 
              x: "-50%",
              boxShadow: isDragging 
                ? '0 0 0 4px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.1)'
            }}
            animate={{ 
              scale: isDragging ? 1.15 : 1,
              left: `${percentage}%`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Thumb highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent" style={{ height: '60%' }} />
            
            {/* Thumb inner glow */}
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
