import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LevelMeterProps {
  value?: number;
  max?: number;
  segments?: number;
  orientation?: "vertical" | "horizontal";
  label?: string;
  className?: string;
  animated?: boolean;
}

export const SkeuoLevelMeter = ({
  value = 0,
  max = 100,
  segments = 12,
  orientation = "vertical",
  label,
  className,
  animated = false,
}: LevelMeterProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (animated) {
      // Bounce animation between 20% and 95%
      let animationValue = 20;
      let direction = 1;
      const interval = setInterval(() => {
        animationValue += direction * (Math.random() * 8 + 2);

        if (animationValue >= 95) {
          animationValue = 95;
          direction = -1;
        } else if (animationValue <= 20) {
          animationValue = 20;
          direction = 1;
        }

        setCurrentValue(animationValue);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setCurrentValue(value);
    }
  }, [value, animated]);

  const activeSegments = Math.round((currentValue / max) * segments);

  const getSegmentColor = (index: number) => {
    const percentage = (index / segments) * 100;

    if (percentage > 85) return "bg-gradient-to-t from-red-500 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8),inset_0_1px_2px_rgba(255,255,255,0.6)]";
    if (percentage > 70) return "bg-gradient-to-t from-orange-500 to-yellow-400 shadow-[0_0_8px_rgba(249,115,22,0.6),inset_0_1px_2px_rgba(255,255,255,0.6)]";
    if (percentage > 50) return "bg-gradient-to-t from-yellow-400 to-yellow-300 shadow-[0_0_6px_rgba(250,204,21,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)]";
    return "bg-gradient-to-t from-green-500 to-green-400 shadow-[0_0_6px_rgba(34,197,94,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)]";
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "bg-[#1c1d1e] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black rounded p-4 relative overflow-hidden",
          orientation === "vertical" ? "w-20" : "h-20 w-full max-w-xs"
        )}
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        {/* Module Screws */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>

        {/* Meter housing */}
        <div
          className={cn(
            "relative z-10 bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 rounded p-1.5 flex gap-1",
            orientation === "vertical" ? "flex-col-reverse h-48" : "flex-row h-full"
          )}
        >
          {[...Array(segments)].map((_, index) => {
            const isActive = index < activeSegments;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-sm transition-all duration-150 border border-black/50",
                  orientation === "vertical" ? "h-full w-full" : "w-full h-full",
                  isActive
                    ? getSegmentColor(index)
                    : "bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"
                )}
              >
                {/* Shine effect on active segments */}
                {isActive && (
                  <div className="w-full h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-sm mix-blend-overlay" />
                )}
              </div>
            );
          })}
        </div>

        {/* Peak indicators */}
        {orientation === "vertical" && (
          <div className="absolute right-2 top-6 flex flex-col gap-2 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-black/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)] border border-black/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)] border border-black/50" />
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-between px-2">
        {label && (
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
        )}
        {/* Value display */}
        <div className="px-3 py-1 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <span className="text-xs font-mono font-bold text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.8)] relative z-10">
            {Math.round(currentValue)}
          </span>
        </div>
      </div>
    </div>
  );
};
