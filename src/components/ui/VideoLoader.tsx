"use client";

import { useState, useEffect } from "react";

export function VideoLoader() {
    const [loading, setLoading] = useState(true);
    const [fading, setFading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Safety timeout: Ensure loader is removed even if onEnded doesn't fire
        const timer = setTimeout(() => {
            handleComplete();
        }, 4000); // Reduced to 4s for better UX

        return () => clearTimeout(timer);
    }, []);

    const handleComplete = () => {
        if (fading) return;
        setFading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    if (!isMounted || !loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] hidden md:flex items-center justify-center bg-white transition-opacity duration-500 pointer-events-none ${fading ? "opacity-0" : "opacity-100"
                }`}
            aria-hidden="true"
        >
            <video
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-48 h-48 md:w-full md:h-full object-contain md:max-w-3xl mix-blend-multiply"
                onEnded={handleComplete}
                onError={handleComplete} // Dismiss on error
            >
                <source src="/logo.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
