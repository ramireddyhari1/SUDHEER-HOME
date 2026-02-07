"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Poster Aspect Ratio: 1600x472 (~3.39:1)

export function HeroCarousel() {
    const [dynamicSlides, setDynamicSlides] = useState<any[]>([]); // Start with empty, load from DB only

    // Fetch dynamic content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Use 'section' parameter to match API
                const res = await fetch('/api/content?section=home-hero');
                const data = await res.json();

                if (data.success && data.content && data.content.hero_slides && data.content.hero_slides.length > 0) {
                    setDynamicSlides(data.content.hero_slides);
                }
            } catch (error) {
                console.error("Failed to fetch hero content, using defaults");
                // dynamicSlides already has defaults, so no action needed, or we could reset to defaults here if we wanted
            }
        };

        // Initial fetch
        fetchContent();

        // Poll every 5 seconds for real-time updates from Admin Panel
        const interval = setInterval(fetchContent, 5000);
        return () => clearInterval(interval);
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    if (dynamicSlides.length === 0) {
        return null; // Or a skeleton loader
    }

    return (
        <section className="w-full bg-white pb-0 pt-0">
            <div className="w-full">
                {/* Carousel Container - Full Screen Earthy Hero */}
                <div className="relative w-full overflow-hidden aspect-[2/1] md:aspect-[3.4/1] md:h-auto md:min-h-[450px] md:max-h-[550px]">

                    {/* Embla Viewport */}
                    <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full touch-pan-y">
                            {dynamicSlides.map((slide, index) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <div className="flex-[0_0_100%] min-w-0 relative h-full overflow-hidden" key={slide.id || Math.random()}>
                                        {/* Background Image with Ken Burns Effect */}
                                        <div className="absolute inset-0 w-full h-full">
                                            <Image
                                                src={slide.image}
                                                alt={slide.title || "Banner"}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                                sizes="100vw"
                                            />
                                        </div>

                                        {/* No overlay or text - just image */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {dynamicSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                                    }`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
