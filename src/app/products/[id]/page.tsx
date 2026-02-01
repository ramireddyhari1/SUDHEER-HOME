"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ShieldCheck, Leaf, ChevronRight, MapPin, Heart, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useState, useEffect, use } from "react";
import { useCart } from "@/context/CartContext";
import { ProductAccordion, AccordionItem } from "@/components/product/ProductAccordion";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { BadgeCheck, Clock, Shield } from "lucide-react";

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
        <div className="min-h-screen pb-20">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-16">

                    {/* Leftmost: Promo Banner (Only on Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 sticky top-24 h-fit">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-[#DAA520]/30 h-[700px] relative">
                            <Image
                                src="/images/vertical_banner.png"
                                alt="Authentic & Pure"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Left: Detail Gallery */}
                    <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
                        {product.images && product.images.map((img: string, i: number) => (
                            <div key={i} className={`relative w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${i === 0 ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                <Image src={img} alt="Thumb" fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Center-Left: Main Image */}
                    <div className="lg:col-span-4 sticky top-24 h-fit">
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

                        {/* Product Highlights - Fills empty space below image */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                { title: "100% Organic", subtitle: "Certified Natural", icon: <Leaf className="h-5 w-5 text-green-600" /> },
                                { title: "Handmade", subtitle: "Traditional Recipe", icon: <Heart className="h-5 w-5 text-red-500" /> },
                                { title: "No Preservatives", subtitle: "Freshly Packed", icon: <ShieldCheck className="h-5 w-5 text-blue-600" /> },
                                { title: "Premium Quality", subtitle: "Sourced with Care", icon: <BadgeCheck className="h-5 w-5 text-amber-500" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#DAA520]/20 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-white p-2 rounded-full shadow-sm">{item.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-sm text-[#4A3427]">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info - Enclosed in Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#FDFBF7]/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#DAA520]/20 relative overflow-hidden">

                            {/* Decorative Top Border (Optional, adds to theme) */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent opacity-50"></div>

                            <div className="space-y-5">
                                <div>
                                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#4A3427] mb-3 leading-tight tracking-tight">{product.name}</h1>
                                    <div className="flex items-center gap-4 text-sm mt-2">
                                        <div className="flex items-center gap-1.5 bg-[#155E42] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            <span className="text-sm">{product.rating}</span> <Star className="h-3.5 w-3.5 fill-current" />
                                        </div>
                                        <span className="text-muted-foreground font-medium text-sm border-b border-dotted border-gray-400 cursor-pointer hover:text-primary transition-colors">{product.reviews} Reviews</span>
                                        <span className="text-gray-300 hidden md:inline">|</span>
                                        <span className="text-[#155E42] font-semibold flex items-center gap-1.5 text-xs md:text-sm bg-[#155E42]/5 px-3 py-1 rounded-full border border-[#155E42]/10">
                                            <ShieldCheck className="h-4 w-4" /> Certified Organic
                                        </span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                {/* Trust Badges - Cleaned up */}
                                <div className="flex gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-xs font-medium text-[#5C4033]">
                                        <Truck className="h-4 w-4 text-[#DAA520]" />
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-[#5C4033]">
                                        <Clock className="h-4 w-4 text-[#DAA520]" />
                                        <span>24h Dispatch</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-[#5C4033]">
                                        <BadgeCheck className="h-4 w-4 text-[#DAA520]" />
                                        <span>Quality Checked</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-dashed border-gray-300"></div>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl md:text-5xl font-bold text-[#B8860B] font-serif">₹{product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                                        <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-xs border border-red-100">
                                            {discount}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Tax included. Shipping calculated at checkout.</p>

                            {/* Delivery Check - Modernized */}
                            <div className="bg-[#F8F5F1] p-4 rounded-xl border border-[#E8E4C9]">
                                <label className="text-xs font-bold uppercase text-[#8B4513] mb-2 block tracking-wide">Check Delivery Availability</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter Pincode"
                                            maxLength={6}
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            className="w-full pl-9 pr-4 h-11 border-transparent bg-white rounded-lg text-sm shadow-sm focus:ring-1 focus:ring-[#DAA520] focus:outline-none placeholder:text-gray-400"
                                        />
                                    </div>
                                    <Button variant="outline" onClick={handleCheck} className="h-11 px-6 border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-white transition-colors font-medium">Check</Button>
                                </div>
                                {checkResult && <p className="text-xs text-[#155E42] mt-2.5 font-medium flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> {checkResult}</p>}
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
                                        className="flex-1 h-12 text-lg font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg"
                                    >
                                        ADD TO CART
                                    </Button>
                                    <button className="h-12 w-12 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Accordions - Improved Spacing */}
                            <div className="pt-2">
                                <ProductAccordion>
                                    <AccordionItem title="Description" defaultOpen={true}>
                                        <p className="text-gray-700 leading-relaxed">{product.description || "Experience the authentic taste of tradition with our premium quality product, made with the finest ingredients and love."}</p>
                                    </AccordionItem>
                                    <AccordionItem title="Ingredients">
                                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                            <li>Premium Handpicked Ingredients</li>
                                            <li>Traditional Spices & Herbs</li>
                                            <li>No Artificial Preservatives</li>
                                            <li>100% Natural & Organic</li>
                                        </ul>
                                    </AccordionItem>
                                    <AccordionItem title="Shelf Life & Storage">
                                        <div className="space-y-2 text-gray-600">
                                            <p><span className="font-semibold text-gray-800">Shelf Life:</span> 3 Months from packing</p>
                                            <p><span className="font-semibold text-gray-800">Storage:</span> Store in a cool, dry place. Transfer to an airtight container after opening.</p>
                                        </div>
                                    </AccordionItem>
                                </ProductAccordion>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="border-t border-gray-200/50 pt-12">
                    <RelatedProducts currentId={id} />
                </div>
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
                    className="flex-1 h-10 text-base font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-md"
                >
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
}
