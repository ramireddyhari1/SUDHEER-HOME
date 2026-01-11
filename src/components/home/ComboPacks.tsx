import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: "staples",
        title: "Organic Staples",
        image: "/products/features/heritage-rice.png", // Using heritage rice image
        link: "/products?category=staples"
    },
    {
        id: "snacks",
        title: "Organic Groceries",
        image: "/products/features/healthy-millet.png", // Using millets image
        link: "/products?category=groceries"
    },
    {
        id: "spices",
        title: "Immunity Boosters",
        image: "/products/features/honey-spices.png", // Using honey & spices image
        link: "/products?category=spices"
    },
    {
        id: "oils",
        title: "Pure Oils",
        image: "/products/features/cold-pressed-oils.png", // Using oils image
        link: "/products?category=oils"
    }
];

export function ComboPacks() {
    return (
        <section className="py-16 bg-white">
            <Container>
                {/* Section Header with Stamp Logo */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="w-24 h-24 relative mb-4">
                        <Image
                            src="/stamp.png"
                            alt="Vaishnavi Organics Since 1995"
                            fill
                            className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-[#1a237e]">
                        Shop by Category
                    </h2>
                    <div className="w-24 h-1 bg-yellow-400 mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link}
                            className="group relative flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Card Header - Yellow Bar */}
                            <div className="bg-yellow-400 py-3 text-center relative z-20">
                                <h3 className="font-serif font-bold text-[#1a237e] text-lg tracking-wide uppercase">
                                    {category.title}
                                </h3>
                                {/* Decorative Triangle/Arrow pointing down (optional, keeping it clean for now) */}
                            </div>

                            {/* Image Container with Dark Overlay Effect */}
                            <div className="relative aspect-square w-full bg-[#0d1b2a]">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                                {/* Inner Shadow Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
