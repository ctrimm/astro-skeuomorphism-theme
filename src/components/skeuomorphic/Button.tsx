import React from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "raised" | "flat" | "glass" | "primary";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

export const SkeuoButton = ({
  variant = "raised",
  children,
  onClick,
  className,
  href,
}: ButtonProps) => {
  const { play } = useSkeuoSound();
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleClick = (e: React.MouseEvent) => {
    play("click"); // Or select based on variant
    onClick?.();
  };
  const baseClasses =
    "px-6 py-3 rounded-lg transition-all duration-200 inline-block text-center relative overflow-hidden before:absolute before:inset-0 before:bg-noise before:opacity-20 before:mix-blend-overlay before:pointer-events-none group/skeuobtn";

  const variantClasses = {
    raised:
      "bg-gradient-to-b from-gray-700 to-gray-900 border border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_6px_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_0_rgba(0,0,0,0)] text-gray-300 group-active/skeuobtn:text-white uppercase tracking-widest font-mono text-xs font-bold",
    primary:
      "bg-gradient-to-b from-blue-700 to-blue-900 border border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_0_0_rgba(0,0,0,0)] text-white uppercase tracking-widest font-mono text-xs font-bold hover:brightness-110",
    flat:
      "bg-[#111] border border-gray-800 shadow-[inset_0_1px_3px_rgba(0,0,0,1)] text-gray-400 hover:text-white uppercase tracking-widest font-mono text-xs font-bold active:shadow-[inset_0_3px_6px_rgba(0,0,0,1)]",
    glass:
      "bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_6px_rgba(0,0,0,0.5)] text-gray-300 hover:bg-white/10 active:translate-y-[2px] uppercase tracking-widest font-mono text-xs font-bold",
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  const glassShineStyle = variant === 'glass' ? {
    background: isHovered 
      ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 60%), rgba(255, 255, 255, 0.05)`
      : '',
  } : {};

  if (href) {
    return (
      <a 
        href={href} 
        className={classes} 
        onClick={() => play("click")}
        ref={buttonRef as any}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={glassShineStyle}
      >
        <span className="relative z-10 flex items-center gap-2 justify-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pointer-events-none">
          {variant === "primary" && <span className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(0,0,0,1)] group-active/skeuobtn:bg-blue-400 group-active/skeuobtn:shadow-[0_0_8px_#60a5fa] transition-colors border border-black/50"></span>}
          {children}
        </span>
      </a>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={classes}
      ref={buttonRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={glassShineStyle}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pointer-events-none">
        {variant === "primary" && <span className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(0,0,0,1)] group-active/skeuobtn:bg-blue-400 group-active/skeuobtn:shadow-[0_0_8px_#60a5fa] transition-colors border border-black/50"></span>}
        {children}
      </span>
    </button>
  );
};
