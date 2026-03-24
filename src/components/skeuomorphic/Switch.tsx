import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labels?: { on: string; off: string };
  className?: string;
}

export const SkeuoSwitch = ({
  checked = false,
  onChange,
  label,
  labels = { on: "ON", off: "OFF" },
  className,
}: SwitchProps) => {
  const [isOn, setIsOn] = useState(checked);
  const { play } = useSkeuoSound();

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState);
    play(newState ? "switchOn" : "switchOff");
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        className="relative w-32 h-16 rounded shadow-[0_10px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] bg-[#1c1d1e] border border-black p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 overflow-hidden group/switchbox"
      >
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        {/* Module Screws */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] -rotate-12"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-45"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-90"><div className="w-full h-[1px] bg-black/60"></div></div>
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] rotate-180"><div className="w-full h-[1px] bg-black/60"></div></div>

        {/* Track */}
        <div className="absolute inset-x-2 inset-y-3 rounded bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          {/* Labels on track */}
          <div className="absolute inset-0 flex items-center justify-between px-3">
            <span
              className={cn(
                "text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200",
                isOn ? "text-green-500 drop-shadow-[0_0_4px_rgba(34,197,94,0.6)]" : "text-gray-700 font-normal"
              )}
            >
              {labels.on}
            </span>
            <span
              className={cn(
                "text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200",
                !isOn ? "text-gray-400 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]" : "text-gray-700 font-normal"
              )}
            >
              {labels.off}
            </span>
          </div>
        </div>

        {/* Switch lever */}
        <div
          className={cn(
            "absolute top-1.5 w-14 h-13 rounded transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-10",
            isOn ? "left-[64px]" : "left-1.5"
          )}
        >
          {/* Lever body */}
          <div className="w-full h-full rounded bg-gradient-to-b from-gray-700 to-gray-900 shadow-[0_4px_6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] border border-black relative overflow-hidden group-hover/switchbox:brightness-110 transition-all">
            
            {/* Grip lines */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3px]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
              ))}
            </div>

            {/* Warning stripes element occasionally appearing */}
            <div className="absolute top-0 right-0 w-2 h-full opacity-30 mix-blend-overlay block repeating-linear-gradient-[45deg,transparent,transparent_2px,#000_2px,#000_4px] border-l border-black/50"></div>

            {/* LED indicator */}
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-black/80 overflow-hidden bg-[#111] shadow-[inset_0_1px_2px_rgba(0,0,0,1)]">
              <div
                className={cn(
                  "w-full h-full rounded-full transition-all duration-300",
                  isOn
                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                    : "bg-transparent"
                )}
              />
            </div>
          </div>
        </div>
      </button>

      {label && (
        <span className="text-gray-300 font-mono text-sm tracking-widest uppercase text-etched-inset">{label}</span>
      )}
    </div>
  );
};
