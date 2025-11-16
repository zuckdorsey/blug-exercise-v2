import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import React from "react";

const Slider = ({ icon: Icon, label, value, onChange, step = 1 }) => {
  const handleChange = (event) => {
    const newValue = Math.round(Number(event.target.value) / step) * step;
    onChange(newValue);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90">
      <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center gap-2 font-medium">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Icon className="w-4 h-4" strokeWidth={2.2} />
          </div>
          {label}
        </div>
        <span className="text-white/70 text-xs tracking-wide">{value}%</span>
      </div>
      <div className="relative h-1.5 bg-white/15 rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-white rounded-full"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute -top-2 -ml-2 w-4 h-4 rounded-full bg-white shadow-lg"
          style={{ left: `calc(${value}% )` }}
        />
      </div>
    </div>
  );
};

export default Slider;
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
