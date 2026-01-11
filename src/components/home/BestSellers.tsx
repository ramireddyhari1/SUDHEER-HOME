"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { Container } from "@/components/ui/Container";


const initialProducts = [
    {
        id: "jaggery-cubes",
        name: "Palm Jaggery Cubes",
        englishName: "(Karupatti)",
        price: 260,
        originalPrice: 320,
        weight: "500 g",
        image: "/products/jaggery cubes.png",
        tags: ["Natural Sweetener", "Iron Rich", "Bone Health"],
        rating: 4.9,
        reviews: 420,
        isBestSeller: true
    },
    {
        id: "black-rice",
        name: "Black Rice",
        englishName: "(Kavuni Arisi)",
        price: 350,
        originalPrice: 450,
        weight: "1 kg",
        image: "/products/black rice.png",
        tags: ["Antioxidants", "Superfood", "Diabetes Friendly"],
        rating: 4.8,
        reviews: 185,
        isBestSeller: true
    },
    {
        id: "jaggery-powder",
        name: "Palm Jaggery Powder",
        englishName: "(Nattu Sakkarai)",
        price: 280,
        originalPrice: 340,
        weight: "500 g",
        image: "/products/jaggery powder.png",
        tags: ["Chemical Free", "Mineral Rich", "Coffee Ready"],
        rating: 4.9,
        reviews: 310,
        isBestSeller: true
    },
    {
        id: "brown-rice",
        name: "Traditional Brown Rice",
        englishName: "(Kaikuthal Arisi)",
        price: 180,
        originalPrice: 240,
        weight: "1 kg",
        image: "/products/brown rice.png",
        tags: ["High Fiber", "Weight Loss", "Farm Fresh"],
        rating: 4.7,
        reviews: 150,
        isBestSeller: true
    }
];

export function BestSellers() {
    const [products, setProducts] = React.useState(initialProducts);

    // Fetch products from API
    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success && data.products.length > 0) {
                    // Combine default products with new DB products for MVP display
                    // Or ideally replace them if DB works well.
                    // Let's replace only if we get data, and map DB fields to UI fields.
                    const dbProducts = data.products.slice(0, 4).map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        englishName: p.englishName || "",
                        price: p.price,
                        originalPrice: p.originalPrice,
                        weight: p.weight || "1 kg",
                        image: p.image,
                        tags: p.tags || [],
                        rating: p.rating || 5,
                        reviews: p.reviews || 0,
                        isBestSeller: p.isBestSeller
                    }));
                    if (dbProducts.length > 0) {
                        setProducts(dbProducts);
                    }
                }
            } catch (error) {
                console.error("Failed to load products");
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-6 md:py-12 bg-white">
            <Container>
                {/* Header */}
                <div className="text-center mb-4 md:mb-8">
                    <h2 className="text-xl md:text-3xl font-serif font-bold flex items-center justify-center gap-3">
                        <span className="hidden md:block h-[2px] w-12 bg-gray-800"></span>
                        <span className="block md:hidden h-[2px] w-8 bg-gray-800"></span>
                        <span className="text-orange-500">⚡</span>
                        Season's Best Sellers
                        <span className="text-orange-500">⚡</span>
                        <span className="hidden md:block h-[2px] w-12 bg-gray-800"></span>
                        <span className="block md:hidden h-[2px] w-8 bg-gray-800"></span>
                    </h2>
                    <p className="text-gray-500 italic mt-2 flex items-center justify-center gap-1 text-sm md:text-base">
                        Loved & Trusted by 1M+ Happy Families <span className="text-red-500">💕</span>
                    </p>
                </div>

                {/* Grid Layout (Only 4 items) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <BestSellerCard key={product.id} {...product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-[#155e42] text-white px-8 py-3 rounded-full font-medium hover:bg-[#114a34] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                    >
                        View all products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
