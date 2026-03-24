import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "green";
  className?: string;
}

export const SkeuoSpinner = ({
  size = "md",
  color = "blue",
  className,
}: SpinnerProps) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
  };

  return (
    <div
      className={cn(
        "relative rounded-full bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 p-2 overflow-hidden flex items-center justify-center",
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      {/* Spinning container */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin">
        {/* LED Ring */}
        <div
          className="absolute inset-2 rounded-full border-[4px] border-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"
        />
        {/* Glowing Head */}
        <div className="absolute top-2 w-[10px] h-[10px] rounded-full overflow-visible">
            <div className={cn("w-full h-full rounded-full shadow-[0_0_12px_currentColor]", `bg-${color}-500`, `text-${color}-500`)}></div>
        </div>
      </div>

      {/* Center cap */}
      <div className="relative z-10 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black flex items-center justify-center">
         <div className="w-2 h-[1px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] -rotate-45" />
      </div>
    </div>
  );
};
