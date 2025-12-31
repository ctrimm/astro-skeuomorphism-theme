import { useState } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const SkeuoCheckbox = ({
  checked = false,
  onChange,
  label,
  className,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <div
        className={cn(
          "relative w-6 h-6 rounded-md transition-all duration-200",
          isChecked
            ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-skeuo-raised"
            : "bg-neubg shadow-neu-inset"
        )}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
          aria-label={label}
        />
        {isChecked && (
          <svg
            className="absolute inset-0 w-full h-full text-white p-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-gray-800 font-medium select-none">{label}</span>}
    </label>
  );
};
