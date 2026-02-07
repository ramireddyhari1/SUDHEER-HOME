"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StorySection() {
    const [content, setContent] = useState<any>({});

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content?section=home-story');
                const data = await res.json();
                if (data.success && data.content) {
                    setContent(data.content);
                }
            } catch (err) {
                console.error("Failed to load story content");
            }
        };
        fetchContent();
    }, []);

    const title = content.story_title || "From Our Village";
    const subtitle = content.story_subtitle || "To Your Home";
    const description = content.story_description || "Started in 1998 from a small village of Andhra, Vaishnavi Organics was born out of a desire to bring back the lost glory of traditional Indian food wisdom. \n\nEvery product is handcrafted with love using age-old methods, ensuring that you get nothing but the purest, most authentic taste of home. No chemicals, no shortcuts—just pure organic goodness.";
    const dbImage = content.story_image_url?.trim();
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        setUseFallback(false);
    }, [dbImage]);

    const finalImage = (dbImage && !useFallback) ? dbImage : "/story/village.png";

    return (
        <section className="py-6 md:py-8 bg-transparent relative">
            <Container>
                <div className="relative bg-[#FFF9F0] rounded-lg p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#DAA520]/20 max-w-4xl mx-auto">
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#DAA520] opacity-60"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[#DAA520] opacity-60"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[#DAA520] opacity-60"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#DAA520] opacity-60"></div>

                    {/* Inner Gold Frame */}
                    <div className="absolute inset-2 border border-[#DAA520]/10 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-center relative z-10">
                        {/* Left: Image (Visual Story) */}
                        <ScrollReveal variant="slide-in-left">
                            <div className="relative h-[150px] sm:h-[180px] md:h-[220px] w-full rounded-lg overflow-hidden shadow-md group">
                                <Image
                                    src={finalImage}
                                    alt="Our Roots"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    onError={() => setUseFallback(true)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white/90 text-xs font-medium tracking-wider uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                    Est. 1998
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Text Content */}
                        <ScrollReveal variant="slide-in-right">
                            <div className="space-y-3 text-center md:text-left">
                                <div className="inline-block">
                                    <span className="text-[#B8860B] font-bold tracking-[0.2em] uppercase text-[10px] border-b border-[#B8860B]/30 pb-0.5">Inheritance</span>
                                </div>

                                <h2 className="font-serif font-bold text-[#4A2C2A] leading-tight drop-shadow-sm" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                                    {title} <br />
                                    <span className="text-[#D97706] italic relative">
                                        {subtitle}
                                        <svg className="absolute -bottom-2 w-full h-2 text-[#D97706]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </span>
                                </h2>

                                <div className="text-[#5D4037] leading-relaxed whitespace-pre-line font-medium text-[11px] md:text-sm">
                                    {description}
                                </div>

                                <div className="pt-4 flex justify-center md:justify-start">
                                    <Link
                                        href="/about"
                                        className="group relative px-8 py-3 bg-[#2C1810] text-[#FFF9F0] text-sm md:text-base font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl hover:bg-[#3E2723] transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Explore Our Legacy <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-[#DAA520] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 origin-left"></div>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}
