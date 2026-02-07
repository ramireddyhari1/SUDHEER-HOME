"use client";

import React from "react";
import { Container } from "@/components/ui/Container";

interface SectionDividerProps {
    variant?: "default" | "floral" | "geometric" | "namam" | "royal";
    className?: string;
}

export function SectionDivider({ variant = "default", className = "" }: SectionDividerProps) {
    const renderIcon = () => {
        switch (variant) {
            case "namam":
                // Traditional South Indian Namam - Artistic
                return (
                    <div className="relative flex items-center justify-center">
                        {/* Golden Glow removed to prevent artifact */}

                        <svg width="80" height="40" viewBox="0 0 80 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-md">
                            {/* The U Mark (Thiruman) - stylized as variable width stroke */}
                            <path d="M28 10 C28 28 52 28 52 10 L46 10 C46 22 34 22 34 10 Z" fill="#5D4037" />

                            {/* The Central Mark (Srichurnam) - Red/Gold Dot/Line */}
                            <path d="M40 8 L40 24" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="40" cy="24" r="2" fill="#D97706" />

                            {/* Side Decorative Flourishes */}
                            <path d="M20 20 L4 20" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                            <path d="M60 20 L76 20" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                            <circle cx="4" cy="20" r="2" fill="#5D4037" />
                            <circle cx="76" cy="20" r="2" fill="#5D4037" />
                        </svg>
                    </div>
                );
            case "floral":
                // Leafy / Vine Pattern
                return (
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 2C32 5 35 8 40 8C45 8 48 5 50 2M30 22C32 19 35 16 40 16C45 16 48 19 50 22M30 12C25 12 22 9 20 6C18 9 15 12 10 12C5 12 2 9 0 6M30 12C35 12 38 15 40 18C42 15 45 12 50 12C55 12 58 15 60 18" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="30" cy="12" r="3" fill="currentColor" />
                    </svg>
                );
            case "geometric":
                // Kolam / Geometric Diamond Pattern
                return (
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L15 2L25 12L15 22L5 12Z" fill="currentColor" opacity="0.6" />
                        <path d="M35 12L45 2L55 12L45 22L35 12Z" fill="currentColor" opacity="0.6" />
                        <rect x="28" y="10" width="4" height="4" transform="rotate(45 30 12)" fill="currentColor" />
                    </svg>
                );
            case "royal":
                // Royal Arch / Curve Pattern
                return (
                    <svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 2 C25 2 15 12 0 16 M40 2 C55 2 65 12 80 16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
                        <path d="M40 6 C30 6 25 14 15 16 M40 6 C50 6 55 14 65 16" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
                        <circle cx="40" cy="4" r="2.5" fill="#D97706" />
                        <circle cx="0" cy="16" r="1.5" fill="currentColor" />
                        <circle cx="80" cy="16" r="1.5" fill="currentColor" />
                    </svg>
                );
            default:
                // Original Temple Motif
                return (
                    <svg width="60" height="24" viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0C22.7614 0 25 2.23858 25 5C25 7.76142 22.7614 10 20 10C17.2386 10 15 7.76142 15 5C15 2.23858 17.2386 0 20 0ZM20 20C14.4772 20 10 15.5228 10 10H0V10.5C0 15.7467 4.25329 20 9.5 20H20ZM20 20H30.5C35.7467 20 40 15.7467 40 10.5V10H30C30 15.5228 25.5228 20 20 20Z" />
                    </svg>
                );
        }
    };

    return (
        <div className={`w-full py-2 overflow-hidden ${className}`}>
            <Container>
                <div className="flex items-center justify-center gap-4">
                    {/* Left Line - Thicker & Darker */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B4513] to-[#8B4513] w-full max-w-[120px] md:max-w-[250px]"></div>

                    {/* Central Motif (SVG) - Larger & Bolder */}
                    <div className="text-[#6F4E37] drop-shadow-sm">
                        {renderIcon()}
                    </div>

                    {/* Right Line - Thicker & Darker */}
                    <div className="h-[2px] bg-gradient-to-l from-transparent via-[#8B4513] to-[#8B4513] w-full max-w-[120px] md:max-w-[250px]"></div>
                </div>
            </Container>
        </div>
    );
}
