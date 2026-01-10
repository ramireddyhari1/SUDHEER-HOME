"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    weight: string;
    category: string;
    rating?: number;
    originalPrice?: number;
}

export function ProductCard({ id, name, price, image, weight, category, rating = 4.8, originalPrice }: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300">

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-r-md shadow-sm">
                    {discount}% OFF
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Link href={`/products/${id}`}>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>
                {/* Rating Overlay */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                    {rating} <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1 space-y-1.5">
                <div className="text-[10px] text-primary/80 uppercase tracking-wider font-semibold">{category}</div>

                <h3 className="font-sans font-medium text-sm text-foreground leading-snug line-clamp-2 h-10 group-hover:text-primary transition-colors">
                    <Link href={`/products/${id}`}>
                        {name}
                    </Link>
                </h3>

                <div className="text-xs text-muted-foreground">{weight}</div>

                <div className="flex items-end justify-between pt-1 mt-auto">
                    <div className="flex flex-col">
                        {originalPrice && (
                            <span className="text-[10px] text-muted-foreground line-through">₹{originalPrice}</span>
                        )}
                        <span className="font-bold text-base text-foreground">₹{price}</span>
                    </div>

                    <Button size="sm" className="h-8 px-3 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-xs font-bold gap-1 shadow-sm">
                        ADD <Plus className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
