"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ShieldCheck, Leaf, ChevronRight, MapPin, Heart, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useState, useEffect, use } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <ProductDetailContent id={id} />
    );
}

function ProductDetailContent({ id }: { id: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [pincode, setPincode] = useState("");
    const [checkResult, setCheckResult] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Hooks
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Try fetching from API
                const res = await fetch(`/api/products?id=${id}`);
                const data = await res.json();

                if (data.success && data.product) {
                    setProduct({
                        ...data.product,
                        images: data.product.images || [data.product.image], // Fallback if no gallery
                        rating: data.product.rating || 4.8,
                        reviews: data.product.reviews || 0,
                    });
                } else {
                    // Fallback for debugging or invalid IDs if needed, or just set null
                    setProduct(null);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCheck = () => {
        if (pincode.length === 6) {
            setCheckResult("Delivery available! Est: 3-5 days");
        } else {
            setCheckResult("Please enter valid 6 digit pincode");
        }
    }

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            weight: product.weight || "1 kg"
        });
        alert("Added to cart!"); // Simple feedback for now
    };

    if (loading) return <div className="h-[50vh] flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="h-[50vh] flex items-center justify-center">Product not found.</div>;

    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="bg-[#FDFBF7] min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-3 text-xs md:text-sm text-muted-foreground sticky top-16 md:top-20 z-30 overflow-x-auto no-scrollbar">
                <Container>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="h-3 w-3 flex-shrink-0" />
                        <Link href="/products" className="hover:text-primary">Shop</Link>
                        <ChevronRight className="h-3 w-3 flex-shrink-0" />
                        <span className="text-foreground font-medium truncate max-w-[150px] md:max-w-none">{product.name}</span>
                    </div>
                </Container>
            </div>

            <Container className="py-4 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-8 md:mb-16">

                    {/* Left: Detail Gallery */}
                    <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
                        {product.images && product.images.map((img: string, i: number) => (
                            <div key={i} className={`relative w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${i === 0 ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                <Image src={img} alt="Thumb" fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Center: Main Image */}
                    <div className="lg:col-span-5">
                        <div className="relative aspect-square md:aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                            {product.isSeasonBest && (
                                <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    SEASON BEST
                                </div>
                            )}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="lg:col-span-6 space-y-4 md:space-y-6">
                        <div>
                            <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-2 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 bg-green-900 text-white px-2 py-0.5 rounded text-xs font-bold">
                                    {product.rating} <Star className="h-3 w-3 fill-current" />
                                </div>
                                <span className="text-muted-foreground underline decoration-dotted text-xs md:text-sm">{product.reviews} Reviews</span>
                                <span className="text-muted-foreground hidden md:inline">|</span>
                                <span className="text-green-700 font-medium flex items-center gap-1 text-xs md:text-sm"><ShieldCheck className="h-3 w-3 md:h-4 md:w-4" /> Certified Organic</span>
                            </div>
                        </div>

                        <div className="border-t border-b border-dashed py-3 md:py-4 flex items-end gap-3">
                            <span className="text-2xl md:text-3xl font-bold text-[#155E42]">₹{product.price}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-sm md:text-lg text-muted-foreground line-through mb-1">₹{product.originalPrice}</span>
                                    <span className="text-red-600 font-bold text-xs md:text-sm mb-1.5">({discount}% OFF)</span>
                                </>
                            )}
                            <span className="text-[10px] md:text-xs text-muted-foreground ml-auto mb-1">Tax included</span>
                        </div>

                        {/* Delivery Check */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Check Delivery</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        maxLength={6}
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="w-full pl-9 pr-4 h-10 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <Button variant="outline" onClick={handleCheck} className="h-10 text-primary border-primary hover:bg-primary/5">Check</Button>
                            </div>
                            {checkResult && <p className="text-xs text-green-700 mt-2 font-medium flex items-center gap-1"><Truck className="h-3 w-3" /> {checkResult}</p>}
                        </div>


                        {/* Desktop Action Bar */}
                        <div className="space-y-4 hidden md:block">
                            <div className="flex gap-4">
                                <div className="flex items-center border border-gray-300 rounded-md bg-white w-32 justify-between">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-50 text-xl text-gray-500 font-medium"
                                    >-</button>
                                    <span className="font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-50 text-xl text-gray-500 font-medium"
                                    >+</button>
                                </div>
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 h-12 text-lg font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg animate-shimmer"
                                >
                                    ADD TO CART
                                </Button>
                                <button className="h-12 w-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 hover:text-red-500 transition-colors">
                                    <Heart className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-lg border border-gray-100">
                            <h3 className="font-bold text-foreground mb-2">Description</h3>
                            {product.description || "No description available."}
                        </div>
                    </div>
                </div>

                {/* Related Products Placeholder - Could be made dynamic later */}
            </Container>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden z-[101] flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center border border-gray-300 rounded-md bg-white h-10 px-2 justify-between w-24 flex-shrink-0">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 text-lg text-gray-500 font-medium"
                    >-</button>
                    <span className="font-bold text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 text-lg text-gray-500 font-medium"
                    >+</button>
                </div>
                <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-10 text-base font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-md animate-shimmer"
                >
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
}
