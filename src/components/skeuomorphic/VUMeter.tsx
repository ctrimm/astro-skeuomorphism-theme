import React from "react";
import { cn } from "@/lib/utils";

interface VUMeterProps {
  value?: number; // 0 to 100
  label?: string;
  className?: string;
}

export const SkeuoVUMeter = ({
  value = 50,
  label = "VU",
  className,
}: VUMeterProps) => {
  // Map 0-100 to rotation degrees (-45 to 45)
  const clampedValue = Math.max(0, Math.min(100, value));
  const rotation = -45 + (clampedValue / 100) * 90;

  return (
    <div className={cn("relative p-4 rounded-xl bg-[#2a2d32] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1),inset_0_-2px_10px_rgba(0,0,0,0.8)] border border-gray-800 flex flex-col items-center", className)}>
      {/* Casing Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-xl pointer-events-none"></div>
      
      {/* Screen Recess */}
      <div className="relative w-48 h-32 rounded-lg bg-[#e3decf] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),inset_0_-2px_5px_rgba(255,255,255,0.5)] border-2 border-black/80 overflow-hidden flex flex-col items-center justify-end pb-2">
        
        {/* Warm Incandescent Backlight */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-[#fcd34d]/40 via-[#fcd34d]/10 to-transparent pointer-events-none mix-blend-overlay"></div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#fcd34d] opacity-20 blur-2xl pointer-events-none"></div>

        {/* Meter Scale Graphics (Curved) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-20 border-t-2 border-black/30 rounded-t-[100%] overflow-visible pointer-events-none">
          {/* Tick Marks (rough approximation with absolute positioning) */}
          <div className="absolute top-0 left-0 w-[2px] h-3 bg-black/40 origin-bottom transform translate-y-[-100%] -rotate-45"></div>
          <div className="absolute top-[-5px] left-1/4 w-[2px] h-2 bg-black/30 origin-bottom transform translate-y-[-100%] -rotate-22"></div>
          <div className="absolute top-[-10px] left-1/2 w-[2px] h-3 bg-black/40 origin-bottom transform translate-y-[-100%] -translate-x-1/2"></div>
          <div className="absolute top-[-5px] right-1/4 w-[2px] h-2 bg-red-800/50 origin-bottom transform translate-y-[-100%] rotate-22"></div>
          <div className="absolute top-0 right-0 w-[2px] h-3 bg-red-800 origin-bottom transform translate-y-[-100%] rotate-45"></div>
        </div>

        {/* Dynamic Needle */}
        <div className="relative w-full h-[2px] flex justify-center items-end bottom-0 z-10">
          <div 
            className="absolute bottom-0 w-[2px] h-24 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.25,1.5,0.5,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* The physical needle shaft */}
            <div className="w-full h-full bg-gradient-to-r from-[#111] via-[#222] to-[#050505] rounded-t-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)] relative">
               {/* Red tip */}
               <div className="absolute top-0 inset-x-0 h-4 bg-red-600 rounded-t-full"></div>
            </div>
          </div>
          {/* Needle Base Pin */}
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.8)] border border-black z-20 absolute bottom-[-6px]">
            <div className="w-full h-[1px] bg-black/50 rotate-45 mt-1.5 mx-auto w-2"></div>
          </div>
        </div>

        {/* Recessed Text Label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-black/40 uppercase tracking-widest">{label}</div>

        {/* Curved Glass Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-lg shadow-[inset_0_2px_10px_rgba(255,255,255,0.4)]"></div>
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-30 pointer-events-none blur-sm transform -translate-y-8"></div>
      </div>
    </div>
  );
};
