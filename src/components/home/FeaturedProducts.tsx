"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products?collection=featured');
                const data = await res.json();

                if (data.success && data.products) {
                    setProducts(data.products.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        price: p.price,
                        originalPrice: p.originalPrice,
                        image: p.image,
                        weight: p.weight,
                        category: p.category,
                        isBestSeller: p.isSeasonBest
                    })));
                }
            } catch (error) {
                console.error("Failed to load featured products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (!loading && products.length === 0) return null;

    return (
        <section className="py-20 bg-secondary/5">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
                        <p className="text-muted-foreground">Hand-picked selections just for you</p>
                    </div>
                    <Link href="/products?collection=featured">
                        <Button variant="outline" className="gap-2">
                            View All Products <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
