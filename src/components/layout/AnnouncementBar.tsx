"use client";

import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export function AnnouncementBar() {
    const [content, setContent] = useState<{
        enabled: boolean;
        text: string;
        bgColor: string;
        textColor: string;
    }>({
        enabled: true,
        text: "Get Flat <span class='text-[#FFD700] font-bold'>10% OFF</span> on your first order! Use Code: <span class='text-[#FFD700] font-bold'>WELCOME10</span>",
        bgColor: "#155E42",
        textColor: "#FFFFFF"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?section=announcement-bar');
                const data = await res.json();
                if (data.success && data.content) {
                    // Check if the fetched color is Brown (previous default), if so, revert to Green
                    const fetchedBg = data.content.bg_color || "#155E42";
                    const finalBg = fetchedBg === "#2C1810" ? "#155E42" : fetchedBg;

                    setContent({
                        enabled: data.content.enabled !== 'false', // Default to true if not set
                        text: data.content.text || "Get Flat <span class='text-[#FFD700] font-bold'>10% OFF</span> on your first order! Use Code: <span class='text-[#FFD700] font-bold'>WELCOME10</span>",
                        bgColor: finalBg,
                        textColor: data.content.text_color || "#FFFFFF"
                    });
                }
            } catch (error) {
                console.error("Failed to load announcement");
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (!content.enabled) return null;

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
            <div
                className="overflow-hidden relative z-50 group transition-colors duration-300"
                style={{ backgroundColor: content.bgColor, color: content.textColor }}
            >
                <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-1.5">
                    {/* Content duplicated multiple times for seamless scrolling */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center justify-center mx-8">
                            <p className="text-[11px] sm:text-sm font-medium tracking-wide flex items-center gap-2">
                                <Rocket className="h-3 w-3" style={{ color: content.textColor }} />
                                <span dangerouslySetInnerHTML={{ __html: content.text }}></span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
