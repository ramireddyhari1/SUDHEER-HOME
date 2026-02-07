"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Star, BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

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
    compact?: boolean;
    stock?: number;
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
    badge,
    compact = false,
    stock = 10 // Default stock to positive if not provided, to avoid breaking existing usages immediately
}: BestSellerCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    const isOutOfStock = stock !== undefined && stock <= 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
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
        <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#DAA520]/20 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

            {/* Image Section */}
            <div className="relative aspect-square bg-[#F5F5DC] overflow-hidden">
                <AdminEditButton productId={id} />
                <Link href={`/products/${id}`} className="block w-full h-full relative">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Dynamic Badge System */}
                {(isBestSeller || badge) && (
                    <div className="absolute top-2 left-2 z-10">
                        {isBestSeller ? (
                            <div className="bg-[#DAA520] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>BESTSELLER</span>
                            </div>
                        ) : (
                            <div className="bg-[#556B2F] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                <span className="uppercase tracking-wide">{badge}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Discount Badge - Minimalist */}
                <div className="absolute top-2 right-2 z-10">
                    <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        -{discount}%
                    </div>
                </div>

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
                        <div className="bg-gray-900 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            OUT OF STOCK
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section - Reference Style */}
            <div className={`flex flex-col flex-1 relative bg-white ${compact ? 'p-1.5 gap-1' : 'p-2.5 gap-2'} md:p-4`}>
                <div className="flex flex-col gap-1">
                    <h3 className={`font-bold text-gray-900 leading-tight line-clamp-2 min-h-[3.2ex] ${compact ? 'text-[0.7rem] leading-3' : 'text-xs'} md:text-base`}>
                        <Link href={`/products/${id}`} className="hover:text-primary transition-colors">
                            {name}
                        </Link>
                    </h3>

                    {/* Tags - Pill Style */}
                    <div className="flex flex-wrap gap-1 mb-0.5">
                        {(tags.length > 0 ? tags : ["No Maida", "No Palm Oil"]).slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-[8px] md:text-[10px] font-medium text-[#D97706] border border-[#D97706] bg-[#FFF3E0] px-1 py-0.5 rounded-full whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Rating & Weight - Side by Side */}
                <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="flex items-center gap-0.5 md:gap-1 bg-[#155E42] text-white px-1 py-0.5 rounded text-[9px] md:text-xs font-bold">
                            <span>{rating}</span>
                            <Star className="h-2 w-2 md:h-2.5 md:w-2.5 fill-white text-white" />
                        </div>
                        <span className="text-[9px] md:text-xs text-gray-400 font-medium">({reviews})</span>
                    </div>
                    <span className="text-[10px] md:text-sm text-gray-600 font-bold">{weight}</span>
                </div>

                {/* Discount & Price - Side by Side */}
                <div className="mt-auto pt-1.5 md:pt-2">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        {discount > 0 && (
                            <span className="text-[#155E42] text-[9px] md:text-xs font-bold">
                                {discount}% OFF
                            </span>
                        )}
                        <div className="flex items-baseline gap-1 md:gap-1.5 ml-auto">
                            {originalPrice && <span className={`text-gray-400 line-through ${compact ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}>Rs. {originalPrice}</span>}
                            <span className={`font-bold text-[#D97706] ${compact ? 'text-xs' : 'text-sm md:text-base'}`}>Rs. {price}</span>
                        </div>
                    </div>

                    <AnimatedTractorButton
                        className={`w-full ${isOutOfStock ? 'bg-gray-300 cursor-not-allowed hover:bg-gray-300' : 'bg-[#F59E0B] hover:bg-[#D97706]'} text-white font-bold rounded shadow-none ${compact ? 'h-7 text-[9px]' : 'h-8 text-[10px]'} md:h-10 md:text-sm`}
                        label={isOutOfStock ? "Out of Stock" : "Add"}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    />
                </div>
            </div>
        </div>
    );
}
