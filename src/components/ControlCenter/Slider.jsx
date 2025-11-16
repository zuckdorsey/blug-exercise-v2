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
        <div
          className="absolute -top-2 -ml-2 w-4 h-4 rounded-full bg-white shadow-lg"
          style={{ left: `calc(${value}% )` }}
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
      </div>
    </div>
  );
};

export default Slider;
