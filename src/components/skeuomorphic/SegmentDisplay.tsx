import React from "react";
import { cn } from "@/lib/utils";

interface SegmentDisplayProps {
  value: string;
  className?: string;
  color?: "red" | "green" | "amber";
}

export const SkeuoSegmentDisplay = ({
  value,
  className,
  color = "red",
}: SegmentDisplayProps) => {
  const colorMap = {
    red: {
      lit: "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]",
      unlit: "text-red-950/30",
      screen: "bg-[#0a0000]",
    },
    green: {
      lit: "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]",
      unlit: "text-green-950/40",
      screen: "bg-[#000a02]",
    },
    amber: {
      lit: "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]",
      unlit: "text-amber-950/30",
      screen: "bg-[#0a0500]",
    }
  };

  const style = colorMap[color];
  const charLength = value.length;
  // Create an unlit background placeholder of 8s
  const placeholder = "8".repeat(charLength);

  return (
    <div className={cn("p-2 bg-gradient-to-b from-[#333] to-[#111] rounded-lg shadow-premium-raised border border-black inline-block", className)}>
      
      {/* Display Screen */}
      <div className={cn(
        "relative px-4 py-2 rounded shadow-premium-inset border-2 border-black/80 flex items-center justify-end overflow-hidden",
        style.screen
      )}>
        {/* Subtle grid/pixel texture mapped over the screen */}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 2px)' }}></div>

        {/* Unlit segments behind */}
        <span className={cn(
          "font-mono font-bold text-3xl tracking-widest absolute right-4 top-1/2 -translate-y-1/2 user-select-none",
          style.unlit
        )}>
          {placeholder}
        </span>

        {/* Lit segments */}
        <span className={cn(
          "relative font-mono font-bold text-3xl tracking-widest z-10",
          style.lit
        )}>
          {value}
        </span>
        
        {/* Internal Screen Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};
