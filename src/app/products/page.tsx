import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

// Placeholder data - expanded
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
    {
        id: "honey",
        name: "Wild Forest Honey",
        price: 650,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e8918d37b?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        category: "Sweeteners",
    },
    {
        id: "millet-mix",
        name: "Multi-Millet Health Mix",
        price: 299,
        image: "https://images.unsplash.com/photo-1649234559891-b0db37996515?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        category: "Staples",
    },
];

const categories = ["All", "Sweeteners", "Rice", "Staples", "Spices"];

export default function ProductsPage() {
    return (
        <div className="py-12 bg-secondary/5 min-h-screen">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="font-serif text-4xl font-bold mb-2">Our Store</h1>
                        <p className="text-muted-foreground">Browse our complete collection of organic essentials.</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={cat === "All" ? "primary" : "outline"}
                            size="sm"
                            className="rounded-full"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
