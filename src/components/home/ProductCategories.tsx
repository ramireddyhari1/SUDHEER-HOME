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
        <section className="pt-2 pb-6 md:py-16 bg-transparent/50">
            <Container>
                <div className="text-center mb-2 md:mb-10">
                    <h2 className="text-xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-arista)' }} suppressHydrationWarning>Shop by Category</h2>
                </div>

                <div className="grid grid-cols-3 md:flex md:gap-8 gap-x-3 gap-y-6 px-2 md:px-4 justify-items-center md:justify-center w-full">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="group flex flex-col items-center gap-2 w-full md:w-40"
                        >
                            <div className="relative w-full aspect-square max-w-[5.5rem] md:max-w-40 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 md:border-4 border-white bg-white">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-[10px] md:text-base font-medium text-gray-900 group-hover:text-primary transition-colors text-center leading-tight whitespace-nowrap">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
