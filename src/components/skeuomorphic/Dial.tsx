import { useState } from "react";
import { cn } from "@/lib/utils";

interface DialProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  steps?: number;
  className?: string;
}

export const SkeuoDial = ({
  min = 0,
  max = 10,
  value = 5,
  onChange,
  label,
  steps = 10,
  className,
}: DialProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const angle = ((currentValue - min) / (max - min)) * 300 - 150;

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = -e.movementY;
    const step = (max - min) / steps;
    const newValue = Math.min(max, Math.max(min, currentValue + delta * step * 0.1));
    const snappedValue = Math.round(newValue / step) * step;
    setCurrentValue(snappedValue);
    onChange?.(snappedValue);
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-skeuo-deep cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label={label}
        tabIndex={0}
      >
        {/* Outer metallic ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 shadow-inner">
          {/* Step markers */}
          {[...Array(steps + 1)].map((_, i) => {
            const stepAngle = (i / steps) * 300 - 150;
            const isActive = stepAngle <= angle;
            return (
              <div
                key={i}
                className={cn(
                  "absolute w-1 h-3 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-b from-blue-400 to-blue-600 shadow-sm"
                    : "bg-gray-500"
                )}
                style={{
                  top: "8%",
                  left: "50%",
                  transform: `translateX(-50%) rotate(${stepAngle}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            );
          })}

          {/* Center dial */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-skeuo-raised">
            {/* Indicator pointer */}
            <div
              className="absolute w-1.5 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-sm"
              style={{
                top: "15%",
                left: "50%",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: "bottom center",
              }}
            />

            {/* Center cap */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-neu">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner" />
              </div>
            </div>
          </div>
        </div>

        {/* Screw details */}
        {[0, 90, 180, 270].map((rotation) => (
          <div
            key={rotation}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner"
            style={{
              top: "10%",
              left: "50%",
              transform: `translateX(-50%) rotate(${rotation}deg) translateY(-48px)`,
            }}
          >
            <div className="absolute inset-0.5 rounded-full bg-gray-700" />
          </div>
        ))}
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <span className="text-xs text-gray-500 font-mono">{currentValue}</span>
    </div>
  );
};
