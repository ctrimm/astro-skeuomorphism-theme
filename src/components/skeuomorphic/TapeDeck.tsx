import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface TapeDeckProps {
  label?: string;
  className?: string;
  playing?: boolean;
}

export const SkeuoTapeDeck = ({
  label = "ANALOG RECORD",
  className,
  playing: _playing,
}: TapeDeckProps) => {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const { play } = useSkeuoSound();

  const isPlaying = _playing !== undefined ? _playing : internalPlaying;

  const handleTogglePlay = () => {
    setInternalPlaying(!isPlaying);
    play("clack", 0.6);
  };

  return (
    <div className={cn("p-6 bg-gradient-to-br from-[#2a2d32] to-[#1c1d1e] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1),inset_0_-2px_10px_rgba(0,0,0,0.8)] border border-gray-800 flex flex-col items-center gap-6", className)}>
      
      {/* Matte metal plate surface */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-xl pointer-events-none"></div>
      
      {/* Label and Status */}
      <div className="flex justify-between w-full px-4 relative z-10">
        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <div className="flex gap-2 items-center">
            <span className="text-[10px] font-mono font-bold text-gray-600 uppercase">REC</span>
            <div className={cn(
              "w-2 h-2 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)]",
              isPlaying ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8),inset_1px_1px_2px_rgba(0,0,0,0.2)]" : "bg-red-950/40"
            )}></div>
        </div>
      </div>

      {/* Tape Mechanism Area */}
      <div className="relative w-72 h-40 bg-[#111] rounded-lg shadow-premium-inset border-2 border-[#050505] overflow-hidden flex items-center justify-between px-6 pb-4">
        
        {/* Playback Head / Central Mechanism Recess */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-t from-[#222] to-[#1a1a1a] rounded-t-lg shadow-[0_-5px_15px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.2)] border border-[#333] z-10 flex justify-center items-start pt-2">
            {/* Magnetic Tape Path Guides */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.8),inset_1px_1px_2px_rgba(255,255,255,0.8)] mx-2"></div>
            <div className="w-8 h-6 bg-gradient-to-b from-[#444] to-[#222] rounded-sm shadow-premium-inset border border-[#111] mx-2 flex items-center justify-center">
                <div className="w-6 h-2 bg-[#050505] rounded-full"></div>
            </div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-700 shadow-[2px_2px_5px_rgba(0,0,0,0.8),inset_1px_1px_2px_rgba(255,255,255,0.8)] mx-2"></div>
        </div>

        {/* Magnetic Tape Span (Background Line) */}
        <div className="absolute top-[68px] left-12 right-12 h-[2px] bg-[#050505] shadow-[0_1px_1px_rgba(255,255,255,0.1)] z-0"></div>

        {/* Left Reel */}
        <div className={cn(
            "relative w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] border-2 border-zinc-500/30 flex items-center justify-center z-10",
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
        )}>
            {/* Tape spooled on reel */}
            <div className="absolute inset-3 rounded-full border-[12px] border-[#0a0a0a]"></div>
            
            {/* Aluminum Reel Spokes */}
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] rotate-60 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] -rotate-60 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            
            {/* Center Hub */}
            <div className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-[#3f3f46] to-[#d4d4d8] shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] shadow-premium-inset"></div>
            </div>
        </div>

         {/* Right Reel */}
         <div className={cn(
            "relative w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] border-2 border-zinc-500/30 flex items-center justify-center z-10",
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
        )}>
            {/* Less Tape spooled on reel (simulating progress) */}
            <div className="absolute inset-5 rounded-full border-[8px] border-[#0a0a0a]"></div>
            
            {/* Aluminum Reel Spokes */}
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] rotate-60 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            <div className="absolute w-full h-[6px] bg-gradient-to-b from-[#a1a1aa] to-[#71717a] -rotate-60 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            
            {/* Center Hub */}
            <div className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-[#3f3f46] to-[#d4d4d8] shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] shadow-premium-inset"></div>
            </div>
        </div>

      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 relative z-10 bg-[#151515] p-2 rounded-lg border border-[#222] shadow-[inset_0_5px_10px_rgba(0,0,0,0.6)]">
          {/* Pause */}
          <button className="w-10 h-6 bg-gradient-to-t from-[#333] to-[#555] rounded-sm shadow-[0_4px_6px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] border-b-2 border-[#111] active:translate-y-1 active:border-b-0 transition-all">
             <div className="flex justify-center gap-1 mx-auto w-3"><div className="w-1 h-3 bg-black/60 rounded-[1px]"></div><div className="w-1 h-3 bg-black/60 rounded-[1px]"></div></div>
          </button>
          
          {/* Play */}
          <button 
            onClick={handleTogglePlay}
            className={cn(
              "w-10 h-6 rounded-sm transition-all flex items-center justify-center",
              isPlaying 
                ? "bg-gradient-to-t from-[#222] to-[#111] shadow-[inset_0_4px_6px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] translate-y-1"
                : "bg-gradient-to-t from-[#333] to-[#555] shadow-[0_4px_6px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] border-b-2 border-[#111] active:translate-y-1 active:border-b-0"
            )}
          >
             <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-black/80 border-b-4 border-b-transparent ml-1"></div>
          </button>

          {/* Stop */}
          <button 
             onClick={() => setInternalPlaying(false)}
             className="w-10 h-6 bg-gradient-to-t from-[#333] to-[#555] rounded-sm shadow-[0_4px_6px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] border-b-2 border-[#111] active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center"
          >
             <div className="w-3 h-3 bg-black/60 rounded-[1px]"></div>
          </button>
      </div>

    </div>
  );
};
