import React from "react";
import { cn } from "@/lib/utils";

interface LEDProps {
  on?: boolean;
  color?: "red" | "green" | "blue" | "yellow" | "orange";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export const SkeuoLED = ({
  on = false,
  color = "green",
  size = "md",
  label,
  className,
}: LEDProps) => {
  const colorMap = {
    red: {
      on: "bg-red-500 shadow-[0_0_12px_#ef4444,0_0_24px_rgba(239,68,68,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
      off: "bg-red-950 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black",
    },
    green: {
      on: "bg-green-500 shadow-[0_0_12px_#22c55e,0_0_24px_rgba(34,197,94,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
      off: "bg-green-950 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black",
    },
    blue: {
      on: "bg-blue-500 shadow-[0_0_12px_#3b82f6,0_0_24px_rgba(59,130,246,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
      off: "bg-blue-950 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black",
    },
    yellow: {
      on: "bg-yellow-400 shadow-[0_0_12px_#eab308,0_0_24px_rgba(234,179,8,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
      off: "bg-yellow-950 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black",
    },
    orange: {
      on: "bg-orange-500 shadow-[0_0_12px_#f97316,0_0_24px_rgba(249,115,22,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
      off: "bg-orange-950 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black",
    },
  };

  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="p-1 rounded-full bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>
        <div
          className={cn(
            "rounded-full transition-all duration-300 relative z-10",
            sizeMap[size],
            on ? colorMap[color].on : colorMap[color].off
          )}
          role="status"
          aria-label={`${label || "LED"} ${on ? "on" : "off"}`}
        >
          {/* Glass reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
      {label && (
        <span className="text-sm font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
      )}
    </div>
  );
};
