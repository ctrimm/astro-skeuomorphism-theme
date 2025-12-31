import { useState } from "react";
import { cn } from "@/lib/utils";

interface MeterProps {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  color?: "blue" | "green" | "red" | "orange";
  className?: string;
}

export const SkeuoMeter = ({
  value = 50,
  min = 0,
  max = 100,
  label,
  color = "blue",
  className,
}: MeterProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    orange: "from-orange-400 to-orange-600",
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative w-48 h-24">
        {/* Meter background */}
        <div className="absolute bottom-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-skeuo-deep">
            {/* Inner face */}
            <div className="absolute bottom-0 inset-x-3 top-3 rounded-t-full bg-gradient-to-b from-gray-700 to-gray-800 shadow-inner">
              {/* Scale marks */}
              {[...Array(11)].map((_, i) => {
                const markAngle = (i / 10) * 180 - 90;
                return (
                  <div
                    key={i}
                    className="absolute bottom-0 w-0.5 h-3 bg-gray-400 rounded-full"
                    style={{
                      left: "50%",
                      transform: `translateX(-50%) rotate(${markAngle}deg)`,
                      transformOrigin: "bottom center",
                    }}
                  />
                );
              })}

              {/* Value arc */}
              <svg className="absolute inset-0" viewBox="0 0 200 100">
                <path
                  d="M 20 80 A 80 80 0 0 1 180 80"
                  fill="none"
                  stroke="url(#meterGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 251} 251`}
                  className="drop-shadow-sm"
                />
                <defs>
                  <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className="text-blue-400" stopColor="currentColor" />
                    <stop offset="100%" className="text-blue-600" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Needle */}
              <div
                className="absolute bottom-0 left-1/2 w-1 h-16 bg-gradient-to-t from-red-600 to-red-400 rounded-full shadow-lg origin-bottom transition-transform duration-300"
                style={{
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-sm" />
              </div>

              {/* Center pivot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-neu">
                <div className="absolute inset-1 rounded-full bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="flex flex-col items-center gap-1">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        <div className="px-4 py-2 rounded-lg bg-gradient-to-b from-gray-900 to-black shadow-neu-inset">
          <span className={cn("text-2xl font-mono font-bold bg-gradient-to-r bg-clip-text text-transparent", `bg-gradient-to-r ${colorMap[color]}`)}>
            {value.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
