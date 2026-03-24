import React, { useState, useRef, useEffect } from "react";
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
          "relative w-36 h-36 rounded-full bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] cursor-pointer select-none transition-shadow duration-200 border border-gray-800 overflow-hidden group/dial flex items-center justify-center",
          isDragging && "shadow-[inset_0_6px_12px_rgba(0,0,0,1)]"
        )}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label={label}
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        {/* Outer metallic ring */}
        <div className="absolute inset-1 rounded-full border border-transparent">
          {/* Step markers */}
          {[...Array(steps + 1)].map((_, i) => {
            const stepAngle = (i / steps) * 300 - 150;
            const stepValue = min + (i / steps) * (max - min);
            const isActive = stepValue <= currentValue;
            return (
              <div
                key={i}
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `rotate(${stepAngle}deg)`,
                }}
              >
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full transition-all duration-200 shadow-[0_1px_0_rgba(255,255,255,0.1)]",
                    isActive
                      ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      : "bg-gray-800"
                  )}
                />
              </div>
            );
          })}

          {/* Center dial */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 shadow-[0_8px_16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black overflow-hidden group-hover/dial:brightness-110">
            {/* Grip notches around edge */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                >
                  <div className="w-full h-[1px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] absolute top-1/2 left-0 -translate-y-1/2" />
                </div>
              ))}
            </div>

            {/* Indicator pointer - rotates from base at center */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-6 rounded-full bg-[#111] shadow-[inset_0_1px_3px_rgba(0,0,0,1)] border border-black/50 overflow-hidden">
                <div className="w-full h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] opacity-90" />
              </div>
            </div>

            {/* Center cap with screw detail */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-10 h-10 rounded-full bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border border-black relative">
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <div className="w-4 h-[1.5px] bg-black/80 rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)] -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner screw details */}
        {[0, 90, 180, 270].map((rotation) => (
          <div
            key={rotation}
            className="absolute w-2 h-2 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)]"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "50% 50%",
              transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-64px)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center rotate-45">
              <div className="w-full h-[1px] bg-black/60" />
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
