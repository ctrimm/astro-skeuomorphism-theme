import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
}

export const SkeuoRadio = ({
  options,
  value,
  onChange,
  name,
  className,
}: RadioProps) => {
  const [selected, setSelected] = useState(value || options[0]?.value);

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} role="radiogroup">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group/radio"
          >
            <div
              className={cn(
                "relative w-6 h-6 rounded-full bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 transition-all duration-200 overflow-hidden flex items-center justify-center",
                isSelected && "border-blue-500/50 shadow-[inset_0_4px_10px_rgba(0,0,0,1),0_0_8px_rgba(59,130,246,0.3)]"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleSelect(option.value)}
                className="sr-only"
              />
              {isSelected && (
                <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </div>
            <span className="text-gray-400 font-mono text-sm tracking-widest uppercase group-hover/radio:text-gray-300 transition-colors select-none">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
