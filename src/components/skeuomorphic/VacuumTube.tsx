import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface VacuumTubeProps {
  powered?: boolean;
  className?: string;
}

export const SkeuoVacuumTube = ({
  powered = false,
  className,
}: VacuumTubeProps) => {
  const [isHeated, setIsHeated] = useState(false);
  const { play } = useSkeuoSound();

  // Simulate tube warm-up time
  useEffect(() => {
    if (powered) {
      const timer = setTimeout(() => {
        setIsHeated(true);
      }, 1500); // Takes 1.5s to visually "warm up"
      return () => clearTimeout(timer);
    } else {
      setIsHeated(false);
    }
  }, [powered]);

  return (
    <div className={cn("relative flex flex-col items-center justify-end w-32 h-64", className)}>
      
      {/* Background Tube Base (Sockets & Pins) */}
      <div className="absolute bottom-0 w-24 h-8 bg-gradient-to-b from-[#111] to-[#050505] rounded-b-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)] border border-[#222] z-10 flex flex-col items-center justify-end">
         {/* Internal socket glow */}
         <div className={cn(
           "absolute top-[-10px] w-16 h-4 rounded-full mix-blend-screen transition-opacity duration-[2s]",
           isHeated ? "bg-orange-500/40 blur-md opacity-100" : "opacity-0"
         )}></div>
         <div className="flex justify-evenly w-full px-4 pb-0.5">
           <div className="w-1.5 h-3 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-b-full shadow-[0_4px_4px_rgba(0,0,0,0.8)]"></div>
           <div className="w-1.5 h-4 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-b-full shadow-[0_4px_4px_rgba(0,0,0,0.8)]"></div>
           <div className="w-2   h-5 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-b-full shadow-[0_4px_4px_rgba(0,0,0,0.8)]"></div>
           <div className="w-1.5 h-4 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-b-full shadow-[0_4px_4px_rgba(0,0,0,0.8)]"></div>
           <div className="w-1.5 h-3 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-b-full shadow-[0_4px_4px_rgba(0,0,0,0.8)]"></div>
         </div>
      </div>

      {/* The Glass Envelope */}
      <div className="relative w-28 h-56 bg-white/5 backdrop-blur-[1.5px] rounded-[3rem] border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] z-20 overflow-hidden flex flex-col items-center p-2 pt-6">
        
        {/* Mica Spacers (Top & Bottom) */}
        <div className="absolute top-8 w-20 h-[3px] bg-white/20 rounded-full border border-white/30 backdrop-blur-md shadow-[0_2px_5px_rgba(0,0,0,0.8)] z-10"></div>
        <div className="absolute bottom-12 w-20 h-[3px] bg-white/20 rounded-full border border-white/30 backdrop-blur-md shadow-[0_-2px_5px_rgba(0,0,0,0.8)] z-10"></div>

        {/* Anode Plates (Metal Structure) */}
        <div className="relative w-12 h-32 bg-gradient-to-t from-[#222] via-[#444] to-[#222] rounded shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_5px_10px_rgba(0,0,0,0.5)] border-2 border-zinc-500/50 flex justify-center items-center z-20">
            {/* Ventilation/Grid Holes */}
            <div className="w-8 h-24 bg-black/40 rounded-sm shadow-[inset_0_2px_5px_rgba(0,0,0,1)] flex flex-col justify-evenly py-1 px-1">
                {/* Horizontal grid wires */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-zinc-400/50"></div>
                ))}
            </div>

            {/* Glowing Filament (Cathode Heater) */}
            <div className={cn(
              "absolute inset-y-2 w-1.5 rounded-full transition-all duration-[3s] ease-in-out shadow-[0_0_15px_rgba(255,100,0,0.8)] blur-[1px]",
              isHeated ? "bg-[#ff8800] opacity-100" : "bg-red-950 opacity-20 shadow-none blur-0"
            )}></div>
            <div className={cn(
              "absolute inset-y-4 w-0.5 rounded-full transition-all duration-[2s] ease-in-out bg-white blur-[0.5px]",
              isHeated ? "opacity-90" : "opacity-0"
            )}></div>
            
        </div>

        {/* Outer Glow bleeding from the tube */}
        <div className={cn(
          "absolute inset-0 mix-blend-screen transition-opacity duration-[3s] ease-in-out pointer-events-none z-0",
          isHeated ? "opacity-100" : "opacity-0"
        )}>
          {/* Internal ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 blur-2xl rounded-full"></div>
          {/* Sharp core reflection */}
          <div className="absolute top-[40%] left-[30%] w-4 h-16 bg-[#ffeedd] opacity-30 blur-md rounded-full rotate-12"></div>
        </div>

        {/* Glass Curvature Reflections (Front & Edges) */}
        <div className="absolute top-1 left-4 w-4 h-[85%] bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-[2px] rounded-full pointer-events-none z-30"></div>
        <div className="absolute top-2 right-2 w-[15%] h-[40%] bg-gradient-to-bl from-white/20 to-transparent blur-[1px] rounded-tr-full rounded-bl-full pointer-events-none z-30"></div>
        <div className="absolute top-2 inset-x-4 h-[10%] bg-gradient-to-b from-white/20 to-transparent blur-[2px] rounded-t-full pointer-events-none z-30"></div>
      </div>

       {/* Labeling on tube glass */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-16 text-center z-30 mix-blend-overlay opacity-60">
          <span className="text-[10px] font-mono text-zinc-300 tracking-widest block transform scale-y-150 rotate-[-90deg]">12AX7A</span>
       </div>
    </div>
  );
};
