"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Tractor } from "lucide-react";

interface AnimatedTractorButtonProps {
    onClick?: () => void;
    className?: string;
    price?: string; // Optional price to display
    label?: string; // Default to "Add to cart"
}

export function AnimatedTractorButton({
    onClick,
    className = "",
    price,
    label = "Add to cart"
}: AnimatedTractorButtonProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent parent link clicks
        if (isAnimating) return;

        setIsAnimating(true);
        if (onClick) onClick();

        // Reset animation state after it completes (approx 2s)
        setTimeout(() => {
            setIsAnimating(false);
        }, 2500);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isAnimating}
            className={`relative w-full overflow-hidden text-white rounded-full py-2 px-4 transition-colors group ${className}`}
        >
            {/* Tractor Animation Layer */}
            <div
                className={`absolute top-1/2 -translate-y-1/2 left-[-50px] w-12 flex items-center justify-center z-20 ${isAnimating
                    ? "transition-all duration-[2000ms] ease-linear translate-x-[400px]"
                    : "transition-none" // Snap back instantly when not engaging
                    }`}
            >
                {/* We use the provided tractor PNG if available, or a fallback icon */}
                <div className="w-10 h-10 relative filter drop-shadow-md">
                    <Image
                        src="/POSTERS/tractor_cartoon.png"
                        alt="Tractor"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Button Content */}
            <div className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${isAnimating ? "opacity-50" : "opacity-100"}`}>
                {label === "Add to cart" && (
                    <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center">
                        <Minus className="w-3 h-3 text-white" />
                    </div>
                )}

                <span className="font-bold text-[15px]">{label}</span>

                {price && (
                    <span className="text-sm font-medium border-l border-white/30 pl-2 ml-1">
                        {price}
                    </span>
                )}
            </div>

            {/* Dirt/Dust Trail Effect (Simple CSS) */}
            {isAnimating && (
                <div className="absolute top-1/2 left-0 h-[2px] w-full bg-white/30 translate-y-3 animate-pulse"></div>
            )}
        </button>
    );
}
