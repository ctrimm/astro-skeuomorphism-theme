import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface PatchBayProps {
  className?: string;
}

export const SkeuoPatchBay = ({ className }: PatchBayProps) => {
  // Hardcoded synth connections to demonstrate the aesthetic
  const [connections, setConnections] = useState<Record<string, string | null>>({
    'OUT_1': 'IN_A',
    'OUT_2': null,
    'OUT_3': 'IN_C',
    'OUT_4': null
  });

  const { play } = useSkeuoSound();

  const handleJackClick = (id: string, isInput: boolean) => {
    play("clack", 0.8);
    // In a real implementation this would drag a cable wire. Here we just toggle visibility of existing wires.
    setConnections(prev => {
        const next = { ...prev };
        if (!isInput) {
            // Unplug if plugged
            if (next[id]) {
                next[id] = null;
            } else {
                // Plug randomly to available
                next[id] = `IN_${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}`;
            }
        }
        return next;
    });
  };

  const renderJack = (label: string, id: string, isInput: boolean) => {
    // Check if this jack is connected
    let isPlugged = false;
    let colorClass = "bg-[#111]";
    
    if (isInput) {
        isPlugged = Object.values(connections).includes(id);
        colorClass = isPlugged ? "bg-red-950 border-red-900/50" : "bg-[#111] border-black";
    } else {
        isPlugged = !!connections[id];
        colorClass = isPlugged ? "bg-blue-950 border-blue-900/50" : "bg-[#111] border-black";
    }

    return (
      <div className="flex flex-col items-center gap-3">
        {/* Metal Hex Nut Retainer */}
        <div 
          className="relative w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-sm shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_1px_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
           onClick={() => handleJackClick(id, isInput)}
        >
          {/* Inner Threaded Tube */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#333] shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.8)] border border-[#555] flex items-center justify-center p-1">
             {/* The Jack Hole */}
             <div className="w-5 h-5 rounded-full bg-[#050505] shadow-[inset_0_5px_10px_rgba(0,0,0,1)] relative overflow-hidden flex items-center justify-center">
                 {/* Shiny Tip reflection inside unplugged jack */}
                 {!isPlugged && <div className="w-2 h-2 rounded-full bg-white/10 shadow-[0_0_4px_white]"></div>}
                 
                 {/* Inserted Plug End */}
                 {isPlugged && (
                     <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#0a0a0a] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.8)] border-[2px] border-[#333] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#050505] shadow-premium-inset"></div>
                     </div>
                 )}
             </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-gray-500 font-bold tracking-widest uppercase">{label}</span>
            {/* Status LED */}
            <div className={cn(
              "w-2 h-2 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6)]",
              isPlugged ? (isInput ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-blue-500 shadow-[0_0_8px_#3b82f6]") : "bg-black/40"
            )}></div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("p-8 bg-gradient-to-br from-[#1d1f21] to-[#121314] rounded-lg border border-[#2a2d32] shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.05)] relative overflow-hidden", className)}>
        
        {/* Brushed Metal Panel Texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }}></div>
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay"></div>

        <div className="relative z-10 flex gap-12">
            
            {/* OUTPUTS Layer */}
            <div className="flex flex-col gap-6">
                <span className="text-sm font-sans font-bold text-gray-300 tracking-[0.2em] border-b border-[#333] pb-2 px-2 text-center shadow-[0_1px_0_rgba(255,255,255,0.05)]">CV OUT</span>
                <div className="grid grid-cols-2 gap-8 bg-[#181a1c] p-6 rounded border border-[#222] shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
                    {renderJack("LFO 1", "OUT_1", false)}
                    {renderJack("LFO 2", "OUT_2", false)}
                    {renderJack("ENV 1", "OUT_3", false)}
                    {renderJack("ENV 2", "OUT_4", false)}
                </div>
            </div>

            {/* Simulated Heavy Rubber Cables (SVG Overlays) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" style={{ filter: 'drop-shadow(0px 15px 10px rgba(0,0,0,0.8))' }}>
                <defs>
                   <linearGradient id="cable-red" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#991b1b" />
                      <stop offset="100%" stopColor="#450a0a" />
                   </linearGradient>
                   <linearGradient id="cable-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#0f172a" />
                   </linearGradient>
                   <linearGradient id="cable-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                      <stop offset="10%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                </defs>

                {connections['OUT_1'] && (
                   <g>
                     {/* Base colored cable */}
                     <path d="M 60 100 Q 150 250, 290 100" stroke="url(#cable-red)" strokeWidth="16" fill="none" strokeLinecap="round" />
                     {/* Specular curved highlight to add 3D plastic material */}
                     <path d="M 60 100 Q 150 250, 290 100" stroke="url(#cable-highlight)" strokeWidth="8" fill="none" strokeLinecap="round" className="opacity-60" />
                     {/* Heavy shadow beneath the wire */}
                     <path d="M 60 100 Q 150 250, 290 100" stroke="rgba(0,0,0,0.5)" strokeWidth="4" fill="none" transform="translate(0, 4)" />
                   </g>
                )}
                {connections['OUT_3'] && (
                   <g>
                     <path d="M 60 215 Q 180 350, 395 215" stroke="url(#cable-blue)" strokeWidth="16" fill="none" strokeLinecap="round" />
                     <path d="M 60 215 Q 180 350, 395 215" stroke="url(#cable-highlight)" strokeWidth="8" fill="none" strokeLinecap="round" className="opacity-60" />
                     <path d="M 60 215 Q 180 350, 395 215" stroke="rgba(0,0,0,0.5)" strokeWidth="4" fill="none" transform="translate(0, 4)" />
                   </g>
                )}
            </svg>

            {/* INPUTS Layer */}
            <div className="flex flex-col gap-6">
                <span className="text-sm font-sans font-bold text-gray-300 tracking-[0.2em] border-b border-[#333] pb-2 px-2 text-center shadow-[0_1px_0_rgba(255,255,255,0.05)]">VCO IN</span>
                <div className="grid grid-cols-2 gap-8 bg-[#181a1c] p-6 rounded border border-[#222] shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
                    {renderJack("FREQ 1", "IN_A", true)}
                    {renderJack("SHAPE 1", "IN_B", true)}
                    {renderJack("FREQ 2", "IN_C", true)}
                    {renderJack("SHAPE 2", "IN_D", true)}
                </div>
            </div>

        </div>
    </div>
  );
};
