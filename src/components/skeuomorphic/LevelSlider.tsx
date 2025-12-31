import { useState, useRef, useEffect } from "react";
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
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}

      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 shadow-skeuo-deep rounded-2xl p-4">
        {/* Track housing */}
        <div
          ref={trackRef}
          className="relative bg-gradient-to-br from-gray-900 to-black shadow-inner rounded-xl p-1 h-56 w-16 cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Segments */}
          <div className="flex flex-col-reverse gap-1 h-full">
            {[...Array(segments)].map((_, index) => {
              const isActive = index < activeSegments;
              return (
                <div
                  key={index}
                  className={cn(
                    "h-full w-full rounded-sm transition-all duration-150",
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

          {/* Draggable knob */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-20 h-8 pointer-events-none transition-all duration-100"
            style={{
              bottom: `calc(${knobPosition}% - 16px)`,
            }}
          >
            {/* Knob body */}
            <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 shadow-skeuo-raised">
              {/* Top shine */}
              <div className="absolute inset-x-2 top-1 h-2 rounded-lg bg-gradient-to-b from-white/60 to-transparent" />

              {/* Grip lines */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-0.5 rounded-full bg-gray-500/40"
                  />
                ))}
              </div>

              {/* Side indicators */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-blue-500 shadow-sm" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-blue-500 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Scale markers */}
        <div className="absolute -right-6 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500 font-mono">
          <span>{max}</span>
          <span>{Math.round(max * 0.75)}</span>
          <span>{Math.round(max * 0.5)}</span>
          <span>{Math.round(max * 0.25)}</span>
          <span>0</span>
        </div>
      </div>

      {/* Value display */}
      <div className="px-4 py-2 rounded-lg bg-gradient-to-b from-gray-900 to-black shadow-neu-inset">
        <span className="text-base font-mono font-bold text-green-400">
          {Math.round(currentValue)}
        </span>
      </div>
    </div>
  );
};
