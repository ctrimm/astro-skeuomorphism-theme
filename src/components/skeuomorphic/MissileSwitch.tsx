import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface MissileSwitchProps {
  label?: string;
  className?: string;
}

export const SkeuoMissileSwitch = ({
  label = "ARM SYSTEM",
  className,
}: MissileSwitchProps) => {
  const [coverOpen, setCoverOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const { play } = useSkeuoSound();

  const handleCoverClick = () => {
    if (coverOpen && switchOn) {
      // Closing the cover forces the switch off
      setSwitchOn(false);
      setTimeout(() => {
        setCoverOpen(false);
        play("clack", 0.7);
      }, 150);
    } else {
      setCoverOpen(!coverOpen);
      play("clack", 0.5);
    }
  };

  const handleSwitchToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!coverOpen) return;
    
    setSwitchOn(!switchOn);
    play(switchOn ? "switchOff" : "switchOn");
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative" style={{ perspective: "1000px" }}>
        
        {/* Base Plate */}
        <div className="w-16 h-24 bg-gradient-to-b from-[#222] to-[#111] rounded shadow-[0_5px_15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#050505] flex items-center justify-center relative">
          {/* Threaded Toggle Base (Nut) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#d1d5db] to-[#6b7280] shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.8)] flex items-center justify-center border border-[#4b5563]">
            {/* Black Slot */}
            <div className="w-4 h-10 bg-[#050505] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,1)] relative overflow-hidden cursor-pointer" onClick={handleSwitchToggle}>
              {/* Internal Metal Toggle Bat */}
              <div 
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-3 h-14 bg-gradient-to-r from-[#e5e7eb] via-[#ffffff] to-[#9ca3af] rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.9)] transition-transform duration-200 ease-out origin-center",
                  switchOn ? "translate-y-[-70%]" : "translate-y-[-10%]"
                )}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-white blur-[1px] opacity-80"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Glossy Red Flip Cover */}
        <div 
          className={cn(
            "absolute top-[-4%] left-[-10%] w-[120%] h-[115%] bg-gradient-to-b from-red-600/90 to-red-800/95 backdrop-blur-[2px] rounded-t-lg rounded-b shadow-[0_15px_25px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(0,0,0,0.8)] border-x border-t border-red-400/50 cursor-pointer origin-top transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 flex flex-col justify-end pb-3 items-center",
          )}
          style={{ transform: coverOpen ? "rotateX(130deg)" : "rotateX(0deg)", transformStyle: "preserve-3d" }}
          onClick={handleCoverClick}
        >
          {/* Cover Grip Ridges */}
          <div className="w-6 h-[2px] bg-red-950/50 rounded-full mb-1 shadow-[0_1px_0_rgba(255,255,255,0.3)]"></div>
          <div className="w-6 h-[2px] bg-red-950/50 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.3)]"></div>
          
          {/* Glass Highlight */}
          <div className="absolute top-1 inset-x-1 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg"></div>
        </div>

        {/* Hinge Mechanism */}
        <div className="absolute top-[-6%] left-[-15%] right-[-15%] h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.9)] z-0 flex items-center justify-between px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
        </div>
      </div>

      {label && (
        <span className="text-sm font-mono tracking-widest text-red-500 uppercase drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] bg-[#111] px-2 py-1 rounded border border-gray-800 font-bold">{label}</span>
      )}
    </div>
  );
};
