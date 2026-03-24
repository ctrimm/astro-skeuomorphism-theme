import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface GlassButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  color?: "blue" | "emerald" | "amber" | "rose" | "indigo" | "white";
  glow?: boolean;
}

export const SkeuoGlassButton = ({
  label,
  onClick,
  className,
  color = "blue",
  glow = true,
}: GlassButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { play } = useSkeuoSound();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    play("click", 0.5);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    play("click", 0.3);
    if (onClick) onClick();
  };

  const colorMap = {
    blue: "rgba(59, 130, 246, 0.4)",
    emerald: "rgba(16, 185, 129, 0.4)",
    amber: "rgba(245, 158, 11, 0.4)",
    rose: "rgba(244, 63, 94, 0.4)",
    indigo: "rgba(99, 102, 241, 0.4)",
    white: "rgba(255, 255, 255, 0.15)",
  };

  const glowMap = {
    blue: "rgba(59, 130, 246, 0.6)",
    emerald: "rgba(16, 185, 129, 0.6)",
    amber: "rgba(245, 158, 11, 0.6)",
    rose: "rgba(244, 63, 94, 0.6)",
    indigo: "rgba(99, 102, 241, 0.6)",
    white: "rgba(255, 255, 255, 0.4)",
  };

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-xl outline-none font-mono font-bold uppercase tracking-widest text-sm transition-all duration-200 ease-out flex items-center justify-center overflow-hidden",
        "bg-white/5 backdrop-blur-xl border border-white/20",
        isPressed ? "scale-[0.98] translate-y-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_0_rgba(0,0,0,0)]" : "shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)]",
        className
      )}
      style={{
        padding: "0.75rem 2rem",
        color: "#fff",
        textShadow: `0 0 10px ${colorMap[color]}`,
        background: isHovered 
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.3) 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%)`,
      }}
    >
      {/* Dynamic LED Underlight */}
      {glow && (
        <div 
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 blur-xl rounded-full transition-opacity duration-300",
            isPressed ? "opacity-100" : isHovered ? "opacity-70" : "opacity-40"
          )}
          style={{ background: glowMap[color] }}
        />
      )}
      
      {/* Top bevel highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      
      {/* Diagonal gloss reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -rotate-12 scale-150 pointer-events-none opacity-50"></div>

      {/* Edge border glowing thickness */}
      <div className="absolute inset-[1px] rounded-[11px] border border-white/10 pointer-events-none"></div>

      <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
};
