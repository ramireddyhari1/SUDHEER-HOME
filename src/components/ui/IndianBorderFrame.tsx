"use client";

import React from "react";

interface IndianBorderFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function IndianBorderFrame({ children, className = "" }: IndianBorderFrameProps) {
    // A simplified traditional Mango/Paisley pattern for border
    // We'll use a CSS mask or background pattern approach for best varied size support

    return (
        <div className={`relative p-1 md:p-2 ${className}`}>
            {/* The Outer Gold Border */}
            <div className="absolute inset-0 rounded-xl border-[2px] border-[#DAA520] opacity-50"></div>

            {/* The Intricate Pattern Border - Using SVG Background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                {/* Top Border Pattern */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-repeat-x opacity-80"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 C10 15 5 18 2 15 C-1 12 2 5 10 5 C15 5 18 10 15 15 C12 18 10 15 10 10 Z' fill='%23DAA520' fill-opacity='0.6'/%3E%3Cpath d='M30 10 C30 15 25 18 22 15 C19 12 22 5 30 5 C35 5 38 10 35 15 C32 18 30 15 30 10 Z' fill='%235D4037' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 20px'
                    }}>
                </div>
                {/* Bottom Border Pattern */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-repeat-x opacity-80"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 C10 15 5 18 2 15 C-1 12 2 5 10 5 C15 5 18 10 15 15 C12 18 10 15 10 10 Z' fill='%23DAA520' fill-opacity='0.6'/%3E%3Cpath d='M30 10 C30 15 25 18 22 15 C19 12 22 5 30 5 C35 5 38 10 35 15 C32 18 30 15 30 10 Z' fill='%235D4037' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 20px',
                        transform: 'rotate(180deg)'
                    }}>
                </div>
                {/* Left Border Pattern */}
                <div className="absolute top-0 bottom-0 left-0 w-6 bg-repeat-y opacity-80"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='40' viewBox='0 0 20 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 C15 10 18 5 15 2 C12 -1 5 2 5 10 C5 15 10 18 15 15 C18 12 15 10 10 10 Z' fill='%23DAA520' fill-opacity='0.6'/%3E%3C/svg%3E")`,
                        backgroundSize: '20px 40px'
                    }}>
                </div>
                {/* Right Border Pattern */}
                <div className="absolute top-0 bottom-0 right-0 w-6 bg-repeat-y opacity-80"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='40' viewBox='0 0 20 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 C15 10 18 5 15 2 C12 -1 5 2 5 10 C5 15 10 18 15 15 C18 12 15 10 10 10 Z' fill='%23DAA520' fill-opacity='0.6'/%3E%3C/svg%3E")`,
                        backgroundSize: '20px 40px',
                        transform: 'scaleX(-1)'
                    }}>
                </div>
            </div>

            {/* Inner Container */}
            <div className="relative bg-[#FFF8E1] rounded-lg border border-[#5D4037]/20 shadow-inner overflow-hidden p-6 md:p-10">
                {children}

                {/* Inner Corner Motifs */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#5D4037] rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#5D4037] rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#5D4037] rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#5D4037] rounded-br-lg"></div>
            </div>
        </div>
    );
}
