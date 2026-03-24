import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface ArcadeButtonProps {
  color?: "red" | "blue" | "green" | "yellow" | "purple";
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const SkeuoArcadeButton = ({
  color = "red",
  onClick,
  className,
  label,
}: ArcadeButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { play } = useSkeuoSound();

  const handleMouseDown = () => {
    setIsPressed(true);
    play("click", 0.8);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    play("click", 0.6);
    if (onClick) onClick();
  };

  const colorStyles = {
    red: {
      base: "from-red-900 via-red-950 to-black",
      dome: "from-red-400 to-red-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(150,0,0,0.8),0_5px_10px_rgba(255,0,0,0.5)]",
      domePressed: "from-red-500 to-red-700 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6),0_0_15px_rgba(255,0,0,0.8)]",
      glow: "bg-red-500 shadow-[0_0_30px_#ef4444]",
    },
    blue: {
      base: "from-blue-900 via-blue-950 to-black",
      dome: "from-blue-400 to-blue-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(0,0,150,0.8),0_5px_10px_rgba(0,0,255,0.5)]",
      domePressed: "from-blue-500 to-blue-700 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6),0_0_15px_rgba(0,0,255,0.8)]",
      glow: "bg-blue-500 shadow-[0_0_30px_#3b82f6]",
    },
    green: {
      base: "from-green-900 via-green-950 to-black",
      dome: "from-green-400 to-green-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(0,150,0,0.8),0_5px_10px_rgba(0,255,0,0.5)]",
      domePressed: "from-green-500 to-green-700 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,0,0.8)]",
      glow: "bg-green-500 shadow-[0_0_30px_#22c55e]",
    },
    yellow: {
      base: "from-yellow-900 via-yellow-950 to-black",
      dome: "from-yellow-400 to-yellow-500 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),inset_0_-5px_15px_rgba(150,150,0,0.8),0_5px_10px_rgba(255,255,0,0.3)]",
      domePressed: "from-yellow-500 to-yellow-600 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6),0_0_15px_rgba(255,255,0,0.6)]",
      glow: "bg-yellow-400 shadow-[0_0_30px_#eab308]",
    },
    purple: {
      base: "from-purple-900 via-purple-950 to-black",
      dome: "from-purple-400 to-purple-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(100,0,150,0.8),0_5px_10px_rgba(150,0,255,0.5)]",
      domePressed: "from-purple-500 to-purple-700 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6),0_0_15px_rgba(150,0,255,0.8)]",
      glow: "bg-purple-500 shadow-[0_0_30px_#a855f7]",
    }
  };

  const style = colorStyles[color];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Plastic Base/Collar */}
      <div className={cn(
        "relative rounded-full p-2 bg-gradient-to-b shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-black/80 w-24 h-24 flex items-center justify-center",
        style.base
      )}>
        
        {/* Inner black recess */}
        <div className="w-full h-full rounded-full bg-[#050505] shadow-[inset_0_5px_10px_rgba(0,0,0,1)] border border-white/5 relative flex items-center justify-center p-1">
          
          {/* Glowing LED underneath the opaque dome */}
          <div className={cn("absolute inset-2 rounded-full opacity-60 pointer-events-none blur-md transition-opacity duration-300", style.glow, isPressed ? "scale-110 opacity-100" : "")}></div>

          {/* Plunger / Dome */}
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPressed(false)}
            className={cn(
              "relative w-full h-full rounded-full outline-none transition-all duration-[50ms] ease-out overflow-hidden flex items-center justify-center",
              isPressed ? "scale-[0.92] translate-y-1" : "-translate-y-1",
              isPressed ? style.domePressed : style.dome
            )}
          >
            {/* Plastic specular highlight */}
            {!isPressed && (
              <div className="absolute top-1 left-1.5 w-[40%] h-[30%] rounded-full bg-gradient-to-br from-white/70 to-transparent blur-[1px]"></div>
            )}
            
            {/* Frosting / texture */}
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none"></div>

          </button>
        </div>
      </div>
      
      {label && (
        <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">{label}</span>
      )}
    </div>
  );
};
