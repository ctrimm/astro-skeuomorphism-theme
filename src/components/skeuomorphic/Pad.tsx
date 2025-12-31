import { useState } from "react";
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
        "p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-skeuo-deep",
        className
      )}
    >
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {buttons.map((button) => {
          const isActive = activeButton === button.id;
          return (
            <button
              key={button.id}
              onClick={() => handlePress(button.id)}
              className={cn(
                "relative aspect-square rounded-2xl transition-all duration-150",
                "bg-gradient-to-br shadow-skeuo-raised",
                "active:shadow-neu-inset active:translate-y-0.5",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
                isActive && "shadow-neu-inset translate-y-0.5",
                getButtonColor(button.color)
              )}
            >
              {/* Top shine */}
              <div className="absolute inset-x-2 top-2 h-1/4 rounded-t-2xl bg-gradient-to-b from-white/40 to-transparent" />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg drop-shadow-lg">
                  {button.label}
                </span>
              </div>

              {/* Corner LED indicator */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/30 shadow-inner" />
            </button>
          );
        })}
      </div>

      {/* Housing screws */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute w-3 h-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner",
            i === 0 && "top-2 left-2",
            i === 1 && "top-2 right-2",
            i === 2 && "bottom-2 left-2",
            i === 3 && "bottom-2 right-2"
          )}
        >
          <div className="absolute inset-1 rounded-full bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-gray-900 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
