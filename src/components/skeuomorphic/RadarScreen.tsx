import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RadarScreenProps {
  className?: string;
  gridColor?: string;
  sweepColor?: string;
}

interface Blip {
  id: number;
  x: number;
  y: number;
  life: number;
}

export const SkeuoRadarScreen = ({
  className,
  gridColor = "rgba(34, 197, 94, 0.4)", // green-500
  sweepColor = "rgba(34, 197, 94, 0.5)",
}: RadarScreenProps) => {
  const [blips, setBlips] = useState<Blip[]>([]);

  // Simulation: Add random blips occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setBlips((prev) => {
          // Keep max 5 blips
          const filtered = prev.filter(b => b.life > 0.1);
          filtered.forEach(b => b.life -= 0.15); // fade older blips
          
          return [
            ...filtered,
            {
              id: Date.now(),
              x: 15 + Math.random() * 70, // Percentage 15-85
              y: 15 + Math.random() * 70, // Percentage 15-85
              life: 1.0
            }
          ];
        });
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative p-4 bg-[#1a1c1e] rounded-[3rem] shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.05)] border border-[#2c2e32] flex items-center justify-center", className)}>
      
      {/* Matte Black Front Bezel */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-[3rem] pointer-events-none"></div>

      {/* Outer Display Ring */}
      <div className="relative w-64 h-64 rounded-full bg-[#0a0a0a] shadow-[inset_0_10px_20px_rgba(0,0,0,1)] border-[4px] border-[#111] overflow-hidden flex items-center justify-center">
        
        {/* Phosphor CRT Screen Glass Base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#051105] to-[#010a01]"></div>
        
        {/* Scanlines Overlay (.crt mix) */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)' }}></div>
        
        {/* CRT Vignette */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,1)] pointer-events-none z-30"></div>

        {/* Radar Concentric Grid */}
        <div className="absolute w-[80%] h-[80%] rounded-full border border-green-500/30"></div>
        <div className="absolute w-[60%] h-[60%] rounded-full border border-green-500/30"></div>
        <div className="absolute w-[40%] h-[40%] rounded-full border border-green-500/30"></div>
        <div className="absolute w-[20%] h-[20%] rounded-full border border-green-500/30"></div>
        
        {/* Radar Crosshairs */}
        <div className="absolute w-full h-[1px] bg-green-500/30"></div>
        <div className="absolute h-full w-[1px] bg-green-500/30"></div>

        {/* Dynamic Blips */}
        {blips.map(blip => (
          <div 
            key={blip.id}
            className="absolute w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"
            style={{ 
              left: `${blip.x}%`, 
              top: `${blip.y}%`, 
              opacity: blip.life,
              transform: `scale(${0.5 + blip.life * 0.5})`,
              transition: 'opacity 1.5s ease-out, transform 1.5s ease-out'
            }}
          ></div>
        ))}

        {/* Sweeping Radar Arm */}
        <div className="absolute inset-0 rounded-full overflow-hidden mix-blend-screen opacity-80 pointer-events-none">
           {/* We use an arbitrary animation class assuming we can define one, or we inject keyframes. Using inline style animation. */}
           <div 
             className="w-full h-full"
             style={{ 
               background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${sweepColor} 355deg, #4ade80 360deg)`,
               animation: 'spin 4s linear infinite'
             }}
           ></div>
        </div>

        {/* Front Glass Curvature Highlight */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/10 blur-[1px] pointer-events-none"></div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[70%] h-[15%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full rounded-b-[100%] blur-[2px] pointer-events-none"></div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
