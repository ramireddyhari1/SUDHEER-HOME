import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Placeholder data
const products = [
    {
        id: "jaggery-powder",
        name: "Premium Organic Jaggery Powder",
        price: 349,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        category: "Sweeteners",
    },
    {
        id: "black-rice",
        name: "Karuppu Kavuni Rice (Black Rice)",
        price: 499,
        image: "https://plus.unsplash.com/premium_photo-1675237626068-bf4dc298ca3a?auto=format&fit=crop&q=80&w=600",
        weight: "1kg",
        category: "Rice",
    },
    {
        id: "ghee",
        name: "A2 Desi Cow Ghee",
        price: 1250,
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600",
        weight: "500ml",
        category: "Staples",
    },
    {
        id: "tumeric",
        name: "Lakadong Turmeric Powder",
        price: 399,
        image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600",
        weight: "250g",
        category: "Spices",
    },
];

export function FeaturedProducts() {
    return (
        <section className="py-20 bg-secondary/5">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Bestsellers</h2>
                        <p className="text-muted-foreground">Loved by families across India</p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" className="gap-2">
                            View All Products <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
