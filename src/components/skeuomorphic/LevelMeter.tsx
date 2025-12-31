import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LevelMeterProps {
  value?: number;
  max?: number;
  segments?: number;
  orientation?: "vertical" | "horizontal";
  label?: string;
  className?: string;
}

export const SkeuoLevelMeter = ({
  value = 0,
  max = 100,
  segments = 12,
  orientation = "vertical",
  label,
  className,
}: LevelMeterProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const activeSegments = Math.round((currentValue / max) * segments);

  const getSegmentColor = (index: number) => {
    const percentage = (index / segments) * 100;

    if (percentage > 85) return "bg-gradient-to-t from-red-600 to-red-500 shadow-[0_0_8px_rgba(220,38,38,0.6)]";
    if (percentage > 70) return "bg-gradient-to-t from-orange-500 to-yellow-500 shadow-[0_0_6px_rgba(249,115,22,0.4)]";
    if (percentage > 50) return "bg-gradient-to-t from-yellow-400 to-yellow-300 shadow-[0_0_4px_rgba(250,204,21,0.3)]";
    return "bg-gradient-to-t from-green-500 to-green-400 shadow-[0_0_4px_rgba(34,197,94,0.3)]";
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}

      <div
        className={cn(
          "bg-gradient-to-br from-gray-800 to-gray-900 shadow-skeuo-deep rounded-2xl p-3",
          orientation === "vertical" ? "w-16" : "h-16 w-full max-w-xs"
        )}
      >
        {/* Meter housing */}
        <div
          className={cn(
            "bg-gradient-to-br from-gray-900 to-black shadow-inner rounded-xl p-1 flex gap-1",
            orientation === "vertical" ? "flex-col-reverse h-48" : "flex-row h-full"
          )}
        >
          {[...Array(segments)].map((_, index) => {
            const isActive = index < activeSegments;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-sm transition-all duration-150",
                  orientation === "vertical" ? "h-full w-full" : "w-full h-full",
                  isActive
                    ? getSegmentColor(index)
                    : "bg-gray-800/50 shadow-inner"
                )}
              >
                {/* Shine effect on active segments */}
                {isActive && (
                  <div className="w-full h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-sm" />
                )}
              </div>
            );
          })}
        </div>

        {/* Peak indicators */}
        {orientation === "vertical" && (
          <div className="absolute -right-2 top-3 flex flex-col gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500 shadow-sm" />
            <div className="w-1 h-1 rounded-full bg-yellow-500 shadow-sm" />
            <div className="w-1 h-1 rounded-full bg-green-500 shadow-sm" />
          </div>
        )}
      </div>

      {/* Value display */}
      <div className="px-3 py-1 rounded-lg bg-gradient-to-b from-gray-900 to-black shadow-neu-inset">
        <span className="text-sm font-mono font-bold text-green-400">
          {Math.round(currentValue)}
        </span>
      </div>
    </div>
  );
};
