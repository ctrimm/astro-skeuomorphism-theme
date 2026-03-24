import React from "react";
import { cn } from "@/lib/utils";

interface NixieTubeProps {
  value: number; // Single digit 0-9
  className?: string;
  glow?: boolean;
}

export const SkeuoNixieTube = ({
  value,
  className,
  glow = true,
}: NixieTubeProps) => {
  const digit = Math.max(0, Math.min(9, Math.floor(value)));
  const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={cn("relative w-20 h-40 flex items-center justify-center", className)}>
      {/* Base/Socket */}
      <div className="absolute bottom-0 inset-x-2 h-10 bg-gradient-to-b from-[#222] to-[#0a0a0a] rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-[#111] z-0">
        <div className="absolute top-2 inset-x-0 h-1 bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
        {/* Metal pins at bottom */}
        <div className="absolute bottom-[-6px] left-1/4 w-1.5 h-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-sm"></div>
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-sm"></div>
        <div className="absolute bottom-[-6px] right-1/4 w-1.5 h-2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-sm"></div>
      </div>

      {/* Glass Tube Cylinder */}
      <div className="relative w-16 h-36 bg-gradient-to-b from-white/5 to-white/10 rounded-t-[2rem] rounded-b border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] z-10 overflow-hidden flex items-center justify-center">
        
        {/* Interior Hexagonal Mesh Grid */}
        <div className="absolute inset-x-1 top-4 bottom-2 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
        
        {/* Central Anode Grid (background dark mesh) */}
        <div className="w-10 h-24 rounded border border-orange-950/40 opacity-40 mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0wIDEweDRMMCA0IiBzdHJva2U9IiM1NSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')]"></div>

        {/* Stacked Wire Digits */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-serif text-5xl font-light">
          {allDigits.map((num) => {
            const isActive = num === digit;
            // Introduce slight offsets to simulate depth layering of numbers
            const depthOffset = (num - 4.5) * 1.5; 
            
            return (
              <span 
                key={num}
                className={cn(
                  "absolute transition-all duration-300",
                  isActive 
                    ? "text-[#ff6600] z-20 scale-100" 
                    : "text-[#3a1a0a] z-0 scale-95 opacity-50 blur-[1px]",
                )}
                style={{ 
                  transform: `translateZ(${depthOffset}px) translateY(${depthOffset * 0.5}px)`,
                  textShadow: isActive && glow ? '0 0 8px #ff4400, 0 0 15px #ff2200, 0 0 30px #ff0000' : 'none',
                  filter: isActive ? 'drop-shadow(0 0 2px #ff6600)' : 'none'
                }}
              >
                {num}
              </span>
            );
          })}
        </div>
        
        {/* Tube Internal Ambient Neon Glow */}
        {glow && (
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-16 bg-[#ff4400] blur-xl opacity-20 pointer-events-none mix-blend-screen rounded-full transition-opacity duration-300"></div>
        )}

        {/* Front Glass Reflections */}
        <div className="absolute top-0 right-1 bottom-0 w-2 bg-gradient-to-b from-white/30 via-white/5 to-transparent blur-[1px] rounded-r-[2rem]"></div>
        <div className="absolute top-2 left-2 w-[40%] h-[30%] bg-gradient-to-br from-white/20 to-transparent blur-[2px] rounded-t-full rounded-l-full rotate-[-15deg]"></div>
        <div className="absolute inset-[2px] border border-white/10 rounded-t-[2rem] rounded-b pointer-events-none mix-blend-overlay"></div>
      </div>
    </div>
  );
};
