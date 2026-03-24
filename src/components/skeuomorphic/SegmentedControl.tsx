import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SkeuoSegmentedControl = ({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) => {
  const [selected, setSelected] = useState(value || options[0]?.value);

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div
      className={cn(
        "inline-flex gap-1 p-1 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 overflow-hidden relative",
        className
      )}
      role="tablist"
    >
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "px-6 py-2 rounded font-mono text-sm tracking-widest uppercase transition-all duration-200 flex items-center gap-2 relative z-10",
              isSelected
                ? "bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                : "text-gray-500 hover:text-gray-300 border border-transparent"
            )}
          >
            {option.icon && <span className="text-lg">{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
