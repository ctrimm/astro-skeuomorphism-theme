
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSkeuoSound } from "@/hooks/use-skeuo-sound";
import { SkeuoButton } from "./Button";
import { SkeuoKnob } from "./Knob";
import { SkeuoSlider } from "./Slider";

const tracks = [
    { title: "Skeuomorphism.mp3", artist: "Design Trends", duration: "3:45" },
    { title: "Tactile_Feel.wav", artist: "User Experience", duration: "2:30" },
    { title: "Retro_Future.flac", artist: "The Interfaces", duration: "4:20" },
    { title: "Clicky_Buttons.ogg", artist: "Haptic Feedback", duration: "1:15" },
];

export const PocketPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(70);
    const { play } = useSkeuoSound();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let animationFrame: number;
        let audioData = new Uint8Array(20);

        const drawVisualizer = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Simulate audio data
            if (isPlaying) {
                for (let i = 0; i < 20; i++) {
                    audioData[i] = Math.random() * 255; // Random noise for demo
                }
            } else {
                audioData.fill(0); // Flat line when paused
            }

            ctx.fillStyle = "#1a1a1a"; // Dark screen background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw bars
            const barWidth = (canvas.width / 20) - 2;

            for (let i = 0; i < 20; i++) {
                const value = audioData[i];
                const barHeight = (value / 255) * canvas.height;

                // Gradient bars (Winamp style: Green -> Yellow -> Red)
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, "#00ff00");
                gradient.addColorStop(0.6, "#ffff00");
                gradient.addColorStop(1, "#ff0000");

                ctx.fillStyle = gradient;

                // Draw individual blocks for pixel look
                const blockHeight = 3;
                const spacing = 1;
                const totalBlocks = Math.floor(barHeight / (blockHeight + spacing));

                for (let j = 0; j < totalBlocks; j++) {
                    ctx.fillRect(i * (barWidth + 2), canvas.height - (j * (blockHeight + spacing)), barWidth, blockHeight);
                }
            }

            animationFrame = requestAnimationFrame(drawVisualizer);
        };

        drawVisualizer();
        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        play("click");
    };

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
        play("click");
    };

    const handlePrev = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
        play("click");
    };

    return (
        <div className="relative w-80 bg-matte-plastic rounded-xl p-5 shadow-premium-raised border border-gray-600 border-t-gray-400 overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none rounded-xl mix-blend-overlay"></div>

            {/* Branding / Logo Area */}
            <div className="flex justify-between items-center mb-3">
                <div className="text-xs font-mono font-bold text-gray-400 tracking-tighter flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_orange]"></div>
                    WINAMP_POCKET_v5
                </div>
                <div className="flex gap-1">
                    <div className="w-8 h-1 bg-zinc-900 rounded-full shadow-inner"></div>
                    <div className="w-8 h-1 bg-zinc-900 rounded-full shadow-inner"></div>
                </div>
            </div>

            {/* Screen Container */}
            <div className="bg-[#111] rounded-lg p-1.5 mb-5 shadow-premium-inset border-b border-t border-gray-700/50 relative overflow-hidden">
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-20"></div>

                {/* LCD Screen Content */}
                <div className="font-mono text-green-400 text-xs flex flex-col gap-1 relative z-10">
                    <div className="flex justify-between bg-[#222] px-1 py-0.5 text-[10px] text-green-600/80 uppercase tracking-widest">
                        <span>{isPlaying ? "PLAY" : "STOP"}</span> <span>128 KBPS</span> <span>44 KHZ</span>
                    </div>

                    <div className="flex gap-2 h-16">
                        {/* Track Info (Marquee) */}
                        <div className="flex-1 overflow-hidden relative border border-green-900/30 bg-[#0a0a0a] p-1 flex flex-col justify-center">
                            <div className="whitespace-nowrap animate-marquee">
                                {tracks[currentTrack].artist} *** {tracks[currentTrack].title} *** ({tracks[currentTrack].duration}) ***
                            </div>
                            {/* Time Counter */}
                            <div className="text-2xl font-bold text-green-500 mt-1 font-[digital] tracking-widest tabular-nums">
                                00:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                            </div>
                        </div>

                        {/* Visualizer */}
                        <canvas ref={canvasRef} width={80} height={60} className="border border-green-900/30 bg-black"></canvas>
                    </div>
                </div>
            </div>

            {/* Seek Bar */}
            <div className="mb-5 relative h-3 bg-[#1a1a1b] rounded-full shadow-premium-inset border-b border-white/10">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-600 to-yellow-500 w-[45%] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] rounded-full"></div>
                {/* Thumb */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-4 h-6 bg-brushed-metal rounded-sm shadow-premium-raised border border-white/30 cursor-pointer -ml-2 flex flex-col items-center justify-center p-[1px] z-10">
                    <div className="w-full h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.4)]"></div>
                    <div className="w-full h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.4)] mt-[1px]"></div>
                    <div className="w-full h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.4)] mt-[1px]"></div>
                </div>
            </div>

            {/* Main Controls */}
            <div className="grid grid-cols-[1fr_auto] gap-4 mb-4">
                {/* Playback Buttons */}
                <div className="flex gap-1 items-end">
                    <button onClick={handlePrev} className="h-8 w-10 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-l-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_3px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none flex items-center justify-center group border border-black/50">
                        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-zinc-300 group-active:border-r-orange-400"></div>
                        <div className="w-[2px] h-[8px] bg-zinc-300 ml-[1px] group-active:bg-orange-400"></div>
                    </button>

                    <button onClick={handlePlayPause} className="h-10 w-12 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_3px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none flex items-center justify-center group border border-black/50 -mb-[1px] z-10">
                        {isPlaying ? (
                            <div className="flex gap-1">
                                <div className="w-[3px] h-[10px] bg-zinc-200 group-active:bg-orange-400 shadow-[0_0_2px_rgba(0,0,0,0.5)]"></div>
                                <div className="w-[3px] h-[10px] bg-zinc-200 group-active:bg-orange-400 shadow-[0_0_2px_rgba(0,0,0,0.5)]"></div>
                            </div>
                        ) : (
                            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-zinc-200 group-active:border-l-orange-400 translate-x-[2px] filter drop-shadow-sm"></div>
                        )}
                    </button>

                    <button className="h-8 w-10 bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_3px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none flex items-center justify-center group border border-black/50">
                        <div className="w-2 h-2 bg-zinc-300 group-active:bg-orange-400 shadow-[0_0_2px_rgba(0,0,0,0.5)]"></div>
                    </button>

                    <button onClick={handleNext} className="h-8 w-10 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-r-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_3px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none flex items-center justify-center group border border-black/50">
                        <div className="w-[2px] h-[8px] bg-zinc-300 mr-[1px] group-active:bg-orange-400"></div>
                        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-zinc-300 group-active:border-l-orange-400"></div>
                    </button>
                </div>

                {/* Volume Knob */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full bg-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></div>
                    {/* Using CSS transform for rotation instead of component for raw control */}
                    <div
                        className="absolute top-1 left-1 w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center transform active:scale-95 transition-transform"
                        style={{ transform: `rotate(${volume * 2.7 - 135}deg)` }}
                        onClick={() => setVolume(Math.min(100, volume + 10) % 100)}
                    >
                        <div className="w-1 h-3 bg-orange-500 absolute top-1 shadow-[0_0_5px_orange]"></div>
                    </div>
                </div>
            </div>

            {/* Extra Controls */}
            <div className="flex justify-between items-center bg-[#222] rounded-lg p-2 shadow-inner border-t border-white/5">
                <div className="flex gap-2">
                    <div className="w-8 h-4 rounded-full bg-zinc-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] relative cursor-pointer" onClick={() => play("switchOn")}>
                        <div className={`absolute top-[2px] left-[2px] w-3 h-3 rounded-full bg-zinc-400 shadow-md transition-all ${isPlaying ? 'translate-x-4 bg-orange-500' : ''}`}></div>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 self-center">SHUFFLE</span>
                </div>

                <div className="flex gap-2">
                    <div className="w-4 h-4 rounded bg-zinc-700 shadow-skeuo-raised flex items-center justify-center active:bg-orange-500 cursor-pointer" onClick={() => play("click")}>
                        <span className="text-[8px] text-white">EQ</span>
                    </div>
                    <div className="w-4 h-4 rounded bg-zinc-700 shadow-skeuo-raised flex items-center justify-center active:bg-orange-500 cursor-pointer" onClick={() => play("click")}>
                        <span className="text-[8px] text-white">PL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
