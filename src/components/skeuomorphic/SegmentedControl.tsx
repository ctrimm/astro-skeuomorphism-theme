import { useState } from "react";
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
        "inline-flex gap-1 p-1 rounded-2xl bg-neubg shadow-neu-inset",
        className
      )}
      role="tablist"
    >
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2",
              isSelected
                ? "bg-gradient-to-b from-white to-gray-100 shadow-skeuo-raised text-gray-800"
                : "text-gray-600 hover:text-gray-800"
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
