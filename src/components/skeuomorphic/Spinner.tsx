import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "green";
  className?: string;
}

export const SkeuoSpinner = ({
  size = "md",
  color = "blue",
  className,
}: SpinnerProps) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
  };

  return (
    <div
      className={cn(
        "relative rounded-full bg-neubg shadow-neu-inset p-2",
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {/* Spinning element */}
      <div className="absolute inset-2 rounded-full animate-spin">
        {/* Gradient arc */}
        <div
          className={cn(
            "w-full h-full rounded-full bg-gradient-to-tr shadow-skeuo-raised",
            colorMap[color]
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, currentColor 50%, currentColor 100%)`,
            maskImage: "radial-gradient(transparent 40%, black 40%)",
            WebkitMaskImage: "radial-gradient(transparent 40%, black 40%)",
          }}
        />
      </div>

      {/* Center cap */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-neu" />
      </div>

      {/* Glowing effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-sm opacity-50 animate-pulse",
          `bg-gradient-to-tr ${colorMap[color]}`
        )}
        style={{ zIndex: -1 }}
      />
    </div>
  );
};
