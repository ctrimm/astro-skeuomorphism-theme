import React from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NeuCardProps {
  children: ReactNode;
  className?: string;
  variant?: "raised" | "pressed";
  hoverable?: boolean;
}

export const NeuCard = ({
  children,
  className,
  variant = "raised",
  hoverable = false,
}: NeuCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-xl p-6 transition-all duration-300 overflow-hidden",
        
        // Raised variant
        variant === "raised" && "bg-[#1c1d1e] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black",
        
        // Pressed variant
        variant === "pressed" && "bg-[#050505] shadow-premium-inset border-t border-gray-900 border-l border-gray-900 border-r border-[#222] border-b border-[#222]",

        // Hoverable effects (only if requested)
        hoverable && "cursor-pointer hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),0_10px_20px_rgba(0,0,0,0.7)] group",

        className
      )}
    >
      {/* Subtle surface noise for realism */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-noise"></div>

      {variant !== "pressed" && (
        <>
          {/* Module Screws */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>
        </>
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
