"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: 1,
        title: "Palm Jaggery",
        image: "/products/jaggery cubes.png",
        href: "/products?category=jaggery",
        borderColor: "border-orange-300",
        bgColor: "bg-white"
    },
    {
        id: 2,
        title: "Forest Honey",
        image: "/products/raw_honey.png",
        href: "/products?category=honey",
        borderColor: "border-amber-300",
        bgColor: "bg-white"
    },
    {
        id: 3,
        title: "Heritage Rice",
        image: "/products/black rice.png",
        href: "/products?category=rice",
        borderColor: "border-purple-300",
        bgColor: "bg-white"
    },
    {
        id: 4,
        title: "A2 Ghee",
        image: "/products/features/winter-ghee.png",
        href: "/products?category=ghee",
        borderColor: "border-yellow-300",
        bgColor: "bg-white"
    },
    {
        id: 5,
        title: "Super Millets",
        image: "/products/millets.png",
        href: "/products?category=millets",
        borderColor: "border-green-300",
        bgColor: "bg-white"
    },
    {
        id: 6,
        title: "Cold Pressed Oil",
        image: "/products/sesame_oil.png",
        href: "/products?category=oils",
        borderColor: "border-yellow-400",
        bgColor: "bg-white"
    }
];

export function MobileTopNav() {
    return (
        <section className="bg-white pt-4 pb-2 md:hidden">
            <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-2 snap-x">
                {categories.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex flex-col items-center gap-2 flex-shrink-0 snap-center group"
                    >
                        <div className="relative w-[74px] h-[74px] flex items-center justify-center">
                            {/* Animated Gradient Ring */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${item.borderColor.replace('border-', 'from-white via-').replace('-300', '-200')} to-transparent opacity-80 animate-spin-slow`}></div>
                            <div className={`absolute inset-0.5 rounded-full bg-white z-0`}></div>

                            {/* Inner Circle Container */}
                            <div className={`relative w-[68px] h-[68px] rounded-full border-[2px] p-[2px] ${item.borderColor} ${item.bgColor} shadow-sm group-active:scale-90 transition-transform duration-200 z-10`}>
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                        priority={item.id <= 4}
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-center leading-tight max-w-[70px] text-gray-800 group-active:text-primary transition-colors">
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
