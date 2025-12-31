import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: "blue" | "green" | "purple" | "orange";
  height?: "sm" | "md" | "lg";
  className?: string;
}

export const SkeuoProgressBar = ({
  value,
  max = 100,
  showLabel = true,
  color = "blue",
  height = "md",
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorMap = {
    blue: "from-blue-400 via-blue-500 to-blue-600",
    green: "from-green-400 via-green-500 to-green-600",
    purple: "from-purple-400 via-purple-500 to-purple-600",
    orange: "from-orange-400 via-orange-500 to-orange-600",
  };

  const heightMap = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded-2xl bg-neubg shadow-neu-inset overflow-hidden",
          heightMap[height]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {/* Progress fill */}
        <div
          className={cn(
            "h-full rounded-2xl bg-gradient-to-r shadow-inner transition-all duration-500 ease-out relative overflow-hidden",
            colorMap[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

          {/* Inner highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
        </div>

        {/* Label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-800 drop-shadow-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        {/* Tick marks */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-px h-1/2 bg-gray-400/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
