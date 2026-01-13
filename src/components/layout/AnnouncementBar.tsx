"use client";

import { MapPin, Rocket, Star } from "lucide-react";

export function AnnouncementBar() {
    return (
        <>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
            <div className="bg-[#155e42] text-white overflow-hidden py-1.5 relative z-50">
                <div className="flex w-[200%] sm:w-[200%] md:w-full animate-marquee whitespace-nowrap group">
                    {/* Content Set 1 */}
                    <div className="flex items-center gap-4 md:gap-12 w-1/2 justify-around px-4">
                        <span className="flex items-center gap-2 text-[10px] md:text-sm font-medium">
                            <Rocket className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
                            <span>₹848 FREE Goodies — Sale LIVE!</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-yellow-400" />
                            <span>Shipping Worldwide</span>
                        </span>
                        <span className="flex items-center gap-2 text-[10px] md:text-sm font-medium">
                            <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                            <span>FREE Ship &gt; ₹999</span>
                        </span>
                    </div>

                    {/* Content Set 2 (Duplicate for seamless loop) */}
                    <div className="flex items-center gap-4 md:gap-12 w-1/2 justify-around px-4">
                        <span className="flex items-center gap-2 text-[10px] md:text-sm font-medium">
                            <Rocket className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
                            <span>₹848 FREE Goodies — Sale LIVE!</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-yellow-400" />
                            <span>Shipping Worldwide</span>
                        </span>
                        <span className="flex items-center gap-2 text-[10px] md:text-sm font-medium">
                            <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                            <span>FREE Ship &gt; ₹999</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
