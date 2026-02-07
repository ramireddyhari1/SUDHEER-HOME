"use client";

import { motion } from "framer-motion";
import { Star, Circle, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElementsProps {
    variant?: "gold-dust" | "organic-leaves" | "sparkles" | "background";
}

export function FloatingElements({ variant = "gold-dust" }: FloatingElementsProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // --- GOLD DUST VARIANT ---
    if (variant === "gold-dust" || variant === "sparkles") {
        // Generate random particles
        const particles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 2, // 2px to 6px
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10, // 10s to 20s (Slow!)
            delay: Math.random() * 5,
            opacity: Math.random() * 0.5 + 0.3,
        }));

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute bg-yellow-400 rounded-full blur-[1px] shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: p.left,
                            top: p.top,
                            opacity: p.opacity,
                        }}
                        animate={{
                            y: [0, -100, -200], // Rising up
                            x: [0, Math.random() * 50 - 25, 0], // Gentle wiggle
                            opacity: [0, p.opacity, 0], // Fade in/out
                            scale: [0.8, 1.2, 0.8], // Throbbing
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay,
                        }}
                    />
                ))}
                {/* Add a few larger "Stars" for accent */}
                {[1, 2, 3].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="absolute text-yellow-200 opacity-60"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`
                        }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [0.8, 1.1, 0.8],
                            rotate: [0, 45, -45, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 2
                        }}
                    >
                        <Star className="w-4 h-4 fill-yellow-200" />
                    </motion.div>
                ))}
            </div>
        );
    }

    // --- ORGANIC LEAVES VARIANT ---
    if (variant === "organic-leaves" || variant === "background") {
        const leaves = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            size: Math.random() * 10 + 20, // 20px to 30px
            left: `${Math.random() * 90 + 5}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15, // 15s to 30s
            color: i % 2 === 0 ? "text-green-800/20" : "text-amber-700/20", // Mix of green and dried leaves
            rotation: Math.random() * 360,
        }));

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                {leaves.map((l) => (
                    <motion.div
                        key={l.id}
                        className={`absolute ${l.color}`}
                        style={{
                            left: l.left,
                            top: "-10%", // Start above viewport
                        }}
                        initial={{ rotate: l.rotation }}
                        animate={{
                            y: ["0vh", "120vh"], // Fall all the way down
                            x: [0, 50, -50, 20], // Swaying in wind
                            rotate: [l.rotation, l.rotation + 360], // Tumbling
                        }}
                        transition={{
                            duration: l.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: l.delay,
                        }}
                    >
                        <Leaf style={{ width: l.size, height: l.size }} />
                    </motion.div>
                ))}
            </div>
        );
    }

    return null;
}
