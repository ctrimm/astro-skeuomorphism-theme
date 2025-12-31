import { useState } from "react";
import { cn } from "@/lib/utils";

interface KnobProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
}

export const SkeuoKnob = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  label,
  className,
}: KnobProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const angle = ((currentValue - min) / (max - min)) * 270 - 135;

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = -e.movementY;
    const newValue = Math.min(max, Math.max(min, currentValue + delta * 0.5));
    setCurrentValue(Math.round(newValue));
    onChange?.(Math.round(newValue));
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        className="relative w-24 h-24 rounded-full bg-neubg shadow-neu-lg cursor-pointer select-none"
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
        {/* Outer ring with grooves */}
        <div className="absolute inset-0 rounded-full shadow-neu-inset">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2 bg-gray-400/30 rounded-full"
              style={{
                top: "10%",
                left: "50%",
                transform: `rotate(${i * 30}deg) translateY(-100%)`,
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>

        {/* Center knob */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-skeuo-deep">
          {/* Indicator line */}
          <div
            className="absolute w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-sm"
            style={{
              top: "10%",
              left: "50%",
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: "bottom center",
            }}
          />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 shadow-neu-inset" />
          </div>
        </div>
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <span className="text-xs text-gray-500 font-mono">{currentValue}</span>
    </div>
  );
};
