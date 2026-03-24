import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface MeterProps {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color?: "blue" | "green" | "red" | "orange";
  className?: string;
}

export const SkeuoMeter = ({
  value = 50,
  min = 0,
  max = 100,
  label,
  color = "blue",
  className,
}: MeterProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    orange: "from-orange-400 to-orange-600",
  };

  return (
    <div className={cn("flex flex-col items-center gap-4 bg-[#1c1d1e] p-6 rounded shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* Module Screws */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>

      <div className="relative w-48 h-24 z-10 mt-2">
        {/* Meter background */}
        <div className="absolute bottom-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-0 w-full h-full rounded-t-full bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 overflow-hidden relative">
            {/* Inner face */}
            <div className="absolute bottom-0 inset-x-3 top-3 rounded-t-full bg-[#111] shadow-[inset_0_1px_3px_rgba(0,0,0,1)] border-t border-gray-800 overflow-hidden">
              <div className="absolute inset-0 block repeating-linear-gradient-[45deg,transparent,transparent_4px,rgba(255,255,255,0.02)_4px,rgba(255,255,255,0.02)_8px]"></div>
              {/* Glass reflection on face */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
              {/* Scale marks */}
              {[...Array(11)].map((_, i) => {
                const markAngle = (i / 10) * 180 - 90;
                return (
                  <div
                    key={i}
                    className="absolute bottom-1 w-0.5 h-3 bg-gray-500 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]"
                    style={{
                      left: "50%",
                      transform: `translateX(-50%) rotate(${markAngle}deg)`,
                      transformOrigin: "bottom center",
                    }}
                  />
                );
              })}

              {/* Value arc */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                <path
                  d="M 20 80 A 80 80 0 0 1 180 80"
                  fill="none"
                  stroke="url(#meterGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 251} 251`}
                  className="drop-shadow-[0_0_8px_currentColor]"
                />
                <defs>
                  <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`text-${color}-500`} stopColor="currentColor" />
                    <stop offset="100%" className={`text-${color}-400`} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Needle */}
              <div
                className="absolute bottom-0 left-1/2 w-1.5 h-16 bg-gradient-to-t from-red-800 to-red-500 rounded-full shadow-[2px_4px_6px_rgba(0,0,0,0.8),inset_-1px_0_1px_rgba(0,0,0,0.6),inset_1px_0_1px_rgba(255,255,255,0.4)] origin-bottom transition-transform duration-300 z-10 border border-black/50"
                style={{
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              >
              </div>

              {/* Center pivot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-black z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-black overflow-hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="flex flex-col items-center gap-1 z-10 w-full">
        <div className="w-full flex justify-between items-center px-2 mb-1">
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">PWR_LVL</span>
          {label && <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>}
        </div>
        <div className="px-5 py-2 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 relative w-full text-center">
          {/* LCD glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20" />
          <span className={cn("text-xl font-mono font-bold tracking-widest drop-shadow-[0_0_8px_currentColor] relative z-10", `text-${color}-400`)}>
            {value.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
