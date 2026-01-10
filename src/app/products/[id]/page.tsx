"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ShieldCheck, Leaf, ChevronRight, MapPin, Heart, Share2 } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useState } from "react";

// Mock data lookup
const getProduct = (id: string) => {
    return {
        id,
        name: "Premium Organic Jaggery Powder",
        price: 349,
        originalPrice: 399,
        description: "Our authentic organic jaggery powder is made using the traditional specialized Okkaliga method from chemical-free sugarcane. It retains all natural minerals and has a distinct rich taste. Perfect for sweetening your daily coffee, tea, or traditional desserts without the guilt of refined sugar.",
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1589139250009-8073cd03da7e?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600"
        ],
        weight: "500g",
        category: "Sweeteners",
        rating: 4.8,
        reviews: 2124,
        sku: "VO-JAG-500",
        inStock: true,
    };
};

export default function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    return (
        <ProductDetailContent id={"jaggery-powder"} />
    );
}

function ProductDetailContent({ id }: { id: string }) {
    const product = getProduct(id);
    const [pincode, setPincode] = useState("");
    const [checkResult, setCheckResult] = useState<string | null>(null);

    const handleCheck = () => {
        if (pincode.length === 6) {
            setCheckResult("Delivery by 12th Jan, Friday");
        } else {
            setCheckResult("Please enter valid 6 digit pincode");
        }
    }

    return (
        <div className="bg-[#FDFBF7] min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-3 text-xs md:text-sm text-muted-foreground sticky top-20 z-30">
                <Container>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/products" className="hover:text-primary">Shop</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium truncate max-w-[150px] md:max-w-none">{product.name}</span>
                    </div>
                </Container>
            </div>

            <Container className="py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

                    {/* Left: Detail Gallery */}
                    <div className="lg:col-span-1 hidden lg:flex flex-col gap-4">
                        {product.images.map((img, i) => (
                            <div key={i} className={`relative w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${i === 0 ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                <Image src={img} alt="Thumb" fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Center: Main Image */}
                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                BESTSELLER
                            </div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Mobile Thumbnails */}
                        <div className="lg:hidden flex gap-4 mt-4 overflow-x-auto pb-2 no-scrollbar">
                            {product.images.map((img, i) => (
                                <div key={i} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                    <Image src={img} alt="Thumb" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="lg:col-span-6 space-y-6">
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 bg-green-900 text-white px-2 py-0.5 rounded text-xs font-bold">
                                    {product.rating} <Star className="h-3 w-3 fill-current" />
                                </div>
                                <span className="text-muted-foreground underline decoration-dotted">{product.reviews} Reviews</span>
                                <span className="text-muted-foreground hidden md:inline">|</span>
                                <span className="text-green-700 font-medium flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Certified Organic</span>
                            </div>
                        </div>

                        <div className="border-t border-b border-dashed py-4 flex items-end gap-3">
                            <span className="text-3xl font-bold">₹{product.price}</span>
                            <span className="text-lg text-muted-foreground line-through mb-1">₹{product.originalPrice}</span>
                            <span className="text-red-600 font-bold text-sm mb-1.5">(Save ₹{product.originalPrice - product.price})</span>
                            <span className="text-xs text-muted-foreground ml-auto mb-1">Tax included</span>
                        </div>

                        {/* Trust Badges Strip */}
                        <div className="flex gap-4 md:gap-8 overflow-x-auto py-2">
                            <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                <div className="bg-amber-50 p-3 rounded-full"><Leaf className="h-5 w-5 text-amber-700" /></div>
                                <span className="text-[10px] text-center font-medium leading-tight">No Palm<br />Oil</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                <div className="bg-amber-50 p-3 rounded-full"><Star className="h-5 w-5 text-amber-700" /></div>
                                <span className="text-[10px] text-center font-medium leading-tight">Premium<br />Quality</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                <div className="bg-amber-50 p-3 rounded-full"><ShieldCheck className="h-5 w-5 text-amber-700" /></div>
                                <span className="text-[10px] text-center font-medium leading-tight">Chemical<br />Free</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                <div className="bg-amber-50 p-3 rounded-full"><Truck className="h-5 w-5 text-amber-700" /></div>
                                <span className="text-[10px] text-center font-medium leading-tight">Safe<br />Shipping</span>
                            </div>
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


                        {/* Sticky Action Bar (Desktop mainly, standard styling) */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex items-center border border-gray-300 rounded-md bg-white w-32 justify-between">
                                    <button className="px-3 py-2 hover:bg-gray-50 text-xl text-gray-500 font-medium">-</button>
                                    <span className="font-bold">1</span>
                                    <button className="px-3 py-2 hover:bg-gray-50 text-xl text-gray-500 font-medium">+</button>
                                </div>
                                <Button className="flex-1 h-12 text-lg font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg animate-shimmer">
                                    ADD TO CART
                                </Button>
                                <button className="h-12 w-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 hover:text-red-500 transition-colors">
                                    <Heart className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-lg border border-gray-100">
                            <h3 className="font-bold text-foreground mb-2">Description</h3>
                            {product.description}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="border-t border-gray-200 pt-12">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <ProductCard
                            id="black-rice"
                            name="Karuppu Kavuni Rice"
                            price={499}
                            originalPrice={550}
                            image="https://plus.unsplash.com/premium_photo-1675237626068-bf4dc298ca3a?auto=format&fit=crop&q=80&w=600"
                            weight="1kg"
                            category="Rice"
                        />
                        <ProductCard
                            id="ghee"
                            name="A2 Desi Cow Ghee"
                            price={1250}
                            image="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600"
                            weight="500ml"
                            category="Staples"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
