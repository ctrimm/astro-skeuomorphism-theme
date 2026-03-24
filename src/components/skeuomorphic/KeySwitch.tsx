import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface KeySwitchProps {
  label?: string;
  className?: string;
}

export const SkeuoKeySwitch = ({
  label = "SYSTEM LOCK",
  className,
}: KeySwitchProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const { play } = useSkeuoSound();

  const handleTurn = () => {
    setUnlocked(!unlocked);
    play("clack", 0.6);
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="relative p-2 bg-[#2a2d32] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1),inset_0_-2px_10px_rgba(0,0,0,0.8)] border border-gray-800">
        
        {/* Outer Cylinder Ring */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c0c0c0] to-[#737373] shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_4px_8px_rgba(255,255,255,0.8)] flex items-center justify-center border border-[#555] relative cursor-pointer" onClick={handleTurn}>
          {/* Metal Grain Noise */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-full pointer-events-none"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.3)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.3)_225deg,transparent_270deg)] opacity-40 rounded-full mix-blend-overlay pointer-events-none"></div>
          
          {/* Inner Recess Hole */}
          <div className="w-14 h-14 rounded-full bg-[#111] shadow-[inset_0_10px_20px_rgba(0,0,0,1)] border border-black/50 flex items-center justify-center relative">
            
            {/* The Rotating Key Cylinder */}
            <div 
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#999] to-[#cccccc] shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: unlocked ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              <div className="absolute text-[8px] font-sans font-bold text-gray-700/50 top-1">LOCK</div>
              
              {/* Inserted Key Profile */}
              <div className="w-[4px] h-8 bg-[#050505] shadow-[inset_0_2px_5px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative">
                {/* Visual Key Shaft leaving cylinder */}
                <div className="absolute w-[6px] h-12 bg-gradient-to-b from-[#e3e3e3] to-[#888] rounded-sm transform translate-z-[10px] shadow-[2px_10px_10px_rgba(0,0,0,0.6),inset_1px_0_2px_rgba(255,255,255,0.8)]">
                  {/* Key Grooves */}
                  <div className="absolute right-[1px] top-2 bottom-2 w-[1px] bg-black/40"></div>
                  <div className="absolute left-[1px] top-2 bottom-5 w-[1px] bg-black/40"></div>
                  
                  {/* The Key's Bow (Handle) standing outwards in perspective */}
                  <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-[#d4d4d4] to-[#7f7f7f] rounded-t-[10px] rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_3px_rgba(255,255,255,0.9)] flex items-center justify-center transform origin-bottom border border-[#555] border-b-transparent">
                    <div className="w-4 h-4 bg-[#111] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,1)]"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Alignment Markers */}
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-zinc-500 font-bold">L</div>
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-[8px] font-mono tracking-widest text-red-500 font-bold">U</div>
        </div>
      </div>

      {label && (
        <span className="text-sm font-mono text-gray-400 tracking-[0.2em] font-bold uppercase">{label}</span>
      )}
    </div>
  );
};
