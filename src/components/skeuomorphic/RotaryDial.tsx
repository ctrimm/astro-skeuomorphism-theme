import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

interface RotaryDialProps {
  className?: string;
}

export const SkeuoRotaryDial = ({ className }: RotaryDialProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDialing, setIsDialing] = useState(false);
  const { play } = useSkeuoSound();

  const handleDialClick = (digit: number) => {
    if (isDialing) return;
    
    // Calculate rotation based on digit position (0 is last)
    const positionMap: Record<number, number> = {
      1: 40, 2: 70, 3: 100, 4: 130, 5: 160, 6: 190, 7: 220, 8: 250, 9: 280, 0: 310
    };
    
    const targetRotation = positionMap[digit];
    if (!targetRotation) return;

    setIsDialing(true);
    setRotation(targetRotation);
    play("clack", 0.7);

    // Spring back animation
    setTimeout(() => {
      setRotation(0);
      play("click", 0.5); // Ratchet sound simulation
      setTimeout(() => {
        setIsDialing(false);
      }, targetRotation * 3); // Return speed varies by distance
    }, 400); 
  };

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  
  // Arrange digits in an arc covering about 270 degrees
  const getDigitStyle = (index: number) => {
    const angle = -120 + (index * 30); // Start bottom-left, go clockwise
    const radius = 60; // Distance from center
    const x = Math.sin(angle * (Math.PI / 180)) * radius;
    const y = -Math.cos(angle * (Math.PI / 180)) * radius;
    
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-48 h-48 bg-gradient-to-br from-[#1a1c1e] to-[#0a0a0a] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_2px_5px_rgba(255,255,255,0.1),inset_0_-5px_15px_rgba(0,0,0,0.8)] border-2 border-[#222] flex items-center justify-center p-2">
        
        {/* Metal Texture */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay rounded-full pointer-events-none"></div>
        
        {/* Base Number Ring (Static) */}
        <div className="absolute inset-4 rounded-full bg-[#111] shadow-[inset_0_10px_20px_rgba(0,0,0,1)] border border-black overflow-hidden flex items-center justify-center">
             {digits.map((digit, i) => (
                <div 
                  key={`base-${digit}`}
                  className="absolute w-8 h-8 flex items-center justify-center text-sm font-sans font-bold text-white uppercase drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
                  style={getDigitStyle(i)}
                >
                  {digit}
                </div>
             ))}
        </div>

        {/* The Rotating Finger Wheel */}
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center z-10 transition-transform origin-center"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isDialing ? (rotation === 0 ? `${rotation * 3}ms` : '300ms') : '0ms',
            transitionTimingFunction: rotation === 0 ? 'linear' : 'ease-in-out'
          }}
        >
          {/* Wheel Glass/Acrylic Body */}
          <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-[1px] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.4)]">
             
             {/* Dynamic Specular Highlights that rotate with the wheel */}
             <div className="absolute inset-[2px] rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none mix-blend-screen"></div>
             <div className="absolute top-[10%] left-[10%] w-[80%] h-[30%] bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none blur-[2px]"></div>
          </div>
          
          {/* Finger Holes */}
          {digits.map((digit, i) => (
             <div 
               key={`hole-${digit}`}
               className="absolute w-8 h-8 rounded-full bg-transparent shadow-[inset_0_2px_5px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.3),0_1px_1px_rgba(255,255,255,0.1)] border-[0.5px] border-black/40 cursor-pointer flex items-center justify-center group"
               style={getDigitStyle(i)}
               onClick={() => handleDialClick(digit)}
             >
                {/* Visual affordance for clicking the hole */}
                <div className="w-full h-full rounded-full bg-black/0 group-hover:bg-black/10 transition-colors"></div>
             </div>
          ))}

          {/* Center Hub Label Area */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#e5e5e5] to-[#999] shadow-[0_5px_15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.9)] border-2 border-[#555] flex flex-col items-center justify-center p-2 z-20">
             <div className="w-full h-full rounded-full border border-[#888] flex items-center justify-center bg-[#fdfdfd] shadow-premium-inset flex-col">
                 <span className="text-[6px] font-mono text-gray-500 font-bold tracking-widest uppercase">Emergency</span>
                 <span className="text-sm font-serif text-red-700 font-black tracking-widest mt-0.5">911</span>
             </div>
          </div>
        </div>

        {/* Physical Finger Stop Metal Bracket (Static) */}
        <div className="absolute bottom-6 right-6 w-12 h-4 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-l-full rounded-r-sm shadow-[0_5px_10px_rgba(0,0,0,0.9),inset_1px_1px_2px_rgba(255,255,255,0.9)] border border-[#777] z-30 transform origin-right rotate-[30deg]">
            {/* Curved end tip */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-gray-200 to-gray-500 rounded-l-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8)] border border-[#888]"></div>
        </div>

      </div>
    </div>
  );
};
