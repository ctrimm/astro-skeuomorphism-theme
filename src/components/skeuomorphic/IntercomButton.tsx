import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface IntercomProps {
  label?: string;
  className?: string;
}

export const SkeuoIntercomButton = ({
  label = "PUSH TO TALK",
  className,
}: IntercomProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { play } = useSkeuoSound();

  const handleMouseDown = () => {
    setIsPressed(true);
    play("click", 0.9);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    play("click", 0.3);
  };

  return (
    <div className={cn("p-6 bg-gradient-to-br from-[#c8d0d8] to-[#919ba5] rounded text-gray-800 shadow-[0_15px_30px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(0,0,0,0.4)] border border-[#7a8694] flex items-center gap-8 relative overflow-hidden", className)}>
      
      {/* Heavy Brushed Aluminum Surface Texture */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.4) 1px, rgba(255,255,255,0.4) 2px)' }}></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)' }}></div>

      {/* Mounting Screws */}
      <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-zinc-300 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.5)] flex items-center justify-center -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-zinc-300 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.5)] flex items-center justify-center rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>

      {/* Speaker Grille Sub-Component */}
      <div className="relative w-32 h-32 rounded bg-[#111] shadow-[inset_0_5px_15px_rgba(0,0,0,1),0_2px_4px_rgba(255,255,255,0.5)] border border-[#444] p-2 flex items-center justify-center overflow-hidden">
        {/* Grille Hole Pattern */}
        <div className="absolute inset-0 opacity-80" style={{ 
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', 
          backgroundSize: '6px 6px',
        }}></div>
        {/* Internal speaker cone ghosting */}
        <div className="w-24 h-24 rounded-full bg-white/5 blur-md"></div>
        <div className="w-10 h-10 rounded-full bg-white/10 blur-sm absolute"></div>
      </div>

      {/* Push-to-Talk Button Assembly */}
      <div className="flex flex-col items-center gap-4 relative z-10 w-32">
        <div className="w-24 h-24 rounded-full bg-[#1a1c1e] shadow-[inset_0_5px_10px_rgba(0,0,0,1),0_2px_3px_rgba(255,255,255,0.5)] border border-[#333] p-1.5 flex items-center justify-center">
          
          {/* Momentary Metallic Thumb Button */}
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPressed(false)}
            className={cn(
              "w-full h-full rounded-full transition-all duration-75 outline-none flex items-center justify-center font-bold text-[#8a95a5]",
              isPressed 
                ? "bg-gradient-to-b from-[#333] to-[#111] shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] scale-95"
                : "bg-gradient-to-tr from-[#94a1b0] to-[#f3f4f6] shadow-[0_8px_15px_rgba(0,0,0,0.8),inset_0_4px_6px_rgba(255,255,255,0.9),inset_0_-4px_6px_rgba(0,0,0,0.3)] border border-[#5a6575]"
            )}
          >
            {/* Indent Thumb Scoop */}
            <div className={cn(
              "w-12 h-12 rounded-full",
              isPressed ? "bg-black/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" : "bg-[#c8d0d8] shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.8)]"
            )}></div>
          </button>
        </div>
        
        {/* Recessed Engraved Label */}
        <div className="w-full text-center">
          <span className="text-[10px] font-sans font-bold text-gray-700 uppercase tracking-widest block opacity-70" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}>{label}</span>
          <span className="text-[8px] font-mono text-gray-500/80 uppercase tracking-widest block mt-1">HOLD TO TRANS</span>
        </div>
        
        {/* Status Indicator LED */}
        <div className={cn(
          "absolute -top-2 right-0 w-3 h-3 rounded-full transition-colors duration-300 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.5)] border border-[#555]",
          isPressed ? "bg-green-500 shadow-[0_0_10px_#22c55e,inset_1px_1px_3px_rgba(255,255,255,0.8)]" : "bg-green-950/40"
        )}></div>
      </div>
    </div>
  );
};
