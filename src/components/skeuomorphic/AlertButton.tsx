import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface AlertButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  armed?: boolean; // Determines if the button flashes or shows a warning state
}

export const SkeuoAlertButton = ({
  label = "EMERGENCY STOP",
  onClick,
  className,
  armed = true,
}: AlertButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { play } = useSkeuoSound();

  const handleMouseDown = () => {
    setIsPressed(true);
    play("click", 0.8);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    play("click", 0.4);
    if (onClick) onClick();
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Outer Housing / Guard Ring */}
      <div className="relative p-6 bg-gradient-to-br from-[#2a2d32] to-[#1a1c1e] rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1),inset_0_-2px_10px_rgba(0,0,0,0.8)] border border-gray-800">
        
        {/* Metal Texture Overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-[3rem] pointer-events-none"></div>

        {/* Mounting Screws */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-zinc-400 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center -rotate-45"><div className="w-full h-[1px] bg-black/80"></div></div>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-zinc-400 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center rotate-12"><div className="w-full h-[1px] bg-black/80"></div></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-zinc-400 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center rotate-90"><div className="w-full h-[1px] bg-black/80"></div></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-zinc-400 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center -rotate-12"><div className="w-full h-[1px] bg-black/80"></div></div>

        {/* Warning Track / Recess */}
        <div className={cn(
          "w-36 h-36 rounded-full bg-[#0a0a0a] shadow-[inset_0_10px_20px_rgba(0,0,0,1)] border-2 border-[#050505] flex items-center justify-center relative p-3",
          armed ? "ring-2 ring-red-900/50" : ""
        )}>
          
          {/* Inner Safety Striping (if armed) */}
          {armed && (
            <div className="absolute inset-0 rounded-full opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px)' }}>
            </div>
          )}

          {/* The Actual Button Dome */}
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPressed(false)}
            className={cn(
              "relative w-full h-full rounded-full transition-all duration-150 ease-out outline-none flex items-center justify-center group",
              isPressed 
                ? "bg-gradient-to-b from-red-800 to-red-950 shadow-[inset_0_4px_15px_rgba(0,0,0,0.8),inset_0_-2px_5px_rgba(255,255,255,0.1),0_0_10px_rgba(239,68,68,0.3)] scale-[0.96] translate-y-2"
                : "bg-gradient-to-b from-red-500 to-red-800 shadow-[inset_0_10px_25px_rgba(255,255,255,0.4),inset_0_-10px_20px_rgba(0,0,0,0.6),0_15px_25px_rgba(0,0,0,0.8),0_5px_15px_rgba(239,68,68,0.5)] -translate-y-1"
            )}
          >
            {/* Glossy Glass Highlight */}
            {!isPressed && (
               <div className="absolute top-[5%] left-[10%] w-[80%] h-[40%] rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none blur-[1px]"></div>
            )}
            
            {/* Button Inner Concentric Ring Details */}
            <div className="w-2/3 h-2/3 rounded-full border border-red-400/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"></div>
          </button>
        </div>
      </div>

      {/* Label Box */}
      {label && (
        <div className="bg-[#111] px-4 py-2 rounded shadow-premium-inset border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-500/10 to-red-900/10 pointer-events-none"></div>
          <span className="text-xs font-mono font-bold text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] tracking-[0.2em] relative z-10 transition-colors"
                style={{ textShadow: armed ? '0 0 8px rgba(239, 68, 68, 0.8)' : 'none' }}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
