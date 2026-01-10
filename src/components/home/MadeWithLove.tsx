"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Play } from "lucide-react";

export function MadeWithLove() {
    const [isMuted, setIsMuted] = React.useState(true);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section className="py-16 bg-white">
            <Container>
                {/* Header */}
                <div className="flex items-center justify-center gap-6 mb-10">
                    <div className="hidden md:block h-[1px] bg-amber-200/60 flex-1 max-w-[150px]"></div>
                    <h2 className="text-3xl md:text-4xl font-serif text-amber-950 text-center tracking-wide uppercase italic">
                        Made with Love by SIRIPURAPU
                    </h2>
                    <div className="hidden md:block h-[1px] bg-amber-200/60 flex-1 max-w-[150px]"></div>
                </div>

                {/* Video/Image Container */}
                <div
                    className="relative max-w-5xl mx-auto mb-10 group cursor-pointer"
                    onClick={toggleMute}
                >
                    {/* Corner Borders */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-amber-500 z-10 transition-all group-hover:w-14 group-hover:h-14"></div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-amber-500 z-10 transition-all group-hover:w-14 group-hover:h-14"></div>
                    <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-amber-500 z-10 transition-all group-hover:w-14 group-hover:h-14"></div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-amber-500 z-10 transition-all group-hover:w-14 group-hover:h-14"></div>

                    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
                        <video
                            ref={videoRef}
                            src="/farm_video.mp4"
                            poster="/products/vaishnavi_video.png"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        />

                        {/* Overlay for depth */}
                        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${!isMuted ? 'opacity-0' : 'opacity-100'}`}></div>

                        {/* Play/Unmute Button */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isMuted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/90 rounded-full flex items-center justify-center pl-2 shadow-2xl backdrop-blur-md transform transition-transform group-hover:scale-110">
                                {isMuted ? (
                                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white" />
                                ) : (
                                    // Only strictly needed if we want a pause icon, but user asked for unmute
                                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white" />
                                )}
                            </div>
                        </div>

                        {/* Zero Preservatives Text */}
                        <div className="absolute bottom-6 md:bottom-12 left-0 w-full text-center z-20 pointer-events-none">
                            <h3 className="text-white font-serif font-black text-4xl md:text-6xl tracking-wider drop-shadow-2xl italic" style={{
                                textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.5)'
                            }}>
                                ZERO PRESERVATIVES
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <div className="max-w-4xl mx-auto text-center text-gray-800 text-base md:text-lg leading-relaxed px-4 font-light">
                    <p>
                        <span className="font-semibold text-amber-900">'Vaishnavi Organics'</span> is dedicated to bringing you the purest flavors of nature. Our products are crafted with traditional methods, ensuring every bite is a tribute to our heritage and a promise of health, <span className="font-semibold text-amber-900">free from palm oil and harmful preservatives</span> 🌱
                    </p>
                </div>
            </Container>
        </section>
    );
}
