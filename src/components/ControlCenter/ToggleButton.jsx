import React from "react";
import { motion } from "framer-motion";

const ToggleButton = ({ icon: Icon, label, isActive, onClick, color = "blue" }) => {
  const colors = {
    blue: {
      active: "from-blue-400/70 to-blue-500/70",
      activeGlow: "shadow-[0_0_16px_rgba(59,130,246,0.5),0_4px_12px_rgba(0,0,0,0.15)]",
      activeBorder: "border-blue-300/40",
      inactive: "from-white/12 to-white/8",
      inactiveBorder: "border-white/25",
    },
    green: {
      active: "from-green-400/70 to-green-500/70",
      activeGlow: "shadow-[0_0_16px_rgba(34,197,94,0.5),0_4px_12px_rgba(0,0,0,0.15)]",
      activeBorder: "border-green-300/40",
      inactive: "from-white/12 to-white/8",
      inactiveBorder: "border-white/25",
    },
    purple: {
      active: "from-purple-400/70 to-purple-500/70",
      activeGlow: "shadow-[0_0_16px_rgba(168,85,247,0.5),0_4px_12px_rgba(0,0,0,0.15)]",
      activeBorder: "border-purple-300/40",
      inactive: "from-white/12 to-white/8",
      inactiveBorder: "border-white/25",
    },
    orange: {
      active: "from-orange-400/70 to-orange-500/70",
      activeGlow: "shadow-[0_0_16px_rgba(249,115,22,0.5),0_4px_12px_rgba(0,0,0,0.15)]",
      activeBorder: "border-orange-300/40",
      inactive: "from-white/12 to-white/8",
      inactiveBorder: "border-white/25",
    },
  };

  const colorScheme = colors[color] || colors.blue;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ 
        scale: 1.04,
        y: -1,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
      className={`
        relative p-4 rounded-[18px] overflow-hidden border transition-all duration-300
        ${isActive 
          ? `bg-gradient-to-br ${colorScheme.active} ${colorScheme.activeGlow} ${colorScheme.activeBorder}` 
          : `bg-gradient-to-br ${colorScheme.inactive} hover:from-white/18 hover:to-white/12 ${colorScheme.inactiveBorder}`
        }
      `}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Glossy top highlight */}
      <div className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${
        isActive ? 'from-white/30' : 'from-white/20'
      } to-transparent rounded-t-[18px] pointer-events-none`} />
      
      {/* Bottom shadow */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent rounded-b-[18px] pointer-events-none" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center gap-2">
        <Icon 
          className={`w-[18px] h-[18px] transition-all ${
            isActive ? 'text-white drop-shadow-sm' : 'text-white/90'
          }`}
          strokeWidth={2.5}
        />
        <span className={`text-[11px] font-semibold transition-all ${
          isActive ? 'text-white drop-shadow-sm' : 'text-white/90'
        }`}>
          {label}
        </span>
      </div>

      {/* Active state inner glow */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/10 rounded-[18px] pointer-events-none"
        />
      )}
    </motion.button>
  );
};

export default ToggleButton;
