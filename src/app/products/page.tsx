import { Container } from "@/components/ui/Container";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// Real Organic Product Data
const products = [
    {
        id: "palm-jaggery-cubes",
        name: "Premium Palm Jaggery",
        englishName: "(Karupatti)",
        price: 385,
        originalPrice: 450,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        rating: 4.9,
        reviews: 245,
        tags: ["Iron Rich", "No Chemicals"],
        badge: "Best Seller"
    },
    {
        id: "black-rice",
        name: "Karuppu Kavuni Rice",
        englishName: "(Black Rice)",
        price: 499,
        originalPrice: 650,
        image: "https://plus.unsplash.com/premium_photo-1675237626068-bf4dc298ca3a?auto=format&fit=crop&q=80&w=600",
        weight: "1kg",
        rating: 4.8,
        reviews: 189,
        tags: ["Superfood", "Antioxidants"],
        isBestSeller: true
    },
    {
        id: "a2-ghee",
        name: "Pure A2 Desi Cow Ghee",
        englishName: "(Bilona Method)",
        price: 1250,
        originalPrice: 1450,
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600",
        weight: "500ml",
        rating: 5.0,
        reviews: 412,
        tags: ["Traditional", "Aromatic"],
        badge: "Must Try"
    },
    {
        id: "wood-pressed-oil",
        name: "Wood Pressed Groundnut Oil",
        englishName: "(Chekku Oil)",
        price: 420,
        originalPrice: 480,
        image: "https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=600",
        weight: "1L",
        rating: 4.7,
        reviews: 156,
        tags: ["Cold Pressed", "Heart Healthy"]
    },
    {
        id: "lakadong-turmeric",
        name: "Lakadong Turmeric Powder",
        englishName: "(High Curcumin)",
        price: 399,
        originalPrice: 550,
        image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600",
        weight: "250g",
        rating: 4.9,
        reviews: 320,
        tags: ["Immunity", "Pure"]
    },
    {
        id: "wild-honey",
        name: "Raw Wild Forest Honey",
        englishName: "(Unprocessed)",
        price: 650,
        originalPrice: 800,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e8918d37b?auto=format&fit=crop&q=80&w=600",
        weight: "500g",
        rating: 4.8,
        reviews: 210,
        tags: ["Natural Sweetener"]
    },
    {
        id: "millet-noodles",
        name: "Barnyard Millet Noodles",
        englishName: "(Gluten Free)",
        price: 145,
        originalPrice: 180,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=600",
        weight: "180g",
        rating: 4.6,
        reviews: 98,
        tags: ["Kids Favorite", "Healthy"]
    },
    {
        id: "sambar-powder",
        name: "Traditional Sambar Powder",
        englishName: "(Grandma's Recipe)",
        price: 240,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
        weight: "250g",
        rating: 4.9,
        reviews: 543,
        tags: ["Authentic Taste"]
    }
];

export default function ProductsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <div className="border-b border-gray-100 bg-gray-50/50">
                <Container className="py-8 lg:py-12">
                    <div className="max-w-4xl">
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Organic Collections
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                            Explore our range of traditionally processed, chemical-free essentials. From <span className="font-semibold text-orange-600">Palm Jaggery</span> to <span className="font-semibold text-orange-600">Heritage Rice</span>, every product is sourced directly from organic farmers.
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar */}
                    <ProductSidebar />

                    {/* Main Content */}
                    <div className="flex-1">

                        {/* Toolbar (Mobile Filter + Sort) */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <div className="text-gray-500 font-medium">
                                Showing <span className="text-gray-900 font-bold">{products.length}</span> results
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Toggle (Hidden on Desktop) */}
                                <button className="lg:hidden flex items-center gap-2 text-sm font-bold text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50">
                                    <SlidersHorizontal className="h-4 w-4" /> Filters
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                                        Sort by: <span className="text-gray-900 font-bold">Featured</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    {/* Dropdown Content Mock */}
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                            {products.map((product) => (
                                <BestSellerCard key={product.id} {...product} />
                            ))}
                        </div>

                        {/* Load More (Optional) */}
                        <div className="mt-16 text-center">
                            <button className="bg-white border border-gray-300 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all uppercase tracking-wide text-sm">
                                Load More Products
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}
