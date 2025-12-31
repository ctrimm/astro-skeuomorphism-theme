import { useState } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
}

export const SkeuoSlider = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  label,
  className,
}: SliderProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-xs text-gray-500 font-mono">{currentValue}</span>
        </div>
      )}

      <div className="relative h-12 rounded-xl bg-neubg shadow-neu-inset p-2">
        {/* Track */}
        <div className="absolute inset-2 rounded-lg overflow-hidden">
          {/* Fill */}
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-inner transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Slider handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label={label}
        />

        {/* Visual handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-skeuo-raised pointer-events-none transition-all duration-150"
          style={{ left: `calc(${percentage}% - 1rem)` }}
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-inner">
            <div className="absolute inset-2 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
