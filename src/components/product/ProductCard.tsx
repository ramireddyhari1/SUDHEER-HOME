"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Star, BadgeCheck } from "lucide-react";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

interface ProductCardProps {
    id: string;
    name: string;
    englishName?: string;
    price: number;
    originalPrice?: number;
    image: string;
    weight: string;
    category?: string;
    tags?: string[];
    rating?: number;
    reviews?: number;
    isBestSeller?: boolean;
}

export function ProductCard({
    id,
    name,
    englishName,
    price,
    image,
    weight,
    category,
    tags = [],
    rating = 4.8,
    originalPrice,
    reviews = 120, // Default review count if not provided
    isBestSeller = false
}: ProductCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const handleAddToCart = () => {
        addToCart({
            id,
            name,
            price,
            image,
            weight,
            quantity: 1
        });

        // Wait for tractor animation (2000ms) then navigate
        setTimeout(() => {
            router.push("/cart");
        }, 2000);
    };

    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">

            {/* Image Section */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <AdminEditButton productId={id} />
                <Link href={`/products/${id}`} className="block w-full h-full relative">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Best Seller / Category Badge */}
                {isBestSeller ? (
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                        <div className="bg-red-600 text-white text-[10px] font-bold rounded-full h-10 w-10 md:h-12 md:w-12 flex flex-col items-center justify-center shadow-md animate-pulse border-2 border-white">
                            <span className="leading-none text-[7px] md:text-[8px]">BEST</span>
                            <span className="leading-none text-[8px] md:text-[10px]">SELLER</span>
                            <div className="flex gap-[1px]">
                                {[1, 2, 3].map(i => <Star key={i} className="h-1.5 w-1.5 fill-white text-white" />)}
                            </div>
                        </div>
                    </div>
                ) : category ? (
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold border border-gray-200 shadow-sm text-gray-600">
                        {category}
                    </div>
                ) : null}

                {/* Discount Overlay */}
                {discount > 0 && (
                    <div className="absolute top-0 left-0">
                        <div className="bg-orange-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-br-lg shadow-sm">
                            FLAT <br /> <span className="text-xs md:text-sm">{discount}%</span> <br /> OFF
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-2 md:p-3 flex flex-col gap-1 md:gap-1.5 flex-1">
                <h3 className="font-bold text-gray-900 leading-tight text-sm md:text-base line-clamp-2 min-h-[2.5em]">
                    <Link href={`/products/${id}`} className="hover:text-primary transition-colors">
                        {name} {englishName && <span className="font-normal text-gray-600 text-xs md:text-sm">{englishName}</span>}
                    </Link>
                </h3>

                {/* Tags (Show Category as tag if no tags provided) */}
                <div className="flex flex-wrap gap-1 text-[8px] md:text-[9px] font-medium text-gray-700 min-h-[1.5em]">
                    {tags.length > 0 ? tags.map(tag => (
                        <span key={tag} className="border border-orange-300 bg-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            {tag}
                        </span>
                    )) : category && (
                        <span className="border border-gray-200 bg-gray-50 px-1.5 py-0.5 rounded-full whitespace-nowrap text-gray-500">
                            {category}
                        </span>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
                    <span className="bg-[#155E42] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        {rating} <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-white text-white" />
                    </span>
                    <BadgeCheck className="h-3 w-3 md:h-4 md:w-4 text-red-500 fill-white" />
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium">({reviews})</span>
                </div>

                {/* Weight Selector (Mock) */}
                <div className="mt-1 md:mt-2">
                    <select className="w-full text-xs md:text-sm border border-orange-200 rounded px-1.5 py-1 md:px-2 md:py-1.5 bg-white text-gray-700 focus:outline-none focus:border-orange-500">
                        <option>{weight}</option>
                    </select>
                </div>

                {/* Price Section */}
                <div className="mt-auto pt-1 md:pt-2">
                    {discount > 0 ? (
                        <div className="text-[10px] md:text-xs font-bold text-[#004D40] mb-0.5">{discount}% OFF</div>
                    ) : (
                        <div className="h-[18px]"></div> // Spacer
                    )}

                    <div className="flex items-baseline gap-1.5 mb-2 md:mb-3">
                        {originalPrice && <span className="text-xs md:text-sm text-gray-400 line-through">Rs. {originalPrice}</span>}
                        <span className="text-base md:text-lg font-bold text-orange-500">Rs. {price}</span>
                    </div>

                    <AnimatedTractorButton
                        className="bg-[#F59E0B] hover:bg-[#D97706] h-8 md:h-10 text-xs md:text-sm w-full"
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}
