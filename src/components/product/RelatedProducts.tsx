"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { useEffect, useState } from "react";

export function RelatedProducts({ currentId }: { currentId: string }) {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch related products (mock logic: fetch all and filter out current)
        // In real app, this would be an API call for 'related' or 'category' specific
        const fetchRelated = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success) {
                    // Filter out current product and take 4
                    const related = data.products
                        .filter((p: any) => p._id !== currentId && p.id !== currentId)
                        .slice(0, 4);
                    setProducts(related);
                }
            } catch (error) {
                console.error("Failed to fetch related products", error);
            }
        };

        fetchRelated();
    }, [currentId]);

    if (products.length === 0) return null;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                    You May Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id || product.id}
                            {...product}
                            id={product._id || product.id} // Ensure ID is passed correctly
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
