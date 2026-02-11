"use client";

import { Container } from "@/components/ui/Container";
import { BestSellerCard } from "@/components/product/BestSellerCard";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import { ProductsBannerCarousel } from "@/components/products/ProductsBannerCarousel";

import { ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ProductsList() {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category');

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = '/api/products';
                if (categoryQuery) {
                    url += `?category=${categoryQuery}`;
                }

                const res = await fetch(url);
                const data = await res.json();

                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryQuery]);

    // Prevent body scroll when filter is open
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFilterOpen]);

    return (
        <div className="flex-1 relative">
            {/* Sticky Mobile Filter/Sort Bar */}
            {/* Sticky Mobile Filter/Sort Bar - Reference Style */}
            <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 mb-4 -mx-4 shadow-sm grid grid-cols-2 divide-x divide-gray-200">
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide active:bg-gray-50 transition-colors"
                >
                    <SlidersHorizontal className="h-4 w-4" /> Filter
                </button>
                <button className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-gray-800 uppercase tracking-wide active:bg-gray-50 transition-colors">
                    Sort by <ChevronDown className="h-4 w-4" />
                </button>
            </div>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFilterOpen(false)}
                    ></div>

                    {/* Drawer Content */}
                    <div className="relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <SlidersHorizontal className="h-5 w-5" /> Filters
                            </h2>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <ChevronDown className="h-5 w-5 rotate-90" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <ProductSidebar className="block w-full" />
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-white">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-[#155E42] text-white font-bold py-3 rounded-lg uppercase tracking-wider"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="text-gray-500 font-medium">
                    Showing <span className="text-gray-900 font-bold">{products.length}</span> results
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                            Sort by: <span className="text-gray-900 font-bold">Featured</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : products.length > 0 ? (
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-8">
                        {products.map((product) => (
                            <BestSellerCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                englishName={product.englishName || ""}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                image={product.image}
                                rating={product.rating || 4.5}
                                reviews={product.reviews || 0}
                                weight={product.weight || "1kg"}
                                tags={product.tags || []} // Assuming backend has tags or we default empty
                                isBestSeller={product.isSeasonBest}
                                stock={product.stock}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                    <p className="text-gray-500">Try checking back later or select a different category.</p>
                </div>
            )}

            {/* Load More (Optional) */}
            <div className="mt-16 text-center">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all uppercase tracking-wide text-sm disabled:opacity-50" disabled>
                    All Valid Products Loaded
                </button>
            </div>
        </div>
    );
}

// Real Categories matching ProductCategories.tsx
const mobileSidebarCategories = [
    { id: "jaggery", name: "Jaggery", image: "/products/jaggery cubes.png" },
    { id: "ghee", name: "A2 Ghee", image: "/products/features/winter-ghee.png" },
    { id: "rice", name: "Heritage Rice", image: "/products/black rice.png" },
    { id: "millet", name: "Millets", image: "/products/millets.png" },
    { id: "oils", name: "Cold Pressed Oil", image: "/products/sesame_oil.png" },
    { id: "spices", name: "Spices", image: "/products/spices.png" },
];

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-[#FFFDF5]" style={{
            backgroundImage: "url('/products_bg.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "400px" // Adjust size for pattern scale
        }}>
            {/* Products Banner Carousel */}
            <ProductsBannerCarousel />

            <div className="lg:container mx-auto">
                {/* ProductMobileHero removed */}
                <div className="flex flex-col lg:flex-row gap-8 lg:py-12">
                    {/* Desktop Sidebar */}
                    <ProductSidebar className="hidden lg:block" />

                    {/* Mobile Layout Container */}
                    <div className="flex w-full lg:hidden">
                        {/* Mobile Left Rail Sidebar */}
                        <div className="w-[85px] flex-shrink-0 bg-white border-r border-gray-100 sticky top-0 h-[calc(100vh-60px)] overflow-y-auto no-scrollbar py-2">
                            <div className="flex flex-col gap-4 items-center">
                                {mobileSidebarCategories.map((cat, idx) => (
                                    <Link
                                        href={`/products?category=${cat.id}`}
                                        key={cat.id}
                                        className="flex flex-col items-center gap-1 group w-full px-1"
                                    >
                                        <div className="w-14 h-14 rounded-full border border-gray-200 p-1 group-hover:border-orange-500 transition-colors">
                                            <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
                                                <Image
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-center leading-tight font-medium text-gray-700 break-words w-full px-1">
                                            {cat.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Right Content (Product Grid) */}
                        <div className="flex-1 bg-transparent min-h-screen p-2">
                            <Suspense fallback={<div className="p-4"><Loader2 className="animate-spin" /></div>}>
                                <ProductsListMobileWrapper />
                            </Suspense>
                        </div>
                    </div>

                    {/* Desktop Main Content */}
                    <div className="hidden lg:block flex-1">
                        <Suspense fallback={<div>Loading products...</div>}>
                            <ProductsList />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Separate wrapper for Mobile to manage the specific Grid layout
function ProductsListMobileWrapper() {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products${categoryQuery ? `?category=${categoryQuery}` : ''}`);
                const data = await res.json();
                if (data.success) setProducts(data.products);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, [categoryQuery]);

    return (
        <div className="grid grid-cols-2 gap-1.5 pb-20">
            {loading ? (
                <div className="col-span-full flex justify-center py-10"><Loader2 className="animate-spin" /></div>
            ) : (
                products.map((product) => (
                    <BestSellerCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        englishName={product.englishName || ""}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        image={product.image}
                        rating={product.rating || 4.5}
                        reviews={product.reviews || 0}
                        weight={product.weight || "1kg"}
                        tags={product.tags || ["Melt in Mouth", "Authentic"]} // Mock tags for UI match
                        isBestSeller={product.isSeasonBest}
                        compact={true}
                        stock={product.stock}
                    />
                ))
            )}
        </div>
    );
}
