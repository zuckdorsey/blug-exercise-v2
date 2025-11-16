import React from "react";

const ToggleButton = ({ icon: Icon, label, isActive, onClick, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500/30 border-blue-400/40",
    purple: "bg-purple-500/30 border-purple-400/40",
    orange: "bg-orange-500/30 border-orange-400/40",
    green: "bg-emerald-500/30 border-emerald-400/40",
  };

  const activeStyles = colors[color] || colors.blue;

  return (
    <button
      onClick={onClick}
      className={`w-full h-12 rounded-2xl px-3 flex items-center gap-3 text-sm transition border ${
        isActive
          ? `${activeStyles} text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)]`
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
          isActive ? "bg-black/10" : "bg-white/10"
        }`}
      >
        <Icon className="w-4 h-4" strokeWidth={2.2} />
      </div>
      <span className="font-medium tracking-tight">{label}</span>
    </button>
  );
};

export default ToggleButton;
