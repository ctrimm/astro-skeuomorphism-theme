import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface FlipSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const SkeuoFlipSwitch = ({
  label,
  checked: controlledChecked,
  onChange,
  className,
}: FlipSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const { play } = useSkeuoSound();

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const newState = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(newState);
    onChange?.(newState);
    play(newState ? "switchOn" : "switchOff");
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Rectangular Base Plate */}
      <div className="relative w-16 h-28 bg-gradient-to-b from-[#b8c2cc] to-[#8a95a5] rounded shadow-[0_10px_20px_rgba(0,0,0,0.6),inset_0_2px_5px_rgba(255,255,255,0.8),inset_0_-2px_5px_rgba(0,0,0,0.4)] border border-[#5a6575] flex items-center justify-center cursor-pointer group"
           onClick={handleToggle}>
        
        {/* Brushed Metal Texture */}
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)' }}></div>

        {/* Mounting Screws */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.5)]"><div className="w-full h-[1px] bg-black/60 rotate-45 mt-1"></div></div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.5)]"><div className="w-full h-[1px] bg-black/60 -rotate-45 mt-1"></div></div>

        {/* Threaded Toggle Base (Nut) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#d1d5db] to-[#6b7280] shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.8)] flex items-center justify-center border border-[#4b5563]">
          {/* Nut Ridges */}
          <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#4b5563]/30"></div>
          
          {/* Black Slot / Hole */}
          <div className="w-4 h-10 bg-[#050505] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* The Actual Metal Toggle Bat/Shaft */}
            <div 
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-3 h-14 bg-gradient-to-r from-[#e5e7eb] via-[#ffffff] to-[#9ca3af] rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.9)] transition-transform duration-200 ease-out origin-center",
                isChecked ? "translate-y-[-70%]" : "translate-y-[-10%]"
              )}
            >
              {/* Bat tip reflection */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full bg-white blur-[1px] opacity-80"></div>
            </div>
          </div>
        </div>
        
        {/* State Labels Engraved on Plate */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[7px] font-sans font-bold text-gray-700 uppercase tracking-widest opacity-80" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>ON</div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[7px] font-sans font-bold text-gray-700 uppercase tracking-widest opacity-80" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>OFF</div>
      </div>

      {label && (
        <span className="text-sm font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
      )}
    </div>
  );
};
