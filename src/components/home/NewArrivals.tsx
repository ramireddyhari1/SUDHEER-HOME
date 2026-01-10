import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const newProducts = [
    {
        id: "tumeric-powder",
        name: "Lakadong Turmeric",
        price: 399,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600",
        weight: "250g",
        category: "Spices",
    },
    {
        id: "ghee-bottle",
        name: "A2 Gir Cow Ghee",
        price: 1250,
        originalPrice: 1450,
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600",
        weight: "500ml",
        category: "Dairy",
    },
    {
        id: "black-rice-pack",
        name: "Karuppu Kavuni Rice",
        price: 349,
        originalPrice: 399,
        image: "https://plus.unsplash.com/premium_photo-1675237626068-bf4dc298ca3a?auto=format&fit=crop&q=80&w=600",
        weight: "1kg",
        category: "Rice",
    },
    {
        id: "honey-wild",
        name: "Wild Forest Honey",
        price: 650,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e8918d37b?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        category: "Sweeteners",
    },
];

export function NewArrivals() {
    return (
        <section className="py-16 bg-secondary/5">
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold">Fresh from Farm</h2>
                        <p className="text-muted-foreground text-sm">Newly harvested & packed with love</p>
                    </div>
                    <Link href="/products?sort=new" className="text-primary font-medium flex items-center gap-1 hover:underline text-sm">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {newProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
