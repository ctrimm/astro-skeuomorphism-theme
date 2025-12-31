import { useState, useRef, useEffect } from "react";
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
  const dialRef = useRef<HTMLDivElement>(null);

  // Calculate rotation angle (300 degrees total, -150 to +150)
  const angle = ((currentValue - min) / (max - min)) * 300 - 150;

  // Calculate angle from center point
  const getAngleFromCenter = (clientX: number, clientY: number): number => {
    if (!dialRef.current) return 0;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate angle in degrees (0 is top, clockwise)
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    // Normalize to 0-360
    if (angle < 0) angle += 360;

    return angle;
  };

  const updateValueFromAngle = (angle: number) => {
    // Our dial uses -150 to +150 degrees (300 total)
    // In 0-360 system: -150° = 210°, +150° = 150°

    let normalizedAngle = angle;

    // Dead zone check (bottom 60 degrees)
    if (normalizedAngle > 150 && normalizedAngle < 210) {
      return;
    }

    // Convert to our -150 to +150 range
    if (normalizedAngle >= 210) {
      normalizedAngle = normalizedAngle - 360;
    }

    // Clamp to range
    const clampedAngle = Math.max(-150, Math.min(150, normalizedAngle));
    const percentage = (clampedAngle + 150) / 300;

    // Snap to steps
    const step = (max - min) / steps;
    const rawValue = min + percentage * (max - min);
    const snappedValue = Math.round(rawValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, snappedValue));

    setCurrentValue(finalValue);
    onChange?.(finalValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const angle = getAngleFromCenter(e.clientX, e.clientY);
    updateValueFromAngle(angle);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const angle = getAngleFromCenter(e.clientX, e.clientY);
    updateValueFromAngle(angle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        ref={dialRef}
        className={cn(
          "relative w-36 h-36 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-skeuo-deep cursor-pointer select-none transition-shadow duration-200",
          isDragging && "shadow-skeuo-deep"
        )}
        onMouseDown={handleMouseDown}
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
            const stepValue = min + (i / steps) * (max - min);
            const isActive = stepValue <= currentValue;
            return (
              <div
                key={i}
                className={cn(
                  "absolute w-1 h-4 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_4px_rgba(59,130,246,0.5)]"
                    : "bg-gray-500/60"
                )}
                style={{
                  top: "6%",
                  left: "50%",
                  transform: `translateX(-50%) rotate(${stepAngle}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            );
          })}

          {/* Center dial */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500 shadow-skeuo-raised">
            {/* Metallic shine */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent" />

            {/* Indicator pointer */}
            <div
              className="absolute w-2 h-12 bg-gradient-to-b from-red-400 to-red-700 rounded-full shadow-lg transition-transform duration-100"
              style={{
                top: "12%",
                left: "50%",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            {/* Center cap with screw detail */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-neu">
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-inner">
                  {/* Screw slot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-0.5 bg-gray-700 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Grip notches around edge */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2 bg-gray-400/30 rounded-full"
                style={{
                  top: "4%",
                  left: "50%",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            ))}
          </div>
        </div>

        {/* Corner screw details */}
        {[0, 90, 180, 270].map((rotation) => (
          <div
            key={rotation}
            className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner"
            style={{
              top: "12%",
              left: "50%",
              transform: `translateX(-50%) rotate(${rotation}deg) translateY(-58px)`,
            }}
          >
            <div className="absolute inset-0.5 rounded-full bg-gray-700 flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-gray-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{min}</span>
        <span className="text-base text-gray-800 font-mono font-bold min-w-[2ch] text-center">
          {currentValue}
        </span>
        <span className="text-xs text-gray-400">{max}</span>
      </div>
    </div>
  );
};
