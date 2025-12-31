import { useState } from "react";
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
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className={cn(
                "relative w-6 h-6 rounded-full transition-all duration-200",
                isSelected
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-skeuo-raised"
                  : "bg-neubg shadow-neu-inset"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleSelect(option.value)}
                className="sr-only"
              />
              {isSelected && (
                <div className="absolute inset-2 rounded-full bg-white shadow-sm" />
              )}
            </div>
            <span className="text-gray-800 font-medium select-none">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
