"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const categories = [
    {
        id: "jaggery",
        name: "Jaggery",
        image: "/products/jaggery cubes.png",
        color: "from-amber-400 to-orange-600"
    },
    {
        id: "ghee",
        name: "A2 Ghee",
        image: "/products/ghee.png",
        color: "from-yellow-300 to-yellow-500"
    },
    {
        id: "rice",
        name: "Heritage Rice",
        image: "/products/black rice.png",
        color: "from-purple-900 to-black"
    },
    {
        id: "millet",
        name: "Millets",
        image: "/products/millets.png",
        color: "from-yellow-100 to-amber-200"
    },
    {
        id: "oils",
        name: "Cold Pressed Oil",
        image: "/products/oil.png",
        color: "from-yellow-400 to-orange-500"
    },
    {
        id: "spices",
        name: "Spices",
        image: "/products/spices.png",
        color: "from-red-500 to-orange-600"
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
};

export function ProductCategories() {
    return (
        <section className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <Container>
                <div className="flex items-end justify-center gap-4 md:gap-12 mb-16 relative">
                    {/* Animated Tractor Mascot (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute -left-4 -top-8 md:relative md:left-auto md:top-auto md:-mb-2 w-20 h-20 md:w-28 md:h-28 pointer-events-none select-none z-0"
                    >
                        <motion.img
                            src="/POSTERS/tractor_cartoon.png"
                            alt="Farming Tractor"
                            className="w-full h-full object-contain filter drop-shadow-md"
                            animate={{
                                y: [0, 1, 0, 1, 0],
                                rotate: [0, 1, 0, -1, 0] // Rumbling effect
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>

                    {/* Animated Header Text */}
                    <div className="flex flex-col items-center z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2"
                        >
                            Explore Our Range
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="font-serif text-4xl md:text-5xl font-black text-gray-900 mb-4 drop-shadow-sm text-center"
                        >
                            Shop by Category
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="h-1.5 bg-gradient-to-r from-primary to-orange-400 rounded-full"
                        />
                    </div>

                    {/* Animated Farmer Mascot (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotate: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
                        className="absolute -right-4 -top-8 md:relative md:right-auto md:top-auto md:-mb-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none select-none z-10"
                    >
                        <motion.img
                            src="/POSTERS/farmer_cartoon.png"
                            alt="Happy Farmer"
                            className="w-full h-full object-contain filter drop-shadow-xl"
                            animate={{
                                y: [0, -8, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-10 px-2 md:px-0"
                >
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="group relative"
                        >
                            <motion.div
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center gap-3 p-3 md:p-0 rounded-2xl md:rounded-none bg-white/50 md:bg-transparent border border-white/60 md:border-none shadow-sm md:shadow-none backdrop-blur-sm md:backdrop-blur-none w-full md:w-36"
                            >
                                {/* Anime Style Circle Container */}
                                <div className="relative w-20 h-20 md:w-32 md:h-32">
                                    {/* Rotating Border Effect */}
                                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${category.color} opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 animate-spin-slow`} />

                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl transition-all z-10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Floating Particles/Badge (Decorative) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md z-20 hidden md:block"
                                    >
                                        Explore
                                    </motion.div>
                                </div>

                                <span className="text-sm md:text-base font-bold text-center text-gray-800 group-hover:text-primary transition-colors tracking-wide">
                                    {category.name}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </Container>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </section>
    );
}
