import Link from "next/link";
import { Container } from "@/components/ui/Container";

// Updated categories with more specific "Routine" or "Type" focus
const categories = [
    {
        id: "jaggery",
        name: "Jaggery",
        image: "https://images.unsplash.com/photo-1589139250009-8073cd03da7e?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "ghee",
        name: "A2 Ghee",
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "rice",
        name: "Heritage Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "millet",
        name: "Millets",
        image: "https://images.unsplash.com/photo-1649234559891-b0db37996515?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "oils",
        name: "Cold Pressed Oil",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300",
    },
    {
        id: "spices",
        name: "Spices",
        image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=300",
    },
];

export function ProductCategories() {
    return (
        <section className="py-12 bg-background border-b border-gray-100">
            <Container>
                <div className="flex flex-col items-center mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Shop by Category</h2>
                    <div className="h-1 w-16 bg-primary rounded-full"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="group flex flex-col items-center gap-3 w-24 md:w-32"
                        >
                            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary shadow-sm transition-all group-hover:scale-105 p-1 bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <span className="text-sm md:text-base font-medium text-center group-hover:text-primary transition-colors leading-tight">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
