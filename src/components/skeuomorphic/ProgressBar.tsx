import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: "blue" | "green" | "purple" | "orange";
  height?: "sm" | "md" | "lg";
  className?: string;
}

export const SkeuoProgressBar = ({
  value,
  max = 100,
  showLabel = true,
  color = "blue",
  height = "md",
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorMap = {
    blue: "from-blue-400 via-blue-500 to-blue-600",
    green: "from-green-400 via-green-500 to-green-600",
    purple: "from-purple-400 via-purple-500 to-purple-600",
    orange: "from-orange-400 via-orange-500 to-orange-600",
  };

  const heightMap = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 overflow-hidden p-[2px]",
          heightMap[height]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        {/* Progress fill */}
        <div
          className={cn(
            "h-full rounded-[2px] bg-gradient-to-r shadow-[0_0_10px_currentColor,inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-500 ease-out relative overflow-hidden border border-black/50",
            colorMap[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer mix-blend-overlay" />
          
          {/* Repeating lines for industrial look */}
          <div className="absolute inset-0 block repeating-linear-gradient-[45deg,transparent,transparent_4px,rgba(0,0,0,0.15)_4px,rgba(0,0,0,0.15)_8px]"></div>
        </div>

        {/* Label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className="text-xs font-mono font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] tracking-widest bg-black/40 px-2 rounded">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        {/* Tick marks */}
        <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none pt-[2px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[1.5px] h-full bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
