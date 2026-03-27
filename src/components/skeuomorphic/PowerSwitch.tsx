import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";

export const PowerSwitch = () => {
    const [isOn, setIsOn] = useState(false);
    const { play } = useSkeuoSound();

    // On mount, check if already on (maybe persist in session storage?)
    // For "unexpected" effect, always start OFF? Or start ON to not annoy?
    // Plan said "Start OFF".
    useEffect(() => {
        // Check session storage to see if we were already on (reloads)
        const storedState = sessionStorage.getItem("skeuo-power");
        if (storedState === "on") {
            setIsOn(true);
            document.documentElement.classList.add("power-on");
        }
    }, []);

    const togglePower = () => {
        const newState = !isOn;
        setIsOn(newState);

        if (newState) {
            play("powerOn"); // Long warm up sound
            setTimeout(() => play("switchOn"), 200);
            document.documentElement.classList.add("power-on");
            sessionStorage.setItem("skeuo-power", "on");
        } else {
            play("switchOff");
            document.documentElement.classList.remove("power-on");
            sessionStorage.setItem("skeuo-power", "off");
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent("skeuo-power", { detail: { isOn: newState } }));
    };

    return (
        <div className="fixed top-24 right-6 z-50 flex flex-col items-center gap-3 perspective-1000">
            <div className="relative group">
                {/* Switch Housing - Industrial Plastic/Metal */}
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-gray-800 to-black shadow-[0_8px_16px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.2)] border border-gray-700/50">
                    {/* Mounting Screws */}
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),1px_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center">
                        <div className="w-[1px] h-full bg-zinc-600 rotate-45"></div>
                    </div>
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),1px_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center">
                        <div className="w-[1px] h-full bg-zinc-600 rotate-[135deg]"></div>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),1px_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center">
                        <div className="w-[1px] h-full bg-zinc-600 rotate-[20deg]"></div>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-zinc-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),1px_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center">
                        <div className="w-[1px] h-full bg-zinc-600 rotate-[-45deg]"></div>
                    </div>
                </div>

                <div
                    role="button"
                    tabIndex={0}
                    onClick={togglePower}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            togglePower();
                        }
                    }}
                    className={cn(
                        "relative w-20 h-32 rounded-lg transition-all duration-300 transform-gpu cursor-pointer",
                        "bg-gradient-to-b from-[#2a2a2a] via-[#333] to-[#1a1a1a]",
                        "border border-[#444] border-t-[#555] border-b-[#111]",
                        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_10px_rgba(0,0,0,0.5)]",
                        "active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-red-500/30 block"
                    )}
                    aria-label="Master Power Switch"
                >
                    {/* Switch Well / Recess */}
                    <div className="absolute inset-2 rounded bg-[#111] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),inset_0_0_2px_rgba(0,0,0,1)] border-b border-white/5"></div>

                    {/* The Actual Switch Lever */}
                    <div
                        className={cn(
                            "absolute left-1/2 top-3 -translate-x-1/2 w-12 h-20 rounded-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]", // Bouncy spring feel
                            "shadow-[0_4px_6px_rgba(0,0,0,0.6),0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] transform-gpu",
                            isOn
                                ? "translate-y-0 bg-gradient-to-b from-red-500 to-red-700 shadow-[inset_0_2px_8px_rgba(100,0,0,0.5)]"
                                : "translate-y-6 bg-gradient-to-b from-red-700 to-red-900"
                        )}
                    >
                        {/* Grip ridges */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] items-center opacity-40 px-1">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-full h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>
                            ))}
                        </div>
                    </div>

                    {/* Status LED */}
                    <div className={cn(
                        "absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 z-10",
                        isOn
                            ? "bg-green-400 shadow-[0_0_8px_#4ade80,0_0_12px_#4ade80]"
                            : "bg-red-900/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                    )}></div>

                    {/* Labels */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] font-mono text-gray-500 font-bold tracking-wider pointer-events-none select-none">
                        {"ON"}
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-gray-500 font-bold tracking-wider pointer-events-none select-none">
                        {"OFF"}
                    </div>

                </div>
            </div>

            <div className="bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest text-red-500 border border-red-900/30 shadow-lg backdrop-blur-sm">
                {"SYSTEM POWER"}
            </div>
        </div>
    );
};
