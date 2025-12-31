import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "raised" | "flat" | "glass" | "primary";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const SkeuoButton = ({
  variant = "raised",
  children,
  onClick,
  className,
  href,
}: ButtonProps) => {
  const baseClasses =
    "px-6 py-3 rounded-xl font-medium transition-all duration-200 inline-block text-center";

  const variantClasses = {
    raised:
      "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 shadow-skeuo-raised hover:shadow-skeuo-lifted active:shadow-neu-inset hover:-translate-y-0.5 active:translate-y-0.5",
    primary:
      "bg-gradient-to-b from-blue-400 to-blue-600 text-white shadow-skeuo-raised hover:shadow-skeuo-lifted active:shadow-neu-inset hover:-translate-y-0.5 active:translate-y-0.5",
    flat:
      "bg-neubg text-gray-800 shadow-neu hover:shadow-neu-lg active:shadow-neu-inset active:translate-y-0.5",
    glass:
      "bg-white/20 backdrop-blur-glass border border-white/30 text-gray-900 hover:bg-white/30 active:shadow-neu-inset active:translate-y-0.5",
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
