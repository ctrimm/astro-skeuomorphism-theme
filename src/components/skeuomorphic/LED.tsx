import { cn } from "@/lib/utils";

interface LEDProps {
  on?: boolean;
  color?: "red" | "green" | "blue" | "yellow" | "orange";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export const SkeuoLED = ({
  on = false,
  color = "green",
  size = "md",
  label,
  className,
}: LEDProps) => {
  const colorMap = {
    red: {
      on: "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      off: "bg-red-900/30 shadow-neu-inset",
    },
    green: {
      on: "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      off: "bg-green-900/30 shadow-neu-inset",
    },
    blue: {
      on: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      off: "bg-blue-900/30 shadow-neu-inset",
    },
    yellow: {
      on: "bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      off: "bg-yellow-900/30 shadow-neu-inset",
    },
    orange: {
      on: "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)]",
      off: "bg-orange-900/30 shadow-neu-inset",
    },
  };

  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="p-1 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-inner">
        <div
          className={cn(
            "rounded-full transition-all duration-300",
            sizeMap[size],
            on ? colorMap[color].on : colorMap[color].off
          )}
          role="status"
          aria-label={`${label || "LED"} ${on ? "on" : "off"}`}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </div>
  );
};
