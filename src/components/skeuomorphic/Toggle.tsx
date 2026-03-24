import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

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
  const { play } = useSkeuoSound();

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
    play(newChecked ? "click" : "clack");
  };

  return (
    <div className={cn("flex items-center gap-3 group/tgl", className)}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={cn(
          "relative w-16 h-8 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 transition-all duration-300 overflow-hidden"
        )}
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        {/* Toggle Track Background */}
        <div className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
          checked && "opacity-20 bg-blue-500"
        )}></div>
        
        {/* Toggle Thumb */}
        <span
          className={cn(
            "absolute top-0.5 w-[30px] h-6 rounded transition-all duration-300 block",
            "bg-gradient-to-b from-gray-600 to-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black",
            checked ? "left-[30px]" : "left-[2px]"
          )}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2px]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
              ))}
            </div>
        </span>
      </button>
      {label && (
        <span className="text-gray-400 font-mono text-sm tracking-widest uppercase group-hover/tgl:text-gray-300 transition-colors select-none">{label}</span>
      )}
    </div>
  );
};
