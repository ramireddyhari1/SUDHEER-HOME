"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function ProductsBannerCarousel() {
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?section=products-banner');
                const data = await res.json();
                
                console.log("Products banner API response:", data);

                if (data.success && data.content && data.content.products_banner_slides && data.content.products_banner_slides.length > 0) {
                    console.log("Setting products banner slides:", data.content.products_banner_slides);
                    setSlides(data.content.products_banner_slides);
                } else {
                    console.log("No products banner slides found or condition not met");
                }
            } catch (error) {
                console.error("Failed to fetch products banner content:", error);
            }
        };

        fetchContent();
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

    console.log("ProductsBannerCarousel render - slides count:", slides.length);

    if (slides.length === 0) {
        return null;
    }

    return (
        <section className="w-full">
            <div className="w-full">
                <div className="relative w-full overflow-hidden aspect-[3/1] md:aspect-[4/1] lg:aspect-[5/1]">
                    {/* Embla Viewport */}
                    <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full touch-pan-y">
                            {slides.map((slide, index) => (
                                <div
                                    className="flex-[0_0_100%] min-w-0 relative h-full overflow-hidden"
                                    key={slide.id || index}
                                >
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title || "Products Banner"}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {slides.length > 1 && (
                        <>
                            <button
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                                onClick={scrollPrev}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
                                onClick={scrollNext}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === selectedIndex
                                                ? "w-6 bg-white"
                                                : "w-1.5 bg-white/50 hover:bg-white/80"
                                        }`}
                                        onClick={() => scrollTo(index)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
