import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
}

export const SkeuoSlider = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  label,
  className,
}: SliderProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {label && (
        <div className="flex justify-between items-center bg-[#111] p-2 rounded shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-gray-800">
          <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
          <span className="text-xs text-green-400 font-mono tracking-widest drop-shadow-[0_0_4px_rgba(74,222,128,0.4)] relative">
            {currentValue}
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]"></span>
          </span>
        </div>
      )}

      <div className="relative h-14 rounded bg-[#1c1d1e] shadow-[0_10px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black p-3 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>

        {/* Track */}
        <div className="absolute inset-x-3 top-4 bottom-4 rounded overflow-hidden bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 flex items-center group/slider">
          <div className="absolute inset-0 block repeating-linear-gradient-[45deg,transparent,transparent_4px,rgba(255,255,255,0.02)_4px,rgba(255,255,255,0.02)_8px]"></div>
          {/* Fill */}
          <div
            className="h-full bg-gradient-to-r from-blue-700 to-blue-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_12px_rgba(59,130,246,0.6)] transition-all duration-150 relative border-r border-blue-400"
            style={{ width: `${percentage}%` }}
          >
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
             <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-r from-transparent to-white/30 mix-blend-overlay" />
          </div>
        </div>

        {/* Slider handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label={label}
        />

        {/* Visual handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-12 rounded bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] pointer-events-none transition-all duration-150 border border-black overflow-hidden z-20 group-hover/slider:brightness-110"
          style={{ left: `calc(${percentage}% - 1rem)` }}
        >
          {/* Horizontal grip lines */}
          <div className="absolute inset-x-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
            ))}
          </div>
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-black/50">
            <div className="w-full h-full rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)] opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
