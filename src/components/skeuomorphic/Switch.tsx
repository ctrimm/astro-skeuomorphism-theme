import { useState } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labels?: { on: string; off: string };
  className?: string;
}

export const SkeuoSwitch = ({
  checked = false,
  onChange,
  label,
  labels = { on: "ON", off: "OFF" },
  className,
}: SwitchProps) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        className="relative w-32 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-skeuo-deep p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {/* Track */}
        <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner">
          {/* Labels on track */}
          <div className="absolute inset-0 flex items-center justify-between px-3">
            <span
              className={cn(
                "text-xs font-bold transition-all duration-200",
                isOn ? "text-green-400" : "text-gray-600"
              )}
            >
              {labels.on}
            </span>
            <span
              className={cn(
                "text-xs font-bold transition-all duration-200",
                !isOn ? "text-red-400" : "text-gray-600"
              )}
            >
              {labels.off}
            </span>
          </div>
        </div>

        {/* Switch lever */}
        <div
          className={cn(
            "absolute top-2 w-12 h-12 rounded-xl transition-all duration-300 ease-out",
            isOn ? "left-16" : "left-2"
          )}
        >
          {/* Lever body */}
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-400 shadow-skeuo-raised relative">
            {/* Top shine */}
            <div className="absolute inset-x-2 top-1 h-4 rounded-lg bg-gradient-to-b from-white/50 to-transparent" />

            {/* Grip lines */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-0.5 rounded-full bg-gray-500/30" />
              ))}
            </div>

            {/* LED indicator */}
            <div className="absolute -top-1 right-2 w-2 h-2 rounded-full">
              <div
                className={cn(
                  "w-full h-full rounded-full transition-all duration-300",
                  isOn
                    ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                    : "bg-gray-700"
                )}
              />
            </div>
          </div>
        </div>
      </button>

      {label && (
        <span className="text-gray-800 font-medium">{label}</span>
      )}
    </div>
  );
};
