import { useState, useRef, useEffect } from "react";
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
  const knobRef = useRef<HTMLDivElement>(null);

  // Calculate rotation angle (270 degrees total, -135 to +135)
  const angle = ((currentValue - min) / (max - min)) * 270 - 135;

  // Calculate angle from center point
  const getAngleFromCenter = (clientX: number, clientY: number): number => {
    if (!knobRef.current) return 0;

    const rect = knobRef.current.getBoundingClientRect();
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
    // Map angle to value range
    // Our knob uses -135 to +135 degrees (270 total)
    // In 0-360 system: -135° = 225°, +135° = 135°

    let normalizedAngle = angle;

    // Convert angle range to match our -135 to +135 system
    if (normalizedAngle > 135 && normalizedAngle < 225) {
      // Dead zone (bottom 90 degrees)
      return;
    }

    // Convert to our -135 to +135 range
    if (normalizedAngle >= 225) {
      normalizedAngle = normalizedAngle - 360; // Convert to negative
    }

    // Map from -135 to +135 range to our value range
    const clampedAngle = Math.max(-135, Math.min(135, normalizedAngle));
    const percentage = (clampedAngle + 135) / 270;
    const newValue = Math.round(min + percentage * (max - min));

    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    // Update value immediately on click
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
        ref={knobRef}
        className={cn(
          "relative w-28 h-28 rounded-full bg-neubg shadow-neu-lg cursor-pointer select-none transition-shadow duration-200",
          isDragging && "shadow-neu-xl"
        )}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label={label}
        tabIndex={0}
      >
        {/* Outer ring with enhanced grooves */}
        <div className="absolute inset-0 rounded-full shadow-neu-inset">
          {[...Array(24)].map((_, i) => {
            const markerAngle = (i / 24) * 360;
            const isInRange = markerAngle <= 135 || markerAngle >= 225;
            return (
              <div
                key={i}
                className={cn(
                  "absolute w-0.5 h-3 rounded-full transition-all duration-200",
                  isInRange ? "bg-gray-400/40" : "bg-gray-400/10"
                )}
                style={{
                  top: "8%",
                  left: "50%",
                  transform: `translateX(-50%) rotate(${markerAngle}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            );
          })}
        </div>

        {/* Center knob with metallic finish */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-skeuo-deep">
          {/* Shine effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none z-0" />

          {/* Grip texture */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-12 h-0.5 bg-gray-400/20 rounded-full"
                style={{
                  transform: `rotate(${i * 22.5}deg)`,
                }}
              />
            ))}
          </div>

          {/* Indicator line - MUST be on top and highly visible */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "4px",
              height: "36px",
              top: "50%",
              left: "50%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -100%) translateY(-6px) rotate(${angle}deg)`,
              zIndex: 30,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              {/* Bright highlight on indicator */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/70 to-transparent" />
            </div>
          </div>

          {/* Center cap */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-neu-inset">
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{min}</span>
        <span className="text-base text-gray-800 font-mono font-bold min-w-[3ch] text-center">
          {currentValue}
        </span>
        <span className="text-xs text-gray-400">{max}</span>
      </div>
    </div>
  );
};
