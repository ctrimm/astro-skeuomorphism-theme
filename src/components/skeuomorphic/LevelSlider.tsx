import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LevelSliderProps {
  value?: number;
  max?: number;
  segments?: number;
  label?: string;
  className?: string;
  onChange?: (value: number) => void;
}

export const SkeuoLevelSlider = ({
  value = 0,
  max = 100,
  segments = 12,
  label,
  className,
  onChange,
}: LevelSliderProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeSegments = Math.round((currentValue / max) * segments);

  const getSegmentColor = (index: number) => {
    const percentage = (index / segments) * 100;

    if (percentage > 85)
      return "bg-gradient-to-t from-red-600 to-red-500 shadow-[0_0_8px_rgba(220,38,38,0.6)]";
    if (percentage > 70)
      return "bg-gradient-to-t from-orange-500 to-yellow-500 shadow-[0_0_6px_rgba(249,115,22,0.4)]";
    if (percentage > 50)
      return "bg-gradient-to-t from-yellow-400 to-yellow-300 shadow-[0_0_4px_rgba(250,204,21,0.3)]";
    return "bg-gradient-to-t from-green-500 to-green-400 shadow-[0_0_4px_rgba(34,197,94,0.3)]";
  };

  const updateValueFromPosition = (clientY: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const trackHeight = rect.height;
    const clickY = clientY - rect.top;

    // Invert: top = max, bottom = 0
    const percentage = Math.max(0, Math.min(1, 1 - clickY / trackHeight));
    const newValue = Math.round(percentage * max);

    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateValueFromPosition(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateValueFromPosition(e.clientY);
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

  // Calculate knob position (percentage from bottom)
  const knobPosition = (currentValue / max) * 100;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative bg-[#1c1d1e] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black rounded p-5 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        {/* Module Screws */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>

        {/* Track housing */}
        <div
          ref={trackRef}
          className="relative bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 rounded p-1.5 h-64 w-12 cursor-pointer z-10"
          onMouseDown={handleMouseDown}
        >
          {/* Segments */}
          <div className="flex flex-col-reverse gap-1.5 h-full">
            {[...Array(segments)].map((_, index) => {
              const isActive = index < activeSegments;
              return (
                <div
                  key={index}
                  className={cn(
                    "h-full w-full rounded-sm transition-all duration-150 border border-black/50",
                    isActive
                      ? getSegmentColor(index)
                      : "bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"
                  )}
                >
                  {/* Shine effect on active segments */}
                  {isActive && (
                    <div className="w-full h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-sm mix-blend-overlay" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Draggable knob */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-20 h-10 pointer-events-none transition-all duration-100 z-20 group/sliderbox"
            style={{
              bottom: `calc(${knobPosition}% - 20px)`,
            }}
          >
            {/* Knob body */}
            <div className="relative w-full h-full rounded bg-gradient-to-b from-gray-700 to-gray-900 shadow-[0_8px_16px_rgba(0,0,0,0.8),0_4px_6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black overflow-hidden group-hover/sliderbox:brightness-110">
              {/* Horizontal grip lines */}
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] items-center">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.2)]"
                  />
                ))}
              </div>

              {/* Center indicator line */}
              <div className="absolute top-1/2 left-0 w-2 h-0.5 -translate-y-1/2 bg-blue-400 shadow-[0_0_4px_rgba(59,130,246,0.8)] border border-black/50" />
              <div className="absolute top-1/2 right-0 w-2 h-0.5 -translate-y-1/2 bg-blue-400 shadow-[0_0_4px_rgba(59,130,246,0.8)] border border-black/50" />
            </div>
          </div>
        </div>

        {/* Scale markers */}
        <div className="absolute right-2 top-6 bottom-6 flex flex-col justify-between text-[10px] text-gray-500 font-mono drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] z-10">
          <span>{max}</span>
          <span>{Math.round(max * 0.75)}</span>
          <span>{Math.round(max * 0.5)}</span>
          <span>{Math.round(max * 0.25)}</span>
          <span>0</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-2">
        {label && (
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{label}</span>
        )}
        {/* Value display */}
        <div className="px-3 py-1 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <span className="text-xs font-mono font-bold text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.8)] relative z-10">
            {Math.round(currentValue)}
          </span>
        </div>
      </div>
    </div>
  );
};
