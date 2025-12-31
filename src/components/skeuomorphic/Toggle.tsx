import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const SkeuoToggle = ({
  defaultChecked = false,
  onChange,
  label,
  className,
}: ToggleProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={cn(
          "relative w-16 h-8 rounded-full transition-all duration-300",
          "shadow-neu-inset",
          checked ? "bg-blue-400" : "bg-neubg"
        )}
      >
        <span
          className={cn(
            "absolute top-1 w-6 h-6 rounded-full transition-all duration-300",
            "shadow-skeuo-raised bg-gradient-to-b from-white to-gray-100",
            checked ? "left-9" : "left-1"
          )}
        />
      </button>
      {label && (
        <span className="text-gray-700 font-medium select-none">{label}</span>
      )}
    </div>
  );
};
