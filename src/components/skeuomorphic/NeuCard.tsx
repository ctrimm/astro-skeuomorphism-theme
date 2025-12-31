import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NeuCardProps {
  children: ReactNode;
  className?: string;
  variant?: "raised" | "pressed";
  hoverable?: boolean;
}

export const NeuCard = ({
  children,
  className,
  variant = "raised",
  hoverable = false,
}: NeuCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 bg-neubg",
        variant === "raised" && "shadow-neu",
        variant === "pressed" && "shadow-neu-inset",
        hoverable && "hover:shadow-neu-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
