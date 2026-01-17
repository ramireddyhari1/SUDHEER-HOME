"use client";

import React, { useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    variant?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left";
}

export function ScrollReveal({
    children,
    width = "100%",
    className = "",
    delay = 0,
    variant = "fade-up",
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants = {
        "fade-up": {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        },
        "fade-in": {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        "slide-in-right": {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
        },
        "slide-in-left": {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
        },
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={variants[variant] as { hidden: Variant; visible: Variant }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
