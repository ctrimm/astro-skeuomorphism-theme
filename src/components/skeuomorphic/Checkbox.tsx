import React, { useState } from "react";
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
    <label className={cn("flex items-center gap-3 cursor-pointer group/checkbox", className)}>
      <div
        className={cn(
          "relative w-6 h-6 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 transition-all duration-200 overflow-hidden",
          isChecked && "border-blue-500/50 shadow-[inset_0_4px_10px_rgba(0,0,0,1),0_0_8px_rgba(59,130,246,0.3)]"
        )}
      >
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
          aria-label={label}
        />
        {isChecked && (
          <svg
            className="absolute inset-0 w-full h-full text-blue-500 drop-shadow-[0_0_4px_rgba(59,130,246,0.8)] p-1 z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={4}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-gray-400 font-mono text-sm tracking-widest uppercase group-hover/checkbox:text-gray-300 transition-colors select-none">{label}</span>}
    </label>
  );
};
