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

// ... (imports)

export function MobileTopNav() {
    return (
        <section className="bg-[#F5F5DC] pt-4 pb-2 md:hidden border-b border-[#DAA520]/20">
            <div className="flex overflow-x-auto no-scrollbar gap-5 px-5 pb-2 snap-x">
                {categories.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex flex-col items-center gap-3 flex-shrink-0 snap-center group"
                    >
                        <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                            {/* Static Gold Ring for consistency */}
                            <div className="absolute inset-0 rounded-full border border-yellow-500/30 scale-100 group-active:scale-95 transition-transform duration-200"></div>
                            {/* White spacer */}
                            <div className="absolute inset-[3px] rounded-full bg-white z-0 header-shadow"></div>
                            {/* Image Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden p-[6px]">
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="80px"
                                        priority={item.id <= 4}
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-[11px] font-medium tracking-wide text-center leading-tight max-w-[80px] text-gray-900 group-active:text-primary transition-colors font-serif">
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
            <style jsx>{`
               .header-shadow {
                   box-shadow: 0 4px 12px rgba(0,0,0,0.08);
               }
            `}</style>
        </section>
    );
}
