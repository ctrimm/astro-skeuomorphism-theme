import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface PadButton {
  id: string;
  label: string;
  color?: string;
}

interface PadProps {
  buttons: PadButton[];
  columns?: number;
  onPress?: (id: string) => void;
  className?: string;
}

export const SkeuoPad = ({
  buttons,
  columns = 3,
  onPress,
  className,
}: PadProps) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setActiveButton(id);
    onPress?.(id);

    // Visual feedback
    setTimeout(() => {
      setActiveButton(null);
    }, 150);
  };

  const getButtonColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      red: "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700",
      blue: "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700",
      green: "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700",
      yellow: "from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
      purple: "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
      orange: "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
    };

    return color && colorMap[color]
      ? colorMap[color]
      : "from-gray-300 to-gray-500 hover:from-gray-400 hover:to-gray-600";
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded bg-[#1c1d1e] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-black overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 grid gap-4 p-4 bg-[#050505] rounded shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {buttons.map((button) => {
          const isActive = activeButton === button.id;
          return (
            <button
              key={button.id}
              onClick={() => handlePress(button.id)}
              className={cn(
                "relative aspect-square rounded transition-all duration-150 overflow-hidden",
                "min-w-20 min-h-20 md:min-w-24 md:min-h-24",
                "bg-[#111] shadow-[inset_0_1px_3px_rgba(0,0,0,1)] border border-gray-800",
                "active:shadow-[inset_0_4px_8px_rgba(0,0,0,1)] active:border-black",
                "focus:outline-none",
                isActive && "shadow-[inset_0_4px_8px_rgba(0,0,0,1)] border-black"
              )}
            >
              <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none mix-blend-overlay"></div>
              {/* Top rim light */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/5" />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("font-mono font-bold tracking-widest text-sm uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,1)]", isActive ? "text-white" : "text-gray-400")}>
                  {button.label}
                </span>
              </div>

              {/* LED Edge */}
              <div className={cn(
                "absolute inset-0 rounded border-2 transition-all duration-150 pointer-events-none",
                isActive ? `border-${button.color || 'blue'}-500 shadow-[inset_0_0_15px_currentColor]` : "border-transparent"
              )} />
            </button>
          );
        })}
      </div>

      {/* Housing screws */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute w-2 h-2 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)]",
            i === 0 && "top-2 left-2 -rotate-12",
            i === 1 && "top-2 right-2 rotate-45",
            i === 2 && "bottom-2 left-2 rotate-90",
            i === 3 && "bottom-2 right-2 rotate-180"
          )}
        >
          <div className="w-full h-[1px] bg-black/60 absolute top-1/2 -translate-y-1/2"></div>
        </div>
      ))}
    </div>
  );
};
