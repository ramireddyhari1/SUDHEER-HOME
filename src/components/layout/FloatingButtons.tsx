"use client";

import React from "react";
import { Star, ShoppingCart } from "lucide-react";

export function FloatingButtons() {
    return (
        <>
            {/* Customer Reviews - Fixed Left Vertical Button */}
            <div className="fixed top-1/2 -translate-y-1/2 left-0 z-40 hidden md:flex items-center">
                <button className="bg-[#C2185B] text-white py-3 px-1 rounded-r-md shadow-lg flex flex-col items-center gap-2 hover:bg-[#ad1457] transition-colors group">
                    <Star className="w-4 h-4 fill-white text-white" />
                    <span
                        className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                    >
                        Customer Reviews
                    </span>
                </button>
            </div>

            {/* Rewards/Cart - Fixed Bottom Left Floating Button */}
            <button
                className="hidden md:flex fixed bottom-6 left-6 z-40 bg-[#F59E0B] text-white p-3 rounded-lg shadow-lg hover:bg-[#d97706] transition-transform hover:scale-105 active:scale-95 items-center justify-center"
                aria-label="Rewards"
            >
                <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute -bottom-1 left-0 w-2 h-2 bg-white rounded-full"></div>
                </div>
            </button>
        </>
    );
}
