"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";

interface BestSellerCardProps {
    id: string;
    name: string;
    englishName?: string; // e.g. (Soft) or (Ribbon Murukku)
    price: number;
    originalPrice: number;
    image: string;
    weight: string;
    tags?: string[]; // ["No Preservatives", "Festive Spl"]
    rating: number;
    reviews: number;
    isBestSeller?: boolean;
    badge?: string; // "Winter Special" etc
}

export function BestSellerCard({
    id,
    name,
    englishName,
    price,
    originalPrice,
    image,
    weight,
    tags = [],
    rating,
    reviews,
    isBestSeller,
    badge
}: BestSellerCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

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
                <Link href={`/products/${id}`} className="block w-full h-full relative">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Top Badge (Best Seller / Winter Special) */}
                {(isBestSeller || badge) && (
                    <div className="absolute top-2 right-2">
                        {isBestSeller ? (
                            <div className="bg-red-600 text-white text-[10px] font-bold rounded-full h-12 w-12 flex flex-col items-center justify-center shadow-md animate-pulse border-2 border-white">
                                <span className="leading-none text-[8px]">BEST</span>
                                <span className="leading-none">SELLER</span>
                                <div className="flex gap-[1px]">
                                    {[1, 2, 3].map(i => <Star key={i} className="h-1.5 w-1.5 fill-white text-white" />)}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md border-2 border-white">
                                {badge}
                            </div>
                        )}
                    </div>
                )}

                {/* Discount Overlay */}
                <div className="absolute top-0 left-0">
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm">
                        FLAT <br /> <span className="text-sm">{discount}%</span> <br /> OFF
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col gap-1.5 flex-1">
                <h3 className="font-bold text-gray-900 leading-tight">
                    <Link href={`/products/${id}`} className="hover:text-primary transition-colors">
                        {name} <span className="font-normal text-gray-600">{englishName}</span>
                    </Link>
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 text-[9px] font-medium text-gray-700">
                    {tags.map(tag => (
                        <span key={tag} className="border border-orange-300 bg-white px-2 py-0.5 rounded-full whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#155E42] text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        {rating} <Star className="h-3 w-3 fill-white text-white" />
                    </span>
                    <BadgeCheck className="h-4 w-4 text-red-500 fill-white" />
                    <span className="text-xs text-gray-500 font-medium">({reviews})</span>
                </div>

                {/* Weight Selector (Mock) */}
                <div className="mt-2">
                    <select className="w-full text-sm border border-orange-200 rounded px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-orange-500">
                        <option>{weight}</option>
                    </select>
                </div>

                {/* Price Section */}
                <div className="mt-auto pt-2">
                    <div className="text-xs font-bold text-[#004D40] mb-0.5">{discount}% OFF</div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-sm text-gray-400 line-through">Rs. {originalPrice}</span>
                        <span className="text-lg font-bold text-orange-500">Rs. {price}</span>
                    </div>

                    <AnimatedTractorButton
                        className="bg-[#F59E0B] hover:bg-[#D97706]"
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}
