import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

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
  const { play } = useSkeuoSound();
  const lastSoundValue = useRef(value);

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

    if (newValue !== currentValue) {
      setCurrentValue(newValue);
      onChange?.(newValue);

      // Play click sound on value change, throttled slightly or just every step
      if (Math.abs(newValue - lastSoundValue.current) >= 1) {
        play("click", 0.3); // Quieter click for knob
        lastSoundValue.current = newValue;
      }
    }
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
      <div className="relative p-3 bg-[#1c1d1e] rounded shadow-[0_10px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black flex flex-col items-center justify-center gap-4">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        {/* Module Screws */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>

        <div
          ref={knobRef}
          className={cn(
            "relative w-28 h-28 rounded-full bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 cursor-pointer select-none group/knob",
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
          {/* Outer ring with enhanced grooves */}
          <div className="absolute inset-0 rounded-full border border-transparent">
            {[...Array(24)].map((_, i) => {
              const markerAngle = (i / 24) * 360;
              const isInRange = markerAngle <= 135 || markerAngle >= 225;
              return (
                <div
                  key={i}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: `rotate(${markerAngle}deg)`,
                  }}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1/2 -translate-x-1/2 w-[2px] h-2.5 rounded-full transition-all duration-200 shadow-[0_1px_0_rgba(255,255,255,0.1)]",
                      isInRange ? "bg-gray-500" : "bg-gray-800"
                    )}
                  />
                </div>
              );
            })}
          </div>

          {/* Center knob */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 shadow-[0_6px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black overflow-hidden group-hover/knob:brightness-110 transition-all">
            {/* Grip texture */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    transform: `rotate(${i * 15}deg)`,
                  }}
                >
                  <div className="w-full h-[1px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] absolute top-1/2 left-0 -translate-y-1/2" />
                </div>
              ))}
            </div>

            {/* Indicator line */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)] border border-black/50 overflow-hidden">
                <div className="w-full h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] opacity-90" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full px-2">
          {label && (
            <div className="text-center mb-2">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
            </div>
          )}
          <div className="flex items-center justify-between bg-[#111] px-3 py-1.5 rounded border border-gray-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
            <span className="text-[10px] font-mono text-gray-600">{min}</span>
            <span className="text-xs text-blue-400 font-mono font-bold tracking-widest drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]">
              {currentValue}
            </span>
            <span className="text-[10px] font-mono text-gray-600">{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
